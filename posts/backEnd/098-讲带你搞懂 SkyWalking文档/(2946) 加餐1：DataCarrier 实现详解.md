# 加餐1：DataCarrier实现详解

在开始介绍 Trace 相关 BootService 实现以及 Trace 数据的收集和发送之前，我们需要了解另一个关键的组件 ------ DataCarrier 。DataCarrier 是一个轻量级的生产者-消费者模式的实现库， SkyWalking Agent 在收集到 Trace 数据之后，会先写入到 DataCarrier 中的缓存，然后由后台线程定时发送到后端的 OAP。其实，在多数涉及网络传输的场景中都会使用这种设计：先在本地缓存数据，然后聚合，最后定时批量发送。

DataCarrier 之前是一个单独的项目，现在并入 SkyWalking 之中作为一个独立的子模块存在，具体位置如下图所示：


<Image alt="sw1.png" src="https://s0.lgstatic.com/i/image3/M01/8B/D8/Cgq2xl6enDGAd7mqAAF-K97sPzE781.png"/> 


#### Buffer 核心原理

DataCarrier 底层使用多个定长数组作为存储缓冲区，即 apm-datacarrier 模块中的 Buffer 类，其底层的 buffer 字段（Object\[\] 类型）是真正存储数据的地方。每个 Buffer 内部维护了一个环形指针（AtomicRangeInteger 类型），我们可以指定其中的 value 字段（AtomicInteger 类型）从 start 值开始递增，当 value 递增到 end 值（int 类型）时，value 字段会被重置为 start 值，实现环形指针的效果，这样，Buffer 就可以实现循环覆盖写入的模式了。

需要注意的是，AtomicRangeInteger 环形指针底层是基于乐观锁实现的，这样就能够解决并发问题。AtomicRangeInteger 的核心方法 getAndIncrement() 实现如下：

```java
public final int getAndIncrement() { //  典型的基于乐观锁的环形指针实现
    int next;
    do {
        next = this.value.incrementAndGet(); // 
        if (next > endValue && 
              this.value.compareAndSet(next, startValue)) { // CAS操作
            return endValue;
        }
    } while (next > endValue);
    return next - 1;
}
```

Buffer 可以指定下面三种写入策略，这些策略只在 Buffer 写满的情况下才生效：

* **BLOCKING 策略**（默认）：写入线程阻塞等待，直到 Buffer 有空闲空间为止。如果选择了 BLOCKING 策略，我们可以向 Buffer 中注册 Callback 回调，当发生阻塞时 Callback 会收到相应的事件。
* **OVERRIDE 策略**：覆盖旧数据，会导致缓存在 Buffer 中的旧数据丢失。
* **IF_POSSIBLE 策略**：如果无法写入则直接返回 false，由上层应用判断如何处理。

Buffer 提供了读写底层 Objec\[\] 数组的相关方法，其中 save() 方法负责向底层数组中填充数据，实现如下：

```java
boolean save(T data) {
    // AtomicRangeInteger已经处理了并发问题，这里i对应的位置只有当前线程操作
    int i = index.getAndIncrement(); 
    // 如果当前位置空闲，可以直接填充即可，否则需要按照策略进行处理
    if (buffer[i] != null) {
        switch (strategy) {
            case BLOCKING: // BLOCKING策略
                boolean isFirstTimeBlocking = true;
                while (buffer[i] != null) {// 自旋等待下标为i的位置被释放
                    if (isFirstTimeBlocking) {
                        // 阻塞当前线程，并通知所有Callback
                        isFirstTimeBlocking = false;
                        for (QueueBlockingCallback<T> callback : 
                              callbacks) {
                            callback.notify(data);
                        }
                    }
                    Thread.sleep(1L); // sleep
                }
                break;
            case IF_POSSIBLE: // IF_POSSIBLE策略直接返回false
                return false; 
            case OVERRIDE: // OVERRIDE策略直接走下面的赋值逻辑，覆盖旧数据
            default:
        }
    }
    buffer[i] = data; // 向下标为i的位置填充数据
    return true;
}
```

obtain() 方法提供了一次性读取（并清理） Buffer 中全部数据的功能，同时也提供了部分读取的重载，具体实现如下：

```java
public LinkedList<T> obtain(int start, int end) {
    LinkedList<T> result = new LinkedList<T>();
    // 将 start~end 之间的元素返回，消费者消费这个result集合就行了
    for (int i = start; i < end; i++) {
        if (buffer[i] != null) {
            result.add((T)buffer[i]);
            buffer[i] = null;
        }
    }
    return result;
}
```

> **思考题**   
>
> 假设在 Buffer 写满的情况下，两个线程同时调用 save() 方法写入同一个位置时，会出现什么问题？我们应该如何解决呢？

#### Channels

Channels 底层管理了多个 Buffer 对象，提供了 IDataPartitioner 选择器用于确定一个数据元素写入到底层的哪个 Buffer 对象中。如果你了解 Kafka 可能知道，Kafka Producer 在发送数据时也会有相应的分区策略，IDataPartitioner 与之类似。当数据并行写入的时候，由 IDataPartitioner 选择器根据一定的均衡策略将数据分散到不同的 Buffer 中写入，这样就可以有效减少并发导致的自旋锁等待时间，降低整个 Channels 的写入压力，提高写入效率。IDataPartitioner 接口有两个实现，如下图所示：


<Image alt="sw2.png" src="https://s0.lgstatic.com/i/image3/M01/8B/D9/Cgq2xl6enRKAKlx5AAAlHmaDotA329.png"/> 


* **ProducerThreadPartitioner** 会根据写入的 Thread ID 进行分发，这样可以保证相同线程写入的数据都在一个 Buffer 中。
* **SimpleRollingPartitioner** 简单循环自增选择器，使用无锁整型（volatile 修饰）的自增并取模，选择要写入的 Buffer 。当然，在高负载时会产生批量连续写入一个 Buffer 的情况，但在中低负载情况下，可以很好的避免不同线程写入数据量不均衡的问题，从而提供较好性能。

在初始化 Channels 时，有两个特殊的参数需要进行说明：

* **channelSize 参数**：指定 Channels 底层 Buffer 的数量，合理的 Buffer 数量搭配合理的分区选择器，可以让整个 Channels 写入无竞争或很少出现竞争。
* **bufferSize**：指定每个 Buffer 的大小，合理的 Buffer 大小可以在满足缓冲能力的同时占用合理的内存大小。

下图展示了 bufferSize 、channelSize 参数与 Channels之间的关系：


<Image alt="sw3.png" src="https://s0.lgstatic.com/i/image3/M01/05/95/CgoCgV6enVKAMtBMAABQyIHkIPs184.png"/> 


#### DataCarrier 消费者

DataCarrier 没有为生产者定义特殊的接口，上层应用直接调用其 save() 方法即可完成写入。而 DataCarrier 消费者的具体行为都定义在 IConsumer 接口之中：

```java
public interface IConsumer<T> {
    void init(); // 初始化消费者
    void consume(List<T> data); // 批量消费消息
    void onError(List<T> data, Throwable t); // 处理消费过程中发生的异常
    void onExit(); // 消费结束时通过该方法关闭消费者，释放资源
}
```

ConsumerThread 是专门与 IConsumer 对象配合使用的消费线程，它继承 Thread ，并封装了一个 IConsumer 对象，每个 ConsumerThread 线程可以消费多个 DataSource，这里的 DataSource 是 Buffer 的一部分或是完整的 Buffer（DataSource 通过 start、end 字段标记当前 ConsumerThread 消费的 Buffer 区域）。下图展示了 ConsumerThread 的结构图：


<Image alt="sw4.png" src="https://s0.lgstatic.com/i/image3/M01/8B/DA/Cgq2xl6enYSAPp8SAADKo6QU_14981.png"/> 


这里的 ConsumerThread 1 线程同时消费了三个 Buffer，后面介绍 Driver 接口实现时会看到，一个 ConsumerThread 消费的 Buffer 都是来自同一个 Channels。如上图所示，ConsumerThread 1 线程会消费 Buffer 1 和 Buffer 2 中 1\~3 这部分元素；同时也会消费 Buffer 3 中 2 \~ 5 这部分元素。ConsumerThread 2 线程只会消费Buffer 3 中 0 \~ 1 这部分元素。

在 run() 方法中，ConsumerThread 线程会定时循环遍历其负责的所有 Buffer 区域，一旦发现可消费的数据，就会调用 consume() 方法进行处理。ConsumerThread.consume() 方法的核心实现如下：

```java
private boolean consume() {
    boolean hasData = false;
    LinkedList<T> consumeList = new LinkedList<T>();
    for (DataSource dataSource : dataSources) {
        // DataSource.obtain()方法是对Buffer.obtain()方法的封装
        LinkedList<T> data = dataSource.obtain();
        if (data.size() == 0) { continue; }
        consumeList.addAll(data); // 将待消费的数据转存到consumeList集合
        hasData = true; // 标记此次消费是否有数据
    }

    if (consumeList.size() > 0) {
        try { // 执行IConsumer.consume()方法中封装的消费逻辑处理消息
            consumer.consume(consumeList);
        } catch (Throwable t) {// 消费过程中出现异常的时候
            consumer.onError(consumeList, t);
        }
    }
    return hasData;
}
```

使用 ConsumerThread 我们可以实现一个或多个消费线程处理同一个 Channels 的消费模式。MultipleChannelsConsumer 提供了另一种消费模式，与 ConsumerThread 的区别在于：MultipleChannelsConsumer 线程可以处理多组 Group，每个 Group 都是一个 IConsumer + 一个 Channels 的组合。


<Image alt="sw5.png" src="https://s0.lgstatic.com/i/image3/M01/05/95/CgoCgV6eneaAei7OAACQCaME7Fk880.png"/> 


上图展示了 MultipleChannelsConsumer 的消费模型，MultipleChannelsConsumer 可以同时消费多个 Group，每个 Group 中的 IConsumer 对象包含了消费逻辑，Channels 对象包含了待消费的数据，需要注意的是，一旦 Channels 被添加到 MultipleChannelsConsumer 中，将会被一个 MultipleChannelsConsumer 完全消费，不会像 ConsumerThread 那样分区域部分消费。

在 run() 方法中，MultipleChannelsConsumer 线程会定时循环遍历其消费的全部 Group，一旦发现可消费的数据，就会循环调用 consume() 方法处理每个 Group。  

MultipleChannelsConsumer.consume() 方法的核心实现如下：

```java
private boolean consume(Group target) {
    boolean hasData;
    LinkedList consumeList = new LinkedList();
    for (int i = 0; i < target.channels.getChannelSize(); i++) {
        Buffer buffer = target.channels.getBuffer(i);
        // 将该Group中Channels全部可消费的数据都导出到consumeList列表
        consumeList.addAll(buffer.obtain()); 
    }
    if (hasData = consumeList.size() > 0) {
        try { // 通过该Group中相应的IConsumer消费数据
            target.consumer.consume(consumeList);
        } catch (Throwable t) { // 消费过程的异常处理
            target.consumer.onError(consumeList, t);
        }
    }
    return hasData;
}
```

MultipleChannelsConsumer 底层通过一个 ArrayList 维护 Group 集合（consumeTargets 字段），MultipleChannelsConsumer 通过 Copy-on-Write 的方式保证线程安全，即在调用 addNewTarget() 方法向 consumeTargets 集合添加 Group 时，会创建一个新的 ArrayList 集合并拷贝原集合内容，然后向新集合中添加数据，待新集合添加完成之后，直接替换原有集合。之所以这样做是因为在添加的过程中，MultipleChannelsConsumer 线程可能正在循环处理 consumeTargets 集合，这也是 consumeTargets 用 volatile 修饰的原因。下图展示了添加 Group 的核心逻辑：


<Image alt="sw6.png" src="https://s0.lgstatic.com/i/image3/M01/8B/DA/Cgq2xl6enhKADPe-AAIoMSB90P4701.png"/> 


#### IDriver 实现剖析

IDriver 接口会将前文介绍的 IConsumer 消费者以及 ConsumerThread 线程或 MultipleChannelsConsumer 线程按照一定的消费模式集成到一起，提供更加简单易用的 API。  

IDriver 接口的继承关系如下图所示，其中依赖 ConsumerThread 的实现是 ConsumerDriver ，依赖 MultipleChannelsConsumer 的实现是 BulkConsumerPool ：


<Image alt="sw7.png" src="https://s0.lgstatic.com/i/image3/M01/05/95/CgoCgV6enimAbhHkAAIykJeqP-I840.png"/> 


在 IDriver 接口中定义了三个与消费线程生命周期相关方法：

```java
public interface IDriver {
    void begin(Channels channels); // 启动消费线程
    boolean isRunning(Channels channels); // 检测当前IDriver是否正在运行
    void close(Channels channels); // 关闭消费线程
}
```

在 ConsumerDriver 实现中维护了固定数量的 ConsumerThread 线程（consumerThreads 字段，ConsumerThread\[\] 类型），它们共同消费一个 Channels 中的数据（channels 字段，Channels 类型）。

ConsumerDriver 的核心逻辑是在其 begin() 方法中，它会根据 Channels 中的 Buffer 数量以及ConsumerThread 线程数进行分配：

* 如果 Buffer 个数较多，则一个 ConsumerThread 线程需要处理多个 Buffer。
* 如果 ConsumerThread 线程数较多，则一个 Buffer 会被划分为多个区域，由不同的 ConsumerThread 线程进行消费，也就是前文介绍的，每个 ConsumerThread 线程负责消费一个 Buffer 的一个区域。
* 如果两者数量正好相同，则是一对一的消费关系。

消费的 Channels、ConsumerThread 线程数以及两者的绑定关系一旦确定，在整个 ConsumerDriver 的生命周期中不会再进行变更。

BulkConsumePool 是 IDriver 接口的另一个实现，在其 allConsumers 字段（List类型）中维护了当前启动的 MultipleChannelsConsumer 线程。BulkConsumePool 的核心实现在其 add() 方法，通过该方法向 BulkConsumePool 添加新 Channels 以及对应 IConsumer 时，会通过 getLowestPayload() 方法选择负载最低的 MultipleChannelsConsumer 线程进行处理（即当前处理 Group 最少的线程）。  

#### DataCarrier

DataCarrier 是整个 DataCarrier 模块最顶层的门面类，其中整合 Channels、IDriver 并给 Producer 提供了一个统一的入口。

在 DataCarrier 构造方法中会接收 channelSize、bufferSize 两个参数初始化 Channels ，默认使用 SimpleRollingPartitioner 分区选择器以及 BLOCKING 策略（同时，DataCarrier 提供了修改这两项配置的方法）。DataCarrier 为生产者提供了 produce() 方法（底层调用 Channels.save() 方法），统一写入数据的入口。

DataCarrier 最核心的是提供了多个 consume() 方法的重载，下图四个 consume() 方法重载底层是根据参数指定线程数以及轮训时间来新建 ConsumerDriver 实现消费能力的：


<Image alt="sw8.png" src="https://s0.lgstatic.com/i/image3/M01/12/C5/Ciqah16enoiAAR34AABZQEoOOp8211.png"/> 


下图的 consume() 方法重载则是依赖传入的 BulkConsumePool 实现数据消费能力的（注意，这里不会新建 BulkConsumePool）：


<Image alt="sw9.png" src="https://s0.lgstatic.com/i/image3/M01/05/96/CgoCgV6enpaAGX-EAAAccs9p1lw523.png"/> 


这里传入的 BulkConsumePool 对象一般统一维护在 ConsumerPoolFactory 中。ConsumerPoolFactory 是通过枚举方式实现的单例类，其底层维护了一个 Map\<String, ConsumerPool\> 集合，其中 Key 就是 BulkConsumePool 的名称，后面会看到大量通过名称在 ConsumerPoolFactory 中查找 BulkConsumePool 对象的场景。

#### 总结

本课时主要介绍了 DataCarrier 这个轻量级的生产者-消费者模式的实现库，首先介绍了 DataCarrier 最底层的数据存储组件 Buffer 和 Channels 以及相关的填充策略，接下来深入分析了 DataCarrier 提供的消费者接口以及两种消费模型，最后介绍了 IDriver 接口和 DataCarrier 门面类提供的 API 实现。


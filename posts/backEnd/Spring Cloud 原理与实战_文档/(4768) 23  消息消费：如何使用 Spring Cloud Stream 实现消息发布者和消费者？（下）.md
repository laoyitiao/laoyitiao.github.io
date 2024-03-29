# 23消息消费：如何使用SpringCloudStream实现消息发布者和消费者？（下）

在上一课时中，我们给出了 SpringHealth 案例中基于 Spring Cloud Stream 的消息发布场景以及实现方式，同时也给出了消息消费的应用场景。今天我们将延续上一课时的内容，来具体讲解如何在服务中添加消息消费者，以及使用各项消息消费的高级主题，并给出案例的运行效果。

### 在服务中添加消息消费者

在介绍消息消费者的具体实现方法之前，我们先来回顾消息消费的实现流程，如下图所示：


<Image alt="Drawing 0.png" src="https://s0.lgstatic.com/i/image/M00/7E/C4/CgqCHl_PVBSAeL1XAAA8UAK4iIs917.png"/> 
  
消息消费实现流程

针对上图中各个消费者组件的实现过程，我们采用与介绍发布者时相同的方式进行展开。首当其冲的还是要使用 @EnableBinding 注解。

#### 使用 @EnableBinding 注解

与初始化消息发布环境一样，我们同样需要在 intervention-service 需要引入 spring-cloud-stream、spring-cloud-starter-stream-kafka 或 spring-cloud-starter-stream-rabbit 这几个Maven依赖，并构建 Bootstrap 类。intervention-service 中的 Bootstrap 类是 InterventionApplication，其代码如下所示：

```java
@SpringCloudApplication
@EnableBinding(Sink.class)
public class InterventionApplication{
 
    public static void main(String[] args) {
        SpringApplication.run(InterventionApplication.class, args);
    }
}
```

显然，对于作为消息消费者的 Bootstrap 类而言，@EnableBinding 注解所绑定的应该是 Sink 接口。

#### 创建 Sink

UserInfoChangedSink 负责处理具体的消息消费逻辑，代码如下所示：

```java
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener; 
...
 
public class UserInfoChangedSink {
 
    @Autowired
    private UserInfoRedisRepository userInfoRedisRepository;
 
    private static final Logger logger = LoggerFactory.getLogger(UserInfoChangedSink.class);
 
    @StreamListener("input")
    public void handleChangedUserInfo(UserInfoChangedEventMapper userInfoChangedEventMapper) {
     
        logger.debug("Received a message of type " + userInfoChangedEventMapper.getType()); 
     logger.debug("Received a {} event from the user-service for user name {}", 
             userInfoChangedEventMapper.getOperation(), 
             userInfoChangedEventMapper.getUser().getUserName());
        
        if(userInfoChangedEventMapper.getOperation().equals("ADD")) {
            userInfoRedisRepository.saveUser(userInfoChangedEventMapper.getUser());
        } else if(userInfoChangedEventMapper.getOperation().equals("UPDATE")) {
         userInfoRedisRepository.updateUser(userInfoChangedEventMapper.getUser());            
        } else if(userInfoChangedEventMapper.getOperation().equals("DELETE")) {
         userInfoRedisRepository.deleteUser(userInfoChangedEventMapper.getUser().getUserName());
        } else {            
            logger.error("Received an UNKNOWN event from the user-service of type {}", userInfoChangedEventMapper.getType());
        }
    }
}
```

这里引入了一个新的注解 @StreamListener，将该注解添加到某个方法上就可以使之接收处理流中的事件。在上面的例子中，@StreamListener 注解添加在了 handleChangedUserInfo() 方法上并指向了"input"通道，意味着所有流经"input"通道的消息都会交由这个 handleChangedUserInfo() 方法进行处理。

而在 handleChangedUserInfo() 方法中，我们调用 UserInfoRedisRepository 类完成各种缓存相关的处理。UserInfoRedisRepository 的实现代码参考如下：

```java
@Repository
public class UserInfoRedisRepositoryImpl implements UserInfoRedisRepository {
    private static final String HASH_NAME = "user";
 
    private RedisTemplate<String, UserMapper> redisTemplate;
    private HashOperations<String, String, UserMapper> hashOperations;
 
    public UserInfoRedisRepositoryImpl() {
        super();
    }
 
    @Autowired
    private UserInfoRedisRepositoryImpl(RedisTemplate<String, UserMapper> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
 
    @PostConstruct
    private void init() {
        hashOperations = redisTemplate.opsForHash();
    }
 
    @Override
    public void saveUser(UserMapper user) {
        hashOperations.put(HASH_NAME, user.getUserName(), user);
    }
 
    @Override
    public void updateUser(UserMapper user) {
        hashOperations.put(HASH_NAME, user.getUserName(), user);
    }
 
    @Override
    public void deleteUser(String userName) {
        hashOperations.delete(HASH_NAME, userName);
    }
 
    @Override
    public UserMapper findUserByUserName(String userName) {
        return (UserMapper) hashOperations.get(HASH_NAME, userName);
    }
}
```

这里，我们使用了 Spring Data 提供的 RedisTemplate 和 HashOperations 工具类来封装对Redis的数据操作。关于 Spring Data 的使用方法不是本课程的重点，你可以参考相关资料进行进一步了解。

#### 配置 Binder

对于消息消费者而言，配置 Binder 的方式和消息发布者非常类似。如果使用默认的消息通道，那么我们只需要把用于发送的"output"通道改为接收的"input"通道就可以了。这里以 Kafka 为例，给出 Binder 的配置信息，如下所示：

```xml
spring:
  cloud:
    stream:
      bindings:
        input:
          destination:  userInfoChangedTopic
          content-type: application/json
      kafka:
        binder:
          zk-nodes: localhost
	      brokers: localhost
```

### Spring Cloud Stream 高级主题

在分别介绍完消息发布者和消费者的基本实现过程之后，我们将在此基础上讨论 Spring Cloud Stream 的高级主题，包括自定义消息通道、使用消费者组以及消息分区。

#### 自定义消息通道

在前面的示例中，无论是消息发布还是消息消费，我们都使用了 Spring Cloud Stream 中默认提供的通道名"output"和"input"。显然，在有些场景下，为了更好地管理系统中存在的所有通道，为通道进行命名是一项最佳实践，这点对于消息消费的场景尤为重要。在接下来的内容中，针对消息消费的场景，我们将不使用 Sink 组件默认提供的"input"通道，而是尝试通过自定义通道的方式来实现消息消费。

在 Spring Cloud Stream 中，实现一个面向消息消费场景的自定义通道的方法也非常简单，只需要定义一个新的接口，并在该接口中通过 @Input 注解声明一个新的 Channel 即可。例如我们可以定义一个新的 UserInfoChangedChannel 接口，然后通过 @Input 注解就可以声明一个"userInfoChangedChannel"通道，代码如下所示。

```java
import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;
 
public interface UserInfoChangedChannel{
 
  String USER_INFO = "userInfoChangedChannel";
    
    @Input(UserInfoChangedChannel.USER_INFO)
    SubscribableChannel userInfoChangedChannel();
}
```

注意到该通道的类型为 Spring Intergration 中用于消费消息的 SubscribableChannel。同时，我们也注意到这个 UserInfoChangedChannel 的代码风格与 Spring Cloud Stream 自带的Sink接口完全一致。作为回顾，这里也给出 Sink 接口的定义，如下所示：

```java
import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;
	 
public interface Sink{
 
    String INPUT = "input";
 
    @Input(Sink.INPUT)
    SubscribableChannel input();
}
```

一旦我们完成了自定义的消息通信，就可以在 @StreamListener 注解中设置这个通道。以前面介绍的 UserInfoChangedSink 为例，添加了自定义通道之后的重构代码结构如下所示：

```java
@EnableBinding(UserInfoChangedChannel.class)
public class UserInfoChangedSink{
 
    @StreamListener(UserInfoChangedChannel.USER_INFO)
public void handleChangedUserInfo(UserInfoChangedEventMapper userInfoChangedEventMapper) {
	     ...
	}
}
```

可以看到，这里我们继续使用 @EnableBinding 注解绑定了自定义的 UserInfoChangedChannel。因为 UserInfoChangedChannel 中通过 @Input 注解提供了"userInfoChangedChannel"通道，所以这种用法实际上和 @EnableBinding(Sink.class) 是完全一致的。因此，对于 Binder 的配置而言，我们要做的也只是调整通道的名称。再次以 Kafka 为例，重构后的 Binder 配置信息如下所示：

```xml
spring:
  cloud:
    stream:
      bindings:
        userInfoChangedChannel:
          destination:  userInfoChangedTopic
          content-type: application/json
      kafka:
        binder:
          zk-nodes: localhost
	      brokers: localhost
```

#### 使用消费者分组

在微服务架构中，服务多实例部署的场景非常常见。在集群环境下，我们希望服务的不同实例被放置在竞争的消费者关系中，同一服务集群中只有一个实例能够处理给定消息。Spring Cloud Stream 提供的消费者分组可以很方便地实现这一需求，效果图如下所示：


<Image alt="Drawing 1.png" src="https://s0.lgstatic.com/i/image/M00/7E/C4/CgqCHl_PVEeALTgMAABKYpkIj8Y721.png"/> 
  
intervention-service 消息分组效果示意图

在上图中，两个 intervention-service 实例构成了一个 interventionGroup。在这个 interventionGroup 中，UserInfoChangedEvent 事件只会被一个 intervention-service 实例所消费。

要想实现上图所示的消息消费效果，我们唯一要做的事情也是重构Binder配置，即在配置Binder时指定消费者分组信息即可，如下所示：

```xml
spring:
  cloud:
    stream:
      bindings:
        userInfoChangedChannel:
          destination:  userInfoChangedTopic
          content-type: application/json
         group: interventionGroup
      kafka:
        binder:
          zk-nodes: localhost
	      brokers: localhost
```

以上基于Kafka的配置信息中，我们关注"bindings"段中的通道名称使用了自定义的"userInfoChangedChannel"，并且在该配置项中设置了"group"为"interventionGroup"。

#### 使用消息分区

最后一项 Spring Cloud Stream 使用上的高级主题是使用消费分区。同样是在集群环境下，假设存在两个 intervention-service 实例，我们希望用户信息中 id 为单号的 UserInfoChangedEvent 始终由第一个 intervention-service 实例进行消费，而id为双号的 UserInfoChangedEvent 则始终由第二个 intervention-service 实例进行消费。基于类似这样的需求，我们就可以构建消息分区，如下所示：


<Image alt="Lark20201208-182244.png" src="https://s0.lgstatic.com/i/image/M00/7E/B9/Ciqc1F_PVFGABcKNAAI1undYfJw543.png"/> 
  
intervention-service 消息分区效果示意图

要想实现上图所示的消息消费效果，我们唯一要做的事情还是重构 Binder 配置。这次以 RabbitMQ 为例给出示例配置，如下所示：

```xml
spring:
  cloud:
    stream:
      bindings:
        default:
          content-type: application/json
          binder: rabbitmq
        output:
             destination: userInfoChangedExchange
          group: interventionGroup
          producer:
            partitionKeyExpression: payload.user.id % 2
            partitionCount: 2
      binders:
        rabbitmq:
          type: rabbit
          environment:
            spring:
              rabbitmq:
                host: 127.0.0.1
                port: 5672
                username: guest
                password: guest
                virtual-host: /
```

首先，我们明确上述配置项针对的是消息发布者 Source 组件，因为我们看到了"output"配置项。注意到，我们指定了交换器和消费者分组分别为 "userInfoChangedExchange"和"interventionGroup"。同时，这里还出现了两个新的配置项"partitionKeyExpression"和"partitionCount"，这两个配置项就与消息分区有关。我们指定了"partitionKeyExpression"为"payload.user.id"，意味着 Spring Cloud Stream 会根据传入的 UserInfoChangedEvent 中的 User 对象的 id 对 2 进行取模操作。如果取模值为 1 表示只有分区Id为 1 的 intervention-service 能接收到该信息，如果是取模值为 0 表示只有分区 Id 为 2 的 intervention-service 能接收到该信息。显然，通过这样的分区策略，分区的数量"partitionCount"应该为 2。

对应的，作为消息消费者的 Sink 组件的配置项如下所示：

```xml
spring:
  cloud:
    stream:
      bindings:
        default:
          content-type: application/json
          binder: rabbitmq
        input:
          destination: userInfoChangedExchange
	group: interventionGroup
          consumer:
            partitioned: true
            instanceIndex: 0
            instanceCount: 2
      binders:
        rabbitmq:
          type: rabbit
          environment:
            spring:
              rabbitmq:
                host: 127.0.0.1
                port: 5672
                username: guest
                password: guest
                virtual-host: /
```

上述配置中同样包含了分区信息，其中 partitioned=true 表示启用消息分区功能，instanceCount=2 表示消息分区的消费者节点数量为 2 个。特别要注意的是 instanceIndex 参数用来设置当前消费者实例的索引号。instanceIndex 是从 0 开始的，我们在这里就把当前服务实例的索引号为 0。显然我们在另外一个 intervention-service 实例中需要将 instanceIndex 设置为 1。

为了演示消息分区功能，我们需要运行一个 user-service 作为 Source 组件，以及两个独立的 intervention-service 作为 Sink 组件，从而构建一个完整的示例并给出运行时应用系统的控制台输出效果。两个独立的 Sink 组件就按照前面给出的分区策略进行消息的处理。然后在两个 Sink 组件的输出中，UserInfoChangedEvent 中 User 对象的 Id 成单双数交替出现。你可以自己做一些尝试和练习。

### 小结与预告

承接上一课时内容，今天我们继续讨论使用 Spring Cloud Stream 实现消息消费者的实现方法。同样，我们发现通过合理配置 Binder 组件，这一实现过程也比较简单。另一方面，Spring Cloud Stream 中还存在一些高级主题，例如自定义消息通道、消费者组以及消费分区，本课时同样也介绍了如何在 SpringHealth 案例系统中使用这些高级主题的方法。

这里给你留一道思考题：在 Spring Cloud Stream 中，如何配置消费者组和消费分区功能？

通过前面课程的学习，我们感受到了 Spring Cloud Stream 中 Binder 组件的强大功能。基于这个组件，我们可以使用同一套开发模式来分别集成 RabbitMQ 和 Kafka 等主流的消息中间件。介绍完消息发布和消费之后，我们有必要对 Binder 组件的内部实现机制做深入分析，这就是下一课时的内容。


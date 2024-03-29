# 第30讲：erver-alarm插件核心剖析，如何避免收到告警信息

本课时我们将重点介绍 SkyWalking 中的告警系统。要想实现一个简单的告警系统，我们只需要完成下面四件事就可以：

1. 指定告警的规则（Rule）。

2. 接收监控数据。

3. 告警检查，将预先定义好的告警规则阈值与接收到的监控数据进行比较。

4. 如果监控数据符合告警规则，就会触发告警，那么将会通过指定途径将告警信息发送用户。

5. 在收到告警消息之后，运维人员或是开发人员就会开始关注并处理相应的问题。

SkyWalking OAP 的告警功能是在 server-alarm-plugin 插件中实现的，本课时将重点介绍它是如何实现上述四个功能的。

### AlarmCore

在 server-alarm-plugin 插件的 SPI 文件中定义了 AlarmModuleProvider 这个 ModuleProvider，它是 server-alarm-plugin 插件的入口，完成了整个插件的初始化操作。

在 AlarmModuleProvider.prepare() 方法中首先读取 alarm-settings.yml 配置文件，该配置文件中定义的告警规则，下面通过一个示例简单介绍一条告警规则的配置方式：

```dart
rules:
  service_resp_time_rule: # 告警规则的名称，必须以"_rule"结尾
    # 指标名称，该指标必须是 long、double或是 int类型，这里是服务响应时间
    metrics-name: service_resp_time 
    include-names: # 该规则适用的 serviceName，默认匹配全部服务
      - demo-webapp
      - demo-provider
    # 告警阈值，即服务响应时长超过1s则匹配成功
    threshold: 1000 
    op: ">" # 比较方式
    # 告警检查的时间窗口
    period: 5
    # 两层含义，在下面说明该告警规则的完整含义时由相应体现
    count: 3 
    # 当告警触发之后，后续连续2次告警检查即使成功，也不会再发送告警消息，也就是进入了沉默期，默认与period的配置值相同
    silence-period: 2
    message: {name} response time is longger than 1s # 告警消息
```

这里简单解释一下这条告警规则的完整含义：

* 该告警规则检查的是 demo-webapp 和 demo-provider 两个服务（include-names）的 service_resp_time 监控指标（metrics-name）

* 5 分钟（period）为一个时间窗口，在一个时间窗口内，demo-webapp 响应时长有 3 次（count）超过（op）了 1s（threshold）即为符合告警条件

* 连续 3 个（count）时间窗口符合告警条件才真正会触发告警，发送相应的告警信息（message）

* 为了防止连续告警消息造成骚扰，在触发告警之后的 2 个时间窗口 （silence-period）内，无论是否再次触发告警，不再发送任何告警消息

alarm-settings.yml 配置文件每条告警配置都会被解析成一个 AlarmRule 对象，其核心字段与告警配置一一对应，这里不再展开介绍。

接下来，AlarmModuleProvider 会创建并初始化 NotifyHandler 对象，具体代码如下：

```java
Rules rules = ...// 读取并解析 alarm-settings.yml 配置文件
// 创建 NotifyHandler对象并初始化
NotifyHandler notifyHandler = new NotifyHandler(rules); 
notifyHandler.init(new AlarmStandardPersistence());
```

NotifyHandler 是监控数据进入告警流程的入口，其中会初始化 AlarmCore 组件，看名字就知道它是 server-alarm-plugin 插件的核心组件之一。

在 AlarmCore 的构造方法中，会将前文解析 alarm-settings.yml 配置文件得到的 AlarmRule 集合按照指标名（即 metricsName 字段）进行分类，并将分类结果记录到其 runningContext 字段中（Map\<String, List\> 类型）。这里的 RunningRule 不仅包含了 AlarmRule 中的全部告警规则信息，还添加了用于告警检查的相关字段，其具体实现在后面会展开分析。

<br />


另外，AlarmCore 会启动一个后台 check 线程，每 10s 启动一次任务，尝试触发一次告警检查，核心实现如下：

```java
private LocalDateTime lastExecuteTime;
public void start(List<AlarmCallback> allCallbacks) {
    lastExecuteTime = LocalDateTime.now();
    Executors.newSingleThreadScheduledExecutor().scheduleAtFixedRate(() -> {
        List<AlarmMessage> alarmMessageList = new ArrayList<>(30);        LocalDateTime checkTime = LocalDateTime.now();
        // 计算当前时间与上次告警检查时间的差值
        int minutes = Minutes.minutesBetween(lastExecuteTime, checkTime).getMinutes();
        boolean[] hasExecute = new boolean[] {false};
        runningContext.values().forEach(ruleList -> ruleList.forEach(runningRule -> {
            if (minutes > 0) { // 差值一分钟以上，才会进行告警检查
                runningRule.moveTo(checkTime); // 这里的告警检查操作都是在 RunningRule中完成的
                if (checkTime.getSecondOfMinute() > 15) {
                    hasExecute[0] = true;
                    alarmMessageList.addAll(runningRule.check());
                }
            }
        }));
        if (hasExecute[0]) { // 更新最近一次检查时间，注意，这里会保证lastExecuteTime始终为整分钟，例如:17:30:00、17:31:00
            lastExecuteTime = checkTime.minusSeconds(checkTime.getSecondOfMinute());
        }
        if (alarmMessageList.size() > 0) { // 将告警信息通过AlarmCallback指定的方式发送出去，AlarmCallback的内容后面会展开分析
            allCallbacks.forEach(callback -> callback.doAlarm(alarmMessageList));
        }
    }, 10, 10, TimeUnit.SECONDS);
}
```

AlarmCore 启动的后台线程也帮我们指明了后续要分析的告警系统核心：

1. RunningRule 如何实现告警检查。

2. AlarmCallback 如何发送告警信息。

### RunningRule

RunningRule 中包含了告警规则的基本信息，其字段与前文介绍的 alarm-settings.yml 文件示例配置一致，另外还提供了一个 Windows 字段（Map\<MetaInAlarm, Window\>类型）用于进行告警检查。MetaInAlarm 是一个抽象类，其中记录了监控指标的一些元数据信息，在接收到一个 Metrics 对象的时候，server-alarm-plugin 插件会将其按照指所属实体进行分类，并转换成相应类型的 MetaInAlarm 实现。OAP 默认提供了三个实现类，如下图所示：


<Image alt="Drawing 0.png" src="https://s0.lgstatic.com/i/image/M00/29/C6/CgqCHl77FaKAbZTaAAC4W_ZFMnE073.png"/> 


为了方便后续介绍，这里就以前面 alarm-settings.yml 示例文件中配置的service_resp_time_rule 告警规则为例，重点介绍 demo-webapp 的 service_resp_time 指标在告警流程中的处理。ServiceRespTimeMetrics 属于 Service 级别的监控指标，对应 ServiceMetaInAlarm 实现，其中记录了 serviceId（id 字段）、serviceName（name 字段） 以及指标名（metricsName 字段）。

MetaInAlarm.equals() 方法中会比较实现类的 getId0() 以及 getId1() 方法返回值，其中 getId0() 方法返回就是 id 字段，在上例 ServiceMetaInAlarm 比较的就是 serviceId，getId1() 方法是个预留的方法，在 id 无法作为唯一标识的时候使用，例如，ServiceRelationServerCpmMetrics 这种 Relation 类型的监控指标，需要两个 serviceId 才能唯一标识，目前 OAP 没有提供 Relation 监控对应的 MetaInAlarm 实现，已有的三个实现类 getId1() 方法都会返回 0。

在 Window 中会记录指定时间窗口内监控数据，并且会根据这些数据检测是否触发告警。Window 的核心字段如下：

```java
private int period;  // 告警检查的时间窗口
// 长度固定为period的List，其中每个元素对应一分钟的监控值
private LinkedList<Metrics> values; 
private LocalDateTime endTime; // 最后一次进行告警检查的时间
private int counter; // 当前达到告警阈值的次数
private int silenceCountdown; // 当前剩余的沉默周期数
```

Window 中有三个核心方法。

* moveTo(LocalDateTime) 方法：根据传入时间与 endTime 的差值更新 values 集合。

* add(Metrics) 方法：将指定监控数据更新到 values 集合中相应的位置。

* checkAlarm() 方法：根据 values 集合中记录的监控数据进行告警检查，并返回相应的告警消息。

下面继续以 service_resp_time_rule 规则为例介绍 RunningRule 结构以及 Window 的工作原理，下图为 RunningRule 的核心结构：


<Image alt="Drawing 1.png" src="https://s0.lgstatic.com/i/image/M00/29/BB/Ciqc1F77FbCAD42wAAFrmYbteBM986.png"/> 


下面是 18:30\~18:31 这两分钟内，demo-webapp 服务对应的 Window 的变化情况。在图【1】中，该 Wondow 会调用 moveTo() 方法将 values 集合中的全部元素填充为 null，更新 endTime 为 18:30。同样是在 18:30 这一分钟内，该 RunningRule 收到了 18:30 对应的 service_resp_time 监控点，如图【2】所示，会通过 Window.add() 方法将其记录到 values 集合中：


<Image alt="Drawing 2.png" src="https://s0.lgstatic.com/i/image/M00/29/CA/CgqCHl77Gk2AMA0ZAALbFV-nsm8496.png"/> 


随着时间的流逝，时间来到 18:31 分，AlarmCore 的后台 check 线程检查到距上次告警检查已经过去 1 分钟，会首先调用 moveTo() 方法更新该 Window 的 endTime 字段并更新 values（即抛弃最老的监控数据），如下图所示：


<Image alt="Drawing 3.png" src="https://s0.lgstatic.com/i/image/M00/29/CA/CgqCHl77GlSAV1j5AAEkL4shzy4313.png"/> 


后台 check 线程完成 values 集合更新后会立即调用该 Window.checkAlarm() 方法进行告警检查，此时只有一个监控点且未达到阈值，不会触发告警。之后（还是在 18:31 这一分钟内）会收到新的监控点，如下图所示，同样会通过 Window.add() 记录到 values 集合中：


<Image alt="Drawing 4.png" src="https://s0.lgstatic.com/i/image/M00/29/BE/Ciqc1F77GnOAGvmhAAJEKxLQ3E4580.png"/> 


后台 check 线程在 18:32 分的行为类似，会更新 Window.endTime、更新 values 集合并进行告警检查，如下图所示，此时只有 18:31 分这一个点超过告警阈值，当前时间窗口依然不符合触发告警的条件。


<Image alt="Drawing 5.png" src="https://s0.lgstatic.com/i/image/M00/29/CA/CgqCHl77GnqATDeMAACt8uwPp9k199.png"/> 


在后续两分钟里，demo-webapp 服务的耗时都为 2s，下图展示了该 Window 在这两分钟的对应变化：


<Image alt="Drawing 6.png" src="https://s0.lgstatic.com/i/image/M00/29/CA/CgqCHl77GoKAWDomAAKwgRmNiQc249.png"/> 


在 18：34 分的检查中首次满足告警条件，即当前时间窗口内有 3 个点超过 2s。

demo-webapp 服务在接下来两分钟的耗时分别为 1s 和 2s，该 Window 对应的变化如下图所示：


<Image alt="Drawing 7.png" src="https://s0.lgstatic.com/i/image/M00/29/BE/Ciqc1F77GouAKUjQAAKMsltdt1Y452.png"/> 


在 18:34\~18:36 连续 3 次检查都符合了告警条件，此时才会真正发送告警信息。之后会进入 2 分钟的沉默期，如下图所示，虽然 18:37 和 18:38 两次检查都符合告警条件，但因为此时在沉默期内，都不会告警消息。


<Image alt="Drawing 8.png" src="https://s0.lgstatic.com/i/image/M00/29/CA/CgqCHl77GpOAASBGAAMmjzGJu0o957.png"/> 


此时已经连续累积了 4 个时间窗口符合告警条件，接下来的 18:39 分检查结果无论是否符合告警条件，都会发送告警消息出去，并再次进入 2 分钟的沉默期，该过程与上述过程类似，不再展开描述。

通过分析 demo-webapp 响应时间的告警流程，相信你可以轻松地理解 server-alarm-plugin 插件告警的核心原理，具体的代码实现就留给你自己分析了。

### NotifyHandler

在前面的章节中详细地介绍了 MetricsStreamProcessor 处理监控指标的核心逻辑，它会根据配置创建 Minute、Hour、Day、Month 四种不同 DownSampling 粒度的 MetricsPersistentWorker，分别对应 minutePersistentWorker、hourPersistentWorker、dayPersistentWorker、monthPersistentWorker，其中 minutePersistentWorker 与其他逻辑三个 MetricsPersistentWorker 对象相比，除了 DownSampling 粒度不同之外，还多封装了两个 Worker ------ AlarmNotifyWorker 和 ExportWorker。

从名字就能看出 AlarmNotifyWorker 与告警相关，OAP 收到的监控点就是通过该 Worker 进入上述告警流程的。当收到一个监控点（即 Metrics 对象）时，会经过如下组件：


<Image alt="9.png" src="https://s0.lgstatic.com/i/image/M00/29/BE/Ciqc1F77GrGAeKDVAAA2LYgGcXw505.png"/> 


其中 AlarmNotifyWorker、AlarmEnhance 只是简单地转发了 Metrics 对象，并没有做什么特殊处理， NotifyHandler.notfiy() 方法是根据 Metrics 分类创建相应 MetaInAlarm 对象的地方，MetaInAlarm 的相关内容在前面已经介绍过了，这里不再展开。

在介绍 Service 注册的章节中提到，AnnotationScan 是 OAP 中的注解扫描器，它上面可以注册多个 AnnotationListener 监听器。AnnotationScan 扫描 classpath 时候，会根据类上的注解，从注册的 AnnotationListener 集合中找到匹配的 AnnotationListener 进行处理。其中就包括前面介绍的 StreamAnnotationListener，它就是用来处理 @Stream 注解的，StreamAnnotationListener 会按照 @Stream 注解中 processor 属性指定的对应 StreamProcessor 实现（例如前面介绍的 InventoryStreamProcessor、MetricsStreamProcessor 等）为该 @Stream 注解修饰的类创建相应的 Worker 链。

这里要介绍是另一个 AnnotationListener 实现------ DefaultScopeDefine.Listener，它处理的是 @ScopeDeclaration 注解，它会根据 @ScopeDeclaration 注解的 catalog 属性将 Metrics 实现分为 Service、ServiceInstance、Endpoint 三类，对应 MetaInAlarm 的三个具体实现。

完成 MetaInAlaram 的创建之后，NotifyHandler.notify() 方法会将根据 metricsName 从 AlarmCore 中查询相应的 RunningRule，并将监控数据传入其中，执行前面介绍的告警流程，相关实现如下：

```java
public void notify(Metrics metrics) {
    ... ... // 省略 Metrics 分类检查以及 MetaInAlarm 的创建过程
    // 根据 metricsName 查找相应的告警规则
    List<RunningRule> runningRules = core.findRunningRule(meta.getMetricsName());
    if (runningRules == null) {
        return;
    }
    // 由 RunningRule 处理后续告警流程
    runningRules.forEach(rule -> rule.in(metaInAlarm, metrics));
}
```

### 发送告警消息

前文在分析 AlarmCore 启动的后台 check 线程时看到，它会在完成所有告警检查之后，由 AlarmCallback 处理所有告警消息。目前 server-alarm-plugin 提供了两个 AlarmCallback 实现，如下图所示：


<Image alt="Drawing 10.png" src="https://s0.lgstatic.com/i/image/M00/29/BE/Ciqc1F77GruAGZICAAHBhdHdoB8058.png"/> 


其中 WebhookCallback 是通过 Webhook 的方式将告警消息发送到 SkyWalking Rocketbot。AlarmStandardPersistence 则会将告警消息持久化到 ElasticSearch 中，后续可以通过 query-graphql-plugin 插件提供的接口查询。

#### WebhookCallback

Webhook 是常见的事件监听方式之一，它允许第三方应用监听系统的某些特定事件。例如这里的发送告警消息，当告警被触发之后，WebhookCallback 会通过 HTTP POST 方式将告警消息发送到第三方应用指定的 URL 地址，第三方应用通过监听该地址获取告警消息并展示给用户。再例如，在 Gitlab 中也提供了 Webhook 的功能，用户可以使用 Webhook 监听项目代码的 Push 事件，触发 Jenkins 的自动打包和部署。

在 alarm-settings.yml 文件中除了可以配置告警规则，还可以配置 WebhookCallback 请求的 URL 地址，如下所示：

```dart
rules:
  # 前文介绍的告警配置(略)
webhooks: # 可以配置多个 URL
  - http://127.0.0.1/notify/
  - http://127.0.0.1/go-wechat/
```

在 NotifyHandler 初始化过程中会创建 WebhookCallback 对象。WebhookCallback 底层是通过 HttpClient 发送 Post 请求的，核心实现在 doAlarm() 方法，如下所示（省略的 try/catch 等异常处理的相关代码）：

```java
// 创建 HttpClient
CloseableHttpClient httpClient = HttpClients.custom().build();
// remoteEndpoints集合就是 alarm-settings.yml 文件中配置的 URL
remoteEndpoints.forEach(url -> {
    HttpPost post = new HttpPost(url); // 创建 HttpPost请求
     // 配置请求的超时信息，ConnectionTimeOut、RequestTimeOut以及SocketTimeOut都是1s
    post.setConfig(requestConfig);
    post.setHeader("Accept", "application/json");
    post.setHeader("Content-type", "application/json");
    // 生成JSON格式的告警信息
    StringEntity entity = new StringEntity(gson.toJson(alarmMessage));
    post.setEntity(entity);
    // 发送请求
    CloseableHttpResponse httpResponse = httpClient.execute(post);
    // 检查 Http 响应码
    StatusLine statusLine = httpResponse.getStatusLine();
    if (statusLine != null && statusLine.getStatusCode() != 200) {
        logger.error("send alarm to " + url + " failure. Response code: " + statusLine.getStatusCode());
    }
});
```

### AlarmStandardPersistence

告警消息除了会通过 WebhookCallback 发送出去之外，还会通过 AlarmStandardPersistence 进行持久化。在收到 AlarmMessage 之后，AlarmStandardPersistence 会将其转换成 AlarmRecord，并交给 RecordStreamProcessor 进行持久化。AlarmRecord 的核心字段与 AlarmMessage 的字段基本一致，RecordStreamProcessror 的处理过程也已经详细分析过了，这里不再展开。


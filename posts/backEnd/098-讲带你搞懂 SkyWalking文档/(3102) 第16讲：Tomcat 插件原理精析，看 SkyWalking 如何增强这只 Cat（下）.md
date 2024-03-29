# 第16讲：Tomcat插件原理精析，看SkyWalking如何增强这只Cat（下）

#### TomcatInstrumentation

回顾完 ClassEnhancePluginDefine 抽象类的相关设计，我们回到 tomcat-7.x-8.x-plugin 插件中继续分析 TomcatInstrumentation 这个插件类，重点关注四个问题：拦截哪个类、拦截哪个方法、由谁进行增强、具体增强逻辑。

先来看 enhanceClass()方法，它返回的 ClassMatch 匹配了拦截的类名：

```java
protected ClassMatch enhanceClass() { // 拦截Tomcat的StandardHostValve类
    return byName("org.apache.catalina.core.StandardHostValve");
}
```

TomcatInstrumentation.getConstructorsInterceptPoints() 方法返回为 null，  

不会拦截 StandardHostValve 的构造方法。getInstanceMethodsInterceptPoints() 返回了两个实例方法增强点（InstanceMethodsInterceptPoint 对象），其中一个是拦截 invoke() 方法，相关实现如下：

```java
new InstanceMethodsInterceptPoint() {
    public ElementMatcher<MethodDescription> getMethodsMatcher() {
        return named("invoke"); // 拦截名为invoke的方法
    }

    public String getMethodsInterceptor() {
        return "org.apache.skywalking.apm.plugin.tomcat78x
             .TomcatInvokeInterceptor"; // 拦截后的增强逻辑
    }

    public boolean isOverrideArgs() {
        return false; // 不修改invoke()方法的参数
    }
}
```

TomcatInvokeInterceptor 实现了 InstanceMethodsAroundInterceptor 接口，定义了具体的增强逻辑，你可以回顾一下 InstMethodsInter 实现类，它会在目标方法前后调用 InstanceMethodsAroundInterceptor 实现的 beforeMethod() 方法、handleMethodException  

() 方法以及 afterMethod() 方法。

下面是关于 TomcatInvokeInterceptor.beforeMethod() 方法三种场景的考虑：

1. 当 Tomcat 作为用户请求接入层的场景时，如下图所示：


<Image alt="1.png" src="https://s0.lgstatic.com/i/image/M00/00/AF/CgqCHl6qTfmAEU6RAAC170V3ef8022.png"/> 


此时请求没有与任何 Trace 关联，也就不会携带 ContextCarrier 请求头，beforeMethod() 方法中会创建全新的 TracingContext 以及 EntrySpan。

2. tomcat-7.x-8.x-plugin 插件被嵌套在其他插件之后的场景，如下图所示：


<Image alt="2.png" src="https://s0.lgstatic.com/i/image/M00/00/AF/CgqCHl6qTheAD0FbAADiLfWhOis706.png"/> 


此时请求在经过其他插件的时候，已经创建了关联的 TracingContext 以及 EntrySpan，beforeMethod() 方法无需创建 TracingContext，只需重新调用 EntrySpan 的 start() 方法即可。

3. Tomcat 作为下游系统被其他系统调用的场景，如下图所示：


<Image alt="3.png" src="https://s0.lgstatic.com/i/image/M00/00/AF/CgqCHl6qTi-AFnZOAADQxYkP_ok501.png"/> 


此时请求已经在上游系统中关联了 Trace，在跨进程 HTTP 调用时就会携带 ContextCarrier 请求头，在 TomcatInstrumentation 的 beforeMethod() 方法中进行反序列化，并填充到全新的 TracingContext 中，还会新建 EntrySpan 并调用其 start() 方法。

TomcatInvokeInterceptor.beforeMethod() 方法同时支持了上述三种场景，它首先会尝试从 HttpServletRequest 请求头中查找 ContextCarrier 请求头，如果存在则进行反序列化操作。然后，查找（或创建）请求关联的 TracingContext 以及 EntrySpan。最后会记录 Tags 信息以及Component 信息。具体代码实现如下：

```java
public void beforeMethod(EnhancedInstance objInst, Method method, 
      Object[] allArguments, Class<?>[] argumentsTypes, 
           MethodInterceptResult result) throws Throwable {
    // invoke()方法的第一个参数就是HttpServletRequest对象
    HttpServletRequest request = (HttpServletRequest)allArguments[0];
    // 创建一个空的ContextCarrier对象
    ContextCarrier contextCarrier = new ContextCarrier();
    // 从Http请求头中反序列化ContextCarrier
    CarrierItem next = contextCarrier.items();
    while (next.hasNext()) {
        next = next.next();
        next.setHeadValue(request.getHeader(next.getHeadKey()));
    }
    // 获取当前线程绑定的TracingContext，如果未绑定则会创建新TracingContext并
    // 绑定，同时还会创建EntrySpan，如果已存在EntrySpan，则再次调用其start()方
    // 法 。这里的第一个参数是operationName(即EndpointName)，Tomcat的场景下
    // 就是请求的 URI。
    AbstractSpan span = ContextManager.createEntrySpan(
        request.getRequestURI(), contextCarrier);
    // 为EntrySpan添加Tags，记录请求的URL以及Method信息
    Tags.URL.set(span, request.getRequestURL().toString());
    Tags.HTTP.METHOD.set(span, request.getMethod());
    span.setComponent(ComponentsDefine.TOMCAT); // 设置component字段
    SpanLayer.asHttp(span); // 设置layer字段
}
```

在前面的课时中我们已经详细介绍了 ContextManager、TracingContext 以及 EntrySpan 的实现原理，这里不再展开，你可以回顾第 11 课时和第 13 课时中的相关内容。

#### 再探 ContextCarrier

在 TomcatInvokeInterceptor 反序列化 ContextCarrier 的逻辑中，没有看到 deserialize() 方法的调用，而是看到 CarrierItem 这个类。在 SkyWalking 的 3.x 版本和 6.x 版本中，CarrierContext 的序列化格式略有区别（V1 版本和 V2 版本），我们可以通过 CarrierItem 同时兼容两个版本的格式。CarrierItem 的继承关系如下图所示：


<Image alt="4.png" src="https://s0.lgstatic.com/i/image/M00/00/BB/CgqCHl6qZFmASH0MAABQy3R7qxw376.png"/> 


先来看序列化过程，ContextCarrier.items() 方法会根据 ACTIVE_V2_HEADER 配置以及 ACTIVE_V1_HEADER 配置决定当前 Agent 支持哪个版本的格式（也可以同时支持），下图展示了在同时支持 V1、V2 两个版本序列化格式时，ContextCarrier.items() 方法创建的 CarrierItem 链表：


<Image alt="image (3).png" src="https://s0.lgstatic.com/i/image/M00/00/BB/Ciqc1F6qZHCAW4yoAAFesp2L980140.png"/> 


在 CarrierItem 中有 headKey 和 headValue 两个核心字段，其中 headKey 由 agent.namespace 和版本标记两部分构成，headValue 则是 ContextCarrier 按照相应版本格式序列化后得到的字符串。下面是 SW6CarrierItem 的构造方法：

```java
public SW6CarrierItem(ContextCarrier carrier, CarrierItem next) {
super(HEADER\_NAME, // headKey
// 按照V2版本序列化得到headValue
carrier.serialize(ContextCarrier.HeaderVersion.v2),
next); // 下一个CarrierItem节点
this.carrier = carrier; // 记录关联的ContextCarrier对象
}
```

上图中的 CarrierItemHead 只是链表的头节点，不携带任何有效信息。

通过 CarrierContext.item() 方法拿到 CarrierItem 链表之后，CarrierItemHead 就可以将其中每个 CarrierItem 作为附件信息添加到跨进程调用的请求中，例如，添加到 HTTP 请求头中，其中 headKey 作为 HttpHeader 的 Key，headValue 作为 HttpHeader 的 Value。

在处理 HTTP 请求的服务端，例如本课时分析的 tomcat-7.x-8.x-plugin 插件中，会根据当前 Agent 支持的版本，从相应 HttpHeader 中，按照拿到的 ContextCarrier 字符串，反序列化填充 ContextCarrier 对象，所以才会有 TomcatInvokeInterceptor.beforeMethod() 方法中的这段代码片段：

```java
// 创建空的ContextCarrier对象
ContextCarrier contextCarrier = new ContextCarrier();
// 创建CarrierItem链表，因为ContextCarrier对象是空的，所以链表也是空的
CarrierItem next = contextCarrier.items();
while (next.hasNext()) {
next = next.next();
// 拿到HttpHeader的Value，即对应版本的ContextCarrier序列化字符串
next.setHeadValue(request.getHeader(next.getHeadKey()));
}
```

在 SW6CarrierItem.setHeaderValue() 方法中会调用 ContextCarrier.deserialize() 方法，并按照 V2 版本的格式对 ContextCarrier 字符串进行解析，同时填充 ContextCarrier 对象的相应字段。SW3CarrierItem.setHeaderValue() 方法的实现与上述过程类似。

到此，TracingContext 的跨进程传播流程已经梳理完成了，相信你对此处的逻辑也已经有了清晰的认知。

请求经过 beforeMethod() 方法处理之后，会继续调用 StandardHostValve.invoke() 这个目标方法。 在 invoke() 方法返回之后，继续执行 TomcatInvokeInterceptor.afterMethod() 的后置处理，请求会调用当前 stopSpan() 关闭当前 Span（即前面创建的 EntrySpan），同时会根据 HTTP 响应码在 Span 中标记该请求是否发生异常，记录相关 Tags 信息等，具体实现如下：

```java
public Object afterMethod(EnhancedInstance objInst, Method method,
Object[] allArguments, Class<?>[] argumentsTypes,
Object ret) throws Throwable {
// invoke()方法的第二个参数是 HttpServletResponse
HttpServletResponse response =
(HttpServletResponse)allArguments[1];
// 获取当前Span，因为TracingContext是栈的形式管理Span，当前Span即为
// beforeMethod()方法中创建的EntrySpan
AbstractSpan span = ContextManager.activeSpan();
if (response.getStatus() >= 400) {
// 如果响应码是4xx或是5xx，则表示Http响应异常，标记当前Span的
// errorOccurred字段，并记录一个Key为status\_code的Tag
span.errorOccurred();
Tags.STATUS\_CODE.set(span,
Integer.toString(response.getStatus()));
}
// 关闭当前EntrySpan，如果EntrySpan完全关闭，则整个Span栈为空，
// 所在的TraceSegment也将随之关闭，这些逻辑在前面已经详细介绍过了
ContextManager.stopSpan();
// 从RuntimeContext中清理FORWARD\_REQUEST\_FLAG信息，其含义后面再说
ContextManager.getRuntimeContext().remove(
Constants.FORWARD\_REQUEST\_FLAG);
return ret;
}
```

最后，在 StandardHostValve.invoke() 方法处理请求抛出异常时，TomcatInvokeInterceptor.handleMethodException() 方法会在当前 Span 中记录 Log 信息，并通过 Span 的 errorOccurred 字段标记该请求处理异常。

#### ApplicationDispatcherInstrumentation

如果你了解 Java Web 编程，就会知道 Servlet 中有 forward（直接请求转发） 和 redirect（间接请求转发） 两种跳转方式。

redirect 跳转，也叫重定向，它一般用于避免用户的非正常访问，例如，在用户没有登录的情况下访问后台资源，Servlet 可以将该 HTTP 请求重定向到登录页面，让用户进行登录操作。在Servlet 中，redirect 会通过调用 response 对象的 sendRedirect() 方法，告诉浏览器重定向，访问指定的 URL，示例代码如下：

```java
public void doGet(HttpServletRequest request,
HttpServletResponse response){
response.sendRedirect("跳转到的目标URL");
}
```

下图展示了 redirect 跳转的流程：


<Image alt="image (4).png" src="https://s0.lgstatic.com/i/image/M00/00/BB/CgqCHl6qZNuANBrFAAHuLLyTujQ360.png"/> 


注意，redirect 跳转可以跳转到任意 URL，Servlet 1 和 Servlet 2 不一定要在一个 Webapp 中。

在 Tomcat 的代码实现中，我们可以看到 org.apache.catalina.connector.Response 这个类对 sendRedirect() 方法的实现，它会将响应状态码设置成 302（或307） ，并设置 Location 这个 Header 指明跳转的目标地址，相关实现片段如下：

```java
public void sendRedirect(String location, int status) {
try {
String locationUri = ...; // 获取 redirectUrl
setStatus(status); // 状态码设置为302或是307
setHeader("Location", locationUri);
if (getContext().getSendRedirectBody()) { // 返回ResponseBody
...
}
} catch (IllegalArgumentException e) {
setStatus("404");
}
setSuspended(true); // Cause the response to be finished
}
```

forward 跳转是 Webapp 内部的跳转，对用户来说是无感知的，跳转期间不会返回响应，用户浏览器的 URL 地址栏也不会发生变化。注意，forward 跳转无法跨越多个 Webapp。forward 跳转的具体流程如下所示：


<Image alt="image (5).png" src="https://s0.lgstatic.com/i/image/M00/00/BC/CgqCHl6qZcmAJZYZAAGM2VAIvQ8947.png"/> 


实际的 forward 跳转代码如下所示：

```java
public void doGet(HttpServletRequest request ,
HttpServletResponse response){
// 获取请求转发器对象，该转发器的指向通过getRequestDisPatcher()的参数设置
RequestDispatcher requestDispatcher =
request.getRequestDispatcher("Servler2的地址");
// 调用forward()方法，转发请求
requestDispatcher.forward(request,response);
}
```

RequestDispatcher 是 Java Servlet 规范中规定的一个接口，在 Tomcat 的代码中，ApplicationDispatcher 实现了 RequestDispatcher 接口。在 forward() 方法实现中，会根据指定的目标创建一个新的 Request 请求并交给 Context 进行处理，具体实现逻辑较长，如果你感兴趣的话可以去翻看一下具体的实现逻辑。

在 tomcat-7.x-8.x-plugin 插件的 skywalking-plugin.def 配置文件中定义的 ApplicationDispatcherInstrumentation 类，负责拦截 Tomcat 中 ApplicationDispatcher 的全部构造方法以及其 forward()方法，具体的增强逻辑位于 ForwardInterceptor 中。 首先来看 ForwardInterceptor 对构造方法的增强，onConstruct() 方法会将跳转的目标地址记录到增强字段（_$EnhancedClassField_ws）中：

```java
public void onConstruct(EnhancedInstance objInst,
Object[] allArguments) {
// ApplicationDispatcher构造方法的第二个参数为跳转的目标地址，下图所示
objInst.setSkyWalkingDynamicField(allArguments[1]);
}
```


<Image alt="image (6).png" src="https://s0.lgstatic.com/i/image/M00/00/BC/CgqCHl6qZkKAB_A5AABVHOMz99A638.png"/> 


ForwardInterceptor 对 forward() 方法的增强比较简单，会在 beforeMethod() 方法中将跳转 URL 地址作为 Log 记录到当前 Span 中，同时会在 RuntimeContext 中记录 forward 跳转标记：

```java
public void beforeMethod(EnhancedInstance objInst, Method method,
Object[] allArguments, Class<?>[] argumentsTypes,
MethodInterceptResult result) throws Throwable {
AbstractSpan abstractTracingSpan =
ContextManager.activeSpan();
Map\<String, String> eventMap = new HashMap\<String, String>();
eventMap.put("forward-url",
objInst.getSkyWalkingDynamicField() == null ? "" :
String.valueOf(objInst.getSkyWalkingDynamicField()));
// 通过Log的方式记录将跳转URL
abstractTracingSpan.log(System.currentTimeMillis(), eventMap);
ContextManager.getRuntimeContext() // 记录forward标记哦
.put(Constants.FORWARD\_REQUEST\_FLAG, true);
}
```

### 总结

本课时第 1 部分介绍了 Tomcat 的整体架构，帮助你梳理了 Tomcat 处理请求的逻辑。Tomcat 在接收到用户请求时，首先由 Connector 将请求转换成 Request 对象，然后调用容器的 Pipeline 来处理该 Request 对象。Pipeline 由多个自定义 Valve 与标准 Valve 构成，Pipeline 首先会调用自定义 Valve 处理请求，最后标准 Valve 调用子容器，这是典型的责任链模式。整个调用流程如下图所示：


<Image alt="image (7).png" src="https://s0.lgstatic.com/i/image/M00/00/BC/CgqCHl6qZmuASJgqAAHvghToaYo778.png"/> 


当请求经过所有的 Pipeline-Valve 的处理之后，Tomcat 会将返回的结果交给 Connector，Connector 会通过底层的 Socket 连接将响应结果返回给用户。

理清 Tomcat 架构之后，本课时的第 2 部分深入介绍了 tomcat-7.x-8.x-plugin 插件对 StandardHostValve 中 invoke() 方法的增强，同时还深入讲解了 ContextCarrier 同时支持多个序列化版本的实现原理。最后介绍了 forward 跳转、redirect 跳转的原理，以及 tomcat-7.x-8.x-plugin 插件对 forward 跳转的处理。


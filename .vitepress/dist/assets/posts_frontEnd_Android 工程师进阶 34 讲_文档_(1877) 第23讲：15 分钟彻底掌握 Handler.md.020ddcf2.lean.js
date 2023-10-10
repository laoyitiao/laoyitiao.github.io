import{_ as o,j as t,o as r,g as i,k as n,h as s,s as e,Q as l}from"./chunks/framework.cfb14fe0.js";const ge=JSON.parse('{"title":"第23讲：15 分钟彻底掌握 Handler","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1877) 第23讲：15 分钟彻底掌握 Handler.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1877) 第23讲：15 分钟彻底掌握 Handler.md","lastUpdated":1696682708000}'),p={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1877) 第23讲：15 分钟彻底掌握 Handler.md"},d=e("h1",{id:"第23讲-15-分钟彻底掌握-handler",tabindex:"-1"},[s("第23讲：15 分钟彻底掌握 Handler "),e("a",{class:"header-anchor",href:"#第23讲-15-分钟彻底掌握-handler","aria-label":'Permalink to "第23讲：15 分钟彻底掌握 Handler"'},"​")],-1),g=e("p",null,"本课时我们一起分析 Android Handler 的源码。",-1),c=e("p",null,"Handler 现在几乎是 Android 面试的必问知识点了，大多数 Android 工程师都在项目中使用过 Handler。主要场景是子线程完成耗时操作的过程中，通过 Handler 向主线程发送消息 Message，用来刷新 UI 界面。这节课我们来了解 Handler 的发送消息和处理消息的源码实现。",-1),h=e("p",null,"分析源码的时候最好是找到一个合适的切入点，Handler 源码的一个切入点就是它的默认构造器。",-1),_=e("h3",{id:"从-new-handler-开始",tabindex:"-1"},[s("从 new Handler() 开始 "),e("a",{class:"header-anchor",href:"#从-new-handler-开始","aria-label":'Permalink to "从 new Handler() 开始"'},"​")],-1),u=e("p",null,"在无参构造器里调用了重载的构造方法并分别传入 null 和 false。并且在构造方法中给两个全局变量赋值：mLooper 和 mQueue。",-1),M=e("p",null,"这两者都是通过 Looper 来获取，具体代码如下：",-1),m=e("p",null,"可以看出，myLooper 通过一个线程本地变量中的存根，然后 mQueue 是 Looper 中的一个全局变量，类型是 MessageQueue 类型。",-1),A=e("p",null,"接下来的分析重点就是这个 Looper 是什么？以及何时被初始化？",-1),L=e("h3",{id:"looper-介绍",tabindex:"-1"},[s("Looper 介绍 "),e("a",{class:"header-anchor",href:"#looper-介绍","aria-label":'Permalink to "Looper 介绍"'},"​")],-1),C=e("p",null,[s("不知你有没有思考过一个问题，启动一个 Java 程序的入口函数是 main 方法，但是当 main 函数执行完毕之后此程序停止运行，也就是进程会自动终止。但是当我们打开一个 Activity 之后，只要我们不按下返回键 Activity 会一直显示在屏幕上，也就是 Activity 所在进程会一直处于"),e("strong",null,"运行状态"),s("。实际上 Looper 内部维护一个无限循环，保证 App 进程持续进行。")],-1),H=e("h3",{id:"looper初始化",tabindex:"-1"},[s("Looper初始化 "),e("a",{class:"header-anchor",href:"#looper初始化","aria-label":'Permalink to "Looper初始化"'},"​")],-1),Q=e("p",null,"在第 19 课时分析 Activity 启动过程时有介绍，ActivityThread 的 main 方法是一个新的 App 进程的入口，其具体实现如下：",-1),f=e("p",null,"解释说明：",-1),b=e("ul",null,[e("li",null,"图中 1 处就是初始化当前进程的 Looper 对象；"),e("li",null,"图中 2 处调用 Looper 的 loop 方法开启无限循环。")],-1),w=e("p",null,"prepareMainLooper 方法如下：",-1),D=e("p",null,"这里我没有省略任何一行代码，因为此处的代码很精简但是每一行又都有意义。",-1),q=e("p",null,"图中 1 处在 prepareMainLooper 中调用 prepare 方法创建 Looper 对象，仔细查看发现其实就是 new 出一个 Looper。核心之处在于将 new 出的 Looper 设置到了线程本地变量 sThreadLocal 中。也就是说创建的 Looper 与当前线程发生了绑定。",-1),y=e("p",null,"Looper 的构造方法如下：",-1),B=e("p",null,"可以看出，在构造方法中初始化了消息队列 MessageQueue 对象。",-1),T=e("p",null,"prepare 方法执行完之后，会在图中 3 处调用 myLooper() 方法，从 sThreadLocal 中取出 Looper 对象并赋值给 sMainLooper 变量。",-1),k=e("p",null,[e("strong",null,"注意"),s("：")],-1),v=e("p",null,[s("图中 2 处在创建 Looper 对象之前，会判断 sThreaLocal 中是否已经绑定过 Looper 对象，如果是则抛出异常。"),e("strong",null,"这行代码的目的是确保在一个线程中 Looper.prepare() 方法只能被调用 1 次"),s("。比如以下代码：")],-1),P=e("p",null,"执行上述代码程序会秒崩，打印日志如下：",-1),x=l("",7),R=e("p",null,"很显然，loop 方法中执行了一个死循环，这也是一个 Android App 进程能够持续运行的原因。",-1),N=e("p",null,"图中 1 处不断地调用 MessageQueue 的 next 方法取出 Message。如果 message 不为 null 则调用图中 2 处进行后续处理。具体就是从 Message 中取出 target 对象，然后调用其 dispatchMessage 方法处理 Message 自身。那这个 target 是谁呢？查看 Message.java 源码可以看出 target 就是 Handler 对象，如下所示：",-1),I=e("p",null,"Handler 的 dispatchMessage 方法如下：",-1),U=e("p",null,"可以看出，在 dispatchMessage 方法中会调用一个空方法 handleMessage，而这个方法也正是我们创建 Handler 时需要覆盖的方法。那么 Handler 是何时将其设置为一个 Message 的 target 的呢？",-1),E=e("h3",{id:"handler-的-sendmessage-方法",tabindex:"-1"},[s("Handler 的 sendMessage 方法 "),e("a",{class:"header-anchor",href:"#handler-的-sendmessage-方法","aria-label":'Permalink to "Handler 的 sendMessage 方法"'},"​")],-1),S=e("p",null,"Handler 有几个重载的 sendMessage 方法，但是基本都大同小异。我用最普通的 sendMessage 方法来分析，代码具体如下：",-1),V=e("p",null,"可以看出，经过几层调用之后，sendMessage 最终会调用 enqueueMessage 方法将 Message 插入到消息队列 MessageQueue 中。而这个消息队列就是我们刚才分析的在 ActivityThread 的 main 方法中通过 Looper 创建的 MessageQueue。",-1),O=e("h3",{id:"handler-的-enqueuemessage-方法",tabindex:"-1"},[s("Handler 的 enqueueMessage 方法 "),e("a",{class:"header-anchor",href:"#handler-的-enqueuemessage-方法","aria-label":'Permalink to "Handler 的 enqueueMessage 方法"'},"​")],-1),F=e("p",null,"可以看出：",-1),J=e("ul",null,[e("li",null,"在图中 1 处 enqueueMessage 方法中，将 Handler 自身设置为 Message的target 对象。因此后续 Message 会调用此 Handler 的 dispatchMessage 来处理；"),e("li",null,"图中 2 处会判断如果 Message 中的 target 没有被设置，则直接抛出异常；"),e("li",null,"图中 3 处会按照 Message 的时间 when 来有序得插入 MessageQueue 中，可以看出 MessageQueue 实际上是一个有序队列，只不过是按照 Message 的执行时间来排序。")],-1),K=e("p",null,"至此 Handler 的发送消息和消息处理流程已经介绍完毕，接下来看几个面试中经常被问到的与 Handler 相关的题目。",-1),j=e("h3",{id:"handler-的-post-runnable-与-sendmessage-有什么区别",tabindex:"-1"},[s("Handler 的 post(Runnable) 与 sendMessage 有什么区别 "),e("a",{class:"header-anchor",href:"#handler-的-post-runnable-与-sendmessage-有什么区别","aria-label":'Permalink to "Handler 的 post(Runnable) 与 sendMessage 有什么区别"'},"​")],-1),z=e("p",null,"看一下 post(Runnable) 的源码实现如下：",-1),G=e("p",null,"实际上 post(Runnable) 会将 Runnable 赋值到 Message 的 callback 变量中，那么这个 Runnable 是在什么地方被执行的呢？Looper 从 MessageQueue 中取出 Message 之后，会调用 dispatchMessage 方法进行处理，再看下其实现：",-1),W=e("p",null,"可以看出，dispatchMessage 分两种情况：",-1),$=e("ol",null,[e("li",null,"如果 Message 的 Callback 不为 null，一般为通过 post(Runnabl) 方式，会直接执行 Runnable 的 run 方法。因此这里的 Runnable 实际上就是一个回调接口，跟线程 Thread 没有任何关系。"),e("li",null,"如果 Message 的 Callback 为 null，这种一般为 sendMessage 的方式，则会调用 Handler 的 hanlerMessage 方法进行处理。")],-1),Y=e("p",null,[e("strong",null,"Looper.loop() 为什么不会阻塞主线程")],-1),Z=e("p",null,"刚才我们了解了，Looper 中的 loop 方法实际上是一个死循环。但是我们的 UI 线程却并没有被阻塞，反而还能够进行各种手势操作，这是为什么呢？在 MessageQueue 的 next 方法中，有如下一段代码：",-1),X=e("p",null,[s("nativePollOnce 方法是一个 native 方法，当调用此 native 方法时，主线程会释放 CPU 资源进入休眠状态，直到下条消息到达或者有事务发生，通过往 pipe 管道写端写入数据来唤醒主线程工作，这里采用的 epoll 机制。关于 nativePollOnce 的详细分析可以参考："),e("a",{href:"https://www.kancloud.cn/alex_wsc/android-deep2/413394",target:"_blank",rel:"noreferrer"},"nativePollOnce函数分析"),s("。")],-1),ee=e("h3",{id:"handler-的-sendmessagedelayed-或者-postdelayed-是如何实现的",tabindex:"-1"},[s("Handler 的 sendMessageDelayed 或者 postDelayed 是如何实现的 "),e("a",{class:"header-anchor",href:"#handler-的-sendmessagedelayed-或者-postdelayed-是如何实现的","aria-label":'Permalink to "Handler 的 sendMessageDelayed 或者 postDelayed 是如何实现的"'},"​")],-1),se=e("p",null,"之前我已经介绍过，在向 MessageQueue 队列中插入 Message 时，会根据 Message 的执行时间排序。而消息的延时处理的核心实现是在获取 Message 的阶段，接下来看下 MessageQueue 的 next 方法。",-1),ae=l("",4);function ne(le,oe,te,re,ie,pe){const a=t("Image");return r(),i("div",null,[d,g,c,h,_,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/1B/CC/CgqCHl7fQd2ANylrAAJuLR5zu0k931.png"}),s(),u,M,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/1B/CC/CgqCHl7fQeSAQBZAAAB4NOhhh9U599.png"}),s(),m,A,L,C,H,Q,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/1B/C1/Ciqc1F7fQfGAVPtfAAJYK7Tmh_o873.png"}),s(),f,b,w,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/1B/CD/CgqCHl7fQjWAR3Q-AAK5dlc_5mM274.png"}),s(),D,q,y,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/1B/CD/CgqCHl7fQjyAeVt9AABjclbZivQ040.png"}),s(),B,T,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/1B/CD/CgqCHl7fQkWASNQUAABHck7yJJQ286.png"}),s(),k,v,n(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/1B/C1/Ciqc1F7fQkyAbmLLAADFNEwNOZw252.png"}),s(),P,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/1B/C1/Ciqc1F7fQlOAVw0MAAKdzfUus70602.png"}),s(),x,n(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/1B/C1/Ciqc1F7fQlyAJUK5AAO0v8INUxQ853.png"}),s(),R,N,n(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/1B/CD/CgqCHl7fQmOAVKfEAACBfkLYTLI319.png"}),s(),I,n(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/1B/C1/Ciqc1F7fQmmANSf3AAEB0-dfs24152.png"}),s(),U,E,S,n(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/1B/CD/CgqCHl7fQnGAOpvAAAHydqxDjMQ700.png"}),s(),V,O,n(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/1B/C2/Ciqc1F7fQnmALaGYAAULXonPvxo483.png"}),s(),F,J,K,j,z,n(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/1B/C2/Ciqc1F7fQoSAbccXAAC4I5kW5RU026.png"}),s(),G,n(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/1B/CD/CgqCHl7fQoqAdt7dAAEcRaEW5Ac045.png"}),s(),W,$,Y,Z,n(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/1B/C2/Ciqc1F7fQpGAKsbzAAEINuv-lzg977.png"}),s(),X,ee,se,n(a,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/1B/CD/CgqCHl7fQpyABhRKAAHHTc9iME0070.png"}),s(),ae])}const ce=o(p,[["render",ne]]);export{ge as __pageData,ce as default};

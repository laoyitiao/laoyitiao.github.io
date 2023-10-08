import{_ as s,j as n,o as i,g as c,k as a,h as t,Q as l,s as e}from"./chunks/framework.4e7d56ce.js";const ke=JSON.parse('{"title":"第11讲：线程池之刨根问底","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1865) 第11讲：线程池之刨根问底.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1865) 第11讲：线程池之刨根问底.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1865) 第11讲：线程池之刨根问底.md"},p=l('<h1 id="第11讲-线程池之刨根问底" tabindex="-1">第11讲：线程池之刨根问底 <a class="header-anchor" href="#第11讲-线程池之刨根问底" aria-label="Permalink to &quot;第11讲：线程池之刨根问底&quot;">​</a></h1><p>我们在课时 09 介绍 synchronized 原理时，已经了解了 Java 中线程的创建以及上下文切换是比消耗性能的，因此引入了偏向锁、轻量级锁等优化技术，目的就是减少用户态和核心态之间的切换频率。但是在这些优化基础之上，还有另外一个角度值得思考：创建和销毁线程非常损耗性能，那有没有可能复用一些已经被创建好的线程呢？答案是肯定的，那就是线程池。</p><p>另外，线程的创建需要开辟虚拟机栈、本地方法栈、程序计数器等线程私有的内存空间，在线程销毁时需要回收这些系统资源，频繁地创建销毁线程会浪费大量资源，而通过复用已有线程可以更好地管理和协调线程的工作。</p><blockquote><p>线程池主要解决两个问题：</p><p>一、 当执行大量异步任务时线程池能够提供很好的性能。</p><p>二、 线程池提供了一种资源限制和管理的手段，比如可以限制线程的个数，动态新增线程等。</p><p>------《Java并发编程之美》</p></blockquote><h3 id="线程池体系" tabindex="-1">线程池体系 <a class="header-anchor" href="#线程池体系" aria-label="Permalink to &quot;线程池体系&quot;">​</a></h3><p>用一张图来表示线程池体系如下：</p>',6),h=l('<p>解释说明：</p><ul><li><p>Executor 是线程池最顶层的接口，在 Executor 中只有一个 execute 方法，用于执行任务。至于线程的创建、调度等细节由子类实现。</p></li><li><p>ExecutorService 继承并拓展了 Executor，在 ExecutorService 内部提供了更全面的任务提交机制以及线程池关闭方法。</p></li><li><p>ThreadPoolExecutor 是 ExecutorService 的默认实现，所谓的线程池机制也大多封装在此类当中，因此它是本课时分析的重点。</p></li><li><p>ScheduledExecutorService 继承自 ExecutorService，增加了定时任务相关方法。</p></li><li><p>ScheduledThreadPoolExecutor 继承自 ThreadPoolExecutor，并实现了 ScheduledExecutorService 接口。</p></li><li><p>ForkJoinPool 是一种支持任务分解的线程池，一般要配合可分解任务接口 ForkJoinTask 来使用。</p></li></ul><h3 id="创建线程池" tabindex="-1">创建线程池 <a class="header-anchor" href="#创建线程池" aria-label="Permalink to &quot;创建线程池&quot;">​</a></h3><p>为了开发者可以更方便地使用线程池，JDK 中给我们提供了一个线程池的工厂类---Executors。在 Executors 中定义了多个静态方法，用来创建不同配置的线程池。常见有以下几种。</p><h4 id="newsinglethreadexecutor" tabindex="-1">newSingleThreadExecutor <a class="header-anchor" href="#newsinglethreadexecutor" aria-label="Permalink to &quot;newSingleThreadExecutor&quot;">​</a></h4><p>创建一个单线程化的线程池，它只会用唯一的工作线程来执行任务，保证所有任务按先进先出的顺序执行。</p>',6),g=e("p",null,"执行上述代码结果如下，可以看出所有的 task 始终是在同一个线程中被执行的。",-1),d=e("h4",{id:"newcachedthreadpool",tabindex:"-1"},[t("newCachedThreadPool "),e("a",{class:"header-anchor",href:"#newcachedthreadpool","aria-label":'Permalink to "newCachedThreadPool"'},"​")],-1),_=e("p",null,"创建一个可缓存线程池，如果线程池长度超过处理需要，可灵活回收空闲线程，若无可回收，则新建线程。",-1),u=e("p",null,"执行效果如下：",-1),A=e("p",null,"从上面日志中可以看出，缓存线程池会创建新的线程来执行任务。但是如果将代码修改一下，在提交任务之前休眠 1 秒钟，如下：",-1),m=e("p",null,'再次执行则打印日志同 SingleThreadPool 一模一样，原因是提交的任务只需要 500 毫秒即可执行完毕，休眠 1 秒导致在新的任务提交之前，线程 "pool-1-thread-1" 已经处于空闲状态，可以被复用执行任务。',-1),C=e("h4",{id:"newfixedthreadpool",tabindex:"-1"},[t("newFixedThreadPool "),e("a",{class:"header-anchor",href:"#newfixedthreadpool","aria-label":'Permalink to "newFixedThreadPool"'},"​")],-1),x=e("p",null,"创建一个固定数目的、可重用的线程池。",-1),P=e("p",null,"上述代码创建了一个固定数量 3 的线程池，因此虽然向线程池提交了 10 个任务，但是这 10 个任务只会被 3 个线程分配执行，执行效果如下：",-1),T=e("h4",{id:"newscheduledthreadpool",tabindex:"-1"},[t("newScheduledThreadPool "),e("a",{class:"header-anchor",href:"#newscheduledthreadpool","aria-label":'Permalink to "newScheduledThreadPool"'},"​")],-1),S=e("p",null,"创建一个定时线程池，支持定时及周期性任务执行。",-1),b=e("p",null,"上面代码创建了一个线程数量为 2 的定时任务线程池，通过 scheduleAtFixedRate 方法，指定每隔 500 毫秒执行一次任务，并且在 5 秒钟之后通过 shutdown 方法关闭定时任务。执行效果如下：",-1),M=e("p",null,"上面这几种就是常用到的线程池使用方式，但是，在 阿里Java开发手册 中已经严禁使用 Executors 来创建线程池，这是为什么呢？要回答这个问题需要先了解线程池的工作原理。",-1),E=e("h3",{id:"线程池工作原理分析",tabindex:"-1"},[t("线程池工作原理分析 "),e("a",{class:"header-anchor",href:"#线程池工作原理分析","aria-label":'Permalink to "线程池工作原理分析"'},"​")],-1),f=e("h4",{id:"现实案例",tabindex:"-1"},[t("现实案例 "),e("a",{class:"header-anchor",href:"#现实案例","aria-label":'Permalink to "现实案例"'},"​")],-1),k=e("p",null,"先来看一个现实生活中的实际案例，某工艺品加工厂有 3 台加工机器用来生产订单所需的产品，正常情况下 3 台机器能够保证所有订单按时按需生产完毕，如下图所示：",-1),V=e("p",null,"如果订单量突然大幅增加，3 台机器已经处于满负荷状态，一时间无法完成新增的订单任务。那怎么办呢？正所谓钱是不可能不挣的，只能硬着头皮接下新来的订单，但是会将新来的订单暂存在仓库中，当有加工机器空闲下来之后，再用来生产仓库中的订单，如下图所示：",-1),q=e("p",null,"如果订单量持续快速增长，导致仓库也存储满了。那怎么办呢？ 正常情况下加工厂肯定会通过购买新的加工机器来满足订单需求，如下所示：",-1),w=e("p",null,"有了仓库和新购买的加工机器加持，加工厂业务还是能够正常流转。但是当某些极端情况发生，比如双十一搞活动之后订单爆单了。这时新增的订单任务连仓库以及所有的加工机器都已经无法容纳，说明加工厂已经不能接受新的订单任务了，因此只能拒绝所有新的订单。",-1),z=e("p",null,"线程池的工作流程同上面描述的加工厂完成订单任务非常相似，并且在线程池的构造器中，通过传入的参数可以设置默认有多少台加工机器、仓库的大小、可以购买新的加工机器的最大数量等等。",-1),v=e("h4",{id:"线程池结构",tabindex:"-1"},[t("线程池结构 "),e("a",{class:"header-anchor",href:"#线程池结构","aria-label":'Permalink to "线程池结构"'},"​")],-1),I=e("p",null,"从上图中可以大体看出，在线程池内部主要包含以下几个部分：",-1),O=e("p",null,"worker 集合：保存所有的核心线程和非核心线程（类比加工厂的加工机器），其本质是一个HashSet。",-1),D=e("p",null,"等待任务队列：当核心线程的个数达到 corePoolSize 时，新提交的任务会被先保存在等待队列中（类比加工厂中的仓库），其本质是一个阻塞队列 BlockingQueue。",-1),J=e("p",null,"ctl：是一个 AtomicInteger 类型，二进制高 3 位用来标识线程池的状态，低 29 位用来记录池中线程的数量。",-1),F=e("p",null,"获取线程池状态、工作线程数量、修改 ctl 的方法分别如下：",-1),B=e("p",null,"线程池主要有以下几种运行状态：",-1),N=e("h4",{id:"参数分析",tabindex:"-1"},[t("参数分析 "),e("a",{class:"header-anchor",href:"#参数分析","aria-label":'Permalink to "参数分析"'},"​")],-1),R=e("p",null,"线程池的构造器如下：",-1),L=l('<p>构造参数说明。</p><ul><li><p>corePoolSize：表示核心线程数量。</p></li><li><p>maximumPoolSize：表示线程池最大能够容纳同时执行的线程数，必须大于或等于 1。如果和 corePoolSize 相等即是固定大小线程池。</p></li><li><p>keepAliveTime：表示线程池中的线程空闲时间，当空闲时间达到此值时，线程会被销毁直到剩下 corePoolSize 个线程。</p></li><li><p>unit：用来指定 keepAliveTime 的时间单位，有 MILLISECONDS、SECONDS、MINUTES、HOURS 等。</p></li><li><p>workQueue：等待队列，BlockingQueue 类型。当请求任务数大于 corePoolSize 时，任务将被缓存在此 BlockingQueue 中。</p></li><li><p>threadFactory：线程工厂，线程池中使用它来创建线程，如果传入的是 null，则使用默认工厂类 DefaultThreadFactory。</p></li><li><p>handler：执行拒绝策略的对象。当 workQueue 满了之后并且活动线程数大于 maximumPoolSize 的时候，线程池通过该策略处理请求。</p></li></ul><blockquote><p>注意：当 ThreadPoolExecutor 的 allowCoreThreadTimeOut 设置为 true 时，核心线程超时后也会被销毁。</p></blockquote><h4 id="流程解析" tabindex="-1">流程解析 <a class="header-anchor" href="#流程解析" aria-label="Permalink to &quot;流程解析&quot;">​</a></h4><p>当我们调用 execute 或者 submit，将一个任务提交给线程池，线程池收到这个任务请求后，有以下几种处理情况：</p><p>1.当前线程池中运行的线程数量还没有达到 corePoolSize 大小时，线程池会创建一个新线程执行提交的任务，无论之前创建的线程是否处于空闲状态。</p><p>举例：</p>',7),Q=e("p",null,"上面代码创建了 3 个固定数量的线程池，每次提交的任务耗时 100 毫秒。每次提交任务之前都会延迟2秒，保证线程池中的工作线程都已经执行完毕，但是执行效果如下：",-1),U=e("p",null,"可以看出虽然线程 1 和线程 2 都已执行完毕并且处于空闲状态，但是线程池还是会尝试创建新的线程去执行新提交的任务，直到线程数量达到 corePoolSize。",-1),j=e("p",null,"2.当前线程池中运行的线程数量已经达到 corePoolSize 大小时，线程池会把任务加入到等待队列中，直到某一个线程空闲了，线程池会根据我们设置的等待队列规则，从队列中取出一个新的任务执行。举例：",-1),y=e("p",null,"上述代码提交的任务耗时 4 秒，因此前 2 个任务会占用线程池中的 2 个核心线程。此时有新的任务提交给线程池时，任务会被缓存到等待队列中，结果如下：",-1),K=e("p",null,"可以看到红框 1 中通过 2 个核心线程直接执行提交的任务，因此等待队列中的数量为 0；而红框 2 中表明，此时核心线程都已经被占用，新提交的任务都被放入等待队列中。",-1),W=e("p",null,"3.如果线程数大于 corePoolSize 数量但是还没有达到最大线程数 maximumPoolSize，并且等待队列已满，则线程池会创建新的线程来执行任务。",-1),Z=e("p",null,"上述代码创建了一个核心线程数为 2，最大线程数为 10，等待队列长度为 2 的线程池。执行效果如下：",-1),H=e("p",null,"解释说明：",-1),X=e("ul",null,[e("li",null,[e("p",null,"1 处表示线程数量已经达到 corePoolSize；")]),e("li",null,[e("p",null,"2 处表明等待队列已满；")]),e("li",null,[e("p",null,"3 处会创建新的线程执行任务。")])],-1),Y=e("p",null,'4.最后如果提交的任务，无法被核心线程直接执行，又无法加入等待队列，又无法创建"非核心线程"直接执行，线程池将根据拒绝处理器定义的策略处理这个任务。比如在 ThreadPoolExecutor 中，如果你没有为线程池设置 RejectedExecutionHandler。这时线程池会抛出 RejectedExecutionException 异常，即线程池拒绝接受这个任务。',-1),G=e("p",null,"将上面非核心线程的代码稍微修改一下，如下：",-1),$=e("p",null,"修改最大线程数为 3，并提交 6 次任务给线程池，执行效果如下：",-1),ee=e("p",null,"程序会报异常 RejectedExecutionException，拒绝策略是线程池的一种保护机制，目的就是当这种无节制的线程资源申请发生时，拒绝新的任务保护线程池。默认拒绝策略会直接报异常，但是 JDK 中一共提供了 4 种保护策略，如下：",-1),te=e("blockquote",null,[e("p",null,"实际上拒绝策略都是实现自接口 RejectedExecutionException，开发者也可以通过实现此接口，定制自己的拒绝策略。")],-1),oe=e("p",null,[t("整个流程的动画演示可以参考："),e("a",{href:"https://mp.weixin.qq.com/s?__biz=MzU3Mjc5NjAzMw==&mid=2247484276&idx=1&sn=31c805234afd7284457f268a74db7ce3&chksm=fcca3e9acbbdb78c3d4c4a58aab058577377e87e612aea435fe08f4f3f90bbd8612abdc07237&token=263838289&lang=zh_CN#rd",target:"_blank",rel:"noreferrer"},"漫画Java线程池的工作机制")],-1),ae=e("h3",{id:"为何禁止使用-executors",tabindex:"-1"},[t("为何禁止使用 Executors "),e("a",{class:"header-anchor",href:"#为何禁止使用-executors","aria-label":'Permalink to "为何禁止使用 Executors"'},"​")],-1),le=e("p",null,"现在再回头看一下为何在阿里 Java 开发手册中严禁使用 Executors 工具类来创建线程池。尤其是 newFixedThreadPool 和 newCachedThreadPool 这两个方法。",-1),se=e("p",null,"比如如下使用 newFixedThreadPool 方法创建线程的案例：",-1),ne=e("p",null,"上述代码创建了一个固定数量为 2 的线程池，并通过 for 循环向线程池中提交 100 万个任务。",-1),ie=e("p",null,"通过 java -Xms4m -Xmx4m FixedThreadPoolOOM 执行上述代码：",-1),ce=e("p",null,"可以发现当任务添加到 7 万多个时，程序发生 OOM。这是为什么呢？ 看一下newSingleThreadExecutor 和 newFixedThreadPool() 的具体实现，如下：",-1),re=e("p",null,"可以看到传入的是一个无界的阻塞队列，理论上可以无限添加任务到线程池。当核心线程执行时间很长（比如 sleep10s），则新提交的任务还在不断地插入到阻塞队列中，最终造成",-1),pe=e("p",null,"OOM。",-1),he=e("p",null,"再看下 newCachedThreadPool 会有什么问题。",-1),ge=e("p",null,"上述代码同样会报 OOM，只是错误的 log 信息有点区别：无法创建新的线程。",-1),de=e("p",null,"看一下 newCachedThreadPool 的实现：",-1),_e=e("p",null,"可以看到，缓存线程池的最大线程数为 Integer 最大值。当核心线程耗时很久，线程池会尝试创建新的线程来执行提交的任务，当内存不足时就会报无法创建线程的错误。",-1),ue=e("blockquote",null,[e("p",null,"以上两种情况如果发生在生产环境将会是致命的，从阿里手册中严禁使用 Executors 的态度上也能看出，阿里也是经历过血淋淋的教训。")],-1),Ae=e("h3",{id:"总结",tabindex:"-1"},[t("总结 "),e("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),me=e("p",null,"线程池是一把双刃剑，使用得当会使代码如虎添翼；但是使用不当将会造成重大性灾难。而剑柄是握在开发者手中，只有理解线程池的运行原理，熟知它的工作机制与使用场景，才会使这把双刃剑发挥更好的作用。",-1),Ce=e("p",null,[t("这节课的实例代码已经放到 github 上："),e("a",{href:"https://github.com/McoyJiang/LagouAndroidShare",target:"_blank",rel:"noreferrer"},"拉勾教育《Android 工程师进阶34讲》")],-1);function xe(Pe,Te,Se,be,Me,Ee){const o=n("Image");return i(),c("div",null,[p,a(o,{alt:"安卓2.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/64/CgoCgV6n12mAEC_6AADOWskIa4c204.png"}),t(),h,a(o,{alt:"image.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/65/CgoCgV6n2H6ALYpvAAJZ-pUzR7k637.png"}),t(),g,a(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image3/M01/17/94/Ciqah16n2TWAE9B8AADtgmpx1a8792.png"}),t(),d,_,a(o,{alt:"4.png",src:"https://s0.lgstatic.com/i/image3/M01/17/94/Ciqah16n2T2AREK4AALNsUarD7E510.png"}),t(),u,a(o,{alt:"5.png",src:"https://s0.lgstatic.com/i/image3/M01/17/95/Ciqah16n2UiAY5S3AADS69WUzho028.png"}),t(),A,a(o,{alt:"6.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/66/CgoCgV6n2XqAR6_XAALVUARDWYc702.png"}),t(),m,C,x,a(o,{alt:"7.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/66/CgoCgV6n2Y-AP_FFAAJo3ERAbBU010.png"}),t(),P,a(o,{alt:"8.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/66/CgoCgV6n2ZuAS-0bAAGh-FTMkAc190.png"}),t(),T,S,a(o,{alt:"9.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/66/CgoCgV6n2caAKk5ZAAL3rQUD4pA434.png"}),t(),b,a(o,{alt:"10.png",src:"https://s0.lgstatic.com/i/image3/M01/17/95/Ciqah16n2c2ABfyLAAIYEcDEwWI729.png"}),t(),M,E,f,k,a(o,{alt:"11.gif",src:"https://s0.lgstatic.com/i/image3/M01/0A/67/CgoCgV6n2fKAChGnAKAv_edvYJg266.gif"}),t(),V,a(o,{alt:"12.gif",src:"https://s0.lgstatic.com/i/image3/M01/17/95/Ciqah16n2heALZzKASzLXZDa0gE022.gif"}),t(),q,a(o,{alt:"13.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/67/CgoCgV6n2ieAXLdHAAhQp-k81B4188.png"}),t(),w,a(o,{alt:"14.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/67/CgoCgV6n2jmAAbSOAAjqRyhtMHc301.png"}),t(),z,v,a(o,{alt:"15.png",src:"https://s0.lgstatic.com/i/image3/M01/17/96/Ciqah16n2kaAO4ocAAE8gZsl0_8253.png"}),t(),I,O,a(o,{alt:"16.png",src:"https://s0.lgstatic.com/i/image3/M01/17/96/Ciqah16n2liAFs5rAABI5Uf1r6k558.png"}),t(),D,a(o,{alt:"17.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/67/CgoCgV6n2mOAKeelAABB8mmLk2Q830.png"}),t(),J,F,a(o,{alt:"18.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/67/CgoCgV6n2naARJfiAAGFgZOz0ok540.png"}),t(),B,a(o,{alt:"19.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/67/CgoCgV6n2n-ABM97AAHAooW4SDo599.png"}),t(),N,R,a(o,{alt:"20.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/67/CgoCgV6n2oyAMKZWAAI9TfD3XFI395.png"}),t(),L,a(o,{alt:"21.png",src:"https://s0.lgstatic.com/i/image3/M01/17/96/Ciqah16n2rWAXG8fAAMkT9G2cjc860.png"}),t(),Q,a(o,{alt:"22.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/68/CgoCgV6n2sCAeLNmAADZyhkrkJI781.png"}),t(),U,j,a(o,{alt:"23.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/68/CgoCgV6n2s2AIL_gAAOx6MUVQxU873.png"}),t(),y,a(o,{alt:"24.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/68/CgoCgV6n2tuAJszQAAGWIAGrEeE291.png"}),t(),K,W,a(o,{alt:"25.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/68/CgoCgV6n2uiACvYxAAPbw8ZvLUc559.png"}),t(),Z,a(o,{alt:"26.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/68/CgoCgV6n2vaARbXsAAUisJcQ1MQ342.png"}),t(),H,X,Y,G,a(o,{alt:"27.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/68/CgoCgV6n2xqAJBIwAAO0vSHuT_g167.png"}),t(),$,a(o,{alt:"28.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/68/CgoCgV6n2yKAYaaKAASFO3zFfes713.png"}),t(),ee,a(o,{alt:"29.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/68/CgoCgV6n2y6AVJ4mAAMbNVvmTTM118.png"}),t(),te,oe,ae,le,se,a(o,{alt:"30.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/69/CgoCgV6n23qAQs2oAAM5Bu8rbs4988.png"}),t(),ne,ie,a(o,{alt:"31.png",src:"https://s0.lgstatic.com/i/image3/M01/17/97/Ciqah16n24qANRgYAADfhL7y1lA700.png"}),t(),ce,a(o,{alt:"32.png",src:"https://s0.lgstatic.com/i/image3/M01/17/97/Ciqah16n25aAVzWoAAH1Wqc1-j0537.png"}),t(),re,pe,he,a(o,{alt:"33.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/69/CgoCgV6n26GAc_xBAANFBva09TQ310.png"}),t(),ge,a(o,{alt:"34.png",src:"https://s0.lgstatic.com/i/image3/M01/0A/69/CgoCgV6n26qACjnJAAIATmSOh4E292.png"}),t(),de,a(o,{alt:"35.png",src:"https://s0.lgstatic.com/i/image3/M01/17/98/Ciqah16n27OAaCwoAADlQzuuPk4379.png"}),t(),_e,ue,Ae,me,Ce])}const Ve=s(r,[["render",xe]]);export{ke as __pageData,Ve as default};

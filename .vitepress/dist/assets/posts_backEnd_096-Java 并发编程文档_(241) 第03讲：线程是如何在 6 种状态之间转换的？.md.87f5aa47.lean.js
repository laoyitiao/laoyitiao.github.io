import{_ as l,j as o,o as s,g as c,k as n,h as i,Q as e,s as t}from"./chunks/framework.cfb14fe0.js";const H=JSON.parse('{"title":"第03讲：线程是如何在6种状态之间转换的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(241) 第03讲：线程是如何在 6 种状态之间转换的？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(241) 第03讲：线程是如何在 6 种状态之间转换的？.md","lastUpdated":1696682708000}'),d={name:"posts/backEnd/096-Java 并发编程文档/(241) 第03讲：线程是如何在 6 种状态之间转换的？.md"},r=e("",8),_=t("p",null,"New 表示线程被创建但尚未启动的状态：当我们用 new Thread() 新建一个线程时，如果线程没有开始运行 start() 方法，所以也没有开始执行 run() 方法里面的代码，那么此时它的状态就是 New。而一旦线程调用了 start()，它的状态就会从 New 变成 Runnable，也就是状态转换图中中间的这个大方框里的内容。",-1),h=t("h6",{id:"runnable-可运行",tabindex:"-1"},[i("Runnable 可运行 "),t("a",{class:"header-anchor",href:"#runnable-可运行","aria-label":'Permalink to "Runnable 可运行"'},"​")],-1),p=t("p",null,"Java 中的 Runable 状态对应操作系统线程状态中的两种状态，分别是 Running 和 Ready，也就是说，Java 中处于 Runnable 状态的线程有可能正在执行，也有可能没有正在执行，正在等待被分配 CPU 资源。",-1),u=t("p",null,"所以，如果一个正在运行的线程是 Runnable 状态，当它运行到任务的一半时，执行该线程的 CPU 被调度去做其他事情，导致该线程暂时不运行，它的状态依然不变，还是 Runnable，因为它有可能随时被调度回来继续执行任务。",-1),g=t("h6",{id:"阻塞状态",tabindex:"-1"},[i("阻塞状态 "),t("a",{class:"header-anchor",href:"#阻塞状态","aria-label":'Permalink to "阻塞状态"'},"​")],-1),m=t("p",null,"接下来，我们来看下 Runnable 下面的三个方框，它们统称为阻塞状态，在 Java 中阻塞状态通常不仅仅是 Blocked，实际上它包括三种状态，分别是 Blocked(被阻塞）、Waiting(等待）、Timed Waiting(计时等待），这三 种状态统称为阻塞状态，下面我们来看看这三种状态具体是什么含义。",-1),b=t("h6",{id:"blocked-被阻塞",tabindex:"-1"},[i("Blocked 被阻塞 "),t("a",{class:"header-anchor",href:"#blocked-被阻塞","aria-label":'Permalink to "Blocked 被阻塞"'},"​")],-1),k=t("p",null,"首先来看最简单的 Blocked，从箭头的流转方向可以看出，从 Runnable 状态进入 Blocked 状态只有一种可能，就是进入 synchronized 保护的代码时没有抢到 monitor 锁，无论是进入 synchronized 代码块，还是 synchronized 方法，都是一样。",-1),A=t("p",null,"我们再往右看，当处于 Blocked 的线程抢到 monitor 锁，就会从 Blocked 状态回到Runnable 状态。",-1),f=t("h6",{id:"waiting-等待",tabindex:"-1"},[i("Waiting 等待 "),t("a",{class:"header-anchor",href:"#waiting-等待","aria-label":'Permalink to "Waiting 等待"'},"​")],-1),T=t("p",null,"我们再看看 Waiting 状态，线程进入 Waiting 状态有三种可能性。",-1),R=t("ol",null,[t("li",null,"没有设置 Timeout 参数的 Object.wait() 方法。"),t("li",null,"没有设置 Timeout 参数的 Thread.join() 方法。"),t("li",null,"LockSupport.park() 方法。")],-1),W=t("p",null,"刚才强调过，Blocked 仅仅针对 synchronized monitor 锁，可是在 Java 中还有很多其他的锁，比如 ReentrantLock，如果线程在获取这种锁时没有抢到该锁就会进入 Waiting 状态，因为本质上它执行了 LockSupport.park() 方法，所以会进入 Waiting 状态。同样，Object.wait() 和 Thread.join() 也会让线程进入 Waiting 状态。",-1),q=t("p",null,"Blocked 与 Waiting 的区别是 Blocked 在等待其他线程释放 monitor 锁，而 Waiting 则是在等待某个条件，比如 join 的线程执行完毕，或者是 notify()/notifyAll() 。",-1),B=t("h6",{id:"timed-waiting-限期等待",tabindex:"-1"},[i("Timed Waiting 限期等待 "),t("a",{class:"header-anchor",href:"#timed-waiting-限期等待","aria-label":'Permalink to "Timed Waiting 限期等待"'},"​")],-1),C=t("p",null,"在 Waiting 上面是 Timed Waiting 状态，这两个状态是非常相似的，区别仅在于有没有时间限制，Timed Waiting 会等待超时，由系统自动唤醒，或者在超时前被唤醒信号唤醒。",-1),w=t("br",null,null,-1),N=t("br",null,null,-1),y=t("p",null,"以下情况会让线程进入 Timed Waiting 状态。",-1),P=t("ol",null,[t("li",null,"设置了时间参数的 Thread.sleep(long millis) 方法；"),t("li",null,"设置了时间参数的 Object.wait(long timeout) 方法；"),t("li",null,"设置了时间参数的 Thread.join(long millis) 方法；"),t("li",null,"设置了时间参数的 LockSupport.parkNanos(long nanos) 方法和 LockSupport.parkUntil(long deadline) 方法。")],-1),D=t("p",null,"讲完如何进入这三种状态，我们再来看下如何从这三种状态流转到下一个状态。",-1),S=t("p",null,"想要从 Blocked 状态进入 Runnable 状态，要求线程获取 monitor 锁，而从 Waiting 状态流转到其他状态则比较特殊，因为首先 Waiting 是不限时的，也就是说无论过了多长时间它都不会主动恢复。",-1),x=t("p",null,"只有当执行了 LockSupport.unpark()，或者 join 的线程运行结束，或者被中断时才可以进入 Runnable 状态。",-1),Q=t("p",null,"如果其他线程调用 notify() 或 notifyAll()来唤醒它，它会直接进入 Blocked 状态，这是为什么呢？因为唤醒 Waiting 线程的线程如果调用 notify() 或 notifyAll()，要求必须首先持有该 monitor 锁，所以处于 Waiting 状态的线程被唤醒时拿不到该锁，就会进入 Blocked 状态，直到执行了 notify()/notifyAll() 的唤醒它的线程执行完毕并释放 monitor 锁，才可能轮到它去抢夺这把锁，如果它能抢到，就会从 Blocked 状态回到 Runnable 状态。",-1),M=t("p",null,"同样在 Timed Waiting 中执行 notify() 和 notifyAll() 也是一样的道理，它们会先进入 Blocked 状态，然后抢夺锁成功后，再回到 Runnable 状态。",-1),F=t("p",null,"当然对于 Timed Waiting 而言，如果它的超时时间到了且能直接获取到锁/join的线程运行结束/被中断/调用了LockSupport.unpark()，会直接恢复到 Runnable 状态，而无需经历 Blocked 状态。",-1),j=t("h6",{id:"terminated-终止",tabindex:"-1"},[i("Terminated 终止 "),t("a",{class:"header-anchor",href:"#terminated-终止","aria-label":'Permalink to "Terminated 终止"'},"​")],-1),v=e("",6);function J(L,E,V,z,I,O){const a=o("Image");return s(),c("div",null,[r,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/24/Ciqc1F_QfyaAFXAQAAD1xkYN7RE683.png"}),i(),_,h,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/24/Ciqc1F_Qfy2ACkrLAAD2DLkc2qw212.png"}),i(),p,u,g,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/24/Ciqc1F_QfzOAYoshAAD34kLRebs212.png"}),i(),m,b,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/2F/CgqCHl_QfzmAT3mBAAD1O9cjB1Q393.png"}),i(),k,A,f,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/24/Ciqc1F_Qfz6AROaIAAD0oNZDdx0700.png"}),i(),T,R,W,q,B,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/2F/CgqCHl_Qf0aASbDHAAD1VJbPv8c632.png"}),i(),C,w,N,y,P,D,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/24/Ciqc1F_Qf02ALx3yAAD1Zwrli6c436.png"}),i(),S,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/24/Ciqc1F_Qf1SABGoMAAD08byRpJo570.png"}),i(),x,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/24/Ciqc1F_Qf1qAWZ18AAD0WYzP5nY511.png"}),i(),Q,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/2F/CgqCHl_Qf1-AWhOjAAD1EwUX7NE880.png"}),i(),M,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/24/Ciqc1F_Qf2SAdJKAAAD1noNKR4M217.png"}),i(),F,j,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image/M00/80/2F/CgqCHl_Qf2qAPdCTAAD1YUKiI1s598.png"}),i(),v])}const Y=l(d,[["render",J]]);export{H as __pageData,Y as default};

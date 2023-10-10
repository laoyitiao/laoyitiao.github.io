import{_ as l,j as o,o as i,g as c,k as n,h as e,s as t,Q as s}from"./chunks/framework.cfb14fe0.js";const _t=JSON.parse('{"title":"第10讲：深入理解AQS和CAS原理","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1864) 第10讲：深入理解 AQS 和 CAS 原理.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1864) 第10讲：深入理解 AQS 和 CAS 原理.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1864) 第10讲：深入理解 AQS 和 CAS 原理.md"},d=t("h1",{id:"第10讲-深入理解aqs和cas原理",tabindex:"-1"},[e("第10讲：深入理解AQS和CAS原理 "),t("a",{class:"header-anchor",href:"#第10讲-深入理解aqs和cas原理","aria-label":'Permalink to "第10讲：深入理解AQS和CAS原理"'},"​")],-1),_=t("p",null,"AQS 全称是 Abstract Queued Synchronizer，一般翻译为同步器。它是一套实现多线程同步功能的框架，由大名鼎鼎的 Doug Lea 操刀设计并开发实现的。AQS 在源码中被广泛使用，尤其是在 JUC（Java Util Concurrent）中，比如 ReentrantLock、Semaphore、CountDownLatch、ThreadPoolExecutor。理解 AQS 对我们理解 JUC 中其他组件至关重要，并且在实际开发中也可以通过自定义 AQS 来实现各种需求场景。",-1),p=t("blockquote",null,[t("p",null,"注意：理解 AQS 需要一定的数据结构基础，尤其是双端队列，并对 Unsafe 有一定的了解。")],-1),h=t("h3",{id:"reentrantlock-和-aqs-的关系",tabindex:"-1"},[e("ReentrantLock 和 AQS 的关系 "),t("a",{class:"header-anchor",href:"#reentrantlock-和-aqs-的关系","aria-label":'Permalink to "ReentrantLock 和 AQS 的关系"'},"​")],-1),u=t("p",null,"本课时我们主要通过 ReentrantLock 来理解 AQS 内部的工作机制。首先从 ReentrantLock 的 lock() 方法开始：",-1),A=t("p",null,"代码很简单，只是调用了一个 Sync 的 lock() 方法，这个 Sync 是什么呢？",-1),S=t("p",null,"可以看出，Sync 是 ReentrantLock 中的一个内部类。ReentrantLock 并没有直接继承 AQS，而是通过内部类 Sync 来扩展 AQS 的功能，然后 ReentrantLock 中存有 Sync 的全局变量引用。",-1),g=t("p",null,"Sync 在 ReentrantLock 有两种实现：NonfairSync 和 FairSync，分别对应非公平锁和公平锁。以非公平锁为例，实现源码如下：",-1),C=t("p",null,"可以看出在非公平锁中的 lock() 方法中，主要做了如下操作：",-1),m=t("ul",null,[t("li",null,"如果通过 CAS 设置变量 State（同步状态）成功，表示当前线程获取锁成功，则将当前线程设置为独占线程。"),t("li",null,"如果通过 CAS 设置变量 State（同步状态）失败，表示当前锁正在被其他线程持有，则进入 Acquire 方法进行后续处理。")],-1),k=t("p",null,"acruire() 方法定义在 AQS 中，具体如下：",-1),q=t("p",null,"acquire() 方法是一个比较重要的方法，可以将其拆解为 3 个主要步骤：",-1),Q=t("ol",null,[t("li",null,"tryAcquire() 方法主要目的是尝试获取锁；"),t("li",null,"addWaiter() 如果 tryAcquire() 尝试获取锁失败则调用 addWaiter 将当前线程添加到一个等待队列中；"),t("li",null,"acquireQueued 处理加入到队列中的节点，通过自旋去尝试获取锁，根据情况将线程挂起或者取消。")],-1),N=t("p",null,"以上 3 个方法都被定义在 AQS 中，但其中 tryAcquire() 有点特殊，其实现如下：",-1),L=t("p",null,[e("默认情况下直接抛异常，因此它需要在子类中复写，也就是说"),t("strong",null,"真正的获取锁的逻辑由子类同步器自己实现"),e("。")],-1),f=t("p",null,"ReentrantLock 中 tryAcquire 的实现（非公平锁）如下：",-1),y=t("p",null,"解释说明：",-1),P=t("ul",null,[t("li",null,"获取当前线程，判断当前的锁的状态；"),t("li",null,"如果 state=0 表示当前是无锁状态，通过 cas 更新 state 状态的值，返回 true；"),t("li",null,"如果当前线程属于重入，则增加重入次数，返回 true；"),t("li",null,"上述情况都不满足，则获取锁失败返回 false。")],-1),R=t("p",null,"最后用一张图表示 ReentrantLock.lock() 过程：",-1),T=t("p",null,[e("从图中我们可以看出，在 ReentrantLock 执行 lock() 的过程中，大部分同步机制的核心逻辑都已经在 AQS 中实现，ReentrantLock 自身只要实现某些特定步骤下的方法即可，这种设计模式叫作"),t("strong",null,"模板模式"),e("。如果你做过 Android 开发对这一模式应该非常熟悉。Activity 的生命周期的执行流程都已经在 framework 中定义好了，子类 Activity 只要在相应的 onCreate、onPause 等生命周期方法中提供相应的实现即可。")],-1),b=t("blockquote",null,[t("p",null,"注意：不只 ReentrantLock，JUC 包中其他组件例如 CountDownLatch、Semaphor 等都是通过一个内部类 Sync 来继承 AQS，然后在内部中通过操作 Sync 来实现同步。这种做法的好处是将线程控制的逻辑控制在 Sync 内部，而对外面向用户提供的接口是自定义锁，这种聚合关系能够很好的解耦两者所关注的逻辑。")],-1),M=t("h3",{id:"aqs-核心功能原理分析",tabindex:"-1"},[e("AQS 核心功能原理分析 "),t("a",{class:"header-anchor",href:"#aqs-核心功能原理分析","aria-label":'Permalink to "AQS 核心功能原理分析"'},"​")],-1),x=t("p",null,"首先看下 AQS 中几个关键的属性，如下所示：",-1),E=s('<p>代码中展示了 AQS 中两个比较重要的属性 <strong>Node</strong> 和 <strong>state</strong>。</p><h4 id="state-锁状态" tabindex="-1">state 锁状态 <a class="header-anchor" href="#state-锁状态" aria-label="Permalink to &quot;state 锁状态&quot;">​</a></h4><p>state 表示当前锁状态。当 state = 0 时表示无锁状态；当 state&gt;0 时，表示已经有线程获得了锁，也就是 state=1，如果同一个线程多次获得同步锁的时候，state 会递增，比如重入 5 次，那么 state=5。 而在释放锁的时候，同样需要释放 5 次直到 state=0，其他线程才有资格获得锁。</p><p>state 还有一个功能是实现锁的独占模式或者共享模式。</p><ul><li>独占模式：只有一个线程能够持有同步锁。</li></ul><p>比如在独占模式下，我们可以把 state 的初始值设置成 0，当某个线程申请锁对象时，需要判断 state 的值是不是 0，如果不是 0 的话意味着其他线程已经持有该锁，则本线程需要阻塞等待。</p><ul><li>共享模式：可以有多个线程持有同步锁。</li></ul><p>在共享模式下的道理也差不多，比如说某项操作我们允许 10 个线程同时进行，超过这个数量的线程就需要阻塞等待。那么只需要在线程申请对象时判断 state 的值是否小于 10。如果小于 10，就将 state 加 1 后继续同步语句的执行；如果等于 10，说明已经有 10 个线程在同时执行该操作，本线程需要阻塞等待。</p><h4 id="node-双端队列节点" tabindex="-1">Node 双端队列节点 <a class="header-anchor" href="#node-双端队列节点" aria-label="Permalink to &quot;Node 双端队列节点&quot;">​</a></h4><p>Node 是一个先进先出的双端队列，并且是等待队列，当多线程争用资源被阻塞时会进入此队列。这个队列是 AQS 实现多线程同步的核心。</p><p>从之前 ReentrantLock 图中可以看到，在 AQS 中有两个 Node 的指针，分别指向队列的 head 和 tail。</p><p>Node 的主要结构如下：</p>',12),I=t("p",null,"默认情况下，AQS 中的链表结构如下图所示：",-1),V=t("h4",{id:"获取锁失败后续流程分析",tabindex:"-1"},[e("获取锁失败后续流程分析 "),t("a",{class:"header-anchor",href:"#获取锁失败后续流程分析","aria-label":'Permalink to "获取锁失败后续流程分析"'},"​")],-1),w=t("p",null,"锁的意义就是使竞争到锁对象的线程执行同步代码，多个线程竞争锁时，竞争失败的线程需要被阻塞等待后续唤醒。那么 ReentrantLock 是如何实现让线程等待并唤醒的呢？",-1),F=t("p",null,"前面中我们提到在 ReentrantLock.lock() 阶段，在 acquire() 方法中会先后调用 tryAcquire、addWaiter、acquireQueued 这 3 个方法来处理。tryAcquire 在 ReentrantLock 中被复写并实现，如果返回 true 说明成功获取锁，就继续执行同步代码语句。可是如果 tryAcquire 返回 false，也就是当前锁对象被其他线程所持有，那么当前线程会被 AQS 如何处理呢？",-1),U=t("p",null,[t("strong",null,"addWaiter")],-1),D=t("p",null,"首先当前获取锁失败的线程会被添加到一个等待队列的末端，具体源码如下：",-1),G=t("p",null,"有两种情况会致使插入队列失败：",-1),J=t("ol",null,[t("li",null,[e("tail 为空：说明队列从未初始化，因此需要调用 enq 方法在队列中插入一个"),t("strong",null,"空的 Node"),e("；")]),t("li",null,"compareAndSetTail 失败：说明插入过程中有线程修改了此队列，因此需要调用 enq 将当前 node 重新插入到队列末端。")],-1),v=t("p",null,"经过 addWaiter 方法之后，此时线程以 Node 的方式被加入到队列的末端，但是线程还没有被执行阻塞操作，真正的阻塞操作是在下面的 acquireQueued 方法中判断执行。",-1),W=t("p",null,[t("strong",null,"acquireQueued")],-1),X=t("p",null,"在 acquireQueued 方法中并不会立即挂起该节点中的线程，因此在插入节点的过程中，之前持有锁的线程可能已经执行完毕并释放锁，所以这里使用自旋再次去尝试获取锁（不放过任何优化细节）。如果自旋操作还是没有获取到锁！那么就将该线程挂起（阻塞），该方法的源码如下：",-1),K=t("p",null,"可以看出在 shouldParkAfterFailedAcquire 方法中会判读当前线程是否应该被挂起，其代码如下：",-1),O=s("<p>首先获取前驱节点的 waitStatus 值，Node 中的 waitStatus 一共有 5 种取值，分别代表的意义如下：</p><table><thead><tr><th>waitStatue值</th><th>描述</th></tr></thead><tbody><tr><td>CANCELLED (1)</td><td>当前线程因为超时或者中断被取消。这是一个终结态，也就是状态到此为止</td></tr><tr><td>SIGNAL (-1)</td><td>当前线程的后继线程被阻塞或者即将被阻塞，当前线程释放锁或者取消后需要唤醒后继线程。这个状态一般都是后继线程来设置前驱节点的</td></tr><tr><td>CONDITION (-2)</td><td>当前线程在 condition 队列中</td></tr><tr><td>PROPAGATE (-3)</td><td>用于将唤醒后继线程传递下去，这个状态的引入是为了完善和增强共享锁的唤醒机制。在一个节点成为头节点之前，是不会跃迁为此状态的</td></tr><tr><td>0</td><td>表示无锁状态</td></tr></tbody></table><p>接下来根据 waitStatus 不同的值进行不同的操作，主要有以下几种情况：</p><ul><li>如果 waitStatus 等于 SIGNAL，返回 true 将当前线程挂起，等待后续唤醒操作即可。</li><li>如果 waitStatus 大于 0 也就是 CANCLE 状态，会将此前驱节点从队列中删除，并在循环中逐步寻找下一个不是&quot;CANCEL&quot;状态的节点作为当前节点的前驱节点。</li><li>如果 waitStatus 既不是 SIGNAL 也不是 CANCEL，则将当前节点的前驱节点状态设置为 SIGNAL，这样做的好处是下一次执行 shouldParkAfterFailedAcquire 时可以直接返回 true，挂起线程。</li></ul><p>代码再回到 acquireQueued 中，如果 shouldParkAfterFailedAcquire 返回 true 表示线程需要被挂起，那么会继续调用 parkAndCheckInterrupt 方法执行真正的阻塞线程代码，具体如下：</p>",5),Z=t("p",null,"这个方法比较简单，只是调用了 LockSupport 中的 park 方法。在 LockSupport.park() 方法中调用了 Unsafe API 来执行底层 native 方法将线程挂起，代码到这已经到了操作系统的层面，没有必要再深入分析。",-1),B=t("p",null,"至此，获取锁的大体流程已经分析完毕，总结一下整个过程如下：",-1),z=t("ul",null,[t("li",null,"AQS 的模板方法 acquire 通过调用子类自定义实现的 tryAcquire 获取锁；"),t("li",null,"如果获取锁失败，通过 addWaiter 方法将线程构造成 Node 节点插入到同步队列队尾；"),t("li",null,"在 acquirQueued 方法中以自旋的方法尝试获取锁，如果失败则判断是否需要将当前线程阻塞，如果需要阻塞则最终执行 LockSupport(Unsafe) 中的 native API 来实现线程阻塞。")],-1),$=t("h4",{id:"释放锁流程分析",tabindex:"-1"},[e("释放锁流程分析 "),t("a",{class:"header-anchor",href:"#释放锁流程分析","aria-label":'Permalink to "释放锁流程分析"'},"​")],-1),j=t("p",null,"在上面加锁阶段被阻塞的线程需要被唤醒过后才可以重新执行。那具体 AQS 是何时尝试唤醒等待队列中被阻塞的线程呢？",-1),Y=t("p",null,"同加锁过程一样，释放锁需要从 ReentrantLock.unlock() 方法开始：",-1),H=t("p",null,"可以看出，首先调用 tryRelease 方法尝试释放锁，如果成功最终会调用 AQS 中的 unparkSuccessor 方法来实现释放锁的操作。unparkSuccessor 的具体实现如下：",-1),tt=s('<p>解释说明：</p><p>首先获取当前节点（实际上传入的是 head 节点）的状态，如果 head 节点的下一个节点是 null，或者下一个节点的状态为 CANCEL，则从等待队列的尾部开始遍历，直到寻找第一个 waitStatus 小于 0 的节点。</p><p>如果最终遍历到的节点不为 null，再调用 LockSupport.unpark 方法，调用底层方法唤醒线程。 至此，线程被唤醒的时机也分析完毕。</p><h4 id="不得不说的-cas" tabindex="-1">不得不说的 CAS <a class="header-anchor" href="#不得不说的-cas" aria-label="Permalink to &quot;不得不说的 CAS&quot;">​</a></h4><p>不管是在加锁还是释放锁阶段，多次提到了一种通用的操作：compareAndSetXXX。这种操作最终会调用 Unsafe 中的 API 进行 CAS 操作。</p><p>CAS 全称是 Compare And Swap，译为比较和替换，是一种通过硬件实现并发安全的常用技术，底层通过利用 CPU 的 CAS 指令对缓存加锁或总线加锁的方式来实现多处理器之间的原子操作。</p><p>它的实现过程主要有 3 个操作数：内存值 V，旧的预期值 E，要修改的新值 U，当且仅当预期值 E和内存值 V 相同时，才将内存值 V 修改为 U，否则什么都不做。</p><p>CAS 底层会根据操作系统和处理器的不同来选择对应的调用代码，以 Windows 和 X86 处理器为例，如果是多处理器，通过带 lock 前缀的 cmpxchg 指令对缓存加锁或总线加锁的方式来实现多处理器之间的原子操作；如果是单处理器，通过 cmpxchg 指令完成原子操作。</p><h3 id="自定义-aqs" tabindex="-1">自定义 AQS <a class="header-anchor" href="#自定义-aqs" aria-label="Permalink to &quot;自定义 AQS&quot;">​</a></h3><p>理解了 AQS 的设计思路，接下来我们就可以通过自定义 AQS 来实现自己的同步实现机制。</p>',10),et=t("p",null,"代码中的 MyLock 就是一个最简单的独占锁，通过使用 MyLock 也能实现同 synchronized 和 ReentrantLock 相同的功能。比如如下代码：",-1),at=s('<p>最终打印的 count 值为 20000，说明两个线程之间是线程安全的同步操作。</p><h4 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h4><p>总体来说，AQS 是一套框架，在框架内部已经封装好了大部分同步需要的逻辑，在 AQS 内部维护了一个状态指示器 state 和一个等待队列 Node，而通过 state 的操作又分为两种：独占式和共享式，这就导致 AQS 有两种不同的实现：独占锁（ReentrantLock 等）和分享锁（CountDownLatch、读写锁等）。本课时主要从独占锁的角度深入分析了 AQS 的加锁和释放锁的流程。</p><p>理解 AQS 的原理对理解 JUC 包中其他组件实现的基础有帮助，并且理解其原理才能更好的扩展其功能。上层开发人员可以基于此框架基础上进行扩展实现适合不同场景、不同功能的锁。其中几个有可能需要子类同步器实现的方法如下。</p><ul><li>lock()。</li><li>tryAcquire(int)：独占方式。尝试获取资源，成功则返回 true，失败则返回 false。</li><li>tryRelease(int)：独占方式。尝试释放资源，成功则返回 true，失败则返回 false。</li><li>tryAcquireShared(int)：共享方式。尝试获取资源。负数表示失败；0 表示成功，但没有剩余可用资源；正数表示成功，且有剩余资源。</li><li>tryReleaseShared(int)：共享方式。尝试释放资源，如果释放后允许唤醒后续等待结点返回 true，否则返回 false。</li></ul>',5);function nt(st,lt,ot,it,ct,rt){const a=o("Image");return i(),c("div",null,[d,_,p,h,u,n(a,{alt:"安卓1.png",src:"https://s0.lgstatic.com/i/image3/M01/14/50/Ciqah16hNzeAGmpiAAFQGv9Fgr8055.png"}),e(),A,n(a,{alt:"安卓2.png",src:"https://s0.lgstatic.com/i/image3/M01/14/50/Ciqah16hN0CAUaRQAAGpSG_ngyM130.png"}),e(),S,g,n(a,{alt:"安卓3.png",src:"https://s0.lgstatic.com/i/image3/M01/14/50/Ciqah16hN1SAJgt_AAFXxMZAJfA696.png"}),e(),C,m,k,n(a,{alt:"安卓4.png",src:"https://s0.lgstatic.com/i/image3/M01/14/50/Ciqah16hN26AQVzmAACP7w8ZKD8422.png"}),e(),q,Q,N,n(a,{alt:"安卓5.png",src:"https://s0.lgstatic.com/i/image3/M01/07/21/CgoCgV6hN3eAU2WmAAB3xJkEMNE965.png"}),e(),L,f,n(a,{alt:"安卓6.png",src:"https://s0.lgstatic.com/i/image3/M01/14/50/Ciqah16hN3-AC68pAANyZwCuYXA396.png"}),e(),y,P,R,n(a,{alt:"安卓7.png",src:"https://s0.lgstatic.com/i/image3/M01/14/50/Ciqah16hN4qAAZadAADaSkC9FmM625.png"}),e(),T,b,M,x,n(a,{alt:"安卓8.png",src:"https://s0.lgstatic.com/i/image3/M01/07/22/CgoCgV6hN5SAetbZAACffASkCF4632.png"}),e(),E,n(a,{alt:"安卓9.png",src:"https://s0.lgstatic.com/i/image3/M01/07/22/CgoCgV6hN56AWeUQAAI8w2N7emE340.png"}),e(),I,n(a,{alt:"安卓10.png",src:"https://s0.lgstatic.com/i/image3/M01/14/51/Ciqah16hN6eAaiC5AAAjUQaQ1Js892.png"}),e(),V,w,F,U,D,n(a,{alt:"安卓11.png",src:"https://s0.lgstatic.com/i/image3/M01/14/51/Ciqah16hN7CAKiQAAARQFTwNKQg227.png"}),e(),G,J,v,W,X,n(a,{alt:"安卓12.png",src:"https://s0.lgstatic.com/i/image3/M01/07/22/CgoCgV6hN7qAXkEXAAQrReei3G0475.png"}),e(),K,n(a,{alt:"安卓13.png",src:"https://s0.lgstatic.com/i/image3/M01/14/51/Ciqah16hN8OAIK5GAAOTQNP0ki8128.png"}),e(),O,n(a,{alt:"安卓14.png",src:"https://s0.lgstatic.com/i/image3/M01/14/51/Ciqah16hN86AVsTxAAFr5n_07eo859.png"}),e(),Z,B,z,$,j,Y,n(a,{alt:"安卓15.png",src:"https://s0.lgstatic.com/i/image3/M01/14/51/Ciqah16hN9mAdr9LAAFZOXdF9Gs514.png"}),e(),H,n(a,{alt:"安卓16.png",src:"https://s0.lgstatic.com/i/image3/M01/07/22/CgoCgV6hN-GAFxFeAALtBh7FKak896.png"}),e(),tt,n(a,{alt:"安卓17.png",src:"https://s0.lgstatic.com/i/image3/M01/14/51/Ciqah16hN-6AKAxBAAKlvS870jk917.png"}),e(),et,n(a,{alt:"安卓18.png",src:"https://s0.lgstatic.com/i/image3/M01/14/51/Ciqah16hN_iAfYSJAAMCMZKMFfk271.png"}),e(),at])}const pt=l(r,[["render",nt]]);export{_t as __pageData,pt as default};

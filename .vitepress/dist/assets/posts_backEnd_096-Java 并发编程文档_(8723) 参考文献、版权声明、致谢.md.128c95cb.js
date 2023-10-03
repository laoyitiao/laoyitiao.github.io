import{_ as e,o as t,g as a,Q as o}from"./chunks/framework.f949202b.js";const m=JSON.parse('{"title":"具体参考内容 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(8723) 参考文献、版权声明、致谢.md","filePath":"posts/backEnd/096-Java 并发编程文档/(8723) 参考文献、版权声明、致谢.md","lastUpdated":null}'),r={name:"posts/backEnd/096-Java 并发编程文档/(8723) 参考文献、版权声明、致谢.md"},p=o('<p>本专栏的部分内容、思路、代码，参考或借鉴或使用了诸多前辈的著作、博客、课程、视频等内容，专栏在写作过程中，亦从前辈们的作品中学习到了很多，首先表示敬意和感谢，感谢你们这些巨人，才能让我们后来者有机会站在巨人的肩膀上去学习和提高。</p><h4 id="具体参考内容" tabindex="-1">具体参考内容 <a class="header-anchor" href="#具体参考内容" aria-label="Permalink to &quot;具体参考内容&quot;">​</a></h4><p>第 06 讲：一共有哪 3 类线程安全问题？WrongInit 的代码参考自《Java 并发编程实战》讲安全发布的小节。</p><p>第 10 讲：线程池的各个参数的含义？线程数增加的流程图参考自网上，但因为出处太多，原始出处不可考，原作者若看到本文，请联系，将增加标注。</p><p>第 12 讲：有哪 6 种常见的线程池？什么是 Java8 的 ForkJoinPool？线程池结构图和 forkjoinpool 的思路来自 defog tech；JorkJoin 参考了 Doug Lea 的 <a href="http://gee.cs.oswego.edu/dl/papers/fj.pdf" target="_blank" rel="noreferrer">http://gee.cs.oswego.edu/dl/papers/fj.pdf</a>。</p><p>第 13 讲：线程池常用的阻塞队列有哪些？&quot;线程池内部结构&quot;这里的思路是来自 <a href="https://www.cnblogs.com/joeman/p/3730397.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/joeman/p/3730397.html</a>。</p><p>第 21 讲：如何看到 synchronized 背后的&quot;monitor 锁&quot;？&quot;会发生以下这三种情况之一&quot;这里参考了 <a href="https://blog.csdn.net/weixin_30702887/article/details/101112755" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_30702887/article/details/101112755</a> 和 <a href="https://blog.csdn.net/b13001216978/article/details/109624782" target="_blank" rel="noreferrer">https://blog.csdn.net/b13001216978/article/details/109624782</a>。</p><p>第 24 讲：讲一讲公平锁和非公平锁，为什么要&quot;非公平&quot;？这小节的代码来自《Java 并发编程实战手册》2.3 小节，这个例子很好，感谢原作者。</p><p>第 25 讲：读写锁 ReadWriteLock 获取锁有哪些规则？读写规则参考自 <a href="https://www.cnblogs.com/dolphin0520/p/3923167.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/dolphin0520/p/3923167.html</a>，本讲部分思路参考自 defog tech。</p><p>第 26 讲：读锁应该插队吗？什么是读写锁的升降级？&quot;为什么不支持锁的升级？&quot;参考自 <a href="https://stackoverflow.com/questions/26110579/reentrantreadwritelock-java-nest-write-lock-inside-read-lock" target="_blank" rel="noreferrer">https://stackoverflow.com/questions/26110579/reentrantreadwritelock-java-nest-write-lock-inside-read-lock</a> 和 <a href="https://stackoverflow.com/questions/464784/java-reentrantreadwritelocks-how-to-safely-acquire-write-lock" target="_blank" rel="noreferrer">https://stackoverflow.com/questions/464784/java-reentrantreadwritelocks-how-to-safely-acquire-write-lock</a>。其他的部分思路来自于 defog tech。升降级代码案例参考自于该类的 javadoc 描述。</p><p>第 27 讲：什么是自旋锁？自旋的好处和后果是什么呢？流程图参考自 <a href="https://tech.meituan.com/2018/11/15/java-lock.html" target="_blank" rel="noreferrer">https://tech.meituan.com/2018/11/15/java-lock.html</a>；自旋锁的实现的代码来自 <a href="https://www.fatalerrors.org/a/java-implementation-of-spin-lock.html" target="_blank" rel="noreferrer">https://www.fatalerrors.org/a/java-implementation-of-spin-lock.html</a>。</p><p>第 28 讲：JVM 对锁进行了哪些优化？Person 和 MultiSyn 的代码来自 Java 官方文档，最后一个图来自美团技术博客的《不得不说的&quot;锁&quot;事》。</p><p>第 29 讲：HashMap 为什么是线程不安全的？实验：扩容期间取出的值不准确的代码例子来自 Artem Novikov <a href="http://stackoverflow.com/questions/18542037/how-to-prove-that-hashmap-in-java-is-not-thread-safe" target="_blank" rel="noreferrer">http://stackoverflow.com/questions/18542037/how-to-prove-that-hashmap-in-java-is-not-thread-safe</a>。</p><p>第 30 讲：ConcurrentHashMap 在 Java7 和 8 有何不同？数据结构的图片、源码解析思路参考自 <a href="https://javadoop.com/post/hashmap%EF%BC%8C%E6%84%9F%E8%B0%A2" target="_blank" rel="noreferrer">https://javadoop.com/post/hashmap，感谢</a> hongjie。至于后面的&quot;对比 JDK 1.7 和 1.8 的异同和优缺点&quot;，我目前无法确定是不是原创，可能也参考了别人的。</p><p>第 33 讲：CopyOnWriteArrayList 有什么特点？CopyOnWrite 容器的特点参考自下面的某本 Java 并发书；迭代器代码来自 <a href="https://howtodoinjava.com/java/collections/java-copyonwritearrayset/" target="_blank" rel="noreferrer">https://howtodoinjava.com/java/collections/java-copyonwritearrayset/</a>。</p><p>第 34 讲：什么是阻塞队列？3 个图片思路参考自 defog tech。</p><p>第 35 讲：阻塞队列包含哪些常用的方法？add、offer、put 等方法的区别？倒数第 2、3 张图片参考自 defog tech。</p><p>第 36 讲：有哪几种常见的阻塞队列？图片参考自 defog tech。</p><p>第 37 讲：阻塞和非阻塞队列的并发安全原理是什么？前两段代码的注释和源码分析借鉴自 <a href="https://javadoop.com/post/java-concurrent-queue" target="_blank" rel="noreferrer">https://javadoop.com/post/java-concurrent-queue</a>。</p><p>第 39 讲：原子类是如何利用 CAS 保证线程安全的？参考了 <a href="https://www.jianshu.com/p/cf93314488f9" target="_blank" rel="noreferrer">https://www.jianshu.com/p/cf93314488f9</a> 和 <a href="https://www.jianshu.com/p/fb6e91b013cc" target="_blank" rel="noreferrer">https://www.jianshu.com/p/fb6e91b013cc</a>。</p><p>第 40 讲：AtomicInteger 在高并发下性能不好，如何解决？为什么？图翻译自 defog tech。底部我回答的问题，出处：<a href="https://www.cnblogs.com/thisiswhy/p/13176237.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/thisiswhy/p/13176237.html</a>。</p><p>第 41 讲：原子类和 volatile 有什么异同？&quot;案例说明 volatile 和原子类的异同&quot;这部分参考自 defog tech。</p><p>第 43 讲：Java 8 中 Adder 和 Accumulator 有什么区别？部分思路参考了 defog tech。</p><p>第 44 讲：ThreadLocal 适合用在哪些实际生产的场景中？思路和图片参考了 defog tech。</p><p>第 46 讲：多个 ThreadLocal 在 Thread 中的 threadlocals 里是怎么存储的？结构图片来自网上，网上这个图太多，导致原始出处不可考，原作者若看到本文，请联系，将增加标注。</p><p>第 47 讲：内存泄漏------为何每次用完 ThreadLocal 都要调用 remove()？引用链的图片和文字&quot;我们重点看一下下面这条链路：Thread Ref → Current Thread → ThreadLocalMap → Entry → Value → 可能泄漏的 value 实例&quot;借鉴自 <a href="https://juejin.cn/post/6844903683751149582" target="_blank" rel="noreferrer">https://juejin.cn/post/6844903683751149582</a>。</p><p>第 49 讲：Future 的主要功能是什么？第一个图思路参考自 defog tech。</p><p>第 50 讲：使用 Future 有哪些注意点？Future 产生新的线程了吗？第一个图思路参考自 defog tech。</p><p>第 51 讲：如何利用 CompletableFuture 实现&quot;旅游平台&quot;问题？第 2、3、4 张图片思路参考自 defog tech。</p><p>第 52 讲：信号量能被 FixedThreadPool 替代吗？图片和图片相关的思路参考自 defog tech。</p><p>第 53 讲：CountDownLatch 是如何安排线程执行顺序的？图片参考自 Benjaminwhx。</p><p>第 57 讲：什么是指令重排序？为什么要重排序？这里的重排序的 3 种情况参考自程晓明《深入理解 Java 内存模型》<a href="https://www.infoq.cn/article/java-memory-model-1/" target="_blank" rel="noreferrer">https://www.infoq.cn/article/java-memory-model-1/</a>；重排序的指令的例子参考自 defog tech。</p><p>第 59 讲：什么是&quot;内存可见性&quot;问题？案例一思路来自于 defog tech。</p><p>第 60 讲：主内存和工作内存的关系？&quot;JMM 有以下规定&quot;的这三点来自前辈对 JMM 的翻译和理解；第一个 CPU 的图参考自 defog tech；第二个&quot;主内存和工作内存&quot;的图来自程晓明《深入理解 Java 内存模型》<a href="https://www.infoq.cn/article/java-memory-model-1/" target="_blank" rel="noreferrer">https://www.infoq.cn/article/java-memory-model-1/</a>。</p><p>第 61 讲：什么是 happens-before 规则？加解锁的 happen-before 参考自《Java并发编程实战》，其他图片参考自 LogicBig.com。</p><p>第 62 讲：volatile 的作用是什么？与 synchronized 有什么异同？&quot;volatile 和 synchronized 的关系&quot;这一块参考了 <a href="https://zhuanlan.zhihu.com/p/55167585" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/55167585</a>。</p><p>第 63 讲：单例模式的双重检查锁模式为什么必须加 volatile？参考了</p><p>小宝马的爸爸 - 梦想的家园《单例模式（Singleton）》：<a href="https://www.cnblogs.com/BoyXiao/archive/2010/05/07/1729376.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/BoyXiao/archive/2010/05/07/1729376.html</a>；</p><p>Jark&#39;s Blog《如何正确地写出单例模式》：<a href="http://wuchong.me/blog/2014/08/28/how-to-correctly-write-singleton-pattern/" target="_blank" rel="noreferrer">http://wuchong.me/blog/2014/08/28/how-to-correctly-write-singleton-pattern/</a>；</p><p>Hollis Chuang《为什么我墙裂建议大家使用枚举来实现单例》：<a href="https://www.hollischuang.com/archives/2498" target="_blank" rel="noreferrer">https://www.hollischuang.com/archives/2498</a>；</p><p>Hollis Chuang《深度分析 Java 的枚举类型------枚举的线程安全性及序列化问题》：<a href="https://www.hollischuang.com/archives/197" target="_blank" rel="noreferrer">https://www.hollischuang.com/archives/197</a>。</p><p>第 64 讲：你知道什么是 CAS 吗？&quot;CAS 的思路&quot;未找到原始出处；&quot;CAS 的语义&quot;参考自 <a href="http://java.boot.by/ocpjp7-upgrade/ch04s03.html" target="_blank" rel="noreferrer">http://java.boot.by/ocpjp7-upgrade/ch04s03.html</a>。</p><p>第 67 讲：如何写一个必然死锁的例子？&quot;数据库中&quot;参考自《Java 并发编程实战》；必然死锁的代码是非常经典的案例，网上版本很多，参考自 <a href="https://www.cnblogs.com/baizhanshi/p/5437933.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/baizhanshi/p/5437933.html</a>，但这可能不是最原始的作者。</p><p>第 69 讲：如何用命令行和代码定位死锁？发生死锁的代码是非常经典的代码。</p><p>第 70 讲：有哪些解决死锁问题的策略？转账和 hashcode 的例子思路来自《Java 并发编程实战》和死锁相关的小节；死锁的&quot;三种主要的修复策略&quot;借鉴自清华大学向勇的操作系统课程，中国大学 mooc。</p><p>第 71 讲：讲一讲经典的哲学家就餐问题。伪代码参考了 <a href="https://phoenix.goucher.edu/~kelliher/cs42/oct11.html" target="_blank" rel="noreferrer">https://phoenix.goucher.edu/~kelliher/cs42/oct11.html</a>。</p><p>第 72 讲：final 的三种用法是什么？&quot;如果必须使用 final 方法或类，请说明原因&quot;是翻译自外国人的某篇文章。</p><p>第 73 讲：为什么加了 final 却依然无法拥有&quot;不变性&quot;？两个 Test 类代码引用自 <a href="https://www.geeksforgeeks.org/final-arrays-in-java/" target="_blank" rel="noreferrer">https://www.geeksforgeeks.org/final-arrays-in-java/</a>。</p><p>第 74 讲：为什么 String 被设计为是不可变的？&quot;字符串常量池&quot;参考了王磊老师的《Java 源码剖析 34 讲》的 01 讲的部分内容；&quot;缓存 HashCode&quot;和&quot;多线程安全&quot;思路参考自 Deecyn：<a href="https://juejin.cn/post/6844904006909689864" target="_blank" rel="noreferrer">https://juejin.cn/post/6844904006909689864</a>。</p><h4 id="其他学习或参考过的内容" tabindex="-1">其他学习或参考过的内容 <a class="header-anchor" href="#其他学习或参考过的内容" aria-label="Permalink to &quot;其他学习或参考过的内容&quot;">​</a></h4><p>《Java 并发编程之美》翟陆续 / 薛宾田：<a href="https://book.douban.com/subject/30351286/" target="_blank" rel="noreferrer">https://book.douban.com/subject/30351286/</a></p><p>《Java 并发编程实战》译者: 童云兰：<a href="https://book.douban.com/subject/10484692/" target="_blank" rel="noreferrer">https://book.douban.com/subject/10484692/</a></p><p>《Java 核心技术 卷I》作者: [美] 凯 S.霍斯特曼（Cay S.Horstmann）译者: 林琪 / 苏钰涵：<a href="https://book.douban.com/subject/34898994/" target="_blank" rel="noreferrer">https://book.douban.com/subject/34898994/</a></p><p>《深入理解 Java 内存模型》程晓明：<a href="https://www.infoq.cn/article/java-memory-model-1/" target="_blank" rel="noreferrer">https://www.infoq.cn/article/java-memory-model-1/</a>系列</p><p>《Java 并发编程的艺术》作者: 方腾飞 / 魏鹏 / 程晓明：<a href="https://book.douban.com/subject/26591326/" target="_blank" rel="noreferrer">https://book.douban.com/subject/26591326/</a></p><p>《Java 高并发编程详解-多线程与架构设计》作者: 汪文君，<a href="https://book.douban.com/subject/30255689/" target="_blank" rel="noreferrer">https://book.douban.com/subject/30255689/</a></p><p>《Java 多线程编程实战指南》核心篇和设计模式篇：作者: 黄文海：<a href="https://book.douban.com/subject/26642317/" target="_blank" rel="noreferrer">https://book.douban.com/subject/26642317/</a>和 <a href="https://book.douban.com/subject/27034721/" target="_blank" rel="noreferrer">https://book.douban.com/subject/27034721/</a></p><p>《Java 高并发程序设计》葛一鸣、郭超：<a href="https://book.douban.com/subject/26663605/" target="_blank" rel="noreferrer">https://book.douban.com/subject/26663605/</a></p><p>《Java 多线程编程核心技术》高洪岩：<a href="https://book.douban.com/subject/26555197/" target="_blank" rel="noreferrer">https://book.douban.com/subject/26555197/</a></p><p>《Java 7 并发编程实战手册》作者: [西]Javier Fernández González：<a href="https://book.douban.com/subject/25844475/" target="_blank" rel="noreferrer">https://book.douban.com/subject/25844475/</a></p><p>《Java 并发编程设计原则与模式》作者: (美)Doug Lea：<a href="https://book.douban.com/subject/1244021/" target="_blank" rel="noreferrer">https://book.douban.com/subject/1244021/</a></p><p>《精通 Java 并发编程》作者: [西] 哈维尔·费尔南德斯·冈萨雷斯：<a href="https://book.douban.com/subject/30327401/" target="_blank" rel="noreferrer">https://book.douban.com/subject/30327401/</a></p><p>《线程八大核心》：<a href="https://coding.imooc.com/class/362.html" target="_blank" rel="noreferrer">https://coding.imooc.com/class/362.html</a></p><p>《玩转 Java 并发工具》：<a href="https://coding.imooc.com/class/409.html" target="_blank" rel="noreferrer">https://coding.imooc.com/class/409.html</a></p><p>《Java 并发编程学习宝典》：<a href="https://www.imooc.com/read/49" target="_blank" rel="noreferrer">https://www.imooc.com/read/49</a></p><p>《面试官系统精讲 Java 源码及大厂真题》：<a href="https://www.imooc.com/read/47" target="_blank" rel="noreferrer">https://www.imooc.com/read/47</a></p><p>《Java 并发编程实战》：<a href="https://time.geekbang.org/column/intro/100023901" target="_blank" rel="noreferrer">https://time.geekbang.org/column/intro/100023901</a></p><p>《打通 Java 任督二脉------并发数据结构的基石》：<a href="https://juejin.cn/post/6844903736578408461#heading-2" target="_blank" rel="noreferrer">https://juejin.cn/post/6844903736578408461#heading-2</a></p><p>javadoop 并发系列文章：<a href="https://javadoop.com/" target="_blank" rel="noreferrer">https://javadoop.com/</a>。作者们写得很好，也把以上内容一并推荐给大家。</p><p>再次向以上作者表示感谢，虽然本专栏的大部分内容都是原创，但是由于我是第一次写专栏，缺乏经验，在写初稿时，没能 100% 精确记录本专栏所有文字的思路来源。</p><p>虽然在校对时，我已经从头到尾再次排查过，把来源（包括图片、思路、文字等）都尽量标注了出来，但是依然可能存在部分内容没能把具体引用的点或参考的部分详细记录清楚的情况，同时也存在部分内容找不到原作者的情况，比如 ThreadLocal 引用链的图片，网上使用这个图片的博文有很多，我没能找到真正的创作者。</p><p>对于在最开始写作时没能精确标记清楚来源这个问题，我很懊恼，但我目前没能找出更好的办法来确认每一部分内容究竟可能是引用自哪本书，对于这个问题，声明如下：</p><p>如果真的发生了这种情况，我首先向作者表示歉意。如果您认为本专栏的部分内容和您的原创内容比较相似或您觉得涉嫌侵犯您的著作权，或者您希望本专栏进一步细致标明出处，或者有任何其他诉求，请随时联系拉勾客服或作者本人，我会以最诚恳的姿态及时沟通处理。</p><p>对于给您带来的不便和困扰，再次表示歉意，对于您的理解和您的作品对编程界的贡献，再次表示感谢。</p><p>星星</p>',75),n=[p];function h(c,s,l,i,u,f){return t(),a("div",null,n)}const d=e(r,[["render",h]]);export{m as __pageData,d as default};

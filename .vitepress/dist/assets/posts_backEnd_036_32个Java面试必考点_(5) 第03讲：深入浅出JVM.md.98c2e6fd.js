import{_ as o,j as p,o as s,g as n,k as t,h as a,s as l,Q as e}from"./chunks/framework.cfb14fe0.js";const L=JSON.parse('{"title":"第03讲：深入浅出JVM","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(5) 第03讲：深入浅出JVM.md","filePath":"posts/backEnd/036_32个Java面试必考点/(5) 第03讲：深入浅出JVM.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/036_32个Java面试必考点/(5) 第03讲：深入浅出JVM.md"},r=l("h1",{id:"第03讲-深入浅出jvm",tabindex:"-1"},[a("第03讲：深入浅出JVM "),l("a",{class:"header-anchor",href:"#第03讲-深入浅出jvm","aria-label":'Permalink to "第03讲：深入浅出JVM"'},"​")],-1),h=l("p",null,"本课时的主题是 JVM 原理。JVM 是 Java 程序运行基础，面试时一定会遇到 JVM 相关的题。本课时会先对面试中 JVM 的考察点进行汇总介绍。然后对 JVM 内存模型、Java 的类加载机制、常用的 GC 算法这三个知识点进行详细讲解。最后汇总 JVM 考察点和加分项，以及这部分知识的面试真题。",-1),c=l("h6",{id:"jvm-知识点汇总",tabindex:"-1"},[a("JVM 知识点汇总 "),l("a",{class:"header-anchor",href:"#jvm-知识点汇总","aria-label":'Permalink to "JVM 知识点汇总"'},"​")],-1),d=l("p",null,"首先看看 JVM 的知识点汇总。",-1),u=l("br",null,null,-1),C=e('<p>如上图所示，JVM 知识点有 6 个大方向，其中，内存模型、类加载机制、GC 垃圾回收是比较重点的内容。性能调优部分偏重实际应用，重点突出实践能力。编译器优化和执行模式部分偏重理论基础，主要掌握知识点。</p><p>各个部分需要了解的知识点如下。</p><ul><li><p>内存模型：程序计数器、方法区、堆、栈、本地方法栈的作用，保存哪些数据。</p></li><li><p>类加载：双亲委派的加载机制，以及常用类加载器分别加载哪种类型的类。</p></li><li><p>GC：分代回收的思想和依据，以及不同垃圾回收算法实现的思路、适合的场景。</p></li><li><p>性能调优：常用的 JVM 优化参数的作用，参数调优的依据，常用的 JVM 分析工具能分析哪类问题，以及使用方法。</p></li><li><p>执行模式：解释、编译、混合模式的优缺点，Java7 提供的分层编译技术。需要知道 JIT 即时编译技术和 OSR（栈上替换），知道 C1、C2 编译器针对的场景，其中 C2 针对 Server 模式，优化更激进。在新技术方面可以了解 Java10 提供的由 Java 实现的 Graal 编译器。</p></li><li><p>编译优化：前端编译器 javac 的编译过程、AST 抽象语法树、编译期优化和运行期优化。编译优化的常用技术包括公共子表达式的消除、方法内联、逃逸分析、栈上分配、同步消除等。明白了这些才能写出对编译器友好的代码。</p></li></ul><p>JVM 的内容相对来说比较集中，但是对知识深度的掌握要求较高。</p><h6 id="详解-jvm-内存模型" tabindex="-1">详解 JVM 内存模型 <a class="header-anchor" href="#详解-jvm-内存模型" aria-label="Permalink to &quot;详解 JVM 内存模型&quot;">​</a></h6><p>JVM 内存模型主要指运行时的数据区，包括 5 个部分，如下图所示。</p>',6),m=e('<ul><li><p>栈也叫方法栈，是线程私有的，线程在执行每个方法时都会同时创建一个栈帧，用来存储局部变量表、操作栈、动态链接、方法出口等信息。调用方法时执行入栈，方法返回时执行出栈。</p></li><li><p>本地方法栈与栈类似，也是用来保存线程执行方法时的信息，不同的是，执行 Java 方法使用栈，而执行 native 方法使用本地方法栈。</p></li><li><p>程序计数器保存着当前线程所执行的字节码位置，每个线程工作时都有一个独立的计数器。程序计数器为执行 Java 方法服务，执行 native 方法时，程序计数器为空。</p></li></ul><p>栈、本地方法栈、程序计数器这三个部分都是线程独占的。</p><ul><li><p>堆是 JVM 管理的内存中最大的一块，堆被所有线程共享，目的是为了存放对象实例，几乎所有的对象实例都在这里分配。当堆内存没有可用的空间时，会抛出 OOM 异常。根据对象存活的周期不同，JVM 把堆内存进行分代管理，由垃圾回收器来进行对象的回收管理。</p></li><li><p>方法区也是各个线程共享的内存区域，又叫非堆区。用于存储已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据，JDK 1.7 中的永久代和 JDK 1.8 中的 Metaspace 都是方法区的一种实现。</p></li></ul><p>面试回答这个问题时，要答出两个要点：一个是各部分的功能，另一个是哪些线程共享，哪些独占。</p><h6 id="详解-jmm-内存可见性" tabindex="-1">详解 JMM 内存可见性 <a class="header-anchor" href="#详解-jmm-内存可见性" aria-label="Permalink to &quot;详解 JMM 内存可见性&quot;">​</a></h6><p>JMM 是 Java 内存模型，与刚才讲到的 JVM 内存模型是两回事，JMM 的主要目标是定义程序中变量的访问规则，如下图所示，所有的共享变量都存储在主内存中共享。每个线程有自己的工作内存，工作内存中保存的是主内存中变量的副本，线程对变量的读写等操作必须在自己的工作内存中进行，而不能直接读写主内存中的变量。</p><br>',7),M=l("p",null,"在多线程进行数据交互时，例如线程 A 给一个共享变量赋值后，由线程 B 来读取这个值，A 修改完变量是修改在自己的工作区内存中，B 是不可见的，只有从 A 的工作区写回主内存，B 再从主内存读取自己的工作区才能进行进一步的操作。由于指令重排序的存在，这个写---读的顺序有可能被打乱。因此 JMM 需要提供原子性、可见性、有序性的保证。",-1),A=l("h6",{id:"详解-jmm-保证",tabindex:"-1"},[a("详解 JMM 保证 "),l("a",{class:"header-anchor",href:"#详解-jmm-保证","aria-label":'Permalink to "详解 JMM 保证"'},"​")],-1),J=l("p",null,"如下图所示，来看 JMM 如何保证原子性、可见性，有序性。",-1),g=l("br",null,null,-1),G=e('<h6 id="原子性" tabindex="-1">原子性 <a class="header-anchor" href="#原子性" aria-label="Permalink to &quot;原子性&quot;">​</a></h6><p>JMM 保证对除 long 和 double 外的基础数据类型的读写操作是原子性的。另外关键字 synchronized 也可以提供原子性保证。synchronized 的原子性是通过 Java 的两个高级的字节码指令 monitorenter 和 monitorexit 来保证的。</p><h6 id="可见性" tabindex="-1">可见性 <a class="header-anchor" href="#可见性" aria-label="Permalink to &quot;可见性&quot;">​</a></h6><p>JMM 可见性的保证，一个是通过 synchronized，另外一个就是 volatile。volatile 强制变量的赋值会同步刷新回主内存，强制变量的读取会从主内存重新加载，保证不同的线程总是能够看到该变量的最新值。</p><h6 id="有序性" tabindex="-1">有序性 <a class="header-anchor" href="#有序性" aria-label="Permalink to &quot;有序性&quot;">​</a></h6><p>对有序性的保证，主要通过 volatile 和一系列 happens-before 原则。volatile 的另一个作用就是阻止指令重排序，这样就可以保证变量读写的有序性。</p><p>happens-before 原则包括一系列规则，如：</p><ul><li><p>程序顺序原则，即一个线程内必须保证语义串行性；</p></li><li><p>锁规则，即对同一个锁的解锁一定发生在再次加锁之前；</p></li><li><p>happens-before 原则的传递性、线程启动、中断、终止规则等。</p></li></ul><h5 id="详解类加载机制" tabindex="-1">详解类加载机制 <a class="header-anchor" href="#详解类加载机制" aria-label="Permalink to &quot;详解类加载机制&quot;">​</a></h5><p>类的加载指将编译好的 Class 类文件中的字节码读入内存中，将其放在方法区内并创建对应的 Class 对象。类的加载分为加载、链接、初始化，其中链接又包括验证、准备、解析三步。如下图所示。</p><br>',11),b=e('<ol><li><p>加载是文件到内存的过程。通过类的完全限定名查找此类字节码文件，并利用字节码文件创建一个 Class 对象。</p></li><li><p>验证是对类文件内容验证。目的在于确保 Class 文件符合当前虚拟机要求，不会危害虚拟机自身安全。主要包括四种：文件格式验证，元数据验证，字节码验证，符号引用验证。</p></li><li><p>准备阶段是进行内存分配。为类变量也就是类中由 static 修饰的变量分配内存，并且设置初始值。这里要注意，初始值是 0 或者 null，而不是代码中设置的具体值，代码中设置的值是在初始化阶段完成的。另外这里也不包含用 final 修饰的静态变量，因为 final 在编译的时候就会分配。</p></li><li><p>解析主要是解析字段、接口、方法。主要是将常量池中的符号引用替换为直接引用的过程。直接引用就是直接指向目标的指针、相对偏移量等。</p></li><li><p>初始化，主要完成静态块执行与静态变量的赋值。这是类加载最后阶段，若被加载类的父类没有初始化，则先对父类进行初始化。</p></li></ol><p>只有对类主动使用时，才会进行初始化，初始化的触发条件包括在创建类的实例时、访问类的静态方法或者静态变量时、Class.forName() 反射类时、或者某个子类被初始化时。</p><p>如上图所示，浅绿的两个部分表示类的生命周期，就是从类的加载到类实例的创建与使用，再到类对象不再被使用时可以被 GC 卸载回收。这里要注意一点，由 Java 虚拟机自带的三种类加载器加载的类在虚拟机的整个生命周期中是不会被卸载的，只有用户自定义的类加载器所加载的类才可以被卸载。</p><h5 id="详解类加载器" tabindex="-1">详解类加载器 <a class="header-anchor" href="#详解类加载器" aria-label="Permalink to &quot;详解类加载器&quot;">​</a></h5>',4),T=l("p",null,"如上图所示，Java 自带的三种类加载器分别是：BootStrap 启动类加载器、扩展类加载器和应用加载器（也叫系统加载器）。图右边的桔黄色文字表示各类加载器对应的加载目录。启动类加载器加载 java home 中 lib 目录下的类，扩展加载器负责加载 ext 目录下的类，应用加载器加载 classpath 指定目录下的类。除此之外，可以自定义类加载器。",-1),V=l("p",null,"Java 的类加载使用双亲委派模式，即一个类加载器在加载类时，先把这个请求委托给自己的父类加载器去执行，如果父类加载器还存在父类加载器，就继续向上委托，直到顶层的启动类加载器，如上图中蓝色向上的箭头。如果父类加载器能够完成类加载，就成功返回，如果父类加载器无法完成加载，那么子加载器才会尝试自己去加载。如图中的桔黄色向下的箭头。",-1),S=l("p",null,"这种双亲委派模式的好处，可以避免类的重复加载，另外也避免了 Java 的核心 API 被篡改。",-1),v=l("h5",{id:"详解分代回收",tabindex:"-1"},[a("详解分代回收 "),l("a",{class:"header-anchor",href:"#详解分代回收","aria-label":'Permalink to "详解分代回收"'},"​")],-1),B=l("p",null,"Java 的堆内存被分代管理，为什么要分代管理呢？分代管理主要是为了方便垃圾回收，这样做基于2个事实，第一，大部分对象很快就不再使用；第二，还有一部分不会立即无用，但也不会持续很长时间。",-1),q=l("p",null,"虚拟机划分为年轻代、老年代、和永久代，如下图所示。",-1),P=l("br",null,null,-1),f=e('<ul><li><p>年轻代主要用来存放新创建的对象，年轻代分为 Eden 区和两个 Survivor 区。大部分对象在 Eden 区中生成。当 Eden 区满时，还存活的对象会在两个 Survivor 区交替保存，达到一定次数的对象会晋升到老年代。</p></li><li><p>老年代用来存放从年轻代晋升而来的，存活时间较长的对象。</p></li><li><p>永久代，主要保存类信息等内容，这里的永久代是指对象划分方式，不是专指 1.7 的 PermGen，或者 1.8 之后的 Metaspace。</p></li></ul><p>根据年轻代与老年代的特点，JVM 提供了不同的垃圾回收算法。垃圾回收算法按类型可以分为引用计数法、复制法和标记清除法。</p><ul><li><p>引用计数法是通过对象被引用的次数来确定对象是否被使用，缺点是无法解决循环引用的问题。</p></li><li><p>复制算法需要 from 和 to 两块相同大小的内存空间，对象分配时只在 from 块中进行，回收时把存活对象复制到 to 块中，并清空 from 块，然后交换两块的分工，即把 from 块作为 to 块，把 to 块作为 from 块。缺点是内存使用率较低。</p></li><li><p>标记清除算法分为标记对象和清除不在使用的对象两个阶段，标记清除算法的缺点是会产生内存碎片。</p></li></ul><p>JVM 中提供的年轻代回收算法 Serial、ParNew、Parallel Scavenge 都是复制算法，而 CMS、G1、ZGC 都属于标记清除算法。</p><h5 id="详解-cms-算法" tabindex="-1">详解 CMS 算法 <a class="header-anchor" href="#详解-cms-算法" aria-label="Permalink to &quot;详解 CMS 算法&quot;">​</a></h5><p>基于分代回收理论，详细介绍几个典型的垃圾回收算法，先来看 CMS 回收算法。CMS 在 JDK1.7 之前可以说是最主流的垃圾回收算法。CMS 使用标记清除算法，优点是并发收集，停顿小。</p><p>CMS 算法如下图所示。</p><br>',8),k=e('<ol><li><p>第一个阶段是初始标记，这个阶段会 stop the world，标记的对象只是从 root 集最直接可达的对象；</p></li><li><p>第二个阶段是并发标记，这时 GC 线程和应用线程并发执行。主要是标记可达的对象；</p></li><li><p>第三个阶段是重新标记阶段，这个阶段是第二个 stop the world 的阶段，停顿时间比并发标记要小很多，但比初始标记稍长，主要对对象进行重新扫描并标记；</p></li><li><p>第四个阶段是并发清理阶段，进行并发的垃圾清理；</p></li><li><p>最后一个阶段是并发重置阶段，为下一次 GC 重置相关数据结构。</p></li></ol><h5 id="详解-g1-算法" tabindex="-1">详解 G1 算法 <a class="header-anchor" href="#详解-g1-算法" aria-label="Permalink to &quot;详解 G1 算法&quot;">​</a></h5><p>G1 在 1.9 版本后成为 JVM 的默认垃圾回收算法，G1 的特点是保持高回收率的同时，减少停顿。</p><br><p>G1 算法取消了堆中年轻代与老年代的物理划分，但它仍然属于分代收集器。G1 算法将堆划分为若干个区域，称作 Region，如下图中的小方格所示。一部分区域用作年轻代，一部分用作老年代，另外还有一种专门用来存储巨型对象的分区。</p><br>',6),x=e('<p>G1 也和 CMS 一样会遍历全部的对象，然后标记对象引用情况，在清除对象后会对区域进行复制移动整合碎片空间。</p><p>G1 回收过程如下。</p><ol><li><p>G1 的年轻代回收，采用复制算法，并行进行收集，收集过程会 STW。</p></li><li><p>G1 的老年代回收时也同时会对年轻代进行回收。主要分为四个阶段：</p><ol><li><p>依然是初始标记阶段完成对根对象的标记，这个过程是STW的；</p></li><li><p>并发标记阶段，这个阶段是和用户线程并行执行的；</p></li><li><p>最终标记阶段，完成三色标记周期；</p></li><li><p>复制/清除阶段，这个阶段会优先对可回收空间较大的 Region 进行回收，即 garbage first，这也是 G1 名称的由来。</p></li></ol></li></ol><br><p>G1 采用每次只清理一部分而不是全部的 Region 的增量式清理，由此来保证每次 GC 停顿时间不会过长。</p><p>总结如下，G1 是逻辑分代不是物理划分，需要知道回收的过程和停顿的阶段。此外还需要知道，G1 算法允许通过 JVM 参数设置 Region 的大小，范围是 1～32MB，可以设置期望的最大 GC 停顿时间等。有兴趣读者也可以对 CMS 和 G1 使用的三色标记算法做简单了解。</p><h6 id="详解-zgc" tabindex="-1">详解 ZGC <a class="header-anchor" href="#详解-zgc" aria-label="Permalink to &quot;详解 ZGC&quot;">​</a></h6><h6 id="zgc-特点" tabindex="-1">ZGC 特点 <a class="header-anchor" href="#zgc-特点" aria-label="Permalink to &quot;ZGC 特点&quot;">​</a></h6><p>ZGC 是最新的 JDK1.11 版本中提供的高效垃圾回收算法，ZGC 针对大堆内存设计可以支持 TB 级别的堆，ZGC 非常高效，能够做到 10ms 以下的回收停顿时间。</p><p>这么快的响应，ZGC 是如何做到的呢？这是由于 ZGC 具有以下特点。</p><ol><li><p>ZGC 使用了着色指针技术，我们知道 64 位平台上，一个指针的可用位是 64 位，ZGC 限制最大支持 4TB 的堆，这样寻址只需要使用 42 位，那么剩下 22 位就可以用来保存额外的信息，着色指针技术就是利用指针的额外信息位，在指针上对对象做着色标记。</p></li><li><p>第二个特点是使用读屏障，ZGC 使用读屏障来解决 GC 线程和应用线程可能并发修改对象状态的问题，而不是简单粗暴的通过 STW 来进行全局的锁定。使用读屏障只会在单个对象的处理上有概率被减速。</p></li><li><p>由于读屏障的作用，进行垃圾回收的大部分时候都是不需要 STW 的，因此 ZGC 的大部分时间都是并发处理，也就是 ZGC 的第三个特点。</p></li><li><p>第四个特点是基于 Region，这与 G1 算法一样，不过虽然也分了 Region，但是并没有进行分代。ZGC 的 Region 不像 G1 那样是固定大小，而是动态地决定 Region 的大小，Region 可以动态创建和销毁。这样可以更好的对大对象进行分配管理。</p></li><li><p>第五个特点是压缩整理。CMS 算法清理对象时原地回收，会存在内存碎片问题。ZGC 和 G1 一样，也会在回收后对 Region 中的对象进行移动合并，解决了碎片问题。</p></li></ol><p>虽然 ZGC 的大部分时间是并发进行的，但是还会有短暂的停顿。来看一下 ZGC 的回收过程。</p><h6 id="zgc-回收过程" tabindex="-1">ZGC 回收过程 <a class="header-anchor" href="#zgc-回收过程" aria-label="Permalink to &quot;ZGC 回收过程&quot;">​</a></h6><p>如下图所示，使用 ZGC 算法进行回收，从上往下看。初始状态时，整个堆空间被划分为大小不等的许多 Region，即图中绿色的方块。</p><br>',15),Z=e('<p>开始进行回收时，ZGC 首先会进行一个短暂的 STW，来进行 roots 标记。这个步骤非常短，因为 roots 的总数通常比较小。</p><br><p>然后就开始进行并发标记，如上图所示，通过对对象指针进行着色来进行标记，结合读屏障解决单个对象的并发问题。其实，这个阶段在最后还是会有一个非常短的 STW 停顿，用来处理一些边缘情况，这个阶段绝大部分时间是并发进行的，所以没有明显标出这个停顿。</p><p>下一个是清理阶段，这个阶段会把标记为不在使用的对象进行回收，如上图所示，把橘色的不在使用的对象进行了回收。</p><p>最后一个阶段是重定位，重定位就是对 GC 后存活的对象进行移动，来释放大块的内存空间，解决碎片问题。</p><p>重定位最开始会有一个短暂的 STW，用来重定位集合中的 root 对象。暂停时间取决于 root 的数量、重定位集与对象的总活动集的比率。</p><p>最后是并发重定位，这个过程也是通过读屏障，与应用线程并发进行的。</p><h6 id="考察点和加分项" tabindex="-1">考察点和加分项 <a class="header-anchor" href="#考察点和加分项" aria-label="Permalink to &quot;考察点和加分项&quot;">​</a></h6><h6 id="考察点" tabindex="-1">考察点 <a class="header-anchor" href="#考察点" aria-label="Permalink to &quot;考察点&quot;">​</a></h6><p>总结 JVM 相关的面试考察点如下：</p><ol><li><p>深入了解 JVM 的内存模型和 Java 的内存模型；</p></li><li><p>要了解类的加载过程，了解双亲委派机制；</p></li><li><p>要理解内存的可见性与 Java 内存模型对原子性、可见性、有序性的保证机制；</p></li><li><p>要了解常用的 GC 算法的特点、执行过程，和适用场景，例如 G1 适合对最大延迟有要求的场合，ZGC 适用于 64 位系统的大内存服务中；</p></li><li><p>要了解常用的 JVM 参数，明白对不同参数的调整会有怎样的影响，适用什么样的场景，例如垃圾回收的并发数、偏向锁设置等。</p></li></ol><h6 id="加分项" tabindex="-1">加分项 <a class="header-anchor" href="#加分项" aria-label="Permalink to &quot;加分项&quot;">​</a></h6><p>如果想要给面试官留下更好的印象，注意这些加分项。</p><ol><li><p>如果在编译器优化方面有深入的了解的话，会让面试官觉得你对技术的深度比较有追求。例如知道在编程时如何合理利用栈上分配降低 GC 压力、如何编写适合内联优化等代码等。</p></li><li><p>如果你能有线上实际问题的排查经验或思路那就更好了，面试官都喜欢动手能力强的同学。例如解决过线上经常 FullGC 问题，排查过内存泄露问题等。</p></li><li><p>如果能有针对特定场景的 JVM 优化实践或者优化思路，也会有意想不到的效果。例如针对高并发低延迟的场景，如何调整 GC 参数尽量降低 GC 停顿时间，针对队列处理机如何尽可能提高吞吐率等；</p></li><li><p>如果对最新的 JVM 技术趋势有所了解，也会给面试官留下比较深刻的印象。例如了解 ZGC 高效的实现原理，了解 Graalvm 的特点等。</p></li></ol><h6 id="真题汇总" tabindex="-1">真题汇总 <a class="header-anchor" href="#真题汇总" aria-label="Permalink to &quot;真题汇总&quot;">​</a></h6><p>总结 JVM 相关的面试真题，第一部分真题如下，课后可以重点练习。</p>',16),I=l("p",null,"解题思路如下所示。",-1),R=l("ul",null,[l("li",null,[l("p",null,"第 1 题 Java 内存模型前面讲过，面试时回答这个问题时记得和面试官确认是希望回答 JVM 的内存模型，还是 Java 对内存访问的模型，不要答跑偏。")]),l("li",null,[l("p",null,"第 2 题要复习一下什么场景下会触发 FullGC，例如年轻代晋升时老年代空间不足，例如永久代空间不足等。")]),l("li",null,[l("p",null,"第 3～6 题前面已经有过讲解，因此不再重复。")])],-1),j=l("br",null,null,-1),D=l("p",null,"第二部分真题如下所示。",-1),N=l("p",null,"解题思路如下所示。",-1),E=l("ul",null,[l("li",null,[l("p",null,"第 7 题 volatile 要重点回答强制主内存读写同步以及防止指令重排序两点。")]),l("li",null,[l("p",null,"第 8、9 题前面已经讲过。")]),l("li",null,[l("p",null,"第 10 题重点介绍出强、弱、软、虚四种引用，以及在 GC 中的处理方式。")]),l("li",null,[l("p",null,"第 11 题可以了解一下 Java 自带的几种工具的功能，例如 JMC 中的飞行记录器，堆分析工具 MAT，线程分析工具 jstack 和获取堆信息的 jmap 等。")])],-1),z=l("p",null,"本课时内容至此结束，下一课时讲解 Java 另一个非常重要的内容：多线程。",-1),O=l("br",null,null,-1);function W(w,F,K,Q,U,y){const i=p("Image");return s(),n("div",null,[r,h,c,d,u,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DB/CgotOV14lumAJ5mOAAOz7eKZQb8955.png"}),a(),C,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14lumAchYcAAB51w2Hj9Y736.png"}),a(),m,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DB/CgotOV14lumATjNyAAB-0Ie_3x8688.png"}),a(),M,A,J,g,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14lumAex05AAB83iBktjQ024.png"}),a(),G,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DB/CgotOV14lumAWI3bAACVhLcSULk171.png"}),a(),b,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14luqAA8NAAABwXhjZrug069.png"}),a(),T,V,S,v,B,q,P,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14luqAFGZHAABEqvU94zM441.png"}),a(),f,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DB/CgotOV14luqAB61oAABezTrv-gg961.png"}),a(),k,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14luqAR5suAAB5tOFWo20859.png"}),a(),x,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14luqAauqUAAB6N4rQvYU477.png"}),a(),Z,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DB/CgotOV14luqALq0IAACqj_5S_nw868.png"}),a(),I,R,j,D,t(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14luuAJqWRAACFJ6QM8Tg783.png"}),a(),N,E,z,O])}const Y=o(_,[["render",W]]);export{L as __pageData,Y as default};

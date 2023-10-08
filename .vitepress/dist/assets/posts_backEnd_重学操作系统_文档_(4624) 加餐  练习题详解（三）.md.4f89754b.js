import{_ as t,j as e,o,g as i,k as r,h as s,Q as a}from"./chunks/framework.a0d18f64.js";const S=JSON.parse('{"title":"加餐练习题详解（三）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4624) 加餐  练习题详解（三）.md","filePath":"posts/backEnd/重学操作系统_文档/(4624) 加餐  练习题详解（三）.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/重学操作系统_文档/(4624) 加餐  练习题详解（三）.md"},p=a('<h1 id="加餐练习题详解-三" tabindex="-1">加餐练习题详解（三） <a class="header-anchor" href="#加餐练习题详解-三" aria-label="Permalink to &quot;加餐练习题详解（三）&quot;">​</a></h1><p>今天我会带你把《模块三：操作系统基础知识》中涉及的课后练习题，逐一讲解，并给出每个课时练习题的解题思路和答案。</p><h3 id="练习题详解" tabindex="-1">练习题详解 <a class="header-anchor" href="#练习题详解" aria-label="Permalink to &quot;练习题详解&quot;">​</a></h3><h4 id="_13-操作系统内核-linux-内核和-windows-内核有什么区别" tabindex="-1">13 | 操作系统内核：Linux 内核和 Windows 内核有什么区别？ <a class="header-anchor" href="#_13-操作系统内核-linux-内核和-windows-内核有什么区别" aria-label="Permalink to &quot;13 \\| 操作系统内核：Linux 内核和 Windows 内核有什么区别？&quot;">​</a></h4><p><strong>【问题】</strong> Unix 和 Mac OS 内核属于哪种类型？</p><p><strong>【解析】</strong> Unix 和 Linux 非常类似，也是宏内核。Mac OS 用的是 XNU 内核， XNU 是一种混合型内核。为了帮助你理解，我找了一张 Mac OS 的内核架构图。 如下图所示，可以看到内部是一个叫作 XNU 的宏内核。XNU 是 X is not Unix 的意思， 是一个受 Unix 影响很大的内核。</p>',6),c=a('<p>Mac OS 内核架构图</p><h4 id="_14-用户态和内核态-用户态线程和内核态线程有什么区别" tabindex="-1">14 | 用户态和内核态：用户态线程和内核态线程有什么区别？ <a class="header-anchor" href="#_14-用户态和内核态-用户态线程和内核态线程有什么区别" aria-label="Permalink to &quot;14 \\| 用户态和内核态：用户态线程和内核态线程有什么区别？&quot;">​</a></h4><p><strong>【问题】</strong> JVM 的线程是用户态线程还是内核态线程？</p><p><strong>【解析】</strong> JVM 自己本身有一个线程模型。在 JDK 1.1 的时候，JVM 自己管理用户级线程。这样做缺点非常明显，操作系统只调度内核级线程，用户级线程相当于基于操作系统分配到进程主线程的时间片，再次拆分，因此无法利用多核特性。</p><p>为了解决这个问题，后来 Java 改用线程映射模型，因此，需要操作系统支持。在 Windows 上是 1 对 1 的模型，在 Linux 上是 n 对 m 的模型。顺便说一句，Linux 的PThreadAPI 创建的是用户级线程，如果 Linux 要创建内核级线程有KThreadAPI。映射关系是操作系统自动完成的，用户不需要管。</p><h4 id="_15-中断和中断向量-java-js-等语言为什么可以捕获到键盘输入" tabindex="-1">15 | 中断和中断向量：Java/JS 等语言为什么可以捕获到键盘输入？ <a class="header-anchor" href="#_15-中断和中断向量-java-js-等语言为什么可以捕获到键盘输入" aria-label="Permalink to &quot;15 \\| 中断和中断向量：Java/JS 等语言为什么可以捕获到键盘输入？&quot;">​</a></h4><p><strong>【问题】</strong> 操作系统可以处理键盘按键，这很好理解，但是在开机的时候系统还没有载入内存，为什么可以使用键盘呢？这个怎么解释？</p><p><strong>【解析】</strong> 主板的一块 ROM 上往往还有一个简化版的操作系统，叫 BIOS（Basic Input/Ouput System）。在 OS 还没有接管计算机前，先由 BIOS 管理机器，并协助加载 OS 到内存。早期的 OS 还会利用 BIOS 的能力，现代的 OS 接管后，就会替换掉 BIOS 的中断向量。</p><h4 id="_16-win-mac-unix-linux-的区别和联系-为什么-debian-漏洞排名第一还这么多人用" tabindex="-1">16 | Win/Mac/Unix/Linux 的区别和联系：为什么 Debian 漏洞排名第一还这么多人用？ <a class="header-anchor" href="#_16-win-mac-unix-linux-的区别和联系-为什么-debian-漏洞排名第一还这么多人用" aria-label="Permalink to &quot;16 \\| Win/Mac/Unix/Linux 的区别和联系：为什么 Debian 漏洞排名第一还这么多人用？&quot;">​</a></h4><p><strong>【问题】</strong> 林纳斯 21 岁写出 Linux，那么开发一个操作系统的难度到底大不大？</p><p><strong>【解析】</strong> 毫无疑问能在 21 岁就写出 Linux 的人定是天赋异禀，林纳斯是参照一个 Minix 系统写的 Linux 内核。如果你对此感兴趣，可以参考这个 <a href="https://github.com/zavg/linux-0.01" target="_blank" rel="noreferrer">1991 年的源代码</a>。</p><p>写一个操作系统本身并不是非常困难。需要了解一些基础的数据结构与算法，硬件设备工作原理。关键是要有参照，比如核心部分可以参考前人的内核。</p><p>但是随着硬件、软件技术发展了这么多年，如果想再写一个大家能够接受的内核，是一件非常困难的事情。内核的能力在上升，硬件的种类在上升，所以 Android 和很多后来的操作系统都是拿 Linux 改装。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>操作系统中的程序，除去内核部分，剩下绝大多数都可以称为应用。应用是千变万化的，内核是统一而稳定的。操作系统分成 3 层：应用层、内核层、硬件层。因此，内核是连接应用和硬件的桥梁。</p><p>内核需要公平的对待每个 CPU，于是有了用户态和内核态的切换；为了实现切换，需要中断；为了保护内存资源，需要划分用户态和内核态；为了更好地使用计算资源，需要划分线程------而线程需要操作系统内核调度。本模块所讲的内容，还只是对内核理解的冰山一角，后面我们还会从多线程、内存管理、文件系统、虚拟化的角度，重新审视内核的设计。</p><p>最后，我再跟你分享一下我自己的一点小小心得：在给你讲解操作系统的过程中，我仿佛也回到了 20 世纪 70 年代那个风起云涌的时代。在整理操作系统、编程语言、个人电脑领域的大黑客、发明家、企业家们的故事时，我发现这些程序员，强大的不仅仅是技术和创造力，更多的还是对时机的把握。我觉得从这个角度来看，除了要提升自身的技术能力，你也要重视人文知识的学习，这可以帮助你在以后的工作中做得更好。</p><p>好的，操作系统基本概念部分就告一段落。接下来，我们将开始多线程并发相关学习，请和我一起来学习&quot;<strong>模块四：进程和线程</strong>&quot;吧。</p>',18);function d(h,l,u,x,g,m){const n=e("Image");return o(),i("div",null,[p,r(n,{alt:"Lark20201104-145231.png",src:"https://s0.lgstatic.com/i/image/M00/67/C1/Ciqc1F-iT8KAGRnKAAJ29-TOIo8834.png"}),s(),c])}const f=t(_,[["render",d]]);export{S as __pageData,f as default};

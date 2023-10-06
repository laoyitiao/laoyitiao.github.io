import{_ as s,j as n,o as p,g as e,k as l,h as o,Q as i,s as t}from"./chunks/framework.b3d8e22e.js";const W=JSON.parse('{"title":"进程和线程 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4625) 17  进程和线程：进程的开销比线程大在了哪里？.md","filePath":"posts/backEnd/重学操作系统_文档/(4625) 17  进程和线程：进程的开销比线程大在了哪里？.md","lastUpdated":1696417798000}'),_={name:"posts/backEnd/重学操作系统_文档/(4625) 17  进程和线程：进程的开销比线程大在了哪里？.md"},r=i("",7),c=i("",13),h=t("p",null,"下面这张图更加直观一些，进程 P1 先执行一个时间片段，然后进程 P2 开始执行一个时间片段， 然后进程 P3，然后进程 P4......",-1),d=i("",5),g=t("p",null,'有时候一个进程（线程）会等待磁盘读取数据，或者等待打印机响应，此时进程自己会进入"阻塞"（Block）状态。',-1),u=t("p",null,'因为这时计算机的响应不能马上给出来，而是需要等待磁盘、打印机处理完成后，通过中断通知 CPU，然后 CPU 再执行一小段中断控制程序，将控制权转给操作系统，操作系统再将原来阻塞的进程（线程）置为"就绪"（Ready）状态重新排队。',-1),C=t("p",null,'而且，一旦一个进程（线程）进入阻塞状态，这个进程（线程）此时就没有事情做了，但又不能让它重新排队（因为需要等待中断），所以进程（线程）中需要增加一个"阻塞"（Block）状态。',-1),A=t("p",null,'注意，因为一个处于"就绪"（Ready）的进程（线程）还在排队，所以进程（线程）内的程序无法执行，也就是不会触发读取磁盘数据的操作，这时，"就绪"（Ready）状态无法变成阻塞的状态，因此下图中没有从就绪到阻塞的箭头。',-1),P=t("p",null,'而处于"阻塞"（Block）状态的进程（线程）如果收到磁盘读取完的数据，它又需要重新排队，所以它也不能直接回到"运行"（Running）状态，因此下图中没有从阻塞态到运行态的箭头。',-1),m=i("",7),q=t("p",null,"细分的话，进程表需要这几类信息。",-1),k=t("ul",null,[t("li",null,[t("p",null,[t("strong",null,"描述信息"),o("：这部分是描述进程的唯一识别号，也就是 PID，包括进程的名称、所属的用户等。")])]),t("li",null,[t("p",null,[t("strong",null,"资源信息"),o("：这部分用于记录进程拥有的资源，比如进程和虚拟内存如何映射、拥有哪些文件、在使用哪些 I/O 设备等，当然 I/O 设备也是文件。")])]),t("li",null,[t("p",null,[t("strong",null,"内存布局"),o("：操作系统也约定了进程如何使用内存。如下图所示，描述了一个进程大致内存分成几个区域，以及每个区域用来做什么。 每个区域我们叫作一个段。")])])],-1),T=i("",6),b=t("p",null,"对于一个进程的多个线程来说，可以考虑共享进程分配到的内存资源，这样线程就只需要被分配执行资源。",-1),U=t("h4",{id:"进程-线程-切换",tabindex:"-1"},[o("进程（线程）切换 "),t("a",{class:"header-anchor",href:"#进程-线程-切换","aria-label":'Permalink to "进程（线程）切换"'},"​")],-1),I=t("p",null,"进程（线程）在操作系统中是不断切换的，现代操作系统中只有线程的切换。 每次切换需要先保存当前寄存器的值的内存，注意 PC 指针也是一种寄存器。当恢复执行的时候，就需要从内存中读出所有的寄存器，恢复之前的状态，然后执行。",-1),f=t("p",null,"上面讲到的内容，我们可以概括为以下 5 个步骤：",-1),x=t("ol",null,[t("li",null,[t("p",null,'当操作系统发现一个进程（线程）需要被切换的时候，直接控制 PC 指针跳转是非常危险的事情，所以操作系统需要发送一个"中断"信号给 CPU，停下正在执行的进程（线程）。')]),t("li",null,[t("p",null,"当 CPU 收到中断信号后，正在执行的进程（线程）会立即停止。注意，因为进程（线程）马上被停止，它还来不及保存自己的状态，所以后续操作系统必须完成这件事情。")]),t("li",null,[t("p",null,"操作系统接管中断后，趁寄存器数据还没有被破坏，必须马上执行一小段非常底层的程序（通常是汇编编写），帮助寄存器保存之前进程（线程）的状态。")]),t("li",null,[t("p",null,"操作系统保存好进程状态后，执行调度程序，决定下一个要被执行的进程（线程）。")]),t("li",null,[t("p",null,"最后，操作系统执行下一个进程（线程）。")])],-1),D=t("p",null,"当然，一个进程（线程）被选择执行后，它会继续完成之前被中断时的任务，这需要操作系统来执行一小段底层的程序帮助进程（线程）恢复状态。",-1),S=t("p",null,"一种可能的算法就是通过栈这种数据结构。进程（线程）中断后，操作系统负责压栈关键数据（比如寄存器）。恢复执行时，操作系统负责出栈和恢复寄存器的值。",-1),M=t("h4",{id:"多核处理",tabindex:"-1"},[o("多核处理 "),t("a",{class:"header-anchor",href:"#多核处理","aria-label":'Permalink to "多核处理"'},"​")],-1),E=t("p",null,"在多核系统中我们上面所讲的设计原则依然成立，只不过动力变多了，可以并行执行的进程（线程）。通常情况下，CPU 有几个核，就可以并行执行几个进程（线程）。这里强调一个概念，我们通常说的并发，英文是 concurrent，指的在一段时间内几个任务看上去在同时执行（不要求多核）；而并行，英文是 parallel，任务必须绝对的同时执行（要求多核）。",-1),L=t("p",null,[o('比如一个 4 核的 CPU 就好像拥有 4 条流水线，可以并行执行 4 个任务。一个进程的多个线程执行过程则会产生竞争条件，这块我们会在"'),t("strong",null,"19 讲"),o('"锁和信号量部分给你介绍。因为操作系统提供了保存、恢复进程状态的能力，使得进程（线程）也可以在多个核心之间切换。')],-1),V=t("h3",{id:"创建进程-线程-的-api",tabindex:"-1"},[o("创建进程（线程）的 API "),t("a",{class:"header-anchor",href:"#创建进程-线程-的-api","aria-label":'Permalink to "创建进程（线程）的 API"'},"​")],-1),R=t("p",null,"用户想要创建一个进程，最直接的方法就是从命令行执行一个程序，或者双击打开一个应用。但对于程序员而言，显然需要更好的设计。",-1),N=t("p",null,"站在设计者的角度，你可以这样思考：首先，应该有 API 打开应用，比如可以通过函数打开某个应用；另一方面，如果程序员希望执行完一段代价昂贵的初始化过程后，将当前程序的状态复制好几份，变成一个个单独执行的进程，那么操作系统提供了 fork 指令。",-1),B=i("",19);function H(F,O,v,y,K,Q){const a=n("Image");return p(),e("div",null,[r,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/67/CD/CgqCHl-iUK2AJ1NsAANGIm3_RCk282.png"}),o(),c,l(a,{alt:"Lark20201104-145535.png",src:"https://s0.lgstatic.com/i/image/M00/67/CE/CgqCHl-iUNWARGseAACvXwFzOgM513.png"}),h,l(a,{alt:"Lark20201104-145538.png",src:"https://s0.lgstatic.com/i/image/M00/67/C2/Ciqc1F-iUOOAH_pCAAAxJPD4vZk085.png"}),d,l(a,{alt:"Lark20201104-145543.png",src:"https://s0.lgstatic.com/i/image/M00/67/CE/CgqCHl-iUO-AUnnuAACQlYvu6B4917.png"}),g,l(a,{alt:"Lark20201104-145546.png",src:"https://s0.lgstatic.com/i/image/M00/67/C2/Ciqc1F-iUPuAcCoPAABsXQQRmUA149.png"}),u,C,l(a,{alt:"Lark20201104-145541.png",src:"https://s0.lgstatic.com/i/image/M00/67/C3/Ciqc1F-iURaABVqnAADDuMgPbV8806.png"}),A,P,l(a,{alt:"Lark20201104-145548.png",src:"https://s0.lgstatic.com/i/image/M00/67/CE/CgqCHl-iUSGAcoiLAAC6OKgt1vo694.png"}),m,l(a,{alt:"Lark20201104-150201.png",src:"https://s0.lgstatic.com/i/image/M00/67/C3/Ciqc1F-iUfmAKH85AAFKvhw_d6g282.png"}),q,k,l(a,{alt:"Lark20201104-145551.png",src:"https://s0.lgstatic.com/i/image/M00/67/C3/Ciqc1F-iUWyADMH4AACX7Ob_EWs477.png"}),T,l(a,{alt:"Lark20201104-145554.png",src:"https://s0.lgstatic.com/i/image/M00/67/CE/CgqCHl-iUX-AaaGjAABDIYvxzjM808.png"}),b,U,I,l(a,{alt:"Lark20201104-145523.png",src:"https://s0.lgstatic.com/i/image/M00/67/CE/CgqCHl-iUY-AEqrUAAKnDhPzBcQ340.png"}),f,x,l(a,{alt:"Lark20201104-145556.png",src:"https://s0.lgstatic.com/i/image/M00/67/C3/Ciqc1F-iUZ-Af-t9AAC3WjDjEM4772.png"}),D,l(a,{alt:"Lark20201104-145530.png",src:"https://s0.lgstatic.com/i/image/M00/67/C3/Ciqc1F-iUa-AdqG9AACMOQKJe2Q431.png"}),S,M,E,l(a,{alt:"Lark20201104-145533.png",src:"https://s0.lgstatic.com/i/image/M00/67/CE/CgqCHl-iUbyAQr5eAAD6cgjbJ7c031.png"}),L,V,R,N,l(a,{alt:"Lark20201104-145559.png",src:"https://s0.lgstatic.com/i/image/M00/67/C3/Ciqc1F-iUcyAKsUkAADXFCtukIY084.png"}),B])}const j=s(_,[["render",H]]);export{W as __pageData,j as default};

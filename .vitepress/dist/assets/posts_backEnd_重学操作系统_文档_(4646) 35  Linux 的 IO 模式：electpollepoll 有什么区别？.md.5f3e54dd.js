import{_ as s,o as n,g as a,Q as l}from"./chunks/framework.f949202b.js";const d=JSON.parse('{"title":"从网卡到操作系统 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4646) 35  Linux 的 IO 模式：electpollepoll 有什么区别？.md","filePath":"posts/backEnd/重学操作系统_文档/(4646) 35  Linux 的 IO 模式：electpollepoll 有什么区别？.md","lastUpdated":null}'),p={name:"posts/backEnd/重学操作系统_文档/(4646) 35  Linux 的 IO 模式：electpollepoll 有什么区别？.md"},e=l(`<p>我们总是想方设法地提升系统的性能。操作系统层面不能给予处理业务逻辑太多帮助，但对于 I/O 性能，操作系统可以通过底层的优化，帮助应用做到极致。</p><p>这一讲我将和你一起讨论 I/O 模型。为了引发你更多的思考，我将同步/异步、阻塞/非阻塞等概念滞后讲解。<strong>我们先回到一个最基本的问题：如果有一台服务器，需要响应大量的请求，操作系统如何去架构以适应这样高并发的诉求</strong>。</p><p>说到架构，就离不开操作系统提供给应用程序的系统调用。我们今天要介绍的 select/poll/epoll 刚好是操作系统提供给应用的三类处理 I/O 的系统调用。这三类系统调用有非常强的代表性，这一讲我会围绕它们，以及处理并发和 I/O 多路复用，为你讲解操作系统的 I/O 模型。</p><h3 id="从网卡到操作系统" tabindex="-1">从网卡到操作系统 <a class="header-anchor" href="#从网卡到操作系统" aria-label="Permalink to &quot;从网卡到操作系统&quot;">​</a></h3><p>为了弄清楚高并发网络场景是如何处理的，我们先来看一个最基本的内容：<strong>当数据到达网卡之后，操作系统会做哪些事情</strong>？</p><p>网络数据到达网卡之后，首先需要把数据拷贝到内存。拷贝到内存的工作往往不需要消耗 CPU 资源，而是通过 DMA 模块直接进行内存映射。之所以这样做，是因为网卡没有大量的内存空间，只能做简单的缓冲，所以必须赶紧将它们保存下来。</p><p>Linux 中用一个双向链表作为缓冲区，你可以观察下图中的 Buffer，看上去像一个有很多个凹槽的线性结构，每个凹槽（节点）可以存储一个封包，这个封包可以从网络层看（IP 封包），也可以从传输层看（TCP 封包）。操作系统不断地从 Buffer 中取出数据，数据通过一个协议栈，你可以把它理解成很多个协议的集合。协议栈中数据封包找到对应的协议程序处理完之后，就会形成 Socket 文件。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/05/F3/Cip5yGABb8uAECMGAAERrnFoSrI090.png" alt="1111.png">!</p><p>如果高并发的请求量级实在太大，有可能把 Buffer 占满，此时，操作系统就会拒绝服务。网络上有一种著名的攻击叫作<strong>拒绝服务攻击</strong> ，就是利用的这个原理。<strong>操作系统拒绝服务，实际上是一种保护策略。通过拒绝服务，避免系统内部应用因为并发量太大而雪崩</strong>。</p><p>如上图所示，传入网卡的数据被我称为 Frames。一个 Frame 是数据链路层的传输单位（或封包）。现代的网卡通常使用 DMA 技术，将 Frame 写入缓冲区（Buffer），然后在触发 CPU 中断交给操作系统处理。操作系统从缓冲区中不断取出 Frame，通过协进栈（具体的协议）进行还原。</p><p>在 UNIX 系的操作系统中，一个 Socket 文件内部类似一个双向的管道。因此，非常适用于进程间通信。在网络当中，本质上并没有发生变化。网络中的 Socket 一端连接 Buffer， 一端连接应用------也就是进程。网卡的数据会进入 Buffer，Buffer 经过协议栈的处理形成 Socket 结构。通过这样的设计，进程读取 Socket 文件，可以从 Buffer 中对应节点读走数据。</p><p>对于 TCP 协议，Socket 文件可以用源端口、目标端口、源 IP、目标 IP 进行区别。不同的 Socket 文件，对应着 Buffer 中的不同节点。进程们读取数据的时候从 Buffer 中读取，写入数据的时候向 Buffer 中写入。通过这样一种结构，无论是读和写，进程都可以快速定位到自己对应的节点。</p><p>以上就是我们对操作系统和网络接口交互的一个基本讨论。接下来，我们讨论一下作为一个编程模型的 Socket。</p><h3 id="socket-编程模型" tabindex="-1">Socket 编程模型 <a class="header-anchor" href="#socket-编程模型" aria-label="Permalink to &quot;Socket 编程模型&quot;">​</a></h3><p>通过前面讲述，我们知道 Socket 在操作系统中，有一个非常具体的从 Buffer 到文件的实现。但是对于进程而言，Socket 更多是一种编程的模型。接下来我们讨论作为编程模型的 Socket。</p><p><img src="https://s0.lgstatic.com/i/image/M00/8D/F3/Ciqc1GABP3OAHezqAABndlGAu9c457.png" alt="Lark20210115-150702.png"></p><p>如上图所示，Socket 连接了应用和协议，如果应用层的程序想要传输数据，就创建一个 Socket。应用向 Socket 中写入数据，相当于将数据发送给了另一个应用。应用从 Socket 中读取数据，相当于接收另一个应用发送的数据。而具体的操作就是由 Socket 进行封装。具体来说，<strong>对于 UNIX 系的操作系统，是利用 Socket 文件系统，Socket 是一种特殊的文件------每个都是一个双向的管道。一端是应用，一端是缓冲</strong>区。</p><p>那么作为一个服务端的应用，如何知道有哪些 Socket 呢？也就是，哪些客户端连接过来了呢？这是就需要一种特殊类型的 Socket，也就是服务端 Socket 文件。</p><p><img src="https://s0.lgstatic.com/i/image/M00/8D/F3/Ciqc1GABP3qADKbBAAB564sk120429.png" alt="Lark20210115-150706.png"></p><p>如上图所示，当有客户端连接服务端时，服务端 Socket 文件中会写入这个客户端 Socket 的文件描述符。进程可以通过 accept() 方法，从服务端 Socket 文件中读出客户端的 Socket 文件描述符，从而拿到客户端的 Socket 文件。</p><p>程序员实现一个网络服务器的时候，会先手动去创建一个服务端 Socket 文件。服务端的 Socket 文件依然会存在操作系统内核之中，并且会绑定到某个 IP 地址和端口上。以后凡是发送到这台机器、目标 IP 地址和端口号的连接请求，在形成了客户端 Socket 文件之后，文件的文件描述符都会被写入到服务端的 Socket 文件中。应用只要调用 accept 方法，就可以拿到这些客户端的 Socket 文件描述符，这样服务端的应用就可以方便地知道有哪些客户端连接了进来。</p><p>而每个客户端对这个应用而言，都是一个文件描述符。如果需要读取某个客户端的数据，就读取这个客户端对应的 Socket 文件。如果要向某个特定的客户端发送数据，就写入这个客户端的 Socket 文件。</p><p>以上就是 Socket 的编程模型。</p><h3 id="i-o-多路复用" tabindex="-1">I/O 多路复用 <a class="header-anchor" href="#i-o-多路复用" aria-label="Permalink to &quot;I/O 多路复用&quot;">​</a></h3><p>在上面的讨论当中，进程拿到了它关注的所有 Socket，也称作关注的集合（Intersting Set）。如下图所示，这种过程相当于进程从所有的 Socket 中，筛选出了自己关注的一个子集，但是这时还有一个问题没有解决：<strong>进程如何监听关注集合的状态变化，比如说在有数据进来，如何通知到这个进程</strong>？</p><p><img src="https://s0.lgstatic.com/i/image/M00/8D/F3/Ciqc1GABP4OAdKBcAACAbVkbI0g191.png" alt="Lark20210115-150708.png"></p><p>其实更准确地说，一个线程需要处理所有关注的 Socket 产生的变化，或者说消息。实际上一个线程要处理很多个文件的 I/O。<strong>所有关注的 Socket 状态发生了变化，都由一个线程去处理，构成了 I/O 的多路复用问题</strong>。如下图所示：</p><p><img src="https://s0.lgstatic.com/i/image/M00/8D/F3/Ciqc1GABP4uAW8-dAAB_SubmZ4Q301.png" alt="Lark20210115-150711.png"></p><p>处理 I/O 多路复用的问题，需要操作系统提供内核级别的支持。Linux 下有三种提供 I/O 多路复用的 API，分别是：</p><ul><li><p>select</p></li><li><p>poll</p></li><li><p>epoll</p></li></ul><p>如下图所示，内核了解网络的状态。因此不难知道具体发生了什么消息，比如内核知道某个 Socket 文件状态发生了变化。但是内核如何知道该把哪个消息给哪个进程呢？</p><p><img src="https://s0.lgstatic.com/i/image/M00/8D/F3/Ciqc1GABP5KAVSWVAAFSurtl2bU931.png" alt="Lark20210115-150654.png"></p><p><strong>一个 Socket 文件，可以由多个进程使用；而一个进程，也可以使用多个 Socket 文件</strong> 。进程和 Socket 之间是多对多的关系。<strong>另一方面，一个 Socket 也会有不同的事件类型</strong>。因此操作系统很难判断，将哪样的事件给哪个进程。</p><p>这样<strong>在进程内部就需要一个数据结构来描述自己会关注哪些 Socket 文件的哪些事件（读、写、异常等</strong> ）。通常有两种考虑方向，<strong>一种是利用线性结构</strong> ，比如说数组、链表等，这类结构的查询需要遍历。每次内核产生一种消息，就遍历这个线性结构。看看这个消息是不是进程关注的？<strong>另一种是索引结构</strong>，内核发生了消息可以通过索引结构马上知道这个消息进程关不关注。</p><h4 id="select" tabindex="-1">select() <a class="header-anchor" href="#select" aria-label="Permalink to &quot;select()&quot;">​</a></h4><p>select 和 poll 都采用线性结构，select 允许用户传入 3 个集合。如下面这段程序所示：</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">fd_set read_fd_set, write_fd_set, error_fd_set;</span></span>
<span class="line"><span style="color:#E1E4E8;">while(true) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  select(..., &amp;read_fd_set, &amp;write_fd_set, &amp;error_fd_set); </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">fd_set read_fd_set, write_fd_set, error_fd_set;</span></span>
<span class="line"><span style="color:#24292E;">while(true) {</span></span>
<span class="line"><span style="color:#24292E;">  select(..., &amp;read_fd_set, &amp;write_fd_set, &amp;error_fd_set); </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>每次 select 操作会阻塞当前线程，在阻塞期间所有操作系统产生的每个消息，都会通过遍历的手段查看是否在 3 个集合当中</strong> 。上面程序<code>read_fd_set</code>中放入的是当数据可以读取时进程关心的 Socket；<code>write_fd_set</code>是当数据可以写入时进程关心的 Socket；<code>error_fd_set</code>是当发生异常时进程关心的 Socket。</p><p>**用户程序可以根据不同集合中是否有某个 Socket 判断发生的消息类型，**程序如下所示：</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">fd_set read_fd_set, write_fd_set, error_fd_set;</span></span>
<span class="line"><span style="color:#E1E4E8;">while(true) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  select(..., &amp;read_fd_set, &amp;write_fd_set, &amp;error_fd_set); </span></span>
<span class="line"><span style="color:#E1E4E8;">  for (i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> FD_SETSIZE; ++i)</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (FD_ISSET (i, &amp;read_fd_set)){</span></span>
<span class="line"><span style="color:#E1E4E8;">          // Socket可以读取</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else if(FD_ISSET(i, &amp;write_fd_set)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          // Socket可以写入</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else if(FD_ISSET(i, &amp;error_fd_set)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          // Socket发生错误</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">fd_set read_fd_set, write_fd_set, error_fd_set;</span></span>
<span class="line"><span style="color:#24292E;">while(true) {</span></span>
<span class="line"><span style="color:#24292E;">  select(..., &amp;read_fd_set, &amp;write_fd_set, &amp;error_fd_set); </span></span>
<span class="line"><span style="color:#24292E;">  for (i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> FD_SETSIZE; ++i)</span></span>
<span class="line"><span style="color:#24292E;">        if (FD_ISSET (i, &amp;read_fd_set)){</span></span>
<span class="line"><span style="color:#24292E;">          // Socket可以读取</span></span>
<span class="line"><span style="color:#24292E;">        } else if(FD_ISSET(i, &amp;write_fd_set)) {</span></span>
<span class="line"><span style="color:#24292E;">          // Socket可以写入</span></span>
<span class="line"><span style="color:#24292E;">        } else if(FD_ISSET(i, &amp;error_fd_set)) {</span></span>
<span class="line"><span style="color:#24292E;">          // Socket发生错误</span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>上面程序中的 FD_SETSIZE 是一个系统的默认设置，通常是 1024。可以看出，select 模式能够一次处理的文件描述符是有上限的，也就是 FD_SETSIZE。当并发请求过多的时候， select 就无能为力了。但是对单台机器而言，1024 个并发已经是一个非常大的流量了。</p><p>接下来我给出一个完整的、用 select 实现的服务端程序供你参考，如下所示：</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">stdio.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">errno.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">stdlib.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">unistd.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">sys/types.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">sys/Socket.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">netinet/in.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">netdb.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">#define PORT    5555</span></span>
<span class="line"><span style="color:#E1E4E8;">#define MAXMSG  512</span></span>
<span class="line"><span style="color:#E1E4E8;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">read_from_client (int filedes)</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  char buffer[MAXMSG];</span></span>
<span class="line"><span style="color:#E1E4E8;">  int nbytes;</span></span>
<span class="line"><span style="color:#E1E4E8;">  nbytes = read (filedes, buffer, MAXMSG);</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (nbytes </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0)</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      /* Read error. */</span></span>
<span class="line"><span style="color:#E1E4E8;">      perror (&quot;read&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">      exit (EXIT_FAILURE);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  else if (nbytes == 0)</span></span>
<span class="line"><span style="color:#E1E4E8;">    /* End-of-file. */</span></span>
<span class="line"><span style="color:#E1E4E8;">    return -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">  else</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      /* Data read. */</span></span>
<span class="line"><span style="color:#E1E4E8;">      fprintf (stderr, &quot;Server: got message: \`%s&#39;\\n&quot;, buffer);</span></span>
<span class="line"><span style="color:#E1E4E8;">      return 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">main (void)</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  extern int make_Socket (uint16_t port);</span></span>
<span class="line"><span style="color:#E1E4E8;">  int sock;</span></span>
<span class="line"><span style="color:#E1E4E8;">  fd_set active_fd_set, read_fd_set;</span></span>
<span class="line"><span style="color:#E1E4E8;">  int i;</span></span>
<span class="line"><span style="color:#E1E4E8;">  struct sockaddr_in clientname;</span></span>
<span class="line"><span style="color:#E1E4E8;">  size_t size;</span></span>
<span class="line"><span style="color:#E1E4E8;">  /* Create the Socket and set it up to accept connections. */</span></span>
<span class="line"><span style="color:#E1E4E8;">  sock = make_Socket (PORT);</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (listen (sock, 1) </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0)</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      perror (&quot;listen&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">      exit (EXIT_FAILURE);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  /* Initialize the set of active Sockets. */</span></span>
<span class="line"><span style="color:#E1E4E8;">  FD_ZERO (&amp;active_fd_set);</span></span>
<span class="line"><span style="color:#E1E4E8;">  FD_SET (sock, &amp;active_fd_set);</span></span>
<span class="line"><span style="color:#E1E4E8;">  while (1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      /* Block until input arrives on one or more active Sockets. */</span></span>
<span class="line"><span style="color:#E1E4E8;">      read_fd_set = active_fd_set;</span></span>
<span class="line"><span style="color:#E1E4E8;">      if (select (FD_SETSIZE, &amp;read_fd_set, NULL, NULL, NULL) </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0)</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          perror (&quot;select&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">          exit (EXIT_FAILURE);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      /* Service all the Sockets with input pending. */</span></span>
<span class="line"><span style="color:#E1E4E8;">      for (i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> FD_SETSIZE; ++i)</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (FD_ISSET (i, &amp;read_fd_set))</span></span>
<span class="line"><span style="color:#E1E4E8;">          {</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (i == sock)</span></span>
<span class="line"><span style="color:#E1E4E8;">              {</span></span>
<span class="line"><span style="color:#E1E4E8;">                /* Connection request on original Socket. */</span></span>
<span class="line"><span style="color:#E1E4E8;">                int new;</span></span>
<span class="line"><span style="color:#E1E4E8;">                size = sizeof (clientname);</span></span>
<span class="line"><span style="color:#E1E4E8;">                new = accept (sock,</span></span>
<span class="line"><span style="color:#E1E4E8;">                              (struct sockaddr *) &amp;clientname,</span></span>
<span class="line"><span style="color:#E1E4E8;">                              &amp;size);</span></span>
<span class="line"><span style="color:#E1E4E8;">                if (new </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0)</span></span>
<span class="line"><span style="color:#E1E4E8;">                  {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    perror (&quot;accept&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    exit (EXIT_FAILURE);</span></span>
<span class="line"><span style="color:#E1E4E8;">                  }</span></span>
<span class="line"><span style="color:#E1E4E8;">                fprintf (stderr,</span></span>
<span class="line"><span style="color:#E1E4E8;">                         &quot;Server: connect from host %s, port %hd.\\n&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">                         inet_ntoa (clientname.sin_addr),</span></span>
<span class="line"><span style="color:#E1E4E8;">                         ntohs (clientname.sin_port));</span></span>
<span class="line"><span style="color:#E1E4E8;">                FD_SET (new, &amp;active_fd_set);</span></span>
<span class="line"><span style="color:#E1E4E8;">              }</span></span>
<span class="line"><span style="color:#E1E4E8;">            else</span></span>
<span class="line"><span style="color:#E1E4E8;">              {</span></span>
<span class="line"><span style="color:#E1E4E8;">                /* Data arriving on an already-connected Socket. */</span></span>
<span class="line"><span style="color:#E1E4E8;">                if (read_from_client (i) </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0)</span></span>
<span class="line"><span style="color:#E1E4E8;">                  {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    close (i);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    FD_CLR (i, &amp;active_fd_set);</span></span>
<span class="line"><span style="color:#E1E4E8;">                  }</span></span>
<span class="line"><span style="color:#E1E4E8;">              }</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#include &lt;</span><span style="color:#B31D28;font-style:italic;">stdio.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">#include &lt;</span><span style="color:#B31D28;font-style:italic;">errno.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">#include &lt;</span><span style="color:#B31D28;font-style:italic;">stdlib.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">#include &lt;</span><span style="color:#B31D28;font-style:italic;">unistd.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">#include &lt;</span><span style="color:#B31D28;font-style:italic;">sys/types.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">#include &lt;</span><span style="color:#B31D28;font-style:italic;">sys/Socket.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">#include &lt;</span><span style="color:#B31D28;font-style:italic;">netinet/in.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">#include &lt;</span><span style="color:#B31D28;font-style:italic;">netdb.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">#define PORT    5555</span></span>
<span class="line"><span style="color:#24292E;">#define MAXMSG  512</span></span>
<span class="line"><span style="color:#24292E;">int</span></span>
<span class="line"><span style="color:#24292E;">read_from_client (int filedes)</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  char buffer[MAXMSG];</span></span>
<span class="line"><span style="color:#24292E;">  int nbytes;</span></span>
<span class="line"><span style="color:#24292E;">  nbytes = read (filedes, buffer, MAXMSG);</span></span>
<span class="line"><span style="color:#24292E;">  if (nbytes </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0)</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      /* Read error. */</span></span>
<span class="line"><span style="color:#24292E;">      perror (&quot;read&quot;);</span></span>
<span class="line"><span style="color:#24292E;">      exit (EXIT_FAILURE);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  else if (nbytes == 0)</span></span>
<span class="line"><span style="color:#24292E;">    /* End-of-file. */</span></span>
<span class="line"><span style="color:#24292E;">    return -1;</span></span>
<span class="line"><span style="color:#24292E;">  else</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      /* Data read. */</span></span>
<span class="line"><span style="color:#24292E;">      fprintf (stderr, &quot;Server: got message: \`%s&#39;\\n&quot;, buffer);</span></span>
<span class="line"><span style="color:#24292E;">      return 0;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">int</span></span>
<span class="line"><span style="color:#24292E;">main (void)</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  extern int make_Socket (uint16_t port);</span></span>
<span class="line"><span style="color:#24292E;">  int sock;</span></span>
<span class="line"><span style="color:#24292E;">  fd_set active_fd_set, read_fd_set;</span></span>
<span class="line"><span style="color:#24292E;">  int i;</span></span>
<span class="line"><span style="color:#24292E;">  struct sockaddr_in clientname;</span></span>
<span class="line"><span style="color:#24292E;">  size_t size;</span></span>
<span class="line"><span style="color:#24292E;">  /* Create the Socket and set it up to accept connections. */</span></span>
<span class="line"><span style="color:#24292E;">  sock = make_Socket (PORT);</span></span>
<span class="line"><span style="color:#24292E;">  if (listen (sock, 1) </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0)</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      perror (&quot;listen&quot;);</span></span>
<span class="line"><span style="color:#24292E;">      exit (EXIT_FAILURE);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  /* Initialize the set of active Sockets. */</span></span>
<span class="line"><span style="color:#24292E;">  FD_ZERO (&amp;active_fd_set);</span></span>
<span class="line"><span style="color:#24292E;">  FD_SET (sock, &amp;active_fd_set);</span></span>
<span class="line"><span style="color:#24292E;">  while (1)</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      /* Block until input arrives on one or more active Sockets. */</span></span>
<span class="line"><span style="color:#24292E;">      read_fd_set = active_fd_set;</span></span>
<span class="line"><span style="color:#24292E;">      if (select (FD_SETSIZE, &amp;read_fd_set, NULL, NULL, NULL) </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0)</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          perror (&quot;select&quot;);</span></span>
<span class="line"><span style="color:#24292E;">          exit (EXIT_FAILURE);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      /* Service all the Sockets with input pending. */</span></span>
<span class="line"><span style="color:#24292E;">      for (i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> FD_SETSIZE; ++i)</span></span>
<span class="line"><span style="color:#24292E;">        if (FD_ISSET (i, &amp;read_fd_set))</span></span>
<span class="line"><span style="color:#24292E;">          {</span></span>
<span class="line"><span style="color:#24292E;">            if (i == sock)</span></span>
<span class="line"><span style="color:#24292E;">              {</span></span>
<span class="line"><span style="color:#24292E;">                /* Connection request on original Socket. */</span></span>
<span class="line"><span style="color:#24292E;">                int new;</span></span>
<span class="line"><span style="color:#24292E;">                size = sizeof (clientname);</span></span>
<span class="line"><span style="color:#24292E;">                new = accept (sock,</span></span>
<span class="line"><span style="color:#24292E;">                              (struct sockaddr *) &amp;clientname,</span></span>
<span class="line"><span style="color:#24292E;">                              &amp;size);</span></span>
<span class="line"><span style="color:#24292E;">                if (new </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0)</span></span>
<span class="line"><span style="color:#24292E;">                  {</span></span>
<span class="line"><span style="color:#24292E;">                    perror (&quot;accept&quot;);</span></span>
<span class="line"><span style="color:#24292E;">                    exit (EXIT_FAILURE);</span></span>
<span class="line"><span style="color:#24292E;">                  }</span></span>
<span class="line"><span style="color:#24292E;">                fprintf (stderr,</span></span>
<span class="line"><span style="color:#24292E;">                         &quot;Server: connect from host %s, port %hd.\\n&quot;,</span></span>
<span class="line"><span style="color:#24292E;">                         inet_ntoa (clientname.sin_addr),</span></span>
<span class="line"><span style="color:#24292E;">                         ntohs (clientname.sin_port));</span></span>
<span class="line"><span style="color:#24292E;">                FD_SET (new, &amp;active_fd_set);</span></span>
<span class="line"><span style="color:#24292E;">              }</span></span>
<span class="line"><span style="color:#24292E;">            else</span></span>
<span class="line"><span style="color:#24292E;">              {</span></span>
<span class="line"><span style="color:#24292E;">                /* Data arriving on an already-connected Socket. */</span></span>
<span class="line"><span style="color:#24292E;">                if (read_from_client (i) </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0)</span></span>
<span class="line"><span style="color:#24292E;">                  {</span></span>
<span class="line"><span style="color:#24292E;">                    close (i);</span></span>
<span class="line"><span style="color:#24292E;">                    FD_CLR (i, &amp;active_fd_set);</span></span>
<span class="line"><span style="color:#24292E;">                  }</span></span>
<span class="line"><span style="color:#24292E;">              }</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br></div></div><h4 id="poll" tabindex="-1">poll() <a class="header-anchor" href="#poll" aria-label="Permalink to &quot;poll()&quot;">​</a></h4><p>从写程序的角度来看，select 并不是一个很好的编程模型。一个好的编程模型应该直达本质，当网络请求发生状态变化的时候，核心是会发生事件。<strong>一个好的编程模型应该是直接抽象成消息：用户不需要用 select 来设置自己的集合，而是可以通过系统的 API 直接拿到对应的消息，从而处理对应的文件描述符</strong>。</p><p>比如下面这段伪代码就是一个更好的编程模型，具体的分析如下：</p><ul><li><p>poll 是一个阻塞调用，它将某段时间内操作系统内发生的且进程关注的消息告知用户程序；</p></li><li><p>用户程序通过直接调用 poll 函数拿到消息；</p></li><li><p>poll 函数的第一个参数告知内核 poll 关注哪些 Socket 及消息类型；</p></li><li><p>poll 调用后，经过一段时间的等待（阻塞），就拿到了是一个消息的数组；</p></li><li><p>通过遍历这个数组中的消息，能够知道关联的文件描述符和消息的类型；</p></li><li><p>通过消息类型判断接下来该进行读取还是写入操作；</p></li><li><p>通过文件描述符，可以进行实际地读、写、错误处理。</p></li></ul><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">while(true) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  events = poll(fds, ...)</span></span>
<span class="line"><span style="color:#E1E4E8;">  for(evt in events) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    fd = evt.fd;</span></span>
<span class="line"><span style="color:#E1E4E8;">    type = evt.revents;</span></span>
<span class="line"><span style="color:#E1E4E8;">    if(type &amp; POLLIN ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       // 有数据需要读，读取fd中的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    } else if(type &amp; POLLOUT) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       // 可以写入数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    else ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">while(true) {</span></span>
<span class="line"><span style="color:#24292E;">  events = poll(fds, ...)</span></span>
<span class="line"><span style="color:#24292E;">  for(evt in events) {</span></span>
<span class="line"><span style="color:#24292E;">    fd = evt.fd;</span></span>
<span class="line"><span style="color:#24292E;">    type = evt.revents;</span></span>
<span class="line"><span style="color:#24292E;">    if(type &amp; POLLIN ) {</span></span>
<span class="line"><span style="color:#24292E;">       // 有数据需要读，读取fd中的数据</span></span>
<span class="line"><span style="color:#24292E;">    } else if(type &amp; POLLOUT) {</span></span>
<span class="line"><span style="color:#24292E;">       // 可以写入数据</span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    else ...</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>poll 虽然优化了编程模型，但是从性能角度分析，它和 select 差距不大。因为内核在产生一个消息之后，依然需要遍历 poll 关注的所有文件描述符来确定这条消息是否跟用户程序相关。</p><h4 id="epoll" tabindex="-1">epoll <a class="header-anchor" href="#epoll" aria-label="Permalink to &quot;epoll&quot;">​</a></h4><p>为了解决上述问题，<strong>epoll 通过更好的方案实现了从操作系统订阅消息。epoll 将进程关注的文件描述符存入一棵二叉搜索树，通常是红黑树的实现</strong>。在这棵红黑树当中，Key 是 Socket 的编号，值是这个 Socket 关注的消息。因此，当内核发生了一个事件：比如 Socket 编号 1000 可以读取。这个时候，可以马上从红黑树中找到进程是否关注这个事件。</p><p><strong>另外当有关注的事件发生时，epoll 会先放到一个队列当中。当用户调用</strong> <code>epoll_wait</code>时候，就会从队列中返回一个消息。epoll 函数本身是一个构造函数，只用来创建红黑树和队列结构。<code>epoll_wait</code>调用后，如果队列中没有消息，也可以马上返回。因此<code>epoll</code>是一个非阻塞模型。</p><p><strong>总结一下，select/poll 是阻塞模型，epoll 是非阻塞模型</strong> 。<strong>当然，并不是说非阻塞模型性能就更好。在多数情况下，epoll 性能更好是因为内部有红黑树的实现</strong>。</p><p>最后我再贴一段用 epoll 实现的 Socket 服务给你做参考，这段程序的作者将这段代码放到了 Public Domain，你以后看到公有领域的代码可以放心地使用。</p><p>下面这段程序跟之前 select 的原理一致，对于每一个新的客户端连接，都使用 accept 拿到这个连接的文件描述符，并且创建一个客户端的 Socket。然后通过<code>epoll_ctl</code>将客户端的文件描述符和关注的消息类型放入 epoll 的红黑树。操作系统每次监测到一个新的消息产生，就会通过红黑树对比这个消息是不是进程关注的（当然这段代码你看不到，因为它在内核程序中）。</p><p><strong>非阻塞模型的核心价值，并不是性能更好。当真的高并发来临的时候，所有的 CPU 资源，所有的网络资源可能都会被用完。这个时候无论是阻塞还是非阻塞，结果都不会相差太大</strong>。（前提是程序没有写错）。</p><p><code>epoll</code>有 2 个最大的优势：</p><ol><li><p>内部使用红黑树减少了内核的比较操作；</p></li><li><p>对于程序员而言，非阻塞的模型更容易处理各种各样的情况。程序员习惯了写出每一条语句就可以马上得到结果，这样不容易出 Bug。</p></li></ol><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// Asynchronous Socket server - accepting multiple clients concurrently,</span></span>
<span class="line"><span style="color:#E1E4E8;">	// multiplexing the connections with epoll.</span></span>
<span class="line"><span style="color:#E1E4E8;">	//</span></span>
<span class="line"><span style="color:#E1E4E8;">	// Eli Bendersky [http://eli.thegreenplace.net]</span></span>
<span class="line"><span style="color:#E1E4E8;">	// This code is in the public domain.</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">assert.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">errno.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">stdbool.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">stdint.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">stdio.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">stdlib.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include </span><span style="color:#E1E4E8;">&lt;</span><span style="color:#FDAEB7;font-style:italic;">string.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">sys/epoll.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">sys/Socket.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">sys/types.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include &lt;</span><span style="color:#FDAEB7;font-style:italic;">unistd.h</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	#include &quot;utils.h&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	#define MAXFDS 16 * 1024</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	typedef enum { INITIAL_ACK, WAIT_FOR_MSG, IN_MSG } ProcessingState;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	#define SENDBUF_SIZE 1024</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	typedef struct {</span></span>
<span class="line"><span style="color:#E1E4E8;">	  ProcessingState state;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  uint8_t sendbuf[SENDBUF_SIZE];</span></span>
<span class="line"><span style="color:#E1E4E8;">	  int sendbuf_end;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  int sendptr;</span></span>
<span class="line"><span style="color:#E1E4E8;">	} peer_state_t;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	// Each peer is globally identified by the file descriptor (fd) it&#39;s connected</span></span>
<span class="line"><span style="color:#E1E4E8;">	// on. As long as the peer is connected, the fd is unique to it. When a peer</span></span>
<span class="line"><span style="color:#E1E4E8;">	// disconnects, a new peer may connect and get the same fd. on_peer_connected</span></span>
<span class="line"><span style="color:#E1E4E8;">	// should initialize the state properly to remove any trace of the old peer on</span></span>
<span class="line"><span style="color:#E1E4E8;">	// the same fd.</span></span>
<span class="line"><span style="color:#E1E4E8;">	peer_state_t global_state[MAXFDS];</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	// Callbacks (on_XXX functions) return this status to the main loop; the status</span></span>
<span class="line"><span style="color:#E1E4E8;">	// instructs the loop about the next steps for the fd for which the callback was</span></span>
<span class="line"><span style="color:#E1E4E8;">	// invoked.</span></span>
<span class="line"><span style="color:#E1E4E8;">	// want_read=true means we want to keep monitoring this fd for reading.</span></span>
<span class="line"><span style="color:#E1E4E8;">	// want_write=true means we want to keep monitoring this fd for writing.</span></span>
<span class="line"><span style="color:#E1E4E8;">	// When both are false it means the fd is no longer needed and can be closed.</span></span>
<span class="line"><span style="color:#E1E4E8;">	typedef struct {</span></span>
<span class="line"><span style="color:#E1E4E8;">	  bool want_read;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  bool want_write;</span></span>
<span class="line"><span style="color:#E1E4E8;">	} fd_status_t;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	// These constants make creating fd_status_t values less verbose.</span></span>
<span class="line"><span style="color:#E1E4E8;">	const fd_status_t fd_status_R = {.want_read = true, .want_write = false};</span></span>
<span class="line"><span style="color:#E1E4E8;">	const fd_status_t fd_status_W = {.want_read = false, .want_write = true};</span></span>
<span class="line"><span style="color:#E1E4E8;">	const fd_status_t fd_status_RW = {.want_read = true, .want_write = true};</span></span>
<span class="line"><span style="color:#E1E4E8;">	const fd_status_t fd_status_NORW = {.want_read = false, .want_write = false};</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	fd_status_t on_peer_connected(int sockfd, const struct sockaddr_in* peer_addr,</span></span>
<span class="line"><span style="color:#E1E4E8;">	                              socklen_t peer_addr_len) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	  assert(sockfd </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> MAXFDS);</span></span>
<span class="line"><span style="color:#E1E4E8;">	  report_peer_connected(peer_addr, peer_addr_len);</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  // Initialize state to send back a &#39;*&#39; to the peer immediately.</span></span>
<span class="line"><span style="color:#E1E4E8;">	  peer_state_t* peerstate = &amp;global_state[sockfd];</span></span>
<span class="line"><span style="color:#E1E4E8;">	  peerstate-&gt;state = INITIAL_ACK;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  peerstate-&gt;sendbuf[0] = &#39;*&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  peerstate-&gt;sendptr = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  peerstate-&gt;sendbuf_end = 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  // Signal that this Socket is ready for writing now.</span></span>
<span class="line"><span style="color:#E1E4E8;">	  return fd_status_W;</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	fd_status_t on_peer_ready_recv(int sockfd) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	  assert(sockfd </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> MAXFDS);</span></span>
<span class="line"><span style="color:#E1E4E8;">	  peer_state_t* peerstate = &amp;global_state[sockfd];</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  if (peerstate-&gt;state == INITIAL_ACK ||</span></span>
<span class="line"><span style="color:#E1E4E8;">	      peerstate-&gt;sendptr </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> peerstate-&gt;sendbuf_end) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    // Until the initial ACK has been sent to the peer, there&#39;s nothing we</span></span>
<span class="line"><span style="color:#E1E4E8;">	    // want to receive. Also, wait until all data staged for sending is sent to</span></span>
<span class="line"><span style="color:#E1E4E8;">	    // receive more data.</span></span>
<span class="line"><span style="color:#E1E4E8;">	    return fd_status_W;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  uint8_t buf[1024];</span></span>
<span class="line"><span style="color:#E1E4E8;">	  int nbytes = recv(sockfd, buf, sizeof buf, 0);</span></span>
<span class="line"><span style="color:#E1E4E8;">	  if (nbytes == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    // The peer disconnected.</span></span>
<span class="line"><span style="color:#E1E4E8;">	    return fd_status_NORW;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  } else if (nbytes </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    if (errno == EAGAIN || errno == EWOULDBLOCK) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	      // The Socket is not *really* ready for recv; wait until it is.</span></span>
<span class="line"><span style="color:#E1E4E8;">	      return fd_status_R;</span></span>
<span class="line"><span style="color:#E1E4E8;">	    } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">	      perror_die(&quot;recv&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	    }</span></span>
<span class="line"><span style="color:#E1E4E8;">	  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	  bool ready_to_send = false;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nbytes; ++i) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    switch (peerstate-&gt;state) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    case INITIAL_ACK:</span></span>
<span class="line"><span style="color:#E1E4E8;">	      assert(0 &amp;&amp; &quot;can&#39;t reach here&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	      break;</span></span>
<span class="line"><span style="color:#E1E4E8;">	    case WAIT_FOR_MSG:</span></span>
<span class="line"><span style="color:#E1E4E8;">	      if (buf[i] == &#39;^&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	        peerstate-&gt;state = IN_MSG;</span></span>
<span class="line"><span style="color:#E1E4E8;">	      }</span></span>
<span class="line"><span style="color:#E1E4E8;">	      break;</span></span>
<span class="line"><span style="color:#E1E4E8;">	    case IN_MSG:</span></span>
<span class="line"><span style="color:#E1E4E8;">	      if (buf[i] == &#39;$&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	        peerstate-&gt;state = WAIT_FOR_MSG;</span></span>
<span class="line"><span style="color:#E1E4E8;">	      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">	        assert(peerstate-&gt;sendbuf_end </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> SENDBUF_SIZE);</span></span>
<span class="line"><span style="color:#E1E4E8;">	        peerstate-&gt;sendbuf[peerstate-&gt;sendbuf_end++] = buf[i] + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">	        ready_to_send = true;</span></span>
<span class="line"><span style="color:#E1E4E8;">	      }</span></span>
<span class="line"><span style="color:#E1E4E8;">	      break;</span></span>
<span class="line"><span style="color:#E1E4E8;">	    }</span></span>
<span class="line"><span style="color:#E1E4E8;">	  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	  // Report reading readiness iff there&#39;s nothing to send to the peer as a</span></span>
<span class="line"><span style="color:#E1E4E8;">	  // result of the latest recv.</span></span>
<span class="line"><span style="color:#E1E4E8;">	  return (fd_status_t){.want_read = !ready_to_send,</span></span>
<span class="line"><span style="color:#E1E4E8;">	                       .want_write = ready_to_send};</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	fd_status_t on_peer_ready_send(int sockfd) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	  assert(sockfd </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> MAXFDS);</span></span>
<span class="line"><span style="color:#E1E4E8;">	  peer_state_t* peerstate = &amp;global_state[sockfd];</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  if (peerstate-&gt;sendptr &gt;= peerstate-&gt;sendbuf_end) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    // Nothing to send.</span></span>
<span class="line"><span style="color:#E1E4E8;">	    return fd_status_RW;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	  int sendlen = peerstate-&gt;sendbuf_end - peerstate-&gt;sendptr;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  int nsent = send(sockfd, &amp;peerstate-&gt;sendbuf[peerstate-&gt;sendptr], sendlen, 0);</span></span>
<span class="line"><span style="color:#E1E4E8;">	  if (nsent == -1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    if (errno == EAGAIN || errno == EWOULDBLOCK) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	      return fd_status_W;</span></span>
<span class="line"><span style="color:#E1E4E8;">	    } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">	      perror_die(&quot;send&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	    }</span></span>
<span class="line"><span style="color:#E1E4E8;">	  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	  if (nsent </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> sendlen) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    peerstate-&gt;sendptr += nsent;</span></span>
<span class="line"><span style="color:#E1E4E8;">	    return fd_status_W;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    // Everything was sent successfully; reset the send queue.</span></span>
<span class="line"><span style="color:#E1E4E8;">	    peerstate-&gt;sendptr = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">	    peerstate-&gt;sendbuf_end = 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	    // Special-case state transition in if we were in INITIAL_ACK until now.</span></span>
<span class="line"><span style="color:#E1E4E8;">	    if (peerstate-&gt;state == INITIAL_ACK) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	      peerstate-&gt;state = WAIT_FOR_MSG;</span></span>
<span class="line"><span style="color:#E1E4E8;">	    }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	    return fd_status_R;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	int main(int argc, const char** argv) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	  setvbuf(stdout, NULL, _IONBF, 0);</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  int portnum = 9090;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  if (argc &gt;= 2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    portnum = atoi(argv[1]);</span></span>
<span class="line"><span style="color:#E1E4E8;">	  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	  printf(&quot;Serving on port %d\\n&quot;, portnum);</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  int listener_sockfd = listen_inet_Socket(portnum);</span></span>
<span class="line"><span style="color:#E1E4E8;">	  make_Socket_non_blocking(listener_sockfd);</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  int epollfd = epoll_create1(0);</span></span>
<span class="line"><span style="color:#E1E4E8;">	  if (epollfd </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    perror_die(&quot;epoll_create1&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  struct epoll_event accept_event;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  accept_event.data.fd = listener_sockfd;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  accept_event.events = EPOLLIN;</span></span>
<span class="line"><span style="color:#E1E4E8;">	  if (epoll_ctl(epollfd, EPOLL_CTL_ADD, listener_sockfd, &amp;accept_event) </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    perror_die(&quot;epoll_ctl EPOLL_CTL_ADD&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  struct epoll_event* events = calloc(MAXFDS, sizeof(struct epoll_event));</span></span>
<span class="line"><span style="color:#E1E4E8;">	  if (events == NULL) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    die(&quot;Unable to allocate memory for epoll_events&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  while (1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	    int nready = epoll_wait(epollfd, events, MAXFDS, -1);</span></span>
<span class="line"><span style="color:#E1E4E8;">	    for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nready; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	      if (events[i].events &amp; EPOLLERR) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	        perror_die(&quot;epoll_wait returned EPOLLERR&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	      }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	      if (events[i].data.fd == listener_sockfd) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	        // The listening Socket is ready; this means a new peer is connecting.</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	        struct sockaddr_in peer_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">	        socklen_t peer_addr_len = sizeof(peer_addr);</span></span>
<span class="line"><span style="color:#E1E4E8;">	        int newsockfd = accept(listener_sockfd, (struct sockaddr*)&amp;peer_addr,</span></span>
<span class="line"><span style="color:#E1E4E8;">	                               &amp;peer_addr_len);</span></span>
<span class="line"><span style="color:#E1E4E8;">	        if (newsockfd </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	          if (errno == EAGAIN || errno == EWOULDBLOCK) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            // This can happen due to the nonblocking Socket mode; in this</span></span>
<span class="line"><span style="color:#E1E4E8;">	            // case don&#39;t do anything, but print a notice (since these events</span></span>
<span class="line"><span style="color:#E1E4E8;">	            // are extremely rare and interesting to observe...)</span></span>
<span class="line"><span style="color:#E1E4E8;">	            printf(&quot;accept returned EAGAIN or EWOULDBLOCK\\n&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            perror_die(&quot;accept&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          }</span></span>
<span class="line"><span style="color:#E1E4E8;">	        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">	          make_Socket_non_blocking(newsockfd);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          if (newsockfd &gt;= MAXFDS) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            die(&quot;Socket fd (%d) &gt;= MAXFDS (%d)&quot;, newsockfd, MAXFDS);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	          fd_status_t status =</span></span>
<span class="line"><span style="color:#E1E4E8;">	              on_peer_connected(newsockfd, &amp;peer_addr, peer_addr_len);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          struct epoll_event event = {0};</span></span>
<span class="line"><span style="color:#E1E4E8;">	          event.data.fd = newsockfd;</span></span>
<span class="line"><span style="color:#E1E4E8;">	          if (status.want_read) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            event.events |= EPOLLIN;</span></span>
<span class="line"><span style="color:#E1E4E8;">	          }</span></span>
<span class="line"><span style="color:#E1E4E8;">	          if (status.want_write) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            event.events |= EPOLLOUT;</span></span>
<span class="line"><span style="color:#E1E4E8;">	          }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	          if (epoll_ctl(epollfd, EPOLL_CTL_ADD, newsockfd, &amp;event) </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            perror_die(&quot;epoll_ctl EPOLL_CTL_ADD&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          }</span></span>
<span class="line"><span style="color:#E1E4E8;">	        }</span></span>
<span class="line"><span style="color:#E1E4E8;">	      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">	        // A peer Socket is ready.</span></span>
<span class="line"><span style="color:#E1E4E8;">	        if (events[i].events &amp; EPOLLIN) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	          // Ready for reading.</span></span>
<span class="line"><span style="color:#E1E4E8;">	          int fd = events[i].data.fd;</span></span>
<span class="line"><span style="color:#E1E4E8;">	          fd_status_t status = on_peer_ready_recv(fd);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          struct epoll_event event = {0};</span></span>
<span class="line"><span style="color:#E1E4E8;">	          event.data.fd = fd;</span></span>
<span class="line"><span style="color:#E1E4E8;">	          if (status.want_read) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            event.events |= EPOLLIN;</span></span>
<span class="line"><span style="color:#E1E4E8;">	          }</span></span>
<span class="line"><span style="color:#E1E4E8;">	          if (status.want_write) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            event.events |= EPOLLOUT;</span></span>
<span class="line"><span style="color:#E1E4E8;">	          }</span></span>
<span class="line"><span style="color:#E1E4E8;">	          if (event.events == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            printf(&quot;Socket %d closing\\n&quot;, fd);</span></span>
<span class="line"><span style="color:#E1E4E8;">	            if (epoll_ctl(epollfd, EPOLL_CTL_DEL, fd, NULL) </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	              perror_die(&quot;epoll_ctl EPOLL_CTL_DEL&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	            }</span></span>
<span class="line"><span style="color:#E1E4E8;">	            close(fd);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          } else if (epoll_ctl(epollfd, EPOLL_CTL_MOD, fd, &amp;event) </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            perror_die(&quot;epoll_ctl EPOLL_CTL_MOD&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          }</span></span>
<span class="line"><span style="color:#E1E4E8;">	        } else if (events[i].events &amp; EPOLLOUT) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	          // Ready for writing.</span></span>
<span class="line"><span style="color:#E1E4E8;">	          int fd = events[i].data.fd;</span></span>
<span class="line"><span style="color:#E1E4E8;">	          fd_status_t status = on_peer_ready_send(fd);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          struct epoll_event event = {0};</span></span>
<span class="line"><span style="color:#E1E4E8;">	          event.data.fd = fd;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	          if (status.want_read) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            event.events |= EPOLLIN;</span></span>
<span class="line"><span style="color:#E1E4E8;">	          }</span></span>
<span class="line"><span style="color:#E1E4E8;">	          if (status.want_write) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            event.events |= EPOLLOUT;</span></span>
<span class="line"><span style="color:#E1E4E8;">	          }</span></span>
<span class="line"><span style="color:#E1E4E8;">	          if (event.events == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            printf(&quot;Socket %d closing\\n&quot;, fd);</span></span>
<span class="line"><span style="color:#E1E4E8;">	            if (epoll_ctl(epollfd, EPOLL_CTL_DEL, fd, NULL) </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	              perror_die(&quot;epoll_ctl EPOLL_CTL_DEL&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	            }</span></span>
<span class="line"><span style="color:#E1E4E8;">	            close(fd);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          } else if (epoll_ctl(epollfd, EPOLL_CTL_MOD, fd, &amp;event) </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	            perror_die(&quot;epoll_ctl EPOLL_CTL_MOD&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">	          }</span></span>
<span class="line"><span style="color:#E1E4E8;">	        }</span></span>
<span class="line"><span style="color:#E1E4E8;">	      }</span></span>
<span class="line"><span style="color:#E1E4E8;">	    }</span></span>
<span class="line"><span style="color:#E1E4E8;">	  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	  return 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// Asynchronous Socket server - accepting multiple clients concurrently,</span></span>
<span class="line"><span style="color:#24292E;">	// multiplexing the connections with epoll.</span></span>
<span class="line"><span style="color:#24292E;">	//</span></span>
<span class="line"><span style="color:#24292E;">	// Eli Bendersky [http://eli.thegreenplace.net]</span></span>
<span class="line"><span style="color:#24292E;">	// This code is in the public domain.</span></span>
<span class="line"><span style="color:#24292E;">	#include &lt;</span><span style="color:#B31D28;font-style:italic;">assert.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	#include &lt;</span><span style="color:#B31D28;font-style:italic;">errno.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	#include &lt;</span><span style="color:#B31D28;font-style:italic;">stdbool.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	#include &lt;</span><span style="color:#B31D28;font-style:italic;">stdint.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	#include &lt;</span><span style="color:#B31D28;font-style:italic;">stdio.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	#include &lt;</span><span style="color:#B31D28;font-style:italic;">stdlib.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	#include </span><span style="color:#24292E;">&lt;</span><span style="color:#B31D28;font-style:italic;">string.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	#include &lt;</span><span style="color:#B31D28;font-style:italic;">sys/epoll.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	#include &lt;</span><span style="color:#B31D28;font-style:italic;">sys/Socket.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	#include &lt;</span><span style="color:#B31D28;font-style:italic;">sys/types.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	#include &lt;</span><span style="color:#B31D28;font-style:italic;">unistd.h</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	#include &quot;utils.h&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	#define MAXFDS 16 * 1024</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	typedef enum { INITIAL_ACK, WAIT_FOR_MSG, IN_MSG } ProcessingState;</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	#define SENDBUF_SIZE 1024</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	typedef struct {</span></span>
<span class="line"><span style="color:#24292E;">	  ProcessingState state;</span></span>
<span class="line"><span style="color:#24292E;">	  uint8_t sendbuf[SENDBUF_SIZE];</span></span>
<span class="line"><span style="color:#24292E;">	  int sendbuf_end;</span></span>
<span class="line"><span style="color:#24292E;">	  int sendptr;</span></span>
<span class="line"><span style="color:#24292E;">	} peer_state_t;</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	// Each peer is globally identified by the file descriptor (fd) it&#39;s connected</span></span>
<span class="line"><span style="color:#24292E;">	// on. As long as the peer is connected, the fd is unique to it. When a peer</span></span>
<span class="line"><span style="color:#24292E;">	// disconnects, a new peer may connect and get the same fd. on_peer_connected</span></span>
<span class="line"><span style="color:#24292E;">	// should initialize the state properly to remove any trace of the old peer on</span></span>
<span class="line"><span style="color:#24292E;">	// the same fd.</span></span>
<span class="line"><span style="color:#24292E;">	peer_state_t global_state[MAXFDS];</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	// Callbacks (on_XXX functions) return this status to the main loop; the status</span></span>
<span class="line"><span style="color:#24292E;">	// instructs the loop about the next steps for the fd for which the callback was</span></span>
<span class="line"><span style="color:#24292E;">	// invoked.</span></span>
<span class="line"><span style="color:#24292E;">	// want_read=true means we want to keep monitoring this fd for reading.</span></span>
<span class="line"><span style="color:#24292E;">	// want_write=true means we want to keep monitoring this fd for writing.</span></span>
<span class="line"><span style="color:#24292E;">	// When both are false it means the fd is no longer needed and can be closed.</span></span>
<span class="line"><span style="color:#24292E;">	typedef struct {</span></span>
<span class="line"><span style="color:#24292E;">	  bool want_read;</span></span>
<span class="line"><span style="color:#24292E;">	  bool want_write;</span></span>
<span class="line"><span style="color:#24292E;">	} fd_status_t;</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	// These constants make creating fd_status_t values less verbose.</span></span>
<span class="line"><span style="color:#24292E;">	const fd_status_t fd_status_R = {.want_read = true, .want_write = false};</span></span>
<span class="line"><span style="color:#24292E;">	const fd_status_t fd_status_W = {.want_read = false, .want_write = true};</span></span>
<span class="line"><span style="color:#24292E;">	const fd_status_t fd_status_RW = {.want_read = true, .want_write = true};</span></span>
<span class="line"><span style="color:#24292E;">	const fd_status_t fd_status_NORW = {.want_read = false, .want_write = false};</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	fd_status_t on_peer_connected(int sockfd, const struct sockaddr_in* peer_addr,</span></span>
<span class="line"><span style="color:#24292E;">	                              socklen_t peer_addr_len) {</span></span>
<span class="line"><span style="color:#24292E;">	  assert(sockfd </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> MAXFDS);</span></span>
<span class="line"><span style="color:#24292E;">	  report_peer_connected(peer_addr, peer_addr_len);</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  // Initialize state to send back a &#39;*&#39; to the peer immediately.</span></span>
<span class="line"><span style="color:#24292E;">	  peer_state_t* peerstate = &amp;global_state[sockfd];</span></span>
<span class="line"><span style="color:#24292E;">	  peerstate-&gt;state = INITIAL_ACK;</span></span>
<span class="line"><span style="color:#24292E;">	  peerstate-&gt;sendbuf[0] = &#39;*&#39;;</span></span>
<span class="line"><span style="color:#24292E;">	  peerstate-&gt;sendptr = 0;</span></span>
<span class="line"><span style="color:#24292E;">	  peerstate-&gt;sendbuf_end = 1;</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  // Signal that this Socket is ready for writing now.</span></span>
<span class="line"><span style="color:#24292E;">	  return fd_status_W;</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	fd_status_t on_peer_ready_recv(int sockfd) {</span></span>
<span class="line"><span style="color:#24292E;">	  assert(sockfd </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> MAXFDS);</span></span>
<span class="line"><span style="color:#24292E;">	  peer_state_t* peerstate = &amp;global_state[sockfd];</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  if (peerstate-&gt;state == INITIAL_ACK ||</span></span>
<span class="line"><span style="color:#24292E;">	      peerstate-&gt;sendptr </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> peerstate-&gt;sendbuf_end) {</span></span>
<span class="line"><span style="color:#24292E;">	    // Until the initial ACK has been sent to the peer, there&#39;s nothing we</span></span>
<span class="line"><span style="color:#24292E;">	    // want to receive. Also, wait until all data staged for sending is sent to</span></span>
<span class="line"><span style="color:#24292E;">	    // receive more data.</span></span>
<span class="line"><span style="color:#24292E;">	    return fd_status_W;</span></span>
<span class="line"><span style="color:#24292E;">	  }</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  uint8_t buf[1024];</span></span>
<span class="line"><span style="color:#24292E;">	  int nbytes = recv(sockfd, buf, sizeof buf, 0);</span></span>
<span class="line"><span style="color:#24292E;">	  if (nbytes == 0) {</span></span>
<span class="line"><span style="color:#24292E;">	    // The peer disconnected.</span></span>
<span class="line"><span style="color:#24292E;">	    return fd_status_NORW;</span></span>
<span class="line"><span style="color:#24292E;">	  } else if (nbytes </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0) {</span></span>
<span class="line"><span style="color:#24292E;">	    if (errno == EAGAIN || errno == EWOULDBLOCK) {</span></span>
<span class="line"><span style="color:#24292E;">	      // The Socket is not *really* ready for recv; wait until it is.</span></span>
<span class="line"><span style="color:#24292E;">	      return fd_status_R;</span></span>
<span class="line"><span style="color:#24292E;">	    } else {</span></span>
<span class="line"><span style="color:#24292E;">	      perror_die(&quot;recv&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	    }</span></span>
<span class="line"><span style="color:#24292E;">	  }</span></span>
<span class="line"><span style="color:#24292E;">	  bool ready_to_send = false;</span></span>
<span class="line"><span style="color:#24292E;">	  for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nbytes; ++i) {</span></span>
<span class="line"><span style="color:#24292E;">	    switch (peerstate-&gt;state) {</span></span>
<span class="line"><span style="color:#24292E;">	    case INITIAL_ACK:</span></span>
<span class="line"><span style="color:#24292E;">	      assert(0 &amp;&amp; &quot;can&#39;t reach here&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	      break;</span></span>
<span class="line"><span style="color:#24292E;">	    case WAIT_FOR_MSG:</span></span>
<span class="line"><span style="color:#24292E;">	      if (buf[i] == &#39;^&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">	        peerstate-&gt;state = IN_MSG;</span></span>
<span class="line"><span style="color:#24292E;">	      }</span></span>
<span class="line"><span style="color:#24292E;">	      break;</span></span>
<span class="line"><span style="color:#24292E;">	    case IN_MSG:</span></span>
<span class="line"><span style="color:#24292E;">	      if (buf[i] == &#39;$&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">	        peerstate-&gt;state = WAIT_FOR_MSG;</span></span>
<span class="line"><span style="color:#24292E;">	      } else {</span></span>
<span class="line"><span style="color:#24292E;">	        assert(peerstate-&gt;sendbuf_end </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> SENDBUF_SIZE);</span></span>
<span class="line"><span style="color:#24292E;">	        peerstate-&gt;sendbuf[peerstate-&gt;sendbuf_end++] = buf[i] + 1;</span></span>
<span class="line"><span style="color:#24292E;">	        ready_to_send = true;</span></span>
<span class="line"><span style="color:#24292E;">	      }</span></span>
<span class="line"><span style="color:#24292E;">	      break;</span></span>
<span class="line"><span style="color:#24292E;">	    }</span></span>
<span class="line"><span style="color:#24292E;">	  }</span></span>
<span class="line"><span style="color:#24292E;">	  // Report reading readiness iff there&#39;s nothing to send to the peer as a</span></span>
<span class="line"><span style="color:#24292E;">	  // result of the latest recv.</span></span>
<span class="line"><span style="color:#24292E;">	  return (fd_status_t){.want_read = !ready_to_send,</span></span>
<span class="line"><span style="color:#24292E;">	                       .want_write = ready_to_send};</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	fd_status_t on_peer_ready_send(int sockfd) {</span></span>
<span class="line"><span style="color:#24292E;">	  assert(sockfd </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> MAXFDS);</span></span>
<span class="line"><span style="color:#24292E;">	  peer_state_t* peerstate = &amp;global_state[sockfd];</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  if (peerstate-&gt;sendptr &gt;= peerstate-&gt;sendbuf_end) {</span></span>
<span class="line"><span style="color:#24292E;">	    // Nothing to send.</span></span>
<span class="line"><span style="color:#24292E;">	    return fd_status_RW;</span></span>
<span class="line"><span style="color:#24292E;">	  }</span></span>
<span class="line"><span style="color:#24292E;">	  int sendlen = peerstate-&gt;sendbuf_end - peerstate-&gt;sendptr;</span></span>
<span class="line"><span style="color:#24292E;">	  int nsent = send(sockfd, &amp;peerstate-&gt;sendbuf[peerstate-&gt;sendptr], sendlen, 0);</span></span>
<span class="line"><span style="color:#24292E;">	  if (nsent == -1) {</span></span>
<span class="line"><span style="color:#24292E;">	    if (errno == EAGAIN || errno == EWOULDBLOCK) {</span></span>
<span class="line"><span style="color:#24292E;">	      return fd_status_W;</span></span>
<span class="line"><span style="color:#24292E;">	    } else {</span></span>
<span class="line"><span style="color:#24292E;">	      perror_die(&quot;send&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	    }</span></span>
<span class="line"><span style="color:#24292E;">	  }</span></span>
<span class="line"><span style="color:#24292E;">	  if (nsent </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> sendlen) {</span></span>
<span class="line"><span style="color:#24292E;">	    peerstate-&gt;sendptr += nsent;</span></span>
<span class="line"><span style="color:#24292E;">	    return fd_status_W;</span></span>
<span class="line"><span style="color:#24292E;">	  } else {</span></span>
<span class="line"><span style="color:#24292E;">	    // Everything was sent successfully; reset the send queue.</span></span>
<span class="line"><span style="color:#24292E;">	    peerstate-&gt;sendptr = 0;</span></span>
<span class="line"><span style="color:#24292E;">	    peerstate-&gt;sendbuf_end = 0;</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	    // Special-case state transition in if we were in INITIAL_ACK until now.</span></span>
<span class="line"><span style="color:#24292E;">	    if (peerstate-&gt;state == INITIAL_ACK) {</span></span>
<span class="line"><span style="color:#24292E;">	      peerstate-&gt;state = WAIT_FOR_MSG;</span></span>
<span class="line"><span style="color:#24292E;">	    }</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	    return fd_status_R;</span></span>
<span class="line"><span style="color:#24292E;">	  }</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	int main(int argc, const char** argv) {</span></span>
<span class="line"><span style="color:#24292E;">	  setvbuf(stdout, NULL, _IONBF, 0);</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  int portnum = 9090;</span></span>
<span class="line"><span style="color:#24292E;">	  if (argc &gt;= 2) {</span></span>
<span class="line"><span style="color:#24292E;">	    portnum = atoi(argv[1]);</span></span>
<span class="line"><span style="color:#24292E;">	  }</span></span>
<span class="line"><span style="color:#24292E;">	  printf(&quot;Serving on port %d\\n&quot;, portnum);</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  int listener_sockfd = listen_inet_Socket(portnum);</span></span>
<span class="line"><span style="color:#24292E;">	  make_Socket_non_blocking(listener_sockfd);</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  int epollfd = epoll_create1(0);</span></span>
<span class="line"><span style="color:#24292E;">	  if (epollfd </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0) {</span></span>
<span class="line"><span style="color:#24292E;">	    perror_die(&quot;epoll_create1&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	  }</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  struct epoll_event accept_event;</span></span>
<span class="line"><span style="color:#24292E;">	  accept_event.data.fd = listener_sockfd;</span></span>
<span class="line"><span style="color:#24292E;">	  accept_event.events = EPOLLIN;</span></span>
<span class="line"><span style="color:#24292E;">	  if (epoll_ctl(epollfd, EPOLL_CTL_ADD, listener_sockfd, &amp;accept_event) </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0) {</span></span>
<span class="line"><span style="color:#24292E;">	    perror_die(&quot;epoll_ctl EPOLL_CTL_ADD&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	  }</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  struct epoll_event* events = calloc(MAXFDS, sizeof(struct epoll_event));</span></span>
<span class="line"><span style="color:#24292E;">	  if (events == NULL) {</span></span>
<span class="line"><span style="color:#24292E;">	    die(&quot;Unable to allocate memory for epoll_events&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	  }</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  while (1) {</span></span>
<span class="line"><span style="color:#24292E;">	    int nready = epoll_wait(epollfd, events, MAXFDS, -1);</span></span>
<span class="line"><span style="color:#24292E;">	    for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nready; i++) {</span></span>
<span class="line"><span style="color:#24292E;">	      if (events[i].events &amp; EPOLLERR) {</span></span>
<span class="line"><span style="color:#24292E;">	        perror_die(&quot;epoll_wait returned EPOLLERR&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	      }</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	      if (events[i].data.fd == listener_sockfd) {</span></span>
<span class="line"><span style="color:#24292E;">	        // The listening Socket is ready; this means a new peer is connecting.</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	        struct sockaddr_in peer_addr;</span></span>
<span class="line"><span style="color:#24292E;">	        socklen_t peer_addr_len = sizeof(peer_addr);</span></span>
<span class="line"><span style="color:#24292E;">	        int newsockfd = accept(listener_sockfd, (struct sockaddr*)&amp;peer_addr,</span></span>
<span class="line"><span style="color:#24292E;">	                               &amp;peer_addr_len);</span></span>
<span class="line"><span style="color:#24292E;">	        if (newsockfd </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0) {</span></span>
<span class="line"><span style="color:#24292E;">	          if (errno == EAGAIN || errno == EWOULDBLOCK) {</span></span>
<span class="line"><span style="color:#24292E;">	            // This can happen due to the nonblocking Socket mode; in this</span></span>
<span class="line"><span style="color:#24292E;">	            // case don&#39;t do anything, but print a notice (since these events</span></span>
<span class="line"><span style="color:#24292E;">	            // are extremely rare and interesting to observe...)</span></span>
<span class="line"><span style="color:#24292E;">	            printf(&quot;accept returned EAGAIN or EWOULDBLOCK\\n&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	          } else {</span></span>
<span class="line"><span style="color:#24292E;">	            perror_die(&quot;accept&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	          }</span></span>
<span class="line"><span style="color:#24292E;">	        } else {</span></span>
<span class="line"><span style="color:#24292E;">	          make_Socket_non_blocking(newsockfd);</span></span>
<span class="line"><span style="color:#24292E;">	          if (newsockfd &gt;= MAXFDS) {</span></span>
<span class="line"><span style="color:#24292E;">	            die(&quot;Socket fd (%d) &gt;= MAXFDS (%d)&quot;, newsockfd, MAXFDS);</span></span>
<span class="line"><span style="color:#24292E;">	          }</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	          fd_status_t status =</span></span>
<span class="line"><span style="color:#24292E;">	              on_peer_connected(newsockfd, &amp;peer_addr, peer_addr_len);</span></span>
<span class="line"><span style="color:#24292E;">	          struct epoll_event event = {0};</span></span>
<span class="line"><span style="color:#24292E;">	          event.data.fd = newsockfd;</span></span>
<span class="line"><span style="color:#24292E;">	          if (status.want_read) {</span></span>
<span class="line"><span style="color:#24292E;">	            event.events |= EPOLLIN;</span></span>
<span class="line"><span style="color:#24292E;">	          }</span></span>
<span class="line"><span style="color:#24292E;">	          if (status.want_write) {</span></span>
<span class="line"><span style="color:#24292E;">	            event.events |= EPOLLOUT;</span></span>
<span class="line"><span style="color:#24292E;">	          }</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	          if (epoll_ctl(epollfd, EPOLL_CTL_ADD, newsockfd, &amp;event) </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0) {</span></span>
<span class="line"><span style="color:#24292E;">	            perror_die(&quot;epoll_ctl EPOLL_CTL_ADD&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	          }</span></span>
<span class="line"><span style="color:#24292E;">	        }</span></span>
<span class="line"><span style="color:#24292E;">	      } else {</span></span>
<span class="line"><span style="color:#24292E;">	        // A peer Socket is ready.</span></span>
<span class="line"><span style="color:#24292E;">	        if (events[i].events &amp; EPOLLIN) {</span></span>
<span class="line"><span style="color:#24292E;">	          // Ready for reading.</span></span>
<span class="line"><span style="color:#24292E;">	          int fd = events[i].data.fd;</span></span>
<span class="line"><span style="color:#24292E;">	          fd_status_t status = on_peer_ready_recv(fd);</span></span>
<span class="line"><span style="color:#24292E;">	          struct epoll_event event = {0};</span></span>
<span class="line"><span style="color:#24292E;">	          event.data.fd = fd;</span></span>
<span class="line"><span style="color:#24292E;">	          if (status.want_read) {</span></span>
<span class="line"><span style="color:#24292E;">	            event.events |= EPOLLIN;</span></span>
<span class="line"><span style="color:#24292E;">	          }</span></span>
<span class="line"><span style="color:#24292E;">	          if (status.want_write) {</span></span>
<span class="line"><span style="color:#24292E;">	            event.events |= EPOLLOUT;</span></span>
<span class="line"><span style="color:#24292E;">	          }</span></span>
<span class="line"><span style="color:#24292E;">	          if (event.events == 0) {</span></span>
<span class="line"><span style="color:#24292E;">	            printf(&quot;Socket %d closing\\n&quot;, fd);</span></span>
<span class="line"><span style="color:#24292E;">	            if (epoll_ctl(epollfd, EPOLL_CTL_DEL, fd, NULL) </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0) {</span></span>
<span class="line"><span style="color:#24292E;">	              perror_die(&quot;epoll_ctl EPOLL_CTL_DEL&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	            }</span></span>
<span class="line"><span style="color:#24292E;">	            close(fd);</span></span>
<span class="line"><span style="color:#24292E;">	          } else if (epoll_ctl(epollfd, EPOLL_CTL_MOD, fd, &amp;event) </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0) {</span></span>
<span class="line"><span style="color:#24292E;">	            perror_die(&quot;epoll_ctl EPOLL_CTL_MOD&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	          }</span></span>
<span class="line"><span style="color:#24292E;">	        } else if (events[i].events &amp; EPOLLOUT) {</span></span>
<span class="line"><span style="color:#24292E;">	          // Ready for writing.</span></span>
<span class="line"><span style="color:#24292E;">	          int fd = events[i].data.fd;</span></span>
<span class="line"><span style="color:#24292E;">	          fd_status_t status = on_peer_ready_send(fd);</span></span>
<span class="line"><span style="color:#24292E;">	          struct epoll_event event = {0};</span></span>
<span class="line"><span style="color:#24292E;">	          event.data.fd = fd;</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	          if (status.want_read) {</span></span>
<span class="line"><span style="color:#24292E;">	            event.events |= EPOLLIN;</span></span>
<span class="line"><span style="color:#24292E;">	          }</span></span>
<span class="line"><span style="color:#24292E;">	          if (status.want_write) {</span></span>
<span class="line"><span style="color:#24292E;">	            event.events |= EPOLLOUT;</span></span>
<span class="line"><span style="color:#24292E;">	          }</span></span>
<span class="line"><span style="color:#24292E;">	          if (event.events == 0) {</span></span>
<span class="line"><span style="color:#24292E;">	            printf(&quot;Socket %d closing\\n&quot;, fd);</span></span>
<span class="line"><span style="color:#24292E;">	            if (epoll_ctl(epollfd, EPOLL_CTL_DEL, fd, NULL) </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0) {</span></span>
<span class="line"><span style="color:#24292E;">	              perror_die(&quot;epoll_ctl EPOLL_CTL_DEL&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	            }</span></span>
<span class="line"><span style="color:#24292E;">	            close(fd);</span></span>
<span class="line"><span style="color:#24292E;">	          } else if (epoll_ctl(epollfd, EPOLL_CTL_MOD, fd, &amp;event) </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 0) {</span></span>
<span class="line"><span style="color:#24292E;">	            perror_die(&quot;epoll_ctl EPOLL_CTL_MOD&quot;);</span></span>
<span class="line"><span style="color:#24292E;">	          }</span></span>
<span class="line"><span style="color:#24292E;">	        }</span></span>
<span class="line"><span style="color:#24292E;">	      }</span></span>
<span class="line"><span style="color:#24292E;">	    }</span></span>
<span class="line"><span style="color:#24292E;">	  }</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	  return 0;</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br></div></div><h3 id="重新思考-i-o-模型" tabindex="-1">重新思考：I/O 模型 <a class="header-anchor" href="#重新思考-i-o-模型" aria-label="Permalink to &quot;重新思考：I/O 模型&quot;">​</a></h3><p>在上面的模型当中，select/poll 是阻塞（Blocking）模型，epoll 是非阻塞（Non-Blocking）模型。<strong>阻塞和非阻塞强调的是线程的状态</strong>，所以阻塞就是触发了线程的阻塞状态，线程阻塞了就停止执行，并且切换到其他线程去执行，直到触发中断再回来。</p><p>还有一组概念是同步（Synchrounous）和异步（Asynchrounous），select/poll/epoll 三者都是同步调用。</p><p>**同步强调的是顺序，**所谓同步调用，就是可以确定程序执行的顺序的调用。比如说执行一个调用，知道调用返回之前下一行代码不会执行。这种顺序是确定的情况，就是同步。</p><p>而异步调用则恰恰相反，<strong>异步调用不明确执行顺序</strong>。比如说一个回调函数，不知道何时会回来。异步调用会加大程序员的负担，因为我们习惯顺序地思考程序。因此，我们还会发明像协程的 yield 、迭代器等将异步程序转为同步程序。</p><p>由此可见，<strong>非阻塞不一定是异步，阻塞也未必就是同步</strong>。比如一个带有回调函数的方法，阻塞了线程 100 毫秒，又提供了回调函数，那这个方法是异步阻塞。例如下面的伪代码：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">asleep</span><span style="color:#E1E4E8;">(100ms, () </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 100ms 或更多后到这里</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...do some thing</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#6A737D;">// 100 ms 后到这里</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">asleep</span><span style="color:#24292E;">(100ms, () </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 100ms 或更多后到这里</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...do some thing</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#6A737D;">// 100 ms 后到这里</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>总结下，操作系统给大家提供各种各样的 API，是希望满足各种各样程序架构的诉求。但总体诉求其实是一致的：希望程序员写的单机代码，能够在多线程甚至分布式的环境下执行。这样你就不需要再去学习复杂的并发控制算法。从这个角度去看，非阻塞加上同步的编程模型确实省去了我们编程过程当中的很多思考。</p><p>但可惜的是，至少在今天这个时代，<strong>多线程、并发编程依然是程序员们的必修课</strong> 。因此你在思考 I/O 模型的时候，还是需要结合自己的业务特性及系统自身的架构特点，进行选择。<strong>I/O 模型并不是选择效率，而是选择编程的手段</strong>。试想一个所有资源都跑满了的服务器，并不会因为是异步或者非阻塞模型就获得更高的吞吐量。</p><p><strong>那么通过以上的学习，你现在可以尝试来回答本讲关联的面试题目：select/poll/epoll 有什么区别</strong>？</p><p>【<strong>解析</strong>】这三者都是处理 I/O 多路复用的编程手段。select/poll 模型是一种阻塞模型，epoll 是非阻塞模型。select/poll 内部使用线性结构存储进程关注的 Socket 集合，因此每次内核要判断某个消息是否发送给 select/poll 需要遍历进程关注的 Socket 集合。</p><p>而 epoll 不同，epoll 内部使用二叉搜索树（红黑树），用 Socket 编号作为索引，用关注的事件类型作为值，这样内核可以在非常快的速度下就判断某个消息是否需要发送给使用 epoll 的线程。</p><h3 id="思考题" tabindex="-1">思考题 <a class="header-anchor" href="#思考题" aria-label="Permalink to &quot;思考题&quot;">​</a></h3><p><strong>最后我再给你出一道需要查资料的思考题：如果用 epoll 架构一个Web 服务器应该是一个怎样的架构</strong>？</p><p>你可以把你的答案、思路或者课后总结写在留言区，这样可以帮助你产生更多的思考，这也是构建知识体系的一部分。经过长期的积累，相信你会得到意想不到的收获。如果你觉得今天的内容对你有所启发，欢迎分享给身边的朋友。期待看到你的思考！</p><p>这一讲就到这里，发现求知的乐趣，我是林䭽。感谢你学习本次课程，下一讲我们将学习 36 | 公私钥体系和网络安全：什么是中间人攻击？再见！</p>`,76),t=[e];function o(c,r,i,E,y,b){return n(),a("div",null,t)}const _=s(p,[["render",o]]);export{d as __pageData,_ as default};

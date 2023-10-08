import{_ as l,j as p,o as t,g as c,k as n,h as s,Q as e,s as a}from"./chunks/framework.4e7d56ce.js";const w=JSON.parse('{"title":"加餐练习题详解（二）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4619) 加餐  练习题详解（二）.md","filePath":"posts/backEnd/重学操作系统_文档/(4619) 加餐  练习题详解（二）.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/重学操作系统_文档/(4619) 加餐  练习题详解（二）.md"},i=e(`<h1 id="加餐练习题详解-二" tabindex="-1">加餐练习题详解（二） <a class="header-anchor" href="#加餐练习题详解-二" aria-label="Permalink to &quot;加餐练习题详解（二）&quot;">​</a></h1><p>今天我会带你把《模块二：Linux 指令》中涉及的课后练习题，逐一讲解，并给出每个课时练习题的解题思路和答案。</p><h3 id="练习题详解" tabindex="-1">练习题详解 <a class="header-anchor" href="#练习题详解" aria-label="Permalink to &quot;练习题详解&quot;">​</a></h3><h4 id="_06-目录结构和文件管理指令-rm-rf-指令的作用是" tabindex="-1">06 | 目录结构和文件管理指令：rm / -rf 指令的作用是？ <a class="header-anchor" href="#_06-目录结构和文件管理指令-rm-rf-指令的作用是" aria-label="Permalink to &quot;06 \\| 目录结构和文件管理指令：rm / -rf 指令的作用是？&quot;">​</a></h4><p><strong>【问题】</strong> 搜索文件系统中所有以包含 <code>std</code>字符串且以<code>.h</code>扩展名结尾的文件。</p><p><strong>【解析】</strong> 这道题目比较简单，大家也比较活跃，我自己只写了一种方法，没想到留言中有挺多不错的方案，那我们一起来看下。</p><p>下面是我的方案，你学完模块二的内容后，应该知道查看全部文件需要<code>sudo</code>，以管理员身份：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo find </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">name </span><span style="color:#9ECBFF;">&quot;*std*.h&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo find </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">name </span><span style="color:#032F62;">&quot;*std*.h&quot;</span></span></code></pre></div><p>我在留言中看到有的同学用的是<code>-iname</code>，这样也是可以的，只是忽略了大小写。</p><p>也可以结合 grep 语句， 用管道实现，比如:</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo find </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">name </span><span style="color:#9ECBFF;">&quot;*.h&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">grep std</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo find </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">name </span><span style="color:#032F62;">&quot;*.h&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">grep std</span></span></code></pre></div><h4 id="_07-进程、重定向和管道指令-xargs-指令的作用是" tabindex="-1">07 | 进程、重定向和管道指令：xargs 指令的作用是？ <a class="header-anchor" href="#_07-进程、重定向和管道指令-xargs-指令的作用是" aria-label="Permalink to &quot;07 \\| 进程、重定向和管道指令：xargs 指令的作用是？&quot;">​</a></h4><p><strong>【问题】</strong> 请问下面这段 Shell 程序的作用是什么？</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">mkfifo pipe1</span></span>
<span class="line"><span style="color:#E1E4E8;">mkfifo pipe2</span></span>
<span class="line"><span style="color:#E1E4E8;">echo </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n run </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> cat </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> pipe1 </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> pipe2 </span><span style="color:#F97583;">&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">cat </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> pipe2 </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> pipe1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">mkfifo pipe1</span></span>
<span class="line"><span style="color:#24292E;">mkfifo pipe2</span></span>
<span class="line"><span style="color:#24292E;">echo </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n run </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> cat </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> pipe1 </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> pipe2 </span><span style="color:#D73A49;">&amp;</span></span>
<span class="line"><span style="color:#24292E;">cat </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> pipe2 </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> pipe1</span></span></code></pre></div><p><strong>【解析】</strong> 这个题目是我在网上看到的一个比较有趣的问题。</p><p>前 2 行代码创建了两个管道文件。</p><p>从第 3 行开始，代码变得复杂。<code>echo -n run</code>就是向输出流中写入一个<code>run</code>字符串（不带回车，所以用<code>-n</code>）。通过管道，将这个结果传递给了<code>cat</code>。<code>cat</code>是 concatenate 的缩写，意思是把文件粘在一起。</p><ul><li><p>当<code>cat</code>用<code>&gt;</code>重定向输出到一个管道文件时，如果没有其他进程从管道文件中读取内容，<code>cat</code>会阻塞。</p></li><li><p>当<code>cat</code>用<code>&lt;</code>读取一个管道内容时，如果管道中没有输入，也会阻塞。</p></li></ul><p>从这个角度来看，总共有 3 次重定向：</p><ul><li><p>将<code>-</code>也就是输入流的内容和<code>pipe1</code>内容合并重定向到<code>pipe2</code>；</p></li><li><p>将<code>pipe2</code>内容重定向到<code>cat</code>；</p></li><li><p>将<code>cat</code>的内容重定向到<code>pipe1</code>。</p></li></ul><p>仔细观察下路径：<code>pipe1</code>-&gt;<code>pipe2</code>-&gt;<code>pipe1</code>，构成了一个循环。 这样导致管道<code>pipe1</code>管道<code>pipe2</code>中总是有数据（没有数据的时间太短）。于是，就构成了一个无限循环。我们打开执行这个程序后，可以用<code>htop</code>查看当前的 CPU 使用情况，会发现 CPU 占用率很高。</p><h4 id="_08-用户和权限管理指令-请简述-linux-权限划分的原则" tabindex="-1">08 | 用户和权限管理指令： 请简述 Linux 权限划分的原则？ <a class="header-anchor" href="#_08-用户和权限管理指令-请简述-linux-权限划分的原则" aria-label="Permalink to &quot;08 \\| 用户和权限管理指令： 请简述 Linux 权限划分的原则？&quot;">​</a></h4><p><strong>【问题】</strong> 如果一个目录是只读权限，那么这个目录下面的文件还可写吗？</p><p><strong>【解析】</strong> 这类问题，你一定要去尝试，观察现象再得到结果。</p>`,24),d=a("p",null,[s("你可以看到上图中，foo 目录不可读了，下面的"),a("code",null,"foo/bar"),s("文件还可以写。 即便它不可写了，下面的"),a("code",null,"foo/bar"),s("文件还是可以写。")],-1),g=e('<p>但是想要创建新文件就会出现报错，因为创建新文件也需要改目录文件。这个例子说明 Linux 中的文件内容并没有存在目录中，目录中却有文件清单。</p><h4 id="_09-linux-中的网络指令-如何查看一个域名有哪些-ns-记录" tabindex="-1">09 | Linux 中的网络指令：如何查看一个域名有哪些 NS 记录？ <a class="header-anchor" href="#_09-linux-中的网络指令-如何查看一个域名有哪些-ns-记录" aria-label="Permalink to &quot;09 \\| Linux 中的网络指令：如何查看一个域名有哪些 NS 记录？&quot;">​</a></h4><p><strong>【问题】</strong> 如何查看正在 TIME_WAIT 状态的连接数量？</p><p><strong>【解析】</strong> 注意，这里有个小坑，就是 netstat 会有两行表头，这两行可以用 tail 过滤掉，下面<code>tail -n +3</code>就是告诉你 tail 从第 3 行开始显示。<code>-a</code>代表显示所有的 socket。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">netstat </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">a </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> tail </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n </span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> wc </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">l</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">netstat </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">a </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> tail </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n </span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> wc </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">l</span></span></code></pre></div><h4 id="_10-软件的安装-编译安装和包管理器安装有什么优势和劣势" tabindex="-1">10 | 软件的安装： 编译安装和包管理器安装有什么优势和劣势？ <a class="header-anchor" href="#_10-软件的安装-编译安装和包管理器安装有什么优势和劣势" aria-label="Permalink to &quot;10 \\| 软件的安装： 编译安装和包管理器安装有什么优势和劣势？&quot;">​</a></h4><p><strong>【问题】</strong> 如果你在编译安装 MySQL 时，发现找不到libcrypt.so ，应该如何处理？</p><p><strong>【解析】</strong> 遇到这类问题，首先应该去查资料。 比如查 StackOverflow，搜索关键词：libcrypt.so not found，或者带上自己的操作系统<code>ubuntu</code>。下图是关于 Stackoverflow 的一个解答：</p>',8),_=e('<p>在这里我再多说两句，程序员成长最需要的是学习时间，如果在这前面加一个形容词，那就是大量的学习时间；而程序员最需要掌握的技能就是搜索和学习知识的能力。如果你看到今天的这篇内容，说明已经学完了《重学操作系统》专栏两个模块的知识，希望你可以坚持下去！</p><h4 id="_11-高级技巧之日志分析-利用-linux-指令分析-web-日志" tabindex="-1">11 | 高级技巧之日志分析：利用 Linux 指令分析 Web 日志 <a class="header-anchor" href="#_11-高级技巧之日志分析-利用-linux-指令分析-web-日志" aria-label="Permalink to &quot;11 \\| 高级技巧之日志分析：利用 Linux 指令分析 Web 日志&quot;">​</a></h4><p><strong>【问题 1 】</strong> 根据今天的 access_log 分析出有哪些终端访问了这个网站，并给出分组统计结果。</p><p><strong>【解析】</strong> <code>access_log</code>中有<code>Debian</code>和<code>Ubuntu</code>等等。我们可以利用下面的指令看到，第 12 列是终端，如下图所示：</p>',4),h=a("p",null,[s("我们还可以使用"),a("code",null,"sort"),s("和"),a("code",null,"uniq"),s("查看有哪些终端，如下图所示：")],-1),E=e(`<p>最后需要写一个脚本，进行统计：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cat nginx_logs.txt </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">awk </span><span style="color:#9ECBFF;">&#39;{tms[$12]++;next}END{for (t in tms) print t, tms[t]}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cat nginx_logs.txt </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">\\</span></span>
<span class="line"><span style="color:#24292E;">awk </span><span style="color:#032F62;">&#39;{tms[$12]++;next}END{for (t in tms) print t, tms[t]}&#39;</span></span></code></pre></div><p>结果如下：</p>`,3),u=a("p",null,[a("strong",null,"【问题 2】"),s(" 根据今天的 access_log 分析出访问量 Top 前三的网页。")],-1),y=a("p",null,[s("如果不需要 Substring 等复杂的处理，也可以使用"),a("code",null,"sort"),s("和"),a("code",null,"uniq"),s("的组合。如下图所示：")],-1),m=e('<h4 id="_12-高级技巧之集群部署-利用-linux-指令同时在多台机器部署程序" tabindex="-1">12 | 高级技巧之集群部署：利用 Linux 指令同时在多台机器部署程序 <a class="header-anchor" href="#_12-高级技巧之集群部署-利用-linux-指令同时在多台机器部署程序" aria-label="Permalink to &quot;12 \\| 高级技巧之集群部署：利用 Linux 指令同时在多台机器部署程序&quot;">​</a></h4><p><strong>【问题】</strong>~/.bashrc ~/.bash_profile, ~/.profile 和 /etc/profile 的区别是什么？</p><p><strong>【解析】</strong> 执行一个 shell 的时候分成<strong>login shell</strong> 和<strong>non-login shell</strong> 。顾名思义我们使用了<code>sudo``su</code>切换到某个用户身份执行 shell，也就是<code>login shell</code>。还有 ssh 远程执行指令也是 login shell，也就是伴随登录的意思------<code>login shell</code> 会触发很多文件执行，路径如下：</p>',3),A=e("<p>如果以当前用户身份正常执行一个 shell，比如说<code>./a.sh</code>，就是一个<code>non-login</code>的模式。 这时候不会触发上述的完整逻辑。</p><p>另外shell还有另一种分法，就是<code>interactive</code>和<code>non-interactive</code>。interactive 是交互式的意思，当用户打开一个终端命令行工具后，会进入一个输入命令得到结果的交互界面，这个时候，就是<code>interactive shell</code>。</p><p><code>baserc</code>文件通常只在<code>interactive</code>模式下才会执行，这是因为<code>~/.bashrc</code>文件中通常有这样的语句，如下图所示：</p>",3),b=a("p",null,[s("这个语句通过"),a("code",null,"$-"),s("看到当前"),a("code",null,"shell"),s("的执行环境，如下图所示：")],-1),v=a("p",null,[s("带 i 字符的就是"),a("code",null,"interactive"),s("，没有带i字符就不是。")],-1),f=a("p",null,"因此， 如果你需要通过 ssh 远程 shell 执行一个文件，你就不是在 interactive 模式下，bashrc 不会触发。但是因为登录的原因，login shell 都会触发，也就是说 profile 文件依然会执行。",-1),k=a("h3",{id:"总结",tabindex:"-1"},[s("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),x=a("p",null,[s("这个模块我们学习了 Linux 指令。我带大家入了个门，也和你一起感受了一次 Linux 指令的博大精深。Linux 虽然没有上下五千年的历史，但每次使用，依然让我感受到了它浓郁的历史气息，悠久的文化传承，自由的创造精神。希望这块知识可以陪伴大家，鼓励你成为优秀的程序员。虽然我们已经学了几十个指令，但还是沧海一粟。后续就需要你多查资料，多用"),a("code",null,"man"),s("手册，继续深造了。")],-1),C=a("p",null,'好的，Linux 指令部分就告一段落。下一节课，我们将开启操作系统核心知识学习，请和我一起来学习"模块三：操作系统基础知识"吧。',-1);function F(D,q,T,S,P,I){const o=p("Image");return t(),c("div",null,[i,n(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/5F/76/Ciqc1F-JYOSAEeZOAAK-jHkfQpk505.png"}),s(),d,n(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/5F/76/Ciqc1F-JYOuACHgqAADld0-OED0560.png"}),s(),g,n(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/5F/76/Ciqc1F-JYUSACvI4AABGKWEIwZc693.png"}),s(),_,n(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/5F/77/Ciqc1F-JYVKAeXxWAAFX4ed-XgU367.png"}),s(),h,n(o,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/5F/77/Ciqc1F-JYVqABf8YAAJ8F9oyYEk538.png"}),s(),E,n(o,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/5F/82/CgqCHl-JYWCAQ5S7AALOO3VxYyE532.png"}),s(),u,y,n(o,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/5F/82/CgqCHl-JYWmASpWzAAHX7u4P8x4076.png"}),s(),m,n(o,{alt:"Lark20201019-104257.png",src:"https://s0.lgstatic.com/i/image/M00/60/2F/CgqCHl-M_a2AB4DCAABaALYsBvA370.png"}),s(),A,n(o,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/5F/82/CgqCHl-JYZmAU3eiAADOD88ztPA917.png"}),s(),b,n(o,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/5F/77/Ciqc1F-JYZ-AKItgAABi7Cu95fc751.png"}),s(),v,f,k,x,C])}const L=l(r,[["render",F]]);export{w as __pageData,L as default};

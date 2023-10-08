import{_ as a,j as t,o as i,g as p,k as c,h as e,Q as d,s as l}from"./chunks/framework.4e7d56ce.js";const H=JSON.parse('{"title":"06目录结构和文件管理指令：rm-rf指令的作用是？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4612) 06  目录结构和文件管理指令：rm  -rf 指令的作用是？.md","filePath":"posts/backEnd/重学操作系统_文档/(4612) 06  目录结构和文件管理指令：rm  -rf 指令的作用是？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/重学操作系统_文档/(4612) 06  目录结构和文件管理指令：rm  -rf 指令的作用是？.md"},n=d('<h1 id="_06目录结构和文件管理指令-rm-rf指令的作用是" tabindex="-1">06目录结构和文件管理指令：rm-rf指令的作用是？ <a class="header-anchor" href="#_06目录结构和文件管理指令-rm-rf指令的作用是" aria-label="Permalink to &quot;06目录结构和文件管理指令：rm-rf指令的作用是？&quot;">​</a></h1><p>通过模块一的学习，你应该掌握了计算机组成原理的重点知识，到了模块二，我们开始学习 Linux 指令，它是操作系统的前端，学好这部分内容一方面可以帮助你应对工作场景，另一方面可以让你在学习操作系统底层知识前，对 Linux 有一个大概的了解。</p><p><strong>接下来，我们依然通过一道常见的高频面试题，引出今天的主要内容。面试题如下：请你说说</strong> <code>rm / -rf</code><strong>的作用</strong>？</p><p>相信 90% 的同学是知道这个指令的。这里先预警一下，你千万不要轻易在服务器上尝试。要想知道这条指令是做什么的，能够帮助我们解决哪些问题，那就请你认真学习今天的内容。在本课时的最后我会公布这道题目的分析过程和答案。</p><h3 id="什么是-shell" tabindex="-1">什么是 Shell <a class="header-anchor" href="#什么是-shell" aria-label="Permalink to &quot;什么是 Shell&quot;">​</a></h3><p>在我们学习 Linux 指令之前，先来说一下什么是 Shell？Shell 把我们输入的指令，传递给操作系统去执行，所以 Shell 是一个命令行的用户界面。</p><p>早期程序员没有图形界面用，就用 Shell。而且图形界面制作成本较高，不能实现所有功能，因此今天的程序员依然在用 Shell。</p><p>你平时还经常会看到一个词叫作bash（Bourne Again Shell），它是用 Shell 组成的程序。这里的 Bourne 是一个人名，Steve Bourne 是 bash 的发明者。</p><p>我们今天学习的所有指令，不是写死在操作系统中的，而是一个个程序。比如<code>rm</code>指令，你可以用<code>which</code>指令查看它所在的目录。如下图所示，你会发现<code>rm</code>指令在<code>/usr/bin/rm</code>目录中。</p>',9),s=d('<p>如上图所示，<code>ramroll</code>是我的英文名字，ubuntu 是我这台机器的名字。我输入了<code>which rm</code>，然后获得了<code>/usr/bin/rm</code>的结果，最终执行这条指令的是操作系统，连接我和操作系统的程序就是 Shell。</p><p>Linux 对文件目录操作的指令就工作在 Shell 上，接下来我们讲讲文件目录操作指令。</p><h3 id="linux-对文件目录的抽象" tabindex="-1">Linux 对文件目录的抽象 <a class="header-anchor" href="#linux-对文件目录的抽象" aria-label="Permalink to &quot;Linux 对文件目录的抽象&quot;">​</a></h3><p>Linux 对文件进行了一个树状的抽象。<code>/</code>代表根目录，每一节目录也用<code>/</code>分开，所以在上图所展示的<code>/usr/bin/rm</code>中，第一级目录是<code>/</code>根目录，第二级目录是<code>usr</code>目录，第三级是<code>bin</code>目录。最后的<code>rm</code>是一个文件。</p><h4 id="路径-path" tabindex="-1">路径（path） <a class="header-anchor" href="#路径-path" aria-label="Permalink to &quot;路径（path）&quot;">​</a></h4><p>像<code>/usr/bin/rm</code>称为可执行文件<code>rm</code>的路径。路径就是一个文件在文件系统中的地址。如果文件系统是树形结构，那么通常一个文件只有一个地址（路径）。</p><p><strong>目标文件的绝对路径（Absolute path），也叫作完全路径（full path），是从</strong> <code>/</code><strong>开始，接下来每一层都是一级子目录，直到</strong> 定位<strong>到目标文件为止。</strong></p><p>如上图所示的例子中，<code>/usr/bin/rm</code>就是一个绝对路径。</p><h4 id="工作目录" tabindex="-1">工作目录 <a class="header-anchor" href="#工作目录" aria-label="Permalink to &quot;工作目录&quot;">​</a></h4><p>为了方便你工作，Shell 还抽象出了工作目录。当用户打开 Shell 的时候，Shell 就会给用户安排一个工作目录。因此也就产生了相对路径。</p><p>相对路径（Relative path）是以工作目录为基点的路径。比如：</p><ul><li><p>当用户在<code>/usr</code>目录下的时候，<code>rm</code>文件的相对路径就是<code>bin/rm</code>；</p></li><li><p>如果用户在<code>/usr/bin</code>目录下的时候，<code>rm</code>文件的路径就是<code>./rm</code>或者<code>rm</code>，这里用<code>.</code>代表当前目录；</p></li><li><p>如果用户在<code>/usr/bin/somedir</code>下，那么<code>rm</code>的相对路径就是<code>../rm</code>，这里用<code>..</code>代表上一级目录。</p></li></ul><p>我们使用<code>cd</code>（change directory）指令切换工作目录，既可以用绝对路径，也可以用相对路径。 这里我要强调几个注意事项：</p><ul><li><p>输入<code>cd</code>，不带任何参数会切换到用户的家目录，Linux 中通常是<code>/home/{用户名}</code>。以我自己为例，我的家目录是<code>/home/ramroll</code>；</p></li><li><p>输入<code>cd .</code>什么都不会发生，因为<code>.</code>代表当前目录；</p></li><li><p>输入<code>cd..</code>会回退一级目录，因为<code>..</code>代表上级目录。</p></li></ul><p>利用上面这 3 种能力，你就可以方便的构造相对路径了。</p><p>Linux提供了一个指令<code>pwd</code>（Print Working Directory）查看工作目录。下图是我输入<code>pwd</code>的结果。</p>',16),_=d('<p>你可以看到我正在<code>/home/ramroll/Documents</code>目录下工作。</p><h4 id="几种常见的文件类型" tabindex="-1">几种常见的文件类型 <a class="header-anchor" href="#几种常见的文件类型" aria-label="Permalink to &quot;几种常见的文件类型&quot;">​</a></h4><p>另一方面，Linux 下的目录也是一种文件；但是文件也不只有目录和可执行文件两种。常见的文件类型有以下 7 种:</p><ol><li><p>普通文件（比如一个文本文件）；</p></li><li><p>目录文件（目录也是一个特殊的文件，它用来存储文件清单，比如<code>/</code>也是一个文件）；</p></li><li><p>可执行文件（上面的<code>rm</code>就是一个可执行文件）；</p></li><li><p>管道文件（我们会在 07 课时讨论管道文件）；</p></li><li><p>Socket 文件（我们会在模块七网络部分讨论 Socket 文件）；</p></li><li><p>软链接文件（相当于指向另一个文件所在路径的符号）；</p></li><li><p>硬链接文件（相当于指向另一个文件的指针，关于软硬链接我们将在模块六文件系统部分讨论）。</p></li></ol><p>你如果使用<code>ls -F</code>就可以看到当前目录下的文件和它的类型。比如下面这种图：</p><ol><li><p>* 结尾的是可执行文件；</p></li><li><p>= 结尾的是 Socket 文件；</p></li><li><p>@ 结尾的是软链接；</p></li><li><p>| 结尾的管道文件；</p></li><li><p>没有符号结尾的是普通文件；</p></li><li><p>/ 结尾的是目录。</p></li></ol>',6),h=d('<h4 id="设备文件" tabindex="-1">设备文件 <a class="header-anchor" href="#设备文件" aria-label="Permalink to &quot;设备文件&quot;">​</a></h4><p>Socket 是网络插座，是客户端和服务器之间同步数据的接口。其实，Linux 不只把 Socket 抽象成了文件，设备基本也都被抽象成了文件。因为设备需要不断和操作系统交换数据。而交换方式只有两种------读和写。所以设备是可以抽象成文件的，因为文件也支持这两种操作。</p><p>Linux 把所有的设备都抽象成了文件，比如说打印机、USB、显卡等。这让整体的系统设计变得高度统一。</p><p>至此，我们了解了 Linux 对文件目录的抽象，接下来我们看看具体的增删改查指令。</p><h3 id="文件的增删改查" tabindex="-1">文件的增删改查 <a class="header-anchor" href="#文件的增删改查" aria-label="Permalink to &quot;文件的增删改查&quot;">​</a></h3><h4 id="增加" tabindex="-1">增加 <a class="header-anchor" href="#增加" aria-label="Permalink to &quot;增加&quot;">​</a></h4><p>创建一个普通文件的方法有很多，最常见的有<code>touch</code>指令。比如下面我们创建了一个 a.txt 文件。</p>',7),g=d("<p><code>touch</code>指令本来是用来更改文件的时间戳的，但是如果文件不存在<code>touch</code>也会帮助创建一个空文件。</p><p>如果你拿到一个指令不知道该怎么用，比如<code>touch</code>，你可以用<code>man touch</code>去获得帮助。<code>man</code>意思是 manual，就是说明书的意思，这里指的是系统的手册。如果你不知道<code>man</code>是什么，也可以使用<code>man man</code>。下图是使用<code>man man</code>的结果：</p>",2),m=l("p",null,[e("另外如果我们需要增加一个目录，就需要用到"),l("code",null,"mkdir"),e("指令（ make directory），比如我们创建一个"),l("code",null,"hello"),e("目录，如下图所示：")],-1),u=l("h4",{id:"查看",tabindex:"-1"},[e("查看 "),l("a",{class:"header-anchor",href:"#查看","aria-label":'Permalink to "查看"'},"​")],-1),A=l("p",null,[e("创建之后我们可以用"),l("code",null,"ls"),e("指令看到这个文件，"),l("code",null,"ls"),e("是 list 的缩写。下面是指令 'ls' 的执行结果。")],-1),T=d("<p>我们看到在当前的目录下有一个<code>a.txt</code>文件，还有一个<code>hello</code>目录。如果你知道当前的工作目录，就可以使用<code>pwd</code>指令。</p><p>如果想看到<code>a.txt</code>更完善的信息，还可以使用<code>ls -l</code>。<code>-l</code>是<code>ls</code>指令的可选参数。下图是<code>ls -l</code>的结果，你可以看到<code>a.txt</code>更详细的描述。</p>",2),S=d('<p>如上图所示，我们看到两个<code>ramroll</code>，它们是<code>a.txt</code>所属的用户和所属的用户分组，刚好重名了。<code>Sep 13</code>是日期。 中间有一个<code>0</code>是<code>a.txt</code>的文件大小，目前<code>a.txt</code>中还没有写入内容，因此大小是<code>0</code>。</p><p>另外虽然<code>hello</code>是空的目录，但是目录文件 Linux 上来就分配了<code>4096</code>字节的空间。这是因为目录内需要保存很多文件的描述信息。</p><h4 id="删除" tabindex="-1">删除 <a class="header-anchor" href="#删除" aria-label="Permalink to &quot;删除&quot;">​</a></h4><p>如果我们想要删除<code>a.txt</code>可以用<code>rm a.txt</code>；如我们要删除<code>hello</code>目录，可以用<code>rm hello</code>。<code>rm</code>是 remove 的缩写。</p>',4),x=d("<p>但是当我们输入<code>rm hello</code>的时候，会提示<code>hello</code>是一个目录，不可以删除。因此我们需要增加一个可选项，比如<code>-r</code>即 recursive（递归）。目录是一个递归结构，所以需要用递归删除。最后，你会发现<code>rm hello -r</code>删除了<code>hello</code>目录。</p><p>接下来我们尝试在 hello 目录下新增一个文件，比如相对路径是<code>hello/world/os.txt</code>。需要先创建 hello/world 目录。这种情况会用到<code>mkdir</code>的<code>-p</code>参数，这个参数控制<code>mkdir</code>当发现目标目录的父级目录不存在的时候会递归的创建。以下是我们的执行结果：</p>",2),C=d('<h4 id="修改" tabindex="-1">修改 <a class="header-anchor" href="#修改" aria-label="Permalink to &quot;修改&quot;">​</a></h4><p>如果需要修改一个文件，可以使用<code>nano</code>或者<code>vi</code>编辑器。类似的工具还有很多，但是<code>nano</code>和<code>vi</code>一般是<code>linux</code>自带的。</p><p>这里我不展开讲解了，你可以自己去尝试。在尝试的过程中如果遇到什么问题，可以写在留言区，我会逐一为你解答。</p><h3 id="查阅文件内容" tabindex="-1">查阅文件内容 <a class="header-anchor" href="#查阅文件内容" aria-label="Permalink to &quot;查阅文件内容&quot;">​</a></h3><p>在了解了文件的增删改查操作后，下面我们来学习查阅文件内容。我们知道，Linux 下查阅文件内容，可以根据不同场景选择不同的指令。</p><p>当文件较小时，比如一个配置文件，想要快速浏览这个文件，可以用<code>cat</code>指令。下面 cat 指令帮助我们快速查看<code>/etc/hosts</code>文件。<code>cat</code>指令将文件连接到标准输出流并打印到屏幕上。</p>',6),f=d("<p>标准输出流（Standard Output）也是一种文件，进程可以将要输出的内容写入标准输出流文件，这样就可以在屏幕中打印。</p><p>如果用<code>cat</code>查看大文件，比如一个线上的日志文件，因为动辄有几个 G，控制台打印出所有的内容就要非常久，而且刷屏显示看不到东西。</p><p>而且如果在线上进行查看大文件的操作，会带来不必要的麻烦：</p><p>首先因为我们需要把文件拷贝到输入输出流，这需要花费很长时间，这个过程会占用机器资源；</p><p>其次，本身文件会读取到内存中，这时内存被大量占用，很危险，这可能导致其他应用内存不足。因此我们需要一些不用加载整个文件，就能查看文件内容的指令。</p><p><strong>more</strong></p><p><code>more</code>可以帮助我们读取文件，但不需要读取整个文件到内存中。本身<code>more</code>的定位是一个阅读过滤器，比如你在<code>more</code>里除了可以向下翻页，还可以输入一段文本进行搜索。</p>",7),b=d("<p>如上图所示，我在<code>more</code>查看一个 nginx 日志后，先输入一个<code>/</code>，然后输入<code>192.168</code>看到的结果。<code>more</code>帮我找到了<code>192.168</code>所在的位置，然后又帮我定位到了这个位置。整个过程 more 指令只读取我们需要的部分到内存中。</p><p><strong>less</strong></p><p><code>less</code>是一个和<code>more</code>功能差不多的工具，打开<code>man</code>能够看到<code>less</code>的介绍上写着自己是<code>more</code>的反义词（opposite of more）。这样你可以看出<code>linux</code>生态其实也是很自由的一个生态，在这里创造工具也可以按照自己的喜好写文档。<code>less</code>支持向上翻页，这个功能<code>more</code>是做不到的。所以现在<code>less</code>用得更多一些。</p><p><strong>head/tail</strong></p><p><code>head</code>和<code>tail</code>是一组，它们用来读取一个文件的头部 N 行或者尾部 N 行。比如一个线上的大日志文件，当线上出了 bug，服务暂停的时候，我们就可以用<code>tail -n 1000</code>去查看最后的 1000 行日志文件，寻找导致服务异常的原因。</p><p>另一个比较重要的用法是，如果你想看一个实时的<code>nginx</code>日志，可以使用<code>tail -f 文件名</code>，这样你会看到用户的请求不断进来。查一下<code>man</code>，你会发现<code>-f</code>是 follow 的意思，就是文件追加的内容会跟随输出到标准输出流。</p><p><strong>grep</strong></p><p>有时候你需要查看一个指定<code>ip</code>的nginx日志，或者查看一段时间内的<code>nginx</code>日志。如果不想用<code>less</code>和<code>more</code>进入文件中去查看，就可以用<code>grep</code>命令。Linux 的文件命名风格都很短，所以也影响了很多人，比如之前我看到过一个大牛的程序，变量名从来不超过 5 个字母，而且都有意义。</p><p>grep 这个词，我们分成三段来看，是 g|re|p。</p><ul><li><p>g 就是 global，全局；</p></li><li><p>re 就是 regular expression，正则表达式；</p></li><li><p>p 就是 pattern，模式。</p></li></ul><p>所以这个指令的作用是通过正则表达式全局搜索一个文件找到匹配的模式。我觉得这种命名真的很牛，软件命名也是一个世纪难题，grep这个名字不但发音不错，而且很有含义，又避免了名字过长，方便记忆。</p><p>下面我们举两个例子看看 grep 的用法：</p><ul><li>例 1：查找 ip 地址</li></ul><p>我们可以通过<code>grep</code>命令定位某个<code>ip</code>地址的用户都做了什么事情，如下图所示：</p>",14),q=l("ul",null,[l("li",null,"例 2：查找时间段的日志")],-1),P=l("p",null,"我们可以通过 grep 命令查找某个时间段内用户都做了什么事情。如下图所示，你可以看到在某个 5 分钟内所有用户的访问情况。",-1),E=d('<h3 id="查找文件" tabindex="-1">查找文件 <a class="header-anchor" href="#查找文件" aria-label="Permalink to &quot;查找文件&quot;">​</a></h3><p>用户经常还会有一种诉求，就是查找文件。</p><p>之前我们使用过一个<code>which</code>指令，这个指令可以查询一个指令文件所在的位置，比如<code>which grep</code>会，你会看到<code>grep</code>指令被安装的位置是<code>/usr/bin</code>。但是我们还需要一个更加通用的指令查找文件，也就是 find 指令。</p><p><strong>find</strong></p><p>find 指令帮助我们在文件系统中查找文件。 比如我们如果想要查找所有<code>.txt</code> 扩展名的文件，可以使用<code>find / -iname &quot;*.txt&quot;</code>，<code>-iname</code>这个参数是用来匹配查找的，i 字母代表忽略大小写，这里也可以用<code>-name</code>替代。输入这条指令，你会看到不断查找文件，如下图所示：</p>',5),D=d('<h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这节课我们学习了很多指令，不知道你记住了多少？最后，我们再一起复习一下。</p><ul><li><p><code>pwd</code>指令查看工作目录。</p></li><li><p><code>cd</code>指令切换工作目录。</p></li><li><p><code>which</code>指令查找一个执行文件所在的路径。</p></li><li><p><code>ls</code>显示文件信息。</p></li><li><p><code>rm</code>删除文件。</p></li><li><p><code>touch</code>修改一个文件的时间戳，如果文件不存在会触发创建文件。</p></li><li><p><code>vi</code>和<code>nano</code>可以用来编辑文件。</p></li><li><p><code>cat</code>查看完成的文件适合小型文件。</p></li><li><p><code>more``less</code>查看一个文件但是只读取用户看到的内容到内存，因此消耗资源较少，适合在服务器上看日志。</p></li><li><p><code>head``tail</code>可以用来看文件的头和尾。</p></li><li><p><code>grep</code>指令搜索文件内容。</p></li><li><p><code>find</code>指令全局查找文件。</p></li></ul><p>在这里，我再强调一个指令，即<code>man</code>指令，它是所有指令的手册，所以你一定要多多运用，熟练掌握。另外，一个指令通常有非常多的参数，但都需要用<code>man</code>指令去仔细研究。</p><p><strong>那么通过这节课的学习，你现在可以来回答本节关联的面试题目：</strong> <code>rm / -rf</code><strong>的作用是？</strong></p><p>老规矩，请你先在脑海里先思考你的答案，并把你的思考写在留言区，然后再来看我接下来的分析。</p><p><strong>【解析】</strong></p><ul><li><p><code>/</code>是文件系统根目录；</p></li><li><p><code>rm</code>是删除指令；</p></li><li><p><code>-r</code>是 recursive（递归）；</p></li><li><p><code>-f</code>是 force（强制），遇到只读文件也不提示，直接删除。</p></li></ul><p>所以<code>rm -rf /</code>就是删除整个文件系统上的所有文件，而且不用给用户提示。</p><h3 id="课后习题" tabindex="-1">课后习题 <a class="header-anchor" href="#课后习题" aria-label="Permalink to &quot;课后习题&quot;">​</a></h3><p><strong>最后再给你出一道查资料的面试题，搜索文件系统中所有以包含</strong> <code>std</code><strong>字符串且以</strong> <code>.h</code><strong>扩展名结尾的文件</strong>。</p><p>你可以把你的答案、思路或者课后总结写在留言区，这样可以帮助你产生更多的思考，这也是构建知识体系的一部分。经过长期的积累，相信你会得到意想不到的收获。如果你觉得今天的内容对你有所启发，欢迎分享给身边的朋友。期待看到你的思考！</p>',12);function k(V,w,I,N,M,L){const o=t("Image");return i(),p("div",null,[n,c(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/56/23/Ciqc1F9rD96AC0GrAAB1NDHyN48035.png"}),e(),s,c(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/56/23/Ciqc1F9rEAqAYNQMAACAjjKxZlw157.png"}),e(),_,c(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/56/24/Ciqc1F9rECOAaC4iAAEqYXENnnI551.png"}),e(),h,c(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/56/2F/CgqCHl9rEC-Ae_lzAAA_P5LZwCo061.png"}),e(),g,c(o,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/56/24/Ciqc1F9rEDqAMZ0vAAXe1wrRPf0386.png"}),e(),m,c(o,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/56/2F/CgqCHl9rEEGAKH5HAABgveVKHzI705.png"}),e(),u,A,c(o,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/56/24/Ciqc1F9rEF-AVHcKAABf8ABbQ0o651.png"}),e(),T,c(o,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/56/2F/CgqCHl9rEGqAA0XWAAEv83hemN0703.png"}),e(),S,c(o,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/56/2F/CgqCHl9rEHSAaCuvAACmYor8yvE702.png"}),e(),x,c(o,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/56/24/Ciqc1F9rEJKAYE8qAAFVKf9hzs8021.png"}),e(),C,c(o,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/56/30/CgqCHl9rEKSAetBpAAJKmXNMtek042.png"}),e(),f,c(o,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/56/30/CgqCHl9rEK6ANctWAAvN_sMIYLA038.png"}),e(),b,c(o,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/56/30/CgqCHl9rELqAbYi4AAfJLxM4xgw204.png"}),e(),q,P,c(o,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/56/25/Ciqc1F9rEMGAQTTHAAYTLdI_HSA050.png"}),e(),E,c(o,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/56/30/CgqCHl9rEM2AD9SWAAdsfnMr8fw422.png"}),e(),D])}const R=a(r,[["render",k]]);export{H as __pageData,R as default};

import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.a0d18f64.js";const is=JSON.parse('{"title":"第03讲：字节码层面分析cla类文件结构","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1857) 第03讲：字节码层面分析 cla 类文件结构.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1857) 第03讲：字节码层面分析 cla 类文件结构.md","lastUpdated":1696682708000}'),i={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1857) 第03讲：字节码层面分析 cla 类文件结构.md"},r=p('<h1 id="第03讲-字节码层面分析cla类文件结构" tabindex="-1">第03讲：字节码层面分析cla类文件结构 <a class="header-anchor" href="#第03讲-字节码层面分析cla类文件结构" aria-label="Permalink to &quot;第03讲：字节码层面分析cla类文件结构&quot;">​</a></h1><p>本课时我们从字节码层面分析 class 类文件结构。首先来看一道面试题：</p><blockquote><p><strong>java中 String 字符串的长度有限制吗？</strong></p></blockquote><p>平时项目开发中，我们经常会用到 String 来声明字符串，比如 String str = &quot;abc&quot;， 但是你可能从来没有想过等于号之后的字符串常量到底有没有长度限制。要彻底答对这道题，就需要先学会今天所讲的内容------class 文件。</p><h3 id="class-的来龙去脉" tabindex="-1">class 的来龙去脉 <a class="header-anchor" href="#class-的来龙去脉" aria-label="Permalink to &quot;class 的来龙去脉&quot;">​</a></h3><p>Java 能够实现&quot;一次编译，到处运行&quot;，这其中 class 文件要占大部分功劳。为了让 Java 语言具有良好的跨平台能力，Java 独具匠心的提供了一种可以在所有平台上都能使用的一种中间代码------<strong>字节码类文件（.class文件）</strong>。有了字节码，无论是哪种平台（如：Mac、Windows、Linux 等），只要安装了虚拟机都可以直接运行字节码。</p><p>并且，<strong>有了字节码，也解除了 Java 虚拟机和 Java 语言之间的耦合</strong>。这句话你可能不是很理解，这种解耦指的是什么？</p><p>其实，Java 虚拟机当初被设计出来的目的就不单单是只运行 Java 这一种语言。目前 Java 虚拟机已经可以支持很多除 Java 语言以外的其他语言了，如 Groovy、JRuby、Jython、Scala 等。之所以可以支持其他语言，是因为这些语言经过编译之后也可以生成能够被 JVM 解析并执行的字节码文件。而虚拟机并不关心字节码是由哪种语言编译而来的。如下图所示：</p>',8),E=p('<h3 id="上帝视角看-class-文件" tabindex="-1">上帝视角看 class 文件 <a class="header-anchor" href="#上帝视角看-class-文件" aria-label="Permalink to &quot;上帝视角看 class 文件&quot;">​</a></h3><p>如果从纵观的角度来看 class 文件，class 文件里只有两种数据结构：<strong>无符号数</strong> 和<strong>表</strong>。</p><ul><li><p><strong>无符号数</strong>：属于基本的数据类型，以 u1、u2、u4、u8 来分别代表 1 个字节、2 个字节、4 个字节和 8 个字节的无符号数，无符号数可以用来描述数字、索引引用、数量值或者字符串（UTF-8 编码）。</p></li><li><p><strong>表</strong> ：表是由多个无符号数或者其他表作为数据项构成的复合数据类型，<strong>class文件中所有的表都以&quot;_info&quot;结尾</strong>。其实，整个 Class 文件本质上就是一张表。</p></li></ul><p>这两者之间的关系可以用下面这张张图来表示：</p>',4),_=p(`<p>可以看出，在一张表中可以包含其他无符号数和其他表格。伪代码可以如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 无符号数</span></span>
<span class="line"><span style="color:#E1E4E8;">u1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">u2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">u4 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">[</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">u8 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">[</span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 表</span></span>
<span class="line"><span style="color:#E1E4E8;">class_table {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 表中可以引用各种无符号数，</span></span>
<span class="line"><span style="color:#E1E4E8;">    u1 tag;</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2 index2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 表中也可以引用其它表</span></span>
<span class="line"><span style="color:#E1E4E8;">    method_table mt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 无符号数</span></span>
<span class="line"><span style="color:#24292E;">u1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">u2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">u4 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">[</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">u8 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">[</span><span style="color:#005CC5;">8</span><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 表</span></span>
<span class="line"><span style="color:#24292E;">class_table {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 表中可以引用各种无符号数，</span></span>
<span class="line"><span style="color:#24292E;">    u1 tag;</span></span>
<span class="line"><span style="color:#24292E;">    u2 index2;</span></span>
<span class="line"><span style="color:#24292E;">    ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 表中也可以引用其它表</span></span>
<span class="line"><span style="color:#24292E;">    method_table mt;</span></span>
<span class="line"><span style="color:#24292E;">    ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="class-文件结构" tabindex="-1">class 文件结构 <a class="header-anchor" href="#class-文件结构" aria-label="Permalink to &quot;class 文件结构&quot;">​</a></h3><p>刚才我们说在 class 文件中只存在无符号数和表这两种数据结构。而这些无符号数和表就组成了 class 中的各个结构。这些结构按照<strong>预先规定好的顺序</strong>紧密的从前向后排列，相邻的项之间没有任何间隙。如下图所示：</p>`,4),y=s("p",null,"当 JVM 加载某个 class 文件时，JVM 就是根据上图中的结构去解析 class 文件，加载 class 文件到内存中，并在内存中分配相应的空间。具体某一种结构需要占用大多空间，可以参考下图：",-1),d=p(`<blockquote><p>看到这里你可能会有点概念混淆，分不清无符号数、表格以及上面的结构是什么关系。其实可以举一个简单的例子：人类的身体是由 H、O、C、N 等元素组成的。但是这些元素又是按照一定的规律组成了人类身体的各个器官。class 文件中的无符号数和表格就相当于人类身体中的 H、O、C、N 等元素，而 class 结构图中的各项结构就相当于人类身体的各个器官。并且这些器官的组织顺序是有严格顺序要求的，毕竟眼睛不能长在屁股上。</p></blockquote><h3 id="实例分析" tabindex="-1">实例分析 <a class="header-anchor" href="#实例分析" aria-label="Permalink to &quot;实例分析&quot;">​</a></h3><p>理清这些概念之后，接下来通过一个 Java 代码实例，来看一下上面这几个结构的详细情况。首先编写一个简单的 Java 源代码 Test.java，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.io.Serializable;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Serializable</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">Cloneable</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> num </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">i</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">          num </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> num </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> i;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> num;</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.io.Serializable;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Serializable</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">Cloneable</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> num </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">i</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">          num </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> num </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> i;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> num;</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>通过 javac 将其编译，生成 Test.class 字节码文件。然后使用 16 进制编辑器打开 class 文件，显示内容如下所示：</p>`,5),g=s("p",null,"上图中都是一些 16 进制数字，每两个字符代表一个字节。乍看一下各个字符之间毫无规律，但是在 JVM 的视角里这些 16 进制字符是按照严格的规律排列的。接下来就一步一步看下 JVM 是如何解析它们的。",-1),u=s("h3",{id:"魔数-magic-number",tabindex:"-1"},[a("魔数 magic number "),s("a",{class:"header-anchor",href:"#魔数-magic-number","aria-label":'Permalink to "魔数 magic number"'},"​")],-1),h=s("p",null,"如上图所示，在 class 文件开头的四个字节是 class 文件的魔数，它是一个固定的值--0XCAFEBABE。魔数是 class 文件的标志，也就是说它是判断一个文件是不是 class 格式文件的标准， 如果开头四个字节不是 0XCAFEBABE， 那么就说明它不是 class 文件， 不能被 JVM 识别或加载。",-1),A=s("h3",{id:"版本号",tabindex:"-1"},[a("版本号 "),s("a",{class:"header-anchor",href:"#版本号","aria-label":'Permalink to "版本号"'},"​")],-1),C=s("p",null,[a("紧跟在魔数后面的四个字节代表当前 class 文件的版本号。前两个字节 "),s("strong",null,"0000"),a(" 代表次版本号（minor_version），后两个字节 "),s("strong",null,"0034"),a(" 是主版本号（major_version），对应的十进制值为 52，也就是说当前 class 文件的主版本号为 52，次版本号为 0。所以综合版本号是 52.0，也就是 "),s("strong",null,"jdk1.8.0")],-1),T=s("h3",{id:"常量池-重点",tabindex:"-1"},[a("常量池（重点） "),s("a",{class:"header-anchor",href:"#常量池-重点","aria-label":'Permalink to "常量池（重点）"'},"​")],-1),m=s("p",null,"紧跟在版本号之后的是一个叫作常量池的表（cp_info）。在常量池中保存了类的各种相关信息，比如类的名称、父类的名称、类中的方法名、参数名称、参数类型等，这些信息都是以各种表的形式保存在常量池中的。",-1),b=s("p",null,[s("strong",null,"常量池中的每一项都是一个表，其项目类型共有 14 种，如下表所示：")],-1),v=p(`<p>可以看出，常量池中的每一项都会有一个 u1 大小的 tag 值。tag 值是表的标识，JVM 解析 class 文件时，通过这个值来判断当前数据结构是哪一种表。以上 14 种表都有自己的结构，这里不再一一介绍，就以 CONSTANT_Class_info 和 CONSTANT_Utf8_info 这两张表举例说明，因为其他表也基本类似。</p><p>首先，CONSTANT_Class_info 表具体结构如下所示：</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">table CONSTANT_Class_info {</span></span>
<span class="line"><span style="color:#E1E4E8;">    u1  tag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2  name_index;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">table CONSTANT_Class_info {</span></span>
<span class="line"><span style="color:#24292E;">    u1  tag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">7</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    u2  name_index;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>解释说明。</p><ul><li><p>tag：占用一个字节大小。比如值为 7，说明是 CONSTANT_Class_info 类型表。</p></li><li><p>name_index：是一个索引值，可以将它理解为一个指针，指向常量池中索引为 name_index 的常量表。比如 name_index = 2，则它指向常量池中第 2 个常量。</p></li></ul><p>接下来再看 CONSTANT_Utf8_info 表具体结构如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">table CONSTANT_utf8_info {</span></span>
<span class="line"><span style="color:#E1E4E8;">    u1  tag;</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2  length;</span></span>
<span class="line"><span style="color:#E1E4E8;">    u1[] bytes;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">table CONSTANT_utf8_info {</span></span>
<span class="line"><span style="color:#24292E;">    u1  tag;</span></span>
<span class="line"><span style="color:#24292E;">    u2  length;</span></span>
<span class="line"><span style="color:#24292E;">    u1[] bytes;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>解释说明：</p><ul><li><p>tag：值为1，表示是 CONSTANT_Utf8_info 类型表。</p></li><li><p>length：length 表示 u1[] 的长度，比如 length=5，则表示接下来的数据是 5 个连续的 u1 类型数据。</p></li><li><p>bytes：u1 类型数组，长度为上面第 2 个参数 length 的值。</p></li></ul><p>而我们在java代码中声明的String字符串最终在class文件中的存储格式就 CONSTANT_utf8_info。因此一个字符串最大长度也就是u2所能代表的最大值65536个，但是需要使用2个字节来保存 null 值，因此一个字符串的最大长度为 65536 - 2 = 65534。参考 <a href="https://mp.weixin.qq.com/s/I16BlY9cJF-JZZReAjuRqg" target="_blank" rel="noreferrer">Java String最大长度分析</a>。</p><p>不难看出，在常量池内部的表中也有相互之间的引用。用一张图来理解 CONSTANT_Class_info 和 CONSTANT_utf8_info 表格之间的关系，如下图所示：</p>`,11),f=s("p",null,"理解了常量池内部的数据结构之后，接下来就看一下实例代码的解析过程。因为开发者平时定义的 Java 类各式各样，类中的方法与参数也不尽相同。所以常量池的元素数量也就无法固定，因此 class 文件在常量池的前面使用 2 个字节的容量计数器，用来代表当前类中常量池的大小。如下图所示：",-1),N=s("p",null,[a("红色框中的 "),s("strong",null,"001d"),a(" 转化为十进制就是 29，也就是说常量计数器的值为 29。其中下标为 0 的常量被 JVM 留作其他特殊用途，因此 Test.class 中实际的常量池大小为这个计数器的值减 1，也就是 28个。")],-1),S=s("p",null,"第一个常量，如下所示：",-1),q=p(`<p><strong>0a</strong> 转化为 10 进制后为 10，通过查看常量池 14 种表格图中，可以查到 tag=10 的表类型为 CONSTANT_Methodref_info，因此常量池中的第一个常量类型为方法引用表。其结构如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">CONSTANT_Methodref_info {</span></span>
<span class="line"><span style="color:#E1E4E8;">    u1 tag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2 class_index;        指向此方法的所属类</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2 name_type_index;    指向此方法的名称和类型</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">CONSTANT_Methodref_info {</span></span>
<span class="line"><span style="color:#24292E;">    u1 tag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    u2 class_index;        指向此方法的所属类</span></span>
<span class="line"><span style="color:#24292E;">    u2 name_type_index;    指向此方法的名称和类型</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>也就是说在&quot;0a&quot;之后的 2 个字节指向这个方法是属于哪个类，紧接的 2 个字节指向这个方法的名称和类型。它们的值分别是：</p><ul><li><p>0006：十进制 6，表示指向常量池中的第 6 个常量。</p></li><li><p>0015：十进制 21，表示指向常量池中的第 21 个常量。</p></li></ul><p>至此，第 1 个常量就解读完毕了。紧接着的就是第 2 个常量，如下所示：</p>`,5),D=p(`<p>tag <strong>09</strong> 表示是字段引用表 CONSTANT_FIeldref_info ，其结构如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">CONSTANT_Fieldref_info{</span></span>
<span class="line"><span style="color:#E1E4E8;">    u1 tag;</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2 class_index;        指向此字段的所属类</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2 name_type_index;    指向此字段的名称和类型</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">CONSTANT_Fieldref_info{</span></span>
<span class="line"><span style="color:#24292E;">    u1 tag;</span></span>
<span class="line"><span style="color:#24292E;">    u2 class_index;        指向此字段的所属类</span></span>
<span class="line"><span style="color:#24292E;">    u2 name_type_index;    指向此字段的名称和类型</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>同样也是 4 个字节，前后都是两个索引。</p><ul><li><p>0005：指向常量池中第 5 个常量。</p></li><li><p>0016：指向常量池中第 22 个常量。</p></li></ul><p>到现在为止我们已经解析出了常量池中的两个常量。剩下的 21 个常量的解析过程也大同小异，这里就不一一解析了。实际上我们可以借助 javap 命令来帮助我们查看 class 常量池中的内容：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">javap </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">v Test.class</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">javap </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">v Test.class</span></span></code></pre></div><p>上述命令执行后，显示结果如下：</p>`,7),F=p(`<p>正如我们刚才分析的一样，常量池中第一个常量是 Methodref 类型，指向下标 6 和下标 21 的常量。其中下标 21 的常量类型为 NameAndType，它对应的数据结构如下：</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">CONSTANT_NameAndType_info{</span></span>
<span class="line"><span style="color:#E1E4E8;">    u1 tag;</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2 name_index;    指向某字段或方法的名称字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2 type_index;    指向某字段或方法的类型字符串</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">CONSTANT_NameAndType_info{</span></span>
<span class="line"><span style="color:#24292E;">    u1 tag;</span></span>
<span class="line"><span style="color:#24292E;">    u2 name_index;    指向某字段或方法的名称字符串</span></span>
<span class="line"><span style="color:#24292E;">    u2 type_index;    指向某字段或方法的类型字符串</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>而下标在 21 的 NameAndType 的 name_index 和 type_index 分别指向了 13 和 14，也就是&quot;&lt;init&gt;&quot;和&quot;()V&quot;。因此最终解析下来常量池中第 1 个常量的解析过程以及最终值如下图所示：</p>`,3),k=s("p",null,"仔细解析层层引用，最后我们可以看出，Test.class 文件中常量池的第 1 个常量保存的是 Object 中的默认构造器方法。",-1),x=s("h3",{id:"访问标志-access-flags",tabindex:"-1"},[a("访问标志（access_flags） "),s("a",{class:"header-anchor",href:"#访问标志-access-flags","aria-label":'Permalink to "访问标志（access_flags）"'},"​")],-1),V=s("p",null,"紧跟在常量池之后的常量是访问标志，占用两个字节，如下图所示：",-1),P=s("p",null,"访问标志代表类或者接口的访问信息，比如：该 class 文件是类还是接口，是否被定义成 public，是否是 abstract，如果是类，是否被声明成 final 等等。各种访问标志如下所示：",-1),M=p('<p>我们定义的 Test.java 是一个普通 Java 类，不是接口、枚举或注解。并且被 public 修饰但没有被声明为 final 和 abstract，因此它所对应的 access_flags 为 <strong>0021</strong>（0X0001 和 0X0020 相结合）。</p><h3 id="类索引、父类索引与接口索引计数器" tabindex="-1">类索引、父类索引与接口索引计数器 <a class="header-anchor" href="#类索引、父类索引与接口索引计数器" aria-label="Permalink to &quot;类索引、父类索引与接口索引计数器&quot;">​</a></h3><p>在访问标志后的 2 个字节就是<strong>类索引</strong> ，类索引后的 2 个字节就是<strong>父类索引</strong> ，父类索引后的 2 个字节则是<strong>接口索引计数器</strong>。如下图所示：</p>',3),j=s("p",null,"可以看出类索引指向常量池中的第 5 个常量，父类索引指向常量池中的第 6 个常量，并且实现的接口个数为 2 个。再回顾下常量池中的数据：",-1),O=p('<p>从图中可以看出，第 5 个常量和第 6 个常量均为 CONSTANT_Class_info 表类型，并且代表的类分别是&quot;Test&quot;和&quot;Object&quot;。再看接口计数器，因为接口计数器的值是 2，代表这个类实现了 2 个接口。查看在接口计数器之后的 4 个字节分别为：</p><ul><li><p>0007：指向常量池中的第 7 个常量，从图中可以看出第 7 个常量值为&quot;Serializable&quot;。</p></li><li><p>0008：指向常量池中的第 8 个常量，从图中可以看出第 8 个常量值为&quot;Cloneable&quot;。</p></li></ul><p>综上所述，可以得出如下结论：<strong>当前类为 Test 继承自 Object 类，并实现了&quot;Serializable&quot;和&quot;Cloneable&quot;这两个接口。</strong></p><h3 id="字段表" tabindex="-1">字段表 <a class="header-anchor" href="#字段表" aria-label="Permalink to &quot;字段表&quot;">​</a></h3><p>紧跟在接口索引集合后面的就是字段表了，字段表的主要功能是用来描述类或者接口中声明的变量。这里的字段包含了类级别变量以及实例变量，但是不包括方法内部声明的局部变量。</p><p>同样, 一个类中的变量个数是不固定的，因此在字段表集合之前还是使用一个计数器来表示变量的个数，如下所示：</p>',6),I=p(`<p><strong>0002</strong> 表示类中声明了 2 个变量（在 class 文件中叫字段），字段计数器之后会紧跟着 2 个字段表的数据结构。</p><p>字段表的具体结构如下：</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">CONSTANT_Fieldref_info{</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2  access_flags    字段的访问标志</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2  name_index          字段的名称索引(也就是变量名)</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2  descriptor_index    字段的描述索引(也就是变量的类型)</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2  attributes_count    属性计数器</span></span>
<span class="line"><span style="color:#E1E4E8;">    attribute_info</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">CONSTANT_Fieldref_info{</span></span>
<span class="line"><span style="color:#24292E;">    u2  access_flags    字段的访问标志</span></span>
<span class="line"><span style="color:#24292E;">    u2  name_index          字段的名称索引(也就是变量名)</span></span>
<span class="line"><span style="color:#24292E;">    u2  descriptor_index    字段的描述索引(也就是变量的类型)</span></span>
<span class="line"><span style="color:#24292E;">    u2  attributes_count    属性计数器</span></span>
<span class="line"><span style="color:#24292E;">    attribute_info</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>继续解析 Text.class 中的字段表，其结构如下图所示：</p>`,4),B=s("h3",{id:"字段访问标志",tabindex:"-1"},[a("字段访问标志 "),s("a",{class:"header-anchor",href:"#字段访问标志","aria-label":'Permalink to "字段访问标志"'},"​")],-1),J=s("p",null,"对于 Java 类中的变量，也可以使用 public、private、final、static 等标识符进行标识。因此解析字段时，需要先判断它的访问标志，字段的访问标志如下所示：",-1),R=s("p",null,'字段表结构图中的访问标志的值为 0002，代表它是 private 类型。变量名索引指向常量池中的第 9 个常量，变量名类型索引指向常量池中第 10 个常量。第 9 和第 10 个常量分别为"num"和"I"，如下所示：',-1),X=s("p",null,"因此可以得知类中有一个名为 num，类型为 int 类型的变量。对于第 2 个变量的解析过程也是一样，就不再过多介绍。",-1),W=s("p",null,"注意事项：",-1),w=s("ol",null,[s("li",null,[s("p",null,"字段表集合中不会列出从父类或者父接口中继承而来的字段。")]),s("li",null,[s("p",null,"内部类中为了保持对外部类的访问性，会自动添加指向外部类实例的字段。")])],-1),U=s("p",null,"对于以上两种情况，建议你可以自行定义一个类查看并手动分析一下。",-1),z=s("h3",{id:"方法表",tabindex:"-1"},[a("方法表 "),s("a",{class:"header-anchor",href:"#方法表","aria-label":'Permalink to "方法表"'},"​")],-1),Y=s("p",null,"字段表之后跟着的就是方法表常量。相信你应该也能猜到了，方法表常量应该也是以一个计数器开始的，因为一个类中的方法数量是不固定的，如图所示：",-1),Q=p(`<p>上图表示 Test.class 中有两个方法，但是我们只在 Test.java 中声明了一个 add 方法，这是为什么呢？这是因为<strong>默认构造器方法</strong>也被包含在方法表常量中。</p><p>方法表的结构如下所示：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">CONSTANT_Methodref_info{</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2  access_flags;        方法的访问标志</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2  name_index;          指向方法名的索引</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2  descriptor_index;    指向方法类型的索引</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2  attributes_count;    方法属性计数器</span></span>
<span class="line"><span style="color:#E1E4E8;">    attribute_info attributes;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">CONSTANT_Methodref_info{</span></span>
<span class="line"><span style="color:#24292E;">    u2  access_flags;        方法的访问标志</span></span>
<span class="line"><span style="color:#24292E;">    u2  name_index;          指向方法名的索引</span></span>
<span class="line"><span style="color:#24292E;">    u2  descriptor_index;    指向方法类型的索引</span></span>
<span class="line"><span style="color:#24292E;">    u2  attributes_count;    方法属性计数器</span></span>
<span class="line"><span style="color:#24292E;">    attribute_info attributes;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，方法也是有自己的访问标志，具体如下：</p>`,4),G=s("p",null,"我们主要来看下 add 方法，具体如下：",-1),H=p(`<p>从图中我们可以看出 add 方法的以下字段的具体值：</p><ol><li><p><strong>access_flags</strong> = <strong>0001</strong> 也就是访问权限为 public。</p></li><li><p><strong>name_index</strong> = 0X<strong>0011</strong> 指向常量池中的第 17 个常量，也就是&quot;add&quot;。</p></li><li><p><strong>type_index</strong> = 0X<strong>0012</strong> 指向常量池中的第 18 个常量，也即是 (I)。这个方法接收 int 类型参数，并返回 int 类型参数。</p></li></ol><h3 id="属性表" tabindex="-1">属性表 <a class="header-anchor" href="#属性表" aria-label="Permalink to &quot;属性表&quot;">​</a></h3><p>在之前解析字段和方法的时候，在它们的具体结构中我们都能看到有一个叫作 attributes_info 的表，这就是属性表。</p><p>属性表并没有一个固定的结构，各种不同的属性只要满足以下结构即可：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">CONSTANT_Attribute_info{</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2 name_index;</span></span>
<span class="line"><span style="color:#E1E4E8;">    u2 attribute_length length;</span></span>
<span class="line"><span style="color:#E1E4E8;">    u1[] info;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">CONSTANT_Attribute_info{</span></span>
<span class="line"><span style="color:#24292E;">    u2 name_index;</span></span>
<span class="line"><span style="color:#24292E;">    u2 attribute_length length;</span></span>
<span class="line"><span style="color:#24292E;">    u1[] info;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>JVM 中预定义了很多属性表，这里重点讲一下 Code 属性表。</p><ul><li>Code属性表</li></ul><p>我们可以接着刚才解析方法表的思路继续往下分析：</p>`,9),K=s("p",null,[a('可以看到，在方法类型索引之后跟着的就是"add"方法的属性。'),s("strong",null,"0X0001"),a(" 是属性计数器，代表只有一个属性。"),s("strong",null,"0X000f"),a(" 是属性表类型索引，通过查看常量池可以看出它是一个 Code 属性表，如下所示：")],-1),L=s("p",null,"Code 属性表中，最主要的就是一些列的字节码。通过 javap -v Test.class 之后，可以看到方法的字节码，如下图显示的是 add 方法的字节码指令：",-1),Z=s("p",null,"JVM 执行 add 方法时，就通过这一系列指令来做相应的操作。",-1),$=s("h3",{id:"总结",tabindex:"-1"},[a("总结： "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结："'},"​")],-1),ss=s("p",null,"本课时我们主要了解了一个 class 文件内容的数据结构到底长什么样子，并通过 Test.class 来模拟演示Java虚拟机解析字节码文件的过程。其中 class 常量池部分是重点内容，它就相当于是 class 文件中的资源仓库，其他的几种结构或多或少都会最终指向到这个资源仓库中。实际上平时我们不太会直接用一个 16 进制编辑器去打开一个 .class 文件。我们可以使用 javap 等命令或者是其他工具，来帮助我们查看 class 内部的数据结构。只不过自己亲手操作一遍是很有助于理解 JVM 的解析过程，并加深对 class 文件结构的记忆。",-1);function as(ns,ls,ps,os,es,ts){const n=e("Image");return t(),c("div",null,[r,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCV2AOOPvAAB-G25Eh54563.png"}),a(),E,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/BF/Cgq2xl6DCV2AZUxwAAA_iliDrpk482.png"}),a(),_,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/86/B2/Cgq2xl6Qc1OACWWHAADJjiKcHuI014.png"}),a(),y,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/BF/Cgq2xl6DCV2AehqNAAD5VToVKKE770.png"}),a(),d,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCV2AUCDGAACPVltgw7U787.png"}),a(),g,u,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/BF/Cgq2xl6DCV2Afn7BAAAXOY5BQb4173.png"}),a(),h,A,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCV6AYt6iAAAXNBPDSYI774.png"}),a(),C,T,m,b,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/BF/Cgq2xl6DCV6AcrLKAAIl1RRQwuM068.png"}),a(),v,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/C0/Cgq2xl6DCV6AXxB3AABLqovPP_U830.png"}),a(),f,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCV6AAgxqAAAXSMEd2RY264.png"}),a(),N,S,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/C0/Cgq2xl6DCV6APx_SAAAbADvvw9s632.png"}),a(),q,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCV6ATNz8AAAk0yVkN3w194.png"}),a(),D,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/C0/Cgq2xl6DCV6AY16CAAOpMl4BX8o212.png"}),a(),F,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCV-Ab50PAAFzorn_6lE082.png"}),a(),k,x,V,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/C0/Cgq2xl6DCV-AAxmAAABWyueVdYk372.png"}),a(),P,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCV-ANSgGAAFbz25EF8Y890.png"}),a(),M,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/C0/Cgq2xl6DCV-ANNTLAAHqaoQnlE8139.png"}),a(),j,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCV-APkRPAAC9RAY2gMo106.png"}),a(),O,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/C0/Cgq2xl6DCV-AWc3lAAAQCjcjhaQ999.png"}),a(),I,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCWCAb5EeAAEXyXlvezk194.png"}),a(),B,J,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/C0/Cgq2xl6DCWCAe5MBAAEjBXwl4wA351.png"}),a(),R,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCWCAOTRgAAD1A786a0w663.png"}),a(),X,W,w,U,z,Y,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/C0/Cgq2xl6DCWCAZxp2AAARuAI8Xbw177.png"}),a(),Q,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCWCAAdkIAAFVaPL8OfA302.png"}),a(),G,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/C0/Cgq2xl6DCWCAK8l0AAAU6SkPGdo841.png"}),a(),H,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCWCAfy2rAAAXX7yc2Ik873.png"}),a(),K,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/C0/Cgq2xl6DCWGAPQD-AAE5_E_ZIRI717.png"}),a(),L,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/A9/Ciqah16DCWGAad0jAABXMTjeCSU916.png"}),a(),Z,$,ss])}const rs=o(i,[["render",as]]);export{is as __pageData,rs as default};

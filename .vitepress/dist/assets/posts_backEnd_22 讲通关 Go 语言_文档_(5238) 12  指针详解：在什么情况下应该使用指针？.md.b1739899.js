import{_ as p,j as l,o,g as e,k as n,h as t,Q as s}from"./chunks/framework.b3d8e22e.js";const v=JSON.parse('{"title":"什么是指针 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/22 讲通关 Go 语言_文档/(5238) 12  指针详解：在什么情况下应该使用指针？.md","filePath":"posts/backEnd/22 讲通关 Go 语言_文档/(5238) 12  指针详解：在什么情况下应该使用指针？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/22 讲通关 Go 语言_文档/(5238) 12  指针详解：在什么情况下应该使用指针？.md"},r=s(`<p>这节课起我将带你学习本专栏的第三模块：深入理解 Go 语言。这部分主要会为你讲解 Go 语言的高级特性，以及 Go 语言一些特性功能的底层原理。通过这部分的学习，你不光可以更好地使用 Go 语言，还会更深入地理解 Go 语言，比如理解你所使用的 slice 底层是如何实现的等。</p><h3 id="什么是指针" tabindex="-1">什么是指针 <a class="header-anchor" href="#什么是指针" aria-label="Permalink to &quot;什么是指针&quot;">​</a></h3><p>我们都知道程序运行时的数据是存放在内存中的，而内存会被抽象为一系列具有连续编号的存储空间，那么每一个存储在内存中的数据都会有一个编号，这个编号就是内存地址。有了这个内存地址就可以找到这个内存中存储的数据，而内存地址可以被赋值给一个指针。</p><blockquote><p>小提示：内存地址通常为 16 进制的数字表示，比如 0x45b876。</p></blockquote><p>可以总结为：在编程语言中，指针是一种数据类型，用来存储一个内存地址，该地址<strong>指向</strong>存储在该内存中的对象。这个对象可以是字符串、整数、函数或者你自定义的结构体。</p><blockquote><p>小技巧：你也可以简单地把指针理解为内存地址。</p></blockquote><p>举个通俗的例子，每本书中都有目录，目录上会有相应章节的页码，你可以把页码理解为一系列的内存地址，通过页码你可以快速地定位到具体的章节（也就是说，通过内存地址可以快速地找到存储的数据）。</p><h3 id="指针的声明和定义" tabindex="-1">指针的声明和定义 <a class="header-anchor" href="#指针的声明和定义" aria-label="Permalink to &quot;指针的声明和定义&quot;">​</a></h3><p>在 Go 语言中，获取一个变量的指针非常容易，使用取地址符 &amp; 就可以，比如下面的例子：</p><p><em><strong>ch12/main.go</strong></em></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">   name</span><span style="color:#F97583;">:=</span><span style="color:#9ECBFF;">&quot;飞雪无情&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">   nameP</span><span style="color:#F97583;">:=&amp;</span><span style="color:#E1E4E8;">name</span><span style="color:#6A737D;">//取地址</span></span>
<span class="line"><span style="color:#E1E4E8;">   fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name变量的值为:&quot;</span><span style="color:#E1E4E8;">,name)</span></span>
<span class="line"><span style="color:#E1E4E8;">   fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name变量的内存地址为:&quot;</span><span style="color:#E1E4E8;">,nameP)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">   name</span><span style="color:#D73A49;">:=</span><span style="color:#032F62;">&quot;飞雪无情&quot;</span></span>
<span class="line"><span style="color:#24292E;">   nameP</span><span style="color:#D73A49;">:=&amp;</span><span style="color:#24292E;">name</span><span style="color:#6A737D;">//取地址</span></span>
<span class="line"><span style="color:#24292E;">   fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name变量的值为:&quot;</span><span style="color:#24292E;">,name)</span></span>
<span class="line"><span style="color:#24292E;">   fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name变量的内存地址为:&quot;</span><span style="color:#24292E;">,nameP)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我在示例中定义了一个 string 类型的变量 name，它的值为&quot;飞雪无情&quot;，然后通过取地址符 &amp; 获取变量 name 的内存地址，并赋值给指针变量 nameP，该指针变量的类型为 *string。运行以上示例你可以看到如下打印结果：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">name变量的值为: 飞雪无情</span></span>
<span class="line"><span style="color:#E1E4E8;">name变量的内存地址为: 0xc000010200</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">name变量的值为: 飞雪无情</span></span>
<span class="line"><span style="color:#24292E;">name变量的内存地址为: 0xc000010200</span></span></code></pre></div><p>这一串 0xc000010200 就是内存地址，这个内存地址可以赋值给指针变量 nameP。</p><blockquote><p>指针类型非常廉价，只占用 4 个或者 8 个字节的内存大小。</p></blockquote><p>以上示例中 nameP 指针的类型是 *string，用于指向 string 类型的数据。在 Go 语言中使用类型名称前加 * 的方式，即可表示一个对应的指针类型。比如 int 类型的指针类型是 *int，float64 类型的指针类型是 *float64，自定义结构体 A 的指针类型是 *A。总之，指针类型就是在对应的类型前加 * 号。</p><p>下面我通过一个图让你更好地理解普通类型变量、指针类型变量、内存地址、内存等之间的关系。</p>`,17),i=s(`<p>（指针变量、内存地址指向示意图）</p><p>上图就是我刚举的例子所对应的示意图，从图中可以看到普通变量 name 的值&quot;飞雪无情&quot;被放到内存地址为 0xc000010200 的内存块中。指针类型变量也是变量，它也需要一块内存用来存储值，这块内存对应的地址就是 0xc00000e028，存储的值是 0xc000010200。相信你已经看到关键点了，指针变量 nameP 的值正好是普通变量 name 的内存地址，所以就建立指向关系。</p><blockquote><p>小提示：指针变量的值就是它所指向数据的内存地址，普通变量的值就是我们具体存放的数据。</p></blockquote><p>不同的指针类型是无法相互赋值的，比如你不能对一个 string 类型的变量取地址然后赋值给 *int指针类型，编译器会提示你 Cannot use &#39;&amp;name&#39; (type *string) as type *int in assignment。</p><p>此外，除了可以通过简短声明的方式声明一个指针类型的变量外，也可以使用 var 关键字声明，如下面示例中的 var intP *int 就声明了一个 *int 类型的变量 intP。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> intP </span><span style="color:#F97583;">*int</span></span>
<span class="line"><span style="color:#E1E4E8;">intP </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">name </span><span style="color:#6A737D;">//指针类型不同，无法赋值</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> intP </span><span style="color:#D73A49;">*int</span></span>
<span class="line"><span style="color:#24292E;">intP </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">name </span><span style="color:#6A737D;">//指针类型不同，无法赋值</span></span></code></pre></div><p>可以看到指针变量也和普通的变量一样，既可以通过 var 关键字定义，也可以通过简短声明定义。</p><blockquote><p>小提示：通过 var 声明的指针变量是不能直接赋值和取值的，因为这时候它仅仅是个变量，还没有对应的内存地址，它的值是 nil。</p></blockquote><p>和普通类型不一样的是，指针类型还可以通过内置的 new 函数来声明，如下所示：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">intP1</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">intP1</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;">)</span></span></code></pre></div><p>内置的 new 函数有一个参数，可以传递类型给它。它会返回对应的指针类型，比如上述示例中会返回一个 *int 类型的 intP1。</p><h3 id="指针的操作" tabindex="-1">指针的操作 <a class="header-anchor" href="#指针的操作" aria-label="Permalink to &quot;指针的操作&quot;">​</a></h3><p>在 Go 语言中指针的操作无非是两种：一种是获取指针指向的值，一种是修改指针指向的值。</p><p>首先介绍如何获取，我用下面的代码进行演示：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">nameV</span><span style="color:#F97583;">:=*</span><span style="color:#E1E4E8;">nameP</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;nameP指针指向的值为:&quot;</span><span style="color:#E1E4E8;">,nameV)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">nameV</span><span style="color:#D73A49;">:=*</span><span style="color:#24292E;">nameP</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;nameP指针指向的值为:&quot;</span><span style="color:#24292E;">,nameV)</span></span></code></pre></div><p>可以看到，要获取指针指向的值，只需要在指针变量前加 * 号即可，获得的变量 nameV 的值就是&quot;飞雪无情&quot;，方法比较简单。</p><p>修改指针指向的值也非常简单，比如下面的例子：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">nameP </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;公众号:飞雪无情&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//修改指针指向的值</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;nameP指针指向的值为:&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">nameP)</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name变量的值为:&quot;</span><span style="color:#E1E4E8;">,name)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;">nameP </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;公众号:飞雪无情&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//修改指针指向的值</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;nameP指针指向的值为:&quot;</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">nameP)</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name变量的值为:&quot;</span><span style="color:#24292E;">,name)</span></span></code></pre></div><p>对 *nameP 赋值等于修改了指针 nameP 指向的值。运行程序你将看到如下打印输出：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">nameP指针指向的值为: 公众号:飞雪无情</span></span>
<span class="line"><span style="color:#E1E4E8;">name变量的值为: 公众号:飞雪无情</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">nameP指针指向的值为: 公众号:飞雪无情</span></span>
<span class="line"><span style="color:#24292E;">name变量的值为: 公众号:飞雪无情</span></span></code></pre></div><p>通过打印结果可以看到，不光 nameP 指针指向的值被改变了，变量 name 的值也被改变了，这就是指针的作用。因为变量 name 存储数据的内存就是指针 nameP 指向的内存，这块内存被 nameP 修改后，变量 name 的值也被修改了。</p><p>我们已经知道，通过 var 关键字直接定义的指针变量是不能进行赋值操作的，因为它的值为 nil，也就是还没有指向的内存地址。比如下面的示例：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> intP </span><span style="color:#F97583;">*int</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">intP </span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">10</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> intP </span><span style="color:#D73A49;">*int</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;">intP </span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">10</span></span></code></pre></div><p>运行的时候会提示 invalid memory address or nil pointer dereference。这时候该怎么办呢？其实只需要通过 new 函数给它分配一块内存就可以了，如下所示：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> intP </span><span style="color:#F97583;">*int</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">//更推荐简短声明法，这里是为了演示</span></span>
<span class="line"><span style="color:#6A737D;">//intP:=new(int)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> intP </span><span style="color:#D73A49;">*int</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">//更推荐简短声明法，这里是为了演示</span></span>
<span class="line"><span style="color:#6A737D;">//intP:=new(int)</span></span></code></pre></div><h3 id="指针参数" tabindex="-1">指针参数 <a class="header-anchor" href="#指针参数" aria-label="Permalink to &quot;指针参数&quot;">​</a></h3><p>假如有一个函数 modifyAge，想要用来修改年龄，如下面的代码所示。但运行它，你会看到 age 的值并没有被修改，还是 18，并没有变成 20。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">age</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">18</span></span>
<span class="line"><span style="color:#79B8FF;">modifyAge</span><span style="color:#E1E4E8;">(age)</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;age的值为:&quot;</span><span style="color:#E1E4E8;">,age)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">modifyAge</span><span style="color:#E1E4E8;">(age </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">)  {</span></span>
<span class="line"><span style="color:#E1E4E8;">   age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">age</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">18</span></span>
<span class="line"><span style="color:#005CC5;">modifyAge</span><span style="color:#24292E;">(age)</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;age的值为:&quot;</span><span style="color:#24292E;">,age)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">modifyAge</span><span style="color:#24292E;">(age </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">)  {</span></span>
<span class="line"><span style="color:#24292E;">   age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>导致这种结果的原因是 modifyAge 中的 age 只是实参 age 的一份拷贝，所以修改它不会改变实参 age 的值。</p><p>如果要达到修改年龄的目的，就需要使用指针，现在对刚刚的示例进行改造，如下所示：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">age</span><span style="color:#F97583;">:=</span><span style="color:#79B8FF;">18</span></span>
<span class="line"><span style="color:#79B8FF;">modifyAge</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">age)</span></span>
<span class="line"><span style="color:#E1E4E8;">fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;age的值为:&quot;</span><span style="color:#E1E4E8;">,age)</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">modifyAge</span><span style="color:#E1E4E8;">(age </span><span style="color:#F97583;">*int</span><span style="color:#E1E4E8;">)  {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">age</span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;">18</span></span>
<span class="line"><span style="color:#005CC5;">modifyAge</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">age)</span></span>
<span class="line"><span style="color:#24292E;">fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;age的值为:&quot;</span><span style="color:#24292E;">,age)</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">modifyAge</span><span style="color:#24292E;">(age </span><span style="color:#D73A49;">*int</span><span style="color:#24292E;">)  {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>也就是说，当你需要在函数中通过形参改变实参的值时，需要使用指针类型的参数。</p><h3 id="指针接收者" tabindex="-1">指针接收者 <a class="header-anchor" href="#指针接收者" aria-label="Permalink to &quot;指针接收者&quot;">​</a></h3><p>指针的接收者在<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=536#/detail/pc?id=5232" target="_blank" rel="noreferrer">&quot;第 6 讲| struct 和 interface：结构体与接口都实现了哪些功能？&quot;</a>中有详细介绍，你可以再复习一下。对于是否使用指针类型作为接收者，有以下几点参考：</p><ol><li><p>如果接收者类型是 map、slice、channel 这类引用类型，不使用指针；</p></li><li><p>如果需要修改接收者，那么需要使用指针；</p></li><li><p>如果接收者是比较大的类型，可以考虑使用指针，因为内存拷贝廉价，所以效率高。</p></li></ol><p>所以对于是否使用指针类型作为接收者，还需要你根据实际情况考虑。</p><h3 id="什么情况下使用指针" tabindex="-1">什么情况下使用指针 <a class="header-anchor" href="#什么情况下使用指针" aria-label="Permalink to &quot;什么情况下使用指针&quot;">​</a></h3><p>从以上指针的详细分析中，我们可以总结出指针的两大好处：</p><ol><li><p>可以修改指向数据的值；</p></li><li><p>在变量赋值，参数传值的时候可以节省内存。</p></li></ol>`,39),y=s('<p>不过 Go 语言作为一种高级语言，在指针的使用上还是比较克制的。它在设计的时候就对指针进行了诸多限制，比如指针不能进行运行，也不能获取常量的指针。所以在思考是否使用时，我们也要保持克制的心态。</p><p>我根据实战经验总结了以下几点使用指针的建议，供你参考：</p><ol><li><p>不要对 map、slice、channel 这类引用类型使用指针；</p></li><li><p>如果需要修改方法接收者内部的数据或者状态时，需要使用指针；</p></li><li><p>如果需要修改参数的值或者内部数据时，也需要使用指针类型的参数；</p></li><li><p>如果是比较大的结构体，每次参数传递或者调用方法都要内存拷贝，内存占用多，这时候可以考虑使用指针；</p></li><li><p>像 int、bool 这样的小数据类型没必要使用指针；</p></li><li><p>如果需要并发安全，则尽可能地不要使用指针，使用指针一定要保证并发安全；</p></li><li><p>指针最好不要嵌套，也就是不要使用一个指向指针的指针，虽然 Go 语言允许这么做，但是这会使你的代码变得异常复杂。</p></li></ol><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>为了使编程变得更简单，指针在高级的语言中被逐渐淡化，但是它也的确有自己的优势：修改数据的值和节省内存。所以在 Go 语言的开发中我们要尽可能地使用值类型，而不是指针类型，因为值类型可以使你的开发变得更简单，并且也是并发安全的。如果你想使用指针类型，就要参考我上面讲到的使用指针的条件，看是否满足，要在满足和必须的情况下才使用指针。</p><p>这节课到这里就要结束了，在这节课的最后同样给你留个思考题：指向接口的指针是否实现了该接口？为什么？思考后可以自己写代码验证下。</p><p>下节课将为你深入讲解值类型，引用类型，指针类型之间的关系和区别。</p>',7);function E(d,g,m,u,h,F){const a=l("Image");return o(),e("div",null,[r,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/7D/0F/Ciqc1F_OA06AI435AADN1ZPvtvs400.png"}),t(),i,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/7D/1B/CgqCHl_OA2eANW2SAAU88P9foow113.png"}),y])}const C=p(c,[["render",E]]);export{v as __pageData,C as default};

import{_ as p,j as o,o as e,g as t,k as l,h as a,Q as r,s}from"./chunks/framework.4e7d56ce.js";const S=JSON.parse('{"title":"09数组原理（下）：实现数组扁平化的6种方式","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/JavaScript 核心原理精讲_文档/(6182) 09  数组原理（下）：实现数组扁平化的 6 种方式.md","filePath":"posts/frontEnd/JavaScript 核心原理精讲_文档/(6182) 09  数组原理（下）：实现数组扁平化的 6 种方式.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/JavaScript 核心原理精讲_文档/(6182) 09  数组原理（下）：实现数组扁平化的 6 种方式.md"},E=r(`<h1 id="_09数组原理-下-实现数组扁平化的6种方式" tabindex="-1">09数组原理（下）：实现数组扁平化的6种方式 <a class="header-anchor" href="#_09数组原理-下-实现数组扁平化的6种方式" aria-label="Permalink to &quot;09数组原理（下）：实现数组扁平化的6种方式&quot;">​</a></h1><p>我在前两讲给你介绍了类数组的相关知识，那么这一讲会结合之前的内容，来聊聊数组相关的应用------如何实现数组扁平化。数组扁平化在一些多维数组的应用场景中会出现，我将围绕 6 种方式来带你实现它。</p><p>此外，关于数组除了扁平化也有其他问题，比如数组去重等，也是面试中经常会问到的。本讲的目的是将扁平化作为一个切入点，这种思路对于你解决其他类似的问题也是一个很好的启发。</p><p>按照惯例，在课程开始前请你先思考几个问题：</p><ol><li><p>怎样用最普通的方法解决数组扁平化问题？</p></li><li><p>ES6 里面是否有一些高级的方法能够直接实现？</p></li></ol><p>下面开始说说什么是数组扁平化，如何实现它呢？</p><h3 id="扁平化的实现" tabindex="-1">扁平化的实现 <a class="header-anchor" href="#扁平化的实现" aria-label="Permalink to &quot;扁平化的实现&quot;">​</a></h3><p>数组的扁平化其实就是将一个嵌套多层的数组 array（嵌套可以是任何层数）转换为只有一层的数组。举个简单的例子，假设有个名为 flatten 的函数可以做到数组扁平化，效果如下面这段代码所示。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> arr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">，</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">]]];</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(arr)); </span><span style="color:#6A737D;">// [1, 2, 3, 4，5]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> arr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">，</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">]]];</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(arr)); </span><span style="color:#6A737D;">// [1, 2, 3, 4，5]</span></span></code></pre></div><p>其实就是把多维的数组&quot;拍平&quot;，输出最后的一维数组。那么你知道了效果是什么样的了，下面就尝试着写一个 flatten 函数吧。实现方式有下述几种。</p><h4 id="方法一-普通的递归实" tabindex="-1">方法一：普通的递归实 <a class="header-anchor" href="#方法一-普通的递归实" aria-label="Permalink to &quot;方法一：普通的递归实&quot;">​</a></h4><p>普通的递归思路很容易理解，就是通过循环递归的方式，一项一项地去遍历，如果每一项还是一个数组，那么就继续往下遍历，利用递归程序的方法，来实现数组的每一项的连接。我们来看下这个方法是如何实现的，如下所示。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 方法1</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">]]];</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(Array.</span><span style="color:#B392F0;">isArray</span><span style="color:#E1E4E8;">(arr[i])) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> result.</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(arr[i]));</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      result.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(arr[i]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(a);  </span><span style="color:#6A737D;">//  [1, 2, 3, 4，5]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 方法1</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">]]];</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(Array.</span><span style="color:#6F42C1;">isArray</span><span style="color:#24292E;">(arr[i])) {</span></span>
<span class="line"><span style="color:#24292E;">      result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> result.</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(arr[i]));</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      result.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(arr[i]);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(a);  </span><span style="color:#6A737D;">//  [1, 2, 3, 4，5]</span></span></code></pre></div><p>从上面这段代码可以看出，最后返回的结果是扁平化的结果，这段代码核心就是循环遍历过程中的递归操作，就是在遍历过程中发现数组元素还是数组的时候进行递归操作，把数组的结果通过数组的 concat 方法拼接到最后要返回的 result 数组上，那么最后输出的结果就是扁平化后的数组。</p><p>下面我们来看看另一种实现方式。</p><h4 id="方法二-利用-reduce-函数迭代" tabindex="-1">方法二：利用 reduce 函数迭代 <a class="header-anchor" href="#方法二-利用-reduce-函数迭代" aria-label="Permalink to &quot;方法二：利用 reduce 函数迭代&quot;">​</a></h4><p>从上面普通的递归函数中可以看出，其实就是对数组的每一项进行处理，那么我们其实也可以用第 7 讲中说的 reduce 来实现数组的拼接，从而简化第一种方法的代码，改造后的代码如下所示。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 方法2</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> arr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">]]];</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">prev</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">next</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> prev.</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(Array.</span><span style="color:#B392F0;">isArray</span><span style="color:#E1E4E8;">(next) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(next) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> next)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }, [])</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(arr));</span><span style="color:#6A737D;">//  [1, 2, 3, 4，5]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 方法2</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> arr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">]]];</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> arr.</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">prev</span><span style="color:#24292E;">, </span><span style="color:#E36209;">next</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> prev.</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(Array.</span><span style="color:#6F42C1;">isArray</span><span style="color:#24292E;">(next) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(next) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> next)</span></span>
<span class="line"><span style="color:#24292E;">    }, [])</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(arr));</span><span style="color:#6A737D;">//  [1, 2, 3, 4，5]</span></span></code></pre></div><p>这段代码在控制台执行之后，也可以得到想要的结果。这里你可以回忆一下之前说的 reduce 的参数问题，我们可以看到 reduce 的第一个参数用来返回最后累加的结果，思路和第一种递归方法是一样的，但是通过使用 reduce 之后代码变得更简洁了，也同样解决了扁平化的问题。</p><p>下面我们来看看下一种实现方式。</p><h4 id="方法三-扩展运算符实现" tabindex="-1">方法三：扩展运算符实现 <a class="header-anchor" href="#方法三-扩展运算符实现" aria-label="Permalink to &quot;方法三：扩展运算符实现&quot;">​</a></h4><p>这个方法的实现，采用了扩展运算符和 some 的方法，两者共同使用，达到数组扁平化的目的，还是来看一下代码。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 方法3</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> arr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">]]];</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (arr.</span><span style="color:#B392F0;">some</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> Array.</span><span style="color:#B392F0;">isArray</span><span style="color:#E1E4E8;">(item))) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        arr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [].</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">arr);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> arr;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(arr)); </span><span style="color:#6A737D;">//  [1, 2, 3, 4，5]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 方法3</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> arr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">]]];</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (arr.</span><span style="color:#6F42C1;">some</span><span style="color:#24292E;">(</span><span style="color:#E36209;">item</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> Array.</span><span style="color:#6F42C1;">isArray</span><span style="color:#24292E;">(item))) {</span></span>
<span class="line"><span style="color:#24292E;">        arr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [].</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">arr);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> arr;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(arr)); </span><span style="color:#6A737D;">//  [1, 2, 3, 4，5]</span></span></code></pre></div><p>从执行的结果中可以发现，我们先用数组的 some 方法把数组中仍然是组数的项过滤出来，然后执行 concat 操作，利用 ES6 的展开运算符，将其拼接到原数组中，最后返回原数组，达到了预期的效果。</p><p>前三种实现数组扁平化的方式其实是最基本的思路，都是通过最普通递归思路衍生的方法，尤其是前两种实现方法比较类似。值得注意的是 reduce 方法，它可以在很多应用场景中实现，由于 reduce 这个方法提供的几个参数比较灵活，能解决很多问题，所以是值得熟练使用并且精通的。</p><p>那么除此之外，是否还有其他实现方式呢？请你接着往下看。</p><h4 id="方法四-split-和-tostring-共同处理" tabindex="-1">方法四：split 和 toString 共同处理 <a class="header-anchor" href="#方法四-split-和-tostring-共同处理" aria-label="Permalink to &quot;方法四：split 和 toString 共同处理&quot;">​</a></h4><p>我们也可以通过 split 和 toString 两个方法，来共同实现数组扁平化，由于数组会默认带一个 toString 的方法，所以可以把数组直接转换成逗号分隔的字符串，然后再用 split 方法把字符串重新转换为数组，如下面的代码所示。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 方法4</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> arr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">]]];</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;,&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(arr)); </span><span style="color:#6A737D;">//  [1, 2, 3, 4]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 方法4</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> arr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">]]];</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> arr.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;,&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(arr)); </span><span style="color:#6A737D;">//  [1, 2, 3, 4]</span></span></code></pre></div><p>通过这两个方法可以将多维数组直接转换成逗号连接的字符串，然后再重新分隔成数组，你可以在控制台执行一下查看结果。</p><p>下面我们看看 ES6 有什么方式可以直接实现数组的扁平化。</p><h4 id="方法五-调用-es6-中的-flat" tabindex="-1">方法五：调用 ES6 中的 flat <a class="header-anchor" href="#方法五-调用-es6-中的-flat" aria-label="Permalink to &quot;方法五：调用 ES6 中的 flat&quot;">​</a></h4><p>我们还可以直接调用 ES6 中的 flat 方法，可以直接实现数组扁平化。先来看下 flat 方法的语法：</p><blockquote><p>arr.flat([depth])</p></blockquote><p>其中 depth 是 flat 的参数，depth 是可以传递数组的展开深度（默认不填、数值是 1），即展开一层数组。那么如果多层的该怎么处理呢？参数也可以传进 Infinity，代表不论多少层都要展开。那么我们来看下，用 flat 方法怎么实现，请看下面的代码。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 方法5</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> arr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">]]];</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#B392F0;">flat</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">Infinity</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(arr)); </span><span style="color:#6A737D;">//  [1, 2, 3, 4，5]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 方法5</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> arr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">]]];</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> arr.</span><span style="color:#6F42C1;">flat</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">Infinity</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(arr)); </span><span style="color:#6A737D;">//  [1, 2, 3, 4，5]</span></span></code></pre></div><p>可以看出，一个嵌套了两层的数组，通过将 flat 方法的参数设置为 Infinity，达到了我们预期的效果。其实同样也可以设置成 2，也能实现这样的效果。</p><p>因此，你在编程过程中，发现对数组的嵌套层数不确定的时候，最好直接使用 Infinity，可以达到扁平化。下面我们再来看最后一种场景。</p><h4 id="方法六-正则和-json-方法共同处理" tabindex="-1">方法六：正则和 JSON 方法共同处理 <a class="header-anchor" href="#方法六-正则和-json-方法共同处理" aria-label="Permalink to &quot;方法六：正则和 JSON 方法共同处理&quot;">​</a></h4><p>我们在第四种方法中已经尝试了用 toString 方法，其中仍然采用了将 JSON.stringify 的方法先转换为字符串，然后通过正则表达式过滤掉字符串中的数组的方括号，最后再利用 JSON.parse 把它转换成数组。请看下面的代码。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 方法 6</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> arr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">]]], </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> str </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(arr);</span></span>
<span class="line"><span style="color:#E1E4E8;">  str </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> str.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">(</span><span style="color:#85E89D;font-weight:bold;">\\[</span><span style="color:#F97583;">|</span><span style="color:#85E89D;font-weight:bold;">\\]</span><span style="color:#DBEDFF;">)</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">g</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  str </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;[&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> str </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;]&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(str); </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">flatten</span><span style="color:#E1E4E8;">(arr)); </span><span style="color:#6A737D;">//  [1, 2, 3, 4，5]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 方法 6</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> arr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">]]], </span><span style="color:#005CC5;">6</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> str </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(arr);</span></span>
<span class="line"><span style="color:#24292E;">  str </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> str.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/(</span><span style="color:#22863A;font-weight:bold;">\\[</span><span style="color:#D73A49;">|</span><span style="color:#22863A;font-weight:bold;">\\]</span><span style="color:#032F62;">)/</span><span style="color:#D73A49;">g</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  str </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;[&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> str </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;]&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(str); </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">flatten</span><span style="color:#24292E;">(arr)); </span><span style="color:#6A737D;">//  [1, 2, 3, 4，5]</span></span></code></pre></div><p>可以看到，其中先把传入的数组转换成字符串，然后通过正则表达式的方式把括号过滤掉，这部分正则的表达式你不太理解的话，可以看看下面的图片。</p>`,42),y=s("p",null,[a("通过这个在线网站 "),s("a",{href:"https://regexper.com/",target:"_blank",rel:"noreferrer"},"https://regexper.com/"),a(" 可以把正则分析成容易理解的可视化的逻辑脑图。其中我们可以看到，匹配规则是：全局匹配（g）左括号或者右括号，将它们替换成空格，最后返回处理后的结果。之后拿着正则处理好的结果重新在外层包裹括号，最后通过 JSON.parse 转换成数组返回。")],-1),i=s("p",null,"以上就是这六种实现数组扁平化的方式，你可以再思考下看看是否还有更多的实现方式，我们可以交流一下。",-1),F=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=s("p",null,"本讲的内容就介绍这么多了。我将日常开发中有可能遇到数组扁平化的几种方法分别讲了一遍，又在最后一个方法中给你推荐了一个比较容易理解的正则表达式的分析工具。希望这几种方法能为你提升 JS 编码能力带来帮助和启发。",-1),C=s("p",null,"综上我们可以看到，数组扁平化这节课的知识点结合了数组 API、ES6，以及 JSON 方法的相关知识。你可以通过下面的表格再来看一下这六种方式的代码思路。",-1),h=s("p",null,"表格列举了这几种方法实现的难易程度，以及编码思路的描述。希望你能对这几种方法融会贯通，如果在未来的面试中遇到这样的题目，愿你能够轻松应对，给面试官一个满意的答复。",-1),u=s("p",null,"在日常的前端开发工作中，你往往会在业务开发的时候遇到各种数组问题，所以你要思考最合适的解决方式。其实扁平化只是其中的一个引子，其他涉及数组的相关知识点还有很多。",-1),A=s("p",null,"我最后给你留一个和数组相关的作业：试着写出实现数组去重的方式，看看你能够写出几种呢？",-1),g=s("p",null,"下一讲，我们来说说数组排序，这也是数据结构中必不可少的知识，我们到时见。",-1);function f(B,D,_,v,b,k){const n=o("Image");return e(),t("div",null,[E,l(n,{alt:"Lark20210202-151541.png",src:"https://s0.lgstatic.com/i/image/M00/94/9B/Ciqc1GAY_EWAE3pDAAERgfI0plY241.png"}),a(),y,i,F,d,C,l(n,{alt:"Lark20210202-151546.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/93/CgpVE2AY_DiAQNC5AAFrgibLZp4762.png"}),a(),h,u,A,g])}const x=p(c,[["render",f]]);export{S as __pageData,x as default};

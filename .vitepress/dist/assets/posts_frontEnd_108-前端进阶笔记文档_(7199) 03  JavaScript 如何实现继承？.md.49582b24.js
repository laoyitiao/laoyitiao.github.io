import{_ as l,j as e,o as c,g as t,k as p,h as s,Q as n,s as o}from"./chunks/framework.4e7d56ce.js";const P=JSON.parse('{"title":"03JavaScript如何实现继承？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/108-前端进阶笔记文档/(7199) 03  JavaScript 如何实现继承？.md","filePath":"posts/frontEnd/108-前端进阶笔记文档/(7199) 03  JavaScript 如何实现继承？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/108-前端进阶笔记文档/(7199) 03  JavaScript 如何实现继承？.md"},y=n(`<h1 id="_03javascript如何实现继承" tabindex="-1">03JavaScript如何实现继承？ <a class="header-anchor" href="#_03javascript如何实现继承" aria-label="Permalink to &quot;03JavaScript如何实现继承？&quot;">​</a></h1><p>JavaScript 在编程语言界是个异类，它和其他编程语言很不一样，JavaScript 可以在运行的时候动态地改变某个变量的类型。</p><p>比如你永远也没法想到像<code>isTimeout</code>这样一个变量可以存在多少种类型，除了布尔值<code>true</code>和<code>false</code>，它还可能是<code>undefined</code>、<code>1</code>和<code>0</code>、一个时间戳，甚至一个对象。</p><p>又或者你的代码跑异常了，打开浏览器开始断点，发现<code>InfoList</code>这个变量第一次被赋值的时候是个数组<code>[{name: &#39;test1&#39;, value: &#39;11&#39;}, {name: &#39;test2&#39;, value: &#39;22&#39;}]</code>，过了一会竟然变成了一个对象<code>{test1:&#39;11&#39;, test2: &#39;22&#39;}</code></p><p>除了变量可以在运行时被赋值为任何类型以外，JavaScript 中也能实现继承，但它不像 Java、C++、C# 这些编程语言一样基于类来实现继承，而是基于原型进行继承。</p><p>这是因为 JavaScript 中有个特殊的存在：对象。每个对象还都拥有一个原型对象，并可以从中继承方法和属性。</p><p>提到对象和原型，你曾经是否有过这些疑惑：</p><ol><li><p>JavaScript 的函数怎么也是个对象？</p></li><li><p><code>__proto__</code>和<code>prototype</code>到底是啥关系？</p></li><li><p>JavaScript 中对象是怎么实现继承的？</p></li><li><p>JavaScript 是怎么访问对象的方法和属性的？</p></li></ol><p>下面我们一起结合问题，来探讨下 JavaScript 对象和继承。</p><h3 id="原型对象和对象是什么关系" tabindex="-1">原型对象和对象是什么关系 <a class="header-anchor" href="#原型对象和对象是什么关系" aria-label="Permalink to &quot;原型对象和对象是什么关系&quot;">​</a></h3><p>在 JavaScript 中，对象由一组或多组的属性和值组成：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  key1</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> value1,</span></span>
<span class="line"><span style="color:#E1E4E8;">  key2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> value2,</span></span>
<span class="line"><span style="color:#E1E4E8;">  key3</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> value3,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  key1</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> value1,</span></span>
<span class="line"><span style="color:#24292E;">  key2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> value2,</span></span>
<span class="line"><span style="color:#24292E;">  key3</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> value3,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在 JavaScript 中，对象的用途很是广泛，因为它的值既可以是原始类型（<code>number</code>、<code>string</code>、<code>boolean</code>、<code>null</code>、<code>undefined</code>、<code>bigint</code>和<code>symbol</code>），还可以是对象和函数。</p><p>不管是对象，还是函数和数组，它们都是<code>Object</code>的实例，也就是说在 JavaScript 中，除了原始类型以外，其余都是对象。</p><p>这也就解答了疑惑 1：JavaScript 的函数怎么也是个对象？</p><p>在 JavaScript 中，函数也是一种特殊的对象，它同样拥有属性和值。所有的函数会有一个特别的属性<code>prototype</code>，该属性的值是一个对象，这个对象便是我们常说的&quot;原型对象&quot;。</p><p>我们可以在控制台打印一下这个属性：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;">(name) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> name;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Person.prototype);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;">(name) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Person.prototype);</span></span></code></pre></div><p>打印结果显示为：</p>`,19),i=n("<p>可以看到，该原型对象有两个属性：<code>constructor</code>和<code>__proto__</code>。</p><p>到这里，我们仿佛看到疑惑 &quot;2：<code>__proto__</code>和<code>prototype</code>到底是啥关系？&quot;的答案要出现了。在 JavaScript 中，<code>__proto__</code>属性指向对象的原型对象，对于函数来说，它的原型对象便是<code>prototype</code>。函数的原型对象<code>prototype</code>有以下特点：</p><ul><li><p>默认情况下，所有函数的原型对象（<code>prototype</code>）都拥有<code>constructor</code>属性，该属性指向与之关联的构造函数，在这里构造函数便是<code>Person</code>函数；</p></li><li><p><code>Person</code>函数的原型对象（<code>prototype</code>）同样拥有自己的原型对象，用<code>__proto__</code>属性表示。前面说过，函数是<code>Object</code>的实例，因此<code>Person.prototype</code>的原型对象为<code>Object.prototype。</code></p></li></ul><p>我们可以用这样一张图来描述<code>prototype</code>、<code>__proto__</code>和<code>constructor</code>三个属性的关系：</p>",4),d=n(`<p>从这个图中，我们可以找到这样的关系：</p><ul><li><p>在 JavaScript 中，<code>__proto__</code>属性指向对象的原型对象；</p></li><li><p>对于函数来说，每个函数都有一个<code>prototype</code>属性，该属性为该函数的原型对象。</p></li></ul><p>这是否就是疑惑 2 的完整答案呢？并不全是，在 JavaScript 中还可以通过<code>prototype</code>和<code>__proto__</code>实现继承。</p><h3 id="使用-prototype-和-proto-实现继承" tabindex="-1">使用 prototype 和 <strong>proto</strong> 实现继承 <a class="header-anchor" href="#使用-prototype-和-proto-实现继承" aria-label="Permalink to &quot;使用 prototype 和 **proto** 实现继承&quot;">​</a></h3><p>前面我们说过，对象之所以使用广泛，是因为对象的属性值可以为任意类型。因此，属性的值同样可以为另外一个对象，这意味着 JavaScript 可以这么做：通过将对象 A 的<code>__proto__</code>属性赋值为对象 B，即<code>A.__proto__ = B</code>，此时使用<code>A.__proto__</code>便可以访问 B 的属性和方法。</p><p>这样，JavaScript 可以在两个对象之间创建一个关联，使得一个对象可以访问另一个对象的属性和方法，从而实现了继承，此时疑惑 &quot;3. JavaScript 中对象是怎么实现继承的？&quot;解答完毕。</p><p>那么，JavaScript 又是怎样使用<code>prototype</code>和<code>__proto__</code>实现继承的呢？</p><p>继续以<code>Person</code>为例，当我们使用<code>new Person()</code>创建对象时，JavaScript 就会创建构造函数<code>Person</code>的实例，比如这里我们创建了一个叫&quot;Lily&quot;的<code>Person</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> lily </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Lily&quot;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> lily </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Lily&quot;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>上述这段代码在运行时，JavaScript 引擎通过将<code>Person</code>的原型对象<code>prototype</code>赋值给实例对象<code>lily</code>的<code>__proto__</code>属性，实现了<code>lily</code>对<code>Person</code>的继承，即执行了以下代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 实际上 JavaScript 引擎执行了以下代码</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> lily </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {};</span></span>
<span class="line"><span style="color:#E1E4E8;">lily.__proto__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Person.prototype;</span></span>
<span class="line"><span style="color:#E1E4E8;">Person.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(lily, </span><span style="color:#9ECBFF;">&quot;Lily&quot;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 实际上 JavaScript 引擎执行了以下代码</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> lily </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {};</span></span>
<span class="line"><span style="color:#24292E;">lily.__proto__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Person.prototype;</span></span>
<span class="line"><span style="color:#24292E;">Person.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(lily, </span><span style="color:#032F62;">&quot;Lily&quot;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>我们来打印一下<code>lily</code>实例：</p>`,12),E=o("p",null,[s("可以看到，"),o("code",null,"lily"),s("作为"),o("code",null,"Person"),s("的实例对象，它的"),o("code",null,"__proto__"),s("指向了"),o("code",null,"Person"),s("的原型对象，即"),o("code",null,"Person.prototype"),s("。")],-1),_=o("p",null,"这时，我们再补充下上图中的关系：",-1),u=n("<p>从这幅图中，我们可以清晰地看到构造函数和<code>constructor</code>属性、原型对象（<code>prototype</code>）和<code>__proto__</code>、实例对象之间的关系，这是很多初学者容易搞混的。根据这张图，我们可以得到以下的关系：</p><ol><li><p>每个函数的原型对象（<code>Person.prototype</code>）都拥有<code>constructor</code>属性，指向该原型对象的构造函数（<code>Person</code>）；</p></li><li><p>使用构造函数（<code>new Person()</code>）可以创建对象，创建的对象称为实例对象（<code>lily</code>）；</p></li><li><p>实例对象通过将<code>__proto__</code>属性指向构造函数的原型对象（<code>Person.prototype</code>），实现了该原型对象的继承。</p></li></ol><p>那么现在，关于疑惑 2 中<code>__proto__</code>和<code>prototype</code>的关系，我们可以得到这样的答案：</p><ul><li><p>每个对象都有<code>__proto__</code>属性来标识自己所继承的原型对象，但只有函数才有<code>prototype</code>属性；</p></li><li><p>对于函数来说，每个函数都有一个<code>prototype</code>属性，该属性为该函数的原型对象；</p></li><li><p>通过将实例对象的<code>__proto__</code>属性赋值为其构造函数的原型对象<code>prototype</code>，JavaScript 可以使用构造函数创建对象的方式，来实现继承。</p></li></ul><p>现在我们知道，一个对象可通过<code>__proto__</code>访问原型对象上的属性和方法，而该原型同样也可通过<code>__proto__</code>访问它的原型对象，这样我们就在实例和原型之间构造了一条原型链。这里我用红色的线将<code>lily</code>实例的原型链标了出来。</p>",5),v=n(`<p>下面一起来进行疑惑 4 &quot;JavaScript 是怎么访问对象的方法和属性的？&quot;的解答：在 JavaScript 中，是通过遍历原型链的方式，来访问对象的方法和属性。</p><h3 id="通过原型链访问对象的方法和属性" tabindex="-1">通过原型链访问对象的方法和属性 <a class="header-anchor" href="#通过原型链访问对象的方法和属性" aria-label="Permalink to &quot;通过原型链访问对象的方法和属性&quot;">​</a></h3><p>当 JavaScript 试图访问一个对象的属性时，会基于原型链进行查找。查找的过程是这样的：</p><ul><li><p>首先会优先在该对象上搜寻。如果找不到，还会依次层层向上搜索该对象的原型对象、该对象的原型对象的原型对象等（套娃告警）；</p></li><li><p>JavaScript 中的所有对象都来自<code>Object</code>，<code>Object.prototype.__proto__ === null</code>。<code>null</code>没有原型，并作为这个原型链中的最后一个环节；</p></li><li><p>JavaScript 会遍历访问对象的整个原型链，如果最终依然找不到，此时会认为该对象的属性值为<code>undefined</code>。</p></li></ul><p>我们可以通过一个具体的例子，来表示基于原型链的对象属性的访问过程，在该例子中我们构建了一条对象的原型链，并进行属性值的访问：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 让我们假设我们有一个对象 o, 其有自己的属性 a 和 b：</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> o </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {a</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, b</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#6A737D;">// o 的原型 o.__proto__有属性 b 和 c：</span></span>
<span class="line"><span style="color:#E1E4E8;">o.__proto__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {b</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, c</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#6A737D;">// 最后, o.__proto__.__proto__ 是 null.</span></span>
<span class="line"><span style="color:#6A737D;">// 这就是原型链的末尾，即 null，</span></span>
<span class="line"><span style="color:#6A737D;">// 根据定义，null 没有__proto__.</span></span>
<span class="line"><span style="color:#6A737D;">// 综上，整个原型链如下:</span></span>
<span class="line"><span style="color:#E1E4E8;">{a</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, b</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">---&gt;</span><span style="color:#E1E4E8;"> {b</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, c</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">---&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#6A737D;">// 当我们在获取属性值的时候，就会触发原型链的查找：</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(o.a); </span><span style="color:#6A737D;">// o.a =&gt; 1</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(o.b); </span><span style="color:#6A737D;">// o.b =&gt; 2</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(o.c); </span><span style="color:#6A737D;">// o.c =&gt; o.__proto__.c =&gt; 4</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(o.d); </span><span style="color:#6A737D;">// o.c =&gt; o.__proto__.d =&gt; o.__proto__.__proto__ == null =&gt; undefined</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 让我们假设我们有一个对象 o, 其有自己的属性 a 和 b：</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> o </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {a</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, b</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#6A737D;">// o 的原型 o.__proto__有属性 b 和 c：</span></span>
<span class="line"><span style="color:#24292E;">o.__proto__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {b</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, c</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#6A737D;">// 最后, o.__proto__.__proto__ 是 null.</span></span>
<span class="line"><span style="color:#6A737D;">// 这就是原型链的末尾，即 null，</span></span>
<span class="line"><span style="color:#6A737D;">// 根据定义，null 没有__proto__.</span></span>
<span class="line"><span style="color:#6A737D;">// 综上，整个原型链如下:</span></span>
<span class="line"><span style="color:#24292E;">{a</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, b</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">} </span><span style="color:#D73A49;">---&gt;</span><span style="color:#24292E;"> {b</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, c</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">} </span><span style="color:#D73A49;">---&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#6A737D;">// 当我们在获取属性值的时候，就会触发原型链的查找：</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(o.a); </span><span style="color:#6A737D;">// o.a =&gt; 1</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(o.b); </span><span style="color:#6A737D;">// o.b =&gt; 2</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(o.c); </span><span style="color:#6A737D;">// o.c =&gt; o.__proto__.c =&gt; 4</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(o.d); </span><span style="color:#6A737D;">// o.c =&gt; o.__proto__.d =&gt; o.__proto__.__proto__ == null =&gt; undefined</span></span></code></pre></div><p>可以看到，当我们对对象进行属性值的获取时，会触发该对象的原型链查找过程。</p><p>既然 JavaScript 中会通过遍历原型链来访问对象的属性，那么我们可以通过原型链的方式进行继承。</p><p>也就是说，可以通过原型链去访问原型对象上的属性和方法，我们不需要在创建对象的时候给该对象重新赋值/添加方法。比如，我们调用<code>lily.toString()</code>时，JavaScript 引擎会进行以下操作：</p><ol><li><p>先检查<code>lily</code>对象是否具有可用的<code>toString()</code>方法；</p></li><li><p>如果没有，则\`\`检查<code>lily</code>的原型对象（<code>Person.prototype</code>）是否具有可用的<code>toString()</code>方法；</p></li><li><p>如果也没有，则检查<code>Person()</code>构造函数的<code>prototype</code>属性所指向的对象的原型对象（即<code>Object.prototype</code>）是否具有可用的<code>toString()</code>方法，于是该方法被调用。</p></li></ol><p>由于通过原型链进行属性的查找，需要层层遍历各个原型对象，此时可能会带来性能问题：</p><ul><li><p>当试图访问不存在的属性时，会遍历整个原型链；</p></li><li><p>在原型链上查找属性比较耗时，对性能有副作用，这在性能要求苛刻的情况下很重要。</p></li></ul><p>因此，我们在设计对象的时候，需要注意代码中原型链的长度。当原型链过长时，可以选择进行分解，来避免可能带来的性能问题。</p><p>除了通过原型链的方式实现 JavaScript 继承，JavaScript 中实现继承的方式还包括经典继承(盗用构造函数)、组合继承、原型式继承、寄生式继承，等等。</p><ul><li><p>原型链继承方式中引用类型的属性被所有实例共享，无法做到实例私有；</p></li><li><p>经典继承方式可以实现实例属性私有，但要求类型只能通过构造函数来定义；</p></li><li><p>组合继承融合原型链继承和构造函数的优点，它的实现如下：</p></li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">Parent</span><span style="color:#E1E4E8;">(name) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 私有属性，不共享</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> name;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 需要复用、共享的方法定义在父类原型上</span></span>
<span class="line"><span style="color:#E1E4E8;">Parent.prototype.speak </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">Child</span><span style="color:#E1E4E8;">(name) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  Parent.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">, name);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 继承方法</span></span>
<span class="line"><span style="color:#E1E4E8;">Child.prototype </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Parent</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">Parent</span><span style="color:#24292E;">(name) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 私有属性，不共享</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 需要复用、共享的方法定义在父类原型上</span></span>
<span class="line"><span style="color:#24292E;">Parent.prototype.speak </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">Child</span><span style="color:#24292E;">(name) {</span></span>
<span class="line"><span style="color:#24292E;">  Parent.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">, name);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 继承方法</span></span>
<span class="line"><span style="color:#24292E;">Child.prototype </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Parent</span><span style="color:#24292E;">();</span></span></code></pre></div><p>组合继承模式通过将共享属性定义在父类原型上、将私有属性通过构造函数赋值的方式，实现了按需共享对象和方法，是 JavaScript 中最常用的继承模式。</p><p>虽然在继承的实现方式上有很多种，但实际上都离不开原型对象和原型链的内容，因此掌握<code>__proto__</code>和<code>prototype</code>、对象的继承等这些知识，是我们实现各种继承方式的前提。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>关于 JavaScript 的原型和继承，常常会在我们面试题中出现。随着 ES6/ES7 等新语法糖的出现，我们在日常开发中可能更倾向于使用<code>class</code>/<code>extends</code>等语法来编写代码，原型继承等概念逐渐变淡。</p><p>但不管语法糖怎么先进，JavaScript 的设计在本质上依然没有变化，依然是基于原型来实现继承的。如果不了解这些内容，可能在我们遇到一些超出自己认知范围的内容时，很容易束手无策。</p><p>现在，本文开始的四个疑惑我都在文中进行解答了，现在该轮到你了：</p><ol><li><p>JavaScript 的函数和对象是怎样的关系？</p></li><li><p><code>__proto__</code>和<code>prototype</code>都表示原型对象，它们有什么区别呢？</p></li><li><p>JavaScript 中对象的继承和原型链是什么关系？</p></li></ol><p>把你的想法写在留言区~</p>`,24);function g(h,A,F,C,S,D){const a=e("Image");return c(),t("div",null,[y,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/34/06/CioPOWBwCzyAM-CAAAAKDg-SVug894.png"}),s(),i,p(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/39/C6/Cgp9HWB87hmAPbFxAACJvyE_nJI526.png"}),s(),d,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/33/FE/Cgp9HWBwC56AVE8iAAAQagv5qXA279.png"}),s(),E,_,p(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/39/CF/CioPOWB87iuAaqLIAADOJoaQI4k669.png"}),s(),u,p(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/39/CF/CioPOWB87jeAG0OeAADy6IPqiP8527.png"}),s(),v])}const m=l(r,[["render",g]]);export{P as __pageData,m as default};

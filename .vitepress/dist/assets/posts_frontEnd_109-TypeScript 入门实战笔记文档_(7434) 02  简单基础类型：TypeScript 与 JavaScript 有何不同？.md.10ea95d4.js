import{_ as l,j as o,o as e,g as t,k as n,h as p,Q as s}from"./chunks/framework.4e7d56ce.js";const A=JSON.parse('{"title":"02简单基础类型：TypeScript与JavaScript有何不同？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/109-TypeScript 入门实战笔记文档/(7434) 02  简单基础类型：TypeScript 与 JavaScript 有何不同？.md","filePath":"posts/frontEnd/109-TypeScript 入门实战笔记文档/(7434) 02  简单基础类型：TypeScript 与 JavaScript 有何不同？.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/109-TypeScript 入门实战笔记文档/(7434) 02  简单基础类型：TypeScript 与 JavaScript 有何不同？.md"},r=s('<h1 id="_02简单基础类型-typescript与javascript有何不同" tabindex="-1">02简单基础类型：TypeScript与JavaScript有何不同？ <a class="header-anchor" href="#_02简单基础类型-typescript与javascript有何不同" aria-label="Permalink to &quot;02简单基础类型：TypeScript与JavaScript有何不同？&quot;">​</a></h1><p>这一讲，我们将从最基本的语法、原始类型层面的知识点正式开启 TypeScript 学习之旅。&quot;不积跬步，无以至千里&quot;，只有融会贯通、夯实基础，我们才能在后续的学习中厚积薄发。</p><blockquote><p><strong>学习建议：</strong> 为了更直观地学习这一讲的内容，请你使用配置好的 VS Code IDE（可以回顾一下&quot;01 | 如何快速搭建 TypeScript 开发环境？&quot;的内容） 亲自尝试编写以下涉及的所有示例，比如新建一个&quot;02.basic.1.ts&quot;。</p></blockquote><h3 id="typescript-简介" tabindex="-1">TypeScript 简介 <a class="header-anchor" href="#typescript-简介" aria-label="Permalink to &quot;TypeScript 简介&quot;">​</a></h3><p>TypeScript 其实就是类型化的 JavaScript，它不仅支持 JavaScript 的所有特性，还在 JavaScript 的基础上添加了静态类型注解扩展。</p><p>这里我们举个例子来说明一下，比如 JavaScript 中虽然提供了原始数据类型 string、number，但是它无法检测我们是不是按照约定的类型对变量赋值，而 TypeScript 会对赋值及其他所有操作默认做静态类型检测。</p><p>因此，从某种意义上来说，<strong>TypeScript 其实就是 JavaScript 的超集</strong>，如下图所示：</p>',7),y=s('<p>TypeScript 是 JavaScript 的超集示意图</p><p>在 TypeScript 中，我们不仅可以轻易复用 JavaScript 的代码、最新特性，还能使用可选的静态类型进行检查报错，使得编写的代码更健壮、更易于维护。比如在开发阶段，我们通过 TypeScript 代码转译器就能快速消除很多低级错误（如 typo、类型等）。</p><p>接下来我们一起看看 TypeScript 的基本语法。</p><h3 id="基本语法" tabindex="-1">基本语法 <a class="header-anchor" href="#基本语法" aria-label="Permalink to &quot;基本语法&quot;">​</a></h3><p>在语法层面，缺省类型注解的 TypeScript 与 JavaScript 完全一致。因此，我们可以把 TypeScript 代码的编写看作是为 JavaScript 代码添加类型注解。</p><p>在 TypeScript 语法中，类型的标注主要通过类型后置语法来实现，下面我们通过一个具体示例进行说明。</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> num </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> num </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span></code></pre></div><p>示例中的语法同时符合 JavaScript 语法和 TypeScript 语法。</p><p>而 TypeScript 语法与 JavaScript 语法的区别在于，我们可以在 TypeScript 中显式声明变量<code>num</code>仅仅是数字类型，也就是说只需在变量<code>num</code>后添加<code>: number</code>类型注解即可，如下代码所示：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> num</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> num</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span></code></pre></div><p><strong>特殊说明：</strong> <code>number</code>表示数字类型，<code>:</code>用<strong>来分割变量和类型的分隔符。</strong></p><p>同理，我们也可以把<code>:</code>后的<code>number</code>换成其他的类型（比如 JavaScript 原始类型：number、string、boolean、null、undefined、symbol 等），此时，num 变量也就拥有了 TypeScript 同名的原始类型定义。</p><p>关于 JavaScript 原始数据类型到 TypeScript 类型的映射关系如下表所示：</p>',13),E=s(`<p>接下来，我们详细地了解一下原始类型。</p><h3 id="原始类型" tabindex="-1">原始类型 <a class="header-anchor" href="#原始类型" aria-label="Permalink to &quot;原始类型&quot;">​</a></h3><p>在 JavaScript 中，原始类型指的是非对象且没有方法的数据类型，它包括 string、number、bigint、boolean、undefined 和 symbol 这六种 <strong>（null 是一个伪原始类型，它在 JavaScript 中实际上是一个对象，且所有的结构化类型都是通过 null 原型链派生而来）</strong>。</p><p>在 JavaScript 语言中，原始类型值是最底层的实现，对应到 TypeScript 中同样也是最底层的类型。</p><p>为了实现更合理的逻辑边界，本专栏我们把以上原始类型拆分为基础类型和特殊类型这两部分进行讲解。02 讲主要讲解字符串、数字（包括 number 和 bigint）、布尔值、Symbol 这 4 种基础类型，03 讲主要讲解 null 和 undefined 等特殊字符。</p><h4 id="字符串" tabindex="-1">字符串 <a class="header-anchor" href="#字符串" aria-label="Permalink to &quot;字符串&quot;">​</a></h4><p>在 JavaScript 中，我们可以使用<code>string</code>表示 JavaScript 中任意的字符串（包括模板字符串），具体示例如下所示：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> firstname</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Captain&#39;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 字符串字面量</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> familyname</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;S&#39;</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 显式类型转换</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> fullname</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`my name is \${</span><span style="color:#E1E4E8;">firstname</span><span style="color:#9ECBFF;">}.\${</span><span style="color:#E1E4E8;">familyname</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 模板字符串</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> firstname</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Captain&#39;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 字符串字面量</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> familyname</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;S&#39;</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 显式类型转换</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> fullname</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`my name is \${</span><span style="color:#24292E;">firstname</span><span style="color:#032F62;">}.\${</span><span style="color:#24292E;">familyname</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 模板字符串</span></span></code></pre></div><blockquote><p><strong>说明：所有 JavaScript 支持的定义字符串的方法，我们都可以直接在 TypeScript 中使用。</strong></p></blockquote><h4 id="数字" tabindex="-1">数字 <a class="header-anchor" href="#数字" aria-label="Permalink to &quot;数字&quot;">​</a></h4><p>同样，我们可以使用<code>number</code>类型表示 JavaScript 已经支持或者即将支持的十进制整数、浮点数，以及二进制数、八进制数、十六进制数，具体的示例如下所示：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/** 十进制整数 */</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> integer</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">/** 十进制整数 */</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> integer2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">42</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#6A737D;">/** 十进制浮点数 */</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> decimal</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.14</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">/** 二进制整数 */</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> binary</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0b1010</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">/** 八进制整数 */</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> octal</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0o744</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">/** 十六进制整数 */</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> hex</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0xf00d</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/** 十进制整数 */</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> integer</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">/** 十进制整数 */</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> integer2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">42</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">/** 十进制浮点数 */</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> decimal</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.14</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">/** 二进制整数 */</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> binary</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0b1010</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">/** 八进制整数 */</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> octal</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0o744</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">/** 十六进制整数 */</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> hex</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0xf00d</span><span style="color:#24292E;">;</span></span></code></pre></div><p>如果使用较少的大整数，那么我们可以使用<code>bigint</code>类型来表示，如下代码所示。</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> big</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">bigint</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">n</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> big</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">bigint</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">n</span><span style="color:#24292E;">;</span></span></code></pre></div><p><strong>请注意：虽然</strong> <code>number</code>和<code>bigint</code>都表示数字，但是这两个类型不兼容。</p><p>因此，如果我们在 VS Code IDE 中输入如下示例，问题面板中将会抛出一个类型不兼容的 ts(2322) 错误。</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">big </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> integer;</span></span>
<span class="line"><span style="color:#E1E4E8;">integer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> big;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">big </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> integer;</span></span>
<span class="line"><span style="color:#24292E;">integer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> big;</span></span></code></pre></div><h4 id="布尔值" tabindex="-1">布尔值 <a class="header-anchor" href="#布尔值" aria-label="Permalink to &quot;布尔值&quot;">​</a></h4><p>同样，我们可以使用<code>boolean</code>表示 True 或者 False，如下代码所示。</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/** TypeScript 真香 为 真 */</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> TypeScriptIsGreat</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/** TypeScript 太糟糕了 为 否 */</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> TypeScriptIsBad</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/** TypeScript 真香 为 真 */</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> TypeScriptIsGreat</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">/** TypeScript 太糟糕了 为 否 */</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> TypeScriptIsBad</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span></code></pre></div><h4 id="symbol" tabindex="-1">Symbol <a class="header-anchor" href="#symbol" aria-label="Permalink to &quot;Symbol&quot;">​</a></h4><p>自 ECMAScript 6 起，TypeScript 开始支持新的<code>Symbol</code>原始类型， 即我们可以通过<code>Symbol</code>构造函数，创建一个独一无二的标记；同时，还可以使用<code>symbol</code>表示如下代码所示的类型。</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> sym1</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">symbol</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> sym2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">symbol</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;42&#39;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> sym1</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">symbol</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> sym2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">symbol</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;42&#39;</span><span style="color:#24292E;">);</span></span></code></pre></div><p><strong>当然，TypeScript 还包含 Number、String、Boolean、Symbol 等类型（注意区分大小写）。</strong></p><blockquote><p><strong>特殊说明：请你千万别将它们和小写格式对应的 number、string、boolean、symbol 进行等价</strong>。不信的话，你可以思考并验证如下所示的示例。</p></blockquote><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> sym</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">symbol</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;a&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> sym2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;b&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">sym </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sym2 </span><span style="color:#6A737D;">// ok or fail?</span></span>
<span class="line"><span style="color:#E1E4E8;">sym2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sym </span><span style="color:#6A737D;">// ok or fail?</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> str</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;a&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> str2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;a&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">str </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> str2; </span><span style="color:#6A737D;">// ok or fail?</span></span>
<span class="line"><span style="color:#E1E4E8;">str2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> str; </span><span style="color:#6A737D;">// ok or fail?</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> sym</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">symbol</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;a&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> sym2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;b&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">sym </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sym2 </span><span style="color:#6A737D;">// ok or fail?</span></span>
<span class="line"><span style="color:#24292E;">sym2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sym </span><span style="color:#6A737D;">// ok or fail?</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> str</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;a&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> str2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;a&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">str </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> str2; </span><span style="color:#6A737D;">// ok or fail?</span></span>
<span class="line"><span style="color:#24292E;">str2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> str; </span><span style="color:#6A737D;">// ok or fail?</span></span></code></pre></div><p>实际上，我们压根使用不到 Number、String、Boolean、Symbol 类型，因为它们并没有什么特殊的用途。这就像我们不必使用 JavaScript Number、String、Boolean 等构造函数 new 一个相应的实例一样。</p><p>介绍完这几种原始类型后，你可能会心生疑问：缺省类型注解的有无似乎没有什么明显的作用，就像如下所示的示例一样：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> mustBeNum </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> mustBeNum</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> mustBeNum </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> mustBeNum</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>其实，以上这两种写法在 TypeScript 中是等价的，这得益于基于上下文的类型推导（这部分内容我们将在 04 讲中详细说明）。</p><p>下面，我们对上面的示例稍做一下修改，如下代码所示：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> mustBeNum </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;badString&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> mustBeNum</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;badString&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> mustBeNum </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;badString&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> mustBeNum</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;badString&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>此时，我们可以看到 VS Code 的内容和问题面板区域提示了错误（其他 IDE 也会出现类似提示），如下图所示：</p>`,33),i=s(`<p>错误提示效果图</p><p>以上就是类型注解作用的直观体现。</p><p>如果变量所处的上下文环境特别复杂，在开发阶段就能检测出低级类型错误的能力将显得尤为重要，而这种能力主要来源于 TypeScript 实现的静态类型检测。</p><h3 id="静态类型检测" tabindex="-1">静态类型检测 <a class="header-anchor" href="#静态类型检测" aria-label="Permalink to &quot;静态类型检测&quot;">​</a></h3><p>在编译时期，静态类型的编程语言即可准确地发现类型错误，这就是静态类型检测的优势。</p><p>在编译（转译）时期，TypeScript 编译器将通过对比检测变量接收值的类型与我们显示注解的类型，从而检测类型是否存在错误。如果两个类型完全一致，显示检测通过；如果两个类型不一致，它就会抛出一个编译期错误，告知我们编码错误，具体示例如下代码所示：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">trueNum</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">42</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fakeNum</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;42&quot;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// ts(2322) Type &#39;string&#39; is not assignable to type &#39;number&#39;.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">trueNum</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">42</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fakeNum</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;42&quot;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// ts(2322) Type &#39;string&#39; is not assignable to type &#39;number&#39;.</span></span></code></pre></div><p>在以上示例中，首先我们声明了一个数字类型的变量<code>trueNum</code>，通过编译器检测后，发现接收值是 42，且它的类型是<code>number</code>，可见两者类型完全一致。此时，TypeScript 编译器就会显示检测通过。</p><p>而如果我们声明了一个<code>string</code>类型的变量<code>fakeNum</code>，通过编译器检测后，发现接收值为 &quot;42&quot;，且它的类型是<code>number</code>，可见两者类型不一致 。此时，TypeScript 编译器就会抛出一个字符串值不能为数字类型变量赋值的ts(2322) 错误，也就是说检测不通过。</p><p>实际上，正如 01 讲提到，TypeScript 的语言服务可以和 VS Code 完美集成。<strong>因此，在编写代码的同时，我们可以同步进行静态类型检测（无须等到编译后再做检测），极大地提升了开发体验和效率。</strong></p><p>以上就是 TypeScript 中基本语法和原始类型的介绍。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>这一讲通过与 JavaScript 的基础类型进行对比，我们得知：TypeScript 其实就是添加了类型注解的 JavaScript，它并没有任何颠覆性的变动。因此，学习并掌握 TypeScript 一定会是一件极其容易的事情。</p><p><strong>插播一个思考题：请举例说明 ts(2322) 是一个什么错误？什么时候会抛出这个错误？欢迎你在留言区进行互动、交流。</strong></p><p>另外，如果你觉得本专栏有价值，欢迎分享给更多好友哦~</p>`,15);function d(F,u,g,b,m,h){const a=o("Image");return e(),t("div",null,[r,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/3D/B5/CioPOWCV_xuAZSI_AAdZCdHFgM8072.png"}),p(),y,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/3D/B5/CioPOWCV_y2AfRkCAAJ0QW8Nr1k253.png"}),p(),E,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/3D/AC/Cgp9HWCV_0GAYFH7AATQLps4G-c499.png"}),p(),i])}const S=l(c,[["render",d]]);export{A as __pageData,S as default};

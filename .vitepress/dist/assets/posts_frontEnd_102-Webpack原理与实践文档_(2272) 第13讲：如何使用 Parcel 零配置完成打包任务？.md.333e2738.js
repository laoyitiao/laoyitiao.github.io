import{_ as p,j as o,o as e,g as c,k as n,h as l,Q as s}from"./chunks/framework.a0d18f64.js";const v=JSON.parse('{"title":"第13讲：如何使用Parcel零配置完成打包任务？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/102-Webpack原理与实践文档/(2272) 第13讲：如何使用 Parcel 零配置完成打包任务？.md","filePath":"posts/frontEnd/102-Webpack原理与实践文档/(2272) 第13讲：如何使用 Parcel 零配置完成打包任务？.md","lastUpdated":1696682708000}'),t={name:"posts/frontEnd/102-Webpack原理与实践文档/(2272) 第13讲：如何使用 Parcel 零配置完成打包任务？.md"},r=s(`<h1 id="第13讲-如何使用parcel零配置完成打包任务" tabindex="-1">第13讲：如何使用Parcel零配置完成打包任务？ <a class="header-anchor" href="#第13讲-如何使用parcel零配置完成打包任务" aria-label="Permalink to &quot;第13讲：如何使用Parcel零配置完成打包任务？&quot;">​</a></h1><p>今天我要带你了解一个近两年非常火的打包工具：Parcel。</p><p>Parcel 是一款完全零配置的前端打包器，它提供了 &quot;傻瓜式&quot; 的使用体验，我们只需了解它提供的几个简单的命令，就可以直接使用它去构建我们的前端应用程序了。</p><p>下面我们直接来看具体如何去使用 Parcel。</p><h3 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to &quot;快速上手&quot;">​</a></h3><p>这里我们先创建一个空目录，然后通过 npm init 初始化一个项目中的 package.json 文件。</p><p>完成以后我们就可以安装 Parcel 模块了，具体命令如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">parcel-bundler</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--save-dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">parcel-bundler</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--save-dev</span></span></code></pre></div><p>这里需要注意 Parcel 的 npm 模块名称叫作 parcel-bundler，我们同样应该将它安装到项目的开发依赖中。</p><p>安装完成过后，parcel-bundler 模块就在 node_modules/.bin 目录中提供了一个叫作 parcel 的 CLI 程序，后续我们就是使用这个 CLI 程序执行应用打包。</p><p>既然是打包应用代码，那我们这里就得先有代码。我们回到项目中创建一些必需的文件，结构如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">├── src</span></span>
<span class="line"><span style="color:#E1E4E8;">│   ├── index.html</span></span>
<span class="line"><span style="color:#E1E4E8;">│   ├── logger.js</span></span>
<span class="line"><span style="color:#E1E4E8;">│   └── main.js</span></span>
<span class="line"><span style="color:#E1E4E8;">└── </span><span style="color:#F97583;">package</span><span style="color:#E1E4E8;">.json</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#24292E;">├── src</span></span>
<span class="line"><span style="color:#24292E;">│   ├── index.html</span></span>
<span class="line"><span style="color:#24292E;">│   ├── logger.js</span></span>
<span class="line"><span style="color:#24292E;">│   └── main.js</span></span>
<span class="line"><span style="color:#24292E;">└── </span><span style="color:#D73A49;">package</span><span style="color:#24292E;">.json</span></span></code></pre></div><p>首先在根目录下新建一个 src 目录，用于存放开发阶段编写的源代码，同时创建两个 JS 文件，分别是 logger.js 和 main.js，然后再创建一个 index.html 文件，这个 index.html 文件会将是 Parcel 打包的入口文件。</p><p>虽然 Parcel 跟 Webpack 一样都支持以任意类型文件作为打包入口，不过 Parcel 官方还是建议我们使用 HTML 文件作为入口。官方的理由是 HTML 是应用在浏览器端运行时的入口。</p><p>那在这个 HTML 入口文件中，我们可以像平时一样去编写代码，也可以正常去引用资源。在它里面引用的资源，最终都会被 Parcel 打包到一起。</p><p>我们这里先尝试在 index.html 中引入 main.js 脚本文件，具体代码如下：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- ./src/index.html --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;!</span><span style="color:#F97583;">DOCTYPE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">charset</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;Parcel Tutorials&lt;/</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;main.js&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- ./src/index.html --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;!</span><span style="color:#D73A49;">DOCTYPE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">charset</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;Parcel Tutorials&lt;/</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;main.js&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>紧接着，在 main.js 中按照 ES Modules 的方式导入 logger.js 中的成员，具体代码如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// ./src/main.js</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { log } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./logger&#39;</span></span>
<span class="line"><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hello parcel&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">// ./src/logger.js</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">msg</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;---------- INFO ----------&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(msg)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// ./src/main.js</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { log } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./logger&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hello parcel&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">// ./src/logger.js</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">log</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#E36209;">msg</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;---------- INFO ----------&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(msg)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Parcel 同样支持对 ES Modules 模块的打包。</p><p>完成以后，我们打开命令行终端，然后使用 npx 去运行 node_modules 目录下的 parcel 命令。具体命令如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">parcel</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">src/index.html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">parcel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">src/index.html</span></span></code></pre></div><p>parcel 命令需要我们传入打包入口文件路径，那我们这里就应该是 src/index.html。</p><p>此时如果执行这个命令，Parcel 就会根据这里传入的参数，先找到 index.html，然后在根据 HTML 中的 script 标签，找到 main.js，最后再顺着 import 语句找到 logger.js 模块，从而完成整体打包。</p><p>回车执行过后，这里我们发现 Parcel 这个命令不仅仅帮我们打包了应用，而且还同时开启了一个开发服务器，这就跟 Webpack Dev Server 一样。</p><p>我们打开这个地址，启动浏览器，然后打开开发人员工具。Parcel 同样支持自动刷新这样的功能。具体效果如下：</p>`,26),E=s(`<p>以上就是 Parcel 的基本使用，相比于 Webpack，Parcel 在使用上的确简化了很多。</p><h4 id="模块热替换" tabindex="-1">模块热替换 <a class="header-anchor" href="#模块热替换" aria-label="Permalink to &quot;模块热替换&quot;">​</a></h4><p>如果你需要的是模块热替换的体验，Parcel 中也可以支持。我们回到 main.js 文件中，这里同样需要使用 HMR 的 API。具体代码如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// ./src/main.js</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { log } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./logger&#39;</span></span>
<span class="line"><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hello parcel&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">// HMR API</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.hot) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.hot.</span><span style="color:#B392F0;">accept</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;HMR～&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// ./src/main.js</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { log } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./logger&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hello parcel&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">// HMR API</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.hot) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.hot.</span><span style="color:#6F42C1;">accept</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;HMR～&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们需要先判断一下 module.hot 对象是否存在，如果存在则证明当前环境可以使用 HMR 的 API，那我们就可以使用 module.hot.accept 方法去处理热替换。</p><p>不过这里的 accept 方法与 Webpack 提供的 HMR 有点不太一样，Webpack 中的 accept 方法支持接收两个参数，用来处理指定的模块更新后的逻辑。</p><p>而这里 Parcel 提供的 accept 只需要接收一个回调参数，作用就是当前模块更新或者所依赖的模块更新过后自动执行传入的回调函数，这相比于之前 Webpack 中的用法要简单很多。</p><p>关于模块更新后的处理逻辑，这里我们就不再过多介绍了，你可以参考我们在 08 课时 Webpack HMR 中的介绍。</p><h4 id="自动安装依赖" tabindex="-1">自动安装依赖 <a class="header-anchor" href="#自动安装依赖" aria-label="Permalink to &quot;自动安装依赖&quot;">​</a></h4><p>除了热替换，Parcel 还支持一个非常友好的功能：自动安装依赖。试想一下，你正在开发一个应用的过程中，突然需要使用某个第三方模块，那此时你就需要先停止正在运行的 Dev Server，然后再去安装这个模块，安装完成过后再重新启动 Dev Server。有了自动安装依赖的功能就不必如此麻烦了。</p><p>我们回到 main.js 文件中，假设我们这里想要使用一下 jquery。虽然我们并没有安装这个模块，但是因为有了自动安装依赖功能，我们这里只管正常导入，正常使用就好了。具体效果如下：</p>`,11),y=s(`<p>在文件保存过后，Parcel 会自动去安装刚刚导入的模块包，极大程度地避免手动操作。</p><h4 id="其他类型资源加载" tabindex="-1">其他类型资源加载 <a class="header-anchor" href="#其他类型资源加载" aria-label="Permalink to &quot;其他类型资源加载&quot;">​</a></h4><p>除此以外，Parcel 同样支持加载其他类型的资源模块，而且相比于其他的打包器，在 Parcel 中加载其他类型的资源模块同样是零配置的。</p><p>例如我们这里再来添加一个 style.css 的样式文件，并且在这个文件中添加一些简单的样式，具体如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> .</span></span>
<span class="line"><span style="color:#E1E4E8;"> ├── src</span></span>
<span class="line"><span style="color:#E1E4E8;"> │   ├── index.html</span></span>
<span class="line"><span style="color:#E1E4E8;"> │   ├── logger.js</span></span>
<span class="line"><span style="color:#E1E4E8;"> │   ├── main.js</span></span>
<span class="line"><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">│   └── style.css</span></span>
<span class="line"><span style="color:#E1E4E8;"> └── </span><span style="color:#F97583;">package</span><span style="color:#E1E4E8;">.json</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> .</span></span>
<span class="line"><span style="color:#24292E;"> ├── src</span></span>
<span class="line"><span style="color:#24292E;"> │   ├── index.html</span></span>
<span class="line"><span style="color:#24292E;"> │   ├── logger.js</span></span>
<span class="line"><span style="color:#24292E;"> │   ├── main.js</span></span>
<span class="line"><span style="color:#D73A49;">+</span><span style="color:#24292E;">│   └── style.css</span></span>
<span class="line"><span style="color:#24292E;"> └── </span><span style="color:#D73A49;">package</span><span style="color:#24292E;">.json</span></span></code></pre></div><p>然后回到 main.js 中通过 import 导入这个样式文件，具体如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// ./src/main.js</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { log } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./logger&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./style.css&#39;</span></span>
<span class="line"><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hello parcel&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// ./src/main.js</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { log } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./logger&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./style.css&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hello parcel&#39;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>保存过后，样式文件可以立即生效。效果如下：</p>`,8),i=s(`<p>你会发现，导入样式的操作，整个过程我们并没有停下来做额外的事情。</p><p>总之，Parcel 希望给开发者的体验就是想做什么，只管去做，其他额外的事情就交给工具来处理。</p><h4 id="动态导入" tabindex="-1">动态导入 <a class="header-anchor" href="#动态导入" aria-label="Permalink to &quot;动态导入&quot;">​</a></h4><p>另外，Parcel 同样支持直接使用动态导入，内部也会自动处理代码拆分，我们也一起来尝试一下。</p><p>这里我们先将静态导入的 jQuery 注释掉。然后使用动态导入的方式导入 jQuery 模块。具体代码如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// ./src/main.js</span></span>
<span class="line"><span style="color:#6A737D;">// import $ from &#39;jquery&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { log } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./logger&#39;</span></span>
<span class="line"><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hello parcel&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;jquery&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;">(document.body).</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;&lt;h1&gt;Hello Parcel&lt;/h1&gt;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// ./src/main.js</span></span>
<span class="line"><span style="color:#6A737D;">// import $ from &#39;jquery&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { log } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./logger&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hello parcel&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;jquery&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#E36209;">$</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">$</span><span style="color:#24292E;">(document.body).</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;&lt;h1&gt;Hello Parcel&lt;/h1&gt;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>import 函数返回的就是一个 Promise 对象，在这个 Promise 对象 then 方法的回调中，我们就能够拿到导入的模块对象了，然后我们就可以把使用 jQuery 的代码移到这个回调函数中。</p><p>保存过后，回到浏览器，找到开发人员工具的 Network 面板，这里就能够看到拆分出来的 jquery 所对应的 bundle 文件请求了。具体效果如下图：</p>`,8),d=s('<p>那以上基本上就是 Parcel 最常用的一些特性了，使用上根本没有任何难度，从头到尾我们都只是执行了一个 Parcel 命令。</p><h4 id="生产模式打包" tabindex="-1">生产模式打包 <a class="header-anchor" href="#生产模式打包" aria-label="Permalink to &quot;生产模式打包&quot;">​</a></h4><p>接下来我们来看，Parcel 如何以生产模式打包。生产模式打包，具体命令如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">parcel</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">src/index.html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">parcel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span><span style="color:#24292E;"> </span><span style="color:#032F62;">src/index.html</span></span></code></pre></div><p>我们只需要执行 parcel build 然后跟上打包入口文件路径，就可以以生产模式运行打包了。</p><p>这里补充一点，相同体量的项目打包，Parcel 的构建速度会比 Webpack 快很多。因为 Parcel 内部使用的是多进程同时工作，充分发挥了多核 CPU 的性能。</p><blockquote><p>P.S. Webpack 中也可以使用一个叫作 <a href="https://github.com/amireh/happypack" target="_blank" rel="noreferrer">happypack</a> 的插件实现这一点。</p></blockquote><p>那我们这里再来看一下输出的打包结果，具体结果如下：</p>',8),g=s('<p>此时，dist 目录下就都是本次打包的结果了。这里的输出文件也都会被压缩，而且样式代码也会被单独提取到单个文件中。</p><p>那这就是 Parcel 的体验，整体体验下来就是一个感觉：舒服，因为它在使用上真的太简单了。</p><h3 id="写在最后" tabindex="-1">写在最后 <a class="header-anchor" href="#写在最后" aria-label="Permalink to &quot;写在最后&quot;">​</a></h3><p>Parcel 是 2017 年发布的，出现的原因是因为当时的 Webpack 使用过于烦琐，文档也不是很清晰明了，所以 Parcel 一经推出就迅速被推上风口浪尖。其核心特点就是：</p><ul><li>真正做到了完全零配置，对项目没有任何的侵入；</li><li>自动安装依赖，开发过程更专注；</li><li>构建速度更快，因为内部使用了多进程同时工作，能够充分发挥多核 CPU 的效率。</li></ul><p>但是目前看来，如果你去观察开发者的实际使用情况，绝大多数项目的打包还是会选择 Webpack。个人认为原因有两点：</p><ol><li>Webpack 生态更好，扩展更丰富，出现问题容易解决；</li><li>随着这两年的发展，Webpack 越来越好用，开发者也越来越熟悉。</li></ol><p>所以，Parcel 这样的工具对于开发者而言，我们去了解它，也就是为了保持对新鲜技术和工具的敏感度，从而更好地把握技术趋势和走向，仅此而已。</p>',8);function h(F,m,u,_,C,b){const a=o("Image");return e(),c("div",null,[r,n(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/15/BE/Ciqc1F7UozCAaPTaAAUS6rk6md0993.png"}),l(),E,n(a,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image/M00/16/00/Ciqc1F7U03qAE1KxADTVBtOwcSs532.gif"}),l(),y,n(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/15/CA/CgqCHl7Uo1eAHNwFAAVD1HZtuN0096.png"}),l(),i,n(a,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/15/BE/Ciqc1F7Uo2WASIAhAAGVL6iiNuQ803.png"}),l(),d,n(a,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/15/BE/Ciqc1F7Uo3GARoNnAABz_Av9vqc833.png"}),l(),g])}const k=p(t,[["render",h]]);export{v as __pageData,k as default};

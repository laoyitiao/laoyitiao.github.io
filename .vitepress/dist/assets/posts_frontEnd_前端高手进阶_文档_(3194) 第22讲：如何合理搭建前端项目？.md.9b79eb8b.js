import{_ as e,j as p,o as l,g as t,k as n,h as o,Q as s}from"./chunks/framework.a0d18f64.js";const b=JSON.parse('{"title":"第22讲：如何合理搭建前端项目？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3194) 第22讲：如何合理搭建前端项目？.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3194) 第22讲：如何合理搭建前端项目？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/前端高手进阶_文档/(3194) 第22讲：如何合理搭建前端项目？.md"},c=s('<h1 id="第22讲-如何合理搭建前端项目" tabindex="-1">第22讲：如何合理搭建前端项目？ <a class="header-anchor" href="#第22讲-如何合理搭建前端项目" aria-label="Permalink to &quot;第22讲：如何合理搭建前端项目？&quot;">​</a></h1><p>通过上一课时的学习，我们分析了前端构建工具 webpack 的底层原理，在理解原理之后再来探索构建工具的具体应用------如何合理搭建前端项目。当然，前端项目搭建并不只是使用构建工具这么简单，本课时我们将从项目组织、代码规范 2 个方面来进行分析。</p><h3 id="项目组织" tabindex="-1">项目组织 <a class="header-anchor" href="#项目组织" aria-label="Permalink to &quot;项目组织&quot;">​</a></h3><p>考虑这样一个场景，在开发项目 projectA 的时候，发现其中的 codeX 也可以用于项目 projectB，最简单直接的处理方式就是把 codeX 的代码直接复制到 projectB 下，按照&quot;三次原则&quot;（三次原则是指同一段代码被使用到 3 次时再考虑抽象）这种处理方式没什么问题。但如果此时项目 projectC 和 projectD 也会用到 codeX，那么这种方式维护起来会很麻烦。</p><p>有经验的工程师会想到将 codeX 发布成模块，作为依赖模块引入所需的项目中。此时对于 codeX 会涉及两种组织代码的方式：<strong>multirepo</strong> 和 <strong>monorepo</strong>。</p><h4 id="multirepo" tabindex="-1">multirepo <a class="header-anchor" href="#multirepo" aria-label="Permalink to &quot;multirepo&quot;">​</a></h4><p>multirepo 就是将项目中的模块拆分出来，放在不同的仓库中进行独立管理。例如，用于 Node.js 的 Web 框架 <a href="https://github.com/koajs/koa" target="_blank" rel="noreferrer">Koa</a>，它依赖的模块 <a href="https://github.com/koajs/convert" target="_blank" rel="noreferrer">koa-convert</a> 和 <a href="https://github.com/koajs/compose" target="_blank" rel="noreferrer">koa-compose</a> 分别拆分成了两个仓库进行管理。</p><p>这种方式的好处是保证仓库的独立性，方便不同团队维护对应的仓库代码，可以根据团队情况选择擅长的工具、工作流等。</p><p>但这种方式也会存在一些问题，具体如下。</p><ul><li><p><strong>开发调试及版本更新效率低下</strong>。比如在仓库 A 用到的仓库 B 中发现了一个 bug，就必须到仓库 B 里修复它、打包、发版本，然后再回到仓库 A 继续工作。在不同的仓库间，你不仅需要处理不同的代码、工具，甚至是不同的工作流程；还有，你只能去问维护这个仓库的人，能不能为你做出改变，然后等着他们去解决。</p></li><li><p><strong>团队技术选型分散</strong>。不同的库实现风格可能存在较大差异（比如有的库依赖 Vue，有的依赖 React），还有可能会采用不同的测试库及校验规则，维护起来比较困难。</p></li></ul><p>而 monorepo 方式恰好就能解决这些问题。</p><h4 id="monorepo" tabindex="-1">monorepo <a class="header-anchor" href="#monorepo" aria-label="Permalink to &quot;monorepo&quot;">​</a></h4><p>monorepo 就是将所有相关的模块放在同一个项目仓库中。这种方式在管理上会更加方便，项目所有代码可以使用统一的规范及构建、测试、发布流程。</p><p>很多著名的开源项目都采取了这种管理方式，比如开源项目 babel，它依赖的模块都放在了 packages 目录下。</p>',14),i=s('<p>babel 的依赖模块</p><p>通过查看 babel 项目，发现根目录下有一个 lerna.json 的配置文件，这是开源工具 <a href="https://github.com/lerna/lerna" target="_blank" rel="noreferrer">lerna</a>的配置文件。lerna 是一个用于管理带有多个包的 JavaScript 项目工具，用 lerna 管理的项目会有 3 个文件目录：packages 目录、learna.json 文件和 package.json 文件。通过 lerna 命令行工具在初始化项目的时候就可以创建它们。</p><p>lerna 支持两种模式，分别是 Fixed/Locked 和 Independent 模式。</p><p>Fixed/Locked 模式为默认模式，babel 采用的就是这种模式，该模式的特点是，开发者执行 lerna publish 后，lerna 会在 lerna.json 中找到指定 version 版本号。如果这一次发布包含某个项目的更新，那么会自动更新 version 版本号。对于各个项目相关联的场景，这样的模式非常有利，任何一个项目大版本升级，其他项目的大版本号也会更新。</p><p>Independent 模式顾名思义，各个项目都是相互独立。开发者需要独立管理多个包的版本更新。也就是说，我们可以具体到更新每个包的版本。每次发布，lerna 会配合 Git，检查相关包文件的变动，只发布有改动的 package。</p><p>虽然众多开源项目采用了 monorepo，但它也并不是最完美的代码组织方式，也会带来一些问题，比如由于将多个模块集中在一个仓库中会导致仓库体积变大，目录结构也会变得更复杂。而 monorepo 也需要额外的工具来管理各个模块，这意味着相对 multirepo 而言会有一定的学习成本。</p><h3 id="代码规范" tabindex="-1">代码规范 <a class="header-anchor" href="#代码规范" aria-label="Permalink to &quot;代码规范&quot;">​</a></h3><p>什么样的代码才是好代码？不同的工程师可能给出不同的答案，比如：</p><ul><li><p>少用全局变量</p></li><li><p>高内聚、低耦合</p></li><li><p>遵循单一原则</p></li><li><p>拥有注释说明</p></li></ul><p>切换角度思考会帮助我们得到更全面的答案：从人的角度考虑，维护代码的开发者会不断地变更；从时间的角度考虑，代码会不断地被修改。我们可以总结一个最简单实用的答案：风格一致。 &quot;风格一致&quot;就是让参与项目开发的工程师形成一种开发上的契约，从而降低维护成本。要达到这个目的，我们可以从代码编写和代码管理两个方向入手，分别对应编写规范和提交规范。</p><h4 id="编写规范" tabindex="-1">编写规范 <a class="header-anchor" href="#编写规范" aria-label="Permalink to &quot;编写规范&quot;">​</a></h4><p>网上关于 HTML、JavaScript、CSS 编写规范（也称编写风格）之类的文档资料很多，一般大型互联网公司都会制定自己的编写规范，比如 <a href="https://google.github.io/styleguide/jsguide.html" target="_blank" rel="noreferrer">Google 的 JavaScript 风格指南</a>、 <a href="https://github.com/airbnb/javascript" target="_blank" rel="noreferrer">Airbnb 风格指南</a>，而对应的工具也不少。以 JavaScript 为例，比如 JSLint、JSHint、JSCS、ESLint 等多种规则校验工具。</p><p>不管我们在团队中制定怎样的编写规范，只要把握好下面 3 个核心原则，就能制定出合理的编写规范。</p><ul><li><p><strong>可执行</strong>。制定编写规范首先要保证的就是规范的可执行性。制定好规范如果只能靠工程师的自觉性去执行，靠代码审核去检查，那么执行效率会很低。所以建议编写规范中的每一条规则都能有对应的校验工具规则与之对应。</p></li><li><p><strong>可配置</strong>。代码的可读性有时候是一个比较主观的问题，比如空格缩进问题，有的工程师认为 2 个空格缩进可以查看更多代码内容，而有的会认为 4 个空格缩进层次感更强。使用具有丰富配置项的代码校验工具就可以很轻松地解决这些分歧。</p></li><li><p><strong>可扩展</strong>。这一点也是对于校验工具的要求，即当校验工具的已有配置规则无法支持项目需求时，可以自行编写插件来扩展校验规则。</p></li></ul><p>最常用的 ESlint 就可以满足可配置、可扩展的原则，它的核心功能是通过一个叫 verify() 的函数来实现的，该函数有两个必传参数：要验证的源码文本和一个配置对象（通过准备好的配置文件加命令行操作会生成配置）。该函数首先使用解析器生成抽象语法树（AST），同时为规则中所有的选择器添加监听事件，在触发时执行；然后从上到下遍历 AST。在每个节点触发与该节点类型同名的一个事件（即 &quot;Identifier&quot;&quot;WithStatement&quot; 等），监听函数校验完相关的代码之后把不符合规则的问题推送到 lintingProblems 数组中返回。</p><h4 id="提交规范" tabindex="-1">提交规范 <a class="header-anchor" href="#提交规范" aria-label="Permalink to &quot;提交规范&quot;">​</a></h4><p>虽然在开发过程中，每次在使用 Git 提交代码时都会编写提交消息（Commit Message），但提交规范仍然是一个很容易被忽视的点。而良好的提交规范和编写规范一样，也能较大地提升代码的可维护性，一方面能保证在代码回退时能快速找到对应的提交记录，另一方面也可以直接将提交消息生成修改日志（Change Log）。</p>',17),u=s(`<p>Angular 的提交日志</p><p>虽然 Git 自带 template 功能，这个功能可以定义一个提交消息的模板文件，然后通过 git config 命令指向这个模板文件。这样在每次提交的时候就会使用默认的编辑器打开一个模板文件，编辑对应信息后保存即可。但不具有强制性，推荐使用工具 <a href="https://commitlint.js.org/#/" target="_blank" rel="noreferrer">@commitlint/cli</a> 和 <a href="https://www.npmjs.com/package/husky" target="_blank" rel="noreferrer">husky</a>。commitlint 可以设置提交消息模板并校验，而 husky 可以设置 pre-commit 钩子，在提交代码时调用 commitlint 进行强制校验，避免生成不符合规范的提交消息。</p><p>下面的 husky 配置文件会在提交之前执行命令 npm test，在生成提交消息时执行 commitlint。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// .huskyrc </span></span>
<span class="line"><span style="color:#E1E4E8;">{ </span></span>
<span class="line"><span style="color:#79B8FF;">&quot;hooks&quot;</span><span style="color:#E1E4E8;">: { </span></span>
<span class="line"><span style="color:#79B8FF;">&quot;pre-commit&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;npm test&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#79B8FF;">&quot;commit-msg&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;commitlint&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// .huskyrc </span></span>
<span class="line"><span style="color:#24292E;">{ </span></span>
<span class="line"><span style="color:#005CC5;">&quot;hooks&quot;</span><span style="color:#24292E;">: { </span></span>
<span class="line"><span style="color:#005CC5;">&quot;pre-commit&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;npm test&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#005CC5;">&quot;commit-msg&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;commitlint&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">} </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>从上面的例子可以看到，husky 同构监听 git 钩子，不仅可以校验提交消息，还可以调用自定义的 npm 脚本进行代码校验或执行测试代码。随着项目不断增大，对整个项目上运行 lint 或 test 会变得非常耗时，我们一般只想对更改的文件进行检查，这时候可以借助 <a href="https://www.npmjs.com/package/lint-staged" target="_blank" rel="noreferrer">lint-staged</a>。</p><p>下面是 Vue 的 lint-staged 相关配置。它表示对于 js 后缀的文件执行 eslint --fix 命令来校验和修复代码 ，通过之后再进行 git add 添加到暂存区。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// package.json </span></span>
<span class="line"><span style="color:#E1E4E8;">{ </span></span>
<span class="line"><span style="color:#E1E4E8;">... </span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;lint-staged&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;*.js&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> [ </span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;eslint --fix&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;git add&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">] </span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span></span>
<span class="line"><span style="color:#E1E4E8;">... </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// package.json </span></span>
<span class="line"><span style="color:#24292E;">{ </span></span>
<span class="line"><span style="color:#24292E;">... </span></span>
<span class="line"><span style="color:#032F62;">&quot;lint-staged&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#032F62;">&quot;*.js&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> [ </span></span>
<span class="line"><span style="color:#032F62;">&quot;eslint --fix&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#032F62;">&quot;git add&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">] </span></span>
<span class="line"><span style="color:#24292E;">}, </span></span>
<span class="line"><span style="color:#24292E;">... </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一课时站在前端工程的角度，从项目组织和代码规范两个方面分析了如何搭建可维护性的前端项目。</p><ul><li><p>在项目组织上，对于相关性低的模块可以采用 multirepo 方式进行独立管理，相关度高的模块则可以采用 monorepo 方式对其进行集中管理。</p></li><li><p>在制定代码规范时，对于编写规范，尽量做到可执行、可配置、可扩展，对于提交规范，可以选择适当的工具，比如 commitlint、husky 来保证提交消息的规范化和可读性。</p></li></ul><p>希望你通过本课时的内容，能对前端项目搭建有更深入的理解和思考，不只是停留在会用命令行工具或脚手架来创建项目的层次。而是在空间维度和时间维度上来考虑如何组织项目代码和规范项目代码。</p><p>最后布置一道思考题：你在开发中还用到了哪些代码校验工具，它们都有什么特点？欢迎你在留言区一起分享交流。</p>`,12);function h(d,m,g,E,_,y){const a=p("Image");return l(),t("div",null,[c,n(a,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/40/59/CgqCHl8yWpuAcwJgAAAqnGP7ZbA995.png"}),o(),i,n(a,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image/M00/40/59/CgqCHl8yWsqAN-CGAAHUx-NKShw605.png"}),o(),u])}const k=e(r,[["render",h]]);export{b as __pageData,k as default};

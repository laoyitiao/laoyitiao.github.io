import{_ as n,j as p,o as r,g as o,k as s,h as a,Q as l,s as e}from"./chunks/framework.a0d18f64.js";const L=JSON.parse('{"title":"加餐：Vue.j3.0到底带来了哪些变化？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/102-Webpack原理与实践文档/(3129) 加餐：Vue.j 3.0 到底带来了哪些变化？.md","filePath":"posts/frontEnd/102-Webpack原理与实践文档/(3129) 加餐：Vue.j 3.0 到底带来了哪些变化？.md","lastUpdated":1696682708000}'),i={name:"posts/frontEnd/102-Webpack原理与实践文档/(3129) 加餐：Vue.j 3.0 到底带来了哪些变化？.md"},c=l('<h1 id="加餐-vue-j3-0到底带来了哪些变化" tabindex="-1">加餐：Vue.j3.0到底带来了哪些变化？ <a class="header-anchor" href="#加餐-vue-j3-0到底带来了哪些变化" aria-label="Permalink to &quot;加餐：Vue.j3.0到底带来了哪些变化？&quot;">​</a></h1><p>在 4 月 22 日的直播中，我就 &quot;Vue.js 3.0 到底带来了哪些变化？&quot; 这个话题，分享了一些自己的看法。在这里我做了一篇内容梳理，希望对你有所帮助。如果你想要了解直播当天的详细内容，可以观看本课时的视频或者音频内容。</p><p>今天的内容会分为以下五个部分：</p><ul><li>Composition APIs；</li><li>设计动机 / 核⼼优势；</li><li>基于 Webpack 构建；</li><li>Vue CLI experimental；</li><li>Official Libraries。</li></ul><p>首先，我们先回顾一下 Vue 的发展历程：</p><ul><li>2018-09-30：Vue.js 2.0 两周年，公开宣布 Vue.js 3.0 开发计划；</li><li>2019-10-05：Vue.js 3.0 公开源代码；</li><li>2019-12-20：Vue.js 发布 3.0-alpha.0 版本；</li><li>2020-04-17：Vue.js 发布 3.0-beta.1 版本；</li><li>2020-01-05：vue-cli-plugin-vue-next v0.0.2；</li><li>2020-02-18：vue-router-next v4.0.0-alpha.0；</li><li>2020-03-14：eslint-plugin-vue v7.0.0-alpha.0；</li><li>2020-03-15：vuex v4.0.0-alpha.1；</li><li>2020-04-12：vue-test-utils-next v2.0.0-alpha.1。</li></ul><p>这里我希望你要了解：</p><ul><li>新版本发布固然有它的优势，但是并不一定所有的企业都会立即采用；</li><li>新版本的发布不代表老版本已经一无是处，版本的迭代更新是一个必然发展状态，但它会带动起来一些周边的生态发展。</li></ul><h3 id="快速体验-composition-apis" tabindex="-1">快速体验 Composition APIs <a class="header-anchor" href="#快速体验-composition-apis" aria-label="Permalink to &quot;快速体验 Composition APIs&quot;">​</a></h3><h4 id="vs-options-apis" tabindex="-1">vs. Options APIs <a class="header-anchor" href="#vs-options-apis" aria-label="Permalink to &quot;vs. Options APIs&quot;">​</a></h4><p>如下图所示：</p>',11),u=l('<p>Vue.js 3.0 核⼼优势：</p><ul><li>没有 this，没烦恼；</li><li>更好的类型推导能⼒（TypeScript）；</li><li>更友好的 Tree-shaking ⽀持（渐进式体验）；</li><li>更⼤的代码压缩空间；</li><li>更灵活的逻辑复⽤能⼒。</li></ul><h4 id="逻辑复用案例" tabindex="-1">逻辑复用案例 <a class="header-anchor" href="#逻辑复用案例" aria-label="Permalink to &quot;逻辑复用案例&quot;">​</a></h4><p>对于逻辑复用这块我们可以通过几个小案例来体会一下。</p><p><strong>案例一、常用功能性状态复用：</strong></p>',5),h=e("p",null,[e("strong",null,"案例二、获取数据逻辑复用：")],-1),_=e("p",null,[e("strong",null,"案例三、BOM API 封装：")],-1),g=e("h3",{id:"基于-webpack-构建",tabindex:"-1"},[a("基于 Webpack 构建 "),e("a",{class:"header-anchor",href:"#基于-webpack-构建","aria-label":'Permalink to "基于 Webpack 构建"'},"​")],-1),d=e("p",null,"由于 Vue CLI 自身还没有很好的支持 Vue.js 3.0 版本，所以对于 3.0 项目的构建，我们还是需要直接使用 Webpack 构建。这里我们分享一个基于 Webpack 构建 Vue.js 3.0 的基本操作。",-1),m=e("p",null,"以下是具体命令行操作：",-1),v=l(`<p>项目结构设计如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">└─ vue</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">next</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">sample ····························· project root </span></span>
<span class="line"><span style="color:#E1E4E8;">   ├─ public ··································· static dir </span></span>
<span class="line"><span style="color:#E1E4E8;">   │  └─ index.html ···························· index template </span></span>
<span class="line"><span style="color:#E1E4E8;">   ├─ src ······································ source dir </span></span>
<span class="line"><span style="color:#E1E4E8;">   │  ├─ App.vue ······························· root </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;"> (sfc) </span></span>
<span class="line"><span style="color:#E1E4E8;">   │  └─ main.js ······························· app entry </span></span>
<span class="line"><span style="color:#E1E4E8;">   ├─ package.json ····························· </span><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> file </span></span>
<span class="line"><span style="color:#E1E4E8;">   └─ webpack.config.js ························ webpack config</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">└─ vue</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">next</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">sample ····························· project root </span></span>
<span class="line"><span style="color:#24292E;">   ├─ public ··································· static dir </span></span>
<span class="line"><span style="color:#24292E;">   │  └─ index.html ···························· index template </span></span>
<span class="line"><span style="color:#24292E;">   ├─ src ······································ source dir </span></span>
<span class="line"><span style="color:#24292E;">   │  ├─ App.vue ······························· root </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;"> (sfc) </span></span>
<span class="line"><span style="color:#24292E;">   │  └─ main.js ······························· app entry </span></span>
<span class="line"><span style="color:#24292E;">   ├─ package.json ····························· </span><span style="color:#D73A49;">package</span><span style="color:#24292E;"> file </span></span>
<span class="line"><span style="color:#24292E;">   └─ webpack.config.js ························ webpack config</span></span></code></pre></div><p>其中 Webpack 的核心配置如下：</p>`,3),b=e("h3",{id:"基于-vue-cli-experimental",tabindex:"-1"},[a("基于 Vue CLI experimental "),e("a",{class:"header-anchor",href:"#基于-vue-cli-experimental","aria-label":'Permalink to "基于 Vue CLI experimental"'},"​")],-1),A=e("p",null,[a("Vue CLI 对 Vue.js 3.0 的支持目前是以一个"),e("a",{href:"https://github.com/vuejs/vue-cli-plugin-vue-next",target:"_blank",rel:"noreferrer"},"插件（vue-cli-plugin-vue-next）"),a("的形式实现的，目前属于实验阶段（experimental）。")],-1),f=e("p",null,"具体使用方法如下：",-1),E=l('<p>这里你需要注意，千万不要在成熟项⽬中使⽤这个插件直接升级项目，这会导致很多问题，后面 Vue 官方会给出 2.x 项目升级到 3.0 的迁移工具，到时候再视情况决定是否使用。</p><h3 id="结合-official-libraries" tabindex="-1">结合 Official Libraries <a class="header-anchor" href="#结合-official-libraries" aria-label="Permalink to &quot;结合 Official Libraries&quot;">​</a></h3><p>最后这一块内容是关于官方的几个库的最新版本，以及如何去结合 Vue.js 3.0 使用：</p><h4 id="vue-router" tabindex="-1">Vue Router <a class="header-anchor" href="#vue-router" aria-label="Permalink to &quot;Vue Router&quot;">​</a></h4><p><a href="https://github.com/vuejs/vue-router-next" target="_blank" rel="noreferrer">vue-router</a> 一直以来是使用 Vue.js 开发 SPA 类型应用必不可少的，针对 3.0，vue-router 也有一些调整。</p><p>注册（定义）路由的用法：</p>',6),k=e("p",null,"组件中获取当前路由信息的方法：",-1),x=e("h4",{id:"vuex",tabindex:"-1"},[a("Vuex "),e("a",{class:"header-anchor",href:"#vuex","aria-label":'Permalink to "Vuex"'},"​")],-1),V=e("p",null,[a("对于 "),e("a",{href:"https://github.com/vuejs/vuex/tree/4.0",target:"_blank",rel:"noreferrer"},"Vuex"),a("，API 改动是最小的，基本上没有什么变化。")],-1),j=e("p",null,"创建 Store 的方法：",-1),C=e("p",null,"组件中使用 Store 的方式一（跟 2.x 一样）：",-1),y=e("p",null,"方式二，使用 useStore API（推荐）：",-1),P=l('<p>除此之外，Vue.js 官方还给出了目前官方的一些周边库的状态，下表为：Official Libraries Vue 3.0 Support Status</p><table><thead><tr><th>Project</th><th>Status</th></tr></thead><tbody><tr><td>vue-router</td><td>Alpha <a href="https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Aopen+label%3Arouter" target="_blank" rel="noreferrer">[Proposed RFCs]</a> <a href="https://github.com/vuejs/vue-router-next" target="_blank" rel="noreferrer">[GitHub]</a> <a href="https://unpkg.com/browse/vue-router@4.0.0-alpha.7/" target="_blank" rel="noreferrer">[npm]</a></td></tr><tr><td>vuex</td><td>Alpha, with same API <a href="https://github.com/vuejs/vuex/tree/4.0" target="_blank" rel="noreferrer">[GitHub]</a> <a href="https://unpkg.com/browse/vuex@4.0.0-alpha.1/" target="_blank" rel="noreferrer">[npm]</a></td></tr><tr><td>vue-class-component</td><td>Alpha <a href="https://github.com/vuejs/vue-class-component/tree/next" target="_blank" rel="noreferrer">[GitHub]</a> <a href="https://unpkg.com/browse/vue-class-component@8.0.0-alpha.2/" target="_blank" rel="noreferrer">[npm]</a></td></tr><tr><td>vue-cli</td><td>Experimental support via vue-cli-plugin-vue-next</td></tr><tr><td>eslint-plugin-vue</td><td>Alpha <a href="https://github.com/vuejs/eslint-plugin-vue" target="_blank" rel="noreferrer">[GitHub]</a> <a href="https://unpkg.com/browse/eslint-plugin-vue@7.0.0-alpha.0/" target="_blank" rel="noreferrer">[npm]</a></td></tr><tr><td>vue-test-utils</td><td>Pre-alpha <a href="https://github.com/vuejs/vue-test-utils-next" target="_blank" rel="noreferrer">[GitHub]</a> <a href="https://www.npmjs.com/package/@vue/test-utils" target="_blank" rel="noreferrer">[npm]</a></td></tr><tr><td>vue-devtools</td><td>WIP</td></tr><tr><td>jsx</td><td>WIP</td></tr></tbody></table>',2);function T(I,q,D,S,F,w){const t=p("Image");return r(),o("div",null,[c,s(t,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/CgqCHl6v6kKAEB86AANiAJDnjVQ357.png"}),a(),u,s(t,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/CgqCHl6v6kyASlkDAAENklOYlj0705.png"}),a(),h,s(t,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/CgqCHl6v6mOAcMILAAD_9U0vYHo031.png"}),a(),_,s(t,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/Ciqc1F6v6myAQliaAAHwBa16R38975.png"}),a(),g,d,m,s(t,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/Ciqc1F6v6nWAX5aTAANGepPtsvc770.png"}),a(),v,s(t,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/CgqCHl6v6oGAeKLEAANJ8E2ZEDA820.png"}),a(),b,A,f,s(t,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/CgqCHl6v6omAOOrAAAIRJLu2wak852.png"}),a(),E,s(t,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/Ciqc1F6v6pKAaRIRAAHzDZjGLng133.png"}),a(),k,s(t,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/CgqCHl6v6p2AG_EpAAEJL03CUDk536.png"}),a(),x,V,j,s(t,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/Ciqc1F6v6qeAJtdfAAFPEAP3Tos147.png"}),a(),C,s(t,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/CgqCHl6v6q6Af8R9AAFcCB1sJGY955.png"}),a(),y,s(t,{alt:"image (11).png",src:"https://s0.lgstatic.com/i/image/M00/01/FD/Ciqc1F6v6raAHqIEAAJm6pO4Vnw344.png"}),a(),P])}const M=n(i,[["render",T]]);export{L as __pageData,M as default};

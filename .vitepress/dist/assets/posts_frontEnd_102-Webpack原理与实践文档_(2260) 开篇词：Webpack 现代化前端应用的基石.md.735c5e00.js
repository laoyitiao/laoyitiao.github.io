import{_ as p,j as t,o,g as c,k as r,h as k,Q as e}from"./chunks/framework.a0d18f64.js";const f=JSON.parse('{"title":"开篇词：Webpack现代化前端应用的基石","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/102-Webpack原理与实践文档/(2260) 开篇词：Webpack 现代化前端应用的基石.md","filePath":"posts/frontEnd/102-Webpack原理与实践文档/(2260) 开篇词：Webpack 现代化前端应用的基石.md","lastUpdated":1696682708000}'),s={name:"posts/frontEnd/102-Webpack原理与实践文档/(2260) 开篇词：Webpack 现代化前端应用的基石.md"},b=e('<h1 id="开篇词-webpack现代化前端应用的基石" tabindex="-1">开篇词：Webpack现代化前端应用的基石 <a class="header-anchor" href="#开篇词-webpack现代化前端应用的基石" aria-label="Permalink to &quot;开篇词：Webpack现代化前端应用的基石&quot;">​</a></h1><p>你好，我是行痴，前端浸润十年，之前在一家电商企业任技术总监，主要负责 C 端产品开发和技术规划，后来躬身入局，投入前端技术研发与教学培训工作，希望通过技术去影响更多人。</p><p>经过最近几年的爆炸式发展，前端已经绝不再是简简单单的页面开发了，从早期只是配合后端&quot;切图&quot;，到现在已经能够独立驱动整个业务，这背后就需要引入更多的思想、框架和工具。比如：</p><ul><li><p>现阶段的大型应用就要求前端必须要有独立的项目，独立的项目想要有足够的效率就必须进行工程化。</p></li><li><p>具有复杂数据状态的应用开发过程就必须要有合适的框架，采用数据驱动开发的方式增强可维护性。</p></li><li><p>复杂项目结构必须进行模块化管理，一来提高部分公共内容的可复用性，二来增强团队并行协作能力。</p></li><li><p>重复规律性的工作必须采用自动化工具实现，一来提高效率，二来避免人为出错。</p></li></ul><p>这里的大多数问题现如今都有很成熟的解法，那我今天要跟你分享的主题就是其中最具有代表性的 Webpack。因为想要在现代化前端开发工作中有足够的开发效率，你一定离不开 Webpack 相关技术栈，不管是对于项目代码的模块化，还是一些规律性的重复工作，甚至是整个前端项目的工程化，Webpack 都能够帮你轻松搞定。</p><h3 id="webpack-提升前端生产力的利器" tabindex="-1">Webpack：提升前端生产力的利器 <a class="header-anchor" href="#webpack-提升前端生产力的利器" aria-label="Permalink to &quot;Webpack：提升前端生产力的利器&quot;">​</a></h3><p>我个人觉得 <strong>Webpack 应该是现代化前端开发的基石，也是目前前端生产力的代名词</strong>。</p><p>当然在日常工作中，确实有奉行&quot;够用就行&quot;工作态度的开发者，但我认为这是他们还没有意识到这些新技术新方案可能带来的成效。</p><p>最近正在招募一个前端研发团队，看了很多简历，也面试了很多前端开发者，发现基本上每一个人的简历上都洋洋洒洒写着 Vue.js、React 这样的主流框架，但是一旦问及使用这类框架进行开发时用到的一些基础设施，却开始支支吾吾，甚至直接表示&quot;我只要用官方 CLI 就好了啊&quot;。</p><p>确实，这些框架的官方推出这种高度集成的 CLI 工具，目的就是降低开发者的使用成本，但是对于一个优秀的开发人员而言，只会使用这种&quot;黑盒工具&quot;是远远不够的，因为这种&quot;黑盒工具&quot;大多数采用的都是通用的配置，而优秀的开发人员应该学会&quot;因地制宜&quot;，根据实际情况更灵活地去使用每一个工具。</p><p>当然，仔细想想，这个问题也好理解，毕竟很多前端开发者都是在这些框架和工具的成熟期（2017 年以后）才进入的这个行业，所以对它们背后的事情自然是要陌生一些。而我有幸经历了整个前端工程化工具生态的发展过程，加上在这之前很长的开发经历，所以对这个过程中诞生的工具和思想自然会理解地更为深刻。</p><p>我深知这些内容对你日常开发工作中解决问题能力的影响，很多开发者在日常工作中遇到问题不能快速地定位和解决，就是因为缺乏对这种底层或者基础的足够了解。因此，很多时候我会把对 Webpack 这类工具的认知程度，当作辨别开发人员优秀与否的分水岭。</p><h3 id="webpack-与模块化开发" tabindex="-1">Webpack 与模块化开发 <a class="header-anchor" href="#webpack-与模块化开发" aria-label="Permalink to &quot;Webpack 与模块化开发&quot;">​</a></h3><p>那说到 Webpack，就不得不提模块化开发，因为 Webpack 最早的出发点就是去实践前端方向的模块化开发。想要搞明白 Webpack，就先得搞明白它所要解决的问题，所以我这里先唠叨两句模块化的事情。</p><p>模块化，可以说是当下最重要的前端开发范式之一。<strong>随着前端应用的日益复杂化，我们的项目已经逐渐膨胀到了不得不花大量时间去管理的程度。而模块化就是一种最主流的项目组织方式，它通过把复杂的代码按照功能划分为不同的模块单独维护，从而提高开发效率、降低维护成本</strong>。</p>',15),i=e('<p>但是&quot;模块化&quot;，本身仅仅是一个思想或者说是一个理论，并不包含具体的实现。所以接下来，<strong>我们会一起学习如何使用 Webpack 在前端项目中实践模块化思想，以及目前行业中其他的一些优秀方案。</strong></p><p>可能你会问：Webpack 不应该是一个构建工具么？怎么还扯上了这么多东西？这也是目前绝大多数前端开发者都会有的疑问。你如果会有这种疑问，一多半还是因为你还不够了解 Webpack，或者所了解的内容还停留在表象层面。毕竟，Webpack 太强大了，强大到很容易让你忽略了它的本质。</p><p>Webpack 本质上仍然还是一个模块化打包工具，它通过&quot;万物皆模块&quot;这种设计思想，巧妙地实现了整个前端项目的模块化。在 Webpack 的理念中，前端项目中的任何资源都可以作为一个模块，任何模块都可以经过 Loader 机制的处理，最终再被打包到一起。</p><p>Webpack 本身的架构中有两个很核心的特性，分别是 Loader 机制和插件机制。正是因为它的插件机制形成了非常繁荣的生态，所以造就了它现在&quot;无所不能&quot;的现状，所以让 Webpack 慢慢发展成了现在很多前端开发者眼中的构建系统。</p><h3 id="我是如何设计这个专栏的" tabindex="-1">我是如何设计这个专栏的？ <a class="header-anchor" href="#我是如何设计这个专栏的" aria-label="Permalink to &quot;我是如何设计这个专栏的？&quot;">​</a></h3><p>如果你现在每天都只是在使用 Vue CLI 或者 create-react-app 这样高度集成的 CLI，面对特殊资源加载、打包过程优化、资源代码分块、Tree-shaking 这样相对复杂的需求无从下手；又或是你初入前端行业，只有一些简单的前端开发经验，我都诚意推荐你跟着这个专栏好好学习一下 Webpack 以及对前端模块的实践，这对你日后掌握 React 和 Vue.js 这类框架的高级用法非常有帮助。</p><p>专栏整体基于 Webpack 最新的 v4.42.1 版本展开，按照我一贯深入浅出、全面体系化的风格进行介绍，内容主要分为 4 个模块：</p><ul><li><p>Webpack 背景介绍：包括模块化所解决的问题、模块化标准的演进过程、ES Modules 标准规范。希望你通过这个模块，能够了解 Webpack 这类工具解决的到底是什么问题。</p></li><li><p>Webpack 核心特性：包括基本特性、配置方式、工作模式、基本工作原理、Loader 机制、插件机制。希望你学习完这个模块，能够完全掌握 Webpack 的基本使用，理解 Webpack 打包过程和打包结果的工作原理，同时也能够自己开发 Webpack 的 Loader 和插件。</p></li><li><p>Webpack 高阶内容：包括 Source Map、模块热替换（HMR）机制、Proxy、Webpack Dev Server 等周边技能的使用，以及 Tree-shaking、sideEffects、Code Spliting 等高级特性的实践，再有就是常用优化插件、三种 hash 的最佳实践、打包速度优化，以更于你能更熟练地使用 Webpack 的高级特性，为开发效率添砖加瓦。</p></li><li><p>其他同类优秀方案：Rollup、Parcel。希望通过这个模块的介绍，让你能够了解到一些 Webpack 同类的优秀方案，以及它们设计上的不同，这些都能够让你在工作中应对不同的项目、不同的需求时可以有更多的选择。</p></li></ul><p>这个专栏对你的知识储备要求不会太高，主要就是掌握 JavaScript 编程，了解一些 Node.js 基础，当然最好还能了解一些 Vue.js 之类主流框架的基本使用，这样可以帮助你更快速地定位我所描述的一些问题场景。</p><h3 id="写作最后" tabindex="-1">写作最后 <a class="header-anchor" href="#写作最后" aria-label="Permalink to &quot;写作最后&quot;">​</a></h3><p>最后，我还是想再次强调一个点：一个合格的前端开发者必须夯实基础，深入地理解所使用的技术，而不是浮于表面，保持&quot;够用就行&quot;的技术认知；在这之后，才是去丰富自己的技术栈。就好像我们经常说的，马步扎不稳，学会再多的招数也只是花拳绣腿。</p><p>相信经过这个专栏的学习，你一定可以更深度、更全面地认识 Webpack，建立对 Webpack 整体的知识体系，掌握自定义和扩展 Webpack 的方法和技巧，更高效地使用 Webpack 解决实际项目开发中的需求和问题。</p><p>此外，我也希望专栏中所提出的一些问题和思考能够引起你的注意，因为设计的动机和思想才是学习每一个技术的关键所在：只掌握技术的使用，你的理解可能只能达到 6～7 成；只有真正搞明白新事物为什么这么设计，才能做到一通百通。这也正是近几年，技术圈很多人经常吐槽&quot;学不动了&quot;的根本原因。</p><p>正所谓&quot;悟则通，通则达&quot;，单纯地学习前人的做法而不去思考为什么，你就永远只能做最&quot;累&quot;的人。特别是在技术日新月异的时代，所有人都在持续学习，只有掌握核心精髓，更快更忧，你才能跑得最远。</p><p>好的学习，需要实践，也需要沟通和反馈，欢迎你在留言区给我分享你的学习感悟，以及成长过程中的经验与成就。</p>',15);function _(l,n,u,W,d,h){const a=t("Image");return o(),c("div",null,[b,r(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/C6/Ciqah16YeJeAfoJGABkKafi2Mt4307.gif"}),k(),i])}const m=p(s,[["render",_]]);export{f as __pageData,m as default};

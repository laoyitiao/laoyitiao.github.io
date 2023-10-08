import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.a0d18f64.js";const w=JSON.parse('{"title":"第01讲：Webpack究竟解决了什么问题？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/102-Webpack原理与实践文档/(2261) 第01讲：Webpack 究竟解决了什么问题？.md","filePath":"posts/frontEnd/102-Webpack原理与实践文档/(2261) 第01讲：Webpack 究竟解决了什么问题？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/102-Webpack原理与实践文档/(2261) 第01讲：Webpack 究竟解决了什么问题？.md"},E=p("",43),y=s("p",null,"除此之外，Require.js 还提供了一个 require() 函数用于自动加载模块，用法与 define() 函数类似，区别在于 require() 只能用来载入模块，而 define() 还可以定义模块。当 Require.js 需要加载一个模块时，内部就会自动创建 script 标签去请求并执行相应模块的代码。",-1),i=s("p",null,"目前绝大多数第三方库都支持 AMD 规范，但是它使用起来相对复杂，而且当项目中模块划分过于细致时，就会出现同一个页面对 js 文件的请求次数过多的情况，从而导致效率降低。在当时的环境背景下，AMD 规范为前端模块化提供了一个标准，但这只是一种妥协的实现方式，并不能成为最终的解决方案。",-1),d=s("p",null,[a("同期出现的规范还有淘宝的 Sea.js，只不过它实现的是另外一个标准，叫作 CMD，这个标准类似于 CommonJS，在使用上基本和 Require.js 相同，可以算上是重复的轮子。但随着前端技术的发展，Sea.js 后来也被 Require.js 兼容了。如果你感兴趣可以课后了解一下 "),s("a",{href:"https://seajs.github.io/seajs/docs/",target:"_blank",rel:"noreferrer"},"Seajs官网"),a("。")],-1),u=s("h4",{id:"模块化的标准规范",tabindex:"-1"},[a("模块化的标准规范 "),s("a",{class:"header-anchor",href:"#模块化的标准规范","aria-label":'Permalink to "模块化的标准规范"'},"​")],-1),g=s("p",null,"尽管上面介绍的这些方式和标准都已经实现了模块化，但是都仍然存在一些让开发者难以接受的问题。",-1),h=s("p",null,"随着技术的发展，JavaScript 的标准逐渐走向完善，可以说，如今的前端模块化已经发展得非常成熟了，而且对前端模块化规范的最佳实践方式也基本实现了统一。",-1),m=s("ul",null,[s("li",null,"在 Node.js 环境中，我们遵循 CommonJS 规范来组织模块。"),s("li",null,"在浏览器环境中，我们遵循 ES Modules 规范。")],-1),F=p("",9),A=p("",6),b=s("ul",null,[s("li",null,"第二，能够将散落的模块再打包到一起，这样就解决了浏览器频繁请求模块文件的问题。这里需要注意，只是在开发阶段才需要模块化的文件划分，因为它能够帮我们更好地组织代码，到了实际运行阶段，这种划分就没有必要了。")],-1),D=s("ul",null,[s("li",null,"第三，它需要支持不同种类的前端模块类型，也就是说可以将开发过程中涉及的样式、图片、字体等所有资源文件都作为模块使用，这样我们就拥有了一个统一的模块化方案，所有资源文件的加载都可以通过代码控制，与业务代码统一维护，更为合理。")],-1),C=s("p",null,"针对上面第一、第二个设想，我们可以借助 Gulp 之类的构建系统配合一些编译工具和插件去实现，但是对于第三个可以对不同种类资源进行模块化的设想，就很难通过这种方式去解决了，所以就有了我们接下来要介绍的主题：前端模块打包工具。",-1),_=s("h3",{id:"写在最后",tabindex:"-1"},[a("写在最后 "),s("a",{class:"header-anchor",href:"#写在最后","aria-label":'Permalink to "写在最后"'},"​")],-1),k=s("p",null,"本课时重点介绍了前端模块化的发展过程和最终的统一的 ES Modules 标准，这些都是我们深入学习 Webpack 前必须要掌握的内容，同时也是现代前端开发者必不可少的基础储备，请你务必要掌握。",-1),v=s("p",null,[a("学到这里，你可能会有这样的疑问，本课时的内容是否偏离了主题？但其实我想传达的思想是，虽然 Webpack 发展到今天，它的功能已经非常强大了，但依然改变不了它是一个模块化解决方案的初衷。你可以看到， Webpack 官方的 Slogan 仍然是："),s("em",null,"A bundler for javascript and friends（一个 JavaScript 和周边的打包工具）"),a("。")],-1),q=s("p",null,'从另外一个角度来看，Webpack 从一个"打包工具"，发展成现在开发者眼中对整个前端项目的"构建系统"，表面上似乎只是称呼发生了变化，但是这背后却透露出来一个信号：模块化思想是非常伟大的，伟大到可以帮你"统治"前端整个项目。这也足以见得模块化思想背后还有很多值得我们思考的内容。',-1),j=s("p",null,[a('总的来说，我们可以把 Webpack 看作现代化前端应用的"管家"，这个"管家"所践行的核心理论就是"模块化"，也就是说 '),s("strong",null,"Webpack 以模块化思想为核心，帮助开发者更好的管理整个前端工程。")],-1);function B(f,S,M,W,T,I){const n=e("Image");return t(),c("div",null,[E,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/DC/Cgq2xl6YeWWAZhc-AAIVA96nDrk023.png"}),a(),y,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/97/CgoCgV6YeWWAZBOiAAFbOHcA3-o771.png"}),a(),i,d,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/C6/Ciqah16YeWWAHUDmAAI62LbE3vI465.png"}),a(),u,g,h,m,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/DC/Cgq2xl6YeWWAQftyAAFnRTB-PpI302.png"}),a(),F,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/97/CgoCgV6YeWaAN1caAAFPHLEZF0A908.png"}),a(),A,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/C6/Ciqah16YeWaAEqbZAAB2uMwv74E224.png"}),a(),b,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/97/CgoCgV6YeWaAHgm3AAB8JgXpadc131.png"}),a(),D,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/DC/Cgq2xl6YeWaARx0OAACCLDANJto655.png"}),a(),C,_,k,v,q,j])}const x=o(r,[["render",B]]);export{w as __pageData,x as default};

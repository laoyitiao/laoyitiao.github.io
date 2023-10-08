import{_ as r,j as i,o as s,g as o,k as t,h as a,Q as n,s as e}from"./chunks/framework.4e7d56ce.js";const X=JSON.parse('{"title":"11编译提效：如何为Webpack编译阶段提速？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/104-前端工程化精讲文档/(4425) 11  编译提效：如何为 Webpack 编译阶段提速？.md","filePath":"posts/frontEnd/104-前端工程化精讲文档/(4425) 11  编译提效：如何为 Webpack 编译阶段提速？.md","lastUpdated":1696682708000}'),p={name:"posts/frontEnd/104-前端工程化精讲文档/(4425) 11  编译提效：如何为 Webpack 编译阶段提速？.md"},c=n("",13),g=e("p",null,"但对于大多数情况而言，项目中只需要引入本国语言包即可。而 Webpack 提供的 IgnorePlugin 即可在构建模块时直接剔除那些需要被排除的模块，从而提升构建模块的速度，并减少产物体积，如下面的图片所示。",-1),d=e("p",null,"除了 moment 包以外，其他一些带有国际化模块的依赖包，例如之前介绍 Mock 工具中提到的 Faker.js 等都可以应用这一优化方式。",-1),h=e("h4",{id:"按需引入类库模块",tabindex:"-1"},[a("按需引入类库模块 "),e("a",{class:"header-anchor",href:"#按需引入类库模块","aria-label":'Permalink to "按需引入类库模块"'},"​")],-1),_=e("p",null,[a("第二种典型的减少执行模块的方式是按需引入。这种方式一般适用于工具类库性质的依赖包的优化，典型例子是"),e("a",{href:"https://www.npmjs.com/package/lodash",target:"_blank",rel:"noreferrer"},"lodash"),a("依赖包。通常在项目里我们只用到了少数几个 lodash 的方法，但是构建时却发现构建时引入了整个依赖包，如下图所示：")],-1),m=e("p",null,"要解决这个问题，效果最佳的方式是在导入声明时只导入依赖包内的特定模块，这样就可以大大减少构建时间，以及产物的体积，如下图所示。",-1),u=n("",5),b=e("p",null,"而在通过 DllPlugin 和 DllReferencePlugin 分别配置后的构建时间就变成如下图所示，由于构建时减少了最耗时的模块，构建效率瞬间提升十倍。",-1),A=n("",4),k=e("h3",{id:"提升单个模块构建的速度",tabindex:"-1"},[a("提升单个模块构建的速度 "),e("a",{class:"header-anchor",href:"#提升单个模块构建的速度","aria-label":'Permalink to "提升单个模块构建的速度"'},"​")],-1),f=e("p",null,"提升编译阶段效率的第二个方向，是在保持构建模块数量不变的情况下，提升单个模块构建的速度。具体来说，是通过减少构建单个模块时的一些处理逻辑来提升速度。这个方向的优化主要有以下几种：",-1),C=e("h4",{id:"include-exclude",tabindex:"-1"},[a("include/exclude "),e("a",{class:"header-anchor",href:"#include-exclude","aria-label":'Permalink to "include/exclude"'},"​")],-1),D=e("p",null,"Webpack 加载器配置中的 include/exclude，是常用的优化特定模块构建速度的方式之一。",-1),P=e("p",null,"include 的用途是只对符合条件的模块使用指定 Loader 进行转换处理。而 exclude 则相反，不对特定条件的模块使用该 Loader（例如不使用 babel-loader 处理 node_modules 中的模块）。如下面两张图片所示。",-1),x=e("p",null,"这里有两点需要注意：",-1),w=e("ol",null,[e("li",null,[e("p",null,"从上面的第二张图中可以看到，jquery 和 lodash 的编译过程仍然花费了数百毫秒，说明通过 include/exclude 排除的模块，并非不进行编译，而是使用 Webpack 默认的 js 模块编译器进行编译（例如推断依赖包的模块类型，加上装饰代码等）。")]),e("li",null,[e("p",null,"在一个 loader 中的 include 与 exclude 配置存在冲突的情况下，优先使用 exclude 的配置，而忽略冲突的 include 部分的配置，具体可以参照示例代码中的 webpack.inexclude.config.js。")])],-1),T=e("h4",{id:"noparse",tabindex:"-1"},[a("noParse "),e("a",{class:"header-anchor",href:"#noparse","aria-label":'Permalink to "noParse"'},"​")],-1),E=e("p",null,"Webpack 配置中的 module.noParse 则是在上述 include/exclude 的基础上，进一步省略了使用默认 js 模块编译器进行编译的时间，如下面两张图片所示。",-1),q=e("h4",{id:"source-map",tabindex:"-1"},[a("Source Map "),e("a",{class:"header-anchor",href:"#source-map","aria-label":'Permalink to "Source Map"'},"​")],-1),S=e("p",null,'Source Map 对于构建时间的影响在第三课中已经展开讨论过，这里再稍做总结：对于生产环境的代码构建而言，会根据项目实际情况判断是否开启 Source Map。在开启 Source Map 的情况下，优先选择与源文件分离的类型，例如 "source-map"。有条件也可以配合错误监控系统，将 Source Map 的构建和使用在线下监控后台中进行，以提升普通构建部署流程的速度。',-1),I=e("h4",{id:"typescript-编译优化",tabindex:"-1"},[a("TypeScript 编译优化 "),e("a",{class:"header-anchor",href:"#typescript-编译优化","aria-label":'Permalink to "TypeScript 编译优化"'},"​")],-1),M=e("p",null,"Webpack 中编译 TS 有两种方式：使用 ts-loader 或使用 babel-loader。其中，在使用 ts-loader 时，由于 ts-loader 默认在编译前进行类型检查，因此编译时间往往比较慢，如下面的图片所示。",-1),y=e("p",null,"通过加上配置项 transpileOnly: true，可以在编译时忽略类型检查，从而大大提升 TS 模块的编译速度，如下面的图片所示。",-1),W=e("p",null,"而 babel-loader 则需要单独安装 @babel/preset-typescript 来支持编译 TS（Babel 7 之前的版本则还是需要使用 ts-loader）。babel-loader 的编译效率与上述 ts-loader 优化后的效率相当，如下面的图片所示。",-1),H=n("",5),F=n("",4),V=e("h4",{id:"parallel-webpack",tabindex:"-1"},[a("parallel-webpack "),e("a",{class:"header-anchor",href:"#parallel-webpack","aria-label":'Permalink to "parallel-webpack"'},"​")],-1),j=e("p",null,"并发构建的第二种场景是针对与多配置构建。Webpack 的配置文件可以是一个包含多个子配置对象的数组，在执行这类多配置构建时，默认串行执行，而通过 parallel-webpack，就能实现相关配置的并行处理。从下图的示例中可以看到，通过不同配置的并行构建，构建时长缩短了 30%：",-1),v=e("h3",{id:"总结",tabindex:"-1"},[a("总结 "),e("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),R=e("p",null,"这节课我们整理了 Webpack 构建中编译模块阶段的构建效率优化方案。对于这一阶段的构建效率优化可以分为三个方向：以减少执行构建的模块数量为目的的方向、以提升单个模块构建速度为目的的方向，以及通过并行构建以提升整体构建效率的方向。每个方向都包含了若干解决工具和配置。",-1),B=e("p",null,[a("今天课后的"),e("strong",null,"思考题是"),a("：你的项目中是否都用到了这些解决方案呢？希望你结合课程的内容，和所开发的项目中用到的优化方案进行对比，查漏补缺。如果有这个主题方面其他新的解决方案，也欢迎在留言区讨论分享。")],-1);function N(O,Q,L,Y,G,J){const l=i("Image");return s(),o("div",null,[c,t(l,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DA/CgqCHl9fIKaAFpvlAAFYNtxZyV0507.png"}),a(),g,t(l,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/4E/CF/Ciqc1F9fILCATdbnAABZJ_SBA-k160.png"}),a(),t(l,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DA/CgqCHl9fILaAS4hfAAEWkKJEE7E961.png"}),a(),d,h,_,t(l,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DA/CgqCHl9fIMWAfBHWAAD0TYKbsl8944.png"}),a(),m,t(l,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DA/CgqCHl9fIMyAfUzpAADukgQoyfw559.png"}),a(),u,t(l,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DA/CgqCHl9fIOSAYnmjAAFH8Ofyt34986.png"}),a(),b,t(l,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DA/CgqCHl9fIPOALYMeAAFQB_4TuTU987.png"}),a(),A,t(l,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/4E/CF/Ciqc1F9fIPiAJx62AAEEeJ5yROI594.png"}),a(),t(l,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/4E/CF/Ciqc1F9fIQSAAB3_AAD6KAV5S6M930.png"}),a(),k,f,C,D,P,t(l,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DA/CgqCHl9fIQmAVCu5AAH_1DmTw5Q884.png"}),a(),t(l,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DA/CgqCHl9fIRmAYw1PAAG8nEHHA1k680.png"}),a(),x,w,T,E,t(l,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DA/CgqCHl9fIR-AABfPAAGe7gdO_nc998.png"}),a(),t(l,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DA/CgqCHl9fIS2ARrYXAAFGpNGygsY433.png"}),a(),q,S,I,M,t(l,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/4E/CF/Ciqc1F9fITOAXQGlAAEcMk0PqdY814.png"}),a(),y,t(l,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/4E/CF/Ciqc1F9fITqAO9uoAAEDJx7jQcA803.png"}),a(),W,t(l,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DB/CgqCHl9fIUqAGSCpAAD9Llg28C8211.png"}),a(),H,t(l,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DB/CgqCHl9fIU-AGs1fAAErO09KCQg428.png"}),a(),t(l,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image/M00/4E/CF/Ciqc1F9fIWCAKxMyAAErVYo_MgQ418.png"}),a(),F,t(l,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DB/CgqCHl9fIWaAKvjDAAGxNVse3m4379.png"}),a(),t(l,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image/M00/4E/CF/Ciqc1F9fIXOAHx6XAAIyabhj3_g078.png"}),a(),V,j,t(l,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image/M00/4E/DB/CgqCHl9fIXuARXhnAADx6PzQuE0879.png"}),a(),t(l,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image/M00/4E/D0/Ciqc1F9fIbCAL6knAAEbXZ1tRpw256.png"}),a(),v,R,B])}const U=r(p,[["render",N]]);export{X as __pageData,U as default};

import{_ as o,j as t,o as e,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.a0d18f64.js";const J=JSON.parse('{"title":"第01讲：你真的熟悉HTML标签吗？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3171) 第01讲：你真的熟悉 HTML 标签吗？.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3171) 第01讲：你真的熟悉 HTML 标签吗？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/前端高手进阶_文档/(3171) 第01讲：你真的熟悉 HTML 标签吗？.md"},i=p("",25),E=p("",11),y=s("p",null,"其中，绿色的线表示执行解析 HTML ，蓝色的线表示请求文件，红色的线表示执行文件。",-1),h=s("p",null,'从图中可以得知，采用 3 种属性都能减少请求文件引起的阻塞时间，只有 defer 属性以及 type="module" 情况下能保证渲染引擎的优先执行，从而减少执行文件内容消耗的时间，让用户更快地看见页面（即使这些页面内容可能并没有完全地显示）。',-1),d=s("p",null,"除此之外还应当注意，当渲染引擎解析 HTML 遇到 script 标签引入文件时，会立即进行一次渲染。所以这也就是为什么构建工具会把编译好的引用 JavaScript 代码的 script 标签放入到 body 标签底部，因为当渲染引擎执行到 body 底部时会先将已解析的内容渲染出来，然后再去请求相应的 JavaScript 文件。如果是内联脚本（即不通过 src 属性引用外部脚本文件直接在 HTML 编写 JavaScript 代码的形式），渲染引擎则不会渲染。",-1),u=s("h4",{id:"link-标签-通过预处理提升渲染速度",tabindex:"-1"},[a("link 标签：通过预处理提升渲染速度 "),s("a",{class:"header-anchor",href:"#link-标签-通过预处理提升渲染速度","aria-label":'Permalink to "link 标签：通过预处理提升渲染速度"'},"​")],-1),_=s("p",null,"在我们对大型单页应用进行性能优化时，也许会用到按需懒加载的方式，来加载对应的模块，但如果能合理利用 link 标签的 rel 属性值来进行预加载，就能进一步提升渲染速度。",-1),g=s("ul",null,[s("li",null,[s("strong",null,"dns-prefetch"),a('。当 link 标签的 rel 属性值为"dns-prefetch"时，浏览器会对某个域名预先进行 DNS 解析并缓存。这样，当浏览器在请求同域名资源的时候，能省去从域名查询 IP 的过程，从而减少时间损耗。下图是淘宝网设置的 DNS 预解析。')])],-1),m=s("ul",null,[s("li",null,[s("p",null,[s("strong",null,"preconnect"),a("。让浏览器在一个 HTTP 请求正式发给服务器前预先执行一些操作，这包括 DNS 解析、TLS 协商、TCP 握手，通过消除往返延迟来为用户节省时间。")])]),s("li",null,[s("p",null,[s("strong",null,"prefetch/preload"),a("。两个值都是让浏览器预先下载并缓存某个资源，但不同的是，prefetch 可能会在浏览器忙时被忽略，而 preload 则是一定会被预先下载。")])]),s("li",null,[s("p",null,[s("strong",null,"prerender"),a("。浏览器不仅会加载资源，还会解析执行页面，进行预渲染。")])])],-1),F=s("p",null,"这几个属性值恰好反映了浏览器获取资源文件的过程，在这里我绘制了一个流程简图，方便你记忆。",-1),q=s("p",null,"浏览器获取资源文件的流程",-1),C=s("h3",{id:"搜索优化",tabindex:"-1"},[a("搜索优化 "),s("a",{class:"header-anchor",href:"#搜索优化","aria-label":'Permalink to "搜索优化"'},"​")],-1),A=s("p",null,"你所写的前端代码，除了要让浏览器更好执行，有时候也要考虑更方便其他程序（如搜索引擎）理解。合理地使用 meta 标签和 link 标签，恰好能让搜索引擎更好地理解和收录我们的页面。",-1),b=s("h4",{id:"meta-标签-提取关键信息",tabindex:"-1"},[a("meta 标签：提取关键信息 "),s("a",{class:"header-anchor",href:"#meta-标签-提取关键信息","aria-label":'Permalink to "meta 标签：提取关键信息"'},"​")],-1),k=s("p",null,"通过 meta 标签可以设置页面的描述信息，从而让搜索引擎更好地展示搜索结果。",-1),f=s("p",null,'例如，在百度中搜索"拉勾"，就会发现网站的描述信息，这些描述信息就是通过 meta 标签专门为搜索引擎设置的，目的是方便用户预览搜索到的结果。',-1),T=s("p",null,"为了让搜索引擎更好地识别页面，除了描述信息之外还可以使用关键字，这样即使页面其他地方没有包含搜索内容，也可以被搜索到（当然搜索引擎有自己的权重和算法，如果滥用关键字是会被降权的，比如 Google 引擎就会对堆砌大量相同关键词的网页进行惩罚，降低它被搜索到的权重）。",-1),v=s("p",null,'当我们搜索关键字"垂直互联网招聘"的时候搜索结果会显示拉勾网的信息，虽然显示的搜索内容上并没有看到"垂直互联网招聘"字样，这就是因为拉勾网页面中设置了这个关键字。',-1),P=p("",3),B=p("",8),D=s("p",null,"好了，前面我们说了 HTML5 标准的一些标签和属性，下面再延伸说一说基于 meta 标签扩展属性值实现的第三方协议------OGP（Open Graph Protocal，开放图表协议 ）。",-1),M=s("p",null,"OGP 是 Facebook 公司在 2010 年提出的，目的是通过增加文档信息来提升社交网页在被分享时的预览效果。你只需要在一些分享页面中添加一些 meta 标签及属性，支持 OGP 协议的社交网站就会在解析页面时生成丰富的预览信息，比如站点名称、网页作者、预览图片。具体预览效果会因各个网站而有所变化。",-1),S=s("p",null,"下面是微信文章支持 OGP 协议的代码，可以看到通过 meta 标签属性值声明了：网址、预览图片、描述信息、站点名称、网页类型和作者信息。",-1),H=p("",10);function L(x,I,N,O,V,R){const n=t("Image");return e(),c("div",null,[i,l(n,{alt:"categories.gif",src:"https://s0.lgstatic.com/i/image/M00/07/67/CgqCHl65LJGAR25PAAAXBLXRFXg133.gif"}),a(),E,l(n,{alt:"1583465393011-810652f489ca6136.png",src:"https://s0.lgstatic.com/i/image/M00/07/0E/Ciqc1F647iiAZx3cAAB1ewBzlh0431.png"}),a(),y,h,d,u,_,g,l(n,{alt:"1583466667742-993b502f80fa3567.png",src:"https://s0.lgstatic.com/i/image/M00/07/0E/Ciqc1F647jWAHmc_AAAiNGoHmY8154.png"}),a(),m,F,l(n,{alt:"1583470467405-1d2eb8baf7568d31.png",src:"https://s0.lgstatic.com/i/image/M00/07/0E/Ciqc1F647j-AFiBtAABWh7ld3uA965.png"}),a(),q,C,A,b,k,f,l(n,{alt:"1583481178981-737e6b76d555f457.png",src:"https://s0.lgstatic.com/i/image/M00/07/0F/Ciqc1F647kmAMJF6AABXM1K7WdY483.png"}),a(),T,v,l(n,{alt:"1583481543840-ce4f715602d1b084.png",src:"https://s0.lgstatic.com/i/image/M00/07/0F/Ciqc1F647lSAGbePAAEeMKqCVgw178.png"}),a(),P,l(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/07/0F/CgqCHl647l2Abd9XAAEL0O2drYw681.png"}),a(),B,l(n,{alt:"1583483633365-97ac0eb2d1c6d7d2.png",src:"https://s0.lgstatic.com/i/image/M00/07/68/Ciqc1F65LLeAZf33AAAvMXPozlk099.png"}),a(),D,M,S,l(n,{alt:"1583480543843-477274458e5be00b.png",src:"https://s0.lgstatic.com/i/image/M00/07/0F/CgqCHl647neAc1fJAACYggDXkeE601.png"}),a(),H])}const j=o(r,[["render",L]]);export{J as __pageData,j as default};

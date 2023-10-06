import{_ as l,j as p,o as e,g as t,k as a,s,h as r,Q as o}from"./chunks/framework.b3d8e22e.js";const b=JSON.parse('{"title":"路由方案的架构与实现 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6664) 11  功能组件：如何使用路由，支持多页面导航？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6664) 11  功能组件：如何使用路由，支持多页面导航？.md","lastUpdated":1696417798000}'),c={name:"posts/frontEnd/048_iOS开发进阶/(6664) 11  功能组件：如何使用路由，支持多页面导航？.md"},y=s("p",null,"随着 App 功能的不断丰富，以内容和体验为导向的导航模式变得越来越流行。这种导航模式的特点是一个页面可以导航到任意一个其他的页面。",-1),i=s("p",null,"比如在 iOS 里使用 UIKit 来实现导航功能时，源 ViewController 需要知道目标 ViewController 的类型信息，换句话说就是源 ViewController 必须直接依赖目标 ViewController。这会导致什么问题呢？如果 App的多个模块之间需要相互导航，那么它们之间就会产生循环依赖，如下图所示。",-1),E=s("p",null,"假如随着 Moments App 不断发展，除了朋友圈功能以外，我们还可能新增商城功能和实时通讯功能。当用户点击朋友圈信息的时候可以打开商品信息页面，当点击朋友头像时可以进入实时通讯页面。而在商品信息页面里面，用户还可以打开朋友圈页面进行分享。",-1),d=s("p",null,"这种模块之间的循环依赖会引起一系列的问题，比如因为代码强耦合，导致代码变得难以维护。如果不同功能由不同产品研发团队负责开发与维护，循环依赖还会增加很多的沟通成本，每次一点小改动都需要通知其他团队进行更新。",-1),g=s("p",null,"那么，有没有什么好的办法解决这种问题呢？",-1),u=s("h3",{id:"路由方案的架构与实现",tabindex:"-1"},[r("路由方案的架构与实现 "),s("a",{class:"header-anchor",href:"#路由方案的架构与实现","aria-label":'Permalink to "路由方案的架构与实现"'},"​")],-1),F=s("p",null,"我们可以使用一套基于 URL 的路由方案来解决多个模块之间的导航问题。下面是这套路由方案的架构图。",-1),C=o("",5),v=o("",32),A=o("",35),h=s("p",null,"当我们的 App 支持 Universal Links 以后，需要特别注意对路由的 URL 进行验证，否则会很容易被外部系统进行攻击。这些验证的手段包括不应该允许 Universal Links 更新或者删除数据，不允许 Universal Links 访问任何敏感数据。",-1),m=s("p",null,"思考题：",-1),B=s("blockquote",null,[s("p",null,"在软件开发中，只有合适的方案，没有完美的方案。基于 URL 的路有方案也有一些需要处理的难题，例如如何传递数组和大对象，请问你是怎样处理这些问题的呢？")],-1),w=s("p",null,"可以把回答写到下面的留言区哦，我们一起探讨一下。下一讲将介绍如何设置多语言支持。",-1);function D(T,U,f,_,S,V){const n=p("Image");return e(),t("div",null,[y,i,a(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/29/B3/CioPOWBhjTiAan3AAAGv59UQhFU067.png"}),E,d,g,u,F,a(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/29/B3/CioPOWBhjTGARlXPAAL0T-JWwPg795.png"}),C,a(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/29/B3/CioPOWBhjSCAPa5mAANi15SVPxc603.png"}),v,a(n,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/29/AB/Cgp9HWBhjQ6AQXGQAAOJFXHFOq8674.png"}),A,a(n,{alt:"思维导图+二维码.png",src:"https://s0.lgstatic.com/i/image6/M00/29/B2/Cgp9HWBhlPqAUXPUAATzGVdjazs511.png"}),h,m,B,w])}const N=l(c,[["render",D]]);export{b as __pageData,N as default};

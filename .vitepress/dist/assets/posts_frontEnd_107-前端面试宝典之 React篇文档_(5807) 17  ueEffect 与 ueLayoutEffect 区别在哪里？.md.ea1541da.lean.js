import{_ as o,j as e,o as t,g as c,k as a,s,Q as p,h as l}from"./chunks/framework.b3d8e22e.js";const N=JSON.parse('{"title":"审题 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/107-前端面试宝典之 React篇文档/(5807) 17  ueEffect 与 ueLayoutEffect 区别在哪里？.md","filePath":"posts/frontEnd/107-前端面试宝典之 React篇文档/(5807) 17  ueEffect 与 ueLayoutEffect 区别在哪里？.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/107-前端面试宝典之 React篇文档/(5807) 17  ueEffect 与 ueLayoutEffect 区别在哪里？.md"},E=p("",10),y=p("",26),i=p("",3),u=s("p",null,[l("虽然在实际的项目中，我们并不会这么粗暴地去调整组件样式，但这个案例足以说明两者的区别与使用场景。在 React 社区中最佳的实践是这样推荐的，大多数场景下可以直接使用"),s("strong",null,"useEffect"),l(" ，但是如果你的代码引起了页面闪烁，也就是引起了组件突然改变位置、颜色及其他效果等的情况下，就推荐使用"),s("strong",null,"useLayoutEffect"),l("来处理。那么总结起来就是如果有直接操作 DOM 样式或者引起 DOM 样式更新的场景更推荐使用 useLayoutEffect。")],-1),f=s("p",null,"那既然内部都是调用同一个函数，为什么会有这样的区别呢？在探讨这个问题时就需要从 Hooks 的设计原理说起了。",-1),d=s("p",null,[s("strong",null,"设计原理")],-1),F=s("p",null,"首先可以看下这个图：",-1),A=p("",7),g=s("h3",{id:"总结",tabindex:"-1"},[l("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),D=s("p",null,"本题仍然是一个讲区别的点，所以在整体思路上找相同与不同就可以。",-1),m=s("p",null,'这里还有一个很有意思的地方，React 的函数命名追求"望文生义"的效果，这里不是贬义，它在设计上就是希望你从名字猜出真实的作用。比如 componentDidMount、componentDidUpdate 等等虽然名字冗长，但容易理解。从 LayoutEffect 这样一个命名就能看出，它想解决的也就是页面布局的问题。',-1),h=s("p",null,"那么在实际的开发中，还有哪些你觉得不太容易理解的 Hooks？或者容易出错的 Hooks？不妨在留言区留言，我会与你一起交流讨论。",-1),v=s("p",null,"这一讲就到这了，在下一讲中，将主要介绍 React Hooks 的设计模式，到时见。",-1),_=s("hr",null,null,-1),q={href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},C=s("p",null,"《大前端高薪训练营》",-1),k=s("p",null,[l("对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击链接"),l("，快来领取！")],-1);function b(B,L,I,S,x,P){const n=e("Image");return t(),c("div",null,[E,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/90/3F/Ciqc1GAKhGuAeJVzAABnKbg5gv0029.png"}),y,a(n,{alt:"GIF1.gif",src:"https://s0.lgstatic.com/i/image2/M01/08/32/Cip5yGAKhLOADIYUAAIoKyWYNqU863.gif"}),i,a(n,{alt:"GIF2.gif",src:"https://s0.lgstatic.com/i/image2/M01/08/34/CgpVE2AKhLyANGs2AAIwo7CyA_E780.gif"}),u,f,d,F,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/08/34/CgpVE2AKhP6AFNRnAAB9M55aj8I408.png"}),A,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/08/32/Cip5yGAKhRCAX99HAAD0YKYP40c980.png"}),g,D,m,h,v,_,s("p",null,[s("a",q,[a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/72/94/Ciqc1F_EZ0eANc6tAASyC72ZqWw643.png"})])]),C,k])}const j=o(r,[["render",b]]);export{N as __pageData,j as default};

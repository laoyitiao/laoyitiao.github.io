import{_ as p,j as t,o as e,g as r,k as o,h as s,Q as l,s as n}from"./chunks/framework.cfb14fe0.js";const I=JSON.parse('{"title":"16原生跨平台技术：移动端跨平台到Flutter的技术变革","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/105-前端基础建设与架构文档/(5921) 16  原生跨平台技术：移动端跨平台到 Flutter 的技术变革.md","filePath":"posts/frontEnd/105-前端基础建设与架构文档/(5921) 16  原生跨平台技术：移动端跨平台到 Flutter 的技术变革.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/105-前端基础建设与架构文档/(5921) 16  原生跨平台技术：移动端跨平台到 Flutter 的技术变革.md"},y=l("",6),E=l("",11),F=l("",13),i=n("p",null,"WEEX 技术架构图",-1),C=n("p",null,"话题再回到 React Native，针对一些固有缺陷，React Native 进行了技术上的重构，我认为这是基于 OEM Hybrid 方案的 2.0 演进，下面我们进一步探究。",-1),u=n("h4",{id:"从-react-native-技术重构出发-分析原生跨平台技术栈方向",tabindex:"-1"},[s("从 React Native 技术重构出发，分析原生跨平台技术栈方向 "),n("a",{class:"header-anchor",href:"#从-react-native-技术重构出发-分析原生跨平台技术栈方向","aria-label":'Permalink to "从 React Native 技术重构出发，分析原生跨平台技术栈方向"'},"​")],-1),q=n("p",null,"上文我们提到，React Native 通过数据通信架起了 Web 和原生平台的桥梁，而这个数据通信方式是异步的。React 工程经理 Sophie Alpert 将这种异步通信方式称为 Asynchronous Bridge，这样的设计获得了线程隔离的便利，具备了尽可能的灵活性，但是这也意味着 JavaScript 逻辑与原生能力永远无法处在同一个时空，无法共享一个内存空间。",-1),B=n("p",null,"老架构图：",-1),d=n("p",null,"对比新的架构图：",-1),g=l("",12),D=n("p",null,"Flutter 工作原理图",-1),A=n("p",null,[s("Flutter 组件依靠自身高性能的渲染引擎进行视图的渲染。具体来说，每一个组件会被渲染在 Skia 上，Skia 是一个 2D 的绘图引擎库，具有跨平台特点。Skia 唯一需要的就是"),n("strong",null,"原生平台提供 Canvas 接口，实现绘制"),s("。我们再通过一个横向架构图来了解实现细节：")],-1),m=l("",11),h=n("p",null,"从下一讲开始，我们将进入核心框架原理与代码设计模式的学习，下一讲我们将从设计一个请求库需要考虑的问题出发，带你学习 axios 的设计思想。今天的内容到这里就要结束了，如果有任何疑问欢迎在留言区和我互动，我们下一讲再见！",-1);function v(S,b,f,w,_,T){const a=t("Image");return e(),r("div",null,[y,o(a,{alt:"Lark20210202-183723.png",src:"https://s0.lgstatic.com/i/image/M00/94/AD/Ciqc1GAZK5OADuyQAAIWqX8rFbk913.png"}),s(),E,o(a,{alt:"Lark20210202-183726.png",src:"https://s0.lgstatic.com/i/image/M00/94/AD/Ciqc1GAZK5-ASl0rAAMYrAXB4Po374.png"}),s(),F,o(a,{alt:"Lark20210202-183709.png",src:"https://s0.lgstatic.com/i/image/M00/94/AD/Ciqc1GAZK82AKeB3AADlYd3QMbY205.png"}),s(),i,C,u,q,B,o(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/94/8A/Ciqc1GAYzjeAD4rFAAxfnuLVOGI871.png"}),s(),d,o(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/94/95/CgqCHmAYzj-ANDk6AAyPBuKOtmk965.png"}),s(),g,o(a,{alt:"Lark20210202-183731.png",src:"https://s0.lgstatic.com/i/image/M00/94/AD/Ciqc1GAZK76AWfZpAApvFObEYiY127.png"}),s(),D,A,o(a,{alt:"Lark20210202-183729.png",src:"https://s0.lgstatic.com/i/image/M00/94/AD/Ciqc1GAZK9iAVaYlAAna3hqvMhs586.png"}),s(),m,o(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/94/8A/Ciqc1GAYznaAGKheAAH7M50bq2I025.png"}),s(),h])}const J=p(c,[["render",v]]);export{I as __pageData,J as default};

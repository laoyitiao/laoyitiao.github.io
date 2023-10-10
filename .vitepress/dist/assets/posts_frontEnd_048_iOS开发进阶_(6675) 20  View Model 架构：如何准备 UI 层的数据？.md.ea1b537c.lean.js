import{_ as o,j as e,o as t,g as c,k as a,h as s,s as p,Q as l}from"./chunks/framework.cfb14fe0.js";const T=JSON.parse('{"title":"20ViewModel架构：如何准备UI层的数据？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6675) 20  View Model 架构：如何准备 UI 层的数据？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6675) 20  View Model 架构：如何准备 UI 层的数据？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6675) 20  View Model 架构：如何准备 UI 层的数据？.md"},E=p("h1",{id:"_20viewmodel架构-如何准备ui层的数据",tabindex:"-1"},[s("20ViewModel架构：如何准备UI层的数据？ "),p("a",{class:"header-anchor",href:"#_20viewmodel架构-如何准备ui层的数据","aria-label":'Permalink to "20ViewModel架构：如何准备UI层的数据？"'},"​")],-1),y=p("p",null,"UI 是 App 的重要组成部分，因为所有 App 都必须呈现 UI，并接收用户的事件。为了让 UI 能正确显示，我们需要把 Model 数据进行转换。例如，当我们显示图片的时候，需要把字符串类型的 URL 转换成 iOS 所支持 URL 类型；当显示时间信息时，需要把 UTC 时间值转换成设备所在的时区。",-1),i=p("p",null,"不过存在一个问题，如果我们把所有类型转换的逻辑都放在 UI/View 层里面，作为 View 层的 View Controller 往往会变得越来越臃肿。 为了避免这一情况，我使用了 MVVM 模式和 RxSwift 来架构 Moments App。MVVM 模式的核心部分是 ViewModel 模块，主要用于把 Model 转换成 UI/View 层所需的数据。为了简化转换的工作，我使用了 RxSwift 的操作符（Operator）。",-1),d=p("p",null,"所以，在这一讲中，我会和你介绍下 ViewModel 模式是怎样工作的，以及如何使用 RxSwift 里常用的操作符。",-1),F=p("h3",{id:"viewmodel-模式的架构",tabindex:"-1"},[s("ViewModel 模式的架构 "),p("a",{class:"header-anchor",href:"#viewmodel-模式的架构","aria-label":'Permalink to "ViewModel 模式的架构"'},"​")],-1),C=p("p",null,"首先我们以朋友圈功能为例，看看 ViewModel 模式的架构图。",-1),g=l("",40),u=l("",3),b=l("",6),m=l("",4),B=l("",7),h=l("",5),v=l("",4),_=l("",4),f=l("",4),D=l("",6),A=l("",12);function w(M,S,I,V,k,x){const n=e("Image");return t(),c("div",null,[E,y,i,d,F,C,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/0F/CioPOWCH7COAXcMTAAPT7Gr7yvg197.png"}),s(),g,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/06/Cgp9HWCH7E6AcOAxAAD0m4P1ZAs382.png"}),s(),u,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/06/Cgp9HWCH7Q-AVcVjAAEFCx3nsK4458.png"}),s(),b,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/07/Cgp9HWCH7R6ASEB0AAD5Z_BYeoQ092.png"}),s(),m,a(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/0F/CioPOWCH7SeAfVeYAAEfEP1ULSY822.png"}),s(),B,a(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/0F/CioPOWCH7TKAWC3hAAEPlMCt_uM223.png"}),s(),h,a(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/0F/CioPOWCH7USAKIvoAADtwXiN318148.png"}),s(),v,a(n,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/0F/CioPOWCH7VeAeMD5AACnQDe-5Nk532.png"}),s(),_,a(n,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/0F/CioPOWCH7W6AOGypAAEmk4CaMh0083.png"}),s(),f,a(n,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/0F/CioPOWCH7X6AJXQvAAEo9AcsIGo039.png"}),s(),D,a(n,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/9B/Cgp9HWCLocCASVLAAAEE-3Z6-aU135.png"}),s(),A])}const U=o(r,[["render",w]]);export{T as __pageData,U as default};

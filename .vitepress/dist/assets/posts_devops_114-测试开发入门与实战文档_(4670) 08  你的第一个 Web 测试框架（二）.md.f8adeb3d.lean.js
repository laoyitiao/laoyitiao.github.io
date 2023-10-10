import{_ as o,j as e,o as t,g as r,k as p,h as n,s,Q as l}from"./chunks/framework.cfb14fe0.js";const T=JSON.parse('{"title":"08你的第一个Web测试框架（二）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4670) 08  你的第一个 Web 测试框架（二）.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4670) 08  你的第一个 Web 测试框架（二）.md","lastUpdated":1696682708000}'),c={name:"posts/devops/114-测试开发入门与实战文档/(4670) 08  你的第一个 Web 测试框架（二）.md"},y=s("h1",{id:"_08你的第一个web测试框架-二",tabindex:"-1"},[n("08你的第一个Web测试框架（二） "),s("a",{class:"header-anchor",href:"#_08你的第一个web测试框架-二","aria-label":'Permalink to "08你的第一个Web测试框架（二）"'},"​")],-1),E=s("p",null,"通过上一课时的学习，你对 unittest 已经有了一定的认知，这节课我将正式带你搭建 Web 测试框架。",-1),i=s("p",null,"你可以通过下图，对上节课内容进行更清晰的回顾。",-1),_=s("h3",{id:"实践出真知-创建-web-测试框架雏形",tabindex:"-1"},[n("实践出真知------创建 Web 测试框架雏形 "),s("a",{class:"header-anchor",href:"#实践出真知-创建-web-测试框架雏形","aria-label":'Permalink to "实践出真知------创建 Web 测试框架雏形"'},"​")],-1),F=s("p",null,"Web 自动化测试，由于其对应于测试金字塔的 UI 层，所以也常被称为 UI 自动化测试，指的是使用代码模拟真实用户视角，以自动化的方式去执行业务操作，以及进行操作后的检查这样一个过程。",-1),u=s("p",null,"既然是 Web 自动化测试，必然要依托浏览器执行。当前在 Web 自动化测试领域，Selenium/WebDriver 仍然是市场占有率最高的的一款 UI 自动化工具，所以本节课我们就采用 Selenium/WebDriver 来作为我们 Web 自动化测试框架中与浏览器打交道的工具。",-1),d=s("blockquote",null,[s("p",null,[n("其实 Cypress 已严重挑战了 Selenium/WebDriver 的市场霸主地位，并大有后来者居上趋势，想要更多地了解 Cypress 框架，你可以参考我的书"),s("a",{href:"https://item.jd.com/12647091.html",target:"_blank",rel:"noreferrer"},"《前端自动化测试框架 -- Cypress从入门到精通》"),n("。")])],-1),h=s("p",null,"而 unittest 框架是一个相对完整的框架，可以应对测试用例/测试用例集的生成、测试用例的执行、测试执行后的清理及测试报告，所以如下图所示，两者结合我们就有了 Web 自动化测试框架的雏形：",-1),C=l("",35),m=l("",12);function f(A,g,D,b,B,q){const a=e("Image");return t(),r("div",null,[y,E,i,p(a,{alt:"白底脑图.png",src:"https://s0.lgstatic.com/i/image/M00/5A/8A/CgqCHl94a_yAEfCPAADAcDmUSmw177.png"}),n(),_,F,u,d,h,p(a,{alt:"Screen Shot 2020-09-03 at 11.53.46 PM.png",src:"https://s0.lgstatic.com/i/image/M00/5A/32/CgqCHl90JvqAJ9cEAAA0xAZJW7Y126.png"}),n(),C,p(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/5A/32/CgqCHl90J2KARHGLAABWO-bepxA434.png"}),n(),m])}const k=o(c,[["render",f]]);export{T as __pageData,k as default};

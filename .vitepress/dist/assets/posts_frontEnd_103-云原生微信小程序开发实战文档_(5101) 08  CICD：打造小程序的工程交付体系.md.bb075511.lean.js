import{_ as a,j as n,o as r,g as s,k as l,h as e,Q as i,s as t}from"./chunks/framework.4e7d56ce.js";const G=JSON.parse('{"title":"08CICD：打造小程序的工程交付体系","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5101) 08  CICD：打造小程序的工程交付体系.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5101) 08  CICD：打造小程序的工程交付体系.md","lastUpdated":1696682708000}'),p={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5101) 08  CICD：打造小程序的工程交付体系.md"},g=i("",7),_=t("p",null,'它们被统称为精益原则，精益原则和敏捷开发有很多重合的地方，比如"消除浪费"与最小可行性产品的主旨类似、"尽快发布"与快速迭代的目标一致......事实上，LSD 本来就起源于敏捷社区，部分原则也是从敏捷开发思想中总结而来的。',-1),c=t("p",null,[e("而持续交付是遵循精益原则演变出的一种现实目标，它并不是一种固定的标准或方法，而是一种指导思想。为了实现持续交付不仅需要客观层面的技术平台和工具（比如任务管理平台、源码管理工具等），也依赖主观层面的规范，约束甚至人与人之间的组织关系（比如明确前后端的分工），"),t("strong",null,"所以接下来的内容会涉及技术与人两个角度。")],-1),h=t("p",null,[t("strong",null,"实现持续交付需要持续集成的底层支持。"),e(" 理论上，持续交付包括三个必要因素：持续集成、自动化测试和部署流水线。三者并不是顺序连接的独立环境，而是互相依赖。")],-1),u=t("p",null,[t("strong",null,"持续集成是一种比较模糊的定义（不以交付为目的），"),e(' 指的是每次代码的修改或提交都触发构建和测试，展开来讲又可分为代码版本控制、触发条件规范等细节（这些内容我们下文再讲）。然后代码经过自动化测试之后进入部署和发布环节，这一套完整的流程被称为"部署流水线"：')],-1),C=t("p",null,"部署流水线示意图",-1),d=t("p",null,[e("部署流水线的终点是发布，但是因为小程序的特殊机制，发布体验版或正式版本需要在微信公众平台的管理后台进行人工发布，所以小程序的部署流水线的终点只能是发布小程序的预览版，面向的人群要么是内部的团队，要么是小部分的内测用户，这两类用户都是以测试为目标，"),t("strong",null,'所以可以将小程序的持续交付理解为是"面向测试的"'),e("，通俗一点说就是，小程序的持续交付的产物是提供给测试使用的。")],-1),m=t("p",null,[e("理论上，持续集成最终的构建产出也是面向测试的，然而持续集成本身又包含了单元测试，根据06讲，宏观上前后端的自动化测试都可以理解为各自的单元测试，而微观上前后端各自的自动化测试又可以细分为单元测试、端到端测试和集成测试。这样再去理解小程序的持续交付体系，自动化测试便可以被归拢到持续集成中。"),t("strong",null,"经过调整后的小程序持续交付体系可归纳为下图：")],-1),b=i("",10),q=i("",15);function A(I,k,f,T,S,D){const o=n("Image");return r(),s("div",null,[g,l(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/71/1B/CgqCHl-86QCAdWI0AAAmB8kFuuA425.png"}),e(),_,c,h,u,l(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/71/1B/CgqCHl-86Q-AE10PAAA9cPsFpbA683.png"}),e(),C,d,m,l(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/71/1B/CgqCHl-86R2AI1r9AAA9jqOVRyc402.png"}),e(),b,l(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/71/1B/CgqCHl-86X6ABiuqAADXtSLQIZ4158.png"}),e(),q])}const v=a(p,[["render",A]]);export{G as __pageData,v as default};

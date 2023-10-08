import{_ as o,j as e,o as r,g as t,k as p,h as s,s as n,Q as l}from"./chunks/framework.a0d18f64.js";const B=JSON.parse('{"title":"10数据脱敏：如何确保敏感数据的安全访问？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3569) 10  数据脱敏：如何确保敏感数据的安全访问？.md","filePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3569) 10  数据脱敏：如何确保敏感数据的安全访问？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3569) 10  数据脱敏：如何确保敏感数据的安全访问？.md"},E=n("h1",{id:"_10数据脱敏-如何确保敏感数据的安全访问",tabindex:"-1"},[s("10数据脱敏：如何确保敏感数据的安全访问？ "),n("a",{class:"header-anchor",href:"#_10数据脱敏-如何确保敏感数据的安全访问","aria-label":'Permalink to "10数据脱敏：如何确保敏感数据的安全访问？"'},"​")],-1),y=n("p",null,"从今天开始，我们又将开始一个全新的主题：介绍 ShardingSphere 中的数据脱敏功能。所谓数据脱敏，是指对某些敏感信息通过脱敏规则进行数据转换，从而实现敏感隐私数据的可靠保护。在日常开发过程中，数据安全一直是一个非常重要和敏感的话题。相较传统的私有化部署方案，互联网应用对数据安全的要求更高，所涉及的范围也更广。根据不同行业和业务场景的属性，不同系统的敏感信息可能有所不同，但诸如身份证号、手机号、卡号、用户姓名、账号密码等个人信息一般都需要进行脱敏处理。",-1),i=n("h3",{id:"shardingsphere-如何抽象数据脱敏",tabindex:"-1"},[s("ShardingSphere 如何抽象数据脱敏？ "),n("a",{class:"header-anchor",href:"#shardingsphere-如何抽象数据脱敏","aria-label":'Permalink to "ShardingSphere 如何抽象数据脱敏？"'},"​")],-1),d=n("p",null,"数据脱敏从概念上讲比较容易理解，但在具体实现过程中存在很多方案。在介绍基于数据脱敏的具体开发过程之前，我们有必要先来梳理实现数据脱敏的抽象过程。这里，我将从敏感数据的存储方式、敏感数据的加解密过程以及在业务代码中嵌入加解密的过程这三个维度来抽象数据脱敏。",-1),u=l("",7),h=l("",8),g=l("",24),F=l("",10),_=n("p",null,"加密后的表数据结果",-1),m=n("p",null,"在这个过程中，ShardingSphere 会把原始的 SQL 语句转换为用于数据脱敏的目标语句：",-1),A=l("",8);function S(C,D,v,b,q,f){const a=e("Image");return r(),t("div",null,[E,y,i,d,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/33/60/CgqCHl8P-QmAA0bQAABWInFwGYE998.png"}),s(),u,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/33/60/CgqCHl8P-SWAcpV1AABNv8n4KHg426.png"}),s(),h,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/33/55/Ciqc1F8P-TaAd-1QAABkT9WjY8E581.png"}),s(),g,p(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/33/55/Ciqc1F8P-VqAZq9CAACLcF2qedw534.png"}),s(),F,p(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/33/60/CgqCHl8P-WeAZFtRAABT51HN_2s801.png"}),s(),_,m,p(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/33/55/Ciqc1F8P-W6AVpohAAA833UHvZE135.png"}),s(),A])}const T=o(c,[["render",S]]);export{B as __pageData,T as default};

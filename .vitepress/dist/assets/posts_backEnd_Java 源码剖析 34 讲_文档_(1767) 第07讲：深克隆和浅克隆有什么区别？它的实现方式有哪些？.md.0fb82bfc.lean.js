import{_ as l,j as o,o as e,g as t,k as p,h as n,s,Q as c}from"./chunks/framework.cfb14fe0.js";const S=JSON.parse('{"title":"第07讲：深克隆和浅克隆有什么区别？它的实现方式有哪些？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1767) 第07讲：深克隆和浅克隆有什么区别？它的实现方式有哪些？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1767) 第07讲：深克隆和浅克隆有什么区别？它的实现方式有哪些？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1767) 第07讲：深克隆和浅克隆有什么区别？它的实现方式有哪些？.md"},E=s("h1",{id:"第07讲-深克隆和浅克隆有什么区别-它的实现方式有哪些",tabindex:"-1"},[n("第07讲：深克隆和浅克隆有什么区别？它的实现方式有哪些？ "),s("a",{class:"header-anchor",href:"#第07讲-深克隆和浅克隆有什么区别-它的实现方式有哪些","aria-label":'Permalink to "第07讲：深克隆和浅克隆有什么区别？它的实现方式有哪些？"'},"​")],-1),y=s("p",null,"使用克隆可以为我们快速地构建出一个已有对象的副本，它属于 Java 基础的一部分，也是面试中常被问到的知识点之一。",-1),i=s("p",null,"我们本课时的面试题是，什么是浅克隆和深克隆？如何实现克隆？",-1),F=s("h3",{id:"典型回答",tabindex:"-1"},[n("典型回答 "),s("a",{class:"header-anchor",href:"#典型回答","aria-label":'Permalink to "典型回答"'},"​")],-1),d=s("p",null,[s("strong",null,"浅克隆"),n("（Shadow Clone）是把原型对象中成员变量为值类型的属性都复制给克隆对象，把原型对象中成员变量为引用类型的引用地址也复制给克隆对象，也就是原型对象中如果有成员变量为引用对象，则此引用对象的地址是共享给原型对象和克隆对象的。")],-1),A=s("p",null,"简单来说就是浅克隆只会复制原型对象，但不会复制它所引用的对象，如下图所示：",-1),D=s("p",null,[s("strong",null,"深克隆"),n("（Deep Clone）是将原型对象中的所有类型，无论是值类型还是引用类型，都复制一份给克隆对象，也就是说深克隆会把原型对象和原型对象所引用的对象，都复制一份给克隆对象，如下图所示：")],-1),u=c("",66);function g(C,h,b,v,m,B){const a=o("Image");return e(),t("div",null,[E,y,i,F,d,A,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/07/2A/Ciqah16EEHqAS-yBAACmrlSP9OU378.png"}),n(),D,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/07/2A/Ciqah16EEHqACOHEAAB2WjY2QEQ611.png"}),n(),u])}const P=l(r,[["render",g]]);export{S as __pageData,P as default};

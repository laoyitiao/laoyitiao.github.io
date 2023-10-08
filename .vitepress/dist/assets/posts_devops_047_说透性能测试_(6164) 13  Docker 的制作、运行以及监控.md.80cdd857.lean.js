import{_ as o,j as e,o as t,g as c,k as p,h as a,s,Q as l}from"./chunks/framework.a0d18f64.js";const v=JSON.parse('{"title":"13Docker的制作、运行以及监控","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6164) 13  Docker 的制作、运行以及监控.md","filePath":"posts/devops/047_说透性能测试/(6164) 13  Docker 的制作、运行以及监控.md","lastUpdated":1696682708000}'),r={name:"posts/devops/047_说透性能测试/(6164) 13  Docker 的制作、运行以及监控.md"},E=s("h1",{id:"_13docker的制作、运行以及监控",tabindex:"-1"},[a("13Docker的制作、运行以及监控 "),s("a",{class:"header-anchor",href:"#_13docker的制作、运行以及监控","aria-label":'Permalink to "13Docker的制作、运行以及监控"'},"​")],-1),y=s("p",null,"模块三主要讲解了不同层级的监控以及监控的方式，作为模块三的最后一讲，我将带你来学习 Docker 的制作、运行以及监控。对于很多测试来说，经常听到 Docker 容器，但自己好像又不是很熟悉，只是用相关命令去查询日志等，而对于为什么要使用 Docker 还不是特别清楚。其实 Docker 并不难学，有时候你只是差一个学习的切入点，这一讲我会从测试的使用层面带你学习下 Docker 的要点知识，希望作为一名测试的你，对 Docker 也不会再陌生。",-1),i=s("h3",{id:"为什么要使用-docker",tabindex:"-1"},[a("为什么要使用 Docker？ "),s("a",{class:"header-anchor",href:"#为什么要使用-docker","aria-label":'Permalink to "为什么要使用 Docker？"'},"​")],-1),F=s("p",null,"你可以回忆下 Docker 的图标（如图 1 所示），是不是像一条船上装了很多集装箱，其实这和Docker 的设计思想有关系，集装箱能解决什么问题呢？就是货物的隔离，如果我们把食物和化学品分别放在两个集装箱中用一艘轮船运走则无妨，但是你不可以把它们放在同一个集装箱中，其实对于 Docker 设计也是如此。",-1),d=s("p",null,[s("strong",null,"操作系统就相当于这艘轮船"),a("，上面可以有很多集装箱，即 Docker，你可以把 Docker 看作是独立的子环境，有独立的系统和应用，比如经常因为一些历史原因开发的多个模块依赖于不同的 JDK 版本，将这两个模块部署在一台 Linux 服务器上可能很容易出问题，但是如果以 Docker 的方式便很容易解决版本冲突的问题。")],-1),D=l("",35),C=l("",25);function A(g,k,u,h,B,b){const n=e("Image");return t(),c("div",null,[E,y,i,F,d,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/04/89/Cgp9HWAs40-AKWVUAAI_WngHwng787.png"}),a(),D,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/04/86/CioPOWAs5b6AZbO1AAAk45YQf-w768.png"}),a(),C])}const M=o(r,[["render",A]]);export{v as __pageData,M as default};

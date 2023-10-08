import{_ as o,j as e,o as t,g as c,k as n,h as s,Q as l,s as p}from"./chunks/framework.4e7d56ce.js";const I=JSON.parse('{"title":"20SpringBoot服务性能优化","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4197) 20  SpringBoot 服务性能优化.md","filePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4197) 20  SpringBoot 服务性能优化.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Java 性能优化实战 21 讲_文档/(4197) 20  SpringBoot 服务性能优化.md"},E=l("",9),y=l("",5),i=p("p",null,"如上图，我们通常使用 Grafana 进行监控数据的展示，使用 AlertManager 组件进行提前预警。这一部分的搭建工作不是我们的重点，感兴趣的同学可自行研究。",-1),g=p("p",null,"下图便是一张典型的监控图，可以看到 Redis 的缓存命中率等情况。",-1),d=l("",6),F=p("h3",{id:"优化思路",tabindex:"-1"},[s("优化思路 "),p("a",{class:"header-anchor",href:"#优化思路","aria-label":'Permalink to "优化思路"'},"​")],-1),C=p("p",null,"对一个普通的 Web 服务来说，我们来看一下，要访问到具体的数据，都要经历哪些主要的环节？",-1),h=p("p",null,"如下图，在浏览器中输入相应的域名，需要通过 DNS 解析到具体的 IP 地址上，为了保证高可用，我们的服务一般都会部署多份，然后使用 Nginx 做反向代理和负载均衡。",-1),u=l("",51),m=l("",13),A=p("p",null,"如上图，四个操作分散在三个不同的资源中。要想达到一致性，需要三个不同的资源 MySQL、MQ、ElasticSearch 进行统一协调。它们底层的协议，以及实现方式，都是不一样的，那就无法通过 Spring 提供的 Transaction 注解来解决，需要借助外部的组件来完成。",-1),v=p("p",null,"很多人都体验过，加入了一些保证一致性的代码，一压测，性能掉的惊掉下巴。分布式事务是性能杀手，因为它要使用额外的步骤去保证一致性，常用的方法有：两阶段提交方案、TCC、本地消息表、MQ 事务消息、分布式事务中间件等。",-1),B=l("",24);function D(b,_,k,S,f,q){const a=e("Image");return t(),c("div",null,[E,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/50/07/CgqCHl9htcuAAw51AAK0O_g_pbM862.png"}),s(),y,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/50/07/CgqCHl9htdiAO89HAAK1NRYCNZE604.png"}),s(),i,g,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4F/FB/Ciqc1F9htd-AXIKHAANYYdIDl6g753.png"}),s(),d,n(a,{alt:"2020-08-21 17-07-35.2020-08-21 17_12_29.gif",src:"https://s0.lgstatic.com/i/image/M00/4F/FC/Ciqc1F9htfOAN3G1AEK7W4TM0AU264.gif"}),s(),F,C,h,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/4F/FC/Ciqc1F9htgCAcdwGAAIVQmXnOPo885.png"}),s(),u,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/4F/FD/Ciqc1F9htwyARKqMAAgxG3QYe8A553.png"}),s(),m,n(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/50/08/CgqCHl9htvaAf1S-AAKlZCq3SXg275.png"}),s(),A,v,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/4F/FD/Ciqc1F9htx6ADeh6AAFoqvxy4eM753.png"}),s(),B])}const w=o(r,[["render",D]]);export{I as __pageData,w as default};

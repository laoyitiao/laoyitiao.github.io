import{_ as o,j as e,o as t,g as r,k as n,h as s,s as p,Q as l}from"./chunks/framework.4e7d56ce.js";const L=JSON.parse('{"title":"17DataSource为何物？加载过程是怎样的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4717) 17  DataSource 为何物？加载过程是怎样的？.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4717) 17  DataSource 为何物？加载过程是怎样的？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4717) 17  DataSource 为何物？加载过程是怎样的？.md"},E=p("h1",{id:"_17datasource为何物-加载过程是怎样的",tabindex:"-1"},[s("17DataSource为何物？加载过程是怎样的？ "),p("a",{class:"header-anchor",href:"#_17datasource为何物-加载过程是怎样的","aria-label":'Permalink to "17DataSource为何物？加载过程是怎样的？"'},"​")],-1),i=p("p",null,"最近几年 DataSource 越来越成熟，但当我们做开发的时候对 DataSource 的关心却越来越少，这是因为大多数情况都是利用 application.properties进行简单的数据源配置，项目就可以正常运行了。但是当我们想要解决一些原理性问题的时候，就需要用到 DataSource、连接池等基础知识了。",-1),y=p("p",null,"那么这一讲我将带你揭开 DataSource 的面纱，一起来了解它是什么、如何使用，以及最佳实践是什么呢？",-1),d=p("h3",{id:"数据源是什么",tabindex:"-1"},[s("数据源是什么？ "),p("a",{class:"header-anchor",href:"#数据源是什么","aria-label":'Permalink to "数据源是什么？"'},"​")],-1),u=p("p",null,"当我们用第三方工具去连接数据库（Mysql，Oracle 等）的时候，一般都会让我们选择数据源，如下图所示：",-1),g=p("p",null,"我们以 MySQL 为例，当选择 MySQL 的时候就会弹出如下图显示的界面：",-1),F=l("",7),m=l("",7),D=l("",8),C=l("",12),h=p("p",null,'同时，@ConfigurationProperties(prefix = "spring.datasource") 也告诉我们，application.properties 里面的 datasource 相关的公共配置可以以 spring.datasource 为开头，这样当启动的时候，DataSourceProperties 就会将 datasource 的一切配置自动加载进来。正如我们前面在 application.properties 里面的配置的一样，如下图所示：',-1),A=l("",10),S=l("",9),b=p("p",null,"2.当我们执行一个方法的时候，到底要在一个 MySQL 的 connection 上面执行哪些 SQL 呢？通过如下日志我们可以看得出来。",-1),v=l("",10),_=p("p",null,[s("当看到这些指标之后，我们就可以根据 Grafana 社区里面提供的 HikariCP 的监控 Dashboards 的配置文档地址："),p("a",{href:"https://grafana.com/grafana/dashboards/6083",target:"_blank",rel:"noreferrer"},"https://grafana.com/grafana/dashboards/6083"),s("，导入到我们自己的 Grafana 里面，可以通过图表看到如下界面：")],-1),k=l("",23),B=l("",6),f=l("",8),P=l("",5),q=l("",12);function T(x,N,I,H,j,w){const a=e("Image");return t(),r("div",null,[E,i,y,d,u,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/6A/2D/CgqCHl-o5UKAeKojAAMZoym4vVw887.png"}),s(),g,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6A/22/Ciqc1F-o5UuACyC4AAEVdHsmM98446.png"}),s(),F,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6A/2D/CgqCHl-o5VuAHBXrAAF5pvcL8BA769.png"}),s(),m,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/6A/2D/CgqCHl-o5W6AYziKAALhn9RPD2o391.png"}),s(),D,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/6A/22/Ciqc1F-o5XmADAK4AAC16V3GEqM205.png"}),s(),C,n(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/6A/22/Ciqc1F-o5Y6AJJGgAADB_oP_Er8606.png"}),s(),h,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/6A/2E/CgqCHl-o5ZWAC7oxAAIk-0v0OKA580.png"}),s(),A,n(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/6A/2E/CgqCHl-o5aqAP6m_AAHuix5hURo100.png"}),s(),S,n(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/6A/23/Ciqc1F-o5ciAb9jeAAR6M63p8e0177.png"}),s(),b,n(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/6A/2F/CgqCHl-o5dqAOiJCAAUvCxtwstQ913.png"}),s(),v,n(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/6A/2F/CgqCHl-o5euAFtXOAAI2DmhXYZQ057.png"}),s(),_,n(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/6A/24/Ciqc1F-o5giAf-jFAAIxax2K82w908.png"}),s(),k,n(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/6A/25/Ciqc1F-o5jmAeh2mAAB0yWE0YWY107.png"}),s(),B,n(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/6A/25/Ciqc1F-o5kiAbR_iAAAz6GG2wMk729.png"}),s(),f,n(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/6A/25/Ciqc1F-o5mSASabwAADWrC44gPw955.png"}),s(),P,n(a,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/6A/25/Ciqc1F-o5nSAUv1hAAJk2XpXe2k189.png"}),s(),q])}const G=o(c,[["render",T]]);export{L as __pageData,G as default};

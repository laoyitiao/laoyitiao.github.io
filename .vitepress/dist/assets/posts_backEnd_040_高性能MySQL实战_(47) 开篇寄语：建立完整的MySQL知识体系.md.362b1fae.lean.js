import{_ as e,j as n,o as i,g as _,k as s,h as t,Q as a,s as l}from"./chunks/framework.a0d18f64.js";const J=JSON.parse('{"title":"开篇寄语：建立完整的MySQL知识体系","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/040_高性能MySQL实战/(47) 开篇寄语：建立完整的MySQL知识体系.md","filePath":"posts/backEnd/040_高性能MySQL实战/(47) 开篇寄语：建立完整的MySQL知识体系.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/040_高性能MySQL实战/(47) 开篇寄语：建立完整的MySQL知识体系.md"},c=a("",9),p=l("br",null,null,-1),S=l("p",null,[l("strong",null,"学好 MySQL，做一个合格的互联网开发、运维、DBA")],-1),y=l("p",null,"由于互联网业务常常伴随着海量用户、高并发请求，对 MySQL 的性能、可用性都提出了很高的要求。所以如何利用 MySQL 来支撑互联网的海量数据和高并发请求已经是一个合格的互联网开发、运维、DBA 的必备技能。",-1),M=l("p",null,"我想通过这门课，让你掌握 MySQL 的底层运行机制，教你如何发挥 MySQL 的最佳性能、让你掌握 MySQL 在互联网应用领域的最佳实践，学会如何处理亿级业务数据和高并发请求。",-1),h=l("p",null,[l("strong",null,"如何高效学习 MySQL")],-1),Q=l("p",null,"为了能够使大家真正高效学好 MySQL，我们对整门课程做了精心的规划。下面来看一下这门课的整体设计。",-1),L=a("",6),d=l("h6",{id:"mysql-的重要地位",tabindex:"-1"},[l("strong",null,"MySQL 的重要地位"),t(),l("a",{class:"header-anchor",href:"#mysql-的重要地位","aria-label":'Permalink to "**MySQL 的重要地位**"'},"​")],-1),u=l("p",null,"而 MySQL 在整个数据库图谱中占有非常重要的地位。据全球著名分析公司 Gartner 提供的数据，已有超过 63% 的用户已经部署或者将要部署 MySQL。",-1),m=l("br",null,null,-1),g=l("p",null,"目前国内大部分互联网公司都选择 MySQL 数据库来支撑自己的业务，例如，你所熟知的腾讯、阿里、百度、头条、美团、滴滴、快手、携程、去哪儿网等等公司都有大规模的 MySQL 集群。",-1),A=l("h6",{id:"mysql-的主流分支",tabindex:"-1"},[l("strong",null,"MySQL 的主流分支"),t(),l("a",{class:"header-anchor",href:"#mysql-的主流分支","aria-label":'Permalink to "**MySQL 的主流分支**"'},"​")],-1),b=l("p",null,"如下图，来看一下 MySQL 的主流分支。MySQL 从最初的 1.0、3.1 到后来的 5.0，发生了各种各样的变化。被 Oracle 收购后，MySQL 的版本其实主要有几个分支，除了需要付费的 MySQL 企业版本，还有很多 MySQL 社区版本。",-1),q=a("",7),B=l("br",null,null,-1),k=l("p",null,"比方说最著名的删库跑路。在运维数据库的过程中，你如果不小心把库删掉了，进行什么操作才能实现最大的弥补，不至于做出跑路这种无奈之举，当然，跑路只是开玩笑而已。还有在碰到断电或者是主键冲突的时候，你该怎么办？数据库延迟了，你该怎么办？忘记了数据库密码，你该怎么办？还有MySQL大小写敏感得用什么样的策略，另外，表空间有碎片，你该怎么解决，或者说怎么去巡检，怎么查看表空间和表数据的碎片？等等，还有很多，这里就不详细展开了。",-1),C=l("p",null,"在后续的课程中，我会慢慢地教你把这些问题都解决掉，让你在今后的工作中碰到问题时，不至于束手无策。其实，大部分面试官都喜欢通过问自己过去踩过的坑，来考察被面试者解决问题的能力，所以学好本课程还可以让你在求职面试中，给人眼前一亮的感觉。",-1),f=l("h6",{id:"mysql-知识点全景图",tabindex:"-1"},[l("strong",null,"MySQL 知识点全景图"),t(),l("a",{class:"header-anchor",href:"#mysql-知识点全景图","aria-label":'Permalink to "**MySQL 知识点全景图**"'},"​")],-1),P=l("p",null,"另外，为了帮助大家理清学习思路，我整理了一个比较全面的 MySQL 知识点全景图如下，包括系统、网络、硬件、到性能优化、高可用、架构设计等等方面，这些知识点会贯穿整个课程。",-1),T=l("br",null,null,-1),I=l("p",null,"比如，优化包括数据库针对系统的优化，针对数据库本身参数的优化，针对SQL的优化，针对业务的优化等等。还有一个比较关键的点------InnoDB，因为一般使用 MySQL 都会使用 InnoDB 作为存储引擎，所以 InnoDB 有很多技术焦点和特性，需要你去学习和了解。另外就是数据库的复制、MySQL Replication，这也是经常会被面试官所考察的，包括复制的原理、复制的类型、各种复制之间的差异等等。还有就是从顶层来看，数据库的容量规划这么多，数据库的生态体系该怎么掌握，或者是怎么学习？等等，就不一一列举了。",-1),O=l("p",null,[l("strong",null,"好书推荐")],-1),x=l("p",null,'有句诗说的好"纸上得来终觉浅，绝知此事要躬行"。想要真正学好本门课，需要听课、看书、实践三手抓。',-1),E=l("p",null,"在讲课的过程中，我会推荐一些讲解技术要点的书籍，这里先列举一些。非常推荐的是《MySQL官方手册》，我希望你能至少通读一遍，最好是英文版，因为它原汁原味，讲解得也更加清晰。另外，我也推荐《MySQL运维内参》，里面详细介绍了MySQL运维中的很多痛点，同时也是分析了MySQL内核的一些知识。第三本是《MySQL 8 Cookbook》，这本书内容比较浅显，但对你掌握MySQL8的技术要点一定有所帮助。还有下面这几本书也建议你仔细看一遍。",-1),V=l("br",null,null,-1),D=l("p",null,"除此以外，想要把学到的知识转变为真正掌握的技能，最重要是上手实践。",-1),N=l("p",null,'下节课开始，我将带你把工作或面试中遇到的MySQL重难点各各击破，为了对正式学习作准备，给你留一个作业：按照本课时面试要点部分的提示，画一个"MySQL 知识体系图谱"思维导图。',-1),v=l("br",null,null,-1),R=l("br",null,null,-1);function G($,j,w,F,H,W){const o=n("Image");return i(),_("div",null,[c,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/66/CgotOV13fcSAVN-JAACBcfi-W-o479.png"}),t(),p,S,y,M,h,Q,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14lsGAVvSHAAKCwxf_FfY611.png"}),t(),L,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/DA/CgotOV14lsaAYAmXAATErxhTlj4672.png"}),t(),d,u,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14lsuAfEMDAAOahOKproU295.png"}),t(),m,g,A,b,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14ltCAN9k-AAQ_Fm7r2hs508.png"}),t(),q,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14ltSANuQ5AAS3xE9DkWY594.png"}),t(),B,k,C,f,P,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14lteAeN8fAAGRMPWGOx8609.png"}),t(),T,I,O,x,E,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/BB/CgoB5l14ltuAbmp8AAHpklwjkOA912.png"}),t(),V,D,N,v,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/55/CgotOV149kqAOobiAAHtOV8A2q8036.png"}),t(),R])}const K=e(r,[["render",G]]);export{J as __pageData,K as default};

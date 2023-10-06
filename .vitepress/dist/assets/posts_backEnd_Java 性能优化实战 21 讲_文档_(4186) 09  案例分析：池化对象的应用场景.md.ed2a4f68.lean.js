import{_ as p,j as e,o as t,g as c,k as a,Q as o,s,h as l}from"./chunks/framework.b3d8e22e.js";const B=JSON.parse('{"title":"公用池化包 Commons Pool 2.0 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4186) 09  案例分析：池化对象的应用场景.md","filePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4186) 09  案例分析：池化对象的应用场景.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Java 性能优化实战 21 讲_文档/(4186) 09  案例分析：池化对象的应用场景.md"},E=o("",8),y=s("p",null,[l("我们再来介绍一下对象的生成过程，如下图，对象在进行"),s("strong",null,"获取"),l("时，将首先尝试从对象池里拿出一个，如果对象池中没有空闲的对象，就使用工厂类提供的方法，生成一个新的。")],-1),i=o("",4),_=o("",5),F=o("",10),g=s("h3",{id:"数据库连接池-hikaricp",tabindex:"-1"},[l("数据库连接池 HikariCP "),s("a",{class:"header-anchor",href:"#数据库连接池-hikaricp","aria-label":'Permalink to "数据库连接池 HikariCP"'},"​")],-1),A=s("p",null,[s("strong",null,"HikariCP"),l(' 源于日语"光"的意思（和光速一样快），它是 SpringBoot 中默认的数据库连接池。数据库是我们工作中经常使用到的组件，针对数据库设计的客户端连接池是非常多的，它的设计原理与我们在本课时开头提到的基本一致，可以有效地减少数据库连接创建、销毁的资源消耗。')],-1),d=s("p",null,[l("同是连接池，它们的性能也是有差别的，下图是 HikariCP 官方的一张测试图，可以看到它优异的性能，官方的 JMH 测试代码见 "),s("a",{href:"https://github.com/brettwooldridge/HikariCP-benchmark",target:"_blank",rel:"noreferrer"},"Github"),l("，我也已经拷贝了一份到仓库中。")],-1),D=o("",9),T=o("",13),C=s("p",null,"平常的编码中，有很多类似的场景。比如 Http 连接池，Okhttp 和 Httpclient 就都提供了连接池的概念，你可以类比着去分析一下，关注点也是在连接大小和超时时间上；在底层的中间件，比如 RPC，也通常使用连接池技术加速资源获取，比如 Dubbo 连接池、 Feign 切换成 httppclient 的实现等技术。",-1),m=s("p",null,[l("你会发现，在不同资源层面的池化设计也是类似的。比如"),s("strong",null,"线程池"),l("，通过队列对任务进行了二层缓冲，提供了多样的拒绝策略等，线程池我们将在 12 课时进行介绍。线程池的这些特性，你同样可以借鉴到连接池技术中，用来缓解请求溢出，创建一些溢出策略。现实情况中，我们也会这么做。那么具体怎么做？有哪些做法？这部分内容就留给大家思考了，欢迎你在下方留言，与大家一起分享讨论，我也会针对你的思考进行一一点评。")],-1),h=s("p",null,"但无论以何种方式处理对象，让对象保持精简，提高它的复用度，都是我们的目标，所以下一课时，我将系统讲解大对象的复用和注意点。",-1);function I(u,v,L,S,b,P){const n=e("Image");return t(),c("div",null,[E,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/3F/D1/CgqCHl8xKV-AHSvoAAX4BkEi8aQ783.png"}),y,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/3F/C6/Ciqc1F8xKWWAfETQAAXjITHnnyY877.png"}),i,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/3F/D1/CgqCHl8xKYKAdvm7AADGC-6LsfE257.png"}),_,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/3F/D1/CgqCHl8xKZGAbtiiAABfuEZ8gwQ793.png"}),F,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/3F/C6/Ciqc1F8xKaCAP0c2AADCCnpuRd0416.png"}),g,A,d,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/3F/C6/Ciqc1F8xKamACdt4AAG6dLqMUDo898.png"}),D,a(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/3F/D1/CgqCHl8xKb-AaPAfAABFiMwiWmM309.png"}),T,a(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/3F/D1/CgqCHl8xKcyAVb5-AAHduSa-zPY995.png"}),C,m,h])}const U=p(r,[["render",I]]);export{B as __pageData,U as default};

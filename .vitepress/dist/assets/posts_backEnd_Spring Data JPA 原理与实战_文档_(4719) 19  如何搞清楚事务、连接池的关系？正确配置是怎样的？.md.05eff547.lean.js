import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.4e7d56ce.js";const X=JSON.parse('{"title":"19如何搞清楚事务、连接池的关系？正确配置是怎样的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4719) 19  如何搞清楚事务、连接池的关系？正确配置是怎样的？.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4719) 19  如何搞清楚事务、连接池的关系？正确配置是怎样的？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4719) 19  如何搞清楚事务、连接池的关系？正确配置是怎样的？.md"},E=p("",15),i=s("p",null,"查看一下数据库的事务隔离级别。",-1),y=s("p",null,"然后开启一个事务，查看一下 user_info 的数据，我们在 user_info 表里面插入了三条数据，如下图所示。",-1),g=s("p",null,[s("strong",null,"第二步：我们打开另外一个相同数据库的 DB 连接，删除一条数据，SQL 如下所示。")],-1),u=s("p",null,"当删除执行成功之后，我们可以开启第三个连接，看一下数据库里面确实少了一条 ID=1 的数据。那么这个时候我们再返回第一个连接，第二次执行 select * from user_info，如下图所示，查到的还是三条数据。这就是我们经常说的可重复读。",-1),d=p("",20),A=p("",9),F=s("p",null,"其他属性你基本上都可以知道是什么意思，下面重点说一下隔离级别和事务的传播机制。",-1),D=s("p",null,[s("strong",null,"隔离级别 Isolation isolation() default Isolation.DEFAULT"),a("：默认采用数据库的事务隔离级别。其中，Isolation 是个枚举值，基本和我们上面讲解的数据库隔离级别是一样的，如下图所示。")],-1),h=p("",13),_=s("p",null,"我们通过源码可以看到此类提供了一个关键 execute 方法，如下图所示。",-1),C=p("",20),T=p("",3),m=p("",5),v=s("p",null,"而在事务结束之后，它还会还原此链接的事务隔离级别，又如下图所示。",-1),b=s("p",null,"如果你明白了 MySQL 的事务原理的话，再通过日志分析可以很容易地理解 Spring 的事务原理。我们在日志里面能看到 MySQL 的事务执行过程，同样也能看到 Spring 的 TransactionImpl 的事务执行过程。这是什么原理呢？我们来详细分析一下。",-1),I=s("h3",{id:"spring-事务的实现原理",tabindex:"-1"},[a("Spring 事务的实现原理 "),s("a",{class:"header-anchor",href:"#spring-事务的实现原理","aria-label":'Permalink to "Spring 事务的实现原理"'},"​")],-1),f=s("p",null,"这里我重点介绍一下 @Transactional 的工作机制，这个主要是利用 Spring 的 AOP 原理，在加载所有类的时候，容器就会知道某些类需要对应地进行哪些 Interceptor 的处理。",-1),S=s("p",null,"例如我们所讲的 TransactionInterceptor，在启动的时候是怎么设置事务的、是什么样的处理机制，默认的代理机制又是什么样的呢？",-1),R=s("h4",{id:"spring-事务源码分析",tabindex:"-1"},[a("Spring 事务源码分析 "),s("a",{class:"header-anchor",href:"#spring-事务源码分析","aria-label":'Permalink to "Spring 事务源码分析"'},"​")],-1),B=s("p",null,"我们在 TransactionManagementConfigurationSelector 里面设置一个断点，就会知道代理的加载类 ProxyTransactionManagementConfiguration 对事务的处理机制。关键源码如下图所示。",-1),P=s("p",null,"而我们打开 ProxyTransactionManagementConfiguration 的话，就会加载 TransactionInterceptor 的处理类，关键源码如下图所示。",-1),q=s("p",null,"如果继续加载的话，里面就会加载带有 @Transactional 注解的类或者方法。关键源码如下图所示。",-1),k=p("",3),M=s("p",null,"如上图，我们可以知道 createTransactionIfNecessary 是用来判断是否需要创建事务的，有兴趣的话你可以点击进去看看，如下图所示。",-1),N=s("p",null,"我们继续往下面 debug 的话，就会找到创建事务的关键代码，它会通过调用 AbstractPlatformTransactionManager 里面的 startTransaction 方法开启事务，如下图所示。",-1),U=s("p",null,"然后我们就可以继续往下断点进行分析了。断点走到最后的时候，你就可以看到开启事务的时候，必须要从我们的数据源里面获得连接。看一下断点的栈信息，这里有几个关键的 debug 点。如下图所示。",-1),O=s("p",null,"其中，",-1),x=s("p",null,"第一处：是处理带 @Transactional 的注解的方法，利用 CGLIB 进行事务拦截处理；",-1),w=s("p",null,"第二处：是根据 Spring 的事务传播机制，来判断是用现有的事务，还是创建新的事务；",-1),Q=s("p",null,"第七处：是用来判断是否现有连接，如果有直接用，如果没有就从第八处的数据源里面的连接池中获取连接，第七处的关键代码如下。",-1),L=s("p",null,"到这里，我们介绍完了事务获得连接的关键时机，那么还需要知道它是在什么时间释放连接到连接池里面的。我们在 LogicalConnectionManagedImpl 的 releaseConnection 方法中设置一个断点，如下图所示。",-1),j=p("",13);function H(V,J,G,W,K,z){const n=e("Image");return t(),c("div",null,[E,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8D/Ciqc1F-uNb6AaokCAABai7wNSic586.png"}),a(),i,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8D/Ciqc1F-uNcWACz55AAAXUwrH98M528.png"}),a(),y,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8D/Ciqc1F-uNc2AScnZAACUKRe0XVg992.png"}),a(),g,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/6D/98/CgqCHl-uNdOAK6XEAABWb-OgKmE001.png"}),a(),u,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/6D/98/CgqCHl-uNdyAPJhDAACyY8j4U8k591.png"}),a(),d,l(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/6D/98/CgqCHl-uNeiAbqu7AAKkFEn3-98148.png"}),a(),A,l(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/6E/36/Ciqc1F-yC3-AP_fhAArdN5coRWQ007.png"}),a(),F,D,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8D/Ciqc1F-uNiKAcZFcAABWnGlal1Q227.png"}),a(),h,l(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/6D/98/CgqCHl-uNjSAdRhTAAD7wR2FY0Y574.png"}),a(),_,l(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/6D/98/CgqCHl-uNjqAQwCiAAFp_zAyVg4557.png"}),a(),C,l(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/6D/98/CgqCHl-uNm2ATrnOAABc0E8c02I350.png"}),a(),T,l(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8D/Ciqc1F-uNluAfXmfAAaGouAFSxo546.png"}),a(),m,l(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/6D/98/CgqCHl-uNn-APx9CAADQdW_irSE093.png"}),a(),v,l(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8D/Ciqc1F-uNoWAEDj7AAFt5sGd5LM165.png"}),a(),b,I,f,S,R,B,l(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8D/Ciqc1F-uNo2AInI6AAD3vfniJv8550.png"}),a(),P,l(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/6D/98/CgqCHl-uNpOAAxwDAAGlgl20cFA682.png"}),a(),q,l(n,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8D/Ciqc1F-uNpuAC0_7AAIneVB94HQ302.png"}),a(),k,l(n,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/6D/98/CgqCHl-uNqKAB-R6AAGkheoE3KM863.png"}),a(),M,l(n,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8D/Ciqc1F-uNqmAKf_kAAGFZTc6ZAY735.png"}),a(),N,l(n,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image/M00/6D/98/CgqCHl-uNq-AeshIAAI2vVdh7OM636.png"}),a(),U,l(n,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image/M00/6D/98/CgqCHl-uNraAaX3wAAH1QpBB_a8699.png"}),a(),O,x,w,Q,l(n,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8D/Ciqc1F-uNr6Ab1CwAADUuVBSiKY292.png"}),a(),L,l(n,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8D/Ciqc1F-uNsqAFKXjAACeh8P3Fcg501.png"}),a(),j])}const Z=o(r,[["render",H]]);export{X as __pageData,Z as default};

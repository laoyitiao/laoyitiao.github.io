import{_ as o,j as l,o as t,g as c,k as p,h as a,s,Q as e}from"./chunks/framework.a0d18f64.js";const x=JSON.parse('{"title":"第10讲：分布式锁有哪些应用场景和实现？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1909) 第10讲：分布式锁有哪些应用场景和实现？.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1909) 第10讲：分布式锁有哪些应用场景和实现？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1909) 第10讲：分布式锁有哪些应用场景和实现？.md"},E=s("h1",{id:"第10讲-分布式锁有哪些应用场景和实现",tabindex:"-1"},[a("第10讲：分布式锁有哪些应用场景和实现？ "),s("a",{class:"header-anchor",href:"#第10讲-分布式锁有哪些应用场景和实现","aria-label":'Permalink to "第10讲：分布式锁有哪些应用场景和实现？"'},"​")],-1),i=s("p",null,"电商网站都会遇到秒杀、特价之类的活动，大促活动有一个共同特点就是访问量激增，在高并发下会出现成千上万人抢购一个商品的场景。虽然在系统设计时会通过限流、异步、排队等方式优化，但整体的并发还是平时的数倍以上，参加活动的商品一般都是限量库存，如何防止库存超卖，避免并发问题呢？分布式锁就是一个解决方案。",-1),y=s("h3",{id:"如何理解分布式锁",tabindex:"-1"},[a("如何理解分布式锁 "),s("a",{class:"header-anchor",href:"#如何理解分布式锁","aria-label":'Permalink to "如何理解分布式锁"'},"​")],-1),d=s("p",null,"我们都知道，在业务开发中，为了保证在多线程下处理共享数据的安全性，需要保证同一时刻只有一个线程能处理共享数据。",-1),h=s("p",null,"Java 语言给我们提供了线程锁，开放了处理锁机制的 API，比如 Synchronized、Lock 等。当一个锁被某个线程持有的时候，另一个线程尝试去获取这个锁会失败或者阻塞，直到持有锁的线程释放了该锁。",-1),_=s("p",null,"在单台服务器内部，可以通过线程加锁的方式来同步，避免并发问题，那么在分布式场景下呢？",-1),m=e("",35),k=e("",6);function C(F,u,T,g,A,v){const n=l("Image");return t(),c("div",null,[E,i,y,d,h,_,p(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/04/52/CgqCHl6z34CAWUxoAAE1hnZz5gE051.png"}),a(),m,p(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/04/52/CgqCHl6z34-ALXWpAAEiUjbLEMc631.png"}),a(),k])}const b=o(r,[["render",C]]);export{x as __pageData,b as default};

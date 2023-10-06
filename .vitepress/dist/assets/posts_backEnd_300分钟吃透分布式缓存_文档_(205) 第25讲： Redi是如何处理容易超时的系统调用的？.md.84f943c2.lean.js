import{_ as o,j as s,o as _,g as i,k as t,s as e,h as l,Q as c}from"./chunks/framework.b3d8e22e.js";const k=JSON.parse('{"title":"BIO 线程简介 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(205) 第25讲： Redi是如何处理容易超时的系统调用的？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(205) 第25讲： Redi是如何处理容易超时的系统调用的？.md","lastUpdated":1696417798000}'),n={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(205) 第25讲： Redi是如何处理容易超时的系统调用的？.md"},d=e("p",null,"本课时我们主要学习通过 BIO 线程解决处理容易超时的系统调用问题，以及 BIO 线程处理的任务与处理流程等内容。",-1),r=e("h2",{id:"bio-线程简介",tabindex:"-1"},[l("BIO 线程简介 "),e("a",{class:"header-anchor",href:"#bio-线程简介","aria-label":'Permalink to "BIO 线程简介"'},"​")],-1),p=e("p",null,"Redis 在运行过程中，不可避免的会产生一些运行慢的、容易引发阻塞的任务，如将内核中的文件缓冲同步到磁盘中、关闭文件，都会引发短时阻塞，还有一些大 key，如一些元素数高达万级或更多的聚合类元素，在删除时，由于所有元素需要逐一释放回收，整个过程耗时也会比较长。而 Redis 的核心处理线程是单进程单线程模型，所有命令的接受与处理、数据淘汰等都在主线程中进行，这些任务处理速度非常快。如果核心单线程还要处理那些慢任务，在处理期间，势必会阻塞用户的正常请求，导致服务卡顿。为此，Redis 引入了 BIO 后台线程，专门处理那些慢任务，从而保证和提升主线程的处理能力。",-1),O=c("",6),B=e("p",null,"BIO 线程启动时或持续处理完所有任务，发现任务队列为空后，就会阻塞，并等待新任务的到来。当主线程有新任务后，主线程会提交任务，并唤醒 BIO 线程。BIO 线程随后开始轮询获取新任务，并进行处理。当处理完所有 BIO 任务后，则再次进入阻塞，等待下一轮唤醒。",-1),I=e("br",null,null,-1);function h(m,f,A,b,u,g){const a=s("Image");return _(),i("div",null,[d,r,p,t(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/7D/CgotOV3TmoqAeOjLAACHFJ0GaJU476.png"}),O,t(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/5D/CgoB5l3Tmp2AWAq1AACUcWhvLE8435.png"}),B,I])}const T=o(n,[["render",h]]);export{k as __pageData,T as default};

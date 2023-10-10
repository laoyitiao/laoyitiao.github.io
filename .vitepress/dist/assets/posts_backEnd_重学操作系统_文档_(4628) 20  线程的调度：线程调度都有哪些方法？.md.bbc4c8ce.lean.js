import{_ as n,j as r,o as p,g as l,k as s,h as a,Q as e,s as t}from"./chunks/framework.cfb14fe0.js";const N=JSON.parse('{"title":"20线程的调度：线程调度都有哪些方法？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4628) 20  线程的调度：线程调度都有哪些方法？.md","filePath":"posts/backEnd/重学操作系统_文档/(4628) 20  线程的调度：线程调度都有哪些方法？.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/重学操作系统_文档/(4628) 20  线程的调度：线程调度都有哪些方法？.md"},_=e("",10),c=e("",16),h=t("p",null,"每个线程执行一个时间片段，然后每次执行完一个线程就执行一段调度程序。",-1),d=t("p",null,"图中用红色代表调度程序，其他颜色代表被调度线程的时间片段。调度程序可以考虑实现为一个单线程模型，这样不需要考虑竞争条件。",-1),g=t("p",null,"上面这个模型已经是一个非常优秀的方案了，但是还有一些问题可以进一步处理得更好。",-1),u=t("ol",null,[t("li",null,[t("p",null,"如果一个线程优先级非常高，其实没必要再抢占，因为无论如何调度，下一个时间片段还是给它。那么这种情况如何实现？")]),t("li",null,[t("p",null,"如果希望实现最短作业优先的抢占，就必须知道每个线程的执行时间，而这个时间是不可预估的，那么这种情况又应该如何处理？")])],-1),m=t("p",null,"为了解决上面两个问题，我们可以考虑引入多级队列模型。",-1),A=t("h3",{id:"多级队列模型",tabindex:"-1"},[a("多级队列模型 "),t("a",{class:"header-anchor",href:"#多级队列模型","aria-label":'Permalink to "多级队列模型"'},"​")],-1),C=t("p",null,"多级队列，就是多个队列执行调度。 我们先考虑最简单的两级模型，如图：",-1),P=t("p",null,"上图中设计了两个优先级不同的队列，从下到上优先级上升，上层队列调度紧急任务，下层队列调度普通任务。只要上层队列有任务，下层队列就会让出执行权限。",-1),b=t("ul",null,[t("li",null,[t("p",null,"低优先级队列可以考虑抢占 + 优先级队列的方式实现，这样每次执行一个时间片段就可以判断一下高优先级的队列中是否有任务。")]),t("li",null,[t("p",null,"高优先级队列可以考虑用非抢占（每个任务执行完才执行下一个）+ 优先级队列实现，这样紧急任务优先级有个区分。如果遇到十万火急的情况，就可以优先处理这个任务。")])],-1),k=t("p",null,"上面这个模型虽然解决了任务间的优先级问题，但是还是没有解决短任务先行的问题。可以考虑再增加一些队列，让级别更多。比如下图这个模型：",-1),q=e("",9),S=t("h3",{id:"思考题",tabindex:"-1"},[a("思考题 "),t("a",{class:"header-anchor",href:"#思考题","aria-label":'Permalink to "思考题"'},"​")],-1),T=t("p",null,[t("strong",null,"最后我再给你出一道需要查资料的思考题：用你最熟悉的语言模拟分级队列调度的模型"),a("？")],-1),f=t("p",null,"你可以把你的答案、思路或者课后总结写在留言区，这样可以帮助你产生更多的思考，这也是构建知识体系的一部分。经过长期的积累，相信你会得到意想不到的收获。如果你觉得今天的内容对你有所启发，欢迎分享给身边的朋友。期待看到你的思考！",-1);function F(D,V,x,E,I,U){const o=r("Image");return p(),l("div",null,[_,s(o,{alt:"Lark20201113-173325.png",src:"https://s0.lgstatic.com/i/image/M00/6D/9C/Ciqc1F-uUwyAXKj6AABwvcEuVH0735.png"}),a(),c,s(o,{alt:"Lark20201113-173328.png",src:"https://s0.lgstatic.com/i/image/M00/6D/A7/CgqCHl-uUx2AZFakAACjU3Bi2eE649.png"}),a(),h,s(o,{alt:"Lark20201113-173330.png",src:"https://s0.lgstatic.com/i/image/M00/6D/9C/Ciqc1F-uUyaAUVSDAAB3mZmSb3A937.png"}),a(),d,g,u,m,A,C,s(o,{alt:"Lark20201113-173333.png",src:"https://s0.lgstatic.com/i/image/M00/6D/A7/CgqCHl-uUzCAVhhzAAFSttJfDs4355.png"}),a(),P,b,k,s(o,{alt:"Lark20201113-173318.png",src:"https://s0.lgstatic.com/i/image/M00/6D/9C/Ciqc1F-uUzqAMYY-AADMHX-2Dso456.png"}),a(),q,s(o,{alt:"Lark20201113-173515.png",src:"https://s0.lgstatic.com/i/image/M00/6D/9C/Ciqc1F-uU2uATX3YAAVunE37pCY785.png"}),a(),S,T,f])}const y=n(i,[["render",F]]);export{N as __pageData,y as default};

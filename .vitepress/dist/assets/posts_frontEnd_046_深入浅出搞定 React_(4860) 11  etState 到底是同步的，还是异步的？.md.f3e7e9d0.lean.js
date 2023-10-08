import{_ as o,j as t,o as e,g as c,k as p,h as n,Q as l,s}from"./chunks/framework.a0d18f64.js";const P=JSON.parse('{"title":"11etState到底是同步的，还是异步的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/046_深入浅出搞定 React/(4860) 11  etState 到底是同步的，还是异步的？.md","filePath":"posts/frontEnd/046_深入浅出搞定 React/(4860) 11  etState 到底是同步的，还是异步的？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/046_深入浅出搞定 React/(4860) 11  etState 到底是同步的，还是异步的？.md"},E=l("",10),y=s("p",null,"此时有个问题，若从左到右依次点击每个按钮，控制台的输出会是什么样的？读到这里，建议你先暂停 1 分钟在脑子里跑一下代码，看看和下图实际运行出来的结果是否有出入。",-1),i=s("p",null,'如果你是一个熟手 React 开发，那么 increment 这个方法的输出结果想必难不倒你------正如许许多多的 React 入门教学所声称的那样，"setState 是一个异步的方法"，这意味着当我们执行完 setState 后，state 本身并不会立刻发生改变。 因此紧跟在 setState 后面输出的 state 值，仍然会维持在它的初始状态（0）。在同步代码执行完毕后的某个"神奇时刻"，state 才会"恰恰好"地增加到 1。',-1),F=s("p",null,'但这个"神奇时刻"到底何时发生，所谓的"恰恰好"又如何界定呢？如果你对这个问题搞不太清楚，那么 triple 方法的输出对你来说就会有一定的迷惑性------setState 一次不好使， setState 三次也没用，state 到底是在哪个环节发生了变化呢？',-1),u=s("p",null,"带着这样的困惑，你决定先抛开一切去看看 reduce 方法里是什么光景，结果更令人大跌眼镜，reduce 方法里的 setState 竟然是同步更新的！这......到底是我们初学 React 时拿到了错误的基础教程，还是电脑坏了？",-1),d=s("p",null,"要想理解眼前发生的这魔幻的一切，我们还得从 setState 的工作机制里去找线索。",-1),A=s("h3",{id:"异步的动机和原理-批量更新的艺术",tabindex:"-1"},[n("异步的动机和原理------批量更新的艺术 "),s("a",{class:"header-anchor",href:"#异步的动机和原理-批量更新的艺术","aria-label":'Permalink to "异步的动机和原理------批量更新的艺术"'},"​")],-1),h=s("p",null,"我们首先要认知的一个问题：在 setState 调用之后，都发生了哪些事情？基于截止到现在的专栏知识储备，你可能会更倾向于站在生命周期的角度去思考这个问题，得出一个如下图所示的结论：",-1),D=l("",8),g=l("",6),C=s("p",null,"现在问题就变得清晰多了：为什么 setTimeout 可以将 setState 的执行顺序从异步变为同步？",-1),B=s("p",null,[n("这里我先给出一个结论："),s("strong",null,'并不是 setTimeout 改变了 setState，而是 setTimeout 帮助 setState "逃脱"了 React 对它的管控。只要是在 React 管控下的 setState，一定是异步的'),n("。")],-1),S=s("p",null,"接下来我们就从 React 源码里，去寻求佐证这个结论的线索。",-1),m=s("blockquote",null,[s("p",null,"tips：时下虽然市场里的 React 16、React 17 十分火热，但就 setState 这块知识来说，React 15 仍然是最佳的学习素材。因此下文所有涉及源码的分析，都会围绕 React 15 展开。关于 React 16 之后 Fiber 机制给 setState 带来的改变，我们会有专门一讲来分析，不在本讲的讨论范围内。")],-1),v=s("h4",{id:"解读-setstate-工作流",tabindex:"-1"},[n("解读 setState 工作流 "),s("a",{class:"header-anchor",href:"#解读-setstate-工作流","aria-label":'Permalink to "解读 setState 工作流"'},"​")],-1),b=s("p",null,"我们阅读任何框架的源码，都应该带着问题、带着目的去读。React 中对于功能的拆分是比较细致的，setState 这部分涉及了多个方法。为了方便你理解，我这里先把主流程提取为一张大图：",-1),_=l("",26),q=l("",15);function k(R,U,T,f,I,j){const a=t("Image");return e(),c("div",null,[E,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/6C/16/Ciqc1F-qYzOAEHeBAAAouh3EFik606.png"}),n(),y,p(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8A/Ciqc1F-uMdqAVUoFAAIqtDlymxs173.png"}),n(),i,F,u,d,A,h,p(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8A/Ciqc1F-uMeSAYK6FAABN0Vwnq5M814.png"}),n(),D,p(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/6D/8B/Ciqc1F-uMfKALHLXAAEBeCrt5lE676.png"}),n(),g,p(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/6D/96/CgqCHl-uMguADJiMAAEld6KAKBI013.png"}),n(),C,B,S,m,v,b,p(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image2/M01/04/81/Cip5yF_yswuAWzDfAAEc1lISh-Q211.png"}),n(),_,p(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/6E/2E/Ciqc1F-x-tyAbioYAACikzik89A130.png"}),n(),q])}const x=o(r,[["render",k]]);export{P as __pageData,x as default};

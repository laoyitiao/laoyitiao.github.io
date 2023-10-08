import{_ as o,j as e,o as t,g as c,k as a,h as s,Q as p,s as l}from"./chunks/framework.4e7d56ce.js";const U=JSON.parse('{"title":"13ReactDOM.render是如何串联渲染链路的？（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/046_深入浅出搞定 React/(4862) 13  ReactDOM.render 是如何串联渲染链路的？（上）.md","filePath":"posts/frontEnd/046_深入浅出搞定 React/(4862) 13  ReactDOM.render 是如何串联渲染链路的？（上）.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/046_深入浅出搞定 React/(4862) 13  ReactDOM.render 是如何串联渲染链路的？（上）.md"},E=p("",7),y=l("p",null,'现在请你打开 Chrome 的 Performance 面板，点击下图红色圈圈所圈住的这个"记录"按钮：',-1),i=l("p",null,"然后重新访问 Demo 页面对应的本地服务地址，待页面刷新后，终止记录，便能够得到如下图右下角所示的这样一个调用栈大图：",-1),d=l("p",null,'放大该图，定位"src/index.js"这个文件路径，我们就可以找到 ReactDOM.render 方法对应的调用栈，如下图所示：',-1),u=l("p",null,"从图中你可以看到，ReactDOM.render 方法对应的调用栈非常深，中间涉及的函数量也比较大。如果这张图使你心里发虚，请先不要急于撤退------分析调用栈只是我们理解渲染链路的一个手段，我们的目的是借此提取关键逻辑，而非理解调用栈中的每一个方法。就这张图来说，你首先需要把握的，就是整个调用链路中所包含的三个阶段：",-1),F=p("",6),g=p("",6),D=l("p",null,"在这个流程中，你需要关注到 fiberRoot 这个对象。fiberRoot 到底是什么呢？这里我将运行时的 root 和 fiberRoot 为你截取出来，其中 root 对象的结构如下图所示：",-1),b=l("p",null,"可以看出，root 对象（container._reactRootContainer）上有一个 _internalRoot 属性，这个 _internalRoot 也就是 fiberRoot。fiberRoot 的本质是一个 FiberRootNode 对象，其中包含一个 current 属性，该属性同样需要划重点。这里我为你高亮出 current 属性的部分内容：",-1),A=l("p",null,[s('或许你会对 current 对象包含的海量属性感到陌生和头大，但这并不妨碍你 Get 到"current 对象是一个 FiberNode 实例"这一点，'),l("strong",null,"而 FiberNode，正是 Fiber 节点对应的对象类型"),s(" 。current 对象是一个 Fiber 节点，不仅如此，它还是"),l("strong",null,"当前 Fiber 树的头部节点"),s("。")],-1),m=l("p",null,"考虑到 current 属性对应的 FiberNode 节点，在调用栈中实际是由 createHostRootFiber 方法创建的，React 源码中也有多处以 rootFiber 代指 current 对象，因此下文中我们将以 rootFiber 指代 current 对象。",-1),h=l("p",null,"读到这里，你脑海中应该不难形成一个这样的指向关系：",-1),C=p("",10),_=p("",14),R=l("p",null,"乍一看，好像和 ReactDOM.render 差别很大，其实不然。图中 createRoot 所触发的逻辑仍然是一些准备性质的初始化工作，此处不必太纠结。关键在于下面我给你框出来的这部分，如下图所示：",-1),f=l("p",null,"我们拉近一点来看，如下图所示：",-1),k=l("p",null,"你会发现这地方也调用了一个 render。再顺着这个调用往下看，发现有大量的熟悉面孔：updateContainer、requestUpdateLane、createUpdate、scheduleUpdateOnFiber......这些函数在 ReactDOM.render 的调用栈中也出现过。",-1),v=l("p",null,"其实，当前你看到的这个 render 调用链路，和 ReactDOM.render 的调用链路是非常相似的，主要的区别在 scheduleUpdateOnFiber 的这个判断里：",-1),M=p("",13);function q(O,B,x,T,S,I){const n=e("Image");return t(),c("div",null,[E,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D9/CgqCHl-zmEOAGbJ5AAAxGM0SPWA261.png"}),s(),y,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D9/CgqCHl-zmEuALVycAAEENjoXJ6E407.png"}),s(),i,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D9/CgqCHl-zmFKAFeHBAAQn6ZuFPrI619.png"}),s(),d,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/6E/CE/Ciqc1F-zmFmAXkYlAAI2ONTKc9s081.png"}),s(),u,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D9/CgqCHl-zmGKAFb5NAAItD2ouVoc061.png"}),s(),F,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D9/CgqCHl-zmGqAU-42AABcbqaOzFc800.png"}),s(),g,a(n,{alt:"Lark20201120-182606.png",src:"https://s0.lgstatic.com/i/image/M00/70/03/CgqCHl-3mfWABLi5AADUzMV7iHA320.png"}),s(),D,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D9/CgqCHl-zmH6AKzPPAADcEbfK6K4199.png"}),s(),b,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D9/CgqCHl-zmISANlmfAADLqX8jue0154.png"}),s(),A,m,h,a(n,{alt:"Lark20201120-182610.png",src:"https://s0.lgstatic.com/i/image/M00/6F/F8/Ciqc1F-3mh-AZrlvAABgy8S1u44402.png"}),s(),C,a(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D9/CgqCHl-zmJGATpFIAAPP-sFYf70749.png"}),s(),_,a(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D9/CgqCHl-zmJyAbYZNAAFI67qKm98019.png"}),s(),R,a(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/6E/CE/Ciqc1F-zmKKAF0ODAADhhdYWzo0441.png"}),s(),f,a(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/70/75/CgqCHl-7GiaAUY_zAAxz8mfEvT0309.png"}),s(),k,v,a(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/6E/CE/Ciqc1F-zmMKAJFKYAAMfoIVWxeM650.png"}),s(),M])}const N=o(r,[["render",q]]);export{U as __pageData,N as default};

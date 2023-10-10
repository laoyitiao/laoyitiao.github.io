import{_ as o,j as t,o as e,g as c,k as l,h as s,Q as p,s as n}from"./chunks/framework.cfb14fe0.js";const N=JSON.parse('{"title":"17特别的事件系统：React事件与DOM事件有何不同？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/046_深入浅出搞定 React/(4864) 17  特别的事件系统：React 事件与 DOM 事件有何不同？.md","filePath":"posts/frontEnd/046_深入浅出搞定 React/(4864) 17  特别的事件系统：React 事件与 DOM 事件有何不同？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/046_深入浅出搞定 React/(4864) 17  特别的事件系统：React 事件与 DOM 事件有何不同？.md"},E=p("",13),y=n("p",null,'当事件被触发时，首先经历的是一个捕获过程：事件会从最外层的元素开始"穿梭"，逐层"穿梭"到最内层元素，这个过程会持续到事件抵达它目标的元素（也就是真正触发这个事件的元素）为止；此时事件流就切换到了"目标阶段"------事件被目标元素所接收；然后事件会被"回弹"，进入到冒泡阶段------它会沿着来时的路"逆流而上"，一层一层再走回去。',-1),i=n("p",null,'这个过程很像我们小时候玩的蹦床：从高处下落，触达蹦床后再弹起、回到高处，整个过程呈一个对称的"V"字形。',-1),g=p("",21),d=n("p",null,"e.nativeEvent 将会输出 MouseEvent 这个原生事件，如下图所示：",-1),h=p("",7),F=n("p",null,'这些函数之间是如何各司其职、打好"配合"的呢？请看下面这张工作流大图：',-1),u=n("p",null,[s("从图中可以看出，"),n("strong",null,"事件的注册过程是由 ensureListeningTo 函数开启的"),s("。在 ensureListeningTo 中，会尝试获取当前 DOM 结构中的根节点（这里指的是 document 对象），然后通过调用 legacyListenToEvent，将统一的事件监听函数注册到 document 上面。")],-1),_=n("p",null,'在 legacyListenToEvent 中，实际上是通过调用 legacyListenToTopLevelEvent 来处理事件和 document 之间的关系的。 legacyListenToTopLevelEvent 直译过来是"监听顶层的事件"，这里的"顶层"就可以理解为事件委托的最上层，也就是 document 节点。在 legacyListenToTopLevelEvent 中，有这样一段逻辑值得我们注意，请看下图：',-1),A=n("p",null,[s("listenerMap 是在 legacyListenToEvent 里创建/获取的一个数据结构，它将记录"),n("strong",null,"当前 document 已经监听了哪些事件"),s("。在 legacyListenToTopLevelEvent 逻辑的起点，会首先判断 listenerMap.has(topLevelType) 这个条件是否为 true。")],-1),D=n("p",null,[s("这里插播一个小的前置知识：topLevelType 在 legacyListenToTopLevelEvent 的函数上下文中代表"),n("strong",null,"事件的类型"),s("，比如说我尝试监听的是一个点击事件，那么 topLevelType 的值就会是 click，如下图所示：")],-1),C=n("p",null,[s("若事件系统识别到 listenerMap.has(topLevelType) 为 true，也就是当前这个事件 document 已经监听过了，那么就会直接跳过对这个事件的处理，否则才会进入具体的事件监听逻辑。如此一来，"),n("strong",null,"即便我们在 React 项目中多次调用了对同一个事件的监听，也只会在 document 上触发一次注册"),s("。")],-1),m=n("p",null,[n("strong",null,"为什么针对同一个事件，即便可能会存在多个回调，document 也只需要注册一次监听"),s(" ？因为 React"),n("strong",null,"最终注册到 document 上的并不是某一个 DOM 节点上对应的具体回调逻辑，而是一个统一的事件分发函数"),s("。这里我将断点打在事件监听函数的绑定动作上，请看下图：")],-1),v=n("p",null,"在这段逻辑中，element 就是 document 这个 DOM 元素，如下图所示，它在 legacyListenToEvent 阶段被获取后，又被层层的逻辑传递到了这个位置。",-1),q=n("p",null,[s("addEventListener 就更不用多说了，它是"),n("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener",target:"_blank",rel:"noreferrer"},"原生 DOM 里专门用来注册事件监听器的接口"),s("。我们真正需要关注的是图中这个函数的前两个入参，首先看 eventType，它表示事件的类型，这里我监听的是一个点击事件，因此 eventType 就是 click（见下图的运行时输出结果）。")],-1),T=n("p",null,[s("重点在 listener 上，前面刚说过，最终注册到 document 上的是一个"),n("strong",null,"统一的事件分发函数"),s("，这个函数到底长啥样？我们来看看，以下是运行时的 listener 输出结果：")],-1),M=p("",6),B=p("",5),b=n("p",null,"界面中渲染出来的是一行数字文本和一个按钮，每点击一下按钮，数字文本会 +1。在 JSX 结构中，监听点击事件的除了 button 按钮外，还有 id 为 container 的 div 元素，这个 div 元素同时监听了点击事件的冒泡和捕获。",-1),R=n("p",null,"App 组件对应的 Fiber 树结构如下图所示：",-1),k=p("",8),f=n("p",null,"因此最后收集上来的 path 数组内容就是 div#container、div.App 及 button 节点自身（button 节点别忘了，它是 while 循环的起点，一开始就会被推进 path 数组），如下图所示：",-1),L=p("",10),O=p("",9);function w(S,P,I,H,V,x){const a=t("Image");return e(),c("div",null,[E,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/78/7B/Ciqc1F_KCc2AH3SuAADAfZ2rEXk066.png"}),s(),y,i,l(a,{alt:"图片15.png",src:"https://s0.lgstatic.com/i/image/M00/78/8F/Ciqc1F_KGs2AQ6VHAABqyZCa5L0820.png"}),s(),g,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/78/86/CgqCHl_KCfyAEJw8AAFeUK36DtI133.png"}),s(),d,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/78/86/CgqCHl_KCgOAZixsAACyXDjo4cs933.png"}),s(),h,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/78/7B/Ciqc1F_KCi-ANLdOAACnuwItpnA575.png"}),s(),F,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/78/87/CgqCHl_KCjaALFKsAAHNjlT3rrw342.png"}),s(),u,_,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/78/7C/Ciqc1F_KCj6ABv8CAAMpWS1ws8Q056.png"}),s(),A,D,l(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/78/87/CgqCHl_KCkWACHkwAACydURG2fM056.png"}),s(),C,m,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/78/7C/Ciqc1F_KCk-Afe7QAADMlUnc-KU093.png"}),s(),v,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/78/7C/Ciqc1F_KClaATXVLAAAhVJ6fu48519.png"}),s(),q,l(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/78/7C/Ciqc1F_KCl-AQUfuAAA3s44GMaI290.png"}),s(),T,l(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/78/7C/Ciqc1F_KCmeARunyAACxP1sCnKY948.png"}),s(),M,l(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/78/7C/Ciqc1F_KCneAfMZbAAE9PxK7X3w813.png"}),s(),B,l(a,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/78/87/CgqCHl_KCoaAHCSUAAAdOFZY7GY194.png"}),s(),b,R,l(a,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image/M00/78/87/CgqCHl_KCuSAdlxpAADdtt6LkCw620.png"}),s(),k,l(a,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/78/7C/Ciqc1F_KCz6AFPppAADdoA4lHx0444.png"}),s(),f,l(a,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image/M00/78/7C/Ciqc1F_KC0SAHu4MAAC4V-Al5nU582.png"}),s(),L,l(a,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image/M00/78/87/CgqCHl_KC1GAecTRAAFEgV7Sms0914.png"}),s(),O])}const U=o(r,[["render",w]]);export{N as __pageData,U as default};

import{_ as n,j as l,o as c,g as p,k as s,h as a,Q as e,s as t}from"./chunks/framework.cfb14fe0.js";const V=JSON.parse('{"title":"10React中的“栈调和”（StackReconciler）过程是怎样的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/046_深入浅出搞定 React/(4859) 10  React 中的“栈调和”（Stack Reconciler）过程是怎样的？.md","filePath":"posts/frontEnd/046_深入浅出搞定 React/(4859) 10  React 中的“栈调和”（Stack Reconciler）过程是怎样的？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/046_深入浅出搞定 React/(4859) 10  React 中的“栈调和”（Stack Reconciler）过程是怎样的？.md"},i=e("",29),f=t("p",null,'那么如果真的发生了跨层级的节点操作（比如将以 B 节点为根节点的子树从 A 节点下面移动到 C 节点下面，如下图所示）会怎样呢？很遗憾，作为"次要矛盾"，在这种情况下 React 并不能够判断出"移动"这个行为，它只能机械地认为移出子树那一层的组件消失了，对应子树需要被销毁；而移入子树的那一层新增了一个组件，需要重新为其创建一棵子树。',-1),_=t("p",null,[t("strong",null,"销毁 + 重建的代价是昂贵的，因此 React 官方也建议开发者不要做跨层级的操作，尽量保持 DOM 结构的稳定性"),a("。")],-1),u=t("h4",{id:"_2-减少递归的-一刀切-策略-类型的一致性决定递归的必要性",tabindex:"-1"},[a('2. 减少递归的"一刀切"策略：类型的一致性决定递归的必要性 '),t("a",{class:"header-anchor",href:"#_2-减少递归的-一刀切-策略-类型的一致性决定递归的必要性","aria-label":'Permalink to "2. 减少递归的"一刀切"策略：类型的一致性决定递归的必要性"'},"​")],-1),d=t("p",null,'结合"若两个组件属于同一个类型，那么它们将拥有相同的 DOM 树形结构"这一规律，我们虽不能直接反推出"不同类型的组件 DOM 结构不同"，但在大部分的情况下，这个结论都是成立的。毕竟，实际开发中遇到两个 DOM 结构完全一致、而类型不一致的组件的概率确实太低了。',-1),D=t("p",null,[t("strong",null,'本着抓"主要矛盾"的基本原则，React 认为，只有同类型的组件，才有进一步对比的必要性'),a("；若参与 Diff 的两个组件类型不同，那么直接放弃比较，原地替换掉旧的节点，如下图所示。只有确认组件类型相同后，React 才会在保留组件对应 DOM 树（或子树）的基础上，尝试向更深层次去 Diff。")],-1),g=t("p",null,"这样一来，便能够从很大程度上减少 Diff 过程中冗余的递归操作。",-1),h=t("h4",{id:"_3-重用节点的好帮手-key-属性帮-react-记住-节点",tabindex:"-1"},[a('3. 重用节点的好帮手：key 属性帮 React "记住"节点 '),t("a",{class:"header-anchor",href:"#_3-重用节点的好帮手-key-属性帮-react-记住-节点","aria-label":'Permalink to "3. 重用节点的好帮手：key 属性帮 React "记住"节点"'},"​")],-1),q=t("p",null,'在上文中，我们提到了"key 属性能够帮助维持节点的稳定性"，这个结论从何而来呢？首先，我们来看看 React 对 key 属性的定义：',-1),y=t("blockquote",null,[t("p",null,"key 是用来帮助 React 识别哪些内容被更改、添加或者删除。key 需要写在用数组渲染出来的元素内部，并且需要赋予其一个稳定的值。稳定在这里很重要，因为如果 key 值发生了变更，React 则会触发 UI 的重渲染。这是一个非常有用的特性。")],-1),E=t("p",null,[a("它试图解决的是"),t("strong",null,"同一层级下节点的重用问题"),a("。在展开分析之前，我们先结合到现在为止对 Diff 过程的理解，来思考这样一种情况，如下图所示：")],-1),k=e("",6),R=t("p",null,'这个 key 就充当了每个节点的 ID（唯一标识），有了这个标识之后，当 C 被插入到 B 和 D 之间时，React 并不会再认为 C、D、E 这三个坑位都需要被重建------它会通过识别 ID，意识到 D 和 E 并没有发生变化（D 的 ID 仍然是 1，E 的 ID 仍然是 2），而只是被调整了顺序而已。接着，React 便能够轻松地重用它"追踪"到旧的节点，将 D 和 E 转移到新的位置，并完成对 C 的插入。这样一来，同层级下元素的操作成本便大大降低。',-1),m=t("blockquote",null,[t("p",null,"注：作为一个节点的唯一标识，在使用 key 之前，请务必确认 key 的唯一和稳定。")],-1),b=t("h3",{id:"总结",tabindex:"-1"},[a("总结 "),t("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),C=t("p",null,"行文至此，栈调和机制下 Diff 算法的核心逻辑其实已经讲完了。前面我曾经强调过，原理!==源码，这一点放在 Diff 算法这儿来看尤为应验------Diff 算法的源码调用链路很长，就 React 15 这一个大版本来说，我个人就断断续续花了好几天才真正读完；但若真的把源码中的逻辑要点作提取，你消化它们可能也就不过一杯茶的工夫。",-1),A=t("p",null,'对于 React 15 下的 Diff 过程，我个人的建议是你了解到逻辑这一层，把握住"树递归"这个特征，这就够了。专栏对调和过程的讨论，主要的发力点仍然是围绕 React 16 来展开的。若你学有余力，可以提前了解一下 React 16 对调和的实现，这将是我们整个第二模块的一个重中之重。',-1),O=t("p",null,'结束了对 React 15 时代下 Diff 的探讨，你可别忘了虚拟 DOM 中还有一个叫作"batch"的东西。"batch"描述的是"批处理"机制，这个机制和 Diff 一样，在 React 中都可以由 setState 来触发。在下一讲，我们就会深入 setState 工作流，对包括"批量更新"在内的一系列问题一探究竟。',-1);function M(S,F,B,I,P,x){const o=l("Image");return c(),p("div",null,[i,s(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6C/14/Ciqc1F-qYhGAEPpKAAEByai_5tk134.png"}),a(),f,_,s(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/6C/20/CgqCHl-qYhqAbo1HAAGSgsK973k251.png"}),a(),u,d,D,g,s(o,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/6C/15/Ciqc1F-qYiqAbfiqAAD0Bt0pyEY472.png"}),a(),h,q,y,E,s(o,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/6C/20/CgqCHl-qYjGANI2jAAC86KpVHsE612.png"}),a(),k,s(o,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/6C/15/Ciqc1F-qYkOANYXaAAC2tCBcU4k280.png"}),a(),R,m,b,C,A,O])}const v=n(r,[["render",M]]);export{V as __pageData,v as default};

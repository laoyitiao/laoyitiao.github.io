import{_ as o,j as t,o as e,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.a0d18f64.js";const L=JSON.parse('{"title":"02为什么React16要更改组件的生命周期？（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/046_深入浅出搞定 React/(4851) 02  为什么 React 16 要更改组件的生命周期？（上）.md","filePath":"posts/frontEnd/046_深入浅出搞定 React/(4851) 02  为什么 React 16 要更改组件的生命周期？（上）.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/046_深入浅出搞定 React/(4851) 02  为什么 React 16 要更改组件的生命周期？（上）.md"},E=p("",31),y=p("",5),i=s("p",null,"此处由于我们强调的是对生命周期执行规律的验证，所以样式上从简，你也可以根据自己的喜好添加 CSS 相关的内容。",-1),u=s("p",null,"接下来我们就结合这个 Demo 和开头的生命周期大图，一起来看看挂载、更新、卸载这 3 个阶段，React 组件都经历了哪些事情。",-1),F=s("h4",{id:"mounting-阶段-组件的初始化渲染-挂载",tabindex:"-1"},[n("Mounting 阶段：组件的初始化渲染（挂载） "),s("a",{class:"header-anchor",href:"#mounting-阶段-组件的初始化渲染-挂载","aria-label":'Permalink to "Mounting 阶段：组件的初始化渲染（挂载）"'},"​")],-1),d=s("p",null,'挂载过程在组件的一生中仅会发生一次，在这个过程中，组件被初始化，然后会被渲染到真实 DOM 里，完成所谓的"首次渲染"。',-1),C=s("p",null,"在挂载阶段，一个 React 组件会按照顺序经历如下图所示的生命周期：",-1),g=p("",6),h=s("h4",{id:"updating-阶段-组件的更新",tabindex:"-1"},[n("Updating 阶段：组件的更新 "),s("a",{class:"header-anchor",href:"#updating-阶段-组件的更新","aria-label":'Permalink to "Updating 阶段：组件的更新"'},"​")],-1),q=s("p",null,"组件的更新分为两种：一种是由父组件更新触发的更新；另一种是组件自身调用自己的 setState 触发的更新。这两种更新对应的生命周期流程如下图所示：",-1),D=p("",6),A=p("",3),m=p("",4),_=s("p",null,'可以看到，this.state.ownText 这个状态和子组件完全无关。但是当我点击"修改父组件自有文本内容"这个按钮的时候，componentReceiveProps 仍然被触发了，效果如下图所示：',-1),B=s("p",null,"耳听为虚，眼见为实。面对这样的运行结果，我不由得要带你复习一下 React 官方文档中的这句话：",-1),x=s("p",null,[s("strong",null,"componentReceiveProps 并不是由 props 的变化触发的，而是由父组件的更新触发的"),n("，这个结论，请你谨记。")],-1),v=s("p",null,[s("strong",null,"组件自身 setState 触发的更新")],-1),R=s("p",null,'this.setState() 调用后导致的更新流程，前面大图中已经有体现，这里我直接沿用上一个 Demo 来做演示。若我们点击上一个 Demo 中的"修改子组件文本内容"这个按钮：',-1),b=s("p",null,"这个动作将会触发子组件 LifeCycle 自身的更新流程，随之被触发的生命周期函数如下图增加的 console 内容所示：",-1),T=p("",10),f=s("p",null,'对应上文的 Demo 来看，我们点击"隐藏子组件"后就可以把 LifeCycle 从父组件中移除掉，进而实现卸载的效果。整个过程如下图所示：',-1),k=p("",10);function M(P,S,U,W,O,N){const a=t("Image");return e(),c("div",null,[E,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/5E/31/Ciqc1F-GZbGAGNcBAAE775qohj8453.png"}),n(),y,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/5D/CC/Ciqc1F-FU-yAMLh0AABeqOeqLek815.png"}),n(),i,u,F,d,C,l(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/5E/32/Ciqc1F-GZ1OAWETTAAA3Am2CwU0383.png"}),n(),g,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/5D/D8/CgqCHl-FU_6AeWUcAAB8X4bjwqE102.png"}),n(),h,q,l(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/5E/3C/CgqCHl-GZf-AUjsLAACmOsiQl3M485.png"}),n(),D,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/5D/CC/Ciqc1F-FVA6AYiD4AADSl2lr-_Q663.png"}),n(),A,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/5D/CC/Ciqc1F-FVBWAEqTGAAEdsvX2TAM747.png"}),n(),m,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/5D/CD/Ciqc1F-FVCGAVX_GAAFADHW8-9A107.png"}),n(),_,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/5D/D8/CgqCHl-FVCqASZNkAAGmF-R62cg649.png"}),n(),B,l(a,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image/M00/5D/E1/Ciqc1F-FaGuADV5vAACZ2YRV6qQ941.png"}),n(),x,v,R,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/5D/D8/CgqCHl-FVDWABuVmAADVzZuKCO0699.png"}),n(),b,l(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/5D/CD/Ciqc1F-FVDuASw5bAAEhb9melJQ452.png"}),n(),T,l(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/5D/EC/CgqCHl-FaHuAVGc_AABE6JqN9E0073.png"}),n(),f,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/5D/CD/Ciqc1F-FVFeABZvpAAO9lJVFKhs335.png"}),n(),k])}const w=o(r,[["render",M]]);export{L as __pageData,w as default};

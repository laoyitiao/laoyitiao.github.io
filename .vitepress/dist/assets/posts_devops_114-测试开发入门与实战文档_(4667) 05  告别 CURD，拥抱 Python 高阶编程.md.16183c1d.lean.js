import{_ as o,j as e,o as t,g as c,k as a,h as l,Q as p,s}from"./chunks/framework.4e7d56ce.js";const A=JSON.parse('{"title":"05告别CURD，拥抱Python高阶编程","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4667) 05  告别 CURD，拥抱 Python 高阶编程.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4667) 05  告别 CURD，拥抱 Python 高阶编程.md","lastUpdated":1696682708000}'),r={name:"posts/devops/114-测试开发入门与实战文档/(4667) 05  告别 CURD，拥抱 Python 高阶编程.md"},y=p("",74),E=s("ul",null,[s("li",null,'继续向后执行，就会进入到第 1 行代码，即 outer() 函数内部；接着第 2 行代码开始执行，变量cheer被定义，并且赋值为"hello"；接着第 3 行代码开始运行，需要注意的是，第 3 行代码执行完，并不会执行第 4 行代码，而是执行第 5 行代码。')],-1),i=s("ul",null,[s("li",null,"第 5 行代码执行完毕后，outer() 函数的整个生命周期就已经结束了，继续往后执行：")],-1),F=s("p",null,"可以看到，代码进入了 inner 函数内部，而且 inner 函数内部可以访问生命周期已经结束的 outer 函数的成员变量 cheer，这个就是闭包的魔力。",-1),_=s("p",null,'最后，inner 函数继续执行，outer 函数里定义的 cheer 被取出，并且连同 name 一起返回。我们就获得到了函数的最终结果"hello kevin"。',-1),d=p("",37);function u(C,m,h,g,B,v){const n=e("Image");return t(),c("div",null,[y,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/55/2C/CgqCHl9pzJ2AGcCRAAEDr2CYkic136.png"}),l(),E,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/55/2C/CgqCHl9pzKSAbpBPAAFuLtfzxWU099.png"}),l(),i,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/55/21/Ciqc1F9pzKqAVnrtAAFpN4pwEGg451.png"}),l(),F,_,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/55/2C/CgqCHl9pzLGAdIdCAAF2FPx794k879.png"}),l(),d])}const D=o(r,[["render",u]]);export{A as __pageData,D as default};

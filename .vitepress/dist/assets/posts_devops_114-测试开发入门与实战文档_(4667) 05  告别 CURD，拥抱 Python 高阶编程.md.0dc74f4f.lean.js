import{_ as p,j as o,o as e,g as t,k as a,Q as l,s}from"./chunks/framework.b3d8e22e.js";const A=JSON.parse('{"title":"列表表达式（List Comprehension） ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4667) 05  告别 CURD，拥抱 Python 高阶编程.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4667) 05  告别 CURD，拥抱 Python 高阶编程.md","lastUpdated":1696417798000}'),c={name:"posts/devops/114-测试开发入门与实战文档/(4667) 05  告别 CURD，拥抱 Python 高阶编程.md"},r=l("",73),y=s("ul",null,[s("li",null,'继续向后执行，就会进入到第 1 行代码，即 outer() 函数内部；接着第 2 行代码开始执行，变量cheer被定义，并且赋值为"hello"；接着第 3 行代码开始运行，需要注意的是，第 3 行代码执行完，并不会执行第 4 行代码，而是执行第 5 行代码。')],-1),E=s("ul",null,[s("li",null,"第 5 行代码执行完毕后，outer() 函数的整个生命周期就已经结束了，继续往后执行：")],-1),i=s("p",null,"可以看到，代码进入了 inner 函数内部，而且 inner 函数内部可以访问生命周期已经结束的 outer 函数的成员变量 cheer，这个就是闭包的魔力。",-1),F=s("p",null,'最后，inner 函数继续执行，outer 函数里定义的 cheer 被取出，并且连同 name 一起返回。我们就获得到了函数的最终结果"hello kevin"。',-1),_=l("",37);function d(u,C,m,h,g,B){const n=o("Image");return e(),t("div",null,[r,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/55/2C/CgqCHl9pzJ2AGcCRAAEDr2CYkic136.png"}),y,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/55/2C/CgqCHl9pzKSAbpBPAAFuLtfzxWU099.png"}),E,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/55/21/Ciqc1F9pzKqAVnrtAAFpN4pwEGg451.png"}),i,F,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/55/2C/CgqCHl9pzLGAdIdCAAF2FPx794k879.png"}),_])}const f=p(c,[["render",d]]);export{A as __pageData,f as default};

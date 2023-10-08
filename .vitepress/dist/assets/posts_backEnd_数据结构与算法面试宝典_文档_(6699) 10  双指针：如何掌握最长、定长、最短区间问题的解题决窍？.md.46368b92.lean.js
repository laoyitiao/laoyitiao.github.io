import{_ as o,j as e,o as t,g as c,k as a,h as s,Q as p,s as l}from"./chunks/framework.a0d18f64.js";const W=JSON.parse('{"title":"10 双指针：如何掌握最长、定长、最短区间问题的解题决窍？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6699) 10  双指针：如何掌握最长、定长、最短区间问题的解题决窍？.md","filePath":"posts/backEnd/数据结构与算法面试宝典_文档/(6699) 10  双指针：如何掌握最长、定长、最短区间问题的解题决窍？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/数据结构与算法面试宝典_文档/(6699) 10  双指针：如何掌握最长、定长、最短区间问题的解题决窍？.md"},E=p("",12),y=l("p",null,"那么区间可以分为 3 种：",-1),i=l("p",null,"第一种区间：以 3 为右端，其和大于 6。",-1),A=l("p",null,"第二种区间：以 3 为右端的区间，其和等于 6。",-1),F=l("p",null,"第三种区间：以 3 为右端的区间，其和小于 6。",-1),D=l("p",null,"如果我们将这些区间的累计和呈现到数轴上，就会得到如下图所示的一个图像：",-1),g=l("p",null,"可以看出，区间的状态的变化是单调的，并且是连续的：这就是双指针算法使用的条件。",-1),u=l("p",null,[l("strong",null,'有个快速判断区间属性是否满足单调性的办法，那就是，当往区间里面添加元素的时候，不能出现波折，比如不允许"满足条件'),s(" →"),l("strong",null,"不满足条件"),s(" →"),l("strong",null,'满足条件"的情况'),s("。")],-1),C=l("p",null,"比如，我们这里的限定条件改成：需要区间满足 >= 6。我们看一下如下操作步骤：",-1),h=p("",12),d=p("",4),B=p("",27),f=p("",4),b=p("",8),_=p("",46),m=p("",6),k=l("p",null,"写定长区间的代码也比较容易。如果我们比较两者的变化，可以发现，只有首尾元素发生了变动。",-1),q=p("",27),v=p("",12),T=l("p",null,[s("其他的切分方式都是这两种切分方式的子集。更进一步，我们可以有如下"),l("strong",null,"切分结论"),s("：字符串 s 要按固定长度 L 切分时，只有 L 种切分方式。")],-1),x=l("p",null,"不同的切分方式，就好像生成了不同的数组一样，如下图所示：",-1),w=p("",9),P=p("",13),j=p("",15),S=p("",6),O=l("h3",{id:"思考题",tabindex:"-1"},[s("思考题 "),l("a",{class:"header-anchor",href:"#思考题","aria-label":'Permalink to "思考题"'},"​")],-1),V=l("p",null,[s('这里我给你再留一道思考题：在"'),l("a",{href:"https://kaiwu.lagou.com/course/courseInfo.htm?courseId=685#/detail/pc?id=6698&fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"第 09 讲"),s('"中，我们可以利用二分搜索的办法解决一些最长子串、最短子串的题目。其根本原因是什么？练习题 6 不能使用双指针模板，那么二分搜索可以吗？')],-1),R=l("p",null,"希望你可以把思考写在留言区，我们一起讨论，如果看到有趣的想法，我也会做成加餐和大家分享。：）",-1),H=l("p",null,"关于双指针的知识我们就学到这里，并且有相应的代码模板。可是，并不是所有的问题都有模板可以套用的，接下来我们进入没有代码模板的算法类型。11｜贪心：这种思想，没有模板，如何才能掌握它？请和我一起踏上更加奇妙的算法旅程，记得按时来探险。",-1);function N(K,L,I,Q,X,G){const n=e("Image");return t(),c("div",null,[E,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/2B/FA/Cgp9HWBkhT-Abjx2AAA8vUVJFPw202.png"}),s(),y,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/2B/FA/Cgp9HWBkhUaAau8tAAB0ktRDZ1k620.png"}),s(),i,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/02/CioPOWBkhU6AYF-_AAC-KaWKVKw163.png"}),s(),A,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/02/CioPOWBkhVOABOSlAACCwqTl-NM650.png"}),s(),F,D,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/2B/FA/Cgp9HWBkhVqAY6gsAACG8pko9yU592.png"}),s(),g,u,C,a(n,{alt:"1.gif",src:"https://s0.lgstatic.com/i/image6/M00/2C/02/CioPOWBkhWuAJBqhAAg8Mji53d0501.gif"}),s(),h,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/2B/FA/Cgp9HWBkhYaADxRBAABXMBkDfoQ967.png"}),s(),d,a(n,{alt:"2.gif",src:"https://s0.lgstatic.com/i/image6/M00/2B/FA/Cgp9HWBkhZKAQoB0AAgbjm0tF6w084.gif"}),s(),B,a(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/2B/FA/Cgp9HWBkhaqAf1zwAABiSObaZeA356.png"}),s(),f,a(n,{alt:"3.gif",src:"https://s0.lgstatic.com/i/image6/M00/2C/03/CioPOWBkhbmARBwhAAn3-RHORc0122.gif"}),s(),b,a(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M01/2B/FA/Cgp9HWBkhciAT_0sAADFc6oIePE139.png"}),s(),_,a(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M00/2B/FA/Cgp9HWBkhdyAN1WxAAEbHio0cA8786.png"}),s(),m,a(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M01/2B/FA/Cgp9HWBkheeAR-sCAADcf5wNUa0724.png"}),s(),k,a(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/03/CioPOWBkhe6AMvLuAAEIxUpEirg181.png"}),s(),q,a(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/03/CioPOWBkhgOACLehAACpKHyfg0E724.png"}),s(),v,a(n,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/03/CioPOWBkhhOAV3QYAAD_YpJTpAU095.png"}),s(),T,x,a(n,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/03/CioPOWBkhhmAZHlVAACMmgO8dAQ651.png"}),s(),w,a(n,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/03/CioPOWBkhiWAKqnXAACZ5oVzMVw160.png"}),s(),P,a(n,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image6/M01/2B/FA/Cgp9HWBkhi6AJ0KbAAEVfXDQr3M350.png"}),s(),j,a(n,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image6/M01/2B/FA/Cgp9HWBkhjyAbuTpAACpwX81ei4297.png"}),s(),S,a(n,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/03/CioPOWBkhkWARgCNAAD_-oFBQLA198.png"}),s(),O,V,R,H])}const z=o(r,[["render",N]]);export{W as __pageData,z as default};

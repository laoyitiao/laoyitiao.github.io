import{_ as e,j as i,o as s,g as a,k as n,h as o,Q as l,s as t}from"./chunks/framework.4e7d56ce.js";const U=JSON.parse('{"title":"课前必读构建知识体系，可以这样做！","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4607) 课前必读  构建知识体系，可以这样做！.md","filePath":"posts/backEnd/重学操作系统_文档/(4607) 课前必读  构建知识体系，可以这样做！.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/重学操作系统_文档/(4607) 课前必读  构建知识体系，可以这样做！.md"},_=l("",18),c=l("",13),d=t("p",null,"注意，上图梳理出来的知识关系不一定对，但是你一定要敢于去画，这个梳理和探索的过程能够带动你主动思考，锻炼主动解决问题的能力。",-1),u=t("p",null,"输出思维导图后，我将开始学习上面那些超出我现阶段知识储备的内容，然后进行归类和整理。",-1),h=t("p",null,"这时候，我发现公平锁、可重入锁其实都是锁的一种实现，而 Java 中实现锁这个机制用的是 AQS，而 AQS 最基本的问题是要解决资源竞争的问题。",-1),g=t("p",null,"通过学习，我发现资源竞争的问题在操作系统里叫作竞争条件，解决方案是让临界区互斥。让临界区互斥可以用算法的实现，但是为了执行效率，更多的情况是利用 CPU 指令。Java 里用于实现互斥的原子操作 CAS，也是基于 CPU 指令的。",-1),A=t("p",null,"操作系统在解决了互斥问题的基础上，还提供了解决更复杂问题的数据结构，比如说信号量、竞争条件等；而程序语言也提供了数据结构，比如说可重入锁、公平锁。",-1),k=t("p",null,"经过一番探索，我终于弄明白了，原来实际应用场景中对锁有各种各样的需求，因此不仅仅需要信号量等数据结构，甚至还需要一个快速实现这种数据结构的框架，这个框架就是 AQS。我们可以用 AQS 实现 ReentrantLockLock 的功能。",-1),S=t("p",null,[o("通过上面的方法，我不仅仅可以把 ReentrantLockLockt 学透，而且顺藤摸瓜找到了所有关联的知识点，比如 AQS 和 CAS。"),t("strong",null,"比起理解最初的知识点，更重要的是我通过这种方法形成了自己的一个知识体系；而且，我会发现在这个知识体系中，操作系统是起到支撑作用的骨架"),o("。")],-1),m=t("p",null,"与此同时，我还认识到了计算机语言和操作系统之间的联系非常紧密，操作系统知识是学习计算机语言的根基。于是我开始制定学习计划，投入时间学习操作系统。我更偏爱做一次性的时间投入，以防止日后碎片化学习做多次投入，陷入时间黑洞，而这个嗜好让我受益良多。",-1),L=t("h3",{id:"寄语",tabindex:"-1"},[o("寄语 "),t("a",{class:"header-anchor",href:"#寄语","aria-label":'Permalink to "寄语"'},"​")],-1),C=t("p",null,[o("最后，希望今天的课程和学习方法可以帮助到你；也希望你平时遇到未知的问题，尝试使用我今天介绍的方法，学会构建自己的知识体系，提高自己的学商。"),t("strong",null,"你可以在留言区给自己立下 Flag，比如给自己定一个具体的目标，或者是打卡你的学习天数，总之希望你不要一看而过，留下你的思考。经过长期的积累，相信你会得到意想不到的收获"),o("。")],-1),P=t("p",null,"如果你还想知道更多的学习方法，和学习本文提及的技术名词，请你打开 01 课时，开启你的操作系统学习之路。",-1);function b(x,T,Q,q,I,f){const p=i("Image");return s(),a("div",null,[_,n(p,{alt:"目录.png",src:"https://s0.lgstatic.com/i/image/M00/4B/79/Ciqc1F9Vz7iAK8H4ABJ1CUDF2Sg647.png"}),o(),c,n(p,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/4C/52/CgqCHl9XZQCALTi6AAIjl6n0qNQ452.png"}),o(),d,u,h,g,A,k,n(p,{alt:"Lark20200907-165512.png",src:"https://s0.lgstatic.com/i/image/M00/4B/A2/Ciqc1F9V_ciAV08TAAGaQSyH17o250.png"}),o(),S,m,L,C,P])}const B=e(r,[["render",b]]);export{U as __pageData,B as default};

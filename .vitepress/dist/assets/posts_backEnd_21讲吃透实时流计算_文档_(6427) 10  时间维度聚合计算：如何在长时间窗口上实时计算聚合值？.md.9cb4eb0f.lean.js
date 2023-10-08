import{_ as p,j as t,o as e,g as c,k as a,h as o,Q as l,s}from"./chunks/framework.4e7d56ce.js";const h=JSON.parse('{"title":"10时间维度聚合计算：如何在长时间窗口上实时计算聚合值？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6427) 10  时间维度聚合计算：如何在长时间窗口上实时计算聚合值？.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6427) 10  时间维度聚合计算：如何在长时间窗口上实时计算聚合值？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/21讲吃透实时流计算_文档/(6427) 10  时间维度聚合计算：如何在长时间窗口上实时计算聚合值？.md"},y=l("",21),E=s("p",null,'在上面的图 1 中，我们以计算"过去一周在相同设备上交易次数"为例。由于是要计算"过去一周"的时间范围，所以我们将每个窗口设置为 1 天。换言之，图 1 中的窗口 1、窗口 2 和窗口 3 ，都各自代表了 1 天的时间长度。在窗口 1 中，首先出现的是设备 1 上的交易事件，所以我们分配一个名字（对应 Redis 里的 key）为"设备1.窗口1.count寄存器"的寄存器，来记录设备 1 在窗口 1 内交易事件发生的次数。这个 count 寄存器的初始值是 0，每当窗口 1 内来了一个设备 1 上的交易事件时，我们就将这个 count 寄存器的值加 1。这样，当窗口 1 结束时，"设备1.窗口1.count寄存器"的值，就变为了 2。同样，对于其他设备和其他窗口的交易事件，也用相同的方式，分配对应设备和窗口的寄存器，并在每次交易事件到来时，将寄存器的值加 1 。',-1),i=s("p",null,'通过上面的方法，最终我们就可以得到各个设备在各个窗口内的交易次数了。而由于我们的计算目标是"过去一周在相同设备上交易次数"，且每个窗口代表 1 天，所以只需要将连续 7 个窗口内寄存器值读取出来后，累加起来即可得到最终结果了。',-1),d=s("p",null,"以上就是使用寄存器实现 count 计算的整体思路。同样，对于 sum、avg、variance、min、max 等其他类型的时间维度聚合值，都可以按照这种思路来进行计算，只需要先设计好需要使用的寄存器即可。",-1),u=s("p",null,"下面的表 1 就总结了在采用寄存器方法计算各种聚合值时，所需要的寄存器以及各个寄存器的含义。",-1),_=l("",27);function F(D,q,A,B,g,m){const n=t("Image");return e(),c("div",null,[y,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/05/04/CioPOWAvgBmAGg9WAAV6cVzpv38832.png"}),o(),E,i,d,u,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/05/04/CioPOWAvgCKADPo6AACBcbpagaQ422.png"}),o(),_,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/05/04/CioPOWAvgDeAIb17AAiMLSymHYg627.png"})])}const C=p(r,[["render",F]]);export{h as __pageData,C as default};

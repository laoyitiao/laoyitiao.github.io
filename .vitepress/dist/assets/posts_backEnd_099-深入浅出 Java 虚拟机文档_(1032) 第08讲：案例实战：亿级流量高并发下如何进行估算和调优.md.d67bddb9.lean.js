import{_ as t,j as n,o as r,g as o,k as e,h as a,Q as l,s as p}from"./chunks/framework.4e7d56ce.js";const F=JSON.parse('{"title":"第08讲：案例实战：亿级流量高并发下如何进行估算和调优","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1032) 第08讲：案例实战：亿级流量高并发下如何进行估算和调优.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1032) 第08讲：案例实战：亿级流量高并发下如何进行估算和调优.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1032) 第08讲：案例实战：亿级流量高并发下如何进行估算和调优.md"},c=l("",8),_=l("",23),d=l("",31),h=p("p",null,"这个接口每天有 10 亿次请求，假如每次请求的大小有 20KB（很容易达到），那么一天的流量就有 18TB 之巨。假如高峰请求 6w/s，我们部署了 10 台机器，那么每个 JVM 的流量就可以达到 120MB/s，这个速度算是比较快的了。",-1),C=p("br",null,null,-1),u=p("p",null,"如果你实在不知道怎么去算这个数字，那就按照峰值的 2 倍进行准备，一般都是 OK 的。",-1),M=p("h2",{id:"调优",tabindex:"-1"},[p("strong",null,"调优"),a(),p("a",{class:"header-anchor",href:"#调优","aria-label":'Permalink to "**调优**"'},"​")],-1),b=p("p",null,"问题是这样的，我们的机器是 4C8GB 的，分配给了 JVM 1024*8GB/3*2= 5460MB 的空间。那么年轻代大小就有 5460MB/3=1820MB。进而可以推断出，Eden 区的大小约 1456MB，那么大约只需要 12 秒，就会发生一次 Minor GC。不仅如此，每隔半个小时，会发生一次 Major GC。",-1),g=p("br",null,null,-1),m=p("p",null,"不管是年轻代还是老年代，这个 GC 频率都有点频繁了。",-1),G=p("br",null,null,-1),A=p("p",null,"提醒一下，你可以算一下我们的 Survivor 区大小，大约是 182MB 左右，如果稍微有点流量偏移，或者流量突增，再或者和其他接口共用了 JVM，那么这个 Survivor 区就已经装不下 Minor GC 后的内容了。总有一部分超出的容量，需要老年代来补齐。这些垃圾信息就要保存更长时间，直到老年代空间不足。",-1),S=l("",22),X=l("",39),T=p("p",null,"我们的业务场景是高并发的。对象诞生的快，死亡的也快，对年轻代的利用直接影响了整个堆的垃圾收集。",-1),E=p("ol",null,[p("li",null,[p("p",null,"足够大的年轻代，会增加系统的吞吐，但不会增加 GC 的负担。")]),p("li",null,[p("p",null,"容量足够的 Survivor 区，能够让对象尽可能的留在年轻代，减少对象的晋升，进而减少 Major GC。")])],-1),f=p("p",null,"我们还看到了一个元空间引起的 Full GC 的过程，这在高并发的场景下影响会格外突出，尤其是对于使用了大量动态类的应用来说。通过调大它的初始值，可以解决这个问题。",-1);function P(x,B,v,k,q,V){const s=n("Image");return r(),o("div",null,[c,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/3A/Cgq2xl46fZWAWCoGAAA3VOaTr84317.jpg"}),a(),_,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/3A/CgpOIF46fZaAayKmAAB-STpPCqE329.jpg"}),a(),d,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/3A/Cgq2xl46fZaAO72aAAA4OLCDFY8759.jpg"}),a(),h,C,u,M,b,g,m,G,A,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/3A/CgpOIF46fZaAVfIrAABFG82aL4g533.jpg"}),a(),S,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/3A/Cgq2xl46fZaAY-3RAABSuNepQBc171.jpg"}),a(),X,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/3A/CgpOIF46fZaAaDmGAAAiJ8r2B9M904.jpg"}),a(),T,E,f])}const I=t(i,[["render",P]]);export{F as __pageData,I as default};

import{_ as l,j as o,o as e,g as t,k as p,h as a,Q as r,s}from"./chunks/framework.4e7d56ce.js";const S=JSON.parse('{"title":"第04讲：ZooKeeper如何进行序列化？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3134) 第04讲：ZooKeeper 如何进行序列化？.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3134) 第04讲：ZooKeeper 如何进行序列化？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3134) 第04讲：ZooKeeper 如何进行序列化？.md"},E=r("",31),i=s("p",null,"而对应于序列化操作，在反序列化时也会相应调用不同的实现类，来进行反序列化操作。",-1),y=s("p",null,"如下图所示：",-1),d=s("p",null,"注意：无论是序列化还是反序列化，都可以对多个对象进行操作，所以当我们在定义序列化和反序列化方法时，需要字符类型参数 tag 表示要序列化或反序列化哪个对象。",-1),u=s("h4",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),h=s("p",null,"本课时介绍了什么是序列化以及为什么要进行序列化，简单来说，就是将对象编译成字节码的形式，方便将对象信息存储到本地或通过网络传输。",-1),g=s("p",null,"之后我们复习了 Java 中的序列化方式，与 ZooKeeper 中的序列化使用不同的是，在 Java 中，Serializable 接口是一个空接口，只是起到标识作用，实现了该接口的对象是需要进行序列化的。而在 ZooKeeper 的实现中，序列化对象需要实现的 Record 接口里边存在两个重要的方法，分别是 serialize 和 deserialize 方法。需要序列化的对象在继承 Record 接口的同时，还需要实现这两个方法。而具体的实现过程就是我们要序列化和反序列化的实现逻辑。",-1),F=s("p",null,"到现在我们已经对 ZooKeeper 中的序列化知识有了一个全面的掌握，请你思考一个问题：如果说序列化就是将对象转化成字节流的格式，那么为什么 ZooKeeper 的 Jute 序列化框架还提供了对 Byte/Buffer 这两种类型的序列化操作呢？",-1),v=s("p",null,"其实这其中最关键的作用就是在不同操作系统中存在大端和小端的问题，为了避免不同操作系统环境的差异，在传输字节类型时也要进行序列化和反序列化。这里你需要在日常使用中多注意。",-1);function _(b,A,m,C,B,D){const n=o("Image");return e(),t("div",null,[E,p(n,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/0A/C3/Ciqc1F6-a8CAUVfhAABcAV_NNXw402.png"}),a(),i,y,p(n,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/0A/C3/CgqCHl6-a8mAOP1YAABW8fO1GAM913.png"}),a(),d,u,h,g,F,v])}const j=l(c,[["render",_]]);export{S as __pageData,j as default};

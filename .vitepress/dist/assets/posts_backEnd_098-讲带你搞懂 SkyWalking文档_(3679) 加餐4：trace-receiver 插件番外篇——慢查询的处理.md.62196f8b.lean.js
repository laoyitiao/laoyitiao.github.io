import{_ as p,j as e,o,g as t,k as a,h as n,Q as l,s as c}from"./chunks/framework.a0d18f64.js";const C=JSON.parse('{"title":"加餐4：trace-receiver插件番外篇——慢查询的处理","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3679) 加餐4：trace-receiver 插件番外篇——慢查询的处理.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3679) 加餐4：trace-receiver 插件番外篇——慢查询的处理.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3679) 加餐4：trace-receiver 插件番外篇——慢查询的处理.md"},E=l("",8),y=l("",6),i=c("p",null,"在 TopNWorker.onWorker() 方法中会将 TopNDatabaseStatement 暂存到 LimitedSizeDataCache 中进行排序。LimitedSizeDataCache 使用双队列模式，继承了 Windows 抽象类，与前文介绍的 MergeDataCache 类似。LimitedSizeDataCache 底层的队列实现是 LimitedSizeDataCollection，其 data 字段（Map 类型）中维护了每个存储服务的慢查询（即 TopNDatabaseStatement）列表，每个列表都是定长的（由 limitedSize 字段指定，默认 50），在调用 limitedSizeDataCollection.put() 方法写入的时候会按照 latency 从大到小排列，并只保留最多 50 个元素，如下图所示：",-1),d=l("",12);function D(F,m,A,h,g,u){const s=e("Image");return o(),t("div",null,[E,a(s,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/59/CgqCHl7oY-2AXRtrAAFtUKJ2T34195.png"}),n(),y,a(s,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/4D/Ciqc1F7oZASAZ822AAEjgROFXtk196.png"}),n(),i,a(s,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/4D/Ciqc1F7oZCCAdh83AAKfFxpviaQ344.png"}),n(),d])}const k=p(r,[["render",D]]);export{C as __pageData,k as default};

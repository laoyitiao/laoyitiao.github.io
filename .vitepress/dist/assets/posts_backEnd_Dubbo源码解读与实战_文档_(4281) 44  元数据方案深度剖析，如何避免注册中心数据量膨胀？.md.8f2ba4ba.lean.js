import{_ as o,j as e,o as t,g as r,k as p,h as s,Q as l,s as a}from"./chunks/framework.4e7d56ce.js";const _=JSON.parse('{"title":"44元数据方案深度剖析，如何避免注册中心数据量膨胀？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4281) 44  元数据方案深度剖析，如何避免注册中心数据量膨胀？.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4281) 44  元数据方案深度剖析，如何避免注册中心数据量膨胀？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4281) 44  元数据方案深度剖析，如何避免注册中心数据量膨胀？.md"},E=l("",12),y=a("p",null,"TypeBuilder 接口实现关系图",-1),i=a("p",null,[a("strong",null,"在服务发布的时候，会将服务的 URL 中的部分数据封装为 FullServiceDefinition 对象，然后作为元数据存储起来"),s("。FullServiceDefinition 继承了 ServiceDefinition，并在 ServiceDefinition 基础之上扩展了 params 集合（Map<String, String> 类型），用来存储 URL 上的参数。")],-1),d=a("h3",{id:"metadataservice",tabindex:"-1"},[s("MetadataService "),a("a",{class:"header-anchor",href:"#metadataservice","aria-label":'Permalink to "MetadataService"'},"​")],-1),F=a("p",null,[s("接下来看 MetadataService 接口，在上一讲我们提到"),a("strong",null,"Dubbo 中的每个 ServiceInstance 都会发布 MetadataService 接口供 Consumer 端查询元数据"),s("，下图展示了 MetadataService 接口的继承关系：")],-1),u=l("",23),v=l("",22),g=a("h4",{id:"_2-basemetadataidentifier",tabindex:"-1"},[s("2. BaseMetadataIdentifier "),a("a",{class:"header-anchor",href:"#_2-basemetadataidentifier","aria-label":'Permalink to "2. BaseMetadataIdentifier"'},"​")],-1),D=a("p",null,"在 AbstractMetadataReport 上报元数据的时候，元数据对应的 Key 都是BaseMetadataIdentifier 类型的对象，其继承关系如下图所示：",-1),A=l("",7),S=l("",26),C=l("",14);function f(b,m,R,h,M,B){const n=e("Image");return t(),r("div",null,[E,p(n,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/8C/22/CgqCHl_lrYOAIzjeAAFEk3cUdpg570.png"}),s(),y,i,d,F,p(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FC/CgpVE1_lrZGANC4vAAGdcllZU9o940.png"}),s(),u,p(n,{alt:"2.png",src:"https://s0.lgstatic.com/i/image2/M01/03/FA/Cip5yF_lramAYf82AAFkkbA0N2g785.png"}),s(),v,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8B/DD/CgqCHl_hcauAR9AQAAG7kMJSlc8827.png"}),s(),g,D,p(n,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/8C/17/Ciqc1F_lrb-Ad3a5AAGJ2ySdyBE643.png"}),s(),A,p(n,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/8C/22/CgqCHl_lrcmAEIYBAAFSOVpEU1Y779.png"}),s(),S,p(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/03/B6/Cip5yF_hcfmAMtHdAABVR_mzQyg047.png"}),s(),C])}const P=o(c,[["render",f]]);export{_ as __pageData,P as default};

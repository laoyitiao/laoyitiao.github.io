import{_ as p,j as e,o as t,g as r,k as o,h as l,Q as n,s}from"./chunks/framework.cfb14fe0.js";const x=JSON.parse('{"title":"第11讲：HDFS组件运行机制剖析及HDFSShell的使用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3082) 第11讲：HDFS 组件运行机制剖析及 HDFS Shell 的使用.md","filePath":"posts/devops/042_大数据运维实战/(3082) 第11讲：HDFS 组件运行机制剖析及 HDFS Shell 的使用.md","lastUpdated":1696682708000}'),c={name:"posts/devops/042_大数据运维实战/(3082) 第11讲：HDFS 组件运行机制剖析及 HDFS Shell 的使用.md"},y=n("",5),E=n("",17),d=n("",6),i=n("",15),F=s("p",null,"可以看出，HDFS 数据块文件名组成格式为：",-1),m=s("ul",null,[s("li",null,"blk_，HDFS 的数据块，保存具体的二进制数据；"),s("li",null,"blk_.meta，数据块的属性信息，比如版本信息、类型信息。")],-1),g=s("p",null,"这些数据块非常重要，要确保它们的安全。",-1),N=s("p",null,"介绍了 HDFS 的数据块结构后，下面介绍下 HDFS 是如何读取数据的。下图是 HDFS 读取数据的一个流程图：",-1),h=s("p",null,"从上图可以看出，HDFS 读取文件基本分为 5 个步骤，每个步骤含义如下：",-1),D=s("ol",null,[s("li",null,"客户端向 NameNode 请求读取一个文件，NameNode 通过查询元数据，找到请求文件对应的数据块所在的位置，也就是块文件对应的 DataNode 节点地址；"),s("li",null,"NameNode 返回自己查询到的元数据信息给客户端；"),s("li",null,"客户端挑选一台 DataNode（根据就近原则，然后随机原则）服务器，开始请求读取数据；"),s("li",null,"DataNode 开始传输数据给客户端（从磁盘里面读取数据放入流，以 packet 为单位来做校验）；"),s("li",null,"客户端以 packet 为单位接收，先在本地缓存，然后写入目标文件。")],-1),A=s("p",null,"可以看出，HDFS 读取文件的流程非常简单。接着，再来看看 HDFS 是如何写入数据的，这个过程稍微复杂，如下图所示：",-1),_=n("",32);function S(C,u,v,H,b,f){const a=e("Image");return t(),r("div",null,[y,o(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/16/18/CgqCHl7U4HOAXZEFAAJszKiTB6o267.png"}),l(),E,o(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/16/0D/Ciqc1F7U4FSAZPkNAAG0gIoCEHE433.png"}),l(),d,o(a,{alt:"image3.png",src:"https://s0.lgstatic.com/i/image/M00/15/D2/CgqCHl7UqTmAazCJAACxChYVipc532.png"}),l(),i,o(a,{alt:"image4.png",src:"https://s0.lgstatic.com/i/image/M00/15/C7/Ciqc1F7UqUOAMiyxAAB6XluvVzs412.png"}),l(),F,m,g,N,o(a,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/16/19/CgqCHl7U4LaAYHtjAAHdezX8IO8904.png"}),l(),h,D,A,o(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/16/18/CgqCHl7U4IWAbSbsAAIQMoyHI-s874.png"}),l(),_])}const B=p(c,[["render",S]]);export{x as __pageData,B as default};

import{_ as i,j as e,o as _,g as s,k as t,h as a,s as o,Q as l}from"./chunks/framework.b3d8e22e.js";const x=JSON.parse('{"title":"领导选举 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6310) 15  领导选举：如何在分布式系统内安全地协调操作？.md","filePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6310) 15  领导选举：如何在分布式系统内安全地协调操作？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/24讲吃透分布式数据库_文档/(6310) 15  领导选举：如何在分布式系统内安全地协调操作？.md"},n=o("p",null,"这一讲我们来聊聊如何在分布式数据库，乃至一般性的分布式系统内同步数据。",-1),u=o("p",null,"不知道你是否发现这样一种事实：同步数据是一种代价非常高昂的操作，如果同步过程中需要所有参与的节点互相进行操作，那么其通信开销会非常巨大。",-1),c=o("p",null,"如下图所示，随着参与节点的增加，其通信成本逐步提高，最终一定会导致数据在集群内不一致。尤其在超大型和地理空间上分散的集群网络中，此现象会进一步被放大。",-1),h=l("",34),A=l("",9),d=l("",6),q=l("",6),g=l("",8),T=l("",8),m=o("p",null,"如上图所示，目前有 2 个网络、5 个节点，假定最小法定人数是3。A 目前作为集群的领导，A、B 在一个网络，C、D 和 E 在另外一个网络，两个网络被连接在一起。",-1),b=o("p",null,"当这个连接失败后，A、B 还能连接彼此，但与 C、D 和 E 失去了联系。同样， C、D 和 E 也能知道彼此，但无法连接到A 和B。",-1),P=l("",10);function I(S,C,B,D,f,k){const p=e("Image");return _(),s("div",null,[n,u,c,t(p,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M01/12/1A/Cgp9HWBAg1WAMJSeAAmb3CQAK8c947.png"}),h,t(p,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M01/12/1A/Cgp9HWBAgz6ACZ7cAAGz4XQSe7k124.png"}),A,t(p,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M01/12/1A/Cgp9HWBAgyiASTuOAAEvB_5pb9Y354.png"}),d,t(p,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/12/1A/Cgp9HWBAgxCAfpF9AAFu9dwQ88A246.png"}),a(),q,t(p,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/12/17/CioPOWBAgvGAf7oAAAEJSQipffQ915.png"}),a(),g,t(p,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/12/1A/Cgp9HWBAgtOACHgSAAFyqlQuKBg898.png"}),a(),T,t(p,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/12/17/CioPOWBAgpiAVhu-AADkS-gk7Hg813.png"}),a(),m,b,t(p,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/12/17/CioPOWBAgp2ASsgOAADksl2TX_4763.png"}),a(),P])}const V=i(r,[["render",I]]);export{x as __pageData,V as default};

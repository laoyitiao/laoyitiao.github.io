import{_ as t,j as l,o as d,g as i,k as a,s as e,h as r,Q as n}from"./chunks/framework.b3d8e22e.js";const O=JSON.parse('{"title":"Redis 复制原理 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(207) 第27讲：Redi是如何进行主从复制的？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(207) 第27讲：Redi是如何进行主从复制的？.md","lastUpdated":1696417798000}'),p={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(207) 第27讲：Redi是如何进行主从复制的？.md"},o=e("p",null,"本课时我们主要学习 Redis 复制原理，以及复制分析等内容。",-1),_=e("h2",{id:"redis-复制原理",tabindex:"-1"},[r("Redis 复制原理 "),e("a",{class:"header-anchor",href:"#redis-复制原理","aria-label":'Permalink to "Redis 复制原理"'},"​")],-1),m=e("p",null,"为了避免单点故障，数据存储需要进行多副本构建。同时由于 Redis 的核心操作是单线程模型的，单个 Redis 实例能处理的请求 TPS 有限。因此 Redis 自面世起，基本就提供了复制功能，而且对复制策略不断进行优化。",-1),c=e("p",null,"通过数据复制，Redis 的一个 master 可以挂载多个 slave，而 slave 下还可以挂载多个 slave，形成多层嵌套结构。所有写操作都在 master 实例中进行，master 执行完毕后，将写指令分发给挂在自己下面的 slave 节点。slave 节点下如果有嵌套的 slave，会将收到的写指令进一步分发给挂在自己下面的 slave。通过多个 slave，Redis 的节点数据就可以实现多副本保存，任何一个节点异常都不会导致数据丢失，同时多 slave 可以 N 倍提升读性能。master 只写不读，这样整个 master-slave 组合，读写能力都可以得到大幅提升。",-1),v=e("p",null,"master 在分发写请求时，同时会将写指令复制一份存入复制积压缓冲，这样当 slave 短时间断开重连时，只要 slave 的复制位置点仍然在复制积压缓冲，则可以从之前的复制位置点之后继续进行复制，提升复制效率。",-1),b=e("p",null,"主库 master 和从库 slave 之间通过复制 id 进行匹配，避免 slave 挂到错误的 master。Redis 的复制分为全量同步和增量同步。Redis 在进行全量同步时，master 会将内存数据通过 bgsave 落地到 rdb，同时，将构建 内存快照期间 的写指令，存放到复制缓冲中，当 rdb 快照构建完毕后，master 将 rdb 和复制缓冲队列中的数据全部发送给 slave，slave 完全重新创建一份数据。这个过程，对 master 的性能损耗较大，slave 构建数据的时间也比较长，而且传递 rdb 时还会占用大量带宽，对整个系统的性能和资源的访问影响都比较大。而增量复制，master 只发送 slave 上次复制位置之后的写指令，不用构建 rdb，而且传输内容非常有限，对 master、slave 的负荷影响很小，对带宽的影响可以忽略，整个系统受影响非常小。",-1),h=e("p",null,"在 Redis 2.8 之前，Redis 基本只支持全量复制。在 slave 与 master 断开连接，或 slave 重启后，都需要进行全量复制。在 2.8 版本之后，Redis 引入 psync，增加了一个复制积压缓冲，在将写指令同步给 slave 时，会同时在复制积压缓冲中也写一份。在 slave 短时断开重连后，上报master runid 及复制偏移量。如果 runid 与 master 一致，且偏移量仍然在 master 的复制缓冲积压中，则 master 进行增量同步。",-1),u=e("br",null,null,-1),R=e("br",null,null,-1),f=e("p",null,"但如果 slave 重启后，master runid 会丢失，或者切换 master 后，runid 会变化，仍然需要全量同步。因此 Redis 自 4.0 强化了 psync，引入了 psync2。在 pysnc2 中，主从复制不再使用 runid，而使用 replid（即复制id） 来作为复制判断依据。同时 Redis 实例在构建 rdb 时，会将 replid 作为 aux 辅助信息存入 rbd。重启时，加载 rdb 时即可得到 master 的复制 id。从而在 slave 重启后仍然可以增量同步。",-1),g=e("br",null,null,-1),A=e("br",null,null,-1),y=e("p",null,"在 psync2 中，Redis 每个实例除了会有一个复制 id 即 replid 外，还有一个 replid2。Redis 启动后，会创建一个长度为 40 的随机字符串，作为 replid 的初值，在建立主从连接后，会用 master的 replid 替换自己的 replid。同时会用 replid2 存储上次 master 主库的 replid。这样切主时，即便 slave 汇报的复制 id 与新 master 的 replid 不同，但和新 master 的 replid2 相同，同时复制偏移仍然在复制积压缓冲区内，仍然可以实现增量复制。",-1),k=e("h2",{id:"redis-复制分析",tabindex:"-1"},[r("Redis 复制分析 "),e("a",{class:"header-anchor",href:"#redis-复制分析","aria-label":'Permalink to "Redis 复制分析"'},"​")],-1),P=e("p",null,"在设置 master、slave 时，首先通过配置或者命令 slaveof no one 将节点设置为主库。然后其他各个从库节点，通过 slaveof $master_ip $master_port，将其他从库挂在到 master 上。同样方法，还可以将 slave 节点挂载到已有的 slave 节点上。在准备开始数据复制时，slave 首先会主动与 master 创建连接，并上报信息。具体流程如下。",-1),B=n("",12);function T(V,x,C,D,I,N){const s=l("Image");return d(),i("div",null,[o,_,m,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/57/CgotOV3c5d2AJsqpAAB0B4B_zA8513.png"}),c,v,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/58/CgotOV3c5fmAQ5OvAACeruRhP28355.png"}),b,h,u,R,f,g,A,y,k,P,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AD/38/CgoB5l3c5mmAOiI4AAD4XdbOnAI114.png"}),B])}const S=t(p,[["render",T]]);export{O as __pageData,S as default};

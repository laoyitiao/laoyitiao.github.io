import{_ as d,j as a,o as p,g as c,k as e,h as s,Q as l,s as i}from"./chunks/framework.4e7d56ce.js";const ti=JSON.parse('{"title":"第22讲：怎么认识和应用Redi内部数据结构？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(202) 第22讲：怎么认识和应用Redi内部数据结构？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(202) 第22讲：怎么认识和应用Redi内部数据结构？.md","lastUpdated":1696682708000}'),o={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(202) 第22讲：怎么认识和应用Redi内部数据结构？.md"},_=l("",4),n=i("p",null,"Redis 中所有数据都保存在 DB 中，一个 Redis 默认最多支持 16 个 DB。Redis 中的每个 DB 都对应一个 redisDb 结构，即每个 Redis 实例，默认有 16 个 redisDb。用户访问时，默认使用的是 0 号 DB，可以通过 select $dbID 在不同 DB 之间切换。",-1),r=i("p",null,"redisDb 主要包括 2 个核心 dict 字典、3 个非核心 dict 字典、dbID 和其他辅助属性。2 个核心 dict 包括一个 dict 主字典和一个 expires 过期字典。主 dict 字典用来存储当前 DB 中的所有数据，它将 key 和各种数据类型的 value 关联起来，该 dict 也称 key space。过期字典用来存储过期时间 key，存的是 key 与过期时间的映射。日常的数据存储和访问基本都会访问到 redisDb 中的这两个 dict。",-1),h=i("p",null,"3 个非核心 dict 包括一个字段名叫 blocking_keys 的阻塞 dict，一个字段名叫 ready_keys 的解除阻塞 dict，还有一个是字段名叫 watched_keys 的 watch 监控 dict。",-1),u=i("p",null,"在执行 Redis 中 list 的阻塞命令 blpop、brpop 或者 brpoplpush 时，如果对应的 list 列表为空，Redis 就会将对应的 client 设为阻塞状态，同时将该 client 添加到 DB 中 blocking_keys 这个阻塞 dict。所以该 dict 存储的是处于阻塞状态的 key 及 client 列表。",-1),g=i("p",null,"当有其他调用方在向某个 key 对应的 list 中增加元素时，Redis 会检测是否有 client 阻塞在这个 key 上，即检查 blocking_keys 中是否包含这个 key，如果有则会将这个 key 加入 read_keys 这个 dict 中。同时也会将这个 key 保存到 server 中的一个名叫 read_keys 的列表中。这样可以高效、不重复的插入及轮询。",-1),k=i("p",null,"当 client 使用 watch 指令来监控 key 时，这个 key 和 client 就会被保存到 watched_keys 这个 dict 中。redisDb 中可以保存所有的数据类型，而 Redis 中所有数据类型都是存放在一个叫 redisObject 的结构中。",-1),A=i("h6",{id:"redisobject",tabindex:"-1"},[s("redisObject "),i("a",{class:"header-anchor",href:"#redisobject","aria-label":'Permalink to "redisObject"'},"​")],-1),b=l("",4),m=i("p",null,"Redis 中的 dict，类似于 Memcached 中 hashtable。都可以用于 key 或元素的快速插入、更新和定位。dict 字典中，有一个长度为 2 的哈希表数组，日常访问用 0 号哈希表，如果 0 号哈希表元素过多，则分配一个 2 倍 0 号哈希表大小的空间给 1 号哈希表，然后进行逐步迁移，rehashidx 这个字段就是专门用来做标志迁移位置的。在哈希表操作中，采用单向链表来解决 hash 冲突问题。dict 中还有一个重要字段是 type，它用于保存 hash 函数及 key/value 赋值、比较函数。",-1),z=i("p",null,"dictht 中的 table 是一个 hash 表数组，每个桶指向一个 dictEntry 结构。dictht 采用 dictEntry 的单向链表来解决 hash 冲突问题。",-1),R=i("p",null,"dictht 是以 dictEntry 来存 key-value 映射的。其中 key 是 sds 字符串，value 为存储各种数据类型的 redisObject 结构。",-1),B=i("p",null,"dict 可以被 redisDb 用来存储数据 key-value 及命令操作的辅助信息。还可以用来作为一些 Redis 数据类型的内部数据结构。dict 可以作为 set 集合的内部数据结构。在哈希的元素数超过 512 个，或者哈希中 value 大于 64 字节，dict 还被用作为哈希类型的内部数据结构。",-1),y=i("h6",{id:"sds",tabindex:"-1"},[s("sds "),i("a",{class:"header-anchor",href:"#sds","aria-label":'Permalink to "sds"'},"​")],-1),D=i("p",null,"字符串是 Redis 中最常见的数据类型，其底层实现是简单动态字符串即 sds。简单动态字符串本质是一个 char*，内部通过 sdshdr 进行管理。sdshdr 有 4 个字段。len 为字符串实际长度，alloc 当前字节数组总共分配的内存大小。flags 记录当前字节数组的属性；buf 是存储字符串真正的值及末尾一个 \\0。",-1),C=i("p",null,"sds 的存储 buf 可以动态扩展或收缩，字符串长度不用遍历，可直接获得，修改和访问都很方便。由于 sds 中字符串存在 buf 数组中，长度由 len 定义，而不像传统字符串遇 0 停止，所以 sds 是二进制安全的，可以存放任何二进制的数据。",-1),T=i("p",null,"简单动态字符串 sds 的获取字符串长度很方便，通过 len 可以直接得到，而传统字符串需要对字符串进行遍历，时间复杂度为 O(n)。",-1),O=i("p",null,"sds 相比传统字符串多了一个 sdshdr，对于大量很短的字符串，这个 sdshdr 还是一个不小的开销。在 3.2 版本后，sds 会根据字符串实际的长度，选择不同的数据结构，以更好的提升内存效率。当前 sdshdr 结构分为 5 种子类型，分别为 sdshdr5、sdshdr8、sdshdr16、sdshdr32、sdshdr64。其中 sdshdr5 只有 flags 和 buf 字段，其他几种类型的 len 和 alloc 采用从 uint8_t 到 uint64_t 的不同类型，以节省内存空间。",-1),S=i("p",null,"sds 可以作为字符串的内部数据结构，同时 sds 也是 hyperloglog、bitmap 类型的内部数据结构。",-1),x=i("h6",{id:"ziplist",tabindex:"-1"},[s("ziplist "),i("a",{class:"header-anchor",href:"#ziplist","aria-label":'Permalink to "ziplist"'},"​")],-1),f=i("p",null,"为了节约内存，并减少内存碎片，Redis 设计了 ziplist 压缩列表内部数据结构。压缩列表是一块连续的内存空间，可以连续存储多个元素，没有冗余空间，是一种连续内存数据块组成的顺序型内存结构。",-1),I=l("",3),E=l("",2),N=i("p",null,"由于 ziplist 是连续紧凑存储，没有冗余空间，所以插入新的元素需要 realloc 扩展内存，所以如果 ziplist 占用空间太大，realloc 重新分配内存和拷贝的开销就会很大，所以 ziplist 不适合存储过多元素，也不适合存储过大的字符串。",-1),P=i("p",null,"因此只有在元素数和 value 数都不大的时候，ziplist 才作为 hash 和 zset 的内部数据结构。其中 hash 使用 ziplist 作为内部数据结构的限制时，元素数默认不超过 512 个，value 值默认不超过 64 字节。可以通过修改配置来调整 hash_max_ziplist_entries 、hash_max_ziplist_value 这两个阀值的大小。",-1),v=i("p",null,"zset 有序集合，使用 ziplist 作为内部数据结构的限制元素数默认不超过 128 个，value 值默认不超过 64 字节。可以通过修改配置来调整 zset_max_ziplist_entries 和 zset_max_ziplist_value 这两个阀值的大小。",-1),V=i("h6",{id:"quicklist",tabindex:"-1"},[s("quicklist "),i("a",{class:"header-anchor",href:"#quicklist","aria-label":'Permalink to "quicklist"'},"​")],-1),q=i("p",null,"Redis 在 3.2 版本之后引入 quicklist，用以替换 linkedlist。因为 linkedlist 每个节点有前后指针，要占用 16 字节，而且每个节点独立分配内存，很容易加剧内存的碎片化。而 ziplist 由于紧凑型存储，增加元素需要 realloc，删除元素需要内存拷贝，天然不适合元素太多、value 太大的存储。",-1),M=l("",7),L=i("p",null,"如果 sorted set 类型的元素数比较多或者元素比较大，Redis 就会选择跳跃表来作为 sorted set有序集合的内部数据结构。",-1),w=i("p",null,"跳跃表主要由 zskipList 和节点 zskiplistNode 构成。zskiplist 结构如图，header 指向跳跃表的表头节点。tail 指向跳跃表的表尾节点。length 表示跳跃表的长度，它是跳跃表中不包含表头节点的节点数量。level 是目前跳跃表内，除表头节点外的所有节点中，层数最大的那个节点的层数。",-1),J=i("p",null,"跳跃表的节点 zskiplistNode 的结构如图所示。ele 是节点对应的 sds 值，在 zset 有序集合中就是集合中的 field 元素。score 是节点的分数，通过 score，跳跃表中的节点自小到大依次排列。backward 是指向当前节点的前一个节点的指针。level 是节点中的层，每个节点一般有多个层。每个 level 层都带有两个属性，一个是 forwad 前进指针，它用于指向表尾方向的节点；另外一个是 span 跨度，它是指 forward 指向的节点到当前节点的距离。",-1),F=i("p",null,"如图所示是一个跳跃表，它有 3 个节点。对应的元素值分别是 S1、S2 和 S3，分数值依次为 1.0、3.0 和 5.0。其中 S3 节点的 level 最大是 5，跳跃表的 level 是 5。header 指向表头节点，tail 指向表尾节点。在查到元素时，累加路径上的跨度即得到元素位置。在跳跃表中，元素必须是唯一的，但 score 可以相同。相同 score 的不同元素，按照字典序进行排序。",-1),Z=i("p",null,"在 sorted set 数据类型中，如果元素数较多或元素长度较大，则使用跳跃表作为内部数据结构。默认元素数超过 128 或者最大元素的长度超过 64，此时有序集合就采用 zskiplist 进行存储。由于 geo 也采用有序集合类型来存储地理位置名称和位置 hash 值，所以在超过相同阀值后，也采用跳跃表进行存储。",-1),j=i("p",null,"Redis 主要的内部数据结构讲完了，接下来整体看一下，之前讲的 8 种数据类型，具体都是采用哪种内部数据结构来存储的。",-1),W=i("p",null,"首先，对于 string 字符串，Redis 主要采用 sds 来进行存储。而对于 list 列表，Redis 采用 quicklist 进行存储。对于 set 集合类型，Redis 采用 dict 来进行存储。对于 sorted set 有序集合类型，如果元素数小于 128 且元素长度小于 64，则使用 ziplist 存储，否则使用 zskiplist 存储。对于哈希类型，如果元素数小于 512，并且元素长度小于 64，则用 ziplist 存储，否则使用 dict 字典存储。对于 hyperloglog，采用 sds 简单动态字符串存储。对于 geo，如果位置数小于 128，则使用 ziplist 存储，否则使用 zskiplist 存储。最后对于 bitmap，采用 sds 简单动态字符串存储。",-1),G=i("p",null,"除了这些主要的内部数据结构，还有在特殊场景下也会采用一些其他内部结构存储，比如，如果操作的字符串都是整数，同时指令是 incr、decr 等，会对字符串采用 long 型整数存储，这些场景比较特殊，限于时间关系，这里不做进一步阐述。",-1),H=i("br",null,null,-1);function U($,Q,X,Y,K,ii){const t=a("Image");return p(),c("div",null,[_,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28Bx6AUzW7AACuWHuW1yQ159.png"}),s(),n,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28Bx6Adu3BAABepkFcPWs950.png"}),s(),r,h,u,g,k,A,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28Bx6AVwGxAAEKF2oxItk727.png"}),s(),b,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28Bx6ALgQTAADi0ZMSOiA596.png"}),s(),m,z,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28Bx-ADosGAACskc5wrBU688.png"}),s(),R,B,y,D,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28Bx-AEW-LAABgCctayIw793.png"}),s(),C,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28Bx-ARu4ZAACk1VRWcR4166.png"}),s(),T,O,S,x,f,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28Bx-ACG0jAAB7HSDeUSg826.png"}),s(),I,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28Bx-AY9k6AACHwHJEeWc739.png"}),s(),E,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28Bx-AHq20AABn2LByDio271.png"}),s(),N,P,v,V,q,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28ByCADkuqAACua3XXug4030.png"}),s(),M,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28ByCAWS7-AADDdAI6Jok848.png"}),s(),L,w,J,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28ByCASkZeAADPgl0yXtk817.png"}),s(),F,Z,e(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28ByCAIhL8AAEZ-o72tpY715.png"}),s(),j,W,G,H])}const ei=d(o,[["render",U]]);export{ti as __pageData,ei as default};

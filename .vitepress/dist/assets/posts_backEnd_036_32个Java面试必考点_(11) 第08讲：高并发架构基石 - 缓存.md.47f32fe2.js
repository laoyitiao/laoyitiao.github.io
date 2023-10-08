import{_ as s,j as p,o,g as r,k as i,h as a,Q as t,s as e}from"./chunks/framework.a0d18f64.js";const E=JSON.parse('{"title":"第08讲：高并发架构基石-缓存","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(11) 第08讲：高并发架构基石 - 缓存.md","filePath":"posts/backEnd/036_32个Java面试必考点/(11) 第08讲：高并发架构基石 - 缓存.md","lastUpdated":1696682708000}'),h={name:"posts/backEnd/036_32个Java面试必考点/(11) 第08讲：高并发架构基石 - 缓存.md"},d=t('<h1 id="第08讲-高并发架构基石-缓存" tabindex="-1">第08讲：高并发架构基石-缓存 <a class="header-anchor" href="#第08讲-高并发架构基石-缓存" aria-label="Permalink to &quot;第08讲：高并发架构基石-缓存&quot;">​</a></h1><p>本课时介绍缓存相关的知识点以及 Memcache 和 Redis 这两个最常使用的缓存。重点学习以下三个方面的内容：</p><ol><li><p>使用缓存时常遇到的典型问题；</p></li><li><p>Memcache 的内存结构；</p></li><li><p>Redis 相关的知识点以及 Redis 常用结构的实现。</p></li></ol><h6 id="缓存知识点" tabindex="-1">缓存知识点 <a class="header-anchor" href="#缓存知识点" aria-label="Permalink to &quot;缓存知识点&quot;">​</a></h6><h6 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h6>',5),n=t('<h6 id="类型" tabindex="-1">类型 <a class="header-anchor" href="#类型" aria-label="Permalink to &quot;类型&quot;">​</a></h6><p>缓存是高并发场景下提高热点数据访问性能的一个有效手段，在开发项目时会经常使用到。缓存的类型分为：本地缓存、分布式缓存和多级缓存。</p><p>本地缓存就是在进程的内存中进行缓存，比如我们的 JVM 堆中，可以用 LRUMap 来实现，也可以使用 Ehcache 这样的工具来实现。本地缓存是内存访问，没有远程交互开销，性能最好，但是受限于单机容量，一般缓存较小且无法扩展。</p><p>分布式缓存可以很好得解决这个问题。分布式缓存一般都具有良好的水平扩展能力，对较大数据量的场景也能应付自如。缺点就是需要进行远程请求，性能不如本地缓存。</p><p>为了平衡这种情况，实际业务中一般采用多级缓存，本地缓存只保存访问频率最高的部分热点数据，其他的热点数据放在分布式缓存中。</p><h6 id="淘汰策略" tabindex="-1">淘汰策略 <a class="header-anchor" href="#淘汰策略" aria-label="Permalink to &quot;淘汰策略&quot;">​</a></h6><p>不管是本地缓存还是分布式缓存，为了保证较高性能，都是使用内存来保存数据，由于成本和内存限制，当存储的数据超过缓存容量时，需要对缓存的数据进行剔除。一般的剔除策略有 FIFO 淘汰最早数据、LRU 剔除最近最少使用、和 LFU 剔除最近使用频率最低的数据几种策略。</p><h6 id="memcache" tabindex="-1">Memcache <a class="header-anchor" href="#memcache" aria-label="Permalink to &quot;Memcache&quot;">​</a></h6><p>注意后面会把 Memcache 简称为 MC。</p><p>先来看看 MC 的特点：</p><ul><li><p>MC 处理请求时使用多线程异步 IO 的方式，可以合理利用 CPU 多核的优势，性能非常优秀；</p></li><li><p>MC 功能简单，使用内存存储数据，只支持 K-V 结构，不提供持久化和主从同步功能；</p></li><li><p>MC 的内存结构以及钙化问题后面会详细介绍；</p></li><li><p>MC 对缓存的数据可以设置失效期，过期后的数据会被清除；</p></li><li><p>失效的策略采用延迟失效，就是当再次使用数据时检查是否失效；</p></li><li><p>当容量存满时，会对缓存中的数据进行剔除，剔除时除了会对过期 key 进行清理，还会按 LRU 策略对数据进行剔除。</p></li></ul><br><p>另外，使用 MC 有一些限制：</p><ul><li><p>key 不能超过 250 个字节；</p></li><li><p>value 不能超过 1M 字节；</p></li><li><p>key 的最大失效时间是 30 天。</p></li></ul><h6 id="redis" tabindex="-1">Redis <a class="header-anchor" href="#redis" aria-label="Permalink to &quot;Redis&quot;">​</a></h6><p>先简单说一下 Redis 的特点，方便和 MC 比较。</p><ul><li><p>与 MC 不同的是，Redis 采用单线程模式处理请求。这样做的原因有 2 个：一个是因为采用了非阻塞的异步事件处理机制；另一个是缓存数据都是内存操作 IO 时间不会太长，单线程可以避免线程上下文切换产生的代价。</p></li><li><p>Redis 支持持久化，所以 Redis 不仅仅可以用作缓存，也可以用作 NoSQL 数据库。</p></li><li><p>相比 MC，Redis 还有一个非常大的优势，就是除了 K-V 之外，还支持多种数据格式，例如 list、set、sorted set、hash 等。</p></li><li><p>Redis 提供主从同步机制，以及 Cluster 集群部署能力，能够提供高可用服务。</p></li></ul><h6 id="详解-memcache-mc" tabindex="-1">详解 Memcache（MC） <a class="header-anchor" href="#详解-memcache-mc" aria-label="Permalink to &quot;详解 Memcache（MC）&quot;">​</a></h6><h6 id="内存结构" tabindex="-1">内存结构 <a class="header-anchor" href="#内存结构" aria-label="Permalink to &quot;内存结构&quot;">​</a></h6><p>首先来看 MC 的内存结构。MC 默认是通过 Slab Allocator 来管理内存，如下图所示。Slab 机制主要是用来解决频繁 malloc/free 会产生内存碎片的问题。</p><br>',21),c=e("p",null,"如图左侧，MC 会把内存分为许多不同类型的 Slab，每种类型 Slab 用来保存不同大小的对象。每个 Slab 由若干的 Page 组成，如图中浅绿色的模块。不同 Slab 的 Page，默认大小是一样的，都是 1M，这也是默认 MC 存储对象不能超过 1M 的原因。每个 Page 内又划分为许多的 Chunk，Chunk 就是实际用来保存对象的空间，就是图中橘色的。不同类型的 Slab 中 Chunk 的大小是不同的，当保存一个对象时，MC 会根据对象的大小来选择最合适的 Chunk 来存储，减少空间浪费。",-1),_=e("p",null,"Slab Allocator 创建 Slab 时的参数有三个，分别是 Chunk 大小的增长因子，Chunk 大小的初始值以及 Page 的大小。在运行时会根据要保存的对象大小来逐渐创建 Slab。",-1),u=e("h6",{id:"钙化问题",tabindex:"-1"},[a("钙化问题 "),e("a",{class:"header-anchor",href:"#钙化问题","aria-label":'Permalink to "钙化问题"'},"​")],-1),b=e("p",null,"来考虑这样一个场景，使用 MC 来保存用户信息，假设单个对象大约 300 字节。这时会产生大量的 384 字节大小的 Slab。运行一段时间后，用户信息增加了一个属性，单个对象的大小变成了 500 字节，这时再保存对象需要使用 768 字节的 Slab，而 MC 中的容量大部分创建了 384 字节的 Slab，所以 768 的 Slab 非常少。这时虽然 384 Slab 的内存大量空闲，但 768 Slab 还是会根据 LRU 算法频繁剔除缓存，导致 MC 的剔除率升高，命中率降低。这就是所谓的 MC 钙化问题。",-1),m=e("p",null,"解决钙化问题可以开启 MC 的 Automove 机制，每 10s 调整 Slab。也可以分批重启 MC 缓存，不过要注意重启时要进行一定时间的预热，防止雪崩问题。另外，在使用 Memcached 时，最好计算一下数据的预期平均长度，调整 growth factor， 以获得最恰当的设置，避免内存的大量浪费。",-1),R=e("h6",{id:"详解-redis",tabindex:"-1"},[a("详解 Redis "),e("a",{class:"header-anchor",href:"#详解-redis","aria-label":'Permalink to "详解 Redis"'},"​")],-1),k=e("p",null,"Redis 的知识点结构如下图所示。",-1),C=e("br",null,null,-1),A=t('<br><h6 id="功能" tabindex="-1">功能 <a class="header-anchor" href="#功能" aria-label="Permalink to &quot;功能&quot;">​</a></h6><p>来看 Redis 提供的功能。</p><p>Bitmap 位图是支持按 bit 位来存储信息，可以用来实现 BloomFilter；HyperLogLog 提供不精确的去重计数功能，比较适合用来做大规模数据的去重统计，例如统计 UV；Geospatial 可以用来保存地理位置，并作位置距离计算或者根据半径计算位置等。这三个其实也可以算作一种数据结构。</p><p>pub/sub 功能是订阅发布功能，可以用作简单的消息队列。</p><p>Pipeline可以批量执行一组指令，一次性返回全部结果，可以减少频繁的请求应答。</p><p>Redis 支持提交 Lua 脚本来执行一系列的功能。</p><p>最后一个功能是事务，但 Redis 提供的不是严格的事务，Redis 只保证串行执行命令，并且能保证全部执行，但是执行命令失败时并不会回滚，而是会继续执行下去。</p><h6 id="持久化" tabindex="-1">持久化 <a class="header-anchor" href="#持久化" aria-label="Permalink to &quot;持久化&quot;">​</a></h6><p>Redis 提供了 RDB 和 AOF 两种持久化方式，RDB 是把内存中的数据集以快照形式写入磁盘，实际操作是通过 fork 子进程执行，采用二进制压缩存储；AOF 是以文本日志的形式记录 Redis 处理的每一个写入或删除操作。</p><p>RDB 把整个 Redis 的数据保存在单一文件中，比较适合用来做灾备，但缺点是快照保存完成之前如果宕机，这段时间的数据将会丢失，另外保存快照时可能导致服务短时间不可用。</p><p>AOF 对日志文件的写入操作使用的追加模式，有灵活的同步策略，支持每秒同步、每次修改同步和不同步，缺点就是相同规模的数据集，AOF 要大于 RDB，AOF 在运行效率上往往会慢于 RDB。</p><h6 id="高可用" tabindex="-1">高可用 <a class="header-anchor" href="#高可用" aria-label="Permalink to &quot;高可用&quot;">​</a></h6><p>来看 Redis 的高可用。Redis 支持主从同步，提供 Cluster 集群部署模式，通过 Sentine l哨兵来监控 Redis 主服务器的状态。当主挂掉时，在从节点中根据一定策略选出新主，并调整其他从 slaveof 到新主。</p><p>选主的策略简单来说有三个：</p><ul><li><p>slave 的 priority 设置的越低，优先级越高；</p></li><li><p>同等情况下，slave 复制的数据越多优先级越高；</p></li><li><p>相同的条件下 runid 越小越容易被选中。</p></li></ul><p>在 Redis 集群中，sentinel 也会进行多实例部署，sentinel 之间通过 Raft 协议来保证自身的高可用。</p><p>Redis Cluster 使用分片机制，在内部分为 16384 个 slot 插槽，分布在所有 master 节点上，每个 master 节点负责一部分 slot。数据操作时按 key 做 CRC16 来计算在哪个 slot，由哪个 master 进行处理。数据的冗余是通过 slave 节点来保障。</p><h6 id="key-失效机制" tabindex="-1">key 失效机制 <a class="header-anchor" href="#key-失效机制" aria-label="Permalink to &quot;key 失效机制&quot;">​</a></h6><p>Redis 的 key 可以设置过期时间，过期后 Redis 采用主动和被动结合的失效机制，一个是和 MC 一样在访问时触发被动删除，另一种是定期的主动删除。</p><h6 id="淘汰策略-1" tabindex="-1">淘汰策略 <a class="header-anchor" href="#淘汰策略-1" aria-label="Permalink to &quot;淘汰策略&quot;">​</a></h6><p>Redis 提供了6种淘汰策略，一类是只针对设置了失效期的 key 做 LRU、最小生存时间和随机剔除；另一类是针对所有 key 做 LRU、随机剔除。当然，也可以设置不剔除，容量满时再存储对象会返回异常，但是已存在的 key 还可以继续读取。</p><h6 id="新特性" tabindex="-1">新特性 <a class="header-anchor" href="#新特性" aria-label="Permalink to &quot;新特性&quot;">​</a></h6><p>可以了解一下 Redis4.0 和 5.0 的新特性，例如 5.0 的 Stream，是一个可以支持多播，也就是一写多读的消息队列。还可以了解一下 4.0 的模块机制等。</p><h6 id="数据结构" tabindex="-1">数据结构 <a class="header-anchor" href="#数据结构" aria-label="Permalink to &quot;数据结构&quot;">​</a></h6><p>Redis 内部使用字典来存储不同类型的数据，如下图中的 dictht，字典由一组 dictEntry 组成，其中包括了指向 key 和 value 的指针以及指向下一个 dictEntry 的指针。</p><br>',27),q=t('<p>在 Redis 中，所有的对象都被封装成了 redisObject，如图中浅绿的模块。redisObject 包括了对象的类型，就是 Redis 支持的 string、hash、list、set 和 sorted set 5种类型。另外 redisObject 还包括了具体对象的存储方式，如图最右边的虚线标出的模块内的几种类型。</p><p>下面结合类型来介绍具体的数据存储方式。</p><ul><li><p>string 类型是 Redis 中最常使用的类型，内部的实现是通过 SDS（Simple Dynamic String ）来存储的。SDS 类似于 Java 中的 ArrayList，可以通过预分配冗余空间的方式来减少内存的频繁分配。</p></li><li></li><li><p>list 类型，有 ziplist 压缩列表和 linkedlist 双链表实现。ziplist 是存储在一段连续的内存上，存储效率高，但是它不利于修改操作，适用于数据较少的情况；linkedlist 在插入节点上复杂度很低，但它的内存开销很大，每个节点的地址不连续，容易产生内存碎片。此外在 3.2 版本后增加了 quicklist，结合了两者的优点，quicklist 本身是一个双向无环链表，它的每一个节点都是一个 ziplist。</p></li><li></li><li><p>hash 类型在 Redis 中有 ziplist 和 hashtable 两种实现。当 Hash 表中所有的 key 和 value 字符串长度都小于 64 字节且键值对数量小于 512 个时，使用压缩表来节省空间；超过时，转为使用 hashtable。</p></li><li></li><li><p>set 类型的内部实现可以是 intset 或者 hashtable，当集合中元素小于 512 且所有的数据都是数值类型时，才会使用 intset，否则会使用 hashtable。</p></li><li></li><li><p>sorted set 是有序集合，有序集合的实现可以是 ziplist 或者是 skiplist 跳表。有序集合的编码转换条件与 hash 和 list 有些不同，当有序集合中元素数量小于 128 个并且所有元素长度都小于 64 字节时会使用 ziplist，否则会转换成 skiplist。</p></li></ul><p>提示：Redis 的内存分配是使用 jemalloc 进行分配。jemalloc 将内存空间划分为小、大、巨大三个范围，并在范围中划分了小的内存块，当存储数据时，选择大小最合适的内存块进行分配，有利于减小内存碎片。</p><h6 id="缓存常见问题" tabindex="-1">缓存常见问题 <a class="header-anchor" href="#缓存常见问题" aria-label="Permalink to &quot;缓存常见问题&quot;">​</a></h6><p>对使用缓存时常遇到几个问题，整理出一个表格，如下图所示。</p><br>',7),M=t('<h6 id="缓存更新方式" tabindex="-1">缓存更新方式 <a class="header-anchor" href="#缓存更新方式" aria-label="Permalink to &quot;缓存更新方式&quot;">​</a></h6><p>第一个问题是缓存更新方式，这是决定在使用缓存时就该考虑的问题。</p><p>缓存的数据在数据源发生变更时需要对缓存进行更新，数据源可能是 DB，也可能是远程服务。更新的方式可以是主动更新。数据源是 DB 时，可以在更新完 DB 后就直接更新缓存。</p><p>当数据源不是 DB 而是其他远程服务，可能无法及时主动感知数据变更，这种情况下一般会选择对缓存数据设置失效期，也就是数据不一致的最大容忍时间。</p><p>这种场景下，可以选择失效更新，key 不存在或失效时先请求数据源获取最新数据，然后再次缓存，并更新失效期。</p><p>但这样做有个问题，如果依赖的远程服务在更新时出现异常，则会导致数据不可用。改进的办法是异步更新，就是当失效时先不清除数据，继续使用旧的数据，然后由异步线程去执行更新任务。这样就避免了失效瞬间的空窗期。另外还有一种纯异步更新方式，定时对数据进行分批更新。实际使用时可以根据业务场景选择更新方式。</p><h6 id="数据不一致" tabindex="-1">数据不一致 <a class="header-anchor" href="#数据不一致" aria-label="Permalink to &quot;数据不一致&quot;">​</a></h6><p>第二个问题是数据不一致的问题，可以说只要使用缓存，就要考虑如何面对这个问题。缓存不一致产生的原因一般是主动更新失败，例如更新 DB 后，更新 Redis 因为网络原因请求超时；或者是异步更新失败导致。</p><p>解决的办法是，如果服务对耗时不是特别敏感可以增加重试；如果服务对耗时敏感可以通过异步补偿任务来处理失败的更新，或者短期的数据不一致不会影响业务，那么只要下次更新时可以成功，能保证最终一致性就可以。</p><h6 id="缓存穿透" tabindex="-1">缓存穿透 <a class="header-anchor" href="#缓存穿透" aria-label="Permalink to &quot;缓存穿透&quot;">​</a></h6><p>第三个问题是缓存穿透。产生这个问题的原因可能是外部的恶意攻击，例如，对用户信息进行了缓存，但恶意攻击者使用不存在的用户id频繁请求接口，导致查询缓存不命中，然后穿透 DB 查询依然不命中。这时会有大量请求穿透缓存访问到 DB。</p><p>解决的办法如下。</p><ol><li><p>对不存在的用户，在缓存中保存一个空对象进行标记，防止相同 ID 再次访问 DB。不过有时这个方法并不能很好解决问题，可能导致缓存中存储大量无用数据。</p></li><li><p>使用 BloomFilter 过滤器，BloomFilter 的特点是存在性检测，如果 BloomFilter 中不存在，那么数据一定不存在；如果 BloomFilter 中存在，实际数据也有可能会不存在。非常适合解决这类的问题。</p></li></ol><h6 id="缓存击穿" tabindex="-1">缓存击穿 <a class="header-anchor" href="#缓存击穿" aria-label="Permalink to &quot;缓存击穿&quot;">​</a></h6><p>第四个问题是缓存击穿，就是某个热点数据失效时，大量针对这个数据的请求会穿透到数据源。</p><p>解决这个问题有如下办法。</p><ol><li><p>可以使用互斥锁更新，保证同一个进程中针对同一个数据不会并发请求到 DB，减小 DB 压力。</p></li><li><p>使用随机退避方式，失效时随机 sleep 一个很短的时间，再次查询，如果失败再执行更新。</p></li><li><p>针对多个热点 key 同时失效的问题，可以在缓存时使用固定时间加上一个小的随机数，避免大量热点 key 同一时刻失效。</p></li></ol><h6 id="缓存雪崩" tabindex="-1">缓存雪崩 <a class="header-anchor" href="#缓存雪崩" aria-label="Permalink to &quot;缓存雪崩&quot;">​</a></h6><p>第五个问题是缓存雪崩。产生的原因是缓存挂掉，这时所有的请求都会穿透到 DB。</p><p>解决方法：</p><ol><li><p>使用快速失败的熔断策略，减少 DB 瞬间压力；</p></li><li><p>使用主从模式和集群模式来尽量保证缓存服务的高可用。</p></li></ol><p>实际场景中，这两种方法会结合使用。</p><h6 id="考察点与加分项" tabindex="-1">考察点与加分项 <a class="header-anchor" href="#考察点与加分项" aria-label="Permalink to &quot;考察点与加分项&quot;">​</a></h6><h6 id="考察点" tabindex="-1">考察点 <a class="header-anchor" href="#考察点" aria-label="Permalink to &quot;考察点&quot;">​</a></h6><p>本课时内容的主要面试考察点是对缓存特性的理解，对 MC、Redis 的特点和使用方式的掌握。</p><ol><li><p>要知道缓存的使用场景，不同类型缓存的使用方式，例如：</p><ol><li><p>对 DB 热点数据进行缓存减少 DB 压力；对依赖的服务进行缓存，提高并发性能；</p></li><li><p>单纯 K-V 缓存的场景可以使用 MC，而需要缓存 list、set 等特殊数据格式，可以使用 Redis；</p></li><li><p>需要缓存一个用户最近播放视频的列表可以使用 Redis 的 list 来保存、需要计算排行榜数据时，可以使用 Redis 的 zset 结构来保存。</p></li></ol></li><li><p>要了解 MC 和 Redis 的常用命令，例如原子增减、对不同数据结构进行操作的命令等。</p></li><li><p>了解 MC 和 Redis 在内存中的存储结构，这对评估使用容量会很有帮助。</p></li><li><p>了解 MC 和 Redis 的数据失效方式和剔除策略，比如主动触发的定期剔除和被动触发延期剔除</p></li><li><p>要理解 Redis 的持久化、主从同步与 Cluster 部署的原理，比如 RDB 和 AOF 的实现方式与区别。</p></li></ol><h6 id="加分项" tabindex="-1">加分项 <a class="header-anchor" href="#加分项" aria-label="Permalink to &quot;加分项&quot;">​</a></h6><p>如果想要在面试中获得更好的表现，还应了解下面这些加分项。</p><p>第一，是要结合实际应用场景来介绍缓存的使用。例如调用后端服务接口获取信息时，可以使用本地+远程的多级缓存；对于动态排行榜类的场景可以考虑通过 Redis 的 sorted set 来实现等等。</p><p>第二，最好你有过分布式缓存设计和使用经验，例如项目中在什么场景使用过 Redis，使用了什么数据结构，解决哪类的问题；使用 MC 时根据预估值大小调整 McSlab 分配参数等等。</p><p>第三，最好可以了解缓存使用中可能产生的问题。比如 Redis 是单线程处理请求，应尽量避免耗时较高的单个请求任务，防止相互影响；Redis 服务应避免和其他 CPU 密集型的进程部署在同一机器；或者禁用 Swap 内存交换，防止 Redis 的缓存数据交换到硬盘上，影响性能。再比如前面提到的 MC 钙化问题等等。</p><p>第四，要了解 Redis 的典型应用场景，例如，使用 Redis 来实现分布式锁；使用 Bitmap 来实现 BloomFilter，使用 HyperLogLog 来进行 UV 统计等等。</p><p>最后，知道 Redis4.0、5.0 中的新特性，例如支持多播的可持久化消息队列 Stream；通过 Module 系统来进行定制功能扩展等等。</p><h6 id="真题汇总" tabindex="-1">真题汇总 <a class="header-anchor" href="#真题汇总" aria-label="Permalink to &quot;真题汇总&quot;">​</a></h6><p>本课时面试真题汇总如下，讲解其中重点。</p><br>',36),S=e("p",null,"第 1～4 题前面都有提到，不再赘述。",-1),P=e("p",null,"第 5 题，可以从主从读写分离、多从库、多端口实例，以及 Cluster 集群部署来支持水平扩展等几方面回答，高可用可以回答用 Sentinel 来保证主挂掉时重新选主并完成从库变更。",-1),f=e("p",null,"第 6 题，可以使用 Redis 的 sorted set 来实现延时队列，使用时间戳做 Score，消费方使用 zrangbyscore 来获取指定延迟时间之前的数据。",-1),g=e("ul",null,[e("li",null,[e("p",null,"简单场景下分布式锁可以使用 setnx 实现，使用 setnx 设置 key，如果返回 1 表示设置成功，即获取锁成功，如果返回 0 则获取锁失败。setnx 需要同时使用 px 参数设置超时时间，防止获取锁的实例宕机后产生死锁。")]),e("li",null,[e("p",null,"严格场景下，可以考虑使用 RedLock 方案。但是实现比较复杂。")])],-1),B=e("br",null,null,-1),x=e("p",null,"下一课时会讲解队列与数据库的相关知识。",-1),D=e("br",null,null,-1);function T(y,V,F,I,L,O){const l=p("Image");return o(),r("div",null,[d,i(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/CA/CgoB5l14rXSAWVk7AAFdi6Ly8iM148.png"}),a(),n,i(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/EA/CgotOV14rXSAJl5hAABTCQiyh9k530.png"}),a(),c,_,u,b,m,R,k,C,i(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/CA/CgoB5l14rXSAHFMcAAFKedIz0a0877.png"}),a(),A,i(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/CA/CgoB5l14rXWAdWuJAABsOwtDCh0241.png"}),a(),q,i(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/EA/CgotOV14rXWAUG1iAABuijHdubk935.png"}),a(),M,i(l,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/CA/CgoB5l14rXWARjDrAABeJtAm0w0873.png"}),a(),S,P,f,g,B,x,D])}const U=s(h,[["render",T]]);export{E as __pageData,U as default};

import{_ as t,j as a,o as e,g as _,k as o,h as l,Q as p,s as i}from"./chunks/framework.cfb14fe0.js";const X=JSON.parse('{"title":"第02讲：深入理解事务与锁机制（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/040_高性能MySQL实战/(50) 第02讲：深入理解事务与锁机制（下）.md","filePath":"posts/backEnd/040_高性能MySQL实战/(50) 第02讲：深入理解事务与锁机制（下）.md","lastUpdated":1696682708000}'),s={name:"posts/backEnd/040_高性能MySQL实战/(50) 第02讲：深入理解事务与锁机制（下）.md"},d=p('<h1 id="第02讲-深入理解事务与锁机制-下" tabindex="-1">第02讲：深入理解事务与锁机制（下） <a class="header-anchor" href="#第02讲-深入理解事务与锁机制-下" aria-label="Permalink to &quot;第02讲：深入理解事务与锁机制（下）&quot;">​</a></h1><p><strong>MySQL 锁分类</strong></p><p>前文提到了锁，下面将详细讲解 MySQL 的锁，我们先来看看锁的分类，在 MySQL 中有三种级别的锁：页级锁、表级锁、行级锁。</p><ul><li><p>表级锁：开销小，加锁快；不会出现死锁；锁定粒度大，发生锁冲突的概率最高，并发度最低。 会发生在：MyISAM、memory、InnoDB、BDB 等存储引擎中。</p></li><li><p>行级锁：开销大，加锁慢；会出现死锁；锁定粒度最小，发生锁冲突的概率最低，并发度最高。会发生在：InnoDB 存储引擎。</p></li><li><p>页级锁：开销和加锁时间界于表锁和行锁之间；会出现死锁；锁定粒度界于表锁和行锁之间，并发度一般。会发生在：BDB 存储引擎。</p></li></ul><p>三种级别的锁分别对应存储引擎关系如下图所示。</p>',5),c=p('<p>注意：MySQL 中的表锁包括读锁和写锁。只需记住这个表锁模式兼容矩阵即可。</p><h2 id="innodb-中的锁" tabindex="-1">InnoDB 中的锁 <a class="header-anchor" href="#innodb-中的锁" aria-label="Permalink to &quot;InnoDB 中的锁&quot;">​</a></h2><p>在 MySQL InnoDB 存储引擎中，锁分为行锁和表锁。其中行锁包括两种锁。</p><ul><li><p>共享锁（S）：多个事务可以一起读，共享锁之间不互斥，共享锁会阻塞排它锁。</p></li><li><p>排他锁（X）：允许获得排他锁的事务更新数据，阻止其他事务取得相同数据集的共享读锁和排他写锁。</p></li></ul><p>另外，为了允许行锁和表锁共存，实现多粒度锁机制，InnoDB 还有两种内部使用的意向锁（Intention Locks），这两种意向锁都是表锁。表锁又分为三种。</p><ul><li><p>意向共享锁（IS）：事务计划给数据行加行共享锁，事务在给一个数据行加共享锁前必须先取得该表的 IS 锁。</p></li><li><p>意向排他锁（IX）：事务打算给数据行加行排他锁，事务在给一个数据行加排他锁前必须先取得该表的 IX 锁。</p></li><li><p>自增锁（AUTO-INC Locks）：特殊表锁，自增长计数器通过该&quot;锁&quot;来获得子增长计数器最大的计数值。</p></li></ul><p>在加行锁之前必须先获得表级意向锁，否则等待 innodb_lock_wait_timeout 超时后根据innodb_rollback_on_timeout 决定是否回滚事务。</p><h2 id="innodb-自增锁" tabindex="-1">InnoDB 自增锁 <a class="header-anchor" href="#innodb-自增锁" aria-label="Permalink to &quot;InnoDB 自增锁&quot;">​</a></h2><p>在 MySQL InnoDB 存储引擎中，我们在设计表结构的时候，通常会建议添加一列作为自增主键。这里就会涉及一个特殊的锁：自增锁（即：AUTO-INC Locks），它属于表锁的一种，在 INSERT 结束后立即释放。我们可以执行 show engine innodb status\\G 来查看自增锁的状态信息。</p><p>在自增锁的使用过程中，有一个核心参数，需要关注，即 innodb_autoinc_lock_mode,它有0、1、2 三个值。保持默认值就行。具体的含义可以参考官方文档，这里不再赘述，如下图所示。</p>',10),r=i("p",null,"InnoDB 锁关系矩阵如下图所示，其中：+ 表示兼容，- 表示不兼容。",-1),h=p('<p><strong>InnoDB 行锁</strong></p><p>InnoDB 行锁是通过对索引数据页上的记录（record）加锁实现的。主要实现算法有 3 种：Record Lock、Gap Lock 和 Next-key Lock。</p><ul><li><p>Record Lock 锁：单个行记录的锁（锁数据，不锁 Gap）。</p></li><li><p>Gap Lock 锁：间隙锁，锁定一个范围，不包括记录本身（不锁数据，仅仅锁数据前面的Gap）。</p></li><li><p>Next-key Lock 锁：同时锁住数据，并且锁住数据前面的 Gap。</p></li></ul><h2 id="排查-innodb-锁问题" tabindex="-1">排查 InnoDB 锁问题 <a class="header-anchor" href="#排查-innodb-锁问题" aria-label="Permalink to &quot;排查 InnoDB 锁问题&quot;">​</a></h2><p>排查 InnoDB 锁问题通常有 2 种方法。</p><ul><li><p>打开 innodb_lock_monitor 表，注意使用后记得关闭，否则会影响性能。</p></li><li><p>在 MySQL 5.5 版本之后，可以通过查看 information_schema 库下面的 innodb_locks、innodb_lock_waits、innodb_trx 三个视图排查 InnoDB 的锁问题。</p></li></ul><h2 id="innodb-加锁行为" tabindex="-1">InnoDB 加锁行为 <a class="header-anchor" href="#innodb-加锁行为" aria-label="Permalink to &quot;InnoDB 加锁行为&quot;">​</a></h2><p>下面举一些例子分析 InnoDB 不同索引的加锁行为。分析锁时需要跟隔离级别联系起来，我们以 RR 为例，主要是从四个场景分析。</p><ul><li><p>主键 + RR。</p></li><li><p>唯一键 + RR。</p></li><li><p>非唯一键 + RR。</p></li><li><p>无索引 + RR。</p></li></ul><p>下面讲解第一种情况：主键 + RR，如下图所示。</p>',10),u=i("p",null,"假设条件是：",-1),A=i("ul",null,[i("li",null,[i("p",null,"update t1 set name='XX' where id=10。")]),i("li",null,[i("p",null,"id 为主键索引。")])],-1),m=i("p",null,"加锁行为：仅在 id=10 的主键索引记录上加 X锁。",-1),I=i("p",null,"第二种情况：唯一键 + RR，如下图所示。",-1),g=p("<p>假设条件是：</p><ul><li><p>update t1 set name=&#39;XX&#39; where id=10。</p></li><li><p>id 为唯一索引。</p></li></ul><p>加锁行为：</p><ul><li><p>先在唯一索引 id 上加 id=10 的 X 锁。</p></li><li><p>再在 id=10 的主键索引记录上加 X 锁，若 id=10 记录不存在，那么加间隙锁。</p></li></ul><p>第三种情况：非唯一键 + RR，如下图所示。</p>",5),T=p("<p>假设条件是：</p><ul><li><p>update t1 set name=&#39;XX&#39; where id=10。</p></li><li><p>id 为非唯一索引。</p></li></ul><p>加锁行为：</p><ul><li><p>先通过 id=10 在 key(id) 上定位到第一个满足的记录，对该记录加 X 锁，而且要在 (6,c)~(10,b) 之间加上 Gap lock，为了防止幻读。然后在主键索引 name 上加对应记录的X 锁；</p></li><li><p>再通过 id=10 在 key(id) 上定位到第二个满足的记录，对该记录加 X 锁，而且要在(10,b)~(10,d)之间加上 Gap lock，为了防止幻读。然后在主键索引 name 上加对应记录的X 锁；</p></li><li><p>最后直到 id=11 发现没有满足的记录了，此时不需要加 X 锁，但要再加一个 Gap lock： (10,d)~(11,f)。</p></li></ul><p>第四种情况：无索引 + RR，如下图所示。</p>",5),D=p('<p>假设条件是：</p><ul><li><p>update t1 set name=&#39;XX&#39; where id=10。</p></li><li><p>id 列无索引。</p></li></ul><p>加锁行为：</p><ul><li>表里所有行和间隙均加 X 锁。</li></ul><p>至此，我们分析了四种索引在 RR 隔离级别下的加锁行为，那么在 RC 隔离级别下的加锁行为又是怎样的呢？这个问题留给你自己去思考，答案将在下一节课中给出。</p><p>在前文中，我们有提到分析锁问题的三个视图，在实际的使用中，可以在数据库发生阻塞的时候，将这三个视图做联合查询来帮助获取详细的锁信息，帮助快速定位找出造成死锁的元凶和被害者，以及具体的事务。</p><h1 id="innodb-死锁" tabindex="-1">InnoDB 死锁 <a class="header-anchor" href="#innodb-死锁" aria-label="Permalink to &quot;InnoDB 死锁&quot;">​</a></h1><p>在 MySQL 中死锁不会发生在 MyISAM 存储引擎中，但会发生在 InnoDB 存储引擎中，因为 InnoDB 是逐行加锁的，极容易产生死锁。那么死锁产生的四个条件是什么呢？</p><ul><li><p>互斥条件：一个资源每次只能被一个进程使用；</p></li><li><p>请求与保持条件：一个进程因请求资源而阻塞时，对已获得的资源保持不放；</p></li><li><p>不剥夺条件：进程已获得的资源，在没使用完之前，不能强行剥夺；</p></li><li><p>循环等待条件：多个进程之间形成的一种互相循环等待资源的关系。</p></li></ul><p>在发生死锁时，InnoDB 存储引擎会自动检测，并且会自动回滚代价较小的事务来解决死锁问题。但很多时候一旦发生死锁，InnoDB 存储引擎的处理的效率是很低下的或者有时候根本解决不了问题，需要人为手动去解决。</p><p>既然死锁问题会导致严重的后果，那么在开发或者使用数据库的过程中，如何避免死锁的产生呢？这里给出一些建议：</p><ul><li><p>加锁顺序一致；</p></li><li><p>尽量基于 primary 或 unique key 更新数据。</p></li><li><p>单次操作数据量不宜过多，涉及表尽量少。</p></li><li><p>减少表上索引，减少锁定资源。</p></li><li><p>相关工具：pt-deadlock-logger。</p></li></ul><h2 id="资源争用" tabindex="-1">资源争用 <a class="header-anchor" href="#资源争用" aria-label="Permalink to &quot;资源争用&quot;">​</a></h2><p>下面分享一个基于资源争用导致死锁的情况，如下图所示。</p>',14),S=i("p",null,"session1 首先拿到 id=1 的锁，session2 同期拿到了 id=5 的锁后，两者分别想拿到对方持有的锁，于是产生死锁。",-1),b=i("h2",{id:"元数据锁",tabindex:"-1"},[l("元数据锁 "),i("a",{class:"header-anchor",href:"#元数据锁","aria-label":'Permalink to "元数据锁"'},"​")],-1),B=i("p",null,"下面分享一个 Metadata lock（即元数据锁）导致的死锁的情况，如下图所示。",-1),k=p("<p>session1 和 session2 都在抢占 id=1 和 id=6 的元数据的资源，产生死锁。</p><p>查看 MySQL 数据库中死锁的相关信息，可以执行 show engine innodb status\\G 来进行查看，重点关注 &quot;LATEST DETECTED DEADLOCK&quot; 部分。</p><p>给大家一些开发建议来避免线上业务因死锁造成的不必要的影响。</p><ul><li><p>更新 SQL 的 where 条件时尽量用索引；</p></li><li><p>加锁索引准确，缩小锁定范围；</p></li><li><p>减少范围更新，尤其非主键/非唯一索引上的范围更新。</p></li><li><p>控制事务大小，减少锁定数据量和锁定时间长度 （innodb_row_lock_time_avg）。</p></li><li><p>加锁顺序一致，尽可能一次性锁定所有所需的数据行。</p></li></ul><p>本课时到这里就全部结束了，今天主要讲了 MySQL 的事务及其特性、并发事务带来的问题、事务的隔离级别、多版本并发控制 MVCC、InnoDB 锁分类、InnoDB 锁算法、InnoDB 死锁及其优化建议。</p>",5);function R(M,C,L,P,V,y){const n=a("Image");return e(),_("div",null,[d,o(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D4/CgoB5l13JAaAMAAJAAAVsgPHWMQ811.png"}),l(),c,o(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D4/CgoB5l13JAaAE19WAAB04iNLUm8099.png"}),l(),r,o(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/F4/CgotOV13JAaAPHdtAAAV6sAJZJU546.png"}),l(),h,o(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D4/CgoB5l13JAaAbttnAADhQqAn2AA031.png"}),l(),u,A,m,I,o(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/F4/CgotOV13JAaARFQyAAEDy1rKntM893.png"}),l(),g,o(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D4/CgoB5l13JAeAXno8AAEx6KKaJgs480.png"}),l(),T,o(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/F4/CgotOV13JAeARw3uAAFMccO4RTA164.png"}),l(),D,o(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/D4/CgoB5l13JAeAGUj0AAIHGdgOf2U103.png"}),l(),S,b,B,o(n,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/F4/CgotOV13JAeAfDhaAAKx8-t0UEg960.png"}),l(),k])}const f=t(s,[["render",R]]);export{X as __pageData,f as default};

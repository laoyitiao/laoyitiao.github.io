# 12多版本控制：etcd如何实现MVCC？

上一讲我们介绍了 etcd-raft 模块实现分布式一致性的原理。今天我们继续介绍 etcd 的另一个重要特性------MVCC，即多版本控制。

etcd v2 版本存在**丢弃历史版本数据**的问题，仅保留最新版本的数据。但是这样做引起了一系列问题，比如 watch 机制依赖历史版本数据实现相应功能，因此 etcd v2 又采取了在内存中建立滑动窗口来维护部分历史变更数据的做法，然而在大型的业务场景下还是不足以支撑大量历史变更数据的维护。到了 etcd v3 版本，该功能得到了更新，etcd v3 支持 MVCC，可以保存一个键值对的多个历史版本。

MVCC 模块是 etcd 的核心模块。MVCC 作为底层模块，为上层提供统一的调用方法。这一讲我们将会重点介绍 etcd 多版本控制的实现。

### 什么是 MVCC？

MVCC（Multi-Version Concurrency Control），即多版本并发控制，它是一种并发控制的方法，可以实现对数据库的并发访问。

数据库并发场景有三种，分别为读-读、读-写和写-写。第一种读-读没有问题，不需要并发控制；读-写和写-写都存在**线程安全问题**。读-写可能遇到脏读、幻读、不可重复读的问题；写-写可能会存在更新丢失问题。

并发控制机制用作对并发操作进行正确调度，保证事务的隔离性、数据库的一致性。可能你对并发控制并不陌生，它的主要技术包括悲观锁和乐观锁等。我们简单看一下这两种技术：

* 悲观锁是一种排它锁，事务在操作数据时把这部分数据锁定，直到操作完毕后再解锁，这种方式容易造成系统吞吐量和性能方面的损失；

* 乐观锁在提交操作时检查是否违反数据完整性，大多数基于版本（Version）机制实现，**MVCC 就是一种乐观锁**。

而在 MySQL 中，快照读实现了 MVCC 的非阻塞读功能。其为事务分配单向增长的时间戳，每次修改保存一个版本，版本与事务时间戳关联，读操作只读该事务开始前的数据库的快照。

MVCC 在数据库中的实现主要是为了**提高数据库并发性能**，用更好的方式去处理读写冲突，做到即使有读写冲突时，也不用加锁，实现非阻塞并发读。同时还可以解决脏读、幻读、不可重复读等事务隔离问题，但它也存在一个缺点，就是不能解决更新丢失问题。

### etcd MVCC 的实现

现在，相信你已经初步了解了 MVCC 的概念，接下来我们具体学习 etcd MVCC 的实现。

**MVCC 模块主要由 BoltDB 和 treeIndex 两部分组成**。MVCC 底层基于 Backend 模块实现键值对存储，Backend 在设计上支持多种存储的实现，目前的具体实现为 BoltDB，BoltDB 是一个基于 B+ 树的 KV 存储数据库；treeIndex 模块基于内存版 BTree 实现键的索引管理，它是基于 Google 开源项目 Btree 实现的一个索引模块，保存了每一个 key 与对应的版本号（Revision）的映射关系等信息。

与其他的 KV 存储组件使用存放数据的键作为 key 不同，**etcd 存储以数据的 Revision 作为 key**，键值、创建时的版本号、最后修改的版本号等作为 value 保存到数据库。etcd 对于每一个键值对都维护了一个全局的 Revision 版本号，键值对的每一次变化都会被记录。获取某一个 key 对应的值时，需要先获取该 key 对应的 Revision，再通过它找到对应的值。

etcd 管理和存储一个 key 的多个版本与 treeIndex 模块中的结构体定义有关，下面我们具体来看。

我们通过下面这样的一个操作过程，来理解 etcd MVCC 产生的作用：

```go
$ etcdctl put hello aoho
OK
$ etcdctl get hello -w=json
{"header":{"cluster_id":14841639068965178418,"member_id":10276657743932975437,"revision":3,"raft_term":4},"kvs":[{"key":"aGVsbG8=","create_revision":3,"mod_revision":3,"version":1,"value":"YW9obw=="}],"count":1}
$ etcdctl put hello boho
OK
$ etcdctl get hello
hello
boho
$ etcdctl get hello --rev=3
hello
aoho
```

我来解释一下上面几条命令操作的过程：

* 首先是写入一条命令；

* 写入成功后读取`hello`对应的值，命令中加上`-w=json`指定输出的格式为 json，可以看到更加详细的信息；

* 接着更新 hello 对应的值为`boho`；

* 更新成功之后，读取`hello`对应的值，可以看到原有的值`aoho`已经变成了我们更新之后的值了，符合预期；

* 最后一条命令用来读取指定版本的键值对，我们在第二条命令查询时获取了先前更新的版本号为 3，因此在查询命令中指定`--rev=3`，可以看到结果返回了版本 3 对应的值`aoho`。

如上的操作过程，其实就是 MVCC 的一个简单的应用，下面我们将具体介绍多版本控制的实现。

### MVCC 写过程解析

首先我们结合之前写请求实现流程图的内容分析 MVCC 写请求的过程：


<Image alt="图片3.png" src="https://s0.lgstatic.com/i/image6/M01/12/58/Cgp9HWBAvdGAUB34AAJwukqHZTo156.png"/> 
  
写请求实现流程图

上图为写请求的过程，写请求在底层统一调用 put 方法。treeIndex 中根据查询的 key 从 B-tree 查找得到的是一个 keyIndex 对象，里面包含了 Revision 等全局版本号信息。

keyIndex 结构体定义如下所示：

```go
// 位于 mvcc/key_index.go:70
type keyIndex struct {
	key         []byte  // key 名称
	modified    revision // 最后一次修改的 etcd 版本号
	generations []generation // 保存了 key 多次修改的版本号信息
}
```

keyIndex 中保存了 key、modified 和 generations。

其中 generations 的结构体定义如下：

```go
// 位于 mvcc/key_index.go:335
type generation struct {
	ver     int64
	created revision // generation 创建时的版本
	revs    []revision
}
```

generation 中的 ver 表示当前 generation 包含的修改次数，created 记录创建 generation 时的 Revision 版本，最后的 revs 用于存储所有的版本信息。

Revision 结构体的定义如下：

```go
// 位于 mvcc/revision.go:26
type revision struct {
  // 事务发生时自动生成的主版本号
	main int64
	// 事务内的子版本号
	sub int64
}
```

Revision 中定义了一个全局递增的主版本号`main`，发生 put、txn、del 操作会递增，一个事务内的 main 版本号是唯一的；事务内的子版本号定义为`sub`，事务发生 put 和 del 操作时，从 0 开始递增。


<Image alt="图片2.png" src="https://s0.lgstatic.com/i/image6/M00/12/55/CioPOWBAva-AC-L1AANi-MAgn_0530.png"/> 
  
keyIndex、generation 和 revision 之间的关系

由于是第一次写，treeIndex 查询为空。etcd 会根据当前的全局版本号加 1（集群初始化从 1 开始），根据执行的结果，我们这里全局版本号在写之前为 2，自增之后变成 3。因此操作对应的版本号 revision {3,0}，对应写入 BoltDB 的 key。写入的 value 对应 mvccpb.KeyValue 结构体，其由 key、value、create_revision、mod_revision、version、lease 等字段组成，定义如下所示：

```go
type KeyValue struct {
	// 键
	Key []byte `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"`
	// 创建时的版本号
	CreateRevision int64 `protobuf:"varint,2,opt,name=create_revision,json=createRevision,proto3" json:"create_revision,omitempty"`
	// 最后一次修改的版本号
	ModRevision int64 `protobuf:"varint,3,opt,name=mod_revision,json=modRevision,proto3" json:"mod_revision,omitempty"`
	// 表示 key 的修改次数，删除 key 会重置为 0，key 的更新会导致 version 增加
	Version int64 `protobuf:"varint,4,opt,name=version,proto3" json:"version,omitempty"`
	// 值
	Value []byte `protobuf:"bytes,5,opt,name=value,proto3" json:"value,omitempty"`
	// 键值对绑定的租约 LeaseId，0 表示未绑定
	Lease int64 `protobuf:"varint,6,opt,name=lease,proto3" json:"lease,omitempty"`
}
```

构造好 key 和 value 之后，就可以写入 BoltDB 了。并同步更新 buffer。


<Image alt="图片1.png" src="https://s0.lgstatic.com/i/image6/M00/12/59/CioPOWBAv_aAdaSVAABXITH1r1w095.png"/> 


此外还需将本次修改的版本号与用户 key 的映射关系保存到 treeIndex 模块中，key hello 的 keyIndex。对照着上面介绍的 keyIndex、generation 和 Revision 结构体的定义，写入的 keyIndex 记录如下所示：

```go
key:     "hello"
modified: <3,0>
generations:
[{ver:1,created:<3,0>,revs: [<3,0>]} ]
```

modified 为最后一次修改的 etcd 版本号，这里是 \<3,0\>。generations 数组有一个元素，首次创建 ver 为 1，created 创建时的版本为 \<3,0\>，revs 数组中也只有一个元素，存储了所有的版本信息。

至此，put 事务基本结束，之所以说是基本完场，是因为还差最后一步------写入的数据持久化到磁盘。数据持久化的操作由 Backend 的协程来完成，以此提高写的性能和吞吐量。协程通过事务批量提交，将 BoltDB 内存中的数据持久化存储磁盘中。

这里我们要提一下键值对的删除。与更新一样，键值对的删除也是**异步**完成，每当一个 key 被删除时都会调用 tombstone 方法向当前的 generation 中追加一个空的 generation 对象，其实现如下所示：

```go
// 位于 mvcc/key_index.go:119
func (ki *keyIndex) tombstone(lg *zap.Logger, main int64, sub int64) error {
	if ki.isEmpty() {
		lg.Panic(
			"'tombstone' got an unexpected empty keyIndex",
			zap.String("key", string(ki.key)),
		)
	}
	if ki.generations[len(ki.generations)-1].isEmpty() {
		return ErrRevisionNotFound
	}
	ki.put(lg, main, sub)
	ki.generations = append(ki.generations, generation{})
	keysGauge.Dec()
	return nil
}
```

这个空的 generation 标识说明当前的 key 已经被删除了。除此之外，生成的 BoltDB key 版本号中追加了 t（tombstone），如 \<3,0,t\>，用于标识删除，而对应的 value 变成了只含 key 属性。

当查询键值对时，treeIndex 模块查找到 key 对应的 keyIndex，若查询的版本号大于等于被删除时的版本号，则会返回空。而真正删除 treeIndex 中的索引对象以及 BoltDB 中的键值对，则由**compactor 组件**完成。

### MVCC 读过程解析

我们继续来看读过程中的 MVCC 实现细节。还是使用讲解键值对查询时的流程图：


<Image alt="图片1.png" src="https://s0.lgstatic.com/i/image6/M01/12/58/Cgp9HWBAvXSARvMuAAIh2dCnpU8495.png"/> 
  
读请求实现流程图

读请求在底层统一调用的是 Range 方法，首先 treeIndex 根据查询的 key 从 BTree 查找对应 keyIndex 对象。从 keyIndex 结构体的定义可知，每一个 keyIndex 结构体中都包含当前键的值以及最后一次修改对应的 Revision 信息，其中还保存了一个 key 的多个 generation，每一个 generation 都会存储当前 key 的所有历史版本。

treeIndex 模块中提供了 Get 接口获取一个 key 对应 Revision 值：

```go
// 位于 mvcc/index.go:68
func (ti *treeIndex) Get(key []byte, atRev int64) (modified, created revision, ver int64, err error) {
	keyi := &keyIndex{key: key}
	if keyi = ti.keyIndex(keyi); keyi == nil {
		return revision{}, revision{}, 0, ErrRevisionNotFound
	}
	return keyi.get(ti.lg, atRev)
}
```

Get 接口的实现通过 keyIndex 函数查找 key 对应的 keyIndex 结构体：

```go
// 位于 mvcc/index.go:78
func (ti *treeIndex) keyIndex(keyi *keyIndex) *keyIndex {
	if item := ti.tree.Get(keyi); item != nil {
		return item.(*keyIndex)
	}
	return nil
}
```

可以看到这里的实现非常简单，从 treeIndex 成员 BTree 中查找 keyIndex，将结果转换成 keyIndex 类型后返回；获取 key 对应 Revision 的实现如下：

```go
// 位于 mvcc/key_index.go:137
func (ki *keyIndex) get(lg *zap.Logger, atRev int64) (modified, created revision, ver int64, err error) {
	if ki.isEmpty() {
		lg.Panic(
			"'get' got an unexpected empty keyIndex",
			zap.String("key", string(ki.key)),
		)
	}
	g := ki.findGeneration(atRev)
	if g.isEmpty() {
		return revision{}, revision{}, 0, ErrRevisionNotFound
	}
	n := g.walk(func(rev revision) bool { return rev.main > atRev })
	if n != -1 {
		return g.revs[n], g.created, g.ver - int64(len(g.revs)-n-1), nil
	}
	return revision{}, revision{}, 0, ErrRevisionNotFound
}
```

上述实现中，通过遍历 generations 数组来获取 generation，匹配到有效的 generation 后，返回 generation 的 revisions 数组中最后一个版本号，即 \<3,0\> 给读事务。

获取到 Revision 信息之后，读事务接口优先从 buffer 中查询，如果命中则直接返回，否则根据 revision \<3,0\> 作为 key 在 BoltDB 中查询。

在查询时如果没有指定版本号，默认读取最新的数据。如果指定了版本号，比如我们在上面发起了一个指定历史版本号为 3 的读请求：

```go
$ etcdctl get hello --rev=3
```

在 treeIndex 模块获取 key 对应的 keyIndex 时，指定了读版本号为 3 的快照数据。keyIndex 会遍历 generation 内的历史版本号，返回小于等于 3 的最大历史版本号作为 BoltDB 的 key，从中查询对应的 value。

需要注意的是，**并发读写事务不会阻塞在一个 buffer 资源锁上**。并发读创建事务时，会全量拷贝当前未提交的 buffer 数据，以此实现并发读。

### 小结

这一讲我们主要介绍了 etcd 中多版本控制 MVCC 的实现。首先介绍了 MVCC 的概念，多版本并发控制可以维护一个数据的多个历史版本，并且使得读写操作没有冲突。接着通过一个示例介绍了 etcd 中 MVCC 的功能，重点介绍了在读写过程中如何实现多版本控制。键值对的更新和删除都是由异步协程完成的，在保证一致性的同时，也提升了读写的性能以及组件的吞吐量。

本讲内容总结如下：


<Image alt="Drawing 3.png" src="https://s0.lgstatic.com/i/image6/M01/10/BE/CioPOWA_CKuAUXIhAAFmNO_GQ6w590.png"/> 


学习完这一讲，我想给大家留一个问题：既然是批量提交，那么在提交之前出现宕机等事故时，如何保证这部分数据不会丢失的呢？欢迎你在留言区和我交流自己的见解。下一讲，我们将介绍 etcd 事务的实现原理。


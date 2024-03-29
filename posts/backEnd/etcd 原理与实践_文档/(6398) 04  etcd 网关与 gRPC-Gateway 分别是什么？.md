# 04etcd网关与gRPC-Gateway分别是什么？

etcd 中有 etcd 网关与 gRPC-Gateway 两种类型的网关，很多同学会迷糊：这两种网关有什么区别，各自的用途是什么？这一讲我将通过介绍这两种网关以及相关实践，来解答你的困惑。

### etcd 网关模式：构建 etcd 集群的门户

etcd 网关是一个简单的**TCP 代理** ，可将网络数据转发到 etcd 集群。网关是无状态且透明的，它**既不会检查客户端请求，也不会干扰集群响应**，支持多个 etcd 服务器实例，并采用简单的循环策略。etcd 网关将请求路由到可用端点，并向客户端隐藏故障，使得客户端感知不到服务端的故障。后期可能会支持其他访问策略，例如加权轮询。

#### 什么时候使用 etcd 网关模式

我们使用客户端连接到 etcd 服务器时，每个访问 etcd 的应用程序**必须知道所要访问的 etcd 集群实例的地址**，即用来提供客户端服务的地址：ETCD_LISTEN_CLIENT_URLS。

如果同一服务器上的**多个应用程序访问相同的 etcd 集群** ，每个应用程序**仍需要知道 etcd 集群的广播的客户端端点地址**。如果将 etcd 集群重新配置，拥有不同的端点，那么每个应用程序还需要更新其端点列表。在大规模集群环境下，重新配置的操作既造成了重复又容易出错。

以上问题，都可以通过 etcd 网关来解决：使用 etcd 网关作为稳定的本地端点，对于**客户端应用程序** 来说，**不会感知到集群实例的变化**。典型的 etcd 网关配置是使每台运行网关的计算机在本地地址上侦听，并且每个 etcd 应用程序都连接对应的本地网关，发生 etcd 集群实例的变更时，只需要网关更新其端点，而不需要更新每个客户端应用程序的代码实现。

当然也不是所有的场景都适用 etcd 网关，比如下面这两个场景就不适合使用。

* **性能提升**   

  etcd 网关不是为提高 etcd 集群性能设计的。它不提供缓存、watch 流合并或批量处理等功能。etcd 团队目前正在开发一种缓存代理，旨在提高集群的可伸缩性。

* **在集群上运行管理系统**   

  类似 Kubernetes 的高级集群管理系统本身支持服务发现。应用程序可以使用系统默认的 DNS 名称或虚拟 IP 地址访问 etcd 集群。例如，负责为 Service 提供 Cluster 内部的服务发现和负载均衡的 Kube-proxy 其实等效于 etcd 网关的职能。

总而言之，为了自动传播集群端点更改，etcd 网关在每台机器上都运行，为多个应用提供访问相同的 etcd 集群服务。

#### etcd 网关模式实践

下面我们基于 etcd 网关模式进行实战演练，有如下的环境：


<Image alt="202124-24610.png" src="https://s0.lgstatic.com/i/image6/M00/01/33/Cgp9HWAbYByAfA1MAANa5H93HxQ555.png"/> 


启动 etcd 网关，以通过 etcd gateway 命令代理这些静态端点：

```java
$ etcd gateway start --endpoints=http://192.168.10.7:2379,http://192.168.10.8:2379,http://192.168.10.9:2379
#响应结果如下所示：
{"level":"info","ts":1607794339.7171252,"caller":"tcpproxy/userspace.go:90","msg":"ready to proxy client requests","endpoints":["192.168.10.7:2379","192.168.10.8:2379","192.168.10.9:2379"]}
```

注意的是，`---endpoints`是以逗号分隔的、用于转发客户端连接的 etcd 服务器目标列表。默认值为`127.0.0.1:2379`，不能使用类似如下的配置：

```java
 --endpoints=https://127.0.0.1:2379
```

因为**网关并不能决定 TLS**。

其他常用配置如下：

* --listen-addr 绑定的接口和端口，用于接受客户端请求，默认配置为 127.0.0.1:23790；

* --retry-delay 重试连接到失败的端点延迟时间。默认为 1m0s。**需要注意的是，值的后面标注单位，类似** `123`的设置不合法，**命令行会出现参数不合法**。

```java
invalid argument "123" for "--retry-delay" flag: time: missing unit in duration 123
```

* --insecure-discovery 接受不安全或容易受到中间人攻击的 SRV 记录。默认为 false。

* --trusted-ca-file 是 etcd 集群的客户端 TLS CA 文件的路径，用于认证端点。

除了使用静态指定 endpoint 的方式，还可以使用 DNS 进行服务发现，进行 DNS SRV 条目设置。你可以基于我们前面讲解的 DNS 发现模式的集群自行尝试。

### gRPC-Gateway：为非 gRPC 的客户端提供 HTTP 接口

etcd v3 使用 gRPC 作为消息传输协议。etcd 项目中包括了基于 gRPC 的 Go client 和命令行工具 etcdctl，客户端通过 gRPC 框架与 etcd 集群通讯。对于不支持 gRPC 的客户端语言，etcd 提供 JSON 的 gRPC-Gateway，通过 gRPC-Gateway 提供 RESTful 代理，转换 HTTP/JSON 请求为 gRPC 的 Protocol Buffer 格式的消息。

这里你需要注意的是，在 HTTP 请求体中的 JSON 对象，其包含的 key 和 value 字段都被定义成了 byte 数组，因此**必须在 JSON 对象中，使用 base64 编码对内容进行处理**。为了方便，我在下面例子将会使用 curl 发起 HTTP 请求，其他的 HTTP/JSON 客户端（如浏览器、Postman 等）都可以进行这些操作。

#### etcd 版本与 gRPC-Gateway 接口对应的关系

gRPC-Gateway 提供的接口路径自 etcd v3.3 已经变更：

* etcd v3.2 及之前的版本只能使用 \[CLIENT-URL\]/v3alpha/\* 接口；

* etcd v3.3 使用 CLIENT-URL/v3alpha/\*；

* etcd v3.4 使用 CLIENT-URL/v3beta/，且废弃了\[CLIENT-URL\]/v3alpha/；

* etcd v3.5 只使用 CLIENT-URL/v3beta/。

通过上面的接口与 etcd 版本的对应关系，你可以看到，即使是 v3 版本下的 API，gRPC-Gateway 提供的接口路径在内部细分的版本下也有不同，所以需要注意当前正在使用的 etcd 版本。

下面我们将基于 etcd 提供的 gRPC-Gateway 接口进行键值对读写、watch、事务和安全认证的实践。

#### 键值对读写操作

我们先来看看键值对的读写，分别使用接口 /v3/kv/range 和 /v3/kv/put 进行读写 keys。我们将键值对象写入 etcd：

```java
$ curl -L http://localhost:2379/v3/kv/put \
  -X POST -d '{"key": "Zm9v", "value": "YmFy"}'
# 输出结果如下：
{"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"16","raft_term":"9"}}
```

可以看到，我们通过 HTTP 请求成功写入了一对键值对，其中键为 Zm9v，值为 YmFy。键值对经过了 base64 编码，实际写入的键值对为 foo:bar。

接着，我们通过 /v3/kv/range 接口，来读取刚刚写入的键值对：

```java
$ curl -L http://localhost:2379/v3/kv/range \
  -X POST -d '{"key": "Zm9v"}'
# 输出结果如下：
{"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"16","raft_term":"9"},"kvs":[{"key":"Zm9v","create_revision":"13","mod_revision":"16","version":"4","value":"YmFy"}],"count":"1"}
```

通过 range 接口，获取 "Zm9v" 对应的值，完全符合我们的预期。

当我们想要获取前缀为指定值的键值对时，可以使用如下请求：

```java
$ curl -L http://localhost:2379/v3/kv/range \
  -X POST -d '{"key": "Zm9v", "range_end": "Zm9w"}'
# 输出结果如下：
{"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"16","raft_term":"9"},"kvs":[{"key":"Zm9v","create_revision":"13","mod_revision":"16","version":"4","value":"YmFy"}],"count":"1"}
```

我们在请求中指定了 key 的范围为 Zm9v-Zm9w。结果只返回一个键值对，符合预期。通过接口 /v3/kv/range 和 /v3/kv/put，我们可以方便地读写键值对。

#### watch 键值

键值对的 watch 也是 etcd 中经常用到的功能。etcd 中提供了 /v3/watch 接口来监测 keys，我们来 watch 刚刚写入的 "Zm9v"，请求如下所示：

```java
$ curl -N http://localhost:2379/v3/watch \
  -X POST -d '{"create_request": {"key":"Zm9v"} }' &
# 输出结果如下：
{"result":{"header":{"cluster_id":"12585971608760269493","member_id":"13847567121247652255","revision":"1","raft_term":"2"},"created":true}}
```

我们创建了一个监视 key 为 Zm9v 的请求，etcd 服务端返回了创建成功的结果。

另外发起一个请求，用以更新该键值，请求如下所示：

```java
$ curl -L http://localhost:2379/v3/kv/put \
  -X POST -d '{"key": "Zm9v", "value": "YmFy"}' >/dev/null 2>&1
```

我们在 watch 请求的执行页面，可以看到如下结果：


<Image alt="202124-24615.png" src="https://s0.lgstatic.com/i/image6/M00/01/31/CioPOWAbYCuAXNCwAAUjH7emDuI276.png"/> 


当写入键值后，触发了监测事件的发生，控制台输出了时间的细节。HTTP 请求客户端与 etcd 服务端建立长连接，当监听的键值对发生变更时，便会将事件通知给客户端。

#### etcd 事务的实现

事务用于完成一组操作，通过对比指定的条件，成功的情况下执行相应的操作，否则回滚。在 gRPC-Gateway 中提供了 API接口，通过 /v3/kv/txn 接口发起一个事务。

我们先来对比指定键值对的创建版本，如果成功则执行更新操作。

为了获取创建版本，我们在执行前，先查询该键值对的信息：

```java
# 查询键值对的版本
$ curl -L http://localhost:2379/v3/kv/range   -X POST -d '{"key": "Zm9v"}'
#响应结果
{"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"20","raft_term":"9"},"kvs":[{"key":"Zm9v","create_revision":"13","mod_revision":"20","version":"8","value":"YmFy"}],"count":"1"}
# 事务，对比指定键值对的创建版本
$ curl -L http://localhost:2379/v3/kv/txn \
  -X POST \
  -d '{"compare":[{"target":"CREATE","key":"Zm9v","createRevision":"13"}],"success":[{"requestPut":{"key":"Zm9v","value":"YmFy"}}]}'
 #响应结果
 {"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"20","raft_term":"9"},"succeeded":true,"responses":[{"response_put":{"header":{"revision":"20"}}}]}
```

接着发起事务，用以设置键值，compare 是断言列表，拥有多个联合的条件，这里的条件是当 createRevision 的值为 13 时（我们在上面请求查询到该键值的创建版本为 13），表示符合条件，因此事务可以成功执行。

下面是一个对比指定键值对版本的事务，HTTP 请求实现如下：

```java
# 事务，对比指定键值对的版本
$ curl -L http://localhost:2379/v3/kv/txn \
  -X POST \
  -d '{"compare":[{"version":"8","result":"EQUAL","target":"VERSION","key":"Zm9v"}],"success":[{"requestRange":{"key":"Zm9v"}}]}'
 #响应结果
{"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"6","raft_term":"3"},"succeeded":true,"responses":[{"response_range":{"header":{"revision":"6"},"kvs":[{"key":"Zm9v","create_revision":"2","mod_revision":"6","version":"4","value":"YmF6"}],"count":"1"}}]}
```

上述命令获取指定版本的键值，可以看到 compare 中 target 的枚举值为 VERSION。通过比较，发现键 Zm9v 对应的 version 确实是 8，因此执行查询结果，返回 Zm9v 对应的正确值 YmF6。

#### HTTP 请求的安全认证

HTTP 的方式访问 etcd 服务端，需要考虑安全的问题，gRPC-Gateway 中提供的 API 接口支持开启安全认证。通过 /v3/auth 接口设置认证，实现认证的流程如下图所示：


<Image alt="图片3.png" src="https://s0.lgstatic.com/i/image6/M00/02/F8/CioPOWAeU_iAW1x5AABp9hsIxJk379.png"/> 


```java
# 创建 root 用户
$ curl -L http://localhost:2379/v3/auth/user/add \
-X POST -d '{"name": "root", "password": "123456"}'
#响应结果
{"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"20","raft_term":"9"}}
# 创建 root 角色
curl -L http://localhost:2379/v3/auth/role/add \
  -X POST -d '{"name": "root"}'
#响应结果	{"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"20","raft_term":"9"}}
# 为 root 用户授予角色
curl -L http://localhost:2379/v3/auth/user/grant \
  -X POST -d '{"user": "root", "role": "root"}'
#响应结果{"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"20","raft_term":"9"}}
# 开启权限
$ curl -L http://localhost:2379/v3/auth/enable -X POST -d '{}'
#响应结果 {"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"20","raft_term":"9"}}
```

如上的请求中，我们首先创建了 root 用户和角色，将 root 角色赋予到 root 用户，这样就可以开启用户的权限。接下来就是进行身份验证，并进行 HTTP 访问。流程如下图所示：


<Image alt="图片4.png" src="https://s0.lgstatic.com/i/image6/M00/02/FA/Cgp9HWAeVBOAboy4AAB4viPlbQo993.png"/> 


使用 /v3/auth/authenticate API 接口对 etcd 进行身份验证以获取身份验证令牌：

```java
# 获取 root 用户的认证令牌
$ curl -L http://localhost:2379/v3/auth/authenticate \
  -X POST -d '{"name": "root", "password": "123456"}'
#响应结果
{"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"21","raft_term":"9"},"token":"DhRvXkWhOkINVQXI.57"}
```

请求获取到 token 的值为 DhRvXkWhOkINVQXI.57。

接下来，设置请求的头部 Authorization 为刚刚获取到的身份验证令牌，以使用身份验证凭据设置 key 值：

```java
$ curl -L http://localhost:2379/v3/kv/put \
  -H 'Authorization : DhRvXkWhOkINVQXI.57' \
  -X POST -d '{"key": "Zm9v", "value": "YmFy"}'
#响应结果  	{"header":{"cluster_id":"14841639068965178418","member_id":"10276657743932975437","revision":"21","raft_term":"9"}}
```

可以看到，上述请求设置成功 Zm9v 对应的 YmFy。如果 token 不合法，会出现 401 的错误，如下所示：


<Image alt="Drawing 4.png" src="https://s0.lgstatic.com/i/image2/M01/0C/37/CgpVE2AXy1mAIoJYAAHuUqnYrC4761.png"/> 


etcd gRPC-Gateway 中提供的 API 接口还有诸如 /v3/auth/role/delete、/v3/auth/role/get 等其他接口，限于篇幅，我只介绍了其中常用的几个，其他的接口可以参见：[rpc.swagger.json](https://github.com/etcd-io/etcd/blob/master/Documentation/dev-guide/apispec/swagger/rpc.swagger.json)。

### 小结：etcd 网关与 gRPC-Gateway 的对比

通过上面的讲解与实践，我们来总结下这两种网关的用途和使用场景：

* etcd 网关通常用于 etcd 集群的门户，是一个简单的 TCP 代理，将客户端请求转发到 etcd 集群，对外屏蔽了 etcd 集群内部的实际情况，在集群出现故障或者异常时，可以通过 etcd 网关进行切换；

* gRPC-Gateway 则是对于 etcd 的 gRPC 通信协议的补充，有些语言的客户端不支持 gRPC 通信协议，此时就可以使用 gRPC-Gateway 对外提供的 HTTP API 接口。通过 HTTP 请求，实现与 gRPC 调用协议同样的功能。

总的来说，etcd 网关与 gRPC-Gateway 是 etcd 中两个不同的功能，不能混为一谈，只有当你理解了它们各自的功能，才能在适当的场景使用。

本讲主要内容如下：


<Image alt="Drawing 5.png" src="https://s0.lgstatic.com/i/image2/M01/0C/35/Cip5yGAXy2aAZl7CAAGOud5RyFE332.png"/> 


学完这一讲，你对 etcd 网关与 gRPC-Gateway 有什么使用方面的见解或者实践经历？欢迎在留言区和我分享。下一讲我们将会学习如何实现可伸缩的 etcd API，即 etcd gRPC 代理的模式。


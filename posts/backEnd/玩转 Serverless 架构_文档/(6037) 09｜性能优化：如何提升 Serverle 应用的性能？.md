# 09｜性能优化：如何提升Serverle应用的性能？

从今天开始，我们正式进入开发进阶篇，在进阶篇，我将带你深入剖析开发 Serverless 应用的一些痛点问题，比如性能优化、安全和成本等。这些问题也是阻碍开发者使用 Serverless 的重要因素。今天这一讲我们就先聊一聊 Serverless 应用的性能优化。

学完前面的内容后，你应该对 Serverless 有了一定的了解，Serverless 自动弹性伸缩的特性让我们的应用具备了无限扩展的能力，但基于 FaaS 的实现也带来了一个很大的副作用，即冷启动。**冷启动是我们代码在处理业务功能之前的额外开销，这也是广大 Serverless 开发者面临的问题之一。** 冷启动会影响 Serverless 应用的性能，所以很多开发者都比较担忧，Serverless 能否应对低延时、高并发的场景？答案是肯定的，关键就在于如何优化 Serverless 应用的性能。

而 Serverless 的性能优化的核心就是减少冷启动。所以今天我会带你学习两部分内容。

* **深入理解冷启动：** 首先我会带你分析冷启动耗时，然后再解释说明冷启动的常见误区，在这个过程中让你学会如何去减少冷启动的时间。

* **如何优化 Serverless 的性能：** 这部分我会为你详细介绍优化 Serverless 性能的方案。

话不多说，我们开始今天的学习。

### 深入理解冷启动

据我观察，很多同学对冷启动的原理了解得都还不够透彻，但深入理解冷启动，是你去优化 Serverless 应用性能的前提。

在 04 讲中，我们已经学习了函数的启动过程：函数可以分为冷启动和热启动，其中冷启动要经过下载代码、初始化容器、执行初始化代码、执行函数这四个过程。


<Image alt="图片1.png" src="https://s0.lgstatic.com/i/image2/M01/06/96/CgpVE2AFehKABm9NAAPbR0FktI8010.png"/> 
  
函数的启动过程示意图

从图中你可以发现，冷启动需要经过多个步骤，耗时比较长。**那实际上冷启动时间到底有多长呢？** 你可以借助链路追踪工具，比如 AWS 的 [X-Ray](https://aws.amazon.com/cn/xray/)、阿里云的[链路追踪](https://www.aliyun.com/product/xtrace)。Lambda、函数计算等 FaaS 平台也都集成了链路追踪功能，通过链路追踪你可以查询函数冷启动耗时、执行时间，进行诊断和分析 Serverless 应用的性能。

下面是我创建的一个函数的调用链路图：


<Image alt="image.png" src="https://s0.lgstatic.com/i/image2/M01/06/94/Cip5yGAFejSARHsrAAJ37M2V_VY768.png"/> 
  
函数计算链路追踪截图

图中的主要信息有五点。

* InvokeFunction：函数执行总时间。

* ClodStart：是函数冷启动时间（如果函数是热启动的，不会有这个阶段）。

* PrepareCode：是函数冷启动过程中，下载代码或下载自定义镜像的时间。

* RuntimeInitialize：是执行环境启动的时间，包括启动容器和函数运行环境。

* Invocation：是执行函数的时间。

从调用链路中可以发现，本次执行函数是冷启动的，热启动的函数则没有ClodStart、 PrepareCode 和 RuntimeInitialize 这三个阶段。整个函数执行耗时 553ms，冷启动耗时 458ms，可见冷启动对函数性能影响还是很大的。

那什么时候函数是冷启动或者热启动呢？有很多同学讨论说：冷启动就是第一个请求需要冷启动，所以第一个请求很慢，后面的请求是热启动，都很快。可实际并不是这样，函数第一次执行的时候一定是冷启动，但后面的请求不一定都是热启动，这与触发函数执行的事件是串行还是并行有关。

接下来我就以 HTTP 触发器为例，为你进行讲解。

如果所有用户的请求都是串行的，则在这个过程中，确实就只有第一次请求是冷启动。为了说明情况，我提供了一段测试程序（[地址](https://github.com/nodejh/serverless-class/tree/master/09/performance-http)），你可以将其部署在函数计算中，然后通过 charles 等工具来模拟用户连续请求该接口的情况。如图所示，在 charles 中将并发设置为 1，然后发起 100 个请求，这样函数就会被顺序调用 100 次，这 100 个请求也就是串行的。


<Image alt="Drawing 2.png" src="https://s0.lgstatic.com/i/image/M00/8E/AC/CgqCHmAFQDGAFPLlAACdpnqR27w892.png"/> 
  
100 个请求，并发 1 （charles 设置）

发起请求后得到的结果如下：


<Image alt="Drawing 3.png" src="https://s0.lgstatic.com/i/image2/M01/06/8F/CgpVE2AFQDmAVrrxAALO5iFN2RY126.png"/> 
  
100 个请求，并发 1 （测试结果）

在这个测试结果中，第一个请求耗时 770ms（我在这份代码的响应体中返回了 requestId，根据 requestId 在链路追踪中查询到第一个请求确实是冷启动）。而后面的请求都只耗时 40 ms左右，通过链路追踪分析确定都是热启动。可能对于某些性能要求不高的场景来说，在这 100 个请求中，只有一个请求是冷启动，影响的用户是 1%，是可以忍受的。

**那如果用户并发访问会怎么样呢？** 毕竟用户行为是不可预测的，不可能总是串行访问。因此，让我们再来模拟发起 100 个请求，并发为 10 的情况，看一下会发生什么：


<Image alt="Drawing 4.png" src="https://s0.lgstatic.com/i/image2/M01/06/8F/CgpVE2AFQE6AJEBXAADLKr84zKo250.png"/> 
  
100 个请求，并发 10 （charles 设置）


<Image alt="Drawing 5.png" src="https://s0.lgstatic.com/i/image2/M01/06/8D/Cip5yGAFQFaAPfJDAALhBhSRm5k514.png"/> 
  
100 个请求，并发 10 （测试结果）

情况不乐观了，前 10 个请求都是冷启动。如果你的网站在一天内流量有波峰波谷，比如以下场景：

* 团购订餐业务，可能在每天中午、晚上流量突增；

* 促销活动，在活动开始前流量突增；

* 社交软件，遇到重大新闻时流量突增；

对于这些业务，流量突增就意味着 FaaS 平台不得不添加更多的实例来支持更大的并发，并且新增实例时都会有冷启动，这就对用户体验有较大影响了。**那么如何解决这些问题呢？接下来就让我们进入性能优化部分。**

### 如何优化 Serverless 的性能

前面也提到了对于 Serverless 的性能优化，主要就是优化冷启动耗时，主要可以从四个方面入手：

* 避免函数冷启动；

* 减小代码体积；

* 提升函数吞吐量；

* 选择合适的编程语言。

#### 避免冷启动

既然冷启动耗时，那么避免冷启动自然就能极大提高性能了。有两种方案：

* 对函数进行预热；

* 使用预留资源。

预热就是指你通过定时任务（比如定时触发器函数），在真实请求到来之前对函数发起请求，使函数提前初始化，这样真实请求就会使用已经初始化的函数实例去执行代码了。例如对于订餐等可预估高峰流量的业务，你可以每天上午 11:58 分，通过定时任务并发发送大量的请求到需要预热的 API，提前初始化函数实例，这样 12:00 流量突增时就能使用已有的函数实例了，处理这些请求的函数也都是热启动。你还可以使用特定的请求头来标记预热请求，以便将其和正常的用户请求分开，并且可以不对预热请求做任何处理。

函数预热是彻底消除冷启动时间，代价就是需要维护预热的逻辑，并且提前预热的函数本质上并没有处理用户请求，却需要持续占用资源。所以是否使用预热的方案，既要考虑业务场景，也要平衡性能和成本。如果你的应用对延迟要求很高，比如秒杀业务，就可以使用预热功能。如果你的应用对延迟没那么敏感，就没必要预热了。

此外有些 FaaS 平台（比如函数计算）也提供了预留资源的功能，可以为你的函数实例持续保留。你需要手动去创建释放函数运行的资源。使用预留资源，函数每次启动都是热启动，这样就能完全消除冷启动，提升函数性能。并且你也不用像预热那样主动发请求了，使用起来也更简单。只是预留资源通常成本会高一点。

#### 减小代码体积

函数冷启动的第一个步骤就是下载代码，代码体积越大，下载时间就越长，这也会导致冷启动时间增加。而你为了减少代码体积，可以避免引入不必要的依赖、不要加载不需要的代码、对 SDK 进行精简、对代码进行压缩，甚至只构建需要执行的代码。

这对 Node.js 来说尤其重要，因为 Node.js 的依赖目录 node_modules 通常体积非常大且非常冗余。还记得 06 讲的内容吗？最后我为你分享了如何使用 ncc 来构建 Node.js 的代码及依赖，这不仅减小了体积，还提升了性能。

#### 提升函数的吞吐量

很多初学 Serverless 的同学可能会进入一个误区：认为一个函数实例只能处理一个请求。很多早期的 FaaS 平台确实是这样设计的，但现在大多 FaaS 都支持了单实例多并发，本质上为了提升函数吞吐量，这样一个实例就可以同时处理多个请求，能够减少函数实例的生成，进而减少冷启动。


<Image alt="Drawing 6.png" src="https://s0.lgstatic.com/i/image/M00/8E/AC/CgqCHmAFQGOAalPEAAKfjpk2TGQ796.png"/> 


假设有 3 个并发请求同时需要处理，当函数并发为 1 时，FaaS 平台就会生成 3 个函数实例来处理这 3 个请求，每个函数实例处理一个请求，需要经过 3 次冷启动。当函数并发为 10，则只会生成一个函数实例来处理 3 个并发请求。

单实例单并发的情况下，函数实例只能同时处理一个请求，处理完毕才能处理下一个请求。


<Image alt="Drawing 7.png" src="https://s0.lgstatic.com/i/image/M00/8E/AC/CgqCHmAFQG6AZtARAAFLIxd18bA584.png"/> 


而单实例多并发，函数实例则可以同时处理多个请求。


<Image alt="Drawing 8.png" src="https://s0.lgstatic.com/i/image2/M01/06/8F/CgpVE2AFQHeADlNcAAEArS4tH6M355.png"/> 


从实例的生命周期也可以看出来，单实例多并发的实例执行时间更短，这样成本自然也更低。你可能比较疑惑，单实例处理多个请求时，代码具体是怎么执行的呢？让我们看下面这段代码：

```javascript
const mysql = require('mysql');
// 创建数据库连接
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
 
connection.connect();
// 函数入口
exports.handler = function(event, context, callback) {
  console.log('Start handler...')
  // 查询数据库
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) {
        return callback(error);
      }
        console.log('The solution is: ', results[0].solution);
    });
};
```

首先第一个请求到来，函数冷启动，会先下载代码然后初始化一个 Node.js 运行环境，再接下来就会执行初始化代码，主要就是引入 mysql 依赖包、初始化数据库连接（也就是第 1 \~10 行），最后会执行 handler 方法。  

然后第二个请求到来，函数就是热启动了。这时函数就会重复利用上一个运行环境，进而重复使用上次的执行上下文，包括 mysql 依赖、数据库连接。热启动时就只会执行 handler 函数。

基于热启动的特点，我们可以将初始化逻辑都放在 handler 函数之外，只需要第一次冷启动来进行初始化，这样就能够提升函数性能。而单函数多并发，就更进一步放大了这个特点。基于单函数多并发，Serverless 应用就可以更好地支持低延迟、高并发场景了。

除了为函数设置并发能够减少冷启动次数外，我在前面也提到了，不同编程语言的冷启动时间也不尽相同。所以接下来，我们就分析 Node.js、Python、Java 等常见编程语言的冷启动耗时。

#### 选择合适的编程语言

不同编程语言的冷启动时间也有较大差异，一般 Node.js、Python 的冷启动耗时要比 Java 等静态语言少很多。Java 冷启动慢主要是因为需要启动庞大的虚拟机，并将所有类加载到内存中初始化。所以选择冷启动时间短的编程语言，可以大幅提升应用性能，这也是为什么 Node.js 在 Serverless 领域比较受欢迎的原因之一。

当然，空口无凭，不同编程语言的冷启动过耗时到底如何，最终还要靠数据说话。所以为了让结果更可行，我在函数计算中，针对 Node.js、Python、Java、PHP 这几种常见的编程语言进行了冷启动性能测试。**测试的方法是：** 我分别使用这几种编程语言实现了一个 "Hello World" 函数，然后给函数设置定时触发器，每半小时执行一次，这样函数执行时基本就是冷启动了。然后我使用链路追踪来采集冷启动耗时，最后统计每个语言的耗时。我还统计了这些函数分别在 128MB、1024MB、2008MB 这几种不同内存下的冷启动时间，最终得到了下面这张图。


<Image alt="Drawing 9.png" src="https://s0.lgstatic.com/i/image2/M01/06/8D/Cip5yGAFQIqAX7ykAACYovlO0ak428.png"/> 


我的统计代码在 [ClodStart Performance Test](https://github.com/nodejh/serverless-class/tree/master/09/performance-language)，你有兴趣的话也可以亲自试一下。从这张图中可以看出这些信息：

* 函数计算中 PHP 冷启动最快，Node.js、Python 次之，Java 最慢；

* Java 冷启动耗时大约是 Node.js 或 PHP 的三倍，Node.js、Python、PHP 的冷启动耗时基本在 1s 内；

* 随着内存增加，冷启动耗时逐渐缩短。

并且我也针对 Lambda 进行了测试，在 Lambda 中 Node.js 的冷启动耗时最短，大约在 200ms 左右，性能是函数计算的三四倍，这也说明国内 FaaS 产品还有提升空间。另外函数计算的 PHP 性能最好，这也是我比较意外的。所以这时我们又有了新的性能优化方案，比如：

* 尽量选择 Node.js、Python、PHP 等冷启动耗时短的语言编程；

* 为函数设置合适的内存，内存越大，冷启动耗时越短，但成本也越高，所以要设置一个合适的内存。

#### 总结

在这一讲的开头，我提到了 Serverless 应用的性能优化主要是围绕冷启动进行的，此外我们也可以针对代码运行时进行优化。对今天学习的内容做个总结，就可以得到 Serverless 性能优化的一些实践方案：

* 提前给函数预热；

* 使用预留资源；

* 减小代码体积、减少不必要的依赖；

* 执行上下文重用；

* 为函数设置并发；

* 选择冷启动耗时少的编程语言；

* 为函数设置合适的内存。

而这也是我今天想要强调的重点。当然，除了我们自己的优化外，Serverless 性能还有很大一部分需要靠提供服务的云厂商去优化，例如各种编程语言的运行时。比如 Java 冷启动耗时很长，这个优化也只能依靠云厂商了，开发者很难去优化，只能尽量避免。

最后，今天这节课的作业是，你还知道哪些 Serverless 性能优化方案呢？欢迎在评论区留言。我们下一讲见。


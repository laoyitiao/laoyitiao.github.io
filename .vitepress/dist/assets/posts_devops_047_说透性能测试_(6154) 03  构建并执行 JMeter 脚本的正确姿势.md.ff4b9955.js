import{_ as e,j as o,o as t,g as r,k as l,h as a,Q as p,s}from"./chunks/framework.cfb14fe0.js";const z=JSON.parse('{"title":"03构建并执行JMeter脚本的正确姿势","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6154) 03  构建并执行 JMeter 脚本的正确姿势.md","filePath":"posts/devops/047_说透性能测试/(6154) 03  构建并执行 JMeter 脚本的正确姿势.md","lastUpdated":1696682708000}'),c={name:"posts/devops/047_说透性能测试/(6154) 03  构建并执行 JMeter 脚本的正确姿势.md"},i=p('<h1 id="_03构建并执行jmeter脚本的正确姿势" tabindex="-1">03构建并执行JMeter脚本的正确姿势 <a class="header-anchor" href="#_03构建并执行jmeter脚本的正确姿势" aria-label="Permalink to &quot;03构建并执行JMeter脚本的正确姿势&quot;">​</a></h1><p>通过上两讲的学习，相信你已经掌握了 JMeter 的组件结构、关联、参数化等知识，这些是你使用性能测试工具的基础，那如何才能有效地执行这些脚本呢？</p><p>说到这个话题，我回想起一些找我咨询的同学。</p><p>有些团队在组建之初往往并没有配置性能测试人员，后来随着公司业务体量的上升，开始有了性能测试的需求，很多公司为了节约成本会在业务测试团队里选一些技术能力不错的同学进行性能测试，但这些同学也是<strong>摸着石头过河</strong>。他们会去网上寻找一些做性能的方案，通常的步骤是写脚本，出结果然后交给开发。这虽然能够依葫芦画瓢地完成一些性能测试的内容，但整个过程中会存在不少值得商榷之处。</p><p>这一讲我就以脚本为切入点，和你聊聊在脚本构建与执行过程中可能存在不规范的地方有哪些，以及如何去解决。</p><h3 id="脚本构建" tabindex="-1">脚本构建 <a class="header-anchor" href="#脚本构建" aria-label="Permalink to &quot;脚本构建&quot;">​</a></h3><p><strong>脚本构建就是编写脚本</strong>，是你正式开始执行性能测试的第一步，对于常规的请求来说只需要通过界面的指引就可以完成，这个是非常容易的，但是上手容易不代表你使用方法科学，下面我带你看看常见的误区。</p><h4 id="一个线程组、一条链路走到底" tabindex="-1">一个线程组、一条链路走到底 <a class="header-anchor" href="#一个线程组、一条链路走到底" aria-label="Permalink to &quot;一个线程组、一条链路走到底&quot;">​</a></h4><p>先来看下这样一张线程组的图：</p>',9),E=p('<p>图 1：一个线程组</p><p>图中包含了注册、登录、浏览商品、查看订单等，它们在同一个线程组，基于同一线程依次进行业务。这样的做法其实和自动化非常相似。</p><p>比如张三先注册一个网站，然后进行登录、添加购物车等操作。但仔细想一想，对于一个网站的性能而言，这么考虑是有些问题的。</p><p>在正常情况下，基于同一个时间节点，一部分人在浏览商品，而另一部分人在下单。这两部分之间没有先后关系，人数占比也不一定就是 1:1。脚本中的设计思路实际上也是你对性能测试模型的理解，能够反馈出模型中的用户访问比例分布，这块内容我会在第二模块重点描述，不仅会讲述满足脚本的跑通，还会通过脚本构建基于性能模型的场景。</p><h4 id="未提取公共部分-增加脚本管理难度" tabindex="-1">未提取公共部分，增加脚本管理难度 <a class="header-anchor" href="#未提取公共部分-增加脚本管理难度" aria-label="Permalink to &quot;未提取公共部分，增加脚本管理难度&quot;">​</a></h4><p>我在平时的工作中发现，有的测试会基于同一类型的 HTTP 请求，配置相同的 host、端口等，并没有很好地利用<strong>JMeter 中作用域的思想</strong>。</p><p>一般全链路级别的测试脚本里可能会包含上百个接口，对于一些 host 和端口号，并不需要每一个接口都去配置，我们可以使用一个 HTTP 请求默认值去做公共部分。如果说不提取这些公共部分，每改动一个配置，所有接口可能都要改动，这样脚本维护成本工作量也会比较大，有可能会造成&quot;牵一发而动全身&quot;的情况。</p><h4 id="查看结果树使用频率高" tabindex="-1">查看结果树使用频率高 <a class="header-anchor" href="#查看结果树使用频率高" aria-label="Permalink to &quot;查看结果树使用频率高&quot;">​</a></h4><p>在脚本调试过程中，我们通常会添加结果树来实时查看返回数据的正确性。这个插件本身是比较消耗性能的，在正式压测中应当禁止使用。一般来说，在脚本调试中通过作用域的思想去配置一个查看结果树就可以了，不要过度使用，不然等到正式压测的时候，一个个地禁用结果树不仅会消耗时间，还容易遗漏。</p><h4 id="脚本逻辑复杂" tabindex="-1">脚本逻辑复杂 <a class="header-anchor" href="#脚本逻辑复杂" aria-label="Permalink to &quot;脚本逻辑复杂&quot;">​</a></h4><p>有的测试在编写脚本的过程中为了区分业务逻辑，会使用很多插件，比如 if 判断、循环， 这些插件虽然可以让你进入不同的业务场景，但会增加脚本的复杂度，影响发起压力的效率。你可以自己做一些对比测试，看使用该插件和去除该插件实际的处理能力相差多少，不要因为自己的脚本结构而影响实际的性能测试结果。</p><p>以上是在脚本构建时，一些普遍存在的误区，而规范的脚本构建，我认为要做到<strong>真实和精简</strong>。</p><ul><li><p>真实在于你的脚本可以体现出真实的用户访问场景；</p></li><li><p>精简在于少使用周边的插件，比如通过 JMeter 去监控服务器资源，这样的监控不仅简单粗糙，而且较大地影响 JMeter 的压力发起的效率。</p></li></ul><h3 id="脚本执行" tabindex="-1">脚本执行 <a class="header-anchor" href="#脚本执行" aria-label="Permalink to &quot;脚本执行&quot;">​</a></h3><p>在正确构建了脚本之后，我们就要来看如何执行脚本了。脚本执行就是你怎么去<strong>运行脚本</strong>，可能有的同学会一头雾水，我直接点击界面上的运行按钮不就行了吗？事实上真正的压测可不是这个样子的。</p><h4 id="界面化执行性能测试" tabindex="-1">界面化执行性能测试 <a class="header-anchor" href="#界面化执行性能测试" aria-label="Permalink to &quot;界面化执行性能测试&quot;">​</a></h4><p>一些测试人员在 Windows 或 Mac 环境编写完脚本后，会直接用界面化的方式进行性能测试，这样的做法是非常不规范的。打开 JMeter 界面之后就会弹出提示，如图 2 所示：</p>',17),y=p("<p>图 2：界面化性能测试提示</p><p>很多人会选择直接忽略掉，但图中的第一段是这样的：</p><blockquote><p>Don&#39;t use GUI mode for load testing！only for Test creation and Test debugging。For load testing，use NON GUI Mode。</p></blockquote><p>中文意思就是<strong>图形化模式只让你调试，不要进行压测</strong>。</p><p>图形化的压测方式会消耗较多的客户端性能，在压测过程中容易因为客户端问题导致内存溢出。既然官方不推荐我们使用图形化界面，那我们应当如何执行测试脚本呢？</p><p>我们来看图 2 中的第三行内容：</p><blockquote><p>jmeter -n -t [jmx file] -l [results file] -e -o [Path to web report folder]</p></blockquote><p>官方早已给出答案：<strong>通过命令行执行</strong>。命令行执行的方式同样适用于 Windows、Mac 和 Linux 系统，不需要纠结系统兼容性的问题。</p><p>那既然命令行执行的方式不会造成这样的问题，为什么还要用界面化的方式呢？</p><p>相对于命令行执行，界面化的方式更为简单、方便，但命令行执行也并不是完美无缺的。</p><p>我们来回顾这段文字中的含义：</p><blockquote><p>jmeter -n -t [jmx file] -l [results file] -e -o [Path to web report folder]</p></blockquote><ul><li><p>-n 表示在非 GUI 模式下运行 JMeter；</p></li><li><p>-t 表示要运行的 JMeter 测试脚本文件，一般是 jmx 结尾的文件；</p></li><li><p>-l 表示记录结果的文件，默认以 jtl 结尾；</p></li><li><p>-e 表示测试完成后生成测试报表；</p></li><li><p>-o 表示指定的生成结果文件夹位置。</p></li></ul><p>我们来看一下执行了上面的脚本后的实际效果，如图 3 所示：</p>",14),_=p("<p>图 3：脚本执行后的效果</p><p>从图中可以看到，命令行的方式直接产生了总的 TPS、报错和一些时间层级的指标。命令行的执行方式规避了一些图形化界面存在的问题，但这样的结果输出方式存在 2 个问题：</p><ul><li><p><strong>看不到实时的接口返回报错的具体信息；</strong></p></li><li><p><strong>看不到混合场景下的每个接口的实时处理能力。</strong></p></li></ul><p>这 2 个问题都有个关键词是&quot;实时&quot;，是在压测过程中容易遗漏的点。虽然压测之后我们有很多方式可以回溯，但在性能测试过程中，发现、排查、诊断问题是必不可少的环节，它能够帮助我们以最快的速度发现问题的线索，让问题迅速得到解决。</p><p>先来看第一点：<strong>看不到实时的接口返回报错的具体信息</strong>。</p><p>jmeter.log 刚刚执行过程中记录了哪些内容呢？如图 4 所示：</p>",6),d=p(`<p>图 4：jmeter.log 执行时记录的内容</p><p>你可以看到只能显示报错率，但看不到具体的报错内容，那如何去解决呢？一般我会使用 beanshell，把判定为报错的内容增加到 log 里。beanshell 的示意代码如下所示，你可以根据自己的需求改进。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">String response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> prev.</span><span style="color:#B392F0;">getResponseDataAsString</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#6A737D;">//获取接口响应信息</span></span>
<span class="line"><span style="color:#E1E4E8;">String code </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> prev.</span><span style="color:#B392F0;">getResponseCode</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#6A737D;">//获取接口响应状态码</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (code.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;200&quot;</span><span style="color:#E1E4E8;">)){</span><span style="color:#6A737D;">//根据返回状态码判断</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Respnse is &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//打印正确的返回信息，建议调试使用避免无谓的性能消耗</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Error Response is&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">response);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//打印错误的返回信息</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">String response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> prev.</span><span style="color:#6F42C1;">getResponseDataAsString</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6A737D;">//获取接口响应信息</span></span>
<span class="line"><span style="color:#24292E;">String code </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> prev.</span><span style="color:#6F42C1;">getResponseCode</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6A737D;">//获取接口响应状态码</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (code.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;200&quot;</span><span style="color:#24292E;">)){</span><span style="color:#6A737D;">//根据返回状态码判断</span></span>
<span class="line"><span style="color:#24292E;">	log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Respnse is &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//打印正确的返回信息，建议调试使用避免无谓的性能消耗</span></span>
<span class="line"><span style="color:#24292E;">}</span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	log.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Error Response is&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">response);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//打印错误的返回信息</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span></code></pre></div><p>这样就会自动在 jmeter.log 中打印出具体的报错信息，如图 5 所示：</p>`,4),h=s("p",null,"图 5：报错信息",-1),g=s("p",null,"客户端的日志只是我们需要关注的点之一，排查错误的根因还需要结合服务端的报错日志，一般来说服务端的报错日志都有相关的平台记录和查询，比较原始的方式也可以根据服务器的路径找相关日志。",-1),u=s("p",null,[a("我们再来看第二个问题："),s("strong",null,"看不到综合场景下的每个接口的实时处理能力"),a("。")],-1),f=s("p",null,"我个人认为原生的实时查看结果是有些鸡肋的，如果想实时且直观地看到每个接口的处理能力，我比较推荐 JMeter+InfluxDB+Grafana 的方式，基本流程如下图所示：",-1),m=p(`<p>图 6：JMeter+InfluxDB+Grafana</p><p>JMeter 的二次开发可以满足很多定制化的需求，但也比较考验开发的能力（关于二次开发，我会在《04 | JMeter 二次开发其实并不难 》中介绍）。如果不想进行二次开发，JMeter+InfluxDB+Grafana 也是一种比较好的实现方式了。</p><p>下面，我会对 InfluxDB 和 Grafana 做一个简单的介绍，包括特点、安装等。</p><h3 id="influxdb" tabindex="-1">InfluxDB <a class="header-anchor" href="#influxdb" aria-label="Permalink to &quot;InfluxDB&quot;">​</a></h3><p>InfluxDB 是 Go 语言编写的时间序列数据库，用于处理海量写入与负载查询。涉及大量时间戳数据的任何用例（包括 DevOps 监控、应用程序指标等）。我认为 InfluxDB 最大的特点在于可以按照时间序列面对海量数据时候的高性能读写能力，非常适合在性能测试场景下用作数据存储。</p><h4 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h4><p>首先带你来看下 InfluxDB 具体的安装步骤（基于 CentOS 7.0），直接输入以下命令行即可：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#wget https</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//dl.influxdata.com/influxdb/releases/influxdb-1.1.0.x86_64.rpm</span></span>
<span class="line"><span style="color:#E1E4E8;">#rpm </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">ivh Influxdb</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1.1</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">0</span><span style="color:#E1E4E8;">.x86_64.rpm</span></span>
<span class="line"><span style="color:#E1E4E8;">#systemctl enable Influxdb</span></span>
<span class="line"><span style="color:#E1E4E8;">#systemctl start Influxdb</span></span>
<span class="line"><span style="color:#E1E4E8;">#systemctl status Influxdb  （查看 Influxdb 状态）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#wget https</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//dl.influxdata.com/influxdb/releases/influxdb-1.1.0.x86_64.rpm</span></span>
<span class="line"><span style="color:#24292E;">#rpm </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">ivh Influxdb</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">0</span><span style="color:#24292E;">.x86_64.rpm</span></span>
<span class="line"><span style="color:#24292E;">#systemctl enable Influxdb</span></span>
<span class="line"><span style="color:#24292E;">#systemctl start Influxdb</span></span>
<span class="line"><span style="color:#24292E;">#systemctl status Influxdb  （查看 Influxdb 状态）</span></span></code></pre></div><h4 id="基本操作" tabindex="-1">基本操作 <a class="header-anchor" href="#基本操作" aria-label="Permalink to &quot;基本操作&quot;">​</a></h4><p>当你已经安装完成之后，我带你了解下如何操作 InfluxDB：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#influx </span></span>
<span class="line"><span style="color:#E1E4E8;">linux 命令行模式下进入数据库</span></span>
<span class="line"><span style="color:#E1E4E8;">#show databases</span></span>
<span class="line"><span style="color:#E1E4E8;">查看库</span></span>
<span class="line"><span style="color:#E1E4E8;">create database jmeter；</span></span>
<span class="line"><span style="color:#E1E4E8;">建库</span></span>
<span class="line"><span style="color:#E1E4E8;">use jmeter</span></span>
<span class="line"><span style="color:#E1E4E8;">使用该库</span></span>
<span class="line"><span style="color:#E1E4E8;">show measurements;</span></span>
<span class="line"><span style="color:#E1E4E8;">查看库下面的表</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#influx </span></span>
<span class="line"><span style="color:#24292E;">linux 命令行模式下进入数据库</span></span>
<span class="line"><span style="color:#24292E;">#show databases</span></span>
<span class="line"><span style="color:#24292E;">查看库</span></span>
<span class="line"><span style="color:#24292E;">create database jmeter；</span></span>
<span class="line"><span style="color:#24292E;">建库</span></span>
<span class="line"><span style="color:#24292E;">use jmeter</span></span>
<span class="line"><span style="color:#24292E;">使用该库</span></span>
<span class="line"><span style="color:#24292E;">show measurements;</span></span>
<span class="line"><span style="color:#24292E;">查看库下面的表</span></span></code></pre></div><p>InfluxDB 成功安装并且建库之后，我们就可以来配置 JMeter 脚本了。配置过程可以分为以下 3 步。</p><p>（1）添加核心插件，在 listener 组件中选择 Backend Listener（如下图所示）。</p>`,13),A=s("p",null,"图 7：添加 Backkend Listenner",-1),D=s("p",null,"（2）Backend Listener implementation 中选择第二项（如下图所示）。",-1),b=s("p",null,"图 8：Backend Listener implementation",-1),x=s("p",null,[a('（3）配置 InfluxDB URL，示例"'),s("a",{href:"http://127.0.0.1:8086/write?db=jmeter",target:"_blank",rel:"noreferrer"},"http://127.0.0.1:8086/write?db=jmeter"),a('"；IP 为实际 InfluxDB 地址的 IP，DB 的值是 InfluxDB 中创建的库名字（如下图所示）。')],-1),q=p(`<p>图 9：配置连接 influxdb 库的具体信息</p><p>配置完后运行 JMeter 脚本，再去 InfluxDB 的 JMeter 数据库中查看是否有数据，有数据则代表如上链路配置没有问题。</p><p>我们再来了解一下 Grafana。</p><h3 id="grafana" tabindex="-1">Grafana <a class="header-anchor" href="#grafana" aria-label="Permalink to &quot;Grafana&quot;">​</a></h3><p><strong>Grafana 是一个跨平台的开源的度量分析和可视化工具</strong>，纯 JavaScript 开发的前端工具，通过访问库（如 InfluxDB），展示自定义报表、显示图表等。大多时候用在时序数据的监控上。Grafana 功能强大、UI 灵活，并且提供了丰富的插件。</p><h4 id="安装步骤" tabindex="-1">安装步骤 <a class="header-anchor" href="#安装步骤" aria-label="Permalink to &quot;安装步骤&quot;">​</a></h4><p>在 linux 命令行下直接输入以下内容即可：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#wget https</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//dl.grafana.com/oss/release/grafana-6.4.4-1.x86_64.rpm</span></span>
<span class="line"><span style="color:#E1E4E8;">#下载 granafa</span></span>
<span class="line"><span style="color:#E1E4E8;">#yum install  Grafana</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">6.4</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">4</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">1.x86_64.rpm</span></span>
<span class="line"><span style="color:#E1E4E8;">#安装，遇到需要输入的直接 y 就 ok；</span></span>
<span class="line"><span style="color:#E1E4E8;">#systemctl start Grafana</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">server</span></span>
<span class="line"><span style="color:#E1E4E8;">#systemctl enable Grafana</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">server</span></span>
<span class="line"><span style="color:#E1E4E8;">#启动 Grafana</span></span>
<span class="line"><span style="color:#E1E4E8;">#</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">etc</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Grafana</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Grafana.ini</span></span>
<span class="line"><span style="color:#E1E4E8;">配置文件路径，一般保持默认配置即可。</span></span>
<span class="line"><span style="color:#E1E4E8;">#systemctl  status   firewalld.service</span></span>
<span class="line"><span style="color:#E1E4E8;">查看防火墙状态，防止出现其他干扰问题，最好关闭</span></span>
<span class="line"><span style="color:#E1E4E8;">登录访问 Grafana 访问：http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.1.1:3000（ip 自行替换，3000 为默认端口）</span></span>
<span class="line"><span style="color:#E1E4E8;">默认账号</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">密码：admin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">admin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#wget https</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//dl.grafana.com/oss/release/grafana-6.4.4-1.x86_64.rpm</span></span>
<span class="line"><span style="color:#24292E;">#下载 granafa</span></span>
<span class="line"><span style="color:#24292E;">#yum install  Grafana</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">6.4</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">4</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">1.x86_64.rpm</span></span>
<span class="line"><span style="color:#24292E;">#安装，遇到需要输入的直接 y 就 ok；</span></span>
<span class="line"><span style="color:#24292E;">#systemctl start Grafana</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">server</span></span>
<span class="line"><span style="color:#24292E;">#systemctl enable Grafana</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">server</span></span>
<span class="line"><span style="color:#24292E;">#启动 Grafana</span></span>
<span class="line"><span style="color:#24292E;">#</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">etc</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Grafana</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Grafana.ini</span></span>
<span class="line"><span style="color:#24292E;">配置文件路径，一般保持默认配置即可。</span></span>
<span class="line"><span style="color:#24292E;">#systemctl  status   firewalld.service</span></span>
<span class="line"><span style="color:#24292E;">查看防火墙状态，防止出现其他干扰问题，最好关闭</span></span>
<span class="line"><span style="color:#24292E;">登录访问 Grafana 访问：http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.1.1:3000（ip 自行替换，3000 为默认端口）</span></span>
<span class="line"><span style="color:#24292E;">默认账号</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">密码：admin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">admin</span></span></code></pre></div><p>输入密码后如果出现了如下界面，说明 Grafana 安装成功了。</p>`,9),C=s("p",null,"图 10：Grafana 界面",-1),F=s("h4",{id:"数据源配置",tabindex:"-1"},[a("数据源配置 "),s("a",{class:"header-anchor",href:"#数据源配置","aria-label":'Permalink to "数据源配置"'},"​")],-1),I=s("p",null,"为什么要配置数据源呢，简单来说就是 Grafana 需要获取数据去展示，数据源的配置就是告诉你去哪里找数据，配置安装的 InfluxDB 地址和端口号，如下图所示：",-1),T=s("p",null,"图 11：配置地址和端口号",-1),B=s("p",null,"然后输入 InfluxDB 中写入的数据库名字，如下图所示：",-1),v=s("p",null,"图 12：数据库名字",-1),k=s("p",null,"输入完成之后可以 Save & Test，如出现以下示意图即配置成功：",-1),M=s("p",null,"图 13：配置成功",-1),G=s("h4",{id:"导入-jmeter-模板",tabindex:"-1"},[a("导入 JMeter 模板 "),s("a",{class:"header-anchor",href:"#导入-jmeter-模板","aria-label":'Permalink to "导入 JMeter 模板"'},"​")],-1),P=s("p",null,[a("为了达到更好的展示效果，Grafana 官网提供了针对性的展示模版。先下载 "),s("a",{href:"HTTPS://Grafana.com/Grafana/dashboards?search=InfluxDB",target:"_blank",rel:"noreferrer"},"JMeter 模板"),a("，然后再导入 Grafana。")],-1),S=s("p",null,"图 14：导入 JMeter 模板",-1),w=s("p",null,"配置完成后，运行 JMeter 脚本。如果在界面右上方下拉选择 5s，则每 5s 更新一次：",-1),J=s("p",null,"图 15：运行 JMeter 脚本",-1),j=s("p",null,"如上图便是完成了实时压测情况下运行结果的实时展示图，你可以以此为基础，进行多接口的数据采集，相应增加脚本里的 Backend Listener 插件，区分不同的 application name 名称，你会看到不同的接口数据都进入 influxdb 数据库中。并且 Grafana 从 Edit 中进入， 你可以根据不同的 application name 修改 SQL 来区分展示。",-1),V=s("p",null,"图 16：编辑 Grafana",-1),R=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),N=s("p",null,"这一讲我们主要介绍了构建和执行性能测试脚本时的一些注意事项，总结了目前业内使用 JMeter 常见的方法。你不仅需要知道这些常见的手段，也需要知道为什么要这么做，这么做有什么好处，同样随着实际采集数据指标的增高，这些做法可能还会存在哪些缺陷或者注意点，如果上述内容你都能考虑清楚了，相信你也就掌握工具了。",-1),H=s("p",null,"以上我讲到的内容，希望你可以动手实践，也许你在实践的过程中会踩一些坑，不过没关系，欢迎来评论区交流，我会和你分享我的经验和见解。",-1),U=s("p",null,"下一讲我带你走进 JMeter 的二次开发，它其实并没有你想象中那么难，到时见！",-1);function L(O,Y,X,$,K,Q){const n=o("Image");return t(),r("div",null,[i,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-p9GABuguAABBUSnBL1I633.png"}),a(),E,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-p-SAVYK0AAGf14hnG0w748.png"}),a(),y,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-p_GATU1yAACmJ7JsOJs941.png"}),a(),_,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-p_yAeoEUAACugfrmrq0387.png"}),a(),d,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qAaAX8ChAADQYOI-pf0391.png"}),a(),h,g,u,f,l(n,{alt:"Lark20210113-183606.png",src:"https://s0.lgstatic.com/i/image/M00/8D/73/CgqCHl_-zTuAMf2DAABpdYPtYUw826.png"}),a(),m,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qB6AfHs5AAC0sfc1PXk340.png"}),a(),A,D,l(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qCeAbgnDAABvAV5R0ZE972.png"}),a(),b,x,l(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qC6AJwqYAADAf5IPUoI636.png"}),a(),q,l(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qD2AKS4tAAB2Nrw_SqU315.png"}),a(),C,F,I,l(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qEWADsLAAAA3aGGImVo621.png"}),a(),T,B,l(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image2/M01/05/48/Cip5yF_-qFCABo-uAABwZqAxu-0952.png"}),a(),v,k,l(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image2/M01/05/4A/CgpVE1_-qFeAUOatAAA-H-XTdm0808.png"}),a(),M,G,P,l(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-qGCAG68rAABPyrMBy0M066.png"}),a(),S,w,l(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/8D/62/Ciqc1F_-qGiAX-znAAD8972KlRs589.png"}),a(),J,j,l(n,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/8D/6D/CgqCHl_-qHCABegiAAAtFFIYLCc365.png"}),a(),V,R,N,H,U])}const Z=e(c,[["render",L]]);export{z as __pageData,Z as default};

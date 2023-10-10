import{_ as s,j as o,o as i,g as r,k as t,h as a,Q as n,s as l}from"./chunks/framework.cfb14fe0.js";const ll=JSON.parse('{"title":"第08讲：搭建SkyWalking源码环境，开启征途","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1728) 第08讲：搭建 SkyWalking 源码环境，开启征途.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1728) 第08讲：搭建 SkyWalking 源码环境，开启征途.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1728) 第08讲：搭建 SkyWalking 源码环境，开启征途.md"},g=n(`<h1 id="第08讲-搭建skywalking源码环境-开启征途" tabindex="-1">第08讲：搭建SkyWalking源码环境，开启征途 <a class="header-anchor" href="#第08讲-搭建skywalking源码环境-开启征途" aria-label="Permalink to &quot;第08讲：搭建SkyWalking源码环境，开启征途&quot;">​</a></h1><p>在第一课时中，我们已经成功安装并运行了 SkyWalking 环境，本课时将带你完成 SkyWalking 源码环境的搭建 ，并在 IDEA 中尝试调试 SkyWalking Agent。</p><h1 id="搭建-skywalking-源码环境" tabindex="-1">搭建 SkyWalking 源码环境 <a class="header-anchor" href="#搭建-skywalking-源码环境" aria-label="Permalink to &quot;搭建 SkyWalking 源码环境&quot;">​</a></h1><ul><li><strong>下载 SkyWalking 源码</strong></li></ul><p>执行 git clone 命令从 GitHub下载 SkyWalking 源码，如下所示 ：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git clone git@github.com:apache/skywalking.git</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git clone git@github.com:apache/skywalking.git</span></span></code></pre></div><br><ul><li><strong>切换分支</strong></li></ul><p>等待 clone 完成之后，我们通过命令行窗口进入 SkyWalking 源码根目录，执行如下命令：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git checkout -b 6.2.0 v6.2.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git checkout -b 6.2.0 v6.2.0</span></span></code></pre></div><br><p>切换到 v6.2.0 tag 的源码，后续源码分析过程都是基于 6.2.0 版本进行分析的。</p><ul><li><strong>导入 IDEA</strong></li></ul><p>在 IDEA 中点击&quot;Import Project&quot;，选择 SkyWalking 源码目录导入 IDEA 中。SkyWalking 是一个 Maven，在导入过程中会下载相关的依赖 jar 包，过程可能会比较慢，需要你耐心等待。</p><ul><li><strong>更新 submodule</strong></li></ul><p>全部 Maven 依赖下载完成后，在 SkyWalking 源码根目录中执行如下两条命令，更新 submodule：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git submodule init</span></span>
<span class="line"><span style="color:#E1E4E8;">git submodule update</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git submodule init</span></span>
<span class="line"><span style="color:#24292E;">git submodule update</span></span></code></pre></div><br><ul><li><strong>打包</strong></li></ul><p>上述操作执行完毕之后，执行如下命令，开始打包：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">mvn clean package -DskipTests -Dcheckstyle.skip</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">mvn clean package -DskipTests -Dcheckstyle.skip</span></span></code></pre></div><br><ul><li><strong>标记 Generated Source Code 目录</strong></li></ul><p>在打包过程中，会自动生成一些代码，需要我们将其目录设置为 Generated Source Codes，这样 IDEA 才能识别这些代码，生成代码主要来源于以下两种方式：</p><blockquote><ul><li><p>SkyWalking Agent 与后端 OAP 之间通信用了 gRPC，其中的 proto 文件会生成一些 Java 代码。</p></li><li><p>SkyWalking OAP 中定义了 OAL 语言，打包过程中会生成一些 Java 代码。</p></li></ul></blockquote><blockquote><p>具体的标记方式如下下图所示：</p></blockquote><br>`,31),c=n(`<br><p>需要标记的目录有：</p><ul><li><p>apm-protocol/apm-network/target/generated-sources/protobuf 路径下的 grpc-java 目录和 java 目录。</p></li><li><p>oap-server/server-core/target/generated-sources/protobuf 路径下的 grpc-java 目录和 java 目录。</p></li><li><p>oap-server/server-receiver-plugin/receiver-proto/target/generated-sources/protobuf 路径下的 grpc-java 目录和 java 目录。</p></li><li><p>oap-server/exporter/target/generated-sources/protobuf 路径下的 grpc-java 目录和 java 目录。</p></li><li><p>oap-server/server-configuration/grpc-configuration-sync/target/generated-sources/protobuf 路径下的 grpc-java 目录和 java 目录。</p></li><li><p>/Users/xxx/SW/skywalking/oap-server/generated-analysis/target/generated-sources 路径下的 oal 目录。</p></li><li><p><strong>安装 ElasticSearch</strong></p></li></ul><p>前文已经完成了 ElasticSearch 的安装，这里不再展开。</p><ul><li><strong>启动 OAP</strong></li></ul><p>在 IDEA 中，找到 oap-server 模块中 OAPServerStartUp 这个类，右键执行 main() 方法即可。启动过程中无异常日志，并看到如下信息，即表示 OAP 启动成功：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">... ... // 省略其他日志</span></span>
<span class="line"><span style="color:#E1E4E8;">Server started, host 0.0.0.0 listening on 11800</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">... ... // 省略其他日志</span></span>
<span class="line"><span style="color:#24292E;">Server started, host 0.0.0.0 listening on 11800</span></span></code></pre></div><br><ul><li><strong>启动 SkyWalking Rocketbot</strong></li></ul><p>在 IDEA 中，找到 apm-webapp 模块，这是 Spring Boot 的 Web项目，执行 ApplicationStartUp 中的 main() 方法。正常启动之后，访问 localhost:8080，看到 SkyWalking Rocketbot 的 UI 界面即为启动成功。</p><ul><li><strong>启动 demo-webapp 和 demo-provider</strong></li></ul><p>为了验证后端的 OAP 以及前面打包生成的 SkyWalking Agent 是否可用，这里需要启动 demo-webapp 和 demo-provider 两个示例 demo。</p><blockquote><ul><li>首先将整个 skywalking-demo 项目移动到与 SkyWalking 源码项目同一级目录，并导入 IDEA 中，如下图所示：</li></ul></blockquote><br>`,15),k=n('<br><blockquote><ul><li>然后修改 demo-provider 和 demo-webapp 模块的 VM options 参数，将其中 -javaagent: 命令指向的 skywalking-agent.jar 换成 SkyWalking 源码项目中的 skywalking-agent.jar，具体路径如下所示：</li></ul></blockquote><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">SkyWalking源码目录/skywalking-agent/skywalking-agent.jar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">SkyWalking源码目录/skywalking-agent/skywalking-agent.jar</span></span></code></pre></div><br><blockquote><ul><li><p>其他配置无需修改，依次启动 Zookeeper、demo-provider、demo-webapp。启动成功后访问 <a href="http://localhost:8000/hello/xxx" target="_blank" rel="noreferrer">http://localhost:8000/hello/xxx</a>。</p></li><li><p>待请求正常响应后，在上一步启动的 SkyWalking Rocketbot 中可以查询到相应的 Trace 信息以及两个项目相关的 Metrics 监控信息，即表示整个源码环境搭建完成。</p></li></ul></blockquote><br><ul><li><strong>Debug SkyWalking 源码</strong></li></ul><p>按照上述方式成功搭建 SkyWalking 源码环境之后，我们尝试 Debug SkyWalking 源码。</p><blockquote><ul><li>首先在 SkyWalking 源码项目中找到 SkyWalkingAgent.java 这个类（位于 apm-sniffer 模块下的 apm-agent 子模块中），该类是 SkyWalking Agent 的入口，提供了 premain() 方法实现，我们可以在其中打一个断点，然后以 Debug 模式重启 demo-webapp，此时 demo-webapp 会停在该断点处，如下图所示：</li></ul></blockquote><br>',11),u=l("h1",{id:"skywalking源码结构",tabindex:"-1"},[a("SkyWalking源码结构 "),l("a",{class:"header-anchor",href:"#skywalking源码结构","aria-label":'Permalink to "SkyWalking源码结构"'},"​")],-1),d=l("p",null,"完成 SkyWalking 源码环境的搭建以及 Debug 的测试之后，我们回到 SkyWalking 源码项目，简单介绍一下 SkyWalking 源码中各模块的基本功能。",-1),_=l("br",null,null,-1),h=l("p",null,"SkyWalking 源码的整体结构如下图所示：",-1),b=l("br",null,null,-1),y=l("br",null,null,-1),A=l("ul",null,[l("li",null,[l("strong",null,"apm-application-toolkit 模块："),a(" SkyWalking 提供给用户调用的工具箱。该模块提供了对 log4j、log4j2、logback 等常见日志框架的接入接口，提供了 @Trace 注解等。apm-application-toolkit模块类似于暴露 API 定义，对应的处理逻辑在 apm-sniffer/apm-toolkit-activation 模块中实现，如下图所示：")])],-1),m=l("br",null,null,-1),S=l("br",null,null,-1),v=l("ul",null,[l("li",null,"**apm-commons 模块：**SkyWalking 的公共组件和工具类。如下图所示，其中包含两个子模块，apm-datacarrier 模块提供了一个生产者-消费者模式的缓存组件（DataCarrier），无论是在 Agent 端还是 OAP 端都依赖该组件。apm-util 模块则提供了一些常用的工具类，例如，字符串处理工具类（StringUtil）、占位符处理的工具类（PropertyPlaceholderHelper、PlaceholderConfigurerSupport）等等。")],-1),W=l("br",null,null,-1),E=l("br",null,null,-1),D=l("ul",null,[l("li",null,[l("p",null,[l("strong",null,"apache-skywalking-apm 目录"),a(" **：**SkyWalking 打包后使用的命令文件都在此目录中，例如，前文启动 OAP 和 SkyWalking Rocketbot 使用的 startup.sh 文件。")])]),l("li",null,[l("p",null,"**apm-protocol 模块：**该模块中只有一个 apm-network 模块，我们需要关注的是其中定义的 .proto 文件，定义 Agent 与后端 OAP 使用 gRPC 交互时的协议。")]),l("li",null,[l("p",null,"**apm-sniffer 模块：**apm-protocol 模块中有 4 个子模块，如下图所示：")])],-1),C=l("br",null,null,-1),q=l("br",null,null,-1),P=l("blockquote",null,[l("ul",null,[l("li",null,[l("p",null,"**apm-agent 模块：**其中包含了刚才使用的 SkyWalkingAgent 这个类，是整个 Agent 的入口。")]),l("li",null,[l("p",null,[l("strong",null,"apm-agent-core 模块"),a("：SkyWalking Agent 的核心实现都在该模块中，也是本课程第二部分重点分析的模块之一。")])]),l("li",null,[l("p",null,[l("strong",null,"apm-sdk-plugin 模块"),a("：SkyWalking Agent 使用了微内核+插件的架构，该模块下包含了 SkyWalking Agent 的全部插件，如下图所示：")])])])],-1),T=l("br",null,null,-1),j=l("br",null,null,-1),f=l("blockquote",null,[l("ul",null,[l("li",null,"**apm-toolkit-activation 模块：**apm-application-toolkit 模块的具体实现，不再赘述。")])],-1),w=l("ul",null,[l("li",null,[l("p",null,"**apm-webapp 模块：**SkyWalking Rocketbot 对应的后端。")]),l("li",null,[l("p",null,[l("strong",null,"oap-server 模块"),a("：SkyWalking OAP 的全部实现都在 oap-server 模块，其中包含了多个子模块，如下图所示：")])])],-1),x=l("br",null,null,-1),O=n("<br><blockquote><ul><li><p><strong>exporter 模块</strong>：负责导出数据。</p></li><li><p><strong>generate-tool、</strong> <strong>generate-tool-grammar、generated-analysis 三个模块</strong>：与 SkyWalking 自定义的 OAL 语言有关，后面的课时将对 OAL 进行详细介绍。</p></li><li><p><strong>server-alarm-plugin 模块</strong>：负责实现 SkyWalking 的告警功能。</p></li><li><p><strong>server-cluster-pulgin 模块</strong>：负责 OAP 的集群信息管理，其中提供了接入多种第三方组件的相关插件，如下图所示：</p></li></ul></blockquote><br>",3),I=l("br",null,null,-1),B=l("blockquote",null,[l("ul",null,[l("li",null,[l("strong",null,"server-configuration 模块"),a("：负责管理 OAP 的配置信息，也提供了接入多种配置管理组件的相关插件，如下图所示：")])])],-1),G=l("br",null,null,-1),M=n("<br><blockquote><ul><li><p><strong>server-core模块</strong>：SkyWalking OAP 的核心实现都在该模块中。</p></li><li><p><strong>server-library 模块</strong>：OAP 以及 OAP 各个插件依赖的公共模块，其中提供了双队列 Buffer、请求远端的 Client 等工具类，这些模块都是对立于 SkyWalking OAP 体系之外的类库，我们可以直接拿走使用。</p></li><li><p><strong>server-query-plugin 模块</strong>：SkyWalking Rocketbot 发送的请求首先由该模块接收处理，目前该模块只支持 GraphQL 查询。</p></li><li><p><strong>server-receiver-plugin 模块</strong>：SkyWalking Agent 发送来的 Metrics、Trace 以及 Register 等写入请求都是首先由该模块接收处理的，不仅如此，该模块还提供了多种接收其他格式写入请求的插件，如下图所示：</p></li></ul></blockquote><br>",3),R=l("br",null,null,-1),V=l("blockquote",null,[l("ul",null,[l("li",null,[l("p",null,[l("strong",null,"server-starter 模块"),a("：OAP 服务启动的入口。")])]),l("li",null,[l("p",null,"**server-storage-plugin 模块：**OAP 服务底层可以使用多种存储来保存 Metrics 数据以及Trace 数据，该模块中包含了接入相关存储的插件，如下图所示：")])])],-1),N=l("br",null,null,-1),U=l("br",null,null,-1),F=l("ul",null,[l("li",null,[l("p",null,[l("strong",null,"skywalking-agent 目录"),a("：SkyWalking Agent 编译后生成的 jar 包都会放到该目录中。")])]),l("li",null,[l("p",null,[l("strong",null,"skywalking-ui 目录"),a("：SkyWalking Rocketbot 的前端。")])])],-1),Q=l("h1",{id:"总结",tabindex:"-1"},[a("总结 "),l("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),H=l("p",null,"本课时重点介绍了 SkyWalking 源码环境的搭建流程，并在搭建完成之后，启动 skywalking-demo 项目进行了简单的测试。之后深入介绍了 SkyWalking 源码中各个模块的核心功能，了解各模块的主要功能可以让你对后续的源码分析更加游刃有余。",-1);function J(X,L,Z,Y,$,K){const e=o("Image");return i(),r("div",null,[g,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/BA/Ciqah16DGjyAQXgGAAeBF-jQ5aw073.png"}),a(),c,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/D0/Cgq2xl6DGj2AHgB8AAAjQ0VaZ8E159.png"}),a(),k,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/BA/Ciqah16DGj2AHzBqAAGUjaX3Mcg617.png"}),a(),u,d,_,h,b,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/D0/Cgq2xl6DGj2AZaUkAABKcoi4_5c009.png"}),a(),y,A,m,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/BA/Ciqah16DGj2AYS6GAABWyHp4-sA345.png"}),a(),S,v,W,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/D0/Cgq2xl6DGj2AKJXJAAALnVoaWe4943.png"}),a(),E,D,C,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/BA/Ciqah16DGj2AeTteAAATxoHTmQg700.png"}),a(),q,P,T,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/D0/Cgq2xl6DGj2AZUcYAABRh7Zo8YU356.png"}),a(),j,f,w,x,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/BA/Ciqah16DGj2AXOXhAAAsDflYjvk001.png"}),a(),O,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/D0/Cgq2xl6DGj2Ad7RDAAA3iUNIOfA774.png"}),a(),I,B,G,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/BA/Ciqah16DGj2AF3cKAAAzFmh2Hhw354.png"}),a(),M,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/D0/Cgq2xl6DGj6Ab69uAAB3rQXuurE063.png"}),a(),R,V,N,t(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/BA/Ciqah16DGj6ADeNJAABfQxiOcoo599.png"}),a(),U,F,Q,H])}const al=s(p,[["render",J]]);export{ll as __pageData,al as default};

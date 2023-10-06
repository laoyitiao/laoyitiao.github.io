import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.b3d8e22e.js";const J=JSON.parse('{"title":"开发流程 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6800) 18  系统的实践设计（下）：完成一个通用投票系统.md","filePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6800) 18  系统的实践设计（下）：完成一个通用投票系统.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/Node.js 应用开发实战_文档/(6800) 18  系统的实践设计（下）：完成一个通用投票系统.md"},i=p('<p>上一讲，我们完成了准备工作，包括架构设计、数据库设计、接口设计以及接口时序图绘制，这一讲就着重实现活动相关接口、票相关接口和抢票接口，为的是让你熟悉使用 Node.js 来开发后台服务。</p><p>这三个部分的实现都有一定的代表性，活动相关接口因为访问量较大，要完全走缓存的设计方式；与个人相关的票接口，访问量较少并且缓存意义不大，所以走数据库的设计方式；而抢票是我们核心接口，也是最大的并发接口，则涉及应用 Redis 的链表技术点。</p><p>明确上述需要开发的接口，以及要掌握的技术点之后，接下来我们就正式进入今天的内容，看一下你在开发时需要注意的细节。</p><h3 id="开发流程" tabindex="-1">开发流程 <a class="header-anchor" href="#开发流程" aria-label="Permalink to &quot;开发流程&quot;">​</a></h3><p>在开发之前，我们做这样 4 个准备。</p><ul><li><p>安装本地的 Redis 服务，如果你是 Mac 可以直接使用 brew install redis，如果是 Linux 或者 Windows 可以前往<a href="https://redis.io/?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">redis 官网</a>下载配置，完成后需要修改项目代码 src/cache.js 中的 redis 配置。</p></li><li><p>重新配置 pm2.config.js 文件，在 env_development 中增加以下配置，主要是为了在开发阶段，自动重启不需要监听下面目录的变化。</p></li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ignore_watch</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;log&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;node_modules&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;bin&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;config&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ignore_watch</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;log&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;node_modules&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;bin&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;config&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div><ul><li>创建好 PM2 的系统日志路径（可以自行在 pm2.config.js 中修改你自己希望的地址）。</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">mkdir </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">p </span><span style="color:#F97583;">~/</span><span style="color:#E1E4E8;">data</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">nodejs</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">column</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">io</span><span style="color:#F97583;">/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">mkdir </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">p </span><span style="color:#D73A49;">~/</span><span style="color:#24292E;">data</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">nodejs</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">column</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">io</span><span style="color:#D73A49;">/</span></span></code></pre></div><ul><li>由于 Mongodb 使用的是云服务，所以也需要你自行去申请一个<a href="https://cloud.mongodb.com/?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Mongodb 云服务</a>。当然，你也可以自行在<a href="https://www.mongodb.com/try/download/community?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">官网下载</a>本地安装一个，安装完成后，需要修改 src/lib/baseMongodb.js 中第一行的配置，并且要在 Mongodb 中创建 nodejs_cloumn 数据库。</li></ul><p>完成上述 4 点准备之后，要在项目根目录使用下面的命令启动服务：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pm2 start pm2.config.js </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">env development</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pm2 start pm2.config.js </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">env development</span></span></code></pre></div><p>启动成功后，访问以下路径来检测 Mongodb 和 Redis 配置是否正确。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/tools/test?token=piu12naern9023izcx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/tools/test?token=piu12naern9023izcx</span></span></code></pre></div><p>如果返回图 1 的信息则表示正常，如果出现异常，就要检查一下具体的配置是不是正确，或者 Redis 以及 Mongodb 是否正常启动。</p>',15),E=p('<p>图 1 正常检测结果</p><p>前期检查正常后，接下来我们就来实现 17讲中的那 5 个接口。为了方便你开发调试，你可以直接调用以下链接，初始化我们的数据库：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/tools/init?token=piu12naern9023izcx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/tools/init?token=piu12naern9023izcx</span></span></code></pre></div><p>成功会提示正常的结果，如果失败就要前往项目根目录的 log/_tools_init.log 中查看具体的报错信息。</p><h3 id="活动相关接口" tabindex="-1">活动相关接口 <a class="header-anchor" href="#活动相关接口" aria-label="Permalink to &quot;活动相关接口&quot;">​</a></h3><p>活动相关的接口包含活动列表接口、活动详情接口，下面我们先来看下活动列表接口的实现。</p><h4 id="活动列表接口" tabindex="-1">活动列表接口 <a class="header-anchor" href="#活动列表接口" aria-label="Permalink to &quot;活动列表接口&quot;">​</a></h4><p>在 src/controller 路径下创建 act.js 作为活动的类，其中的 list 方法为活动列表，我们看一下该方法的代码，如图 2 所示。</p>',8),y=s("p",null,"图 2 活动列表接口",-1),d=s("p",null,"在图 2 中的红色框部分，就是应用框架的 loadService 加载 actService 这个类，然后调用该类的 getList 获取数据，那么我们继续来看 actService.getList 的逻辑，如图 3 所示。",-1),h=s("p",null,"图 3 actService getList 逻辑",-1),g=s("p",null,"在图 3 ，我们首先在第一个红色框中获取缓存数据，如果没有获取到则从数据库中获取，也就是第二个红框逻辑。",-1),_=s("p",null,[a("为了性能考虑以及实时性考虑，我们只能将活动列表的缓存设置为 120 秒，但是我们可以定时地每 60 秒去生成这个缓存。为了定时缓存，我们特意在 actService 中实现了一个 cacheList 方法，你可以前往"),s("a",{href:"https://github.com/love-flutter/nodejs-column?fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"GitHub"),a("查看详细实现。")],-1),u=s("p",null,"这里你可以思考一下：为什么一个设置为 120 秒和另外一个为 60 秒？这在课程的某一讲提及过，你知道是哪一讲以及原因吗？欢迎在评论区分享你的答案。",-1),A=s("h4",{id:"活动详情",tabindex:"-1"},[a("活动详情 "),s("a",{class:"header-anchor",href:"#活动详情","aria-label":'Permalink to "活动详情"'},"​")],-1),v=s("p",null,"活动详情和活动列表的实现基本是一样的，核心都是从缓存中获取，代码如图 4 所示。",-1),b=p(`<p>图 4 活动详情接口</p><p>在完成两个接口开发以后，你可以直接访问下面两个地址，就可以看到正常的响应结果了。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/act/list?page=0&amp;token=piu12naern9023izcx</span></span>
<span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/act/detail?id=607bc870647e4cc06f7f3df7&amp;token=piu12naern9023izcx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/act/list?page=0&amp;token=piu12naern9023izcx</span></span>
<span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/act/detail?id=607bc870647e4cc06f7f3df7&amp;token=piu12naern9023izcx</span></span></code></pre></div><p>如果这个过程中出现失败异常情况，你要分别打开 PM2 的日志路径文件，项目根目录下的 log/_act_list.log 和 log/_act_detail.log 日志信息查看具体的错误原因。</p><h3 id="票相关接口" tabindex="-1">票相关接口 <a class="header-anchor" href="#票相关接口" aria-label="Permalink to &quot;票相关接口&quot;">​</a></h3><p>由于个人的票券码列表访问比较少，并且每个人访问的列表内容不一样，因此缓存设置的意义不太大，直接从数据库读取就行，没有必要单独为这部分进行缓存了。在项目 src/controller 中创建 ticket.js 用来实现 ticket 类。</p><h4 id="个人票券码列表" tabindex="-1">个人票券码列表 <a class="header-anchor" href="#个人票券码列表" aria-label="Permalink to &quot;个人票券码列表&quot;">​</a></h4><p>在 ticket.js 中实现 list 方法，代码实现如图 5 所示。</p>`,8),k=s("p",null,"图 5 个人票券码列表",-1),m=s("p",null,"从图 5 中可以看到，其实现逻辑和上面的活动列表实现非常相似，都是调用 Service 方法逻辑，只是区别在 ticketService 中的实现不同，代码如图 6 所示。",-1),D=p(`<p>图 6 ticketService.getUserTickList 实现</p><p>在图 6 中两个红色框中都是直接 load 了数据库模块来获取数据，没有从缓存中获取。</p><h4 id="票券码详情" tabindex="-1">票券码详情 <a class="header-anchor" href="#票券码详情" aria-label="Permalink to &quot;票券码详情&quot;">​</a></h4><p>票券码详情也是一样，这部分我们也是使用的数据库读取的方式来实现，在我们项目源码中已经实现。但是这里我希望你进行改进，在原有的基础上改造为从缓存中读取，这部分留作你自己实现。</p><p>在完成以上两个接口以后，我们可以访问以下两个请求来查看接口是否正常。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/list?token=piu12naern9023izcx</span></span>
<span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/detail?token=piu12naern9023izcx&amp;code=OPIADCV23</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/list?token=piu12naern9023izcx</span></span>
<span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/detail?token=piu12naern9023izcx&amp;code=OPIADCV23</span></span></code></pre></div><p>由于我们还没有券码，因此返回都是空的数据，接下来我们来实现抢票，抢票完成后再回过来看两个接口的响应数据。</p><h3 id="抢票接口" tabindex="-1">抢票接口 <a class="header-anchor" href="#抢票接口" aria-label="Permalink to &quot;抢票接口&quot;">​</a></h3><p>这部分是核心的实现，我们需要使用到 Redis 的原子操作 lpush lrem lpop 三个指令。</p><ul><li><p><strong>lpush</strong>：向一个双向链表插入一个数据元素，在我们应用中插入的是一个券码；</p></li><li><p><strong>lrem</strong>：在链表中删除指定的元素，在我们应用中需要在插入之前先进行删除，避免重复；</p></li><li><p><strong>lpop</strong>：弹出一个数据元素，在我们应用中从链表中获取一个券码。</p></li></ul><p><strong>这三个命令就帮我们实现了一个简单的抢票逻辑：</strong> 首先在初始化时，将我们的券码插入 Redis 中，这部分逻辑在 codeService 中的 import 方法中实现，具体代码如图 7 所示。</p>`,11),F=s("p",null,"图 7 import 券码逻辑",-1),C=s("p",null,"在图 7 中的红色框部分，就是调用 codeModel 中的 lpush 将券码插入 Redis 中，而这部分逻辑就是在调用 /tools/init 时完成。在 lpush 中有一个比较取巧的技巧，如图 8 所示。",-1),f=s("p",null,"图 8 lpush 逻辑实现",-1),B=s("p",null,[a("在图 8 的红色框内，我们需要先删除该项，删除完成后再插入，"),s("strong",null,"为什么这么复杂呢？"),a(" 主要是为了避免插入重复项，如果删除成功代表原来就有该数据，因此不算新插入，如果删除为 0 则表示新插入，这样就可以方便后续的逻辑，比如需要落地数据库，那么重复的就没有必要再次落数据库了。")],-1),j=s("p",null,"数据初始化完以后，我们再来看下抢票逻辑是如何实现的，该逻辑实现在 ticket controller 中的 get 方法。",-1),T=s("p",null,"图 9 抢票接口校验实现",-1),q=s("p",null,"图 9 主要是我们的抢票的资格校验，判断该用户是否参与过该项目，或者提交的一个活动是否是非法的（其次还可以根据需求校验该活动是否在生效期内）。校验通过后，就调用 codeService.getOneCode 方法，来抢一张票，如图 10 所示。",-1),S=s("p",null,"图 10 抢票逻辑",-1),P=s("p",null,"图 10 中的红色框部分就是调用 lpop 来实现抢票。抢票完成后，我们需要设置缓存，以方便后续用户再次进入活动时，主动提示用户已经参与过该活动。抢票实现完成后，我们再回过来看抢票后的逻辑。",-1),w=p('<p>图 11 抢票数据落地</p><p>在上一讲的时序图中我们说明过，只要抢票成功，就代表成功了，后续的一些逻辑数据都使用异步的方式去存储，存储失败则需要记录日志，并定时回写失败数据，比如图 11 中的 historyService.insertHistory 是一个异步执行逻辑，不会阻塞用户成功响应。</p><p>以上就完成了抢票部分逻辑，开发完成以后，你只需要调用以下接口就可以测试。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/get?token=piu12naern9023izcx&amp;actId=607bc99b7e96f0c1e8057f3c</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/get?token=piu12naern9023izcx&amp;actId=607bc99b7e96f0c1e8057f3c</span></span></code></pre></div><p>响应如图 12 所示。</p>',5),x=s("p",null,"图 12 抢票结果信息",-1),M=s("p",null,"当你再次调用上面的接口时，就会提醒你已经参与过该活动了。",-1),H=s("h3",{id:"clinic-检测",tabindex:"-1"},[a("clinic 检测 "),s("a",{class:"header-anchor",href:"#clinic-检测","aria-label":'Permalink to "clinic 检测"'},"​")],-1),I=s("p",null,"在完成了所有接口以后，我们就需要使用 clinic 工具来检测是否存在一些性能问题，我们在 bin/clinic_test.js 中增加需要测试的接口列表，这部分也需要大家自行修改，因为其中的参数可能会不同。",-1),V=s("p",null,"比如我们修改以下配置。",-1),R=p(`<p>图 13 clinic 测试配置</p><p>配置修改完成以后，我们就回到项目根目录，首先需要将 PM2 中的该服务进程关闭，使用下面命令即可关闭（如果你修改过 PM2 中的配置，则需要根据配置中的进程名来进行关闭）。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pm2 delete nodejs</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">main</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">server</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">3000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pm2 delete nodejs</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">main</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">server</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">3000</span></span></code></pre></div><p>接下来我们运行下面命令启动测试。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm run clinic</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">test</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm run clinic</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">test</span></span></code></pre></div><p>接下来你会看到如下的结果。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">启动服务开始测试...</span></span>
<span class="line"><span style="color:#E1E4E8;">开始检测 act</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">list 的接口性能问题</span></span>
<span class="line"><span style="color:#E1E4E8;">该接口无任何异常问题</span></span>
<span class="line"><span style="color:#E1E4E8;">开始检测 act</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">detail 的接口性能问题</span></span>
<span class="line"><span style="color:#E1E4E8;">该接口无任何异常问题</span></span>
<span class="line"><span style="color:#E1E4E8;">开始检测 ticket</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">list 的接口性能问题</span></span>
<span class="line"><span style="color:#E1E4E8;">该接口存在异常</span></span>
<span class="line"><span style="color:#E1E4E8;">具体详情请查看项目根目录下的</span></span>
<span class="line"><span style="color:#E1E4E8;">.</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">.clinic</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">56983.clinic</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">doctor.html</span></span>
<span class="line"><span style="color:#E1E4E8;">开始检测 ticket</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">detail 的接口性能问题</span></span>
<span class="line"><span style="color:#E1E4E8;">该接口存在异常</span></span>
<span class="line"><span style="color:#E1E4E8;">具体详情请查看项目根目录下的</span></span>
<span class="line"><span style="color:#E1E4E8;">.</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">.clinic</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">57041.clinic</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">doctor.html</span></span>
<span class="line"><span style="color:#E1E4E8;">开始检测 ticket</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">get 的接口性能问题</span></span>
<span class="line"><span style="color:#E1E4E8;">该接口无任何异常问题</span></span>
<span class="line"><span style="color:#E1E4E8;">你需要处理以下问题汇总，具体请查看下面详细信息</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">启动服务开始测试...</span></span>
<span class="line"><span style="color:#24292E;">开始检测 act</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">list 的接口性能问题</span></span>
<span class="line"><span style="color:#24292E;">该接口无任何异常问题</span></span>
<span class="line"><span style="color:#24292E;">开始检测 act</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">detail 的接口性能问题</span></span>
<span class="line"><span style="color:#24292E;">该接口无任何异常问题</span></span>
<span class="line"><span style="color:#24292E;">开始检测 ticket</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">list 的接口性能问题</span></span>
<span class="line"><span style="color:#24292E;">该接口存在异常</span></span>
<span class="line"><span style="color:#24292E;">具体详情请查看项目根目录下的</span></span>
<span class="line"><span style="color:#24292E;">.</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">.clinic</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">56983.clinic</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">doctor.html</span></span>
<span class="line"><span style="color:#24292E;">开始检测 ticket</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">detail 的接口性能问题</span></span>
<span class="line"><span style="color:#24292E;">该接口存在异常</span></span>
<span class="line"><span style="color:#24292E;">具体详情请查看项目根目录下的</span></span>
<span class="line"><span style="color:#24292E;">.</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">.clinic</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">57041.clinic</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">doctor.html</span></span>
<span class="line"><span style="color:#24292E;">开始检测 ticket</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">get 的接口性能问题</span></span>
<span class="line"><span style="color:#24292E;">该接口无任何异常问题</span></span>
<span class="line"><span style="color:#24292E;">你需要处理以下问题汇总，具体请查看下面详细信息</span></span></code></pre></div><p>上面结论很清晰告诉了我们 ticket/list 和 ticket/detail 存在性能问题，我们打开测试结果的 html 文件以后发现主要是 I/O 问题，然后再思考我们没有使用任何的缓存，并且 Mongodb 使用的还是一个远程云服务，因此这部分是的确存在问题的。</p><p>其他的几个接口都没有任何问题，因此对于我们来说是否就完事了呢？</p><p>虽然 ticket/get 没有问题，但是是基于已经完成抢票的逻辑，只是一个简单的判断，并不能说明可以支持批量用户同时来抢票，那么接下来我们就使用压测的方法，来查看该接口是否能满足高并发的情况。</p><h3 id="抢票接口压测" tabindex="-1">抢票接口压测 <a class="header-anchor" href="#抢票接口压测" aria-label="Permalink to &quot;抢票接口压测&quot;">​</a></h3><p>我们需要模拟批量用户，在我们项目中没有用户登录，但是在中间件 checkToken 中做了一个假的用户校验操作，那么我们在该模块中去写一个脚本来随机生成用户 ID（源码中这部分为注释代码，大家尝试时需要主动打开，如图 14 所示）。</p>`,12),N=s("p",null,"我们先请求活动列表，拿到一个可用的活动 ID ，我们获取图 15 中的最后一个活动 ID。",-1),O=p(`<p>图 15 活动列表</p><p>接下来我们多次请求以下链接。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/get?actId=607be8b34bf4efe9f8d04baa</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/get?actId=607be8b34bf4efe9f8d04baa</span></span></code></pre></div><p>你会发现，每次请求都可以获取新的券码，这样我们每次就可以走不同的逻辑了，为了测试性能，我们使用 wrk 来进行验证，使用下面命令来进行压测。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">wrk </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">t2 </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c300 </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">d20s </span><span style="color:#9ECBFF;">&quot;http://127.0.0.1:3000/ticket/get?actId=607be8b34bf4efe9f8d04baa&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">wrk </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">t2 </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c300 </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">d20s </span><span style="color:#032F62;">&quot;http://127.0.0.1:3000/ticket/get?actId=607be8b34bf4efe9f8d04baa&quot;</span></span></code></pre></div><p>压测完成后，你可以看到数据如下</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Running 20s test @ </span><span style="color:#F97583;">http:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/get?actId=607bc99b7e96f0c1e8057f3c</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> threads and </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;"> connections</span></span>
<span class="line"><span style="color:#E1E4E8;">  Thread Stats   Avg      Stdev     Max   </span><span style="color:#F97583;">+/-</span><span style="color:#E1E4E8;"> Stdev</span></span>
<span class="line"><span style="color:#E1E4E8;">    Latency    45.</span><span style="color:#FDAEB7;font-style:italic;">99ms</span><span style="color:#E1E4E8;">   69.</span><span style="color:#FDAEB7;font-style:italic;">01ms</span><span style="color:#E1E4E8;">   1.</span><span style="color:#FDAEB7;font-style:italic;">99s</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">98.47</span><span style="color:#F97583;">%</span></span>
<span class="line"><span style="color:#E1E4E8;">    Req</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Sec     2.</span><span style="color:#FDAEB7;font-style:italic;">82k</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">655.32</span><span style="color:#E1E4E8;">     4.</span><span style="color:#FDAEB7;font-style:italic;">71k</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">78.55</span><span style="color:#F97583;">%</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">106002</span><span style="color:#E1E4E8;"> requests in 20.</span><span style="color:#FDAEB7;font-style:italic;">07s</span><span style="color:#E1E4E8;">, 21.</span><span style="color:#FDAEB7;font-style:italic;">53MB</span><span style="color:#E1E4E8;"> read</span></span>
<span class="line"><span style="color:#E1E4E8;">  Socket errors</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> connect </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, read </span><span style="color:#79B8FF;">132</span><span style="color:#E1E4E8;">, write </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, timeout </span><span style="color:#79B8FF;">283</span></span>
<span class="line"><span style="color:#E1E4E8;">Requests</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">sec</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">5282.13</span></span>
<span class="line"><span style="color:#E1E4E8;">Transfer</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">sec</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">      1.</span><span style="color:#FDAEB7;font-style:italic;">07MB</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Running 20s test @ </span><span style="color:#D73A49;">http:</span><span style="color:#6A737D;">//127.0.0.1:3000/ticket/get?actId=607bc99b7e96f0c1e8057f3c</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> threads and </span><span style="color:#005CC5;">300</span><span style="color:#24292E;"> connections</span></span>
<span class="line"><span style="color:#24292E;">  Thread Stats   Avg      Stdev     Max   </span><span style="color:#D73A49;">+/-</span><span style="color:#24292E;"> Stdev</span></span>
<span class="line"><span style="color:#24292E;">    Latency    45.</span><span style="color:#B31D28;font-style:italic;">99ms</span><span style="color:#24292E;">   69.</span><span style="color:#B31D28;font-style:italic;">01ms</span><span style="color:#24292E;">   1.</span><span style="color:#B31D28;font-style:italic;">99s</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">98.47</span><span style="color:#D73A49;">%</span></span>
<span class="line"><span style="color:#24292E;">    Req</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Sec     2.</span><span style="color:#B31D28;font-style:italic;">82k</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">655.32</span><span style="color:#24292E;">     4.</span><span style="color:#B31D28;font-style:italic;">71k</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">78.55</span><span style="color:#D73A49;">%</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">106002</span><span style="color:#24292E;"> requests in 20.</span><span style="color:#B31D28;font-style:italic;">07s</span><span style="color:#24292E;">, 21.</span><span style="color:#B31D28;font-style:italic;">53MB</span><span style="color:#24292E;"> read</span></span>
<span class="line"><span style="color:#24292E;">  Socket errors</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> connect </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, read </span><span style="color:#005CC5;">132</span><span style="color:#24292E;">, write </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, timeout </span><span style="color:#005CC5;">283</span></span>
<span class="line"><span style="color:#24292E;">Requests</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">sec</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">5282.13</span></span>
<span class="line"><span style="color:#24292E;">Transfer</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">sec</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">      1.</span><span style="color:#B31D28;font-style:italic;">07MB</span></span></code></pre></div><p>这个数据和我们第 12 讲的数据进行对比，QPS 在 5282.13 （我们当前启用 1 个进程），平均耗时 45.99 ms 因此整体上我们的抢票接口性能还是非常好的，这里唯一有问题的可能是我们的 Mongodb ，你测试的时候最好在本地搭建环境，避免这类影响。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本讲核心是实践开发活动相关接口、票相关接口以及主要的抢票接口，并利用我们所学的一些知识 clinic 检测和 wrk 压测工具来分析接口的性能问题。</p><p>总的来说，Node.js 开发效率还是非常高的，整个系统我大概花费了 1 天半的时间完成这部分演示代码，代码还会存在一些缺陷，你可以尝试应用项目，然后共同来解决这个项目中存在的问题。</p><p>实际开发过程中的需求大部分离不开我们通用抢票系统的流程，最核心的是要了解哪些是高并发需要使用缓存处理，哪些是低访问可以直接读取数据库的方式。在实际应用过程中，我们还需要动态的根据现网的访问情况进行扩容，但是每次都需要手动扩容非常的不方便，那有没有弹性的服务机制，在我请求较大时分配更多服务资源，在请求少时减少服务资源呢？那么这就是我们下一讲的内容 serverless 的知识点。</p>`,12);function W(z,G,K,L,Q,X){const n=e("Image");return t(),c("div",null,[i,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/FE/CioPOWCHwuCASYE8AAA3Jdxt9po231.png"}),a(),E,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F5/Cgp9HWCHwuqAOGpKAAFix4u8UOA791.png"}),a(),y,d,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/FE/CioPOWCHwvOAHPXsAAFObmPiKdI776.png"}),a(),h,g,_,u,A,v,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/FE/CioPOWCHwv6AdGZaAADbxFIfj50739.png"}),a(),b,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/FE/CioPOWCHwwqAP5GuAAD3ZbKdwSU388.png"}),a(),k,m,l(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F6/Cgp9HWCHwxKAVi9pAAE57SHwWPE688.png"}),a(),D,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F6/Cgp9HWCHwy6AJs7aAAGuUnYHXbA462.png"}),a(),F,C,l(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F6/Cgp9HWCHwziAJmT9AAFXUG0RFAo437.png"}),a(),f,B,j,l(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F6/Cgp9HWCHw0OAAnrLAAGblxCYBsA727.png"}),a(),T,q,l(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F6/Cgp9HWCHw0qAcn7NAAG9Pxo2yvQ405.png"}),a(),S,P,l(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/FE/CioPOWCHw1KANkPlAAHBsH7y-v8488.png"}),a(),w,l(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/FE/CioPOWCHw1uABdDNAADOAVf-s_g172.png"}),a(),x,M,H,I,V,l(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/FE/CioPOWCHw2aANAAzAAEShovGyQg910.png"}),a(),R,l(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/F6/Cgp9HWCHw3OAbeHJAAEBbgNTKdg378.png"}),N,l(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M00/3B/FE/CioPOWCHw32ADMtjAAGXiGES6HI969.png"}),a(),O])}const $=o(r,[["render",W]]);export{J as __pageData,$ as default};

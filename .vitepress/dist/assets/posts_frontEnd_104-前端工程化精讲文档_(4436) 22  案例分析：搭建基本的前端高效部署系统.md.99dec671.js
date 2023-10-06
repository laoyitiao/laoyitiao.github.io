import{_ as a,j as l,o as p,g as o,k as e,Q as s}from"./chunks/framework.b3d8e22e.js";const b=JSON.parse('{"title":"流程梳理 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/104-前端工程化精讲文档/(4436) 22  案例分析：搭建基本的前端高效部署系统.md","filePath":"posts/frontEnd/104-前端工程化精讲文档/(4436) 22  案例分析：搭建基本的前端高效部署系统.md","lastUpdated":1696417798000}'),t={name:"posts/frontEnd/104-前端工程化精讲文档/(4436) 22  案例分析：搭建基本的前端高效部署系统.md"},r=s('<p>上节课的思考题是容器化部署与容器化运行服务的差异点有哪些。这里我总结三个有代表性的供你参考：</p><ol><li><p><strong>容器持续时间不同</strong>：容器化部署的容器只在部署时创建使用，部署完成后即删除；而容器化服务则通常长时间运行。</p></li><li><p><strong>容器互联</strong>：容器化部署中的容器通常无须访问其他容器；而容器化服务则涉及多容器互联，以及更多弹性伸缩的容器特性。</p></li><li><p><strong>容器资源</strong>：容器化部署中涉及构建等 CPU 和 I/O 密集型处理；而容器化服务则对网络负载更敏感。</p></li></ol><p>在今天的课程里，我将带你分析一个基本的前端部署系统的工作流程、基本架构和主要功能模块的技术点。学习了这部分的内容之后，再结合之前几节课关于部署效率的内容，我们就可以基本掌握一个高效的前端构建部署系统的开发思路了。</p><h3 id="流程梳理" tabindex="-1">流程梳理 <a class="header-anchor" href="#流程梳理" aria-label="Permalink to &quot;流程梳理&quot;">​</a></h3><p>要搭建一个自动化的构建部署系统，首先需要理解使用这个部署系统的工作流程。</p><h4 id="构建部署工作流程" tabindex="-1">构建部署工作流程 <a class="header-anchor" href="#构建部署工作流程" aria-label="Permalink to &quot;构建部署工作流程&quot;">​</a></h4><p>在下图中，我演示了从用户提交代码到项目部署上线的整个过程中，部署系统与其他节点对接的流程示意图。</p>',7),c=s(`<p>其中的主要环节如下：</p><ol><li><p><strong>Webhook</strong>：Webhook 是一种不同服务之间，通过订阅或推送模式来传递信息的消息通知机制。部署系统将一个 Webhook 接口注册到代码管理系统（CVS）中。开发人员提交代码后，触发 CVS 的 Webhook，由 CVS 将提交事件通知给部署系统。</p></li><li><p><strong>项目构建</strong> ：部署系统在获取提交代码的消息后会创建构建任务，并推入<strong>待执行队列</strong>中，系统将依次执行任务队列中的构建任务。构建任务在执行时依次执行代码获取、依赖安装、代码构建和产物打包等环节。</p></li><li><p><strong>产物部署</strong>：构建完成后的发布代码一般分为两种模式：Push 模式和 Pull 模式。在 Push 模式下，由部署系统通过 SCP 等方式将产物包推送到目标服务器，并执行解压重启等发布流程。在 Pull 模式下会提供下载接口，由下游发布环节调用，然后获取产物包以便执行后续发布流程。同时，下游环节会调用反馈接口，将发布结果反馈至部署系统。</p></li><li><p><strong>结果反馈</strong>：构建结果与部署结果会通过通知模块（消息、邮件等）的方式，反馈至开发与测试人员。</p></li></ol><h4 id="系统使用辅助流程" tabindex="-1">系统使用辅助流程 <a class="header-anchor" href="#系统使用辅助流程" aria-label="Permalink to &quot;系统使用辅助流程&quot;">​</a></h4><p>除了核心的构建部署流程外，系统还需要具备可供用户正常使用的其他辅助功能流程：</p><ul><li><p><strong>登录与用户管理</strong>：系统需要获取使用者的基本信息，并对其在系统内的使用权限进行管理。</p></li><li><p><strong>项目流程</strong>：系统需要具备完整的项目接入流程，包括在系统内新增项目、修改项目部署配置、获取项目列表与查看项目详情等。</p></li><li><p><strong>构建流程</strong>：系统界面中需要呈现项目的构建记录列表、构建详情等信息，并能通过界面操控构建任务的状态变更（新建、开始、取消、删除等）。</p></li><li><p><strong>发布流程</strong>：系统界面中需要呈现项目的发布记录列表，并能通过界面操控构建记录的发布等。</p></li></ul><p>以上就是一个基本的前端部署系统的工作流程。限于篇幅原因，课程里不再展开其中各个功能模块的具体细节，而主要介绍最核心的构建任务流程的相关技术点。</p><h3 id="构建流程技术模块分析" tabindex="-1">构建流程技术模块分析 <a class="header-anchor" href="#构建流程技术模块分析" aria-label="Permalink to &quot;构建流程技术模块分析&quot;">​</a></h3><p>这部分主要介绍部署服务器环境准备、Webhook、任务队列等 6 个技术点，首先是部署服务器环境准备。</p><h4 id="部署服务器环境准备" tabindex="-1">部署服务器环境准备 <a class="header-anchor" href="#部署服务器环境准备" aria-label="Permalink to &quot;部署服务器环境准备&quot;">​</a></h4><p>与普通的 Web 服务不同，用于项目构建部署的服务器需要具备构建部署流程所需的相关环境条件。在非容器化的情况下，如果所搭建的是分布式的服务，则需要尽量保证一些环境条件的一致，以便在不同项目使用和迁移时，保持过程和产物的稳定性。</p><p>需要保持一致的环境条件如下：</p><ul><li><p><strong>NodeJS</strong>：NodeJS 的版本会直接对项目的依赖和构建产生影响，需要尽可能地保证各部署服务节点与线上运行服务环境的 NodeJS 版本一致。</p></li><li><p><strong>全局依赖工具</strong>：它是项目中可能需要的 Yarn、pnpm 等全局安装的工具。你需要保证预先在服务器中安装了它们，并确认版本的一致性。</p></li><li><p><strong>各类配置文件与环境变量</strong>：这指的是 npm 和 Yarn 的配置文件、系统的配置文件 .bash_profile 等。你需要保证在部署服务器中提前配置相关预设。</p></li><li><p><strong>系统所需其他工具</strong>：这指的是项目部署中所需的其他工具，例如 Git、Pigz、Zstd 等。你需要保证它们已在部署服务中提前安装完成。</p></li><li><p><strong>服务目录划分与维护</strong>：除了部署服务自身的目录外，在服务器中还需要规划项目构建的工作目录、项目产物目录、依赖缓存目录、持久化缓存目录等。各目录还需要有各自的监控与清理策略。</p></li></ul><h4 id="webhook" tabindex="-1">Webhook <a class="header-anchor" href="#webhook" aria-label="Permalink to &quot;Webhook&quot;">​</a></h4><p>要实现用户提交代码后部署系统立即收到相关消息的功能，就需要事先在 CVS 系统（例如 Gitlab、Github 等）中创建 Webhook。具体流程如下：</p><ol><li><p>在 CVS 系统中创建 Web 应用，用于用户在部署系统中调取 Oauth 授权并获得用户的授权信息，以便在后续流程中调用各类 API。</p></li><li><p>在部署系统中新增接收 Webhook 消息的路由，用于后续接收来自 CVS 的提交信息后，在部署系统中创建构建，并进行后续工作。</p></li><li><p>用户在部署系统中新增项目时，会调用创建 Webhook 的接口，将上述路由地址写入 CVS 系统的 Webhook 列表中。同时可以根据需求设置特定的 Webhook 参数，例如只监听特定的分支或只监听 Tag Push 等。</p></li></ol><h4 id="任务队列" tabindex="-1">任务队列 <a class="header-anchor" href="#任务队列" aria-label="Permalink to &quot;任务队列&quot;">​</a></h4><p>在部署系统接收到 Webhook 传递的代码提交信息后，下一步就是根据提交信息创建构建记录，并执行构建任务。但是由于执行构建任务是耗时的，对于同一个项目而言，如果当前有正在执行的构建任务时，执行任务的工作目录是处于使用状态的，此时需要把这期间新创建的构建任务排入待执行队列中，等待当前任务执行完毕后，再从队列中获取下一个任务执行。即使使用容器化构建部署，构建任务在独立容器内进行，也需要对整个部署系统的**同时执行任务数（Concurrency）**设定限制。我们需要将超过限制数量的新增任务排入队列中，避免过多任务同时执行，耗尽集群计算资源。</p><p>在 NodeJS 中，有一些管理队列的工具可供选用，例如 <a href="https://github.com/OptimalBits/bull" target="_blank" rel="noreferrer">Bull</a>、<a href="https://github.com/agenda/agenda" target="_blank" rel="noreferrer">Agenda</a> 等。以 Bull 为例，下面的示例代码就演示了部署系统中创建队列、添加构建任务、任务处理、任务完成的流转过程。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 创建任务队列</span></span>
<span class="line"><span style="color:#E1E4E8;">queue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Queue</span><span style="color:#E1E4E8;">(qname, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  redis: redisConfig,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">queue.</span><span style="color:#B392F0;">promiseDone</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">queue.</span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">job</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">done</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> job.data</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">task</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BuildTask</span><span style="color:#E1E4E8;">(config) </span><span style="color:#6A737D;">//创建并执行构建任务</span></span>
<span class="line"><span style="color:#E1E4E8;">  queue.promiseDone </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> done </span><span style="color:#6A737D;">//将任务完成函数赋值给外部属性，用于异步完成</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> queue</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">queueJobComplete</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  queue.</span><span style="color:#B392F0;">promiseDone</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">queueJobFail</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  queue.</span><span style="color:#B392F0;">promiseDone</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(err))</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">queueJobAdd</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  queue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(data, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    jobId: id, </span><span style="color:#6A737D;">//jobId of queue</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 创建任务队列</span></span>
<span class="line"><span style="color:#24292E;">queue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Queue</span><span style="color:#24292E;">(qname, {</span></span>
<span class="line"><span style="color:#24292E;">  redis: redisConfig,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">queue.</span><span style="color:#6F42C1;">promiseDone</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">queue.</span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">job</span><span style="color:#24292E;">, </span><span style="color:#E36209;">done</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">config</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> job.data</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">task</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BuildTask</span><span style="color:#24292E;">(config) </span><span style="color:#6A737D;">//创建并执行构建任务</span></span>
<span class="line"><span style="color:#24292E;">  queue.promiseDone </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> done </span><span style="color:#6A737D;">//将任务完成函数赋值给外部属性，用于异步完成</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> queue</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">queueJobComplete</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">id</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  queue.</span><span style="color:#6F42C1;">promiseDone</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">queueJobFail</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">id</span><span style="color:#24292E;">, </span><span style="color:#E36209;">err</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  queue.</span><span style="color:#6F42C1;">promiseDone</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(err))</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">queueJobAdd</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">id</span><span style="color:#24292E;">, </span><span style="color:#E36209;">data</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  queue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(data, {</span></span>
<span class="line"><span style="color:#24292E;">    jobId: id, </span><span style="color:#6A737D;">//jobId of queue</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="构建任务阶段与插件系统" tabindex="-1">构建任务阶段与插件系统 <a class="header-anchor" href="#构建任务阶段与插件系统" aria-label="Permalink to &quot;构建任务阶段与插件系统&quot;">​</a></h4><p>在之前的课程介绍过，部署系统中一次完整的构建任务大致可分为以下基本阶段：</p><ol><li><p><strong>初始化阶段</strong>：系统新建构建任务，初始化各配置参数与任务状态数据。</p></li><li><p><strong>获取代码阶段</strong>：根据任务配置，在任务工作目录中获取待构建的项目代码。</p></li><li><p><strong>依赖安装阶段</strong>：在执行构建编译前进行依赖安装。依赖安装的脚本可以写在项目配置中，也可以由系统自主分析获取。</p></li><li><p><strong>构建执行阶段</strong>：执行构建过程，输出产物代码。构建过程的执行脚本需要写在项目配置中。</p></li><li><p><strong>产物打包阶段</strong>：将构建产物打包压缩，并存储到持久化备份目录中。</p></li></ol><p>这些阶段的划分可以起到以下作用：</p><ol><li><p>明确构建执行进展，当构建中断时便于定位到具体的执行阶段。</p></li><li><p>各阶段独立统计耗时，便于针对性优化。</p></li><li><p>可参照构建效率模块中介绍过的 Webpack 插件系统，使用 Tapable 定义各阶段的 Hooks，从而将复杂的构建任务执行过程拆分到各功能插件中。这些插件可以是系统性的，例如在依赖安装阶段可以应用依赖安装目录缓存插件，在构建执行阶段前后可以应用构建持久化缓存插件。这些插件也可以是业务功能性的，例如分支合并检查插件、代码规范检查插件等。</p></li></ol><h4 id="任务命令与子进程" tabindex="-1">任务命令与子进程 <a class="header-anchor" href="#任务命令与子进程" aria-label="Permalink to &quot;任务命令与子进程&quot;">​</a></h4><p>和普通的 Web 服务不同，部署服务在对项目进行构建部署时，涉及许多命令行指令的调用。如下所示：</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#依赖安装</span></span>
<span class="line"><span style="color:#E1E4E8;">npm install</span></span>
<span class="line"><span style="color:#6A737D;">#执行构建</span></span>
<span class="line"><span style="color:#E1E4E8;">npm run build</span></span>
<span class="line"><span style="color:#6A737D;">#产物打包</span></span>
<span class="line"><span style="color:#E1E4E8;">tar </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">zcf client.tar.gz dist</span><span style="color:#F97583;">/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#依赖安装</span></span>
<span class="line"><span style="color:#24292E;">npm install</span></span>
<span class="line"><span style="color:#6A737D;">#执行构建</span></span>
<span class="line"><span style="color:#24292E;">npm run build</span></span>
<span class="line"><span style="color:#6A737D;">#产物打包</span></span>
<span class="line"><span style="color:#24292E;">tar </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">zcf client.tar.gz dist</span><span style="color:#D73A49;">/</span></span></code></pre></div><p>在 NodeJS 程序中，这些调用需要通过子进程来完成，例如下面的代码：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { spawn } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;child_process&#39;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">spawnPromise</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">commands</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">cwd</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">onStdout</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">onStderr</span><span style="color:#E1E4E8;"> }) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    onStdout </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> onStdout </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> (() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {})</span></span>
<span class="line"><span style="color:#E1E4E8;">    onStderr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> onStderr </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> (() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {})</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">subProcess</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">spawn</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;bash&#39;</span><span style="color:#E1E4E8;">, { detached: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, cwd })</span></span>
<span class="line"><span style="color:#E1E4E8;">    subProcess.</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;close&#39;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">code</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">signal</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (signal </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;SIGHUP&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//abort callback immediately after kill</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (code </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;ok&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    subProcess.stdout.</span><span style="color:#B392F0;">setEncoding</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;utf8&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    subProcess.stderr.</span><span style="color:#B392F0;">setEncoding</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;utf8&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    subProcess.stdout.</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;data&#39;</span><span style="color:#E1E4E8;">, onStdout)</span></span>
<span class="line"><span style="color:#E1E4E8;">    subProcess.stderr.</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;data&#39;</span><span style="color:#E1E4E8;">, onStderr)</span></span>
<span class="line"><span style="color:#E1E4E8;">    subProcess.stdin.</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;error&#39;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">notifySysError</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;subprocess stdin error&#39;</span><span style="color:#E1E4E8;">, e)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(e)</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    commands.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">command</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      subProcess.stdin.</span><span style="color:#B392F0;">write</span><span style="color:#E1E4E8;">(command </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    subProcess.stdin.</span><span style="color:#B392F0;">end</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { spawn } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;child_process&#39;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">spawnPromise</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">commands</span><span style="color:#24292E;">, </span><span style="color:#E36209;">cwd</span><span style="color:#24292E;">, </span><span style="color:#E36209;">onStdout</span><span style="color:#24292E;">, </span><span style="color:#E36209;">onStderr</span><span style="color:#24292E;"> }) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">, </span><span style="color:#E36209;">reject</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    onStdout </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> onStdout </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> (() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {})</span></span>
<span class="line"><span style="color:#24292E;">    onStderr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> onStderr </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> (() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {})</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">subProcess</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">spawn</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;bash&#39;</span><span style="color:#24292E;">, { detached: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, cwd })</span></span>
<span class="line"><span style="color:#24292E;">    subProcess.</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;close&#39;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">code</span><span style="color:#24292E;">, </span><span style="color:#E36209;">signal</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (signal </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;SIGHUP&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//abort callback immediately after kill</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (code </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;ok&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    subProcess.stdout.</span><span style="color:#6F42C1;">setEncoding</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;utf8&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    subProcess.stderr.</span><span style="color:#6F42C1;">setEncoding</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;utf8&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    subProcess.stdout.</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;data&#39;</span><span style="color:#24292E;">, onStdout)</span></span>
<span class="line"><span style="color:#24292E;">    subProcess.stderr.</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;data&#39;</span><span style="color:#24292E;">, onStderr)</span></span>
<span class="line"><span style="color:#24292E;">    subProcess.stdin.</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;error&#39;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">e</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">notifySysError</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;subprocess stdin error&#39;</span><span style="color:#24292E;">, e)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(e)</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    commands.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">command</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      subProcess.stdin.</span><span style="color:#6F42C1;">write</span><span style="color:#24292E;">(command </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    subProcess.stdin.</span><span style="color:#6F42C1;">end</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我创建了一个 bash 的子进程，输入执行指令，然后监听输出信息和结束状态。通过这样的方式，即可控制各构件阶段指令的执行。</p><h4 id="状态、事件与-socket" tabindex="-1">状态、事件与 Socket <a class="header-anchor" href="#状态、事件与-socket" aria-label="Permalink to &quot;状态、事件与 Socket&quot;">​</a></h4><p>除了把构建过程划分成各执行阶段外，还需要定义一次构建任务的所有可能状态：</p><ul><li><p><strong>初始化</strong>：该状态表示已部署服务接收到了来自 Webhook 的提交信息，并提取了构建所需的所有配置数据，同时也已创建了对应的构建记录。</p></li><li><p><strong>队列中</strong>：该状态表示该构建任务已列入等待队列中。</p></li><li><p><strong>进行中</strong>：该状态表示任务已开始执行。</p></li><li><p><strong>已取消</strong>：该状态表示任务已被用户主动取消执行。</p></li><li><p><strong>已成功</strong>：该状态表示构建任务已完成，用户可以进行下一步的发布流程。</p></li><li><p><strong>已失败</strong>：该状态表示构建任务已失败，需要用户确认失败原因并调试修复。</p></li><li><p><strong>已超时</strong>：该状态表示构建任务已超时。在实际使用过程中，如果发现一些异常情况，不会终止构建进程，因此需要设置超时时间来发现和反馈这些异常情况。</p></li></ul><p>这 7 种状态中的后 4 种为终止状态。在部署系统中，需要将这些状态及时反馈到用户界面。</p><p>整个传递机制可以分为下面三个部分：</p><ol><li><p>在构建任务中，当达到特定终止状态时，由服务进程触发相应事件。</p></li><li><p>在构建事件处理器中，根据监听到的不同事件执行相应的处理，例如对于构建成功的事件而言，我们需要变更数据库中的构建记录状态、执行自动发布的相关逻辑，以及将成功的状态通知到 Socket 处理器。</p></li><li><p>在 Socket 处理器中，服务器端触发相应的 Socket 消息，然后网页端在接收到 Socket 消息后，会变更页面中的构建记录显示状态。</p></li></ol><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>构建部署系统相对于我们日常比较熟悉的 B 端系统或 C 端 WebApp 而言，有一定的复杂性。但是只要理解了工作原理且掌握了整体架构，就可以按部就班地开发其中的各个模块，最后串接成一个功能完善、流程自洽的系统服务。所以本节课我们聊了两方面的内容：流程梳理和核心技术模块分析。</p><p>在流程梳理方面，首先你需要对构建部署的整体工作流程有一个比较清晰的认知，包括各服务间的对接、信息的传递等，其次掌握服务内部用户界面的各模块操作流程。在核心构建流程的模块分析方面，你需要了解操作层面的服务器环境的准备工作，代码架构层面的任务队列、构建任务阶段与状态拆分等。</p><p>希望通过这些内容，能让你对如何搭建高效的前端部署系统有一个初步印象。</p><p>到这里，我们的专栏就接近尾声了。下周还会更新一篇结束语，我会聊聊对开设课程的一些想法，包括对前端工程化领域的一些理解，以及对未来技术的展望。欢迎来听！</p><p>最后，我邀请你参与对本专栏的评价，你的每一个观点对我们来说都是最重要的。<a href="https://wj.qq.com/s2/7397518/d93d/" target="_blank" rel="noreferrer">点击链接，即可参与评价</a>，还有机会获得惊喜奖品！</p>`,42);function E(y,i,d,F,u,g){const n=l("Image");return p(),o("div",null,[r,e(n,{alt:"简易部署系统流程图.png",src:"https://s0.lgstatic.com/i/image/M00/62/86/Ciqc1F-Sk8uAbgbJAADgbQ-oRD4177.png"}),c])}const A=a(t,[["render",E]]);export{b as __pageData,A as default};

import{_ as l,j as e,o as c,g as t,k as n,h as a,s,Q as p}from"./chunks/framework.4e7d56ce.js";const D=JSON.parse('{"title":"04容器操作：得心应手掌握Docker容器基本操作","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/045_由浅入深吃透 Docker/(4575) 04  容器操作：得心应手掌握 Docker 容器基本操作.md","filePath":"posts/backEnd/045_由浅入深吃透 Docker/(4575) 04  容器操作：得心应手掌握 Docker 容器基本操作.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/045_由浅入深吃透 Docker/(4575) 04  容器操作：得心应手掌握 Docker 容器基本操作.md"},E=s("h1",{id:"_04容器操作-得心应手掌握docker容器基本操作",tabindex:"-1"},[a("04容器操作：得心应手掌握Docker容器基本操作 "),s("a",{class:"header-anchor",href:"#_04容器操作-得心应手掌握docker容器基本操作","aria-label":'Permalink to "04容器操作：得心应手掌握Docker容器基本操作"'},"​")],-1),y=s("p",null,"前几天在咱们的社群里看到有同学在讨论，说面试的时候被问到容器和镜像的区别，有同学回答说没什么区别，也许是在开玩笑，不过这两者的区别很大。今天，我们就来看看容器的相关知识，比如什么是容器？容器的生命周期，以及容器常用的操作命令。学完之后你可以对比下与镜像的区别。",-1),d=s("h3",{id:"容器-container-是什么",tabindex:"-1"},[a("容器（Container）是什么？ "),s("a",{class:"header-anchor",href:"#容器-container-是什么","aria-label":'Permalink to "容器（Container）是什么？"'},"​")],-1),i=s("p",null,"容器是基于镜像创建的可运行实例，并且单独存在，一个镜像可以创建出多个容器。运行容器化环境时，实际上是在容器内部创建该文件系统的读写副本。 这将添加一个容器层，该层允许修改镜像的整个副本。如图 1 所示。",-1),b=p('<p>图1 容器组成</p><p>了解完容器是什么，接下来我们聊一聊容器的生命周期。</p><h3 id="容器的生命周期" tabindex="-1">容器的生命周期 <a class="header-anchor" href="#容器的生命周期" aria-label="Permalink to &quot;容器的生命周期&quot;">​</a></h3><p>容器的生命周期是容器可能处于的状态，容器的生命周期分为 5 种。</p><ol><li><p>created：初建状态</p></li><li><p>running：运行状态</p></li><li><p>stopped：停止状态</p></li><li><p>paused： 暂停状态</p></li><li><p>deleted：删除状态</p></li></ol><p>各生命周期之前的转换关系如图所示：</p>',6),u=p(`<p>图2 容器的生命周期</p><p>通过<code>docker create</code>命令生成的容器状态为初建状态，初建状态通过<code>docker start</code>命令可以转化为运行状态，运行状态的容器可以通过<code>docker stop</code>命令转化为停止状态，处于停止状态的容器可以通过<code>docker start</code>转化为运行状态，运行状态的容器也可以通过<code>docker pause</code>命令转化为暂停状态，处于暂停状态的容器可以通过<code>docker unpause</code>转化为运行状态 。处于初建状态、运行状态、停止状态、暂停状态的容器都可以直接删除。</p><p>下面我通过实际操作和命令来讲解容器各生命周期间的转换关系。</p><h3 id="容器的操作" tabindex="-1">容器的操作 <a class="header-anchor" href="#容器的操作" aria-label="Permalink to &quot;容器的操作&quot;">​</a></h3><p>容器的操作可以分为五个步骤：创建并启动容器、终止容器、进入容器、删除容器、导入和导出容器。下面我们逐一来看。</p><h4 id="_1-创建并启动容器" tabindex="-1">（1）创建并启动容器 <a class="header-anchor" href="#_1-创建并启动容器" aria-label="Permalink to &quot;（1）创建并启动容器&quot;">​</a></h4><p>容器十分轻量，用户可以随时创建和删除它。我们可以使用<code>docker create</code>命令来创建容器，例如：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ docker create </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">it </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">busybox busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">Unable to find image </span><span style="color:#9ECBFF;">&#39;busybox:latest&#39;</span><span style="color:#E1E4E8;"> locally</span></span>
<span class="line"><span style="color:#E1E4E8;">latest</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> Pulling from library</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">61c5ed1cbdf8</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> Pull complete</span></span>
<span class="line"><span style="color:#E1E4E8;">Digest</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> sha256</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">4f47c01fa91355af2865ac10fef5bf6ec9c7f42ad2321377c21e844427972977</span></span>
<span class="line"><span style="color:#E1E4E8;">Status</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> Downloaded newer image </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> busybox</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">latest</span></span>
<span class="line"><span style="color:#E1E4E8;">2c2e919c2d6dad1f1712c65b3b8425ea656050bd5a0b4722f8b01526d5959ec6</span></span>
<span class="line"><span style="color:#E1E4E8;">$ docker ps </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">a</span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> grep busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">2c2e919c2d6d        busybox             </span><span style="color:#9ECBFF;">&quot;sh&quot;</span><span style="color:#E1E4E8;">                     </span><span style="color:#79B8FF;">34</span><span style="color:#E1E4E8;"> seconds ago      Created                                         busybox</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ docker create </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">it </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">busybox busybox</span></span>
<span class="line"><span style="color:#24292E;">Unable to find image </span><span style="color:#032F62;">&#39;busybox:latest&#39;</span><span style="color:#24292E;"> locally</span></span>
<span class="line"><span style="color:#24292E;">latest</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> Pulling from library</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">busybox</span></span>
<span class="line"><span style="color:#24292E;">61c5ed1cbdf8</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> Pull complete</span></span>
<span class="line"><span style="color:#24292E;">Digest</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> sha256</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">4f47c01fa91355af2865ac10fef5bf6ec9c7f42ad2321377c21e844427972977</span></span>
<span class="line"><span style="color:#24292E;">Status</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> Downloaded newer image </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> busybox</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">latest</span></span>
<span class="line"><span style="color:#24292E;">2c2e919c2d6dad1f1712c65b3b8425ea656050bd5a0b4722f8b01526d5959ec6</span></span>
<span class="line"><span style="color:#24292E;">$ docker ps </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">a</span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> grep busybox</span></span>
<span class="line"><span style="color:#24292E;">2c2e919c2d6d        busybox             </span><span style="color:#032F62;">&quot;sh&quot;</span><span style="color:#24292E;">                     </span><span style="color:#005CC5;">34</span><span style="color:#24292E;"> seconds ago      Created                                         busybox</span></span></code></pre></div><p>如果使用<code>docker create</code>命令创建的容器处于停止状态，我们可以使用<code>docker start</code>命令来启动它，如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ docker start busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">$ docker ps</span></span>
<span class="line"><span style="color:#E1E4E8;">CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES</span></span>
<span class="line"><span style="color:#E1E4E8;">d6f3d364fad3        busybox             </span><span style="color:#9ECBFF;">&quot;sh&quot;</span><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;"> seconds ago      Up </span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;"> seconds                            busybox</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ docker start busybox</span></span>
<span class="line"><span style="color:#24292E;">$ docker ps</span></span>
<span class="line"><span style="color:#24292E;">CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES</span></span>
<span class="line"><span style="color:#24292E;">d6f3d364fad3        busybox             </span><span style="color:#032F62;">&quot;sh&quot;</span><span style="color:#24292E;">                </span><span style="color:#005CC5;">16</span><span style="color:#24292E;"> seconds ago      Up </span><span style="color:#005CC5;">8</span><span style="color:#24292E;"> seconds                            busybox</span></span></code></pre></div><p>这时候我们可以看到容器已经处于启动状态了。</p><p>容器启动有两种方式：</p><ol><li><p>使用<code>docker start</code>命令基于已经创建好的容器直接启动 。</p></li><li><p>使用<code>docker run</code>命令直接基于镜像新建一个容器并启动，相当于先执行<code>docker create</code>命令从镜像创建容器，然后再执行<code>docker start</code>命令启动容器。</p></li></ol><p>使用<code>docker run</code>的命令如下:</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ docker run </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">it </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">busybox busybox</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ docker run </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">it </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">busybox busybox</span></span></code></pre></div><p>当使用<code>docker run</code>创建并启动容器时，Docker 后台执行的流程为：</p><ul><li><p>Docker 会检查本地是否存在 busybox 镜像，如果镜像不存在则从 Docker Hub 拉取 busybox 镜像；</p></li><li><p>使用 busybox 镜像创建并启动一个容器；</p></li><li><p>分配文件系统，并且在镜像只读层外创建一个读写层；</p></li><li><p>从 Docker IP 池中分配一个 IP 给容器；</p></li><li><p>执行用户的启动命令运行镜像。</p></li></ul><p>上述命令中， -t 参数的作用是分配一个伪终端，-i 参数则可以终端的 STDIN 打开，同时使用 -it 参数可以让我们进入交互模式。 在交互模式下，用户可以通过所创建的终端来输入命令，例如：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ ps aux</span></span>
<span class="line"><span style="color:#E1E4E8;">PID   USER     TIME  COMMAND</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> root      </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">00</span><span style="color:#E1E4E8;"> sh</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> root      </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">00</span><span style="color:#E1E4E8;"> ps aux</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ ps aux</span></span>
<span class="line"><span style="color:#24292E;">PID   USER     TIME  COMMAND</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> root      </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">00</span><span style="color:#24292E;"> sh</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> root      </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">00</span><span style="color:#24292E;"> ps aux</span></span></code></pre></div><p>我们可以看到容器的 1 号进程为 sh 命令，在容器内部并不能看到主机上的进程信息，因为容器内部和主机是完全隔离的。同时由于 sh 是 1 号进程，意味着如果通过 exit 退出 sh，那么容器也会退出。所以对于容器来说，<strong>杀死容器中的主进程，则容器也会被杀死。</strong></p><h4 id="_2-终止容器" tabindex="-1">（2）终止容器 <a class="header-anchor" href="#_2-终止容器" aria-label="Permalink to &quot;（2）终止容器&quot;">​</a></h4><p>容器启动后，如果我们想停止运行中的容器，可以使用<code>docker stop</code>命令。命令格式为 docker stop [-t|--time[=10]]。该命令首先会向运行中的容器发送 SIGTERM 信号，如果容器内 1 号进程接受并能够处理 SIGTERM，则等待 1 号进程处理完毕后退出，如果等待一段时间后，容器仍然没有退出，则会发送 SIGKILL 强制终止容器。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ docker stop busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">busybox</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ docker stop busybox</span></span>
<span class="line"><span style="color:#24292E;">busybox</span></span></code></pre></div><p>如果你想查看停止状态的容器信息，你可以使用 docker ps -a 命令。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ docker ps </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">a</span></span>
<span class="line"><span style="color:#E1E4E8;">CONTAINERID       IMAGE      COMMAND            CREATED             STATUS     PORTS         NAMES</span></span>
<span class="line"><span style="color:#E1E4E8;">28d477d3737a        busybox             </span><span style="color:#9ECBFF;">&quot;sh&quot;</span><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">26</span><span style="color:#E1E4E8;"> minutes ago      </span><span style="color:#B392F0;">Exited</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">137</span><span style="color:#E1E4E8;">) About a minute ago                       busybox</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ docker ps </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">a</span></span>
<span class="line"><span style="color:#24292E;">CONTAINERID       IMAGE      COMMAND            CREATED             STATUS     PORTS         NAMES</span></span>
<span class="line"><span style="color:#24292E;">28d477d3737a        busybox             </span><span style="color:#032F62;">&quot;sh&quot;</span><span style="color:#24292E;">                </span><span style="color:#005CC5;">26</span><span style="color:#24292E;"> minutes ago      </span><span style="color:#6F42C1;">Exited</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">137</span><span style="color:#24292E;">) About a minute ago                       busybox</span></span></code></pre></div><p>处于终止状态的容器也可以通过<code>docker start</code>命令来重新启动。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ docker start busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">$ docker ps</span></span>
<span class="line"><span style="color:#E1E4E8;">CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES</span></span>
<span class="line"><span style="color:#E1E4E8;">28d477d3737a        busybox             </span><span style="color:#9ECBFF;">&quot;sh&quot;</span><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;"> minutes ago      Up </span><span style="color:#79B8FF;">25</span><span style="color:#E1E4E8;"> seconds                           busybox</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ docker start busybox</span></span>
<span class="line"><span style="color:#24292E;">busybox</span></span>
<span class="line"><span style="color:#24292E;">$ docker ps</span></span>
<span class="line"><span style="color:#24292E;">CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES</span></span>
<span class="line"><span style="color:#24292E;">28d477d3737a        busybox             </span><span style="color:#032F62;">&quot;sh&quot;</span><span style="color:#24292E;">                </span><span style="color:#005CC5;">30</span><span style="color:#24292E;"> minutes ago      Up </span><span style="color:#005CC5;">25</span><span style="color:#24292E;"> seconds                           busybox</span></span></code></pre></div><p>此外，<code>docker restart</code>命令会将一个运行中的容器终止，并且重新启动它。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ docker restart busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">$ docker ps</span></span>
<span class="line"><span style="color:#E1E4E8;">CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES</span></span>
<span class="line"><span style="color:#E1E4E8;">28d477d3737a        busybox             </span><span style="color:#9ECBFF;">&quot;sh&quot;</span><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">32</span><span style="color:#E1E4E8;"> minutes ago      Up </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> seconds                            busybox</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ docker restart busybox</span></span>
<span class="line"><span style="color:#24292E;">busybox</span></span>
<span class="line"><span style="color:#24292E;">$ docker ps</span></span>
<span class="line"><span style="color:#24292E;">CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES</span></span>
<span class="line"><span style="color:#24292E;">28d477d3737a        busybox             </span><span style="color:#032F62;">&quot;sh&quot;</span><span style="color:#24292E;">                </span><span style="color:#005CC5;">32</span><span style="color:#24292E;"> minutes ago      Up </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> seconds                            busybox</span></span></code></pre></div><h4 id="_3-进入容器" tabindex="-1">（3）进入容器 <a class="header-anchor" href="#_3-进入容器" aria-label="Permalink to &quot;（3）进入容器&quot;">​</a></h4><p>处于运行状态的容器可以通过<code>docker attach</code>、<code>docker exec</code>、<code>nsenter</code>等多种方式进入容器。</p><ul><li><strong>使用</strong> <code>docker attach</code>命令<strong>进入容器</strong></li></ul><p>使用 docker attach ，进入我们上一步创建好的容器，如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ docker attach busybox</span></span>
<span class="line"><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> # ps aux</span></span>
<span class="line"><span style="color:#E1E4E8;">PID   USER     TIME  COMMAND</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> root      </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">00</span><span style="color:#E1E4E8;"> sh</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;"> root      </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">00</span><span style="color:#E1E4E8;"> ps aux</span></span>
<span class="line"><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> #</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ docker attach busybox</span></span>
<span class="line"><span style="color:#D73A49;">/</span><span style="color:#24292E;"> # ps aux</span></span>
<span class="line"><span style="color:#24292E;">PID   USER     TIME  COMMAND</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> root      </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">00</span><span style="color:#24292E;"> sh</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">7</span><span style="color:#24292E;"> root      </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">00</span><span style="color:#24292E;"> ps aux</span></span>
<span class="line"><span style="color:#D73A49;">/</span><span style="color:#24292E;"> #</span></span></code></pre></div><p>注意：当我们同时使用<code>docker attach</code>命令同时在多个终端运行时，所有的终端窗口将同步显示相同内容，当某个命令行窗口的命令阻塞时，其他命令行窗口同样也无法操作。</p><p>由于<code>docker attach</code>命令不够灵活，因此我们一般不会使用<code>docker attach</code>进入容器。下面我介绍一个更加灵活的进入容器的方式<code>docker exec</code></p><ul><li><strong>使用 docker exec 命令进入容器</strong></li></ul><p>Docker 从 1.3 版本开始，提供了一个更加方便地进入容器的命令<code>docker exec</code>，我们可以通过<code>docker exec -it CONTAINER</code>的方式进入到一个已经运行中的容器，如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ docker exec </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">it busybox sh</span></span>
<span class="line"><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> # ps aux</span></span>
<span class="line"><span style="color:#E1E4E8;">PID   USER     TIME  COMMAND</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> root      </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">00</span><span style="color:#E1E4E8;"> sh</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;"> root      </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">00</span><span style="color:#E1E4E8;"> sh</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;"> root      </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">00</span><span style="color:#E1E4E8;"> ps aux</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ docker exec </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">it busybox sh</span></span>
<span class="line"><span style="color:#D73A49;">/</span><span style="color:#24292E;"> # ps aux</span></span>
<span class="line"><span style="color:#24292E;">PID   USER     TIME  COMMAND</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> root      </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">00</span><span style="color:#24292E;"> sh</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">7</span><span style="color:#24292E;"> root      </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">00</span><span style="color:#24292E;"> sh</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">12</span><span style="color:#24292E;"> root      </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">00</span><span style="color:#24292E;"> ps aux</span></span></code></pre></div><p>我们进入容器后，可以看到容器内有两个<code>sh</code>进程，这是因为以<code>exec</code>的方式进入容器，会单独启动一个 sh 进程，每个窗口都是独立且互不干扰的，也是使用最多的一种方式。</p><h4 id="_4-删除容器" tabindex="-1">（4）删除容器 <a class="header-anchor" href="#_4-删除容器" aria-label="Permalink to &quot;（4）删除容器&quot;">​</a></h4><p>我们已经掌握了用 Docker 命令创建、启动和终止容器。那如何删除处于终止状态或者运行中的容器呢？删除容器命令的使用方式如下：<code>docker rm [OPTIONS] CONTAINER [CONTAINER...]</code>。</p><p>如果要删除一个停止状态的容器，可以使用<code>docker rm</code>命令删除。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker rm busybox</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker rm busybox</span></span></code></pre></div><p>如果要删除正在运行中的容器，必须添加 -f (或 --force) 参数， Docker 会发送 SIGKILL 信号强制终止正在运行的容器。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker rm </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f busybox</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker rm </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f busybox</span></span></code></pre></div><h4 id="_5-导出导入容器" tabindex="-1">（5）导出导入容器 <a class="header-anchor" href="#_5-导出导入容器" aria-label="Permalink to &quot;（5）导出导入容器&quot;">​</a></h4><ul><li><strong>导出容器</strong></li></ul><p>我们可以使用<code>docker export CONTAINER</code>命令导出一个容器到文件，不管此时该容器是否处于运行中的状态。导出容器前我们先进入容器，创建一个文件，过程如下。</p><p>首先进入容器创建文件</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker exec </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">it busybox sh</span></span>
<span class="line"><span style="color:#E1E4E8;">cd </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">tmp </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> touch test</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker exec </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">it busybox sh</span></span>
<span class="line"><span style="color:#24292E;">cd </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">tmp </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> touch test</span></span></code></pre></div><p>然后执行导出命令</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker export busybox </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> busybox.tar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker export busybox </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> busybox.tar</span></span></code></pre></div><p>执行以上命令后会在当前文件夹下生成 busybox.tar 文件，我们可以将该文件拷贝到其他机器上，通过导入命令实现容器的迁移。</p><ul><li><strong>导入容器</strong></li></ul><p>通过<code>docker export</code>命令导出的文件，可以使用<code>docker import</code>命令导入，执行完<code>docker import</code>后会变为本地镜像，最后再使用<code>docker run</code>命令启动该镜像，这样我们就实现了容器的迁移。</p><p>导入容器的命令格式为 docker import [OPTIONS] file|URL [REPOSITORY[:TAG]]。接下来我们一步步将上一步导出的镜像文件导入到其他机器的 Docker 中并启动它。</p><p>首先，使用<code>docker import</code>命令导入上一步导出的容器</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> busybox.tar busybox:test</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> busybox.tar busybox:test</span></span></code></pre></div><p>此时，busybox.tar 被导入成为新的镜像，镜像名称为 busybox:test 。下面，我们使用<code>docker run</code>命令启动并进入容器，查看上一步创建的临时文件</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker run </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">it busybox</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">test sh</span></span>
<span class="line"><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> # ls </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">tmp</span><span style="color:#F97583;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">test</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker run </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">it busybox</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">test sh</span></span>
<span class="line"><span style="color:#D73A49;">/</span><span style="color:#24292E;"> # ls </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">tmp</span><span style="color:#D73A49;">/</span></span>
<span class="line"><span style="color:#24292E;">test</span></span></code></pre></div><p>可以看到我们之前在 /tmp 目录下创建的 test 文件也被迁移过来了。这样我们就通过<code>docker export</code>和<code>docker import</code>命令配合实现了容器的迁移。</p><h3 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h3><p>到此，我相信你已经了解了容器的基本概念和组成，并已经熟练掌握了容器各个生命周期操作和管理。那容器与镜像的区别，你应该也很清楚了。镜像包含了容器运行所需要的文件系统结构和内容，是静态的只读文件，而容器则是在镜像的只读层上创建了可写层，并且容器中的进程属于运行状态，容器是真正的应用载体。</p><p>那你知道为什么容器的文件系统要设计成写时复制(如图 1 所示)，而不是每一个容器都单独拷贝一份镜像文件吗？思考后，可以把你的想法写在留言区。</p>`,65);function h(k,g,C,v,x,F){const o=e("Image");return c(),t("div",null,[E,y,d,i,n(o,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/4C/D1/CgqCHl9YmlSAGgF0AABXUH--rM4624.png"}),a(),b,n(o,{alt:"Lark20200923-114857.png",src:"https://s0.lgstatic.com/i/image/M00/55/BF/CgqCHl9qxcuANmQGAADHS_nfwJE810.png"}),a(),u])}const m=l(r,[["render",h]]);export{D as __pageData,m as default};

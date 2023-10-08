import{_ as s,o as a,g as e,Q as p}from"./chunks/framework.a0d18f64.js";const h=JSON.parse('{"title":"30Kubectl命令行工具使用秘笈","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4547) 30  Kubectl 命令行工具使用秘笈.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4547) 30  Kubectl 命令行工具使用秘笈.md","lastUpdated":1696682708000}'),l={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4547) 30  Kubectl 命令行工具使用秘笈.md"},o=p(`<h1 id="_30kubectl命令行工具使用秘笈" tabindex="-1">30Kubectl命令行工具使用秘笈 <a class="header-anchor" href="#_30kubectl命令行工具使用秘笈" aria-label="Permalink to &quot;30Kubectl命令行工具使用秘笈&quot;">​</a></h1><p>在本课程的最后一讲，我来为你介绍一些 kubectl 使用过程中的小技巧。kubectl 是我们日常操纵整个 Kubernetes 的利器，操作方便，功能强大。接下来，我会向你介绍常用的七个功能。</p><h3 id="自动补全" tabindex="-1">自动补全 <a class="header-anchor" href="#自动补全" aria-label="Permalink to &quot;自动补全&quot;">​</a></h3><p>我们可以通过如下命令进行命令行的自动补全，方便我们使用。</p><ul><li>如果你使用的是 bash，可以通过如下命令：</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">source </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">(kubectl completion bash) #你需要先安装 bash</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">completion</span></span>
<span class="line"><span style="color:#E1E4E8;">echo </span><span style="color:#9ECBFF;">&quot;source &lt;(kubectl completion bash)&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">~/</span><span style="color:#E1E4E8;">.bashrc #这样就不需要每次都 source 一下了</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">source </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">(kubectl completion bash) #你需要先安装 bash</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">completion</span></span>
<span class="line"><span style="color:#24292E;">echo </span><span style="color:#032F62;">&quot;source &lt;(kubectl completion bash)&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">~/</span><span style="color:#24292E;">.bashrc #这样就不需要每次都 source 一下了</span></span></code></pre></div><ul><li>如果你使用的是 zsh，也有可用的命令：</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">source </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">(kubectl completion zsh)</span></span>
<span class="line"><span style="color:#E1E4E8;">echo </span><span style="color:#9ECBFF;">&quot;[[ $commands[kubectl] ]] &amp;&amp; source &lt;(kubectl completion zsh)&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">~/</span><span style="color:#E1E4E8;">.zshrc #这样就不需要每次都 source 一下了</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">source </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">(kubectl completion zsh)</span></span>
<span class="line"><span style="color:#24292E;">echo </span><span style="color:#032F62;">&quot;[[ $commands[kubectl] ]] &amp;&amp; source &lt;(kubectl completion zsh)&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">~/</span><span style="color:#24292E;">.zshrc #这样就不需要每次都 source 一下了</span></span></code></pre></div><h3 id="命令行帮助" tabindex="-1">命令行帮助 <a class="header-anchor" href="#命令行帮助" aria-label="Permalink to &quot;命令行帮助&quot;">​</a></h3><p>遇到任何关于命令行使用的问题，都可以通过&quot;kubectl -h&quot;命令来查看有哪些子命令、包含哪些参数、使用例子等等。</p><p>这条命令也是我使用比较多的，可以帮助你更快地熟悉和了解 kubectl 的使用。</p><h3 id="集群管理" tabindex="-1">集群管理 <a class="header-anchor" href="#集群管理" aria-label="Permalink to &quot;集群管理&quot;">​</a></h3><p>我们可以通过&quot;kubectl cluster-info&quot;命令查看整个集群信息，比如 apiserver 暴露的地址、dns 的地址、metrics-server 的地址。</p><p>还可以通过&quot;kubectl version&quot;命令查看到 kubectl 以及 apiserver 的版本。毕竟 apiserver 的版本对整个集群至关重要，决定了各个 api 的版本、feature gate、准入控制等等，</p><p>而各个 kubelet 节点的版本，你可以通过&quot;kubectl get node&quot;命令查看。</p><p>你可以通过这些版本号了解到整个集群的版本信息，对集群的维护和升级很有帮助。</p><h3 id="资源查询" tabindex="-1">资源查询 <a class="header-anchor" href="#资源查询" aria-label="Permalink to &quot;资源查询&quot;">​</a></h3><p>通过 kubectl 命令来查询集群中的资源是我们日常使用频率最高的。</p><p>你可以通过 kubectl get 查询到某类资源对象，代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get [资源]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get [资源]</span></span></code></pre></div><p>假如我们想要查看集群中的所有节点，可以在代码的&quot;资源&quot;处输入&quot;nodes&quot;，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get nodes</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get nodes</span></span></code></pre></div><p>这里的资源名，我们可以使用资源名称的单数，比如 node；也可以使用其复数，比如 nodes；还可以使用其缩写名。</p><p>对于集群中定义的资源信息，比如资源名、对应的缩写、是否是 namespace 级别的资源，你可以通过&quot;kubectl api-resources&quot;命令获取。</p><p>如果我们想要查询某个资源对象，我们同样可以通过&quot;kubectl get&quot;命令，只不过要在原先的资源名后面加上&quot;/对象名&quot;。如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get [资源]</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">[对象名]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get [资源]</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">[对象名]</span></span></code></pre></div><p>还是以 node 为例，我想查询 node01 节点，就可以通过&quot;kubectl get node/node01&quot;命令完成。当然，不使用&quot;/&quot;也是允许的，代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get [资源] [对象名]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get [资源] [对象名]</span></span></code></pre></div><p>如果你想看到关于这个对象更详细的信息，你可以&quot;kubectl describe&quot;一下，即：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl describe [资源]</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">[对象名]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl describe [资源]</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">[对象名]</span></span></code></pre></div><p>对于 namesppace 级别的资源，我们只需要在上述命令后面加上&quot;-n [命名空间]&quot;或&quot;--namespace [命名空间]&quot;就可以了。代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get [资源]</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">[对象名] </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n [命名空间]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get [资源]</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">[对象名] </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n [命名空间]</span></span></code></pre></div><p>比如：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get pod pod</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">example </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n demo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get pod pod</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">example </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n demo</span></span></code></pre></div><p>如果你没有指定 namespace 的话，默认是名为 default 的命名空间。</p><p>此外，如果你想要查看所有命名空间下的某类资源，可以在&quot;资源&quot;后面加上&quot;--all-namespaces&quot;。代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get [资源] </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">all</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">namespaces</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get [资源] </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">all</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">namespaces</span></span></code></pre></div><p>比如：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get pod </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">all</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">namespaces</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get pod </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">all</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">namespaces</span></span></code></pre></div><h3 id="资源创建、更改、删除" tabindex="-1">资源创建、更改、删除 <a class="header-anchor" href="#资源创建、更改、删除" aria-label="Permalink to &quot;资源创建、更改、删除&quot;">​</a></h3><p>你还可以通过 kubectl create 进行资源创建，代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl create </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f demo.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl create </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f demo.yaml</span></span></code></pre></div><p>通过在 yaml 文件中定义各种资源及对象，我们通过这条命令将其在集群中创建出来。</p><p>当然，kubectl create 还提供了一些子命令，方便通过命令行直接创建资源对象。你可以通过&quot;kubectl create -h&quot;查看其支持的子命令。</p><p>假如我们想要在命名空间 demo 下创建一个名为 sa-demo 的 ServiceAccount 对象，我们可以通过如下命令进行：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl create sa sa</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">demo </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n demo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl create sa sa</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">demo </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n demo</span></span></code></pre></div><p>通常来说，从零开始写一个 yaml 文件很难，一般我们都是找一些资源的 yaml 例子拿来自己修改下。我并不推荐自己一点点去写 yaml，效率低下，而且还会出现缩进的问题。</p><p>我推荐<strong>通过 kubectl create 的这些命令来解决</strong>。通过命令行参数，我们可以让 kubectl 帮我们自动生成一些 yaml 文件，比如你可以通过下面的命令拿到了一个 deployment 的 yaml 文件，然后就可以对这个文件进一步地修改以达到你的期望定义。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl create deploy my</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">deployment </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n demo </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">image busybox </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">dry</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">run server </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">o yaml </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> my</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">deployment.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl create deploy my</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">deployment </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n demo </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">image busybox </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">dry</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">run server </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">o yaml </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> my</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">deployment.yaml</span></span></code></pre></div><p>这儿主要是用到了 dry-run 的能力。</p><p>你还可以通过 kubectl edit 直接修改这些资源：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl edit [资源]</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">[对象名] </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n [命名空间]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl edit [资源]</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">[对象名] </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n [命名空间]</span></span></code></pre></div><p>如果是集群级别的资源对象，那么代码中就不用加&quot;-n&quot;了。</p><p>或者你也可以通过修改 yaml 文件，然后 apply 到集群中：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl apply </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f demo.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl apply </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f demo.yaml</span></span></code></pre></div><p>当然，这条命令还能被用来创建对象，如果对象已经存在就会对它进行更新。</p><p>对于资源对象的删除，可以直接通过 kubectl delete 进行：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl delete [资源]</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">[对象名] [</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n [命名空间]]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl delete [资源]</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">[对象名] [</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n [命名空间]]</span></span></code></pre></div><p>比如：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl delete pod</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">pod</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">demo </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n demo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl delete pod</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">pod</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">demo </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n demo</span></span></code></pre></div><p>如果你是通过 yaml 文件创建的某些资源对象，比如 flannel；yaml 文件中包含了很多对象，一个个删除太麻烦，也容易遗漏，你就可以通过如下命令删除：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl delete </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f flannel.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl delete </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f flannel.yaml</span></span></code></pre></div><h3 id="日志" tabindex="-1">日志 <a class="header-anchor" href="#日志" aria-label="Permalink to &quot;日志&quot;">​</a></h3><p>如果 pod 内只有一个容器，你可以通过&quot;kubectl logs [pod 名] -n [命名空间]&quot;命令查看该容器的日志。</p><p>如果有多个容器，就需要在&quot;pod 名&quot;后插入&quot;-c [容器名]&quot;，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl logs [pod 名] </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c [容器名] </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n [命名空间]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl logs [pod 名] </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c [容器名] </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n [命名空间]</span></span></code></pre></div><p>你还可以通过&quot;-f&quot;参数来实时查看容器最新的日志。更多参数，就需要你自己来探索了。</p><h3 id="快速创建一个-pod" tabindex="-1">快速创建一个 Pod <a class="header-anchor" href="#快速创建一个-pod" aria-label="Permalink to &quot;快速创建一个 Pod&quot;">​</a></h3><p>我们可以通过如下命令快速创建一个 Pod，在我们做环境 debug 的时候非常方便：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl run [pod 名] </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n [命名空间] </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">image [镜像] [.....]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl run [pod 名] </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n [命名空间] </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">image [镜像] [.....]</span></span></code></pre></div><p>比如：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl run pod1 </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n debug</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">pod </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">image network</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">debug </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> bash</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl run pod1 </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n debug</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">pod </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">image network</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">debug </span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> bash</span></span></code></pre></div><p>其他参数，你可以通过 &quot;kubectl run -h&quot; 查看；也可以直接 exec 到容器里查看，代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl exec </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">it [pod 名] </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n [命名空间] bash</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl exec </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">it [pod 名] </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n [命名空间] bash</span></span></code></pre></div><p>同样，如果有多个容器的话，需要知道一个容器名：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl exec </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">it [pod 名] </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c [容器名] </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n [命名空间] bash</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl exec </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">it [pod 名] </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c [容器名] </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n [命名空间] bash</span></span></code></pre></div><h3 id="写在最后" tabindex="-1">写在最后 <a class="header-anchor" href="#写在最后" aria-label="Permalink to &quot;写在最后&quot;">​</a></h3><p>kubectl 支持 JSONPath 模版，在<a href="https://kubernetes.io/zh/docs/reference/kubectl/jsonpath" target="_blank" rel="noreferrer">官方文档</a>中有详细的说明和例子，这里就不再重复了。</p><p>kubectl 能力非常强大，随着你不断地使用，你会发现更多 kubectl 中的小技巧，也会慢慢积累一些自己的使用技巧。以上我只是列举了一些常用的命令操作，你可以点击链接查看<a href="https://kubernetes.io/zh/docs/reference/kubectl/cheatsheet/" target="_blank" rel="noreferrer">官方的 kubectl 小抄</a>来学习。</p><p>本文中的例子，只使用到了部分参数，你可以通过 &quot;-h&quot;来查看其具体支持的各个参数。</p><p>如果你对本节课有什么想法或者疑问，欢迎在留言区留言，我们一起讨论。</p>`,81),n=[o];function t(c,r,i,d,y,u){return a(),e("div",null,n)}const b=s(l,[["render",t]]);export{h as __pageData,b as default};

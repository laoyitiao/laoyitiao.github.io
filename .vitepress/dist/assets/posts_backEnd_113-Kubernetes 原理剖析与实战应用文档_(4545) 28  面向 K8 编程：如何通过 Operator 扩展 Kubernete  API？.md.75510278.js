import{_ as o,j as l,o as t,g as r,k as e,h as a,Q as p,s}from"./chunks/framework.cfb14fe0.js";const P=JSON.parse('{"title":"28面向K8编程：如何通过Operator扩展KuberneteAPI？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4545) 28  面向 K8 编程：如何通过 Operator 扩展 Kubernete  API？.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4545) 28  面向 K8 编程：如何通过 Operator 扩展 Kubernete  API？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4545) 28  面向 K8 编程：如何通过 Operator 扩展 Kubernete  API？.md"},i=p('<h1 id="_28面向k8编程-如何通过operator扩展kuberneteapi" tabindex="-1">28面向K8编程：如何通过Operator扩展KuberneteAPI？ <a class="header-anchor" href="#_28面向k8编程-如何通过operator扩展kuberneteapi" aria-label="Permalink to &quot;28面向K8编程：如何通过Operator扩展KuberneteAPI？&quot;">​</a></h1><p>你好，我是正范。在上一讲，我们学习了如何通过一个 YAML 文件来定义一个 CRD，即扩展 API。这种扩展 API 跟 Kubernetes 内置的其他 API 同等地位，都可以通过 kubectl 或者 REST 接口访问，在使用过程中不会有任何差异。</p><p>但只是定义一个 CRD 并没有什么作用。虽说 kube-apiserver 会将其数据存放到 etcd 中，并暴露出相应的 REST 接口，然而并不涉及该对象的核心处理逻辑。</p><p>如何对这些 CRD 定义的对象进行一些逻辑处理，需要由用户自己来定义和实现，也就是通过控制器来实现。对此，我们有个专门的名字：Operator。</p><h3 id="什么是-kubernetes-operator" tabindex="-1">什么是 Kubernetes Operator <a class="header-anchor" href="#什么是-kubernetes-operator" aria-label="Permalink to &quot;什么是 Kubernetes Operator&quot;">​</a></h3><p>你可能对 Operator 这个名字比较陌生。这个名字最早由 <a href="https://coreos.com/operators/" target="_blank" rel="noreferrer">CoreOS</a> 在 2016 年提出来，我们来看看他们给出的定义：</p><blockquote><p>An operator is a method of packaging, deploying and managing a Kubernetes application. A Kubernetes application is an application that is both deployed on Kubernetes and managed using the Kubernetes APIs and kubectl tooling.</p><p>To be able to make the most of Kubernetes, you need a set of cohensive APIs to extend in order to service and manage your applications that run on Kubernetes. You can think of Operators as the runtime that manages this type of application on Kubernetes.</p></blockquote><p>总结一下，所谓的 Kubernetes Operator 其实就是借助 Kubernetes 的控制器模式，配合一些自定义的 API，完成对某一类应用的操作，比如资源创建、资源删除。</p><p>这里对 Kubernetes 的控制器模式做个简要说明。<strong>Kubernetes 通过声明式 API 来定义对象，各个控制器负责实时查看对应对象的状态，确保达到定义的期望状态</strong>。这就是 Kubernetes 的控制器模式。</p>',9),y=s("p",null,"kube-controller-manager 就是由这样一组控制器组成的。我们以 StatefulSet 为例来简单说明下控制器的具体逻辑。",-1),E=s("p",null,"假设你声明了一个 StatefulSet，并将其副本数设置为 2。kube-controller-manager 中以 goroutine 方式运行的 StatefulSet 控制器在观察 kube-apiserver 的时候，发现了这个新创建的对象，它会先创建一个 index 为 0 的 Pod ，并实时观察这个 Pod 的状态，待其状态变为 Running 后，再创建 index 为 1 的 Pod。后续该控制器会一直观察并维护这些 Pod 的状态，保证 StatefulSet 的有效副本数始终为 2。",-1),u=s("p",null,"所以我们在声明完成 CRD 之后，也需要创建一个控制器，即 Operator，来完成对应的控制逻辑。",-1),d=s("p",null,"了解了 Operator 的概念和控制器模式后，我们来看看 Operator 是如何工作的。",-1),F=s("h3",{id:"kubernetes-operator-是如何工作的",tabindex:"-1"},[a("Kubernetes Operator 是如何工作的 "),s("a",{class:"header-anchor",href:"#kubernetes-operator-是如何工作的","aria-label":'Permalink to "Kubernetes Operator 是如何工作的"'},"​")],-1),b=s("p",null,"Operator 工作的时候采用上述的控制器模式，会持续地观察 Kubernetes 中的自定义对象，即 CR（Custom Resource）。我们通过 CRD 来定义一个对象，CR 则是 CRD 实例化的对象。",-1),h=s("p",null,"Operator 会持续跟踪这些 CR 的变化事件，比如 ADD、UPDATE、DELETE，然后采取一系列操作，使其达到期望的状态。",-1),g=s("p",null,"那么具体的代码层面，整个逻辑又如何实现呢？",-1),k=s("p",null,"下面就是 Operator 代码层面的工作流程图：",-1),C=p(`<p>如上图所示，上半部分是一个 Informer，它的机制就是不断地 list/watch kube-apiserver 中特定的资源，比如你只关心 Pod，那么就只 list/watch Pod。Informer 主要有两个方法：一个是 ListFunc，一个是 WatchFunc。</p><ul><li><p>ListFunc 可以把某类资源的所有资源都列出来，当然你可以指定某个命名空间。</p></li><li><p>WatchFunc 则会和 apiserver 建立一个长链接，一旦有一个对象更新或者新对象创建，apiserver 就会反向推送回来，告诉 Informer 有一个新的对象创建或者更新等操作。</p></li></ul><p>当 Informer 接收到了这些操作，就会调用对应的函数（比如 AddFunc、UpdateFunc 和 DeleteFunc），并将其按照 key 值的格式放到一个先入先出的队列中。</p><p>key 值的命名规则就是 &quot;namespace/name&quot;，name 是对应的资源的名字，比如在 default 的 namespace 中创建一个 foo 类型的资源 example-foo，那么它的 key 值就是 &quot;default/example-foo&quot;。</p><p>我们一般会给 Operator 设置多个 Worker，并行地从上面的队列中拿到对象去操作处理。工作完成之后，就把这个 key 丢掉，表示已经处理完成。但如果处理过程中有错误，则可以把这个 key 重新放回到队列中，后续再重新处理。</p><p>看得出来，上述的流程其实还是有些复杂的，尤其是对初学者有一定的门槛。幸好社区提供了一些脚手架，方便我们快速地构建自己的 Operator。</p><h3 id="构建一个自己的-kubernetes-operator" tabindex="-1">构建一个自己的 Kubernetes Operator <a class="header-anchor" href="#构建一个自己的-kubernetes-operator" aria-label="Permalink to &quot;构建一个自己的 Kubernetes Operator&quot;">​</a></h3><p>目前社区有一些可以用于创建 Kubernetes Operator 的开源项目，例如：<a href="https://github.com/operator-framework/operator-sdk" target="_blank" rel="noreferrer">Operator SDK</a>、<a href="https://github.com/kubernetes-sigs/kubebuilder" target="_blank" rel="noreferrer">Kubebuilder</a>、<a href="https://github.com/kudobuilder/kudo" target="_blank" rel="noreferrer">KUDO</a>。</p><p>有了这些脚手架，我们就可以快速创建出 Operator 的框架。这里我以 kubebuilder 为例。</p><p>我们可以先通过如下命令安装 kustomize：</p><pre><code>curl -s &quot;https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh&quot; | bash
mv kustomize /usr/local/bin/
</code></pre><p>再安装 kubebuilder。你可以选择通过源码安装：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clone</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/kubernetes-sigs/kubebuilder</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubebuilder</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">checkout</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v2.3.1</span></span>
<span class="line"><span style="color:#B392F0;">make</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span></span>
<span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bin/kubebuilder</span><span style="color:#E1E4E8;"> $GOPATH</span><span style="color:#9ECBFF;">/bin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">clone</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/kubernetes-sigs/kubebuilder</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubebuilder</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">checkout</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v2.3.1</span></span>
<span class="line"><span style="color:#6F42C1;">make</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bin/kubebuilder</span><span style="color:#24292E;"> $GOPATH</span><span style="color:#032F62;">/bin</span></span></code></pre></div><p>如果你本地有些代码拉不下来，可以用 proxy：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> GOPROXY</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">https://goproxy.cn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> GOPROXY</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">https://goproxy.cn</span></span></code></pre></div><p>也可以直接下载二进制文件：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">os</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">$(</span><span style="color:#B392F0;">go</span><span style="color:#9ECBFF;"> env GOOS)</span></span>
<span class="line"><span style="color:#E1E4E8;">arch</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">$(</span><span style="color:#B392F0;">go</span><span style="color:#9ECBFF;"> env GOARCH)</span></span>
<span class="line"><span style="color:#6A737D;"># download kubebuilder and extract it to tmp</span></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-sL</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://go.kubebuilder.io/dl/2.3.1/</span><span style="color:#E1E4E8;">\${os}</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">\${arch} </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-xz</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-C</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/tmp/</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mv</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/tmp/kubebuilder_2.3.1_</span><span style="color:#E1E4E8;">\${os}</span><span style="color:#9ECBFF;">_</span><span style="color:#E1E4E8;">\${arch} </span><span style="color:#9ECBFF;">/usr/local/bin/kubebuilder</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">os</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">$(</span><span style="color:#6F42C1;">go</span><span style="color:#032F62;"> env GOOS)</span></span>
<span class="line"><span style="color:#24292E;">arch</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">$(</span><span style="color:#6F42C1;">go</span><span style="color:#032F62;"> env GOARCH)</span></span>
<span class="line"><span style="color:#6A737D;"># download kubebuilder and extract it to tmp</span></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-sL</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://go.kubebuilder.io/dl/2.3.1/</span><span style="color:#24292E;">\${os}</span><span style="color:#032F62;">/</span><span style="color:#24292E;">\${arch} </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-xz</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/tmp/</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mv</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/tmp/kubebuilder_2.3.1_</span><span style="color:#24292E;">\${os}</span><span style="color:#032F62;">_</span><span style="color:#24292E;">\${arch} </span><span style="color:#032F62;">/usr/local/bin/kubebuilder</span></span></code></pre></div><p>安装好以后，我们就可以通过 kubebuilder 来创建 Operator 了：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> $GOPATH</span><span style="color:#9ECBFF;">/src</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">github.com/zhangsan/operator-demo</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">github.com/zhangsan/operator-demo</span></span>
<span class="line"><span style="color:#B392F0;">kubebuilder</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--domain</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">abc.com</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--license</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apache2</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--owner</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;zhangsan&quot;</span></span>
<span class="line"><span style="color:#B392F0;">kubebuilder</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">api</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--group</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">foo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--version</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v1</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--kind</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Bar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> $GOPATH</span><span style="color:#032F62;">/src</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">github.com/zhangsan/operator-demo</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">github.com/zhangsan/operator-demo</span></span>
<span class="line"><span style="color:#6F42C1;">kubebuilder</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--domain</span><span style="color:#24292E;"> </span><span style="color:#032F62;">abc.com</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--license</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apache2</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--owner</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;zhangsan&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">kubebuilder</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#032F62;">api</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--group</span><span style="color:#24292E;"> </span><span style="color:#032F62;">foo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--version</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--kind</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Bar</span></span></code></pre></div><p>通过上面 kubebuilder 的命令，我们会在当前目录创建一个 Operator 的框架，并声明了一个 Bar 类型的 API。</p><p>你通过 make manifests 即可生成所需要的 yaml 文件，包括 CRD、RBAC等。</p><p>通过如下的命令即可安装 CRD、RBAC等对象：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">make</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 安装CRD</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">make</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 安装CRD</span></span></code></pre></div><p>然后我们就可以看到创建的CRD了：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># kubectl get crd</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">               </span><span style="color:#9ECBFF;">AGE</span></span>
<span class="line"><span style="color:#B392F0;">bars.foo.abc.com</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">2</span><span style="color:#9ECBFF;">m</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># kubectl get crd</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">               </span><span style="color:#032F62;">AGE</span></span>
<span class="line"><span style="color:#6F42C1;">bars.foo.abc.com</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">2</span><span style="color:#032F62;">m</span></span></code></pre></div><p>再来创建一个 Bar 类型的对象：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># kubectl apply -f config/samples/</span></span>
<span class="line"><span style="color:#6A737D;"># kubectl get bar </span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">AGE</span></span>
<span class="line"><span style="color:#B392F0;">bar-sample</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">25</span><span style="color:#9ECBFF;">s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># kubectl apply -f config/samples/</span></span>
<span class="line"><span style="color:#6A737D;"># kubectl get bar </span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">         </span><span style="color:#032F62;">AGE</span></span>
<span class="line"><span style="color:#6F42C1;">bar-sample</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">25</span><span style="color:#032F62;">s</span></span></code></pre></div><p>在本地开发阶段，我们可以通过 make run 命令，在本地运行。运行起来以后，你可以从输出日志中看到我们刚创建的 default 命名空间下的 bar-sample，即 key 为 &quot;default/bar-sample&quot;。</p><p>我们在开发的时候，只需要修改 &quot;api/v1/bar_types.go&quot;和&quot;controllers/bar_controller.go&quot;这两个文件即可。这两个文件中有注释，会告诉你新增的对象定义和具体逻辑写哪里。这里你也可以参考 kubebuilder 的文档。</p><p>你开发完成之后，就可以构建一个镜像出来，方便部署：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">make</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-build</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-push</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">IMG=zhangsan/operator-demo</span></span>
<span class="line"><span style="color:#B392F0;">make</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deploy</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">make</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-build</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-push</span><span style="color:#24292E;"> </span><span style="color:#032F62;">IMG=zhangsan/operator-demo</span></span>
<span class="line"><span style="color:#6F42C1;">make</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deploy</span></span></code></pre></div><h3 id="写在最后" tabindex="-1">写在最后 <a class="header-anchor" href="#写在最后" aria-label="Permalink to &quot;写在最后&quot;">​</a></h3><p>到这里，你就完成了对扩展 Kubernetes API 的学习。这一讲的难点不在于 Operator 本身，而是要学会理解它的行为。</p><p>如果你对本节课有什么想法或者疑问，欢迎你在留言区留言，我们一起讨论。</p>`,34);function m(_,B,v,A,f,O){const n=l("Image");return t(),r("div",null,[i,e(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/74/A3/Ciqc1F_HAmyACHLHAAHSt7ZcZoY464.png"}),a(),y,E,u,d,F,b,e(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/74/A3/Ciqc1F_HAnWAZUN3AAGfGj4K8Gw651.png"}),a(),h,g,k,e(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/74/ED/CgqCHl_HLoWAHjvEAAPol71Pgh8456.png"}),a(),C])}const D=o(c,[["render",m]]);export{P as __pageData,D as default};

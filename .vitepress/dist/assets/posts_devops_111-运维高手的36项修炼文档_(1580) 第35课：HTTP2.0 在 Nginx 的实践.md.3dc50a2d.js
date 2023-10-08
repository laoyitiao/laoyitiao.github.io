import{_ as o,j as e,o as t,g as c,k as p,h as a,s,Q as l}from"./chunks/framework.4e7d56ce.js";const f=JSON.parse('{"title":"第35课：HTTP2.0在Nginx的实践","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1580) 第35课：HTTP2.0 在 Nginx 的实践.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1580) 第35课：HTTP2.0 在 Nginx 的实践.md","lastUpdated":1696682708000}'),r={name:"posts/devops/111-运维高手的36项修炼文档/(1580) 第35课：HTTP2.0 在 Nginx 的实践.md"},E=s("h1",{id:"第35课-http2-0在nginx的实践",tabindex:"-1"},[a("第35课：HTTP2.0在Nginx的实践 "),s("a",{class:"header-anchor",href:"#第35课-http2-0在nginx的实践","aria-label":'Permalink to "第35课：HTTP2.0在Nginx的实践"'},"​")],-1),y=s("p",null,"本课时讲解的内容是关于 HTTP2.0 在 Nginx 中的实践。我们会介绍 HTTP2.0 的协议，同时讲解 Nginx 是如何支持 HTTP2.0 特性作配置。",-1),i=s("h3",{id:"关于-http-协议",tabindex:"-1"},[a("关于 HTTP 协议 "),s("a",{class:"header-anchor",href:"#关于-http-协议","aria-label":'Permalink to "关于 HTTP 协议"'},"​")],-1),T=s("p",null,"在当前这个互联网时代，越来越多的应用场景使用 HTTP 协议（超文本传输协议），它是一个十分重要的协议。HTTP 当前主要使用的版本是 HTTP1.1，HTTP2.0 和 HTTP3.0，在这张图里我们先来整体了解下。",-1),h=l('<p>HTTP1.1 算是早期的版本了，如图所示它包含几大部分：HTTP 协议报文，底层 TCP 内容，还有 IP 及 MAC 这些内容。</p><p>在 HTTP1.1 协议里，最大的问题就是安全问题，因为它没法做到数据加密，为了解决这种数据安全性的问题，就引入了 HTTPS 协议。</p><p>HTTPS 对比 HTTP1.1 就是支持 SSL 数据加密并传送，这就解决了数据传输被劫持的问题。通过 HTTPS 做数据的加密和解密虽然解决了安全的问题，但造成性能损耗及增加多次客户端和服务端建连，所以性能造成了一定损耗，如何同时保障安全和性能更优呢？HTTP 协议本身的内容就有必要进行升级，也就接下来我们要讲的 HTTP2.0。</p><p>HTTP2.0 提出重要概念 Stream（流），将一个 TCP 连接分为若干个流（Stream），每个流中可以传输若干消息（Message），它是以流的方式进行数据包传输，通过建立 I/O 复用的机制来保障客户端连接和服务端请求响应的效率。</p><p>另外就是在压缩上的变化，它采用了 Hpark 机制进行头部压缩。而 HTTP1.1 协议是不做 HTTP 头信息的压缩的，HTTP2.0 则通过 Hpark 的方式进行了头部压缩，这样就减少了客户端和服务端传送的流量，并且 Hpark 在服务端建立起了一个字典，只以增量的方式传输投入的报文，所以整个这套机制改善了头部报文传送效率问题。</p><p>这就是 HTTP2.0 的协议最大的两个特性，而 HTTP3.0 的诞生解决了 HTTP2.0 一些缺陷，这些缺陷我们将在课程后面的内容为你介绍。</p><h3 id="http2-0-协议" tabindex="-1">HTTP2.0 协议 <a class="header-anchor" href="#http2-0-协议" aria-label="Permalink to &quot;HTTP2.0 协议&quot;">​</a></h3><p>接下来我们要重点介绍的就是 HTTP2.0 协议。说首先来具体讲一讲 HTTP2.0 协议解决了 HTTP1.1 协议的哪些问题，也就是 HTTP1.1 协议里存在的劣势。</p><h4 id="http1-1-的劣势" tabindex="-1">HTTP1.1 的劣势 <a class="header-anchor" href="#http1-1-的劣势" aria-label="Permalink to &quot;HTTP1.1 的劣势&quot;">​</a></h4><p>首先就是HTTP1.1性能问题。</p><p>第一表现是 TCP 连接存在请求阻塞的问题，因为一个连接同时只能处理一个请求，而浏览器又只能以先进先出的按照优先级的方式进行请求处理。所以如果一个响应没有及时返回时，后面的请求就都会阻塞。</p><p>为了优化请求阻塞的问题，很多技术人员开发前端架构会设计成多个域名，这样就可以让浏览器和服务端同时建立起多个连接。但是浏览器对于用 HTTP1.1 协议同时创建的连接个数是有限制的（不同浏览器限制个数不一样）。所以使用这种方式提高页面数据加载效率有限。</p><p>第二个问题就是内容的明文传输，我们刚刚讲过，HTTP1.1 协议对于数据内容是以明文的方式传输的，没有任何加密，所以容易出现内容被劫持。</p><h4 id="http2-0-的优势" tabindex="-1">HTTP2.0 的优势 <a class="header-anchor" href="#http2-0-的优势" aria-label="Permalink to &quot;HTTP2.0 的优势&quot;">​</a></h4><p>HTTP1.1 这两点劣势在 HTTP2.0 都得到了很好的解决，接下来我们就介绍 HTTP2.0。</p><p>首先是 HTTP2.0 多路复用机制，所谓多路复用，就是在一个 TCP 连接里面，客户端可以通过 HTTP2.0 协议同时发送多个请求流，实现单连接上多请求 - 响应并行，这就解决了连接阻塞的问题，减少了 TCP 连接的数量和 TCP 连接慢的情况。</p><p>第二就是 HTTP2.0 用到了分帧二进制的方式进行传输，也就是在一个请求流中以数据帧作为传输的最小单位，实现二进制传输，并且基于 HTTPS 协议，解决明文传输安全性问题。</p><p>最后值得一提的就是服务端的主动推送机制，浏览器发送一个请求的时候，服务端会主动向浏览器推送与请求相关的资源，这个时候浏览器就不用再发起后续的请求了。</p>',18),_=l(`<p>在上面这张图中，左边是服务端，右边是客户端，客户端在请求流 stream1（也就是 page.html）的时候，服务端就会主动向客户端响应，除了 page.html 响应的内容以外，还同时响应了 stream2、stream4(script.js、style.css)，服务端主动响应给了客户端，这样机制减少多次连接，从而提高对应页面的响应性能和用户体验。</p><h3 id="http2-0-在-nginx-中的配置实践" tabindex="-1">HTTP2.0 在 Nginx 中的配置实践 <a class="header-anchor" href="#http2-0-在-nginx-中的配置实践" aria-label="Permalink to &quot;HTTP2.0 在 Nginx 中的配置实践&quot;">​</a></h3><p>了解了 HTTP2.0 的优势以后，我们就 Nginx 是如何支持 HTTP2.0 协议的为你进行介绍。</p><p>我们首先讲到的是对 HTTP2.0 整个协议的支持，在 Nginx 的版本里，支持 HTTP2.0 的协议对其版本是有要求的，Nginx 的软件版本需要大于 Nginx1.10 的版本，才能支持到 HTTP2.0 协议。同时，由于 openssl 版本做了升级，所以对操作系统或 Linux 系统上面 openssl 库版本也有要求，openssl 需要大于 1.0.2 版本，在同时满足了这样的前提下，我们就可以来配置 Nginx 配置文件以使得 Nginx 支持 HTTP2.0 协议。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server { </span></span>
<span class="line"><span style="color:#E1E4E8;">    listen       </span><span style="color:#79B8FF;">443</span><span style="color:#E1E4E8;"> ssl http2; </span></span>
<span class="line"><span style="color:#E1E4E8;">    charset      utf</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">    server_name  www.imoocc.com imoocc.com; </span></span>
<span class="line"><span style="color:#E1E4E8;">    access_log  </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">opt</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">app</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">jeson</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">logs</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">https_access.log  main; </span></span>
<span class="line"><span style="color:#E1E4E8;">    error_log  </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">opt</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">app</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">jeson</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">logs</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">https_error.log; </span></span>
<span class="line"><span style="color:#E1E4E8;">             </span></span>
<span class="line"><span style="color:#E1E4E8;">    ssl_certificate </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">jeson</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">key</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">www.imoocc.com.pem; </span></span>
<span class="line"><span style="color:#E1E4E8;">    ssl_certificate_key </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">jeson</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">key</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">www.imoocc.com.key; </span></span>
<span class="line"><span style="color:#E1E4E8;">    ssl_session_timeout 5m; </span></span>
<span class="line"><span style="color:#E1E4E8;">    ssl_ciphers ECDHE</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">RSA</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">AES128</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">GCM</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">SHA256</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">ECDHE</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">ECDH</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">AES</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">HIGH</span><span style="color:#F97583;">:!</span><span style="color:#E1E4E8;">NULL</span><span style="color:#F97583;">:!</span><span style="color:#E1E4E8;">aNULL</span><span style="color:#F97583;">:!</span><span style="color:#E1E4E8;">MD5</span><span style="color:#F97583;">:!</span><span style="color:#E1E4E8;">ADH</span><span style="color:#F97583;">:!</span><span style="color:#E1E4E8;">RC4; </span></span>
<span class="line"><span style="color:#E1E4E8;">    ssl_protocols TLSv1 TLSv1.</span><span style="color:#FDAEB7;font-style:italic;">1</span><span style="color:#E1E4E8;"> TLSv1.</span><span style="color:#FDAEB7;font-style:italic;">2</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">    ssl_prefer_server_ciphers on; </span></span>
<span class="line"><span style="color:#E1E4E8;">    ... </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server { </span></span>
<span class="line"><span style="color:#24292E;">    listen       </span><span style="color:#005CC5;">443</span><span style="color:#24292E;"> ssl http2; </span></span>
<span class="line"><span style="color:#24292E;">    charset      utf</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">8</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">    server_name  www.imoocc.com imoocc.com; </span></span>
<span class="line"><span style="color:#24292E;">    access_log  </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">opt</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">app</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">jeson</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">logs</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">https_access.log  main; </span></span>
<span class="line"><span style="color:#24292E;">    error_log  </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">opt</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">app</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">jeson</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">logs</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">https_error.log; </span></span>
<span class="line"><span style="color:#24292E;">             </span></span>
<span class="line"><span style="color:#24292E;">    ssl_certificate </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">jeson</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">key</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">www.imoocc.com.pem; </span></span>
<span class="line"><span style="color:#24292E;">    ssl_certificate_key </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">jeson</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">key</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">www.imoocc.com.key; </span></span>
<span class="line"><span style="color:#24292E;">    ssl_session_timeout 5m; </span></span>
<span class="line"><span style="color:#24292E;">    ssl_ciphers ECDHE</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">RSA</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">AES128</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">GCM</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">SHA256</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">ECDHE</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">ECDH</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">AES</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">HIGH</span><span style="color:#D73A49;">:!</span><span style="color:#24292E;">NULL</span><span style="color:#D73A49;">:!</span><span style="color:#24292E;">aNULL</span><span style="color:#D73A49;">:!</span><span style="color:#24292E;">MD5</span><span style="color:#D73A49;">:!</span><span style="color:#24292E;">ADH</span><span style="color:#D73A49;">:!</span><span style="color:#24292E;">RC4; </span></span>
<span class="line"><span style="color:#24292E;">    ssl_protocols TLSv1 TLSv1.</span><span style="color:#B31D28;font-style:italic;">1</span><span style="color:#24292E;"> TLSv1.</span><span style="color:#B31D28;font-style:italic;">2</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">    ssl_prefer_server_ciphers on; </span></span>
<span class="line"><span style="color:#24292E;">    ... </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>配置如上，对于 http2.0 协议的支持 Nginx 配置文件中在监听的端口后面加入了一个 http2（listen 443 ssl http2），这就配置使得 Nginx 里面支持 HTTP2.0，配置完毕可以重启 Nginx 服务。</p><p>接下来，测试对比 Nginx 分别在 HTTP1.1 和 HTTP2.0+HTTPS 两个场景中性能上的差异，这个测试我们在前端打开浏览器-开发者工具，示例这里先访问的是我的 HTTP1.1协议博客地址（<a href="http://www.jesonc.com" target="_blank" rel="noreferrer">http://www.imoocc.com</a>）。</p>`,7),P=s("p",null,'同时在底端点击鼠标右键，把"协议"这一栏展示出来。在刷新浏览器请求以后，就会看到这样一个页面，这个页里面我们需要重点关注的是三部分，一部分是客户端发起的协议版本类型（Protocol），我们会看到在这一栏里面，向服务端发送的协议版本都是 HTTP1.1。',-1),g=s("p",null,"图中右侧是一个连接和请求上的一些关系以及对应的延迟。我们可以在这张图里面关注到，这些页面的元素并没有做到并行的加载。",-1),H=s("p",null,"图中下方可以看到整体页面加载完毕后的时长（Finish 8.22s）。",-1),m=s("p",null,[a("我们同样对比通过 HTTP2.0 + HTTPS 访问的这个页面效果，服务端代理 Nginx 中配置完 HTTP2.0 的支持以后，我的浏览器再访问博客站点（地址： "),s("a",{href:"https://www.imoocc.com",target:"_blank",rel:"noreferrer"},"https://www.imoocc.com"),a("）。")],-1),d=s("p",null,"首先是请求协议变化，我们会看到 Chrome 的开发者工具中 Protocol 这一栏是 HTTP2.0 的协议版本。",-1),A=l(`<p>另外在图的右边元素更多并行的方式加载，最后会看到整个页面的加载时长会略低于前面这张图的时长，因为 HTTPS 本身在整个页面的响应时就会增加，即使这样用HTTP2.0+HTTPS也能明显感觉到页面的加载速度优于 HTTP1.1 协议页面的加载速度。</p><h4 id="nginx-配置服务端推送" tabindex="-1">Nginx 配置服务端推送 <a class="header-anchor" href="#nginx-配置服务端推送" aria-label="Permalink to &quot;Nginx 配置服务端推送&quot;">​</a></h4><p>接下来我们再来演示一个案例-服务端的主动推送，这个支持要求 Nginx 版本大于或等于 1.13.9 的版本，Nginx 的配置如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server_name  www.imoocc.com; </span></span>
<span class="line"><span style="color:#E1E4E8;"> root </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">test;  </span></span>
<span class="line"><span style="color:#E1E4E8;"> index index.html index.htm;  </span></span>
<span class="line"><span style="color:#E1E4E8;"> location </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">index.html {    </span></span>
<span class="line"><span style="color:#E1E4E8;"> http2_push </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">css</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">style.css;  </span></span>
<span class="line"><span style="color:#E1E4E8;"> http2_push </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">js</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">main.js;  </span></span>
<span class="line"><span style="color:#E1E4E8;"> http2_push </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">img</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">yule.jpg;  </span></span>
<span class="line"><span style="color:#E1E4E8;"> http2_push </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">img</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">avatar.jpg;   </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server_name  www.imoocc.com; </span></span>
<span class="line"><span style="color:#24292E;"> root </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">test;  </span></span>
<span class="line"><span style="color:#24292E;"> index index.html index.htm;  </span></span>
<span class="line"><span style="color:#24292E;"> location </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">index.html {    </span></span>
<span class="line"><span style="color:#24292E;"> http2_push </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">css</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">style.css;  </span></span>
<span class="line"><span style="color:#24292E;"> http2_push </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">js</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">main.js;  </span></span>
<span class="line"><span style="color:#24292E;"> http2_push </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">img</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">yule.jpg;  </span></span>
<span class="line"><span style="color:#24292E;"> http2_push </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">img</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">avatar.jpg;   </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如果用户请求 index.html 页面（首页），那么服务通过配置项 http2_push+ 加上对应的资源路径。</p><p>这就表示服务端会主动推送这些元素（/css/style.css、/js/main.js、/img/yule.jpg、/img/avatar.jpg）给到客户端，同样通过浏览器的开发者工具在客户端分析，会明显地看到页面加载元素展示上 Push *** 展示方式，这个就表示打开这个页面服务端主动推送过来的页面元素。</p>`,6),D=s("p",null,"那么我们再来介绍一下 HTTP3.0 优化 HTTP2.0 的哪些内容，HTTP3.0 最大的特点就是支持了 QUIC 协议，QUIC 协议最大的优化方式就是解决了 HTTPS 会话缓存的问题（课时 2 有讲解会话缓存的原理），在客户端缓存 HTTPS 认证回话信息，再一次访问服务端的时候，就可以不用重新建立 HTTPS 会话了，而是在原有认证信息的基础上，直接建立连接。这种方式优化了 HTTPS 这种多次建立连接的问题，由于页面建连速度非常快，所以专业术语称呼为 0RTT 建连**。**",-1),x=s("p",null,"另外，虽然 HTTP2.0 虽然解决了 TCP 连接阻塞问题，但是还是存在对列头阻塞的情况，HTTP3.0 中 QUIC 协议就完全不使用 TCP 报文了，而是使用了 UDP 的报文，由于UDP是无连接的，一个连接上的多个 stream 之间没有依赖，数据包阻塞不会影响后面报文正常传送。另外，因为 TCP 是基于 IP 和端口去识别连接的，这种方式在移动端网络等弱网环境造成影响连接的成功率下降，而 QUIC 是通过 ID 的方式去识别一个连接，不管你网络环境如何变化，只要 ID 不变，就能迅速重连上。",-1);function u(C,F,S,N,v,w){const n=e("Image");return t(),c("div",null,[E,y,i,T,p(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/3A/5C/CgqCHl8hWe-ABsyqAABPxZNtCbI636.png"}),a(),h,p(n,{alt:"image1.png",src:"https://s0.lgstatic.com/i/image/M00/3A/5C/CgqCHl8hWhOANgePAAIKBW6JBzk016.png"}),a(),_,p(n,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/3A/51/Ciqc1F8hWmOAPL8qAAIV_f1lXdE332.png"}),a(),P,g,H,m,d,p(n,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/3A/5C/CgqCHl8hWnGAW0_eAALw9UqakRE997.png"}),a(),A,p(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/3A/51/Ciqc1F8hWpOAD5wgAATOaZqbqn0907.png"}),a(),D,x])}const j=o(r,[["render",u]]);export{f as __pageData,j as default};

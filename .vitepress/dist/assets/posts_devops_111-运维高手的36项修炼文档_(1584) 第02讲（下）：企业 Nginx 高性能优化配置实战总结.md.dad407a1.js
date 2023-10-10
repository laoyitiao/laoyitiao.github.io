import{_ as n,j as o,o as t,g as i,k as s,h as p,Q as e}from"./chunks/framework.cfb14fe0.js";const P=JSON.parse('{"title":"第02讲（下）：企业Nginx高性能优化配置实战总结","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1584) 第02讲（下）：企业 Nginx 高性能优化配置实战总结.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1584) 第02讲（下）：企业 Nginx 高性能优化配置实战总结.md","lastUpdated":1696682708000}'),c={name:"posts/devops/111-运维高手的36项修炼文档/(1584) 第02讲（下）：企业 Nginx 高性能优化配置实战总结.md"},r=e('<h1 id="第02讲-下-企业nginx高性能优化配置实战总结" tabindex="-1">第02讲（下）：企业Nginx高性能优化配置实战总结 <a class="header-anchor" href="#第02讲-下-企业nginx高性能优化配置实战总结" aria-label="Permalink to &quot;第02讲（下）：企业Nginx高性能优化配置实战总结&quot;">​</a></h1><br><p>如果你作为网站类的技术工程师，并且把 Nginx 作为代理入口的 HTTP 网关，这时对于网站优化有效的方式除了需要考虑基础配置优化外，更有用的方式就是优化缓存，这一课时我们就详细讲解缓存配置优化的具体内容。</p><br><p>用到缓存优化主要期望提高网站服务访问效率，减少服务端的性能使用。</p><br><p>我将缓存配置优化大致可以分为几个部分，分别是浏览器缓存优化、代理缓存优化、HTTPS SSL 缓存优化、KV 服务缓存优化等。</p><br><p>接下来我们来了解一个问题，客户端如何直观的看到大部分缓存（浏览器缓存、代理缓存、ssl缓存）优化效果呢？推荐你用 Chrome 浏览器中的开发者工具，打开浏览器并点击视图-开发者工具。如我在在 URL 地址栏中输入 www.jesonc.com。这个时候我们会看到在 Network 标签栏中会出现对应的访问名称、路径。然后点击某一个路径，这时会在 Headers 中看到响应的头信息内容。</p><br><p>我们刚用浏览器打开 www.jesonc.com 这个网站，表示浏览器发送一次 HTTP 请求，我们能看到服务端会返回给客户端代码经过渲染后的一个效果展示。如果点击右键查看源代码，这样就可以看到网站返回的 body 内容。除了 body 之外，一个完整的 HTTP 响应，服务端返回给客户端还有一部分就是 Response Headers，表示服务端返回给客户端的头信息 内容。</p><br><p>如上是带你体会的一次 HTTP 请求和响应的过程，本课程中如果我们想判断服务端有没有做缓存，缓存的时间是多长。这些内容都会在头信息中通过服务端展示给客户端，我们可以在 Response Headers 查看头信息。</p><br><p>如expires 头信息是控制在什么时间点生成的缓存元素，Cache Control 负责保存这个元素需要缓存多长时间。</p><br><p>那这一部分内容总结下，用Chrome 开发者工具让我们能够非常清晰的看到一次页面的打开效果，了解它的请求了是什么（请求头），服务端返回了什么（ body及返回 头信息），通过这个工具详细的查看数据并对一个页面缓存情况进行分析，对于开发和运维同学而言是必须要掌握的。</p><h3 id="缓存优化" tabindex="-1">缓存优化 <a class="header-anchor" href="#缓存优化" aria-label="Permalink to &quot;缓存优化&quot;">​</a></h3><p>接下来我们讲解缓存优化配置，基于缓存元素存放的位置，再对我们所需要讲的缓存作一个分类。</p><br><p>如果缓存的元素在客户端的，那么主要有浏览器缓存和 HTTPS 缓存，你可别认为缓存文件是在客户端，这两部分缓存效果都可以 Nginx 这种代理来进行设置并作主要优化。</p><br><p>另外一个种类代理端的缓存（也就是缓存文件存放再代理服务的节点中），那Nginx 作为反向代理服务的时候，可以支持代理缓存设置。</p><br><p>最后一个种类是将缓存文件放入后台服务（通过后台服务中程序逻辑来实现）,例如我们可以将一部分数据通过此方式缓存，比如将用户最长查看的数据（网站中登录状态、连接数等）缓存到 Memcache、Redis 中，避免直接请求关系型数据库或其他服务，因为效用效率更高所以可以降低后端的延迟，也减少请求对数据库的依赖度，从而整个网站的性能也会有很大的提升。</p><br><p>只考虑缓存最优的话，我有三点经验可以分享给你：</p><ol><li><p>缓存越靠前越好，通常情况下整个网站的元素内容越靠前越好，也就是说能放在客户端的就放在客户端，而不要放到后端去频繁请求。</p></li><li><p>缓存的数据越多越好，也就是能在本层级缓存的数据越多，就越可以减少对后端的请求。</p></li><li><p>缓存的命中率越高越好，如果设置了很多缓存，但命中率不高，同样还是会造成穿透到后端访问，此时还需要考虑将缓存的命中率设置的越高，这时观察指标，会发现缓存效果越优。</p></li></ol><p>通常而言，一个网站如果做了缓存优化可以比没做缓存优化的性能提升几倍以上。</p><br><p>刚刚介绍的缓存分类，接下来我们再结合 Nginx 具体了解一下，如何来设置缓存。</p><h3 id="浏览器缓存" tabindex="-1">浏览器缓存 <a class="header-anchor" href="#浏览器缓存" aria-label="Permalink to &quot;浏览器缓存&quot;">​</a></h3><p>第一个就是浏览器缓存，浏览器缓存通常是缓存到客户端(如：浏览器、客户端app)，这就是浏览器缓存。</p><br><p>对于浏览器这部分缓存数据，我们通常可以把静态元素，比如用户请求的图片、CSS 、JS 等元素缓存到客户端。这种缓存可以通过 Nginx配置中的 expires 配置项进行设置，expires 后面可以加具体的时间，也可以加对应的特定意义的数值，比如 -1 表示永久缓存，max 设置最大周期缓存（默认缓存周期为 10 年），需要做具体的时间的设置可以写入具体的时间周期，比如一个小时或是一天。</p><h3 id="https-配置优化" tabindex="-1">HTTPS 配置优化 <a class="header-anchor" href="#https-配置优化" aria-label="Permalink to &quot;HTTPS 配置优化&quot;">​</a></h3><p>第 2 个缓存设置方式需要对 HTTPS 访问进行缓存优化，因为当前我们很多网站通常在开启 HTTPS ，当开启https后客户端访问服务端打开一次浏览器，通过https方式会比 HTTP 请求握手会要增加很多次从而延迟也增加了。这时就需要考虑 HTTPS 是否有更好的优化方案来减少客户端和服务端请求。</p><br>',38),l=e('<br><p>如图中是一个https请求过程，实际在进行 HTTPS 请求之前的需要进行TCP 的三次握手过程，而这里我只是描述 HTTPS 的建连过程，客户端发送 hello 报文，服务端发送证书，客户端进行加密，服务端验证加密。这时开始进行服务端与客户端的传输。我们看到整个 HTTPS 建连增加了部分的证书加密的协商。</p><br><p>多次的连接对于用户及服务端而言，性能和延迟都会增加很多。并且如果每一次浏览器跟服务端断开连接以后，又要进行一次整体的建立连接的过程。为了减少客户端和服务端的断开重连过程，这时就需要 在Nginx中配置 ssl_session_cache 发挥作用。</p><br><p>下面我们来说下这个配置原理，当浏览器跟服务端建立第一次加密证书验证的会话后，服务端会给客户端浏览器缓存一个 SessionKey，，如果客户端跟服务端再次断开连接，这时浏览器就可以拿 SessionKey 直接跟服务端进行交互。只需要进行一次校验，就可以开始数据传输。我们看到有了 SessionKey 这种方式后，就可以避免浏览器跟服务端频繁的进行 HTTPS 会话的建联。</p><br><p>通过在 Nginx 中添加 ssl_session_cache 配置，配置中分配 Nginx 在处理 SSL 会话所需要开辟的共享内存的空间，我这里这里设置值为 10 MB，第二个参数就是设置 SSL SessionKey 的超时时间，这里设置的为 10 分钟，也就是每隔 10 分钟需要重新再进行一次建联，这是一个在服务端的超时时间。</p><br><p>好了，上面就是对 HTTPS 在会话层进行的缓存优化示例。</p><h3 id="打开文件缓存" tabindex="-1">打开文件缓存 <a class="header-anchor" href="#打开文件缓存" aria-label="Permalink to &quot;打开文件缓存&quot;">​</a></h3><p>第 3 个就是打开文件缓存，打开文件缓存设置在 Nginx 端，通常而言我们会把一些静态元素（如：JPG、CSS、GS）在代理端通过这种方式进行设置，这里 Nginx 缓存的是静态元素的元数据。那么把元数据缓存到 Nginx 端有什么好处？元数据的作用就是缓存打开用户所请求的静态元素的文件路径等信息，那么如果在本地频繁地查找之前请求过的静态元素文件而没有缓存元数据时效率比较低，而如果我们把一部分索引数据缓存到 Nginx 的 Cache 下，这种频繁访问就可以很大地提高访问效率。</p><p>我们来看 open_file_cache 具体的设置策略，max 表示最大能够缓存的文件个数，inactive 表示最少的用户使用次数。我们结合看一下，这个表示在 20 秒内最小需要使用两次。如果没有使用的话，就会把元数据删掉，也这就是一个淘汰元数据的策略。</p><br><p>open_file_cache_valid 是设置主动更新和检查的时间，表示每隔 30 秒检查缓存文件的元信息有没有对应的更新，如果有更新就需要去做对应的更新，它是一个更新的策略。</p><h3 id="代理缓存优化" tabindex="-1">代理缓存优化 <a class="header-anchor" href="#代理缓存优化" aria-label="Permalink to &quot;代理缓存优化&quot;">​</a></h3>',16),_=e(`<br><p>最后一个内容就是代理缓存的优化了，代理缓存比较常见，比如说代理 访问PHP 后台服务并作缓存，也可以代理 JAVA 服务，缓存 JAVA后台服务的返回数据，注意这里不局限于通过 http_proxy来作代理缓存，只要 Nginx 支持的代理模式(UWSGI、SGI)都可以设置代理缓存。你可以来看一下通过http_proxy设置的如下示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">proxy_cache_path /path/to/cache levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=60m\vlocation / {</span></span>
<span class="line"><span style="color:#E1E4E8;">        proxy_cache my_cache;</span></span>
<span class="line"><span style="color:#E1E4E8;">        …</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">proxy_cache_path /path/to/cache levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=60m\vlocation / {</span></span>
<span class="line"><span style="color:#24292E;">        proxy_cache my_cache;</span></span>
<span class="line"><span style="color:#24292E;">        …</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>proxy_cache_path 表示在本地分配哪个路径来存储并缓存后台返回数据；cache levels 表示存放文件的分层方式；my_cache:10m max_size=10g 分别表示是开辟一个名为my_cache共享块（用于统计访问次数）及缓存的单个文件的最大大小等。</p><br><p>这些都是做对应的缓存在本地的文件目录相关属性的一些设置。另外一块的设置表示在proxy_cache 的时候，通过 location 引用到 cache 的名称。</p><br><p>代理缓存的特性是什么呢？首先通过 Nginx 作代理，可以支持实现动静态的分离，静态元素直接交给 Nginx 来处理，再把后端动态数据适当作缓存。通常做这种代理+缓存的架构，是能有效的提高整体网站的访问并发性能。</p><br><p>对于我们提到的服务端的缓存优化大多交给开发来做，这里就不再做非 Nginx 的缓存配置的讲解了。</p><h3 id="缓存使用注意问题" tabindex="-1">缓存使用注意问题 <a class="header-anchor" href="#缓存使用注意问题" aria-label="Permalink to &quot;缓存使用注意问题&quot;">​</a></h3><p>对于缓存的整体使用，之前说的缓存越多越好，越靠前越好，命中率越高越好，但是同时我们也需要综合考虑，并且注意缓存在使用时遇到的一些实际问题。</p><ol><li><p>文件更新策略问题。文件后端做缓存的配置策略的时候，要考虑到缓存的删除策略、更新策略，怎么保证它的后端数据更新对于前端用户能够及时的感知。</p></li><li><p>缓存命中率失败给后端造成的瞬间压力。我们知道，当前端缓存的元素越多，命中率越高，对于后台的压力就越少。当一旦前段的缓存失效，或者某个节点迁移，或者某一部分的前端头信息失效，造成后端缓存瞬间压力，就可能会造成比较灾难性的后果。所以你在网站设计的时候也需要考虑，怎么去避免这种缓存失效？一旦前端缓存失效，你怎么保证后端服务的高可用而不受影响？</p></li><li><p>多节点缓存一致性。你在做缓存设置的时候也需要考虑到，假设前端有很多个节点，保存同样的一部分内容的时候，怎么保证这些数据是能够达到一致性，这个时候也涉及缓存架构的设计，前端的缓存节点的更新策略，这些也是你在实际使用缓存时应该注意的问题。</p></li></ol><br><p>提本专栏课中的所有案例配置及源代码，你可以课后通过<a href="http://www.jesonc.com/jeson/2020/02/07/ywgs36/" target="_blank" rel="noreferrer">http://www.jesonc.com/jeson/2020/02/07/ywgs36/</a>自己下载，密码为：mukelaoshi。</p>`,15);function h(d,T,x,b,g,m){const a=o("Image");return t(),i("div",null,[r,s(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/67/84/Cgq2xl5Li8uABNYPAADrCiQf_mE895.png"}),p(),l,s(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/67/84/Cgq2xl5Li66AdSdZAACCZvpT1KM925.png"}),p(),_])}const y=n(c,[["render",h]]);export{P as __pageData,y as default};

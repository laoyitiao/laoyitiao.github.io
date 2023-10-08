import{_ as o,j as p,o as t,g as e,k as n,h as l,Q as s}from"./chunks/framework.a0d18f64.js";const T=JSON.parse('{"title":"第06讲：浏览器如何渲染页面？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3177) 第06讲：浏览器如何渲染页面？.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3177) 第06讲：浏览器如何渲染页面？.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/前端高手进阶_文档/(3177) 第06讲：浏览器如何渲染页面？.md"},i=s(`<h1 id="第06讲-浏览器如何渲染页面" tabindex="-1">第06讲：浏览器如何渲染页面？ <a class="header-anchor" href="#第06讲-浏览器如何渲染页面" aria-label="Permalink to &quot;第06讲：浏览器如何渲染页面？&quot;">​</a></h1><p>这一课时我将结合代码实例为你讲解浏览器渲染页面时的流程和步骤。</p><p>先来看一个例子，假如我们在浏览器中输入了一个网址，得到了下面的 html 文件，渲染引擎是怎样通过解析代码生成页面的呢？</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    lagou</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    lagou</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h3 id="从-html-到-dom" tabindex="-1">从 HTML 到 DOM <a class="header-anchor" href="#从-html-到-dom" aria-label="Permalink to &quot;从 HTML 到 DOM&quot;">​</a></h3><h4 id="_1-字节流解码" tabindex="-1">1. 字节流解码 <a class="header-anchor" href="#_1-字节流解码" aria-label="Permalink to &quot;1. 字节流解码&quot;">​</a></h4><p>对于上面的代码，我们看到的是它的字符形式。而浏览器通过 HTTP 协议接收到的文档内容是字节数据，下图是抓包工具截获的报文截图，报文内容为左侧高亮显示的区域（为了查看方便，该工具将字节数据以十六进制方式显示）。当浏览器得到字节数据后，通过&quot;<a href="https://html.spec.whatwg.org/multipage/parsing.html#encoding-sniffing-algorithm" target="_blank" rel="noreferrer">编码嗅探算法</a>&quot;来确定字符编码，然后根据字符编码将字节流数据进行解码，生成截图右侧的字符数据，也就是我们编写的代码。</p><p>这个把字节数据解码成字符数据的过程称之为&quot;<strong>字节流解码</strong>&quot;。</p>`,8),r=s(`<p>我们通过浏览器调试工具查看网络请求时，也是经过了上述操作过程，才能直观地看到字符串。</p><h4 id="_2-输入流预处理" tabindex="-1">2. 输入流预处理 <a class="header-anchor" href="#_2-输入流预处理" aria-label="Permalink to &quot;2. 输入流预处理&quot;">​</a></h4><p>通过上一步解码得到的字符流数据在进入解析环节之前还需要进行一些预处理操作。比如将换行符转换成统一的格式，最终生成规范化的字符流数据，这个把字符数据进行统一格式化的过程称之为&quot;<strong>输入流预处理</strong>&quot;。</p><h4 id="_3-令牌化" tabindex="-1">3. 令牌化 <a class="header-anchor" href="#_3-令牌化" aria-label="Permalink to &quot;3. 令牌化&quot;">​</a></h4><p>经过前两步的数据解码和预处理，下面就要进入重要的解析步骤了。</p><p>解析包含两步，第一步是<strong>将字符数据转化成令牌（Token）</strong> ，第二步是<strong>解析 HTML 生成 DOM 树</strong>。先来说说令牌化，其过程是使用了一种类似状态机的算法，即每次接收一个或多个输入流中的字符；然后根据当前状态和这些字符来更新下一个状态，也就是说在不同的状态下接收同样的字符数据可能会产生不同的结果，比如当接收到&quot;body&quot;字符串时，在标签打开状态会解析成标签，在标签关闭状态则会解析成文本节点。</p><p>这个算法的解析规则较多，在此就不一一列举了，有兴趣的同学可以通过下面这个简单的例子来理解其原理。</p><p>上述 html 代码的标记过程如下：</p><ol><li>初始化为&quot;数据状态&quot;（Data State）；</li><li>匹配到字符 &lt;，状态切换到 &quot;标签打开状态&quot;（Tag Open State）；</li><li>匹配到字符 !，状态切换至 &quot;标签声明打开状态&quot;（Markup Declaration Open State），后续 7 个字符可以组成字符串 DOCTYPE，跳转到 &quot;DOCTYPE 状态&quot;（DOCTYPE State）；</li><li>匹配到字符为空格，当前状态切换至 &quot;DOCTYPE 名称之前状态&quot;（Before DOCTYPE Name State）；</li><li>匹配到字符串 html，创建一个新的 DOCTYPE 标记，标记的名字为 &quot;html&quot; ，然后当前状态切换至 &quot;DOCTYPE 名字状态&quot;（DOCTYPE Name State）；</li><li>匹配到字符 &gt;，跳转到 &quot;数据状态&quot; 并且释放当前的 DOCTYPE 标记；</li><li>匹配到字符 &lt;，切换到 &quot;标签打开状态&quot;；</li><li>匹配到字符 h，创建一个新的起始标签标记，设置标记的标签名为空，当前状态切换至 &quot;标签名称状态&quot;（Tag Name State）；</li><li>从字符 h 开始解析，将解析的字符一个一个添加到创建的起始标签标记的标签名中，直到匹配到字符 &gt;，此时当前状态切换至 &quot;数据状态&quot; 并释放当前标记，当前标记的标签名为 &quot;html&quot; 。</li><li>解析后续的 的方式与 一致，创建并释放对应的起始标签标记，解析完毕后，当前状态处于 &quot;数据状态&quot; ；</li><li>匹配到字符串 &quot;标记&quot; ，针对每一个字符，创建并释放一个对应的字符标记，解析完毕后，当前状态仍然处于 &quot;数据状态&quot; ；</li><li>匹配到字符 &lt;，进入 &quot;标签打开状态&quot; ；</li><li>匹配到字符 /，进入 &quot;结束标签打开状态&quot;（End Tag Open State）；</li><li>匹配到字符 b，创建一个新的结束标签标记，设置标记的标签名为空，当前状态切换至&quot;标签名称状态&quot;（Tag Name State）；</li><li>重新从字符 b 开始解析，将解析的字符一个一个添加到创建的结束标签标记的标签名中，直到匹配到字符 &gt;，此时当前状态切换至 &quot;数据状态&quot; 并释放当前标记，当前标记的标签名为 &quot;body&quot;；</li><li>解析 的方式与 一样；</li><li>所有的 html 标签和文本解析完成后，状态切换至 &quot;数据状态&quot; ，一旦匹配到文件结束标志符（EOF），则释放 EOF 标记。</li></ol><p>最终生成类似下面的令牌结构：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">开始标签:html</span></span>
<span class="line"><span style="color:#E1E4E8;">  开始标签:head</span></span>
<span class="line"><span style="color:#E1E4E8;">  结束标签:head</span></span>
<span class="line"><span style="color:#E1E4E8;">  开始标签:body</span></span>
<span class="line"><span style="color:#E1E4E8;">    字符串:lagou</span></span>
<span class="line"><span style="color:#E1E4E8;">  结束标签:body</span></span>
<span class="line"><span style="color:#E1E4E8;">结束标签:html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">开始标签:html</span></span>
<span class="line"><span style="color:#24292E;">  开始标签:head</span></span>
<span class="line"><span style="color:#24292E;">  结束标签:head</span></span>
<span class="line"><span style="color:#24292E;">  开始标签:body</span></span>
<span class="line"><span style="color:#24292E;">    字符串:lagou</span></span>
<span class="line"><span style="color:#24292E;">  结束标签:body</span></span>
<span class="line"><span style="color:#24292E;">结束标签:html</span></span></code></pre></div><h4 id="补充-1-遇到-script-标签时的处理" tabindex="-1">补充 1：遇到 script 标签时的处理 <a class="header-anchor" href="#补充-1-遇到-script-标签时的处理" aria-label="Permalink to &quot;补充 1：遇到 script 标签时的处理&quot;">​</a></h4><p>如果在 HTML 解析过程中遇到 script 标签，则会发生一些变化。</p><p>如果遇到的是内联代码，也就是在 script 标签中直接写代码，那么解析过程会暂停，执行权限会转给 JavaScript 脚本引擎，待 JavaScript 脚本执行完成之后再交由渲染引擎继续解析。有一种情况例外，那就是脚本内容中调用了改变 DOM 结构的 document.write() 函数，此时渲染引擎会回到第二步，将这些代码加入字符流，重新进行解析。</p><p>如果遇到的是外链脚本，那么渲染引擎会按照我们在第 01 课时中所述的，根据标签属性来执行对应的操作。</p><h4 id="_4-构建-dom-树" tabindex="-1">4. 构建 DOM 树 <a class="header-anchor" href="#_4-构建-dom-树" aria-label="Permalink to &quot;4. 构建 DOM 树&quot;">​</a></h4><p>解析 HTML 的第二步是树构建。</p><p>浏览器在创建解析器的同时会创建一个 Document 对象。在树构建阶段，Document 会作为根节点被不断地修改和扩充。标记步骤产生的令牌会被送到树构建器进行处理。HTML 5 标准中定义了每类令牌对应的 DOM 元素，当树构建器接收到某个令牌时就会创建该令牌对应的 DOM 元素并将该元素插入到 DOM 树中。</p><p>为了纠正元素标签嵌套错位的问题和处理未关闭的元素标签，树构建器创建的新 DOM 元素还会被插入到一个开放元素栈中。</p><p>树构建算法也可以采用状态机的方式来描述，具体我们以步骤 1 的 HTML 代码为例进行举例说明。</p><ol><li>进入初始状态 &quot;initial&quot; 模式；</li><li>树构建器接收到 DOCTYPE 令牌后，树构建器会创建一个 DocumentType 节点附加到 Document 节点上，DocumentType 节点的 name 属性为 DOCTYPE 令牌的名称，切换到 &quot;before html&quot; 模式；</li><li>接收到令牌 html 后，树构建器创建一个 html 元素并将该元素作为 Document 的子节点插入到 DOM 树中和开放元素栈中，切换为 &quot;before head&quot; 模式；</li><li>虽然没有接收到 head 令牌，但仍然会隐式地创建 head 元素并加到 DOM 树和开放元素栈中，切换到&quot;in head&quot;模式；</li><li>将开放元素栈中的 head 元素弹出，进入 &quot;after head&quot;模式；</li><li>接收到 body 令牌后，会创建一个 body 元素插入到 DOM 树中同时压入开放元素栈中，当前状态切换为 &quot;in body&quot; 模式；</li><li>接收到字符令牌，创建 Text 节点，节点值为字符内容&quot;标记&quot;，将 Text 节点作为 body 元素节点插入到 DOM 树中；</li><li>接收到结束令牌 body，将开放元素栈中的 body 元素弹出，切换至 &quot;after body&quot; 模式；</li><li>接收到结束令牌 html，将开放元素栈中的 html 元素弹出，切换至 &quot;after after body&quot; 模式；</li><li>接收到 EOF 令牌，树构建器停止构建，html 文档解析过程完成。</li></ol><p>最终生成下面的 DOM 树结构：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">              Document</span></span>
<span class="line"><span style="color:#E1E4E8;">             /        \\</span></span>
<span class="line"><span style="color:#E1E4E8;">DocumentType           HTMLHtmlElement</span></span>
<span class="line"><span style="color:#E1E4E8;">                      /               \\</span></span>
<span class="line"><span style="color:#E1E4E8;">       HTMLHeadElement                 HTMLBodyElement</span></span>
<span class="line"><span style="color:#E1E4E8;">                                              |</span></span>
<span class="line"><span style="color:#E1E4E8;">                                          TextNode</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">              Document</span></span>
<span class="line"><span style="color:#24292E;">             /        \\</span></span>
<span class="line"><span style="color:#24292E;">DocumentType           HTMLHtmlElement</span></span>
<span class="line"><span style="color:#24292E;">                      /               \\</span></span>
<span class="line"><span style="color:#24292E;">       HTMLHeadElement                 HTMLBodyElement</span></span>
<span class="line"><span style="color:#24292E;">                                              |</span></span>
<span class="line"><span style="color:#24292E;">                                          TextNode</span></span></code></pre></div>`,23),E=s(`<h4 id="补充-2-从-css-到-cssom" tabindex="-1">补充 2：从 CSS 到 CSSOM <a class="header-anchor" href="#补充-2-从-css-到-cssom" aria-label="Permalink to &quot;补充 2：从 CSS 到 CSSOM&quot;">​</a></h4><p>渲染引擎除了解析 HTML 之外，也需要解析 CSS。</p><p>CSS 解析的过程与 HTML 解析过程步骤一致，最终也会生成树状结构。</p><p>与 DOM 树不同的是，CSSOM 树的节点具有继承特性，也就是会先继承父节点样式作为当前样式，然后再进行补充或覆盖。下面举例说明。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">body { font</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">size</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> 12px }</span></span>
<span class="line"><span style="color:#E1E4E8;">p { font</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">weight</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> light }</span></span>
<span class="line"><span style="color:#E1E4E8;">span { color</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> blue }</span></span>
<span class="line"><span style="color:#E1E4E8;">p span { display</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> none }</span></span>
<span class="line"><span style="color:#E1E4E8;">img { </span><span style="color:#F97583;">float:</span><span style="color:#E1E4E8;"> left }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">body { font</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">size</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> 12px }</span></span>
<span class="line"><span style="color:#24292E;">p { font</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">weight</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> light }</span></span>
<span class="line"><span style="color:#24292E;">span { color</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> blue }</span></span>
<span class="line"><span style="color:#24292E;">p span { display</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> none }</span></span>
<span class="line"><span style="color:#24292E;">img { </span><span style="color:#D73A49;">float:</span><span style="color:#24292E;"> left }</span></span></code></pre></div><p>对于上面的代码，会解析生成类似下面结构的 DOM 树：</p>`,6),d=s('<p>需要注意的是，上图中的 CSSOM 树并不完整，完整的 CSSOM 树还应当包括浏览器提供的默认样式（也称为&quot;User Agent 样式&quot;）。</p><h3 id="从-dom-到渲染" tabindex="-1">从 DOM 到渲染 <a class="header-anchor" href="#从-dom-到渲染" aria-label="Permalink to &quot;从 DOM 到渲染&quot;">​</a></h3><p>有了 DOM 树和 CSSOM 树之后，渲染引擎就可以开始生成页面了。</p><h4 id="_5-构建渲染树" tabindex="-1">5. 构建渲染树 <a class="header-anchor" href="#_5-构建渲染树" aria-label="Permalink to &quot;5. 构建渲染树&quot;">​</a></h4><p>DOM 树包含的结构内容与 CSSOM 树包含的样式规则都是独立的，为了更方便渲染，先需要将它们合并成一棵渲染树。</p><p>这个过程会从 DOM 树的根节点开始遍历，然后在 CSSOM 树上找到每个节点对应的样式。</p><p>遍历过程中会自动忽略那些不需要渲染的节点（比如脚本标记、元标记等）以及不可见的节点（比如设置了&quot;display:none&quot;样式）。同时也会将一些需要显示的伪类元素加到渲染树中。</p><p>对于上面的 HTML 和 CSS 代码，最终生成的渲染树就只有一个 body 节点，样式为 font-size:12px。</p><h4 id="_6-布局" tabindex="-1">6. 布局 <a class="header-anchor" href="#_6-布局" aria-label="Permalink to &quot;6. 布局&quot;">​</a></h4><p>生成了渲染树之后，就可以进入布局阶段了，布局就是计算元素的大小及位置。</p><p>计算元素布局是一个比较复杂的操作，因为需要考虑的因素有很多，包括字体大小、换行位置等，这些因素会影响段落的大小和形状，进而影响下一个段落的位置。</p><p>布局完成后会输出对应的&quot;盒模型&quot;，它会精确地捕获每个元素的确切位置和大小，将所有相对值都转换为屏幕上的绝对像素。</p><h4 id="_7-绘制" tabindex="-1">7. 绘制 <a class="header-anchor" href="#_7-绘制" aria-label="Permalink to &quot;7. 绘制&quot;">​</a></h4><p>绘制就是将渲染树中的每个节点转换成屏幕上的实际像素的过程。得到布局树这份&quot;施工图&quot;之后，渲染引擎并不能立即绘制，因为还不知道绘制顺序，如果没有弄清楚绘制顺序，那么很可能会导致页面被错误地渲染。</p><p>例如，对于使用 z-index 属性的元素（如遮罩层）如果未按照正确的顺序绘制，则将导致渲染结果和预期不符（失去遮罩作用）。</p><p>所以绘制过程中的第一步就是遍历布局树，生成绘制记录，然后渲染引擎会根据绘制记录去绘制相应的内容。</p><p>对于无动画效果的情况，只需要考虑空间维度，生成不同的图层，然后再把这些图层进行合成，最终成为我们看到的页面。当然这个绘制过程并不是静态不变的，会随着页面滚动不断合成新的图形。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一课时主要讲解了浏览器渲染引擎生成页面的 7 个步骤，前面 4 个步骤为 DOM 树的生成过程，后面 3 个步骤是利用 DOM 树和 CSSOM 树来渲染页面的过程。我们想要理解和记忆这些过程其实很简单，那就是以数据变化为线索，具体来说数据的变化过程为：</p><p>字节 → 字符 → 令牌 → 树 → 页面</p><p>最后布置一道思考题：在构建渲染树的时候，渲染引擎需要遍历 DOM 树节点并从 CSSOM 树中找到匹配的样式规则，在匹配过程中是通过自上而下还是自下而上的方式呢？为什么？</p>',21);function h(u,y,m,q,_,g){const a=p("Image");return t(),e("div",null,[i,n(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/12/EE/CgqCHl7OM8-AJ2jzAABvLLJLW2s663.png"}),l(),r,n(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/12/EE/CgqCHl7OM-CAQGiGAAFv6uHi6MI573.png"}),l(),E,n(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/12/E2/Ciqc1F7OM-mAO8T2AAGu2Fxum4w061.png"}),l(),d])}const D=o(c,[["render",h]]);export{T as __pageData,D as default};

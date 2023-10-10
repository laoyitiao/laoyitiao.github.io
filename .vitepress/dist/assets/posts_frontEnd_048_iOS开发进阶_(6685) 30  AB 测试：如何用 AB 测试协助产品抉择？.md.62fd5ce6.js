import{_ as p,j as l,o as t,g as r,k as a,h as n,Q as e,s as o}from"./chunks/framework.cfb14fe0.js";const S=JSON.parse('{"title":"30AB测试：如何用AB测试协助产品抉择？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6685) 30  AB 测试：如何用 AB 测试协助产品抉择？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6685) 30  AB 测试：如何用 AB 测试协助产品抉择？.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/048_iOS开发进阶/(6685) 30  AB 测试：如何用 AB 测试协助产品抉择？.md"},i=e('<h1 id="_30ab测试-如何用ab测试协助产品抉择" tabindex="-1">30AB测试：如何用AB测试协助产品抉择？ <a class="header-anchor" href="#_30ab测试-如何用ab测试协助产品抉择" aria-label="Permalink to &quot;30AB测试：如何用AB测试协助产品抉择？&quot;">​</a></h1><p>你有没有遇到过花了很大精力和时间开发出来的功能却得不到用户认同的尴尬情况？其实，这往往是产品决策方向错误导致的。目前流行的产品抉择方法有以下几种。</p><p><strong>第一种是由产品经理根据经验和个人喜好来决定</strong>，据说乔布斯就是这种类型的产品决策者。他认为无论做出怎样的产品，用户都会买账，所以他可以根据自己的喜好来决定产品的方向。市场上有不少这一类型的产品经理，可是乔布斯只有一个，由于个人认知的局限性，这些产品经理没有办法保证每个决定都是正确的。</p><p>那怎样才能避开因个人喜好而导致决策错误的&quot;坑&quot;呢？这就引出了<strong>第二种产品抉择的办法------用户调研</strong>。用户调研是通过问卷或者面谈的方式来挖掘用户的需求，这种方法对于面向特定群体的 App 会比较有效，例如面向 HR 流程的企业 App，我们可以根据多个 HR 的回答或反馈来筛选出产品需求。</p><p>可是对于面向大众的 App，用户调研往往就很难保证其有效性了，因为会面临诸多问题，比如，调研的问题设计是否合理？所调研的用户是否具有代表性？用户在回答问题时是否如实所想？等等。</p><p>那怎样才能进一步提高产品抉择的有效性呢？这就是今天我们要讲的<strong>第三种办法------A/B 测试</strong>。</p><p><strong>A/B 测试是把用户随机地分成两个或以上的组别，并为各组分发同一功能的不同版本，然后根据留存率、点击率等指标来选择最佳版本。</strong> A/B 测试的概念来源于生物医学的双盲测试。在双盲测试中，我们把病人在不知情的情况随机分成两组，一组使用需要测试的药物，另一组是不使用任何药物的控制组，然后对比两组病人的表现是否具有显著的差异，从而决定测试药物是否有效。</p><p>因此，App 的 A/B 测试有以下三个特征。</p><ol><li><p>A/B 测试需要大量的样本。由于 A/B 测试成本相对比较低，所以我们可以很方便地把测试推送给大量的用户，从而排除结果的偶然性。</p></li><li><p>A/B 测试分组的用户特征需要保持一致。例如，不能把 A 版本只分发给女性用户，B 版本只分发给男性用户，而是要把不同版本无差异地分发给同类用户群，这样才能保证测试的公正性。</p></li><li><p>A/B 测试用户需要在不知情的情况下执行测试。因为一些&quot;额外&quot;的信息可能会影响到用户的思考和习惯，而用户在不知情的情况下，他们就可以很&quot;自然&quot;地按照自身的行为习惯与 App 进行交互，这样就能保证我们收集到用户的真实想法了。</p></li></ol><p>A/B 测试是一种提升用户体验的有效方法。通过 A/B 测试，我们可以把用户交互非常频繁的版本保留下来，并在该版本的基础上不断迭代。同时，A/B 测试也能协助产品经理做出抉择，保证产品方向的正确性。</p><p>下面我们就以 Moments App 作为例子来看看如何架构和实现 A/B 测试模块吧。</p><h3 id="a-b-测试模块的架构与实现" tabindex="-1">A/B 测试模块的架构与实现 <a class="header-anchor" href="#a-b-测试模块的架构与实现" aria-label="Permalink to &quot;A/B 测试模块的架构与实现&quot;">​</a></h3><p>首先我们来看一下 A/B 测试模块的架构图，如下所示：</p>',13),y=e(`<p><strong>A/B 测试模块依赖于 Remote Config 模块</strong> ，而 Remote Config 模块在上一讲中我们已经介绍过了，如有记不清的地方你可以再复习一下。为了支持新的 A/B 测试案例，我们在<code>FirebaseRemoteConfigKey</code>里面增加了一个新的 case，如下代码所示：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">enum</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FirebaseRemoteConfigKey</span><span style="color:#E1E4E8;">: String, RemoteConfigKey {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> isRoundedAvatar</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> likeButtonStyle </span><span style="color:#6A737D;">// 新增用于 A/B 测试的 case</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FirebaseRemoteConfigKey</span><span style="color:#24292E;">: String, RemoteConfigKey {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> isRoundedAvatar</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> likeButtonStyle </span><span style="color:#6A737D;">// 新增用于 A/B 测试的 case</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在 Moments App 里面，我们想通过 A/B 测试来找出哪种点赞按钮的风格更受欢迎。因此，在 A/B 测试模块里面，我们定义了一个枚举类型来表示不同的按钮风格，如下代码所示：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">enum</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LikeButtonStyle</span><span style="color:#E1E4E8;">: String {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> heart, star</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LikeButtonStyle</span><span style="color:#24292E;">: String {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> heart, star</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>LikeButtonStyle</code>的<code>rawValue</code>是字符串类型。因为我们希望测试的按钮风格为心形和星形，所以分别定义了<code>heart</code>和<code>star</code>两个 case。</p><p>有了测试案例以后，我们就可以定义如下的协议：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">protocol</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ABTestProvider</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> likeButtonStyle: LikeButtonStyle</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> { </span><span style="color:#F97583;">get</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">protocol</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ABTestProvider</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> likeButtonStyle: LikeButtonStyle</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> { </span><span style="color:#D73A49;">get</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>ABTestProvider</code>协议包含了所有需要测试的案例，例如，当前需要测试点赞按钮的风格，我们就定义了<code>likeButtonStyle</code>属性。</p><p>接着看一下<code>FirebaseABTestProvider</code>的具体实现：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FirebaseABTestProvider</span><span style="color:#E1E4E8;">: ABTestProvider {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> shared: FirebaseABTestProvider </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> .</span><span style="color:#F97583;">init</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> remoteConfigProvider: RemoteConfigProvider</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">init</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">remoteConfigProvider</span><span style="color:#E1E4E8;">: RemoteConfigProvider </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> FirebaseRemoteConfigProvider.shared) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.remoteConfigProvider </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> remoteConfigProvider</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> likeButtonStyle: LikeButtonStyle</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">guard</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> likeButtonStyleString </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> remoteConfigProvider.</span><span style="color:#79B8FF;">getString</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">by</span><span style="color:#E1E4E8;">: FirebaseRemoteConfigKey.likeButtonStyle) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">LikeButtonStyle</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">rawValue</span><span style="color:#E1E4E8;">: likeButtonStyleString)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FirebaseABTestProvider</span><span style="color:#24292E;">: ABTestProvider {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> shared: FirebaseABTestProvider </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> .</span><span style="color:#D73A49;">init</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> remoteConfigProvider: RemoteConfigProvider</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">init</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">remoteConfigProvider</span><span style="color:#24292E;">: RemoteConfigProvider </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> FirebaseRemoteConfigProvider.shared) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.remoteConfigProvider </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> remoteConfigProvider</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> likeButtonStyle: LikeButtonStyle</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">guard</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> likeButtonStyleString </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> remoteConfigProvider.</span><span style="color:#005CC5;">getString</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">by</span><span style="color:#24292E;">: FirebaseRemoteConfigKey.likeButtonStyle) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">LikeButtonStyle</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">rawValue</span><span style="color:#24292E;">: likeButtonStyleString)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>FirebaseABTestProvider</code>依赖了<code>RemoteConfigProvider</code>来读取 Firebase 的 A/B 测试配置，因此我们在<code>init()</code>方法中通过依赖注入的方式传进了<code>FirebaseRemoteConfigProvider</code>的实例，并赋值给<code>remoteConfigProvider</code>属性。同时，由于<code>FirebaseABTestProvider</code>遵循了<code>ABTestProvider</code>协议，所以必须实现<code>likeButtonStyle</code>属性。在<code>likeButtonStyle</code>属性的代码实现里，我们通过调用<code>remoteConfigProvider.getString(by:)</code>方法取出来自 Firebase 后台配置的点赞按钮风格字符串，然后把该字符串传递给<code>LikeButtonStyle</code>的<code>init(rawValue:)</code>方法进行初始化。假如按钮风格的字符串为空，那<code>likeButtonStyle</code>就会返回<code>nil</code>。</p><p>就这样，我们就完成了 A/B 测试模块的开发，如果我们需要添加其他的测试案例，只需要在<code>ABTestProvider</code>添加一个新的属性，并在<code>FirebaseABTestProvider</code>里实现该新属性即可。</p><h3 id="a-b-测试的使用与配置" tabindex="-1">A/B 测试的使用与配置 <a class="header-anchor" href="#a-b-测试的使用与配置" aria-label="Permalink to &quot;A/B 测试的使用与配置&quot;">​</a></h3><p>下面我们继续以<code>likeButtonStyle</code>为例子看看<strong>如何使用 A/B 测试模块</strong>。</p><p>在 App 里面使用 A/B 测试非常简单，仅仅需要两步。例如，在<code>MomentListItemView</code>里测试点赞按钮的风格，第一步是在<code>init()</code>方法，通过依赖注入的方式把<code>ABTestProvider</code>子类型的实例传递进去，具体代码如下：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> abTestProvider: ABTestProvider</span></span>
<span class="line"><span style="color:#F97583;">init</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">frame</span><span style="color:#E1E4E8;">: CGRect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> .zero, ..., </span><span style="color:#B392F0;">abTestProvider</span><span style="color:#E1E4E8;">: ABTestProvider </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> FirebaseABTestProvider.shared) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.abTestProvider </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> abTestProvider</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#F97583;">init</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">frame</span><span style="color:#E1E4E8;">: frame)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> abTestProvider: ABTestProvider</span></span>
<span class="line"><span style="color:#D73A49;">init</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">frame</span><span style="color:#24292E;">: CGRect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> .zero, ..., </span><span style="color:#6F42C1;">abTestProvider</span><span style="color:#24292E;">: ABTestProvider </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> FirebaseABTestProvider.shared) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.abTestProvider </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> abTestProvider</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#D73A49;">init</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">frame</span><span style="color:#24292E;">: frame)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>因为 Moments App 使用了 Firebase 作为 A/B 测试服务，所以我们就把<code>FirebaseABTestProvider</code>的实例赋值给<code>abTestProvider</code>属性。</p><p>第二步是通过检查<code>abTestProvider</code>的<code>likeButtonStyle</code>属性来控制 UI 的显示，其代码如下：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> abTestProvider.likeButtonStyle {</span></span>
<span class="line"><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> .heart</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    favoriteButton.</span><span style="color:#79B8FF;">asHeartFavoriteButton</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> .star</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    favoriteButton.</span><span style="color:#79B8FF;">asStarFavoriteButton</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> .</span><span style="color:#79B8FF;">none</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果 Firebase 后台没有配置该属性</span></span>
<span class="line"><span style="color:#E1E4E8;">    favoriteButton.</span><span style="color:#79B8FF;">asHeartFavoriteButton</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> abTestProvider.likeButtonStyle {</span></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> .heart</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">    favoriteButton.</span><span style="color:#005CC5;">asHeartFavoriteButton</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> .star</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">    favoriteButton.</span><span style="color:#005CC5;">asStarFavoriteButton</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> .</span><span style="color:#005CC5;">none</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果 Firebase 后台没有配置该属性</span></span>
<span class="line"><span style="color:#24292E;">    favoriteButton.</span><span style="color:#005CC5;">asHeartFavoriteButton</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>当<code>likeButtonStyle</code>属性返回<code>heart</code>时，我们调用 DesignKit 里面的<code>asHeartFavoriteButton()</code>方法来把按钮变成心形。当<code>likeButtonStyle</code>属性返回<code>star</code>时，我们就调用<code>asStarFavoriteButton()</code>方法来把按钮变成星形。</p><p>看完如何使用 A/B 测试模块以后，接下来我们再来看看<strong>如何在 Firebase 后台配置 A/B 测试</strong>。</p><p>首先，我们要打开 Remote Config 页面，并为点赞按钮风格的测试案例里添加一个新配置，如下图里名为 &quot;likeButtonStyle&quot;的配置。</p>`,22),E=o("p",null,'然后在 A/B Testing 页面里点击"Create experiment"按钮，并选择"Remote Config"选项，接下来就可以按照下面罗列的四个步骤来配置一个新 A/B 测试案例了。',-1),d=o("p",null,'第一步是填写测试案例的名称，如下图所示，我们添加了一个名叫"点赞按钮风格"的案例。',-1),A=o("p",null,"第二步是配置需要测试的 App ID，以及测试的覆盖率。基于 App 的用户基数，我们一般选择 1% 到 10% 的用户进行测试。",-1),g=o("p",null,"第三步是配置测试的指标，例如点击率、留存率等。",-1),B=o("p",null,"第四步是配置测试版本（Variant），例如把基础版本配置为心形，而 A 版本设置为星形。",-1),u=o("p",null,'操作完这四个步骤以后，就可以点击"Start experiment"按钮来启动测试案例了。',-1),F=o("p",null,"我们还可以配置测试运行时长，例如一到三个月，当测试运行完毕以后，就能看到测试报告，如下图所示：",-1),v=e('<p>根据报告的结果，我们就能发现哪种按钮风格更受欢迎，然后就可以保留胜出的版本，并移除其他版本。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在这一讲中，我们讲述了如何架构和实现 A/B 测试模块，并且我们还以 Firebase 为例子演示了如何测试不同风格版本的点赞按钮。总之，A/B 测试能很好地协助我们进行产品决策。</p><p>下面我再分享下我使用 A/B 测试过程中的一些经验。进行 A/B 测试的<strong>用户样本必须足够大</strong> ，否则很容易出现误差。同时，测试过程中<strong>一般只分发给 1% 到 10% 的用户</strong> ，在得到结论后才推广到所有的用户。另外，当你得到测试结果时，最好<strong>及时删除</strong>整个测试案例，在 App 里面只保留胜出的版本。</p><p>至此，课程模块四的内容我们就全部讲完了。这个模块由两部分组成：前半部分主要讲述如何使用 fastlane 和 CI 来自动化证书管理、打包和签名，以及上传 App Store 等重复性操作；而后半部分则讲述了如何架构灵活的统计分析、崩溃报告、远程开关以及 A/B 测试模块，并且还为这些模块提供了 Firebase 的实现。如果你的 App 是面向海外市场的，Firebase 是一个不错的选择，它不但可以免费使用，而且简单易用、功能丰富。</p><p><strong>思考题</strong></p><blockquote><p>我们讲了三种产品抉择的方法，请问你一般是使用哪种办法来进行产品抉择的？能分享一下你的经验吗？</p></blockquote><p>请把你的思考与答案写到留言区哦。从下一讲开始就进入加餐部分了，我会先介绍&quot;如何使用 Figma 快速制作 App Icon&quot;的相关内容，记得按时来听课哦。</p><p><strong>源码地址</strong></p><blockquote><p>A/B 测试源码地址：<a href="https://github.com/lagoueduCol/iOS-linyongjian/tree/main/Moments/Moments/Foundations/ABTest?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/iOS-linyongjian/tree/main/Moments/Moments/Foundations/ABTest</a></p></blockquote>',10);function C(h,_,m,b,f,P){const s=l("Image");return t(),r("div",null,[i,a(s,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/43/13/CioPOWC3MDiAAbTIAAKMI8cISRI143.png"}),n(),y,a(s,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/43/13/CioPOWC3MGOABhAsAARfo6cAlsk706.png"}),n(),E,d,a(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/42/40/Cgp9HWCwwE2AYZreAAA0zcXKvOg846.png"}),n(),A,a(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/42/40/Cgp9HWCwwFGAdXP-AABOtCCCSmk794.png"}),n(),g,a(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/42/48/CioPOWCwwFaAccGlAAA8G0M_s84999.png"}),n(),B,a(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/42/48/CioPOWCwwFyASKgzAABW05OPFww377.png"}),n(),u,F,a(s,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/43/0B/Cgp9HWC3MJeAV6xEAALCXmpwiMM187.png"}),n(),v])}const T=p(c,[["render",C]]);export{S as __pageData,T as default};

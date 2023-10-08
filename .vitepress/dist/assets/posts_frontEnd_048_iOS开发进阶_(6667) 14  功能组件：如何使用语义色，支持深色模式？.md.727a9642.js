import{_ as p,j as e,o as t,g as c,k as o,h as a,Q as n,s as l}from"./chunks/framework.a0d18f64.js";const u=JSON.parse('{"title":"14功能组件：如何使用语义色，支持深色模式？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6667) 14  功能组件：如何使用语义色，支持深色模式？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6667) 14  功能组件：如何使用语义色，支持深色模式？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6667) 14  功能组件：如何使用语义色，支持深色模式？.md"},E=n('<h1 id="_14功能组件-如何使用语义色-支持深色模式" tabindex="-1">14功能组件：如何使用语义色，支持深色模式？ <a class="header-anchor" href="#_14功能组件-如何使用语义色-支持深色模式" aria-label="Permalink to &quot;14功能组件：如何使用语义色，支持深色模式？&quot;">​</a></h1><p>从 iOS 13 开始，用户可以从系统级别来把外观模式改成深色模式（Dark mode）。与原有的浅色模式（Light mode）相比，使用深色模式具有以下几大优点：</p><ol><li><p>由于减少发光，使用深色模式能大幅减少电量的消耗，延长 iPhone 的续航能力；</p></li><li><p>对视力不佳或者与对强光敏感的用户更为友好，为他们提供更好的可视性；</p></li><li><p>在暗光环境下，让用户使用手机时更舒服。</p></li></ol><p>那么，我们的 App 怎样才能在支持深色模式呢？下面我将结合咱们的项目案例 Moments App 来介绍下。</p><h3 id="ios-语义色" tabindex="-1">iOS 语义色 <a class="header-anchor" href="#ios-语义色" aria-label="Permalink to &quot;iOS 语义色&quot;">​</a></h3><p>对于深色模式的支持，苹果推荐使用<strong>语义化颜色</strong> （Semantic colors）来进行适配。什么叫语义化颜色呢？语义化颜色是我们根据用途来定义颜色的名称，例如使用在背景上的颜色定义为<code>background</code>，主文本和副文本的颜色分别定义为<code>primaryText</code>和<code>secondaryText</code>。UI 可以通过语义色来灵活地适配用户所选择的外观模式，比如背景在浅色模式下显示为白色，而在深色模式下显示为黑色。</p><p>为了简化深色模式的适配过程，苹果公司提供了具有<strong>语义的系统色</strong> （System colors）和<strong>动态系统色</strong>（Dynamic system colors）供我们使用。</p>',7),y=l("p",null,"iOS 系统色 （来源：developer.apple.com）",-1),i=l("p",null,"上图是苹果开发者网站提供的一个 iOS 系统色，有蓝色、绿色、靛蓝、橙色、黄色等，它们在浅色模式和深色模式下会使用到不同的颜色值。比如蓝色，在浅色模式下，它的 RGB 分别是 0、122、255，在深色模式下则分别为 10、132、255。这样就能保证系统蓝色在不同的外观模式的背景颜色上都能清晰显示。",-1),C=n(`<p>iOS 动态系统色 （来源：developer.apple.com）</p><p>上图显示是 iOS 系统提供的动态系统色的定义。它们都是通过用途来定义各种颜色的名称。例如 <strong>Label</strong> 用于主标签文字的颜色，而 <strong>Secondary label</strong>用于副标签文字的颜色，使用它们就能自动支持不同的外观模式了。</p><h3 id="moments-app-的语义色" tabindex="-1">Moments App 的语义色 <a class="header-anchor" href="#moments-app-的语义色" aria-label="Permalink to &quot;Moments App 的语义色&quot;">​</a></h3><p>为了增强品牌效果，我们一般都会为 App 单独定义一组语义色。下面以 Moments App 为例看看如何在代码中定义语义色。</p><p>根据 07 讲的设计规范，我们在 DesignKit 组件里面自定义了一组语义色，具体代码如下：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extension</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UIColor</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> designKit </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> DesignKitPalette.</span><span style="color:#F97583;">self</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">enum</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DesignKitPalette</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> primary: UIColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dynamicColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">light</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x0770e3</span><span style="color:#E1E4E8;">), </span><span style="color:#79B8FF;">dark</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x6d9feb</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> background: UIColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dynamicColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">light</span><span style="color:#E1E4E8;">: .white, </span><span style="color:#79B8FF;">dark</span><span style="color:#E1E4E8;">: .black)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> secondaryBackground: UIColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dynamicColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">light</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0xf1f2f8</span><span style="color:#E1E4E8;">), </span><span style="color:#79B8FF;">dark</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x1D1B20</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> tertiaryBackground: UIColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dynamicColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">light</span><span style="color:#E1E4E8;">: .white, </span><span style="color:#79B8FF;">dark</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x2C2C2E</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> line: UIColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dynamicColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">light</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0xcdcdd7</span><span style="color:#E1E4E8;">), </span><span style="color:#79B8FF;">dark</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x48484A</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> primaryText: UIColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dynamicColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">light</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x111236</span><span style="color:#E1E4E8;">), </span><span style="color:#79B8FF;">dark</span><span style="color:#E1E4E8;">: .white)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> secondaryText: UIColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dynamicColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">light</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x68697f</span><span style="color:#E1E4E8;">), </span><span style="color:#79B8FF;">dark</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x8E8E93</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> tertiaryText: UIColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dynamicColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">light</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x8f90a0</span><span style="color:#E1E4E8;">), </span><span style="color:#79B8FF;">dark</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x8E8E93</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> quaternaryText: UIColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dynamicColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">light</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0xb2b2bf</span><span style="color:#E1E4E8;">), </span><span style="color:#79B8FF;">dark</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x8E8E93</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dynamicColor</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">light</span><span style="color:#E1E4E8;">: UIColor, </span><span style="color:#B392F0;">dark</span><span style="color:#E1E4E8;">: UIColor) </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> UIColor {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> UIColor { </span><span style="color:#79B8FF;">$0</span><span style="color:#E1E4E8;">.userInterfaceStyle </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> .dark </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> dark </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> light }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extension</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UIColor</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">convenience</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">init</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">Int</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> components </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">R</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">CGFloat</span><span style="color:#E1E4E8;">((hex </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0xff</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">255</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">G</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">CGFloat</span><span style="color:#E1E4E8;">((hex </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">08</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0xff</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">255</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">B</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">CGFloat</span><span style="color:#E1E4E8;">((hex </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">00</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0xff</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">255</span></span>
<span class="line"><span style="color:#E1E4E8;">        )</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.</span><span style="color:#F97583;">init</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">: components.R, </span><span style="color:#79B8FF;">green</span><span style="color:#E1E4E8;">: components.G, </span><span style="color:#79B8FF;">blue</span><span style="color:#E1E4E8;">: components.B, </span><span style="color:#79B8FF;">alpha</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extension</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UIColor</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> designKit </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> DesignKitPalette.</span><span style="color:#D73A49;">self</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DesignKitPalette</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> primary: UIColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dynamicColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">light</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x0770e3</span><span style="color:#24292E;">), </span><span style="color:#005CC5;">dark</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x6d9feb</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> background: UIColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dynamicColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">light</span><span style="color:#24292E;">: .white, </span><span style="color:#005CC5;">dark</span><span style="color:#24292E;">: .black)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> secondaryBackground: UIColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dynamicColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">light</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0xf1f2f8</span><span style="color:#24292E;">), </span><span style="color:#005CC5;">dark</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x1D1B20</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> tertiaryBackground: UIColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dynamicColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">light</span><span style="color:#24292E;">: .white, </span><span style="color:#005CC5;">dark</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x2C2C2E</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> line: UIColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dynamicColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">light</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0xcdcdd7</span><span style="color:#24292E;">), </span><span style="color:#005CC5;">dark</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x48484A</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> primaryText: UIColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dynamicColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">light</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x111236</span><span style="color:#24292E;">), </span><span style="color:#005CC5;">dark</span><span style="color:#24292E;">: .white)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> secondaryText: UIColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dynamicColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">light</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x68697f</span><span style="color:#24292E;">), </span><span style="color:#005CC5;">dark</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x8E8E93</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> tertiaryText: UIColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dynamicColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">light</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x8f90a0</span><span style="color:#24292E;">), </span><span style="color:#005CC5;">dark</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x8E8E93</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> quaternaryText: UIColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dynamicColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">light</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0xb2b2bf</span><span style="color:#24292E;">), </span><span style="color:#005CC5;">dark</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x8E8E93</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dynamicColor</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">light</span><span style="color:#24292E;">: UIColor, </span><span style="color:#6F42C1;">dark</span><span style="color:#24292E;">: UIColor) </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> UIColor {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> UIColor { </span><span style="color:#005CC5;">$0</span><span style="color:#24292E;">.userInterfaceStyle </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> .dark </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> dark </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> light }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extension</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UIColor</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">convenience</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">init</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">Int</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> components </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">R</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">CGFloat</span><span style="color:#24292E;">((hex </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0xff</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">255</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">G</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">CGFloat</span><span style="color:#24292E;">((hex </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">08</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0xff</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">255</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">B</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">CGFloat</span><span style="color:#24292E;">((hex </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">00</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0xff</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">255</span></span>
<span class="line"><span style="color:#24292E;">        )</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.</span><span style="color:#D73A49;">init</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">red</span><span style="color:#24292E;">: components.R, </span><span style="color:#005CC5;">green</span><span style="color:#24292E;">: components.G, </span><span style="color:#005CC5;">blue</span><span style="color:#24292E;">: components.B, </span><span style="color:#005CC5;">alpha</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们为<code>UIColor</code>定义了一个类型扩展（Extension）。为了调用时具有命名空间，我们在这个扩展里定义了一个名叫<code>DesignKitPalette</code>的内嵌枚举类型（Nested enum），然后定义了一个静态属性来引用该枚举。</p><p>首先，我们一起看看<code>DesignKitPalette</code>两个公用的方法。第一个是<code>func dynamicColor(light: UIColor, dark: UIColor) -&gt; UIColor</code>，在该方法里面，我们根据用户当前选择的<code>userInterfaceStyle</code>来返回对应的深色或者浅色。</p><p>第二个方法是通过类型扩展来为<code>UIColor</code>类型添加了一个初始化函数（构造函数）。该初始化函数接收一个<code>Int</code>类型的参数，这个参数保存了一个十六进制的值。函数内部从<code>hex</code>里面取出分别表示红色、绿色和蓝色的<code>R</code>、<code>G</code>和<code>B</code>的值，例如传入的<code>hex</code>是<code>0x0770e3</code>，那么<code>R</code>、<code>G</code>和<code>B</code>的值是分别是<code>07</code>、<code>70</code>和<code>e3</code>, 然后把这些值传递给原有的<code>init(red: CGFloat, green: CGFloat, blue: CGFloat, alpha: CGFloat)</code>初始化函数来生成一个<code>UIColor</code>的实例。</p><p>有了这两个函数以后，我们就可以很方便地定义设计规范里面的各种颜色了。具体来说，只需要把浅色和深色传递给语义色的属性就可。比如，我们的语义色<code>primary</code>所对应的浅色和深色的十六进制分别是<code>0x0770e3</code>和<code>0x6d9feb</code>，那么我们就可以通过这两个值来生成一个支持动态颜色的 UIColor 对象，代码如下所示。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> primary: UIColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dynamicColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">light</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x0770e3</span><span style="color:#E1E4E8;">), </span><span style="color:#79B8FF;">dark</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">UIColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hex</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0x6d9feb</span><span style="color:#E1E4E8;">))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> primary: UIColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dynamicColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">light</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x0770e3</span><span style="color:#24292E;">), </span><span style="color:#005CC5;">dark</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">UIColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hex</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0x6d9feb</span><span style="color:#24292E;">))</span></span></code></pre></div><p>有了这些定义以后，我们可以在代码中很方便地使用它们。代码如下：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">label.textColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> UIColor.designKit.primaryText</span></span>
<span class="line"><span style="color:#E1E4E8;">view.backgroundColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> UIColor.designKit.background</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">label.textColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> UIColor.designKit.primaryText</span></span>
<span class="line"><span style="color:#24292E;">view.backgroundColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> UIColor.designKit.background</span></span></code></pre></div><p>可以看到，我们可以通过<code>UIColor.designKit</code>取出相应的语义色并赋值给类型为<code>UIColor</code>的属性即可。</p><h3 id="测试语义色" tabindex="-1">测试语义色 <a class="header-anchor" href="#测试语义色" aria-label="Permalink to &quot;测试语义色&quot;">​</a></h3><p>当我们的 App 使用了语义色以后，要经常在浅色和深色模式之间来回切换，加以测试，及时发现问题解决问题。要不然在开发过程中可能会因为不小心引入影响可读性的 Bug ，从而降低用户体验。幸运的是，iOS 的 Simulator 为我们提供了一组快捷键<strong>Command + Shift + A</strong>来快速切换外观模式。下面是 Moments App 在不同外观模式下运行的效果。</p><p>从视频上你可以看到，当我按下快捷键<strong>Command + Shift + A</strong>的时候 Moments App 在浅色和深色模式之间自动来回切换。这样能帮我们快速检查界面上文本的可读性。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在这一讲中我介绍了如何通过语义色来灵活支持不同的外观模式，同时以 Moments App 为例子介绍了如何通过<code>UIColor</code>的扩展来自定义语义色。</p><p>当我们的 App 使用了语义色以后，还需要注意以下几点。</p><ol><li><p>不要把深色模式等于黑夜模式或者夜间模式，支持深色模式的 App 在正常光线的环境下也要为用户提供良好的视觉舒适度。</p></li><li><p>App 应该从系统设置里面读取外观模式的信息，而不是让用户在 App 里面进行单独配置。</p></li><li><p>在开发过程中，要经常切换外观模式来测试 App。</p></li><li><p>要在<strong>设置 App</strong> -&gt;<strong>辅助功能</strong> -&gt;<strong>显示与字体大小</strong> 页面中修改<strong>降低透明度</strong> 和<strong>增强对比度</strong>开关，检查深色内容在黑色背景下的可读性。</p></li></ol><p>思考题：</p><blockquote><p>除了上述通过代码的方式以外，我们还可以在资源目录（Asset Catalog）中添加语义色。请问这两种办法各有什么优缺点？</p></blockquote><p>可以把你的想法和答案写到下面的留言区哦，我们下一讲将介绍如何通过 BFF 设计跨平台的系统架构。</p><p><strong>源码地址：</strong></p><blockquote><p>定义语义色的文件地址：<br><a href="https://github.com/lagoueduCol/iOS-linyongjian/blob/main/Frameworks/DesignKit/src/Color/UIColorExtensions.swift?fileGuid=nKuAZ5IZkV8MwDpv" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/iOS-linyongjian/blob/main/Frameworks/DesignKit/src/Color/UIColorExtensions.swift</a></p></blockquote>`,26);function F(d,g,h,B,x,A){const s=e("Image");return t(),c("div",null,[E,o(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/32/20/CioPOWBtbFCAc4E2AADtEG1CRbc357.png"}),a(),y,i,o(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/32/20/CioPOWBtbF6AHsamAACvBohqBt8079.png"}),a(),C,o(s,{alt:"202147-16245.png",src:"https://s0.lgstatic.com/i/image6/M00/32/18/Cgp9HWBtbMaAReZYAAgQoLEBfco091.png"})])}const I=p(r,[["render",F]]);export{u as __pageData,I as default};

import{_ as s,o as a,g as n,Q as l}from"./chunks/framework.f949202b.js";const g=JSON.parse('{"title":"安装 SwiftLint ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6657) 04  编码规范：如何使用 SwiftLint 统一编码规范？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6657) 04  编码规范：如何使用 SwiftLint 统一编码规范？.md","lastUpdated":null}'),e={name:"posts/frontEnd/048_iOS开发进阶/(6657) 04  编码规范：如何使用 SwiftLint 统一编码规范？.md"},p=l(`<p>在软件开发领域有很多有趣且重要的话题，比如使用什么样的系统架构来让代码更容易维护，使用哪些第三方库能提高开发效率，等等。但也有一些话题不仅无趣，还很难得出结论，比如像下面这行变量定义，里面的空格哪个正确？</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">let name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> String </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Jake&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">let name </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> String </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Jake&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">let name </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">String </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Jake&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">let name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> String</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Jake&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">let name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> String</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;Jake&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">let name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> String </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Jake&quot;</span></span>
<span class="line"><span style="color:#24292E;">let name </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> String </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Jake&quot;</span></span>
<span class="line"><span style="color:#24292E;">let name </span><span style="color:#D73A49;">:</span><span style="color:#24292E;">String </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Jake&quot;</span></span>
<span class="line"><span style="color:#24292E;">let name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> String</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Jake&quot;</span></span>
<span class="line"><span style="color:#24292E;">let name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> String</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;Jake&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>还有代码缩减，到底是用 2 个空格还是 4 个？这就像豆浆到底是喝甜的还是喝咸的一样，并没有标准答案。也因此，出现了许多永无休止的讨论。特别是当新成员所提交的代码风格，与团队其他成员有很大的区别时，往往会出现沟通与协作问题，甚至发生争执而影响工作。此时，团队如果有一套统一的编码规范，那么这样的问题就很容易解决。</p><p>除了能促进沟通协作，一套统一的编码规范还能降低代码维护的成本和减少 Bug 的数量。此外，由于规范往往由团队资深开发者指定并不断完善，也有助于其他团队成员快速成长。</p><p>既然统一的编码规范由那么多优点，那么我们如何在团队中实施统一编码规范呢？在 iOS 开发领域，使用 SwiftLint 能有效地建立和改进 Swift 项目的编码规范。接下来我就和你聊聊这方面的内容。</p><h3 id="安装-swiftlint" tabindex="-1">安装 SwiftLint <a class="header-anchor" href="#安装-swiftlint" aria-label="Permalink to &quot;安装 SwiftLint&quot;">​</a></h3><p>安装 SwiftLint 的方式有很多种，例如使用 Homebrew，Mint，下载 SwiftLint.pkg 安装包等等。但我只推荐 CocoaPods 这一种方法，因为通过 CocoaPods 可以有效地管理 SwiftLint 的版本，从而保证团队内各个成员都能使用一模一样的 SwiftLint 及其编码规范。</p><p>通过 CocoaPods 来安装 SwiftLint 非常简单。在 Moments App 项目中，我们在<code>Podfile</code>文件中添加<code>SwiftLint</code>Pod 即可。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pod </span><span style="color:#9ECBFF;">&#39;SwiftLint&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;= 0.41.0&#39;</span><span style="color:#E1E4E8;">, configurations</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;Debug&#39;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pod </span><span style="color:#032F62;">&#39;SwiftLint&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;= 0.41.0&#39;</span><span style="color:#24292E;">, configurations</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;Debug&#39;</span><span style="color:#24292E;">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>由于我们只在开发环境下使用 SwiftLint，因此配置了只有<code>Debug</code>的 Build Configuration 才生效。</p><p>为了每次编译完都使用 SwiftLint 来检查代码，我们需要在主 App Target<strong>Moments</strong> 的 Build Phases 里面添加<strong>Run SwiftLint</strong> 步骤。然后配置它执行<code>&quot;\${PODS_ROOT}/SwiftLint/swiftlint&quot;</code>命令。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/0F/0F/CioPOWA9Et6AK5ZLAAKntpgVJ2o333.png" alt="Drawing 0.png"></p><p>这里要注意，由于 SwiftLint 的设计是检查有效的 Swift 代码（编译通过的代码就是有效的代码），我们需要把<strong>Run SwiftLint</strong> 步骤放在<strong>Compile Source</strong>步骤之后。否则 SwiftLint 可能会反馈一些错误的结果。</p><p>有了上面的配置以后，每次编译程序， SwiftLint 都会自动执行检查，我们可以在 Xcode 上修正这些警告信息来保证编码规范的统一。</p><p>￼<img src="https://s0.lgstatic.com/i/image6/M01/11/28/CioPOWA_X36AaLBrAAH6eimbZ_o003.png" alt="图片1.png"></p><p>例如上面的截图所示，SwiftLint 告诉我们空格的使用不正确。</p><p>那么，这些警告信息到底怎样来的呢？我们一起看看<code>.swiftlint.yml</code>文件吧。</p><h3 id="swiftlint-yml-文件" tabindex="-1">.swiftlint.yml 文件 <a class="header-anchor" href="#swiftlint-yml-文件" aria-label="Permalink to &quot;.swiftlint.yml 文件&quot;">​</a></h3><p>当我们执行 SwiftLint 命令时，它会自动帮我们启动一堆编码规则，并扫描和检查我们的项目。这些规则有<code>comma</code>（逗号前后的空格处理），<code>private_over_fileprivate</code>（优先使用 priviate），<code>force_cast</code>（避免强制转型）等等 。详细规则列表你也可以在<a href="https://realm.github.io/SwiftLint/rule-directory.html" target="_blank" rel="noreferrer">SwiftLint 官网</a>找到。</p><p>但正如 SwiftLint 的作者所说： &quot;规则存在，但并不意味着你必须用它&quot;。我们需要根据团队自身的情况和成员的统一意见，来决定需要启动和关闭哪些规则。此时，就需要用到 .swiftlint.yml 文件了。</p><p><strong>.swiftlint.yml</strong>主要用于启动和关闭 SwiftLint 所提供的规则，以及自定义配置与规则。一旦我们有了 .swiftlint.yml 文件以后，SwiftLint 在执行过程中会严格按照该文件的定义来扫描和检查代码。由于 .swiftlint.yml 是一个纯文本文件，我们可以通过 Git 统一管理，这样能保证整个团队在执行 SwiftLint 的时候都会得到一模一样的效果，从而保证了整个团队代码规范的一致性。</p><h3 id="规则设置" tabindex="-1">规则设置 <a class="header-anchor" href="#规则设置" aria-label="Permalink to &quot;规则设置&quot;">​</a></h3><p>SwiftLint 提供了<code>disabled_rules</code>,<code>opt_in_rules</code>和<code>only_rules</code>三种规则设置方法。其中，￼￼<code>disabled_rules</code>能帮我们关闭默认生效的规则，而<code>opt_in_rules</code>可以启动默认关闭的规则。</p><p>另外，SwiftLint 所提供的每条规则都有一个叫作<strong>Enabled by default</strong> 的属性来表示该规则是否默认启动。例如<code>class_delegate_protocol</code>规则是默认启动的，而<code>array_init</code>规则是默认关闭的。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">disabled_rules</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> class_delegate_protocol</span></span>
<span class="line"><span style="color:#E1E4E8;">opt_in_rules</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> array_init</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">disabled_rules</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> class_delegate_protocol</span></span>
<span class="line"><span style="color:#24292E;">opt_in_rules</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> array_init</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>上面的配置表示，关闭默认生效的<code>class_delegate_protocol</code>，并同时启动<code>array_init</code>。</p><p>虽然使用<code>disabled_rules</code>和<code>opt_in_rules</code>能够完成配置，但我不推荐你使用它们 ，而是用<code>only_rules</code>来定义每条生效的规则。</p><p>我们在 Moments App 项目中也使用了<code>only_rules</code>。你可以在<a href="https://github.com/lagoueduCol/iOS-linyongjian/blob/main/Moments/.swiftlint.yml" target="_blank" rel="noreferrer">拉勾教育的代码仓库</a>找到该 .swiftlint.yml 文件来查看项目启动的所有规则。由于<code>only_rules</code>是 SwiftLint 0.41.0 引入的，如果你需要以前版本，可以使用<code>whitelist_rules</code>来替代。下面是 .swiftlint.yml 文件中的部分规则。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">only_rules</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> array_init</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> attributes</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> block_based_kvo</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> class_delegate_protocol</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> closing_brace</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">only_rules</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> array_init</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> attributes</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> block_based_kvo</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> class_delegate_protocol</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> closing_brace</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>通过<code>only_rules</code>，我们可以把每一条规则明确添加到 SwiftLint 里面。这样能保证我们整个团队都使用一致的规则，而不会像使用<code>disabled_rules</code>和<code>opt_in_rules</code>那样，随着 SwiftLint 默认规则的改变，导致最终启动的规则不一样。</p><h4 id="自定义配置" tabindex="-1">自定义配置 <a class="header-anchor" href="#自定义配置" aria-label="Permalink to &quot;自定义配置&quot;">​</a></h4><p>在我们配置一条规则的时候，为了符合团队自身的情况，可以修改其默认配置。例如<code>line_length</code>的默认配置是当一行代码多于 120 个字符的时候会报告编译警告，而多于 200 个字符的时候报告编译错误。</p><p><img src="https://s0.lgstatic.com/i/image6/M01/11/2B/Cgp9HWA_X6yAHMc8AAHVx2uT2fY153.png" alt="图片2.png"><br> 来源：SwiftLintFramework Docs</p><p>我们可以在 .swiftlint.yml 文件中修改这些配置。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">line_length</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">110</span></span>
<span class="line"><span style="color:#E1E4E8;">file_length</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  warning</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">500</span></span>
<span class="line"><span style="color:#E1E4E8;">  error</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1200</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">line_length</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">110</span></span>
<span class="line"><span style="color:#24292E;">file_length</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  warning</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">500</span></span>
<span class="line"><span style="color:#24292E;">  error</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1200</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>上述的配置表示我们修改了<code>line_length</code>的配置，当一行代码多于 110 个字符（而不是默认的 120 个字符）时就会报告编译警告。我们也可以同时覆盖编译警告和编译错误的配置，例如把<code>file_length</code>的编译警告改成 500，而编译错误改成 1200。</p><h4 id="自定义规则" tabindex="-1">自定义规则 <a class="header-anchor" href="#自定义规则" aria-label="Permalink to &quot;自定义规则&quot;">​</a></h4><p>除了 SwiftLint 所提供的默认规则以外，我们还可以自定义规则。例如在 Moments App 项目中，我就自定义了&quot;不能硬编码字符串&quot;的规则，具体如下：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">custom_rules</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  no_hardcoded_strings</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    regex</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;([A-Za-z]+)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    match_kinds</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> string</span></span>
<span class="line"><span style="color:#E1E4E8;">    message</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Please do not hardcode strings and add them to the appropriate \`Localizable.strings\` file; a build script compiles all strings into strongly typed resources available through \`Generated/Strings.swift\`, e.g. \`L10n.accessCamera&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    severity</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> warning</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">custom_rules</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  no_hardcoded_strings</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">    regex</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;([A-Za-z]+)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    match_kinds</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> string</span></span>
<span class="line"><span style="color:#24292E;">    message</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Please do not hardcode strings and add them to the appropriate \`Localizable.strings\` file; a build script compiles all strings into strongly typed resources available through \`Generated/Strings.swift\`, e.g. \`L10n.accessCamera&quot;</span></span>
<span class="line"><span style="color:#24292E;">    severity</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> warning</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>该规则<code>no_hardcoded_strings</code>会通过正则表达式来检查字符串是否进行了硬编码。如果是SwiftLint 会根据我们的自定义规则显示警告信息，如下图所示。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/11/2C/Cgp9HWA_X_2AWg7XAAJqf2s12IA729.png" alt="图片4.png"></p><h4 id="排除扫描文件" tabindex="-1">排除扫描文件 <a class="header-anchor" href="#排除扫描文件" aria-label="Permalink to &quot;排除扫描文件&quot;">​</a></h4><p>默认情况下 SwiftLint 会扫描和检查整个项目的所有代码。因为一些第三方依赖库的源码风格可能和我们团队的风格不一致，为了方便使用第三方依赖库，我们可以用<code>excluded</code>来把它排除在外，避免扫描和检查。示例如下：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">excluded</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> Pods</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">excluded</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> Pods</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>现在我们已经通过配置 .swiftlint.yml 文件来帮助我们统一编码规范了。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在这一讲，我介绍了如何使用 SwiftLint 来统一编码规范。特别是其中的<code>only_rules</code>，我们要使用它来定义需要生效的规则。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/11/29/Cgp9HWA_XxiAF_9EAAJXiOcRtSY049.png" alt="思维导图+二维码.png"></p><p>此外，在制定编码规范时，我们还需要注意以下几点。</p><p>首先，所制定的规范要和业界标准同步，这能让新成员接手代码时，更容易接受而不是反驳。一个建议是，你可以从 SwiftLint 所提供的默认规则开始，毕竟这些规则都是通过许多人沟通和完善下来的，比你独自一人想出来要靠谱得多。</p><p>其次，在制定规范时，重点是提高代码的可读性，而不是为了高大上去使用黑魔法或者选择那些不常用功能等。这样可以让团队绝大部分成员更容易理解和遵循这些规范。</p><p>最后要强调的是，一套编码规范是需要不断迭代和完善的，我建议团队要定时 Retro（Retrospective，敏捷回顾），讨论和优化这些规范，让得大家都有机会贡献到规范中，增加他的认同感。这种做法在多团队平行开发的环境下特别有效。</p><p>思考题：</p><blockquote><p>你所做的团队除了使用 SwiftLint 等工具检查以外，还使用了哪些手段来保证编码规范的统一呢？</p></blockquote><p>请把回答写到下面的留言区哦，下一讲我将介绍如何使用 Fastlane 执行自动化操作。</p><p><strong>源码地址：</strong></p><blockquote><p>swiftlint.yml 文件<br><a href="https://github.com/lagoueduCol/iOS-linyongjian/blob/main/Moments/.swiftlint.yml" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/iOS-linyongjian/blob/main/Moments/.swiftlint.yml</a></p></blockquote><hr><p><a href="https://shenceyun.lagou.com/t/mka" target="_blank" rel="noreferrer"><img src="https://s0.lgstatic.com/i/image6/M00/08/77/Cgp9HWA0wqWAI70NAAdqMM6w3z0673.png" alt="Drawing 1.png"></a></p><p><strong>《大前端高薪训练营》</strong></p><p>12 个月打磨，6 个月训练，优秀学员大厂内推，<a href="https://shenceyun.lagou.com/t/mka" target="_blank" rel="noreferrer">点击报名，高薪有你</a>！</p>`,61),o=[p];function t(r,c,i,d,y,E){return a(),n("div",null,o)}const b=s(e,[["render",t]]);export{g as __pageData,b as default};

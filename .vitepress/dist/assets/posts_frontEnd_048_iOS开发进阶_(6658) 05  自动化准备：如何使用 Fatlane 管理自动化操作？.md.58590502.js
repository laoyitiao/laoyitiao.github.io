import{_ as e,j as p,o as t,g as c,k as n,Q as l,s,h as o}from"./chunks/framework.b3d8e22e.js";const w=JSON.parse('{"title":"fastlane 安装 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6658) 05  自动化准备：如何使用 Fatlane 管理自动化操作？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6658) 05  自动化准备：如何使用 Fatlane 管理自动化操作？.md","lastUpdated":1696417798000}'),i={name:"posts/frontEnd/048_iOS开发进阶/(6658) 05  自动化准备：如何使用 Fatlane 管理自动化操作？.md"},r=l('<p>要成为一个优秀的 iOS 开发者，我们要做的事情远多于&quot;开发&quot;，例如我们要构建和打包 App，管理证书，为 App 进行签名，把 App 分发给测试组，上传 App 到 App Store，等等。这些操作不但繁琐费时，而且容易出错。那么，有没有更便利的方法呢？有，那就是使用 fastlane 来完成这些重复性的工作。接下来这一讲，我们主要聊的也就是这个主题。</p><h3 id="fastlane-安装" tabindex="-1">fastlane 安装 <a class="header-anchor" href="#fastlane-安装" aria-label="Permalink to &quot;fastlane 安装&quot;">​</a></h3><p><strong>fastlane</strong> 是用 Ruby 语言编写的一个命令行工具，可以自动化几乎所有 iOS 开发所需要的操作，例如自动打包和签名 App，自动上传到 App Store 等等。有了 fastlane，我们就可以开发一套统一的、可靠的和可共享的配置，团队所有成员都可以通过这套配置实现自动化操作，减少重复性劳动。</p><p>如何安装 fastlane 呢？我记得在第一讲就曾提到过，可以使用 Bundler 来安装，只需要在 Gemfile 文件里面添加以下一行即可：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">gem </span><span style="color:#9ECBFF;">&quot;fastlane&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;2.166.0&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">gem </span><span style="color:#032F62;">&quot;fastlane&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;2.166.0&quot;</span></span></code></pre></div><p>注意，由于是通过 Bundler 来安装 fastlane，每次执行 fastlane 命令前，都需要加上<code>bundle exec</code>（<code>bundle exec fastlane</code>）。不过为了简洁，在这里后面凡涉及 fastlane 命令时，我会省略<code>bundle exec</code>部分。</p><h3 id="action-与-lane" tabindex="-1">Action 与 Lane <a class="header-anchor" href="#action-与-lane" aria-label="Permalink to &quot;Action 与 Lane&quot;">​</a></h3><p>fastlane 为我们提供了一百多个 Action，它们是 iOS 项目开发中所有自动化操作的基础。所谓的<strong>Action</strong>，你可以理解成是 fastlane 自动化流程中的最小执行单元。一般常用的 Action 有：</p><ul><li><p>scan，用于自动测试 App；</p></li><li><p>cert，用于自动生成和管理 iOS App 签名的证书；</p></li><li><p>sigh，用于自动生成、更新、下载和修复 Provisioning Profile；</p></li><li><p>match，为整个团队自动管理和同步证书和 Provisioning Profile；</p></li><li><p>gym，用于自动构建和打包 App；</p></li><li><p>snapshot，用于自动在不同设备上截屏；</p></li><li><p>pilot，用于自动把 App 部署到 TestFlight 并管理测试用户；</p></li><li><p>deliver，用于自动把 App 上传到 App Store；</p></li><li><p>pem，用于自动生成和更新推送消息的 Profile。</p></li></ul><p>这些 Action 怎么执行呢？我们可以通过<code>fastlane &lt;action&gt;</code>（例如<code>fastlane scan</code>）来执行。下面是执行效果，它提示我选择其中一个 Scheme 来继续执行。</p>',10),d=s("p",null,"从运行情况可知，尽管这些 Action 为我们提供了不少便利，但还是需要手工输入来继续。所以，我不推荐你直接使用这些 Action，而是根据项目需要，在开发自己的自动化操作时通过传入合适的参数来调用 fastlane 所提供的 Action。",-1),E=s("p",null,[o("具体来说，我们可以把所需的 Action 组合在一起，开发出对应的自动化操作。在 fastlane 中，我们把这个自动化操作或者任务叫作 "),s("strong",null,"Lane"),o(" 。"),s("strong",null,"实际上， iOS 开发中的所有自动化操作，主要通过 Lane 来封装和配置的。")],-1),y=l(`<p>Lane 和 Action 的关系如上图所示， 一条 Lane 可以通过参数调用一个或几个 Action 。以 Moments app 为例，我们要自动打包和签名 App，那么我就建了一条名叫<code>archive_appstore</code>的 Lane。因为这条 Lane 用到的&quot;更新签名&quot;和&quot;打包&quot;在 fastalne 里已经提供了相关的 Action------<code>update_code_signing_settings</code>和<code>gym</code>，我就可以到它官网去寻找，从而减轻了开发工作量。</p><p>一般，iOS 项目所需的自动化操作都配置为 Lane 并保存在 Fastfile 文件，由 Git 统一管理起来，共享给所有成员。然后，大家就可以使用统一的自动化配置了。</p><p>这里的 Fastfile 文件是怎么出来的呢？</p><p>它是由<code>fastlane init</code>命令自动生成。这条命令会建立一个 fastlane 文件夹，文件夹里除了 Fastfile ，还有 Appfile，以及执行过程中所生成的一些中间文件（如截图、日志与报告等）。因为我们之前已经在 .gitignore 文件里把这些中间文件忽略了，因此这些中间文件不再保存到 Git 里面。</p><p>fastlane 文件夹里的 Appfile，用于保存 App 的唯一标识符和 Apple ID 等信息。当 fastlane 在执行一个 Action 的时候，首先会使用传递进来的参数，当参数没有传递进来时，fastlane 会从 Appfile 文件中查找并使用对应的信息。</p><p>比如，我们在 Appfile 配置了<code>app_identifier &quot;com.ibanimatable.moments&quot;</code>以后，在调用<code>match</code>Action 时可以不传入<code>app_identifier</code>参数，fastlane 会自动把<code>&quot;com.ibanimatable.moments&quot;</code>作为<code>app_identifier</code>的值进行调用。</p><p>但是为了方便管理所有的 Lane ，保证每次执行的效果都一样，我建议在每次调用 Action 的时候，都明确传递每一个所需的参数，而不是从 Appfile 文件读取。下面我就演示下如何明确传递每一个参数来执行<code>match</code>Action。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      type</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;appstore&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      force</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      storage_mode</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;git&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      git_url</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;https://github.com/JakeLin/moments-codesign&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      app_identifier</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;com.ibanimatable.moments&quot;</span><span style="color:#E1E4E8;">, # pass  app_identifier explicitly</span></span>
<span class="line"><span style="color:#E1E4E8;">      team_id</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;6HLFCRTYQU&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      api_key</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> api_key</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      type</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;appstore&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      force</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      storage_mode</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;git&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      git_url</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;https://github.com/JakeLin/moments-codesign&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      app_identifier</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;com.ibanimatable.moments&quot;</span><span style="color:#24292E;">, # pass  app_identifier explicitly</span></span>
<span class="line"><span style="color:#24292E;">      team_id</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;6HLFCRTYQU&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      api_key</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> api_key</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span></code></pre></div><h3 id="常用-lane-定义" tabindex="-1">常用 Lane 定义 <a class="header-anchor" href="#常用-lane-定义" aria-label="Permalink to &quot;常用 Lane 定义&quot;">​</a></h3><p>通过上面的介绍你已经知道，我们会使用 Lane 来封装项目所需的各个自动化操作。那么，这些 Lane 是如何开发定义的呢？接下来，我就为你介绍几种非常实用的 Lane，一起来看看怎么做。</p><h4 id="扫描和检查代码" tabindex="-1">扫描和检查代码 <a class="header-anchor" href="#扫描和检查代码" aria-label="Permalink to &quot;扫描和检查代码&quot;">​</a></h4><p>每条 Lane 的定义都是放在一个<code>lane &lt;lane_name&gt; do &lt;lane_body&gt; end</code>的代码块里面。它以关键字<code>lane</code>开头，接着是这条 Lane 的名字。 下面是用于检查代码的 Lane 源码。</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">lane </span><span style="color:#79B8FF;">:lint_code</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">puts</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Lint code using SwfitLint&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  swiftlint(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">mode:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">:lint</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">executable:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./Pods/SwiftLint/swiftlint&quot;</span><span style="color:#E1E4E8;">,  </span><span style="color:#6A737D;"># Important if you&#39;ve installed it via CocoaPods</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">config_file:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./Moments/.swiftlint.yml&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">raise_if_swiftlint_error:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">lane </span><span style="color:#005CC5;">:lint_code</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">puts</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Lint code using SwfitLint&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  swiftlint(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">mode:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">:lint</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">executable:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./Pods/SwiftLint/swiftlint&quot;</span><span style="color:#24292E;">,  </span><span style="color:#6A737D;"># Important if you&#39;ve installed it via CocoaPods</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">config_file:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./Moments/.swiftlint.yml&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">raise_if_swiftlint_error:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>在上面的例子中，我们定义了一个叫作<code>lint_code</code>的 Lane。因为 fastlane 使用 Ruby 开发，所以在 Fastfile 里面，Lane 的名字也遵循它的编码规范，使用小写字母和下划线组合的蛇式命名法。</p><p>Lane 的实现逻辑放在<code>do</code>和<code>end</code>中间，我们可以调用 fastlane 提供的任意 Action。在这个例子中我们就调用了<code>swiftlint</code>Action，并把<code>lint</code>传递给<code>mode</code>参数，以此来执行代码扫描和检查操作。</p><p>特别需要注意的是，由于我们之前使用了 CocoaPods 来安装 SwiftLint，因此要为<code>executable</code>参数指定 SwiftLint 的安装路径<code>./Pods/SwiftLint/swiftlint</code>。同时要把 .swiftlint.yml 文件的所在路径也传递给<code>config_file</code>参数。这样就能保证 fastlane 使用了统一的 SwiftLint 版本和规则文件，方便团队所有人执行该 Lane 时得到统一的效果。</p><p>当一条 Lane 开发配置完毕以后，我们就可以在项目的根目录执行 <code>fastlane &lt;lane_name&gt;</code>。比如扫描和检查代码的 Lane ，我们可以在终端输入<code>fastlane lint_code</code>看到它的执行效果。</p><blockquote><p>Driving the lane &#39;ios lint_code&#39;</p><p>Lint code using SwfitLint</p><p>--- Step: swiftlint ---</p><p>$ ./Pods/SwiftLint/swiftlint lint --config ./Moments/.swiftlint.yml</p><p>Linting Swift files in current working directory</p><p>Linting &#39;Strings.swift&#39; (1/87)</p><p>Linting &#39;MomentListItemViewModel.swift&#39; (2/87)</p><p>Linting ......s</p><p>UIButtonExtensions.swift:14:46: warning: no_hardcoded_strings Violation: Please do not hardcode strings and add them to the appropriate <code>Localizable.strings</code> file; a build script compiles all strings into strongly typed resources available through <code>Generated/Strings.swift</code>, e.g. \`L10n.accessCamera (no_hardcoded_strings)</p><p>Done linting! Found 6 violations, 0 serious in 87 files.</p><p>fastlane.tools finished successfully</p></blockquote><p>在执行过程中，fastlane 先从 Fastfile 文件里名叫<code>lint_code</code>的 Lane 的定义，然后执行了该 Lane 里使用到的 swiftlint Action。swiftlint Action 会把项目下 87 个 Swift 源代码文件进行扫描和检查，并把所有不符合规范的代码提示给我们。</p><h4 id="格式化代码" tabindex="-1">格式化代码 <a class="header-anchor" href="#格式化代码" aria-label="Permalink to &quot;格式化代码&quot;">​</a></h4><p>检查代码之后，接下来就是清理不符合规范的代码，比如删掉所有代码中不必要的空格或者空行，修正缩进的大小等等。我们可以定义一条叫作<code>format_code</code>的 Lane 来执行该功能。有了它以后，我们只需要执行<code>fastlane format_code</code>就能把整个项目所有的代码进行格式化。</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">lane </span><span style="color:#79B8FF;">:format_code</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">puts</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Lint and format code using SwfitLint&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  swiftlint(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">mode:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">:autocorrect</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">executable:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./Pods/SwiftLint/swiftlint&quot;</span><span style="color:#E1E4E8;">,  </span><span style="color:#6A737D;"># Important if you&#39;ve installed it via CocoaPods</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">config_file:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./Moments/.swiftlint.yml&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">raise_if_swiftlint_error:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">lane </span><span style="color:#005CC5;">:format_code</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">puts</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Lint and format code using SwfitLint&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  swiftlint(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">mode:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">:autocorrect</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">executable:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./Pods/SwiftLint/swiftlint&quot;</span><span style="color:#24292E;">,  </span><span style="color:#6A737D;"># Important if you&#39;ve installed it via CocoaPods</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">config_file:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./Moments/.swiftlint.yml&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">raise_if_swiftlint_error:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p><code>format_code</code>和<code>lint_code</code>两条 Lane 都使用了<code>swiftlint</code>Action，唯一不同的地方是为<code>mode</code>参数传递了<code>autocorrect</code>。</p><h4 id="排序-xcode-项目文件列表" tabindex="-1">排序 Xcode 项目文件列表 <a class="header-anchor" href="#排序-xcode-项目文件列表" aria-label="Permalink to &quot;排序 Xcode 项目文件列表&quot;">​</a></h4><p>在多人开发的项目下，我们经常会修改项目文件，这往往很容易引起合并冲突，而合并 xcodeproj 文件又是一件非常麻烦的事情。怎么办呢？</p><p>一个有效办法就是在每次新建源代码和资源文件时，把 xcodeproj 里面的文件列表进行重新排序。这样能极大地减低合并冲突的发生。我们把这一个经常使用到的操作也配置到 Fastfile 里面，如下所示。</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">lane </span><span style="color:#79B8FF;">:sort_files</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">puts</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Sort the files for the Xcode project&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  sh </span><span style="color:#9ECBFF;">&quot;../scripts/sort-Xcode-project-file.pl ../Moments/Moments.xcodeproj&quot;</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">lane </span><span style="color:#005CC5;">:sort_files</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">puts</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Sort the files for the Xcode project&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  sh </span><span style="color:#032F62;">&quot;../scripts/sort-Xcode-project-file.pl ../Moments/Moments.xcodeproj&quot;</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>可以看到，fastlane 除了能调用其提供的 Action 以外，还可以通过<code>sh</code>来调用其他程序命令。在这里我们调用了由苹果公司提供的一个<strong>Perl 程序来为 xcodeproj 里面的文件列表进行排序</strong> 。你也可以在<a href="https://github.com/lagoueduCol/iOS-linyongjian/blob/main/scripts/sort-Xcode-project-file.pl" target="_blank" rel="noreferrer">拉勾教育的代码仓库</a>找到这个Perl 程序。</p><h4 id="调用其他-lane-操作" tabindex="-1">调用其他 Lane 操作 <a class="header-anchor" href="#调用其他-lane-操作" aria-label="Permalink to &quot;调用其他 Lane 操作&quot;">​</a></h4><p>除了调用一些程序命令（如<code>sh</code>）以外，一条 Lane 还可以调用 Fastfile 里面其他的 Lane。例如我们定义了一条叫作<code>prepare_pr</code>的 Lane ，它可以帮我们在提交 Pull Request 之前做一些必要的准备。下面这个代码表示的就是，这条 Lane 在内部调用了另外两条 Lane ------<code>format_code</code>和<code>sort_files</code>，以此来同时完成格式化代码和排序 Xcode 项目文件列表的操作。</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">lane </span><span style="color:#79B8FF;">:prepare_pr</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">  format_code</span></span>
<span class="line"><span style="color:#E1E4E8;">  sort_files</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">lane </span><span style="color:#005CC5;">:prepare_pr</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">  format_code</span></span>
<span class="line"><span style="color:#24292E;">  sort_files</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><h4 id="定义私有-lane-和返回值" tabindex="-1">定义私有 Lane 和返回值 <a class="header-anchor" href="#定义私有-lane-和返回值" aria-label="Permalink to &quot;定义私有 Lane 和返回值&quot;">​</a></h4><p>类似于 Swift 语言能通过<code>private</code>来定义内部使用的方法，我们也能定义私有 Lane 给Fastfile 内的其他 Lane 所调用，提高代码的复用。其做法就是把原先的关键字<code>lane</code>替换成<code>private_lane</code>。例如我们定义一条叫作<code>get_pi</code>的私有 Lane，代码如下。</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">private_lane </span><span style="color:#79B8FF;">:get_pi</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">  pi </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.1415</span></span>
<span class="line"><span style="color:#E1E4E8;">  pi</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">private_lane </span><span style="color:#005CC5;">:get_pi</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">  pi </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.1415</span></span>
<span class="line"><span style="color:#24292E;">  pi</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>该 Lane 的实现体有两行代码，第一行是给一个临时变量<code>pi</code>赋值。第二行表示把<code>pi</code>作为返回值传递给调用者。例如下面就演示了如何调用<code>get_pi</code>并取得返回值。</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">lane </span><span style="color:#79B8FF;">:foo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">  pi </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> get_pi</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">puts</span><span style="color:#E1E4E8;">(pi)</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">lane </span><span style="color:#005CC5;">:foo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">  pi </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> get_pi</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">puts</span><span style="color:#24292E;">(pi)</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>这是执行<code>fastlane foo</code>的结果：</p><blockquote><p>Driving the lane &#39;ios foo&#39;</p><p>--- Step: Switch to ios get_pi lane ---</p><p>Cruising over to lane &#39;ios get_pi&#39;</p><p>Cruising back to lane &#39;ios foo&#39;</p><p>3.1415</p></blockquote><p>fastlane 首先调用<code>foo</code>Lane，然后进去<code>get_pi</code>Lane 并返回到<code>foo</code>，同时把返回结果打印出来。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一讲我介绍了如何从头开始搭建一个 fastlane 环境。在这里需要注意三点：</p><ol><li><p>不要单独手工执行 fastlane 所提供的 Action，而是使用 Fastfile 文件来统一开发、配置和管理日常中经常使用的所有自动化操作；</p></li><li><p>在开发我们的 Lane 时，要优先使用和调用 fastlane 提供的 Action，因为这些 Action 都是经过社区完善的，且会随着 Xcode 版本的升级而更新；</p></li><li><p>当我们调用 fastlane 所提供的 Action 时，要明确传递各个参数，在执行过程中就无须任何手工交互就能从头到尾执行整个操作。</p></li></ol>`,42),u=s("p",null,"有了项目需要的所有 Lane 以后，能有效减轻团队成员的重复劳动，并为项目的自动化和工程化打下坚实的基础。在后面的章节中，我会详细介绍如何使用 fastlane 来管理证书，打包 App 和上传到 App Store。",-1),f=s("p",null,"思考题：",-1),_=s("blockquote",null,[s("p",null,"在你的项目中是怎样实施自动化的？如果你是第一次使用 fastlane，请按照上述的文章和 fastlane 的官方文档来开发一条执行测试的 Lane。")],-1),g=s("p",null,"可以把你的答案写得留言区哦，下一讲我将介绍如何使用 Git 与 GitHub 统一代码管理流程。",-1),h=s("p",null,[s("strong",null,"源码地址：")],-1),F=s("blockquote",null,[s("p",null,[o("Fastfile 文件地址："),s("a",{href:"https://github.com/lagoueduCol/iOS-linyongjian/blob/main/fastlane/Fastfile#L19-L50",target:"_blank",rel:"noreferrer"},"https://github.com/lagoueduCol/iOS-linyongjian/blob/main/fastlane/Fastfile#L19-L50")])],-1);function m(b,C,A,q,L,v){const a=p("Image");return t(),c("div",null,[r,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/16/10/CioPOWBF-DaAV56WAAR8Ne2bQ4c230.png"}),d,E,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/16/10/CioPOWBF-EqACKcpAAC6PT8Ghi4740.png"}),y,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/16/13/Cgp9HWBF-HeACPAgAAQVQ3FLLec967.png"}),u,f,_,g,h,F])}const B=e(i,[["render",m]]);export{w as __pageData,B as default};

# 第32讲：WebView自动化测试

本课时我们开始进入 WebView 自动化测试的学习。

App 分类
------


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/07/46/Ciqah16ELsmANoDvAAIyWTuGX3s586.png"/> 


<br />

在前面的课程里我已经陆续给你讲解了 Android 原生 Native 自动化测试，包括了 Page Object 如何进行封装，但目前市场上很多 App 都不是纯 Native 原生的，比如淘宝、美团，也包括我演练用的雪球，很多公司为了能够快速的进行交付，会选择混合 App 模式，也叫作 Hybrid App。

<br />

Hybrid App 在 Natvie App 的基础上内嵌了一层 WebView，WebView 负责解析 App 内的 HTML，Android 和 iOS 只需要内嵌一个 WebView 组件，需要渲染的内容就可以通过 H5 设计，可以实现跨平台、更新快的特点。还有一种叫作 Web App， Web App 主要依靠 Web 浏览器负责渲染，比如各家电商平台的m站就是采用这个模式，今天我们主要学习如何对 Hybrid App 进行自动化测试。

WebView 控件在 Appium 中的抽象
-----------------------


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/80/5C/Cgq2xl6ELsqAbmoNAAFhXVE8ARk521.png"/> 


<br />

首先，我们来看下 WebView 控件在 Appium 中的抽象，WebView 在 Android 组件里面有两种形态，第一种形态在 Native 层面， uiautomator 可以解析 WebView 中的控件，它会帮你解析转换成原生控件来表示。

<br />

还可以通过 getPageSource 分析 WebView 页面的 dom结构并发现 WebView 的组件和控件，但是因为 WebView 组件和原生组件本质上是不一样的， H5 的有些属性无法通过原生控件表达，所以有一些属性会丢失，基于这种情况，定位时就会出现一些问题。

<br />

我们再来看第二种 WebView 方式，如果可以访问到网页内容，就可以采用前面学习过的 Selenium， Appium 给我们提供了一个叫作上下文的概念，上下文可以在原生和 WebView 之间进行切换，切换到 WebView 的好处是可以使用 CSS 定位，从而更加灵活的控制控件。

切换 WebView
----------

接下来，我们看如何切换到 WebView，首先 Android 6.0 版本是默认支持切换 WebView 的，也就是说模拟器的版本只要是 6.0 就可以直接分析所有 App 内部页面，但是 6.0 版本以上的模拟器、物理机基于性能的考量，关闭了 WebView 调试开关，这时你实际上是看不到 WebView 的内部细节的，那么怎么打开这个默认开关呢，Android 官方文档上有这样一个 API。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/07/46/Ciqah16ELsqADv7pAAC9jaPPPYo388.png"/> 


<br />

将它设置成 true 后 WebView 就具备了可调试属性。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/07/46/Ciqah16ELsqALrLGAAGEVhWNDaM815.png"/> 


<br />

我们打开模拟器，进入雪球，然后使用 Chrome。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/80/5C/Cgq2xl6ELsuAA40iAAIKjk7to3U675.png"/> 


<br />

Chrome 里面会有一个实盘交易，点击它，一旦开启了 WebView 调试开关之后。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/07/46/Ciqah16ELsuAPr0VAAJMm_vPWMg299.png"/> 


<br />

就可以在页面看到调试页面的细节，但是有一个小问题是 Chrome 的最新版本是有 bug，不能更好地显示分析布局。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/80/5C/Cgq2xl6ELsyAS2AwAAL7zRPHqmc256.png"/> 


<br />

为了更好地分析布局你可以使用一个特殊的 Chrome 62 版本，Chrome 62 版本点击实盘交易后你可以了解到整个页面的整体布局，通过这个布局我们就可以看到整个控件，比如：A股开户。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/07/46/Ciqah16ELsyADlADAAR5xYL-DeQ437.png"/> 


<br />

有个这个查找办法之后我们再查找重要控件的定位表达式，以及它的事件处理，比如A股开户组件就可以获取 CSS 属性作为定位符，同样，其他重要组件也都可以通过 id、CSS、name 进行定位。

<br />

当你通过 Chrome 可以看到控件属性的时候，就代表你已经具备了可以对 WebView 进行控制的能力，接下来我们看下如何写一个 WebView 自动化测试的 case。

编写 WebView 自动化测试 case
---------------------

首先，你需要在电脑上安装 ChromeDriver，ChromeDriver 因为升级的关系它和每个版本的Chrome 是有关联关系的，首先，你可以打开这份文档（<https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/web/chromedriver.md>），文档中定义了 ChromeDriver，以及与 Chrome 之间的关系，可以发现 ChromeDriver 是可以驱动特定版本的 Chrome的。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/07/46/Ciqah16ELsyASc6uAAI5BLkNOOs595.png"/> 


<br />

你可以看到 Chrome 和 ChromeDriver 的版本是一一对应的，所以当一个 App 内嵌了 WebView，WebView 本质上是属 Chrome 内核的，Chrome 内核我们需要找到它是哪一个版本，然后找到对应的 ChromeDriver 版本就可以了。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/80/5C/Cgq2xl6ELs2AO70DAAHrbVi5hNI845.png"/> 


<br />

在这里你可以看到我的 Chrome 版本是44.0.2403，我们就可以找对应 44.0 版本的ChromeDriver，也就是 2.20 版本，这里需要注意版本号是向下兼容的，然后点击链接下载对应的 ChromeDriver 到本地，就可以继续完成测试了，后续测试用例还需要什么呢？如果要使用Appium，我们还需要配置几个重要的 ChromeDriver 的配置项，我们来具体看一看。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/07/46/Ciqah16ELs2AXdkbAANSd_2rQyo597.png"/> 


<br />

第一个重要的配置项叫作 chromedriverExecutableDir，这个配置项主要用来解决ChromeDriver的版本问题，比如雪球内嵌了一个自带的 WebView 内核，但是还有一些诸如微信小程序的工具，它可能自己内嵌一个完整的 Chrome 内核，这个时候内嵌的内核的版本可能与系统自带的版本不同，这样每个 App 可能需要不同版本的 ChromeDriver，这种情况下，chromedriverExecutableDir 可以存放所有用到的 ChromeDriver 版本。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/80/5C/Cgq2xl6ELs2AATbOAAEkk1zFl8Q476.png"/> 


<br />

比如这个目录下我下载了三个版本，每个程序都对应一个不同的版本，Chrome 会检查你的配置项，一旦配置了 Dir 参数就会到对应的目录下面去找与之对应的版本，所以这个方式是比较灵活的

<br />

另外一个配置参数叫作 chromedriverExecutable，它表示如果你明确知道需要哪个版本，可以直接传入版本的路径，从而不需要再去挑选版本，为了灵活我们更多时候使用 Dir 参数。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/07/46/Ciqah16ELs6ARpnhAABaTXvQdx8626.png"/> 


<br />

还有一个参数叫作 chromedriverChromeMappingFile，这是一个JSON 格式的文件，它用来定义 Chrome 与 ChromeDriver 版本之间的对应关系，有一些版本的对应关系可能没有在官方文档的表格里，比如 2403 这个版本处在中间位置就可以指定使用 2.20 版本，你可以用这个办法强行指定一个低版本的 ChromeDriver，但如果你没有配置正确，appium会报错对应版本没有找到。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/80/5C/Cgq2xl6ELs6AN0heAACHkib8h7Y738.png"/> 


<br />

环境配置好了之后，接下来我们开始看看 Appium 给我们提供了哪些支持，Appium 提供了三个API，一个叫作 contexts，它可以获取当前的上下文是 Native 还是 WebView，第二个参数是当前处于哪一个上下文，如果我想从原生切到 WebView，或是从 WebView切换到原生，就可以使用 driver 下面的 switche_to 参数完成切换操作。

<br />

接下来，我给你写了一个 test_webview 的 case，我们要测试的 case 是这样的，首先我们要进入雪球，然后进去交易，交易里面选择 A 股开户，点击 A 股开户后会弹出来一个新的页面，弹出页面需要输入手机号和随机输入一个验证码，然后点击立即开户，我们就完成一个简单的 case，然后我们来具体看看怎么实现它。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/07/46/Ciqah16ELs6Ab9HNAANI7Xhw8O0038.png"/> 


<br />

首先，我们需要找到交易，交易是个 XPATH，，它是 Native 原生的，所以使用 find_element 加 click，注意这里为了让你更清楚的了解 WebView 控件怎么使用，我预先写了一个传统的用例，没有使用 PO，等到最后做 App 整体测试的时候，我们再把它放到 PO 里面，当我对原生控件点击之后，就会进去 WebView 页面。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/80/5C/Cgq2xl6ELs6AY5MSAAFh_Lu4I-A959.png"/> 


<br />

这个页面既有原生页面又有 WebView 页面，这时会出现两种上下文，一种叫作 Native，另一种叫作 WebView + 进程名 的上下文，有了这两种上下文之后，我可以使用 switch_to 切换到最后一个上下文，而最后一个上下文通常是 webview，而 contexts 中第一个值基本上就是你的 Native，所以可以使用 -1 序列表示进入最后一个 WebView 的上下文，一旦进入 WebView 就可以完成对 WebView 的自动化了。

<br />

这里我使用一些原生页面无法使用的定位符，比如 CSS，你可以发现这里有一个 agu_3ki 也就是"A 股开户"的定位符，当我们点击它的时候会开启一个新的窗口，没有在原有窗口中继续跳转。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/07/46/Ciqah16ELs6AWMhrAAIy0Si0xuo374.png"/> 


<br />

通过 Chrome，你可以看到开启了几个窗口，一旦开启一个新的窗口就需要进行窗口的切换，所以我们就需要用到 Selenium 的知识，先打印当前有几个窗口，然后再使用 switch_to 切换到最后一个新打开的窗口，切换完成之后是一个新的页面，然后再对其进行定位。

<br />

注意，我刚才打开页面的时候有一个加载的过程，所以我们需要在这里添加一个显式等待等待整个页面加载完，等待完成之后就需要输入手机号和验证码，整个 case 的逻辑大体就是这样的。

<br />


<Image alt="" src="https://s0.lgstatic.com/i/image3/M01/80/5C/Cgq2xl6ELs-ASAk4AAR7u9laZ4g790.png"/> 


<br />

关于 WebView 自动化测试你只需记住这几个关键的 API 就足够了，我们会在后面 App 自动化测试课时中把 WebView 与原生页面合并到一块进行演示。

<br />



import{_ as l,j as o,o as e,g as t,k as p,Q as n,s,h as c}from"./chunks/framework.b3d8e22e.js";const P=JSON.parse('{"title":"性能测试方案选型 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6575) 11  工具实践：如何进行性能专项测试.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6575) 11  工具实践：如何进行性能专项测试.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6575) 11  工具实践：如何进行性能专项测试.md"},y=n('<p>前几讲我介绍了首屏秒开、白屏时间和卡顿的优化手段，这些是已上线业务的性能优化。那么，如果有新业务要上线，如何尽量减少它上线后的前端性能问题，避免以后我们手忙脚乱去&quot;救火&quot;呢？我们可以通过性能专项测试，提前于生产环境发现问题。</p><p>什么叫性能专项测试呢？简单来说就是，在业务上线前，我们对性能指标（如首屏时间、白屏时间、页面加载时长等）进行测试，确保上线后性能指标达标。</p><p>那怎么做呢？大致分四步：</p><ul><li><p>第一步，确定线下测试方案；</p></li><li><p>第二步，设定线下测试标准；</p></li><li><p>第三步，选用合适的测试环境进行测试及视频分帧计算；</p></li><li><p>第四步，输出测试结果。</p></li></ul><p>接下来我就以首屏时间测试为例详细为你介绍下。</p><h3 id="性能测试方案选型" tabindex="-1">性能测试方案选型 <a class="header-anchor" href="#性能测试方案选型" aria-label="Permalink to &quot;性能测试方案选型&quot;">​</a></h3><p>未上线的业务，一般有两种方案来做性能测试：使用性能 SDK 和以录制视频的方式进行。</p><p>第一个方案，使用性能 SDK ，比如我们要采集首屏时间指标，就使用 MutationObserver ，这一点我们在第 4 讲指标采集部分已经提到过。</p><p>它的优点很明显，线上和线下方案一致。缺点呢？因为业务还没上线，内网测试的访问量有限，从而造成性能平台后端的请求少，无法形成大量的首屏时间分布数据，也就无法在性能平台上可视化展现。</p><p>第二个方案，以录制视频的方式进行性能测试，优点是可以和 QA（Quality Assurance，表示测试人员）现有基础设施相结合。QA 测试时，不仅会测 H5 页面的首屏时间，还会测试 Native 页面的响应时间以及 App 内存使用和 CPU 占用等信息。由于测试项目较多，在这个过程中，QA 团队会沉淀一些测试基础设施，比如 App 代码覆盖率测试工具、异常测试平台、数据构造集成测试平台等，而录制视频是其中必不可少的手段。</p><p>所以，在性能测试上，我一般建议采用录制视频的方式来进行，除此之外，也方便后期的性能计算。</p><p>录制视频一般有手动方案和自动化方案。所谓手动方案就是通过手机自带的视频录制功能来进行，而自动化方案则是通过 adb 录制。前者比较简单也好理解，后者效率会很高，在这里我重点介绍一下通过 adb 录制的自动化方案。</p><p>adb 是 andorid studio下提供的一个工具，在电脑上通过它可以控制模拟器（也就是模拟手机）或者真实的手机设备（需要通过数据线连接到电脑）。比如我们可以通过它打开一个 App 页面，运行 shell 命令，安装软件等功能。</p><p>具体怎么做呢？执行 screenrecord 命令启动录屏功能，代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">adb shell screenrecord </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">time</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">limit </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">sdcard</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">perf.mp4</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">adb shell screenrecord </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">time</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">limit </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">sdcard</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">perf.mp4</span></span></code></pre></div><p>这里我设置了录屏时间为 10s ，如果不设置会默认时间为 180s，它会存储到 /sdcard/ 目录下，命名为 video.mp4。</p><p>接下来，我们打开一个 App 的页面，页面开始加载，然后在页面加载结束后，点击 ctrl+C 结束录屏，获得录制结果。</p><p>在录制过程中会有一些坑需要你注意下，大致有这几点。</p><ul><li>有些设备的显示如分辨率过高可能无法录制，如果遇到这种情况可以通过指定分辨率来录制，示例代码如下：</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">adb shell screenrecord </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">size </span><span style="color:#79B8FF;">1280</span><span style="color:#F97583;">*</span><span style="color:#79B8FF;">720</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">sdcard</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">perf.mp4</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">adb shell screenrecord </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">size </span><span style="color:#005CC5;">1280</span><span style="color:#D73A49;">*</span><span style="color:#005CC5;">720</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">sdcard</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">perf.mp4</span></span></code></pre></div><ul><li><p>如果使用的模拟器，要注意模拟器在晃动、多点触摸等操作情况下替代不了真机，模拟器在性能和设备类型上也要慢一些，上限取决于你电脑的性能上限。</p></li><li><p>录制过程中不要旋转手机，因为这会造成画面切断。</p></li><li><p>可以在命令行显示log，有助于你的调试，如下所示：</p></li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">adb shell screenrecord </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">time</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">limit </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">verbose </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">sdcard</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">perf.mp4</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">adb shell screenrecord </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">time</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">limit </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">verbose </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">sdcard</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">perf.mp4</span></span></code></pre></div><h3 id="性能测试标准设定" tabindex="-1">性能测试标准设定 <a class="header-anchor" href="#性能测试标准设定" aria-label="Permalink to &quot;性能测试标准设定&quot;">​</a></h3><p>既然是要测试，就要有一个标准来判断某个性能是否达标。有关性能标准，我在第一讲里的关键指标设定介绍过，也在模块二专门说明了首屏时间、白屏时间、卡顿等的指标采集方案。</p><p>在这里我想说的是，首屏时间的性能测试标准设定，需要注意两点：</p><ol><li><p>分频计算的标准，也就是什么时候认为首屏结束；</p></li><li><p>确定首屏时间的标准。</p></li></ol><p>其中，分频计算的标准，建议采用如下标准：</p><p>白屏响应时间 = 白屏最后 - 帧的时间 - 点击时的起始帧时间</p><p>首屏加载时间 = 内容完全加载出来那一帧的时间 - 点击时的起始帧时间</p><p>首屏时间的标准，因为缺乏海量的数据，也无法直接使用之前的秒开率的标准，我们可以退而求其次，采用不同网络环境下的性能标准。</p>',30),E=n(`<p>如果你想要测试页面是否卡顿，它的标准我在前面也提到过：<strong>连续 5 帧超过 50ms，判定为卡顿；单帧渲染超过250ms，就可以判定为严重卡顿。</strong></p><p>确定完时间标准后，紧跟着就是寻找合适的性能测环境，进行录屏然后计算视频分帧，也就是我一开始提到的第三步。</p><h3 id="性能测试环境搭建及测试" tabindex="-1">性能测试环境搭建及测试 <a class="header-anchor" href="#性能测试环境搭建及测试" aria-label="Permalink to &quot;性能测试环境搭建及测试&quot;">​</a></h3><p>所谓的性能测试环境搭建，不是指需要搭建测试服务器及接口测试等，而是寻找合适的网络环境进行测试。由于现在的网络环境多样，比如有 WIFI，有常见的 3G、4G，有少见的 2G 弱网，还有现在流行的 5G 网络，在专项测试的时候，为了提前发现性能问题，我们需要考虑到各种网络环境下的情况。</p><p>那具体怎么做呢？这时候就会出现一个有趣的现象------有些人开始&quot;神出鬼没&quot;了。</p><p>比如，在 58 同城，各个业务（如房产、招聘、黄页、二手车等）都有自己的前端团队，每个团队开发完成的页面，需要集成到 58 App 里面，App 要求各个业务在性能结果方面达标。为了测试达标，前端和测试工程师就会到各种网络环境下来查看相关性能如何了。</p><p>像 2G 网络环境，由于在一定区域内，使用 2G 网络的人越少它的信号越好，比如半夜时分。所以，房产业务的前端和测试工程师，会深更半夜拿着手机，在公司旁边四处找 2G 网络信号好的地方录屏以作测试，甚至有时候会到公司旁边的星巴克进行。</p><p>无独有偶，腾讯微信团队也是如此，他们对第三方接入的 H5 ，会到周围各种网络环境下进行性能测试。</p><p>在这里，我分享下寻找网络环境的经验。一般 4G 信号容易受物体遮挡或者天气的影响，在空旷地点，天气晴朗情况下信号会明显好很多。当然，如果你留意过信号塔在哪里，附近的信号会更好。2G/3G 的话，一般来说信号很稳定，你在办公区域或者 WIFI 信号强的地方，使用弱网的人少时，信号一般是不错的，所以前面提到星巴克等一些咖啡厅是首选测试地点。</p><p>需要注意的是，此时的测试不要求平均时间，不需要关注首屏秒开率，只要在某种特定网络环境下首屏时间达标即可。</p><p>做完视频录屏之后，接下来我们当然可以人工去判断首屏结束时间，比如拿秒表去计算时间差。但这样做有两个缺点：一是人工去计算首屏时间的话，前后偏差几百毫秒很正常，准确性没有保证；二是人工判断，效率低，且没法和整体测试链路打通。比如，测试团队还需要对内存占用、CPU使用情况、流量、App 崩溃率等进行测试时，如果采用手动计算，就没法一次性采集到所有指标。</p><p>所以，一般我会建议采取分帧计算的方式进行。具体怎么做呢？主要分为下面三步：</p><ol><li><p>安装 openCV、python ，通过 Python 的 VideoCapture 将视频分帧存储；</p></li><li><p>分帧图片命名，使用当前视频播放时间位置（毫秒）命名存储图片；</p></li><li><p>首屏时长计算 = 首屏结束帧文件名；</p></li></ol><p>最后，我们拿时长和标准对比即可知道性能是否达标。下面是基于 python 借助 openCV 库做的视频分帧计算。</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;&quot;&quot;视频分帧&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> cv2</span></span>
<span class="line"><span style="color:#E1E4E8;">vc </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cv2.VideoCapture(</span><span style="color:#F97583;">r</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#DBEDFF;">C:</span><span style="color:#85E89D;font-weight:bold;">\\U</span><span style="color:#DBEDFF;">sers</span><span style="color:#85E89D;font-weight:bold;">\\a</span><span style="color:#DBEDFF;">dmin</span><span style="color:#79B8FF;">\\D</span><span style="color:#DBEDFF;">esktop</span><span style="color:#85E89D;">\\1</span><span style="color:#79B8FF;">.</span><span style="color:#DBEDFF;">mp4</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">)  </span><span style="color:#6A737D;"># 读入视频文件，命名cv</span></span>
<span class="line"><span style="color:#E1E4E8;">n </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 计数</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> vc.isOpened():  </span><span style="color:#6A737D;"># 判断是否正常打开</span></span>
<span class="line"><span style="color:#E1E4E8;">    rval, frame </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> vc.read()</span></span>
<span class="line"><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    rval </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">timeF </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 视频帧计数间隔频率</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> rval:  </span><span style="color:#6A737D;"># 循环读取视频帧</span></span>
<span class="line"><span style="color:#E1E4E8;">    rval, frame </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> vc.read()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> timeF </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">):  </span><span style="color:#6A737D;"># 每隔timeF帧进行存储操作</span></span>
<span class="line"><span style="color:#E1E4E8;">        i </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(i)</span></span>
<span class="line"><span style="color:#E1E4E8;">        cv2.imwrite(</span><span style="color:#F97583;">r</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#DBEDFF;">C:</span><span style="color:#85E89D;font-weight:bold;">\\U</span><span style="color:#DBEDFF;">sers</span><span style="color:#85E89D;font-weight:bold;">\\a</span><span style="color:#DBEDFF;">dmin</span><span style="color:#79B8FF;">\\D</span><span style="color:#DBEDFF;">esktop</span><span style="color:#85E89D;">\\1</span><span style="color:#DBEDFF;">/{}</span><span style="color:#79B8FF;">.</span><span style="color:#DBEDFF;">jpg</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">.format(i), frame)  </span><span style="color:#6A737D;"># 存储为图像</span></span>
<span class="line"><span style="color:#E1E4E8;">    n </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">    cv2.waitKey(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">vc.release()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;&quot;&quot;视频分帧&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> cv2</span></span>
<span class="line"><span style="color:#24292E;">vc </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cv2.VideoCapture(</span><span style="color:#D73A49;">r</span><span style="color:#032F62;">&#39;C:</span><span style="color:#22863A;font-weight:bold;">\\U</span><span style="color:#032F62;">sers</span><span style="color:#22863A;font-weight:bold;">\\a</span><span style="color:#032F62;">dmin</span><span style="color:#005CC5;">\\D</span><span style="color:#032F62;">esktop</span><span style="color:#22863A;">\\1</span><span style="color:#005CC5;">.</span><span style="color:#032F62;">mp4&#39;</span><span style="color:#24292E;">)  </span><span style="color:#6A737D;"># 读入视频文件，命名cv</span></span>
<span class="line"><span style="color:#24292E;">n </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 计数</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> vc.isOpened():  </span><span style="color:#6A737D;"># 判断是否正常打开</span></span>
<span class="line"><span style="color:#24292E;">    rval, frame </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> vc.read()</span></span>
<span class="line"><span style="color:#D73A49;">else</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    rval </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">timeF </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 视频帧计数间隔频率</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#D73A49;">while</span><span style="color:#24292E;"> rval:  </span><span style="color:#6A737D;"># 循环读取视频帧</span></span>
<span class="line"><span style="color:#24292E;">    rval, frame </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> vc.read()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> timeF </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">):  </span><span style="color:#6A737D;"># 每隔timeF帧进行存储操作</span></span>
<span class="line"><span style="color:#24292E;">        i </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(i)</span></span>
<span class="line"><span style="color:#24292E;">        cv2.imwrite(</span><span style="color:#D73A49;">r</span><span style="color:#032F62;">&#39;C:</span><span style="color:#22863A;font-weight:bold;">\\U</span><span style="color:#032F62;">sers</span><span style="color:#22863A;font-weight:bold;">\\a</span><span style="color:#032F62;">dmin</span><span style="color:#005CC5;">\\D</span><span style="color:#032F62;">esktop</span><span style="color:#22863A;">\\1</span><span style="color:#032F62;">/{}</span><span style="color:#005CC5;">.</span><span style="color:#032F62;">jpg&#39;</span><span style="color:#24292E;">.format(i), frame)  </span><span style="color:#6A737D;"># 存储为图像</span></span>
<span class="line"><span style="color:#24292E;">    n </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">    cv2.waitKey(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">vc.release()</span></span></code></pre></div><p>首先，我引入 CV2 库，通过 VideoCapture 读入视频文件，然后通过设置计数间隔频率，比如我这里设置的是 10ms，循环来获取视频，最后通过 cv2.imwrite 来写入文件目录，我们就可以直接看该目录下的文件。</p><h3 id="性能测试结果输出" tabindex="-1">性能测试结果输出 <a class="header-anchor" href="#性能测试结果输出" aria-label="Permalink to &quot;性能测试结果输出&quot;">​</a></h3><p>拿到视频分帧结果后，见下图</p>`,18),i=s("p",null,"图中一张一张的图片就是分帧处理的结果，文件名代表着加载帧时对应的时间，比如我们找到第14 张的图片，判断这个就是白屏结束的位置（图中红线框的部分），对应图片文件是2788.jpg，也就是说首屏时间是 2788ms。对照一下标准，WIFI 下首屏时间 2788ms，属于比较慢的情况，需要做优化。",-1),d=s("h3",{id:"小结",tabindex:"-1"},[c("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),F=s("p",null,"好了，以上就是我们以首屏时间为例，介绍了如何进行性能专项测试，这里面还有一些注意事项：",-1),h=s("p",null,"一是在视频分帧计算时，我们 openCV 最好能借助 brew（ Mac 环境下）进行安装，如果没有 brew 的话（ Windows 等环境下），可以通过 Anaconda 来安装这个软件；",-1),D=s("p",null,"二是计算首屏时间方面，我们前文提到的首屏时间判断，是通过人工提取对应着首屏时间的那一帧。我们后来试着用图像识别的方式去自动提取首屏时间对应的那一帧。这样做的目的主要是提高准确度，以及提高效率。",-1),_=s("p",null,"具体是这么做的呢？",-1),A=s("p",null,"我们拿到视频分帧计算结果后，通过图像识别的系统，去判断关键帧------ 首屏时间对应那一帧。哪个是关键帧呢？我们认为图片从不稳定到图片稳定那一刹那的时间就是关键帧。 当两张图片的变化值小于 5%，即可认为图片趋于稳定，我们以 95 分位值为判定值，如果内容 95% 都不发生变化，则下一帧即认为是视觉稳定的时间点，也就是首屏时间点。",-1),u=s("p",null,"除了首屏时间，其他性能测试如白屏时间、卡顿等，我们也可以采用本讲提到的 4 大步骤进行。现在给你留个问题：",-1),m=s("blockquote",null,[s("p",null,"我里面并没有提卡顿指标 FPS 如何获取，那么请问如何利用本讲的性能测试方案去获取呢？")],-1),C=s("p",null,"欢迎在评论区写下你的思考。下一讲我们将介绍，Hybrid 下的性能优化整体分析。",-1);function v(g,b,f,B,k,q){const a=o("Image");return e(),t("div",null,[y,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/24/3E/Cgp9HWBYQqyAbswwAAD1t7w10sA670.png"}),E,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/24/3E/Cgp9HWBYQr-AQ0NzAAS9vRqw_FA271.png"}),i,d,p(a,{alt:"溪风的思维导图11.png",src:"https://s0.lgstatic.com/i/image6/M01/27/94/CioPOWBdR8KAbhPpAAJvPUBn40U138.png"}),F,h,D,_,A,u,m,C])}const V=l(r,[["render",v]]);export{P as __pageData,V as default};

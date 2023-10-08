import{_ as p,j as t,o as e,g as o,k as a,h as n,Q as c,s as l}from"./chunks/framework.4e7d56ce.js";const I=JSON.parse('{"title":"第43讲：UI自动化测试持续集成","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(366) 第43讲：UI 自动化测试持续集成.md","filePath":"posts/devops/110-测试开发核心技术文档/(366) 第43讲：UI 自动化测试持续集成.md","lastUpdated":1696682708000}'),i={name:"posts/devops/110-测试开发核心技术文档/(366) 第43讲：UI 自动化测试持续集成.md"},r=c(`<h1 id="第43讲-ui自动化测试持续集成" tabindex="-1">第43讲：UI自动化测试持续集成 <a class="header-anchor" href="#第43讲-ui自动化测试持续集成" aria-label="Permalink to &quot;第43讲：UI自动化测试持续集成&quot;">​</a></h1><p>本课时我们开始进入 UI 自动化测试持续集成的学习。</p><h3 id="技术配置" tabindex="-1">技术配置 <a class="header-anchor" href="#技术配置" aria-label="Permalink to &quot;技术配置&quot;">​</a></h3><p>学习 UI 自动化测试持续集成的基本流程，需要先了解打包依赖的过程：</p><ol><li>在项目里使用 pip freeze 命令 ，把所有的项目依赖打包到一个文件中；</li><li>通过下述命令将该依赖放到版本管理中。</li></ol><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pip freeze </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> requirements.txt</span></span>
<span class="line"><span style="color:#E1E4E8;">git add requirements.txt </span></span>
<span class="line"><span style="color:#E1E4E8;">git commit</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">m </span><span style="color:#9ECBFF;">&#39;add requirements.txt&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">git push</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pip freeze </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> requirements.txt</span></span>
<span class="line"><span style="color:#24292E;">git add requirements.txt </span></span>
<span class="line"><span style="color:#24292E;">git commit</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">m </span><span style="color:#032F62;">&#39;add requirements.txt&#39;</span></span>
<span class="line"><span style="color:#24292E;">git push</span></span></code></pre></div><p>一旦到了部署环境，当我们想把所有的依赖重新安装起来时，可以使用以下命令安装所有的依赖。：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pip install </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">r requirements.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pip install </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">r requirements.txt</span></span></code></pre></div><p>我们需要提前在测试环境里重新安装整个 Python 的虚拟环境。目前我们所在的环境称之为本地开发环境。我会在本地进行开发，一旦需要测试持续集成时，就把它布置到远程服务器，因此远程服务器也需要安装对应的 venv 文件。如果远程部署的话，我们可以使用 Build Shell 流程。在这个流程里面，我们可以这样来写代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#解决环境初始化问题，如果没有 venv 环境，创建并安装依赖</span></span>
<span class="line"><span style="color:#E1E4E8;">[ </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">d tutorial</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">env ] </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> python </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">m venv tutorial</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">env</span></span>
<span class="line"><span style="color:#E1E4E8;">#加载 venv 环境</span></span>
<span class="line"><span style="color:#E1E4E8;">source tutorial</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">env</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">active</span></span>
<span class="line"><span style="color:#E1E4E8;">#更新依赖</span></span>
<span class="line"><span style="color:#E1E4E8;">pip install </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">r requirements.txt</span></span>
<span class="line"><span style="color:#E1E4E8;">#运行接口测试，并主动生成 junit 测试结果和 allure2 的报告</span></span>
<span class="line"><span style="color:#E1E4E8;">python </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">m pytest </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">junitxml</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">junit.xml </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">alluredir</span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;">allure_results</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> test_web</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#解决环境初始化问题，如果没有 venv 环境，创建并安装依赖</span></span>
<span class="line"><span style="color:#24292E;">[ </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">d tutorial</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">env ] </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> python </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">m venv tutorial</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">env</span></span>
<span class="line"><span style="color:#24292E;">#加载 venv 环境</span></span>
<span class="line"><span style="color:#24292E;">source tutorial</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">env</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">active</span></span>
<span class="line"><span style="color:#24292E;">#更新依赖</span></span>
<span class="line"><span style="color:#24292E;">pip install </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">r requirements.txt</span></span>
<span class="line"><span style="color:#24292E;">#运行接口测试，并主动生成 junit 测试结果和 allure2 的报告</span></span>
<span class="line"><span style="color:#24292E;">python </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">m pytest </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">junitxml</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">junit.xml </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">alluredir</span><span style="color:#D73A49;">==</span><span style="color:#24292E;">allure_results</span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> test_web</span></span></code></pre></div><p>代码中首先判断目录是否存在，tutorial-env 是目录名，可以随意命名。如果这个目录不存在，也可以使用后面的代码创建它。接下来使用 source 命令，加载虚拟环境，从而进入虚拟环境。</p><p>下载完成之后再使用 pip install -r 参数把所有的依赖重新安装，这时通常也会更新一些依赖，等待更新完成之后，就可以执行测试用例了。</p><p>junitxml 代表输出结果存在一个 junit 格式的文件，xml 文件里保存了测试用例的成功与失败状态。而 alluredir 路径存放了 allure 的测试报告。最后指定一个 test_web 目录，在这个目录下存放了web自动化测试用例。</p><p>关于 UI 自动化测试持续集成，Web 端和移动端的原理也是一样的，通常 Web 和 App 以及接口相对来说都是独立运行的，所以这里只以 Web 为例。test_web 目录下有非常多的内容，包括 test_case、po case 等，我们会重点运行这两部分 case。</p><p>接下来你就可以按照上述展示代码，把对应的命令拷贝放到 Job Build 下，当你的 Job Build 配置完成以后，就可以执行 Build 了，构建完成后系统会生成一个报告，因为我们需要把测试结果采集上来，所以这里会使用一个叫作 Publish JUnit test result report 的插件，它可以帮助我们加载、解析 JUnit 的测试结果。</p><p>还有一个allure2 的测试报告，这里使用的是 Allure Report 插件，它可以帮助我们找到当前路径下的 allure_results 目录，从而分析出对应的测试结果。所有的插件依赖的文件路径其实就是我们前面执行测试时指定的两个路径，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">python </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">m pytest </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">junitxml</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">junit.xml </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">alluredir</span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;">allure_results</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> test_web</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">python </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">m pytest </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">junitxml</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">junit.xml </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">alluredir</span><span style="color:#D73A49;">==</span><span style="color:#24292E;">allure_results</span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> test_web</span></span></code></pre></div><p>以上就是整个 job 的配置。</p><h3 id="项目描述" tabindex="-1">项目描述 <a class="header-anchor" href="#项目描述" aria-label="Permalink to &quot;项目描述&quot;">​</a></h3><p>接下来，我带你看一下 job完整的configure ，来了解项目的完整描述。</p><p>项目的基本描述叫霍格沃兹测试学院演练项目，然后指明在 seveniruby 节点上进行运行。如图所示：</p>`,21),E=l("p",null,"Git 地址就是我们在线的 Git 地址，如图所示：",-1),y=l("p",null,"job 的周期性构建，设置 10 分钟周期性构建一次，每隔 5 分钟执行poll build，如图所示：",-1),u=l("p",null,"接下来是 Build 构建过程，也就是执行我们前面讲到的相关命令，如图所示：",-1),g=l("p",null,"接着是 Post-build Action ，里面是填了 allure_results，如图所示：",-1),d=l("p",null,"再接下来是 Publish JUnit test result report，这里填的是 junit_xml ，如图所示：",-1),m=l("p",null,"如果你需要更多的分析结果，可以点开左下角的 Add post-build action 按钮，就能找到更多的功能，比如，测试完成的结果要不要自动发一封邮件提醒，测试完成之后要不要自动提交到 GitHub，你都可以通过这些内容来完成更多功能的配置。",-1),h=l("p",null,"项目配置完成后运行。点击 Build Now 可以进行调度，它会调度我们的远程节点，你可以看到，它会开始启动测试用例对应的 Web 测试，也就是我们之前所写过的一个 case 。等 case 执行完成，你可以看到它就多了一层任务，如图所示：",-1),_=l("p",null,"刷新一下，就可以看到整个测试的结果，JUnit 下面存的是所有的测试结果，你可以点击进去，就会看到所有正在跑的测试用例。",-1),A=l("p",null,"然后打开 Allure ，在这里可以查看全部 case 数量以及每个 case 的状态，你也可以点进来查看每个子节点的基本情况，可以看到你有 4 个测试用例。",-1),v=l("p",null,"以上，就是整个结果的展示，只要按照我刚才说的流程配置好，就可以完成 UI 自动化测试持续集成。",-1),b=l("p",null,"App 跟这个流程是类似的，如果设备众多，需要使用一些类似STF、selenium grid的测试平台解决方案，因为比较复杂，就不再小课中讲解了。如果有感兴趣学习的同学，可以关注拉勾与霍格沃兹测试学院合作的测试开发大课。",-1),C=l("p",null,"通过本课时，你已经知道了 UI 自动化测试如何持续集成。下节课我将会讲解接口测试怎么完成，我们下节课再见。",-1);function F(q,D,x,P,j,k){const s=t("Image");return e(),o("div",null,[r,a(s,{alt:"image001.png",src:"https://s0.lgstatic.com/i/image/M00/13/B8/Ciqc1F7Pi2yAS6TYAAFk9oROVHE328.png"}),n(),E,a(s,{alt:"image003.png",src:"https://s0.lgstatic.com/i/image/M00/13/B8/Ciqc1F7Pi3SAYbthAAEpID2p-GM827.png"}),n(),y,a(s,{alt:"image005.png",src:"https://s0.lgstatic.com/i/image/M00/13/C4/CgqCHl7Pi36ATlVwAAEVT5YofTI913.png"}),n(),u,a(s,{alt:"image007.png",src:"https://s0.lgstatic.com/i/image/M00/13/B8/Ciqc1F7Pi4WAC1w6AAFCuLvR1f4100.png"}),n(),g,a(s,{alt:"image009.png",src:"https://s0.lgstatic.com/i/image/M00/13/B9/Ciqc1F7Pi4uAfZNiAACQtmL-_pA173.png"}),n(),d,a(s,{alt:"image011.png",src:"https://s0.lgstatic.com/i/image/M00/13/C4/CgqCHl7Pi5KAJt3rAAD80r8f5Sw405.png"}),n(),m,a(s,{alt:"image013.png",src:"https://s0.lgstatic.com/i/image/M00/13/B9/Ciqc1F7Pi5mARPZyAAHakJHJY2A669.png"}),n(),h,a(s,{alt:"image015.png",src:"https://s0.lgstatic.com/i/image/M00/13/B9/Ciqc1F7Pi6CAB-ePAADig76NE3U696.png"}),n(),_,a(s,{alt:"image017.png",src:"https://s0.lgstatic.com/i/image/M00/13/B9/Ciqc1F7Pi6yAFLJnAAICnidwOeg549.png"}),n(),a(s,{alt:"image019.png",src:"https://s0.lgstatic.com/i/image/M00/13/B9/Ciqc1F7Pi7KARRxEAACyqN0MnhI284.png"}),n(),a(s,{alt:"image021.png",src:"https://s0.lgstatic.com/i/image/M00/13/B9/Ciqc1F7Pi7iAWX7ZAADKXMwC0-I428.png"}),n(),A,a(s,{alt:"image023.png",src:"https://s0.lgstatic.com/i/image/M00/13/C4/CgqCHl7Pi8GAVqs-AAC8LoEU3NQ852.png"}),n(),a(s,{alt:"image025.png",src:"https://s0.lgstatic.com/i/image/M00/13/B9/Ciqc1F7Pi8eAWX16AAGtc_LHHas101.png"}),n(),a(s,{alt:"image027.png",src:"https://s0.lgstatic.com/i/image/M00/13/C4/CgqCHl7Pi8yAM8y9AAHPZBpGzCY544.png"}),n(),v,b,C])}const f=p(i,[["render",F]]);export{I as __pageData,f as default};

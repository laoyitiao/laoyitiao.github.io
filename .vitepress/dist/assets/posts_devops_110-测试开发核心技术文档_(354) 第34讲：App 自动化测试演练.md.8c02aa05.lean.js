import{_ as n,j as o,o as i,g as a,k as e,h as s,s as t}from"./chunks/framework.4e7d56ce.js";const ft=JSON.parse('{"title":"第34讲：App自动化测试演练","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(354) 第34讲：App 自动化测试演练.md","filePath":"posts/devops/110-测试开发核心技术文档/(354) 第34讲：App 自动化测试演练.md","lastUpdated":1696682708000}'),_={name:"posts/devops/110-测试开发核心技术文档/(354) 第34讲：App 自动化测试演练.md"},c=t("h1",{id:"第34讲-app自动化测试演练",tabindex:"-1"},[s("第34讲：App自动化测试演练 "),t("a",{class:"header-anchor",href:"#第34讲-app自动化测试演练","aria-label":'Permalink to "第34讲：App自动化测试演练"'},"​")],-1),d=t("br",null,null,-1),u=t("p",null,"本课时我们开始进入 App 自动化测试的实战环节，首先我们来看下如何编写 App 自动化测试的测试用例，在上一课时我们先后学会了关于股票搜索、股票选股，以及行情的测试场景，现在我们把这三个场景组合到一起，然后放到一个 PO 里面，我们看下如何修改代码。",-1),h=t("h2",{id:"app-自动化测试用例",tabindex:"-1"},[s("App 自动化测试用例 "),t("a",{class:"header-anchor",href:"#app-自动化测试用例","aria-label":'Permalink to "App 自动化测试用例"'},"​")],-1),p=t("br",null,null,-1),r=t("p",null,"首先，我们回到 main page，在 main page 中增加了 trade，也就是交易页，所以我们把之前关于交易页的测试用例合并到 PO 里面，这是第一个改动点。",-1),A=t("br",null,null,-1),g=t("p",null,"第二个改动点是 TradePage，TradePage 继承自 BasePage，我们同时把进入 A 股市场、开户功能完整的放进来，然后再加上页面关闭功能，把这三个功能都放到同一个 PO 里。",-1),m=t("br",null,null,-1),b=t("br",null,null,-1),C=t("p",null,"然后再来看 TestTrade，在 TestTrade 中打开 A 股市场、开户，然后简单填写验证码， 这里因为我没有拿真实手机号进行测试所以没有添加断言，case 完成之后，就可以通过 PO 模式运行了。",-1),P=t("br",null,null,-1),N=t("br",null,null,-1),M=t("p",null,"现在，我们有了前面学习自动化测试的基础，又有了 PO 的维护模式，接下来所有的 case 都可以按照这个模式进行维护，可以把更多业务的自动化测试和加进来。",-1),k=t("br",null,null,-1),f=t("p",null,"第二点就是测试流程需要清晰，我们基于 Page Object 模式可以写出业务逻辑非常清晰的测试用例，有利于后期的维护。",-1),S=t("br",null,null,-1),O=t("p",null,"第三点是我们使用标准的测试管理框架，比如 Pytest，Pytest 是 Python 里面最好的测试管理框架，所以我给你推荐 Pytest，然后是 Allure2 测试报告框架，测试完成之后我们自然需要截图，甚至需要录屏，这些重要的数据也包括关键的日志信息，都需要整理到报告中，所以需要使用 Allure2 测试报告框架。",-1),T=t("h2",{id:"多设备运行-case",tabindex:"-1"},[s("多设备运行 case "),t("a",{class:"header-anchor",href:"#多设备运行-case","aria-label":'Permalink to "多设备运行 case"'},"​")],-1),q=t("br",null,null,-1),x=t("p",null,"接下来，我们看下如果我们在公司负责维护 case，还需要做哪些事情，首先是多设备的运行，当你有 200 条 case 的时候，一条 case 跑完大概需要几分钟，但 200 条加起来的时间就会非常长，在这个过程中我们自然需要加速运行，这时就需要使用更多的设备并行地运行 case。",-1),v=t("br",null,null,-1),J=t("p",null,"关于并行运行行业里有很多方法，最常见的我把它们归为三类，第一类叫作多进程模式，通过多个进程同时跑 case，或是不同的 case 分成多个进程来跑，这就叫作多进程模式。第二个是多线程，多线程我们可以使用 Python 的多线程加同步锁机制来保障。第三个是分布式，可以借助 Jenkins 将 case 部署到多台机器上。",-1),y=t("br",null,null,-1),E=t("p",null,"总体上这三类用得比较多，因为篇幅原因今天主要给你介绍多进程的方式。",-1),F=t("br",null,null,-1),G=t("br",null,null,-1),V=t("p",null,"我们来看下多进程模式如何实现，当我们有多台设备的时候，如果 case 不做修改的话默认只会在一台机器上运行，现在我们想使用多台设备同时运行，就需要你对测试代码进行一定的调整了。",-1),j=t("br",null,null,-1),B=t("p",null,"怎么调整呢？我们来具体看下，如果我们的 Appium 要运行在某一台具体的设备上，通常需要设置一个 udid 的标记，udid 代表了设备的名字，既然在运行的过程中它需要根据一定的条件去跑不同的设备，自然就需要有一个能控制它的地方，采用多进程方式我们可以使用环境变量的方法，比如在代码中使用 os.getenv 就可以从 环境变量里读取传进来的 udid 变量，然后 Appium 在运行的过程中就可以发现 udid，它会运行在 udid 指定的设备上，那 udid 是如何传递的呢？我们可以在 pytest 运行脚本的时候传进去一个环境变量。",-1),Q=t("br",null,null,-1),I=t("p",null,"你会发现使用多进程非常的简单，也不需要做什么大改造，没有太大的设计成本。如果要实现并行运行，则需要添加三个重要的参数。",-1),L=t("br",null,null,-1),U=t("br",null,null,-1),D=t("p",null,"首先，需要指定 udid，即 case 运行在那台设备上。其次是 systemPort，systemPort 是一个底层映射的端口，这个端口默认是一样的，但如果是多台设备映射到同一个端口的情况下是有冲突的，所以我们需要为每一次运行设置 systemPort 为不同端口，在这方面我们可以自己封装一个功能，这里的 utils.free_port 可以完成随机端口分配。",-1),K=t("br",null,null,-1),Z=t("p",null,"第三个参数也是一样的，chromedriverPort 每次运行也是默认同一个端口，在这里需要设置可用的端口让它们彼此能够分开，所以设置了这三个重要的参数基本上并行运行就没有问题了，现在我们已经可以通过环境变量影响 case 在那台设备运行了。",-1),$=t("br",null,null,-1),w=t("p",null,"怎么跑呢？我们分别开启两个进程，每个进程分别传入不同的 udid变量，然后两个 case 就可以分别在两台设备上运行了，基于这样的原理，就可以对测试用例进行并行运行了。",-1),H=t("br",null,null,-1),R=t("br",null,null,-1),X=t("p",null,"通过这样的方法就可以控制不同的设备了，接下来我们写一个运行脚本，供你参考。",-1),Y=t("br",null,null,-1),z=t("br",null,null,-1),W=t("p",null,"在脚本中，首先创建了一个 Shell 下的命名管道，这个命名管道可以方便我们从特定文件里进行读和写，这里定义了一个新的文件描述符 3，它如果读管道中没有内容就会一直等待，如果有内容就会读取其中的内容。",-1),tt=t("br",null,null,-1),st=t("p",null,"你可以看到 adb devices 命令获取了当前的所有设备，并把它写到管道里面，接下来寻找所有的case，对于找到的每一个 case，分别从管道描述符3里读取可用设备，读取到设备之后会把 udid 传递给 pytest，然后就可以运行了，以此类推，如果管道中没有设备就会一直等待。",-1),lt=t("br",null,null,-1),et=t("p",null,"最后，等每个 case 执行完成之后，需要把设备回收到管道，你可以通过 echo 实现，它模拟的是生产者消费者模式，通过这样一个简单的脚本就可以做到很好的并行。",-1),nt=t("br",null,null,-1),ot=t("h2",{id:"设备管理平台",tabindex:"-1"},[s("设备管理平台 "),t("a",{class:"header-anchor",href:"#设备管理平台","aria-label":'Permalink to "设备管理平台"'},"​")],-1),it=t("br",null,null,-1),at=t("p",null,"我们了解了多进程如何在本地并行执行 case，接下来我们看下其他的一些方案，关于多设备管理，行业里最普遍的做法是采用开源的 STF 平台，STF 是一个完善的设置管理平台，你可以把所有的设备放到这个平台进行维护，它会提供一些在线的 API，我们可以通过编写脚本的方式远程申请设备，然后在远程使用，STF 平台会负责管理设备，你只需要维护好测试用例就可以了。",-1),_t=t("br",null,null,-1),ct=t("br",null,null,-1),dt=t("p",null,"第二个方案叫作 Selenium Grid，Selenium Grid 相比 STF 各有优缺点，STF 的优点是提供了在线调试功能，可以交互式地完成所有 case 的自动化测试或手动测试，而 Selenium Grid 更强调自动化测试的能力，它允许你使用和 Appium 一样的技术栈来维护设备，所以可以同时支持android、ios与web。",-1),ut=t("br",null,null,-1),ht=t("br",null,null,-1),pt=t("p",null,"如果你公司的 case 很多，可以搭建这样的一套系统，这套系统中 Jenkins 负责分布式的分发任务，Jenkins下面链接了很多 PC 的节点，其中每一个 PC 节点里面都可以申请对应的设备，比如说 Jenkins 下发任务后 PC 会从 STF 上申请对应的设备完成测试用例，整体的分布式架构就采用这样的模式。",-1),rt=t("br",null,null,-1),At=t("p",null,"我们来简单总结下，多进程可以使用简单的脚本进行控制，多线程需要你在代码里加入一些多线程的同步机制，而分布式，可以通过 Jenkins 完成任务的分发。",-1);function gt(mt,bt,Ct,Pt,Nt,Mt){const l=o("Image");return i(),a("div",null,[c,d,u,h,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/19/Ciqah16NtACAUF8lAAQf_Hahfgk045.png"}),s(),p,r,A,g,m,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/30/Cgq2xl6NtACAHcCKAAQgkCjU2kQ662.png"}),s(),b,C,P,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/19/Ciqah16NtAGALOBMAAEVshqVjrM187.png"}),s(),N,M,k,f,S,O,T,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/30/Cgq2xl6NtAGAfFZDAADGJoLu_4o967.png"}),s(),q,x,v,J,y,E,F,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/19/Ciqah16NtAGAbvkgAAEtZZd03NQ031.png"}),s(),G,V,j,B,Q,I,L,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/30/Cgq2xl6NtAKAYTO7AAOSmhgREJE845.png"}),s(),U,D,K,Z,$,w,H,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/19/Ciqah16NtAKAElE_AAEe_8TqOJU947.png"}),s(),R,X,Y,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/19/Ciqah16NtAOAJgVVAAIAM8cmLkE096.png"}),s(),z,W,tt,st,lt,et,nt,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/30/Cgq2xl6NtAOAMnVwAACGMeaLObg381.png"}),s(),ot,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/19/Ciqah16NtAOAMdvKAALVXDSU3JQ190.png"}),s(),it,at,_t,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/30/Cgq2xl6NtASANd6ZAAHj4h7NexQ915.png"}),s(),ct,dt,ut,e(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/19/Ciqah16NtASAGIjjAAFSs7BwBQA751.png"}),s(),ht,pt,rt,At])}const St=n(_,[["render",gt]]);export{ft as __pageData,St as default};

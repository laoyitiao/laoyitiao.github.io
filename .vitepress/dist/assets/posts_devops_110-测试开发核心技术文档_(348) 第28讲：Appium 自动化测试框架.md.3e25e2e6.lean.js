import{_ as n,j as e,o,g as u,k as l,h as p,s as t,Q as i}from"./chunks/framework.cfb14fe0.js";const rp=JSON.parse('{"title":"第28讲：Appium自动化测试框架","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(348) 第28讲：Appium 自动化测试框架.md","filePath":"posts/devops/110-测试开发核心技术文档/(348) 第28讲：Appium 自动化测试框架.md","lastUpdated":1696682708000}'),a={name:"posts/devops/110-测试开发核心技术文档/(348) 第28讲：Appium 自动化测试框架.md"},r=t("h1",{id:"第28讲-appium自动化测试框架",tabindex:"-1"},[p("第28讲：Appium自动化测试框架 "),t("a",{class:"header-anchor",href:"#第28讲-appium自动化测试框架","aria-label":'Permalink to "第28讲：Appium自动化测试框架"'},"​")],-1),_=t("p",null,"本课时我们进入移动 App 自动化测试的学习。",-1),c=t("h2",{id:"app-测试框架",tabindex:"-1"},[p("App 测试框架 "),t("a",{class:"header-anchor",href:"#app-测试框架","aria-label":'Permalink to "App 测试框架"'},"​")],-1),A=t("p",null,"首先来看一下 App 自动化测试领域里有多少框架是我们可以使用的？",-1),d=t("br",null,null,-1),m=t("br",null,null,-1),h=t("p",null,"如图所示，将行业里比较知名的框架整理在一起。从图中我们可以看到 Android 与 iOS 都有一些成熟的工具可以用于各自的自动化测试。那么这些工具有什么区别呢？",-1),b=t("br",null,null,-1),g=i("",15),S=t("br",null,null,-1),C=t("p",null,"我们先看一下 Appium 的设计理念。 Appium 需要在你的 PC 机上开启一个 server。这个 server 会监听一个特定的端口，等待你的客户端发送请求。当它收到请求之后，会调用手机上的 agent，agent 是一个独立的角色，特定平台上会有不同的 agent，它可以驱动你的 App 并且完成对应的自动化。",-1),D=t("br",null,null,-1),P=t("p",null,"Appium 的整体理念跟 Selenium 是趋向一致的，它跟 Selenium 一样接受多个语言的客户端发送的的webdriver http请求，进行统一的处理后，再调用各个手机上的驱动。所以在整个技术架构上appium与selenium拥有同样的理念。",-1),q=t("br",null,null,-1),v=t("p",null,"那么 Appium 底层有多少个引擎？我对官方文档进行了一个梳理。",-1),I=t("br",null,null,-1),T=t("br",null,null,-1),k=t("p",null,"在 Android 平台上它有两大主流体系，一个体系是基于底层的 espresso，另一个叫作 selendroid。它们其实都是从 Android 最底层的 Instrumentation 框架中扩展而来的。目前 espresso 已经成为官方正式支持的一个驱动。",-1),y=t("br",null,null,-1),M=t("p",null,"第 2 个是跨应用的测试，它主要基于 uiautomator，uiautomator 分 1 代跟 2 代，目前主流支持的是 uiautomator 2。在 iOS 平台上，早期它支持的是 uiautomation。Xcode8 之后，把 uiautomation 废弃掉了，现在主流使用的是 xcuitest。xcuitest 其实就是 Facebook 所开源的 WDA（web driver agent）框架。",-1),O=t("br",null,null,-1),x=t("br",null,null,-1),F=t("p",null,"除此之外，Appium 也支持 Mac 和 Windows。从图中可以看到，目前官方主流支持的是 uiautomator2 和 espresso。espresso 更快，uiautomator 更全面一点。iOS 官方支持的是 xcuitest 驱动。那么 Appium 为什么能在 Android 上支持的那么全面？因为它的底层横跨两个框架体系，巧妙的借助 Android 的两个自动化测试体系生态，一个是 Instrumentation，一个是 Automator，借助这两个技术栈，它就可以实现 Android 所有版本的自动化支持。",-1),N=t("br",null,null,-1),f=t("p",null,"在 iOS 平台上也类似，iOS 在 Xcode8 以下支持 Automation，在 Xcode8 之后，它也开始支持 XCTest。所以借助多个技术栈的支持，Appium 实现了对 Android 与 iOS 的同时支持。",-1),E=t("br",null,null,-1),B=i("",15),W=i("",31),V=t("br",null,null,-1),H=t("p",null,"首先，看一下如何获取 App 的入口。我们看一下我的设备，可以看到在我的本地有一台设备，这次演练的对象是手机上的雪球股票这款 App。我们打开命令行，输入 adb devices。这个命令如果能执行，说明你的 SDK 基本上已经安装对了。",-1),J=t("br",null,null,-1),K=t("p",null,"现在页面上有一台设备，那么我要如何去找入口呢？通常我会使用 logcat| grep -i displayed 这个命令来找入口。",-1),R=t("br",null,null,-1),U=t("br",null,null,-1),X=t("p",null,"当你通过命令第 1 次启动 App 的时候，它会自动展示出 App 的入口。这是一个命令执行，执行完成之后，我们回到模拟器，启动 App。",-1),j=t("br",null,null,-1),G=t("br",null,null,-1),w=t("p",null,"你可以看到现在 App 已经开始启动了，这个时候回到命令行，上面显示的关于 App 的第 1 条记录，其实就是 App 的入口。我们把它复制下来，结束命令。",-1),Q=t("br",null,null,-1),Y=t("p",null,"那么我们怎么去验证入口对不对呢？这个时候可以使用另外一个叫 adb shell am start-W -S -n 的命令，它表示自动去启动一个 App，如果这个命令能启动，代表你找的入口是对的，如果不能启动，说明你找的入口是有问题的。",-1),L=t("br",null,null,-1),z=t("br",null,null,-1),$=t("p",null,"下面我来为你演示一下，输入 adb shell am start-W -S -n 这个命令，后面加上你所指向的app入口路。如果它能够正常启动，就说明 App 入口找对的。经过我们这样一次启动之后，它会杀掉原来的进程，再次启动。如果说它能够正常的启动，也说明你的路径是对的。",-1),Z=t("br",null,null,-1),tt=t("p",null,"现在命令执行正常，说明我们刚才找的入口是对的。一旦有了正确的入口，接下来就简单了。",-1),pt=t("br",null,null,-1),st=t("br",null,null,-1),lt=t("p",null,"我们进入 Appium Desktop。首先带你看一下 Appium Desktop 的界面。我已经装好了这个软件，如果你想知道如何安装，可以去搜一下工具的官方地址，你可以在上面下载各自平台所对应的Appium Desktop。",-1),it=t("br",null,null,-1),nt=t("br",null,null,-1),et=t("p",null,"现在我们开始启动 Appium Desktop，然后点击 inspect，在里面你可以看到有一定的参数让你选择。通常我们会填这样几个参数，第 1 个是平台名字，这表示你要做的是 Android 还是 iOS 的自动化测试。第 2 个是设备名字，在 Android 设备下 divicename 默认值是空的，你可以随便写一个值。 第 3 个是 appPackage 和 appActivity，appPackage 就是我们刚才所找到的包，appActivity 是我们刚才所找到的入口，也就是我们在 adb shell am start-W-S- 这个后面填入的路径。",-1),ot=t("br",null,null,-1),ut=t("br",null,null,-1),at=t("p",null,"斜杠前面叫包名，后面的叫 activity。 activity 你可以理解成是窗口的意思。一个进程加上一个窗口，便形成了它的入口。通常我们还会额外加一个叫 autoGrantPermission 的参数，因为雪球可能会自动声明一些权限，你只要自动把权限全部给它就可以了。",-1),rt=t("br",null,null,-1),_t=t("p",null,"这些选项配置完成后我们点击 Start Session，开始启动 App。在第 1 次启动过程中，它会往你的手机上安装一些初始的 APK，比如说锁屏、解锁或者是系统设置的 APK。如果你是真机，可能还会弹出来一些安装提示，你只要允许通过就可以了。这些只有在第 1 次安装的时候才可能会需要。",-1),ct=t("br",null,null,-1),At=t("p",null,"现在可以看到后台的 mumu 模拟器已经开始启动 App 了，App 启动后，会自动同步你的手机，但有的时候会有延迟，如果有延迟的话，你点一下刷新就可以了。",-1),dt=t("br",null,null,-1),mt=t("br",null,null,-1),ht=t("p",null,"App 启动后就弹出来一个升级，我们点击关闭，页面上有一个按钮 tap，它可以模拟一次点击操作，这次我们要录制一个 case，同时要把整个过程录下来。我们点击 start recording，它会录制整个操作过程。",-1),bt=t("br",null,null,-1),gt=t("br",null,null,-1),St=t("p",null,"我们先选中控件，然后使用 Tap 模拟点击事件。接下来就会进入这个界面，我们进行搜索，继续后点击 Tap，它看起来是一个输入框，其实只是一个普通的控件，真正的输入是在搜索栏进行的。",-1),Ct=t("br",null,null,-1),Dt=t("br",null,null,-1),Pt=t("p",null,"在页面上点击 Send Keys 并输入搜索内容，比如我们搜alibaba，点击 Send Keys，这个时候你会发现它会找到多条结果，我们选中其中一个，点击 Tap。",-1),qt=t("br",null,null,-1),vt=t("br",null,null,-1),It=t("p",null,"这样就进入股票的搜索结果页，我们的 case 就先录制这么长。当我们点击停止录制后，你可以看到它生成了一段 Python 代码，这段 Python 代码相对来说比较短，只有短短的几行。这时你可以打开显示样板代码按钮。一旦选中它就会打印一个完整的 Python 脚本。它还可以自动帮你生成几种主流语言的脚本，除了 Python 之外，你也可以去生成 Java 和 Ruby 等各种语言的脚本。",-1),Tt=t("br",null,null,-1),kt=t("p",null,"我们这次主要使用 Python，所以就让它生成 Python 脚本。打开显示样板代码，并把样板代码全部提取出来并拷贝，然后我们回到 IDE。",-1),yt=t("br",null,null,-1),Mt=t("p",null,"为这次自动化测试我们创建一个叫 test App 的包，并在 test App 中创建一个子包 demo，表示我们第 1 次的录制。接下来我们把脚本拷贝过来。到这一步我们就获得了一个官方给我们自动生成的脚本，非常的简单。接下来我们就试着去重新运行一下它。",-1),Ot=t("br",null,null,-1),xt=t("br",null,null,-1),Ft=t("p",null,"首先我们把 session 关闭，这个时候 Appium 仍然是处于 server 正在 running 的状态，这表示 Appium 仍然在运行，我们还可以继续使用 Appium。",-1),Nt=t("br",null,null,-1),ft=t("p",null,"我们看一下脚本，脚本运行有报错，我们用 IDE 帮我们安装对应的包，点击链接，它会自动去寻找 Appium 相关的包并安装。",-1),Et=t("br",null,null,-1),Bt=i("",17),Wt=t("br",null,null,-1),Vt=t("p",null,"接下来我们需要完成对应的测试用例，这次测试的是搜索功能，我们可以写一个 test_search。它里面的代码可以缩进一下。其中的 driver 我们需要全部改成 self.driver。",-1),Ht=t("br",null,null,-1),Jt=t("p",null,"这个代码其实还有很多地方需要改进，我会在下一课时里带你逐渐完善它。",-1),Kt=t("br",null,null,-1),Rt=t("p",null,"通过这样一次创建，基本上 case 已经成型了，我们再重新运行一下。当然这个时候还没有断言，只是简单的做了一次改造。等到下一课时，我们就需要使用我们自己的 Appium Server 做自动化测试了，而不再使用图形化的 Desktop。",-1),Ut=t("br",null,null,-1),Xt=t("p",null,"现在启动，case 通过。这个入门级的代码我们就先写到这儿。",-1),jt=t("br",null,null,-1),Gt=t("p",null,"最后，我们一起回顾一下刚才所做的事情。我们使用 Appium Desktop 生成一个用例的模板，这个 Desktop 的功能也很强大，它有 UI 分析、case 录制、元素查找测试等功能。作为新手入门，你可以先从 Desktop 入手。",-1),wt=t("br",null,null,-1),Qt=t("p",null,"一旦录制了 case，接下来我们就要去运行它，只需要把代码放到脚本里面，然后加入隐式等待增强稳定性，就可以重新运行了。",-1),Yt=t("br",null,null,-1),Lt=t("br",null,null,-1),zt=t("p",null,"如果说要编写一个测试用例，首先我们需要下载每个语言的客户端，比如说这次使用了 Python，我们就要去找到 Python 的 Client，Python Client 通过 PyCharm 可以自动帮我们安装对应的依赖。所需要的一个环境就是 PyCharm 以及你的 Pytest 框架，还包括 Appium 的 Python Client，这个 PyCharm 都会自动帮我们安装。",-1),$t=t("br",null,null,-1),Zt=t("br",null,null,-1),tp=t("p",null,"到此为止，你的代码已经可以完整的运行了。如果说你想了解更多的用法，可以看一下官方的文档，在官方的文档里面，它有 Appium/sample-code，里面有一些关于 Python 等各个语言的一些示例代码，你可以从这里面了解它的更多用法。",-1),pp=t("br",null,null,-1);function sp(lp,ip,np,ep,op,up){const s=e("Image");return o(),u("div",null,[r,_,c,A,d,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDceAA45DAAFaiYH-vbQ159.png"}),p(),m,h,b,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7B/CgpOIF5qDceAXR2XAAOjHEYbTOM879.png"}),p(),g,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDceAQ6h9AAEsQFTJKuk505.png"}),p(),S,C,D,P,q,v,I,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7B/CgpOIF5qDceAb_oaAAI80IZEsiE465.png"}),p(),T,k,y,M,O,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDceACqpeAAHDnWNN1yI695.png"}),p(),x,F,N,f,E,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7B/CgpOIF5qDceAEolTAAFtkSjHZCc235.png"}),p(),B,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDciAYgtGAAPYPGG_N4A702.png"}),p(),W,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7B/CgpOIF5qDciAErgXAABhgJgAlVY058.png"}),p(),V,H,J,K,R,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDciAabBgAAQPHFuaeXU658.png"}),p(),U,X,j,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7B/CgpOIF5qDciAcIU-AAC2PjcE0LI886.png"}),p(),G,w,Q,Y,L,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDciAIiHPAACTFTk9L20398.png"}),p(),z,$,Z,tt,pt,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7B/CgpOIF5qDciAWKzfAADba7BNmdo400.png"}),p(),st,lt,it,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDciAFt-iAAFI__XWiiA617.png"}),p(),nt,et,ot,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7B/CgpOIF5qDciAFrcOAAHkLDUXzNY837.png"}),p(),ut,at,rt,_t,ct,At,dt,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDcmATCOfAAI40m93B4A036.png"}),p(),mt,ht,bt,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7B/CgpOIF5qDcmAaVlUAAK4Adx_9zA157.png"}),p(),gt,St,Ct,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDcmAKljiAAIkk6pt3Wc399.png"}),p(),Dt,Pt,qt,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7B/CgpOIF5qDcmAd1N3AAHoOJTsDcM215.png"}),p(),vt,It,Tt,kt,yt,Mt,Ot,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDcmAGANDAAMUJgF1WxQ137.png"}),p(),xt,Ft,Nt,ft,Et,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/CgpOIF5qDcmAb5M7AASgOiJZTrk232.png"}),p(),Bt,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDcmAYGGsAAVH0iL2Jm8334.png"}),p(),Wt,Vt,Ht,Jt,Kt,Rt,Ut,Xt,jt,Gt,wt,Qt,Yt,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/CgpOIF5qDcmAUmIPAAI3FMnIHl0264.png"}),p(),Lt,zt,$t,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/73/7C/Cgq2xl5qDcmAS_PQAAHzJo5IGQo822.png"}),p(),Zt,tp,pp])}const _p=n(a,[["render",sp]]);export{rp as __pageData,_p as default};

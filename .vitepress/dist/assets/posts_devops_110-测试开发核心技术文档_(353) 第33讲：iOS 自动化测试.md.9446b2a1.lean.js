import{_ as i,j as o,o as e,g as c,k as n,h as l,s as t}from"./chunks/framework.4e7d56ce.js";const Ut=JSON.parse('{"title":"第33讲：iOS自动化测试","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(353) 第33讲：iOS 自动化测试.md","filePath":"posts/devops/110-测试开发核心技术文档/(353) 第33讲：iOS 自动化测试.md","lastUpdated":1696682708000}'),_={name:"posts/devops/110-测试开发核心技术文档/(353) 第33讲：iOS 自动化测试.md"},a=t("h1",{id:"第33讲-ios自动化测试",tabindex:"-1"},[l("第33讲：iOS自动化测试 "),t("a",{class:"header-anchor",href:"#第33讲-ios自动化测试","aria-label":'Permalink to "第33讲：iOS自动化测试"'},"​")],-1),u=t("br",null,null,-1),d=t("p",null,"本课时我们开始进入 iOS 自动化测试的学习，首先，我们先来看下 iOS 测试工具体系下的主流测试框架。",-1),p=t("h2",{id:"主流测试框架",tabindex:"-1"},[l("主流测试框架 "),t("a",{class:"header-anchor",href:"#主流测试框架","aria-label":'Permalink to "主流测试框架"'},"​")],-1),h=t("br",null,null,-1),r=t("p",null,"第一个测试框架是 Appium，Appium 是全能的，它可以在各种语言各个平台上运行。其次是 Calabash-iOS KIF 各自也有不少公司在使用。除了这三个框架之外。UIAutomation 框架是苹果官方推出的一个框架，但在 Xcode 8 之后就被废弃了。苹果公司新增加了一个 XCTest 测试框架。Facebook 在 XCTest 的基础上开发了一个叫作 WebDriverAgent（WDA）的框架，它也是 Appium 底层所依赖的自动化测试基础。",-1),A=t("h2",{id:"ios-生态工具",tabindex:"-1"},[l("iOS 生态工具 "),t("a",{class:"header-anchor",href:"#ios-生态工具","aria-label":'Permalink to "iOS 生态工具"'},"​")],-1),g=t("p",null,"如果想做 iOS 测试我们必须了解 iOS 的生态工具，第一个必须要掌握的是 Xcode，Xcode 是 iOS 的综合开发环境，Xcode 是我们重度依赖的工具。还有一个与 Xcode 对应的命令行工具叫作 XcodeBuild，是我们在做自动化测试的过程中离不开的一个工具，还有一个叫 Instruments，它是 Xcode 的综合分析工具，可以帮助你做各种专项的测试工作，最后便是我们依赖的第三方库叫 Libimobiledevice。",-1),m=t("br",null,null,-1),b=t("br",null,null,-1),S=t("p",null,"我们打开 Xcode 的 App，你可以打开右侧正在研发的项目，比如第一个 UICatalog 项目，它是 Appium 给我们提供的一个实例项目，你可以在 GitHub（github.com/appium/ios-uicatalog）上找到并下载到本地，然后就可以使用 Xcode 打开它了。",-1),C=t("br",null,null,-1),O=t("br",null,null,-1),I=t("p",null,"打开之后，你可以看到里面是一个完整的 iOS 项目，在项目里你可以做一些相关的配置，然后编译执行。",-1),f=t("br",null,null,-1),w=t("br",null,null,-1),M=t("p",null,"也可以选择对应的模拟器，比如我们选择 iPhone 8 Plus（13.3）版本，它包含了设备名和版本号，点击开始运行就可以运行 UICatalog 这个 iOS 项目了。",-1),F=t("br",null,null,-1),x=t("br",null,null,-1),q=t("p",null,"当我们选择模拟器点击运行之后 Xcode 就会帮我们编译构建，你也可以看到运行结果，也可以在构建的过程中看到最终打包的地址，然后通过 debug 开启模拟器运行项目，模拟器操作非常简单方便，并且构建过程中可以给我们提供重要的信息。",-1),X=t("br",null,null,-1),D=t("br",null,null,-1),v=t("p",null,"我们点开最后一步，可以看到构建包的地址，",-1),E=t("br",null,null,-1),P=t("br",null,null,-1),T=t("p",null,"然后回到 Xcode 界面，可以看到 Xcode 主要的构建参数是在 General 下，这里有一个 Bundle Id，Bundle Id 下是类似于 Android 的包名，iOS 里面没有 Activity 的概念，它主要是靠包名启动 App 的。",-1),k=t("br",null,null,-1),B=t("br",null,null,-1),y=t("p",null,"同样，系统也自带了很多的模拟器，你也可以选择创建自己的模拟器。",-1),L=t("br",null,null,-1),U=t("br",null,null,-1),N=t("p",null,"还有一些命令行的工具叫作 Command Line Tools，这个也需要打开 Xcode 进行下载。",-1),W=t("br",null,null,-1),V=t("br",null,null,-1),j=t("p",null,"Instruments工具套件是一个专项的测试工具，你目前只需要简单了解就可以了，本课时暂时用不到它。",-1),G=t("h2",{id:"依赖工具包",tabindex:"-1"},[l("依赖工具包 "),t("a",{class:"header-anchor",href:"#依赖工具包","aria-label":'Permalink to "依赖工具包"'},"​")],-1),Z=t("br",null,null,-1),J=t("br",null,null,-1),Q=t("p",null,"如果你想要 Appium 支持 iOS 自动化测试还需要安装这些依赖的工具包，你可以在 Mac 下使用 brew install 安装相应的工具包，所有的安装命令在 Appium 的官方文档里面都可以找到，你可以按照安装说明去安装所有的依赖，安装完之后 Appium 便内嵌了一个 FaceBook 开源的 WebDrivrAgent 项目，这个项目是专门用来做 iOS 自动化测试的，它可以脱离 Appium 独立运行，Appium 只是对它做了一次整合，Appium 底层是通过 WebDrivrAgent 驱动 iOS 自动化测试的。",-1),Y=t("br",null,null,-1),z=t("p",null,"了解了这些之后如果你想在真机上进行测试，还需要学习 App Store 与 Apple 证书体系，因为篇幅原因我们就不对 App Store 与 Apple 证书体系做相关介绍了，想学习的同学可以关注我们的大课。",-1),H=t("br",null,null,-1),K=t("p",null,"有了这些基础知识铺垫之后，iOS 模拟器的自动化测试已经可以做了。",-1),R=t("h2",{id:"测试用例",tabindex:"-1"},[l("测试用例 "),t("a",{class:"header-anchor",href:"#测试用例","aria-label":'Permalink to "测试用例"'},"​")],-1),$=t("br",null,null,-1),tt=t("br",null,null,-1),lt=t("p",null,"接下来我们看一下所拥有的环境，首先，我们通过 Xcode 的构建获取了打包地址，我们需要将这个地址记下来，有了包的地址之后我们还需要 Appium 来完成自动化测试，我们打开项目。",-1),st=t("br",null,null,-1),nt=t("br",null,null,-1),it=t("p",null,"在这里我创建了一个文件叫 test_ios，专门用来测 iOS 包，在 iOS 文件里我们看下怎么去写 iOS 的测试用例。",-1),ot=t("br",null,null,-1),et=t("br",null,null,-1),ct=t("p",null,"首先在 caps 里面指定是 iOS 系统，然后 automationName 指定对应的 xcuitest 自动化测试框架，如果要做 iOS 测试记得一定要去指定它，第三个是设备名，我们选择使用 iPhone 8 Plus。",-1),_t=t("br",null,null,-1),at=t("br",null,null,-1),ut=t("p",null,"到底哪些设备名可以填写呢，我们可以执行 instruments -s devices 命令查看本地所拥有的设备。",-1),dt=t("br",null,null,-1),pt=t("br",null,null,-1),ht=t("p",null,"你可以根据本地的条件进行选择，最后一个参数叫作 app，app 就是刚才构建完成后的包地址，配置完这些参数一个 iOS 模拟器的自动化测试就完成了，接下来的流程就是驱动模拟器完成相应的操作，我们的 case 步骤是打开 UICatalog App，然后点击 Alert Views，随后点击 Text Entry 模拟一个输入操作，然后点击 OK 按钮。",-1),rt=t("br",null,null,-1),At=t("br",null,null,-1),gt=t("p",null,"你可以看到代码是这样写的，driver.find_element 首先根据 ACCESSIBILITY.ID 去进行定位，那怎么进行定位呢？iOS 里面通常通过 ID 和 Accessibility ID 进行定位，它们指向 iOS 的什么属性呢？我们可以在 Appium 的官方文档里面直接找到。",-1),mt=t("br",null,null,-1),bt=t("br",null,null,-1),St=t("p",null,"你可以看到 Accessibility ID 对应的是 iOS的accessibility-id，而 ID 对应的是iOS的name，基于这样的定位策略我们在 iOS 里可以使用 ACCESSIBILITY.ID，测试用例的第三步操作会弹出一个输入框，对于输入框我们可以使用 CLASS_NAME 进行定位，CLASS_NAME 需要填入的是 iOS 的定位符，这个定位符主要是通过 XCUIElementTypeTextField 进行定位，最后通过 ACCESSIBILITY 对 OK 按钮进行定位，整个流程就完成了，我们运行看下效果。",-1),Ct=t("br",null,null,-1),Ot=t("p",null,"运行过程中，首先会安装 App 并启动它，启动之后点击 Alert Views，接着再点击 Text Entry，注意因为模拟器运行比较慢所以等待时间可能有点长，接着会找输入框，你可以看到后台发送了一个请求，对应输入 1234，随后完成相应的流程。",-1),It=t("br",null,null,-1),ft=t("br",null,null,-1),wt=t("p",null,"如果需要对 iOS 进行真机测试，你还需要解决那几个事情呢？你需要配置 xcodeDrgId 和 xcodeSigningId，把这两个参数配置上之后就可以做真机的测试了。",-1),Mt=t("br",null,null,-1),Ft=t("br",null,null,-1),xt=t("p",null,"这里也展示了真机的代码，需要注意 app 的参数一定不能配置错，模拟器和真机所打的包的地址是不一样的。",-1),qt=t("br",null,null,-1),Xt=t("br",null,null,-1),Dt=t("p",null,"在真机测试时还会经常遇到一些小问题，比如需要解决对应 App 的证书配置问题。",-1);function vt(Et,Pt,Tt,kt,Bt,yt){const s=o("Image");return e(),c("div",null,[a,u,d,p,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16FwfmAOjELAADhUznAWFc128.png"}),l(),h,r,A,g,m,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/78/Cgq2xl6FwfmAPWsAAAHwfDOgzAQ535.png"}),l(),b,S,C,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16FwfqAdfHjAAOZJAljkCM724.png"}),l(),O,I,f,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16FwfqAZu0oAAFUbEuMWnE586.png"}),l(),w,M,F,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16FwfqAXeNyAAVs9TvT3Qc290.png"}),l(),x,q,X,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/78/Cgq2xl6FwfuAQFixAAP7S-1EQcs902.png"}),l(),D,v,E,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16FwfuAJAk6AAFd-WSDnZ4648.png"}),l(),P,T,k,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/78/Cgq2xl6FwfuABCtkAAIXervLUNI576.png"}),l(),B,y,L,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16FwfuAWYRRAAIi9UcPz2o035.png"}),l(),U,N,W,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/78/Cgq2xl6FwfuAIu3tAAHNboPuluE202.png"}),l(),V,j,G,Z,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16FwfuATCE-AAHdWgTtXDM650.png"}),l(),J,Q,Y,z,H,K,R,$,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16FwfuAJM_AAAIApYVvI0M485.png"}),l(),tt,lt,st,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/79/Cgq2xl6FwfyALzkzAASjUmdansA422.png"}),l(),nt,it,ot,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16FwfyAcNLwAALw0XBI-V8475.png"}),l(),et,ct,_t,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/79/Cgq2xl6FwfyAG82jAAD3CyUJj_I106.png"}),l(),at,ut,dt,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16Fwf2AB1I1AAP92bSMh54949.png"}),l(),pt,ht,rt,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/79/Cgq2xl6Fwf2AOWtXAAJpPiG8ZT0068.png"}),l(),At,gt,mt,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16Fwf2ARrlQAARt0gKGy-w125.png"}),l(),bt,St,Ct,Ot,It,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/79/Cgq2xl6Fwf2AZlvsAAG7gVjGZAw674.png"}),l(),ft,wt,Mt,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/62/Ciqah16Fwf2ALZgEAAQEol0SYbs378.png"}),l(),Ft,xt,qt,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/79/Cgq2xl6Fwf6ABw4pAAD2chOxCo8950.png"}),l(),Xt,Dt])}const Nt=i(_,[["render",vt]]);export{Ut as __pageData,Nt as default};

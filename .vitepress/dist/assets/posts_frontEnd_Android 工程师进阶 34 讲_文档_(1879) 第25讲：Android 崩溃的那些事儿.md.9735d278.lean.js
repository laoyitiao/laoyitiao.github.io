import{_ as s,j as i,o as c,g as l,k as o,h as a,Q as n,s as t}from"./chunks/framework.cfb14fe0.js";const L=JSON.parse('{"title":"第25讲：Android崩溃的那些事儿","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1879) 第25讲：Android 崩溃的那些事儿.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1879) 第25讲：Android 崩溃的那些事儿.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1879) 第25讲：Android 崩溃的那些事儿.md"},d=n("",9),p=t("p",null,'从官方对其介绍能够看出，对于传入的 Thread，如果因为"未捕获"异常而导致被终止，uncaughtException 则会被调用。我们可以借助它来间接捕获程序异常，并进行异常信息的记录工作，或者给出更友好的异常提示信息。',-1),h=t("h4",{id:"自定义异常处理类",tabindex:"-1"},[a("自定义异常处理类 "),t("a",{class:"header-anchor",href:"#自定义异常处理类","aria-label":'Permalink to "自定义异常处理类"'},"​")],-1),_=t("p",null,"自定义类实现 UncaughtExceptionHandler 接口，并实现 uncaughtException 方法：",-1),g=t("p",null,"需要注意的几点：",-1),u=t("ul",null,[t("li",null,[t("p",null,"在自定义异常处理类中需要持有线程默认异常处理类，如图中红框处所示。这样做的目的是在自定义异常处理类无法处理或者处理异常失败时，还可以将异常交给系统做默认处理。")]),t("li",null,[t("p",null,'如果自定义异常处理类成功处理异常，需要进行页面跳转，或者将程序进程"杀死"。否则程序会一直卡死在崩溃界面，并弹出无响应对话框。如上图所示，我使用 CrashDisplayActivity 页面来展示所捕获的异常详细信息。')])],-1),A=t("p",null,"一般情况下，在 handlerException 方法中需要做以下几件事情。",-1),m=t("p",null,"1.收集 crash 现场的相关信息，如下面方法获取当前 App 的版本信息，以及所有手机设备的相关信息。",-1),b=t("p",null,"实际上，除了上述信息，还可以添加额外的自定义信息。",-1),k=t("p",null,"2.日志的记录工作，将收集到的信息保存在本地，比如以文件的方式保存。",-1),f=t("p",null,"从图中可以看出，除了我们自己收集的日志，还需要将系统抛出的异常信息也保存到文件中，方便后续开发人员分析问题原因。",-1),C=t("h4",{id:"使用自定义异常处理类",tabindex:"-1"},[a("使用自定义异常处理类 "),t("a",{class:"header-anchor",href:"#使用自定义异常处理类","aria-label":'Permalink to "使用自定义异常处理类"'},"​")],-1),v=t("p",null,"LagouExceptionHandler 定义好之后，就可以将其初始化，并将主线程注册到 LagouExceptionHandler 中。如下：",-1),x=t("p",null,"最终保存的 crash 日志信息格式下图所示：",-1),E=t("blockquote",null,[t("p",null,"需要注意的是，因为使用了文件写操作，所以需要动态申请文件操作的权限。")],-1),q=t("h2",{id:"native-异常",tabindex:"-1"},[a("native 异常 "),t("a",{class:"header-anchor",href:"#native-异常","aria-label":'Permalink to "native 异常"'},"​")],-1),B=t("p",null,"当程序中的 native 代码发生崩溃时，系统会在 /data/tombstones/ 目录下保存一份详细的崩溃日志信息。如果一个 native crash 是必现的，不妨在模拟器上重现 bug，并将 /data/tombstones 中的崩溃日志拉到本地电脑中加以分析。",-1),P=t("p",null,"比如创建一个模拟 native crash 的项目 LagouNativeCrash，项目结构如下：",-1),S=t("p",null,"MainActivity 中有一个点击按钮 Button，当点击此按钮时，会调用 crash() 方法触发 native 代码崩溃，如下：",-1),M=t("p",null,"native crash 在 native-lib.cpp 文件中声明，如下：",-1),N=t("p",null,"当点击 Button，触发 native 崩溃之后，系统会在 /data/tombstones 目录下生成 tombstone 日志文件，可以在此日志文件中，查看详细的报错信息。如下所示：",-1),F=t("p",null,"但是如果 native crash 是偶发现象，并且在模拟器上一时难以复现，那么就需要将工作交给测试工程师在真机上尝试复现。那就需要一种机制，将 native crash 现场的日志信息保存到我们可以访问的手机目录中。目前比较成熟，使用也比较广泛的就是谷歌的 BreakPad。",-1),D=t("p",null,[a("Breakpad 是一个跨平台的开源库，我们也可以在其 "),t("a",{href:"https://github.com/google/breakpad",target:"_blank",rel:"noreferrer"},"Breakpad Github"),a(" 上下载自己编译。并通过 JNI 的方式引入到项目中。")],-1),T=t("p",null,[t("strong",null,"NDK 导入 BreakPad")],-1),H=t("p",null,"在 Breakpad GitHub 官网上，有一个 README Android 的介绍文件。这个文件专门介绍了如何在 Android 项目中导入 BreakPad。我们可以直接使用 CMake 方式将其编译为一个静态库。",-1),I=t("p",null,"在捕获 native crash 之前，需要初始化 Breakpad，主要是设置 BreakPad 保存 crash 日志的路径，如下所示：",-1),J=t("p",null,"图中传入的 path 就是 Breakpad 保存日志的文件目录，一般情况下保存在外置 SD 卡目录。",-1),V=t("p",null,"初始化好之后，就可以在我们自己的 native 业务层模拟一个崩溃现场，Breakpad 会自动捕获这次 crash，并将生成的 crash 信息保存在所设置的目录中。",-1),y=n("",8),O=t("p",null,"可以看出 XCrash 的使用更加灵活，工程师的掌控性更高。可以通过设置不同的过滤方式，针对性地上报相应的 crash 日志。并且在捕获到 crash 之后，可以加入自定义的操作，比如本地保存日志或者直接进行网络上传等。",-1),K=t("blockquote",null,[t("p",null,"另外：Sentry 还有一个好处就是可以通过设置过滤，来判断是否上报 crash 日志。这对于 SDK 的开发人员是很有用的。比如一些 SDK 的开发商只是想收集自身 SDK 引入的 crash，对于用户的其他操作导致的 crash 进行过滤，这种情况就可以考虑集成 Sentry。")],-1),j=t("h3",{id:"总结",tabindex:"-1"},[a("总结 "),t("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),W=t("p",null,"这节课主要介绍了 Android 崩溃的相关知识。对 Android 工程师来说，crash 可以分 2 类：Java 层和 Native 层。针对这 2 者进行捕获的方式也不尽相同。针对 Java 层一般通过自定义 UncaughtExceptionHandler 进行异常拦截；针对 Native 层可以考虑集成谷歌的 breakpad 进行捕获，并保存日志在本地。最后介绍了几个线上捕获 crash 的工具，实际上这几个工具的实现原理都是基于上文介绍的基础知识。",-1);function w(G,Q,U,R,X,Y){const e=i("Image");return c(),l("div",null,[d,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/6E/Ciqc1F7ofWiAV2aBAAEGhcbtn98977.png"}),a(),p,h,_,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/6E/Ciqc1F7ofXaAcZ7MAAK-ubwIhZk797.png"}),a(),g,u,A,m,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/7A/CgqCHl7ofYSAeFGcAAJnMJd645o410.png"}),a(),b,k,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/6E/Ciqc1F7ofYuAEnnPAAGeBy97jW8168.png"}),a(),f,C,v,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/7A/CgqCHl7ofZmAVDhnAACUY1wtWYQ757.png"}),a(),x,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/6F/Ciqc1F7ofaCAV-N0AAK1uzObDPg259.png"}),a(),E,q,B,P,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/6F/Ciqc1F7ofa2AOQEoAABoHjKPFO4484.png"}),a(),S,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/6F/Ciqc1F7ofbWACu1SAABHFSC0bhA498.png"}),a(),M,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/7A/CgqCHl7ofbyAMpx-AADl8pNCN4o838.png"}),a(),N,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/6F/Ciqc1F7ofcWAPr9kAASbO90geqo412.png"}),a(),F,D,T,H,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/7B/CgqCHl7ofdmAexkGAAQt9jC9U2g259.png"}),a(),I,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/6F/Ciqc1F7ofeOAOmfAAAI9QS6RESI036.png"}),a(),J,V,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/7B/CgqCHl7ofeuAJlINAADteaIIElo908.png"}),a(),y,o(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/7B/CgqCHl7offuAb-QwAANxaVWOCd8915.png"}),a(),O,K,j,W])}const Z=s(r,[["render",w]]);export{L as __pageData,Z as default};

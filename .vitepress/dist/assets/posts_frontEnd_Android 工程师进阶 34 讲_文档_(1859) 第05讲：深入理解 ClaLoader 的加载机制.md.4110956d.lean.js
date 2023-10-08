import{_ as e,j as n,o as r,g as i,k as t,h as s,Q as o,s as a}from"./chunks/framework.4e7d56ce.js";const Ka=JSON.parse('{"title":"第05讲：深入理解ClaLoader的加载机制","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1859) 第05讲：深入理解 ClaLoader 的加载机制.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1859) 第05讲：深入理解 ClaLoader 的加载机制.md","lastUpdated":1696682708000}'),d={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1859) 第05讲：深入理解 ClaLoader 的加载机制.md"},c=o("",16),p=a("br",null,null,-1),_=a("p",null,'可以看出，AppClassLoader 主要加载系统属性"java.class.path"配置下类文件，也就是环境变量 CLASS_PATH 配置的路径。因此 AppClassLoader 是面向用户的类加载器，我们自己编写的代码以及使用的第三方 jar 包通常都是由它来加载的。',-1),h=a("h3",{id:"extclassloader-扩展类加载器",tabindex:"-1"},[s("ExtClassLoader 扩展类加载器 "),a("a",{class:"header-anchor",href:"#extclassloader-扩展类加载器","aria-label":'Permalink to "ExtClassLoader 扩展类加载器"'},"​")],-1),C=a("p",null,"部分源码如下：",-1),u=a("br",null,null,-1),A=a("br",null,null,-1),g=a("p",null,'可以看出，ExtClassLoader 加载系统属性"java.ext.dirs"配置下类文件，可以打印出这个属性来查看具体有哪些文件：',-1),b=a("br",null,null,-1),x=a("br",null,null,-1),m=a("p",null,"结果如下：",-1),L=a("br",null,null,-1),q=a("h3",{id:"bootstrapclassloader-启动类加载器",tabindex:"-1"},[s("BootstrapClassLoader 启动类加载器 "),a("a",{class:"header-anchor",href:"#bootstrapclassloader-启动类加载器","aria-label":'Permalink to "BootstrapClassLoader 启动类加载器"'},"​")],-1),M=a("p",null,"BootstrapClassLoader 同上面的两种 ClassLoader 不太一样。",-1),P=a("br",null,null,-1),T=a("p",null,"首先，它并不是使用 Java 代码实现的，而是由 C/C++ 语言编写的，它本身属于虚拟机的一部分。因此我们无法在 Java 代码中直接获取它的引用。如果尝试在 Java 层获取 BootstrapClassLoader 的引用，系统会返回 null。",-1),D=a("br",null,null,-1),S=a("p",null,'BootstrapClassLoader 加载系统属性"sun.boot.class.path"配置下类文件，可以打印出这个属性来查看具体有哪些文件：',-1),f=a("br",null,null,-1),k=a("br",null,null,-1),v=a("p",null,"结果如下：",-1),y=a("br",null,null,-1),B=o("",9),Q=o("",6),j=o("",12),V=a("br",null,null,-1),I=a("p",null,"打印结果为：",-1),E=a("br",null,null,-1),J=o("",9),N=a("h3",{id:"自定义-classloader-实践",tabindex:"-1"},[s("自定义 ClassLoader 实践 "),a("a",{class:"header-anchor",href:"#自定义-classloader-实践","aria-label":'Permalink to "自定义 ClassLoader 实践"'},"​")],-1),F=a("p",null,"首先在本地电脑上创建一个测试类 Secret.java，代码如下：",-1),H=a("br",null,null,-1),R=a("br",null,null,-1),Y=a("p",null,"测试类所在磁盘路径如下图：",-1),w=a("br",null,null,-1),U=a("br",null,null,-1),z=a("p",null,"接下来，创建 DiskClassLoader 继承 ClassLoader，重写 findClass 方法，并在其中调用 defineClass 创建 Class，代码如下：",-1),X=a("br",null,null,-1),Z=a("br",null,null,-1),G=a("p",null,"最后，写一个测试自定义 DiskClassLoader 的测试类，用来验证我们自定义的 DiskClassLoader 是否能正常 work。",-1),O=a("br",null,null,-1),W=a("br",null,null,-1),$=a("p",null,"解释说明：",-1),K=a("ul",null,[a("li",null,[a("p",null,"① 代表需要动态加载的 class 的路径。")]),a("li",null,[a("p",null,"② 代表需要动态加载的类名。")]),a("li",null,[a("p",null,"③ 代表需要动态调用的方法名称。")])],-1),aa=a("p",null,"最后执行上述 testClassLoader 方法，并打印如下结果，说明我们自定义的 DiskClassLoader 可以正常工作。",-1),sa=a("br",null,null,-1),la=o("",8),ta=a("br",null,null,-1),oa=a("p",null,"参数说明：",-1),ea=a("ul",null,[a("li",null,[a("p",null,"dexPath：dex 文件路径，或者包含 dex 文件的 jar 包路径；")]),a("li",null,[a("p",null,"librarySearchPath：C/C++ native 库的路径。")])],-1),na=a("p",null,"PathClassLoader 里面除了这 2 个构造方法以外就没有其他的代码了，具体的实现都是在 BaseDexClassLoader 里面，其 dexPath 比较受限制，一般是已经安装应用的 apk 文件路径。",-1),ra=a("br",null,null,-1),ia=a("p",null,"当一个 App 被安装到手机后，apk 里面的 class.dex 中的 class 均是通过 PathClassLoader 来加载的，可以通过如下代码验证：",-1),da=a("br",null,null,-1),ca=a("br",null,null,-1),pa=a("p",null,"打印结果如下：",-1),_a=a("br",null,null,-1),ha=a("h3",{id:"dexclassloader",tabindex:"-1"},[s("DexClassLoader "),a("a",{class:"header-anchor",href:"#dexclassloader","aria-label":'Permalink to "DexClassLoader"'},"​")],-1),Ca=a("p",null,"先来看官方对 DexClassLoader 的描述：",-1),ua=a("blockquote",null,[a("p",null,"A class loader that loads classes from .jar and .apk filescontaining a classes.dex entry. This can be used to execute code notinstalled as part of an application.")],-1),Aa=a("p",null,"很明显，对比 PathClassLoader 只能加载已经安装应用的 dex 或 apk 文件，DexClassLoader 则没有此限制，可以从 SD 卡上加载包含 class.dex 的 .jar 和 .apk 文件，这也是插件化和热修复的基础，在不需要安装应用的情况下，完成需要使用的 dex 的加载。",-1),ga=a("br",null,null,-1),ba=a("p",null,"DexClassLoader 的源码里面只有一个构造方法，代码如下：",-1),xa=a("br",null,null,-1),ma=o("",8),La=a("br",null,null,-1),qa=a("p",null,"ISay.java 是一个接口，内部只定义了一个方法 saySomething。",-1),Ma=a("br",null,null,-1),Pa=a("br",null,null,-1),Ta=a("p",null,'SayException.java 实现了 ISay 接口，但是在 saySomething 方法中，打印"something wrong here"来模拟一个线上的 bug。',-1),Da=a("br",null,null,-1),Sa=a("br",null,null,-1),fa=a("p",null,"最后在 MainActivity.java 中，当点击 Button 的时候，将 saySomething 返回的内容通过 Toast 显示在屏幕上。",-1),ka=a("br",null,null,-1),va=a("br",null,null,-1),ya=a("p",null,"最后运行效果如下：",-1),Ba=a("br",null,null,-1),Qa=a("h3",{id:"创建-hotfix-patch-包",tabindex:"-1"},[s("创建 HotFix patch 包 "),a("a",{class:"header-anchor",href:"#创建-hotfix-patch-包","aria-label":'Permalink to "创建 HotFix patch 包"'},"​")],-1),ja=a("p",null,"新建 Java 项目，并分别创建两个文件 ISay.java 和 SayHotFix.java。",-1),Va=a("br",null,null,-1),Ia=a("br",null,null,-1),Ea=o("",15),Ja=a("br",null,null,-1),Na=a("p",null,[a("strong",null,"注意"),s("：因为需要访问 SD 卡中的文件，所以需要在 AndroidManifest.xml 中申请权限。")],-1),Fa=a("br",null,null,-1),Ha=a("p",null,"最后运行效果如下：",-1),Ra=a("br",null,null,-1),Ya=a("h1",{id:"总结",tabindex:"-1"},[s("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),wa=a("ul",null,[a("li",null,[a("p",null,"ClassLoader 就是用来加载 class 文件的，不管是 jar 中还是 dex 中的 class。")]),a("li",null,[a("p",null,"Java 中的 ClassLoader 通过双亲委托来加载各自指定路径下的 class 文件。")]),a("li",null,[a("p",null,"可以自定义 ClassLoader，一般覆盖 findClass() 方法，不建议重写 loadClass 方法。")]),a("li",null,[a("p",null,"Android 中常用的两种 ClassLoader 分别为：PathClassLoader 和 DexClassLoader。")])],-1);function Ua(za,Xa,Za,Ga,Oa,Wa){const l=n("Image");return r(),i("div",null,[c,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCaAf-h3AAFnyY9SYn4768.png"}),s(),p,_,h,C,u,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCaAGUjRAAIMUAR7Y3c186.png"}),s(),A,g,b,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCaAY_dYAAAprdcpTC0589.png"}),s(),x,m,L,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCaAPNV4AAAvayS6X4o835.png"}),s(),q,M,P,T,D,S,f,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCaAONHUAAAsZT0sIBc274.png"}),s(),k,v,y,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCeAMOlRAAGJMpJkA5I246.png"}),s(),B,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCeAQezSAAQYyFDklrg999.png"}),s(),Q,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCeAWh1-AAA_Lzb-zhw301.png"}),s(),j,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCeAW8daAADQVXAv0pE448.png"}),s(),V,I,E,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCeAE1DdAABZjeS7yN0189.png"}),s(),J,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCeABoqPAACWzrHjS54889.png"}),s(),N,F,H,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCeAY0-WAABCcqmFmiI938.png"}),s(),R,Y,w,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCeAbiOCAAAqAZH35mE333.png"}),s(),U,z,X,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCiAEqSMAAILClnPGbQ559.png"}),s(),Z,G,O,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCiAcRZvAALz_thptwU623.png"}),s(),W,$,K,aa,sa,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCiAIP_eAAAdfd_DpwM913.png"}),s(),la,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCiAV6lJAACs0LXqQVg644.png"}),s(),ta,oa,ea,na,ra,ia,da,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCiASPYPAADN5OpH1GE240.png"}),s(),ca,pa,_a,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCiAI6J_AABwUllm8lQ019.png"}),s(),ha,Ca,ua,Aa,ga,ba,xa,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCiAP86KAABzADT7Fyw585.png"}),s(),ma,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCmAAYQwAABXjFvkmNA900.png"}),s(),La,qa,Ma,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCmARry8AAAnNYtVKYY963.png"}),s(),Pa,Ta,Da,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCmAaT9iAABbAZmk7t4425.png"}),s(),Sa,fa,ka,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCmAAJAfAAGne-5xMvU261.png"}),s(),va,ya,Ba,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCmASNkxAABX65sn8h4261.png"}),s(),Qa,ja,Va,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCmAV6ogAABQ-CUJLqk288.png"}),s(),Ia,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCmAbfLLAACCTcF2Vrg097.png"}),s(),Ea,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCqAIwZuAAXDP0LfIXU972.png"}),s(),Ja,Na,Fa,Ha,Ra,t(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCqAShVqAABP_H12Tes976.png"}),s(),Ya,wa])}const as=e(d,[["render",Ua]]);export{Ka as __pageData,as as default};

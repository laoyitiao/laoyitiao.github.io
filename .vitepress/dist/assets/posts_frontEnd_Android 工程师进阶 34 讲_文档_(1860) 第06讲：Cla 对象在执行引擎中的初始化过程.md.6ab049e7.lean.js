import{_ as o,j as i,o as e,g as c,k as t,h as s,s as l,Q as n}from"./chunks/framework.cfb14fe0.js";const Ll=JSON.parse('{"title":"第06讲：Cla对象在执行引擎中的初始化过程","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1860) 第06讲：Cla 对象在执行引擎中的初始化过程.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1860) 第06讲：Cla 对象在执行引擎中的初始化过程.md","lastUpdated":1696682708000}'),p={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1860) 第06讲：Cla 对象在执行引擎中的初始化过程.md"},r=l("h1",{id:"第06讲-cla对象在执行引擎中的初始化过程",tabindex:"-1"},[s("第06讲：Cla对象在执行引擎中的初始化过程 "),l("a",{class:"header-anchor",href:"#第06讲-cla对象在执行引擎中的初始化过程","aria-label":'Permalink to "第06讲：Cla对象在执行引擎中的初始化过程"'},"​")],-1),_=l("p",null,"在上一课时我详细介绍了 ClassLoader 的使用，包括它的主要作用就是用来将 class 字节码加载到内存中。那 JVM 加载 class 文件的具体过程是怎样的呢？本课时我们就来了解一下这一详细过程以及当中存在的问题。",-1),h=l("br",null,null,-1),d=l("p",null,"一个 class 文件被加载到内存中需要经过 3 大步：装载、链接、初始化。其中链接又可以细分为：验证、准备、解析 3 小步。因此用一张图来描述 class 文件加载到内存的步骤如下所示。",-1),u=l("br",null,null,-1),g=n("",24),b=l("br",null,null,-1),A=l("p",null,"使用 javac 编译 Foo.java 生成 Foo.class 字节码文件，然后使用 16 进制编辑器打开 Foo.class 文件，部分如下：",-1),C=l("br",null,null,-1),m=l("br",null,null,-1),v=l("p",null,"正常情况下，使用 java Foo 执行结果如下：",-1),q=l("br",null,null,-1),M=l("br",null,null,-1),k=l("p",null,"如果使用 16 进制编辑器修改 class 文件中的魔数，如下所示：",-1),f=l("br",null,null,-1),T=l("br",null,null,-1),V=l("p",null,[s('将"cafe bab'),l("strong",null,"e"),s(' "修改为"cafe bab'),l("strong",null,"b"),s('"，重新运行则会报如下错误：')],-1),P=l("br",null,null,-1),E=l("br",null,null,-1),J=l("p",null,'class 文件中魔数后的"0034"为版本号，如果将其修改为"0035"则会报如下错误：',-1),x=l("br",null,null,-1),O=l("br",null,null,-1),j=l("p",null,'版本号"0034"之后的"0036"是常量池计数器，表示常量池中有 54 个常量。如果将这个值进行修改也有可能造成运行时错误，比如我将"0036"改为"0032"：',-1),F=l("br",null,null,-1),I=l("br",null,null,-1),S=l("p",null,"重新执行 java Foo，则会报如下错误：",-1),w=l("br",null,null,-1),y=l("br",null,null,-1),D=l("p",null,"虽说 JVM 会检查各种对 class 字节码文件的篡改行为，但是依然无法百分百保证 class 文件的安全性。比如我还是用 Foo.java 举例，在 Foo.java 中的 print 方法中，分别打印出父类的自身类的 hashCode 值，分别是：2018699554 和 111。我们可以在 class 字节码的基础上进行篡改，将父类的 hashCode 也返回 111。",-1),N=l("br",null,null,-1),B=l("p",null,"通过 javap -v Foo 命令可以查看Foo.class 中常量池的具体信息：",-1),X=l("br",null,null,-1),L=l("br",null,null,-1),G=l("p",null,"因为篇幅原因，我只截取了部分常量池的内容。图中 1 处指向了父类 Object的hashCode 方法，图中 2 处指向了 Foo 的 hashCode 方法。在课时 03 中，我们了解已经了解了 CONSTANT_Methodref_info 结构如下：",-1),R=l("br",null,null,-1),K=l("br",null,null,-1),U=l("p",null,"其中 class_index 就是指向方法的所属类（图中为 16，转化为 16 进制为 0X10），因此只需要使用 16 进制编辑器将指向 Object 的 class_index 改为执行 Foo 的 class_index 即可。具体修改如下：",-1),W=l("br",null,null,-1),z=l("br",null,null,-1),Y=l("p",null,"将图中 0X10 改为 0X02 并保存，重新运行 java Foo 效果如下：",-1),Z=l("br",null,null,-1),Q=n("",24),$=n("",18),H=l("br",null,null,-1),ll=l("p",null,"然后在 ClassInitTest.java 中访问 ClassInit 的 value 值，如下：",-1),sl=l("br",null,null,-1),al=l("br",null,null,-1),tl=l("p",null,"执行上述代码，打印日志如下：",-1),nl=l("br",null,null,-1),ol=l("br",null,null,-1),il=l("p",null,"可以看出，非静态代码块并没有被执行。如果将 ClassInitTest.java 修改如下：",-1),el=l("br",null,null,-1),cl=l("br",null,null,-1),pl=l("p",null,"加了一行代码，使用 new 创建 ClassInit 对象实例。再次执行后非静态代码块也将会被执行，如下：",-1),rl=l("br",null,null,-1),_l=l("h3",{id:"被动引用",tabindex:"-1"},[s("被动引用 "),l("a",{class:"header-anchor",href:"#被动引用","aria-label":'Permalink to "被动引用"'},"​")],-1),hl=l("p",null,"上述的 6 种情况在 JVM 中被称为主动引用，除此 6 种情况之外所有引用类的方式都被称为被动引用。被动引用并不会触发 class 的初始化。",-1),dl=l("br",null,null,-1),ul=l("p",null,"最典型的就是在子类中调用父类的静态变量，比如有以下两个类：",-1),gl=l("br",null,null,-1),bl=l("br",null,null,-1),Al=l("p",null,"可以看出 Child 继承自 Parent 类，如果直接使用 Child 来访问 Parent 中的 value 值，则不会初始化 Child 类，比如如下代码：",-1),Cl=l("br",null,null,-1),ml=l("br",null,null,-1),vl=l("p",null,"执行上述代码，打印如下效果：",-1),ql=l("br",null,null,-1),Ml=n("",9),kl=l("br",null,null,-1),fl=l("p",null,"可以看出，虽然只有 Parent 被初始化，但是 Parent 和 Child 都经过了装载和验证阶段，并被加载到内存中。",-1),Tl=l("h3",{id:"class-初始化和对象的创建顺序",tabindex:"-1"},[s("class 初始化和对象的创建顺序 "),l("a",{class:"header-anchor",href:"#class-初始化和对象的创建顺序","aria-label":'Permalink to "class 初始化和对象的创建顺序"'},"​")],-1),Vl=l("p",null,"关于 class 的初始化还有一点经常会在面试中被提及，那就是对象的初始化顺序。当我们在代码中使用 new 创建一个类的实例对象时，类中的静态代码块、非静态代码块、构造函数之间的执行顺序是怎样的。",-1),Pl=l("br",null,null,-1),El=l("p",null,"比如以下代码：",-1),Jl=l("br",null,null,-1),xl=l("br",null,null,-1),Ol=l("p",null,"在 main 方法中执行了 2 次 new Child() 的操作，执行上述代码结果如下：",-1),jl=l("br",null,null,-1),Fl=n("",14);function Il(Sl,wl,yl,Dl,Nl,Bl){const a=i("Image");return e(),c("div",null,[r,_,h,d,u,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/E8/Cgq2xl6O2nSAXgX1AAAk3WIjy2w291.png"}),s(),g,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D1/Ciqah16O2nSAJocBAADgYuyGOFU999.png"}),s(),b,A,C,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/E8/Cgq2xl6O2nWANuvpAAApn9LjU8s780.png"}),s(),m,v,q,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D1/Ciqah16O2nWAG6BOAABEYPJ8hek260.png"}),s(),M,k,f,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/E8/Cgq2xl6O2nWAPl9cAAAs9S7kJ_c137.png"}),s(),T,V,P,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D1/Ciqah16O2naAQjT5AADGlnL5k7A260.png"}),s(),E,J,x,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/E8/Cgq2xl6O2naAfq32AAB95xhaALs362.png"}),s(),O,j,F,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D2/Ciqah16O2naAUFkGAAA5qpcpOSM316.png"}),s(),I,S,w,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/E8/Cgq2xl6O2naAULaGAACadz947b8809.png"}),s(),y,D,N,B,X,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D2/Ciqah16O2neAAOe1AAJwxaI8-S4783.png"}),s(),L,G,R,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0E/D8/Ciqah16UV3qAYt1KAABuPCIKTow208.png"}),s(),K,U,W,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D2/Ciqah16O2neAWnwhAAVg9nz8YBo810.png"}),s(),z,Y,Z,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/E8/Cgq2xl6O2niAfLMnAABEpLbahOQ771.png"}),s(),Q,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D2/Ciqah16O2niAFbl-AAZKjAhPB7w610.png"}),s(),$,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/E8/Cgq2xl6O2niACR1GAAC2wv7KhD0731.png"}),s(),H,ll,sl,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D2/Ciqah16O2niAMOi0AABFdWfyf9s889.png"}),s(),al,tl,nl,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/E8/Cgq2xl6O2niAKdPPAAA_96Fc0k4956.png"}),s(),ol,il,el,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D2/Ciqah16O2nmAXN-MAABZ6A11FAM000.png"}),s(),cl,pl,rl,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/E8/Cgq2xl6O2nmAFkfRAABMo8lXf2s110.png"}),s(),_l,hl,dl,ul,gl,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D2/Ciqah16O2nmAIKBAAACF2GZgmfk860.png"}),s(),bl,Al,Cl,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/E8/Cgq2xl6O2nmAVynGAABCPhsxYGo296.png"}),s(),ml,vl,ql,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D2/Ciqah16O2nqAfjh_AAA9zL-pVWk200.png"}),s(),Ml,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D2/Ciqah16O2nqAKlcRAAF9sRIloM8054.png"}),s(),kl,fl,Tl,Vl,Pl,El,Jl,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/E8/Cgq2xl6O2nqAU3hkAAGuvZZy92w313.png"}),s(),xl,Ol,jl,t(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/D2/Ciqah16O2nqAVJwFAACr-a4rpis859.png"}),s(),Fl])}const Gl=o(p,[["render",Il]]);export{Ll as __pageData,Gl as default};

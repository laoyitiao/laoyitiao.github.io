import{_ as a,j as i,o as e,g as c,k as l,s as t,h as o,Q as p}from"./chunks/framework.b3d8e22e.js";const L=JSON.parse('{"title":"参数 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(387) 第06讲：Shell 编程核心技术（下）.md","filePath":"posts/devops/110-测试开发核心技术文档/(387) 第06讲：Shell 编程核心技术（下）.md","lastUpdated":1696417798000}'),n={name:"posts/devops/110-测试开发核心技术文档/(387) 第06讲：Shell 编程核心技术（下）.md"},h=t("p",null,"在本课时我们来具体编写一个 Shell 脚本，并掌握编写 Shell 脚本的必备知识。",-1),m=t("p",null,"想要编写一个 Shell 脚本，首先需要掌握的是注释，注释以 # 开头，用于增加脚本可读性；其次是参数，我们需要给脚本传入参数并解析它；最后是函数封装，以及掌握脚本是如何执行和调试的。",-1),_=t("p",null,"注释",-1),g=t("hr",null,null,-1),A=p('<p>接下来开始编写脚本，输入注释 # this is a demo script 用来告诉大家这个脚本是干什么的，当然注释不是必需的，只是为了增加可读性，同时 Shell 也不会执行注释语句。</p><h2 id="参数" tabindex="-1">参数 <a class="header-anchor" href="#参数" aria-label="Permalink to &quot;参数&quot;">​</a></h2><p>而一旦脚本开始执行，就需要我们掌握系统默认的参数解析规则。当传递一个参数给脚本时，它是怎样被解析的呢？</p><ul><li><p>$0 表示被执行的程序，也就是当前脚本；</p></li><li><p>$1、$2 分别表示传递的第 1 个和第 2 个参数，Shell 默认只支持 9 个参数，如果你需要支持更多的参数可以使用 shift；</p></li><li><p>$@、$* 表示所有的参数，但不包含 $0；</p></li><li><p>${#*}、${#@} 表示参数的个数；</p></li><li><p>${*:1:3}、${*😒#} 表示多个参数。</p></li></ul><p>接下来我们编写一个脚本。</p>',5),r=t("p",null,"并打印 p0=$0、p1=$1 p2=$2，以及 $@ 和 $*。",-1),d=t("p",null,"然后开始执行脚本，执行脚本的第一种方法是使用 bash /tmp/1.sh，在执行结果中 $0 是当前的文件名，但此时参数没有值。",-1),C=t("p",null,"我们输入参数 x、y 传递给脚本，你可以看到输出结果中第一个参数是 x，第二个参数是 y，这就是参数的解析规则。",-1),u=t("p",null,"然后，既然 $@ 与 $* 都表示所有的参数但它们有什么区别呢？你可以简单的理解成 $* 会把参数打散，举个例子。",-1),$=t("p",null,'比如第二个参数是包含空格的，将 "m n" 作为一个完整的参数传递给脚本并执行，你会发现第二个参数是 m n，但其实 $@ 与 $* 的值已经发生了变化，$* 会将参数打散，而 "$@" 则不会。',-1),B=t("p",null,'我们使用 for 循环来分别打印 "$@" 和 $* 所代表的参数。',-1),F=t("p",null,'执行脚本，你会发现如果是"$@"，第一个参数打印的是 x，第二个参数打印的是 m n，而 $* 把第二个参数拆成了两个。',-1),H=t("h2",{id:"函数",tabindex:"-1"},[o("函数 "),t("a",{class:"header-anchor",href:"#函数","aria-label":'Permalink to "函数"'},"​")],-1),M=t("p",null,"最后是函数，函数是以函数名()后跟 {} 括起来的内容组成，函数可以实现一些功能封装，同时函数也支持与脚本类似的参数解析逻辑。",-1),v=t("p",null,"比如定义一个 hogwarts 函数，在函数中通过 if 语句判断第一个参数 $1 是否等于 python，如果等于就打印 python 测试开发。然后运行 hogwarts 函数，你会发现什么都没有，是因为你并没有给函数传入一个参数，传入 python 参数后，系统打印 python 测试开发。",-1),y=t("p",null,"接下来，我们在原有函数的基础上扩展，并把它放到脚本里进行调用，通过 elif 判断 $1 是否等于 java，如果等于 java 就打印 java 测试开发。",-1),O=t("p",null,"执行并传入 python 参数，你可以看到最终打印了 python 测试开发。",-1),V=t("p",null,"如果传入参数 java，则输出 java 测试开发。",-1),f=t("p",null,"接下来，我们把它封装成一个 hogwarts 函数，有了函数之后就可以在执行的过程中随时进行调用来实现功能封装和逻辑复用。",-1),S=t("p",null,"而只定义函数是不会得到执行的，比如此时没有输出任何的测试开发结果。",-1),G=t("p",null,"而我们运行 hogwarts 函数并将 $2 参数传给它，此时 $2 是脚本的第二个参数，但却是 hogwarts函数 的第一个参数。",-1),x=t("p",null,"执行脚本，传入一个参数 java，没有任何显示，再传入一个 python 仍没有反应，直到传入 python java 两个参数后，才输出 java 测试开发，因为 hogwarts 接收的是整个脚本的第二个参数。",-1),T=t("p",null,"Ok，有了函数，你就可以把很多功能封装到函数里，这样可以让代码更优雅，还可以进行组件化，而掌握函数之后你就需要掌握脚本的执行方法。",-1),P=t("p",null,"通过前面案例的演示我们已经掌握使用 bash 执行脚本，但如果我们不想使用 bash 执行脚本，而是想让系统自动进行解析，该怎么做呢？可以通过加权限位实现。",-1),N=t("p",null,"首先查看 1.sh 的权限位目前是多少，输入 ls -l /tmp/1.sh 指令，你会发现它的权限里没有 x。",-1),w=t("p",null,"然后输入 1.sh 的全路径 /tmp/1.sh，系统会提示 Permission denied 没有执行权限。",-1),b=t("p",null,"这个时候怎么做呢，我们使用 chmod +x /tmp/1.sh 指令，给它一个可执行权限就可以了。",-1),j=t("p",null,"一旦给了可执行权限之后，再次执行。你会发现它已经可以直接执行了，而如果我们想要输入 1.sh 就可以直接执行呢？",-1),k=t("p",null,"上一课时详细讲过 PATH 变量，我们将 /tmp 加入 PATH 变量中，这时就可以直接输入 1.sh 执行了。",-1),E=t("p",null,"还有一个问题就是如果我们的脚本写错了在执行过程中如何进行调试呢。",-1),I=t("p",null,"你可以使用 bash -x 指令，它可以在脚本运行时打印当前脚本的每一行命令，当脚本出错时就可以知道到底是哪一行出错了，它通过以 + 开头的输出来显示当前正在执行的是哪一行的 Shell 代码，有了它调试就变得非常便捷。",-1);function q(W,X,J,Z,Y,z){const s=i("Image");return e(),c("div",null,[h,m,_,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1B/CgotOV3mHmOAVwNqAAB4Dtu9NTs336.png"}),g,t("p",null,[o("首先看下注释，我们使用 vim 创建一个文件，当然你也可以使用 vs code 等其他编辑器，vs code 可以支持语法高亮，也是非常不错的，输入 vim /tmp/1.sh 指令创建了 1.sh 文件。 "),l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1B/CgotOV3mHnGAcmsMAAB09eOs0V8120.png"})]),A,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/FC/CgoB5l3mHnyAa4b9AACcvwS38OE594.png"}),r,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/FC/CgoB5l3mHoWAaTN7AAHqWUW2NTU287.png"}),d,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1C/CgotOV3mHo2ARK47AAHLXCyvNz8110.png"}),C,u,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/FC/CgoB5l3mHpaAJwbtAAGm5AmGJZA068.png"}),$,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/FC/CgoB5l3mHp-AGEWgAACvvz4hjIA356.png"}),B,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1C/CgotOV3mHqmAJ1dsAAFw0CGIpXM118.png"}),F,H,M,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/FC/CgoB5l3mHrSALa60AAG18PfnhoY767.png"}),v,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1C/CgotOV3mHr-AN2ZyAAEBtQa6ZR8422.png"}),y,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/FC/CgoB5l3mHseAJymtAAHki20sFZs514.png"}),O,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/FC/CgoB5l3mHtGAaT5OAAG5fFP2WZw702.png"}),V,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1C/CgotOV3mHtuANXSqAAEH6Py_Xac382.png"}),f,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1C/CgotOV3mHuWAOyTxAAFw7vQFO2c777.png"}),S,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1C/CgotOV3mHxiAYFWfAAEdgQmOdxA853.png"}),G,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/FC/CgoB5l3mHyKANsqtAAGM238AlPY383.png"}),x,T,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1C/CgotOV3mHy2AA4GsAAFi8HS0YMk372.png"}),P,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1C/CgotOV3mHzeAXyu9AAGwW6ETkz4673.png"}),N,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1C/CgotOV3mH0OAUIsfAAGy_TmPGnc630.png"}),w,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/B0/1C/CgotOV3mH0yAbthXAAG_xPVX3HE664.png"}),b,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/FC/CgoB5l3mH1qAZynAAAG9pFvkV0M505.png"}),j,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/FC/CgoB5l3mH2aAOOGLAAG4sIaDfBY784.png"}),k,E,l(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AF/FC/CgoB5l3mH3CAJM6IAAFv8CFyLyo833.png"}),I])}const Q=a(n,[["render",q]]);export{L as __pageData,Q as default};

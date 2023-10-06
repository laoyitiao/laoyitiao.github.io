import{_ as o,j as e,o as t,g as r,k as a,s,Q as l,h as p}from"./chunks/framework.b3d8e22e.js";const $=JSON.parse('{"title":"Antlr4 基础入门 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1748) 第31讲：OAL 语言，原来定义创造一门新语言如此轻松（上）.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1748) 第31讲：OAL 语言，原来定义创造一门新语言如此轻松（上）.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1748) 第31讲：OAL 语言，原来定义创造一门新语言如此轻松（上）.md"},E=s("p",null,"在前文介绍 Metrics 实现以及对应的 DIspatcher 实现的时候，会发现有一部分实现类位于 generated-analysis 模块的 target/generated-sources 目录中，这些类的开头都会有下图所示的注释：",-1),y=s("p",null,"通过这行注释我们知道，这些类是通过 OAL（Observability Analysis Language）生成的。OAL 是 SkyWalking 后端自定义的一种脚本，在 SkyWalking 编译阶段会通过 Antlr4 解析 OAL 脚本，并与 freemarker 配合使用，生成上述 Metrics 实现类以及对应的 Dispatcher 实现类。生成的结果如下图所示：",-1),i=l("",12),g=l("",8),F=s("p",null,"这也就满足了四则运算中，括号优先级高于乘除，乘除优先级高于加减的要求。",-1),A=s("p",null,"line 规则比较简单，可以匹配一个 expr 语句与结束符。",-1),C=s("p",null,"第 9~13 行是词法定义。其中，第 9 行的 WS 定义了空白字符，后面的 skip 是一个特殊的标记，表示空白字符会被忽略。",-1),d=s("p",null,'第 10~13 行的 FLOAT 是定义的浮点数，这里使用的"+""*"等符号是正则表达式中的含义，而不是四则运算中的加号和乘号。',-1),D=s("p",null,"第 15~16 行 fragment 定义了两个词法定义中使用到的公共部分，DIGIT 表示的是整数，EXPONENT 表示的是科学计数法。fragment 类似于一种内联函数（或别名），只是为了简化词法规则的定义以及可读性，并不会被识别为 Token。",-1),u=s("p",null,"了解了 Antlr4 基本的语法以及 .g4 文件的编写方式之后，我们将其添加到 maven 项目的 src/main/antlr4 目录下，如下图所示：",-1),m=l("",3),_=s("p",null,"接下来要做的就是使用这些生成的 Lexer 类以及 Parser 类实现解析输入的字节流。Antlr4 提供了 Visitor 和 Listener 两种模式，通过这两种模式可以很轻松地把 Parser 的结果做各种处理。Antlr4 默认会生成 Listener 模式的相关代码（如果需要生成 Visitor 模式的相关代码，需要调整 maven 插件的配置），这里与 SkyWalking 保持一致，使用 Listener 模式。",-1),B=s("p",null,"相信你已经对 Listener 模式都比较熟悉了，简单来说就是在代码中预先定义一系列的事件，然后开发人员可以编写这些事件的 Listener。在程序运行的过程中，如果某些事件被触发了，则程序会根据事件类型调用相应的 Listener 进行处理。",-1),x=s("p",null,"Antlr4 中的定义的 ParseTreeListener 接口就是我们要实现的 Listener 接口，在计算机示例中生成的代码中，CalculatorListener 接口继承了 ParseTreeListener 接口并对其进行了扩展，CalculatorBaseListener 是 CalculatorListener 接口的空实现，具体方法如下：",-1),h=l("",7),v=s("p",null,"在后面分析 SkyWalking OAL 语言的时候，还会再次看到 Antlr4 Listener 模式的实践，这里就不再继续深入了。",-1),T=s("h3",{id:"freemarker-基础入门",tabindex:"-1"},[p("FreeMarker 基础入门 "),s("a",{class:"header-anchor",href:"#freemarker-基础入门","aria-label":'Permalink to "FreeMarker 基础入门"'},"​")],-1),k=s("p",null,[p("SkyWalking OAL 语言在生成 Java 代码时除了使用到 Antlr4，还会使用到 FreeMarker 模板引擎，即一种基于"),s("strong",null,"模板"),p(" 和"),s("strong",null,"要改变的数据"),p("用来生成文本的通用工具。")],-1),f=s("p",null,'FreeMarker 使用专门的模板语言 ------ FreeMarker Template Language 来编写模板文件（后缀为".ftl"）。在模板文件中，我们只需要专注于如何展现数据，而在模板之外的逻辑则需要专注于要展示哪些数据，如下图所示，这种模式也被称为 MVC 模式。',-1),L=s("p",null,"下面将通过一个简单的宠物店示例帮助你快速入门 FreeMarker 的基础使用，首先我们定义一个 Animal 抽象类以及多个实现类，如下图所示：",-1),S=l("",5),b=l("",7),I=s("p",null,"我们从 root 规则开始一步步分析，instance_jvm_old_gc_time 这条语句匹配了哪些语法规则，如下图所示：",-1),P=s("p",null,"整个 instance_jvm_old_gc_time 语句匹配了 aggregationStatement 规则，其中 variable 规则定义了 OAL 语言中变量名称的结构，等号左边的 instance_jvm_old_gc_time 变量名称会匹配到该规则，而整个等号右边的内容会匹配到 metricStatement 规则（除了结尾的分号）。",-1),O=s("p",null,"metricStatement 规则如下图所示，开头的 from 关键字、source、sourceAttribute 三部分比较简单，你可以直接在 OALParser.g4 文件中找到相应的定义。后面的 filterStatement 表达式开头是 filter 关键字，紧接着的括号中是一个 ==、>、<、>= 或 <= 表达式。最后的聚合函数则是我们在其他编程语言中常见的函数调用格式（可以包含参数），例如这里的 longAvg() 以及前文看到的 p99(10)。",-1),q=s("p",null,"看完对 Antlr4 示例以及 metricStatement 规则的分析，相信你已经可以独立分析 OAL 语言剩余的语法规则，filterStatement 以及 aggregateFunction 两个语法规则就不再展开分析了。",-1),w=s("p",null,"SkyWalking 源码分析指北第 27 课时------OAL语言（上），到此结束。",-1);function R(M,W,N,V,j,G){const n=e("Image");return t(),r("div",null,[E,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/2B/2D/Ciqc1F79whSAejSsAADlKeZLGng534.png"}),y,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/2B/2D/Ciqc1F79wh6AIcH7AAGEKdkWfLQ444.png"}),i,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/2B/39/CgqCHl79wvyAfbxxAADD-93Krsw733.png"}),g,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/2B/2E/Ciqc1F79wxOAf73DAAC89DhQAzg639.png"}),F,A,C,d,D,u,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/2B/39/CgqCHl79wx6ADQ6nAABpQRzXfNU573.png"}),m,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/2B/2E/Ciqc1F79w3yAV4VdAARLSQ-a_eI863.png"}),_,B,x,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/2B/39/CgqCHl79w4yAKHdPAAGlWI8e74A044.png"}),h,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/2B/3A/CgqCHl79w9iAWTUFAAC5cS-GISw692.png"}),v,T,k,f,a(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/2B/2E/Ciqc1F79w-2ATlKCAACH4_5Q8wA260.png"}),L,a(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/2B/3A/CgqCHl79w_mAeQv1AABlVjyDFNs904.png"}),S,a(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/2B/2E/Ciqc1F79xBKAdVTJAAClyVdmThQ520.png"}),b,a(n,{alt:"Instance_gc树形结构图2副本.png",src:"https://s0.lgstatic.com/i/image/M00/2E/18/CgqCHl8ESz-ALvMiAAE-UYzabGY154.png"}),I,a(n,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image/M00/2E/18/CgqCHl8ES0qAGvbZAAjdivdiVgQ814.png"}),P,O,a(n,{alt:"image (11).png",src:"https://s0.lgstatic.com/i/image/M00/2E/0C/Ciqc1F8ES1uAWwXyAARGn2UgfJI899.png"}),q,w])}const Q=o(c,[["render",R]]);export{$ as __pageData,Q as default};

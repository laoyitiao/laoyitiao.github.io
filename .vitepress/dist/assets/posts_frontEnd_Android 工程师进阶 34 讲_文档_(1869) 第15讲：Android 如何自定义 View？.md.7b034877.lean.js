import{_ as o,j as e,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.4e7d56ce.js";const is=JSON.parse('{"title":"第15讲：Android如何自定义View？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1869) 第15讲：Android 如何自定义 View？.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1869) 第15讲：Android 如何自定义 View？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1869) 第15讲：Android 如何自定义 View？.md"},i=p("",7),E=s("p",null,"CustomToolBar 继承自 RelativeLayout，在构造函数中通过 addView 方式分别添加了 2 个 ImageView 和 1 个 TextView。显示效果如下：",-1),y=s("h3",{id:"自定义属性",tabindex:"-1"},[n("自定义属性 "),s("a",{class:"header-anchor",href:"#自定义属性","aria-label":'Permalink to "自定义属性"'},"​")],-1),h=s("p",null,"有时候我们想在 XML 布局文件中使用 CustomToolBar 时，希望能在 XML 文件中直接指定 title 的显示内容、字体颜色，leftImage 和 rightImage 的显示图片等。这就需要使用自定义属性。",-1),d=s("p",null,"自定义属性具体步骤分为以下几步：",-1),g=s("h4",{id:"attrs-xml-中声明自定义属性",tabindex:"-1"},[n("attrs.xml 中声明自定义属性 "),s("a",{class:"header-anchor",href:"#attrs-xml-中声明自定义属性","aria-label":'Permalink to "attrs.xml 中声明自定义属性"'},"​")],-1),A=s("p",null,"在 res 的 values 目录下的 attrs.xml 文件中（没有就自己新建一个），使用 标签自定义属性，如下所示：",-1),F=s("p",null,"解释说明：",-1),u=s("ul",null,[s("li",null,"标签代表定义一个自定义属性集合，一般会与自定义控件结合使用；"),s("li",null,"标签则是某一条具体的属性，name 是属性名称，format 代表属性的格式。")],-1),w=s("h4",{id:"在-xml-布局文件中使用自定义属性",tabindex:"-1"},[n("在 XML 布局文件中使用自定义属性 "),s("a",{class:"header-anchor",href:"#在-xml-布局文件中使用自定义属性","aria-label":'Permalink to "在 XML 布局文件中使用自定义属性"'},"​")],-1),D=s("p",null,"需要先添加命名空间 xmlns:app，然后通过命名空间 app 引用自定义属性，并传入相应的图片资源和字符串内容。",-1),m=s("h4",{id:"在-customtoolbar-中-获取自定义属性的引用值",tabindex:"-1"},[n("在 CustomToolBar 中，获取自定义属性的引用值 "),s("a",{class:"header-anchor",href:"#在-customtoolbar-中-获取自定义属性的引用值","aria-label":'Permalink to "在 CustomToolBar 中，获取自定义属性的引用值"'},"​")],-1),M=p("",11),V=s("p",null,"从上图中可以看出，Canvas 中每一个绘制操作都需要传入一个 Paint 对象。Paint 就相当于一个画笔，我们可以通过设置画笔的各种属性，来实现不同绘制效果：",-1),C=s("p",null,"比如如下代码，定义 PieImageView 继承自 View，然后在 onDraw 方法中，分别使用 Canvas 的 drawArc 和 drawCircle 方法来绘制弧度和圆形。这两个形状组合在一起就能表示一个简易的圆形进度条控件。",-1),_=s("p",null,"在布局文件中直接使用上述的 PieImageView，设置宽高为 300dp，并在 Activity 中设置 PieImageView 的进度为 45，如下所示：",-1),L=s("p",null,"最终运行显示效果如下：",-1),S=s("p",null,"如果在上面代码中的布局文件中，将 PieImageView 的宽高设置为 wrap_content（也就是自适应），重新运行则显示效果如下：",-1),H=s("p",null,"很显然，PieImageView 并没有正常显示。问题的主要原因就是在 PieImageView 中并没有在 onMeasure 方法中进行重新测量，并重新设置宽高。",-1),b=s("h4",{id:"onmeasure",tabindex:"-1"},[n("onMeasure "),s("a",{class:"header-anchor",href:"#onmeasure","aria-label":'Permalink to "onMeasure"'},"​")],-1),B=s("p",null,[n("首先我们需要弄清楚，自定义 View 为什么需要重新测量。正常情况下，我们直接在 XML 布局文件中定义好 View 的宽高，然后让自定义 View 在此宽高的区域内显示即可。但是为了更好地兼容不同尺寸的屏幕，Android 系统提供了 wrap_contetn 和 match_parent 属性来规范控件的显示规则。它们分别代表"),s("strong",null,"自适应大小"),n(" 和"),s("strong",null,"填充父视图"),n(" 的"),s("strong",null,"大小"),n("，但是这两个属性并没有指定具体的大小，因此我们需要在 onMeasure 方法中过滤出这两种情况，真正的测量出自定义 View 应该显示的宽高大小。")],-1),x=s("p",null,"所有工作都是在 onMeasure 方法中完成，方法定义如下：",-1),f=s("p",null,[n("可以看出，方法会传入 2 个参数 widthMeasureSpec 和 heightMeasureSpec。这两个参数是从父视图传递给子 View 的两个参数，看起来很像宽、高，但是它们所表示的不仅仅是宽和高，还有一个非常重要的"),s("strong",null,"测量模式"),n("。")],-1),P=s("p",null,"一共有 3 种测量模式。",-1),v=s("ol",null,[s("li",null,"EXACTLY：表示在 XML 布局文件中宽高使用 match_parent 或者固定大小的宽高；"),s("li",null,"AT_MOST：表示在 XML 布局文件中宽高使用 wrap_content；"),s("li",null,"UNSPECIFIED：父容器没有对当前 View 有任何限制，当前 View 可以取任意尺寸，比如 ListView 中的 item。")],-1),T=s("p",null,"具体值和测量模式都可以通过 Android SDK 中提供的 MeasureSpec.java 类获取：",-1),W=s("p",null,"为什么 1 个 int 值可以代表 2 种意义呢？ 实际上 widthMeasureSpec 和 heightMeasureSpec 都是使用二进制高 2 位表示测量模式，低 30 位表示宽高具体大小。",-1),I=s("p",null,[s("strong",null,"重新回到 PieImageView")],-1),q=s("p",null,"在 PieImageView 中并没有复写 onMeasure 方法，因此默认使用父类也就是 View 中的实现，View 中的 onMeasure 默认实现如下：",-1),z=s("p",null,[n("蓝色框中的 "),s("strong",null,"setMeasuredDimension"),n(" 是一个非常重要的方法，这个方法传入的值直接决定 View 的宽高，也就是说如果调用 setMeasuredDimension(100,200)，最终 View 就显示宽 100 * 高 200 的矩形范围。红色下划线标识的 getDefaultSize 返回的是默认大小，默认为父视图的剩余可用空间。")],-1),k=s("blockquote",null,[s("p",null,"这也是为什么 PieImageView 显示异常的原因，虽然我们在 XML 中指定的是 wrap_content，但是实际使用的宽高值却是父视图的剩余可用空间，从代码中可以看出是整个屏幕的宽高。")],-1),U=s("p",null,"问题的原因找到，解决方法只要复写 onMeasure，过滤出 wrap_content 的情况，并主动调用 setMeasuredDimension 方法设置正确的宽高即可：",-1),j=s("p",null,[s("strong",null,"ViewGroup 中的 onMeasure")],-1),G=s("p",null,"如果我们自定义的控件是一个容器，onMeasure 方法会更加复杂一些。因为 ViewGroup 在测量自己的宽高之前，需要先确定其内部子 View 的所占大小，然后才能确定自己的大小。比如如下一段代码：",-1),N=s("p",null,"LinearLayout 的宽高为 wrap_content 表示由子控件的大小决定，而 3 个子控件的宽度分别为300、200、100，那最终 LinearLayout 的宽度显示多少呢？ 运行结果如下：",-1),X=s("p",null,"可以看出 LinearLayout 的最终宽度由其内部最大的子 View 宽度决定。",-1),R=s("p",null,"当我们自己定义一个 ViewGroup 的时候，也需要在 onMeasure 方法中综合考虑子 View 的宽度。比如如果要实现一个流式布局 FlowLayout，效果如下：",-1),Y=p("",8),K=p("",3),Q=s("p",null,"一个简易的 FlowLayout 运行效果如下所示，剩下的就是和 UI 同事合作，修改 FlowLayout 内部 TextView 的样式，将界面调整到最佳显示状态。",-1),J=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),O=s("p",null,"本课时介绍了自定义 View 的几个知识点，要自定义一个控件主要包含几个方法。",-1),Z=s("p",null,"onDraw：主要负责绘制 UI 元素；",-1),$=s("p",null,"onMeasure：主要负责测量自定义控件具体显示的宽高；",-1),ss=s("p",null,"onLayout：主要是在自定义 ViewGroup 中复写，并实现子 View 的显示位置，并在其中介绍了自定义属性的使用方法。",-1),ns=s("p",null,[n("所有代码都已经提交到："),s("a",{href:"https://github.com/McoyJiang/LagouAndroidShare/tree/master/course15_%E8%87%AA%E5%AE%9A%E4%B9%89View/LagouCustomizedView",target:"_blank",rel:"noreferrer"},"拉勾课程代码仓库 课时15")],-1);function as(ls,ps,os,es,ts,cs){const a=e("Image");return t(),c("div",null,[i,l(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/08/47/Ciqc1F66bomAdFbwAALM9ajQIC8076.png"}),n(),E,l(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/CgqCHl66bpKAIlBcAAA0F5H64pY243.png"}),n(),y,h,d,g,A,l(a,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/Ciqc1F66bpuAIr0aAAFqNwcLsJ0889.png"}),n(),F,u,w,l(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/CgqCHl66bqWAFxZfAAKl9XNB380067.png"}),n(),D,m,l(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/CgqCHl66bq6AU-oEAAIh3vx_5eM610.png"}),n(),M,l(a,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/Ciqc1F66brqANYwaAAFgenmfG7o790.png"}),n(),V,l(a,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/CgqCHl66bsKAC3aYAAEfignRLSI590.png"}),n(),C,l(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/Ciqc1F66bs2AS0zEAAQY2ssC74o325.png"}),n(),_,l(a,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/CgqCHl66btSAYWPrAAH9B9MVFqA640.png"}),n(),L,l(a,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/Ciqc1F66btyAc0PJAAIpVraUjo0218.png"}),n(),S,l(a,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/CgqCHl66buWAP4coAAG7qEuu7jo510.png"}),n(),H,b,B,x,l(a,{alt:"image (11).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/CgqCHl66bvCAUiTLAACDybKUm44275.png"}),n(),f,P,v,T,l(a,{alt:"image (12).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/CgqCHl66bvqADG9BAADvBFUSQJk100.png"}),n(),W,I,q,l(a,{alt:"image (13).png",src:"https://s0.lgstatic.com/i/image/M00/08/47/CgqCHl66bw-ADT0MAADKTPdZQ1c840.png"}),n(),z,k,U,l(a,{alt:"image (14).png",src:"https://s0.lgstatic.com/i/image/M00/08/48/CgqCHl66bxmAZbnFAAH8BgmvD9Q604.png"}),n(),j,G,l(a,{alt:"image (15).png",src:"https://s0.lgstatic.com/i/image/M00/08/48/Ciqc1F66byKARzSmAAc9fHTIEMg900.png"}),n(),N,l(a,{alt:"image (16).png",src:"https://s0.lgstatic.com/i/image/M00/08/48/CgqCHl66byqAFve6AAAqPxvb9sA095.png"}),n(),X,R,l(a,{alt:"image (17).png",src:"https://s0.lgstatic.com/i/image/M00/08/48/Ciqc1F66b0uANdyTAASLs9Xvo14469.png"}),n(),Y,l(a,{alt:"image (18).png",src:"https://s0.lgstatic.com/i/image/M00/08/48/Ciqc1F66b1eAeNsoAABs2Q0QRN0512.png"}),n(),K,l(a,{alt:"image (19).png",src:"https://s0.lgstatic.com/i/image/M00/08/48/Ciqc1F66b3CAEEa5AAUEZe6Z528059.png"}),n(),Q,l(a,{alt:"image (20).png",src:"https://s0.lgstatic.com/i/image/M00/08/48/CgqCHl66b4SAPQ8iAADyh9KR7Ng588.png"}),n(),J,O,Z,$,ss,ns])}const Es=o(r,[["render",as]]);export{is as __pageData,Es as default};

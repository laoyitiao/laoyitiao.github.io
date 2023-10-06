import{_ as s,j as a,o as i,g as n,k as p,h as l,s as t,Q as e}from"./chunks/framework.b3d8e22e.js";const L=JSON.parse('{"title":"间距 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6660) 07  设计规范：如何统一设计规范，提高沟通效率？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6660) 07  设计规范：如何统一设计规范，提高沟通效率？.md","lastUpdated":1696417798000}'),c={name:"posts/frontEnd/048_iOS开发进阶/(6660) 07  设计规范：如何统一设计规范，提高沟通效率？.md"},_=t("p",null,"作为 iOS 工程师，我们开发的绝大部分功能都是与用户界面和用户交互有关。所以，和设计师协调沟通也成了我们的日常工作之一。在这个过程中，就免不了和他们争论有关间距大小、字体粗细、字号大小、颜色深浅等问题。想必有时候你也很烦恼，怎么和这些设计师们沟通就那么麻烦呢！",-1),d=t("p",null,"其实，这些问题都可以用一套统一的设计规范来解决，从而有效降低沟通成本。有了规范，设计师可以根据明确的指引和预定义好的设计元素，来设计出新的界面；而开发者也能使用预先封装好的、可重用的设计组件实现快速开发。最后，开发的产品为用户提供一致的体验。",-1),r=t("p",null,"那一套统一的设计规范到底是怎样的呢？它通常包括间距、字体、颜色、图标和常用组件等，这一讲，我们就一起看看怎样定义这些设计规范吧。",-1),h=t("h3",{id:"间距",tabindex:"-1"},[l("间距 "),t("a",{class:"header-anchor",href:"#间距","aria-label":'Permalink to "间距"'},"​")],-1),g=t("p",null,[t("strong",null,"间距"),l("（Spacing）是父子组件之间，以及平级组件之间的留白，合理使用间距能有效分离和组织内容，也能保证页面风格一致，提升用户体验。")],-1),A=t("p",null,"但是，在实际工作当中，你有没有遇到过打开设计师给的设计稿后发现，同一个界面里的间距定义杂乱无章，不同页面类似组件的间距也大不相同，这样导致的结果是，开发出的 App 在视觉上会给人风格混乱的感觉。",-1),m=t("p",null,"那怎样定义统一的间距呢？其实很简单，我们只保留几个可用的间距，并给它们赋予定义，下面是我们 Moments App 的间距定义。",-1),u=t("p",null,"根据我们的经验，在选择间距的值时，为了具有和谐感，我们把间距分成三组：小（Small）、中（Medium）、大（Large）。两个小间距之间的差别是 4pt，中间距与小间距相差 6pt，而大间距直接相差 8pt，给用户一种循序渐进的感觉。这些间距的定义能覆盖 App 所有的使用需求了。",-1),S=t("p",null,"有了统一的间距定义，设计师就可以在设计稿里面标注间距的定义，而不是具体的值。开发者也可以通过代码中原先定义好的间距，而无须每次都硬编码（Hardcode）间距的值。",-1),P=t("p",null,"除了 iOS 以外，统一的间距还可以用到 Android 和 Web 上，如下面是开源设计规范 Backpack 所定义的间距，其包含了 iOS、 Android 和 Web 三个平台。",-1),k=t("p",null,"有了这些间距的定义以后，设计师只需设计一份设计稿，不同平台的开发者都可以使用同一份设计稿进行开发。",-1),b=t("h3",{id:"字体",tabindex:"-1"},[l("字体 "),t("a",{class:"header-anchor",href:"#字体","aria-label":'Permalink to "字体"'},"​")],-1),B=t("p",null,"任何一款 App，都离不开文字，除了其本身传达信息，文字的各种样式，包括字体类型、大小、粗细，在其中也承担着重要角色。比如合理使用行楷会给人美感；字体放大可以暗示优先阅读；字体加粗，会起到强调的作用，吸引用户关注等等。",-1),I=t("p",null,"在开发当中，字体类型、字号大小、字体粗细分别由 Font family、Font size、Font weight 属性定义。除非有特殊的原因（如品牌需要，或者为了增强游戏体验），iOS 的 App 一般都使用 iOS 系统所自带的字体系列。这样更能符合用户的阅读习惯。在自带的字体系列的基础上，通过把字号大小和字体粗细组合起来定义一些字体类型。下面是我们 Moments App 所定义的字体规范。",-1),C=e("",8),T=t("p",null,"来源：backpack.github.io",-1),D=t("p",null,"来源：2014 Material Design color palettes",-1),O=t("p",null,"有了调色板，我们就可以在设计常用组件时（如按钮，卡片，警告信息等）使用调色板里面的颜色。例如 Backpack 的主色是天蓝色，在设计按钮时，主按钮的背景可以使用天蓝色（#0770e3）。",-1),f=t("p",null,"为了照顾不同用户的使用习惯，提高夜间视觉体验，iOS 系统在原有的浅色模式之外，还提供了深色模式。我们在设计调色板的时候，也最好考虑到对深色模式的支持。",-1),M={href:"https://backpack.github.io/guidelines/colour/#dark-mode-dynamic-colours",target:"_blank",rel:"noreferrer"},y=t("br",null,null,-1),W=e("",8),x=t("p",null,"SF Symbols 有很多优点：",-1),E=t("ul",null,[t("li",null,[t("p",null,"它数量巨大，几乎覆盖所有应用场景；")]),t("li",null,[t("p",null,"整合了 San Francisco 字体系统，当用户改变字体大小的时候，这些图标都会自动对齐；")]),t("li",null,[t("p",null,"所有图标都支持颜色，我们可以根据需求搭配不同的颜色；")]),t("li",null,[t("p",null,"使用这些图标时也无须安装，可以减少 App 的体积。")])],-1),N=t("p",null,"我们的 Moments App 也使用到 SF Symbols 来呈现点赞按钮。",-1),U=t("p",null,"SF Symbols 里绝大部分的图标都通过了轮廓和填充两个版本，我们可以使用填充的图标表示选中状态。",-1),V=t("h3",{id:"常用组件",tabindex:"-1"},[l("常用组件 "),t("a",{class:"header-anchor",href:"#常用组件","aria-label":'Permalink to "常用组件"'},"​")],-1),F=t("p",null,"随着 App 功能的增多，你会发现一些 UI 会出现在许多地方，例如下图的用户头像，分别出现在个人主页、朋友圈、点赞处。",-1),H=t("p",null,"在这种情况下，我们就可以把这个重复出现的 UI 封装成一个常用的设计组件，并纳入我们在制定设计规范中。常用的组件一般有按钮（Button）、用户头像（User avatar）、复选框（Checkbox）、徽章（Badge）等等。下面是 Moments App 设计规定中用户头像组件的定义。",-1),q=t("p",null,"有了用户头像组件，设计师在设计过程中就不需要考虑在呈现头像时需要怎样设计，使用的圆角到底要多少度，是否需要阴影和边框等等。开发者也可以使用原先封装好的组件来加快开发。",-1),R=t("p",null,"需要注意的是，UI 组件是在开发过程中发现某个 UI 反复使用后才封装的，在开始的时候不要贪多，避免定义一堆不用的组件。",-1),G=t("h3",{id:"总结",tabindex:"-1"},[l("总结 "),t("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),Q=t("p",null,"在这一讲，我们通过间距，字体，颜色，图标和常用组件为例子来讲述一套统一的设计规范。有了它，能极大降低设计师与开发者的沟通成本，也节省设计师和开发者在设计或实现过程的时间，一举多得。",-1),j=e("",5);function v(J,Z,w,K,Y,$){const o=a("Image");return i(),n("div",null,[_,d,r,h,g,A,m,p(o,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/13/Cgp9HWBPIESAQtxiAAC49ptAY10830.png"}),u,S,P,p(o,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/10/CioPOWBPIE6AQByeAAGm6psQ2cY050.png"}),k,b,B,I,p(o,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/13/Cgp9HWBPIFmAZ3I7AAGL_JUZsWA282.png"}),C,p(o,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/10/CioPOWBPIGyAArUOAARif6OrlTI705.png"}),l(),T,p(o,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/10/CioPOWBPIHSAUGNaAASjT7YUZno486.png"}),l(),D,O,f,t("p",null,[t("a",M,[p(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/16/15/Cgp9HWBF-8iAdDeqAAQTjxb8lPw437.png"})]),y,l(" 来源：backpack.github.io")]),W,p(o,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/13/Cgp9HWBPIImAXKhhAAPeaviZKqA532.png"}),x,E,N,p(o,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/10/CioPOWBPIJOAPceNAAP7idtkklI920.png"}),U,p(o,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/10/CioPOWBPIJyAREyHAAPWaRoJ2ZA576.png"}),V,F,p(o,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/10/CioPOWBPIKWAeE3NAArOXBxBWDQ128.png"}),H,p(o,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/13/Cgp9HWBPIK2AUwu1AAWVmRyk8yo083.png"}),q,R,G,Q,p(o,{alt:"思维导图+二维码.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/13/Cgp9HWBPIMGATXhkAAYS7jjGAi4492.png"}),j])}const z=s(c,[["render",v]]);export{L as __pageData,z as default};

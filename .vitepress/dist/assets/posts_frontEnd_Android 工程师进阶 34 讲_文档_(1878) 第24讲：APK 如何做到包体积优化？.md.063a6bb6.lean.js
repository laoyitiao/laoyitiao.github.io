import{_ as r,j as n,o as l,g as s,k as i,h as t,Q as o,s as e}from"./chunks/framework.cfb14fe0.js";const F=JSON.parse('{"title":"第24讲：APK如何做到包体积优化？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1878) 第24讲：APK 如何做到包体积优化？.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1878) 第24讲：APK 如何做到包体积优化？.md","lastUpdated":1696682708000}'),p={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1878) 第24讲：APK 如何做到包体积优化？.md"},c=o("",5),d=e("p",null,"从上图中可以很明显看出部分图片占用了比较大的资源空间，因此可以针对性地对其做压缩优化等操作。",-1),_=e("blockquote",null,[e("p",null,"实际上 APK Analyzer 的作用不光是查看 APK 大小，从它的名字也能看出它是用来分析 APK 的，因此可以使用它来分析一些优秀 APK 的目录结构、代码规范，甚至是使用了哪些动态库技术等。")],-1),A=e("h4",{id:"matrix中-的-apkchecker",tabindex:"-1"},[t("Matrix中 的 ApkChecker "),e("a",{class:"header-anchor",href:"#matrix中-的-apkchecker","aria-label":'Permalink to "Matrix中 的 ApkChecker"'},"​")],-1),h=e("p",null,"ApkChecker 是腾讯开源框架 Matrix 的一部分，主要是用来对 Android 安装包进行分析检测，并输出较为详细的检测结果报告。正常情况下我们需要下载 Matrix 源码，并单独编译 matrix-apk-cananry 部分。但是如果想快速使用 ApkChecker，可以直接在网上下载其 ApkChecker.jar 文件，然后创建一个配置文件 .json 即可。",-1),u=e("p",null,"官方的配置文件格式如下：",-1),g=o("",7),b=e("p",null,"如果项目中有未被使用资源，则 Lint 会在窗口 Inspection Result 中显示，类似结果如下：",-1),k=e("p",null,"下面两个选项可以在项目编译时期减少被打包到 APK 中的文件， 使用 shrinkResources 能够在项目编译阶段，删除所有在项目中未被使用到的资源文件。但是需要将 minifyEnabled 选项设置为 true。",-1),m=e("p",null,"使用 resConfig 限定国际化资源文件。有时候我们使用到的三方库中可能会对各种国际化语言进行支持，但是我们自己的项目只支持某个语言，比如中文，那我们可以在 gradle 的 defaultConfig 中使用 resConfig 来限制打包到 APK 中的国际化资源文件，具体如下所示：",-1),P=e("h4",{id:"文件优化",tabindex:"-1"},[t("文件优化 "),e("a",{class:"header-anchor",href:"#文件优化","aria-label":'Permalink to "文件优化"'},"​")],-1),D=e("ul",null,[e("li",null,"关于静态图片优化")],-1),x=e("p",null,"优先使用 VectorDrawable 图片，如果 UI 无法提供 VectorDrawable 图片，那么 webp 格式是一个不错的选择。Android Studio 也支持直接将 png 或者 jpg 格式图片转化为 webp 格式，如下所示：",-1),C=e("ul",null,[e("li",null,"关于动态图片优化")],-1),w=e("p",null,"实际上 webp 也可以作动态图，只是目前对 webp 动图支持的三方库并不多，谷歌官方推荐的 Glide 对 webp 支持也不是很友好。",-1),f=e("p",null,[t("但是谷歌推出了一套 C++ 依赖库，上层开发人员可以基于此库的基础上使用 JNI 来解析 Animated webp 图片，并将解析出来的每一帧封装成一个 Bitmap，并根据解析出来的时间差值动态显示相应的帧 Bitmap 即可。如果 JNI 不熟或者不想再花时间精力去实现 JNI 调用，可以考虑使用 GitHub 的 "),e("a",{href:"https://github.com/McoyJiang/Android-WebP",target:"_blank",rel:"noreferrer"},"Android-WebP"),t(" 。Android 开发人员只需使用 WebpImageView 控件并指定图片路径即可。")],-1),K=e("p",null,"另外针对动态图片，我们也做了其他方面的尝试。做过游戏开发的一般都比较熟悉 TextureAlas 这种图片格式，就是将多个序列图按照一定的排放位置合成到一张图片中，比如以下图片：",-1),q=e("p",null,"并且跟随图片一起生成的还有一个用来对其解析的文本配置文件。主要是用来识别合成图中的路径、每张帧图片的序列、位置等。一般情况下配置文本的格式如下：",-1),T=e("p",null,"这套方案主要是借鉴了一个轻量级游戏引擎 libgdx 的实现思路，解析上述的 TextureAtlas 图片，将生成的 Texture 渲染到 Bitmap 上展示每一帧内容。具体代码如下：",-1),y=o("",17);function S(M,I,j,V,N,B){const a=n("Image");return l(),s("div",null,[c,i(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/1D/98/CgqCHl7iDwSAcxVpAAESeM9GOkw713.png"}),t(),d,_,A,h,u,i(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iDxeAWk0XAAGXToDFD8k730.png"}),t(),g,i(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iDyuAfUVWAASa1y2IUjk925.png"}),t(),b,i(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/1D/98/CgqCHl7iDzGAA1xGAADeNuNw4Kg407.png"}),t(),k,m,i(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iDziAHFtMAABQrq4bjvI623.png"}),t(),P,D,x,i(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/1D/98/CgqCHl7iD0CAIBL9AADuuOoqScw829.png"}),t(),C,w,f,K,i(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iD02AfSHDAAhMCw88tKw252.png"}),t(),q,i(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iD1OAQHiyAADyfh_8hwY702.png"}),t(),T,i(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/1D/8C/Ciqc1F7iD1mAE4P6AAF6BeEgjAE934.png"}),t(),y])}const G=r(p,[["render",S]]);export{F as __pageData,G as default};

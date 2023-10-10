import{_ as o,j as e,o as t,g as c,k as l,h as n,s,Q as p}from"./chunks/framework.cfb14fe0.js";const on=JSON.parse('{"title":"项目实战基于云开发开发一个在线商城小程序","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5113) 项目实战  基于云开发开发一个在线商城小程序.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5113) 项目实战  基于云开发开发一个在线商城小程序.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5113) 项目实战  基于云开发开发一个在线商城小程序.md"},E=s("h1",{id:"项目实战基于云开发开发一个在线商城小程序",tabindex:"-1"},[n("项目实战基于云开发开发一个在线商城小程序 "),s("a",{class:"header-anchor",href:"#项目实战基于云开发开发一个在线商城小程序","aria-label":'Permalink to "项目实战基于云开发开发一个在线商城小程序"'},"​")],-1),i=s("p",null,"在学完前 4 个模块之后，我相信你会对微信小程序的开发有一个全新的认识。在前面 3 个模块中，俊鹏分别从微信小程序内在的运行原理，小程序工程化开发以及具体实践层面，深度讲解了微信小程序开发所必要的知识和能力。而第 4 个模块里，我带你认识了微信小程序的云端解决方案------小程序·云开发，解读了云开发的主要能力。",-1),y=s("p",null,"今天这一讲，我将带你基于云开发实现一个在线商城小程序，通过实战加深你对这门课的认知。",-1),g=s("h3",{id:"项目初始化",tabindex:"-1"},[n("项目初始化 "),s("a",{class:"header-anchor",href:"#项目初始化","aria-label":'Permalink to "项目初始化"'},"​")],-1),d=s("p",null,"我们从项目最简单处做起。在小程序项目开发之前，通常会有完备的产品逻辑设计以及产品视觉设计为开发者提供产品的交互和视觉元素。根据这些条件，你才能编写代码，生成最终可运行的产品。",-1),_=s("p",null,"因为这门课的重点在于如何进行微信小程序开发，以及后端服务开发，并没有包含设计环节，所以我们直接从图中的微信小程序开发开始。",-1),u=s("p",null,[n("我们先在浏览器中打开"),s("a",{href:"https://cloud.dnuise.cn/res/shop/SHOP-LOC.zip",target:"_blank",rel:"noreferrer"},"基础项目"),n("，下载初始化代码（我们会在此代码的基础上开始学习）。")],-1),F=s("h4",{id:"打开项目",tabindex:"-1"},[n("打开项目 "),s("a",{class:"header-anchor",href:"#打开项目","aria-label":'Permalink to "打开项目"'},"​")],-1),h=s("p",null,"使用最新版本的微信开发者工具，导入此项目（选择项目的目录），并在 AppID 处填写小程序的 AppID。",-1),A=s("p",null,"导入成功后，开发者工具中展示的界面如下（左侧的模拟器能够正常运行展示出页面）：",-1),m=s("p",null,"紧接着，我们操作一下左侧的模拟器，可以完成整个商城项目的页面交互逻辑：",-1),C=p("",2),D=s("h4",{id:"解读项目",tabindex:"-1"},[n("解读项目 "),s("a",{class:"header-anchor",href:"#解读项目","aria-label":'Permalink to "解读项目"'},"​")],-1),b=s("p",null,"为了能让你更容易理解，项目基本上采用了原生语言无框架开发，下面我给你解读一下项目中的一些主要逻辑。",-1),v=s("ul",null,[s("li",null,[s("strong",null,"本地化模拟")])],-1),k=s("p",null,"首先你要清楚，初始项目中你所做的一切产品交互体验都只是在本地流转执行的。也就是说，你的每一个点击和动作，都没有后端服务的工作，全都在小程序里模拟。而你在产品的首页中所看到的商品内容，其实是我预先写在代码里的一系列数据，请你打开项目目录下的 miniprogram/app.js，可以看到如下内容：",-1),B=s("p",null,"这里就是维持项目运转的基本商品数据，通过引入固定的资源来提供交互所必要的数据。而这就引入了我们实战中所要讲的第 1 点：现实中，微信小程序开发和其他前端开发一样，需要预先数据填充，来支撑整个小程序交互逻辑的开发。",-1),f=s("p",null,"我们不能够直接动用后端接口来做小程序页面逻辑开发，这会为后端服务造成不可控的伤害，进而影响项目进度。",-1),w=s("ul",null,[s("li",null,[s("strong",null,"虚拟化接口")])],-1),j=s("p",null,[n("那么当我们使用预置数据开发页面之后，"),s("strong",null,"如何高效地对接后端服务呢？"),n(" 这就引入了我们讲的第 2 点------虚拟化接口。我们在页面开发时，将需要后端服务的业务操作分离出来，做成一个接口。由于这个接口并没有真正的后端接入，只是提供样子，所以我们称其为虚拟化接口。")],-1),T=s("p",null,"请你打开项目目录 miniprogram/pages/index/index.js 文件，定位到 onLoad 函数：",-1),S=s("p",null,"index 页面是项目的首页，用于展示商品列表，所以页面需要商品的列表信息。由于产品最终需要从后端获取商品的列表信息，所以我们将这一动作制作成接口。接着再打开项目目录 miniprogram/app.js，定位到 55 行，如下代码：",-1),q=s("p",null,"我们通过编写一个函数，模拟后端服务将商品列表返回，从操作本身上来看，这个函数就是直接返回了我们之前预置的数据，并没有其他操作，但我们仍需要按照真实情况来模拟，因为后端服务的请求肯定会有网络延迟，所以一般我们在请求时使用回调函数，或者是 promise 来处理，所以在本地模拟时，我们也这样构建。",-1),P=s("p",null,"我们规定：如果有数据需要调用 obj 入参对象的 success 函数将数据传进去，这样处理后，我们便可以在调用方的 success 中编写获取到数据后的有关逻辑了。",-1),M=s("p",null,"因为网络延迟，所以表现在页面中应该需要体现等待加载的状态，告知用户产品正在通信（避免用户觉得产品卡死，并操作退出），所以我们在接口函数中使用 timeout 来规定 1 秒钟之后再返回数据。",-1),x=s("p",null,"这样，在页面中，我们可以编写和演示用户等待数据加载时的展示效果，来进一步开发页面。",-1),I=s("p",null,"如果你细心，就会发现 app.js 文件中包含了产品中所有需要后端交互的虚拟化接口，这样我们在与后端对接时，就可以直接操作 app.js 文件，非常方便地改写和调试，不需要改动页面逻辑代码：",-1),V=s("ul",null,[s("li",null,[s("strong",null,"小程序缓存")])],-1),H=s("p",null,"当然，我们通过虚拟化接口操作的不仅仅是读取数据，更多的是做数据的存储。比如，产品需要记录用户购物车里加入了哪个商品、订单结算时的收货地址、订单状态等信息。",-1),N=s("p",null,[s("strong",null,"那么在没有后端服务接入的情况下，我们如何存储这些数据呢？"),n(" 这就引出了我们要讲的第 3 点------小程序缓存。")],-1),W=s("p",null,"我们通过微信小程序提供的缓存接口，将产品交互时需要的数据存储起来，通过这种缓存方式保存的数据将不会随着用户退出小程序而消失，可以一直驻留（除非用户主动操作删除小程序本地数据）：",-1),G=s("p",null,"请打开项目目录 miniprogram/app.js 文件，定位到 178 行，为商品付款的虚拟接口 toPayTap",-1),O=s("p",null,"在此接口函数中，我们通过 wx.getStorageSync 同步获取缓存中信息，然后经过一系列处理，将处理后的信息通过 wx.setStorageSync 存回去。",-1),R=s("p",null,[s("strong",null,"需要注意的是，"),n(" 我们通过缓存能力实现数据保存的虚拟化接口，需要尽可能地与产品设计时保持一致，也就是尽可能模拟接口文档所应该呈现的信息。比如真实后端服务获取订单时有订单状态（进行中、已完成）的标志，但是在新增订单时我们并没有提供这个标志，也就是说这个标志是后端逻辑添加的，但是为了能够完整复现逻辑，我们应该在虚拟接口时主动添加：")],-1),Q=p("",14),L=s("p",null,'然后打开小程序开发者工具项目左上方的"云开发"按钮，进入云开发控制台，在"存储栏目"中点击上传文件，选择解压后的资源图片（除 data.json），将其上传至云存储：',-1),U=s("p",null,"上传完成后如下图所示，每个资源都有唯一 File ID",-1),K=s("p",null,"然后将 File ID 中除了文件名之外，前半部分根目录保存下来。以上图为例，保存的根目录为",-1),Y=s("p",null,"cloud://cloud-tcb.636c-cloud-tcb-1301077292（保留好这个根目录，我们会在下一步骤用到）。",-1),J=s("h4",{id:"数据库构建",tabindex:"-1"},[n("数据库构建 "),s("a",{class:"header-anchor",href:"#数据库构建","aria-label":'Permalink to "数据库构建"'},"​")],-1),z=s("p",null,"第二步要构建数据库，在微信小程序开发前，我们已经根据产品同学的设计逻辑设计好数据库的结构了，结构整体如下：",-1),X=s("p",null,"接下来，我们打开下载的多媒体资源包中的 data.json 文件，会看到预置的一些数据，然后用文本工具将 FileID 替换成存储时保存的根目录，最终效果如下：",-1),Z=s("p",null,'注意一下，上面的信息里我们把存储中上传的资源和数据源文件做了结合。接下来，我们打开云开发控制台中的"数据库栏目"，创建集合，名称为 goods，如下图所示：',-1),$=s("p",null,"创建成功后，点击左侧 goods 集合，点击导入，选择修改后的 data.json 文件，确认导入：",-1),ss=s("p",null,"导入后效果如下图所示：",-1),ns=s("p",null,"另外，再创建一个集合名为 order，用于记录订单数据，此集合不用导入数据。这样一来，我们就构建完了服务所用的数据库以及基础商品图片。",-1),as=s("h4",{id:"接口搭建",tabindex:"-1"},[n("接口搭建 "),s("a",{class:"header-anchor",href:"#接口搭建","aria-label":'Permalink to "接口搭建"'},"​")],-1),ls=s("p",null,"接下来，我们开始开发后端接口（每个接口一般都会经历 4 个步骤，我们从最简单的获取商品列表的接口开始入手）。",-1),ps=s("ul",null,[s("li",null,[s("strong",null,"创建云函数")])],-1),os=s("p",null,"第一次创建云函数时，你需要在项目目录中新建一个名为 cloudfunctions 的文件夹。",-1),es=s("p",null,"小程序开发者工具会自动为我们引入云开发环境（如果你有多个环境可以右键变更，选择之前上传存储和数据库的同一云开发环境）。",-1),ts=s("p",null,"目录创建好后，就可以创建云函数了，在 cloudfunctions 右键，点击新建 Node.js 云函数：",-1),cs=s("p",null,"在出现的输入框中输入 getGoodlist ，回车后便创建了一个名为 getGoodlist 的云函数，效果如下：",-1),rs=p("",5),Es=s("p",null,"如果你并没有变更 package.json 中的依赖引入，可以直接选择 index.js 右键，增量更新文件：",-1),is=p("",7),ys=p("",6),gs=s("p",null,"你会发现出现这样的情况：在运行时报错，提示找不到这个依赖。所以接下来，我们需要安装这个依赖。",-1),ds=s("h4",{id:"使用官方-npm-构建方法",tabindex:"-1"},[n("使用官方 npm 构建方法 "),s("a",{class:"header-anchor",href:"#使用官方-npm-构建方法","aria-label":'Permalink to "使用官方 npm 构建方法"'},"​")],-1),_s=s("p",null,"当我们使用官方 npm 构建方法时，我们需要执行如下步骤。",-1),us=s("ul",null,[s("li",null,[s("strong",null,"初始化NPM")])],-1),Fs=s("p",null,"在开发者工具项目目录中右键，打开内建终端（注意，定位到 miniprogram 目录）",-1),hs=p("",6),As=s("ul",null,[s("li",null,[s("strong",null,"构建 npm")])],-1),ms=s("p",null,'接下来就来构建微信小程序 npm ，点击开发者工具------菜单栏中的工具，选择"构建npm"。',-1),Cs=s("p",null,"开发者工具将会为我们构建 npm，最终效果如下：",-1),Ds=s("p",null,"在与 node_module 目录同级中出现 miniprogram_npm 目录，这就是我们构建好的微信小程序 npm。构建完毕后，我们来重新运行一下小程序，发现并不能很好的运行，报如下错误：",-1),bs=p("",4),vs=s("p",null,"更改项目 miniprogram/app.js 文件，将引入代码进行更改：",-1),ks=s("p",null,"重新运行小程序，发现可以正常使用了：",-1),Bs=s("p",null,"当然，俊鹏已经详细描述了官方构建的一些问题和弊端，比如依赖代码占用体积过大、引入流程特别复杂等。的确如此，在上图控制台中我们也发现警告提示，告知 lodash 包过大，已经超过500kb了，而且在实际开发中，我们需要用到各种依赖，如此构建会加重代码包的负担。最终上传之后，效果如下：",-1),fs=s("p",null,"包体积已经超过 1M，这显得非常臃肿，并且开发体验非常不好。所以我们再来体验一下WebPack 的构建方法，对比一下体会其中的优势。",-1),ws=s("h4",{id:"使用webpack构建方法",tabindex:"-1"},[n("使用WebPack构建方法 "),s("a",{class:"header-anchor",href:"#使用webpack构建方法","aria-label":'Permalink to "使用WebPack构建方法"'},"​")],-1),js=s("p",null,"首先我们先删除之前官方 npm 构建的文件夹 miniprogram_npm，以及 package-lock\\package.json 文件，暂时保持 app.js 代码不变，效果如下：",-1),Ts=s("p",null,"接下来，我们开始从这里构建 WebPack 化的小程序。",-1),Ss=s("ul",null,[s("li",null,[s("strong",null,"更改项目结构")])],-1),qs=s("p",null,"首先在项目根目录创建文件夹，名称为 src，并将 miniprogram、cloudfunctions 文件夹移到里面，最终效果如下：",-1),Ps=p("",10),Ms=p("",8),xs=s("p",null,"在日志中出现一个错误，我们在之前 app.js 中仍然保持引入的 lodash 依赖，但是并没有安装这个依赖，导致错误。所以我们要对 app.js 的文件进行修改，效果如下：",-1),Is=p("",3),Vs=s("p",null,"然后打开项目目录下 project.config.json，配置 root 根目录，如下图所示：",-1),Hs=s("p",null,"配置完成后，我们便能够重新在模拟器中看到小程序运行了。",-1),Ns=s("ul",null,[s("li",null,[s("strong",null,"新增遍历 js 插件")])],-1),Ws=s("p",null,"你要注意，在我们操作演示的过程中，我们通过 babel 处理 js 文件，然后使用 copy 插件直接复制其他的文件，不做任何更改。",-1),Gs=s("p",null,"那怎么让 WebPack知道小程序代码中哪些地方存在 js 文件呢？我们使用配置的方式来匹配，如下图配置：",-1),Os=p("",5),Rs=s("p",null,"打开项目目录下 webpack.config.js 文件，更改如下配置：",-1),Qs=s("p",null,"保存后重新终端执行 webpack，效果如下：",-1),Ls=s("p",null,"此插件是根据 app.json 中配置的 page 内容来自动生成相应 entry 配置，达到自动遍历生成的目的。",-1),Us=s("p",null,"关于 WebPack 的实战内容，我就讲这么多，关于WebPack 更多使用方法和插件用法，你可以通过 WebPack 官网学习和使用。最后，我们看一下在同样项目代码的情况下，使用 WebPack打包构建的效果：",-1),Ks=s("p",null,[n("相比于官方 npm，这大大缩小了代码包的体积，另外我们可以使用通用前端依赖使用方法来便捷的开发小程序，对我们的研发效率也有非常大的提升（关于项目最终版代码，请点击"),s("a",{href:"https://cloud.dnuise.cn/res/shop/SHOP-WP.zip",target:"_blank",rel:"noreferrer"},"此链接"),n("下载）。")],-1),Ys=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),Js=s("p",null,"今天这一讲，我详细讲解了原生的小程序本地开发、云开发后端服务的搭建，以及工程化开发转型升级，本次实战的项目并不复杂，即使是初入前端也可以轻松掌握和学习。",-1),zs=s("p",null,"当然，如果你细心的话应该会注意到，在项目中有些代码我做了一些不合理的设计，所以我这次留给你的作业是：结合前 4 个模块的内容，对这一讲项目不合理处进行完善修改，并尝试在云开发服务的执行效率上，根据第 4 模块的知识点做一些优化实践。",-1);function Xs(Zs,$s,sn,nn,an,ln){const a=e("Image");return t(),c("div",null,[E,i,y,g,d,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/04/5A/CgpVE1_tl46AeEQsAABWK2tPThk846.png"}),n(),_,u,F,h,l(a,{alt:"Lark20210105-183031.png",src:"https://s0.lgstatic.com/i/image2/M01/04/A5/Cip5yF_0QCaAYcQLAADGgI9rDGk908.png"}),n(),A,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tl5yAFCqGAANmbYoPcOw244.png"}),n(),m,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tl6GAM7IqAAj-QL0GESA515.png"}),n(),C,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/8C/78/Ciqc1F_tl6mAOmYzAAGFZ1t1uvo295.png"}),n(),D,b,v,k,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tl7GARXNGAAFRgUu7Q_Q523.png"}),n(),B,f,w,j,T,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tl7iADxQzAAHa7tIZXow546.png"}),n(),S,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/8C/78/Ciqc1F_tl76AdJ_iAAFALHp_TF4590.png"}),n(),q,P,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tl8SAA8NuAAC9atS8aUc559.png"}),n(),M,x,I,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/8C/78/Ciqc1F_tl8uAYeJ7AALd-xIyaM4986.png"}),n(),V,H,N,W,l(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/8C/78/Ciqc1F_tl9WACmgdAAP72kkqnlo713.png"}),n(),G,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tl9yAOAALAAHfcgphwHs906.png"}),n(),O,R,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tl-WAXKYlAAN9ZpAjY1w186.png"}),n(),Q,l(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/8C/78/Ciqc1F_tl_qAGbKPAAERtd6w8BM803.png"}),n(),L,l(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/8C/78/Ciqc1F_tmAGAYGHvAAQeKLC67Ww333.png"}),n(),U,l(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmAiAIPXcAAN417jAows817.png"}),n(),K,Y,J,z,l(a,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/8C/78/Ciqc1F_tmBGAfY2DAAHyQV6FYKE108.png"}),n(),X,l(a,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tmBqASYAQAAH0HvzSFwM710.png"}),n(),Z,l(a,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tmCGAOV5rAAHWpQCGQ6U713.png"}),n(),$,l(a,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image/M00/8C/78/Ciqc1F_tmCuAESE0AAH23iW0FdA254.png"}),n(),ss,l(a,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmDOABSlhAAKDukdrebQ850.png"}),n(),ns,as,ls,ps,os,l(a,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tmD2AZNK1AAB-M-BIMX4972.png"}),n(),es,ts,l(a,{alt:"Drawing 22.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmEWAJMSaAAITUJcSpgE780.png"}),n(),cs,l(a,{alt:"Drawing 23.png",src:"https://s0.lgstatic.com/i/image2/M01/04/5A/CgpVE1_tmEyAEEERAACiBI4425U706.png"}),n(),rs,l(a,{alt:"Drawing 24.png",src:"https://s0.lgstatic.com/i/image2/M01/04/5A/CgpVE1_tmFmAWbXqAAMpUwZfbr0305.png"}),n(),Es,l(a,{alt:"Drawing 25.png",src:"https://s0.lgstatic.com/i/image2/M01/04/5A/CgpVE1_tmF-AVpMgAAHL7qFhZqo041.png"}),n(),is,l(a,{alt:"Drawing 26.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmGyAT2tYAARWugxoWjQ056.png"}),n(),ys,l(a,{alt:"Drawing 27.png",src:"https://s0.lgstatic.com/i/image2/M01/04/5A/CgpVE1_tmHiAECw8AAQDw7slF2A349.png"}),n(),gs,ds,_s,us,Fs,l(a,{alt:"Drawing 28.png",src:"https://s0.lgstatic.com/i/image2/M01/04/5A/CgpVE1_tmIWALLuQAAMoCvjcz4k741.png"}),n(),hs,l(a,{alt:"Drawing 29.png",src:"https://s0.lgstatic.com/i/image2/M01/04/5B/CgpVE1_tmJuALWI-AAFkw7uAQ-U077.png"}),n(),As,ms,l(a,{alt:"Drawing 30.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmKmAOrAVAAkuIlXIdUM139.png"}),n(),Cs,l(a,{alt:"Drawing 31.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tmLCAQAVBAAFzJGcp2EU206.png"}),n(),Ds,l(a,{alt:"Drawing 32.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tmLiAeT5qAASyfaSj9dE503.png"}),n(),bs,l(a,{alt:"Drawing 33.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmMGARtWvAAA1DUwx0bk812.png"}),n(),vs,l(a,{alt:"Drawing 34.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tmMiAQQUVAADz7R24fHg795.png"}),n(),ks,l(a,{alt:"Drawing 35.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tmNCABO0FAAK34oMomDI287.png"}),n(),Bs,l(a,{alt:"Drawing 36.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tmNiACZqcAAGbJ76c_rU714.png"}),n(),fs,ws,js,l(a,{alt:"Drawing 37.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tmOKAEVErAAPAzlE4PXQ553.png"}),n(),Ts,Ss,qs,l(a,{alt:"Drawing 38.png",src:"https://s0.lgstatic.com/i/image/M00/8C/78/Ciqc1F_tmOqAQ8miAAGH4U2LZKc975.png"}),n(),Ps,l(a,{alt:"Drawing 39.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmP2AdHuvAADeZBlRK18491.png"}),n(),Ms,l(a,{alt:"Drawing 40.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmQ6AeryyAAKVdE2YkZs097.png"}),n(),xs,l(a,{alt:"Drawing 41.png",src:"https://s0.lgstatic.com/i/image2/M01/04/5B/CgpVE1_tmRWAH4mtAAEq-xOneiw557.png"}),n(),Is,l(a,{alt:"Drawing 42.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmSCAFj7pAAQGFdL9XB4760.png"}),n(),Vs,l(a,{alt:"Drawing 43.png",src:"https://s0.lgstatic.com/i/image/M00/8C/78/Ciqc1F_tmSeAK9v6AAXSOhwDtNI288.png"}),n(),Hs,Ns,Ws,Gs,l(a,{alt:"Drawing 44.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tmS6AfYABAAF6ik6O5qI636.png"}),n(),Os,l(a,{alt:"Drawing 45.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmTyAJLdtAAHJudUl2jc456.png"}),n(),Rs,l(a,{alt:"Drawing 46.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmUOAaqjLAALnXfCs2Mk811.png"}),n(),Qs,l(a,{alt:"Drawing 47.png",src:"https://s0.lgstatic.com/i/image/M00/8C/83/CgqCHl_tmUmAOpNUAAOInArb3fI238.png"}),n(),Ls,Us,l(a,{alt:"Drawing 48.png",src:"https://s0.lgstatic.com/i/image2/M01/04/59/Cip5yF_tmVCAHIRrAAGTl0qvF6U457.png"}),n(),Ks,Ys,Js,zs])}const en=o(r,[["render",Xs]]);export{on as __pageData,en as default};

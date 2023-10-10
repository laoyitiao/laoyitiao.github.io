import{_ as l,j as p,o as t,g as c,k as o,h as s,Q as e,s as a}from"./chunks/framework.cfb14fe0.js";const S=JSON.parse('{"title":"29远程开关：如何远程遥控上线App的产品行为？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6684) 29  远程开关：如何远程遥控上线 App 的产品行为？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6684) 29  远程开关：如何远程遥控上线 App 的产品行为？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6684) 29  远程开关：如何远程遥控上线 App 的产品行为？.md"},y=e("",5),E=e("",14),i=e("",26),g=a("p",null,'我们可以在 Firebase 网站上点击 Engage -> Remote Config 菜单来打开 Remote Config 配置页面，然后点击"Add parameter"来添加一个名叫"isRoundedAvatar"的配置，如下图所示：',-1),d=a("p",null,'当添加或修改完配置后，一定要记住点击下图的"Publish changes"按钮来发布更新。',-1),F=a("p",null,'现在我们就能很方便地在 Firebase 网站上修改"isRoundedAvatar"配置的值来控制头像的显示风格了。',-1),C=a("p",null,"除了简单地启动或者关闭远程开关以外，Firebase 还可以帮我们根据用户的特征进行条件配置，例如，我们可以让所有使用中文的用户启动圆形头像风格，而让其他语言的用户保留原有风格。",-1),m=a("p",null,[s("下面我们就来看看如何在 Firebase 网站上"),a("strong",null,"进行条件配置"),s("。")],-1),u=a("p",null,'我们可以点击修改按钮的图标来打开修改弹框，然后点击"Add value for condition"按钮来添加条件。如下图所示，我们添加了一个名叫"Chinese users"的条件，该条件会判断用户是否使用中文作为他们设备的默认语言。',-1),f=a("p",null,[s('然后我们就可以为符合该条件的用户配置不同的值，例如在下图中，符合"Chinese users"条件的用户在读取"isRoundedAvatar"配置时都会得到'),a("code",null,"true"),s("。")],-1),A=a("p",null,"下面是 Moments App 运行在不同语言设备上的效果图，你可以对比一下。",-1),h=e("",8);function D(b,v,R,_,T,B){const n=p("Image");return t(),c("div",null,[y,o(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/42/48/CioPOWCwv2SADMy0AAaS5zXqWdw226.png"}),s(),E,o(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/42/48/CioPOWCwv3SAVlZxAAEErVPTcjU511.png"}),s(),i,o(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/42/40/Cgp9HWCwv4mAaXxBAAFQQUUchME827.png"}),s(),g,o(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/42/40/Cgp9HWCwv46AJnkoAABDkckTx4Q957.png"}),s(),d,o(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/42/48/CioPOWCwv5WAeslvAAA35s5FG6I535.png"}),s(),F,C,m,u,o(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/42/48/CioPOWCwv5uAVDBQAABwa1bn3zE273.png"}),s(),f,o(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/42/48/CioPOWCwv6CAVm2nAABefStzJKo444.png"}),s(),A,o(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/42/40/Cgp9HWCwv6mALnzGAGJIzKWo3xc607.png"}),s(),h])}const P=l(r,[["render",D]]);export{S as __pageData,P as default};

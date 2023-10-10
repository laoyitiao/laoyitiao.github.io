import{_ as l,j as e,o as t,g as c,k as o,h as s,Q as p,s as n}from"./chunks/framework.cfb14fe0.js";const H=JSON.parse('{"title":"24解决打包痛点：如何统一管理Certificate和Profile？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6679) 24  解决打包痛点：如何统一管理 Certificate 和 Profile？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6679) 24  解决打包痛点：如何统一管理 Certificate 和 Profile？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6679) 24  解决打包痛点：如何统一管理 Certificate 和 Profile？.md"},i=p("",7),E=p("",10),y=n("p",null,[s("这里需要注意："),n("strong",null,"我们必须把 Repo 设置为 Private，因为该 Repo 保存了私钥等关键信息"),s("，一旦设置为 Public 的话，所有人都可以访问它了。")],-1),d=n("h4",{id:"生成-github-access-token",tabindex:"-1"},[s("生成 GitHub Access Token "),n("a",{class:"header-anchor",href:"#生成-github-access-token","aria-label":'Permalink to "生成 GitHub Access Token"'},"​")],-1),_=n("p",null,[n("strong",null,"那怎样才能让整个团队都能访问这个私有 Repo 呢？答案是使用 GitHub Access Token。")],-1),u=n("p",null,"我推荐的做法是为每一个 App 新建一个 GitHub 账户，例如新建一个叫作 momentsci 的账户，然后把该账户添加到私有 Repo 的贡献者列表里面。如下图所示：",-1),g=n("p",null,"这样子，momentsci 用户就能访问和更新该私有 Repo 了。",-1),F=n("p",null,'下一步是为 momentsci 用户生成 GitHub Access Token。当我们通过 momentsci 登录到 GitHub 以后，点击 Settings -> Developer settings -> Personal access tokens 来打开来配置页面，接着再点击 Generate new token 按钮，在 Note 输入框填写 Token 的用途，比如写上"用于 Moments App 的 CI"，然后在 Select scopes 选上 repo，如下图所示：',-1),C=n("p",null,"因为我们选择了 Full controll of private repositories（能完全控制所有私有 Repo），所以使用该 Token 的应用程序（例如 fastlane）就有权限访问 momentsci 用户所能访问的所有 Repo，并且能 push commit 到这些 Repo 去。当我们点击 Generate token 按钮以后就生成一个如下图所示的 Token：",-1),h=p("",12),A=p("",25),m=n("p",null,[s("其中，"),n("strong",null,"certs 文件夹用于保存私钥（.p12）和证书（.cer）文件，而 profiles 文件夹则用来保存 adhoc 和 appstore 两个 Provisioning Profile 文件"),s("。")],-1),f=n("p",null,"你也可以在苹果开发者网站查看新的证书文件：",-1),k=n("p",null,"同时还可以看到 Provisioning Profile 文件：",-1),P=n("p",null,"除此之外，你还可以在 Keychain App 里面找到新增的私钥和证书，如下图所示：",-1),q=p("",6),v=p("",12);function b(B,T,D,S,I,R){const a=e("Image");return t(),c("div",null,[i,o(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/3E/F6/Cgp9HWCbpROAFzsfAAbfDL-IX24841.png"}),s(),E,o(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/3D/C3/CioPOWCWMc2ASbGgAAEeGAfOCoA064.png"}),s(),y,d,_,u,o(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/3D/C3/CioPOWCWMdSAYvK7AADj0dRNEHo360.png"}),s(),g,F,o(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/3D/C3/CioPOWCWMdyAGRYeAAGmH0NcYDk620.png"}),s(),C,o(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/3E/F6/Cgp9HWCbpVKAIJRSAAQzSVGBgVk131.png"}),s(),h,o(a,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M01/3E/F7/Cgp9HWCbpZiAbIChAAC_Yq3o-fE466.png"}),s(),A,o(a,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M01/3E/F7/Cgp9HWCbpdWASXy9AAJKo3Mqtpg236.png"}),s(),m,f,o(a,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M01/3E/F7/Cgp9HWCbpfqAKc17AAFyb88k84o360.png"}),s(),k,o(a,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M00/3E/FF/CioPOWCbpheAOxNSAAFxbPkMv1o580.png"}),s(),P,o(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M00/3D/C3/CioPOWCWMyeAQN7wAAOKWo3am2o738.png"}),s(),q,o(a,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M00/3E/FF/CioPOWCbpj2AYt-xAAFbLA-2M_0002.png"}),s(),v])}const O=l(r,[["render",b]]);export{H as __pageData,O as default};

import{_ as o,j as e,o as t,g as r,k as p,h as s,Q as l,s as a}from"./chunks/framework.4e7d56ce.js";const U=JSON.parse('{"title":"12渐进增强：小程序的更新策略","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5105) 12  渐进增强：小程序的更新策略.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5105) 12  渐进增强：小程序的更新策略.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5105) 12  渐进增强：小程序的更新策略.md"},E=l("",14),y=l("",7),i=a("p",null,"小程序端侧资源更新机制（未启动时）",-1),_=a("p",null,[a("strong",null,"如果小程序处于冷启动状态"),s("，微信客户端会主动检查是否有新版本，同时会向用户展示缓存中的旧版本。有新版本的话会默默地拉取到本地，然后在用户再次触发小程序冷启动时展示给用户。也就是说，需要两次冷启动才能将最新版本的小程序展示给用户。整个流程如下图所示：")],-1),d=a("p",null,"小程序端侧资源更新机制（冷启动时）",-1),g=a("p",null,[a("strong",null,'从上述内容中，你可以得出一个结论：当你发布一个新版本后，用户并不能"立即"获得更新。')],-1),F=a("p",null,'在传统前端领域，当网站发布新版本之后，用户下次打开或刷新之后就会"立即"体验到新版本，没有延迟。但是在小程序场景下，更新之后并不是"立即"让用户体验到新版，而是"尽可能快"。',-1),u=a("p",null,[s("从官方描述中，小程序未启动时最慢 24 小时可以覆盖全部用户，或者需要经历两次冷启动，这对一些紧急的版本更新来说太慢了，所以在现实工作中往往要将小程序的更新提速，让用户尽可能快地获取到新版本。具体实施方法是通过小程序的"),a("a",{href:"https://developers.weixin.qq.com/miniprogram/dev/api/base/update/UpdateManager.html",target:"_blank",rel:"noreferrer"},"UpdateManager"),s("对象，在代码里主动检查并应用更新信息。我们对照流程图和代码讲解，来看下面这张图：")],-1),h=l("",13),A=l("",6);function C(m,D,B,T,q,f){const n=e("Image");return t(),r("div",null,[E,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/7E/B0/CgqCHl_PRYSAdUKlAABkJXQQRno160.png"}),s(),y,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/7E/A4/Ciqc1F_PRaSAB7h_AACK3mY3DIc474.png"}),s(),i,_,p(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/7E/B0/CgqCHl_PRayAPuEBAAB-vKUufFE603.png"}),s(),d,g,F,p(n,{alt:"12.png",src:"https://s0.lgstatic.com/i/image/M00/80/34/CgqCHl_Qgs6AcbdkAAB5dqXFBXM900.png"}),s(),u,p(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/7E/B0/CgqCHl_PRbiAQW0PAADXPXeI_Sk990.png"}),s(),h,p(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/7E/A5/Ciqc1F_PRemAUTGuAACQ960V97c989.png"}),s(),A])}const P=o(c,[["render",C]]);export{U as __pageData,P as default};

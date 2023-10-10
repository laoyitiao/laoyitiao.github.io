import{_ as o,j as e,o as t,g as c,k as l,h as s,Q as p,s as n}from"./chunks/framework.cfb14fe0.js";const x=JSON.parse('{"title":"06SQL注入：小心数据库被拖走（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/Web 安全攻防之道_文档/(5974) 06  SQL 注入：小心数据库被拖走（上）.md","filePath":"posts/devops/Web 安全攻防之道_文档/(5974) 06  SQL 注入：小心数据库被拖走（上）.md","lastUpdated":1696682708000}'),r={name:"posts/devops/Web 安全攻防之道_文档/(5974) 06  SQL 注入：小心数据库被拖走（上）.md"},E=p("",6),y=p("",12),F=n("p",null,"图 2：username 没有闭合导致的语法错误",-1),i=n("p",null,"还记得开头提到的万能密码吗？我们输入试试：",-1),C=p("",31),u=n("p",null,"图 4：正常访问的页面",-1),d=n("p",null,[s("以 sqli-labs 第 8 题为例，上图是正常访问后的网页内容。通过 Get 参数 id 实现 SQL 注入，我们直接用前面讲的单引号注入试试，请求地址为 "),n("a",{href:"http://localhost/Less-8/?id=1",target:"_blank",rel:"noreferrer"},"http://localhost/Less-8/?id=1"),s("'，返回结果如下：")],-1),h=p("",17),g=n("p",null,"图 6：请求 1 展示图",-1),B=p("",9),A=n("p",null,"图 8：宽字符导致的错误",-1),D=n("p",null,"注入关键词 IF 导致的错误：",-1),q=p("",10),_=p("",4),m=p("",4),b=p("",23),v=p("",7),L=n("p",null,"图 14：内联/嵌套查询注入",-1),T=n("p",null,"内联/嵌套查询注入方法可以在一句语句中嵌入另一句语句，在有限漏洞场景下能实现更多的功能，因此在实际的漏洞利用中常被用于实现敏感信息的窃取，甚至执行系统命令。",-1),S=n("h3",{id:"总结",tabindex:"-1"},[s("总结 "),n("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),k=n("p",null,"这一讲我主要介绍了 SQL 注入的产生原理、分类，以及相关的测试技术。SQL 注入产生的原因是由于开发对用户的输入数据未做有效过滤，直接引用 SQL 语句执行，导致原本的数据被当作 SQL 语句执行。通常来说，SQL 注入分为数字型和字符型注入，我们主要通过注入参数类型来判断。",-1),f=n("p",null,"我还介绍了 6 大 SQL 注入测试技术，这是挖掘和利用 SQL 注入漏洞的基础，只有掌握这些测试技术，才能进一步提升对 SQL 注入的理解与实践能力。",-1),w=n("p",null,"SQL 注入通常被视为高危或严重的漏洞，一些漏洞奖励平台对此的赏金也会很高，尤其是在国外，经常在 5000 美金以上，甚至有的是几万美金。",-1),I=n("p",null,"在学习之后，你也可以尝试去挖一些国内的 SRC 平台或者国外 HackerOne 平台授权的测试网站。如果你有发现什么有趣的 SQL 注入漏洞，欢迎在留言区分享。",-1);function M(R,$,Q,P,O,H){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPOeAI7xSAABTJIYxcfE254.png"}),s(),y,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPPmAe_Z_AALZLcXi9OA547.png"}),s(),F,i,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/Cip5yF_gPP6AYussAALaISw7_cc369.png"}),s(),C,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/Cip5yF_gPQ2AHPOrAAMq22_Vn7A821.png"}),s(),u,d,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPRWATvHkAAMWNlgn8Q0897.png"}),s(),h,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPSSAcUf3AAOSbJ2meEM358.png"}),s(),g,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPSqACFm1AAOOcCQ2IIE741.png"}),s(),B,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPTmAH1smAAOLYXHDOxU134.png"}),s(),A,D,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/Cip5yF_gPT-AD3rcAAOEXKoNpik989.png"}),s(),q,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPUqADu50AANtXLBwuf0866.png"}),s(),_,l(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/Cip5yF_gPVGAYoxhAANs6mFjRDI693.png"}),s(),m,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/Cip5yF_gPVmAaBouAAN-25Njwzw855.png"}),s(),b,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPWaAOKOTAABkBqvFPw0394.png"}),s(),v,l(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gPW-AdtmmAAOCJCqUXmU735.png"}),s(),L,T,S,k,f,w,I,l(a,{alt:"Lark20201231-135716.png",src:"https://s0.lgstatic.com/i/image/M00/8C/7D/CgqCHl_taF6AUy71AAUbxs9dlU0807.png"})])}const V=o(r,[["render",M]]);export{x as __pageData,V as default};

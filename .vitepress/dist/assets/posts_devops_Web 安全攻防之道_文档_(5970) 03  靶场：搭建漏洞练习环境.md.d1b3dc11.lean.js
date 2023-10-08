import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.a0d18f64.js";const Q=JSON.parse('{"title":"03靶场：搭建漏洞练习环境","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/Web 安全攻防之道_文档/(5970) 03  靶场：搭建漏洞练习环境.md","filePath":"posts/devops/Web 安全攻防之道_文档/(5970) 03  靶场：搭建漏洞练习环境.md","lastUpdated":1696682708000}'),r={name:"posts/devops/Web 安全攻防之道_文档/(5970) 03  靶场：搭建漏洞练习环境.md"},E=p("",15),y=p("",11),i=s("p",null,"图 1：sqli-labs 成功运行",-1),d=s("p",null,'最后点击"Setup/reset Database for labs"链接完成数据库的安装：',-1),u=p("",7),h=s("p",null,"图 3：DVWA靶场",-1),b=s("p",null,'然后点击"Create/Reset Database"创建数据库，使用默认密码 admin/password 登录，即可正常使用。做题时它能直接提供阅读源码的功能，不过题目相对少一些。',-1),g=s("p",null,"图 4：DVWA 支持在线查看源码",-1),F=s("p",null,'上面的 XSS 漏洞默认是安全的，在实际练习时，可以在"DVWA Security"中设置安全等级，即题目的难度等级，共有 4 等，其中 Impossible 代表的是已修复漏洞的情况，可以用来熟悉如何修复漏洞。',-1),A=p("",8),D=s("p",null,"图 6：Pikachu 靶场",-1),m=s("h3",{id:"ctf-赛题练习",tabindex:"-1"},[a("CTF 赛题练习 "),s("a",{class:"header-anchor",href:"#ctf-赛题练习","aria-label":'Permalink to "CTF 赛题练习"'},"​")],-1),k=s("p",null,"CTF（Capture The Flag）夺旗赛，在网络安全领域中指的是网络安全技术人员之间进行技术竞技的一种比赛形式。CTF 起源于 1996 年 DEFCON 全球黑客大会，以代替之前黑客们通过互相发起真实攻击进行技术比拼的方式。发展至今，CTF 已经成为全球范围网络安全圈流行的竞赛形式。",-1),_=s("p",null,"一些 CTF 出题方经常会直接搭建现成的漏洞测试环境供参赛者使用，有些赛后会取消，有些会一直保留。所以你也可以直接利用现成的 CTF 赛题环境来练习，连搭建环境这一步都省去了。对于一些未保留在线赛题环境的 CTF 题目，就只能自己搭建了。",-1),f=s("p",null,"前面的漏洞靶场更新频率不高，CTF 赛题会更与时俱进一些，每年都有新比赛和新赛题，特别是新的漏洞场景和利用技术，这在 CTF 上很容易看到。",-1),C=s("p",null,"图 7：CTF TIME",-1),q=s("p",null,[a("各种国内外的赛事、题目与解答（write-up）都可通过"),s("a",{href:"https://ctftime.org/",target:"_blank",rel:"noreferrer"},"该链接"),a("获取到，我在这里顺便也介绍几个现成的 Web 漏洞 CTF 在线练习环境：")],-1),v=s("p",null,[s("strong",null,"1. XCTF 攻防世界"),a(" ："),s("a",{href:"https://adworld.xctf.org.cn/",target:"_blank",rel:"noreferrer"},"https://adworld.xctf.org.cn")],-1),P=s("p",null,"图 8：XCTF 攻防世界",-1),w=s("p",null,[s("strong",null,"2. SQL 注入挑战平台"),a(" ："),s("a",{href:"http://redtiger.labs.overthewire.org/",target:"_blank",rel:"noreferrer"},"http://redtiger.labs.overthewire.org")],-1),T=s("p",null,"图 9：SQL 注入挑战平台",-1),B=s("p",null,[s("strong",null,"3. 韩国 Web 安全挑战平台"),a(" ："),s("a",{href:"https://webhacking.kr/",target:"_blank",rel:"noreferrer"},"https://webhacking.kr/")],-1),S=s("p",null,"图 10：韩国 Web 安全挑战平台",-1),$=s("p",null,[s("strong",null,"4. Websec CTF 练习平台"),a(" ："),s("a",{href:"http://www.websec.fr/#",target:"_blank",rel:"noreferrer"},"http://www.websec.fr/")],-1),I=s("p",null,"图 11：Websec CTF 练习平台",-1),V=s("p",null,[s("strong",null,"5. 网络信息安全攻防学习平台"),a(" ："),s("a",{href:"http://hackinglab.cn/index.php",target:"_blank",rel:"noreferrer"},"http://hackinglab.cn/index.php")],-1),x=s("p",null,"图 12：网络信息安全攻防学习平台",-1),M=s("p",null,[s("strong",null,"6. 国外的 XSS 挑战平台"),a(" ："),s("a",{href:"http://prompt.ml/0",target:"_blank",rel:"noreferrer"},"http://prompt.ml/")],-1),W=p("",15);function j(H,L,U,N,R,Z){const n=e("Image");return t(),c("div",null,[E,l(n,{alt:"Lark20201217-105445.png",src:"https://s0.lgstatic.com/i/image2/M01/02/AC/Cip5yF_ayluADYpRAAE2DM3MpC8011.png"}),a(),y,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/02/12/Cip5yF_ZuAGATUgkAAGVntvgIOM781.png"}),a(),i,d,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/8A/33/Ciqc1F_ZuAmAJIaRAAERioET74I030.png"}),a(),u,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8A/33/Ciqc1F_ZuBWAJBW5AAFVUYKVo8w698.png"}),a(),h,b,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8A/33/Ciqc1F_ZuByAHaCUAAHUf-R43-Q924.png"}),a(),g,F,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3F/CgqCHl_ZuCOADWKnAAKUKNFpXFI694.png"}),a(),A,l(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3F/CgqCHl_ZuC6AayiZAAMqHiaWbIU414.png"}),a(),D,m,k,_,f,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/8A/34/Ciqc1F_ZuDiAeLPeAAK1kIaowLY092.png"}),a(),C,q,v,l(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image2/M01/02/13/CgpVE1_ZuFqAH3WWAAMOpy42Cuc721.png"}),a(),l(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image2/M01/02/13/CgpVE1_ZuGCAdoE4AAKZFZivpWQ215.png"}),a(),P,w,l(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image2/M01/02/12/Cip5yF_ZuGqAeCGsAAGlHZA_JGs807.png"}),a(),T,B,l(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image2/M01/02/12/Cip5yF_ZuHSAWPRUAAKJfGvDxu0291.png"}),a(),S,$,l(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3F/CgqCHl_ZuIeAGZpmAADl8TfMSMQ212.png"}),a(),I,V,l(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3F/CgqCHl_ZuI6AZUYIAAey0yr4Jmk015.png"}),a(),x,M,l(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image2/M01/02/13/CgpVE1_ZuJqAYWnQAACsYbsaYR0177.png"}),a(),W,l(n,{alt:"Lark20201216-181724.png",src:"https://s0.lgstatic.com/i/image/M00/8A/4D/Ciqc1F_Z3sOAUL7NAAEDu5ea3Q0004.png"})])}const G=o(r,[["render",j]]);export{Q as __pageData,G as default};

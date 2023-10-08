import{_ as o,j as e,o as t,g as r,k as p,h as a,Q as l,s}from"./chunks/framework.a0d18f64.js";const J=JSON.parse('{"title":"02信息收集：掌握目标的一切信息","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/Web 安全攻防之道_文档/(5969) 02  信息收集：掌握目标的一切信息.md","filePath":"posts/devops/Web 安全攻防之道_文档/(5969) 02  信息收集：掌握目标的一切信息.md","lastUpdated":1696682708000}'),c={name:"posts/devops/Web 安全攻防之道_文档/(5969) 02  信息收集：掌握目标的一切信息.md"},y=l("",19),E=s("p",null,"图 1：OneForAll",-1),F=s("ul",null,[s("li",null,[s("a",{href:"https://github.com/lijiejie/subDomainsBrute",target:"_blank",rel:"noreferrer"},"subDomainsBrute"),a("采用暴力猜解域名的方式，速度快、准确度高。但由于是字典猜解方式，仍会存在一定的漏报。")])],-1),i=s("p",null,"图 2：subDomainsBrute 运行效果图",-1),C=s("p",null,"图 3：subDomainsBrute 爬取的域名结果图",-1),h=s("p",null,"同一域名有时会有指向多个 IP 地址情况，因为企业可能采用 CDN 内容分发网络，就近选择网络最好的节点服务器响应用户。因此，有时同一台机器访问同一个域名时，会访问到不同的 IP，比如 weixin.lagou.com 就是如此。",-1),g=l("",7),d=l("",5),_=l("",5),u=s("p",null,"图 7：Amass",-1),B=s("ul",null,[s("li",null,[s("a",{href:"https://dnsdumpster.com/",target:"_blank",rel:"noreferrer"},"DNSDumpster"),a("可以在线搜索子域名以及相应的 IP 地址，提供 xlsx 文件导出，以及整个域名映射关系图、IP 分布地图等信息，在展示和准确度上还是不错的。它的搜索速度也很快，但就是子域收集相对少很多。")])],-1),m=s("p",null,"图 8：DNSDumpster",-1),A=s("ul",null,[s("li",null,[s("a",{href:"https://subdomainfinder.c99.nl/",target:"_blank",rel:"noreferrer"},"Subdomain Finder"),a('支持在线搜索子域名以及相应的 IP 地址。它的扫描速度很快，若没有显示 IP 则代表域名没有绑定有效的网络服务器，或者无法访问该域名。在界面上，它直接提供"Check Status"功能来检测网站的访问状态。该网站上还提供有"Private scan"功能，可以防止扫描时被记录。但它的不足之处在于，扫描结果无法直接导出文件到本地。')])],-1),b=s("p",null,"图 9：Subdomain Finder",-1),f=s("p",null,[a("以"),s("a",{href:"https://www.lagou.com/",target:"_blank",rel:"noreferrer"},"拉勾网"),a("（lagou.com）为例，我对上述工具的子域检测结果进行了统计对比，得到的结果如下表所示：")],-1),x=s("p",null,"图 10：不同工具的子域检测结果统计对比",-1),S=s("p",null,"可以看到，Amass 扫出的数据实在是太多了（大部分是直接跳转到 lagou.com 主页），其他工具的柱状数据会小得无法比较。因此，在画统计图的时候我去掉了它。",-1),D=l("",16),k=s("p",null,"图 12：Wappalyzer",-1),v=s("p",null,[a("还有一个在线检测网站也支持指纹检测："),s("a",{href:"https://scan.top15.cn/web/",target:"_blank",rel:"noreferrer"},"https://scan.top15.cn/web/"),a("，如下图所示：")],-1),T=l("",7),w=s("p",null,"图 14：The Web of WebScan",-1),N=s("p",null,[a("（2）"),s("a",{href:"https://chapangzhan.com/",target:"_blank",rel:"noreferrer"},"https://chapangzhan.com/")],-1),P=l("",10),I=l("",8),q=s("p",null,"图 17：Recon-NG",-1),W=s("ul",null,[s("li",null,[s("a",{href:"https://github.com/kennbroorg/iKy",target:"_blank",rel:"noreferrer"},"iKy"),a("的界面很酷，它能够从 Twitter、GitHub、Skype、Linkedin、Instagram 等社交平台上收集信息，但需要提前设置各平台上的 API KEY，可以输入一个邮箱地址去搜索其上述平台上的关联信息，最后会以可视化效果展示出来，如下图所示。")])],-1),V=l("",9),G=s("p",null,"图 19：域名验证脚本",-1),O=s("p",null,"你可以尝试写一个域名验证脚本（Python、Shell......），如果遇到了什么问题或者是有什么心得，欢迎在留言区分享和讨论。",-1),M=s("p",null,"下一讲，我将带你了解如何自己搭建用于练习漏洞攻防的靶场，避免你在他人网站做测试，造成承担不必要的违法责任。",-1);function j(R,H,Z,L,z,K){const n=e("Image");return t(),r("div",null,[y,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0F/CgpVE1_Zs8GACtELAAPLVt3Jvzo273.png"}),a(),E,F,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0E/Cip5yF_Zs8mAA8mZAABmufeGtgo263.png"}),a(),i,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3B/CgqCHl_Zs9CAAyGNAAGHTTFk6E8801.png"}),a(),C,h,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8A/30/Ciqc1F_Zs9iAPsGyAAEeKOg3y5k105.png"}),a(),g,p(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/8A/30/Ciqc1F_Zs-yAEoFuAADD99-z4Ik735.png"}),a(),d,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/8A/30/Ciqc1F_Zs_iABcOrAALV9jkN3Zo313.png"}),a(),_,p(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3C/CgqCHl_ZtAWATELmAAGlhU6Ab50316.png"}),a(),u,B,p(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3C/CgqCHl_ZtA2AdSg9AAJyoGGL9kE009.png"}),a(),m,A,p(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0E/Cip5yF_ZtBWAJtG0AAIX71NtOjI255.png"}),a(),b,f,p(n,{alt:"Lark20201217-112837.png",src:"https://s0.lgstatic.com/i/image/M00/8A/D2/Ciqc1F_a0IGAHK2bAABkEd5bIdI794.png"}),a(),x,S,p(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0F/Cip5yF_ZtD-AKbNrAABBweJgAwg550.png"}),a(),D,p(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3C/CgqCHl_ZtE2AVvG5AACSsPCq2no845.png"}),a(),k,v,p(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/8A/31/Ciqc1F_ZtFeAAwudAAHLer0XgI8177.png"}),a(),T,p(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image2/M01/02/10/CgpVE1_ZtGKACONzAAJroYitakc640.png"}),a(),w,N,p(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0F/Cip5yF_ZtGmAb6vpAAEgG3hQbFE603.png"}),a(),P,p(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0F/Cip5yF_ZtHmASYfAAAEXnRS5ebY685.png"}),a(),I,p(n,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/8A/31/Ciqc1F_ZtI6AbSuGAAFRQ7AvPZU584.png"}),a(),q,W,p(n,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3C/CgqCHl_ZtJuAMTSAAGHC1Ng-II8825.png"}),a(),V,p(n,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image2/M01/02/10/CgpVE1_ZtKeAFVB3AADSDEvYq_I765.png"}),a(),G,O,M,p(n,{alt:"Lark20201216-171610.jpeg",src:"https://s0.lgstatic.com/i/image/M00/8A/4F/CgqCHl_Z0H6AWOTXAARSTE456x853.jpeg"})])}const $=o(c,[["render",j]]);export{J as __pageData,$ as default};

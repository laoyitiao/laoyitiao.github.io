import{_ as r,j as p,o as _,g as o,k as i,h as l,Q as t,s as e}from"./chunks/framework.4e7d56ce.js";const f=JSON.parse('{"title":"第02讲（上）：操作系统与计算机网络","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(3) 第02讲（上）：操作系统与计算机网络.md","filePath":"posts/backEnd/036_32个Java面试必考点/(3) 第02讲（上）：操作系统与计算机网络.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/036_32个Java面试必考点/(3) 第02讲（上）：操作系统与计算机网络.md"},C=t("",6),T=t("",11),s=t("",18),c=e("p",null,"首先建立链接前需要 Server 端先监听端口，因此 Server 端建立链接前的初始状态就是 LISTEN 状态，这时 Client 端准备建立链接，先发送一个 SYN 同步包，发送完同步包后，Client 端的链接状态变成了 SYN_SENT 状态。Server 端收到 SYN 后，同意建立链接，会向 Client 端回复一个 ACK。",-1),S=e("p",null,"由于 TCP 是双工传输，Server 端也会同时向 Client 端发送一个 SYN，申请 Server 向 Client 方向建立链接。发送完 ACK 和 SYN 后，Server 端的链接状态就变成了 SYN_RCVD。",-1),P=e("p",null,"Client 收到 Server 的 ACK 后，Client 端的链接状态就变成了 ESTABLISHED 状态，同时，Client 向 Server 端发送 ACK，回复 Server 端的 SYN 请求。",-1),h=e("p",null,"Server 端收到 Client 端的 ACK 后，Server 端的链接状态也就变成了的 ESTABLISHED 状态，此时建连完成，双方随时可以进行数据传输。",-1),d=e("p",null,"在面试时需要明白三次握手是为了建立双向的链接，需要记住 Client 端和 Server 端的链接状态变化。另外回答建连的问题时，可以提到 SYN 洪水攻击发生的原因，就是 Server 端收到 Client 端的 SYN 请求后，发送了 ACK 和 SYN，但是 Client 端不进行回复，导致 Server 端大量的链接处在 SYN_RCVD 状态，进而影响其他正常请求的建连。可以设置 tcp_synack_retries = 0 加快半链接的回收速度，或者调大 tcp_max_syn_backlog 来应对少量的 SYN 洪水攻击",-1),A=e("h6",{id:"详解四次挥手断连",tabindex:"-1"},[l("详解四次挥手断连 "),e("a",{class:"header-anchor",href:"#详解四次挥手断连","aria-label":'Permalink to "详解四次挥手断连"'},"​")],-1),v=e("p",null,"再来看看 TCP 的断连，如下图所示。",-1),u=e("br",null,null,-1),I=t("",8);function m(N,E,b,g,k,x){const a=p("Image");return _(),o("div",null,[C,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/6E/CgotOV13hveADW6kAAHI_mwTaq0672.png"}),l(),T,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/4E/CgoB5l13hviANIAQAAJGI9kixgc615.png"}),l(),s,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/6E/CgotOV13hviAU5H3AAAyMppFmf8039.png"}),l(),c,S,P,h,d,A,v,u,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/4E/CgoB5l13hviAZRJ1AABEfmQ55Jw991.png"}),l(),I])}const H=r(n,[["render",m]]);export{f as __pageData,H as default};

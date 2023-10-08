import{_ as t,j as _,o as i,g as r,k as c,h as e,Q as o,s as n}from"./chunks/framework.a0d18f64.js";const S=JSON.parse('{"title":"第09讲：MC是如何使用多线程和状态机来处理请求命令的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(168) 第09讲：MC是如何使用多线程和状态机来处理请求命令的？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(168) 第09讲：MC是如何使用多线程和状态机来处理请求命令的？.md","lastUpdated":1696682708000}'),s={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(168) 第09讲：MC是如何使用多线程和状态机来处理请求命令的？.md"},l=o("",9),d=n("h6",{id:"工作线程",tabindex:"-1"},[e("工作线程 "),n("a",{class:"header-anchor",href:"#工作线程","aria-label":'Permalink to "工作线程"'},"​")],-1),p=n("p",null,"工作线程监听到主线程的管道通知后，会从连接队列弹出一个新连接，然后就会创建一个 conn 结构体，注册该 conn 读事件，然后继续监听该连接上的 IO 事件。后续这个连接有命令进来时，工作线程会读取 client 发来的命令，进行解析并处理，最后返回响应。工作线程的主要处理逻辑也是在状态机中，一个名叫 drive_machine 的函数。",-1),m=n("h6",{id:"状态机",tabindex:"-1"},[e("状态机 "),n("a",{class:"header-anchor",href:"#状态机","aria-label":'Permalink to "状态机"'},"​")],-1),h=n("p",null,"这个状态机由主线程和工作线程共享，实际是采用 switch-case 来实现的。状态机函数如下图所示，switch 连接的 state，然后根据连接的不同状态，执行不同的逻辑操作，并进行状态转换。接下来我们开始分析 Mc 的状态机。",-1),u=n("h6",{id:"主线程状态机",tabindex:"-1"},[e("主线程状态机 "),n("a",{class:"header-anchor",href:"#主线程状态机","aria-label":'Permalink to "主线程状态机"'},"​")],-1),g=n("p",null,"如下图所示，主线程在状态机中只处理 conn_listening 状态，负责 accept 新连接和调度新连接给工作线程。状态机中其他状态处理基本都在工作线程中进行。由于 Mc 同时支持 TCP、UDP 协议，而互联网企业大多使用 TCP 协议，并且通过文本协议，来访问 Mc，所以后面状态机的介绍，将主要结合 TCP 文本协议来进行重点分析。",-1),b=n("h6",{id:"工作线程状态机",tabindex:"-1"},[e("工作线程状态机 "),n("a",{class:"header-anchor",href:"#工作线程状态机","aria-label":'Permalink to "工作线程状态机"'},"​")],-1),w=n("p",null,"工作线程的状态机处理逻辑，如下图所示，包括刚建立 conn 连接结构体时进行的一些重置操作，然后注册读事件，在有数据进来时，读取网络数据，并进行解析并处理。如果是读取指令或统计指令，至此就基本处理完毕，接下来将响应写入连接缓冲。如果是更新指令，在进行初步处理后，还会继续读取 value 部分，再进行存储或变更，待变更完毕后将响应写入连接缓冲。最后再将响应写给 client。响应 client 后，连接会再次重置连接状态，等待进入下一次的命令处理循环中。这个过程主要包含了 conn_new_cmd、conn_waiting、conn_read、conn_parse_cmd、conn_nread、conn_write、conn_mwrite、conn_closing 这 8 个状态事件。",-1),M=o("",14),k=o("",12),A=o("",6),f=n("p",null,'OK，这节课就讲到这里，下一课时我会分享"Memcached 哈希表"，记得按时来听课哈。好，下节课见，拜拜！',-1),q=n("br",null,null,-1);function P(T,C,x,V,v,I){const a=_("Image");return i(),r("div",null,[l,c(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/99/CgotOV2kVk2AMRZMAADqfhcmoSg472.png"}),e(),d,p,m,h,c(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/7A/CgoB5l2kVk6AdzanAAIOzo8tKWs049.png"}),e(),u,g,c(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/99/CgotOV2kVk6AXIB1AAFDHXaxLqE384.png"}),e(),b,w,c(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/7A/CgoB5l2kVk6AWUKfAALnpKe8zig379.png"}),e(),M,c(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/99/CgotOV2kVk-AZQTMAAHUDRrjRxI205.png"}),e(),k,c(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/7A/CgoB5l2kVk-AQuaUAAITowFQ3VM623.png"}),e(),A,c(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/99/CgotOV2kVk-AJLjpAAFvwWrEphw784.png"}),e(),f,q])}const E=t(s,[["render",P]]);export{S as __pageData,E as default};

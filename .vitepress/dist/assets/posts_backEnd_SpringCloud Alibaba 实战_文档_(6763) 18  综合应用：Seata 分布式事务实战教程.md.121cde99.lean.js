import{_ as o,j as e,o as t,g as c,k as a,h as n,Q as p,s as l}from"./chunks/framework.b3d8e22e.js";const x=JSON.parse('{"title":"部署 Nacos 注册中心与配置中心 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6763) 18  综合应用：Seata 分布式事务实战教程.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6763) 18  综合应用：Seata 分布式事务实战教程.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6763) 18  综合应用：Seata 分布式事务实战教程.md"},E=p("",6),y=l("p",null,"案例示意图",-1),i=l("p",null,"首先咱们来看整体架构图：",-1),d=p("",14),F=p("",12),g=p("",8),u=l("p",null,"Seata-Server 配置项",-1),A=l("p",null,"将 GitHub 页面中 80 行文本内容复制后，在 /usr/local/seata-server-1.4.0 目录下创建 config.txt 文件，将 80 行文本粘贴其中。",-1),D=p("",5),C=l("p",null,"nacos-config.sh",-1),B=l("p",null,"这个脚本用来读取前面的 config.txt 并将配置项载入 Nacos 配置中心。将页面中 101 行文本复制，然后在 /usr/local/seata-server-1.4.0 目录下创建 script 子目录，在 scirpt 子目录下创建 nacos-config.sh 文件，并将 101 行文本保存其中。",-1),m=p("",7),b=l("p",null,"Seata-Server 配置信息",-1),I=l("p",null,"第四步，创建并初始化 Seata-Server 全局事务数据库。",-1),v=l("p",null,"访问下面网址",-1),h=l("p",null,[l("a",{href:"https://github.com/seata/seata/blob/1.4.0/script/server/db/mysql.sql?fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"https://github.com/seata/seata/blob/1.4.0/script/server/db/mysql.sql"),n("，下载 SQL 脚本。在 3309 端口 MySQL 创建新的数据库 seata，执行 SQL 脚本创建全局事务表。")],-1),f=p("",9),T=p("",12),S=p("",21),_=p("",40),q=p("",42);function R(N,L,O,k,M,P){const s=e("Image");return t(),c("div",null,[E,a(s,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/33/EB/Cgp9HWBv-3GAAY44AAHu9ANH08o023.png"}),n(),y,i,a(s,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/33/F3/CioPOWBv-3qATUoAAAJXS6y4ARs672.png"}),n(),d,a(s,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/33/F3/CioPOWBv-4iACM5yAAO-OgqZ5NQ521.png"}),F,a(s,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/33/F4/CioPOWBv-62AHsMsAAR8RnG5fyE967.png"}),n(),g,a(s,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/33/F4/CioPOWBv-7qAMcbTAAN4E_fcfyU478.png"}),n(),u,A,a(s,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M01/33/EC/Cgp9HWBv-8WAVQwnAANkGgNTOcI875.png"}),n(),D,a(s,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M01/33/EC/Cgp9HWBv-8-ARX9YAAJ51tN27rM642.png"}),n(),C,B,a(s,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M01/33/F4/CioPOWBv-9qAc-K_AAJZVzfUp9M951.png"}),n(),m,a(s,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M00/33/EC/Cgp9HWBv--mALGJOAAIa4ZNZYfs549.png"}),n(),b,I,v,h,a(s,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M00/33/EC/Cgp9HWBv-_SAUSwpAAIa4ZNZYfs943.png"}),n(),f,a(s,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M00/33/EC/Cgp9HWBv_AqALFtWAADg-gL1A9I839.png"}),n(),T,a(s,{alt:"图片12.png",src:"https://s0.lgstatic.com/i/image6/M00/33/EC/Cgp9HWBv_BeAFpx9AADgV8h647Q951.png"}),n(),S,a(s,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image6/M00/33/F5/CioPOWBv_CyADGkZAAER3-wwnUs907.png"}),n(),_,a(s,{alt:"图片14.png",src:"https://s0.lgstatic.com/i/image6/M00/33/F5/CioPOWBv_D-AJflgAADOA3XRA34740.png"}),n(),q])}const j=o(r,[["render",R]]);export{x as __pageData,j as default};

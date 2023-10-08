import{_ as o,j as e,o as t,g as r,k as l,h as s,Q as n,s as p}from"./chunks/framework.a0d18f64.js";const S=JSON.parse('{"title":"第26讲：HDFS存储权限ACL控制策略以及与系统权限整合应用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3097) 第26讲：HDFS 存储权限 ACL 控制策略以及与系统权限整合应用.md","filePath":"posts/devops/042_大数据运维实战/(3097) 第26讲：HDFS 存储权限 ACL 控制策略以及与系统权限整合应用.md","lastUpdated":1696682708000}'),c={name:"posts/devops/042_大数据运维实战/(3097) 第26讲：HDFS 存储权限 ACL 控制策略以及与系统权限整合应用.md"},E=n("",7),y=n("",29),d=p("p",null,"拥有超过 3 个规则的 ACL 称为扩展 ACL（Extended ACL），扩展 ACL 会包含一个 Mask 规则以及给 Owner、Group 和 Others 授权的规则，如下图所示：",-1),i=n("",17),h=n("",16),g=p("p",null,"从上图中可以看出，若直接通过 userb 去追加内容到 mvcount 表中的 2020-07-15 文件时，提示没有写权限，这是正常的。因为 userb 对此表本来就没有写权限，接着进行 acl 授权，执行如下图操作：",-1),u=p("p",null,"在上图操作中，对 mvcount 目录下的文件和子目录递归的授权给 userb 用户有读、写操作权限，接着再通过 userb 去追加内容到 mvcount 表，操作过程如下图所示：",-1),A=p("p",null,"从上图可知，这次操作还是未成功，但提示错误有了变化，这次提示 userb 用户对 mvcount 目录没有执行权限。很显然，要在 mvcount 目录下写文件，必须对 mvcount 目录要有可执行权限，再次修改 mvcount 目录的权限，其操作如下图所示：",-1),m=p("p",null,"在此操作中，主要是对 mvcount 目录添加了可执行权限，最后查看 ACL 规则，发现 mvcount 目录对 userb 用户有读、写、执行权限；而 mvcount 目录下面的文件对 userb 用户有读、写权限，这样就满足了权限需求，再通过 userb 用户来读、写 mvcount 这张表，发现已经可以对此表进行读、写操作了。",-1),C=p("h3",{id:"小结",tabindex:"-1"},[s("小结 "),p("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),_=p("p",null,"本课时主要介绍了在 HDFS 中 POSIX 权限以及 POSIX ACL 的使用。在多用户使用场景中，权限控制至关重要，而通过 ACL 规则控制 HDFS 文件的读、写、执行权限，可以做到更加精细化的权限控制，并且简单、高效。",-1);function v(D,F,f,b,k,L){const a=e("Image");return t(),r("div",null,[E,l(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/37/C1/Ciqc1F8alp6AaL2_AACr36-IPwE693.png"}),s(),y,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/37/B8/Ciqc1F8aimWAdwAqAAAla7uwNlY190.png"}),s(),d,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/37/B8/Ciqc1F8aimyAWM4iAAAlSdeJdrk817.png"}),s(),i,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/37/C5/CgqCHl8ajJeAL7qXAABUONHs15s396.png"}),s(),h,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/37/BA/Ciqc1F8ajM2AMU3MAABKbQke-r0769.png"}),s(),g,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/37/C5/CgqCHl8ajNWARt8iAABTxrsGiqw705.png"}),s(),u,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/37/C5/CgqCHl8ajNyAeCBOAABKWYv410Y363.png"}),s(),A,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/37/BA/Ciqc1F8ajOOAZdQaAABiSES-rS0672.png"}),s(),m,C,_])}const H=o(c,[["render",v]]);export{S as __pageData,H as default};

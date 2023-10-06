import{_ as n,j as p,o as l,g as t,k as a,Q as c,s as e,h as s}from"./chunks/framework.b3d8e22e.js";const F=JSON.parse('{"title":"第一步：能不能这样做？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4617) 11  高级技巧之日志分析：利用 Linux 指令分析 Web 日志.md","filePath":"posts/backEnd/重学操作系统_文档/(4617) 11  高级技巧之日志分析：利用 Linux 指令分析 Web 日志.md","lastUpdated":1696417798000}'),d={name:"posts/backEnd/重学操作系统_文档/(4617) 11  高级技巧之日志分析：利用 Linux 指令分析 Web 日志.md"},i=c("",5),r=c("",3),_=c("",3),h=c("",4),g=c("",5),u=e("p",null,[s("我们想要按天统计，可以利用 "),e("code",null,"awk"),s("提供的字符串截取的能力。")],-1),E=e("p",null,[s("上图中，我们使用"),e("code",null,"awk"),s("的"),e("code",null,"substr"),s("函数，数字"),e("code",null,"2"),s("代表从第 2 个字符开始，数字"),e("code",null,"11"),s("代表截取 11 个字符。")],-1),C=e("p",null,"接下来我们就可以分组统计每天的日志条数了。",-1),A=e("p",null,[s("上图中，使用"),e("code",null,"sort"),s("进行排序，然后使用"),e("code",null,"uniq -c"),s("进行统计。你可以看到从 2015 年 5 月 17 号一直到 6 月 4 号的日志，还可以看到每天的 PV 量大概是在 2000~3000 之间。")],-1),m=e("h3",{id:"第五步-分析-uv",tabindex:"-1"},[s("第五步：分析 UV "),e("a",{class:"header-anchor",href:"#第五步-分析-uv","aria-label":'Permalink to "第五步：分析 UV"'},"​")],-1),y=e("p",null,"接下来我们分析 UV。UV（Uniq Visitor），也就是统计访问人数。通常确定用户的身份是一个复杂的事情，但是我们可以用 IP 访问来近似统计 UV。",-1),b=c("",9),k=c("",8);function P(T,V,q,w,v,S){const o=p("Image");return l(),t("div",null,[i,a(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkJ6AcP32AAduMy8fcSw412.png"}),r,a(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/5C/74/Ciqc1F-BkKeAQDs9AACqJbZ2jCM025.png"}),_,a(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkK6AcDGvAAjaPXe-Nbc605.png"}),h,a(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/5C/74/Ciqc1F-BkL6AGiY-AABQPMnGu40979.png"}),g,a(o,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkMaAb421AAGUr-N08hM187.png"}),u,a(o,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkMuAKo9UAAIcPR902XQ858.png"}),E,C,a(o,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkNGAB-VgAASNmct9nQA628.png"}),A,m,y,a(o,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/5C/74/Ciqc1F-BkNeAam2YAACxCjlKsvc488.png"}),b,a(o,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkOKAfpNwAAOFk0EhDjU183.png"}),k])}const x=n(d,[["render",P]]);export{F as __pageData,x as default};

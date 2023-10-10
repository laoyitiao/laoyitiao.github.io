import{_ as l,j as i,o as p,g as _,k as o,h as e,s as t,Q as s}from"./chunks/framework.cfb14fe0.js";const Q=JSON.parse('{"title":"14缓存策略：面试中如何回答缓存穿透、雪崩等问题？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构设计面试精讲_文档/(6064) 14  缓存策略：面试中如何回答缓存穿透、雪崩等问题？.md","filePath":"posts/backEnd/架构设计面试精讲_文档/(6064) 14  缓存策略：面试中如何回答缓存穿透、雪崩等问题？.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/架构设计面试精讲_文档/(6064) 14  缓存策略：面试中如何回答缓存穿透、雪崩等问题？.md"},r=t("h1",{id:"_14缓存策略-面试中如何回答缓存穿透、雪崩等问题",tabindex:"-1"},[e("14缓存策略：面试中如何回答缓存穿透、雪崩等问题？ "),t("a",{class:"header-anchor",href:"#_14缓存策略-面试中如何回答缓存穿透、雪崩等问题","aria-label":'Permalink to "14缓存策略：面试中如何回答缓存穿透、雪崩等问题？"'},"​")],-1),c=t("p",null,"上一讲，我带你学习了开源缓存数据库 Redis 的原理（比如线程模型、数据持久化，以及数据复制）。这一讲，我们从应用案例入手，来了解经常遇到的缓存设计问题，比如缓存雪崩、缓存并发，缓存穿透等。",-1),d=t("h3",{id:"案例背景",tabindex:"-1"},[e("案例背景 "),t("a",{class:"header-anchor",href:"#案例背景","aria-label":'Permalink to "案例背景"'},"​")],-1),h=t("p",null,"我们来模拟一个面试场景（如图所示） ：",-1),g=t("blockquote",null,[t("p",null,"系统收到用户的频繁查询请求时，会先从缓存中查找数据，如果缓存中有数据，直接从中读取数据，响应给请求方；如果缓存中没有数据，则从数据库中读取数据，然后再更新缓存，这样再获取这条数据时，可以直接从缓存中获取，不用再读取数据库。")],-1),u=s("",8),m=t("p",null,"缓存穿透",-1),A=t("p",null,'那么如果有人利用"查询缓存中不存在的数据时，每次都要查询数据库"恶意攻击的话，数据库会承担非常大的压力，甚至宕机。',-1),k=t("p",null,[t("strong",null,"解决缓存穿透的通用方案是："),e(' 给所有指定的 key 预先设定一个默认值，比如空字符串"Null"，当返回这个空字符串"Null"时，我们可以认为这是一个不存在的 key，在业务代码中，就可以判断是否取消查询数据库的操作，或者等待一段时间再请求这个 key。如果此时取到的值不再是"Null"，我们就可以认为缓存中对应的 key 有值了，这就避免出现请求访问到数据库的情况，从而把大量的类似请求挡在了缓存之中。')],-1),b=t("h4",{id:"缓存并发问题",tabindex:"-1"},[e("缓存并发问题 "),t("a",{class:"header-anchor",href:"#缓存并发问题","aria-label":'Permalink to "缓存并发问题"'},"​")],-1),P=t("p",null,"假设在缓存失效的同时，出现多个客户端并发请求获取同一个 key 的情况，此时因为 key 已经过期了，所有请求在缓存数据库中查询 key 不命中，那么所有请求就会到数据库中去查询，然后当查询到数据之后，所有请求再重复将查询到的数据更新到缓存中。",-1),T=t("p",null,[e("这里就会引发一个问题，所有请求更新的是同一条数据，这不仅会增加数据库的压力，还会因为反复更新缓存而占用缓存资源，这就叫缓存并发。"),t("strong",null,"那你怎么解决缓存并发呢？")],-1),q=s("",12),f=s("",6),y=t("p",null,"解决缓存操作与业务系统分离",-1),C=t("h3",{id:"总结",tabindex:"-1"},[e("总结 "),t("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),M=t("p",null,"为了方便你记忆，我总结一下今天的内容：",-1),x=t("p",null,"今天这一讲，我推荐采用预设值方案解决缓存穿透（当然还有基于布隆过滤器的实现方式，但它本身存在误判的情况，实现起来也较复杂，所以我不推荐使用，不过你可以了解一下）。另外，你可以利用 Redis 的 setNX 方法来配合解决缓存并发。除此之外，你可以通过将缓存失效时间随机打散，或者设置缓存不过期，解决缓存雪崩的问题。",-1),N=t("p",null,"最后，要强调一下，缓存的使用虽然给我们带来非常多的好处，但你也要充分考虑缓存使用上的一些坑。比如缓存和数据库的一致性、缓存容量限制，以及每次存放到缓存的数据大小等。今天的作业是：如何用 Redis 实现一个计数器？我们下一讲见。",-1);function S(V,B,I,R,D,W){const a=i("Image");return p(),_("div",null,[r,c,d,h,g,o(a,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image6/M01/04/57/Cgp9HWAprwaAXbnwAAA7DBL3j3M776.png"}),e(),u,o(a,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image6/M01/04/57/Cgp9HWAprx-AL9UOAABLG_KoMvg986.png"}),e(),m,A,k,b,P,T,o(a,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image6/M01/04/53/CioPOWAprzCAHp6VAABhPy4VZWw709.png"}),e(),q,o(a,{alt:"image (11).png",src:"https://s0.lgstatic.com/i/image6/M01/04/53/CioPOWApr0GAUGfQAAA8YUKRnLM745.png"}),e(),f,o(a,{alt:"image (12).png",src:"https://s0.lgstatic.com/i/image6/M01/04/57/Cgp9HWApr1yAWMBPAABJhWDrIo4658.png"}),e(),y,C,M,o(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/04/50/Cgp9HWAosmeAHfikAAE7sA43-Kk951.png"}),e(),x,N])}const H=l(n,[["render",S]]);export{Q as __pageData,H as default};

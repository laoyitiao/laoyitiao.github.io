import{_ as s,j as i,o as l,g as p,k as n,h as o,s as e,Q as t}from"./chunks/framework.cfb14fe0.js";const x=JSON.parse('{"title":"第09讲：微服务安全认证","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(97) 第09讲：微服务安全认证.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(97) 第09讲：微服务安全认证.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(97) 第09讲：微服务安全认证.md"},d=e("h1",{id:"第09讲-微服务安全认证",tabindex:"-1"},[o("第09讲：微服务安全认证 "),e("a",{class:"header-anchor",href:"#第09讲-微服务安全认证","aria-label":'Permalink to "第09讲：微服务安全认证"'},"​")],-1),r=e("br",null,null,-1),T=e("p",null,"本课时我们主要讲解服务器架构安全认证及常见的认证方式、JWT 认证、Token 的使用注意事项，以及内部服务之间的认证等内容。",-1),h=e("h1",{id:"微服务架构安全认证",tabindex:"-1"},[o("微服务架构安全认证 "),e("a",{class:"header-anchor",href:"#微服务架构安全认证","aria-label":'Permalink to "微服务架构安全认证"'},"​")],-1),k=e("p",null,"随着单体应用架构到微服务架构的演进，应用的访问安全问题难度也在上升。为了适应微服务架构，安全认证的手段也在逐步提高。",-1),u=t("",30),_=t("",19),q=t("",21),g=e("p",null,"如果非要做验证，我们可以基于 IP 白名单来实现，比如用户服务只能某些 IP 或者 IP 段访问，IP 白名单可以采用配置中心来存储，具备实时刷新的能力。",-1),b=e("p",null,"采用 IP 白名单的方式也比较简单，工作量不大，不好的点在于 IP 不能随便变动。当一个服务新加了节点后，需要手动配置白名单，当然也可以集成在发布工具中，发布的时候会自动刷新涉及的白名单。",-1),A=e("p",null,"既然外部能用 Token 来验证，那么内部同样也可以使用 Token 来进行验证，服务在启动时就可以在统一的认证服务中申请 Token, 申请需要的认证信息可以放在配置中心。这样服务在启动后就有了能够访问其他服务的 Token，在调用的时带上 Token，被调用的服务中进行 Token 的校验即可。",-1),P=e("p",null,"对于 Token 的失效更新，可以采取两种方式，一种是在请求时如果返回的 Token 已失效，那么可以重新获取 Token 后再发起调用，这种在并发量大时需要加锁处理，不然会发生同时申请多个 Token 的情况。",-1),m=e("p",null,"另外一种就是采用定时更新的方式，比如 Token 是 1 个小时的有效期，那么定时任务就 可以 50 分钟更新一次，这样在请求时就不用考虑过期问题。",-1),I=e("br",null,null,-1);function E(J,S,v,C,y,W){const a=i("Image");return l(),p("div",null,[d,r,T,h,k,n(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AB/87/CgotOV3WUEqAPfidAAFx91F-798094.png"}),o(),u,n(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AB/87/CgotOV3WUG2ARl98AAD_xcd-ElM857.png"}),o(),_,n(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AB/68/CgoB5l3WUIGADfX2AAEhrMGcQDk308.png"}),o(),q,n(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AB/88/CgotOV3WUJuAU4JXAAEXJfEgv9o814.png"}),o(),g,b,A,P,m,I])}const B=s(c,[["render",E]]);export{x as __pageData,B as default};

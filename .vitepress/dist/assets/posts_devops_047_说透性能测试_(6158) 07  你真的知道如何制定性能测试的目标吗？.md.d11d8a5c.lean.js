import{_ as r,j as a,o as l,g as e,k as n,h as s,s as t,Q as p}from"./chunks/framework.cfb14fe0.js";const M=JSON.parse('{"title":"07你真的知道如何制定性能测试的目标吗？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6158) 07  你真的知道如何制定性能测试的目标吗？.md","filePath":"posts/devops/047_说透性能测试/(6158) 07  你真的知道如何制定性能测试的目标吗？.md","lastUpdated":1696682708000}'),g={name:"posts/devops/047_说透性能测试/(6158) 07  你真的知道如何制定性能测试的目标吗？.md"},_=t("h1",{id:"_07你真的知道如何制定性能测试的目标吗",tabindex:"-1"},[s("07你真的知道如何制定性能测试的目标吗？ "),t("a",{class:"header-anchor",href:"#_07你真的知道如何制定性能测试的目标吗","aria-label":'Permalink to "07你真的知道如何制定性能测试的目标吗？"'},"​")],-1),i=t("p",null,"在上一讲中，我介绍了高性能中间件 Nginx，相信你已经有了一定层次的了解，这一讲我将带你学习如何制定性能测试的目标。",-1),c=t("p",null,[s("之前有同学咨询过我，在测试执行过程中他并不清楚测试得到的结果到底能不能满足这次活动的需求。经过我的追问，发现他连本次活动规则涉及的模块和接口都不是十分清楚，像这样的测试就是没有做性能测试目标的分析。虽然说做了性能测试，但几乎可以说是无效测试，因为"),t("strong",null,"没有做目标分析的性能测试会与真实的活动场景相差甚远"),s("。")],-1),h=t("p",null,"举一个我遇到的典型案例，一次大促前，在性能测试过程中测出来的数据指标都还不错，然而大促时并没有达到测出来的指标，服务就宕机了。在分析原因后，我们发现有一个接口平时访问量很低，所以并没有纳入性能测试的范围。但这个接口存在大 Key，在大促中达到中间件流量阈值，导致了网站的不可用。",-1),d=t("p",null,[s("所以说，"),t("strong",null,"测试目标极其重要，是性能测试执行的先决条件"),s("。")],-1),u=p("",8),A=p("",20),m=t("p",null,"图 2：大促前后访问量",-1),T=t("p",null,[s('想想一些电商大促的具体活动场景就不会感到奇怪了。现在很多电商，如京东的"双十一"活动可能从 11 月 1 日就开始了，其中穿插了一些品类活动和推送，所以有流量冲高的情况也是比较正常的。因此，我一般会对'),t("strong",null,"最高峰"),s(" 和"),t("strong",null,"次高峰"),s("都进行分析。")],-1),P=t("p",null,"当我们选取了天数之后，再以小时为维度，确定哪些时间节点的访问量是比较高的。图 3 中，我选取了其中一天，按照小时分布再统计。这样一来，我们就得到了时间维度上需要的数据。",-1),S=t("p",null,"图 3：各小时访问量",-1),C=t("ul",null,[t("li",null,[t("strong",null,"服务维度")])],-1),b=t("p",null,"那什么是服务维度呢？以目前比较流行的电商微服务架构为例，我一般会做服务级别的拆分。先画一个示意图，方便你对微服务有个简单了解。",-1),f=t("p",null,"图 4：微服务架构图",-1),x=t("p",null,"网关一般是请求进入应用层的第一个入口，也是统计网站入口访问量的方式之一。当我们的请求通过网关之后会下发到各个业务应用服务，如图 4 中所示的服务 A、B、C，我会按照确定的时间节点去统计各个服务的访问量数据。完成服务级的访问数据统计之后，我会继续按照时间维度统计服务下的接口访问数据。你可以看到，每个服务和每个接口的调用比例都不一样，如图 5 所示。",-1),q=p("",22);function V(k,E,N,G,I,R){const o=a("Image");return l(),e("div",null,[_,i,c,h,d,n(o,{alt:"金句.png",src:"https://s0.lgstatic.com/i/image/M00/92/8D/CgqCHmAR9imAP7bQAAEJWgnkmxw718.png"}),s(),u,n(o,{alt:"shangchuan1.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/75/Cip5yGAR876AGx1TAAEaBWbe1-Q706.png"}),s(),A,n(o,{alt:"截图 (1).png",src:"https://s0.lgstatic.com/i/image2/M01/0A/78/CgpVE2AR892AEVZGAACqOtG6T2Q284.png"}),s(),m,T,P,n(o,{alt:"截图 (2).png",src:"https://s0.lgstatic.com/i/image2/M01/0A/75/Cip5yGAR8_mAAtdTAACfOTuxmPM599.png"}),s(),S,C,b,n(o,{alt:"shangchuan2.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/78/CgpVE2AR9CGAI6D6AAEZb8DFzE8175.png"}),s(),f,x,n(o,{alt:"Gateway网关.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/75/Cip5yGAR9DOAGoHqAAKy0PYCcno557.png"}),s(),q])}const v=r(g,[["render",V]]);export{M as __pageData,v as default};

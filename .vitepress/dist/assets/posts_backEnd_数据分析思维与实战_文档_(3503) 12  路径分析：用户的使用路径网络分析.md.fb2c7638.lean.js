import{_ as l,j as i,o as p,g as e,k as n,h as o,Q as a,s as t}from"./chunks/framework.a0d18f64.js";const X=JSON.parse('{"title":"12路径分析：用户的使用路径网络分析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/数据分析思维与实战_文档/(3503) 12  路径分析：用户的使用路径网络分析.md","filePath":"posts/backEnd/数据分析思维与实战_文档/(3503) 12  路径分析：用户的使用路径网络分析.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/数据分析思维与实战_文档/(3503) 12  路径分析：用户的使用路径网络分析.md"},r=a("",9),c=t("p",null,'比如对于美团 APP 来说，我们发现它有很多功能，比如"搜索""美食""电影演出""酒店住宿""休闲娱乐""外卖"这 5 个 tab，下面还有"家居"等。然后下面有 4 个小模块："很优惠""有格调""秒杀""周末去哪儿"，再往下翻是"猜你喜欢"，也就是个人推荐，而在底部 button 有"附近""发现""订单""我的"，各个 button 里面又有很多子模块。',-1),u=t("p",null,"基本上目前市面上大多数 APP 都是这种多坑位，把能做的都做了。在这种情况下，漏斗分析确实完全满足不了日常分析需求，因为漏斗分析相对来说都是人为事先假定的，而且内容比较符合大众认知的习惯，这个时候就要路径分析派上用场了。",-1),g=t("p",null,"这就是路径分析的背景。",-1),h=t("h3",{id:"路径分析过程",tabindex:"-1"},[o("路径分析过程 "),t("a",{class:"header-anchor",href:"#路径分析过程","aria-label":'Permalink to "路径分析过程"'},"​")],-1),q=t("p",null,"那么我们对路径分析的过程进行一个详细的说明。大家在听第二小模块的时候，一定要把美团 APP 多体验几次，后面会涉及大量的界面交互和路径使用，所以各个模块都要认真看几遍。",-1),A=t("h4",{id:"日志介绍",tabindex:"-1"},[o("日志介绍 "),t("a",{class:"header-anchor",href:"#日志介绍","aria-label":'Permalink to "日志介绍"'},"​")],-1),d=t("p",null,"我们先说一下日志，因为路径分析实际上都是基于底层日志来做，有些同学可能没有看过公司本身的日志，用户在端内（ APP 内），所有的行为都是以表或者文件存储的，其中记录了用户最详细的行为信息，这就是日志。比如，你打开 APP，实际上在日志里面是有一条记录的，一般都是一行，格式如下图所示：",-1),m=a("",8),P=a("",9),C=t("p",null,'这个表格怎么看？首先第一列就是"美食"功能每天的用户数，都是 100 万，"美食"界面如下：',-1),b=t("p",null,"它是一个很重要的功能，进来之后用户有各种各样的路径，然后我们按照时序来排列，这个 1,2,3,4,5,6 假设是按照先后顺序。",-1),E=t("p",null,'100 万人当中有 80 万去了"离我最近"。这个"离我最近"是在智能排序这里，进行手动切换之后就是"离我最近"，也就是说有 80 万用户进来之后直接点了"离我最近"。进去之后有 75 万用户进入详情页，比如点这个"百果园"，直接进去的有 75 万，然后 75 万里面有 40 万用户又返回到"离我最近"这个界面，也就是说用户逛了一会儿之后回退。然后 40 万里面又有 30 万用户再进入另外一个详情页，最终这 30 万里面有 20 万下单。这是第一个路径，就是 100 万的美食用户有 80 万用户是走这样一个路径。',-1),D=t("p",null,'同时第二个路径是 100 万里面有 30 万进入"优惠团购"这里，"优惠团购"里面又是一个界面，然后有 25 万人用了上面的搜索功能，实际上比较奇怪，因为"优惠团购"的界面已经有比较多的商品可以选购了，但是用户用了搜索，然后 25 万的搜索里面又有 20 万的用户进入详情页，然后 20 万里面有 18 万进行下单。这是第二个用户路径。',-1),I=t("p",null,'第三个用户路径就是 100 万用户里面有只有 5 万用户进入"外卖"，也就是说"外卖"放在美食里面这样一个位置，它的渗透率并不是很高。',-1),T=t("p",null,'第四个就是"限时秒杀"这一块，100 万用户有 30 万用户进入到这里面，而 30 万用户里面有 28 万点击详情页，跟第一个路径比较像，又进行了回退，进入另外一个详情页再下单，也就是说用户有返回的操作。',-1),f=t("p",null,"这个就是原始数据，就是对底层日志进行时序排列，然后日志与日志之间相互匹配，之后就是这样一份数据，这样一份 excel 表格。",-1),k=t("p",null,"那么在这个关联数据的基础之上进行标准化以及画图：",-1),V=t("p",null,'真实的过程中，大家不一定要按照这样来画，我这里只是为了说明问题。比如"美食"，这里面 80% 是到"离我最近"，30% 到"优惠团购"，5% 到"外卖"，30% 到"秒杀"，就是上面的转化率，同样的后面每一步都有一个转化率，这个就是这 100 万的美食用户在端内的主要路径。',-1),F=t("p",null,'当然肯定还有其他路径，比如用户点"夜宵"，但是它的渗透率不是特别高，所以就不说了。这里就是发现一些比较有意思的路径，在这一步，它需要很多的耐心，因为你只能慢慢去看，这个在前期做的时候会非常耽误时间，但是就只能这样，因为所有的人做都是这样的过程，就是你要对业务非常了解。这个是"美食"用户进入"美食"之后的路径。',-1),w=t("p",null,[t("strong",null,"附近")],-1),M=t("p",null,'第二步一样，对于"附近"这个模块，用户进来之后，假设他的数据是这样一种形态：',-1),x=t("p",null,'我们发现，进入"附近"之后，大家看到最大的位置是"享美食"这一块，但是它的用户数只有 10 万，就是都是 50 万用户进来，只有 10 万用户到"享美食"，而"搜索"这一块儿竟然有 30 万，也就是说，更多的用户是通过"搜索"进入另外一个界面，也就是各种各样的店面，然后再进入详情页再下单，是通过这样一条路径来完成的。那么这个是不是就能说明我们当前界面做得并不是特别好？同时对于"享美食""会生活""爱玩乐"这三个 tab，理论上它们的点击率相对来说差异比较大，但是数据上面显示，一个 10 万、一个 9 万、一个 8 万，相差并不是很大。那么"享美食"作为最大的曝光界面可能就是出现了比较大的问题，从数据上来看就是这样的一个解释。',-1),S=t("p",null,[t("strong",null,"订单")],-1),B=t("p",null,'我们再看一下第三个，就是"订单"。对于"订单"这个功能，首先它的界面是这样：',-1),N=t("p",null,'用户进来之后，上面是"最近订单"的曝光，底部有一个"最近浏览"，就这两块，然后具体数据是：',-1),H=t("p",null,'有 50 万的用户进入"订单"这个界面，其中 45 万直接到具体订单详情页，比如 45 万的用户直接点百果园，点进去之后有 40 万直接就退出这个界面了，具体的转化数据就是这个图：',-1),v=t("p",null,'都是 90%，也就是说，对于"订单"这个界面，用户的目的非常明确，因为 50 万用户进来之后最主要的路径就是这样，其他的都很少。假设数据就是这样，那么我们就要进一步调研，用户进入订单页面目的是什么？如果只是查一查订单，那么我们是不是能在里面做一些相关推荐？"最近浏览"做得太单薄了，而且还是做在外面，实际上用户进入订单详情页之后就直接走了，在最里面就直接走了，而不会返回当前界面。',-1),O=t("h5",{id:"_3-基于前面数据-有哪些启发",tabindex:"-1"},[o("3. 基于前面数据，有哪些启发 "),t("a",{class:"header-anchor",href:"#_3-基于前面数据-有哪些启发","aria-label":'Permalink to "3. 基于前面数据，有哪些启发"'},"​")],-1),K=t("p",null,'数据上是这样一个结论，就是围绕一二三，一个是首页的"美食"，一个是"附近"，一个是"订单"，我们有哪些启发呢？因为到第二步实际上只是一个具体的标准化数据以及图，我们有哪些启发？',-1),R=t("p",null,'首先对于"美食"功能来说，默认的是智能排序，但是 80% 的用户会切换到"离我最近"，这里我的想法是，如果把智能改为综合字眼可能会更好，因为用户对智能可能理解得不是特别深刻，饿了么的精品就是综合排序。同时我们看到，用户第一次进入详情页之后，然后又有用户返回"离我最近"，也就是说用户有一个回退按钮，然后再进入详情页。这里建议在详情页内部增加相关推荐，让用户在里面逛，缩短用户的下单路径，而不要让他回退。',-1),Q=t("p",null,'第二个点就是在"美食"功能中，有 30% 的用户进入"优惠团购"，很明确，这部分用户喜欢占便宜，同时竟然有 83% 用了搜索，因为优惠团购点进去之后，它是一个最大的曝光位置，有很多的店家。但 80% 用户用了搜索，说明当前界面的主动推荐不太准确，需要优化，我们要更好地去揣摩用户的意图。',-1),j=t("p",null,'同时对于"外卖"这块也一样，外卖放在那个位置不是特别好，可以考虑把它替换掉，可能外卖本身在最外部就有 40% 的流量，而在这里面只有 5%。对于"秒杀"也一样，也有一个回退，那么也可以考虑在详情页里面增加相关推荐。这个就是"美食"功能。',-1),G=t("p",null,'对于"附近"功能，我们发现首先 40% 的用户会回到首页，就是用户进入"附近"这个 button，然后又有 40% 用户立马跳回首页；60% 的用户用搜索，而"享美食""会生活""爱玩乐"的渗透率差异不大，"享美食"作为最大曝光界面占比，"附近"整个模块当前问题较大，就是用户进去了，但是你没有很好地满足用户的需求，很多用户就跳出来了，同时你最大的曝光界面没有人点，而是用了搜索为主。',-1),J=a("",10);function U($,y,z,L,Y,Z){const s=i("Image");return p(),e("div",null,[r,n(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/2F/ED/CgqCHl8ID2-ACLGmAAQq7kaVfm4954.png"}),o(),c,u,g,h,q,A,d,n(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/2F/E2/Ciqc1F8ID3yAEM26AABOB3M97vg824.png"}),o(),m,n(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID52AEz8MAABcsO2BtOI457.png"}),o(),P,n(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID7aAdtBpAABoMS-6lmQ235.png"}),o(),C,n(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID72AGR97AAPfpbHNhGY756.png"}),o(),b,E,D,I,T,f,k,n(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID8uAI6eAAACcp_VJkwg406.png"}),o(),V,F,w,M,n(s,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID92AIqn8AABU26XAjqQ758.png"}),o(),n(s,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID-mAA_HgAAKqZ3SiYxg924.png"}),o(),x,S,B,n(s,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/2F/E3/Ciqc1F8ID_WAYCDNAAJweAjTbbI510.png"}),o(),N,n(s,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8ID_6AAiKpAAAk1vz0E80104.png"}),o(),H,n(s,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8IEAaAE_ZIAAAdzQcRK7I452.png"}),o(),v,O,K,n(s,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image/M00/2F/E3/Ciqc1F8IEBmAZ2VeAACcp_VJkwg984.png"}),o(),R,Q,j,n(s,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image/M00/2F/EE/CgqCHl8IECOASNVtAABOsbkmFa0413.png"}),o(),G,n(s,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image/M00/2F/E3/Ciqc1F8IEDGAW36uAAAbNVKLlUA608.png"}),o(),J])}const tt=l(_,[["render",U]]);export{X as __pageData,tt as default};

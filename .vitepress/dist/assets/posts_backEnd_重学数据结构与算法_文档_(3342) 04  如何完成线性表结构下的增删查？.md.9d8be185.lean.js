import{_ as p,j as e,o,g as c,k as a,s,h as t,Q as n}from"./chunks/framework.b3d8e22e.js";const ps=JSON.parse('{"title":"什么是数据结构？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学数据结构与算法_文档/(3342) 04  如何完成线性表结构下的增删查？.md","filePath":"posts/backEnd/重学数据结构与算法_文档/(3342) 04  如何完成线性表结构下的增删查？.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/重学数据结构与算法_文档/(3342) 04  如何完成线性表结构下的增删查？.md"},r=s("p",null,'通过前面课时的学习，我们了解到数据在代码中被处理和加工的最小单位动作是增、删、查。它们是深入学习数据结构的根基，通过"增删查"的操作，我们可以选择更合适的数据结构来解决实际工作中遇到的问题。例如，几个客户端分别向服务端发送请求，服务端要采用先到先得的处理方式，应该如何设计数据结构呢？接下来，从本课时开始，我们将正式开始系统性的学习数据结构的内容。',-1),_=s("h3",{id:"什么是数据结构",tabindex:"-1"},[t("什么是数据结构？ "),s("a",{class:"header-anchor",href:"#什么是数据结构","aria-label":'Permalink to "什么是数据结构？"'},"​")],-1),d=s("p",null,"首先，我们简单探讨一下什么是数据结构。数据结构，从名字上来看是数据的结构，也就是数据的组织方式。在数据结构适用的场合中，需要有一定量的数据。如果数据都没有，也就不用讨论数据如何组织了。当我们有了一定数量的数据时，就需要考虑以什么样的方式去对这些数据进行组织了。",-1),g=s("p",null,"接下来，我将通过一个实际案例来帮助你更好地理解数据结构。假设你是一所幼儿园的园长，现在你们正在组织一场运动会，所有的小朋友需要在操场上接受检阅。那么，如何组织小朋友有序站队并完成检阅呢？",-1),h=s("p",null,"几个可能的方式是，让所有的小朋友站成一横排，或者让小朋友站成方阵，又或者让所有的小朋友手拉手，围成一个大圆圈等等。很显然，这里有无数种可行的组织方式。具体选择哪个组织方式，取决于哪一种能更好地展示出小朋友们的风采。",-1),u=s("p",null,"试想一下，当计算机要处理大量数据时，同样需要考虑如何去组织这些数据，这就是数据结构。类似于小朋友的站队方式有无数种情况，数据组织的方式也是有无数种可能性。",-1),E=s("p",null,"然而，在实际开发中，经过工程师验证\uFEFF并且能有效解决问题的高效率数据结构就比较有限了。事实上，只要我们把这些能真正解决问题的数据结构学会，就足以成为一名合格的软件工程师了。",-1),y=s("h3",{id:"什么是线性表",tabindex:"-1"},[t("什么是线性表 "),s("a",{class:"header-anchor",href:"#什么是线性表","aria-label":'Permalink to "什么是线性表"'},"​")],-1),A=s("p",null,"好了，铺垫完数据结构的基本概念后，我们就正式进入到这个课程中的第一个数据结构的学习，线性表。",-1),m=s("p",null,"线性表是 n 个数据元素的有限序列，最常用的是链式表达，通常也叫作线性链表或者链表。在链表中存储的数据元素也叫作结点，一个结点存储的就是一条数据记录。每个结点的结构包括两个部分：",-1),x=s("ul",null,[s("li",null,[s("p",null,"第一是具体的数据值；")]),s("li",null,[s("p",null,"第二是指向下一个结点的指针。")])],-1),C=s("p",null,"在链表的最前面，通常会有个头指针用来指向第一个结点。对于链表的最后一个结点，由于在它之后没有下一个结点，因此它的指针是个空指针。链表结构，和小朋友手拉手站成一排的场景是非常相似的。",-1),f=s("p",null,"例如，你需要处理的数据集是 10 个同学考试的得分。如果用链表进行存储，就会得到如下的数据：",-1),v=s("p",null,"仔细观察上图，你会发现这个链表只能通过上一个结点的指针找到下一个结点，反过来则是行不通的。因此，这样的链表也被称作单向链表。",-1),b=s("p",null,"有时候为了弥补单向链表的不足，我们可以对结点的结构进行改造：",-1),k=s("ul",null,[s("li",null,[s("p",null,"对于一个单向链表，让最后一个元素的指针指向第一个元素，就得到了循环链表；")]),s("li",null,[s("p",null,"或者把结点的结构进行改造，除了有指向下一个结点的指针以外，再增加一个指向上一个结点的指针。这样就得到了双向链表。")])],-1),T=s("p",null,"同样的，还可以对双向链表和循环链表进行融合，就得到了双向循环链表，如下图所示：",-1),q=s("p",null,"这些种类的链表，都是以单向链表为基础进行的变种。在某些场景下能提高线性表的效率。",-1),D=s("h3",{id:"线性表对于数据的增删查处理",tabindex:"-1"},[t("线性表对于数据的增删查处理 "),s("a",{class:"header-anchor",href:"#线性表对于数据的增删查处理","aria-label":'Permalink to "线性表对于数据的增删查处理"'},"​")],-1),F=s("p",null,"学会了线性表原理之后，我们就来围绕数据的增删查操作，来看看线性表的表现。在这里我们主要介绍单向链表的增删查操作，其他类型的链表与此雷同，我们就不再重复介绍了。",-1),M=s("p",null,"首先看一下增加操作。如下有一个链表，它存储了 10 个同学的考试成绩。现在发现这样的问题，在这个链表中，有一个同学的成绩忘了被存储进去。假设我们要把这个成绩在红色的结点之后插入，那么该如何进行呢？",-1),O=s("p",null,"其实，链表在执行数据新增的时候非常容易，只需要把待插入结点的指针指向原指针的目标，把原来的指针指向待插入的结点，就可以了。如下图所示：",-1),V=n("",3),P=n("",6),S=s("ul",null,[s("li",null,"第二种情况是按照具体的成绩来查找。")],-1),I=s("p",null,"同样，假设在一个链表中，存储了 10 个同学的考试成绩。现在要查找出是否有人得分为 95 分。链表的价值在于用指针按照顺序连接了数据结点，但对于每个结点的数值则没有任何整合。当需要按照数值的条件进行查找时，除了按照先后顺序进行遍历，别无他法。",-1),j=s("p",null,"因此，解决方案是，判断第一个结点的值是否等于 95：",-1),w=s("ul",null,[s("li",null,[s("p",null,"如果是，则返回有人得分为 95 分；")]),s("li",null,[s("p",null,"如果不是，则需要通过指针去判断下一个结点的值是否等于 95。以此类推，直到把所有结点都访问完。")])],-1),H=s("p",null,"根据这里的分析不难发现，链表在新增、删除数据都比较容易，可以在 O(1) 的时间复杂度内完成。但对于查找，不管是按照位置的查找还是按照数值条件的查找，都需要对全部数据进行遍历。这显然就是 O(n) 的时间复杂度。",-1),N=s("p",null,"虽然链表在新增和删除数据上有优势，但仔细思考就会发现，这个优势并不实用。这主要是因为，在新增数据时，通常会伴随一个查找的动作。例如，在第五个结点后，新增一个新的数据结点，那么执行的操作就包含两个步骤：",-1),B=s("ul",null,[s("li",null,[s("p",null,"第一步，查找第五个结点；")]),s("li",null,[s("p",null,"第二步，再新增一个数据结点。整体的复杂度就是 O(n) + O(1)。")])],-1),U=n("",8),R=s("p",null,"例 2，给定一个奇数个元素的链表，查找出这个链表中间位置的结点的数值。",-1),Q=s("p",null,"这个问题也是利用了链表的长度无法直接获取的不足做文章，解决办法如下：",-1),J=s("ul",null,[s("li",null,[s("p",null,"一个暴力的办法是，先通过一次遍历去计算链表的长度，这样我们就知道了链表中间位置是第几个。接着再通过一次遍历去查找这个位置的数值。")]),s("li",null,[s("p",null,"除此之外，还有一个巧妙的办法，就是利用快慢指针进行处理。其中快指针每次循环向后跳转两次，而慢指针每次向后跳转一次。如下图所示。")])],-1),W=n("",2),G=s("p",null,"链表的快慢指针方法，在很多链表操作的场景下都非常适用，对于这个问题也是一样。",-1),K=s("p",null,"假设链表有环，这个环里面就像是一个跑步赛道的操场一样。经过多次循环之后，快指针和慢指针都会进入到这个赛道中，就好像两个跑步选手在比赛。快指针每次走两格，而慢指针每次走一格，相对而言，快指针每次循环会多走一步。这就意味着：",-1),X=s("ul",null,[s("li",null,[s("p",null,"如果链表存在环，快指针和慢指针一定会在环内相遇，即 fast == slow 的情况一定会发生。")]),s("li",null,[s("p",null,"反之，则最终会完成循环，二者从未相遇。")])],-1),Z=s("p",null,"根据这个性质我们就能对链表是否有环进行准确地判断了。如下图所示：",-1),$=n("",8);function L(Y,z,ss,ls,as,ns){const l=e("Image");return o(),c("div",null,[r,_,d,g,h,u,a(l,{alt:"xx.gif",src:"https://s0.lgstatic.com/i/image/M00/13/10/CgqCHl7OXiqAWO_nAKvmbV2Jtk4891.gif"}),E,y,A,m,x,a(l,{alt:"image002.png",src:"https://s0.lgstatic.com/i/image/M00/12/FD/Ciqc1F7OUvaADhsnAAAMCBqMAPw012.png"}),C,f,a(l,{alt:"image004.png",src:"https://s0.lgstatic.com/i/image/M00/13/08/CgqCHl7OUzqAAxTsAABByswXNGY123.png"}),v,b,k,a(l,{alt:"image006.png",src:"https://s0.lgstatic.com/i/image/M00/13/09/CgqCHl7OU1uAEuxjAABPx98ZMKs566.png"}),a(l,{alt:"image008.png",src:"https://s0.lgstatic.com/i/image/M00/12/FD/Ciqc1F7OU2qAaiymAAA-hJj3ddw282.png"}),T,a(l,{alt:"image010.png",src:"https://s0.lgstatic.com/i/image/M00/13/09/CgqCHl7OU3WAV7lDAAAsQ8fj2Gw000.png"}),q,D,F,M,O,a(l,{alt:"01.png",src:"https://s0.lgstatic.com/i/image/M00/2E/16/CgqCHl8ESZuADqT5AABRo8Zc6TI733.png"}),V,a(l,{alt:"02.png",src:"https://s0.lgstatic.com/i/image/M00/2E/16/CgqCHl8ESbaAJi2xAAA-XJSjXw4037.png"}),P,a(l,{alt:"image016.gif",src:"https://s0.lgstatic.com/i/image/M00/12/FD/Ciqc1F7OU6eABdMqACANMndwJA8082.gif"}),S,I,j,w,a(l,{alt:"image017.gif",src:"https://s0.lgstatic.com/i/image/M00/13/09/CgqCHl7OU8KAME-KABD6y8ZPI78129.gif"}),a(l,{alt:"image018.gif",src:"https://s0.lgstatic.com/i/image/M00/12/FD/Ciqc1F7OU-KAAnFoADpVNB3lRQQ707.gif"}),H,N,B,a(l,{alt:"image019.gif",src:"https://s0.lgstatic.com/i/image/M00/13/09/CgqCHl7OU_-AVy0YACM7QklhkuQ370.gif"}),U,a(l,{alt:"image020.gif",src:"https://s0.lgstatic.com/i/image/M00/12/FE/Ciqc1F7OVEaAOjblAGtskMyw3Cc079.gif"}),R,Q,J,a(l,{alt:"HXedFIfmxfCLqrRI.gif",src:"https://s0.lgstatic.com/i/image/M00/13/0A/CgqCHl7OVjSAOebFABlVpq6d7m0547.gif"}),W,a(l,{alt:"WechatIMG108.png",src:"https://s0.lgstatic.com/i/image/M00/47/49/CgqCHl9HaUOAWgIjAACUx2G0hrE005.png"}),G,K,X,Z,a(l,{alt:"动图.gif",src:"https://s0.lgstatic.com/i/image/M00/47/49/CgqCHl9HaWeAc13rACQBNVWyhLM940.gif"}),$])}const es=p(i,[["render",L]]);export{ps as __pageData,es as default};

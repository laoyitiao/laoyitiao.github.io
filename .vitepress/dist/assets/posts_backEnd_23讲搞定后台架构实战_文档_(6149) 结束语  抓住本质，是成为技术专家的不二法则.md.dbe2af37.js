import{_ as a,o as p,g as t,Q as e}from"./chunks/framework.f949202b.js";const q=JSON.parse('{"title":"抽象是抓住本质的最佳手段 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6149) 结束语  抓住本质，是成为技术专家的不二法则.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6149) 结束语  抓住本质，是成为技术专家的不二法则.md","lastUpdated":null}'),o={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6149) 结束语  抓住本质，是成为技术专家的不二法则.md"},_=e('<p>时间飞逝，转眼就到专栏结束的时间。首先，给坚持学习到本讲的你点赞。同时，也感谢你的一路陪伴，你们的留言与反馈也给我持续输出内容提供了莫大的动力，再次说声谢谢。</p><p>今天我想简单和你回顾一下专栏的内容。第一个模块主要从目的性的角度对后台系统的架构进行了归类，分为读、写和扣减三大类，这也是本专栏后续三个模块详细介绍的内容。在最后一个模块，对微服务的共性问题，比如 SDK 设计、依赖的治理、监控、重构升级等一一进行了讨论。通过这段时间的投入和学习，相信你对一些问题也能产生新的理解。</p><p>如果你对某块内容还不太明白，那么建议你有空再复习一次，以便加深理解，进一步增强你的后端架构技能。</p><p>除了本专栏讲解的后端通用架构技能之外，我还有三个观点想和你分享，希望能够在你成为架构师的道路上，助你一臂之力。</p><h3 id="抽象是抓住本质的最佳手段" tabindex="-1">抽象是抓住本质的最佳手段 <a class="header-anchor" href="#抽象是抓住本质的最佳手段" aria-label="Permalink to &quot;抽象是抓住本质的最佳手段&quot;">​</a></h3><p>在编写本专栏之前，我已经将近年来，参加和主动学习的各类型的后台系统解决方案进行了抽象总结，并从系统的目的性出发，将整个后台系统分成了三大类，读、写和扣减类。此后，遇到各种类型的业务需求时，我都会先进行归类，再判断实现时具体属于哪一类型的系统。当完成归类后，就可以直接复用已经整理过的三大类后台系统的最佳实践，极大地提升系统设计的效率。</p><p><strong>上述介绍的，将各种类型的后台系统进行归类的过程，就是架构抽象</strong>。总的来说，抽象有几个好处。</p><p>首先，抽象是指将同一类系统进行集中研究并寻找其中规律的过程。假设，在你第一次接触扣减类的业务需求时，它可能是用户每天可以登录公司某一个内部网站的次数限制。因为是内部站点，访问量和并发量很小，使用纯数据库即可满足。</p><p>但如果你借助这一次需求的机会，去研究所有扣减类的业务（如支付扣减、库存扣减等）需求的特点，以及如何实现扣减，并进行总结、对比形成一套套路。那么恭喜你，你正走在成为扣减类系统架构专家的道路上。</p><p>其次，当你下一次再遇到其他披着各种业务场景的外皮，但其实底层技术实现都是扣减时，便可以轻松应对，提升效率。</p><p>此外，在我学习使用 Java 的数据库 API 时，抽象在其中也发挥了重要的作用。在 Java 中，只需要将不同类型的数据库的驱动加入代码工程，就可以直接使用 JDK 中定义的标准 API 连接各种不同类型的数据库了，无需任何配置。比如将 MySQL 的驱动实现放到代码中，就可以直接使用标准 API 访问 MySQL 数据库了。在我刚开始接触 Java 时，曾经非常好奇它是如何实现的。</p><p>在不断寻找资料和阅读源码之后，了解到这叫 SPI 技术，它是需求方只定义标准接口并基于标准协议便可以自动选择三方实现进行装载的技术，而第三方的实现主要基于标准接口和协议进行实现，比如 MySQL 版、Oracle 版。</p><p>这种从 Java 自动装配数据库驱动出发，去寻找底层原理为 SPI 的方式，就是使用抽象化的方法寻找本质的过程。当我后来接触到 Spring Boot 的时候，发现它的自动装配，其实就是 SPI 的另一种类实现，这时我学习起来就变得非常简单了。</p><p>从上面的经验可以看到，如果你理解了一项技术背后的本质，再遇到这项技术的变种场景时，很容易就能理解它，从而在技术上事半功倍。</p><h3 id="刻意练习才能形成肌肉记忆" tabindex="-1">刻意练习才能形成肌肉记忆 <a class="header-anchor" href="#刻意练习才能形成肌肉记忆" aria-label="Permalink to &quot;刻意练习才能形成肌肉记忆&quot;">​</a></h3><p>在回顾本专栏的内容时，如果不能随着潜意识说出大纲分类，以及每种类型的系统在实现时的技术要求和架构思路，说明你对专栏的内容还没有形成肌肉记忆。</p><p>一项技能形成肌肉记忆才会真正成为你自己的能力。当你面对一个需求评审或者面试时，能够很清晰、快速地输出对应的解决方案，而不是磕磕碰碰、努力地回想，无法真正解决问题或者说服面试官。</p><p>将一项技术或者技能形成肌肉记忆，最好的方式就是刻意练习，有一本畅销书叫作《刻意练习》，我推荐你有空可以看一看。</p><p>下面我把打篮球作为案例和你继续讨论这个话题。曾经有很多和我一起学习打篮球的同学，他们现在的篮球技术已经把我甩到九霄云外了。产生这个情况的原因是我在学会打篮球的基本技巧（如基本的投篮和运球）之后，就消耗大量的时间去和朋友进行娱乐赛。</p><p>而我的这些同学，学习了基本的投篮和运球技巧之后，还会努力去思考怎样把投篮姿势纠正得更好，如何让运球的手法变得更有熟练度，变得像 NBA 球星那样。所以后来他们的篮球技巧要比我高出非常多，他们在不断地刻意练习提升篮球技能，而我则在低水平线的篮球技巧上不断重复，没有进步。</p><p>学习也是一样。本专栏提供的技术和技巧，能够帮助你在后台开发中，解决一部分问题，但你并不能就此止步。因为专栏的定位和篇幅的原因，它涉及的其他技术：</p><ul><li><p>Redis 为什么那么快？</p></li><li><p>还有哪些使用顺序写比随机更改快这一特点来解决问题的业务场景？</p></li><li><p>MySQL 自身的 Binlog 是如何实现低延迟、无丢失的数据同步？</p></li><li><p>各类监控系统如何处理海量的监控数据？</p></li></ul><p>这些待研究的问题都需要你去刻意练习，或者说需要你去钻牛角尖，搞明白其中涉及的所有技术点并不断地挖掘背后的本质。此时你离成为一个真正的技术大牛就不远了。</p><h3 id="不设限-广泛汲取-增加自己的护城河" tabindex="-1">不设限，广泛汲取，增加自己的护城河 <a class="header-anchor" href="#不设限-广泛汲取-增加自己的护城河" aria-label="Permalink to &quot;不设限，广泛汲取，增加自己的护城河&quot;">​</a></h3><p>在坚持上述两点建议后，我相信，在不久的将来，你也能成为技术大佬。</p><p>但我并不希望你止步于此，因为现在这个社会需要的是&quot;T&quot;型人才，只有一项技能并不能无往不利。 &quot;T&quot;这个字母由一横和一竖组成。这一竖，表示你要有一项或多项非常专业的技能；这一横，代表你要有很宽的知识面，综合能力强。</p><p>那怎么才能将一横变得越来越长，一竖变得越来越厚呢？</p><p>答案是，需要你保持一颗好奇心、积极的心态，广泛地去涉猎。当遇到自己不懂的技术或业务领域时，不要产生抵触心理，而是积极地去了解它。比如说你当前主要从事后端开发的工作，但是我希望当你有机会接触大数据、前端、数据挖掘、终端等领域的时候，也能够先进行抽象发现新领域的技术本质，再进行刻意练习，坚持下来，新接触的领域很有可能成为你的一项新技术专长，成为&quot;T&quot;这个字母中那一竖，或者至少能够拓宽&quot;T&quot;字母的那一横。</p><h3 id="寄语" tabindex="-1">寄语 <a class="header-anchor" href="#寄语" aria-label="Permalink to &quot;寄语&quot;">​</a></h3><p>希望你能够一直保持一颗初心，不断归零，在面对任何新接触的领域时，都能够先去探寻它的本质并不断刻意练习，进而乘风破浪，早日成为你所期望的那个人。</p><p>我是潘新宇，本讲就到在这里，再见。</p><p>最后，我邀请你为本专栏课程进行结课评价，因为你的每一个观点都是我和拉勾教育最关注的点。<a href="https://wj.qq.com/s2/8233676/bf1c/?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">点击链接，既可参与课程评价</a>。编辑会随机抽 5 位同学送精美礼品喔。</p>',32),r=[_];function l(i,s,n,c,d,h){return p(),t("div",null,r)}const f=a(o,[["render",l]]);export{q as __pageData,f as default};

import{_ as e,j as n,o as l,g as r,k as p,h as a,Q as s,s as t}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"01学习思维：怎样才能学好Java设计模式？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6862) 01  学习思维：怎样才能学好 Java 设计模式？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6862) 01  学习思维：怎样才能学好 Java 设计模式？.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/趣学设计模式_文档/(6862) 01  学习思维：怎样才能学好 Java 设计模式？.md"},_=s('<h1 id="_01学习思维-怎样才能学好java设计模式" tabindex="-1">01学习思维：怎样才能学好Java设计模式？ <a class="header-anchor" href="#_01学习思维-怎样才能学好java设计模式" aria-label="Permalink to &quot;01学习思维：怎样才能学好Java设计模式？&quot;">​</a></h1><p>在工作中，你可能常常会发现，很多人将 Java 设计模式、大学里学的高等数学和编译原理等，视为脱离实际工作的知识。</p><p>但不管是面试还是实际工作中，你是不是又经常听到大牛前辈们给你&quot;洗脑&quot;，说设计模式很重要？为此你可能还专门买书或参加培训学习过，可往往都因为应用效果不佳，从开始的很重视，到后来慢慢地习惯性忽略，最后在你心中它的重要程度可能还远不如明天要交差的需求。</p><p>相信我，你并不孤单。</p><p>在过去很长的一段时间里，我也曾和你一样，反复地在内心挣扎，徘徊在学与不学的矛盾里，并且时不时还有这样一些困惑：</p><ul><li><p>在面试中时常被问到设计模式，可实际工作中却很少使用；</p></li><li><p>每个模式的样例代码都很熟悉，实际编码时却总感觉力不从心，实现困难；</p></li><li><p>很多系统设计看上去和很多模式都很像，却不知道到底该用一个模式，还是多个模式；</p></li><li><p>设计模式除了在编码阶段有用外，在设计上似乎用处并不大。</p></li></ul><p>工作多年后，我回过头再来看，其实，当时这些困惑的<strong>关键并不在于设计模式过于抽象或应用有难度，而在于我可能从一开始就没有搞清楚设计模式的应用范围和背景</strong>：设计模式到底解决什么问题？为什么要抽象这样的场景？又是如何解决这些问题的？</p><h3 id="对设计模式常见的误解" tabindex="-1">对设计模式常见的误解 <a class="header-anchor" href="#对设计模式常见的误解" aria-label="Permalink to &quot;对设计模式常见的误解&quot;">​</a></h3><p>正因为没有搞清楚这些应用范围和背景，才导致大多数时候我们总是在&quot;生搬硬套&quot;设计模式，以为在应用设计模式，却不知道还没入门就一直在误解设计模式，并无法控制地胡乱使用，最后反而引入了很多不必要的麻烦。</p><p>因此，要想学好设计模式，就得摘去这些误解。</p><h4 id="误解一-经典模式太抽象-很难学下去" tabindex="-1">误解一：经典模式太抽象，很难学下去 <a class="header-anchor" href="#误解一-经典模式太抽象-很难学下去" aria-label="Permalink to &quot;误解一：经典模式太抽象，很难学下去&quot;">​</a></h4><p>说到设计模式，你的第一反应是不是会想起&quot;四人帮&quot;GoF 的那本&quot;经典&quot;著作《设计模式：可复用面向对象软件的基础》？或者想起那 23 个&quot;经典&quot;的模式？</p><p>的确，设计模式太过于经典了，但是经典也会带来一个问题：<strong>过于抽象，难以快速理解</strong>。而对于业余时间本就不多的你来说，读抽象的经典更是一件难上加难的事。</p><p>比如说，下面是《设计模式》一书中关于访问者模式使用场景的描述：</p><blockquote><p>一个对象结构包含很多类对象，它们有不同的接口，而你想对这些对象实施一些依赖于其具体类的操作。</p><p>需要对一个对象结构中的对象进行很多不同的并且不相关的操作，而你想避免让这些操作&quot;污染&quot;这些对象的类。Visitor 使得你可以将相关的操作集中起来定义在一个类中。 当该对象结构被很多应用共享时，用 Visitor 模式让每个应用仅包含需要用到的操作。</p><p>定义对象结构的类很少改变，但经常需要在此结构上定义新的操作。改变对象结构类需要重定义对所有访问者的接口，这可能需要很大的代价。如果对象结构类经常改变，那么可能还是在这些类中定义这些操作较好。</p></blockquote><p>你会发现，即便很认真地阅读完，也看得似懂非懂，看上去似乎能和实际场景有一些结合，但真到了实际的设计和编码中时，却发现无从下手。为什么呢？</p><ul><li><p>首先，针对访问者模式使用场景，这一段描述太长了，你阅读完得花上几分钟，然后再想几分钟，并且还掺杂了一些别的概念，查阅资料又得花费几分钟甚至几小时。</p></li><li><p>其次，表述太抽象。其中关于操作&quot;污染&quot;、不相关操作、不同的接口、改变对象的结构等，不同的人可能定义完全不同，就会导致在不同的真实场景中应用时千差万别。</p></li><li><p>最后，23 个设计模式都有类似这样的使用场景描述。要想保证团队中不同的人，对这样抽象的描述保持高度统一的认知，并且记住大致场景，还得理解差距不大，这必定很耗费沟通和学习时间。</p></li></ul><p>最为关键的是，当你面对真实的业务需求时，如何才能快速选择最合适的设计模式？这个问题依然没有被解答。</p><p>其实，<strong>经典之所以太抽象，是因为包含的知识密度太高，需要花时间解读。</strong> 比如说，在实际业务中，我们其实更关心：设计模式到底如何落地实践？不同的设计模式之间有哪些共性和独特性？有没有真实的代码示例？等等。也就是说，<strong>我们需要先搞清楚设计模式能解决哪些范围的问题后，才能正确使用设计模式</strong>。</p><p>实际上，在设计模式提出之初就已经说明，也就是《设计模式》一书的副标题：可复用面向对象软件的基础。<strong>设计模式解决的是&quot;可复用&quot;的设计问题</strong>，而类似可靠性设计、性能设计、安全性设计、可服务性设计等都不是设计模式能够解决的。</p><p>简单来说，设计模式从不同项目中总结出来的通用经验，是为了帮助我们快速理解现有的系统，并从中找出共性规律，如果没有足够的经验或者思考，反而容易引入错误的设计，造成更多的麻烦。</p>',21),c=s('<p>所以说，&quot;经典太抽象&quot;只是一个事实，只要你能肯花时间认真解读，学下去并不难。</p><h4 id="误解二-设计模式太单一-复杂业务场景难落地" tabindex="-1">误解二：设计模式太单一，复杂业务场景难落地 <a class="header-anchor" href="#误解二-设计模式太单一-复杂业务场景难落地" aria-label="Permalink to &quot;误解二：设计模式太单一，复杂业务场景难落地&quot;">​</a></h4><p>现在，对于设计模式，有两个非常有意思的现象。</p><ul><li><p><strong>在理论学习中，几乎所有的开发人员都认为它很重要</strong>。比如，目前国内大多数的技术面试都会考查设计模式的相关知识点；再比如，在实际工作中，越来越多的程序员们或多或少都会在自己的项目中引入开源框架，由于开源框架中都会用到设计模式，渐渐地设计模式又被大家重新拿出来学习。</p></li><li><p><strong>在工作实践中，绝大部分开发人员在项目中又找不到合适的应用场景</strong>。比如，如何设计一个安全权限控制系统？如何设计容灾方案？从实际场景来看，设计模式似乎只能解决技术层面上的问题，业务上完全派不上用场。</p></li></ul><p>其实，发生这个冲突的关键点在于：没有搞清楚设计模式解决问题的范围所在。换句话说，<strong>设计模式并不是一种全场景的解决方案，它需要考虑适用范围</strong>。</p><p>比如，在面向对象语言 Java 领域中，如何最大限度发挥面向对象语言的继承与组合的威力？如何解耦程序的相互依赖？设计模式会提供一些解答。</p><p>如果说你现在接到的是一个复杂系统的设计任务，比如，如何设计一个秒杀系统？你不仅需要关心业务功能的实现，还要关心不同开发成员间的相互配置、服务器资源等，而此时你的脑海中浮现设计模式中的适配器模式、策略模式、状态模式......对你来说帮助并不那么明显，因为你其实还没有到如此需要细节实现的阶段。</p><p>实际上，<strong>设计模式的提出就是为了解决限定领域的有限问题。</strong> 比如，针对非业务场景的技术框架，如何实现可复用的软件？如何能够为更多的人提高编程效率？像 Spring、Netty、MyBatis、JDK 等大家公认的工具，其实随处可见设计模式的应用，但同时并不是只有设计模式本身。</p><p>所以说，你不能把设计模式当作一种通用解决方案来对待，或者认为它就应该解决超出范围的问题，一定要考虑好它的适用范围，否则问题是得不到有效解决的。</p><h4 id="误解三-模式既然很好用-那么一切皆模式" tabindex="-1">误解三：模式既然很好用，那么一切皆模式 <a class="header-anchor" href="#误解三-模式既然很好用-那么一切皆模式" aria-label="Permalink to &quot;误解三：模式既然很好用，那么一切皆模式&quot;">​</a></h4><p>比如，你可能会说：</p><ul><li><p>设计模式既然是能直接套用到某种场景的解决办法，不应该现实场景中应用很少；</p></li><li><p>设计模式既然是能用来解决面向对象设计的理论模型，不应该性能设计、安全设计用不上；</p></li><li><p>设计模式既然是统一的沟通语言，不应该有人还不知道或不喜欢；</p></li><li><p>......</p></li></ul><p>上面这些其实就是&quot;愿望思维&quot;，而且是逻辑错误的。</p><p>Java 设计模式原本是从不同的编程项目中总结出来的通用经验，是现存的既定事实，能解决很多工具、组件、框架复用的问题。比如说，你经常使用的 Spring 框架里，从工厂模式、原型模式，到代理模式、门面模式，再到观察者模式等，在其源码中随处可见。</p><p>于是，很多人就认为编程时应该处处使用模式，并且用得模式越多，设计就越好。事实上，<strong>好的设计从来不是看用的模式有多少，而是看如何合理利用模式的设计思想，以及如何利用模式解决真实的问题</strong>。</p><p>比如，我曾经在负责一个网关系统时，就陷入过&quot;模式综合征&quot;，那时的我无时无刻不在想该如何使用各种模式，即便是一个小的过滤规则模块，我也想着能不能使用责任链模式，而实际上那个需求只需要简单的白名单就能解决。最后的结果当然就是代码变得更复杂、更难以维护，并导致大量重构和沟通工作涌现。</p><p>所以说，学习设计模式是为了启发我们的思考，而不是&quot;手里握着锤子，满世界找钉子&quot;。</p><h3 id="如何正确学习设计模式" tabindex="-1">如何正确学习设计模式 <a class="header-anchor" href="#如何正确学习设计模式" aria-label="Permalink to &quot;如何正确学习设计模式&quot;">​</a></h3><p>难道设计模式真的不好用？或者根本已经成为过去式？其实争论的焦点不应该在于设计模式本身是否有用，而是我们到底有没有<strong>掌握正确的学习方法和应用设计模式的思维模式。</strong></p><p>那该如何让经典真正为我所用呢？有以下四个很简单的方法。</p><p><strong>首先，要摆正心态。</strong> 设计模式不是万能灵药，不是银弹，设计模式能解决的问题其实是有限的，你应该始终保持一个平常的心态，正确分析设计模式可以解决和不能解决的问题。不过，模式解决的问题虽然是有限的，但能激发你的想象和灵感，从中获取更多有用的信息来解决更多的问题。总之，放弃争论设计模式的有用性，花更多的时间去学习和实践，不要总想着不思考直接使用。</p><p><strong>其次，搞清楚设计模式的背景知识。</strong> 比如，设计模式如何定义？设计模式的历史演进与变化？设计模式有哪些适用的领域？又有哪些不适用的领域？如何结合实践分析和使用？学习一门知识时，如果总是忽略关联的背景知识，久而久之会养成零碎知识积累的习惯------收藏了很多资料，拆解、吸收却很少。而在学习关联知识时，你会发现，原来的知识会逐渐连接和串联起来，这是一个事半功倍的动作。</p><p><strong>再次，努力具备高手独立思考的习惯</strong>。互联网时代，不缺资料和方法，缺的是能解决复杂难题的高手。高手之所以成为高手，是因为高手不拘泥于某一知识的高低贵贱，而是保持明智的判断，始终朝着坚定的目标前行。你的身边一定有这样的隐藏高手，他们在面对复杂难题时，总是能保持清晰的头脑，谦虚并具备独立思考的习惯，你应该多多向他们学习。同样，你还需要花时间去刻意练习，在失败和挫折中探索真实的能力长什么样，并借此不断强化你的能力。</p>',23),h=t("p",null,[t("strong",null,"最后，从现在开始，坚持。"),a(" 学习技术知识，不比看文学小说，需要面对更为枯燥的业务场景，有时还需要反复做一些你可能不太喜欢的重复工作。但只有坚持才能成长，才能锤炼出属于你自己的真实能力。大多数时候我们都更容易半途而废，可是要想突破瓶颈，提升能力，升职加薪，如果没有付出与努力，那么当机会真的到来时，你很可能会抓不住。因此，一定不要中途放弃，一定要坚持住。")],-1),u=t("h3",{id:"总结",tabindex:"-1"},[a("总结 "),t("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=t("p",null,[a("要谨记："),t("strong",null,"设计 ≠ 编码，愿望 ≠ 事实"),a("。")],-1),g=t("p",null,"不要看了很多年源码，做了很多年工作，却依然做不好设计和编码。知道很多 How 时，一定还要多想想 Why 和 What。",-1),q=t("p",null,"学习设计模式的关键不在于你熟练掌握了多少设计模式，而在于能否真正灵活运用来解决更多复杂的现实问题。比如，在构建 API 网关时，你是否能借鉴访问者模式或门面模式里的精髓？在设计一款数据分析应用时，你能否不用设计模式，而专注于数据分析本身？",-1),m=t("p",null,'另外，你在学习设计模式时，不要太过于关注那些"无用论"，而应该多去发现"有用"的地方，让这些"有用"的地方来滋养你的思维，因为你的目的是要解决真实世界的困难问题，而不是为了在设计模式到底有没有用上争输赢。',-1),b=t("p",null,[a("就像你不能立即解决生活中的所有问题一样，设计模式同样不能解决这个世界上的所用问题，但是，"),t("strong",null,"只要你对设计模式进行不断地钻研与思考，设计模式就能带给你源源不断的新灵感和新希望"),a("。")],-1),f=t("h3",{id:"课后思考",tabindex:"-1"},[a("课后思考 "),t("a",{class:"header-anchor",href:"#课后思考","aria-label":'Permalink to "课后思考"'},"​")],-1),k=t("p",null,"在开始学习经典的 23 种 Java 设计模式之前，你有了解过其他哪些经典的设计模式呢？欢迎你在留言区和我分享，我会第一时间给你回复。",-1),v=t("p",null,"在下一讲，我接着和你分享 Unix 哲学给现代编程带来的启示，记得按时来听课！",-1);function A(P,T,x,J,V,E){const o=n("Image");return l(),r("div",null,[_,p(o,{alt:"设计模式01--金句1.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/FB/CioPOWBQRiaATDufAAYeyHV22Fw414.png"}),a(),c,p(o,{alt:"设计模式01--金句2.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/FE/Cgp9HWBQRhWAd16sAAXt69hs4WE888.png"}),a(),h,u,d,g,q,p(o,{alt:"设计模式01--金句3.png",src:"https://s0.lgstatic.com/i/image6/M00/1D/FE/Cgp9HWBQRj-AZywyAAX0LjIhdwE288.png"}),a(),m,b,f,k,v])}const C=e(i,[["render",A]]);export{B as __pageData,C as default};

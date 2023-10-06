import{_ as n,j as e,o as r,g as l,k as a,s as p,h as t,Q as o}from"./chunks/framework.b3d8e22e.js";const q=JSON.parse('{"title":"DRY 原则 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6868) 07  单一原则：如何跳出错误抽象的误区？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6868) 07  单一原则：如何跳出错误抽象的误区？.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6868) 07  单一原则：如何跳出错误抽象的误区？.md"},c=p("p",null,"从这一讲开始，我们就进入本课程的第二个模块------设计原则，这会为你更好地理解第三模块里的经典 GoF 设计模式打下坚实的基础。",-1),_=p("p",null,"在软件开发中，我们都学习过一些经典的设计原则，其中包括面向对象原则（SOLID）、简单原则（KISS）、单一原则（DRY）、最少原则（LoD）、分离原则（SoC）等。",-1),g=p("p",null,"你会发现，分开来看这些原则时，会觉得它们都很有道理，似乎只要照着用就能提升编程能力和代码质量，但为什么到真正编码时你却会有选择困难的矛盾感觉呢？",-1),d=p("p",null,[t("其实原因就在于，"),p("strong",null,"有的原则之间是相互冲突的，而有的原则之间又是彼此重复的。"),t(" 虽然设计原则是用来指导编程实践的，但如果不限定使用范围的话，在使用时就会很容易误用或滥用而导致更多问题出现。")],-1),h=o('<p>比如，KISS 原则与 YAGNI 原则是相似的，它们都是在讲如何保持简单性；而 KISS 原则与 SOILD 原则又是冲突的，因为 SOILD 原则为了保持面向对象的优势会增加代码复杂性。于是，当你想要在面向对象编程语言中使用 KISS 原则来保持简单设计时，势必需要面对封装、多态、继承这些复杂特性的取舍，自然会产生一种矛盾感。</p><p>好的设计必然是简单的，但是<strong>如何充分利用语言复杂的特性发挥出简单设计的威力</strong>，这才是我们学习设计原则真正的意义所在。</p><p>这一讲，我们就先来看看最简单却又最复杂的原则：DRY 原则。</p><h3 id="dry-原则" tabindex="-1">DRY 原则 <a class="header-anchor" href="#dry-原则" aria-label="Permalink to &quot;DRY 原则&quot;">​</a></h3><p>DRY（Don&#39;t Repeat Yourself），翻译成中文就是，不要重复你自己。</p><p>这个原则最早出现在经典著作《程序员修炼之道》里，定义是这样的：系统的每一个功能都应该有唯一的实现，如果多次遇到同样的问题，就应该抽象出一个共同的解决方法，而不要重复开发同样的功能代码。</p><p>原理简单清晰，大家几乎都能接受这个原则，在编程实践中也会经常使用。比如，一个 Web 后台管理系统的多个页面都需要查询人员的基本信息数据，于是你就可以抽象出一个通用的人员查询功能模块来解决这个问题。</p><p>但是根据我多年的经验，在使用 DRY 原则指导编程时，会很容易陷入一些思维陷阱当中，那都有哪些陷阱呢？又该如何避开这些陷阱呢？</p><h3 id="陷阱一-随时关心代码重用性" tabindex="-1">陷阱一：随时关心代码重用性 <a class="header-anchor" href="#陷阱一-随时关心代码重用性" aria-label="Permalink to &quot;陷阱一：随时关心代码重用性&quot;">​</a></h3><p>作为程序员，你在日常工作中会经常涉及不同功能的代码开发任务，有的功能之间会有一些共性，有的代码会有一些重复，于是你很容易想到 DRY 原则，毕竟没人愿意做大量重复的事。你可能会这样做：</p><ul><li><p>随时在意有没有写重复代码；</p></li><li><p>随时在意代码能不能重用；</p></li><li><p>随时在意有没有因为重复而浪费时间。</p></li></ul><p>不过一段时间后，你会发现，虽然以上做法能够让代码变得更清晰，也能在一定程度上提升代码重用性，但是有的抽象代码其实通用性没有预想中那么高，甚至很可能项目短期内就结束了，后面的项目压根就没有再使用过这些有&quot;重用性&quot;的代码。</p><p>这是程序员经常会遇见的问题，其实问题的本质就在于，<strong>你可能忽略了对代码是否真的需要重用的思考</strong>。</p><p>代码重复通常有以下三种类型：</p><ul><li><p><strong>功能需求重复</strong>，比如，A 团队和 B 团队都做了在线文档管理功能、QQ 和微信的聊天通信功能等；</p></li><li><p><strong>实现逻辑重复</strong>，比如，同一个文件上传功能，A 同学使用 Spring 框架实现，B 同学使用 JDK 原生功能实现；</p></li><li><p><strong>执行调用重复</strong>，比如，登录页面查询用户信息前调用用户密码校验，查询用户信息时也调用用户密码校验。</p></li></ul><p>看到重复，你是不是立即就想要优化了？比如，你是 A 团队的成员，你就想要说服 B 团队放弃维护在线文档功能；你是 B 同学，你认为 A 同学只是简单封装，存在扩展性不好等各种问题。</p><p>你发现没，我们很容易过度关注重复，而忘记思考代码重复到底是不是真的就是问题。</p><p><strong>那该如何避坑呢？简单六个字：先可用，再重用。</strong></p><p>有时你的代码之所以会重复，可能是因为还没有找到正确的抽象，这时你就不应该强求对代码进行抽象。</p><p>传统理论认为，代码重复三次以上就应该抽象。这是错误的！代码重复三次甚至更多次和你找到正确的抽象没有必然联系。也就说是，你不要被编程一时的熟悉感所欺骗，应该实事求是地写完当前代码，再对比代码是不是真的重复。</p><p>简单来说，<strong>你应该先写出可以运行的代码，再考虑是否需要重用代码。</strong></p><p>如果你还没有找到抽象的话，其实也没有关系，因为等到有更多的上下文时，还可以重构它。</p><p>所以说，要想不重复你自己，需要先不再随时关心代码重用性，保留适当的重复，等到真的重复时，再去抽象可复用的公共代码。</p><h3 id="陷阱二-过度设计" tabindex="-1">陷阱二：过度设计 <a class="header-anchor" href="#陷阱二-过度设计" aria-label="Permalink to &quot;陷阱二：过度设计&quot;">​</a></h3><p>近年来，随着面向对象思想的逐渐流行，在软件开发中，我们越来越重视代码的可扩展性、可维护性，于是开发团队越来越多地开始强调灵活的代码设计，目的就是应对未来更多的需求变化。</p><p>但实际上，根据我多年的经验和观察，我们很多时候都恰恰因为太重视灵活性和复用性，反而导致在做代码设计时更容易出现过度设计的问题。</p><p>比如，用户提出了 A 需求，设计者分析出了 B 和 C 的系统需求来支持 A，但在编码实现 B 的过程中，发现可以抽象出更好的通用功能 D、E、F 来支持 B 和 C，进而去开发 D、E、F。于是精力开始变得分散，原本只需要开发出 B 和 C，现在却又多出了D、E 和 F。</p><p>之所以会出现这种情况，是因为我们总是<strong>期望通过现在的灵活设计来避免未来需求变化后的重复设计与编码</strong> 。这样做的话，确实特别符合 DRY 原则的理念。但实际上，<strong>需求的变化方向是不可预测的</strong>。一旦我们投入了过多的精力到灵活设计上，势必会影响本应该完成的需求。同时，过多的功能会引入更多潜在的问题，而修复问题也会耗费我们的时间和精力。</p><p><strong>那么该如何避坑呢？一个方法：抓住上下文，适度设计。</strong></p><p>在代码设计的过程中，你应该遵循有限范围的原则，也就是我们常说的抓住上下文。比如，你需要开发一个内部的数据管理后台的权限管理功能，那么你要抓住的上下文就是数据是否敏感、使用人员的大致范围和人数、功能交付截止日期、团队现在使用的类库和框架、有没有采用基本的权限认证等，然后才开始进行设计与代码实现。</p><p>当搞清楚了基本的上下文后，才能开始适度设计并编码。&quot;适度&quot;虽然没有一个统一的标准，但我给你推荐一个简单实用的方法：当你想要扩展通用设计时，想想一年后这个项目是不是还存在。</p><p>这个方法虽然很老套但是特别有效，因为在过去的几年里，我用这个方法毙掉了我自己很多过度的设计，所以我建议你也尝试一下。当然，有一些很基础的通用工具方法，还是可以抽象提炼出来复用的，不过依然可以用这个方法来检查一下，你会发现有很多功能可能只是用了一次。</p><h3 id="陷阱三-写一次性代码" tabindex="-1">陷阱三：写一次性代码 <a class="header-anchor" href="#陷阱三-写一次性代码" aria-label="Permalink to &quot;陷阱三：写一次性代码&quot;">​</a></h3><p>如果我们教条式地理解 DRY 原则，很容易走入一种极端的应用场景：为了不重复而不重复，俗称写一次性代码。实际上，硬编码和复制粘贴编程这两种经典的编码方式就是这种场景的具体表现。</p><ul><li><p><strong>硬编码</strong>，是说将一些配置数据或通用信息写入代码中，导致信息一旦发生变动，就不得不修改代码来满足要求。比如说，将邮件发送程序中的用户名、密码和邮箱地址写入代码中，当密码发生变化时，维护代码的人就需要修改代码，重新编译打包。</p></li><li><p><strong>复制粘贴编程</strong>，是指通过将他人已经实现的代码复制到自己的代码中实现同样的功能。这是现在最常用的编程方式之一，不仅编程新手喜欢用，很多编程高手也喜欢用，理由就是不重复造轮子。</p></li></ul><p>你可能已经发现，写一次性代码非常符合 DRY 原则的理念，因为这样做不仅避免了重复（每次都能写新的代码），而且还能在短期内提高工作效率（因为及时完成了任务）。</p><p>但是在我看来，这只是一种表面的不重复，写一次性代码不仅会导致频繁修改引入更多 Bug，还会导致架构无法及时演进累积更多的技术债，最终导致系统的庞大臃肿而难以理解。</p><p><strong>那该如何避这个坑呢？坚持写易懂的代码。</strong></p><p>什么是易懂的代码？在我看来，易懂的代码符合以下几个特点：代码逻辑清晰，充分利用语言特性，遵从一定的编码规范，实现完整需求功能。</p><p>下面我就来具体解释下。</p><p><strong>第一，易懂的代码不是指容易、简单的代码</strong>。简单的代码往往更难理解，恰恰因为代码量更少，学习成本反而更高。比如，你能快速看懂下面这段 shell 命令吗？</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">(){</span><span style="color:#F97583;">:|:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">};</span><span style="color:#F97583;">:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">:</span><span style="color:#24292E;">(){</span><span style="color:#D73A49;">:|:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">};</span><span style="color:#D73A49;">:</span></span></code></pre></div><p>最初我看到时非常困惑，后来查资料才知道这一段代码的真实含义：无终止的条件递归。如果执行此操作，它将快速复制自己，从而消耗完所有的内存和 CPU 资源。你发现没，代码很简单，但是一点也不易懂。</p><p><strong>第二，易懂的代码能借用语言特性来发挥优势。</strong> 比如，在 Java 中利用驼峰大小写来区分不同方法的命名含义，或利用熟悉的 get、set、insert、update 等习惯命名，或使用 @Service 等特定注解来标识服务等。</p><p><strong>第三，易懂的代码需要遵从一定的代码规范。</strong> 比如，接口定义加注释，MySQL 数据库中使用下划线来区隔字段名并备注含义，使用枚举定义状态值，if-else 的嵌套最多三层等。</p><p><strong>第四，易懂的代码要能正确运行。</strong> 千万不要为了易懂而写大量的说明文档和注释，但却忘记了代码的正确运行逻辑。比如，实现接口时写了注释却忘了实现代码逻辑（只返回 null），导致运行后一直拿不到结果；当函数方法的入参类型或位置发生变化后没有修改说明，反而误导维护人员输入错误的数据，导致结果出错。</p><p><strong>第五，始终牢记：易懂的代码不是你告诉计算机怎么做的答案，而是告诉另一个程序员你想要计算机做什么的意图</strong>。</p>',47),u=o('<p>简单来说，编写代码是要给其他人阅读的，易于理解的代码才是易于维护的代码。如果你的代码连自己都不能快速厘清思路，那么别人大概率也读不懂你的代码。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>应用 DRY 原则最重要的是要搞清楚代码重复是不是就一定不好，而不能以是否违反了 DRY 原则为判断的依据。因为一旦以是否违反原则为标准，就会掉进上面所说的思维陷阱中。</p><p><strong>宁可重复，也不要错误的抽象。不要为了抽象而创建抽象。</strong></p><p>很多时候，我们容易将 DRY 原则理解为编程时不应该有重复代码，但其实这不是它的真实意图。在我看来，DRY 原则需要放到具体的上下文环境中去使用。比如，在技术选型时，可以用它来帮助我们看透组件复用的本质，还可以在功能实现时，用来减少各种新奇想法的冲突，而不是仅仅纠结于代码是否重复。</p><p>DRY 虽然是一个最简单的法则，也是最容易被理解的，但它也可能是最难被应用的。</p><p>本来 DRY 原则的初衷是帮助我们提升代码的可重用性，结果很多时候我们却为了不重复而引入更多新的问题。所以，在本课程第一篇的设计原则文章里，我最想告诉你：<strong>保持对原则的警醒比应用了多少原则更重要</strong>。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>程序员圈子里有一句很流行的话：不要重复造轮子。它特别契合 DRY 原则，但是重复造轮子真的就一定不好吗？你有过哪些重复造轮子后却又有收获的经历？</p><p>欢迎你在留言区与我分享你的想法和经历。</p><p>在下一讲，我会接着和你分享&quot;简单原则：如何写出简单代码？&quot;的相关内容，记得按时来听课！</p>',11);function D(m,A,S,R,E,b){const s=e("Image");return r(),l("div",null,[c,_,g,d,a(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/2D/BC/Cgp9HWBm5cmAa_jcAAX07BNz5lc141.png"}),h,a(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/2D/BC/Cgp9HWBm5eeAdR-kAAXzqUcC-xQ083.png"}),u])}const y=n(i,[["render",D]]);export{q as __pageData,y as default};

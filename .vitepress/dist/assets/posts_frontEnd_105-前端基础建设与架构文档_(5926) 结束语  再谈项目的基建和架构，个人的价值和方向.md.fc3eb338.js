import{_ as p,o as t,g as o,Q as l}from"./chunks/framework.f949202b.js";const h=JSON.parse('{"title":"库，不仅是能有 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/105-前端基础建设与架构文档/(5926) 结束语  再谈项目的基建和架构，个人的价值和方向.md","filePath":"posts/frontEnd/105-前端基础建设与架构文档/(5926) 结束语  再谈项目的基建和架构，个人的价值和方向.md","lastUpdated":null}'),i={name:"posts/frontEnd/105-前端基础建设与架构文档/(5926) 结束语  再谈项目的基建和架构，个人的价值和方向.md"},a=l('<p>在西班牙语中，有一个很特别的的词语叫&quot;Sobremesa&quot;，它专指&quot;吃完饭后，大家在饭桌上意犹未尽交谈的那段短暂而美好时光&quot;。现在，我们的专栏也已经全部更新完毕，历经&quot;枯燥的程序知识&quot;，我希望在最后的内容中，大家能够放松心情，畅所欲言。今天，我将会从&quot;现代项目库的编写&quot;谈基建和架构，从&quot;如何保持竞争力&quot;谈个人价值和方向。就让这些非技术内容作为全部专栏内容的结束语吧。</p><h3 id="库-不仅是能有" tabindex="-1">库，不仅是能有 <a class="header-anchor" href="#库-不仅是能有" aria-label="Permalink to &quot;库，不仅是能有&quot;">​</a></h3><p>此刻，2021 新年已过，前端技术和解决方案无时无刻不在确立着新的格局。&quot;如何写好一个现代化的开源库&quot;这个话题始终值得讨论。当然，这对于初级开发者也许并不简单。比如，我们要思考：</p><ul><li><p>开源证书如何选择；</p></li><li><p>库文档如何编写，才能做到让使用者快速上手；</p></li><li><p>TODO 和 CHANGELOG 需要遵循哪些规范，有什么讲究；</p></li><li><p>如何完成一个流畅 0 error, 0 warning 的构建流程；</p></li><li><p>如何确定编译范围和实施流程；</p></li><li><p>如何设计合理的模块化方案；</p></li><li><p>如何打包输出结果，以适配多种环境；</p></li><li><p>如何设计自动规范化链路；</p></li><li><p>如何保证版本规范和 commit 规范；</p></li><li><p>如何进行测试；</p></li><li><p>如何引入可持续集成；</p></li><li><p>如何引入工具使用和配置的最佳实践；</p></li><li><p>如何设计 APIs 等。</p></li></ul><p>其中的任何一个点都能牵引出前端语言规范和设计、工程化基建等相关知识。比如，让我们来思考构建和打包过程，如果我是一个库开发者，我的预期将会是：</p><ul><li><p>我要用 ES Next 优雅地写库代码，因此要通过 Babel 或者 Bublé 进行转义；</p></li><li><p>我的库产出结果要能够运行在浏览器和 Node 环境中，我会有自定义的兼容性要求；</p></li><li><p>我的库产出结果要支持 AMD 或者 CMD 等模块化方案，因此对于不同环境，采用的模块化方案也不同；</p></li><li><p>我的库产出结果要能够和 Webpack、Rollup、Gulp 等工具无缝配合。</p></li></ul><p>根据这些预期，我就要纠结：<strong>&quot;到底用 Rollup 对库进行打包还是用 Webpack 进行打包&quot;&quot;如何真正意义上实现 Tree shaking&quot;&quot;如何选择并比较不同的工具&quot;&quot;如何合理地使用 Babel，如何使用插件&quot;等话题</strong>。</p><p>把这些问题想通，我们距离项目的基建和架构就能更进一步。因此，如果在项目中遇到了公共库使用问题，就让我们花些时间，追根刨底，研究个明白。同时，你要大胆地设计公共库，站在使用者的角度想问题，不断打磨公共库的设计理念和使用体验，很快就会有成长。最后，对社区开源知识保持学习，相信你一定会有所收获。</p><h3 id="如何保持竞争力" tabindex="-1">如何保持竞争力 <a class="header-anchor" href="#如何保持竞争力" aria-label="Permalink to &quot;如何保持竞争力&quot;">​</a></h3><p>提到竞争力，我想先说一个&quot;程序员&quot;的修养，这个话题非常开放。我们会想到很多关键词，比如：</p><ul><li><p>保持热情</p></li><li><p>谦虚谨慎</p></li><li><p>学会阅读</p></li><li><p>学会提问</p></li><li><p>善用搜索</p></li><li><p>学会写作（文档/博客等）</p></li><li><p>&quot;科学上网&quot;</p></li><li><p>时间管理</p></li><li><p>知识管理</p></li><li><p>英语学习</p></li></ul><p>我个人很不喜欢所谓的成功学和方法论，更讨厌制造焦虑、兜售鸡汤。免入俗套，我打算从两种动物谈起，来说一些&quot;废话&quot;。</p><p>不管是学习进阶之路，还是工作中的项目，我们能够遇到的真正问题只有两类：第一种是<strong>看不见的</strong> ，我把它比作为&quot;黑天鹅&quot;，总会在你意想不到的时间和地点出现，并彻底颠覆一切；第二种是被我们<strong>视而不见的</strong>，我把它比喻成&quot;灰犀牛&quot;，你知道且习惯于它的存在，但是它会在某个时刻突然爆发，一旦爆发就会席卷一切，令人无从抵抗。</p><p>而项目开发和个人成长都有&quot;黑天鹅&quot;和&quot;灰犀牛&quot;的危机。</p><p><strong>黑天鹅</strong></p><p>&quot;新技术的爆发，技术的更新换代&quot;就是职业生涯的黑天鹅。但我们需要辩证地来认识它：对于菜鸟来说，新技术和未知领域让年轻人有机会弯道超车，减少因为欠缺经验和阅历而带来的劣势；对于有一定工作经验和阅历的程序员来说，&quot;颠覆&quot;和&quot;变革&quot;这样的词语似乎不那么友好。</p><p>但是新技术说到底也只是工具，<strong>真正资深程序员的核心价值在于：逻辑、分析、数据、算法等抽象能力</strong>。技术工具只是这些抽象能力的表现形式。从汇编语言转到 C 语言，其实更能发挥 C 的强大控制能力；从 C 转到 Java，只需要理解面向对象和虚拟机就能很快适应并脱颖而出；从 Java 转到 Python 的程序员，甚至都会感叹写代码&quot;太简单了&quot;！</p><p>总之，黑天鹅既是危机，也是机会。新技术作为新工具，总能带来新的价值蓝海。如果能把黑天鹅当作机会，保持敏感、好奇和进取的心态，扩展技能树，就能驯服来势汹汹的新技术。希望我们所有人一起共勉。</p><p><strong>灰犀牛</strong></p><p>社会中，很多职业是&quot;越老越值钱&quot;：老警察、老医生、老艺术家，说起来就让人觉得技术高超，令人信赖。</p><p>职业进阶就是一只灰犀牛。在悄然溜走的时间中，我们可能习惯了日复一日的重复劳动。<strong>程序员怕的不是变老，而是变老的同时没有变强</strong>。如何击退这只灰犀牛，就需要我们从天天接触的工作代码入手，从熟悉的事物出发，找到突破口。</p><p>比如，在这个专栏的《现代化前端开发和架构生态篇》中，我重点突出了：如何增强程序的健硕性、如何提升我们的开发效率、如何持续不断地完善项目、如何从零开始打磨基础构建体系。仔细思考，里面的内容也许就能接入你的项目当中。</p><p>从机械的工作抽象出更完美的工程化流程，这样的话题似乎永远说不完。我也总有新的心得和体会想和大家一起分享、交流。专栏已完结，但是衷心希望我们的技术探险之旅，仅仅是拉开帷幕。</p><h3 id="写在最后的话" tabindex="-1">写在最后的话 <a class="header-anchor" href="#写在最后的话" aria-label="Permalink to &quot;写在最后的话&quot;">​</a></h3><p>站在跑道的起点，你不知道跑到哪里肌肉会开始发痛，呼吸急促，想要停下来休息；在二三十岁的年纪，我们无从得知学习了一门课程，能对自己的水平提高和职业发展起多大作用。</p><p>也许无论是跑步还是写代码，都是在探索生命的种种可能。</p><p>------不去跑，永远不知道能跑多远；不去做，永远不知道能做多好。</p><p>最后，我想邀请你参与对本专栏的评价，你的每一个观点对我们来说都是最重要的。<a href="https://wj.qq.com/s2/8143682/4a70?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">点击链接，即可参与评价，还有机会获得惊喜奖品！</a></p><p>本专栏到此结束，衷心希望各位读者一切顺利。</p>',29),e=[a];function u(r,_,n,q,s,c){return t(),o("div",null,e)}const g=p(i,[["render",u]]);export{h as __pageData,g as default};

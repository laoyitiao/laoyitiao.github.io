import{_ as t,o as p,g as e,Q as o}from"./chunks/framework.f949202b.js";const d=JSON.parse('{"title":"未知攻，焉知防 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Web 安全攻防之道_文档/(5966) 开篇词  学习 Web 安全，防止你的网站被入侵.md","filePath":"posts/frontEnd/Web 安全攻防之道_文档/(5966) 开篇词  学习 Web 安全，防止你的网站被入侵.md","lastUpdated":null}'),a={name:"posts/frontEnd/Web 安全攻防之道_文档/(5966) 开篇词  学习 Web 安全，防止你的网站被入侵.md"},r=o('<p>你好，我是赢少良。我在安全行业从业 10 年，目前就职于某世界 500 强知名企业，主要从事安全应急、渗透测试等信息安全相关的工作。我曾多次获得&quot;微软全球最具价值安全研究员&quot;，也曾获得国内外各大知名厂商的漏洞致谢，包括 Mcicrosoft、Google、Apple、Adobe、阿里、百度等。</p><p>早年，我在《黑客防线》《黑客手册》等知名技术杂志上发表文章，并常年混迹于国内各大 SRC 平台，以及 HackerOne 等国外知名的漏洞奖励平台，擅长领域涉及 Web、Android、Windows、macOS/iOS 等多个安全方向。</p><p>拉勾教育在做的事情，让我有幸触碰一种新的内容分享方式，来和你系统化聊一聊 Web 安全。</p><h3 id="未知攻-焉知防" tabindex="-1">未知攻，焉知防 <a class="header-anchor" href="#未知攻-焉知防" aria-label="Permalink to &quot;未知攻，焉知防&quot;">​</a></h3><p>高中时，某日在一手机论坛上闲逛，碰巧有两个网站的站长因为矛盾产生了一场骂战。最后其中一位站长把另一站长的网站给黑了，还挂了&quot;黑页&quot;（黑客篡改掉的网站页面），上面写着&quot;Hacked By xxx&quot;的字样。当时对那位站长深感敬仰，感觉真酷。现在回想起来，难免自嘲那会儿太年轻，没见过世面。</p><p>这里声明下：<strong>非法入侵他人网站属于违法行为，要负法律责任的</strong>。</p><p>早些年，国家网络安全法律还不健全，很多网站的安全性也非常欠缺；很多网站被黑掉，被黑客们美其名曰&quot;友情检测&quot;；各种黑页满天飞，甚至还有专门的网站来统计和排名。有人为了上榜，就拼命地乱黑网站，挂黑页炫耀，甚至留 QQ 号收徒，然后截图提交到排行榜网站。</p><p>写开篇词的时候，我还去搜了下，找到了一张比较有挑衅意味的黑页：</p><p><img src="https://s0.lgstatic.com/i/image/M00/8A/2D/Ciqc1F_ZrguAajCFAAFOa2Rk5Uk706.png" alt="Drawing 0.png"><br> 图 1：黑页展示</p><p>一些小网站被黑，可能影响不大。但如果是大公司的网站被黑，随便一起都是一次严重的公关事件，甚至股价腰斩。</p><p>2017 年 9 月，美国三大信用评级机构之一的 Equifax 公司服务器被黑，数据库被盗，导致近一半的美国人隐私信息遭泄露，包括姓名、生日、电话、住址、信用卡号、驾驶证号等。被曝光当天，Equifax 股价暴跌，花了近 2 年的时间才恢复原先的价格。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/02/C6/Cip5yF_a9VmAT09FAANFJ_1ui88407.png" alt="Lark20201217-140505.png"><br> 图 2：艾可菲公司股票</p><p>可能你觉得其他公司和你没有关系。那如果是你的网站被黑，或者是你就职公司的网站被黑，你会做何感想呢？</p><p>我们当然不希望发生这种事情。<strong>所以学习相关的网络渗透技术，正是为了更好地防御</strong>。如果你不知道黑客是如何攻击的，自然也就无从做出相应的防御对策。这就跟警察抓罪犯一样，如果警察不具备犯罪相应的知识，又如何洞察他人的犯罪行为呢？&quot;未知攻，焉知防&quot;，正是此理。</p><h3 id="为什么要学-web-安全" tabindex="-1">为什么要学 Web 安全？ <a class="header-anchor" href="#为什么要学-web-安全" aria-label="Permalink to &quot;为什么要学 Web 安全？&quot;">​</a></h3><p>随着时代的发展，如今无论是国家还是企业，都十分重视网络安全，各种相关的岗位也随之出现。在拉勾网上搜&quot;Web 安全&quot;就能找到相关的岗位。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/02/0C/Cip5yF_ZrimAa4buAAGDyX9tPm4751.png" alt="Drawing 2.png"><br> 图 3：招聘信息来源拉勾网</p><p>根据 HackerOne 的报告数据（下图），71％ 的安全问题都出现在网站上，其次是一些 API 接口，这些接口可能是 Web 的，也有可能是二进制软件的；再往下就是 iOS 与 Android 应用了。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/02/C7/Cip5yF_a9iqAG5wmAAEiks_na48436.png" alt="111.png"><br> 图 4：HackerOne 的报告数据</p><p>可以说，网站安全攻防，也就是我们俗称的 Web 安全，占比通常达到了 80％以上。<strong>Web 安全是最受外部黑客关注的目标，也是企业应该重点防御的对象</strong>。</p><p><img src="https://s0.lgstatic.com/i/image/M00/8A/35/Ciqc1F_ZuTOAAN8RAAUzN1R2YTo837.png" alt="Lark20201216-153522.png"></p><p>尽管 Web 安全如此重要，但我在面试一些渗透测试岗位的<strong>求职者</strong> 时，发现多数人要么<strong>只懂得利用，不懂得防御</strong> ，要么就是<strong>缺乏实战能力</strong>。</p><p>企业你是想让你来发现和解决安全问题的，如果不懂防御，又如何为企业提供相应的解决方案呢？更何况 Web 安全是一项注重实战的技能，如果缺乏实战能力，到了真被入侵的时候，根本就无法应对。</p><p>如果你想从事安全行业，或者是想从事前后端开发工作，学习 Web 安全知识能让你更有效地应对入侵问题，甚至是提前做好安全防护，防止安全事件的发生。</p><p><strong>另外，学习 Web 安全相关的知识，不仅可以帮助你提升自己，还能赚取赏金</strong>。</p><p>国内外企业都有自建安全响应中心，用于接收外部报告漏洞；然后，依据漏洞危害等级和质量给予相应的赏金或礼品，比如 TSRC（腾讯安全应急响应中心）、MSRC（微软安全响应中心）。此外也有一些知名的第三方漏洞奖励平台，比如 HackerOne，上面经常会公开一些漏洞案例，非常有学习价值。</p><p>一开始想赚赏金是有些难度的，因为在上面挖漏洞的白帽子非常多，遇到报告相同漏洞的情况时（俗称&quot;撞洞&quot;），平台只会把赏金给到最早报告漏洞的人。如果你没有系统化的 Web 安全知识，只会用一句弹提示框的语句到处填写输入框，看是否会弹框，那基本是挖不到漏洞的。</p><p>我刚开始去国内 SRC（安全响应中心）平台赚赏金的时候，有点力不从心，很难挖到有价值的高危漏洞。我尝试购买了一些相关的书籍，但那些书大多是停留在理论知识上，没有提供实践操作的方法。后来即便挖到了一些漏洞，当厂商来问我一些具体的危害和修复建议（有助于提高厂商评估的奖金额度）时，我又经常答不上来。</p><h3 id="课程设计" tabindex="-1">课程设计 <a class="header-anchor" href="#课程设计" aria-label="Permalink to &quot;课程设计&quot;">​</a></h3><p>面对这些问题，我确定了本课程的思路，也就是前面我提到的&quot;未知攻，焉知防&quot;。我将课程分成了 3 个模块，通过工具和方法论介绍、理论分析、案例实战，从多个维度带你了解 Web 安全，建立完整的 Web 安全知识体系。</p><ul><li><p><strong>模块一，Web 攻防基础</strong> 。这是正式开始前的准备工作，主要介绍了一些常用的工具，并带你<strong>搭建靶场，避免非法测试他人网站</strong>。通过这一部分的学习，你可以掌握一些常用的渗透工具和信息收集的方法，帮助你提高测试效率和成功率；搭建靶场也能让你更好地理解漏洞的产生原理和利用，提高实战能力。</p></li><li><p><strong>模块二，漏洞攻防原理</strong> 。作为这门课最硬核的部分，在模块一的基础上，我补充了一些实用的工具和测试方法（例如 sqlmap），讲解了各种常见的 Web 漏洞攻防原理，教你进行安全测试，并通过靶场进行演练。通过这一部分的学习，你可以<strong>了解 XSS、SQL 注入、CSRF 等常见 Web 漏洞类型的攻击与防御方法</strong>。只有深入学习这些漏洞攻防技术，才能避免自己成为只会使用工具的&quot;脚本小子&quot;。</p></li><li><p><strong>模块三， Web 安全建设</strong> 。这里介绍的是企业内部对于 Web 安全漏洞的防御方法。<strong>如何更系统、更全面、更早地检测、修复、拦截各种漏洞，防止企业产品遭受外部利用漏洞进行恶意攻击</strong>是这一模块的重点。业务开发过程中，避免安全漏洞的产生也是一个非常重要的流程。</p></li></ul><p>通过这一部分的学习，你不仅能保障自己业务产品的正常运行，而且能避免自己的绩效受到安全事件的影响。业务产品上线后，若是被攻击入侵，也能拥有修复漏洞和应急处置的能力，这是在工作中表现自己能力的最佳时刻。</p><p>在这个过程中，我希望&quot;授人以渔&quot;地教授你正确的学习方法，不仅引你入门，更能让你获得持续的自我提升；同时，我希望通过分析常见的 Web 漏洞类型的原理、利用、检测与防御，让你能够独立完成渗透测试工作，让你能够帮助企业更早地发现和修复漏洞，防止被外部攻击入侵。</p><p>课程中，我还会结合公开的漏洞靶场和 CTF 赛题，通过实例来讲解 Web 安全攻防的方方面面，指导你搭建环境练习，在实践中学习与应用。</p><h3 id="讲师寄语" tabindex="-1">讲师寄语 <a class="header-anchor" href="#讲师寄语" aria-label="Permalink to &quot;讲师寄语&quot;">​</a></h3><p>入门 Web 安全并不难，难的是如何在实战中不断提升自己，在前人的技术研究基础上，有所创新和提升。在这门课中，我会带你系统了解安全知识体系，学会分析和解决 Web 安全相关问题，帮助你胜任更具有挑战性的工作。</p><p>哪怕你是研发岗，并未在从事安全行业，掌握安全技术，也一定会在将来的某一时刻发挥作用。<strong>用技术打造自己的核心竞争力，做职业生涯的常青树，做生活的保护伞，也不失为一种提升职场竞争力，抵御职业风险的有效手段</strong>。</p><p>相信你只要认真学完本课程，并认真跟着课程进行实战练习，就能够具备独立的渗透测试能力。如果在学习完本课程后，你刷到了自己的第一笔漏洞奖金，记得回来分享下，期待你的好消息。</p><p><img src="https://s0.lgstatic.com/i/image/M00/8A/40/CgqCHl_ZuSSANvb4AAVPDVOz1QI029.png" alt="Lark20201216-153532.png"></p>',39),s=[r];function n(i,g,_,c,l,b){return p(),e("div",null,s)}const m=t(a,[["render",n]]);export{d as __pageData,m as default};

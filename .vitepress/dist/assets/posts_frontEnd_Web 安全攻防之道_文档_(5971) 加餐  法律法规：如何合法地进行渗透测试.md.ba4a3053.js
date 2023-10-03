import{_ as p,o as t,g as o,Q as a}from"./chunks/framework.f949202b.js";const d=JSON.parse('{"title":"网络安全法 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Web 安全攻防之道_文档/(5971) 加餐  法律法规：如何合法地进行渗透测试.md","filePath":"posts/frontEnd/Web 安全攻防之道_文档/(5971) 加餐  法律法规：如何合法地进行渗透测试.md","lastUpdated":null}'),e={name:"posts/frontEnd/Web 安全攻防之道_文档/(5971) 加餐  法律法规：如何合法地进行渗透测试.md"},l=a('<p>你好，我是赢少良。渗透测试是模拟黑客攻击的技术手段去业务产品进行安全测试，将发现的漏洞和风险以测试报告的形式同步给客户，并协助其修复，防止被黑客攻击入侵。</p><p><strong>任何未经授权的渗透测试都是违法的。</strong> 这句话就是本文要说的重点。</p><h3 id="网络安全法" tabindex="-1">网络安全法 <a class="header-anchor" href="#网络安全法" aria-label="Permalink to &quot;网络安全法&quot;">​</a></h3><p>2017 年 6 月 1 日发布的《中华人民共和国网络安全法》，对一些网络犯罪行为有了更明确的规定，这里我主要讲下涉及个人的相关规定，其对应的法律条文摘抄如下：</p><blockquote><p>第十二条　任何个人和组织使用网络应当遵守宪法法律，遵守公共秩序，尊重社会公德，不得危害网络安全，不得利用网络从事危害国家安全、荣誉和利益，煽动颠覆国家政权、推翻社会主义制度，煽动分裂国家、破坏国家统一，宣扬恐怖主义、极端主义，宣扬民族仇恨、民族歧视，传播暴力、淫秽色情信息，编造、传播虚假信息扰乱经济秩序和社会秩序，以及侵害他人名誉、隐私、知识产权和其他合法权益等活动。</p><p>第二十七条　任何个人和组织不得从事非法侵入他人网络、干扰他人网络正常功能、窃取网络数据等危害网络安全的活动；不得提供专门用于从事侵入网络、干扰网络正常功能及防护措施、窃取网络数据等危害网络安全活动的程序、工具；明知他人从事危害网络安全的活动的，不得为其提供技术支持、广告推广、支付结算等帮助。</p><p>第四十四条　任何个人和组织不得窃取或者以其他非法方式获取个人信息，不得非法出售或者非法向他人提供个人信息。</p><p>第四十六条　任何个人和组织应当对其使用网络的行为负责，不得设立用于实施诈骗，传授犯罪方法，制作或者销售违禁物品、管制物品等违法犯罪活动的网站、通讯群组，不得利用网络发布涉及实施诈骗，制作或者销售违禁物品、管制物品以及其他违法犯罪活动的信息。</p><p>第四十八条　任何个人和组织发送的电子信息、提供的应用软件，不得设置恶意程序，不得含有法律、行政法规禁止发布或者传输的信息。</p><p>第七十六条　本法下列用语的含义：</p><p>（五）个人信息，是指以电子或者其他方式记录的能够单独或者与其他信息结合识别自然人个人身份的各种信息，包括但不限于自然人的姓名、出生日期、身份证件号码、个人生物识别信息、住址、电话号码等。</p></blockquote><p>与本课程息息相关的就是第 27 条规定，希望你能牢记：<strong>主动或协助他人入侵、提供黑客工具、发送恶意程序等行为都属于违法行为</strong>。</p><h3 id="刑法" tabindex="-1">刑法 <a class="header-anchor" href="#刑法" aria-label="Permalink to &quot;刑法&quot;">​</a></h3><p>《刑法》第 285 条和第 286 条中，分别规定了非法入侵计算机信息系统罪和破坏计算机信息系统罪：</p><blockquote><p>第二百八十五条　违反国家规定，侵入国家事务、国防建设、尖端科学技术领域的计算机信息系统的，处三年以下有期徒刑或者拘役。</p><p>第二百八十六条　违反国家规定，对计算机信息系统功能进行删除、修改、增加、干扰，造成计算机信息系统不能正常运行，后果严重的，处五年以下有期徒刑或者拘役；后果特别严重的，处五年以上有期徒刑。</p><p>违反国家规定，对计算机信息系统中存储、处理或者传输的数据和应用程序进行删除、修改、增加的操作，后果严重的，依照前款的规定处罚。</p><p>故意制作、传播计算机病毒等破坏性程序，影响计算机系统正常运行，后果严重的，依照第一款的规定处罚。</p></blockquote><p>最高人民法院最高人民检察院也对此作出了相关的解释，视具有以下情形之一的，就会被认定为&quot;情节严重&quot;：</p><blockquote><p>（一）获取支付结算、证券交易、期货交易等网络金融服务的身份认证信息十组以上的；</p><p>（二）获取第（一）项以外的身份认证信息五百组以上的；</p><p>（三）非法控制计算机信息系统二十台以上的；</p><p>（四）违法所得五千元以上或者造成经济损失一万元以上的；</p><p>（五）其他情节严重的情形。</p></blockquote><p>看上面的量化数据，&quot;情节严重&quot;还是很容易达到的，尤其是 SQL 注入（在第 06、07 讲时会涉及），用 sqlmap 一测试，不小心就可能获取 500 组身份认证信息了。</p><p>这种在未授权的情况下进行的渗透测试很容易违反上述法律规定，那么我们如何合法地进行渗透测试呢？这自然是要先拿到授权，而且必须是网站所有者的官方书面授权，并盖有公章的。授权里要明确测试范围，比如域名，要注明测试时间段，以及要把具体的渗透测试方案同步给客户，在客户同意后再进行测试。</p><h3 id="测试与入侵" tabindex="-1">测试与入侵 <a class="header-anchor" href="#测试与入侵" aria-label="Permalink to &quot;测试与入侵&quot;">​</a></h3><p>现在很多企业都有自己的 SRC（安全响应中心）平台，都有公开的漏洞奖励计划，允许大家对其产品进行安全测试。也有一些第三方众测平台，招集优秀的白帽子进行安全测试，这种一般可以理解为授权，但也不是绝对的，主要还是得明确测试与入侵的区别。</p><p>测试与入侵的区别可以参考以下几点：</p><ol><li><p>是否窃取业务数据；</p></li><li><p>是否破坏业务的正常运营，特别是造没造成实际的经济损失；</p></li><li><p>是否恶意留取后门；</p></li><li><p>是否未经授权，对国家事务、国防建设、尖端科学技术领域的计算机信息系统进行测试。</p></li></ol><p>不过，我想说的是，这里更关键的是看企业的态度，如果企业真的追究起来，一般都是一告一个准，哪怕你第一时间报到 SRC 或第三方平台上了，比如著名的&quot;袁炜事件&quot;。</p><h3 id="袁炜事件" tabindex="-1">&quot;袁炜事件&quot; <a class="header-anchor" href="#袁炜事件" aria-label="Permalink to &quot;&quot;袁炜事件&quot;&quot;">​</a></h3><p>2016 年的&quot;袁炜事件&quot;就是一个醒目的案例，当事人袁炜发现了&quot;世纪佳缘&quot;网站的漏洞，并将漏洞提交到第三方漏洞报告平台&quot;乌云&quot;上，&quot;世纪佳缘&quot;先是确认并修复了漏洞，并对乌云和袁炜进行致谢。不过随后，&quot;世纪佳缘&quot;以&quot;网站数据被非法窃取&quot;为由报警，警方经调查拘留了袁炜。</p><p>据袁炜父亲写的公开信所说，袁炜使用 sqlmap 利用 SQL 注入漏洞获取了&quot;世纪佳缘&quot;的网站数据 932 条实名信息。而袁炜也正是因为这才被抓的。</p><p>一般情况下，企业安全人员与业务人员是两批人，如果业务人员直接借助法务起诉白帽子，安全人员想拦也拦不住，白帽子基本是要遭罪的。虽然 SRC 和众测平台有邀请测试的公开声明，但一旦涉及疑似入侵行为，仍可报警抓人。</p><h3 id="吴永丰事件" tabindex="-1">&quot;吴永丰事件&quot; <a class="header-anchor" href="#吴永丰事件" aria-label="Permalink to &quot;&quot;吴永丰事件&quot;&quot;">​</a></h3><p>另外还有一起发生在我身边的案例。</p><p>今年 7 月，杭州滨江人民法院公开了一份刑事判决书，原苏州紫豹科技有限公司法定代表人吴永丰以盗窃罪被逮捕入狱，最终被判 12 年。这是我微信好友里第 2 个入狱的，希望以后不会再有。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/03/A5/Cip5yF_gTTKAeIr8AAZeupD-vY0247.png" alt="Lark20201221-152217.png"></p><p>事情经过，我直接引用公开的资料：</p><blockquote><p>当时，紫豹科技受江苏警方委托调查诈骗案，调查一个&quot;万鸿彩店&quot;App，该 App 的后台叫&quot;米来了&quot;，由九辰公司管理。</p><p>吴永丰在 2019 年 4 月 20 日下午 15 时至 19 时，利用调查时掌握的运维后台服务器数据，注册了 30 个虚假账户，运行自制转账程序，向九辰公司所管理的第三方支付账户发起转账请求，转账共计 88.47755 万元。</p><p>88 万元中 45 万元用于比特币交易，10 万元转至他人账户后无影无踪，剩余 33 万被通过 ATM 取现、POS 机刷卡等方式提取，用于还款、发放工资、消费等等。</p><p>2019 年 6 月 19 日，作案两个月之后，吴永丰主动投案，在杭州市看守所中，他度过了 25 岁生日。整整一年之后，2020 年 6 月 19 日，吴永丰在法庭上知道了他接下来的命运，有期徒刑十二年。</p></blockquote><p>这是一起由授权的渗透测试转变为入侵犯罪的案例。原本协助警方破案是件好事，但最终还是没能抵住金钱的诱惑，误入歧途，甚为可惜。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>我介绍了一些跟安全相关的法律法规，主要是想提醒你遵纪守法，不要从事黑产犯罪，同时也要保护自己，不要随意测试他人的网站。</p><p>最佳方式的先拿到渗透测试授权书，如果是对 SRC 的相关网站进行测试，记得点到为止，不要破坏，不要拿数据，不要留后门；如果是测试 webshell，测试完及时删除并报告给厂商修复，真正地做到负责任的漏洞披露。如果你是为了漏洞赏金，国外的漏洞报告平台更安全，奖金额度更高，或许是个更好的选择。</p><p>下一个模块，我们将正式进入漏洞攻防的案例，从案例中了解如何防御漏洞。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/03/A5/Cip5yF_gTR-AaFZGAAUXaN1tFUE104.png" alt="Lark20201221-152146.png"></p>',34),r=[l];function u(i,s,_,q,n,c){return t(),o("div",null,r)}const b=p(e,[["render",u]]);export{d as __pageData,b as default};

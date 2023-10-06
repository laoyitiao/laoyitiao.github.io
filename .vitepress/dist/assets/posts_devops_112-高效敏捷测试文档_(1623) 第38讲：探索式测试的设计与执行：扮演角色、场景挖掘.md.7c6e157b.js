import{_ as p,j as s,o as l,g as a,k as t,s as e,h as _,Q as n}from"./chunks/framework.b3d8e22e.js";const x=JSON.parse('{"title":"批判性思维与探索式测试设计/执行 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1623) 第38讲：探索式测试的设计与执行：扮演角色、场景挖掘.md","filePath":"posts/devops/112-高效敏捷测试文档/(1623) 第38讲：探索式测试的设计与执行：扮演角色、场景挖掘.md","lastUpdated":1696417798000}'),i={name:"posts/devops/112-高效敏捷测试文档/(1623) 第38讲：探索式测试的设计与执行：扮演角色、场景挖掘.md"},c=e("p",null,"对于探索式测试，前面已经讲过其概念，以及采用 SBTM 对探索式测试进行有效的管理。这一讲将讲解如何针对 SBTM 中特定的一个 Session 执行探索式测试，重点是在探索式测试中如何运用批判性思维，并借助用户角色扮演、场景挖掘等进行更深入的测试，发现更多的缺陷。",-1),r=e("h4",{id:"批判性思维与探索式测试设计-执行",tabindex:"-1"},[_("批判性思维与探索式测试设计/执行 "),e("a",{class:"header-anchor",href:"#批判性思维与探索式测试设计-执行","aria-label":'Permalink to "批判性思维与探索式测试设计/执行"'},"​")],-1),d=e("p",null,'"批判"这个词有批驳、否定的含义，在写这一讲内容的时候，我想了解大家会不会受到字面意思的误导，于是做了一个小小的调查，5 位调查对象来自 IT 公司里不同的工作岗位，我请他们按照自己的理解快速地告诉我 "什么是批判性思维"。其中有 4 个人的回答中包含"挑刺"或者"挑毛病"这样的词；有 2 个人分别用了"有攻击性"和"容易得罪人"等词汇。在讲解批判性思维之前，我也想请你想一想，你认为 "什么是批判性思维"？',-1),h=e("p",null,"随后我把表 1 发给了那 5 位朋友，其中有 3 位看完后表示这和他们平时对批判性思维的认知不太一样。表 1 总结了批判性思考者和非批判性思考者的区别，这些内容来自《超越感觉------批判性思考指南》这本书。现在你也可以看看，和你的理解是不是一致呢？",-1),u=e("p",null,"表1 批判性思考者与非批判性思考者的比较",-1),A=e("p",null,"很明显，批判性思维不等于挑刺，也不带有攻击性，相反，具有批判性思维的人更加理性、更加开放、尊重事实、不走极端。至于是不是容易得罪人，这就要看个人的沟通技巧还有交谈的对象是不是一个批判性思考者。批判性思维是每个人都应该具备的思维方式和思维能力，对各种信息以事实为依据进行分析和推理，审慎地做出判断。当然，每个人在培养自己批判性思维能力的同时，也要提高自己的综合素质，包括协作和沟通的能力。",-1),m=n('<p>对于想拥有批判性思维的人来说，要培养的最重要技巧就是<strong>善于提问</strong>，也就是能不能问到点子上。探索式测试的核心（出发点）就是质疑系统，不断深入系统的每一个业务入口、应用场景、业务操作和数据输出等进行质疑，质疑某个地方存在某类缺陷：开发人员对需求的误解、需求的遗漏、错误的代码实现、数据输入缺乏保护......等等。</p><p>因此，批判性思维特别适合探索式测试。测试人员不断地向系统提出问题（质疑系统），然后审视系统所做出的回答（系统的响应），从而根据启发式的 Test Oracle 做出判断：系统的响应是否符合我们的期望。测试人员的每一次操作，都是向被测试系统提出一个问题，输出结果就是被测系统给出的回答。对系统返回的结果进行分析、评估，然后决定下面的操作和输入。就这样不断地变换操作，每一步的操作都是环环相扣，直到你确信整个操作过程都符合预期结果，或者直到你发现了一个疑点，然后再针对这个疑点展开调查、分析和取证，也就是进行缺陷定位。</p><h4 id="角色扮演" tabindex="-1">角色扮演 <a class="header-anchor" href="#角色扮演" aria-label="Permalink to &quot;角色扮演&quot;">​</a></h4><p>探索式测试特别适合采用基于场景的测试方法，测试人员设计出需要扮演的用户角色。设想用户角色在使用产品时会遇到哪些典型的应用场景，然后在测试中轮流扮演这些用户角色，覆盖典型的用户场景，并根据具体测试情况不断挖掘新的场景。</p><p>用户角色的创建不是由测试人员凭空想象出来的。用户角色（Persona）的概念最早是由 Alan Cooper 在《赢在客户》这本书里提出来的，书里提到：&quot;一个人物角色就是一个关于用户的故事------或者，更准确地说，一个代表大多数用户目标、行为和观点的原型&quot;。Mike Cohn 在《用户故事与敏捷方法》中介绍了在定义用户故事之前敏捷团队需要为用户角色建模。</p><p>这说明在需求阶段，测试人员就应该已经参与到用户角色的创建，但这并不是为产品创建用户角色的起点。一个产品不可能满足所有用户的需求，因此，公司需要通过市场调研，提炼出典型用户的需求和个人特征，然后把用户塑造成真实可信的具体人物，每一个用户角色代表一类典型用户。为了让用户角色逼真，还会给每个典型用户起名字，描述年龄、性格、职业，并且贴上照片，总之越逼真越好。通常这是产品经理们进行产品定义、需求分析的第一步。敏捷团队在为用户故事创建角色时理应参考上述用户角色。</p><p>测试人员参考这些已经创建的用户角色来设计在探索式测试中需要扮演的角色。比如，可以为一个在线教育 App 设计下面两个用户角色：</p><blockquote><p>Leo：男，25 岁，一名刚从大学计算机系毕业的软件工程师，性格内向，结交的朋友都是和他一样的 IT 工程师。Leo 刚刚加入一家互联网企业，有很强的求知欲，热衷于学习各种先进的 IT 技术。每天上下班都坐地铁，在路上要花费两个半小时，期间通过 App 上的音频或视频进行学习，希望能了解技术细节，对课程每一讲的时间没有要求。 Nancy：女，31 岁，一名有 8 年工作经验的研发部门经理，性格开朗，喜欢在朋友圈分享专业知识和心得体会。平时开车上下班，经常早出晚归，避开上下班高峰，每天花在路上的时间是 40 分钟。她崇尚学习型团队的构建，经常给团队寻找一些培训资源。她希望自己的团队能够系统的学习软件开发技术，并且逐渐提高自己的综合素质，比如沟通技巧、思维方式等。在上下班路上会收听音频课程，但也常常在办公电脑上浏览课程的文字内容。</p></blockquote><p>另外，你是不是也可以想象出一些极端人物，这样常常会想起一些正常情况下测不到的场景。比如下面这个：</p><blockquote><p>Tom：一名 IT 部门工程师，热衷于免费获得盗版出版物，比如电影、书籍。看到喜欢的内容会转发给同事或朋友，哪怕这是侵权行为。</p></blockquote><h4 id="场景挖掘" tabindex="-1">场景挖掘 <a class="header-anchor" href="#场景挖掘" aria-label="Permalink to &quot;场景挖掘&quot;">​</a></h4><p>确定了要扮演的角色，接下来测试人员就要把自己代入这个角色，想象这个角色会遇到哪些场景，会发生哪些故事。这时候就需要测试人员充分利用发散性思维像编写剧本一样，去讲述一个个测试故事。当我们发现 Bug 时，故事进入高潮，开始围绕缺陷进行分析，直到能够定位缺陷。</p><p>下面我就开始为 IT 职场新人 Leo 编写一个测试故事：</p><blockquote><p>周一的早上，Leo 正在乘坐地铁赶往公司，他今天想开始学习一门关于大数据的课程，于是打开在线教育 App 进行搜索，找到了几门相关的课程。他一一试看之后选中了其中一个课程，要付款的时候突然想起来前两天有个朋友在朋友圈里分享过这门课。于是他找到了朋友分享的课程海报，通过二维码购买了课程。然后就可以带上耳机开始听课了，当听到第 3 讲时发现对一个技术点不太明白，于是他按了暂停键，在这一讲的下面给讲师留言问了一个问题，并希望能尽快得到讲师的答复。这时候该下车了，他决定等下班的时候再继续学习。因为这个课程不错，所以他也生成了自己的海报，并把它分享到了朋友圈。</p></blockquote><p>在这个测试故事里，至少可以覆盖下面的测试点：</p><ul><li>在手机 App 里搜索课程</li><li>课程试看</li><li>通过分享海报购买课程</li><li>戴着耳机通过音频+视频进行课程学习</li><li>课程留言</li><li>生成自己的海报并分享</li></ul><p>对于上面每一个测试点，还可以继续挖掘更加具体的测试场景，如图 2 所示，相当于 Leo 的测试故事的第二层场景（更具体的测试点）。</p>',17),g=e("p",null,"对于第二个场景的每个测试点，还可以继续挖掘出第三层场景，这里只举一个例子，在第 4 个测试点中的场景提到 Leo 发现手机电量不多了。那么这个场景如果继续挖掘的话，第三层的场景可以这样描述：",-1),q=e("blockquote",null,[e("p",null,'Leo 担心手机电量支撑不到公司，于是他把 App 放到后台运行，一边听课，一边进入手机"设置"中的电池管理，并进行了"一键省电"操作，关闭了正在运行的其他 App，设置成"省电模式"，然后回到 App 继续听课。过了一会儿，手机提示电量不足 10% 了，于是他暂停听课，让 App 后台运行，再次进入电池管理，设置成"超级省电模式"，然后回到 App 继续听课。')],-1),T=e("p",null,"到这里想必你已经理解了引入角色扮演和进行场景挖掘是多么的必要。如果测试人员能把自己真正代入一个具体的角色，他/她就会替这个用户想象出各种场景，这还不包括在测试中根据测试情况随时调整测试思路，即兴发挥挖掘出的更多场景。",-1),k=e("p",null,"对于热衷盗版的 Tom，我会想到他是不是会试图复制课程文字内容分享出去。如果 App 还没有阻止内容复制的功能，这很可能是一个新的产品需求，而且优先级应该比较高。",-1),b=e("p",null,"今天这一讲的内容到这里就结束了。这一讲重点讲解了如何在探索式测试中进行角色扮演以及场景挖掘，另外还讲解了批判性思维。",-1),I=e("p",null,"最后留个思考题给你：你可以为 Nancy 讲一个属于她的测试故事吗？",-1);function f(C,N,S,D,L,M){const o=s("Image");return l(),a("div",null,[c,r,d,h,u,t(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/0D/47/Ciqc1F7DqGuAOpiIAAEqhzSneFg268.png"}),A,t(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/0D/53/CgqCHl7DqHeAAtzdAALd2AjFGiM003.png"}),m,t(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/0D/53/CgqCHl7DqIeANrIMAAGQl09Cl4Y405.png"}),g,q,T,k,b,I])}const v=p(i,[["render",f]]);export{x as __pageData,v as default};

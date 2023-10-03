import{_ as p,o as t,g as o,Q as r}from"./chunks/framework.f949202b.js";const d=JSON.parse('{"title":"什么是高效编程？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6867) 06  迭代思维：如何高效编程？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6867) 06  迭代思维：如何高效编程？.md","lastUpdated":null}'),a={name:"posts/backEnd/趣学设计模式_文档/(6867) 06  迭代思维：如何高效编程？.md"},s=r('<p>在编程的路上，你是不是曾有过这样的经历：虽然学会一门编程语言后会写代码了，但是有时写出的代码可能并没有想象的那么好。比如：</p><ul><li><p>你的代码只要没有经过测试，发布上线后总是会频繁发生故障；</p></li><li><p>每次你修改完代码后，程序总会出现各种意外问题；</p></li><li><p>当别人读完你的代码后，会说&quot;逻辑太复杂&quot;&quot;代码看不懂&quot;&quot;代码不够简洁&quot;之类的话；</p></li><li><p>每隔一段时间后你看自己写的代码，发现不仅可读性差，而且很多逻辑连自己也看不懂了；</p></li><li><p>你接手了离职同事留下的代码，却因为文档和注释太少，花了很长时间才看懂代码中的关键逻辑；</p></li><li><p>你想在代码中新增功能，却不知道该先改动哪里，不知道改动的影响范围有多大。</p></li></ul><p>后来你手头上必须完成的工作任务越积越多，编程的效率变得越来越低，甚至有时还会影响到项目交付。</p><p>那为什么你的编程效率不高呢？这是因为你把<strong>提升编程效率</strong> 等同于<strong>提升编码速度</strong>了。如果你想成为一名真正的高效编程者，除了代码写得快以外，还得学会一些其他的方法和技巧。</p><p>因此，今天我们就来聊聊高效编程中的那些关键技巧。</p><h3 id="什么是高效编程" tabindex="-1">什么是高效编程？ <a class="header-anchor" href="#什么是高效编程" aria-label="Permalink to &quot;什么是高效编程？&quot;">​</a></h3><p>这里我先分享一个我的故事。刚学会编程时，我以为：高效编程 = 高效写代码。于是开启了疯狂写代码模式，在不停地编码与调试中，度过了一年又一年，并以此沾沾自喜。但这样坚持了很多年后，却慢慢发现自己的编程效率不仅没有提高，反而越来越慢。</p><p>这时我意识到，整体编程效率之所以无法提升，是因为我一直都只是关注写代码的效率。这便带来三个问题：</p><ul><li><p>只关心代码是否正常运行，而对最终是否满足用户需求不在意；</p></li><li><p>容易陷入代码细节而忽略整体，比如，系统设计、项目进度、与他人协作等；</p></li><li><p>不太关心可测试性、可维护性，以及简洁的高质量代码该怎么写。</p></li></ul><p>简言之，正是因为太过于关注写代码，让我忘记了很多其他重要的事。比如，项目移交后，代码可能会被别人维护，代码是否容易测试，代码是否健壮，等等。</p><p>当从更广的维度去审视写代码这件事时，<strong>写代码的效率只是整体编程效率的一部分</strong>，若只是盯着这一部分去提升或优化，很可能会顾此失彼，最后像我一样整体效率压根没有提高过。</p><p>所以说，高效编程除了需要提升细节上的编程效率外，还需要你能时常跳出细节思维，从整体的工作流程上去思考与改进。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/27/70/Cgp9HWBcVoWAdodcAAXwzk72fVw266.png" alt="Drawing 0.png"></p><p>这样总结来说，<strong>高效编程其实是一种高效的工作流。</strong></p><h3 id="如何高效编程" tabindex="-1">如何高效编程？ <a class="header-anchor" href="#如何高效编程" aria-label="Permalink to &quot;如何高效编程？&quot;">​</a></h3><p>高效编程应该具备下面五个要素：</p><blockquote><p>高效编程 = 原则 * 工具 * 编码 * 反馈 * 迭代</p></blockquote><p>合理运用这些要素，才能真正地提升高效编程能力。这种能力，一方面来自编程的实践积累，另一方面也来自各种技巧的合理使用。</p><h4 id="_1-建立原则" tabindex="-1">1. 建立原则 <a class="header-anchor" href="#_1-建立原则" aria-label="Permalink to &quot;1. 建立原则&quot;">​</a></h4><p>建立原则是高效编程的第一步。</p><p>为什么建立原则很重要？<strong>因为原则能让在你编程时，不会轻易遗忘一些重要的事情</strong>，比如，项目进度、代码质量、会议效率等。</p><p>在过去编程实践中，我踩过很多坑，这里我为你总结了三条有效原则。</p><p><strong>第一条原则：问题到你为止</strong>。你一定遇见过这样的情形，当你发现某人的模块功能出现问题时，你去咨询对方，对方却对你不理不睬，然后回复一句：去找 XXX，这不是我的问题。从你的角度来看，你遇见了问题只是想要咨询与讨论，但是对方给你的感觉却像是在推卸责任。</p><p>千万记住，<strong>无论是不是你的问题，你都应该尝试去终结这个问题。</strong></p><p>因为这样做不仅能让你规避推卸责任的思维习惯，还能让你提升解决问题的实力。比如，不是你的问题，你会尝试和对方一起找到这个问题的来源；是你的问题，你会思考下一次应该怎么做才能不再出现类似的问题。</p><p>最后，你会发现越是经常这样做，你在别人心中的分量就会越重，因为问题一到你这里就终止了。</p><p><strong>第二条原则：多读、多写代码</strong>。编程是一门重视实践的技术，你不写代码就一定不能提升对代码细节的感受力。</p><p>提升代码的感受力是提升编程效率的一种途径，有两个办法。</p><ul><li><p><strong>方法一：多读别人的代码</strong>。无论是优秀的开源框架的源代码，还是通篇 if-else 的无注释业务代码，你都应该多读，通过多读才能发现什么是优秀代码，什么是烂代码。</p></li><li><p><strong>方法二：多写自己的代码</strong>。编程犹如跑马拉松，需要付出很多汗水真实地训练，才有可能完成一次比赛。不要被一些原理讲解所误导，原理学习很重要，但是真实的编码同样重要，因为代码从编写到调试再到运行、发布、部署，会出现很多复杂的问题，解决这些问题同样对提升编程效率有很大的帮助。</p></li></ul><p><strong>第三条原则：打破砂锅问到底</strong>。其实，任何时候，对于问题都要有&quot;打破砂锅问到底&quot;的精神。</p><p>具体提问的技巧，可以采用 5WHY 法。例如：</p><blockquote><p>Q：你在做什么？</p><p>A：解决一个 Bug。</p><p>Q：你为什么要解决这个 Bug？</p><p>A：测试提了一个 Bug。</p><p>Q：为什么测试会提这个 Bug？</p><p>A：测试认为这是一个 Bug。</p><p>Q：为什么测试会这么认为？</p><p>A：......</p></blockquote><p>你发现没有，当你不断提问的时候，也是发现问题本质的一个过程。而<strong>解决编程上的本质问题越多，越能反过来提升编程上的效率。</strong></p><h4 id="_2-打磨工具" tabindex="-1">2. 打磨工具 <a class="header-anchor" href="#_2-打磨工具" aria-label="Permalink to &quot;2. 打磨工具&quot;">​</a></h4><p>除了 IDE 编程工具和编程语言环境的使用外，要想提升编程效率，你应该还需要一个<strong>组件实验环境</strong> 和一个<strong>工具代码库</strong>。</p><p>从 IDE 的安装、多种编程语言包到 Git 等基础工具的配置，作为一个编程者，你一定非常熟悉了。但是，在编程过程中，除了写代码外，你还需要大量地阅读代码和实验新工具，比如，开源的数据库、MQ、缓存组件等。</p><p>为什么这么说呢？</p><p>当你在平时任务非常繁重的情况下，如果没有一个可以立即实验操作的环境，那么你就很容易因为一点点麻烦而放弃新的尝试。而这背后其实隐藏了一个本质问题：长期做事时缺乏提前准备的习惯。</p><p>编程效率看上去是当前的某种执行效率，但是如果长期都没有提前准备的习惯，那么效率就会变得越来越低，因为你很可能一直都在做低效重复的事情，一直没有新的突破。比如，工作十年使用的是第一年就学会的技能方法。</p><p>所以，你平时如果有空闲时，<strong>应该多尝试搭建一下新组件的实验环境，一方面可以熟悉组件特性，另一方面是培养你编程上多准备的习惯</strong>。</p><p>至于工具代码库，虽然现在网络上确实有很多很好用的工具库，但是我依然强烈建议你要试着<strong>建一个自己的工具库</strong>。这个工具库存储的可以是你工作中常用的自动化测试脚本、一段简练的代码片段、对某个工具的二次或三次封装等。</p><p>更重要的是，在这个过程中，<strong>通过对工具的打磨，你能找到一些不变的代码特性，学习到优秀的代码设计应该怎么做</strong>。</p><p>这样随着时间的推移，你的编程效率会随着工具效率的提升而变得更高。</p><h4 id="_3-实践编码" tabindex="-1">3. 实践编码 <a class="header-anchor" href="#_3-实践编码" aria-label="Permalink to &quot;3. 实践编码&quot;">​</a></h4><p>高效编程是一个不断实践的过程，虽然写代码不是全部，但不写代码就不是编程。</p><p>&quot;高效&quot;的反面是&quot;低效&quot;，低效编程有如下三大特征。</p><p><strong>第一个，靠运气编码</strong>。也就是我们通常所说的复制粘贴编码，或面向搜索编码。</p><p>这样的编码会造成思考停滞，虽说会让你在未来的几年里沉浸在每天敲代码的喜悦里，从短期看似乎是在高效编程，但把目光放长远点，这是典型的长期低效编程，一直在原地踏步。</p><p>为什么说不要靠运气编码？因为运气有时靠不住。你应该不断积累你的编程实力，最后用实力来解决编程问题。</p><p><strong>第二个，重复硬编码</strong>。我经常对身边的人说，我不反对硬编码，但我反对很多次重复硬编码。</p><p>因为硬编码有时是无奈的做法，比如，领导立即要一个都还没有上线的数据做报告，或者立即就要演示一个 Demo，特性都是紧急，甚至有可能做完了以后再也不会用到。</p><p>如果你一直这样重复硬编码，带来的后果会很严重，不仅会把系统搞崩，还会让维护代码的其他人非常痛苦。更重要的是，你会忘记了真正的高效是抽象、封装和复用，最后被更多的编码任务压垮。</p><p><strong>第三个，写 PPT，开会</strong>。这个就比较好理解了，但是估计你会经常遇到或者曾经头疼过。</p><p>PPT 可以作为总结时的有效材料，但是编程不是写 PPT，PPT 写得多，编码时间自然剩得少。提升编程能力，必须要多写代码，才能发现更多问题，然后再去总结归纳、写 PPT。千万不能本末倒置。</p><p>至于开会，本意是为了与更多的人沟通、对齐一致，但是开很多无效的会，会耽误提升编程效率，毕竟编程需要思考时间，同时还需要编写、调试、测试时间。</p><p>在实践编码这一步，如何做到高效编程呢？你应该已经想到了，那就是要避免低效编程，避免以上做法。</p><h4 id="_4-及时反馈" tabindex="-1">4. 及时反馈 <a class="header-anchor" href="#_4-及时反馈" aria-label="Permalink to &quot;4. 及时反馈&quot;">​</a></h4><p>编程时只写代码是不够的，想要获得更高的效率，还要学会及时反馈遇见的问题。</p><p>你可能认为，编程时需要更多的思考时间，即便遇见问题只要自己能解决就行，与人沟通会浪费编程的时间。</p><p>沟通的确会在某种程度上降低写代码的效率，但是它会在另外的地方补足：<strong>团队效率</strong>。</p><p>你应该知道，现代大型软件产品的开发工作都是团队合作编程，很少有一个人单独完成的。（当然，也有大神人物独立完成的产品，但毕竟是少数。）</p><p>如果你开发完了自己的模块，却不及时反馈给团队其他成员，那么极大的可能是，团队其他成员也在等待着你的模块，你们相互等待，这样整体效率其实很低。</p><p>当你及时反馈问题时，团队成员也能通过你的进度来及时调整他们的计划，团队整体的协作效率无形中便提高了。另一方面，在编码过程中你不断与他人沟通，不仅能让对方更容易理解你的代码，也能及时发现一些低级错误，降低 Bug 的修复成本。</p><p>这也是为什么很多开发团队都会要求每日站立早会和平时多沟通的原因，就是为了及时地让大家做反馈，在开发早期就能发现并解决问题。</p><p>其实，不管团队有没有要求，你都应该更进一步地要求自己时常这样做，这会给你带来真正的效率提升。</p><h4 id="_5-迭代更新" tabindex="-1">5. 迭代更新 <a class="header-anchor" href="#_5-迭代更新" aria-label="Permalink to &quot;5. 迭代更新&quot;">​</a></h4><p>什么是迭代？简单来说，每一次对过程的重复就被称为一次&quot;迭代&quot;，而每一次迭代得到的结果会被用来作为下一次迭代的初始值。迭代有如下三个关键特征。</p><ul><li><p><strong>每一个迭代都应该有输入、处理和输出</strong>。比如，你在负责设计某个数据中台的数据清洗服务中的一次功能优化时，输入可能是各种新的异构类型的数据，处理是做数据的过滤与保存，输出的是某种规范的结构化数据。这就是我们通常说的一次功能迭代。</p></li><li><p><strong>记录版本</strong>。每一个迭代通常又叫一个版本。为什么要记录版本？因为版本要作为一个历史记录被反复查看。</p></li><li><p><strong>不断更新</strong>。当你有了版本和迭代输出，一个迭代才能被更新，也就是在既有版本下对输入、处理、输出的整体优化。</p></li></ul><p>编程本身就是一个重复的过程，你可能经常在用迭代，不过可能会在无意间忽略了迭代的关键点------记录版本。</p><p>当你在编程时，会面临一个问题：每一次的代码修改都会或多或少覆盖原有的代码，久而久之，代码可能是最新的，功能看上去也是最全的，但你想要回顾时，却发现历史版本太难寻找，比如，一直使用 1.0-SNAPSHOT 的版本号。</p><p>如果没有历史版本，你会很快忘记过去开发过哪些功能、没开发过哪些功能，虽然功能不断在迭代前进，但一年后你几乎就会忘记你曾经做过什么。</p><p>正确的做法是：<strong>记录版本并且记录每一次关键修改信息。</strong></p><p>记录版本很容易理解，可以使用语义版本规范（主版本.次版本.修订号）或者时间版本（20200111.fix）等。</p><p><strong>更重要的是记录每一次关键修改信息，这是下一次迭代更新的输入。</strong> 这样做的好处在于，当你修改一个功能时，你能清楚地知道你新增或修改了哪些功能，而功能实现的背后其实是你如何实现这个功能的思路。</p><p>比如说，你开发了一个上传功能，在 V1.0 版本只支持 .pdf 格式，在 V2.0 版本时你希望支持 .doc 和 .xlsx 格式，如果只是记录版本号，你最多是大概知道功能有什么变化，但如果你记录的是：</p><blockquote><p>V1.0.0，支持 .pdf 格式【实现：封装三方库 iText 】【0.5 天】【遇见 XXX 问题】【2020-01-11】</p><p>V2.0.0，计划支持 .doc 和 .xlsx 格式【实现：封装三方库 easyexcel】【1 天】</p></blockquote><p>这样的关键信息，可以不断扩充（甚至可以是一篇文档），成为你编码结束后的一次简单总结。不要小看这次总结，在时间过去很久后，再看时你会发现，原来过去你写代码时是这样想的，用时居然这么久，而且还用了很老旧的库，等等。</p><p>最重要的是，<strong>你过去的经验没有被浪费，你能从信息中获得思考，更能减少重复犯低级错误的概率</strong>。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>如果你时常把编程干成这样：编程 = 写代码 + 写代码 + 写代码......那么你一定要及时停下来想想，编程到底意味着什么。</p><p><strong>编程 ≠ 写代码。</strong> 不要把你的有效时间，浪费在只写代码上，这样你的编程能力甚至个人成长都会变慢。</p><p>编程不是一个体力活，编程应该是一个综合的脑力活：<strong>编程 = 写代码 + 讨论 + 学习 + 反思</strong>。</p><p><img src="https://s0.lgstatic.com/i/image6/M00/27/6D/CioPOWBcVruAT4nCAAXgreBJvfE432.png" alt="Drawing 1.png"></p><p>你在学习编程知识和编程技巧的同时，应该多和同事讨论编程，从项目中积累更多实践的经验，不断应用到下一次的编程中去。</p><p>每一次的编码实践都是你提升效率的好机会，更别忘记及时反馈你遇到的问题，或者主动与他人分享你的实践想法。</p><p>只有当你把编码变成一次又一次的迭代，才能从短期的高效编程变成真正的长期高效编程。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>假如让你在实际工作中教他人如何高效编程，你会怎么教？哪些办法给你留下过深刻的印象？哪些坏习惯会影响编程的效率？</p><p>欢迎留言分享你的答案，我会第一时间给你回复。</p><p>到此，我们模块一的重要知识点就学习完了。从下一模块开始，我会带你一起从设计原则的细节中去发现更多关于编程的方法和技巧，记得按时来听课！</p>',90),n=[s];function e(l,i,g,u,c,_){return t(),o("div",null,n)}const q=p(a,[["render",e]]);export{d as __pageData,q as default};

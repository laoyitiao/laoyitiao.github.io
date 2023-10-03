import{_ as p,o as t,g as D,Q as o}from"./chunks/framework.f949202b.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1627) 第42讲：单元测试必须 TDD 吗？.md","filePath":"posts/devops/112-高效敏捷测试文档/(1627) 第42讲：单元测试必须 TDD 吗？.md","lastUpdated":null}'),e={name:"posts/devops/112-高效敏捷测试文档/(1627) 第42讲：单元测试必须 TDD 吗？.md"},l=o('<p>单元测试必须 TDD（等同于第 20 讲中提到的 UTDD）吗？这个问题的答案很简单，回答&quot;No&quot;就可以。通过本专栏前面课程的学习，咱们已经被&quot;上下文驱动思维&quot;武装起来了，认定不会只存在一种情况，而是根据上下文（比如所处的行业、产品特点、团队能力等）有不同的选择，即使在众多互联网公司中间，其单元测试也是参差不齐。所以，你既可以按 TDD 方式进行，也可以按普通的方式进行，即先写一个产品代码类，然后再写一个测试类。但有一点需要强调，无论是哪一种方式，单元测试都要尽早做、持续做，编程和单元测试相当于一对双胞胎，形影不离。</p><p>但也有守护敏捷开发模式的铁杆人士，会认为 TDD、持续集成是敏捷开发的内核、核心实践，必须推行 TDD，虽然我更强调，要做好敏捷开发，ATDD 则是必需的。</p><p>如果没有 TDD，自然就处于 996 工作模式，干的苦但效果还不好，常常像网络上人们所抱怨的如下情景：</p><blockquote><p>需求分析，还没理解清楚，就开始写代码；</p><p>结果，代码写了一半写不下去了，因为需求细节不明确，</p><p>只好去跟业务人员确认；</p><p>沟通好几次，终于写完这个单元的代码；</p><p>然后编译...准备跑程序来做测试，结果跑不起来，只好调试；</p><p>调试也没有那么容易，调试好久，终于可以运行了；</p><p>提测，即交付给测试，结果 QA 测出一批 bug；</p><p>开发只好 debug、改代码，debug、改代码......再提测;</p><p>几个来回，终于，代码可以工作了。</p><p>过一段时间，换一个程序员，再看这些代码，烂得一塌糊涂，不敢动；</p><p>但又不得不动，结果引起大量的回归缺陷，测试只好加班，还夹带着抱怨...</p><p>开发的日子就这样日复一日、年复一年。</p></blockquote><p><strong>为何 TDD 是必需的？</strong> 说 TDD 是必需的，也有很强的理由，主要有以下几点。</p><p>质量是构建的，一次把事情做对，效率是最高的。正如美国质量大师克劳士比极力推崇零缺陷质量管理，为此写了一本《质量免费》，也就是纠正人们错误的观点------要想获得更高质量，就需要付出更高的代价。如果第一次把事情做对，这时效率是最高的，成本也是最低的。在代码层次推行 TDD，先写测试代码，再写产品代码，一方面会逼着开发人员把需求搞清楚、澄清需求细节，而不是像前面所说，没搞清楚就写代码，写了一半就写不下去了；其次，所有写的代码是让测试通过，也就是充分的保证第一次把代码写对。这样，真正推行了 &quot;<strong>零缺陷<strong><strong>质量</strong></strong>管理</strong>&quot;，研发效率是最高的。</p><p>在《单元测试的艺术》一书中就给了一个案例：开发能力相近的两个团队 A、B，同时开发相近的需求。A 团队进行单元测试，B 团队不做单元测试，虽然 A 团队在编码阶段花费的时间要长一倍，从 7 天增加到 14 天。但是，A 团队在集成、系统测试上却表现得非常好，Bug 数量很少、定位 Bug 很快等。最终，相对 B 团队，A 团队整体交付时间短、缺陷数少。</p><p>单元测试，只能是自己做，不适合交给别人做。开发人员自己做测试，如果先实现产品代码，再进行测试，会有思维障碍和心理障碍。测试的思维会受实现的思维影响，一般都会认为自己的实现是正确的，就像我们平时写文章，有明显的错误自己看不见，其他人一眼就能看出，似乎印证了&quot;当局者迷，旁观者清&quot;；其次，心理障碍是指开发人员对自己的代码不会穷追猛打，发现了一些缺陷，很可能会适可而止。</p><p>我们知道，实际上缺陷越多的地方越有风险，越要进行足够的测试。有一幅漫画生动说明：开发人员测试自己的代码和测试人员测试开发的代码，其场面完全不一样，如图 1 所示。如果是采用 TDD 实践，开发先写测试代码，测试在前，就不存在思维障碍和心理障碍，这样才能更好地保证测试的有效性、充分性，也就更好地确保代码的质量。</p><p><img src="https://s0.lgstatic.com/i/image/M00/13/C1/Ciqc1F7PlySAX5fdABjS4wfl1Hk940.png" alt="image1.png"></p><p>图1 开发测试自己代码和测试人员的测试之对比</p><p>（from <a href="https://hugelol.com/lol/651590%EF%BC%89" target="_blank" rel="noreferrer">https://hugelol.com/lol/651590）</a></p><p>TDD 是测试在前，开发在后，自然也保证了代码的可测试性，而且确保 100% 的测试覆盖率，是最为彻底的单元测试，相当于测试脚本在每个时刻都是就绪的，任何时刻看，单元测试都已经是先于代码完成的，真正能做到持续交付，即真正确保敏捷的终极目标------持续交付的实现。没有 TDD，也就没有真正的持续交付。</p><p>当初在极限编程（eXtreme Programming，XP）提出 TDD，设计 TDD 那样的模式，如图 2 所示，也是考虑&quot;写新代码&quot;和&quot;代码重构&quot;共用一个模型。而在敏捷开发中，开发节奏快，代码经常需要重构，而重构的前提是单元测试的脚本就绪，你才敢大胆地重构、有信心重构。所以从代码重构角度看，TDD 也是必需的。TDD 做得好，重构会持续进行，代码修改一般也不出什么缺陷，即使出 1~2 个 Bug，都是小问题，很容易修改，并及时补上测试代码。代码的坏味道能及时被消除，代码整洁。</p><p><img src="https://s0.lgstatic.com/i/image/M00/13/C2/Ciqc1F7Pl0SAa0-cAACjemjMAWY981.png" alt="image2.png"></p><p>图2 TDD 流程示意图</p><p><strong>如何做好 TDD 呢？</strong> TDD 从根本上改变了开发人员的编程态度，开发人员不能再像过去那样随意写代码，要求写的每行代码都是有效的代码，写完所有的代码就意味着真正完成了编码任务。而在此之前，代码写完了，实际上只完成了一半工作，远没有结束，因为单元测试还没执行，可能会发现许多错误，一旦缺陷比较多，缺陷就比较难以定位与修正。</p><p>那么开发人员如何做好 TDD 呢？ Kent Beck 在极限编程中给实施 TDD 定义了两个简单的规则：</p><ul><li>只有在自动化测试失败时，才应该编写新的业务代码；这一点就是确保编写新的业务代码是在测试的指引下，也是确保了彻底的 TDD，否则今天退让一点，明天再退让一点，最后还是会放弃 TDD；</li><li>应该消除发现的任何重复，使测试代码简单、易于复用，有利于测试维护。</li></ul><p>更为苛刻的规则是三条：</p><ul><li>除非是为了使一个失败的 unit test 通过，否则不允许编写任何产品代码，确保任何产品代码都来自需求；</li><li>在单元测试中，只允许编写刚好能够导致失败的一个测试用例（脚本），确保测试的单一性，容易维护；如果单元测试的颗粒度过大，不仅使测试长时间不能通过，增加开发人员的压力，而且后期测试维护成本过高；</li><li>只允许编写刚好能够使一个失败的 unit test 通过的产品代码，否则产品代码的实现超出当前测试的功能，那么这部分代码就没有测试的保护。</li></ul><p>上述这些规则，使开发人员更为关注业务需求，关注可持续的快速开发，用最快的方式实现一个个产品的小需求（小步快跑）。</p><p>TDD 是逐步构建的，所以单元测试是持续的，每次测试的东西也比较少，发现问题很容易定位，运行很快，可以快速得到反馈。除此之外，测试代码一定要简单，易于阅读和理解，否则就进入死循环，即测试代码还需要测试。</p><p>测试是否容易开展，还取决于被测的对象------组件或具体的产品代码，如将程序组件打磨成高内聚、松耦合的组件，使测试容易进行，即单元测试能够独立执行，而且我们还构建持续集成的开发环境，确保研发环境能够对代码小的变化做出快速的响应。这也就要求用户故事分解到位，之前也提到过用户故事评审标准 INVEST 中的 small------即用户故事要足够的小。</p><p>不过，话说回来，定义这些规则是次要的，更重要的是开发人员能够认可 TDD 的价值，愿意主动地去做 TDD。如果是主动去做，在具体实践中遇到问题，也就会设法解决问题或做出改进。如果是被强制实施 TDD，即被动地去做 TDD，不仅不寻求改进，而且还可能会出现&quot;上有政策、下有对策&quot;的局面。</p><p>概括起来，TDD 带来的收益，主要有：</p><ul><li>TDD 促进高质量代码的开发，从而提高了研发效率，看似在编程之前花了比较多的时间，但在后期维护、重构中省时省力；</li><li>TDD 克服了开发的惯性思维和心理障碍，确保单元测试的有效性；</li><li>TDD 确保了可测试性，并确保单元测试的充分性；</li><li>TDD 缩短了编程反馈循环，单元测试始终就绪，彻底支持持续交付。</li></ul><p>这一讲就讲到这里，最后出一个思考题，TDD 说起来很好，有那么多收益，但现实中，很少有公司能做好 TDD 的，或者说绝大多数的公司都没做。问题是：为什么 TDD 就推不起来呢？最大的障碍是什么？</p>',28),s=[l];function T(i,_,r,a,n,u){return t(),D("div",null,s)}const m=p(e,[["render",T]]);export{c as __pageData,m as default};

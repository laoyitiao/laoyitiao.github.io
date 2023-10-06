import{_ as l,j as s,o as e,g as r,k as a,Q as o,s as t}from"./chunks/framework.b3d8e22e.js";const M=JSON.parse('{"title":"测试金字塔模型 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5099) 06  自动化测试：提高小程序的交付质量.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5099) 06  自动化测试：提高小程序的交付质量.md","lastUpdated":1696417798000}'),i={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5099) 06  自动化测试：提高小程序的交付质量.md"},n=o('<p>你好，我是俊鹏，今天这节课我们来一起学习如何搭建小程序的自动化测试体系。</p><p>我们都知道，测试是任何产品迭代流程中必备的环节之一，它的目的是把控质量，在产品交付给用户之前，早点儿发现、解决质量隐患，保障产品的高可用性。<strong>换句话说，测试是间接提升产品竞争力的必要手段。</strong></p><p>作为端侧开发者（不管是传统的 Web 前端还是小程序），在整个产品模块矩阵中，负责的是直接和用户相关的交互逻辑层，你写的代码直接影响到应用的用户体验，包括 UI 和交互。这两点正是小程序在端侧的主要测试目标。</p><p><strong>这里我想提醒你注意一下，</strong> 交互和 UI 的重要性往往会被大多数开发者忽略，但对用户来说，第一印象便是视觉和操作反馈。如果有两个相同功能的小程序让我选择，我肯定会选交互友好、UI舒服的那一个。所以，针对交互和 UI（也可以说针对端侧）的测试是非常重要的。</p><p>那么要想搭建完整的自动化测试体系，你肯定要具备体系化的测试知识，还要选择合适的工具。所以这节课我们就从这两个角度切入，带你夯实理论知识之后，再来学习目前比较优秀的小程序测试工具，针对性地打造针对小程序的自动化测试体系。希望学完这节课，你可以对自动化测试有更深入的理解，并且应用到现实工作中。</p><p>接下来我们就正式进入今天的课程，先来学习一些测试的理论，包括金字塔模型以及各种类测试的针对点和实施方法，之后再进行下一步的任务拆解和技术选型。</p><h3 id="测试金字塔模型" tabindex="-1">测试金字塔模型 <a class="header-anchor" href="#测试金字塔模型" aria-label="Permalink to &quot;测试金字塔模型&quot;">​</a></h3><p>自动化测试在服务端开发领域很早就已经形成完善的测试体系了。但是与注重数据与逻辑的服务端不同，<strong>端侧（包括前端、App、小程序等）的自动化测试即使在今天也是一件非常困难的事。</strong></p><p>以前端为例，起步晚、发展快，在一定程度上影响了自动化测试在前端领域的普及程度，但这并不是核心因素，而是因为前端，或者说直接与用户交互的 GUI 层面的自动化测试一直很难，因为越靠近用户的代码越难测试，因为：</p><ul><li><p>跟服务端相比，UI 的变化非常频繁；</p></li><li><p>由于 UI 与设计的关系非常紧密，而设计是有一定的主观因素在里面的。</p></li></ul><p>机器没办法准确判断 UI 是否符合预期，所以在今天还是有大部分的技术团队在前端测试方面不能摆脱对人的依赖，甚至人工测试在整个测试体系中占据大部分，形成与自动化相悖的反模式：</p>',11),_=t("p",null,"而正确的测试模型应该是金字塔形状：",-1),c=t("p",null,"从下到上是单元测试、集成测试、端到端测试和验收测试，这几种测试从应用整体的角度上说：",-1),g=t("ul",null,[t("li",null,[t("p",null,"单元测试应该包含前后端各自的单元测试；")]),t("li",null,[t("p",null,"集成测试对应前后端集成场景，或者通俗地理解为前后端联调测试；")]),t("li",null,[t("p",null,"端到端测试对应项目的完整功能测试，也就是图 1 的自动 GUI 测试。")])],-1),u=t("p",null,"如果进一步细化，把前端看成一个相对独立的、与后端隔离的黑盒，在这个语境下再去理解金字塔模型，单元测试就可以引申出更加宽泛的含义，把它看成狭义上的前端单元测试、前端模块集成测试以及与后端隔离的端到端测试的集合。如下图所示：",-1),m=o('<p>这样一来，金字塔模型中除了验收测试以外，**其他三项自动化测试都可以带入前端领域在无后端配合的情况下用 Mock 进行。**也就是说，前端或小程序端侧的自动化测试需要包括三种类型：</p><ul><li><p>单元测试；</p></li><li><p>集成测试；</p></li><li><p>端到端测试。</p></li></ul><p>不过在单元测试和集成测试之间存在一定的争议，单元测试是针对最小单元（Unit）的测试；集成测试针对多个最小单元集成后的功能。</p><p>虽然概念比较清晰，但在实践中（尤其在不同的技术领域中），对于最小单元的理解不是完全一致，比如：</p><ul><li><p>从应用整体的角度上，前端和后端都可以认为是最小单元，那么集成测试就是前端+后端；</p></li><li><p>而在前后端各自的领域中，一个模块（Module）可以被定义为是最小单元，一个类 （Class）也可以被定义为是最小单元；</p></li><li><p>如果使用函数式编程，一个函数同样可以被定义为是最小单元。</p></li></ul><p>**这种对于最小单元定义的不明确性，是造成单元测试与集成测试争议的主要原因。**比如一个购物车模块包含商品简介、数量、价格等组件，可以把每个组件看成购物车的最小单元，那么单元测试就是针对这些组件的，集成测试是针对购物车模块的。</p><p>然而，购物车在电商应用整体中也仅仅是一个模块，进而可以把购物车认为是应用整体的最小单元，那么单元测试针对的是购物车模块，集成测试针对的是应用整体。这种场景和算法中的动态规划有异曲同工之妙，从最小问题入手依次递进，直到解决完整的复杂问题。</p><p>我之所以讲单元测试和集成测试的差异是想说明的一个核心点：<strong>理论应用到实践中需要结合特定的领域和场景特征</strong>。这是我们下一步针对小程序端侧测试进行任务分解的重要基础。</p><p><strong>经过这些理论的学习之后，接下来就是将理论应用到实践中，</strong> 为小程序端侧的单元测试、集成测试和端到端测试进行明确的定位和任务分配。还记得 03 讲的自定义组件吗？当时我强调了一点：学习怎么使用自定义组件只是第一步，更重要的是理解它背后的组件化规范和思维。</p><p>而前端开发领域（或者说所有端侧开发领域中），组件化是最核心的思想之一，它不仅决定了怎么组织架构、写代码，也影响了测试。在任何有必要的场景下，很多课都会建议你尽量将某个相对独立的功能抽离为组件，即利于代码复用，也利于测试，小程序领域同样如此。</p><p>如果我们将组件定义为小程序的最小单元，<strong>那么单元测试便是面向组件的，集成测试针对由多个组件共同组成的功能或页面，端到端测试针对的是小程序整体的交互流程。</strong></p><h3 id="面向组件的单元测试" tabindex="-1">面向组件的单元测试 <a class="header-anchor" href="#面向组件的单元测试" aria-label="Permalink to &quot;面向组件的单元测试&quot;">​</a></h3><p>组件化的理想状态是把一切看成组件，然后通过多个组件的搭配组合形成应用。不过这种状态在现实工作中很难实施，项目中难免会有一些&quot;反组件化&quot;的模式。</p><p>对于一个小程序项目，我们可以把多个页面共用的导航栏封装成一个自定义组件，但是每个页面中，导航栏以外的地方并非都适合封装为组件，比如组件的外层容器以及容器的容器等。这些不是组件的节点，往往充当黏合组件的&quot;胶水&quot;角色，并没有单独进行测试的价值，而是需要体现到一个完整功能或页面中，也就是集成测试或端到端测试。这说明对于小程序 ，<strong>单元测试针对的目标是自定义组件</strong>。</p><p>不过小程序的运行环境比较特殊，基础库也不完全开源，所以对小程序自定义组件的单元测试有点儿困难。前端领域的流行框架（比如 Vue/React），都有一套完善的组件单元测试解决方案，可小程序的自定义组件的单元测试能用的工具就很匮乏了。我个人推荐微信团队出品的<a href="https://github.com/wechat-miniprogram/miniprogram-simulate" target="_blank" rel="noreferrer">miniprogram-simulate</a>（下文简称simulate），它是专门用来测试小程序自定义组件的工具，很好用。</p><p>simulate可以搭配 jest、karma 等前端测试框架使用，可以模拟自定义组件的所有行为，包括 props 注入、state 操作、生命周期函数触发、事件处理等，具体的使用方法也简单，你可以查看文档。<strong>我想强调的是</strong>，simulate 工具并不依赖微信小程序的开发者工具，只用浏览器甚至用 jsdom 模拟的浏览器环境就可以进行测试工作了，这也是它能够与前端生态的工具相结合，以及更利于接入 CI/CD 体系的基本前提。</p><p>解决了自定义组件的单元测试后，下一步就是更上层的集成测试和端到端测试。</p><h3 id="面向功能的集成测试和面向整体的端到端测试" tabindex="-1">面向功能的集成测试和面向整体的端到端测试 <a class="header-anchor" href="#面向功能的集成测试和面向整体的端到端测试" aria-label="Permalink to &quot;面向功能的集成测试和面向整体的端到端测试&quot;">​</a></h3><p>小程序中由多个组件组成的功能或页面是集成测试的针对目标，由所有页面组成的小程序整体则是端到端测试的针对目标。</p><p>在小程序大多数场景下，页面和页面间的关联非常薄弱，最常见的关联有三种：</p><ul><li><p>页面间的跳转；</p></li><li><p>通过 URL search 传递数据；</p></li><li><p>通过缓存共享数据是最常见的三种页面间的关联。</p></li></ul><p>在这种前提下，端到端测试所覆盖的场景非常有限，大多数可以通过集成测试覆盖，<strong>所以我们不妨将这两种测试类型放到一起讨论。</strong></p><p>对于集成测试和端到端测试来说，我们在进行自动化测试相关技术选型时，希望工具可以提供这样几个基本能力：</p><ul><li><p>模拟小程序的用户交互行为，比如点击某个按钮、滑动切换页面等；</p></li><li><p>模拟小程序操作 storage 的行为；</p></li><li><p>模拟网络请求的不同状态，包括返回的数据以及异常等；</p></li><li><p>进行截图操作以便对比 UI 的正确性。</p></li></ul><p>这几种能力跟前端的测试工具需求几乎一致，可因为小程序的封闭性，不能直接使用前端生态中的一些非常好用的工具，好在微信官方提供了一个专门针对小程序自动化测试的工具：<a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/auto/automator.html" target="_blank" rel="noreferrer">miniprogram-automator</a>（下文简称 automator ）。</p><p>用 automator 能实现通过外部脚本控制小程序行为，包括模拟交互、操作 storage 和模拟网络（上面几点），从而实现测试的自动化。automator 的使用方法和功能跟前端常用的 Selenium、Puppteer 非常接近，只不过把相关的功能从浏览器迁移到了小程序中（功能包括控制小程序跳转到指定页面、获取小程序页面数据、主动触发小程序元素的绑定事件以及最基本的调用 wx 对象（小程序运行时的全局变量）上的任意接口等）。不过与用于自定义组件单元测试的 simulate 工具不同的是，automator 需要借助微信开发者工具。</p><p>除了实现前三点功能之外，第四点我们还提到了要截图进行 UI 对比，这个工作分为两步：第一步截图；第二步对比。</p><p>截图的工作可以交给 automator 工具，而对比截图是否正确的工作选择比较多，比如原始的人工审核，或者借助一些工具实现自动对比。但我们在聊测试金字塔模型中提到：UI 是否符合预期并不仅仅是技术层面的事，工具很难百分百保证结果的正确性，所以就算用工具进行图片比对，也需要人工进行二次确认。而在具体的图片比对工具的选择上就很多了，基于 Node.js 的、Python 的甚至 Golang 的都有，这些我就不多费口舌介绍了。</p><p>把集成测试和端到端测试的拆解成以一个个具体的任务，在不同类型的小程序中有不同的业务逻辑，会导致不同的拆解方法，我们很难在一节课程内覆盖所有的类型，所以就挑选一些普适性较高的任务进行讲解。来看下面这张图：</p>',29),h=o('<p>这里要注意，用 automator 可以跳转到任意页面，图中的页面 A 不一定是首页，也可以是没有前置依赖页面的、相对独立的任何一个页面。</p><p>而对一个页面的测试模拟场景大体上可以分为三类：</p><ul><li><p><strong>渲染场景的模拟。</strong> 通过模拟正常场景和异常场景，以及各自不同的条件（比如异常场景下分为网络异常和业务接口异常两种条件）。最终输出的结果以截图的形式产出。结果比对交给工具和人工进行；</p></li><li><p><strong>交互场景的模拟。</strong> 通过触发页面中某个组件的绑定事件，然后校验响应函数执行结果的正确性，最终输出的结果可以是数据，如果涉及渲染，也可以是截图的形式产出。结果的比对交给工具和人工进行（如果不涉及截图，则仅用工具便可以完成结果的比对工作）；</p></li><li><p><strong>传参和数据共享的校验。</strong> 这项工作发生在页面间的跳转行为中，比如图中页面 A 跳转页面B ，可能会通过 URL 传递参数，也可能通过 storage 共享数据，如果存在这两种行为的任何一种，则需要进行传参和数据的正确性校验。</p></li></ul><p>其实，大多数小程序的集成测试和端到端测试都会涉及上图中罗列的这些测试案例，只不过在实际开发工作中会根据具体的业务场景，有一些变体或差异点存在。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>测试是保证产品交付的重要措施，作为研发人员，保证自身产出的高质量能够对整体的研发效率和质量保证产生正面影响。单元测试、集成测试和端到端测试是自下向上依次递进的三种测试类型，各自有针对的目标以及配套的测试工具。</p>',6),d=t("p",null,"小程序由于自身生态的封闭性，在自动化测试的技术选型上稍显局促，好在官方提供了一些好用的工具可供开发者参考，这些工具本身也具备一定的扩展性，可以结合前端生态中的一些测试工具共同搭建为完整的自动化测试体系。",-1),A=t("p",null,"我们这节课用了较多的篇幅讲解测试相关的理论知识，这些知识是与小程序无关的，可以应用到任何一个技术领域，包括后续我们将学习的云开发领域。",-1),q=t("p",null,"当然了，我们并没有过多介绍小程序测试工具的使用方法，一是因为这些内容在文档中都可以找到，二是因为工具只是辅助理论落地的媒介。所以这些简单的工作就作为今天的课后作业交给你来完成：阅读这节课提到的集中测试工具的文档，学习如何使用它们。",-1);function C(I,f,k,U,T,P){const p=s("Image");return e(),r("div",null,[n,a(p,{alt:"Lark20201116-184730.png",src:"https://s0.lgstatic.com/i/image/M00/6E/69/Ciqc1F-yWPSAEM-MAAA9nUuyNw8088.png"}),_,a(p,{alt:"Lark20201116-184741.png",src:"https://s0.lgstatic.com/i/image/M00/6E/69/Ciqc1F-yWP6ACKE-AABULXCkWds525.png"}),c,g,a(p,{alt:"Lark20201116-184743.png",src:"https://s0.lgstatic.com/i/image/M00/6E/69/Ciqc1F-yWQWAMwnhAABslttM12k025.png"}),u,a(p,{alt:"Lark20201116-184746.png",src:"https://s0.lgstatic.com/i/image/M00/6E/74/CgqCHl-yWQ2ARk4hAACFGZZdUJM537.png"}),m,a(p,{alt:"Lark20201116-184748.png",src:"https://s0.lgstatic.com/i/image/M00/6E/69/Ciqc1F-yWVGALSbRAADXcMCyGtM868.png"}),h,a(p,{alt:"666.png",src:"https://s0.lgstatic.com/i/image/M00/6F/9F/Ciqc1F-2RKqADBn6AAVRBBeLrKE489.png"}),d,A,q])}const S=l(i,[["render",C]]);export{M as __pageData,S as default};

import{_ as p,o as l,g as i,Q as t}from"./chunks/framework.a0d18f64.js";const m=JSON.parse('{"title":"25大型前端项目的痛点和优化方案","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/108-前端进阶笔记文档/(7220) 25  大型前端项目的痛点和优化方案.md","filePath":"posts/frontEnd/108-前端进阶笔记文档/(7220) 25  大型前端项目的痛点和优化方案.md","lastUpdated":1696682708000}'),e={name:"posts/frontEnd/108-前端进阶笔记文档/(7220) 25  大型前端项目的痛点和优化方案.md"},a=t('<h1 id="_25大型前端项目的痛点和优化方案" tabindex="-1">25大型前端项目的痛点和优化方案 <a class="header-anchor" href="#_25大型前端项目的痛点和优化方案" aria-label="Permalink to &quot;25大型前端项目的痛点和优化方案&quot;">​</a></h1><p>说到大型前端项目，很多人都会感到疑惑，怎样的项目算是大型前端项目呢？这的确没有一个定级，在这里我们可以粗略地进行定义：当项目的前端开发人员达到 10 人以上、模块数量达到 30 以上、代码量在 30W 行以上的项目，在本课程中可认为是大型前端项目。</p><p>在前端业务领域中，除了大型开源项目（热门框架、VsCode、Atom 等）以外，协同编辑类应用（比如在线文档）、复杂交互类应用（比如大型游戏）等，都可以称得上是大型前端项目。不管是不是大型项目，对于如何进行架构设计、如何快速搭建项目、如何通过工程化来提升开发效率，这些都在前面几讲有介绍。</p><p>今天我们主要围绕着大型前端项目中的痛点进行介绍，比如：</p><ol><li><p>各个模块间耦合严重，功能开发、技术优化、重构工作等均难以开展；</p></li><li><p>项目规模太大，每个人只了解其中一部分，需要改动到不熟悉的模块时常常出问题；</p></li><li><p>项目代码量大，不管是编译、构建，还是浏览器加载，耗时都较多、性能也较差；</p></li><li><p>项目交互逻辑复杂，问题定位、Bug 修复等过程效率很低，需要耗费不少精力。</p></li></ol><p>首先我们来看看模块耦合的问题。</p><h3 id="问题-1-模块耦合严重" tabindex="-1">问题 1：模块耦合严重 <a class="header-anchor" href="#问题-1-模块耦合严重" aria-label="Permalink to &quot;问题 1：模块耦合严重&quot;">​</a></h3><p>不同的模块需要进行分工和配合，因此相互之间必然会产生耦合。在大型项目中，由于模块数量很多，如果没有进行合适的管理和约束，可能会导致以下情况：</p><ol><li><p>模块职责和边界定义不清晰，导致模糊的工作可能存在多个模块内；</p></li><li><p>各个模块没有统一管理，导致模块在状态变更时需要手动通知相关模块；</p></li><li><p>模块间的通信方式设计不合理，导致全局事件满天飞、A 模块内直接调用 B 模块等问题，隐藏的引用和事件可能导致内存泄漏。</p></li></ol><p>下面我们来看一个例子。</p><p>小明接到一个渲染层的技术需求，需要在 DOM 渲染的基础上支持 Canvas 渲染，从而提升页面渲染和加载性能。小明认为，渲染层只需要从数据层获取数据，然后根据需要进行 DOM 渲染和 Canvas 渲染就可以了。也就是说，他只需要开发一个 Loader 装载器，并分别实现 DOMLoader 和 CanvasLoader，就可以完成这次的改造。</p><p>当小明开始研究原有的 DOM 加载代码，试图从中拆解出通用 Loader 的逻辑时，他突然发现渲染层并不只是使用到数据层的数据，还有很多来自网络层的事件、并从中响应数据进行渲染。除此之外，渲染层中还存在用户操作（<code>click</code>/<code>tap</code>/<code>touchmove</code>等事件）的逻辑，甚至这些操作还会在渲染层里与数据层、网络层进行逻辑处理。</p><p>考虑到这些逻辑已经存在 2 年多了，当时开发这些功能的小伙伴都不在了，小明对此不熟悉也不敢动，最后只能用兼容的方式（比如<code>if/else</code>）来实现 Canvas 渲染。小明这样的改造方式，虽然实现了需求，最终却给项目添加了新的技术债务。</p><p>小明遇到的问题，正是因为各个模块间的耦合过于严重、短时间内无法解耦导致的。那么，我们要怎么避免出现模块耦合过多的情况呢？</p><ol><li><p>项目规模调整后，对现有架构设计进行分析，如果不再合适则需要进行及时调整和优化。</p></li><li><p>使用模块解耦的技术方案，将各个模块统一交由框架处理。</p></li><li><p>梳理各个模块的职责，明确每个模块负责的工作和提供的功能，确定各个模块间的边界和调用方式。</p></li></ol><p>在第 14 讲中我已经详细介绍过如何设计模块、使用依赖倒置进行依赖解耦，第 19 讲中也提到如何使用事件监听来管理模块间的通信和状态。在 VsCode 中，我们也可以看到使用依赖注入框架和标准化的<code>Event/Emitter</code>事件监听的方式，来对各个模块进行解耦。</p><ul><li><p>各个模块的生命周期（初始化、销毁）统一由框架进行管理：通过提供通用类<code>Disposable</code>，统一管理相关资源的注册和销毁。</p></li><li><p>模块间不直接引入和调用，而是通过声明依赖的方式，从框架中获取相应的服务并使用。</p></li><li><p>不直接使用全局事件进行通信，而是通过订阅具体服务的方式来处理：通过使用同样的方式<code>this._register()</code>注册事件和订阅事件，将事件相关资源的处理统一挂载到<code>dispose()</code>方法中。</p></li></ul><p>使用依赖注入框架的好处在于，各个模块之间不会再有直接联系。模块以服务的方式进行注册，通过声明依赖的方式来获取需要使用的服务，框架会对模块间依赖关系进行分析，判断某个服务是否需要初始化和销毁，从而避免了不必要的服务被加载。</p><p>在对模块进行了解耦之后，每个模块都可以专注于自身的功能开发、技术优化，甚至可以在保持对外接口不变的情况下，进行模块重构。</p><h3 id="问题-2-项目复杂熟悉成本过高" tabindex="-1">问题 2：项目复杂熟悉成本过高 <a class="header-anchor" href="#问题-2-项目复杂熟悉成本过高" aria-label="Permalink to &quot;问题 2：项目复杂熟悉成本过高&quot;">​</a></h3><p>当一个项目中存在 30 个以上的模块的同时，项目还在不断地进行迭代和优化。在这样的情况下，基本上没有一个人能熟悉所有模块的所有细节，这会带来一些问题：</p><ul><li><p>对于新需求、新功能，开发无法完整地评估技术方案是否可以实现、会不会带来新的问题；</p></li><li><p>需求开发时需要改动不熟悉的代码，无法评估是否存在风险；</p></li><li><p>架构级别的优化工作，难以确定是否可以真正落地；</p></li><li><p>一些模块遗留的历史债务，由于工作进行过多次交接，相关逻辑已无人熟悉，无法进行处理。</p></li></ul><p>导致这些问题的根本原因有两个：</p><ul><li><p>开发者无法专注于某个模块开发；</p></li><li><p>同一个模块可能被多个人调整和变更。</p></li></ul><p>对于这种情况，可以使用模块负责人的机制来对模块进行所有权分配，进行管理和维护。</p><ol><li><p>每个开发者都认领（或分配）一个或多个模块，并要求完全熟悉和掌握模块的细节，且维护文档进行说明。</p></li><li><p>对于需求开发、Bug 修复、技术优化过程中涉及非自身的模块，需要找到对应模块的负责人进行风险评估和代码 Review。</p></li><li><p>模块的负责人负责自身模块的技术优化方案，包括性能优化、自动化测试覆盖、代码规范调整等工作。</p></li><li><p>对于较核心/复杂的模块，可由多个负责人共同维护，协商技术细节。</p></li></ol><p>通过模块负责人机制，每个模块都有了对应的开发进行维护和优化，开发者也可以专注于自身的某些模块进行功能开发。在人员离职和工作内容交接的时候，也可以通过文档+负责人权限的方式进行模块交接。</p><h3 id="问题-3-项目代码量过大" tabindex="-1">问题 3：项目代码量过大 <a class="header-anchor" href="#问题-3-项目代码量过大" aria-label="Permalink to &quot;问题 3：项目代码量过大&quot;">​</a></h3><p>对于代码量高达 30W 行以上的项目，如果不做任何优化直接全量跑在浏览器中，不管是加载耗时增加导致用户等待时间过久，还是内存占用过高导致用户交互卡顿，都会给用户带来不好的体验。</p><p>性能优化的解决方案我们在第 22 讲中也有介绍，对于代码量、文件过多这样的性能优化，无非就两个字。</p><ul><li><p>拆：拆模块、拆公共库、拆组件库；</p></li><li><p>分：分流程、分步骤。</p></li></ul><p>比如你可以这么做。</p><ol><li><p>代码按需引入，移除不必要的代码（比如使用 Tree-shaking）。</p></li><li><p>异步加载模块，根据业务需要将模块拆分成多个步骤加载（比如优化依赖注入框架对模块分批初始化）。</p></li><li><p>加载流程优化，分析并对首屏需要的模块做减法。</p></li><li><p>差异化服务，对于不同场景只加载所需要的模块内容（比如读写分离）。</p></li><li><p>代码复用，对重复逻辑进行组件和公共库的抽象和封装。</p></li></ol><p>对于项目代码量过大，代码开发过程中同样存在糟糕的体验：由于代码量过大，开发的本地构建、编译都变得很慢，甚至去打水+上厕所回来之后，代码还没编译完。</p><p>从维护角度来看，一个项目的代码量过大，对开发、编译、构建、部署、发布流程都会同样带来不少的压力。因此除了浏览器加载过程中的代码拆分，对项目代码也可以进行拆分，一般来说有两种方式。</p><table><thead><tr><th>包管理模式</th><th>说明</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>multirepo</td><td>多仓库模块管理，通过工作流从各个仓库拉取代码并进行编译、打包</td><td>模块可根据需要灵活选择各自的编译、构建工具 每个仓库的代码量较小，方便维护</td><td>项目代码分散在各个仓库，问题定位困难 模块变动后，需要更新相关仓库的依赖配置</td></tr><tr><td>monorepo</td><td>单仓库模块管理，可使用 lerna 进行包管理</td><td>项目代码可集中进行管理，使用统一的构建工具 模块间调试方便、问题定位和修复相对容易</td><td>仓库体积大，对构建工具要求较高 对项目文件结构和管理、代码可测试和维护性要求较高 为了保证代码质量，对版本控制和 Git 工作流要求更高</td></tr></tbody></table><p>两种包管理模式各有优劣，一般来说一个项目只会采用其中一种，但也可以根据具体需要进行调整，比如统一的 UI 组件库进行分仓库管理、核心业务逻辑在主仓库内进行拆包（像渲染层/数据层/网络层拆分模块）管理。</p><h3 id="问题-4-问题定位效率低" tabindex="-1">问题 4：问题定位效率低 <a class="header-anchor" href="#问题-4-问题定位效率低" aria-label="Permalink to &quot;问题 4：问题定位效率低&quot;">​</a></h3><p>在对模块进行拆分和解耦、使用了模块负责人机制、进行包拆分管理之后，虽然开发同学可以更加专注于自身负责模块的开发和维护，但有些时候依然无法避免接触其他模块。</p><p>对于这样大型的项目，维护过程（熟悉代码、定位问题、性能优化等）由于代码量太多、各个函数的调用链路太长，以及函数执行情况黑盒、函数调用链不清晰、函数耗时不清楚等问题，导致问题定位异常困难。要是遇到代码稍微复杂点，事件比较多、函数调用也特别多的，即使使用断点调试也能看到眼花，蒸汽眼罩都得多买一些。</p><p>对于这些问题，可以将问题定位过程进行自动化实现，比如：</p><ol><li><p>模块负责人对自身模块执行的关键点进行标记，在开发+调试模式下，其他开发可通过开启断点的方式来直接定位问题。</p></li><li><p>通过使用调用堆栈记录各个关键模块和函数的调用顺序、调用关系、入参出参是否正常，模块负责人提供过往数据的参考和分析建议，其他开发可直接根据指引进行分析。</p></li></ol><p>这个过程，其实是将模块负责人的知识通过工具的方式授予其他开发，大家可以快速找到某个模块经常出问题的地方、模块执行的关键点，根据建议和提示进行问题定位，可极大地提升问题定位的效率。</p><p>除了问题定位以外，各个模块和函数的调用关系、调用耗时也可以作为系统功能和性能是否有异常的参考。因此，我们还可以通过将调用堆栈收集过程自动化、接入流水线，在每次发布前合入代码时执行相关的任务，对比以往的数据进行分析，生成系统性能和功能的风险报告，提前在发布前发现风险。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>今天给大家介绍了大型前端项目中的一些痛点，概括起来就是：大型项目中代码量过大、模块耦合严重，开发对项目的熟悉成本骤增，导致功能开发、技术优化的风险上升，以及开发维护、问题定位的效率下降。</p><p>通过模块解耦和拆分、使用模块负责人机制、知识传承工具化等方式可以优化上述问题，核心思想是<strong>代码职责的拆分+开发职责的拆分</strong>。这样，每个模块可以专注于自身的功能实现，每个开发也可以专注于所负责模块的开发和维护。</p><p>当然，每个解决方案都有各自的利弊，你觉得这样的解决方案的问题和风险点在哪呢？欢迎在留言区进行讨论。</p><p>在我们的日常工作中，通常也会局限于某块功能的实现和某个领域的开发。如果这些内容并没有足够的深度可以挖掘，对个人的成长发展也可能会有限制。在这种情况下，我们可以主动去了解和学习其他领域的知识，也可以主动承担起更多的工作内容。</p>',49),o=[a];function d(r,s,n,c,h,_){return l(),i("div",null,o)}const f=p(e,[["render",d]]);export{m as __pageData,f as default};

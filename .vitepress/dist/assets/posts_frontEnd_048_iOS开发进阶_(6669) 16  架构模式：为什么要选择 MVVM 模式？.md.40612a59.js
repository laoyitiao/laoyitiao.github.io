import{_ as n,j as s,o as p,g as l,k as i,h as o,s as e,Q as r}from"./chunks/framework.cfb14fe0.js";const D=JSON.parse('{"title":"16架构模式：为什么要选择MVVM模式？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6669) 16  架构模式：为什么要选择 MVVM 模式？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6669) 16  架构模式：为什么要选择 MVVM 模式？.md","lastUpdated":1696682708000}'),d={name:"posts/frontEnd/048_iOS开发进阶/(6669) 16  架构模式：为什么要选择 MVVM 模式？.md"},a=e("h1",{id:"_16架构模式-为什么要选择mvvm模式",tabindex:"-1"},[o("16架构模式：为什么要选择MVVM模式？ "),e("a",{class:"header-anchor",href:"#_16架构模式-为什么要选择mvvm模式","aria-label":'Permalink to "16架构模式：为什么要选择MVVM模式？"'},"​")],-1),V=e("p",null,"作为 iOS 开发者，我们都很熟悉 MVC 模式。根据苹果官方的解释， MVC 表示 Model-View-Controller， 也就是模型、视图和控制器。但是业界一直把 MVC 戏称为 Massive ViewController（臃肿的视图控制器）。因为当我们使用 MVC 的时候，随着功能越来越丰富， ViewController 往往变得臃肿和繁杂，而且模块之间相互耦合，难以维护。下图显示了苹果的 MVC 模式。",-1),M=e("p",null,"其中，Controller 通常指 ViewController ，是 MVC 的核心，ViewController 通过Target-Action、DataSource 和 Delegate 来接收来自 View 的用户事件，并通过 Outlet 来更新 View。同时 ViewController 还通过 Notification 和 KVO 来接收来自 Model 的通知，并通过变量来更新 Model。",-1),c=e("p",null,"除了与 View 和 Model 进行交互以外，ViewController 还负责导航、网络访问、数据缓存、错误处理以及 Model 对象的 Encode 和 Decode。由于 ViewController 承担多项责任，往往导致代码量极大，且由于强耦合，对 ViewController 的一点点改动都需要进行手工回归测试，费时费力。那么，有没有什么好的办法来解决这些问题呢？",-1),_=e("h3",{id:"mvvm-及其优点",tabindex:"-1"},[o("MVVM 及其优点 "),e("a",{class:"header-anchor",href:"#mvvm-及其优点","aria-label":'Permalink to "MVVM 及其优点"'},"​")],-1),m=e("p",null,"经过多年实践证明，MVVM 模式是目前解决臃肿 ViewController 问题的有效方法。MVVM 全称 Model-View-ViewModel （模型-视图-视图模型）。与 MVC 相比，它引入了一个名叫 ViewModel 的新概念。如下图所示。",-1),w=r('<p>MVVM 由三层组成：</p><ul><li><p><strong>Model</strong>，用于保存数据的模型对象，通常定义为只有数据并没有方法的结构体（Struct）；</p></li><li><p><strong>View</strong>，用于呈现 UI（用户界面）并响应用户的事件，通常是 ViewController 和 View；</p></li><li><p><strong>ViewModel</strong>，用于桥接 Model 和 View 两层，把 Model 转换成 View 呈现 UI 所需的数据，并把 View 层的用户输入数据更新到 Model 中。</p></li></ul><p>那么，和 MVC 相比，MVVM 模式具有什么优点呢？具体有以下几个。</p><ul><li><p>能效减低代码的复杂性，即 MVVM 模式能有效简化 ViewController 的逻辑，使得 ViewController 的代码只处理 UI 相关的逻辑。</p></li><li><p>能提高代码的可测试性，由于 ViewModel 明确负责 Modle 与 View 之间的数据转换，而且不负责 View 的生命周期管理，我们可以很方便地测试 ViewModel 的代码逻辑，提高代码的健壮性。</p></li><li><p>能够减低代码耦合性。在 MVVM 模式下，每一层都明确分工，这样可以减少代码耦合性，提高代码的可维护性和可重用性。</p></li><li><p>减轻移动团队的开发门槛，方便知识的共享。前两年谷歌公司为 Android 引入了一个基于 MVVM 模式的新框架 Architecture Components，使用 MVVM 模式能方便开发者同时在 iOS 和 Android 两个平台开发功能。</p></li></ul><h3 id="基于-mvvm-的架构设计" tabindex="-1">基于 MVVM 的架构设计 <a class="header-anchor" href="#基于-mvvm-的架构设计" aria-label="Permalink to &quot;基于 MVVM 的架构设计&quot;">​</a></h3><p>如今，经过多年的实践，我们已经能够成功地使用 MVVM 模式在 iOS 和 Android 上实现了一套风格一致的架构设计。 比如，在 Moments App 里面，我就进行了优化并重新实现了一套基于 MVVM 模式的架构，具体如下图所示：</p>',6),g=r('<p>Moments App 的架构图</p><h4 id="moments-app-的架构详解" tabindex="-1">Moments App 的架构详解 <a class="header-anchor" href="#moments-app-的架构详解" aria-label="Permalink to &quot;Moments App 的架构详解&quot;">​</a></h4><p>以上是我们 Moments App 的架构图，下面我把每一层进行分解和介绍下。</p><p><strong>View 层</strong></p><p>View 层由<code>UIViewController</code>以及<code>UIView</code>所组成，负责呈现 UI 和响应用户事件。由于 MVVM 模式相当灵活，我们在后面第 32 讲会介绍如何在保持其他模块完全不变的情况下把 View 层换成 SwiftUI 来实现。</p><p><strong>ViewModel 层</strong></p><p>它是 MVVM 模式的核心，主要任务是连接 View 和 Model 层，为 View 层准备呈现 UI 所需的数据，并且响应 View 层所提供的用户事件。同时它还负责处理路由和发送用户行为数据。由于 ViewModel 层的责任还是很重，因此我们把它进一步细分为各个模块，大致包括<strong>ViewModel、Routing、Tracking、Repository、Networking、DataStore。</strong></p><p>其中，<strong>ViewModel</strong> 扮演一个协助者的角色，负责准备 View 层所需的数据，并响应 View 层的用户事件。ViewModel 与上层的<code>UIViewController</code>和<code>UIView</code>之间通过响应式编程的方式来通知对方，而上层 UI 组件通过数据绑定的方式，来监听 ViewModel 的数据变化，并及时更新 UI。</p><p><strong>Routing</strong>是负责路由和导航的模块，ViewModel 在响应 View 的请求时（如打开新页面），会调用 Routing 模块进行导航。</p><p><strong>Tracking</strong>则负责统计分析数据的模块，ViewModel 在响应 View 的请求时（如用户点击了点赞按钮），会调用 Tracking 模块来发送用户行为的数据。</p><p><strong>Repository</strong>是数据层，作为唯一信息来源（Single source of truth）维护着 App 所使用的 Model 数据。当 ViewModel 需要访问数据的时候，会调用 Repository 模块，然后 Repository 会根据需要通过 Networking 来访问网络的后台数据，或者调用 DataStore 来获取本地缓存的数据。ViewModel 和 Repository 的接口也是响应式编程的方式，主要由 ViewModel 给 Repository 发起请求，然后监听 Repository 来获取数据所发生的变化。</p><p><strong>Networking</strong>是网络层，负责访问 BFF，然后把 BFF 返回的 JSON 数据 Decode 成 Model 数据。Repository 与 Networking 的接口也是响应式编程的方式。Repository 会给 Networking 发起请求，并监听 Networking 的返回。</p><p><strong>DataStore</strong>为数据存储层，用于把数据缓存到 App 里面使得用户在不需等待网络请求的情况下可以快速看到 UI。Repository 与 DataStore 的接口也是响应式编程的方式。Repository 监听 DataStore 的数据变化。</p><p><strong>Model 层</strong></p><p>最后一层是 Model 层，它比较简单，都是一些用于存放数据的模型对象，这些对象能用于存放网络请求使用的数据，也可用于存放本地缓存的数据。</p><h4 id="朋友圈模块的架构设计" tabindex="-1">朋友圈模块的架构设计 <a class="header-anchor" href="#朋友圈模块的架构设计" aria-label="Permalink to &quot;朋友圈模块的架构设计&quot;">​</a></h4><p>有了上述的架构设计，我就可以把 MVVM 模式应用到各个业务模块里面。比如，在这里我以 Moments App 的朋友圈模块作为例，和你介绍下它的具体的架构。下面是我为该模块所绘制的类型关系图。</p>',17),h=r('<p>Moments App 朋友圈模块的类型关系图</p><p>View 层用于显示 UI，<code>MomentsViewTimelineViewController</code>用于显示朋友圈界面，这个页面里面使用了一个 TableView 来显示各种不同的 Cell。这些 Cell 都通过 UIView 来显示，其中<code>UserProfileListItemView</code>用于显示用户个人的信息，而<code>MomentListItemView</code>显示一条朋友圈的信息。</p><p><strong>ViewModel 层</strong> 由多个组件所组成。其核心是<code>MomentsTimelineViewModel</code>，它为<code>MomentsViewTimelineViewController</code>准备呈现 UI 的数据，并处理用户的事件。各个 UI 子组件也对应着各个子 ViewModel。例如<code>UserProfileListItemView</code>对应了<code>UserProfileListItemViewModel</code>。</p><p>当<code>MomentsTimelineViewModel</code>要发送统计分析数据的时候会调用<code>TrackingRepo</code>，进而把用户行为数据发送到分析数据的后台。当<code>MomentsTimelineViewModel</code>要导航到其他页面的时候会调用<code>AppRouter</code>，而<code>AppRouter</code>会调用路由模块来导航到相应的页面去。</p><p>当<code>MomentsTimelineViewModel</code>需要读取或者更新数据的时候，会给<code>MomentsRepoo</code>发起请求。该 Repo 负责发送网络请求并把朋友圈数据缓存到本地文件系统中。这个 Repo 还是所有朋友圈信息的数据中心，App 里面任何页面需要朋友圈信息的数据，都可以从该 Repo 中进行读取。</p><p>为了进一步解耦，我们把数据缓存和网络请求模块从 Repo 中独立出来，分成 DataStore 和 Networking 两个模块。例如当<code>MomentsRepoo</code>需要读写缓存的时候，会调用<code>UserDefaultsPersistentDataStore</code>，DataStore 模块负责把模型数据保存到<strong>UserDefaults</strong>里面。</p><p>而当<code>MomentsRepoo</code>需要从网络上取出朋友圈信息时会调用<code>GetMomentsByUserIDSession</code>。<code>GetMomentsByUserIDSession</code>会从 BFF 里读取当前用户所有的朋友圈信息。当<code>MomentsRepoo</code>需要更新朋友圈信息时（如更新点赞的状态），会调用<code>UpdateMomentLikeSession</code>来对 BFF 发起更新的请求。</p><p><strong>Model 层</strong> 相对比较简单，只有一个用于保存朋友圈信息的模型数据：<code>MomentsDetails</code>。其中<code>UserDefaultsPersistentDataStore</code>使用它来进行本地缓存的读取，而<code>GetMomentsByUserIDSession</code>和<code>UpdateMomentLikeSession</code>会使用它来存放网络请求的 JSON 数据。</p><p>上面就是 Moments App 基于 MVVM 模式的架构设计，我们会在后面几讲中详细介绍各个层的架构与具体实现方式。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一讲我们结合 Moments App 介绍了一套可行的 MVVM 架构模式。通过它，我们可以有效降低各个模块之间的耦合度，提高可重用性，再加上由于每个模块有了明确的责任与分工，我们在实现新功能时，也能降低沟通成本，提高开发效率。所以有关这个架构模式，你一定要重视起来哦。</p><p>另外，结合 BFF 的后端服务，我们还可以在 iOS 和 Android 两端同样使用 MVVM 模式来进行架构设计，并保持一致的代码风格，以便于开发者能同时在两个平台进行开发。</p><p>思考题</p><blockquote><p>请问你们的 App 使用了怎样的架构模式？你觉得有什么优缺点可以分享给大家？</p></blockquote><p>你可以把自己的思考写到下面的留言区哦，这一讲就介绍到这里，下一讲我将介绍如何使用 RxSwift 来实现响应式编程。</p>',15);function A(C,S,u,I,T,R){const t=s("Image");return p(),l("div",null,[a,V,i(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/36/5D/CioPOWBzrr2ASdn0AAB7aYkrITU199.png"}),o(),M,c,_,m,i(t,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/37/48/Cgp9HWB2p8iAJEKQAAIqLJKlDBM196.png"}),o(),w,i(t,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/37/48/Cgp9HWB2p72ADAbnAAJKuBdBnmc620.png"}),o(),g,i(t,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/37/48/Cgp9HWB2p7CAYGJyAALj6KlRJ98450.png"}),o(),h])}const f=n(d,[["render",A]]);export{D as __pageData,f as default};

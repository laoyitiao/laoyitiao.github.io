import{_ as s,j as t,o as e,g as n,k as a,Q as r,s as p}from"./chunks/framework.b3d8e22e.js";const P=JSON.parse('{"title":"监控预警 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6572) 08  诊断清单：如何实现监控预警并进行问题诊断.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6572) 08  诊断清单：如何实现监控预警并进行问题诊断.md","lastUpdated":1696417798000}'),_={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6572) 08  诊断清单：如何实现监控预警并进行问题诊断.md"},l=r('<p>上一讲我介绍了具体怎么搭建前端性能平台，现在假设你已经根据我的介绍搭建起好了，接下来要做什么呢？</p><p>记得当初我们的前端性能平台搭建起来后，起初一周，大家出于好奇，都会登陆上去看看，但也没弄明白怎么用。再接下来的几周，性能平台就像落了一层厚厚灰的机器，被彻底遗忘在角落了。为什么会这样呢？</p><p>搭建性能平台的主要目的是监控预警和对性能问题快速诊断，所以搭建完成后，我们还需要告诉大家怎么去解决这些问题。</p><p>怎么做呢？还记得前一讲留的一个尾巴吗？性能平台搭建还缺一个监控预警功能。接下来我就先介绍下怎么搭建，以及怎么根据这个监控预警进行问题诊断。</p><h3 id="监控预警" tabindex="-1">监控预警 <a class="header-anchor" href="#监控预警" aria-label="Permalink to &quot;监控预警&quot;">​</a></h3><p>监控预警部分，我们借助 Node-schedule 做调度和定时任务的处理，通过 node-mailer 进行邮件报警。具体来说我们通过以下几步来实现。</p><p>第一步，准备预警数据。</p><p>在做完数据清洗之后，一个分支使用 Spark 做计算，另外一个分支使用 Flink 实时数据计算。这两者的区别在于后者的数据是实时处理的，因为监控预警如果不实时的话，就没有意义了。有关数据的处理，我是这样做的：超过 2s 的数据，或者认定为卡顿的数据，直接标记为预警数据。实际当中你也可以根据情况去定义和处理。</p><p>第二步，我们借助 Node-schedule，用一批定时任务将预警数据通过 Node.js，拉取数据到 MongoDB 的预警表中。</p><p>第三步，预警的展示流程。根据预警方式不同，样式展示也不同。具体来说，预警的方式有三种：企业微信报警通知、邮件报警通知、短信报警通知。</p><p>以手机列表页为例，性能标准是首屏时间 1.5s，秒开率 90%，超过这个标准就会在性能平台预警模块展示，按照严重程度倒序排列展示。如果超出 10%，平台上会标红展示，并会发企业微信报警通知；如果超过 20%，会发借助 node-mailer 做邮件报警；如果超出 30%，会发短信报警通知。</p><p>注意，预警通知需要用到通信资源，<strong>为了避免数据量太大而浪费资源，一般对 App 首页核心的导航位进行页面监控即可。</strong></p><h3 id="问题诊断" tabindex="-1">问题诊断 <a class="header-anchor" href="#问题诊断" aria-label="Permalink to &quot;问题诊断&quot;">​</a></h3><p>当预警功能做好后，前端性能平台就可以对重要指标进行实时监督了。当发现性能问题------不论是我们自己发现还是用户反馈，都需要先对问题进行诊断，然后看情况是否需要进一步采取措施。</p><p>一般问题诊断时需要先<strong>确认是共性问题还是个例问题</strong>。如果是共性问题，那接下来我们就开始诊断和优化；如果是个例问题，是因为偶发性因素导致的（如个人的网络抖动、手机内存占用太多、用户连了代理等），则不需要进行专门优化。</p><p>那怎么判断呢？</p><p>一般共性问题，我们可以通过大量用户的数据指标是否正常来判断。具体来说，当前端工程师遇到用户来反馈某个性能问题时，先去性能平台看性能指标，如果性能指标中的首屏时间的均值出现异常，就是共性问题。然后再去看究竟是哪个终端机型下的情况，加载瀑布流是怎样的，会慢在哪个环节。</p><p>以手机列表页某次加载慢的问题为例，某同事收到天津用户反馈说发布页面加载比较慢，他是怎么做的呢？</p><p>他先是看了性能平台，发现在中国移动网络下，发布页面的首屏时间均值很长，超过了 3s，说明这是共性问题。然后他看了发布页面的加载瀑布流时间后，发现一个负责上传图片的 JS 文件加载特别慢。原因是它在资源加载时被阻塞住了，阻塞它的是一个负责对图片上传后实施滤镜功能的文件。这个文件显然可以延迟加载，即上传完成后再加载都可以。于是他调整完加载策略，解决了用户反馈的问题。</p><p>如果我们发现大量用户的首屏指标（首屏时间均值和分位值）没问题，就可以判断为个例问题。有别于共性问题可以从平台上定位出具体是哪个瓶颈点，个例问题一般需要客服联系用户去解决，不需要代码层面做什么。</p><p>根据我过往对性能优化方面的经验，我整理了一个诊断清单：</p><ul><li><p>全量 vs 增量</p></li><li><p>同步 vs 异步</p></li><li><p>实时 vs 缓存</p></li><li><p>原片 vs 压缩</p></li></ul><p><strong>全量 vs 增量</strong>，是指页面加载特别是列表页加载数据慢的情况，要从数据加载是全量还是增量的角度去诊断问题。</p><p>以京东 App 列表页为例，首屏一般展示 4 条左右的商品数据，PC 页首屏展示 50 条商品数据，后端数据接口一般是同一套（无论是针对移动端还是 PC 端），这时 App 列表页请求后端接口，后端一次返回 50 条数据就不合适了。更好的做法是，分接口先拉取首屏所需的 4 条数据，然后在页面滚动或者下拉操作加载后续数据即可。</p><p>值得注意的是，为了保持体验流畅，有时候我们会多加载几条，比如开始加载 6 条，刚开始滚动到首屏结束时，第 5 条数据已经有了（此时请求第 7 条数据），不需要等后端服务器返回就可以展示。</p><p><strong>同步 vs 异步</strong>，是指遇到页面加载时间过长的情形，是否因为接口同步加载导致的问题。此时可以用异步的思路去解决。比如电商 App 列表页，一般需要先去拉取导航位置图片和链接信息，然后去拉取商品列表信息，这会延长加载时间。此时我们可以考虑同时拉取两个列表，中间有依赖关系的地方，集中到第一个接口中去获取，然后就可以并行去请求两个接口了。</p><p><strong>实时 vs 缓存</strong>，是指遇到接口数据或者静态资源加载过长时候，要看一下是否是因为使用了实时数据的角度导致的，是否可以缓存策略来解决问题。</p><p>具体来说，如果是能够缓存的数据（如双 11 的榜单、页面中的 JS、CSS 资源），建议优先检查一下是否做了缓存处理；如果用的是实时数据（如商品实时的价格，库存实时的情况），要看一下是否会导致性能瓶颈。在不影响用户体验的前提下，还可以看看某些数据是不是可以定时去更新，如用户购买榜单信息等。</p><p>有关静态资源（如 JS、CSS文件）缓存处理，比较好的方法是，将每次渲染后的页面做缓存，页面打开时就展示，然后局部细微做更新，确保用户体验更好。</p><p><strong>原片 vs 压缩，</strong> 是指当遇到图片加载缓慢的问题，可以查看下图片是否是原图。如果是，可以做一些无损或者有损压缩处理，以此提高加载速度，或者尽量不使用原始图片（如 png-24），优先使用 webp 等图片格式。</p><p>为了提高性能，页面在展示时，可以先设置成展示一张低质量的图片，遇到许多用户特别关注这张图片时，再做进一步的优化处理也不迟。具体的优化手段我会在后续章节里面提到。</p><h3 id="效果评估" tabindex="-1">效果评估 <a class="header-anchor" href="#效果评估" aria-label="Permalink to &quot;效果评估&quot;">​</a></h3><p>假设我们经过问题诊断，也进行了优化，那么我们做完一个性能优化项目之后，如何评估项目效果呢？在 03 讲我提到过，如果仅仅给出项目的性能指标变化，比如做完移动 M 站性能优化后，首屏时间提升 30%，并不足以触达业务同学的内心。</p><p><strong>最好的方式就是通过性能优化，提高业务数据指标。</strong> 以电商 App 为例，最关注的一个指标是从访问用户到订单的转化（比如 100 个用户成了 3 单，转化率为 3%）。那么，性能指标和转化率指标有什么关系呢？</p><p>根据 skilled.co 的数据表示，沃尔玛在线网站页面加载时间每减少一秒，转化率增加 2%。我之前的移动端 M 站性能优化项目也验证过这一点，当时性能有了 30% 的提升，列表页到详情页的转化提高了 10%。当然，这里面有一个隐含假设，当前页面的首屏时间远大于 1s（如 2s ～ 5s），如果首屏已经秒开，提升将非常有限。</p><p>具体怎么评估转化率指标？我们需要用优化前后两个版本对比的方式，去看转化率指标的变化，也就是你经常听到的<strong>AB 测试</strong>。</p><p>具体怎么做呢？我以列表页性能优化项目为例，在做性能优化之前，先把列表页面分成 A、B 两个版本，这两个版本可以通过条件语句区分代码块，还可以通过模板和路由的方式来区分。其中，A 版本是筛选项优化前的，B 版本是筛选项化后的。此处我们选择用IF条件语句在列表页代码里面做区分，如果当前需要展示版本A，URL 参数中传入 version = A。</p><p>然后当用户到了列表页加入购物车下单时，我们用代码在提交给购物车的订单上做一个标记（from=version）。这样交易成功后，通过统计埋点就可以统计到 A、B 版本各自对应的订单转化率。<strong>转化率的变化就是列表页性能优化项目的优化数据。</strong></p><p>这里需要注意一点，为了确保同一个版本波动率很小，在做对比之前还要先对列表页做 AA 测试，也就是两个版本代码完全一样的测试。当它们的差异基本上万分之一以下了再去做 AB 测试。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3>',40),i=p("p",null,"好了，以上就是监控预警、问题诊断和效果评估部分的内容。",-1),d=p("p",null,"效果评估时，我曾遇到过几次性能优化后页面转化率急剧降低的情况（从 2% 降低到 1.3%）。一开始不清楚到底是哪个环节出现了问题，最后经过详细排查，原来是兼容性方面导致的------在iphone 11 和小米 10 下，会出现菜单列表无法滚动的情况。这个问题解决后，转化率升到了3%。",-1),c=p("p",null,"所以，在最后我提醒下你，性能优化项目一定要做好兼容性测试，特别是针对 Top 10 机型的手机和弱网环境，一定要做认真做好测试。",-1),h=p("p",null,"下面为你留一个问题：",-1),g=p("blockquote",null,[p("p",null,"在做性能监控预警时遇到某个问题，因为性能问题不是短时间能解决掉的，导致预警邮件越发越多，后来拖慢了预警的速度，只能展示2个小时前的数据了，你想过这个问题怎么解决吗？")],-1),u=p("p",null,"欢迎在评论区和我交流。我们马上进入性能优化实战，首屏秒开的 4 重保障。",-1);function m(A,f,v,S,k,b){const o=t("Image");return e(),n("div",null,[l,a(o,{alt:"溪风的思维导图08.png",src:"https://s0.lgstatic.com/i/image6/M00/1E/3F/Cgp9HWBQe5yAQvIlAAJDg3d_sIo274.png"}),i,d,c,h,g,u])}const q=s(_,[["render",m]]);export{P as __pageData,q as default};

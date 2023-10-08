import{_ as p,j as e,o as t,g as c,k as l,h as a,Q as o,s}from"./chunks/framework.a0d18f64.js";const v=JSON.parse('{"title":"14复杂数据库设计：如何用好云开发提供的文档型数据库？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5107) 14  复杂数据库设计：如何用好云开发提供的文档型数据库？.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5107) 14  复杂数据库设计：如何用好云开发提供的文档型数据库？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5107) 14  复杂数据库设计：如何用好云开发提供的文档型数据库？.md"},i=o('<h1 id="_14复杂数据库设计-如何用好云开发提供的文档型数据库" tabindex="-1">14复杂数据库设计：如何用好云开发提供的文档型数据库？ <a class="header-anchor" href="#_14复杂数据库设计-如何用好云开发提供的文档型数据库" aria-label="Permalink to &quot;14复杂数据库设计：如何用好云开发提供的文档型数据库？&quot;">​</a></h1><p>我们知道，大多数互联网应用产品都会不断产生各种数据（可能是用户产生的，也可能是系统自动生成的）。要想高效保存这些数据，并维持应用产品的有效运转，就要用到数据库。</p><p>数据库是高效存储数据、读取数据的存储器。我们日常用到的绝大部分应用，都是把数据库放在云端，通过应用后端服务独立控制。</p><p>数据库是后端服务架构中最主要的部分，数据库的架构设计，以及灾备机制都属于应用开发中不可或缺一环。在项目开发初期，开发者就要做好架构设计，不过这会耗费大量的精力，从而对需要快速试错上线的产品造成不利影响。</p><p>而在云开发中，数据库的架构设计工作几乎为0。开发者不用关心数据库怎么存取和灾备，因为云开发会保证数据库的通信以及服务稳定。<strong>你只关心怎么在业务中用好云开发数据库就可以了。</strong></p><p>在上一讲中我提到，云开发数据库是非关系型数据库，遵循 Mongo 协议，并提供丰富的操作 API，满足绝大部分业务场景下的数据操作需求。你阅读<a href="https://docs.cloudbase.net/database/introduce.html" target="_blank" rel="noreferrer">数据库 API 文档</a>就可以快速上手使用云开发数据库了。但只能用数据库可不行，我还希望你可以用好它，让它发挥更大的威力。<strong>所以这一讲，我就带你深度学习怎么用好云开发数据库支持复杂应用。</strong></p><h3 id="如何更好地设计数据库" tabindex="-1">如何更好地设计数据库 <a class="header-anchor" href="#如何更好地设计数据库" aria-label="Permalink to &quot;如何更好地设计数据库&quot;">​</a></h3><h4 id="反范式化与范式化设计" tabindex="-1">反范式化与范式化设计 <a class="header-anchor" href="#反范式化与范式化设计" aria-label="Permalink to &quot;反范式化与范式化设计&quot;">​</a></h4><p><strong>范式化</strong>是把数据像关系型数据库一样分散到不同的集合里，不同的集合之间可以通过唯一的 ID 相互引用数据，不过要引用这些数据往往要进行多次查询或使用 lookup 进行联表查询。</p>',9),E=s("p",null,[s("strong",null,"反范式化"),a("是把文档所用的数据都嵌入文档内部，如果要更新数据，可能要查出整个文档，修改之后再存储到数据库里，如果没有可以进行字段级别的更新指令，大文档新增字段的性能较低。而范式化设计因为集合比较分散（也就比较小），更新数据时可以只更新一个相对较小的文档。")],-1),y=s("p",null,[a("由此可见，数据既可以内嵌（反范式化），也可以采用引用（范式化），两种策略各有优缺点，"),s("strong",null,"关键是你要选择适合自己应用场景的方案。")],-1),d=s("ul",null,[s("li",null,[s("p",null,"完全反范式化可以大大减少文档查询的次数。比如你的应用数据查询比较频繁，但不用频繁更新，那就适合完全反范式化，没必要把数据分散到不同的集合，牺牲查询的效率。")]),s("li",null,[s("p",null,"完全范式化会降低文档更新的成本。如果应用数据需要频繁更新，业务数据特别复杂，你就要对数据库进行一定的范式化设计，不然用反范式化的设计会让集合过大，冗余数据更多，出现数据写入性能差的问题。")])],-1),u=s("p",null,"以下是我总结的适合内嵌（反范式化）和引用（范式化）的情况对比，建议你根据业务情况合理设计。",-1),h=s("h4",{id:"认识数据库数据模式",tabindex:"-1"},[a("认识数据库数据模式 "),s("a",{class:"header-anchor",href:"#认识数据库数据模式","aria-label":'Permalink to "认识数据库数据模式"'},"​")],-1),_=s("p",null,"除了结合实际情况选择范式化设计或反范式化设计之外，你还需要了解云开发数据库的数据模式，从而更好地设计数据库结构。云开发数据库的数据模式比较灵活，主要体现在以下两点。",-1),g=s("ul",null,[s("li",null,[s("p",null,"关系型数据库要求你在插入数据前必须定义好一个表的模版结构，而云开发的文档型数据库中数据的集合 collection 并不限制记录 document 结构。")]),s("li",null,[s("p",null,"另外关系型数据库需要开发者对数据库的结构内容做声明描述，才可以正常运作，而云开发数据库不需要预先声明，在使用时也不会限制记录的结构，同一个集合记录的字段可以有很大的差异。如下图所示：")])],-1),q=o(`<p>这种灵活性让对象和数据库文档之间的映射变得很容易，即使数据记录之间变化很大，每个文档也可以很好地映射到不同的记录。当然了，<strong>在实际使用中，同一个集合中的文档最好都有一个类似的结构</strong>（相同的字段、相同的内嵌文档结构）方便进行批量的增删改查以及聚合等操作。</p><p>当应用程序使用时间增长或需求出现变化，数据库的数据模式也要随之改变。为了保证数据库支持所有旧版的模式，最简单的方式是在原有的数据模式基础之上添加字段。以用户信息表为例，假设业务要增加一些字段（性别、年龄），云数据库添加得很轻松，但这会出现一些问题：以往收集到的性别、年龄这些字段都是空的，只有新添加的用户才有，所以你在编写相关业务代码时，如果需要这些值，就需要针对这些空值进行判断，防止出错。</p><p>而且，如果业务的数据变动比较大，文档的数据模式也会出现版本混乱，<strong>这一点你在数据库设计之初也要考虑到。</strong></p><p>所以当使用云开发数据库时，你最好在应用开发前期就确定数据结构，尽可能避免在应用后期维护过程中改动数据结构，比如增加一个字段，改变字段的类型等。</p><h4 id="预填充数据" tabindex="-1">预填充数据 <a class="header-anchor" href="#预填充数据" aria-label="Permalink to &quot;预填充数据&quot;">​</a></h4><p>虽然云开发数据库不像关系型数据库那样用声明结构限定记录的内容，但是开发者要对业务数据的类型、长度等有一些把控。</p><p>如果在开发时，你就知道这个数据库集合以后要用到哪些字段，那么在第一次插入数据时就该预填充这些字段，这样在用到时就能用更新指令进行字段级别的更新，不用再给集合新增字段，效率会高很多。</p><p>以简历网站的用户信息表为例，用户在注册时，像地址，毕业大学等信息并不会在注册时给到，如果你没预先设置这些字段，再收集这些信息时就要用 doc 对文档进行记录级别的更新，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">db.</span><span style="color:#B392F0;">collection</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">doc</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user20200001&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        data</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            address</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;深圳&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            school</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">                {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    middle</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;华中一附中&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                },{</span></span>
<span class="line"><span style="color:#E1E4E8;">                    college</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;清华大学&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                },</span></span>
<span class="line"><span style="color:#E1E4E8;">            ],</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">db.</span><span style="color:#6F42C1;">collection</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">doc</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user20200001&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        data</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">            address</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;深圳&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            school</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">                {</span></span>
<span class="line"><span style="color:#24292E;">                    middle</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;华中一附中&quot;</span></span>
<span class="line"><span style="color:#24292E;">                },{</span></span>
<span class="line"><span style="color:#24292E;">                    college</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;清华大学&quot;</span></span>
<span class="line"><span style="color:#24292E;">                },</span></span>
<span class="line"><span style="color:#24292E;">            ],</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span></code></pre></div><p>反之如果你预先设置这些字段，面对上述情况，再收集数据的更新，你只需要这样做：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">db.</span><span style="color:#B392F0;">collection</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">) .</span><span style="color:#B392F0;">doc</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user20200001&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        data</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            address</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> _.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;深圳&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;school.0.middle&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> _.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;华中一附中&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;school.1.college&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> _.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;清华&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">db.</span><span style="color:#6F42C1;">collection</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">) .</span><span style="color:#6F42C1;">doc</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user20200001&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        data</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            address</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> _.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;深圳&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;school.0.middle&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> _.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;华中一附中&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;school.1.college&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> _.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;清华&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span></code></pre></div><p>总的来说，当你在用户注册时预先设置结构内容，后续更新时，能直接用更新操作符进行字段级别的更新。另外，当集合越大，修改的内容又比较少，使用更新操作符来更新文档，会大大提升性能。</p><h3 id="如何保证数据库的安全" tabindex="-1">如何保证数据库的安全 <a class="header-anchor" href="#如何保证数据库的安全" aria-label="Permalink to &quot;如何保证数据库的安全&quot;">​</a></h3><h4 id="数据库安全规则" tabindex="-1">数据库安全规则 <a class="header-anchor" href="#数据库安全规则" aria-label="Permalink to &quot;数据库安全规则&quot;">​</a></h4><p>数据库是应用的数据存储核心，其稳定性和安全性会直接影响应用的稳定性和安全性。不管是什么应用，开发者最不想出现数据库被删、数据被篡改的情况。云开发数据库默认配备最基本的权限管控，有4 种基础策略：</p><ul><li><p>所有用户不可读写；</p></li><li><p>所有用户可读；</p></li><li><p>仅创建者可读写；</p></li><li><p>所有用户可读，仅创建者可写。</p></li></ul><p>云开发数据库的一条记录，往往因为反范式的设计，导致其承载的信息非常多，所以简单的权限管控并不能满足复杂数据更新条件的配置。<strong>在这个情况下，安全规则接替基础权限策略，提供更灵活的管控。</strong></p><p>云开发数据库安全规则是一个可以灵活自定义数据库读写权限的权限控制方式，通过配置安全规则，开发者可以配置客户端、服务端发起的数据库操作权限规则，自动拒绝不符合安全规则的前端数据库与云存储请求，保障数据和文件安全。</p><p>另外，每次数据库请求时，安全规则都会判断请求的用户身份是否符合数据库的准入身份，如果符合就放行，反之直接拒绝。<strong>那你怎么配置安全规则呢？</strong></p><h4 id="安全规则身份认证" tabindex="-1">安全规则身份认证 <a class="header-anchor" href="#安全规则身份认证" aria-label="Permalink to &quot;安全规则身份认证&quot;">​</a></h4><p>云开发数据库安全规则在配置中使用全局变量 auth 与 doc 进行组合（auth 表示的是登录用户，而 doc 与云开发环境的数据库相关），让登录用户的权限依赖于记录的某个字段。</p><p>使用安全规则之后，用户与数据库之间产生联系。 doc 不只包括标定用户身份的_openid，还有很多字段，这让数据库的权限有了很大的灵活性。举个例子，一个数据库集合的安全规则如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//登录用户为记录的创建者时，才有权限读</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;read&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;auth.openid == doc._openid&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#6A737D;">//不允许记录的创建者删除记录（只允许其他人删除）</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;delete&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;auth.openid != doc._openid&quot;</span><span style="color:#E1E4E8;">,</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//登录用户为记录的创建者时，才有权限读</span></span>
<span class="line"><span style="color:#032F62;">&quot;read&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;auth.openid == doc._openid&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6A737D;">//不允许记录的创建者删除记录（只允许其他人删除）</span></span>
<span class="line"><span style="color:#032F62;">&quot;delete&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;auth.openid != doc._openid&quot;</span><span style="color:#24292E;">,</span></span></code></pre></div><p>在这个例子中，auth.openid 是当前的登录用户身份 ID，而记录 doc 里的 openid 是之前业务中对该记录产生某种关系的用户身份ID，这里是记录的创建者。</p><p>所以上面例子的第一个语句，read（只读）配置，登录用户 ID 是记录创建者时才可以读，同理 delete 的配置是记录创建者不能删除，只能其他人可以删除。</p><p>这个例子很简单，你可以根据业务形态灵活而复杂地配置安全规则，达到保护数据库合法更新的目的。当然，关于安全规则的更多验证写法，你可以通过阅读<a href="https://docs.cloudbase.net/rule/introduce.html" target="_blank" rel="noreferrer">安全规则文档</a>掌握，我讲的内容是为了帮助你更好地理解这种规则写法，有助于你举一反三的学习使用。</p><h3 id="如何提升数据库的性能" tabindex="-1">如何提升数据库的性能 <a class="header-anchor" href="#如何提升数据库的性能" aria-label="Permalink to &quot;如何提升数据库的性能&quot;">​</a></h3><p>云开发数据库虽然高性能、支持弹性扩容，但很多开发者在使用的过程中，注重功能的实现，忽视了创建索引、优化语句等对数据库性能的影响，会遇到很多性能上的问题，所以我特意总结了云开发数据库性能优化的注意事项。</p>`,28),F=o('<h4 id="数据库性能优化建议" tabindex="-1">数据库性能优化建议 <a class="header-anchor" href="#数据库性能优化建议" aria-label="Permalink to &quot;数据库性能优化建议&quot;">​</a></h4><ul><li><p><strong>要合理使用索引：</strong> 使用索引可以提高文档查询、更新、删除等操作的效率，你要结合查询情况，适当创建索引，尽量避免全表扫描，考虑在 where 及 order by 涉及的列上建立索引。</p></li><li><p><strong>结合查询情况创建组合索引：</strong> 要想查询包含多个字段(键)条件，创建包含这些字段的组合索引是个不错的解决方案，组合索引遵循最左前缀原则，因此创建顺序很重要。</p></li><li><p><strong>查询时要尽可能通过条件和 limit 限制数据：</strong> 在查询里 where 可以限制处理文档的数量，而在聚合运算中 match 要放在 group 前面，减少 group 操作要处理的文档数量。无论是普通查询还是聚合查询都应该用 limit 限制返回的数据数量。</p></li><li><p><strong>尽可能限制返回的字段等数据量：</strong> 如果查询无须返回整个文档或只是用来判断键值是否存在，普通查询可以通过 filed、聚合查询可以通过 project 来限制返回的字段，减少网络流量和客户端的请求内存占用。</p></li><li><p><strong>查询量大时不要用正则查询：</strong> 正则表达式查询不能使用索引，执行的时间比大多数选择器更长，所以业务量比较大的查询请求，不建议用正则查询（尽量用其他方式代替），如果用一定要尽可能地缩写模糊匹配的范围（比如用开始匹配符 ^ 或结束匹配符 $ ）。</p></li><li><p><strong>尽可能使用更新指令set：</strong> 通过更新指令修改文档可以获得更好的性能，因为更新指令不需要查询到记录就可以直接对文档进行字段级的更新，尤其是对不用更新整个文档只更新部分字段的场景。</p></li><li><p><strong>不要对太多数据进行排序：</strong> 不要一次性取出太多数据并对数据排序，排序要尽量限制结果集中的数据量，比如先用 where、match 等操作限制数据量，也就是通常要把 orderBy 放在普通查询或聚合查询的最后面。</p></li><li><p><strong>不要让数据库请求做多余的事情：</strong> 数据库尽可能只做必要的工作，对数据进行加工处理的操作尽可能转到外部去操作；另外，尽可能一次性取出业务所需的全部数据，如果不能则需要合理设计数据库结构。</p></li><li><p><strong>使用短字段名：</strong> 和关系型数据库不同，云开发数据库是文档型数据库，集合中的每一个文档都需要存储字段名，因此字段名的长度相比关系型数据库来说需要更多的存储空间。</p></li><li><p><strong>尽量不要把数据库请求放到循环体内：</strong> 我们经常会有查询数据库里的数据，并对数据进行处理之后再写回数据库的需求，如果查询到的数据很多，我们要进行循环处理，而这时你要注意，不要把数据库请求放到循环体内，而是先一次性查询多条数据，在循环体内对数据进行处理之后再一次性写回数据库。</p></li></ul><p>总的来讲，你要结合具体的业务情况来理解这 10 条优化建议，尤其要重视对请求频繁的数据库操作进行优化，比如小程序首页的数据请求。</p><h4 id="提升数据库性能的设计" tabindex="-1">提升数据库性能的设计 <a class="header-anchor" href="#提升数据库性能的设计" aria-label="Permalink to &quot;提升数据库性能的设计&quot;">​</a></h4><ul><li><strong>增加冗余字段</strong></li></ul><p>在业务上有些关键的数据可以通过间接的方式查询获取到，但是由于查询时会存在计算、跨表等问题，这个时候建议新增一些冗余字段。</p><p>比如你要统计文章后面的评论数，你也许会把文章的评论独立建了一个集合如 comments，这时要获取每篇文章的评论数可以根据文章的 ID 条件来 count 该文章有多少条评论。</p><p>类似于评论数的还有点赞量、收藏量等，这些虽然都是可以通过 count 的方式来间接获取到的，但是在评论数很多的情况下，count <s>是</s>非常耗性能，而且还需要独立占据一个请求。</p><p>我建议你在数据库设计时，用所谓的冗余字段来记录每篇文章的点赞量、评论数、收藏量，在小程序端直接用 inc 原子自增的方式更新该字段的值。</p><p>比如我们希望在博客的首页展示文章列表，而每篇文章要显示评论总数。使用 count 获取总数，不如直接查询新增的冗余字段commentNum来得直接。</p><ul><li><strong>虚假删除</strong></li></ul><p>有时候我们的业务会需要用户经常删除数据库里面的记录或记录里的数组，但是删除数据非常耗费性能，碰上业务高峰期，数据库会出现性能问题。这时，我建议你新增冗余字段做虚假删除，比如给记录添加 delete 的字段，默认值为 false，当执行删除的时候，可以将字段的值设置 true，查询时只显示 delete 为 false 的记录，这样数据在前端就不显示了。在业务低谷时比如凌晨可以结合定时触发器每天这个时候清理一遍。</p><ul><li><strong>尽量使用一个数据库请求，代替多个数据库请求</strong></li></ul><p>尤其是用户最常访问的首页，如果一个页面的数据库请求太多，会导致数据库的并发问题。有些数据能够缓存到小程序端就缓存到小程序端，不必过分强调数据的一致性。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>本节我主要从数据库设计层面深度讲解了如何高效使用云开发数据库，并没有过多提到操作 API 相关的知识点，因为文档中明确的解释这些内容并提供了完善的示例代码。除了最基本的增删改查之外，云开发数据库还提供了一些特别的能力（实时数据推送、备份与回档、数据库事务等）助力你快速开发。今天这节课我想强调几个重点：</p><ul><li><p>根据自己的业务合理地进行范式化和反范式化设计；</p></li><li><p>充分使用数据库的安全规则保护自己的数据库，防止权限过度泄漏遭到业务问题；</p></li><li><p>在使用云开发数据库时，一定要遵循强调的几点建议，合理使用，不可滥用。</p></li></ul><p>当你在学习完本章节后，你就可以基本掌握数据库的使用规范了，在遇到数据库查询高耗时等问题时，你可以参照本节内容的优化建议，进行修缮和改造，降低查询耗时。通过反复的实践锻炼，你就可以形成完善的云开发数据库使用技巧和规范，低成本高效率地完成复杂业务场景下的大型应用。我留给你的作业是：在课下亲自动手，充分发挥云开发数据库的作用。</p>',18);function m(b,C,A,B,f,k){const n=e("Image");return t(),c("div",null,[i,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/89/65/Ciqc1F_YWhmAUJFEAABNAHnbyIk070.png"}),a(),E,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/89/70/CgqCHl_YWiKAR1RFAABMEo6GuPE428.png"}),a(),y,d,u,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/89/65/Ciqc1F_YWiqAZmzEAAEjsREvLEw593.png"}),a(),h,_,g,l(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/89/65/Ciqc1F_YWj6AVK07AAEzfZrJn1s066.png"}),a(),q,l(n,{alt:"小程序14-金句.png",src:"https://s0.lgstatic.com/i/image/M00/8B/DE/CgqCHl_hcnSAYEWLAAEP0bG0HwU999.png"}),a(),F])}const P=p(r,[["render",m]]);export{v as __pageData,P as default};

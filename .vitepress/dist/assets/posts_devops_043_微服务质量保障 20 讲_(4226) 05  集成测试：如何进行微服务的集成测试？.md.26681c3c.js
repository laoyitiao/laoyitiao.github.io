import{_ as s,o as a,g as n,Q as l}from"./chunks/framework.f949202b.js";const h=JSON.parse('{"title":"集成测试的概念 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/043_微服务质量保障 20 讲/(4226) 05  集成测试：如何进行微服务的集成测试？.md","filePath":"posts/devops/043_微服务质量保障 20 讲/(4226) 05  集成测试：如何进行微服务的集成测试？.md","lastUpdated":null}'),p={name:"posts/devops/043_微服务质量保障 20 讲/(4226) 05  集成测试：如何进行微服务的集成测试？.md"},e=l(`<p>上一课时，我讲解了微服务架构下的单元测试，它是一种白盒测试技术，目的是验证软件代码中的每个单元（方法或类等）是否符合预期。本节课我来讲解微服务架构下的集成测试。</p><h3 id="集成测试的概念" tabindex="-1">集成测试的概念 <a class="header-anchor" href="#集成测试的概念" aria-label="Permalink to &quot;集成测试的概念&quot;">​</a></h3><p>说到集成测试，相信每个测试工程师并不陌生，它不是一个崭新的概念，通过<a href="https://en.wikipedia.org/wiki/Integration_testing" target="_blank" rel="noreferrer">维基百科</a>定义可以知道它在传统软件测试中的含义。</p><blockquote><p>Integration testing (sometimes called integration and testing, abbreviated I&amp;T) is the phase in software testing in which individual software modules are combined and tested as a group. Integration testing is conducted to evaluate the compliance of a system or component with specified functional requirements.</p></blockquote><p>即，集成测试（有时称为集成和测试，简称 I＆T）是软件测试中的阶段，在该阶段中，将各个单独开发的软件模块组合在一起并进行整体测试，以便评估系统或组件是否符合指定的功能要求。</p><p>微服务架构下也需要集成测试，<strong>需要针对不同服务的不同方法之间的通信情况进行相关测试。</strong> 因为在对微服务进行单元测试时，单元测试用例只会验证被测单元的内部逻辑，并不验证其依赖的模块。即使对于服务 A 和服务 B 的单元测试分别通过，并不能说明服务 A 和服务 B 的交互是正常的。</p><p>对于微服务架构来说，<strong>集成测试通常关注于验证那些与外部组件（例如数据存储或其他微服务）通信的子系统或模块。</strong> 目标是验证这些子系统或模块是否可以正确地与外部组件进行通信，而不是测试外部组件是否正常工作。因此，微服务架构下的集成测试，应该验证要集成的子系统之间与外部组件之间的基本通信路径，包括正确路径和错误路径。</p><h3 id="微服务架构下的集成测试" tabindex="-1">微服务架构下的集成测试 <a class="header-anchor" href="#微服务架构下的集成测试" aria-label="Permalink to &quot;微服务架构下的集成测试&quot;">​</a></h3><p><img src="https://s0.lgstatic.com/i/image/M00/3A/D1/CgqCHl8iem-AFErwAAUV3BnSpVE692.png" alt="image (6).png"><br> 微服务结构图与集成测试边界</p><p>如上图所示，网关组件层（Gateways+Http Client+External Service）包含了访问外部服务的逻辑，通常包含一个 HTTP/S 的客户端，客户端会连接到系统中另一个微服务或外部服务。数据持久层（Date Mappers/ORM）用于连接外部数据存储。</p><p>即，微服务架构下的集成测试主要包括两部分：</p><ol><li><p><strong>网关组件层，</strong> 微服务的组件与外部服务的通信路径；</p></li><li><p><strong>数据持久层，</strong> 数据库访问模块与外部数据库的交互。</p></li></ol><p>这里请注意，因为需要测试微服务下子系统之间的通信和外部服务的通信是否正确，所以<strong>理想情况下不应该对外部组件使用测试替身（Test Double）。</strong></p><p>下面我们逐一来看这两部分是如何进行集成测试的：</p><h4 id="_1-网关组件层集成测试" tabindex="-1">（1）网关组件层集成测试 <a class="header-anchor" href="#_1-网关组件层集成测试" aria-label="Permalink to &quot;（1）网关组件层集成测试&quot;">​</a></h4><p><img src="https://s0.lgstatic.com/i/image/M00/3A/D1/CgqCHl8ieoeAGpreAABlJ9Cf-_M925.png" alt="image (7).png"></p><p>假设有个登录服务，该服务需要知道当前时间，而时间是由一个外部的<a href="http://worldclockapi.com" target="_blank" rel="noreferrer">时间服务</a>提供的。当向<a href="http://worldclockapi.com/api/json/cet/now" target="_blank" rel="noreferrer">/api/json/cet/now</a>发出 GET 请求时，状态码为 200，并返回如下完整的时间信息。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{ </span></span>
<span class="line"><span style="color:#B392F0;">$id</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#B392F0;">currentDateTime</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;2020-07-29T02:11+02:00&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#B392F0;">utcOffset</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;02:00:00&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#B392F0;">isDayLightSavingsTime</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#B392F0;">dayOfTheWeek</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Wednesday&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#B392F0;">timeZoneName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Central Europe Standard Time&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#B392F0;">currentFileTime</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">132404622740972830</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#B392F0;">ordinalDate</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;2020-211&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#B392F0;">serviceResponse</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{ </span></span>
<span class="line"><span style="color:#6F42C1;">$id</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#6F42C1;">currentDateTime</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;2020-07-29T02:11+02:00&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#6F42C1;">utcOffset</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;02:00:00&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#6F42C1;">isDayLightSavingsTime</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#6F42C1;">dayOfTheWeek</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Wednesday&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#6F42C1;">timeZoneName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Central Europe Standard Time&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#6F42C1;">currentFileTime</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">132404622740972830</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#6F42C1;">ordinalDate</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;2020-211&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#6F42C1;">serviceResponse</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>如果访问的 URL 错误，比如向 <a href="http://worldclockapi.com/api/json111/cet/now" target="_blank" rel="noreferrer">/api/json111/cet/now</a>发出 GET 请求时，状态码为 404，返回如下错误提示。</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">您要找的资源已被删除、已更名或暂时不可用。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">您要找的资源已被删除、已更名或暂时不可用。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>一般来说，集成测试会负责检验与外部服务的连接以及交互协议相关的问题，如 HTTP header 的缺失、SSL 处理的异常，或者请求/响应的不匹配。所有的错误处理逻辑都需要在测试中被覆盖，以确保所使用的服务和协议客户端在特殊情况下能够按预期进行响应。</p><h4 id="_2-数据持久层集成测试" tabindex="-1">（2）数据持久层集成测试 <a class="header-anchor" href="#_2-数据持久层集成测试" aria-label="Permalink to &quot;（2）数据持久层集成测试&quot;">​</a></h4><p>数据持久层的集成测试则要复杂一些，因为结果会被保存在存储系统上并被持久化，每次测试的执行都可能因为更改了数据而对后续测试的执行产生影响。这意味着，两次测试之间并非完全独立，因为它们操作了共同的数据。</p><p>绝大多数情况下，应该保证两次测试之间的外部因素也是相互独立的。因为这样的错误（测试数据的修改而导致的测试执行失败）出现后往往很难意识到，进而影响排查进度。</p><p>为了保障两次测试的独立性，持久层集成测试的常见步骤是：</p><ol><li><p>在执行任意测试前，先回退数据库到一个已知且可预测的状态，这需要清理/回滚之前对数据库的修改；</p></li><li><p>通过插入对测试来说已知且预期中的数据来重建数据库；</p></li><li><p>进行相关的测试；</p></li><li><p>循环上述这个过程。</p></li></ol><p><img src="https://s0.lgstatic.com/i/image/M00/3A/C6/Ciqc1F8ieqeAa4YoAABZtUlBe2M988.png" alt="image (8).png"></p><h3 id="常见问题及解决策略" tabindex="-1">常见问题及解决策略 <a class="header-anchor" href="#常见问题及解决策略" aria-label="Permalink to &quot;常见问题及解决策略&quot;">​</a></h3><p>然而，有很多时候外部服务不可用（服务尚未开发完成、服务有 block 级别的缺陷未修复），或其异常行为（如外部组件的超时、响应变慢等）很难去验证。外部组件不能使用测试替身，外部服务又不可用或异常场景难构造，看似无解，实际上都是有替代方案的。</p><h4 id="服务不可用" tabindex="-1">服务不可用 <a class="header-anchor" href="#服务不可用" aria-label="Permalink to &quot;服务不可用&quot;">​</a></h4><p>针对服务不可用的情况，<strong>微服务虚拟化技术</strong>可以完美解决这种问题，它是避免与其他服务通信时出现意外的必要工具，在具有大量依赖项的企业环境中工作的时候更是如此。它可以用于在测试阶段消除对第三方服务的依赖，测试应用程序在遇到延迟或其他网络问题时的行为。它通过创建代理服务实现对依赖服务的模拟，特别适合测试服务之间的通信。常见的工具有 Wiremock、Hoverfly、Mountebank 等。</p><p>以 Wiremock 为例，如下代码的效果是：当相对 URL 完全匹配 /api/json/cet/now 时，将返回状态 200，响应的主体类似于 <a href="http://worldclockapi.com/api/json/cet/now" target="_blank" rel="noreferrer">/api/json/cet/now</a>的返回值，Content-Type Header 的值为 text/plain。否则，当相对 URL 错误，比如访问 /api/json<strong>111</strong>/cet/now 时，则返回 404 的错误。</p><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#9ECBFF;">Test</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">public void exactUrlOnly() {</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">stubFor(get(urlEqualTo(&quot;/api/json/cet/now&quot;))</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">.willReturn(aResponse()</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">.withHeader(&quot;Content-Type&quot;, &quot;text/plain&quot;)</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">.withBody(equalToJson(&quot;{</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                      </span><span style="color:#85E89D;">$id</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\\&quot;1\\&quot;,</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                      </span><span style="color:#85E89D;">currentDateTime</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\\&quot;2020-07-29T02:11+02:00\\&quot;,</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                      </span><span style="color:#85E89D;">utcOffset</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\\&quot;02:00:00\\&quot;,</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                      </span><span style="color:#85E89D;">isDayLightSavingsTime</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">true,</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                      </span><span style="color:#85E89D;">dayOfTheWeek</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\\&quot;Wednesday\\&quot;,</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                      </span><span style="color:#85E89D;">timeZoneName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\\&quot;Central Europe Standard Time\\&quot;,</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                      </span><span style="color:#85E89D;">currentFileTime</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">132404622740972830,</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                      </span><span style="color:#85E89D;">ordinalDate</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\\&quot;2020-211\\&quot;,</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                      </span><span style="color:#85E89D;">serviceResponse</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">null,</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                      }</span><span style="color:#9ECBFF;">&quot;)))); </span></span>
<span class="line"><span style="color:#9ECBFF;">    assertThat(testClient.get(&quot;/api/json/cet/now&quot;).statusCode(), is(200));</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">assertThat(testClient.get(&quot;/api/json111/cet/now&quot;).statusCode(), is(404));</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#032F62;">Test</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">public void exactUrlOnly() {</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">stubFor(get(urlEqualTo(&quot;/api/json/cet/now&quot;))</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">.willReturn(aResponse()</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">.withHeader(&quot;Content-Type&quot;, &quot;text/plain&quot;)</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">.withBody(equalToJson(&quot;{</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                      </span><span style="color:#22863A;">$id</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\\&quot;1\\&quot;,</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                      </span><span style="color:#22863A;">currentDateTime</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\\&quot;2020-07-29T02:11+02:00\\&quot;,</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                      </span><span style="color:#22863A;">utcOffset</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\\&quot;02:00:00\\&quot;,</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                      </span><span style="color:#22863A;">isDayLightSavingsTime</span><span style="color:#24292E;">: </span><span style="color:#032F62;">true,</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                      </span><span style="color:#22863A;">dayOfTheWeek</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\\&quot;Wednesday\\&quot;,</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                      </span><span style="color:#22863A;">timeZoneName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\\&quot;Central Europe Standard Time\\&quot;,</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                      </span><span style="color:#22863A;">currentFileTime</span><span style="color:#24292E;">: </span><span style="color:#032F62;">132404622740972830,</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                      </span><span style="color:#22863A;">ordinalDate</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\\&quot;2020-211\\&quot;,</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                      </span><span style="color:#22863A;">serviceResponse</span><span style="color:#24292E;">: </span><span style="color:#032F62;">null,</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                      }</span><span style="color:#032F62;">&quot;)))); </span></span>
<span class="line"><span style="color:#032F62;">    assertThat(testClient.get(&quot;/api/json/cet/now&quot;).statusCode(), is(200));</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">assertThat(testClient.get(&quot;/api/json111/cet/now&quot;).statusCode(), is(404));</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="服务超时-响应慢难构造" tabindex="-1">服务超时&amp;响应慢难构造 <a class="header-anchor" href="#服务超时-响应慢难构造" aria-label="Permalink to &quot;服务超时\\&amp;响应慢难构造&quot;">​</a></h4><p>如果使用真实服务测试，服务超时或响应慢等情况需要特殊构造下，这时候借助各种工具会比较方便，比如常见的软件有 Fiddler、Dummynet、Clumsy 等。</p><p>Wiremock 也支持延迟的功能，比如使用 withFixedDelay() 可以实现固定延迟的效果：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">stubFor</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">urlEqualTo</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/api/json/cet/now&quot;</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">willReturn</span><span style="color:#E1E4E8;">( </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">aResponse</span><span style="color:#E1E4E8;">() </span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">withStatus</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">withFixedDelay</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">)));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">stubFor</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">urlEqualTo</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/api/json/cet/now&quot;</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">willReturn</span><span style="color:#24292E;">( </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">aResponse</span><span style="color:#24292E;">() </span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">withStatus</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">200</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">withFixedDelay</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2000</span><span style="color:#24292E;">)));</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>使用 withLogNormalRandomDelay() 可以实现随机延迟效果：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">stubFor</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">urlEqualTo</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/api/json/cet/now&quot;</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">willReturn</span><span style="color:#E1E4E8;">( </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">aResponse</span><span style="color:#E1E4E8;">() </span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">withStatus</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">withLogNormalRandomDelay</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">90</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.1</span><span style="color:#E1E4E8;">)));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">stubFor</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">urlEqualTo</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/api/json/cet/now&quot;</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">willReturn</span><span style="color:#24292E;">( </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">aResponse</span><span style="color:#24292E;">() </span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">withStatus</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">200</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">withLogNormalRandomDelay</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">90</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.1</span><span style="color:#24292E;">)));</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="数据初始化和构造的成本高" tabindex="-1">数据初始化和构造的成本高 <a class="header-anchor" href="#数据初始化和构造的成本高" aria-label="Permalink to &quot;数据初始化和构造的成本高&quot;">​</a></h4><p>上述对数据持久层集成测试的方法虽然通用，但是将数据库进行初始化需要编写大量的样例代码，插入预期的数据也需要编写大量的数据库操作语句。面对这个问题，可以使用一些现成的<strong>持久化测试框架</strong>来改善测试体验，常见的持久化测试框架有 NoSQLUnit、DBUnit 等。</p><p>DBUnit 的设计理念就是在测试之前，先备份好数据库，再给对象数据库植入需要准备的数据，在测试完毕后，再读入备份数据库，初始化到测试前的状态。DBUnit 可以在测试用例的生命周期内来对数据库的操作结果进行比较。DBUnit 支持的数据库有 db2、h2、mssql、mysql、oralce、postgresql 等。</p><p>NoSQLUnit 是用 DBUnit 类似的方式来编写 NoSQL 数据库的测试。支持多种 NoSQL 数据库，包括 HBase、MongoDB、Redis、ElasticSearch、Vault、Neo4j 等。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本节课讲解了微服务架构下的集成测试定义，接着讲解了微服务下的集成测试的两个方面：网关组件层集成测试和数据持久层集成测试。</p><ul><li><p>在网关组件层集成测试中，通过服务虚拟化技术来实现对外部服务能力的模拟，通过模拟网络异常情况来构造外部服务超时、响应慢的情况。</p></li><li><p>在数据持久层集成测试中，通过持久化测试框架可以避免常规持久化测试时编写大量代码和大量 SQL 语句的情况。</p></li></ul><p>当然，如上框架和工具的威力不限于此，文中只给出了关键的示例信息，你可以根据需求或兴趣自行探索学习。</p><p>你负责的模块或服务里，是否进行过集成测试，进展如何，欢迎在留言区评论。同时欢迎你能把这篇文章分享给你的同学、朋友和同事，大家一起来交流。</p><blockquote><p><strong>相关链接：</strong></p><p>集成测试<br><a href="https://en.wikipedia.org/wiki/Integration_testing" target="_blank" rel="noreferrer">https://en.wikipedia.org/wiki/Integration_testing</a><br><a href="https://martinfowler.com/bliki/IntegrationTest.html" target="_blank" rel="noreferrer">https://martinfowler.com/bliki/IntegrationTest.html</a><br><a href="https://www.martinfowler.com/articles/microservice-testing/" target="_blank" rel="noreferrer">https://www.martinfowler.com/articles/microservice-testing/</a></p><p>服务虚拟化工具</p><p>WireMock： <a href="http://wiremock.org/" target="_blank" rel="noreferrer">http://wiremock.org/</a></p><p>Hoverfly： <a href="https://hoverfly.io/" target="_blank" rel="noreferrer">https://hoverfly.io/</a></p><p>Mountebank： <a href="http://www.mbtest.org/" target="_blank" rel="noreferrer">http://www.mbtest.org/</a></p><p>持久化测试工具</p><p>DBUnit：<a href="http://www.dbunit.org/" target="_blank" rel="noreferrer">http://www.dbunit.org/</a></p><p>NoSQLUnit： <a href="https://github.com/lordofthejars/nosql-unit" target="_blank" rel="noreferrer">https://github.com/lordofthejars/nosql-unit</a></p><p>网络模拟软件</p><p>Dummynet： <a href="https://github.com/luigirizzo/dummynet" target="_blank" rel="noreferrer">https://github.com/luigirizzo/dummynet</a></p><p>Clumsy： <a href="https://jagt.github.io/clumsy/cn/index.html" target="_blank" rel="noreferrer">https://jagt.github.io/clumsy/cn/index.html</a></p></blockquote>`,49),o=[e];function t(r,c,i,E,y,u){return a(),n("div",null,o)}const m=s(p,[["render",t]]);export{h as __pageData,m as default};

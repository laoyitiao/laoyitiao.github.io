import{_ as s,o as a,g as n,Q as o}from"./chunks/framework.f949202b.js";const F=JSON.parse('{"title":"清晰明了，学习成本低 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4664) 02  经验凝练，反复践行的 13 条自动化测试框架设计原则.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4664) 02  经验凝练，反复践行的 13 条自动化测试框架设计原则.md","lastUpdated":null}'),p={name:"posts/devops/114-测试开发入门与实战文档/(4664) 02  经验凝练，反复践行的 13 条自动化测试框架设计原则.md"},l=o(`<p>不知你是否遇到过以下问题：你的小组新开了个项目，要做自动化测试，老板说：&quot;你们不是有自动化框架吗？把那个拿过来用&quot;。接到这个任务后，你便兴致勃勃地去做了，结果发现要改的东西太多，无法直接在新项目使用原来的框架。</p><p>或者你正在调试一个测试脚本，它出错了，你却无法一眼看出来在那个地方出错了？定位问题要打断点一步一步调试。甚至公司原先写框架的那个人离职了，慢慢地，这个框架就废弃了，没人用了。</p><p>如果你被这些问题困扰过，你就知道，这些都是因为没有遵循测试设计原则导致的。</p><p>测试设计原则很重要，但还是经常会有同学问我，为什么要制定这么多原则？为什么不直接动手搭建框架？这时，我通常会举下面的例子来说明&quot;按照原则进行框架设计&quot;的必要性，它能帮助你少走很多弯路。</p><p><img src="https://s0.lgstatic.com/i/image/M00/4E/F9/CgqCHl9fQw2AXcStAAIBCvm9WlQ193.png" alt="222.png"></p><p>这个过程你会发现，如果你总是碰见一个问题解决一个问题，那么当需求积累至一定高度时，比如十万人都要过河时，你才发现已经无法单一性地解决问题了，你亟须建造一座桥梁，来系统解决问题。</p><p>所以测试框架的设计原则，在我看来就是造桥经验的教训总结，让你能够跳过建造木筏、小船这些步骤，而直接去建造桥梁，直达最优的根本方法，并保障在面对大规模、复杂场景应用时，仍然能发挥稳健。</p><p>以下五大类，合计 13 条设计原则是我多年经验的实践总结，希望你能充分理解，并在实践中灵活运用，从而少走一些弯路。</p><ul><li><p>清晰明了，学习成本低；</p></li><li><p>通用性强、可维护、可扩展；</p></li><li><p>对错误的处理能力强；</p></li><li><p>运行效率高且功能强大；</p></li><li><p>支持持续集成和版本控制。</p></li></ul><p>接下来，我会展开一 一讲述。</p><h3 id="清晰明了-学习成本低" tabindex="-1">清晰明了，学习成本低 <a class="header-anchor" href="#清晰明了-学习成本低" aria-label="Permalink to &quot;清晰明了，学习成本低&quot;">​</a></h3><p>自动化测试框架是个系统性工程，需要多成员一起运作，为了降低使用人员的学习成本，提升运行效率，自动化测试框架的代码、模块、报告应清晰明了。</p><h4 id="_1-代码规范" tabindex="-1">1.代码规范 <a class="header-anchor" href="#_1-代码规范" aria-label="Permalink to &quot;1.代码规范&quot;">​</a></h4><p>测试框架随着业务推进，必然会涉及代码的二次开发，所以代码编写应符合通用规范，代码命名符合业界标准，并且代码层次清晰。</p><p>特别在大型项目、多人协作型项目中，如果代码没有良好的规范，那么整个框架的代码会风格混杂、晦涩难懂，后续维护会很困难，最终成为没人敢动的&quot;祖传代码&quot;。</p><p>比如，下面的代码你要极力避免：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ll </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [{</span><span style="color:#9ECBFF;">&quot;person&quot;</span><span style="color:#E1E4E8;">: {</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;kevin&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;country&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;cn&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;traveled&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;no&quot;</span><span style="color:#E1E4E8;">}, </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">}, </span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span><span style="color:#9ECBFF;">&quot;person&quot;</span><span style="color:#E1E4E8;">: {</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Alex&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;country&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;us&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;traveled&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;yes&quot;</span><span style="color:#E1E4E8;">}, </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">}]</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hesuan_test</span><span style="color:#E1E4E8;">(l):</span></span>
<span class="line"><span style="color:#E1E4E8;">    l1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> l:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> i.keys():</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (j </span><span style="color:#F97583;">==</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(i[</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">                        l1.append(i[</span><span style="color:#9ECBFF;">&quot;person&quot;</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">] )</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> l1</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__main__&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(hesuan_test(ll))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ll </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [{</span><span style="color:#032F62;">&quot;person&quot;</span><span style="color:#24292E;">: {</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;kevin&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;country&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;cn&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;traveled&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;no&quot;</span><span style="color:#24292E;">}, </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">}, </span></span>
<span class="line"><span style="color:#24292E;">    {</span><span style="color:#032F62;">&quot;person&quot;</span><span style="color:#24292E;">: {</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Alex&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;country&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;us&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;traveled&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;yes&quot;</span><span style="color:#24292E;">}, </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">}]</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hesuan_test</span><span style="color:#24292E;">(l):</span></span>
<span class="line"><span style="color:#24292E;">    l1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> l:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> i.keys():</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (j </span><span style="color:#D73A49;">==</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(i[</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">                        l1.append(i[</span><span style="color:#032F62;">&quot;person&quot;</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">] )</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> l1</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__main__&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(hesuan_test(ll))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>上面的代码，定义了一个函数来判断列表的人是否需要做核酸检测。可以看到，代码有如下缺点：</p><ul><li><p>函数名称中英文混杂；</p></li><li><p>函数体内变量命名随意，根本看不出业务含义；</p></li><li><p>函数不简洁，这么简单的函数有 2 个 for 循环，2 个 if 判断分支语句，很烦琐；</p></li></ul><p>总之，就是一点也不 &quot;pythonic&quot;，不是简洁优美的代码，甚至很难让人看出它的功能。</p><p>我们通常说这样的代码有坏味道（Bad Smell），会毁掉代码的易用性和可维护性，编程时一定要注意避免。</p><p>下面我将这个代码优化下，示范一个好代码才会有的&quot;代码即文档&quot;的效果：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">to_test_person_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [{</span><span style="color:#9ECBFF;">&quot;person&quot;</span><span style="color:#E1E4E8;">: {</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;kevin&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;country&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;cn&quot;</span><span style="color:#E1E4E8;">,   </span><span style="color:#9ECBFF;">&quot;traveled&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;no&quot;</span><span style="color:#E1E4E8;">}, </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">}, </span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span><span style="color:#9ECBFF;">&quot;person&quot;</span><span style="color:#E1E4E8;">: {</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Alex&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;country&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;us&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;traveled&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;yes&quot;</span><span style="color:#E1E4E8;">}, </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">}]</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">covid19_test</span><span style="color:#E1E4E8;">(person_list):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> [person[</span><span style="color:#9ECBFF;">&#39;person&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&#39;name&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> person </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> person_list </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> person[</span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__main__&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(covid19_test(to_test_person_list))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">to_test_person_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [{</span><span style="color:#032F62;">&quot;person&quot;</span><span style="color:#24292E;">: {</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;kevin&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;country&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;cn&quot;</span><span style="color:#24292E;">,   </span><span style="color:#032F62;">&quot;traveled&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;no&quot;</span><span style="color:#24292E;">}, </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">}, </span></span>
<span class="line"><span style="color:#24292E;">    {</span><span style="color:#032F62;">&quot;person&quot;</span><span style="color:#24292E;">: {</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Alex&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;country&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;us&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;traveled&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;yes&quot;</span><span style="color:#24292E;">}, </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">}]</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">covid19_test</span><span style="color:#24292E;">(person_list):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> [person[</span><span style="color:#032F62;">&#39;person&#39;</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&#39;name&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> person </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> person_list </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> person[</span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__main__&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(covid19_test(to_test_person_list))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>好的编程规范，可以帮我们快速理清业务逻辑，避免后续业务出现&quot;搞不清逻辑不敢改&quot; &quot;不知道坑在哪里，不敢重构&quot;的情况。</p><p>那么，业界标准的代码规范有哪些呢？不同语言的代码规范不尽相同。以 Python 为例，我们一般以 PEP 8 为准，具体请参考 <a href="https://www.python.org/dev/peps/pep-0008/" target="_blank" rel="noreferrer">Python Software Foundation 官网</a>。</p><h4 id="_2-模块清晰明确" tabindex="-1">2.模块清晰明确 <a class="header-anchor" href="#_2-模块清晰明确" aria-label="Permalink to &quot;2.模块清晰明确&quot;">​</a></h4><p><strong>模块化</strong>是将测试框架从逻辑上分为几个不同的模块，如下列的模块化分层的测试框架所示，使用者可以根据实际情况自行裁剪。</p><p><img src="https://s0.lgstatic.com/i/image/M00/4E/F6/CgqCHl9fPmiAfdytAAGul6UWL7Y564.png" alt="Drawing 1.png"><br> 模块化分层的测试框架图</p><p>模块化的好处是<strong>可重用</strong> ，并且<strong>便于替换修改</strong>。</p><p>以上图为例，假设测试报告模块以前用的是 Allure，现在想替换成更加贴切自身业务的自研测试报告，我们仅需将报告模块替换掉就可以了。</p><p>但如果测试框架没有做模块化划分，测试报告是耦合在框架代码里的，那么就会导致无法切换测试报告，或者切换代价过大的问题，改动起来就会比较痛苦。</p><h3 id="通用性强、可维护、可扩展" tabindex="-1">通用性强、可维护、可扩展 <a class="header-anchor" href="#通用性强、可维护、可扩展" aria-label="Permalink to &quot;通用性强、可维护、可扩展&quot;">​</a></h3><p>接下来我会向你讲解&quot;通用性强、可维护、可扩展&quot;这一设计原则，这点是从框架推广和维护角度出发来考虑的。</p><h4 id="_1-通用性强" tabindex="-1">1.通用性强 <a class="header-anchor" href="#_1-通用性强" aria-label="Permalink to &quot;1.通用性强&quot;">​</a></h4><ul><li><p><strong>通用于不同的操作系统</strong>，比如，测试框架不仅适用在 Windows 操作系统上，还要适用在 MacOS、Linux 系统上，越通用，测试框架的受众就会越多。</p></li><li><p><strong>能解决同一类通用问题</strong>，比如，测试框架有个底层方法是用来操作弹出框的，那么无论是 Alert 框、确认框，还是一个允许用户输入的交互框，测试框架应该都能识别并操作。</p></li></ul><h4 id="_2-可维护、可扩展" tabindex="-1">2.可维护、可扩展 <a class="header-anchor" href="#_2-可维护、可扩展" aria-label="Permalink to &quot;2.可维护、可扩展&quot;">​</a></h4><p><strong>（1）可维护性</strong></p><p>测试框架要做到容易维护，就一定要代码规范，模块清晰，除此之外整个测试框架代码风格还应该统一、易读、易懂。总之，要做到框架出问题时能容易定位并修改；更要做到，即使多人合作这个框架，这个框架代码要看起来是出自同一人之手。</p><p>可维护性无法用具体的指标衡量，也没有标准的实现方式。</p><p>但不可维护性是可以感知的，因为不可维护性常常以代码逻辑混乱，不遵循编码规则等特征出现。所以一般通过消除不可维护性来证明测试框架是可维护的。不可维护的典型例子便是代码逻辑，比如一部分判断逻辑嵌套了非常多层的 if....else，就像上面的反例代码一样，这样的代码不易理解，改起来容易出错，这是你必须要避免的。</p><p><strong>（2）可扩展性</strong></p><p>可扩展性指当需求变化时框架容易扩展。如果测试框架不能扩展，就无法解决业务发展带来的新问题，也就意味着测试框架的寿命会很短。</p><p>下面我举例说明下什么是可扩展性，假设测试框架运行测试的流程是：查找测试文件夹下的所有用例 → 判断该用例是否要运行 → 加入用例到待运行用例集 → 顺序运行测试用例 → 输出测试报告。</p><p>比如现在随着业务发展，我有了新需求： 需要按照一定的规则将&quot;顺序运行&quot;改为&quot;并发运行&quot;，即将带有特定标签的测试用例改为&quot;并发运行&quot;，而将没带有特定标签的测试用例继续保持&quot;顺序运行&quot;。</p><p>如果我们的测试框架可扩展，那么我仅需简单更改&quot;顺序运行测试用例&quot;这个模块的相关代码即可；反之，我则需要将测试流程重新设置甚至改造，所以我说可扩展性是测试框架的一个重点。</p><h3 id="对错误的处理能力强" tabindex="-1">对错误的处理能力强 <a class="header-anchor" href="#对错误的处理能力强" aria-label="Permalink to &quot;对错误的处理能力强&quot;">​</a></h3><p>该原则是从测试运行的角度看的，当我们测试开始时，往往会运行很多测试用例，当测试出错时，测试框架如何处理才能让运行更有效率呢？</p><h4 id="_1-错误处理机制-高效解决" tabindex="-1">1.错误处理机制，高效解决 <a class="header-anchor" href="#_1-错误处理机制-高效解决" aria-label="Permalink to &quot;1.错误处理机制，高效解决&quot;">​</a></h4><p>在测试运行中，难免由于种种原因运行错误，这时测试框架就必须具备处理错误的能力。错误处理机制一般分为停止运行和错误恢复两种。</p><ul><li><p><strong>停止运行</strong>是指发现错误后直接停止本次测试，在实践中一般在测试框架本身出现错误的时候才会使用。</p></li><li><p>针对具体的测试用例执行，<strong>错误恢复</strong> 这种方式比较常见。其步骤通常是标记当前用例为&quot;失败&quot;，清理失败数据，恢复测试环境，然后再运行下一条测试。</p><p>其中，根据错误恢复的时机又可以分为<strong>事先恢复</strong> （当前用例运行前，将环境和数据恢复为初始状态）和<strong>事后恢复</strong> （当前用例执行完成后，将环境和数据恢复为初始状态）两种。</p><p>事先恢复现在是比较常用的，因为事后恢复可能会因为用例执行失败而永远执行不到。</p></li></ul><h4 id="_2-系统日志清晰-方便调试" tabindex="-1">2.系统日志清晰，方便调试 <a class="header-anchor" href="#_2-系统日志清晰-方便调试" aria-label="Permalink to &quot;2.系统日志清晰，方便调试&quot;">​</a></h4><p>除了错误处理机制外，系统的操作日志也能帮你快速排查问题根源，所以平时的日志一定要清晰详细，最好具备上下文，这样才能根据日志进行有效调试，快速定位错误发生的原因。</p><p>对于测试框架来说，系统日志除了要按等级 DEBUG、INFO、WARN、ERROR 划分外，最好包括以下内容：</p><ul><li><p>记录测试用例的开始和结束时间；</p></li><li><p>记录测试人员的关键操作（如写文件、连接 DB、更改 DB 等）；</p></li><li><p>关键方法的异常信息（如 run 模块出错部分的上下文信息等）。</p></li></ul><h3 id="运行效率高且功能强大" tabindex="-1">运行效率高且功能强大 <a class="header-anchor" href="#运行效率高且功能强大" aria-label="Permalink to &quot;运行效率高且功能强大&quot;">​</a></h3><p>在当前的互联网大环境下，每时每刻都可能有构建（Build）发生，有了构建就需要不断地测试，那么运行效率的高低直接决定了构建和发布的次数多少。</p><h4 id="_1-支持测试环境切换" tabindex="-1">1.支持测试环境切换 <a class="header-anchor" href="#_1-支持测试环境切换" aria-label="Permalink to &quot;1.支持测试环境切换&quot;">​</a></h4><p>一个产品从开发到上线，会经历几个测试环境的测试，比如 dev 环境， 集成测试环境，预生产环境，生成环境等。所以测试框架要能做到，一套脚本多环境运行，支持环境切换，并且能根据环境进行自动化的配置（包括系统配置、测试数据配置等）。</p><h4 id="_2-支持外部数据驱动" tabindex="-1">2.支持外部数据驱动 <a class="header-anchor" href="#_2-支持外部数据驱动" aria-label="Permalink to &quot;2.支持外部数据驱动&quot;">​</a></h4><p>根据外部输入数据，动态<strong>生成测试用例</strong>，并在测试报告中单独展示。测试框架会把这些只有数据不同，步骤和操作都相同的测试用例，在运行中解析成一个个不同的独立测试用例，并在测试运行结束后，全部逐一展示到测试报告里。</p><p>根据外部输入数据，动态<strong>切换运行用例</strong>。测试目的不同，其需要采用的测试用例也会不同，所以自动化测试框架会给各个测试用例打上标签，再根据需要，自动选择具备特定标签的测试用例进行运行。</p><h4 id="_3-支顺序、并发、远程运行" tabindex="-1">3.支顺序、并发、远程运行 <a class="header-anchor" href="#_3-支顺序、并发、远程运行" aria-label="Permalink to &quot;3.支顺序、并发、远程运行&quot;">​</a></h4><p>当你的测试用例有上千条，甚至上万条时，顺序测试会花费大量的时间。为了快速得到测试结果，测试框架应该支持顺序、并发、远程执行，这样能够缩短测试用例的整体执行时间。</p><h4 id="_4-报告完备详尽" tabindex="-1">4.报告完备详尽 <a class="header-anchor" href="#_4-报告完备详尽" aria-label="Permalink to &quot;4.报告完备详尽&quot;">​</a></h4><p>测试报告是 QA 工作中的重要一环，通常在一个项目结束或者一个 sprint 结束时发出。</p><p>虽然，在实际工作中，我们经常听到大家抱怨说测试报告太烦琐了，又不产生什么直接价值，但完备详尽的测试报告，不仅可以述说 QA 到底做了哪些工作，还可以看出整个项目的生命周期运行得平稳与否，软件的质量如何。</p><p>测试报告应该包含哪些部分？这些部分如何罗列？分别能看出来什么问题？你可以参考我的公众号 iTesting 发布过的一篇文章<a href="https://mp.weixin.qq.com/s/XaHRyNAUWOPDfTrvFbhwUQ" target="_blank" rel="noreferrer">《你真的能看懂测试报告吗？》</a>，来详细了解一份好的测试报告，究竟有哪些威力。</p><h4 id="_5-解决当前没有解决的问题" tabindex="-1">5.解决当前没有解决的问题 <a class="header-anchor" href="#_5-解决当前没有解决的问题" aria-label="Permalink to &quot;5.解决当前没有解决的问题&quot;">​</a></h4><p>&quot;不要重复造轮子&quot;是工具创造的首要原则。从功能角度看，框架得到认可，要么是<strong>解决了当前无法解决的问题</strong> ，要么是<strong>解决方案比当下的更好</strong>。</p><p>例如，Selenium/WebDriver 最开始为人所知是因为它开源、可跨平台；后来 Selenium/WebDriver 的替代者 Cypress 为人所知，是因为它还具备运行在浏览器之内，且自备 Mock 的能力。</p><p>所以，你的框架能不能被认可，就在于它是否具有<strong>独特的功能特性</strong>，这是与其他框架区别开来的标签，也是弥补市场空白的撒手锏。</p><h3 id="支持版本控制和持续集成" tabindex="-1">支持版本控制和持续集成 <a class="header-anchor" href="#支持版本控制和持续集成" aria-label="Permalink to &quot;支持版本控制和持续集成&quot;">​</a></h3><p>版本控制可以让使用者更好地理解框架的演变历史；框架支持持续集成可以让框架迅速融入公司的技术体系中，使框架被越来越多的团队接纳。</p><h4 id="_1-版本控制-回溯复盘" tabindex="-1">1. 版本控制，回溯复盘 <a class="header-anchor" href="#_1-版本控制-回溯复盘" aria-label="Permalink to &quot;1. 版本控制，回溯复盘&quot;">​</a></h4><p>什么是版本控制？其实就是将代码纳入版本控制系统（如 Git）的管理之下。那么为什么测试框架要做版本控制呢？请思考如下问题：</p><ul><li><p>你开发了功能 A，老板说这个功能不要，你就把 A 代码删除了。等一个月后业务发生了变化，功能 A 又变得需要了，如果没有版本控制，你怎么把 A 代码恢复回来？</p></li><li><p>我们知道，当前的测试开发中，一个人单打独斗的情形很少见了，常见的是团队协作开发。那么假设你和 B 在开发不同的功能，但是都改动到了同一个底层共享模块。那么如果没有版本控制，你们的代码提交后还能正常工作吗？</p></li></ul><p>假设有了版本控制，那么这些问题发生后，复盘时就非常容易找到根本原因，代码回溯也很方便，所以测试框架应该支持版本控制。</p><p>此外，还有一个用处就是对测试代码进行版本控制。假设你同时需要支持同一个微服务的两个不同版本的业务测试。有了版本控制，你的不同版本的测试代码就能以不同分支的形式出现，否则，你只能一次保持一个版本的代码，非常不方便。</p><p>有了版本控制，不仅协作开发、版本切换变得非常容易，使用者也可以通过查看版本之间的变化来理解框架的发展脉络。</p><h4 id="_2-持续集成-全局出发" tabindex="-1">2. 持续集成，全局出发 <a class="header-anchor" href="#_2-持续集成-全局出发" aria-label="Permalink to &quot;2. 持续集成，全局出发&quot;">​</a></h4><p>我要讲解的最后一条原则是&quot;支持持续集成&quot;，前面的原则是从测试本身角度出发的，而&quot;持续集成&quot;是从整个公司业务出发，需要你与整个开发团队合作完成，同时这是你晋级&quot;资深&quot;的体现。</p><p><strong>测试框架应该能方便地集成至公司的持续集成系统</strong> ，并且通过持续集成系统触发测试。我在**&quot;开篇词 | 功能测试转测试开发的正确姿势&quot;<strong>里提过，持续集成是</strong>资深测试开发**需要重点关注的部分。</p><p>一般来讲，公司的持续集成和持续发布系统通常由 DevOps 和开发架构师打造，测试要做的就是<strong>将测试框架融入公司的持续集成和持续发布技术栈</strong>。</p><p>那么测试框架就应支持通过持续集成系统，触发测试用例运行。具体来说就是：当某个代码提交的 hook 被触发时，持续集成会<strong>打包并部署最新代码到测试机上</strong>，此时测试框架及其对应的测试用例应能被唤醒并执行。</p><p>支持持续集成的程度决定了框架在团队和公司的接纳度。支持持续集成的成本越小，框架就越容易被推广和深度使用。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>最后我们来总结下今天的内容。</p><p>今天我讲了测试框架的设计原则，共五大类，合计 13 条，希望你在编写测试框架时能参考这些原则，少走一些弯路。这里的每一条原则，其实都是失败经验的总结，也就是实践的结果。</p><p>我想强调的是，好的测试框架，都不是设计出来的，除了参考原则，还需要你多多实践。只有不断实践，你的测试框架才能逐步演化成你希望的模样。所以希望你在后续的测试框架编写中，能多实践多总结。</p><p>好了，今天的分享就到这里，为了方便你理解，我把今天的内容制作成了一个脑图，供你查阅。</p><p><img src="https://s0.lgstatic.com/i/image/M00/4E/F9/CgqCHl9fQq-AKMN6AAGR0KwImwo354.png" alt="111.png"></p><hr><p><a href="https://shenceyun.lagou.com/t/eka" target="_blank" rel="noreferrer">&quot;测试开发工程师名企直推营&quot; 入口，免费领取 50G 资料包</a></p>`,93),t=[l];function e(r,c,E,y,u,i){return a(),n("div",null,t)}const h=s(p,[["render",e]]);export{F as __pageData,h as default};

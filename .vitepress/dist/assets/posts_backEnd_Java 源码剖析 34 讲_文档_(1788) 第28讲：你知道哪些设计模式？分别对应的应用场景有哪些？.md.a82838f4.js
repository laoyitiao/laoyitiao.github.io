import{_ as s,o as n,g as a,Q as p}from"./chunks/framework.b3d8e22e.js";const h=JSON.parse('{"title":"典型回答 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1788) 第28讲：你知道哪些设计模式？分别对应的应用场景有哪些？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1788) 第28讲：你知道哪些设计模式？分别对应的应用场景有哪些？.md","lastUpdated":1696338709000}'),l={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1788) 第28讲：你知道哪些设计模式？分别对应的应用场景有哪些？.md"},o=p(`<p>上一课时我们讲了单例模式的 8 种实现方式以及它的优缺点，可见设计模式的内容是非常丰富且非常有趣。我们在一些优秀的框架中都能找到设计模式的具体使用，比如前面 MyBatis 中（第 13 课时）讲的那些设计模式以及具体的使用场景，但由于设计模式的内容比较多，有些常用的设计模式在 MyBatis 课时中并没有讲到。因此本课时我们就以全局的视角，来重点学习一下这些常用设计模式。</p><p>我们本课时的面试题是，你知道哪些设计模式？它的使用场景有哪些？它们有哪些优缺点？</p><h3 id="典型回答" tabindex="-1">典型回答 <a class="header-anchor" href="#典型回答" aria-label="Permalink to &quot;典型回答&quot;">​</a></h3><p>设计模式从大的维度来说，可以分为三大类：创建型模式、结构型模式及行为型模式，这三大类下又有很多小分类。</p><p><strong>创建型模式</strong>是指提供了一种对象创建的功能，并把对象创建的过程进行封装隐藏，让使用者只关注具体的使用而并非对象的创建过程。它包含的设计模式有单例模式、工厂模式、抽象工厂模式、建造者模式及原型模式。</p><p>结构型模式关注的是对象的结构，它是使用组合的方式将类结合起来，从而可以用它来实现新的功能。它包含的设计模式是代理模式、组合模式、装饰模式及外观模式。</p><p>行为型模式关注的是对象的行为，它是把对象之间的关系进行梳理划分和归类。它包含的设计模式有模板方法模式、命令模式、策略模式和责任链模式。</p><p>下面我们来看看那些比较常见的设计模式的定义和具体的应用场景。</p><h4 id="_1-单例模式" tabindex="-1">1. 单例模式 <a class="header-anchor" href="#_1-单例模式" aria-label="Permalink to &quot;1. 单例模式&quot;">​</a></h4><p>单例模式是指一个类在运行期间始终只有一个实例，我们把它称之为<strong>单例模式</strong>。</p><p>单例模式的典型应用场景是 Spring 中 Bean 实例，它默认就是 singleton 单例模式。</p><p>单例模式的优点很明显，可以有效地节约内存，并提高对象的访问速度，同时避免重复创建和销毁对象所带来的性能消耗，尤其是对频繁创建和销毁对象的业务场景来说优势更明显。然而单例模式一般不会实现接口，因此它的扩展性不是很好，并且单例模式违背了单一职责原则，因为单例类在一个方法中既创建了类又提供类对象的复合操作，这样就违背了单一职责原则，这也是单例模式的缺点所在。</p><h4 id="_2-原型模式" tabindex="-1">2. 原型模式 <a class="header-anchor" href="#_2-原型模式" aria-label="Permalink to &quot;2. 原型模式&quot;">​</a></h4><p>原型模式属于创建型模式，它是指通过&quot;克隆&quot;来产生一个新的对象。所以它的核心方法是 clone()，我们通过该方法就可以复制出一个新的对象。</p><p>在 Java 语言中我们只需要实现 Cloneable 接口，并重写 clone() 方法就可以实现克隆了，实现代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CloneTest</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> CloneNotSupportedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 创建一个新对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        People p1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">People</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        p1.</span><span style="color:#B392F0;">setId</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        p1.</span><span style="color:#B392F0;">setName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Java&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 克隆对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        People p2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (People) p1.</span><span style="color:#B392F0;">clone</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 输出新对象的名称</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;People 2:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> p2.</span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">People</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Cloneable</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Integer id;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String name;</span></span>
<span class="line"><span style="color:#6A737D;">        /**</span></span>
<span class="line"><span style="color:#6A737D;">         * 重写 clone 方法</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#E1E4E8;">        @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">clone</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> CloneNotSupportedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">clone</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Integer </span><span style="color:#B392F0;">getId</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> id;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setId</span><span style="color:#E1E4E8;">(Integer </span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> id;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> name;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setName</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> name;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CloneTest</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> CloneNotSupportedException {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 创建一个新对象</span></span>
<span class="line"><span style="color:#24292E;">        People p1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">People</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        p1.</span><span style="color:#6F42C1;">setId</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        p1.</span><span style="color:#6F42C1;">setName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Java&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 克隆对象</span></span>
<span class="line"><span style="color:#24292E;">        People p2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (People) p1.</span><span style="color:#6F42C1;">clone</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 输出新对象的名称</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;People 2:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> p2.</span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">People</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Cloneable</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Integer id;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String name;</span></span>
<span class="line"><span style="color:#6A737D;">        /**</span></span>
<span class="line"><span style="color:#6A737D;">         * 重写 clone 方法</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#24292E;">        @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">clone</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> CloneNotSupportedException {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">clone</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Integer </span><span style="color:#6F42C1;">getId</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> id;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setId</span><span style="color:#24292E;">(Integer </span><span style="color:#E36209;">id</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> id;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> name;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setName</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">name</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>程序的执行结果为：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">People </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">Java</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">People </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">Java</span></span></code></pre></div><p>但需要注意的是，以上代码为<strong>浅克隆的实现方式</strong>，如果要实现深克隆（对所有属性无论是基本类型还是引用类型的克隆）可以通过以下手段实现：</p><ul><li>所有对象都实现克隆方法；</li><li>通过构造方法实现深克隆；</li><li>使用 JDK 自带的字节流实现深克隆；</li><li>使用第三方工具实现深克隆，比如 Apache Commons Lang；</li><li>使用 JSON 工具类实现深克隆，比如 Gson、FastJSON 等。</li></ul><p>具体的实现代码可以参考我们第 07 课时的内容。</p><p>原型模式的典型使用场景是 Java 语言中的 Object.clone() 方法，它的优点是性能比较高，因为它是通过直接拷贝内存中的二进制流实现的复制，因此具备很好的性能。它的缺点是在对象层级嵌套比较深时，复制的代码实现难度比较大。</p><h4 id="_3-命令模式" tabindex="-1">3. 命令模式 <a class="header-anchor" href="#_3-命令模式" aria-label="Permalink to &quot;3. 命令模式&quot;">​</a></h4><p>命令模式属于行为模式的一种，它是指将一个请求封装成一个对象，并且提供命令的撤销和恢复功能。说得简单一点就是将发送者、接收者和调用命令封装成独立的对象，以供客户端来调用，它的具体实现代码如下。</p><p>接收者的示例代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 接收者</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Receiver</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;执行业务逻辑&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 接收者</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Receiver</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;执行业务逻辑&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>命令对象的示例代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 命令接口</span></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Command</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">execute</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 具体命令类</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ConcreteCommand</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Command</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Receiver receiver;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ConcreteCommand</span><span style="color:#E1E4E8;">(Receiver </span><span style="color:#FFAB70;">receiver</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.receiver </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> receiver;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">execute</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.receiver.</span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 命令接口</span></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Command</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">execute</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 具体命令类</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ConcreteCommand</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Command</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Receiver receiver;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ConcreteCommand</span><span style="color:#24292E;">(Receiver </span><span style="color:#E36209;">receiver</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.receiver </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> receiver;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">execute</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.receiver.</span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>请求者的示例代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 请求者类</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Invoker</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 持有命令对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Command command;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Invoker</span><span style="color:#E1E4E8;">(Command </span><span style="color:#FFAB70;">command</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.command </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> command;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 请求方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">action</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.command.</span><span style="color:#B392F0;">execute</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 请求者类</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Invoker</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 持有命令对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Command command;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Invoker</span><span style="color:#24292E;">(Command </span><span style="color:#E36209;">command</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.command </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> command;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 请求方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">action</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.command.</span><span style="color:#6F42C1;">execute</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>客户端的示例代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 客户端</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Client</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 创建接收者</span></span>
<span class="line"><span style="color:#E1E4E8;">        Receiver receiver </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Receiver</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 创建命令对象，设定接收者</span></span>
<span class="line"><span style="color:#E1E4E8;">        Command command </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ConcreteCommand</span><span style="color:#E1E4E8;">(receiver);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 创建请求者，把命令对象设置进去</span></span>
<span class="line"><span style="color:#E1E4E8;">        Invoker invoker </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Invoker</span><span style="color:#E1E4E8;">(command);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 执行方法</span></span>
<span class="line"><span style="color:#E1E4E8;">        invoker.</span><span style="color:#B392F0;">action</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 客户端</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Client</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 创建接收者</span></span>
<span class="line"><span style="color:#24292E;">        Receiver receiver </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Receiver</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 创建命令对象，设定接收者</span></span>
<span class="line"><span style="color:#24292E;">        Command command </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ConcreteCommand</span><span style="color:#24292E;">(receiver);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 创建请求者，把命令对象设置进去</span></span>
<span class="line"><span style="color:#24292E;">        Invoker invoker </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Invoker</span><span style="color:#24292E;">(command);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 执行方法</span></span>
<span class="line"><span style="color:#24292E;">        invoker.</span><span style="color:#6F42C1;">action</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Spring 框架中的 JdbcTemplate 使用的就是命令模式，它的优点是降低了系统的耦合度，新增的命令可以很容易地添加到系统中；其缺点是如果命令很多就会造成命令类的代码很长，增加了维护的复杂性。</p><h3 id="考点分析" tabindex="-1">考点分析 <a class="header-anchor" href="#考点分析" aria-label="Permalink to &quot;考点分析&quot;">​</a></h3><p>对于设计模式的掌握程度来说，一般面试官都不会要求你要精通所有的设计模式，但需要对几个比较常用的设计模式有所理解和掌握才行。本课时介绍了 3 种设计模式加上 MyBatis 那一课时介绍的 7 种设计模式，足以应对日常的工作和一般性面试了。</p><p>和此知识点相关的面试题还有，软件中的六大设计原则是什么？这也是面试中经常会问的面试题，同时也是优秀程序设计的指导思想。</p><h3 id="知识扩展-六大设计原则" tabindex="-1">知识扩展：六大设计原则 <a class="header-anchor" href="#知识扩展-六大设计原则" aria-label="Permalink to &quot;知识扩展：六大设计原则&quot;">​</a></h3><p>六大设计原则包括：单一职责原则、里氏替换原则、依赖倒置原则、接口隔离原则、迪米特法则、开闭原则，接下来我们一一来看看它们分别是什么。</p><h4 id="_1-单一职责原则" tabindex="-1">1. 单一职责原则 <a class="header-anchor" href="#_1-单一职责原则" aria-label="Permalink to &quot;1. 单一职责原则&quot;">​</a></h4><p>单一职责是指一个类只负责一个职责。比如现在比较流行的微服务，就是将之前很复杂耦合性很高的业务，分成多个独立的功能单一的简单接口，然后通过服务编排组装的方式实现不同的业务需求，而这种细粒度的独立接口就是符合单一职责原则的具体实践。</p><h4 id="_2-开闭原则" tabindex="-1">2. 开闭原则 <a class="header-anchor" href="#_2-开闭原则" aria-label="Permalink to &quot;2. 开闭原则&quot;">​</a></h4><p>开闭原则指的是<strong>对拓展开放、对修改关闭</strong>。它是说我们在实现一个新功能时，首先应该想到的是扩展原来的功能，而不是修改之前的功能。</p><p>这个设计思想非常重要，也是一名优秀工程师所必备的设计思想。至于为什么要这样做？其实非常简单，我们团队在开发后端接口时遵循的也是这个理念。</p><p>随着软件越做越大，对应的客户端版本也越来越多，而这些客户端都是安装在用户的手机上。因此我们不能保证所有用户手中的 App（客户端）都一直是最新版本的，并且也不能每次都强制用户进行升级或者是协助用户去升级，那么我们在开发新功能时，就强制要求团队人员不允许直接修改原来的老接口，而是要在原有的接口上进行扩展升级。</p><p>因为直接修改老接口带来的隐患是老版本的 App 将不能使用，这显然不符合我们的要求。那么此时在老接口上进行扩展无疑是最好的解决方案，因为这样我们既可以满足新业务也不用担心新加的代码会影响到老版本的使用。</p><h4 id="_3-里氏替换原则" tabindex="-1">3. 里氏替换原则 <a class="header-anchor" href="#_3-里氏替换原则" aria-label="Permalink to &quot;3. 里氏替换原则&quot;">​</a></h4><p>里氏替换原则是面向对象（OOP）编程的实现基础，它指的是所有引用了父类的地方都能被子类所替代，并且使用子类替代不会引发任何异常或者是错误的出现。</p><p>比如，如果把鸵鸟归为了&quot;鸟&quot;类，那么鸵鸟就是&quot;鸟&quot;的子类，但是鸟类会飞，而鸵鸟不会飞，那么鸵鸟就违背了里氏替换原则。</p><h4 id="_4-依赖倒置原则" tabindex="-1">4. 依赖倒置原则 <a class="header-anchor" href="#_4-依赖倒置原则" aria-label="Permalink to &quot;4. 依赖倒置原则&quot;">​</a></h4><p>依赖倒置原则指的是要针对接口编程，而不是面向具体的实现编程。也就说高层模块不应该依赖底层模块，因为底层模块的职责通常更单一，不足以应对高层模块的变动，因此我们在实现时，应该依赖高层模块而非底层模块。</p><p>比如我们要从 A 地点去往 B 地点，此时应该掏出手机预约一个&quot;车&quot;，而这个&quot;车&quot;就是一个顶级的接口，它的实现类可以是各种各样的车，不同厂商的车甚至是不同颜色的车，而不应该依赖于某一个具体的车。例如，我们依赖某个车牌为 XXX 的车，那么一旦这辆车发生了故障或者这辆车正拉着其他乘客，就会对我的出行带来不便。所以我们应该依赖是&quot;车&quot;这一个顶级接口，而不是具体的某一辆车。</p><h4 id="_5-接口隔离原则" tabindex="-1">5. 接口隔离原则 <a class="header-anchor" href="#_5-接口隔离原则" aria-label="Permalink to &quot;5. 接口隔离原则&quot;">​</a></h4><p>接口隔离原则是指使用多个专门的接口比使用单一的总接口要好，即接口应该是相互隔离的小接口，而不是一个臃肿且庞杂的大接口。</p><p>使用接口隔离原则的好处是避免接口的污染，提高了程序的灵活性。</p><p>可以看出，接口隔离原则和单一职责原则的概念很像，<strong>单一职责原则</strong> 要求接口的职责要单一，而<strong>接口隔离原则</strong>要求接口要尽量细化，二者虽然有异曲同工之妙，但可以看出单一职责原则要求的粒度更细。</p><h4 id="_6-迪米特法则" tabindex="-1">6. 迪米特法则 <a class="header-anchor" href="#_6-迪米特法则" aria-label="Permalink to &quot;6. 迪米特法则&quot;">​</a></h4><p>迪米特法则又叫最少知识原则，它是指一个类对于其他类知道的越少越好。</p><p>迪米特法则设计的初衷是降低类之间的耦合，让每个类对其他类都不了解，因此每个类都在做自己的事情，这样就能降低类之间的耦合性。</p><p>这就好比我们在一些电视中看到的有些人在遇到强盗时，会选择闭着眼睛不看强盗，因为知道的信息越少反而对自己就越安全，这就是迪米特法则的基本思想。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>本课时我们讲了 3 种设计模式：单例模式、原型模式和命令模式，结合 MyBatis 那一课时（第 13 课时）介绍的 7 种设计模式，足以应对日常的工作和一般性的面试了。最后我们还介绍了设计模式中的 6 大设计原则：单一职责原则、开闭原则、里氏替换原则、依赖倒置原则、接口隔离原则和迪米特法则，我们应该结合这些概念对照日常项目中的代码，看看还有哪些代码可以进行优化和改进。</p>`,61),e=[o];function c(t,r,E,y,i,d){return n(),a("div",null,e)}const u=s(l,[["render",c]]);export{h as __pageData,u as default};

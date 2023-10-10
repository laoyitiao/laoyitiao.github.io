import{_ as a,j as l,o as p,g as o,k as e,h as r,Q as s}from"./chunks/framework.cfb14fe0.js";const C=JSON.parse('{"title":"第27讲：到底该不该了解算法？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3199) 第27讲：到底该不该了解算法？.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3199) 第27讲：到底该不该了解算法？.md","lastUpdated":1696682708000}'),t={name:"posts/frontEnd/前端高手进阶_文档/(3199) 第27讲：到底该不该了解算法？.md"},c=s('<h1 id="第27讲-到底该不该了解算法" tabindex="-1">第27讲：到底该不该了解算法？ <a class="header-anchor" href="#第27讲-到底该不该了解算法" aria-label="Permalink to &quot;第27讲：到底该不该了解算法？&quot;">​</a></h1><p>算法是为了解决某个问题抽象而成的计算方法，我们可以简单地把算法比作一个拥有输入和输出的函数，这个函数总能在有限的时间经过有限的步骤给出特定的解。</p><p>以往的前端开发场景中使用到算法的情况并不多，原因有下面 3 个。</p><ul><li><p>前端开发场景更关注页面效果及用户交互，大多数开发的时候只需要按照自然逻辑来编写代码即可，比如响应用户事件、控制组件加载与页面跳转，对于数据的操作停留在校验、请求、提交及格式化这些基础的操作，涉及数据计算的场景比较少。</p></li><li><p>前端运行环境浏览器性能有限，如果把大量的数据放到前端进行计算，无论是网络加载还是渲染数据都将耗费大量时间，从而导致用户体验下降。</p></li><li><p>在多端的系统中，算法运用在后端会更加高效。如果将算法运用在前端，很可能意味着需要在不同环境用不同语言重新再实现一遍。举个简单而不是特别恰当的例子，假设需要给用户展现一个树形图表，如果后端直接返回关系数据库中查询到的表结构数据，那么前端则需要先将其转换成树结构的 JSON 数据才能填充到对应的组件，那么在 iOS 和 Android 设备上也要执行同样的逻辑，但是由于语言不同，这些代码逻辑无法复用，都必须单独编写；相反，如果后端拿到数据之后转化后再返回则能同时免去这些代码的编写。</p></li></ul><p>但随着 Web 技术的不断发展，前端运行环境以及 Node.js 的计算能力不断加强，算法将被用于更多的开发场景中，对于前端工程师来说也将变得越来越重要。所以这一课时我们就来聊聊算法相关的内容。</p><h3 id="算法性能指标" tabindex="-1">算法性能指标 <a class="header-anchor" href="#算法性能指标" aria-label="Permalink to &quot;算法性能指标&quot;">​</a></h3><p>在衡量算法优劣的时候通常会用到两个重要的性能指标：时间复杂度和空间复杂度，分别用来表述算法运行所需要的运行时间和存储空间。</p><p>这里的&quot;复杂度&quot;我们可以理解为一个带有参数的函数，简写为 O，O 的参数一般为 1 或 n 的表达式。下面分别举例进行说明。</p><p>假设现在需要对一个首项为 1、差值为 1 的等差数列数组 arr 进行求和。如果像下面的代码一样采用 reduce 操作，则意味着需要遍历数组 arr 之后才能得到计算结果；如果数组 arr 的长度为 n，那么对应的累加操作 acc+=cur 这个表达式将被执行 n 次，因此这个操作的时间复杂度为 O(n)。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">arr.</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">acc</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">cur</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> acc</span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;">cur, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">arr.</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">((</span><span style="color:#E36209;">acc</span><span style="color:#24292E;">, </span><span style="color:#E36209;">cur</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> acc</span><span style="color:#D73A49;">+=</span><span style="color:#24292E;">cur, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span></code></pre></div><p>对等差数列比较了解的同学应该知道，可以使用求和公式来计算结果，这样的话并不需要遍历数组，只需要把首项 arr[0]、项数 n 和公差 1 带入公式进行计算即可。</p>',11),E=s(`<p>等差数列求和公式</p><br><br><p>整个操作只执行了一次，所以时间复杂度为 O(1)，要优于 O(n)。也就是说，时间复杂度取决于表达式执行次数。</p><p>空间复杂度的计算思路和时间复杂度相似，但不是根据执行次数而是根据变量占用空间大小。下面通过一个例子进行说明。</p><p>假设现在要将数组 arr 中的元素向前移动一位，第一个元素移动到最后一位。如果直接在原数组上进行操作，只借助一个额外的变量实现，那么空间复杂度为 O(1)。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> tmp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  arr[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[i</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">arr[arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tmp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> tmp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  arr[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[i</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">arr[arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tmp</span></span></code></pre></div><p>如果将结果保存在一个新的数组中，那么空间复杂度为 O(n)。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> newArr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  newArr[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[i</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">newArr.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(arr[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">])</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> newArr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  newArr[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[i</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">newArr.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(arr[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">])</span></span></code></pre></div><p>为了方便比较复杂度，复杂度的计算还遵循下面两个简写原则：</p><ul><li><p>多项式组成的复杂度，取最高次项，并省略系数，比如 O(3n+1) 简写成 O(n)；</p></li><li><p>不同参数可以统一用 n 表示，比如遍历长度为 m 乘以 n 的数组，复杂度 O(mn) 写成 O(n^2)。</p></li></ul><p>基于此，我们在优化算法时，如果只能优化系数或非最高次项操作，那么在算法复杂度计算来看，这种提升意义是比较小的。</p><p>常用的复杂度从优到劣排序，依次如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">O</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">&gt;</span><span style="color:#B392F0;">O</span><span style="color:#E1E4E8;">(logn)</span><span style="color:#F97583;">&gt;</span><span style="color:#B392F0;">O</span><span style="color:#E1E4E8;">(n)</span><span style="color:#F97583;">&gt;</span><span style="color:#B392F0;">O</span><span style="color:#E1E4E8;">(nlogn)</span><span style="color:#F97583;">&gt;</span><span style="color:#B392F0;">O</span><span style="color:#E1E4E8;">(n</span><span style="color:#F97583;">^</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">&gt;</span><span style="color:#B392F0;">O</span><span style="color:#E1E4E8;">(x</span><span style="color:#F97583;">^</span><span style="color:#E1E4E8;">n)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">O</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">&gt;</span><span style="color:#6F42C1;">O</span><span style="color:#24292E;">(logn)</span><span style="color:#D73A49;">&gt;</span><span style="color:#6F42C1;">O</span><span style="color:#24292E;">(n)</span><span style="color:#D73A49;">&gt;</span><span style="color:#6F42C1;">O</span><span style="color:#24292E;">(nlogn)</span><span style="color:#D73A49;">&gt;</span><span style="color:#6F42C1;">O</span><span style="color:#24292E;">(n</span><span style="color:#D73A49;">^</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">&gt;</span><span style="color:#6F42C1;">O</span><span style="color:#24292E;">(x</span><span style="color:#D73A49;">^</span><span style="color:#24292E;">n)</span></span></code></pre></div><p>通常，如果不对复杂度进行特别说明，一般用时间复杂度指代算法复杂度。</p><h3 id="timsort-排序" tabindex="-1">TimSort 排序 <a class="header-anchor" href="#timsort-排序" aria-label="Permalink to &quot;TimSort 排序&quot;">​</a></h3><p>排序算法就是让线性结构的数据按照升序或降序的方式排列的操作，是最基础也是使用频率较高的算法。排序的意义在于可以大大减少后续操作的时间复杂度。例如，在一个数组中找到第 2 小的数，对于无序数组需要对数组进行遍历，那么时间复杂度为 O(n)，而在有序数组中可以直接通过下标获取，时间复杂度为 O(1)。</p><p>正因如此，对于排序这个基础的操作有多种算法，对具体的算法感兴趣的同学可以看一些对比分析文章，比如<a href="https://www.cnblogs.com/onepixel/articles/7674659.html" target="_blank" rel="noreferrer">《十大经典排序算法（动图演示）》</a>，里面分析对比了主流排序算法的（平均、最优、最坏）时间复杂度、空间复杂度、稳定度。</p><p>在前端领域，排序属于日用而不知的算法，因为 JavaScript 引擎早已把高效的排序算法写入数组的原型函数 sort 中了，这种高效的排序算法就是 <strong>TimSort</strong>。</p><p>TimSort 是一种在 Java、Python 等多种语言环境广泛应用的排序算法，是根据作者姓名 Tim Peters 而命名的。它是一种典型的混合算法，同时采用了折半插入排序和归并排序。最好的情况下，时间复杂度可以达到 O(n)，最坏的情况下也能达到 O(nlogn)，空间复杂度在最好情况和最坏情况下分别为 O(1) 和 O(n)。</p><p>TimSort 并不是简单地把两种排序方式进行组合，而是进行了一些优化。下面通过一个实例来了解它的具体实现步骤。</p><p>假设要对一个整数数组进行 TimSort 排序，那么具体的操作步骤如下所示。</p><p>首先，根据数组长度进行计算，得到一个数值 minRunLength，表示最小的子数组 run 的长度。minRunLength 的计算方式比较简单，对于长度小于 64 的数组直接返回数组长度，长度大于或等于 64 则不断除以 2 直到小于 64。 这个值的主要作用是用来控制 run 的数量，方便后续进行归并排序，避免一个超长 run 和一个超短 run 合并。</p><p>其次，通过 while 循环遍历数组，计算下一个 run 的长度，具体计算方式其实是根据索引值来遍历数组的，从第一个元素开始找寻最长的有序子数组，如果和排序方式不一致（比如在升序排序中找到一个降序子数组），那么就进行反转，然后返回这个有序子数组的长度，赋值给变量 currentRunLength。</p><p>再次，判断 currentRunLength 和 minRunLength 的大小，如果 currentRunLength 小于 minRunLength，那么通过折半插入排序合并成一个更长的 run。</p><p>另外，将得到的 run 压入栈 pendingRuns 中，等待进一步的合并。</p><p>进而，将 pendingRuns 中的部分 run 进行合并，使栈内的所有 run 都满足条件pendingRuns[i].length &gt; pendingRuns[i+1].length + pendingRuns[i+2].length &amp;&amp; pendingRuns[i].length &gt; pendingRuns[i+1].length。</p><p>最后，按次序合并 pendingRuns 中的 run，得到最终结果。</p><blockquote><p>若对 JavaScript 中的 TimSort 实现仍有疑惑的话，建议查看具体源码，源码虽为 tq 文件，但语法风格和 JavaScript 差异不大。</p></blockquote><h3 id="补充-1-折半插入排序" tabindex="-1">补充 1：折半插入排序 <a class="header-anchor" href="#补充-1-折半插入排序" aria-label="Permalink to &quot;补充 1：折半插入排序&quot;">​</a></h3><p>折半插入排序（Binary Insertion Sort）是对插入排序算法的一种优化，插入排序算法就是不断地将元素插入前面已排好序的数组中，它的时间复杂度和空间复杂度分别为 O(n^2) 和 O(1)。折半插入就是用折半查找插入点取代按顺序依次寻找插入点，从而加快寻找插入点的速度。</p><p>下面是一段通过折半插入排序来对数组进行升序排列的示例代码：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">binayInsertionSort</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (arr[i] </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> arr[i </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]) </span><span style="color:#F97583;">continue</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> temp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> low </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> high </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (low </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      mid </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">floor</span><span style="color:#E1E4E8;">((low </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> high) </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (temp </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> arr[mid]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        low </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> mid </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        high </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> mid </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> i; j </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> low; </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">j) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      arr[j] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[j </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    arr[j] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> temp;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">binayInsertionSort</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (arr[i] </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> arr[i </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]) </span><span style="color:#D73A49;">continue</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> temp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[i];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> low </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> high </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (low </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> high) {</span></span>
<span class="line"><span style="color:#24292E;">      mid </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">floor</span><span style="color:#24292E;">((low </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> high) </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (temp </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> arr[mid]) {</span></span>
<span class="line"><span style="color:#24292E;">        low </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> mid </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        high </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> mid </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> i; j </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> low; </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">j) {</span></span>
<span class="line"><span style="color:#24292E;">      arr[j] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[j </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    arr[j] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> temp;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="补充-2-归并排序" tabindex="-1">补充 2：归并排序 <a class="header-anchor" href="#补充-2-归并排序" aria-label="Permalink to &quot;补充 2：归并排序&quot;">​</a></h3><p>归并排序（Merge Sort）采用分治法（Divide and Conquer）的思想（将原问题拆分成规模更小的子问题，然后递归求解），把数组拆分成子数组，先对每个子数组进行排序，然后再将有序的子数组进行合并，得到完全有序的数组。时间复杂度和空间复杂度分别为 O(nlogn) 和 O(n)。常见的将两个有序数组合并成一个有序数组的方式，称为<strong>二路归并</strong>。</p><p>下面是一段通过归并排序对数组进行升序排列的示例代码：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mergeSort</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">array</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">merge</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">leftArr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">rightArr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (leftArr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> rightArr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (leftArr[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> rightArr[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"><span style="color:#E1E4E8;">        result.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(leftArr.</span><span style="color:#B392F0;">shift</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span></span>
<span class="line"><span style="color:#E1E4E8;">        result.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(rightArr.</span><span style="color:#B392F0;">shift</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result.</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(leftArr).</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(rightArr);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (array.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> array;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> middle </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">floor</span><span style="color:#E1E4E8;">(array.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> left </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> array.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, middle);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> right </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> array.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(middle);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">merge</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">mergeSort</span><span style="color:#E1E4E8;">(left), </span><span style="color:#B392F0;">mergeSort</span><span style="color:#E1E4E8;">(right));</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mergeSort</span><span style="color:#24292E;">(</span><span style="color:#E36209;">array</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">merge</span><span style="color:#24292E;">(</span><span style="color:#E36209;">leftArr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">rightArr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (leftArr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> rightArr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (leftArr[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> rightArr[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">])</span></span>
<span class="line"><span style="color:#24292E;">        result.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(leftArr.</span><span style="color:#6F42C1;">shift</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span></span>
<span class="line"><span style="color:#24292E;">        result.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(rightArr.</span><span style="color:#6F42C1;">shift</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result.</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(leftArr).</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(rightArr);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (array.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> array;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> middle </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">floor</span><span style="color:#24292E;">(array.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> left </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> array.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, middle);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> right </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> array.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(middle);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">merge</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">mergeSort</span><span style="color:#24292E;">(left), </span><span style="color:#6F42C1;">mergeSort</span><span style="color:#24292E;">(right));</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本课时首先介绍了算法的两个重要效率指标：时间复杂度和空间复杂度。时间复杂度根据执行次数来计算，空间复杂度根据临时变量的大小来计算。算法的复杂度用一个带有参数的函数 O 来表示，函数 O 的参数为 n 的多项式，为了方便比较，一般只会保留 n 的最高次项并省略系数。在常见的算法复杂度中，常数复杂度最优，指数复杂度最劣。</p><p>在理解算法相关基础后重点分析了 JavaScript 的 Array.prototype.sort() 函数的底层实现算法 TimSort。TimSort 是一种混合排序算法，结合了折半插入排序和归并排序。</p><p>TimSort 算法的优化思路，其实和性能优化的思路也有异曲同工之妙，在<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180#/detail/pc?id=3195" target="_blank" rel="noreferrer">&quot;第23讲：谈性能优化到底在谈什么？&quot;</a>中提过，性能优化有两个方向：做减法和做除法。在 TimSort 中使用的归并排序将数据拆分 run，就带有做除法的思想，而在生成 run 的时候利用数据的有序性，这种和缓存类似的操作就是典型的做减法。</p><p>最后布置一道思考题：你在开发过程中还用到过哪些算法？欢迎在留言区分享你的经历。</p>`,42);function y(i,F,h,g,d,A){const n=l("Image");return p(),o("div",null,[c,e(n,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/49/07/Ciqc1F9OIsmAfhPMAAAIB06k65c146.png"}),r(),E])}const D=a(t,[["render",y]]);export{C as __pageData,D as default};

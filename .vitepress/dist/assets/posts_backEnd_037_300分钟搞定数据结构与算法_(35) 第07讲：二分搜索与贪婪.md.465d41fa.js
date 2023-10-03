import{_ as s,o as n,g as a,Q as l}from"./chunks/framework.f949202b.js";const b=JSON.parse('{"title":"二分搜索（Binary Search） ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(35) 第07讲：二分搜索与贪婪.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(35) 第07讲：二分搜索与贪婪.md","lastUpdated":null}'),p={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(35) 第07讲：二分搜索与贪婪.md"},e=l(`<p>这节课我们将重点介绍二分搜索算法，并且介绍一下贪婪算法。</p><p>二分搜索算法看似简单，写对很难，而且变形很多。所以最容易被拿来在面试中考察大家写 code 的能力。本节课可以总结出解决二分搜索题目的常用套路。</p><p>贪婪算法虽然是一种比较直观的算法，但是比较难的地方在于证明它的正确性。换句话说，有时候它会让你误以为得到的答案是正确的解，其实不然。</p><h6 id="二分搜索-binary-search" tabindex="-1">二分搜索（Binary Search） <a class="header-anchor" href="#二分搜索-binary-search" aria-label="Permalink to &quot;二分搜索（Binary Search）&quot;">​</a></h6><p>二分搜索（折半搜索）的 Wikipedia 定义：是一种在有序数组中查找某一特定元素的搜索算法。从定义可知，运用二分搜索的前提是数组必须是排好序的。另外，输入并不一定是数组，也有可能是给定一个区间的起始和终止的位置。</p><p><strong>优点</strong>：时间复杂度是 O(lgn)，非常高效。</p><p>因此也称为对数搜索。</p><p><strong>缺点</strong>：要求待查找的数组或者区间是排好序的。</p><p>对数组进行动态的删除和插入操作并完成查找，平均复杂度会变为 O(n)。此时应当考虑采取自平衡的二叉查找树：</p><ul><li><p>在 O(nlogn) 的时间内用给定的数据构建出一棵二叉查找树；</p></li><li><p>在 O(logn) 的时间里对目标数据进行搜索；</p></li><li><p>在 O(logn) 的时间里完成删除和插入的操作。</p></li></ul><p>因此，当输入的数组或者区间是排好序的，同时又不会经常变动，而要求从里面找出一个满足条件的元素的时候，二分搜索就是最好的选择。</p><p>二分搜索一般化的解题思路如下。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/91/2E/CgoB5l2Im2uAakC4AJXD2o1RZv4579.gif" alt=""></p><ol><li><p>从已经排好序的数组或区间中取出中间位置的元素，判断该元素是否满足要搜索的条件，如果满足，停止搜索，程序结束。</p></li><li><p>如果正中间的元素不满足条件，则从它两边的区域进行搜索。由于数组是排好序的，可以利用排除法，确定接下来应该从这两个区间中的哪一个去搜索。</p></li><li><p>通过判断，如果发现真正要找的元素在左半区间的话，就继续在左半区间里进行二分搜索。反之，就在右半区间里进行二分搜索。</p></li></ol><h6 id="递归解法" tabindex="-1">递归解法 <a class="header-anchor" href="#递归解法" aria-label="Permalink to &quot;递归解法&quot;">​</a></h6><p>优点：简洁；缺点：执行消耗大</p><p>例题：假设我们要从一个排好序的数组里 {1, 3, 4, 6, 7, 8, 10, 13, 14} 查看一下数字 7 是否在里面，如果在，返回它的下标，否则返回 -1。</p><h3 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><p>递归写法的代码模板如下。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 二分搜索函数的定义里，除了要指定数组 nums 和目标查找数 target 之外，还要指定查找区间的起点和终点位置，分别用 low 和 high 去表示。</span></span>
<span class="line"><span style="color:#E1E4E8;">int binarySearch(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 为了避免无限循环，先判断，如果起点位置大于终点位置，表明这是一个非法的区间，已经尝试了所有的搜索区间还是没能找到结果，返回 -1。 if (low &gt; high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 取正中间那个数的下标 middle。</span></span>
<span class="line"><span style="color:#E1E4E8;">    int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 判断一下正中间的那个数是不是要找的目标数 target，是，就返回下标 middle。    </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (nums[middle] == target) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return middle;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 如果发现目标数在左边，就递归地从左半边进行二分搜索。</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (target </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums[middle]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return binarySearch(nums, target, low, middle - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return binarySearch(nums, target, middle + 1, high);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }//否则从右半边递归地进行二分搜索。</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 二分搜索函数的定义里，除了要指定数组 nums 和目标查找数 target 之外，还要指定查找区间的起点和终点位置，分别用 low 和 high 去表示。</span></span>
<span class="line"><span style="color:#24292E;">int binarySearch(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#24292E;">        // 为了避免无限循环，先判断，如果起点位置大于终点位置，表明这是一个非法的区间，已经尝试了所有的搜索区间还是没能找到结果，返回 -1。 if (low &gt; high) {</span></span>
<span class="line"><span style="color:#24292E;">        return -1;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    // 取正中间那个数的下标 middle。</span></span>
<span class="line"><span style="color:#24292E;">    int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // 判断一下正中间的那个数是不是要找的目标数 target，是，就返回下标 middle。    </span></span>
<span class="line"><span style="color:#24292E;">    if (nums[middle] == target) {</span></span>
<span class="line"><span style="color:#24292E;">        return middle;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // 如果发现目标数在左边，就递归地从左半边进行二分搜索。</span></span>
<span class="line"><span style="color:#24292E;">    if (target </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums[middle]) {</span></span>
<span class="line"><span style="color:#24292E;">        return binarySearch(nums, target, low, middle - 1);</span></span>
<span class="line"><span style="color:#24292E;">      } else {</span></span>
<span class="line"><span style="color:#24292E;">        return binarySearch(nums, target, middle + 1, high);</span></span>
<span class="line"><span style="color:#24292E;">    }//否则从右半边递归地进行二分搜索。</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>注意：</p><ol><li><p>在计算 middle 下标的时候，不能简单地用 (low + hight) / 2，可能会导致溢出。</p></li><li><p>在取左半边以及右半边的区间时，左半边是 [low, middle - 1]，右半边是 [middle + 1, high]，这是两个闭区间。因为已经确定了 middle 那个点不是我们要找的，就没有必要再把它加入到左、右半边了。</p></li><li><p>对于一个长度为奇数的数组，例如：{1, 2, 3, 4, 5}，按照 low + (high - low) / 2 来计算，middle 就是正中间的那个位置，对于一个长度为偶数的数组，例如 {1, 2, 3, 4}，middle 就是正中间靠左边的一个位置。</p></li></ol><h3 id="时间复杂度" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h3><p>假设我们要对长度为 n 的数组进行二分搜索，T(n) 是执行时间函数，我们可以得到</p><p>T(n) = T(n/2) + 1</p><p>代入公式法得：a = 1，b = 2，f(n) = 1，因此：O(nlog(b)a) = O(n0) = 1 等于 O(f(n))，时间复杂度就是 O(nlog(b)alogn) = O(logn)。</p><h6 id="非递归解法" tabindex="-1">非递归解法 <a class="header-anchor" href="#非递归解法" aria-label="Permalink to &quot;非递归解法&quot;">​</a></h6><h3 id="代码实现-1" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-1" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><p>非递归写法的代码模板如下。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int binarySearch(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 在 while 循环里，判断搜索的区间范围是否有效</span></span>
<span class="line"><span style="color:#E1E4E8;">    while (low </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 计算正中间的数的下标</span></span>
<span class="line"><span style="color:#E1E4E8;">        int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 判断正中间的那个数是不是要找的目标数 target。如果是，就返回下标 middle</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (nums[middle] == target) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return middle;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 如果发现目标数在左边，调整搜索区间的终点为 middle - 1；否则，调整搜索区间的起点为 middle + 1</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (target </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums[middle]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        high = middle - 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        low = middle + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 如果超出了搜索区间，表明无法找到目标数，返回 -1  </span></span>
<span class="line"><span style="color:#E1E4E8;">    return -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int binarySearch(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#24292E;">    // 在 while 循环里，判断搜索的区间范围是否有效</span></span>
<span class="line"><span style="color:#24292E;">    while (low </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= high) {</span></span>
<span class="line"><span style="color:#24292E;">        // 计算正中间的数的下标</span></span>
<span class="line"><span style="color:#24292E;">        int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // 判断正中间的那个数是不是要找的目标数 target。如果是，就返回下标 middle</span></span>
<span class="line"><span style="color:#24292E;">    if (nums[middle] == target) {</span></span>
<span class="line"><span style="color:#24292E;">        return middle;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // 如果发现目标数在左边，调整搜索区间的终点为 middle - 1；否则，调整搜索区间的起点为 middle + 1</span></span>
<span class="line"><span style="color:#24292E;">    if (target </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums[middle]) {</span></span>
<span class="line"><span style="color:#24292E;">        high = middle - 1;</span></span>
<span class="line"><span style="color:#24292E;">      } else {</span></span>
<span class="line"><span style="color:#24292E;">        low = middle + 1;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 如果超出了搜索区间，表明无法找到目标数，返回 -1  </span></span>
<span class="line"><span style="color:#24292E;">    return -1;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h6 id="核心步骤" tabindex="-1">核心步骤 <a class="header-anchor" href="#核心步骤" aria-label="Permalink to &quot;核心步骤&quot;">​</a></h6><ol><li><p>确定搜索的范围和区间</p></li><li><p>取中间的数判断是否满足条件</p></li><li><p>如果不满足条件，判定应该往哪个半边继续进行搜索</p></li></ol><p>二分搜索看起来简单，但是 <em>Programming Pearls</em>这本书的作者 Jon Bentley 提到，只有 10% 的程序员能正确地写出二分搜索的代码。面试题经常是经典二分搜索的变形，但万变不离其中，需要把握好二分搜索的核心。</p><h6 id="例题分析一-找确定的边界" tabindex="-1">例题分析一：找确定的边界 <a class="header-anchor" href="#例题分析一-找确定的边界" aria-label="Permalink to &quot;例题分析一：找确定的边界&quot;">​</a></h6><p>边界分上边界和下边界，有时候也被成为右边界和左边界。确定的边界指边界的数值等于要找的目标数。</p><p>例题：LeetCode 第 34 题，在一个排好序的数组中找出某个数第一次出现和最后一次出现的下标位置。</p><p>示例：输入的数组是：{5, 7, 7, 8, 8, 10}，目标数是 8，那么返回 {3, 4}，其中 3 是 8 第一次出现的下标位置，4 是 8 最后一次出现的下标位置。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/91/2E/CgoB5l2Im3GAdPWdANoBwqIsGSM491.gif" alt=""></p><h3 id="解题思路" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路" aria-label="Permalink to &quot;解题思路&quot;">​</a></h3><p>在二分搜索里，比较难的是判断逻辑，对这道题来说，什么时候知道这个位置是不是 8 第一次以及最后出现的地方呢？</p><p>把第一次出现的地方叫下边界（lower bound），把最后一次出现的地方叫上边界（upper bound）。</p><p>那么成为 8 的下边界的条件应该有两个。</p><ol><li><p>该数必须是 8；</p></li><li><p>该数的左边一个数必须不是 8：</p></li></ol><ul><li><p>8 的左边有数，那么该数必须小于 8；</p></li><li><p>8 的左边没有数，即 8 是数组的第一个数。</p></li></ul><p>而成为 8 的上边界的条件也应该有两个。</p><ol><li><p>该数必须是 8；</p></li><li><p>该数的右边一个数必须不是 8：</p></li></ol><ul><li><p>8 的右边有数，那么该数必须大于8；</p></li><li><p>8 的右边没有数，即 8 是数组的最后一个数。</p></li></ul><h3 id="代码实现-2" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-2" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><p>用递归的方法来寻找下边界，代码如下。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int searchLowerBound(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (low &gt; high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    //判断是否是下边界时，先看看 middle 的数是否为 target，并判断该数是否已为数组的第一个数，或者，它左边的一个数是不是已经比它小，如果都满足，即为下边界。</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (nums[middle] == target &amp;&amp; (middle == 0 || nums[middle - 1] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> target)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return middle;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    if (target </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= nums[middle]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return searchLowerBound(nums, target, low, middle - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return searchLowerBound(nums, target, middle + 1, high);</span></span>
<span class="line"><span style="color:#E1E4E8;">      } //不满足，如果这个数等于 target，那么就得往左边继续查找。</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int searchLowerBound(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#24292E;">    if (low &gt; high) {</span></span>
<span class="line"><span style="color:#24292E;">        return -1;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#24292E;">    //判断是否是下边界时，先看看 middle 的数是否为 target，并判断该数是否已为数组的第一个数，或者，它左边的一个数是不是已经比它小，如果都满足，即为下边界。</span></span>
<span class="line"><span style="color:#24292E;">    if (nums[middle] == target &amp;&amp; (middle == 0 || nums[middle - 1] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> target)) {</span></span>
<span class="line"><span style="color:#24292E;">        return middle;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    if (target </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= nums[middle]) {</span></span>
<span class="line"><span style="color:#24292E;">        return searchLowerBound(nums, target, low, middle - 1);</span></span>
<span class="line"><span style="color:#24292E;">      } else {</span></span>
<span class="line"><span style="color:#24292E;">        return searchLowerBound(nums, target, middle + 1, high);</span></span>
<span class="line"><span style="color:#24292E;">      } //不满足，如果这个数等于 target，那么就得往左边继续查找。</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>其他的写法都和经典的二分搜索的写法相同，不再赘述。</p><p>查找上边界的代码如下。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int searchUpperBound(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (low &gt; high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    //判断是否是上边界时，先看看 middle 的数是否为 target，并判断该数是否已为数组的最后一个数，或者，它右边的数是不是比它大，如果都满足，即为上边界。    </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (nums[middle] == target &amp;&amp; (middle == nums.length - 1 || nums[middle + 1] &gt; target)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return middle;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (target </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums[middle]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return searchUpperBound(nums, target, low, middle - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return searchUpperBound(nums, target, middle + 1, high);</span></span>
<span class="line"><span style="color:#E1E4E8;">      } //不满足时，需判断搜索方向。</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int searchUpperBound(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#24292E;">    if (low &gt; high) {</span></span>
<span class="line"><span style="color:#24292E;">        return -1;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    //判断是否是上边界时，先看看 middle 的数是否为 target，并判断该数是否已为数组的最后一个数，或者，它右边的数是不是比它大，如果都满足，即为上边界。    </span></span>
<span class="line"><span style="color:#24292E;">    if (nums[middle] == target &amp;&amp; (middle == nums.length - 1 || nums[middle + 1] &gt; target)) {</span></span>
<span class="line"><span style="color:#24292E;">        return middle;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    if (target </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums[middle]) {</span></span>
<span class="line"><span style="color:#24292E;">        return searchUpperBound(nums, target, low, middle - 1);</span></span>
<span class="line"><span style="color:#24292E;">      } else {</span></span>
<span class="line"><span style="color:#24292E;">        return searchUpperBound(nums, target, middle + 1, high);</span></span>
<span class="line"><span style="color:#24292E;">      } //不满足时，需判断搜索方向。</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h6 id="例题分析二-找模糊的边界" tabindex="-1">例题分析二：找模糊的边界 <a class="header-anchor" href="#例题分析二-找模糊的边界" aria-label="Permalink to &quot;例题分析二：找模糊的边界&quot;">​</a></h6><p>二分搜索可以用来查找一些模糊的边界。模糊的边界指，边界的值并不等于目标的值，而是大于或者小于目标的值。</p><p>例题：从数组 {-2, 0, 1, 4, 7, 9, 10} 中找到第一个大于 6 的数。</p><h3 id="解题思路-1" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-1" aria-label="Permalink to &quot;解题思路&quot;">​</a></h3><p>在一个排好序的数组里，判断一个数是不是第一个大于 6 的数，只要它满足如下的条件：</p><ol><li><p>该数要大于 6；</p></li><li><p>该数有可能是数组里的第一个数，或者它之前的一个数比 6 小。</p></li></ol><p>只要满足了上面的条件就是第一个大于 6 的数。</p><h3 id="代码实现-3" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-3" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Integer firstGreaterThan(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (low &gt; high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return null;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    //判断 middle 指向的数是否为第一个比 target 大的数时，须同时满足两个条件：middle 这个数必须大于 target；middle 要么是第一个数，要么它之前的数小于或者等于 target。 </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (nums[middle] &gt; target &amp;&amp; (middle == 0 || nums[middle - 1] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= target)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return middle;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    if (target </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums[middle]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return firstGreaterThan(nums, target, low, middle - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return firstGreaterThan(nums, target, middle + 1, high);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Integer firstGreaterThan(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#24292E;">    if (low &gt; high) {</span></span>
<span class="line"><span style="color:#24292E;">        return null;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    //判断 middle 指向的数是否为第一个比 target 大的数时，须同时满足两个条件：middle 这个数必须大于 target；middle 要么是第一个数，要么它之前的数小于或者等于 target。 </span></span>
<span class="line"><span style="color:#24292E;">    if (nums[middle] &gt; target &amp;&amp; (middle == 0 || nums[middle - 1] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= target)) {</span></span>
<span class="line"><span style="color:#24292E;">        return middle;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    if (target </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums[middle]) {</span></span>
<span class="line"><span style="color:#24292E;">        return firstGreaterThan(nums, target, low, middle - 1);</span></span>
<span class="line"><span style="color:#24292E;">      } else {</span></span>
<span class="line"><span style="color:#24292E;">        return firstGreaterThan(nums, target, middle + 1, high);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><br><p>对于这道题，当不满足条件，而 middle 的数等于 target 的时候怎么办？举例说明，如果要求的是第一个大于 6 的数，而数组中有多个 6 挨在一起，而此时的 middle 指向其中的一个 6，程序必须得在右半边搜索。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/91/4E/CgotOV2Im3WAelpCAFuvvFr9ZL8086.gif" alt=""></p><p>找模糊边界的题，还有在给定数组里，找最后一个比目标数小的数。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/91/4E/CgotOV2Im3iANsA9AE-IXo7x7Ns309.gif" alt=""></p><p>举例：在 {-2, 0, 1, 4, 7, 9, 10} 中，求最后一个比 6 小的数。</p><p>答案是 4，方法是类似的。</p><h6 id="例题分析三-旋转过的排序数组" tabindex="-1">例题分析三：旋转过的排序数组 <a class="header-anchor" href="#例题分析三-旋转过的排序数组" aria-label="Permalink to &quot;例题分析三：旋转过的排序数组&quot;">​</a></h6><p>二分搜索也能在经过旋转了的排序数组中进行。</p><p>例题：LeetCode 第 33 题，给定一个经过旋转了的排序数组，判断一下某个数是否在里面。</p><p>示例：给定数组为 {4, 5, 6, 7, 0, 1, 2}，target 等于 0，答案是 4，即 0 所在的位置下标是 4。</p><h3 id="解题思路-2" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-2" aria-label="Permalink to &quot;解题思路&quot;">​</a></h3><p>对于这道题，输入数组不是完整排好序，还能运用二分搜索吗？思路如下。</p><p>一开始，中位数是 7，并不是我们要找的 0，如何判断往左边还是右边搜索呢？这个数组是经过旋转的，即，从数组中的某个位置开始划分，左边和右边都是排好序的。</p><p>如何判断左边是不是排好序的那个部分呢？只要比较 nums[low] 和 nums[middle]。nums[low] &lt;= nums[middle] 时，能判定左边这部分一定是排好序的，否则，右边部分一定是排好序的。</p><p><img src="http://s0.lgstatic.com/i/image2/M01/91/4E/CgotOV2Im3mAMogQACRtykBbh7Q848.gif" alt=""></p><p>为什么要判断 nums[low] = nums[middle] 的情况呢？因为计算 middle 的公式是 int middle = low + (high - low) / 2。</p><p>当只有一个数的时候，low=high，middle=ow，同样认为这一边是排好序的。</p><p>判定某一边是排好序的，有什么用处呢？能准确地判断目标值是否在这个区间里。如果 nums[low] &lt;= target &amp;&amp; target &lt; nums[middle]，则应该在这个区间里搜索目标值。反之，目标值肯定在另外一边。</p><h3 id="代码实现-4" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-4" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int binarySearch(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (low &gt; high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } //判断是否已超出了搜索范围，是则返回-1。</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int middle = low + (high - low) / 2; //取中位数。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    if (nums[middle] == target) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return middle;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } //判断中位数是否为要找的数</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    if (nums[low] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= nums[middle]) { //判断左半边是不是排好序的。</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (nums[low] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= target &amp;&amp; target </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nums[middle]) { //是，则判断目标值是否在左半边。</span></span>
<span class="line"><span style="color:#E1E4E8;">            return binarySearch(nums, target, low, middle - 1); //是，则在左半边继续进行二分搜索。</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        return binarySearch(nums, target, middle + 1, high); //否，在右半边进行二分搜索。</span></span>
<span class="line"><span style="color:#E1E4E8;">      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (nums[middle] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> target &amp;&amp; target </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">= nums[high]) { //若右半边是排好序的那一半，判断目标值是否在右边。</span></span>
<span class="line"><span style="color:#E1E4E8;">            return binarySearch(nums, target, middle + 1, high); //是，则在右半边继续进行二分搜索。</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        return binarySearch(nums, target, low, middle - 1); //否，在左半边进行二分搜索。</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int binarySearch(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span style="color:#24292E;">    if (low &gt; high) {</span></span>
<span class="line"><span style="color:#24292E;">        return -1;</span></span>
<span class="line"><span style="color:#24292E;">    } //判断是否已超出了搜索范围，是则返回-1。</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int middle = low + (high - low) / 2; //取中位数。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    if (nums[middle] == target) {</span></span>
<span class="line"><span style="color:#24292E;">        return middle;</span></span>
<span class="line"><span style="color:#24292E;">    } //判断中位数是否为要找的数</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    if (nums[low] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= nums[middle]) { //判断左半边是不是排好序的。</span></span>
<span class="line"><span style="color:#24292E;">        if (nums[low] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= target &amp;&amp; target </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nums[middle]) { //是，则判断目标值是否在左半边。</span></span>
<span class="line"><span style="color:#24292E;">            return binarySearch(nums, target, low, middle - 1); //是，则在左半边继续进行二分搜索。</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        return binarySearch(nums, target, middle + 1, high); //否，在右半边进行二分搜索。</span></span>
<span class="line"><span style="color:#24292E;">      } else {</span></span>
<span class="line"><span style="color:#24292E;">        if (nums[middle] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> target &amp;&amp; target </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">= nums[high]) { //若右半边是排好序的那一半，判断目标值是否在右边。</span></span>
<span class="line"><span style="color:#24292E;">            return binarySearch(nums, target, middle + 1, high); //是，则在右半边继续进行二分搜索。</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        return binarySearch(nums, target, low, middle - 1); //否，在左半边进行二分搜索。</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><br><p>在决定在哪一边进行二分搜索的时候，利用了旋转数组的性质，这就是这道题的巧妙之处。</p><h2 id="例题分析四-不定长的边界" tabindex="-1">例题分析四：不定长的边界 <a class="header-anchor" href="#例题分析四-不定长的边界" aria-label="Permalink to &quot;例题分析四：不定长的边界&quot;">​</a></h2><p>前面介绍的二分搜索的例题都给定了一个具体范围或者区间，那么对于没有给定明确区间的问题能不能运用二分搜索呢？</p><p>例题：有一段不知道具体长度的日志文件，里面记录了每次登录的时间戳，已知日志是按顺序从头到尾记录的，没有记录日志的地方为空，要求当前日志的长度。</p><h3 id="解题思路-3" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-3" aria-label="Permalink to &quot;解题思路&quot;">​</a></h3><p>可以把这个问题看成是不知道长度的数组，数组从头开始记录都是时间戳，到了某个位置就成为了空：{2019-01-14, 2019-01-17, ... , 2019-08-04, .... , null, null, null ...}。</p><p>思路 1：顺序遍历该数组，一直遍历下去，当发现第一个 null 的时候，就知道了日志的总数量。很显然，这是很低效的办法。</p><p>思路 2：借用二分搜索的思想，反着进行搜索。</p><ol><li><p>一开始设置 low = 0，high = 1</p></li><li><p>只要 logs[high] 不为 null，high *= 2</p></li><li><p>当 logs[high] 为 null 的时候，可以在区间 [0, high] 进行普通的二分搜索</p></li></ol><h3 id="代码实现-5" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-5" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 先通过getUpperBound函数不断地去试探在什么位置会出现空的日志。</span></span>
<span class="line"><span style="color:#E1E4E8;">int getUpperBound(String[] logs, int high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (logs[high] == null) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return high;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    return getUpperBound(logs, high * 2);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 再运用二分搜索的方法去寻找日志的长度。</span></span>
<span class="line"><span style="color:#E1E4E8;">int binarySearch(String[] logs, int low, int high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (low &gt; high) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (logs[middle] == null &amp;&amp; logs[middle - 1] != null) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return middle;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (logs[middle] == null) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return binarySearch(logs, low, middle - 1);</span></span>
<span class="line"><span style="color:#E1E4E8;">      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return binarySearch(logs, middle + 1, high);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 先通过getUpperBound函数不断地去试探在什么位置会出现空的日志。</span></span>
<span class="line"><span style="color:#24292E;">int getUpperBound(String[] logs, int high) {</span></span>
<span class="line"><span style="color:#24292E;">    if (logs[high] == null) {</span></span>
<span class="line"><span style="color:#24292E;">        return high;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    return getUpperBound(logs, high * 2);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 再运用二分搜索的方法去寻找日志的长度。</span></span>
<span class="line"><span style="color:#24292E;">int binarySearch(String[] logs, int low, int high) {</span></span>
<span class="line"><span style="color:#24292E;">    if (low &gt; high) {</span></span>
<span class="line"><span style="color:#24292E;">        return -1;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    int middle = low + (high - low) / 2;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    if (logs[middle] == null &amp;&amp; logs[middle - 1] != null) {</span></span>
<span class="line"><span style="color:#24292E;">        return middle;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    if (logs[middle] == null) {</span></span>
<span class="line"><span style="color:#24292E;">        return binarySearch(logs, low, middle - 1);</span></span>
<span class="line"><span style="color:#24292E;">      } else {</span></span>
<span class="line"><span style="color:#24292E;">        return binarySearch(logs, middle + 1, high);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>判断是否是日志的结尾很简单，只要当前的日志为空，而前一个日志不为空即可。</p><h6 id="贪婪-greedy" tabindex="-1">贪婪（Greedy） <a class="header-anchor" href="#贪婪-greedy" aria-label="Permalink to &quot;贪婪（Greedy）&quot;">​</a></h6><p>贪婪算法的 Wikipedia 定义：是一种在每一步选中都采取在当前状态下最好或最优的选择，从而希望导致结果是最好或最优的算法。</p><p>优点：对于一些问题，非常直观有效。</p><br><p>缺点：</p><ul><li><p>并不是所有问题都能用它去解决；</p></li><li><p>得到的结果并一定不是正确的，因为这种算法容易过早地做出决定，从而没有办法达到最优解。</p></li></ul><p>下面通过例题来加深对贪婪算法的认识。例题：0-1 背包问题，能不能运用贪婪算法去解决。</p><p>有三种策略：</p><ol><li><p>选取价值最大的物品</p></li><li><p>选择重量最轻的物品</p></li><li><p>选取价值/重量比最大的物品</p></li></ol><p><strong>策略 1</strong>：每次尽可能选择价值最大的，行不通。举例说明如下。</p><p>物品有：A B C</p><p>重量分别是：25, 10, 10</p><p>价值分别是：100，80，80</p><p>根据策略，首先选取物品 A，接下来就不能再去选其他物品，但是，如果选取 B 和 C，结果会更好。</p><p><strong>策略 2</strong>：每次尽可能选择轻的物品，行不通。举例说明如下。</p><p>物品有：A B C</p><p>重量分别为：25, 10, 10</p><p>价值分别为：100, 5, 5</p><p>根据策略，首先选取物品 B 和 C，接下来就不能选 A，但是，如果选 A，价值更大。</p><p><strong>策略 3</strong>：每次尽可能选价值/重量比最大的，行不通。举例说明如下。</p><p>物品有：A B C</p><p>重量是：25, 10, 10</p><p>价值是：25, 10, 10</p><p>根据策略，三种物品的价值/重量比都是一样，如果选 A，答案不对，应该选 B 和 C。</p><p>由上，贪婪算法总是做出在当前看来是最好的选择。即，它不从整体的角度去考虑，仅仅对局部的最优解感兴趣。因此，只有当那些局部最优策略能产生全局最优策略的时候，才能用贪婪算法。</p><h6 id="例题分析" tabindex="-1">例题分析 <a class="header-anchor" href="#例题分析" aria-label="Permalink to &quot;例题分析&quot;">​</a></h6><p>LeetCode 第 253 题，会议室II，给定一系列会议的起始时间和结束时间，求最少需要多少个会议室就可以让这些会议顺利召开。</p><h3 id="解题思路-4" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-4" aria-label="Permalink to &quot;解题思路&quot;">​</a></h3><p><strong>思路 1</strong>：暴力法。</p><ul><li><p>把所有的会议组合找出来；</p></li><li><p>从最长的组合开始检查，看看各个会议之间有没有冲突；</p></li><li><p>直到发现一组会议没有冲突，那么它就是答案。</p></li></ul><p>很明显，这样的解法是非常没有效率的。</p><p><strong>思路 2</strong>：贪婪算法</p><ul><li><p>会议按照起始时间顺序进行；</p></li><li><p>要给新的即将开始的会议找会议室时，先看当前有无空会议室；</p></li><li><p>有则在空会议室开会，无则开设一间新会议室。</p></li></ul><h3 id="代码实现-6" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-6" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int minMeetingRooms(Interval[] intervals) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (intervals == null || intervals.length == 0)</span></span>
<span class="line"><span style="color:#E1E4E8;">        return 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 将输入的一系列会议按照会议的起始时间排序。</span></span>
<span class="line"><span style="color:#E1E4E8;">    Arrays.sort(intervals, new Comparator&lt;</span><span style="color:#FDAEB7;font-style:italic;">Interval</span><span style="color:#E1E4E8;">&gt;() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        public int compare(Interval a, Interval b) { return a.start - b.start; }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 用一个最小堆来维护目前开辟的所有会议室，最小堆里的会议室按照会议的结束时间排序。</span></span>
<span class="line"><span style="color:#E1E4E8;">    PriorityQueue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Interval</span><span style="color:#E1E4E8;">&gt; heap = new PriorityQueue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Interval</span><span style="color:#E1E4E8;">&gt;(intervals.length, new Comparator&lt;</span><span style="color:#FDAEB7;font-style:italic;">Interval</span><span style="color:#E1E4E8;">&gt;() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        public int compare(Interval a, Interval b) { return a.end - b.end; }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 让第一个会议在第一个会议室里举行。</span></span>
<span class="line"><span style="color:#E1E4E8;">    heap.offer(intervals[0]);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 1; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> intervals.length; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 从第二个会议开始，对于每个会议，我们都从最小堆里取出一个会议室，那么这个会议室里的会议一定是最早结束的。</span></span>
<span class="line"><span style="color:#E1E4E8;">        Interval interval = heap.poll();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (intervals[i].start &gt;= interval.end) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 若当前要开的会议可以等会议室被腾出才开始，那么就可以重复利用这个会议室。</span></span>
<span class="line"><span style="color:#E1E4E8;">        interval.end = intervals[i].end;</span></span>
<span class="line"><span style="color:#E1E4E8;">      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 否则，开一个新的会议室。</span></span>
<span class="line"><span style="color:#E1E4E8;">        heap.offer(intervals[i]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 把旧的会议室也放入到最小堆里。</span></span>
<span class="line"><span style="color:#E1E4E8;">    heap.offer(interval);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 最小堆里的会议室个数就是要求的答案，即最少的会议个数。</span></span>
<span class="line"><span style="color:#E1E4E8;">    return heap.size();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int minMeetingRooms(Interval[] intervals) {</span></span>
<span class="line"><span style="color:#24292E;">    if (intervals == null || intervals.length == 0)</span></span>
<span class="line"><span style="color:#24292E;">        return 0;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // 将输入的一系列会议按照会议的起始时间排序。</span></span>
<span class="line"><span style="color:#24292E;">    Arrays.sort(intervals, new Comparator&lt;</span><span style="color:#B31D28;font-style:italic;">Interval</span><span style="color:#24292E;">&gt;() {</span></span>
<span class="line"><span style="color:#24292E;">        public int compare(Interval a, Interval b) { return a.start - b.start; }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 用一个最小堆来维护目前开辟的所有会议室，最小堆里的会议室按照会议的结束时间排序。</span></span>
<span class="line"><span style="color:#24292E;">    PriorityQueue&lt;</span><span style="color:#B31D28;font-style:italic;">Interval</span><span style="color:#24292E;">&gt; heap = new PriorityQueue&lt;</span><span style="color:#B31D28;font-style:italic;">Interval</span><span style="color:#24292E;">&gt;(intervals.length, new Comparator&lt;</span><span style="color:#B31D28;font-style:italic;">Interval</span><span style="color:#24292E;">&gt;() {</span></span>
<span class="line"><span style="color:#24292E;">        public int compare(Interval a, Interval b) { return a.end - b.end; }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 让第一个会议在第一个会议室里举行。</span></span>
<span class="line"><span style="color:#24292E;">    heap.offer(intervals[0]);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 1; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> intervals.length; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        // 从第二个会议开始，对于每个会议，我们都从最小堆里取出一个会议室，那么这个会议室里的会议一定是最早结束的。</span></span>
<span class="line"><span style="color:#24292E;">        Interval interval = heap.poll();</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        if (intervals[i].start &gt;= interval.end) {</span></span>
<span class="line"><span style="color:#24292E;">        // 若当前要开的会议可以等会议室被腾出才开始，那么就可以重复利用这个会议室。</span></span>
<span class="line"><span style="color:#24292E;">        interval.end = intervals[i].end;</span></span>
<span class="line"><span style="color:#24292E;">      } else {</span></span>
<span class="line"><span style="color:#24292E;">        // 否则，开一个新的会议室。</span></span>
<span class="line"><span style="color:#24292E;">        heap.offer(intervals[i]);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    // 把旧的会议室也放入到最小堆里。</span></span>
<span class="line"><span style="color:#24292E;">    heap.offer(interval);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    // 最小堆里的会议室个数就是要求的答案，即最少的会议个数。</span></span>
<span class="line"><span style="color:#24292E;">    return heap.size();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><br><p>为什么贪婪算法能在这里成立？</p><p>每当遇到一个新的会议时，总是贪婪地从所有会议室里找出最先结束会议的那个。</p><p>为什么这样可以产生最优的结果？</p><p>若选择的会议室中会议未结束，则意味着需要开辟一个新会议室，这已经不是当前的最优解了</p><br><p><strong>建议</strong> ：贪婪算法考点在面试中相对于其他算法而言是比较轻的，大家只需要把常见的一些利用贪婪算法解题的题目多加练习即可。</p><h6 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h6><p>这节课讲解了二分搜索算法和贪婪算法。其中，二分搜索算法是重中之重，因为它看似简单，但要写对却不那么容易。</p><p>建议：LeetCode 上对二分搜索算法和贪婪算法的相关题目都做了很好的筛选，大家要多加练习。</p><p>从下节课开始，我们将运用之前学到的数据结构和算法知识来解决一些高频算法面试题以及难题。</p><br>`,143),r=[e];function i(t,o,c,E,d,m){return n(),a("div",null,r)}const y=s(p,[["render",i]]);export{b as __pageData,y as default};

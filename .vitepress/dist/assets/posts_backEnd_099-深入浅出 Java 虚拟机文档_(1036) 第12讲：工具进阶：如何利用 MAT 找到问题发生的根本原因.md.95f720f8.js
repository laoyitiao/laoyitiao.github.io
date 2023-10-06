import{_ as e,j as t,o,g as c,k as a,Q as p,s,h as l}from"./chunks/framework.b3d8e22e.js";const $s=JSON.parse('{"title":"2.1. 代码介绍 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1036) 第12讲：工具进阶：如何利用 MAT 找到问题发生的根本原因.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1036) 第12讲：工具进阶：如何利用 MAT 找到问题发生的根本原因.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1036) 第12讲：工具进阶：如何利用 MAT 找到问题发生的根本原因.md"},r=p(`<br><p>我们知道，在存储用户输入的密码时，会使用一些 hash 算法对密码进行加工，比如 SHA-1。这些信息同样不允许在日志输出里出现，必须做脱敏处理，但是对于一个拥有系统权限的攻击者来说，这些防护依然是不够的。攻击者可能会直接从内存中获取明文数据，尤其是对于 Java 来说，由于提供了 jmap 这一类非常方便的工具，可以把整个堆内存的数据 dump 下来。</p><br><p>比如，&quot;我的世界&quot;这一类使用 Java 开发的游戏，会比其他语言的游戏更加容易破解一些，所以我们在 JVM 中，如果把密码存储为 char 数组，其安全性会稍微高一些。</p><br><p>这是一把双刃剑，在保证安全的前提下，我们也可以借助一些外部的分析工具，帮助我们方便的找到问题根本。</p><br><p>有两种方式来获取内存的快照。我们前面提到过，通过配置一些参数，可以在发生 OOM 的时候，被动 dump 一份堆栈信息，这是一种；另一种，就是通过 jmap 主动去获取内存的快照。</p><br><p>jmap 命令在 Java 9 之后，使用 jhsdb 命令替代，它们在用法上，区别不大。注意，这些命令本身会占用操作系统的资源，在某些情况下会造成服务响应缓慢，所以不要频繁执行。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">jmap -dump:format=b,file=heap.bin 37340</span></span>
<span class="line"><span style="color:#E1E4E8;">jhsdb jmap  --binaryheap --pid  37340</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">jmap -dump:format=b,file=heap.bin 37340</span></span>
<span class="line"><span style="color:#24292E;">jhsdb jmap  --binaryheap --pid  37340</span></span></code></pre></div><ol><li>工具介绍</li></ol><hr><p>有很多工具能够帮助我们来分析这份内存快照。在前面已多次提到 VisualVm 这个工具，它同样可以加载和分析这份 dump 数据，虽然比较&quot;寒碜&quot;。</p><br><p>专业的事情要有专业的工具来做，今天要介绍的是一款专业的开源分析工具，即 MAT。</p><br><p>MAT 工具是基于 Eclipse 平台开发的，本身是一个 Java 程序，所以如果你的堆快照比较大的话，则需要一台内存比较大的分析机器，并给 MAT 本身加大初始内存，这个可以修改安装目录中的 MemoryAnalyzer.ini 文件。</p><br><p>来看一下 MAT 工具的截图，主要的功能都体现在工具栏上了。其中，默认的启动界面，展示了占用内存最高的一些对象，并有一些常用的快捷方式。通常，发生内存泄漏的对象，会在快照中占用比较大的比重，分析这些比较大的对象，是我们切入问题的第一步。</p><br>`,22),E=s("br",null,null,-1),y=s("p",null,"点击对象，可以浏览对象的引用关系，这是一个非常有用的功能：",-1),d=s("ul",null,[s("li",null,[s("p",null,[s("strong",null,"outgoing references"),l(" 对象的引出")])]),s("li",null,[s("p",null,[s("strong",null,"incoming references"),l("对象的引入")])])],-1),u=s("p",null,[s("strong",null,"path to GC Roots"),l(" 这是快速分析的一个常用功能，显示和 GC Roots 之间的路径。")],-1),h=s("br",null,null,-1),_=s("br",null,null,-1),g=s("p",null,[l("另外一个比较重要的概念，就是"),s("strong",null,"浅堆"),l(" （Shallow Heap）和"),s("strong",null,"深堆"),l("（Retained Heap），在 MAT 上经常看到这两个数值。")],-1),b=s("br",null,null,-1),m=s("br",null,null,-1),A=s("p",null,'浅堆代表了对象本身的内存占用，包括对象自身的内存占用，以及"为了引用"其他对象所占用的内存。',-1),T=s("br",null,null,-1),v=s("p",null,[l('深堆是一个统计结果，会循环计算引用的具体对象所占用的内存。但是深堆和"对象大小"有一点不同，'),s("strong",null,"深堆指的是一个对象被垃圾回收后，能够释放的内存大小，这些被释放的对象集合，叫做保留集"),l("（Retained Set）。")],-1),M=s("br",null,null,-1),C=p(`<br><p>如上图所示，A 对象浅堆大小 1 KB，B 对象 2 KB，C 对象 100 KB。A 对象同时引用了 B 对象和 C 对象，但由于 C 对象也被 D 引用，所以 A 对象的深堆大小为 3 KB（1 KB + 2 KB）。</p><br><p>A 对象大小（1 KB + 2 KB + 100 KB）&gt; A 对象深堆 &gt; A 对象浅堆。</p><ol start="2"><li>代码示例</li></ol><hr><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">import java.util.ArrayList;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.util.HashMap;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.util.List;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.util.Map;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.util.stream.IntStream;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">public class Objects4MAT {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class A4MAT {</span></span>
<span class="line"><span style="color:#E1E4E8;">        B4MAT b4MAT = new B4MAT();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class B4MAT {</span></span>
<span class="line"><span style="color:#E1E4E8;">        C4MAT c4MAT = new C4MAT();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class C4MAT {</span></span>
<span class="line"><span style="color:#E1E4E8;">        List&lt;</span><span style="color:#FDAEB7;font-style:italic;">String</span><span style="color:#E1E4E8;">&gt; list = new ArrayList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class DominatorTreeDemo1 {</span></span>
<span class="line"><span style="color:#E1E4E8;">        DominatorTreeDemo2 dominatorTreeDemo2;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        public void setValue(DominatorTreeDemo2 value) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            this.dominatorTreeDemo2 = value;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class DominatorTreeDemo2 {</span></span>
<span class="line"><span style="color:#E1E4E8;">        DominatorTreeDemo1 dominatorTreeDemo1;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        public void setValue(DominatorTreeDemo1 value) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            this.dominatorTreeDemo1 = value;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class Holder {</span></span>
<span class="line"><span style="color:#E1E4E8;">        DominatorTreeDemo1 demo1 = new DominatorTreeDemo1();</span></span>
<span class="line"><span style="color:#E1E4E8;">        DominatorTreeDemo2 demo2 = new DominatorTreeDemo2();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        Holder() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            demo1.setValue(demo2);</span></span>
<span class="line"><span style="color:#E1E4E8;">            demo2.setValue(demo1);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        private boolean aBoolean = false;</span></span>
<span class="line"><span style="color:#E1E4E8;">        private char aChar = &#39;\\0&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">        private short aShort = 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">        private int anInt = 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">        private long aLong = 1L;</span></span>
<span class="line"><span style="color:#E1E4E8;">        private float aFloat = 1.0F;</span></span>
<span class="line"><span style="color:#E1E4E8;">        private double aDouble = 1.0D;</span></span>
<span class="line"><span style="color:#E1E4E8;">        private Double aDouble_2 = 1.0D;</span></span>
<span class="line"><span style="color:#E1E4E8;">        private int[] ints = new int[2];</span></span>
<span class="line"><span style="color:#E1E4E8;">        private String string = &quot;1234&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Runnable runnable = () -&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Map&lt;</span><span style="color:#FDAEB7;font-style:italic;">String,</span><span style="color:#B392F0;"> A4MAT</span><span style="color:#E1E4E8;">&gt; map = new HashMap</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        IntStream.range(0, 100).forEach(i -&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">            byte[] bytes = new byte[1024 * 1024];</span></span>
<span class="line"><span style="color:#E1E4E8;">            String str = new String(bytes).replace(&#39;\\0&#39;, (char) i);</span></span>
<span class="line"><span style="color:#E1E4E8;">            A4MAT a4MAT = new A4MAT();</span></span>
<span class="line"><span style="color:#E1E4E8;">            a4MAT.b4MAT.c4MAT.list.add(str);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            map.put(i + &quot;&quot;, a4MAT);</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        Holder holder = new Holder();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        try {</span></span>
<span class="line"><span style="color:#E1E4E8;">            //sleep forever , retain the memory</span></span>
<span class="line"><span style="color:#E1E4E8;">            Thread.sleep(Integer.MAX_VALUE);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } catch (InterruptedException e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            e.printStackTrace();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    void startHugeThread() throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        new Thread(runnable, &quot;huge-thread&quot;).start();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Objects4MAT objects4MAT = new Objects4MAT();</span></span>
<span class="line"><span style="color:#E1E4E8;">        objects4MAT.startHugeThread();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">import java.util.ArrayList;</span></span>
<span class="line"><span style="color:#24292E;">import java.util.HashMap;</span></span>
<span class="line"><span style="color:#24292E;">import java.util.List;</span></span>
<span class="line"><span style="color:#24292E;">import java.util.Map;</span></span>
<span class="line"><span style="color:#24292E;">import java.util.stream.IntStream;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">public class Objects4MAT {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class A4MAT {</span></span>
<span class="line"><span style="color:#24292E;">        B4MAT b4MAT = new B4MAT();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class B4MAT {</span></span>
<span class="line"><span style="color:#24292E;">        C4MAT c4MAT = new C4MAT();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class C4MAT {</span></span>
<span class="line"><span style="color:#24292E;">        List&lt;</span><span style="color:#B31D28;font-style:italic;">String</span><span style="color:#24292E;">&gt; list = new ArrayList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class DominatorTreeDemo1 {</span></span>
<span class="line"><span style="color:#24292E;">        DominatorTreeDemo2 dominatorTreeDemo2;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        public void setValue(DominatorTreeDemo2 value) {</span></span>
<span class="line"><span style="color:#24292E;">            this.dominatorTreeDemo2 = value;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class DominatorTreeDemo2 {</span></span>
<span class="line"><span style="color:#24292E;">        DominatorTreeDemo1 dominatorTreeDemo1;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        public void setValue(DominatorTreeDemo1 value) {</span></span>
<span class="line"><span style="color:#24292E;">            this.dominatorTreeDemo1 = value;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class Holder {</span></span>
<span class="line"><span style="color:#24292E;">        DominatorTreeDemo1 demo1 = new DominatorTreeDemo1();</span></span>
<span class="line"><span style="color:#24292E;">        DominatorTreeDemo2 demo2 = new DominatorTreeDemo2();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        Holder() {</span></span>
<span class="line"><span style="color:#24292E;">            demo1.setValue(demo2);</span></span>
<span class="line"><span style="color:#24292E;">            demo2.setValue(demo1);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        private boolean aBoolean = false;</span></span>
<span class="line"><span style="color:#24292E;">        private char aChar = &#39;\\0&#39;;</span></span>
<span class="line"><span style="color:#24292E;">        private short aShort = 1;</span></span>
<span class="line"><span style="color:#24292E;">        private int anInt = 1;</span></span>
<span class="line"><span style="color:#24292E;">        private long aLong = 1L;</span></span>
<span class="line"><span style="color:#24292E;">        private float aFloat = 1.0F;</span></span>
<span class="line"><span style="color:#24292E;">        private double aDouble = 1.0D;</span></span>
<span class="line"><span style="color:#24292E;">        private Double aDouble_2 = 1.0D;</span></span>
<span class="line"><span style="color:#24292E;">        private int[] ints = new int[2];</span></span>
<span class="line"><span style="color:#24292E;">        private String string = &quot;1234&quot;;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Runnable runnable = () -&gt; {</span></span>
<span class="line"><span style="color:#24292E;">        Map&lt;</span><span style="color:#B31D28;font-style:italic;">String,</span><span style="color:#6F42C1;"> A4MAT</span><span style="color:#24292E;">&gt; map = new HashMap</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        IntStream.range(0, 100).forEach(i -&gt; {</span></span>
<span class="line"><span style="color:#24292E;">            byte[] bytes = new byte[1024 * 1024];</span></span>
<span class="line"><span style="color:#24292E;">            String str = new String(bytes).replace(&#39;\\0&#39;, (char) i);</span></span>
<span class="line"><span style="color:#24292E;">            A4MAT a4MAT = new A4MAT();</span></span>
<span class="line"><span style="color:#24292E;">            a4MAT.b4MAT.c4MAT.list.add(str);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            map.put(i + &quot;&quot;, a4MAT);</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        Holder holder = new Holder();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        try {</span></span>
<span class="line"><span style="color:#24292E;">            //sleep forever , retain the memory</span></span>
<span class="line"><span style="color:#24292E;">            Thread.sleep(Integer.MAX_VALUE);</span></span>
<span class="line"><span style="color:#24292E;">        } catch (InterruptedException e) {</span></span>
<span class="line"><span style="color:#24292E;">            e.printStackTrace();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    void startHugeThread() throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">        new Thread(runnable, &quot;huge-thread&quot;).start();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">        Objects4MAT objects4MAT = new Objects4MAT();</span></span>
<span class="line"><span style="color:#24292E;">        objects4MAT.startHugeThread();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_2-1-代码介绍" tabindex="-1">2.1. 代码介绍 <a class="header-anchor" href="#_2-1-代码介绍" aria-label="Permalink to &quot;2.1. 代码介绍&quot;">​</a></h3><p>我们以一段代码示例 <strong>Objects4MAT</strong>，来具体看一下 MAT 工具的使用。代码创建了一个新的线程 &quot;huge-thread&quot;，并建立了一个引用的层级关系，总的内存大约占用 100 MB。同时，demo1 和 demo2 展示了一个循环引用的关系。最后，使用 sleep 函数，让线程永久阻塞住，此时整个堆处于一个相对&quot;静止&quot;的状态。</p><br>`,10),D=s("br",null,null,-1),S=s("p",null,"如果你是在本地启动的示例代码，则可以使用 Accquire 的方式来获取堆快照。",-1),j=s("br",null,null,-1),w=s("h3",{id:"_2-2-内存泄漏检测",tabindex:"-1"},[l("2.2. 内存泄漏检测 "),s("a",{class:"header-anchor",href:"#_2-2-内存泄漏检测","aria-label":'Permalink to "2.2. 内存泄漏检测"'},"​")],-1),k=s("p",null,"如果问题特别突出，则可以通过 Find Leaks 菜单快速找出问题。",-1),R=s("br",null,null,-1),O=s("br",null,null,-1),f=s("p",null,"如下图所示，展示了名称叫做 huge-thread 的线程，持有了超过 96% 的对象，数据被一个 HashMap 所持有。",-1),F=s("br",null,null,-1),q=s("br",null,null,-1),B=s("p",null,"对于特别明显的内存泄漏，在这里能够帮助我们迅速定位，但通常内存泄漏问题会比较隐蔽，我们需要更加复杂的分析。",-1),I=s("h3",{id:"_2-3-支配树视图",tabindex:"-1"},[l("2.3. 支配树视图 "),s("a",{class:"header-anchor",href:"#_2-3-支配树视图","aria-label":'Permalink to "2.3. 支配树视图"'},"​")],-1),L=s("p",null,'支配树视图对数据进行了归类，体现了对象之间的依赖关系。如图，我们通常会根据"深堆"进行倒序排序，可以很容易的看到占用内存比较高的几个对象，点击前面的箭头，即可一层层展开支配关系。',-1),N=s("br",null,null,-1),H=s("p",null,"图中显示的是其中的 1 MB 数据，从左侧的 inspector 视图，可以看到这 1 MB 的 byte 数组具体内容。",-1),V=s("br",null,null,-1),x=s("br",null,null,-1),G=s("p",null,"从支配树视图同样能够找到我们创建的两个循环依赖，但它们并没有显示这个过程。",-1),P=s("br",null,null,-1),K=s("br",null,null,-1),J=s("p",null,"支配树视图的概念有一点点复杂，我们只需要了解这个概念即可。",-1),X=s("br",null,null,-1),Q=s("br",null,null,-1),U=s("p",null,'如上图，左边是引用关系，右边是支配树视图。可以看到 A、B、C 被当作是"虚拟"的根，支配关系是可传递的，因为 C 支配 E，E 支配 G，所以 C 也支配 G。',-1),W=s("br",null,null,-1),z=s("p",null,"另外，到对象 C 的路径中，可以经过 A，也可以经过 B，因此对象 C 的直接支配者也是根对象。同理，对象 E 是 H 的支配者。",-1),$=s("br",null,null,-1),Y=s("p",null,"我们再来看看比较特殊的 D 和 F。对象 F 与对象 D 相互引用，因为到对象 F 的所有路径必然经过对象 D，因此，对象 D 是对象 F 的直接支配者。",-1),Z=s("br",null,null,-1),ss=s("p",null,"可以看到支配树视图并不一定总是能看到对象的真实应用关系，但对我们分析问题的影响并不是很大。",-1),ns=s("br",null,null,-1),as=s("p",null,"这个视图是非常好用的，甚至可以根据 package 进行归类，对目标类的查找也是非常快捷的。",-1),ls=s("br",null,null,-1),ps=p(`<br><p>编译下面这段代码，可以展开视图，实际观测一下支配树，这和我们上面介绍的是一致的。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class DorminatorTreeDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    static class A {</span></span>
<span class="line"><span style="color:#E1E4E8;">        C c;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        byte[] data = new byte[1024 * 1024 * 2];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class B {</span></span>
<span class="line"><span style="color:#E1E4E8;">        C c;</span></span>
<span class="line"><span style="color:#E1E4E8;">        byte[] data = new byte[1024 * 1024 * 3];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class C {</span></span>
<span class="line"><span style="color:#E1E4E8;">        D d;</span></span>
<span class="line"><span style="color:#E1E4E8;">        E e;</span></span>
<span class="line"><span style="color:#E1E4E8;">        byte[] data = new byte[1024 * 1024 * 5];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class D {</span></span>
<span class="line"><span style="color:#E1E4E8;">        F f;</span></span>
<span class="line"><span style="color:#E1E4E8;">        byte[] data = new byte[1024 * 1024 * 7];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class E {</span></span>
<span class="line"><span style="color:#E1E4E8;">        G g;</span></span>
<span class="line"><span style="color:#E1E4E8;">        byte[] data = new byte[1024 * 1024 * 11];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class F {</span></span>
<span class="line"><span style="color:#E1E4E8;">        D d;</span></span>
<span class="line"><span style="color:#E1E4E8;">        H h;</span></span>
<span class="line"><span style="color:#E1E4E8;">        byte[] data = new byte[1024 * 1024 * 13];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class G {</span></span>
<span class="line"><span style="color:#E1E4E8;">        H h;</span></span>
<span class="line"><span style="color:#E1E4E8;">        byte[] data = new byte[1024 * 1024 * 17];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static class H {</span></span>
<span class="line"><span style="color:#E1E4E8;">        byte[] data = new byte[1024 * 1024 * 19];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    A makeRef(A a, B b) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        C c = new C();</span></span>
<span class="line"><span style="color:#E1E4E8;">        D d = new D();</span></span>
<span class="line"><span style="color:#E1E4E8;">        E e = new E();</span></span>
<span class="line"><span style="color:#E1E4E8;">        F f = new F();</span></span>
<span class="line"><span style="color:#E1E4E8;">        G g = new G();</span></span>
<span class="line"><span style="color:#E1E4E8;">        H h = new H();</span></span>
<span class="line"><span style="color:#E1E4E8;">        a.c = c;</span></span>
<span class="line"><span style="color:#E1E4E8;">        b.c = c;</span></span>
<span class="line"><span style="color:#E1E4E8;">        c.e = e;</span></span>
<span class="line"><span style="color:#E1E4E8;">        c.d = d;</span></span>
<span class="line"><span style="color:#E1E4E8;">        d.f = f;</span></span>
<span class="line"><span style="color:#E1E4E8;">        e.g = g;</span></span>
<span class="line"><span style="color:#E1E4E8;">        f.d = d;</span></span>
<span class="line"><span style="color:#E1E4E8;">        f.h = h;</span></span>
<span class="line"><span style="color:#E1E4E8;">        g.h = h;</span></span>
<span class="line"><span style="color:#E1E4E8;">        return a;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static A a = new A();</span></span>
<span class="line"><span style="color:#E1E4E8;">    static B b = new B();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) throws Exception {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        new DorminatorTreeDemo().makeRef(a, b);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        Thread.sleep(Integer.MAX_VALUE);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class DorminatorTreeDemo {</span></span>
<span class="line"><span style="color:#24292E;">    static class A {</span></span>
<span class="line"><span style="color:#24292E;">        C c;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        byte[] data = new byte[1024 * 1024 * 2];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class B {</span></span>
<span class="line"><span style="color:#24292E;">        C c;</span></span>
<span class="line"><span style="color:#24292E;">        byte[] data = new byte[1024 * 1024 * 3];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class C {</span></span>
<span class="line"><span style="color:#24292E;">        D d;</span></span>
<span class="line"><span style="color:#24292E;">        E e;</span></span>
<span class="line"><span style="color:#24292E;">        byte[] data = new byte[1024 * 1024 * 5];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class D {</span></span>
<span class="line"><span style="color:#24292E;">        F f;</span></span>
<span class="line"><span style="color:#24292E;">        byte[] data = new byte[1024 * 1024 * 7];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class E {</span></span>
<span class="line"><span style="color:#24292E;">        G g;</span></span>
<span class="line"><span style="color:#24292E;">        byte[] data = new byte[1024 * 1024 * 11];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class F {</span></span>
<span class="line"><span style="color:#24292E;">        D d;</span></span>
<span class="line"><span style="color:#24292E;">        H h;</span></span>
<span class="line"><span style="color:#24292E;">        byte[] data = new byte[1024 * 1024 * 13];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class G {</span></span>
<span class="line"><span style="color:#24292E;">        H h;</span></span>
<span class="line"><span style="color:#24292E;">        byte[] data = new byte[1024 * 1024 * 17];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static class H {</span></span>
<span class="line"><span style="color:#24292E;">        byte[] data = new byte[1024 * 1024 * 19];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    A makeRef(A a, B b) {</span></span>
<span class="line"><span style="color:#24292E;">        C c = new C();</span></span>
<span class="line"><span style="color:#24292E;">        D d = new D();</span></span>
<span class="line"><span style="color:#24292E;">        E e = new E();</span></span>
<span class="line"><span style="color:#24292E;">        F f = new F();</span></span>
<span class="line"><span style="color:#24292E;">        G g = new G();</span></span>
<span class="line"><span style="color:#24292E;">        H h = new H();</span></span>
<span class="line"><span style="color:#24292E;">        a.c = c;</span></span>
<span class="line"><span style="color:#24292E;">        b.c = c;</span></span>
<span class="line"><span style="color:#24292E;">        c.e = e;</span></span>
<span class="line"><span style="color:#24292E;">        c.d = d;</span></span>
<span class="line"><span style="color:#24292E;">        d.f = f;</span></span>
<span class="line"><span style="color:#24292E;">        e.g = g;</span></span>
<span class="line"><span style="color:#24292E;">        f.d = d;</span></span>
<span class="line"><span style="color:#24292E;">        f.h = h;</span></span>
<span class="line"><span style="color:#24292E;">        g.h = h;</span></span>
<span class="line"><span style="color:#24292E;">        return a;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static A a = new A();</span></span>
<span class="line"><span style="color:#24292E;">    static B b = new B();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) throws Exception {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        new DorminatorTreeDemo().makeRef(a, b);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        Thread.sleep(Integer.MAX_VALUE);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br>`,5),es=s("h3",{id:"_2-4-线程视图",tabindex:"-1"},[l("2.4. 线程视图 "),s("a",{class:"header-anchor",href:"#_2-4-线程视图","aria-label":'Permalink to "2.4. 线程视图"'},"​")],-1),ts=s("p",null,"想要看具体的引用关系，可以通过线程视图。我们在第 5 讲，就已经了解了线程其实是可以作为 GC Roots 的。如图展示了线程内对象的引用关系，以及方法调用关系，相对比 jstack 获取的栈 dump，我们能够更加清晰地看到内存中具体的数据。",-1),os=s("br",null,null,-1),cs=s("p",null,"如下图，我们找到了 huge-thread，依次展开找到 holder 对象，可以看到循环依赖已经陷入了无限循环的状态。这在查看一些 Java 对象的时候，经常发生，不要感到奇怪。",-1),is=s("h3",{id:"_2-5-柱状图视图",tabindex:"-1"},[l("2.5. 柱状图视图 "),s("a",{class:"header-anchor",href:"#_2-5-柱状图视图","aria-label":'Permalink to "2.5. 柱状图视图"'},"​")],-1),rs=s("p",null,"我们返回头来再看一下柱状图视图，可以看到除了对象的大小，还有类的实例个数。结合 MAT 提供的不同显示方式，往往能够直接定位问题。也可以通过正则过滤一些信息，我们在这里输入 MAT，过滤猜测的、可能出现问题的类，可以看到，创建的这些自定义对象，不多不少正好一百个。",-1),Es=s("br",null,null,-1),ys=s("br",null,null,-1),ds=s("p",null,"右键点击类，然后选择 incoming，这会列出所有的引用关系。",-1),us=s("br",null,null,-1),hs=s("br",null,null,-1),_s=s("p",null,'再次选择某个引用关系，然后选择菜单"Path To GC Roots"，即可显示到 GC Roots 的全路径。通常在排查内存泄漏的时候，会选择排除虚弱软等引用。',-1),gs=s("br",null,null,-1),bs=s("br",null,null,-1),ms=s("p",null,"使用这种方式，即可在引用之间进行跳转，方便的找到所需要的信息。",-1),As=s("br",null,null,-1),Ts=s("br",null,null,-1),vs=s("p",null,"再介绍一个比较高级的功能。",-1),Ms=s("br",null,null,-1),Cs=s("p",null,[l('我们对于堆的快照，其实是一个"'),s("strong",null,"瞬时态"),l('"，有时候仅仅分析这个瞬时状态，并不一定能确定问题，这就需要对两个或者多个快照进行对比，来确定一个增长趋势。')],-1),Ds=s("br",null,null,-1),Ss=s("br",null,null,-1),js=s("p",null,"可以将代码中的 100 改成 10 或其他数字，再次 dump 一份快照进行比较。如图，通过分析某类对象的增长，即可辅助问题定位。",-1),ws=s("ol",{start:"3"},[s("li",null,"高级功能---OQL")],-1),ks=s("hr",null,null,-1),Rs=s("p",null,"MAT 支持一种类似于 SQL 的查询语言 OQL（Object Query Language），这个查询语言 VisualVM 工具也支持。",-1),Os=s("br",null,null,-1),fs=p(`<br><p>以下是几个例子，你可以实际实践一下。</p><br><p>查询 A4MAT 对象：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">SELECT * FROM  Objects4MAT$A4MAT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">SELECT * FROM  Objects4MAT$A4MAT</span></span></code></pre></div><br><p>正则查询 MAT 结尾的对象：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">SELECT * FROM &quot;.*MAT&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">SELECT * FROM &quot;.*MAT&quot;</span></span></code></pre></div><br><p>查询 String 类的 char 数组：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">SELECT OBJECTS s.value FROM java.lang.String s </span></span>
<span class="line"><span style="color:#E1E4E8;">SELECT OBJECTS mat.b4MAT FROM  Objects4MAT$A4MAT mat</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">SELECT OBJECTS s.value FROM java.lang.String s </span></span>
<span class="line"><span style="color:#24292E;">SELECT OBJECTS mat.b4MAT FROM  Objects4MAT$A4MAT mat</span></span></code></pre></div><br><p>根据内存地址查找对象：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">select * from 0x55a034c8</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">select * from 0x55a034c8</span></span></code></pre></div><br><p>使用 INSTANCEOF 关键字，查找所有子类：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">SELECT * FROM INSTANCEOF java.util.AbstractCollection</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">SELECT * FROM INSTANCEOF java.util.AbstractCollection</span></span></code></pre></div><br><p>查询长度大于 1000 的 byte 数组：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">SELECT * FROM byte[] s WHERE s.@length&gt;1000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">SELECT * FROM byte[] s WHERE s.@length&gt;1000</span></span></code></pre></div><br><p>查询包含 java 字样的所有字符串：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">SELECT * FROM java.lang.String s WHERE toString(s) LIKE &quot;.*java.*&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">SELECT * FROM java.lang.String s WHERE toString(s) LIKE &quot;.*java.*&quot;</span></span></code></pre></div><br><p>查找所有深堆大小大于 1 万的对象：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">SELECT * FROM INSTANCEOF java.lang.Object o WHERE o.@retainedHeapSize&gt;10000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">SELECT * FROM INSTANCEOF java.lang.Object o WHERE o.@retainedHeapSize&gt;10000</span></span></code></pre></div><br><p>如果你忘记这些属性的名称的话，MAT 是可以自动补全的。</p><br>`,37),Fs=s("br",null,null,-1),qs=s("p",null,[l("OQL 有比较多的语法和用法，若想深入了解，"),s("a",{href:"http://tech.novosoft-us.com/products/oql_book.htm",target:"_blank",rel:"noreferrer"},"可参考"),s("a",{href:"http://tech.novosoft-us.com/products/oql_book.htm",target:"_blank",rel:"noreferrer"},"这里"),l("。")],-1),Bs=s("br",null,null,-1),Is=s("p",null,"一般，我们使用上面这些简单的查询语句就够用了。",-1),Ls=s("br",null,null,-1),Ns=s("p",null,"OQL 还有一个好处，就是可以分享。如果你和同事同时在分析一个大堆，不用告诉他先点哪一步、再点哪一步，共享给他一个 OQL 语句就可以了。",-1),Hs=s("br",null,null,-1),Vs=s("p",null,"如下图，MAT 贴心的提供了复制 OQL 的功能，但是用在其他快照上，不会起作用，因为它复制的是如下的内容。",-1),xs=s("br",null,null,-1),Gs=p('<ol start="4"><li>小结</li></ol><hr><p>这一讲我们介绍了 MAT 工具的使用，其是用来分析内存快照的；在最后，简要介绍了 OQL 查询语言。</p><br><p>在 Java 9 以前的版本中，有一个工具 jhat，可以以 html 的方式显示堆栈信息，但和 VisualVm 一样，都太过于简陋，推荐使用 MAT 工具。</p><br><p>我们把问题设定为内存泄漏，但其实 OOM 或者频繁 GC 不一定就是内存泄漏，它也可能是由于某次或者某批请求频繁而创建了大量对象，所以一些严重的、频繁的 GC 问题也能在这里找到原因。有些情况下，占用内存最多的对象，并不一定是引起内存泄漏问题的元凶，但我们也有一个比较通用的分析过程。</p><br><p>并不是所有的堆都值得分析的，我们在做这个耗时的分析之前，需要有个依据。比如，经过初步调优之后，GC 的停顿时间还是较长，则需要找到频繁 GC 的原因；再比如，我们发现了内存泄漏，需要找到是谁在搞鬼。</p><br><p>首先，我们高度关注快照载入后的初始分析，占用内存高的 topN 对象，大概率是问题产生者。</p><br><p>对照自己的代码，首先要分析的，就是产生这些大对象的逻辑。举几个实际发生的例子。有一个 Spring Boot 应用，由于启用了 Swagger 文档生成器，但是由于它的 API 关系非常复杂，嵌套层次又非常深（每次要产生几百 M 的文档！），结果请求几次之后产生了内存溢出，这在 MAT 上就能够一眼定位到问题；而另外一个应用，在读取数据库的时候使用了分页，但是 pageSize 并没有做一些范围检查，结果在请求一个较大分页的时候，使用 fastjson 对获取的数据进行加工，直接 OOM。</p><br><p>如果不能通过大对象发现问题，则需要对快照进行深入分析。使用柱状图和支配树视图，配合引入引出和各种排序，能够对内存的使用进行整体的摸底。由于我们能够看到内存中的具体数据，排查一些异常数据就容易得多。</p><br><p>可以在程序运行的不同时间点，获取多份内存快照，对比之后问题会更加容易发现。我们还是用一个例子来看。有一个应用，使用了 Kafka 消息队列，开了一般大小的消费缓冲区，Kafka 会复用这个缓冲区，按理说不应该有内存问题，但是应用却频繁发生 GC。通过对比请求高峰和低峰期间的内存快照，我们发现有工程师把消费数据放入了另外一个 &quot;内存队列&quot;，写了一些画蛇添足的代码，结果在业务高峰期一股脑把数据加载到了内存中。</p><br><p>上面这些问题通过分析业务代码，也不难发现其关联性。问题如果非常隐蔽，则需要使用 OQL 等语言，对问题一一排查、确认。</p><br><p>可以看到，上手 MAT 工具是有一定门槛的，除了其操作模式，还需要对我们前面介绍的理论知识有深入的理解，比如 GC Roots、各种引用级别等。</p><br><p>在很多场景，MAT 并不仅仅用于内存泄漏的排查。由于我们能够看到内存上的具体数据，在排查一些难度非常高的 bug 时，MAT 也有用武之地。比如，因为某些脏数据，引起了程序的执行异常，此时，想要找到它们，不要忘了 MAT 这个老朋友。</p><br>',24);function Ps(Ks,Js,Xs,Qs,Us,Ws){const n=t("Image");return o(),c("div",null,[r,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsiAGcDYAAGoA74s9J4470.jpg"}),E,y,d,u,h,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsiAF2UoAACXuKqZ_nE086.jpg"}),_,g,b,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsmADmSUAADHVcry3i0679.jpg"}),m,A,T,v,M,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsmAEeWTAABDIx8RWa4815.png"}),C,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsmAC91XAABbohWGa5g179.png"}),D,S,j,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsmAe6KpAADnQ4RiJB0172.jpg"}),w,k,R,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsmAXR8iAADltd6bubA950.jpg"}),O,f,F,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsmAY8daAACqOrzPq-0668.jpg"}),q,B,I,L,N,H,V,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsmAK6e-AAHIVUhKKVo936.jpg"}),x,G,P,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsmANxVwAAEHUj82zng151.jpg"}),K,J,X,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsmATfB_AACo8ZKxSls467.png"}),Q,U,W,z,$,Y,Z,ss,ns,as,ls,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsqAL2HLAAC_bwnowFA744.jpg"}),ps,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsqAG2bqAAE8ffV3Y6A856.jpg"}),es,ts,os,cs,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsqAGh2eAAFzWwgR_5s636.jpg"}),is,rs,Es,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsqAZeYkAACXjbBqX-w528.jpg"}),ys,ds,us,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsqAcbX0AADCFqtn7Cc159.jpg"}),hs,_s,gs,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsqAY5P_AAEJNoYbh2g934.jpg"}),bs,ms,As,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsqAN7ItAABgU-qJaX4743.jpg"}),Ts,vs,Ms,Cs,Ds,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsuAXIf7AADdHx0K1xc241.jpg"}),Ss,js,ws,ks,Rs,Os,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsuAFXehAAC0TcFd7Zs280.jpg"}),fs,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/Cgq2xl5NRsuAMARGAACW6OEtUPs910.jpg"}),Fs,qs,Bs,Is,Ls,Ns,Hs,Vs,xs,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/10/CgpOIF5NRsuAP-J5AAEx2z68KT4959.jpg"}),Gs])}const Ys=e(i,[["render",Ps]]);export{$s as __pageData,Ys as default};

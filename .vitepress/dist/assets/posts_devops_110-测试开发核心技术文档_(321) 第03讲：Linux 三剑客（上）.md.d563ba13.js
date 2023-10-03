import{_ as p,o as t,g as l,Q as i}from"./chunks/framework.f949202b.js";const u=JSON.parse('{"title":"Linux 三剑客简介 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(321) 第03讲：Linux 三剑客（上）.md","filePath":"posts/devops/110-测试开发核心技术文档/(321) 第03讲：Linux 三剑客（上）.md","lastUpdated":null}'),e={name:"posts/devops/110-测试开发核心技术文档/(321) 第03讲：Linux 三剑客（上）.md"},a=i('<p>在本课时我将讲解 Linux 三剑客，以及它们的具体使用语法。</p><h2 id="linux-三剑客简介" tabindex="-1">Linux 三剑客简介 <a class="header-anchor" href="#linux-三剑客简介" aria-label="Permalink to &quot;Linux 三剑客简介&quot;">​</a></h2><p>首先，我们来了解下 Linux 三剑客具体指什么？</p><ol><li><p>第一个工具是 grep，grep 会根据正则表达式查找相关内容并打印对应的数据。</p></li><li><p>第二个工具是 awk，awk 的名字来源于三个作者的名字简称，它可以根据定位到的数据行处理其中的分段。</p></li><li><p>第三个工具是 sed，它是 stream editor 流式编辑器的简称，可以定位到数据行并对数据进行增删改查操作。</p></li></ol><p>因为它们三个组合使用的功能非常的强大，几乎完美的应对了 Shell 中的数据分析场景，于是人们把这三个工具统称为 Linux 三剑客。</p><h2 id="linux-三剑客价值" tabindex="-1">Linux 三剑客价值 <a class="header-anchor" href="#linux-三剑客价值" aria-label="Permalink to &quot;Linux 三剑客价值&quot;">​</a></h2><p>接下来，我们通过对三剑客与 SQL 进行类比，来具体看看它们到底能做些什么？</p><ul><li><p>grep 相当于 SQL 的 select *from table，它可以进行数据的查找与定位。</p></li><li><p>awk 相当于 SQL 的 select field from table，它可以进行数据切片。</p></li><li><p>sed 相当于 SQL 的 update table set field=new where field=old，它可以对数据进行修改。</p></li></ul><p>你可以发现，grep 和 awk 可以进行组合使用，来达到查找数据并对数据进行分割的目的，grep 也可以与 sed 组合使用，达到查找数据并修改的目的，它们三个还可以组合在一起使用来完成一系列的操作，就相当于大数据处理中的 Map-Reduce，我们接下来看如何具体的使用它们。</p><h2 id="grep" tabindex="-1">grep <a class="header-anchor" href="#grep" aria-label="Permalink to &quot;grep&quot;">​</a></h2><p>首先，我们来看下如何使用 grep，grep 用于根据正则表达式查找相关内容并打印对应的数据，我们打开 Shell 环境，通过 vim/tmp/hello.txt 命令创建一个文件，并在文件内输入三条数据：</p><ul><li><p>hello from hogwarts</p></li><li><p>hello from sevenriby</p></li><li><p>hello from testerhome</p></li></ul><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/DE/CgoB5l3XtNuAPoP1AACZeigKKy8997.png" alt=""></p><br><p>然后通过 grep hogwarts /tmp/hello.txt 指令查找数据，指令中间的参数是正则表达式，指令后面的参数是文件名。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/FE/CgotOV3XtPiAXjErAADUYrh9hPI032.png" alt=""></p><br><p>你可以看到 grep 把 hello from hogwarts 从文件中提取出来。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/DE/CgoB5l3XtQuAMGB7AAFQI4atTN4017.png" alt=""></p><br><p>你还可以通过 grep 把 testerhome 提取出来，通过 cat 指令可以看到在 hello.txt 中有三行数据。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/FE/CgotOV3XtRqAHiTCAAIU-z_0BFc527.png" alt=""></p><br><p>如果我们输入 grep hello 指令，它会把三条数据都提取出来。这就是 grep 的第一个作用，根据指定的正则表达式查取对应的数据，我们上面的演示用的是简单的字符串。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/FE/CgotOV3XtSmAVa4mAAKQLiKRwF0939.png" alt=""></p><br><p>接下来，我们学习如何使用正则表达式获取以字母 s 或 t 开头的后面跟任意两个字符的数据，输入 grep &quot;[st]..&quot; /tmp/hello.tex 指令，其中 [] 表示正则表达式，..表示后面跟任意的两个字符，你可以看到输出了两条数据。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/DF/CgoB5l3XtTeAfsKQAAJKMXmUvhU283.png" alt=""></p><br><p>我们还可以通过 -o 指令只打印匹配的内容，输入 grep -o &quot;[st]..&quot; /tmp/hello.tex 指令，你可以看到只打印了匹配到的内容，而不是整条数据。</p><p>grep 还有一些其他的指令，比如 -i 可以忽略字符大小写。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/DF/CgoB5l3XtUWAK5t-AAIxEAoUhtM359.png" alt=""></p><br><p>-v 表示将匹配到的内容过滤掉，比如我们输入 grep -v &quot;[st]..&quot; /tmp/hello.tex 指令，只显示了一条数据，过滤掉了匹配正则条件的内容。</p><p>-o 表示只打印匹配的数据，-E 表示支持使用扩展正则表达式，我们接下来详细了解下 pattern 正则表达式。</p><p>我把正则表达式分为两类，第一类称为基本表达式，基本表达式包括了典型的正则标识符。</p><ul><li><p>^表示开头；</p></li><li><p>$表示结尾；</p></li><li><p>[]表示任意匹配项；</p></li><li><p>*表示0个或多个；</p></li><li><p>.表示任意字符。</p></li></ul><p>第二类是扩展表达式，它在基础表达式的基础上做了一些扩展，支持了更高级的语法和更复杂的条件。</p><ul><li><p>？表示非贪婪匹配；</p></li><li><ul><li>表示一个或多个；</li></ul></li><li><p>() 表示分组；</p></li><li><p>{} 表示一个范围的约束；</p></li><li><p>| 表示匹配多个表达式中的任何一个。</p></li></ul><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/DF/CgoB5l3XtVaAJPZaAAJpe4YZD9c323.png" alt=""></p><br><p>我们举个例子，输入 grep -E &quot;(hog|home)&quot; /tmp/hello.tex 指令，输出结果分别匹配了 hog 与 home。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/FF/CgotOV3XtWSAF9K-AAKOZuR4qrg333.png" alt=""></p><br><p>但如果你的指令中不含 -E，则指令不支持扩展正则，这个时候你会发现它什么都匹配不到。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/DF/CgoB5l3XtXGAQRR7AAKVDfReUHg948.png" alt=""></p><br><p>如果不使用 -E，我们可以使用 \\ 转义符对匹配条件进行转义，也可以达到同样的效果</p><h2 id="awk" tabindex="-1">awk <a class="header-anchor" href="#awk" aria-label="Permalink to &quot;awk&quot;">​</a></h2><p>了解完 grep 如何使用，我们接下来学习如何使用 awk。</p><p>awk 是 Linux 下的一个命令，同时也是一种语言解析引擎，它的功能非常强大，具备完整的编程特性，可以执行命令、进行网络请求等操作。所以精通 awk 是一个 Linux 工作者必备的技能。我们接下来看下 awk 的语法 awk &#39;pattern{action}&#39; 的相关知识，pattern 是匹配条件，action 表示具体需要做的处理。</p><br><p>pettern 语法在一定程度上可以代替 grep。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/FF/CgotOV3XtaaAcU3QAAKjJeoBA8g632.png" alt=""></p><br><br><p>举个例子，使用双 / 表示一个正则匹配，我们输入 awk &#39;/[st]../&#39; /tmp/hello.txt 指令，你可以看到和 grep 一样，轻松地打印出匹配到的内容，所以在一定程度上 awk 可以替代 grep，但它没有使用 grep 简洁。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/DF/CgoB5l3XtY-AaJPqAABKIEkO88U487.png" alt=""></p><p>还有表示区间选择，比如我们在 1、2、3 之间，使用 awk &#39;$0&gt;2&#39; 指令打印大于 2 的数据 3。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/FF/CgotOV3XtbWAZKNqAAK80TDMRgQ651.png" alt=""></p><br><p>还有一个参数叫 NR，代表记录数，比如输入 awk &#39;NR&gt;1&#39; /tmp/hello.tex 指令打印去掉第一行的数据。</p><p>pattern有非常丰富的语法，你可以课后自己进行练习，同时 awk 还有几个标准的内置变量。</p><ul><li><p>FS 表示字段分隔符</p></li><li><p>OFS 表示输出数据的字段分隔符</p></li><li><p>RS 表示记录分隔符</p></li><li><p>ORS 表示输出字段的行分隔符</p></li><li><p>NF 表示字段数</p></li><li><p>NR 表示记录数</p></li></ul><p>比如，我们输入 awk &#39;{print NR,NF}&#39; /tmp/hello.txt 指令，输出显示 hello from hogwarts 被空格分隔成了三个字段，并且 hello.txt 文件中的三条数据字段数都是 3。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/FF/CgotOV3XtcaAGbedAAJmB1D7zHw983.png" alt=""></p><br><p>我们输入 awk -Fo &#39;{print NR,NF}&#39; /tmp/hello.txt 指令，输出显示我们以 o 为分隔符，将 hello from hogwarts 分为了 4 个字段，下面两条数据以此类推。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/DF/CgoB5l3XteOAYuu3AAGhkZYQVJA208.png" alt=""></p><br><p>我们还可以使用 BEGIN 指令，能够得到同样的结果。</p><br><p>接下来，学习 awk 的字段数据处理。我们通过 -F 参数指定字段分隔符，这里需要注意 awk 有一个 $0~$N~$NF 的特殊参数，</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/DF/CgoB5l3XtiGAAolXAAHJ8Kvwgeo677.png" alt=""></p><p>假设我们以 t 为分隔符打印 $1 和 $2，我们来分析夏结果，</p><p>当输入 $1 以 t 为分隔符的时候，t 之前的 hello from hogwar 是 $1 记录，t 之后的 s 是 $2 记录，以此类推，也就是说 awk 通过解析数据内容，然后会根据默认的分隔符打印出每个字段的具体内容，我们输入 awk &#39;OFS=&#39;&#39;-&#39;&#39;{print $1,$2,$3}&#39; 并打印输出。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/FF/CgotOV3XtjCAVm3oAAJriQsbzwU106.png" alt=""></p><br><p>可以看到，hello 指定为 $1，from 指定为 $2，并将默认的空格分隔符替换为 -，我们可以通过 $ 获取具体字段并对其进行相关操作，接下来我们学习 awk 的字段分隔。</p><p>这里有几个例子，课后你可以试验一下，同样 awk 也可以实现简单的数据计算功能，比如说awk &#39;BEGIN{print 10000/3}&#39;。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/FF/CgotOV3XtkGAV30WAAJ4BzFTx30014.png" alt=""></p><br><p>除了这些之外，awk 还支持词典，用来统计一些特征和数据，它类似于 Java 的 hash 和 Python 的字典。awk 的语法非常灵活，希望你在课后能够把文档打印出来仔细阅读，它可以帮助你在日后的数据分析工作中更加得心应手。</p><h2 id="sed" tabindex="-1">sed <a class="header-anchor" href="#sed" aria-label="Permalink to &quot;sed&quot;">​</a></h2><p>然后我们再看第三个工具流式编辑器 sed。sed 的语法和 awk 有点类似，只不过具体的用法不太一样。</p><ul><li><p>sed[addr]X[opptions]，其中 [] 定义了一个范围，x位是具体操作，options表示进行数据修改的选项。</p></li><li><p>-e 表示可以指定表达式。</p></li><li><p>sed -n &#39;2p&#39; 2 表示打印第二行的数据。</p></li><li><p>s 表示查找并替换。</p></li><li><p>-i 表示直接修改源文件</p></li><li><p>-E 支持扩展表达式。</p></li></ul><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/DF/CgoB5l3Xtk6AM47hAAJ7IwffrqA691.png" alt=""></p><br><p>比如我们输入 sed &#39;s#testerhome#world#&#39; /tmp/hello.txt 指令，其中 s 后面可以跟任意符号，比如 / 或 # 都可以表示分隔符，它会用后面的内容替换前面的内容。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/FF/CgotOV3Xtl6AetiKAAJ5M3Mbhfw934.png" alt=""></p><br><p>比如我们把以 t 开头的三个字符都替换成 xxx。你可以看到，后面的 ter 没有改变，是因为需要添加一个额外的标记符 /g。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AB/FF/CgotOV3Xtm-AajlrAAKRg0xYDTQ652.png" alt=""></p><br><p>/g 表示除了替换第一个匹配的字符以外还会把第二个也替换掉，这就是 sed 的用法，你看到 sed 主要帮助我们编辑文件。</p><p>那么关于它的匹配符 pattern，你可以给定具体的行数也可以通过正则匹配一个范围，在某个范围内做一个修改；区间范围也是一个类似的用法，你会发现它和 awk 语法很像。</p><p>action 与 awk 的不同点在于 awk 专注于数据的提取，而 sed 更专注于数据的修改，sed 的重要作用是完成对数据的增删改查工作，比如：</p><ul><li><p>d 是删除</p></li><li><p>p 是打印</p></li><li><p>s 是查找并进行替换</p></li><li><p>\\1 \\2 可以根据匹配的数据进行分组处理</p></li></ul><p>所以 sed 也是一个灵活强大的工具，一旦你掌握了上面的全部内容，那么说明你对三剑客已经入门了。</p><br><br>',101),s=[a];function o(r,g,m,c,h,n){return t(),l("div",null,s)}const d=p(e,[["render",o]]);export{u as __pageData,d as default};

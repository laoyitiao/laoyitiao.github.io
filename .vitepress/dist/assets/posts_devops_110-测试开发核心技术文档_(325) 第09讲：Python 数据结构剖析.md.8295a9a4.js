import{_ as t,o as p,g as i,Q as s}from"./chunks/framework.f949202b.js";const h=JSON.parse('{"title":"基础数据结构 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(325) 第09讲：Python 数据结构剖析.md","filePath":"posts/devops/110-测试开发核心技术文档/(325) 第09讲：Python 数据结构剖析.md","lastUpdated":null}'),a={name:"posts/devops/110-测试开发核心技术文档/(325) 第09讲：Python 数据结构剖析.md"},e=s(`<p>我们知道在学习一门编程语言时，首先需要掌握该门语言的数据结构，本课时我们就主要学习 Python 语言的数据结构。</p><h2 id="基础数据结构" tabindex="-1">基础数据结构 <a class="header-anchor" href="#基础数据结构" aria-label="Permalink to &quot;基础数据结构&quot;">​</a></h2><p>在 Python 中定义一个数据时，主要可以用到以下几种基本的数据结构，包括：</p><ul><li><p>数字 Numbers；</p></li><li><p>字符串 Strings；</p></li><li><p>列表 Lists；</p></li><li><p>集合 Sets；</p></li><li><p>元组 Tuples；</p></li><li><p>词典 Dictionaries。</p></li></ul><h2 id="数字-numbers" tabindex="-1">数字 Numbers <a class="header-anchor" href="#数字-numbers" aria-label="Permalink to &quot;数字 Numbers&quot;">​</a></h2><p>首先，我们从数字 Numbers 类型开始学起，我们使用一个标准的变量 i 来定义数字，这里并不需要为它指定类型。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuKAbTafAAK_YzQld70795.png" alt=""></p><p>比如输入 i=1，然后使用 print 语句打印它，这里需要注意 IDE 有一个小的使用技巧，输入 i.print，IDE会自动在 i 的前后加上括号 ，变成了print(i)，后面我们基本上也都会使用这个小技巧，这样可以加快效率，你可以看到结果输出了 1。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuKABpInAALGJTcCfm8735.png" alt=""></p><p>我们再定义一个新的值，比如 j=2，再打印下 ，可以看到输出中显示了 2。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuKAHLNZAALI6zlLwKk738.png" alt=""></p><p>如果此时我们想计算 i*j 等于多少，可以直接打印 i*j，IDE 会把 i*j 格式化为标准结构，然后点击运行，你可以发现 i*j 的结果等于 2。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuKAYilfAALb-_aR3JA696.png" alt=""></p><p>如果现在把 i 改成 3，再次执行结果等于 6。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuOAHV9XAAL3nNTKfTU360.png" alt=""></p><p>当然 Numbers 也支持浮点数类型，比如输入 j=2.5，可以发现也得到了正确的结果。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuOAGb-_AAL_C3w4wlM160.png" alt=""></p><p>还可以在表达式中增加更多的语法支持，比如打印 i*j+j。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuOAEtwLAAMZGY1vp4c599.png" alt=""></p><p>这时，我们为算数表达式增加优先级，比如打印 i*(j+i)，再次执行也可以得到正确的结果，所以我们可以通过 Numbers 类型来进行加减乘除和优先级的计算。</p><h2 id="字符串-strings" tabindex="-1">字符串 Strings <a class="header-anchor" href="#字符串-strings" aria-label="Permalink to &quot;字符串 Strings&quot;">​</a></h2><p>接下来我们学习第二个数据类型字符串 Strings，字符串是由 n 个字符组成的一个序列。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuOAI8iLAAK-5XqPBxU632.png" alt=""></p><p>我们定义一个字符串 x=&quot;a&quot;，这里使用单引号\\双引号都是可以的，然后再定义一个字符串 y=&quot;bcd&quot;，这时分别打印 x 和 y，然后继续运行程序，你可以看到字符串 a 和 bcd 分别被打印出来。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuSAYvS9AAPUW5PKWBk265.png" alt=""></p><p>我们还可以对字符串进行一系列的处理，输入 x. 可以看到 IDE 已经推荐了这个数据类型支持的方法，比如判断字符串类型，对字符串进行转换等各种操作。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuSAEhLJAALIZrFqXIE339.png" alt=""></p><p>我们以 x.upper 为例，打印并执行，你可以发现原来的小写 a 变成了大写 A。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuSAK1xFAAL_d8mrEOU598.png" alt=""></p><p>又比如此时先将 y 定义成大写的 BCD，然后再把它变成小写，可以使用 y.lower()，打印并执行，可以发现大写的 BCD 变成了小写的 bcd。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuWAQQbJAAMYgA0aw_s160.png" alt=""></p><p>又比如我想把 x、y 两个字符串连接起来，你可以使用最简单的 x+y 语句，然后 print，可以看到打印结果是 aBCD，除了这些基础方法之外，如果我想往字符串中加入一个空格，可以输入 x+&quot; &quot;+y，然后 print，但你会发现输入的代码非常的长，那么有没有更简单的方法呢？</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuWAJlIOAAMeqFjSoLs183.png" alt=""></p><p>我们可以使用 Python 中的一个格式化字符串的方法，输入 f&quot;{x} {y}&quot;，你可以发现效果是一样的，但这样避免了输入大量的 + 号，可以直接使用变量来进行替换，所以这种格式化字符串的方法平时使用的也比较多。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuWAMStyAAMbj5Rmyk0654.png" alt=""></p><p>除了这些方法之外字符串还支持一些经典方法，比如 format 命令，输入&quot;{} {}&quot;.format(x,y).print，你会发现结果是一样的，这是因为给定了两个 {} 括起来的卡位，然后将 x、y 赋值给卡位。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuWAbyM4AANHX9V2Mig179.png" alt=""></p><p>如果我想更精准一点，比如往卡位加入命名过的变量，输入&quot;{m}{n}&quot;.format(m=x,n=y).print，你可以看到效果是一样的。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuaAKLHkAANUvWf038E046.png" alt=""></p><p>除了这些之外字符串还支持 split，split 将字符串进行拆分，输入 y.split(&quot;C&quot;)，打印结果可以看到字符串 y 被拆分成 B 和 D 两个结果。所以通过以上方法我们就可以很好的对字符串进行各种拼接、转换等操作。</p><h2 id="列表-lists" tabindex="-1">列表 Lists <a class="header-anchor" href="#列表-lists" aria-label="Permalink to &quot;列表 Lists&quot;">​</a></h2><p>我们再来看 List 列表，列表是 Python 中应用非常多的一种数据结构，它是一个有序的序列，主要用于存储记录数据。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuaAAlobAANAIFlS94k763.png" alt=""></p><p>比如我们定义一个 number_list 变量，通过 [] 方括号形式给它赋值 2、3、4。然后运行程序并打印结果。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuaAJ15uAAN-AsXSO4g616.png" alt=""></p><p>列表通常还支持一些特殊的方法，比如打印 number_list[0]，它可以根据下标获取对应的数据。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuaARxLBAAOiIbwg1T8696.png" alt=""></p><p>同时，列表还支持逆序，比如打印 number_list[-1]，它可以打印出最后一个数据 4。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuaALtqLAAN8AR6xR6Q606.png" alt=""></p><p>然后列表还支持切片，现在我们将列表扩展成 [2、3、4、5、6]，然后打印number_list[1:3]，打印它们的内容，你会发现列表按照两个小标的范围进行了切割。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nueAVqrSAATN2vsIcT4867.png" alt=""></p><p>除此之外，列表还支持很多其他的方法，输入 number_list.，你可以看到它支持非常多的方法。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nueAfNlbAAOHlfPZWNc207.png" alt=""></p><p>比如现在将序列改成 [2、3、4、5、6、3.5]，打印 number_list.sort()，sort 方法返回的是一个 None 值，它虽然没有任何返回值但它更改了对象自身。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nueALRoxAAPHhRVSTHQ521.png" alt=""></p><p>我们打印列表，你会发现 sort 对列表内的数据进行了排序。</p><p>上面我们讲了列表的基本操作，在 Python 中列表还支持更复杂的操作，比如 append 追加数据、pop 弹出相关数据等，我们接下来具体讲解列表的堆栈和队列用法。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuiAeYHgAAQNDXxn6bM087.png" alt=""></p><p>我们仍以 number_list 为例，现在我们在栈顶压入一个数据 9，输入 number_list.append(9)，然后打印 number_list，你会发现我们在列表中插入了 9。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuiANJDlAAPfP7LLGlg988.png" alt=""></p><p>然后我们输入 number_list.pop，pop 会遵循先进后出的原则将某一个数据从栈顶弹出，并将弹出的值赋值给 pop 方法的返回值，这时候再打印 number_list，你会发现原有堆栈压入的 9 已经找不到了，而是赋值给了 pop 的返回值。数据的压栈出栈也是数据结构面试的必考题，希望你能够牢牢掌握。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuiAASYAAAPPN7RjI_M500.png" alt=""></p><p>列表除了可以作为堆栈使用，还可以作为队列使用，与刚才先进后出相反，队列支持先进先出。我们输入 number_list.pop 发现 IDE 并没有联想出 popleft 方法，这是为什么呢？</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuiAbtakAAPgzL9sh-A431.png" alt=""></p><p>为了解决这个问题，我们就需要借助一个叫作 deque 的特殊数据结构，我们向 deque 中传入一个 number_list，这时才会生成一个队列，这个队列我们称之为 number_queue，接下来我们具体看看它可以实现什么功能。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuiAbtakAAPgzL9sh-A431.png" alt=""></p><p>首先，我们向队列中添加 m 和 n 两个数据，这里需要注意 Python 的列表是可以追加不同的数据类型的。接下来打印 number_queue。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34numAfzbZAAPomZ-4p_8858.png" alt=""></p><p>现在我们就可以使用 number_queue.popleft 来弹出数据 2 了。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34numAJUbGAAPTtm22bR8055.png" alt=""></p><p>列表还支持 x for x in range 语句循环创建数据，比如我们创建一个 0~9 的数据，就可以通过输入 number_list=[x for x in rang(10)] 来创建。我们还可以对 x 变量进行各种加减乘除运算，课后你可以自己多加练习。</p><h2 id="集合-sets" tabindex="-1">集合 Sets <a class="header-anchor" href="#集合-sets" aria-label="Permalink to &quot;集合 Sets&quot;">​</a></h2><p>除了上面讲过的数字、字符串、列表这些基础的数据结构之外，Python还支持集合、元组和词典，我们接下来先学习集合的知识。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34numAUjtBAAQHo3UWZ1M457.png" alt=""></p><p>我们也可以简单的将集合理解为列表，但它与列表最大的区别在于集合是无序的，它只关注数据本身是否在集合中但并不关注数据的顺序。举个例子，我们创建一个命名为 number_set 的集合，然后令它等于 set() 就可以了，这时表示集合为空。</p><p>然后通过 number_set.add 语句往集合中添加 m 和 abc 两条数据，执行并打印集合，你可以发现 set 中有 m 和 abc 两条数据。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34numABqAmAAPulFg-h9U222.png" alt=""></p><p>这时，我们再往集合中添加一个 abc，打印结果却发现仍然只有一个 abc，这是因为集合是无序的并且会合并重复的数据。集合是一个特殊的队列，列表有顺序可修改，而集合虽然也可以修改但是是无序的。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuqAWf0jAAOtNak82gA414.png" alt=""></p><p>集合还有另外一种创建方法是使用 {}，我们现在往集合中添加 a、b、c，输入 number_set={&quot;a&quot;,&quot;b&quot;,&quot;c&quot;}，然后打印 number_set，你会发现它是逆序输出的，因为集合本身是无序的。</p><h2 id="元组-tuples" tabindex="-1">元组 Tuples <img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuqAI021AAQpiDc1o3k738.png" alt=""> <a class="header-anchor" href="#元组-tuples" aria-label="Permalink to &quot;元组 Tuples
![](https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuqAI021AAQpiDc1o3k738.png)&quot;">​</a></h2><p>接下来我们看元组，元组与集合、列表的不同之处在于元组是不可修改的，它表示一个有序的数据集合，因为它不可修改的特性通常被用于传参和数据存储，现在我们创建一个命名为 element_tuple 的元组，并为它传入两条数据，第一条数据是数字 2，第二条数据是字母 a，输入 element_tuple=2,&quot;a&quot;，然后打印结果，你会发现元组和列表、集合表示形式略有不同，列表用 [] 表示，集合用 {} 表示，元组用 () 表示。<br><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuqAGg5-AAUpQ2jgCzs693.png" alt=""></p><p>我们可以输入 element_tuple.，你可以发现元组支持的方法非常简单，主要是因为它不支持修改。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuqAIz9lAAQBiMFKgVo452.png" alt=""></p><p>我们打印 element_tuple[1]，你会发现结果打印了 a，所以元组会创建一个集合，元组把相关的数据按照一个约定的顺序放到一起，但它本身不可修改。</p><h2 id="词典-dictionaries" tabindex="-1">词典 Dictionaries <img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuqAHeUpAAQlTUSx7WE674.png" alt=""> <a class="header-anchor" href="#词典-dictionaries" aria-label="Permalink to &quot;词典 Dictionaries ![](https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuqAHeUpAAQlTUSx7WE674.png)&quot;">​</a></h2><p>我们最后看下词典，词典在测试领域应用的非常多，我们创建一个命名为 element_dict 的词典，词典定义时使用 {}，它允许你根据内容做一个 key-valve，比如 &quot;a&quot;:1、&quot;b&quot;:bcd，打印结果你可以看到它也是一个序列，只是序列中的元素变成了 key-valve 形式，我们也可以通过 element_dict[&quot;mn&quot;]=mmmmmm 语句往词典中追加内容。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuuAKsxFAAUj313XIgg221.png" alt=""></p><p>输入element_dict.，你可以看到词典支持的方法也很多，包括 pop 弹出一个指定的数据，get 获取一个数据内容等方法。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuuAdiqoAAQd39-chsY065.png" alt=""></p><p>比如输入 element_dict.get(&quot;a&quot;) 和 element_dict[&quot;a&quot;]，你会发现这两种获取数据的方法的结果是一样的。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/Cgq2xl34nuuAT13KAARxWciL23M131.png" alt=""></p><p>又比如打印 element_dict.items() 和 element_dict.keys()、element_dict.values()，我们可以看到 items 返回了 key-valve 形式对应的一个个元素，有了元素之后我们还可以遍历 key 和 valve。</p><p><img src="https://s0.lgstatic.com/i/image3/M01/58/99/CgpOIF34nuuAcmp8AAOm_pxdays664.png" alt=""></p><p>最后我们学习如何遍历一个词典，遍历词典时我们使用 for k,v in element_dict.items():</p><p>控制语句，然后便可以分别打印 k 和 v，关于数据结构的使用方法我希望你课后可以勤加练习，熟能生巧。</p>`,99),g=[e];function l(m,n,c,o,r,u){return p(),i("div",null,g)}const q=t(a,[["render",l]]);export{h as __pageData,q as default};

import{_ as a,j as i,o as p,g as o,k as e,h as l,s as t,Q as n}from"./chunks/framework.b3d8e22e.js";const Bt=JSON.parse('{"title":"unittest ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(327) 第11讲：Python 测试框架.md","filePath":"posts/devops/110-测试开发核心技术文档/(327) 第11讲：Python 测试框架.md","lastUpdated":1696417798000}'),c={name:"posts/devops/110-测试开发核心技术文档/(327) 第11讲：Python 测试框架.md"},_=n('<p>本课时我们主要学习 Python 的测试框架，并带你做一些相关的练习。</p><h2 id="unittest" tabindex="-1">unittest <a class="header-anchor" href="#unittest" aria-label="Permalink to &quot;unittest&quot;">​</a></h2><p>首先，我们来看下 Python 中标准的测试库 unittest，unittest 是 Python 自带的一个单元测试框架，unittest 中包含了对一些常规的测试用例体系性的支持，主要包括：</p><ul><li><p>test fixture</p></li><li><p>test case</p></li><li><p>test suite</p></li><li><p>test runner</p></li></ul><p>我们接下来通过一个案例来具体看下如何使用 unittest。</p>',5),u=t("p",null,"我们直接创建了一个类型为 unit test 的 test demo 测试文件，创建完成之后你可以看到它已经自动引用了所有的依赖和标准库，引用之后还自动创建了一个简单的测试用例帮你进行检索，我们简单演示下，假设当前 def 一个 sum_number 函数，在函数中计算 a + b 的值，最后返回结果值，接下来我们看看如何对这个函数进行测试。",-1),r=t("p",null,"我们在代码中创建一个新的测试用例，然后以 test 开头指明测试的方法为 sum，sum 中我们测试一个整数的加法计算，比如计算 sum(1,2)，我们可以断言它的结果应该等于 3，所以在这里使用 self.assertEqual()，equla 会将计算的结果值与我们断言的结果值进行对比，也就是判断结果值是否等于 3。",-1),g=t("p",null,"这便是一个标准的单元测试用例，你可以看到这里有三角箭头，一旦这样编写代码系统自动会识别出这是一个单元测试，点击类级别的三角箭头便可运行代码，你可以在屏幕左下角看到测试用例的全部路径，我们以 test_sum_init 为例，可以看到计算的结果正确。",-1),A=t("p",null,"然后再来看浮点型的计算，你会发现系统会报错，因为在计算时系统会先将浮点型转换成二进制然后再计算，在转换的过程中因为系统计算位的原因就可能会出现误差。所以我们在这里简单的使用 assertEqual 计算浮点型加法计算就会出现错误，它并不严格等于 3.3，通过这个简单的案例你就掌握了测试用例应该如何编写，可以发现 Python 中的 unittest 完成了对所有测试用例的支持。",-1),m=t("p",null,"再次执行发现没有问题，然后我们可以点开它们之间的层级关系，发现 setupClass 和 tearDownClass 全局只执行一次，setup 和 tearDown 分别执行了两次。通过这些方法我们在测试用例的关键阶段加入一些固定流程，方便让测试用例能够完成初始化和函数回调等相关操作。",-1),h=n('<p>我们最后看下断言，断言中有非常多的功能，包括各种判断，课后你可以自己练习相关的操作。</p><h2 id="pytest" tabindex="-1">pytest <a class="header-anchor" href="#pytest" aria-label="Permalink to &quot;pytest&quot;">​</a></h2><p>其实，在我们日常做集成测试时已经很少使用直接调用方法的方式了，现在有更强大的第三方测试框架 pytest。pytest 框架可以帮助我们更轻松地完成对测试用例的定义，也包括对测试用例的相关调用。</p><br><p>pytest 与 unittest 最大的差别在于测试用例的定义方式更灵活，同时它也支持 unittest，你的 unittest 测试用例可以无缝应用在 pytest 下，同时它自身还有着非常灵活强大的 fixture 机制，可以在执行测试用例时动态完成初始化，根据不同的需求加载不同的 fixture，另外它的 assert 也要比 unittest 的强大很多。</p><br><p>接下来我们看下如何使用 pytest 框架，使用 pytest 时首先需要定义测试用例，pytest 中定义测试用例主要有三种方式。</p><ul><li><p>首先，它兼容 unittest，已有的 unittest 库和文件都可以直接进行调用；</p></li><li><p>其次，它可以基于最简单的类进行定义，如果一个类里面没有初始化方法，并且以 Test 开头，系统便会认为这是一个测试用例；</p></li><li><p>最后，你可以直接定义测试函数来定义测试用例。</p></li></ul>',8),d=t("p",null,"因为 pytest 是一个第三方库，使用前首先需要安装它，课后你可以按照前面课时讲解的方案进行安装，安装完成之后我们首先创建一个 Python file 类型的 test_pytest 文件。",-1),C=t("p",null,"我们可以打开官方文档，文档里面定义的东西非常简单，def 了一个简单的函数，然后对函数进行相关的测试，我们把代码复制到我们定义的文件中。",-1),y=t("p",null,"这时发现没有可执行的三角形按钮，为什么呢，是因为我们还缺少一项设置。",-1),B=t("p",null,"我们打开系统设置页面搜 pytest，你会搜到一个 Python 的集成工具，这里默认使用的是 unittest ，你需要改成 pytest，这里需要注意千万不能遗漏，遗漏这项设置我们就无法正常使用 pytest。设置完成之后你就可以发现三角箭头，点击运行测试用例，此时系统会报错，这是为什么呢？因为结果值和断言值不一样。",-1),I=t("p",null,"我们再回到 unittest 中编写的 case，经过上面的设置后，点击运行按钮，你会发现原来的 run unittest 现在变成了 run pytest，运行结果中浮点型相加仍旧错误，我们看下打印的错误信息，会发现里面包含了所有的堆栈信息，你会发现 pytest 完全兼容 unittest。",-1),x=t("br",null,null,-1),J=t("p",null,"了解了 pytest 的基础功能后，我们接下来具体看下它都有什么功能，首先基于函数的方式定义一个测试用例，正如前面所说的，只需要函数以 test 命名开头且文件名也是 test 命名开头，系统就会默认为这是一个测试用例。",-1),M=t("br",null,null,-1),T=t("p",null,"但是平时工作中这样是远远不够的，我们很多测试用例还需要有一个分组和分类，比如说需要有一套标准的能够容纳 case 的体系，这时我们就可以使用 class，class 可以让我们把多个测试用例融合在一起，这里有一个默认法则，以 test 开头的类默认都是包含测试用例的类。",-1),q=t("p",null,"比如 TestFunc，我们重写这个测试用例，这时默认是不需要继承任何类的，我们可以在里面定义一个 test_answer，这个方法里也完成同样的一个断言，assert func(3) == 5，然后我们执行整个文件。",-1),f=t("br",null,null,-1),O=t("p",null,"第一个测试用例是一个方法，它独立于类定义之外，它会被作为一个独立的测试用例，然后下面的 TestFunc 方法从属于某个类，所以从这个例子中可以看出 pytest 是非常灵活的，它即支持函数级别的测试用例，也支持类级别的测试用例，同时也兼容了 unittest。",-1),b=t("br",null,null,-1),F=t("p",null,"我们看测试用例的识别规则其实是这样的。首先是文件名，它是以 test 开头或是以 test 结尾的文件，IDE 会从当前目录下或指定的目录下寻找这些文件，如果符合命名规则就会再往下一级路径查找测试用例的定义。",-1),P=t("br",null,null,-1),S=t("p",null,"其次是测试用例的规则，以 Test 开头的类中所包含的所有以 test 开头的方法，还有就是不在类中的所有以 test 命名开头的函数，还有就是类中不包含初始化方法时，且类是以 Test 开头命名的，如果你在类中定义了 init 初始化方法就会导致测试用例识别失败。",-1),k=t("br",null,null,-1),E=t("p",null,"然后 pytest 与 unittest 一样也定义了一些用例执行顺序的控制方法，分别是 setup 系列方法与 teardown 系列方法，但是方法大小写是不太一样的，我们来具体看下。",-1),V=t("p",null,"首先我们追加一个 setup_class 和 setup 方法并打印它们，这里需要注意添加 setup_class 方法之前也需要添加 @classmethod，然后我们添加两个测试用例并打印所有测试用例的名字，最后点击运行，可以看到首先执行了 test_pytest 文件，然后依次是 TestFunc类，test_answer1，依次类推，和 unittest 中一样，每次测试用例执行之前都会执行一次 setup，课后你可以自己添加 teardown 方法加以练习。",-1),w=t("p",null,"除此之外还有一个 setup_module 方法，setup_module 方法希望在整个类执行的时候也能够得到执行，我们添加 setup_module 方法并打印，你可以发现 setup_module 运行之后才开始执行测试用例，如果你想更精准地控制每个测试用例的执行顺序，可以使用 pytest_order 库，这个库允许我们添加一个 order 方法对测试用例完成一个顺序的编排，具体使用你可以查看 GitHub 中的仓库，这里不再具体介绍。",-1),Y=t("br",null,null,-1),D=t("p",null,"然后 pytest 还支持分组，比如说我们在运行中可以使用 pytest.mark 为不同的测试用例标记不同的名字，一旦标记了不同的名字之后在运行时我们就可以通过 and 或 not 关系来设置测试用例的执行关系。",-1),Q=t("br",null,null,-1),U=t("p",null,"这里演示如何使用 mark 进行标记，以 answer1 为例，首先它需要引入 @pytest.mark，我们给它命名为 fail，也就是整个测试用例是错误的。",-1),v=t("p",null,"注意这里系统提示有报错，你只需按照提示进行导入就可以了，导入后会在文件头加入一个import pytest，然后在 answer2 方法前加入 @pytest.mark.success，最后在后面添加一个不含 mark 的测试用例 answer3。",-1),Z=t("p",null,"点击运行，你可以发现有 3 个测试用例，现在我想执行其中一部分测试用例，点击 Terminal，pytest 会给我们提供了一个功能，通过 pytest -m 可以指明你的分组，比如我们只执行 success 测试用例，可以发现没有问题，然后我们单独运行 fail，case 也报错，也就是说通过 mark 就可以完成测试用例的分组，有了分组后将来再跑测试用例就可以按照类型来划分了。",-1),N=t("br",null,null,-1),H=t("p",null,"pytest 还有一个功能是参数化，参数化也是一个很有趣的特性，它使用的是pytest.mark.parametrize，可以给 parametrize 传入一个列表，这个列表里中定义了一个数据，每个列表中是一个集合，这个集合会被拆分给函数，我们结合演示在语法上可以看得更清楚一点，首先进行参数化，第一个参数是参数的名字，第二个参数是一个数组，也就是你需要传多个 case 的数据，每个数据之间需要用元祖切分。",-1),K=t("p",null,"我们对刚才成功的 case 做一个改造，要进行参数化首先需要添加 @pytest.mark.parametrize，parametrize 中可以传入我们的参数，在这里我们定义两个参数，一个是输入值，一个是结果值，分别取名为 input 和 expect，接着后面是一个列表，列表中传入 5 和 6，7 和 8，0 和 1，2 和 2，在测试用例中也需要传入 input 和 expect 这两个参数。",-1),R=t("p",null,"经过上述改造我们单独运行这个 case，你会发现列表中的前三组运行结果都是对的，但最后一组运行错误，这里自动生成了 4 个 case。",-1),j=t("p",null,"然后我们再运行整个文件，你可以发现类和 case 之间存在层级关系，这个我们通常称为参数化用例，可以允许传参，不断更改传参的值，把一个 case 变成多个 case，数据变更整体流程不变，这个功能是非常强大的。",-1),L=t("h2",{id:"报告生成",tabindex:"-1"},[l("报告生成 "),t("a",{class:"header-anchor",href:"#报告生成","aria-label":'Permalink to "报告生成"'},"​")],-1),X=t("p",null,"最后就是生成报告，首先 pytest 支持 JUnit 风格的报告，你可以添加 pytest--junitxml 的参数，这里具体演示一下。",-1),z=t("p",null,"在 Terminal 中输入 pytest--junitxml=junit.xml，然后给定一个文件名 test_pytest.py，最后会生成了一个 junit.xml 文件，这个 xml 文件详细记录了测试用例运行成功或失败的记录。",-1),G=t("br",null,null,-1),W=t("p",null,"如果想要生成 HTML 可视化的报告，有两个插件可以实现，一个叫作 pytest-html，首先需要安装一个 pytest-html 插件，然后输入 pytest--html 就可以生成一个 HTML 报告，这里简单演示下。",-1),$=t("p",null,"首先需要点击项目设置添加 pytest--html 插件，安装完之后就可以运行了。",-1),tt=t("p",null,"运行时只需要在刚才设置的参数的基础上再添加一个 html 参数就可以了，这个时候你就可以看到生成了一个 .html 文件。",-1),st=t("p",null,"这个文件是可以使用浏览器打开的。这个时候会生成一个比刚才漂亮多的 html 格式的报告，里面会告诉你每个 case 是成功了还是失败了，以及当时的错误堆栈是什么。",-1),et=t("br",null,null,-1),lt=t("p",null,"除此之外生成可视化的 HTML 报告还可以使用 allure2，它允许我们生成一个更漂亮更完整的测试报告，我们看下 allure2 的报告。",-1),nt=t("p",null,"allure2 具备更强的功能，它可以分析数据，绘制曲线图。现在很多公司都在使用 allure2 测试框架生成报告，接下来我们就来看下如何使用 allure2。",-1),at=t("br",null,null,-1),it=t("p",null,"其实它的用法也非常简单，我们可以查看 allure2 的官方文档并安装插件。",-1),pt=t("p",null,"回到代码中，点击进入 Terminal，输入 allure serve，然后后面跟项目的路径 allure_results。",-1),ot=t("p",null,"最后运行就会自动生成一个测试报告，报告中显示当前有 7 个 case，以及失败率成功率各是多少等信息。",-1),ct=t("p",null,"你可以依次点击左侧的标题栏，第二项显示 bug 的分类，它会显示 bug 大概属于哪几种分类，如果两个 bug 是一样的，它会进行相同的归类。",-1),_t=t("p",null,"suites 中显示每个测试用例下面的层级关系。",-1),ut=t("p",null,"graphs 中显示 case 成功与失败的概率等信息。依次类推，课后你可以查看每一项内容的具体信息。allure2 生成的报告是非常优美数据全面的，所以我推荐使用 allure2 框架来生产测试报告。",-1);function rt(gt,At,mt,ht,dt,Ct){const s=i("Image");return p(),o("div",null,[_,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JWAXmg4AAP0IBIZ5xU885.png"}),u,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C7/CgpOIF4B3JWAKZ67AAOpL_voQpc640.png"}),r,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JaAG_bcAAQE4x7v_-U964.png"}),l("然后我们再输入两条判断，一条判断 100 加 200 是否等于 300，另一条判断 1.1 加 2.2 是否等于 3.3，与前面两条判断不同的是第三条判断计算的是浮点型数值。"),e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JaAVE-HAAV-iIVYB_0992.png"}),g,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JaAQgBtAAVfzc91RTE802.png"}),A,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JaAFWqQAAXEXHYAecs047.png"}),t("p",null,[l("我们继续完善上面的测试用例，在测试类中输入 setupClass 方法，setupClass 方法可以保证测试用例执行之前会默认执行一次，setupClass 方法中我们简单打印方法本身。我们再定义一个 setup 方法并打印方法本身，setup 方法在每个测试用例执行前都会执行一次。与 setup 相对应的还有一个 tearDown 方法，tearDown 方法表示每个测试用例执行结束后执行一次，最后定义tearDownClass 方法，tearDownClass 方法在所有测试用例执行完后执行一次，然后我们再去执行测试用例会发现系统报错。"),e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JeAOh6ZAAYE2Y6L-Y0966.png"}),l("这是因为 setupClass 是在类级别执行的，所以要求在方法前必须添加 @classmethod，同理下面的 tearDownClass 方法前也需要添加 @classmethod，表示这个方法是类方法。")]),e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JeAE4k0AAQwHIp3OOI810.png"}),l(),m,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JeAROUCAAZoFfGIKZA455.png"}),h,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JeAO7rsAAUVx-YyZ74749.png"}),d,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JeAA-4tAAXMKeqFZ0g723.png"}),C,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JiAagy0AAMvxFO_0ew136.png"}),y,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JiAKe8AAAOOyijg94I776.png"}),B,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JiAEQmSAAVA1XSIkZ4766.png"}),I,x,J,M,T,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JiAWRmfAAQJFbqLUvo194.png"}),q,f,O,b,F,P,S,k,E,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JmAZIDUAAT57RfV7oI061.png"}),V,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JmAS-_vAAT_dZ1fu-4671.png"}),w,Y,D,Q,U,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JmAa2fGAAUSa7benVI924.png"}),v,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JmAf1B2AAYg8daUjG0180.png"}),Z,N,H,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JqASIVGAAY3grETzDU415.png"}),K,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JqAAFYJAATJoYglBqo297.png"}),R,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JqAHKDmAASOZIO2pYI002.png"}),j,L,X,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JqAfFRoAAf9ttdsQuQ503.png"}),z,G,W,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JqAQTRuAATlyqenZfE320.png"}),$,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JyAE_8SAAd3Xbo-inY543.png"}),tt,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JyABPdPAANy8OPPU7A692.png"}),st,et,lt,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JyADKSiAAHUe39NO7A549.png"}),nt,at,it,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JyAQTlrAAYSAr34W6E170.png"}),pt,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3JyAFXYsAAKcYAPQ_k0382.png"}),ot,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3JyATFl4AAIgVSpo_5s704.png"}),ct,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/Cgq2xl4B3J2ACkfYAAOy_0gc_SE985.png"}),_t,e(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5A/C8/CgpOIF4B3J2ABgrLAAKKyPRQ9Nw344.png"}),ut])}const It=a(c,[["render",rt]]);export{Bt as __pageData,It as default};

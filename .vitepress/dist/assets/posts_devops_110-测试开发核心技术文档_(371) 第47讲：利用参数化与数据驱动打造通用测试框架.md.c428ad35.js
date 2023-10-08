import{_ as l,j as n,o,g as p,k as i,h as e,Q as a,s as t}from"./chunks/framework.a0d18f64.js";const K=JSON.parse('{"title":"第47讲：利用参数化与数据驱动打造通用测试框架","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(371) 第47讲：利用参数化与数据驱动打造通用测试框架.md","filePath":"posts/devops/110-测试开发核心技术文档/(371) 第47讲：利用参数化与数据驱动打造通用测试框架.md","lastUpdated":1696682708000}'),_={name:"posts/devops/110-测试开发核心技术文档/(371) 第47讲：利用参数化与数据驱动打造通用测试框架.md"},c=a('<h1 id="第47讲-利用参数化与数据驱动打造通用测试框架" tabindex="-1">第47讲：利用参数化与数据驱动打造通用测试框架 <a class="header-anchor" href="#第47讲-利用参数化与数据驱动打造通用测试框架" aria-label="Permalink to &quot;第47讲：利用参数化与数据驱动打造通用测试框架&quot;">​</a></h1><p>本课时我们开始进入打造通用测试框架的学习，我们先来看下测试框架常用的核心要素。</p><h3 id="测试框架的核心要素" tabindex="-1">测试框架的核心要素 <a class="header-anchor" href="#测试框架的核心要素" aria-label="Permalink to &quot;测试框架的核心要素&quot;">​</a></h3><p>关于测试框架，行业里最早有一个叫作 xUnit 的概念，指我们常用的单元测试框架的泛称，包括后面的很多框架，都借鉴了 xUnit，那 xUnit 中包含了哪些内容呢？</p><ul><li>Test Runner：执行器；</li><li>Test Case：测试用例；</li><li>Test Fixtures：测试的装置；</li><li>Test Suites：用例的组合关系比如套件；</li><li>Test Execution：测试执行方式</li><li>Test Result Formatter：测试结果</li><li>Assertions：断言</li></ul><h3 id="xunit-框架体系" tabindex="-1">XUnit 框架体系 <a class="header-anchor" href="#xunit-框架体系" aria-label="Permalink to &quot;XUnit 框架体系&quot;">​</a></h3><p>xUnit 框架体系比较悠久，其实在 Python 和 Java 中经典的流行测试框架都借鉴自 xUnit，也就是 Java 里的 JUnit4、TestNG、JUnit5 和 Python 里的 UnitTest、PyTest 都是基于 xUnit 测试框架理念构建的，只有了解了测试框架的核心概念之后，我们才能知道后面怎么用参数化和数据驱动去打造自己的测试框架。</p><h3 id="测试框架的用途" tabindex="-1">测试框架的用途 <a class="header-anchor" href="#测试框架的用途" aria-label="Permalink to &quot;测试框架的用途&quot;">​</a></h3><p>单元测试框架虽然最早设计时也叫作 xUnit，但其实它已经不再局限于单元测试的范畴，单元测试可以使用 xUnit 框架、集成测试、验收测试也都可以使用类似框架，因为它们都具备相似的功能，都具备测试用例的描述、执行、调度及结果与断言功能。</p><p>唯一区别就是在测试步骤里，不同的框架所调用的方法是不一样的，比如 Web 自动化只需要在单元测试框架里调用 Selenium；如果是 App 自动化测试，就需要利用单元测试框架调用 Appium；接口测试框架需要调用 Requests。</p><p>所以，本质上起的名字虽然是单元测试，其实它是泛指所有的测试框架，都是有类似的体系可以进行管理的。所谓的单元测试框架就是可以用在所有领域的测试，所以后面我们通常都称之为测试框架，测试框架核心的职责就是承载特定领域的测试用例管理。</p><h3 id="参数化与数据驱动" tabindex="-1">参数化与数据驱动 <a class="header-anchor" href="#参数化与数据驱动" aria-label="Permalink to &quot;参数化与数据驱动&quot;">​</a></h3><p>那么，参数化与数据驱动又是什么概念呢？</p><h4 id="参数化" tabindex="-1">参数化 <a class="header-anchor" href="#参数化" aria-label="Permalink to &quot;参数化&quot;">​</a></h4><p>首先，我们看下什么是参数化，参数化是将用例的关键数据变成参数以实现批量的用例表达，这个词本身就带有数据驱动意思，但它并没有定义数据驱动应该怎样完成。在 PyTest 测试体系中，你可以看到，之前我们写的代码中已经涉及参数化的概念，接下来我们具体看一个参数化实例。</p>',15),r=t("p",null,"你可以看到这里有一套测试用例，这个测试用例参数化的功能是指把代码中的变量参数化，比如代码中的 name 和 code 两个参数。",-1),h=t("p",null,"有了参数化，我们就可以使用各种办法对数据进行供应，供应的数据可以来自 Python 里的装饰器，也可以来自某一个全局变量，甚至来自更多地方。如果流程是固定的，我们可以把关键的数据进行参数化，来完成对用例的倍增以增加更多的数据，然后让整个用例能够运行起来，以整合相似流程，并用不同数据驱动的测试流程，这就是参数化的例子。",-1),d=t("h4",{id:"数据驱动",tabindex:"-1"},[e("数据驱动 "),t("a",{class:"header-anchor",href:"#数据驱动","aria-label":'Permalink to "数据驱动"'},"​")],-1),u=t("p",null,"然后，再来看下什么是数据驱动，数据驱动跟参数化的概念非常接近，数据驱动测试是指如果实现参数化，那么参数化又可以实现外部数据的供应，我们就可以对外部数据进行管理，通过使用外部数据，便可以脱离整个框架的外部数据源来驱动已有的测试，这便是数据驱动测试的概念。",-1),g=t("p",null,"数据驱动测试的核心概念跟参数化有一定的对应关系，数据驱动既可以跟参数进行结合，可以实现测试数据的数据驱动，我们也可以完成对测试步骤的数据驱动。",-1),A=t("p",null,"让我们回到示例，可以看到，核心的测试数据已经参数化了，我们就可以通过这三种办法来批量供应数据，让测试用例实现倍增，同时可以满足不同的测试场景，这边是参数化的一个示例。",-1),m=t("p",null,"而数据驱动呢？我们可以把数据脱离代码，能够从外部数据源直接进行供应，这个供应同样也需要驱动，它需要你首先完成参数化。",-1),x=t("p",null,"当然还有一种情况不需要提前进行参数化，比如我们之前讲自动化测试的时候，配置 Object 思想，那么在 PV 中我们需要指明输入的操作时点击还是滑动，还需要指定特定的值，对于测试步骤的数据驱动，它是不需要与参数化进行结合的，你只需要在核心的测试步骤里找到对应的驱动就可以了，这便是数据驱动的另外一个场景。",-1),P=t("p",null,"总结一下，数据驱动本质上是可以利用参数化的功能来完成测试数据的数据驱动、测试步骤的数据驱动，还有全局配置的数据驱动。我们在测试中可能会遇到各种各样的全局配置，这些配置比如机器的 IP 地址跟域名的对应关系，可以放到一个配置文件里，通过外部数据源来进行驱动。",-1),D=t("p",null,"这就是数据驱动测试的几个常见的场景，测试数据的数据驱动、测试步骤的数据驱动以及全局配置的数据驱动，都与参数化有一定的关系。",-1),M=t("p",null,"那我们再来看下数据驱动的底层原理，首先是数据来源，来自 CSV、YAML、XML、DB、Excel、JSON 等各种数据结构，而数据本身需要脱离这个已有的测试框架，成为独立的外部数据源，当然你也可以使用 URL、文档配置。",-1),T=t("p",null,"那么在数据驱动过程中，一旦有了外部数据源，我们就需要管理数据，主要要两个办法，第一种，可以从数据源里读一个列表，用这个列表驱动测试用例的执行；还有一种办法是基于 Schema，基于定义好的模型使用 List 管理。",-1),b=t("p",null,"最后，通过参数化与数据完成关键数据的对接，比如从文件里读取的数据结构，结构里每一个字段与参数化的字段进行一一对应，这样就可以是吸纳数据驱动和参数化的结合。",-1),C=t("h3",{id:"数据格式的选择",tabindex:"-1"},[e("数据格式的选择 "),t("a",{class:"header-anchor",href:"#数据格式的选择","aria-label":'Permalink to "数据格式的选择"'},"​")],-1),E=t("p",null,"我们了解了数据驱动的原理，再来看下数据格式的选择，刚才我们提到了有非常多的数据格式的选择，那么这些数据格式之间有什么优缺点呢？如表格所示：",-1),q=t("p",null,"我们了解了数据驱动的原理，让我们来看一下数据格式的选择。刚才我们提到了有非常多的数据格式的选择，那么这些数据格式之间有什么优缺点呢？我画了一张表格。",-1),V=a('<p>通过对比可以发现，Excel 生成数据方便，简单操作就可以生成很多数据，也可以支持各种公式，它生产数据非常方便，但二进制的文件不利于版本化管理，所以我们通常使用 Excel 编辑，但把生产的数据以文本化的格式存储到 Git 里进行版本化管理。</p><p>所以就有了第二种选择------CSV，它可以用 Excel 进行编辑，也可以独立使用 Excel 保存，保存后把 Excel 数据导出为 CSV。CSV 是一种文本格式，它可以完成版本管理，但却有一个缺点，就是本身是一个二维的行列格式，这种行列格式表达复杂结构，比如接口输入可能是一个树形结构，而树形结构里有 Excel 以二维结构表示，就有一定的困难，会比较复杂。</p><p>还有一种选择是 XML，通常我们的接口包括各种常用的数据，都是一种树形结构，树形结构自然需要使用 XML。其实早期很多公司在设计数据驱动的时候使用的就是 XML，XML 可以表达任意结构，它的格式比较完备，对于列表、数据结构及原始类都有完备的支持。但缺点就是冗长复杂，必须借助已有的 IT 工具，而手动编辑也会增加风险。</p><p>接下来是 JSON，JSON 是一种前端跟后端经常使用的一种通信的数据格式，这个格式比较完备，所有的数据格式都可以支持，比如常见的列表、对象，都可以表达出来，可读性也高。但缺点就是不支持编写注释、格式死板。</p><p>而更好的格式是 YAML，YAML 格式是对 JSON 及 XML 格式的简化，结合了两种模式的优点，格式比较完备，常见的类型都可以表达出来，可读性也好，对格式要求宽松。所以在所有格式里我推荐你使用 YAML，YAML 也已经成为整个行业里很多开发框架主流使用的配置文件格式。</p><p>当然，无论哪种框架，只要你能规范化解析，它都可以批量转成通用的数据模型，所以我们在设计一个类时，应该让这个类从外部数据文件里，主要是 XML、JSON 和 YAML，进行序列化和反序列化。所以你在设计数据框架时应该让外部数据支持多种格式，不一定局限于某一个格式。</p><h3 id="数据驱动在测试中的应用" tabindex="-1">数据驱动在测试中的应用 <a class="header-anchor" href="#数据驱动在测试中的应用" aria-label="Permalink to &quot;数据驱动在测试中的应用&quot;">​</a></h3><p>那数据驱动在测试中到底应该怎样运用呢？我们来看一下。</p><p>首先，测试数据的数据驱动时需要先读取外部的数据源，然后结合用例的参数化，从而实现测试用例的倍增效果。这方面，Python 的一个叫作 DDT 的库已经很好地实现了该功能。</p><p>还有就是测试步骤的数据驱动，我们前面讲到的配置 PO 模式中，对接口、UI 都有一定程度的封装，封装成 PO 后，PO 本身是不需要倍增的，但它的描述其实是属于测试步骤的数据驱动，比如说它有多少种控件，主要控件有哪些等，也就是说在这方面我们可以把 PO 的关键的变化实现外部数据源驱动。</p><p>一旦有了测试数据和测试步骤数据驱动之后，我们就可以更好地设计框架了，在这方面行业里也有一些很成熟的框架。</p><ul><li>比如 ATDD，验收测试驱动开发，这方面的代表框架是 RobotFramework，是一个存在很多年的优秀的开源项目，体系也比较完善。</li><li>另外一个是 BDD 语言的框架，就是所谓的行为驱动开发，使用的是类自然语言描述用例，代表作是 Cucumber。</li><li>还有一种是领域 API，借助已有的编程语言，设计更易用的编程模型并提供 API，代表作是我们前面学过的 Requests。你可以看到它写得非常简单，可以发起各种各样的请求。</li><li>还有一种是使用配置驱动和数据驱动，这方面我们可以使用数据文件、配置甚至是文档，来驱动测试。代表作是在我们国内的 HttpRunner，做得非常不错，你可以去借鉴一下。</li><li>从这里可以看到，那还有一种叫配置的数据驱动，里面非常简单，对核心数据做配置的读取，我没有写在这里面。</li></ul><p>在这几个框架里面，ATDD 的风格因为使用的是 RobotFramework 框架，这个框架有自己完整的 IDE，也有自己完整的语法，但有点过度设计，所以通常我不建议你使用。通常骨干框架使用类自然语言，但是类自然语言的风格涉及测试步骤与自然语言之间的关系，所以它的维护有一定成本，所以也不建议你使用 Cucumber。这几个框架设计得都非常优秀，理念上有一些突破，但是在实际使用过程中会有较高成本，所以不建议你使用。</p><p>那么我建议你选择哪个方法呢？就是后面这两种，一个是领域 API，你先定义好一个 API，这个 API 如果已经够用了，那么就使用它。如果 API 仍然不满足需要，需要从数据源进行读取的时候，你可以进行指定封装，完成一个数据驱动的框架。有了数据驱动框架后，我们就可以构建测试的平台来去管理所有的测试用例。</p><p>关于这几个核心的概念，我用几个小案例给你看一下。</p>',15),L=t("p",null,"第一个是参数化的一个案例，这方面的代表是我们前面学习过的一个案例，你平时应该也有使用过，是一个简单的测试场景。",-1),f=t("p",null,"测试数据的数据驱动，我们可以使用 YAML 文件进行描述，YAML 支持非常精简的单行模式，也可以支持多行模式。下面的部分和上面的含义是一样的，都代表有三组数据，这三组数据里面，你可以把这些数据与参数化一一对应，就可以完成测试数据的数据驱动了。",-1),S=t("p",null,"测试步骤的数据驱动是什么格式呢？你可以看看这种格式，这个格式里定义了三个步骤，第一个步骤代表 ID 为 search_input_text 的控件，完成点击动作；第二个步骤是完成点击之后，需要对完成输入，如果其中有一部分步骤涉及变化的内容，可以通过一个变量来表示；第三个步骤是对 name 控件进行点击操作，这便是一个典型的测试步骤的数据驱动。",-1),U=t("p",null,"而如果你要从零开始打造的框架，你需要掌握这样几个技术：",-1),I=t("ul",null,[t("li",null,"模板替换。我们可以看到上面这里有一些数据，这些数据需要外面来进行参数化，进行变换，也就是你需要从已有的数据源里面进行替换，需要有一个模板替换。"),t("li",null,"变量引用。我们的变量，比如上个接口抓到的数据我希望用在下一个接口里，这个时候你需要变量在跨用例之间能够进行调用，所以就需要一个变量引用过程。"),t("li",null,"自定义扩展。有的时候，纯粹的驱动很难描述比较复杂的行为。对这些复杂的逻辑，我们可以自己编写对应的编程语言，实现好之后封装成一个简单的功能，供整个数据驱动框架来使用，这样就会简化描述相关事情。"),t("li",null,"最后，我们需要把所有的 xUnit 测试的核心概念来进行封装，比如用例怎么表达，套件怎么表达，执行、断言以及测试的装置。")],-1),w=t("p",null,"关于测试步骤的驱动，这有一个小的 Demo，你可以看一下。",-1),F=t("p",null,"这个小 Demo 里，其实是说它打开了一个文件，使用 YAML 格式读取文件所有内容。读完数据之后，可以看到里面有一个 List 列表，列表里有非常多的步骤，我们需要根据每一个步骤进行描述。",-1),J=t("p",null,"然后再看下行为，行为是操作一个控件，无论是获取控件的属性，还是对控件完成输入，这些都需要模板替换，所以需要一些简单的替换语句，完成对数据的动态化替换。",-1),R=t("p",null,"这是一个小 Demo，带你了解怎么编写一个数据驱动的小引擎，更完善的设计你可以参考 HttpRunner 框架，HttpRunner 是一个非常优雅的接口测试开源项目。这个醒目是一个面向 HTTP 协议的通用测试框架，你只需要维护一个 YAML/JSON 脚本，就可以完成自动化测试、性能测试等多种测试场景。",-1),k=t("p",null,'它的核心设计里面就是复用已有的开源项目，然后通过遵循"约定大于配置"的原则，整体通过配置决定大部分行为，然后就可以更高效的在公司内部应用。',-1),N=t("p",null,"这个项目的官方地址在 GitHub 上，你可以参考一下，了解它的核心源代码，这样你就可以知道怎么去打造一个基于参数化数据驱动的自定义测试框架了。",-1),j=t("p",null,"一旦有了数据驱动框架，我们就可以通过测试平台管理数据驱动的测试用例了。",-1);function O(H,X,Y,v,y,B){const s=n("Image");return o(),p("div",null,[c,i(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3E/CgqCHl7jVziAJ0lzAAFvDXMfeog843.png"}),e(),r,h,d,u,g,A,i(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3E/CgqCHl7jV0WAKJZ1AAFUx7nI9Ag775.png"}),e(),m,x,P,D,i(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/1E/33/Ciqc1F7jV02AZo7bAAerLeDubAQ918.png"}),e(),M,T,b,C,E,q,i(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3F/CgqCHl7jV6iAMncfAAFDDfQs3Ko255.png"}),e(),V,i(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3F/CgqCHl7jV7SAGf0LAAJhbwfXysc748.png"}),e(),L,i(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/1E/33/Ciqc1F7jV7yAA2JYAAGnZcBJabw762.png"}),e(),f,i(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/1E/33/Ciqc1F7jV8OARvE5AAIYjDo4V9M713.png"}),e(),S,U,I,i(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3F/CgqCHl7jV8uAH7oGAALxaCZoWPw602.png"}),e(),w,F,J,i(s,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/1E/33/Ciqc1F7jV9KARU3bAAMUErE02XQ383.png"}),e(),R,k,i(s,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/1E/3F/CgqCHl7jV9iAT6RwAAKTFgg1sec348.png"}),e(),N,j])}const Q=l(_,[["render",O]]);export{K as __pageData,Q as default};

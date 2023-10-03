import{_ as t,o as e,g as s,Q as p}from"./chunks/framework.f949202b.js";const d=JSON.parse('{"title":"Shell 输入输出 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(373) 第04讲：Linux 三剑客（下）.md","filePath":"posts/devops/110-测试开发核心技术文档/(373) 第04讲：Linux 三剑客（下）.md","lastUpdated":null}'),a={name:"posts/devops/110-测试开发核心技术文档/(373) 第04讲：Linux 三剑客（下）.md"},l=p(`<p>本课时主要讲解 Linux 三剑客的更高级用法，也就是如何使用管道将三剑客连接使用？</p><h2 id="shell-输入输出" tabindex="-1">Shell 输入输出 <a class="header-anchor" href="#shell-输入输出" aria-label="Permalink to &quot;Shell 输入输出&quot;">​</a></h2><p>如果你想掌握本课时的内容，首先需要了解 Shell 的输入输出，在 Shell 里，每个指令其实都是一个进程，和我们的被测程序一样，这个进程也有输入和输出。 比如，你可以使用 read 读取输入，并赋值给变量，也可以使用 echo、print 输出变量。而在 Shell 输入输出指令里面有一个特别需要我们注意的功能叫作管道，用 | 表示，它可以将上一个指令的输出自动变成下一个指令的输入。</p><h2 id="文件描述符" tabindex="-1">文件描述符 <a class="header-anchor" href="#文件描述符" aria-label="Permalink to &quot;文件描述符&quot;">​</a></h2><p>接下来，我们来看一下管道的具体用法。如图所示，Shell 下任何程序都有输入和输出，这里需要额外注意的是错误输出，比如我们输入 ls dddd 指令。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czBiAQrPTAAJmF953Il8386.png" alt=""></p><p>因为 dddd 文件是不存在的，所以会打印了一个独立显示的报错信息，我们就称之为错误输出。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czCaAPOigAAI94SOIP8Q284.png" alt=""></p><p>我们现在输入 ls -l /tmp appium.log 指令，可以打印一个正确的输出。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czDOAQH4QAAJeXeuP_OE959.png" alt="">而输入是一个读取文件的过程，比如我们输入 grep &quot;hogwarts&quot; /tmp/hello.txt 指令便是从 hello.txt 文件中读取 hogwarts。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czD-ABCoWAAHsxWlG56g657.png" alt=""></p><p>但如果我们不传递给指令一个文件，会发生什么样的效果？比如输入 grep &quot;hogwarts&quot; 指令，你会发现什么都没有显示，继续输入 xxx、dddd 仍没有任何反应，直到输入 hogwarts 时，系统才会输出 hogwarts，我们看到如果不传递输入文件，grep 会默认从当前输入读取内容。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czEmAZ0OHAAAu39KhXGc899.png" alt=""></p><p>我们来简单总结一下，输入文件就是标准输入 0，如果当没有输入文件时会获取当前输入窗口中的数据，读到数据后可以对数据进行一系列的操作，标准输出 1 就是一个输出文件，而如果错误输出文件就是标准错误 2。</p><h2 id="管道" tabindex="-1">管道 <img src="https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czFWAdLdxAAA6ljNKhhE539.png" alt=""> <a class="header-anchor" href="#管道" aria-label="Permalink to &quot;管道
![](https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czFWAdLdxAAA6ljNKhhE539.png)&quot;">​</a></h2><p>接下来，我们学习管道在整个输入输出过程中发挥的作用，以及管道的具体用法。在日常工作中，通常需要特殊的方法将多个程序串联起来，将程序 1 的输出 1 作为程序 2 的输入，在 Shell 中这个特殊的方法就是管道。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czGCAP4CYAAHPxkU23_Y997.png" alt=""></p><p>举个例子，比如我们输入 echo hello | gerp hogwarts 指令，打印一个 hello 传给 grep hogwarts，这个时候，你会发现没有任何输出，这是为什么呢？</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czG-APPCuAAHKJe8bVUg331.png" alt="">我们把指令分为两部分执行，第一部分执行 echo hello，这个指令没有任何输入但是有输出。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czHyAC5P7AAHcF8HELcU211.png" alt="">然后，将 echo hello 通过管道传递给 grep hogwarts，此时管道已经找到输入内容 echo hello，于是便不再从当前窗口读取数据，但因为读入的内容实际是没有输入的所以会得不到任何输出。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czJKAXcksAAHlS8hzS9g985.png" alt="">我们应该如何正确操作呢，输入 echo hello hogwarts | gerp hogwarts 指令，你会看到输出了正确的内容。因为上一个命令输入了 hello hogwarts，再经 grep 后输出。你可以看到通过管道我们可以让 Linux 三剑客的功能发挥到一个新的高度，有了管道很多的操作就变得非常简单易处理。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/23/CgoB5l3czKCAdhjzAAHmEnTiajE963.png" alt=""></p><p>再举个例子，首先通过 cat /tmp/hello.txt 指令打印 hello.txt 文件。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czKyAV6LNAAIYxUQ2cfk322.png" alt=""></p><p>然后通过管道打印包含 testerhome 的信息行。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czLaAMLMMAAJYe229DN0565.png" alt=""></p><p>如果此时我们只想得到 testerhome 这个单词怎么办呢？输入 cat /tmp/hello.txt | grep testerhome | awk &#39;{print $3}&#39; 指令就可以单独打印 testerhome 了，因为 hello from testerhome 是以空格隔开的，所以指令中的 $3 表示第三个元素。</p><p><img src="https://s0.lgstatic.com/i/image2/M01/AD/43/CgotOV3czMCAbfmlAAKapT3G6Ps078.png" alt=""></p><p>我们再继续使用管道将 testerhome 中的 tester 替换成 dev，输入 cat /tmp/hello.txt | grep testerhome | awk &#39;{print $3}&#39; | sed &#39;s#tester#dev#&#39; 指令，你可以看到 testerhome 就变成了devhome 了。</p><p>这就是使用管道的魅力，管道和三剑客结合使用可以实现非常好的执行效果，它可以帮助我们处理一些复杂的数据处理工作，提高我们的工作效率。</p>`,30),o=[l];function g(c,i,h,r,m,A){return e(),s("div",null,o)}const _=t(a,[["render",g]]);export{d as __pageData,_ as default};

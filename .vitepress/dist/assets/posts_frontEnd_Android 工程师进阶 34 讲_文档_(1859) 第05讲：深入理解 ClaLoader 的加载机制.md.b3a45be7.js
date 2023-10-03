import{_ as a,o as s,g as l,Q as e}from"./chunks/framework.f949202b.js";const m=JSON.parse('{"title":"Java 中的类何时被加载器加载","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1859) 第05讲：深入理解 ClaLoader 的加载机制.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1859) 第05讲：深入理解 ClaLoader 的加载机制.md","lastUpdated":null}'),t={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1859) 第05讲：深入理解 ClaLoader 的加载机制.md"},r=e('<p>本课时我们讲解类加载器 ClassLoader。</p><br><p>在第 3 课时我们介绍了 Java 字节码文件（.class）的格式。一个完整的 Java 程序是由多个 .class 文件组成的，在程序运行过程中，需要将这些 .class 文件加载到 JVM 中才可以使用。而负责加载这些 .class 文件的就是本课时要讲的类加载器（ClassLoader）。</p><h1 id="java-中的类何时被加载器加载" tabindex="-1">Java 中的类何时被加载器加载 <a class="header-anchor" href="#java-中的类何时被加载器加载" aria-label="Permalink to &quot;Java 中的类何时被加载器加载&quot;">​</a></h1><p>在 Java 程序启动的时候，并不会一次性加载程序中所有的 .class 文件，而是在程序的运行过程中，动态地加载相应的类到内存中。</p><br><p>通常情况下,Java 程序中的 .class 文件会在以下 2 种情况下被 ClassLoader 主动加载到内存中：</p><ol><li><p>调用类构造器</p></li><li><p>调用类中的静态（static）变量或者静态方法</p></li></ol><h1 id="java-中-classloader" tabindex="-1">Java 中 ClassLoader <a class="header-anchor" href="#java-中-classloader" aria-label="Permalink to &quot;Java 中 ClassLoader&quot;">​</a></h1><p>JVM 中自带 3 个类加载器：</p><ol><li><p>启动类加载器 BootstrapClassLoader</p></li><li><p>扩展类加载器 ExtClassLoader （JDK 1.9 之后，改名为 PlatformClassLoader）</p></li><li><p>系统加载器 APPClassLoader</p></li></ol><p>以上 3 者在 JVM 中有各自分工，但是又互相有依赖。</p><h3 id="appclassloader-系统类加载器" tabindex="-1">APPClassLoader 系统类加载器 <a class="header-anchor" href="#appclassloader-系统类加载器" aria-label="Permalink to &quot;APPClassLoader 系统类加载器&quot;">​</a></h3><p>部分源码如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCaAf-h3AAFnyY9SYn4768.png" alt=""></p><br><p>可以看出，AppClassLoader 主要加载系统属性&quot;java.class.path&quot;配置下类文件，也就是环境变量 CLASS_PATH 配置的路径。因此 AppClassLoader 是面向用户的类加载器，我们自己编写的代码以及使用的第三方 jar 包通常都是由它来加载的。</p><h3 id="extclassloader-扩展类加载器" tabindex="-1">ExtClassLoader 扩展类加载器 <a class="header-anchor" href="#extclassloader-扩展类加载器" aria-label="Permalink to &quot;ExtClassLoader 扩展类加载器&quot;">​</a></h3><p>部分源码如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCaAGUjRAAIMUAR7Y3c186.png" alt=""></p><br><p>可以看出，ExtClassLoader 加载系统属性&quot;java.ext.dirs&quot;配置下类文件，可以打印出这个属性来查看具体有哪些文件：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCaAY_dYAAAprdcpTC0589.png" alt=""></p><br><p>结果如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCaAPNV4AAAvayS6X4o835.png" alt=""></p><h3 id="bootstrapclassloader-启动类加载器" tabindex="-1">BootstrapClassLoader 启动类加载器 <a class="header-anchor" href="#bootstrapclassloader-启动类加载器" aria-label="Permalink to &quot;BootstrapClassLoader 启动类加载器&quot;">​</a></h3><p>BootstrapClassLoader 同上面的两种 ClassLoader 不太一样。</p><br><p>首先，它并不是使用 Java 代码实现的，而是由 C/C++ 语言编写的，它本身属于虚拟机的一部分。因此我们无法在 Java 代码中直接获取它的引用。如果尝试在 Java 层获取 BootstrapClassLoader 的引用，系统会返回 null。</p><br><p>BootstrapClassLoader 加载系统属性&quot;sun.boot.class.path&quot;配置下类文件，可以打印出这个属性来查看具体有哪些文件：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCaAONHUAAAsZT0sIBc274.png" alt=""></p><br><p>结果如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCeAMOlRAAGJMpJkA5I246.png" alt=""></p><br><p>可以看到，这些全是 JRE 目录下的 jar 包或者 .class 文件。</p><h1 id="双亲委派模式-parents-delegation-model" tabindex="-1">双亲委派模式（Parents Delegation Model） <a class="header-anchor" href="#双亲委派模式-parents-delegation-model" aria-label="Permalink to &quot;双亲委派模式（Parents Delegation Model）&quot;">​</a></h1><p>既然 JVM 中已经有了这 3 种 ClassLoader，那么 JVM 又是如何知道该使用哪一个类加载器去加载相应的类呢？答案就是：<strong>双亲委派模式</strong>。</p><h3 id="双亲委派模式" tabindex="-1">双亲委派模式 <a class="header-anchor" href="#双亲委派模式" aria-label="Permalink to &quot;双亲委派模式&quot;">​</a></h3><p>所谓双亲委派模式就是，当类加载器收到加载类或资源的请求时，通常都是先委托给父类加载器加载，也就是说，只有当父类加载器找不到指定类或资源时，自身才会执行实际的类加载过程。</p><br><p>其具体实现代码是在 ClassLoader.java 中的 loadClass 方法中，如下所示：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCeAQezSAAQYyFDklrg999.png" alt=""></p><br><p>解释说明：</p><ol><li><p>判断该 Class 是否已加载，如果已加载，则直接将该 Class 返回。</p></li><li><p>如果该 Class 没有被加载过，则判断 parent 是否为空，如果不为空则将加载的任务委托给parent。</p></li><li><p>如果 parent == null，则直接调用 BootstrapClassLoader 加载该类。</p></li><li><p>如果 parent 或者 BootstrapClassLoader 都没有加载成功，则调用当前 ClassLoader 的 findClass 方法继续尝试加载。</p></li></ol><br><p>那这个 parent 是什么呢？ 我们可以看下 ClassLoader 的构造器，如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCeAWh1-AAA_Lzb-zhw301.png" alt=""></p><br><p>可以看出，在每一个 ClassLoader 中都有一个 CLassLoader 类型的 parent 引用，并且在构造器中传入值。如果我们继续查看源码，可以看到 AppClassLoader 传入的 parent 就是 ExtClassLoader，而 ExtClassLoader 并没有传入任何 parent，也就是 null。</p><h3 id="举例说明" tabindex="-1">举例说明 <a class="header-anchor" href="#举例说明" aria-label="Permalink to &quot;举例说明&quot;">​</a></h3><p>比如执行以下代码：</p><br><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Test test = new Test();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Test test = new Test();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><br><p>默认情况下，JVM 首先使用 AppClassLoader 去加载 Test 类。</p><ol><li><p>AppClassLoader 将加载的任务委派给它的父类加载器（parent）---ExtClassLoader。</p></li><li><p>ExtClassLoader 的 parent 为 null，所以直接将加载任务委派给 BootstrapClassLoader。</p></li><li><p>BootstrapClassLoader 在 jdk/lib 目录下无法找到 Test 类，因此返回的 Class 为 null。</p></li><li><p>因为 parent 和 BootstrapClassLoader 都没有成功加载 Test 类，所以AppClassLoader会调用自身的 findClass 方法来加载 Test。</p></li></ol><br><p>最终 Test 类就是被 AppClassLoader 加载到内存中，可以通过如下代码印证此结果：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCeAW8daAADQVXAv0pE448.png" alt=""></p><br><p>打印结果为：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCeAE1DdAABZjeS7yN0189.png" alt=""></p><br><p>可以看出，Test 的 ClassLoader 为 AppClassLoader 类型，而 AppClassLoader 的 parent 为 ExtClassLoader 类型。ExtClassLoader 的 parent 为 null。</p><blockquote><p><strong>注意</strong> ：&quot;双亲委派&quot;机制只是 Java 推荐的机制，并不是强制的机制。我们可以继承 java.lang.ClassLoader 类，实现自己的类加载器。如果想保持双亲委派模型，就应该重写 findClass(name) 方法；如果想破坏双亲委派模型，可以重写 loadClass(name) 方法。</p></blockquote><h1 id="自定义-classloader" tabindex="-1">自定义 ClassLoader <a class="header-anchor" href="#自定义-classloader" aria-label="Permalink to &quot;自定义 ClassLoader&quot;">​</a></h1><p>JVM 中预置的 3 种 ClassLoader 只能加载特定目录下的 .class 文件，如果我们想加载其他特殊位置下的 jar 包或类时（比如，我要加载网络或者磁盘上的一个 .class 文件），默认的 ClassLoader 就不能满足我们的需求了，所以需要定义自己的 Classloader 来加载特定目录下的 .class 文件。</p><h3 id="自定义-classloader-步骤" tabindex="-1">自定义 ClassLoader 步骤 <a class="header-anchor" href="#自定义-classloader-步骤" aria-label="Permalink to &quot;自定义 ClassLoader 步骤&quot;">​</a></h3><ol><li><p>自定义一个类继承抽象类 ClassLoader。</p></li><li><p>重写 findClass 方法。</p></li><li><p>在 findClass 中，调用 defineClass 方法将字节码转换成 Class 对象，并返回。</p></li></ol><p>用一段伪代码来描述这段过程如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCeABoqPAACWzrHjS54889.png" alt=""></p><h3 id="自定义-classloader-实践" tabindex="-1">自定义 ClassLoader 实践 <a class="header-anchor" href="#自定义-classloader-实践" aria-label="Permalink to &quot;自定义 ClassLoader 实践&quot;">​</a></h3><p>首先在本地电脑上创建一个测试类 Secret.java，代码如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCeAY0-WAABCcqmFmiI938.png" alt=""></p><br><p>测试类所在磁盘路径如下图：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCeAbiOCAAAqAZH35mE333.png" alt=""></p><br><p>接下来，创建 DiskClassLoader 继承 ClassLoader，重写 findClass 方法，并在其中调用 defineClass 创建 Class，代码如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCiAEqSMAAILClnPGbQ559.png" alt=""></p><br><p>最后，写一个测试自定义 DiskClassLoader 的测试类，用来验证我们自定义的 DiskClassLoader 是否能正常 work。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCiAcRZvAALz_thptwU623.png" alt=""></p><br><p>解释说明：</p><ul><li><p>① 代表需要动态加载的 class 的路径。</p></li><li><p>② 代表需要动态加载的类名。</p></li><li><p>③ 代表需要动态调用的方法名称。</p></li></ul><p>最后执行上述 testClassLoader 方法，并打印如下结果，说明我们自定义的 DiskClassLoader 可以正常工作。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCiAIP_eAAAdfd_DpwM913.png" alt=""></p><blockquote><p><strong>注意</strong> ：上述动态加载 .class 文件的思路，经常被用作热修复和插件化开发的框架中，包括 QQ 空间热修复方案、微信 Tink 等原理都是由此而来。客户端只要从服务端下载一个加密的 .class 文件，然后在本地通过事先定义好的加密方式进行解密，最后再使用自定义 ClassLoader 动态加载解密后的 .class 文件，并动态调用相应的方法。</p></blockquote><h1 id="android-中的-classloader" tabindex="-1">Android 中的 ClassLoader <a class="header-anchor" href="#android-中的-classloader" aria-label="Permalink to &quot;Android 中的 ClassLoader&quot;">​</a></h1><p>本质上，Android 和传统的 JVM 是一样的，也需要通过 ClassLoader 将目标类加载到内存，类加载器之间也符合双亲委派模型。但是在 Android 中， ClassLoader 的加载细节有略微的差别。</p><br><p>在 Android 虚拟机里是无法直接运行 .class 文件的，Android 会将所有的 .class 文件转换成一个 .dex 文件，并且 Android 将加载 .dex 文件的实现封装在 BaseDexClassLoader 中，而我们一般只使用它的两个子类：PathClassLoader 和 DexClassLoader。</p><h3 id="pathclassloader" tabindex="-1">PathClassLoader <a class="header-anchor" href="#pathclassloader" aria-label="Permalink to &quot;PathClassLoader&quot;">​</a></h3><p>PathClassLoader 用来加载系统 apk 和被安装到手机中的 apk 内的 dex 文件。它的 2 个构造函数如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCiAV6lJAACs0LXqQVg644.png" alt=""></p><br><p>参数说明：</p><ul><li><p>dexPath：dex 文件路径，或者包含 dex 文件的 jar 包路径；</p></li><li><p>librarySearchPath：C/C++ native 库的路径。</p></li></ul><p>PathClassLoader 里面除了这 2 个构造方法以外就没有其他的代码了，具体的实现都是在 BaseDexClassLoader 里面，其 dexPath 比较受限制，一般是已经安装应用的 apk 文件路径。</p><br><p>当一个 App 被安装到手机后，apk 里面的 class.dex 中的 class 均是通过 PathClassLoader 来加载的，可以通过如下代码验证：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCiASPYPAADN5OpH1GE240.png" alt=""></p><br><p>打印结果如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCiAI6J_AABwUllm8lQ019.png" alt=""></p><h3 id="dexclassloader" tabindex="-1">DexClassLoader <a class="header-anchor" href="#dexclassloader" aria-label="Permalink to &quot;DexClassLoader&quot;">​</a></h3><p>先来看官方对 DexClassLoader 的描述：</p><blockquote><p>A class loader that loads classes from .jar and .apk filescontaining a classes.dex entry. This can be used to execute code notinstalled as part of an application.</p></blockquote><p>很明显，对比 PathClassLoader 只能加载已经安装应用的 dex 或 apk 文件，DexClassLoader 则没有此限制，可以从 SD 卡上加载包含 class.dex 的 .jar 和 .apk 文件，这也是插件化和热修复的基础，在不需要安装应用的情况下，完成需要使用的 dex 的加载。</p><br><p>DexClassLoader 的源码里面只有一个构造方法，代码如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCiAP86KAABzADT7Fyw585.png" alt=""></p><br><p>参数说明：</p><ul><li><p><strong>dexPath</strong>：包含 class.dex 的 apk、jar 文件路径 ，多个路径用文件分隔符（默认是&quot;:&quot;）分隔。</p></li><li><p><strong>optimizedDirectory</strong> <strong>：</strong> 用来缓存优化的 dex 文件的路径，即从 apk 或 jar 文件中提取出来的 dex 文件。该路径不可以为空，且应该是应用私有的，有读写权限的路径。</p></li></ul><h1 id="使用-dexclassloader-实现热修复" tabindex="-1">使用 DexClassLoader 实现热修复 <a class="header-anchor" href="#使用-dexclassloader-实现热修复" aria-label="Permalink to &quot;使用 DexClassLoader 实现热修复&quot;">​</a></h1><p>理论知识都是为实践作基础，接下来我们就使用 DexClassLoader 来模拟热修复功能的实现。</p><h3 id="创建-android-项目-dexclassloaderhotfix" tabindex="-1">创建 Android 项目 DexClassLoaderHotFix <a class="header-anchor" href="#创建-android-项目-dexclassloaderhotfix" aria-label="Permalink to &quot;创建 Android 项目 DexClassLoaderHotFix&quot;">​</a></h3><p>项目结构如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCmAAYQwAABXjFvkmNA900.png" alt=""></p><br><p>ISay.java 是一个接口，内部只定义了一个方法 saySomething。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCmARry8AAAnNYtVKYY963.png" alt=""></p><br><p>SayException.java 实现了 ISay 接口，但是在 saySomething 方法中，打印&quot;something wrong here&quot;来模拟一个线上的 bug。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCmAaT9iAABbAZmk7t4425.png" alt=""></p><br><p>最后在 MainActivity.java 中，当点击 Button 的时候，将 saySomething 返回的内容通过 Toast 显示在屏幕上。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCmAAJAfAAGne-5xMvU261.png" alt=""></p><br><p>最后运行效果如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCmASNkxAABX65sn8h4261.png" alt=""></p><h3 id="创建-hotfix-patch-包" tabindex="-1">创建 HotFix patch 包 <a class="header-anchor" href="#创建-hotfix-patch-包" aria-label="Permalink to &quot;创建 HotFix patch 包&quot;">​</a></h3><p>新建 Java 项目，并分别创建两个文件 ISay.java 和 SayHotFix.java。</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCmAV6ogAABQ-CUJLqk288.png" alt=""></p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCmAbfLLAACCTcF2Vrg097.png" alt=""></p><br><p>ISay 接口的包名和类名必须和 Android 项目中保持一致。SayHotFix 实现 ISay 接口，并在 saySomething 中返回了新的结果，用来模拟 bug 修复后的结果。</p><br><p>将 ISay.java 和 SayHotFix.java 打包成 <strong>say_something.jar</strong> ，然后通过 dx 工具将生成的 <strong>say_something.jar</strong>包中的 class 文件优化为 dex 文件。</p><br><blockquote><p>dx --dex --output=say_something_hotfix.jar say_something.jar</p></blockquote><br><p>上述 <strong>say_something_hotfix.jar</strong>就是我们最终需要用作 hotfix 的 jar 包。</p><h3 id="将-hotfix-patch-包拷贝到-sd-卡主目录-并使用-dexclassloader-加载-sd-卡中的-isay-接口" tabindex="-1">将 HotFix patch 包拷贝到 SD 卡主目录，并使用 DexClassLoader 加载 SD 卡中的 ISay 接口 <a class="header-anchor" href="#将-hotfix-patch-包拷贝到-sd-卡主目录-并使用-dexclassloader-加载-sd-卡中的-isay-接口" aria-label="Permalink to &quot;将 HotFix patch 包拷贝到 SD 卡主目录，并使用 DexClassLoader 加载 SD 卡中的 ISay 接口&quot;">​</a></h3><p>首先将 HotFix patch 保存到本地目录下。一般在真实项目中，我们可以通过向后端发送请求的方式，将最新的 HotFix patch 下载到本地中。这里为了演示，我直接使用 adb 命令将 say_somethig_hotfix.jar 包 push 到 SD 卡的主目录下：</p><br><blockquote><p>adb push say_something_hotfix.jar /storage/self/primary/</p></blockquote><br><p>接下来，修改 MainActivity 中的逻辑，使用 DexClassLoader 加载 HotFix patch 中的 SayHotFix 类，如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/0B/07/Ciqah16MQCqAIwZuAAXDP0LfIXU972.png" alt=""></p><br><p><strong>注意</strong>：因为需要访问 SD 卡中的文件，所以需要在 AndroidManifest.xml 中申请权限。</p><br><p>最后运行效果如下：</p><br><p><img src="https://s0.lgstatic.com/i/image3/M01/84/1D/Cgq2xl6MQCqAShVqAABP_H12Tes976.png" alt=""></p><h1 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h1><ul><li><p>ClassLoader 就是用来加载 class 文件的，不管是 jar 中还是 dex 中的 class。</p></li><li><p>Java 中的 ClassLoader 通过双亲委托来加载各自指定路径下的 class 文件。</p></li><li><p>可以自定义 ClassLoader，一般覆盖 findClass() 方法，不建议重写 loadClass 方法。</p></li><li><p>Android 中常用的两种 ClassLoader 分别为：PathClassLoader 和 DexClassLoader。</p></li></ul>',192),o=[r];function p(i,d,c,n,h,C){return s(),l("div",null,o)}const b=a(t,[["render",p]]);export{m as __pageData,b as default};

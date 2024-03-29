# 04JavaScript引擎如何执行JavaScript代码？

JavaScript 在运行过程中与其他语言有所不一样，如果你不理解 JavaScript 的词法环境、执行上下文等内容，很容易会在开发过程中埋下"莫名奇妙"的 Bug，比如`this`指向和预期不一致、某个变量不知道为什么被改了，等等。所以今天我就跟大家聊一聊 JavaScript 代码的运行过程。

大家都知道，JavaScript 代码是需要在 JavaScript 引擎中运行的。我们在说到 JavaScript 运行的时候，常常会提到执行环境、词法环境、作用域、执行上下文、闭包等内容。这些概念看起来都差不多，却好像又不大容易区分清楚，它们分别都在描述什么呢？

这些词语都是与 JavaScript 引擎执行代码的过程有关，为了搞清楚这些概念之间的区别，我们可以回顾下 JavaScript 代码运行过程中的各个阶段。

### JavaScript 代码运行的各个阶段

JavaScript 是弱类型语言，在运行时才能确定变量类型。即使是如今流行的 TypeScript，也只是增加了编译时（编译成 JavaScript）的类型检测（对于编译器相信大家都有所了解，代码编译过程中编译器会进行词法分析、语法分析、语义分析、生成 AST 等处理）。

同样，JavaScript 引擎在执行 JavaScript 代码时，也会从上到下进行词法分析、语法分析、语义分析等处理，并在代码解析完成后生成 AST（抽象语法树），最终根据 AST 生成 CPU 可以执行的机器码并执行。

这个过程，我们后面统一描述为语法分析阶段。除了语法分析阶段，JavaScript 引擎在执行代码时还会进行其他的处理。以 V8 引擎为例，在 V8 引擎中 JavaScript 代码的运行过程主要分成三个阶段。

1. **语法分析阶段。** 该阶段会对代码进行语法分析，检查是否有语法错误（SyntaxError），如果发现语法错误，会在控制台抛出异常并终止执行。

2. **编译阶段。** 该阶段会进行执行上下文（Execution Context）的创建，包括创建变量对象、建立作用域链、确定 this 的指向等。每进入一个不同的运行环境时，V8 引擎都会创建一个新的执行上下文。

3. **执行阶段。** 将编译阶段中创建的执行上下文压入调用栈，并成为正在运行的执行上下文，代码执行结束后，将其弹出调用栈。

其中，语法分析阶段属于编译器通用内容，就不再赘述。前面提到的执行环境、词法环境、作用域、执行上下文等内容都是在编译和执行阶段中产生的概念。
> 关于调用栈的内容我们会在下一讲详细讲解，目前我们只需要知道 JavaScript 在运行过程中会产生一个调用栈，调用栈遵循 LIFO（先进后出，后进先出）原则即可。

今天，我们重点介绍编译阶段，而编译阶段的核心便是执行上下文的创建。

### 执行上下文的创建

执行上下文的创建离不开 JavaScript 的运行环境，JavaScript 运行环境包括全局环境、函数环境和`eval`，其中全局环境和函数环境的创建过程如下：

1. 第一次载入 JavaScript 代码时，首先会创建一个全局环境。全局环境位于最外层，直到应用程序退出后（例如关闭浏览器和网页）才会被销毁。

2. 每个函数都有自己的运行环境，当函数被调用时，则会进入该函数的运行环境。当该环境中的代码被全部执行完毕后，该环境会被销毁。不同的函数运行环境不一样，即使是同一个函数，在被多次调用时也会创建多个不同的函数环境。

在不同的运行环境中，变量和函数可访问的其他数据范围不同，环境的行为（比如创建和销毁）也有所区别。而每进入一个不同的运行环境时，JavaScript 都会创建一个新的执行上下文，该过程包括：

* 建立作用域链（Scope Chain）；

* 创建变量对象（Variable Object，简称 VO）；

* 确定 this 的指向。

由于建立作用域链过程中会涉及变量对象的概念，因此我们先来看看变量对象的创建，再看建立作用域链和确定 this 的指向。

#### 创建变量对象

什么是变量对象呢？每个执行上下文都会有一个关联的变量对象，该对象上会保存这个上下文中定义的所有变量和函数。

而在浏览器中，全局环境的变量对象是`window`对象，因此所有的全局变量和函数都是作为`window`对象的属性和方法创建的。相应的，在 Node 中全局环境的变量对象则是`global`对象。

了解了什么是变量对象之后，我们来看下创建变量对象的过程。创建变量对象将会创建`arguments`对象（仅函数环境下），同时会检查当前上下文的函数声明和变量声明。

* 对于变量声明：此时会给变量分配内存，并将其初始化为`undefined`（该过程只进行定义声明，执行阶段才执行赋值语句）。

* 对于函数声明：此时会在内存里创建函数对象，并且直接初始化为该函数对象。

上述变量声明和函数声明的处理过程，便是我们常说的变量提升和函数提升，其中函数声明提升会优先于变量声明提升。因为变量提升容易带来变量在预期外被覆盖掉的问题，同时还可能导致本应该被销毁的变量没有被销毁等情况。因此 ES6 中引入了`let`和`const`关键字，从而使 JavaScript 也拥有了块级作用域。

或许你会感到疑惑，JavaScript 是怎么支持块级作用域的呢？这就涉及作用域的概念。

在各类编程语言中，作用域分为静态作用域和动态作用域。JavaScript 采用的是词法作用域（Lexical Scoping），也就是静态作用域。词法作用域中的变量，在编译过程中会产生一个确定的作用域。

到这里，或许你对会词法作用域、作用域、执行上下文、词法环境之间的关系依然感到混乱，没关系，我这就来给你梳理下。

刚刚说到，词法作用域中的变量，在编译过程中会产生一个确定的作用域，这个作用域即当前的执行上下文，在 ES5 后我们使用词法环境（Lexical Environment）替代作用域来描述该执行上下文。因此，词法环境可理解为我们常说的作用域，同样也指当前的执行上下文（注意，是当前的执行上下文）。

在 JavaScript 中，词法环境又分为词法环境（Lexical Environment）和变量环境（Variable Environment）两种，其中：

* 变量环境用来记录`var`/`function`等变量声明；

* 词法环境是用来记录`let`/`const`/`class`等变量声明。

也就是说，创建变量过程中会进行函数提升和变量提升，JavaScript 会通过词法环境来记录函数和变量声明。通过使用两个词法环境（而不是一个）分别记录不同的变量声明内容，JavaScript 实现了支持块级作用域的同时，不影响原有的变量声明和函数声明。

这就是创建变量的过程，它属于执行上下文创建中的一环。创建变量的过程会产生作用域，作用域也被称为词法环境，那词法环境是由什么组成的呢？下面我结合作用域链的建立过程一起来进行分析。

#### 建立作用域链

作用域链，顾名思义，就是将各个作用域通过某种方式连接在一起。

前面说过，作用域就是词法环境，而词法环境由两个成员组成。

* 环境记录（Environment Record）：用于记录自身词法环境中的变量对象。

* 外部词法环境引用（Outer Lexical Environment）：记录外层词法环境的引用。

通过外部词法环境的引用，作用域可以层层拓展，建立起从里到外延伸的一条作用域链。当某个变量无法在自身词法环境记录中找到时，可以根据外部词法环境引用向外层进行寻找，直到最外层的词法环境中外部词法环境引用为`null`，这便是作用域链的变量查询。

那么，这个外部词法环境引用又是怎样指向外层呢？我们来看看 JavaScript 中是如何通过外部词法环境引用来创建作用域的。

为了方便描述，我们将 JavaScript 代码运行过程分为定义期和执行期，前面提到的编译阶段则属于定义期。

来看一个例子，我们定义了全局函数`foo`，并在该函数中定义了函数`bar`：

```java
function foo() {
  console.dir(bar);
  var a = 1;
  function bar() {
    a = 2;
  }
}
console.dir(foo);
foo();
```

前面我们说到，JavaScript 使用的是静态作用域，因此函数的作用域在定义期已经决定了。在上面的例子中，全局函数`foo`创建了一个`foo`的`[[scope]]`属性，包含了全局`[[scope]]`：

```java
foo[[scope]] = [globalContext];
```

而当我们执行`foo()`时，也会分别进入`foo`函数的定义期和执行期。

在`foo`函数的定义期时，函数`bar`的`[[scope]]`将会包含全局`[[scope]]`和`foo`的`[[scope]]`：

```java
bar[[scope]] = [fooContext, globalContext];
```

运行上述代码，我们可以在控制台看到符合预期的输出：


<Image alt="图片2.png" src="https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uyGAAaZIAAK9qHI3wvE362.png"/> 


可以看到：

* `foo`的`[[scope]]`属性包含了全局`[[scope]]`

* `bar`的`[[scope]]`将会包含全局`[[scope]]`和`foo`的`[[scope]]`

也就是说，**JavaScript 会通过外部词法环境引用来创建变量对象的一个作用域链，从而保证对执行环境有权访问的变量和函数的有序访问**。除了创建作用域链之外，在这个过程中还会对创建的变量对象做一些处理。

前面我们说过，编译阶段会进行变量对象（VO）的创建，该过程会进行函数声明和变量声明，这时候变量的值被初始化为 undefined。在代码进入执行阶段之后，JavaScript 会对变量进行赋值，此时变量对象会转为活动对象（Active Object，简称 AO），转换后的活动对象才可被访问，这就是 VO -\> AO 的过程。

为了更好地理解这个过程，我们来看个例子，我们在`foo`函数中定义了变量`b`、函数`c`和函数表达式变量`d`：

```java
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};
}
​
foo(1);
```

在执行`foo(1)`时，首先进入定义期，此时：

* 参数变量`a`的值为`1`

* 变量`b`和`d`初始化为`undefined`

* 函数`c`创建函数并初始化

```java
AO = {
  arguments: {
    0: 1,
    length: 1
  },
  a: 1,
  b: undefined,
  c: reference to function c(){},
  d: undefined
}
```

前面我们也有提到，进入执行期之后，会执行赋值语句进行赋值，此时变量`b`和`d`会被赋值为 2 和函数表达式：

```java
AO = {
   arguments: {
    0: 1,
    length: 1
  },
  a: 1,
  b: 2,
  c: reference to function c(){},
  d: reference to FunctionExpression "d"
}
```

这就是 VO -\> AO 过程。

* 在定义期（编译阶段）：该对象值仍为`undefined`，且处于不可访问的状态。

* 进入执行期（执行阶段）：VO 被激活，其中变量属性会进行赋值。

实际上在执行的时候，除了 VO 被激活，活动对象还会添加函数执行时传入的参数和`arguments`这个特殊对象，因此 AO 和 VO 的关系可以用以下关系来表达：

```java
AO = VO + function parameters + arguments
```

现在，我们知道作用域链是在进入代码的执行阶段时，通过外部词法环境引用来创建的。总结如下：

* 在编译阶段，JavaScript 在创建执行上下文的时候会先创建变量对象（VO）；

* 在执行阶段，变量对象（VO）被激活为活动对象（ AO），函数内部的变量对象通过外部词法环境的引用创建作用域链。

虽然 JavaScript 代码的运行过程可以分为语法分析阶段、编译阶段和执行阶段，但由于在 JavaScript 引擎中是通过调用栈的方式来执行 JavaScript 代码的（下一讲会介绍），因此并不存在"整个 JavaScript 运行过程只会在某个阶段中"这一说法，比如上面例子中`bar`函数的编译阶段，其实是在`foo`函数的执行阶段中。

一般来说，当函数执行结束之后，执行期上下文将被销毁（作用域链和活动对象均被销毁）。但有时候我们想要保留其中一些变量对象，不想被销毁，此时就会使用到闭包。

我们已经知道，通过作用域链，我们可以在函数内部可以直接读取外部以及全局变量，但外部环境是无法访问内部函数里的变量。比如下面的例子中，`foo`函数中定义了变量`a`：

```java
function foo() {
  var a = 1;
}
foo();
console.log(a); // undefined
```

我们在全局环境下无法访问函数`foo`中的变量`a`，这是因为全局函数的作用域链里，不含有函数`foo`内的作用域。

如果我们想要访问内部函数的变量，可以通过函数`foo`中的函数`bar`返回变量`a`，并将函数`bar`返回，这样我们在全局环境中也可以通过调用函数`foo`返回的函数`bar`，来访问变量`a`：

```java
function foo() {
  var a = 1;
  function bar() {
    return a;
  }
  return bar;
}
var b = foo();
console.log(b()); // 1
```

前面我们说到，当函数执行结束之后，执行期上下文将被销毁，其中包括作用域链和激活对象。那么，在这个例子中，当`b()`执行时，`foo`函数上下文包括作用域都已经被销毁了，为什么`foo`作用域下的`a`依然可以被访问到呢？

这是因为`bar`函数引用了`foo`函数变量对象中的值，此时即使创建`bar`函数的`foo`函数执行上下文被销毁了，但它的变量对象依然会保留在 JavaScript 内存中，`bar`函数依然可以通过`bar`函数的作用域链找到它，并进行访问。这便是我们常说的闭包，即使创建它的上下文已经销毁，它仍然被保留在内存中。

闭包使得我们可以从外部读取局部变量，在大多数项目中都会被使用到，常见的用途包括：

* 用于从外部读取其他函数内部变量的函数；

* 可以使用闭包来模拟私有方法；

* 让这些变量的值始终保持在内存中。

需要注意的是，我们在使用闭包的时候，需要及时清理不再使用到的变量，否则可能导致内存泄漏问题。

相信大家现在已经掌握了作用域链的建立过程，那么作用域链的用途想必大家也已经了解，比如在函数执行过程中变量的解析：

* 从当前词法环境开始，沿着作用域链逐级向外层寻找环境记录，直到找到同名变量为止；

* 找到后不再继续遍历，找不到就报错。

下面我们继续来看，执行上下文的创建过程中还会做的一件事：确定`this`的指向。

#### 确定 this 的指向

在 JavaScript 中，`this`指向执行当前代码对象的所有者，可简单理解为`this`指向最后调用当前代码的那个对象。相信大家都很熟悉`this`，因此这里我就进行结论性的简单总结。

根据 JavaScript 中函数的调用方式不同，`this`的指向分为以下情况。


<Image alt="this 指向.png" src="https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uzSAQvuHAAJh7k1PAh8263.png"/> 


* 在全局环境中，`this`指向全局对象（在浏览器中为`window`）

* 在函数内部，`this`的值取决于函数被调用的方式

  * 函数作为对象的方法被调用，`this`指向调用这个方法的对象

  * 函数用作构造函数时（使用`new`关键字），它的`this`被绑定到正在构造的新对象

  * 在类的构造函数中，`this`是一个常规对象，类中所有非静态的方法都会被添加到`this`的原型中

* 在箭头函数中，`this`指向它被创建时的环境

* 使用`apply`、`call`、`bind`等方式调用：根据 API 不同，可切换函数执行的上下文环境，即`this`绑定的对象

可以看到，`this`在不同的情况下会有不同的指向，在 ES6 箭头函数还没出现之前，为了能正确获取某个运行环境下`this`对象，我们常常会使用`var that = this;`、`var self = this;`这样的代码将变量分配给`this`，便于使用。这种方式降低了代码可读性，因此如今这种做法不再被提倡，通过正确使用箭头函数，我们可以更好地管理作用域。

到这里，围绕 JavaScript 的编译阶段和执行阶段中执行上下文创建相关的内容已经介绍完毕。

### 小结

今天我主要介绍了 JavaScript 代码的运行过程，该过程分为语法分析阶段、编译阶段、执行阶段三个阶段。

在编译阶段，JavaScript会进行执行上下文的创建，包括：

* 创建变量对象，进行变量声明和函数声明，此时会产生变量提升和函数提升；

* 通过添加对外部词法环境的引用，建立作用域链，通过作用域链可以访问外部的变量对象；

* 确定 this 的指向。

在执行阶段，变量对象（VO）会被激活为活动对象（AO），变量会进行赋值，此时活动对象才可被访问。在执行结束之后，作用域链和活动对象均被销毁，使用闭包可使活动对象依然被保留在内存中。这就是 JavaScript 代码的运行过程。

我们前面也说过，下面这段代码中`bar`函数的编译阶段是在`foo`函数的执行阶段中 ：

```java
function foo() {
  console.dir(bar);
  var a = 1;
  function bar() {
    a = 2;
  }
}
console.dir(foo);
foo();
```

你能说出整段代码的运行过程分别是怎样的，变量对象 AO/VO、作用域链、this 指向在各个阶段中又会怎样表现呢？可以把你的想法写在留言区。

其实，JavaScript 的运行过程和 EventLoop 结合可以有更好的理解，关于 EventLoop 我会在下一讲进行介绍，你也可以在学习之后再来结合本讲内容进行总结。


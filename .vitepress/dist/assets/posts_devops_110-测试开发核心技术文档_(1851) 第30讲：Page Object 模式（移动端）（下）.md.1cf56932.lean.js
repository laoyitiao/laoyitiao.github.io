import{_ as s,j as o,o as _,g as c,k as n,h as t,s as e}from"./chunks/framework.4e7d56ce.js";const ce=JSON.parse('{"title":"第30讲：PageObject模式（移动端）（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(1851) 第30讲：Page Object 模式（移动端）（下）.md","filePath":"posts/devops/110-测试开发核心技术文档/(1851) 第30讲：Page Object 模式（移动端）（下）.md","lastUpdated":1696682708000}'),i={name:"posts/devops/110-测试开发核心技术文档/(1851) 第30讲：Page Object 模式（移动端）（下）.md"},a=e("h1",{id:"第30讲-pageobject模式-移动端-下",tabindex:"-1"},[t("第30讲：PageObject模式（移动端）（下） "),e("a",{class:"header-anchor",href:"#第30讲-pageobject模式-移动端-下","aria-label":'Permalink to "第30讲：PageObject模式（移动端）（下）"'},"​")],-1),r=e("p",null,"上一课时我们已经把整个 case 的测试用例写完，并构建了模型，本课时我们按照 TDD 思想具体实现流程中的方法。",-1),d=e("br",null,null,-1),u=e("p",null,"首先，怎样才能够进入首页呢？我们首先要进入 MainPage，给它一个初始化的方法，让它能够启动 App。该如何启动呢？我们可以回到之前的代码中，找到启动代码，把它拷贝到 MainPage 下。通过这样一次改造，当初始化引用它的时候，MainPage 就会自动启动 App。",-1),h=e("br",null,null,-1),p=e("br",null,null,-1),g=e("p",null,"接下来，我们把对应的类引入进来，通过这个办法，我们已经具备了一个 driver， 这个 driver 可以通过点击一个按钮进入搜索页面。我们再回到启动代码，发现在点击案例的时候进入了搜索页，我们把它提取出来，放到 page 里面。这个时候它完成了对 tv_search 的 click，进入了搜索页。",-1),m=e("br",null,null,-1),b=e("br",null,null,-1),A=e("p",null,"搜索页也需要 self.driver 来完成自动化，所以我们需要一个参数来传递这个 self.driver。既然要接受 driver，search 就要有一个初始化方法接受传参，这时我们可以在 init 里面加一个对 driver 的初始化。",-1),f=e("br",null,null,-1),q=e("br",null,null,-1),P=e("p",null,"现在我们的 case 已经完成了初始化，进入 search 页面。接下来我们回到 search 对象去实现 search 方法，从传参中获取要搜索的关键词并输入。",-1),v=e("br",null,null,-1),M=e("br",null,null,-1),x=e("p",null,"搜索完成之后，仍然在当前的页面，所以 return self。",-1),j=e("br",null,null,-1),k=e("p",null,"其中还有一个参数叫 close，完成一个 close，就可以使用 self.driver.quit 退出。还有一个参数 get price，将获取股价的代码复制过来，并return 一个获取到的浮点数类型的股价。",-1),C=e("br",null,null,-1),O=e("p",null,"这样所有的方法都已经改造完成，并且 test search 里面的方法也已经写好了。",-1),D=e("br",null,null,-1),E=e("p",null,"有很多时候 App 会出现各种各样的异常报错，比如在找一个控件的时候突然弹出来一个广告，这个时候就会导致 App 受到影响；还包括升级弹框，同意弹框等。这个时候我们的脚本就会变得不稳定。",-1),N=e("br",null,null,-1),V=e("p",null,"类似这种问题，我们怎么进行处理呢？第 1 种办法是如果 image_cancel 有时候出现，有时候不会出现，你可以使用一个显式等待。比如显式等待 30 秒，如果说 image_cancel 还没有出现，那我就继续往下运行。但是每一次都等待 30 秒，其实也挺浪费时间的。所以我们就必须要做一次改造，为 find_element 加一些规则，比如只有在弹框出现的时候，才进入弹框进行处理，完成之后，重新再回到原来的逻辑，也就是增加一个智能化的弹框处理。",-1),y=e("br",null,null,-1),B=e("br",null,null,-1),F=e("p",null,"首先我们调用原生的find_element，只要没有控件就一定会抛异常。我们可以加一个小的技巧：给它做一层封装。我们增加一个叫 base_page基类，在这个基类里面，完成对它的方法的封装，用它来替换系统原生的 find_element。",-1),I=e("br",null,null,-1),J=e("br",null,null,-1),K=e("p",null,"接下来把所有的 find_element 都继承父类的。比如让 SearchPage 继承 BasePage，完成之后，把所有的 driver.find_element 都改成 self.find_element。接下来在 find_element 里面我们来完成异常的处理.",-1),T=e("br",null,null,-1),U=e("br",null,null,-1),$=e("p",null,"我们看一下怎么去处理这个异常，既然说这一块抛异常，那我们就用 try 去捕获它，try 完成之后，首先去 find_element，如果找到了，我们就 return element。如果没找到则进入 except，我们在这个异常里面来完成对异常的处理。",-1),H=e("br",null,null,-1),w=e("p",null,"我们先解决弹框的问题，可以借助一个列表去找现在有没有弹框。在 BasePage 下定义一个叫 _blake_List 的黑名单。在这个黑名单里面写几个常见弹框定位符，当异常出现，说明有弹框，我们就遍历弹框名单列表并处理弹框。使用 self.driver.find_elements是为了不抛异常。",-1),L=e("br",null,null,-1),Q=e("br",null,null,-1),S=e("p",null,"处理完异常之后，就可以再次回到原来的函数，再次执行当前出异常的步骤。",-1),X=e("br",null,null,-1),z=e("p",null,"整段代码非常简单，它的意思是在找控件的过程中，假如正常的话，就 return；如果抛异常，就去找黑名单，只要发现黑名单有值，就把黑名单里面的控件点击掉，之后再尝试去找。如果抛了异常就进行异常处理。之后再尝试找原来的控件，如果发现还有异常就再找，直到超出特定次数不再递归。这是一个简单的封装，而实际的封装比这个还要复杂。通过在原生框架上面增加一些更智能化的策略，你的 case 的稳定性就会有很大的提高。",-1),W=e("br",null,null,-1),Y=e("p",null,"通过这个办法，我们就完成了对 PO 的基本改造了。还有几点，我也给你补充下。做演练的时候，我会尽量写得非常简单，能够通俗易懂。在真实的过程中，我们其实要使用更强大的封装，比如说我们刚才的异常处理，可以通过 Python的装饰器来对所有的关键方法完成封装。",-1),G=e("br",null,null,-1),R=e("p",null,"除了 find 方法，比如说 get_text、click、send_keys 有可能有因为各种原因导致异常。其实你都可以借助于 exception handle 这样的装饰器，增强底层框架 API 的稳定性。",-1);function Z(ee,te,le,ne,se,oe){const l=o("Image");return _(),c("div",null,[a,r,d,u,h,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/01/D2/Ciqah1552qmATLy7AADA19Jdf7o158.png"}),t(),p,g,m,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7A/E8/Cgq2xl552qmAFibwAADdJn5VaXI447.png"}),t(),b,A,f,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/01/D2/Ciqah1552qmAdTKnAAEUcgQUm5g927.png"}),t(),q,P,v,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7A/E8/Cgq2xl552qqAWbHoAAN8twHM8Q4603.png"}),t(),M,x,j,k,C,O,D,E,N,V,y,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/01/D2/Ciqah1552qqAMbVYAAKXJed200M562.png"}),t(),B,F,I,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7A/E8/Cgq2xl552qqAbK0mAAEHNVCKEeo399.png"}),t(),J,K,T,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/01/D2/Ciqah1552qqAa3AnAAFPx4qpUkI977.png"}),t(),U,$,H,w,L,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7A/E8/Cgq2xl552quAdz-FAAFkFE2puOg905.png"}),t(),Q,S,X,z,W,Y,G,R])}const ie=s(i,[["render",Z]]);export{ce as __pageData,ie as default};

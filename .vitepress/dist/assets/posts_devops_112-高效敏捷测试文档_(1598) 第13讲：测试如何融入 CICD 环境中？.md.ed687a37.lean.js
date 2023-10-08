import{_ as a,j as i,o as l,g as r,k as n,h as t,Q as o,s as e}from"./chunks/framework.a0d18f64.js";const M=JSON.parse('{"title":"第13讲：测试如何融入CICD环境中？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1598) 第13讲：测试如何融入 CICD 环境中？.md","filePath":"posts/devops/112-高效敏捷测试文档/(1598) 第13讲：测试如何融入 CICD 环境中？.md","lastUpdated":1696682708000}'),C={name:"posts/devops/112-高效敏捷测试文档/(1598) 第13讲：测试如何融入 CICD 环境中？.md"},_=o("",29),p=o("",15),c=e("p",null,"图2 CI/CD 流水线脚本示例",-1),d=e("h3",{id:"代码管理集成和-code-review",tabindex:"-1"},[e("strong",null,"代码管理集成和 Code Review"),t(),e("a",{class:"header-anchor",href:"#代码管理集成和-code-review","aria-label":'Permalink to "**代码管理集成和 Code Review**"'},"​")],-1),u=e("p",null,"图3 GitHub 与 Jenkins 的集成",-1),h=e("br",null,null,-1),I=e("p",null,"通过上面的描述，我们已经知道，代码版本管理系统和 CI/CD 调度管理工具集成后可以实现代码的管理和自动构建过程中代码的拉取。另外，这样的集成还能提供良好的代码评审机制，从流程上保证代码只有经过审查后才能合并到目标分支上。",-1),D=e("br",null,null,-1),b=e("p",null,[t("代码人工评审的方式一般被称为 "),e("strong",null,"Code Review"),t("。Code Review 不仅有助于提前发现缺陷、提高代码的规范性，还能促进研发团队的知识共享。")],-1),g=e("br",null,null,-1),m=e("p",null,[t("LinkedIn 是全球知名的职业社交网站，在这方面贡献了非常优秀的实践经验，该公司的工程技术团队曾经开源了 Kafka 等一系列流行技术。从 2011 年开始这家公司将"),e("strong",null,"代码评审"),t("作为必须的开发流程之一，每个团队都使用同样的代码评审工具和流程，每个工程师都可以评审其他人的代码，也可以为其他团队贡献自己的代码，到 2017 年他们累计完成了 100 万次代码评审。这种做法在保证质量的同时，也促进了各个技术部门之间的协作和交流。")],-1),P=e("br",null,null,-1),A=e("p",null,"图4 图片来源：How to Do Code Reviews Like a Human",-1),k=e("br",null,null,-1),q=e("p",null,"在线代码管理系统 GitHub 提供的 Pull Request 特性，结合分支策略可以在 CI 环境中用来进行代码评审。Pull Request 是 GitHub 提供的一种通知机制。",-1),T=e("br",null,null,-1),f=e("p",null,"举个例子，Tom 被设置为主干分支的管理员，程序员 Lisa 没有权限直接把代码合并到主干分支（Master）上。Lisa 在新建分支上编写或修改完一段代码后发起 Pull Request 请求，Tom 收到请求后会跳转到 Lisa 指定的分支评审代码，如果他认为 Lisa 的代码里有错误，或者不规范，他会写下自己的修改意见并返回给 Lisa。Lisa 修改完代码再次发起 Pull Request 请求，直到 Tom 确认合并请求，代码合并确认后才会触发持续集成。具体实现可以参考在 Jenkins 里安装并配置 GitHub Pull Request Builder 等插件的相关资料。",-1),V=e("br",null,null,-1),x=e("p",null,"当然只从流程上来保证代码评审是不够的，团队是不是认真的对待代码评审取决于团队的质量文化，这就需要团队乐意、主动地在质量的源头避免缺陷的产生。",-1),v=e("br",null,null,-1),R=e("p",null,"最后，给你出一道思考题：你们团队测试相关的代码（测试框架和工具的代码、测试脚本等）是如何管理的？测试基础设施和代码的管理怎么才能更好地融入 CI/CD 环境中？欢迎留言讨论。",-1);function S(J,O,w,L,N,G){const s=i("Image");return l(),r("div",null,[_,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/75/12/Cgq2xl5uVseAGY4HAAPNqrL7GbY361.png"}),t(),p,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/75/11/CgpOIF5uVseAJi9_AACEmPjdKX4271.png"}),t(),c,d,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/75/12/Cgq2xl5uVsiAKWT7AAOO-sUw6XI236.png"}),t(),u,h,I,D,b,g,m,P,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/75/11/CgpOIF5uVsiAT6XdAAJKd_F5hOQ059.png"}),t(),A,k,q,T,f,V,x,v,R])}const B=a(C,[["render",S]]);export{M as __pageData,B as default};

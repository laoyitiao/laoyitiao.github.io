import{_ as o,j as r,o as s,g as h,k as i,h as e,s as a,Q as l}from"./chunks/framework.cfb14fe0.js";const z=JSON.parse('{"title":"第03讲：架构核心技术之分布式消息队列","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构师的 36 项修炼/(20) 第03讲：架构核心技术之分布式消息队列.md","filePath":"posts/backEnd/架构师的 36 项修炼/(20) 第03讲：架构核心技术之分布式消息队列.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/架构师的 36 项修炼/(20) 第03讲：架构核心技术之分布式消息队列.md"},p=a("h1",{id:"第03讲-架构核心技术之分布式消息队列",tabindex:"-1"},[e("第03讲：架构核心技术之分布式消息队列 "),a("a",{class:"header-anchor",href:"#第03讲-架构核心技术之分布式消息队列","aria-label":'Permalink to "第03讲：架构核心技术之分布式消息队列"'},"​")],-1),c=a("p",null,"本课时的主题是分布式消息队列，分布式消息队列的知识结构如下图。",-1),_=l("",5),d=a("p",null,"而远程服务器收到消息以后会对消息进行一系列的操作，然后将邮件发送出去，再进行返回。Adapter 收到返回后，再返回给 EmailService。EmailService 收到返回后再把返回结果返回给 ClientCode。",-1),m=a("p",null,"ClientCode 在 sendEmail 发出请求后，就一直都阻塞在这里，等待最终调用结果的返回，是成功还是失败。因为这个过程是阻塞等待的，所以这个过程是同步调用。",-1),u=a("h6",{id:"异步调用",tabindex:"-1"},[e("异步调用 "),a("a",{class:"header-anchor",href:"#异步调用","aria-label":'Permalink to "异步调用"'},"​")],-1),b=a("p",null,"与同步调用相反的是异步调用。异步调用过程，如下图所示，用户 ClientCode 调用 EmailService 以后，EmailService 会把这个调用请求发送给消息队列，然后就立即返回了。ClientCode 收到返回以后继续向下处理，不会继续阻塞等待，实际上消息发送到 Queue 后，还没有被处理。可以看到后面的消息消费，其实要比 EmailService 返回可能还要晚一点，EmailService 返回以后消息才会被消费处理。",-1),A=a("p",null,"QueueConsumer 消息队列的消费者，从消息队列中取出这个消息，再把这个消息发送给 SmtpAdapter，也就是调用 SmtpAdapter，处理逻辑跟同步调用一样。SmtpAdapter 通过 SMTP 的通讯协议，把消息发送给远程的一个服务器，进行邮件发送，通过 RemoteServer 进行处理，处理完了收到返回，再把返回结果通知消息队列 Queue。",-1),g=a("p",null,"在这个过程中，客户端的调用，也就是应用程序的调用，和业务逻辑真正发送邮件的操作是不同步的。在进行邮件发送操作的处理过程中，客户端的代码已经返回了，它可以继续进行自己的后续操作，而不需要等待邮件的发送，这就叫做异步调用。",-1),q=a("h1",{id:"消息队列构建异步调用架构",tabindex:"-1"},[e("消息队列构建异步调用架构 "),a("a",{class:"header-anchor",href:"#消息队列构建异步调用架构","aria-label":'Permalink to "消息队列构建异步调用架构"'},"​")],-1),k=a("p",null,"使用异步调用架构的主要手段，就是通过消息队列构建。架构图如下图所示。",-1),C=a("p",null,"消息的生产者将消息发送到消息队列以后，由消息的消费者从消息队列中获取消息，然后进行业务逻辑的处理，消息的生产者和消费者是异步处理的，彼此不会等待阻塞，所以叫做异步架构。",-1),P=a("p",null,"使用消息队列构建一个异步调用架构，你需要了解 3 个角色：一是消息的生产者，二是消息队列，三是消息的消费者。",-1),f=l("",9),S=a("h2",{id:"发布订阅模型",tabindex:"-1"},[e("发布订阅模型 "),a("a",{class:"header-anchor",href:"#发布订阅模型","aria-label":'Permalink to "发布订阅模型"'},"​")],-1),T=a("p",null,"再来看发布订阅模型。在发布订阅模型中，消息可能被发送到不止一个消费者，生产者发送消息到一个主题，而不是队列中。消息被发布到主题后，就会被克隆给每一个订阅它的消费者，每个消费者接收一份消息复制到自己的私有队列。消费者可以独立于其他消费者使用自己订阅的消息，消费者之间不会竞争消息。常用的分布式消息队列都支持发布订阅模型，也就是说消息的发布订阅模型是分布式消息队列的一个功能特性。",-1),x=l("",10),E=a("br",null,null,-1),M=a("h2",{id:"使峰值平缓",tabindex:"-1"},[e("使峰值平缓 "),a("a",{class:"header-anchor",href:"#使峰值平缓","aria-label":'Permalink to "使峰值平缓"'},"​")],-1),V=a("p",null,"使用消息队列的第三个好处是可以平衡流量峰值，削峰填谷。使用消息队列，即便是访问流量持续的增长，系统依然可以持续地接收请求。这种情况下，虽然生产者发布消息的速度比消费者消费消息的速度快，但是可以持续地将消息纳入到消息队列中，用消息队列作为消息的缓冲，因此短时间内，发布者不会受到消费处理能力的影响。",-1),v=a("p",null,"如下图所示，因为消息的生产者是直接面向用户请求的，而用户的请求访问压力是不均衡的，比如淘宝每天的访问高峰是在上午 10 点左右，而新浪微博则可能在某个明星半夜发一条微博后突然出现访问高峰。",-1),Q=a("p",null,"在访问高峰，用户的并发访问数可能超过了系统的处理能力，所以在高峰期就可能会导致系统负载过大，响应速度变慢，更严重的可能会导致系统崩溃。这种情况下，通过消息队列将用户请求的消息纳入到消息队列中，通过消息队列缓冲消费者处理消息的速度。",-1),B=a("p",null,"如图中所示，消息的生产者负载有高峰有低谷，但是到了消费者这里，只会按照自己的最佳处理能力去消费消息。高峰期它会把消息缓冲在消息队列中，而在低谷期它也还是使用自己最大的处理能力去获取消息，将前面缓冲起来、来不及及时处理的消息处理掉。那么，通过这种手段可以实现系统负载削峰填谷，也就是说将访问的高峰削掉，而将访问的低谷填平，使系统处在一个最佳的处理状态之下，不会对系统的负载产生太大的冲击。",-1),I=a("h2",{id:"失败隔离及自我修复",tabindex:"-1"},[e("失败隔离及自我修复 "),a("a",{class:"header-anchor",href:"#失败隔离及自我修复","aria-label":'Permalink to "失败隔离及自我修复"'},"​")],-1),R=a("p",null,"消息队列的第四个好处是失败隔离和自我修复。因为发布者不直接依赖消费者，所以分布式消息队列可以将消费者系统产生的错误异常与生产者系统隔离开来，生产者不受消费者失败的影响。 当在消息消费过程中出现处理逻辑失败的时候，这个错误只会影响到消费者自身，而不会传递给消息的生产者，也就是应用程序可以按照原来的处理逻辑继续执行。",-1),N=a("p",null,"这也就意味着在任何时候都可以对后端的服务器执行维护和发布操作。我们可以重启、添加或删除服务器，而不影响生产者的可用性，这样简化了部署和服务器管理的难度。",-1),O=a("h2",{id:"解耦",tabindex:"-1"},[e("解耦 "),a("a",{class:"header-anchor",href:"#解耦","aria-label":'Permalink to "解耦"'},"​")],-1),D=a("p",null,"第五个好处，如下图所示，使用分布式消息队列，可以使生产者和消费者的代码实现解耦合，也就是说可以多个生产者发布消息，多个消费者处理消息，共同完成完整的业务处理逻辑，但是它们却不需要直接进行交互调用，没有代码的依赖耦合。在传统的同步调用中，调用者代码必须要依赖被调用者的代码，也就是生产者代码必须要依赖消费者的处理逻辑代码，代码需要直接的耦合，而使用消息队列，这两部分的代码不需要进行任何的耦合。耦合程度越低的代码越容易维护，也越容易进行扩展。",-1),G=l("",8),K=l("",29);function U(L,W,J,X,$,j){const t=r("Image");return s(),h("div",null,[p,c,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/C5/CgoB5l13GW-AIfDbAAERpWtyIbk305.png"}),e(),_,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/38/CgotOV13V8SAacKCAACH4MjE17c508.png"}),e(),d,m,u,b,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/39/CgotOV13V-uAEtBmAACbBdrSrPQ139.png"}),e(),A,g,q,k,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/07/CgoB5l13S8-ABqmHAABLgEvpt4w514.png"}),e(),C,P,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/C5/CgoB5l13GXCAGQv9AABW-mX709c882.png"}),e(),f,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/27/CgotOV13S4-AO45dAACCTzTIUMo123.png"}),e(),S,T,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/27/CgotOV13S2GAXpxGAAB59bGh2YU946.png"}),e(),x,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/89/E5/CgotOV13GXKATU17AABlL42Ox4U769.png"}),e(),E,M,V,v,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/28/CgotOV13TBeANayOAACLzNzqryE259.png"}),e(),Q,B,I,R,N,O,D,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/19/CgoB5l13WDeAZbSUAACZpbCjQVI728.png"}),e(),G,i(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/39/CgotOV13WGCAPpr5AAB6e0s8OFk657.png"}),e(),K])}const H=o(n,[["render",U]]);export{z as __pageData,H as default};

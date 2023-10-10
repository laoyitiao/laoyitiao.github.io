import{_ as o,j as e,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.cfb14fe0.js";const V=JSON.parse('{"title":"第44讲：ThreadLocal适合用在哪些实际生产的场景中？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(282) 第44讲：ThreadLocal 适合用在哪些实际生产的场景中？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(282) 第44讲：ThreadLocal 适合用在哪些实际生产的场景中？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(282) 第44讲：ThreadLocal 适合用在哪些实际生产的场景中？.md"},E=p("",16),y=p("",6),i=p("",10),F=p("",7),d=p("",21),C=s("p",null,"在图中的左侧可以看到，这个线程池一共有 16 个线程，对应 16 个 simpleDateFormat 对象。而在这个图画的右侧是 1000 个任务，任务是非常多的，和原来一样有 1000 个任务。但是这里最大的变化就是，虽然任务有 1000 个，但是我们不再需要去创建 1000 个 simpleDateFormat 对象了。即便任务再多，最终也只会有和线程数相同的 simpleDateFormat 对象。这样既高效地使用了内存，又同时保证了线程安全。",-1),D=s("p",null,"以上就是第一种非常典型的适合使用 ThreadLocal 的场景。",-1),m=s("h3",{id:"典型场景2",tabindex:"-1"},[n("典型场景2 "),s("a",{class:"header-anchor",href:"#典型场景2","aria-label":'Permalink to "典型场景2"'},"​")],-1),h=s("p",null,"每个线程内需要保存类似于全局变量的信息（例如在拦截器中获取的用户信息），可以让不同方法直接使用，避免参数传递的麻烦却不想被多线程共享（因为不同线程获取到的用户信息不一样）。",-1),u=s("p",null,"例如，用 ThreadLocal 保存一些业务内容（用户权限信息、从用户系统获取到的用户名、用户ID 等），这些信息在同一个线程内相同，但是不同的线程使用的业务内容是不相同的。",-1),A=s("p",null,"在线程生命周期内，都通过这个静态 ThreadLocal 实例的 get() 方法取得自己 set 过的那个对象，避免了将这个对象（如 user 对象）作为参数传递的麻烦。",-1),g=s("p",null,"我们用图画的形式举一个实例：",-1),B=s("p",null,"比如说我们是一个用户系统。假设不使用 ThreadLocal，那么当一个请求进来的时候，一个线程会负责执行这个请求，然后这个请求就会依次调用 service-1()、service-2()、service-3()、service-4()，这 4 个方法可能是分布在不同的类中的。",-1),v=s("p",null,"在 service-1() 的时候它会创建一个 user 的对象，用于保存比如说这个用户的用户名等信息，后面 service-2/3/4() 都需要用到这个对象的信息，比如说 service-2() 代表下订单、service-3() 代表发货、service-4() 代表完结订单，在这种情况下，每一个方法都需要用户信息，所以就需要把这个 user 对象层层传递下去，从 service-1() 传到 service-2()，再从 service-2() 传到 service-3()，以此类推。",-1),b=s("p",null,"这样做会导致代码非常冗余，那有没有什么办法可以解决这个问题呢？我们首先想到的方法就是使用一个 HashMap，如下图所示：",-1),S=s("p",null,"比如说我们使用了这样的 Map 之后，就不需要把 user 对象层层传递了，而是在执行 service-1() 的时候，把这个用户信息给 put 进去，然后后面需要拿用户信息的时候，直接从静态的 User map 里面 get 就可以了。这样一来，无论你执行哪个方法，都可以直接获取到这个用户信息。当然，我们也要考虑到 web 服务器通常都是多线程的，当多个线程同时工作的时候，我们也需要保证线程安全。",-1),_=s("p",null,"所以在这里，如果我们使用 HashMap 是不够的，因为它是线程不安全的，那我们就可以使用 synchronized，或者直接把 HashMap 替换成 ConcurrentHashMap，用类似的方法来保证线程安全，这样的改进如下图所示：",-1),T=s("p",null,"在这个图中，可以看出有两个线程，并且每个线程所做的事情都是访问 service-1/2/3/4()。那么当它们同时运行的时候，都会同时访问这个 User map，于是就需要 User map 是线程安全的。",-1),w=s("p",null,"无论我们使用 synchronized 还是使用 ConcurrentHashMap，它对性能都是有所影响的，因为即便是使用性能比较好的 ConcurrentHashMap，它也是包含少量的同步，或者是 cas 等过程。相比于完全没有同步，它依然是有性能损耗的。所以在此一个更好的办法就是使用 ThreadLocal。",-1),L=s("p",null,"这样一来，我们就可以在不影响性能的情况下，也无需层层传递参数，就可以达到保存当前线程所对应的用户信息的目的。如下图所示：",-1),k=p("",10);function f(x,I,P,q,j,U){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/80/Cgq2xl5Gb8eAHJXxAAB1tWXZO48680.png"}),n(),y,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/7E/CgpOIF5Gal6AeBk6AACsNc5-9ck050.png"}),n(),i,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/7F/CgpOIF5GbTyAVB13AACRdzpW9yI360.png"}),n(),F,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/7F/Cgq2xl5GbXSADJb5AAC0PdMmwSI373.png"}),n(),d,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/7F/CgpOIF5Gbf2ARIJVAADS5-4CFIM236.png"}),n(),C,D,m,h,u,A,g,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/7F/Cgq2xl5GbiiALuSeAADH1eeI90E061.png"}),n(),B,v,b,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/7F/Cgq2xl5GbkGAepKRAAE5e9B5GbE065.png"}),n(),S,_,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/7F/CgpOIF5GblqACpu_AAGwufcrq9I360.png"}),n(),T,w,L,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/7F/Cgq2xl5GbvKAJWHOAAHZjE9Vywo159.png"}),n(),k])}const M=o(r,[["render",f]]);export{V as __pageData,M as default};

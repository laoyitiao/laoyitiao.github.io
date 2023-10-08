import{_ as p,j as o,o as e,g as t,k as n,h as a,Q as c,s}from"./chunks/framework.4e7d56ce.js";const G=JSON.parse('{"title":"第24讲：通过KafkaEagle实现对Kafka消息队列的监控","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3095) 第24讲：通过 Kafka Eagle 实现对 Kafka 消息队列的监控.md","filePath":"posts/devops/042_大数据运维实战/(3095) 第24讲：通过 Kafka Eagle 实现对 Kafka 消息队列的监控.md","lastUpdated":1696682708000}'),r={name:"posts/devops/042_大数据运维实战/(3095) 第24讲：通过 Kafka Eagle 实现对 Kafka 消息队列的监控.md"},E=c("",33),y=s("p",null,"在上图中，对于左侧导航栏，我已经将每个栏目的功能做了标注，整体分为 5 个部分，分别是全局视图、Kakfa 消息管理、Kafka 集群监控、Kafka 监控告警及系统设置。",-1),i=s("p",null,"点击上图导航栏中的 BScreen 链接，即可进入下图界面：",-1),k=s("p",null,"此界面是个 Kafka 实时状态监控图，主要展示了消息生产的状态和消费状态，数据实时更新，非常炫酷。",-1),g=s("p",null,"接着前面的功能预览界面图，在此图右侧部分，显示了 Kafka 集群 Brokers 的数量、Topic 的数量、ZooKeeper 集群的节点数及消费者数量，点击 Brokers 的数量链接，显示下图界面：",-1),f=s("p",null,"此界面显示了 Kafka 集群的状态信息，主要是 Kakfa 占用的系统 CPU、内存等资源信息，要获得这些信息，需要在 Kafka 上开启 JMX 端口，这里设置的 JMX 端口为 9999。",-1),F=s("p",null,"接着，回到功能预览界面图，再点击 Topic 的链接，来到下图所示的界面：",-1),d=s("p",null,"此界面显示了 Kafka 集群中所有的 Topic 信息，包含 partitions 数量、数据偏差等，点击任意一个 Topic 链接，来到下图所示的界面：",-1),A=s("p",null,"此界面主要显示了某个 Topic 中目前的消息数、容量以及每个 Partition 中存储的消息数。",-1),h=s("p",null,"最后，再点击功能预览界面图中的消费者链接，来到下图所示的界面：",-1),u=s("p",null,"此界面主要显示了目前有哪些消费组，可以看到这里有一个 Logstash 消费者组，点击这个消费者组，然后点击 Runing 按钮，来到如下的界面：",-1),C=s("p",null,"此界面主要显示了目前消费者消费 Nginxlogs 这个 Topic 的状态信息，重点关注 Lag 列的信息，此信息表示消费延时，如果延时值过大，则表示消费速度过慢，需要引起注意。",-1),D=s("p",null,"下面再来看下 Kafka Eagle 提供的 KSQL 功能，如下图所示：",-1),_=s("p",null,[a('此界面中，右边的 select 语句，nginxlogs 表示 topic 的名称，"'),s("code",null,"partition"),a(' in (0)"表示查询哪个 partition 中的数据，最后的"limit 5"表示显示前 5 条消息。')],-1),m=s("p",null,"接着再来看下 Kafka 的监控指标，如下图所示：",-1),K=s("p",null,"上图曲线显示了每分钟推送到 Kafka 的消息数，另外还可以看到有很多其他监控指标，比如每秒生产多少数据量、每秒消费多少数据量等。",-1),b=s("p",null,"最后，再来看下如何配置监控告警，首先在告警栏中选择创建一个告警组，如下图所示：",-1),v=s("p",null,"此界面设置告警组名称、告警方式和告警接口，支持钉钉、微信和邮件告警，推荐钉钉告警，配置比较简单，直接给出一个告警接口地址即可。",-1),q=s("p",null,"接着，配置一个消费者延时告警，如下图所示：",-1),B=s("p",null,"此界面中主要配置的是消费延时值，上面配置为 1，也就是说延时值超过 1 就进行告警，这个值要根据实际情况进行设置。在海量数据环境下（上亿条数据），有几千条消息延时，其实也是正常的，而在小量数据环境下（几十万条数据），延时消息超过百条，可能就是消费延时了，需要关注延时的原因。",-1),x=s("p",null,"最后，再来看下如何设置集群的告警，如下图所示：",-1),T=s("p",null,"此界面中，配置的是对 Kafka 集群的告警，也可以设置 ZooKeeper、Topic、Producer 等的告警，告警可以设置告警级别、告警次数及告警组等信息。",-1),P=s("p",null,"所有配置完成后，就可以实现故障告警了，下图是一个钉钉告警截图：",-1),M=s("p",null,"从图中可以看出，此告警是消费延时导致的，我们设置的最大消费延时为 1，而目前延时是 793，这已经是第三次告警了，后面将不再进行告警，因为我配置的最大告警次数为 3。",-1),X=s("h3",{id:"小结",tabindex:"-1"},[a("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),w=s("p",null,"本课时主要讲解了 Kafka Eagle 的安装、配置与使用，其是目前最流行的 Kafka 监控利器，很多大企业都在使用它来监控和管理 Kafka，快速、熟练使用 Kafka Eagle 是本课程的重点。",-1);function H(z,S,j,W,R,O){const l=o("Image");return e(),t("div",null,[E,n(l,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/34/27/CgqCHl8RWa2AQ597AADfl30QncI077.png"}),a(),y,i,n(l,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/34/27/CgqCHl8RWbeAORQBAAlDnMWCVwI984.png"}),a(),k,g,n(l,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/34/1C/Ciqc1F8RWcGAJCXtAADdhhAt69Y878.png"}),a(),f,F,n(l,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/34/27/CgqCHl8RWcmAWsZQAADQaJT1aIw478.png"}),a(),d,n(l,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/34/27/CgqCHl8RWc-AV1dLAADXF7wAPKk061.png"}),a(),A,h,n(l,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/34/27/CgqCHl8RWeCAd6KVAACdPx7Jf0Q608.png"}),a(),u,n(l,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/34/27/CgqCHl8RWeeAXM3OAAEgJuuQ3KU227.png"}),a(),C,D,n(l,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/34/1C/Ciqc1F8RWfaAairZAAEEUcme4_0353.png"}),a(),_,m,n(l,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/34/1C/Ciqc1F8RWfyAFSK-AAFwH8ENnKw658.png"}),a(),K,b,n(l,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/34/27/CgqCHl8RWgSAHxTjAACkzctvXWs371.png"}),a(),v,q,n(l,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/34/28/CgqCHl8RWguAUvmYAACq3eB4nx8993.png"}),a(),B,x,n(l,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/34/28/CgqCHl8RWhOAVNSkAACb9qXjWuY931.png"}),a(),T,P,n(l,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/34/1C/Ciqc1F8RWhuAWMiFAAEaw2H9zcg810.png"}),a(),M,X,w])}const J=p(r,[["render",H]]);export{G as __pageData,J as default};

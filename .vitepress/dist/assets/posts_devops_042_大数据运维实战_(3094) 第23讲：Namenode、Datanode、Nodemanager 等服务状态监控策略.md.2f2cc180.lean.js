import{_ as l,j as t,o as p,g as r,k as a,h as n,Q as e,s}from"./chunks/framework.4e7d56ce.js";const qs=JSON.parse('{"title":"第23讲：Namenode、Datanode、Nodemanager等服务状态监控策略","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3094) 第23讲：Namenode、Datanode、Nodemanager 等服务状态监控策略.md","filePath":"posts/devops/042_大数据运维实战/(3094) 第23讲：Namenode、Datanode、Nodemanager 等服务状态监控策略.md","lastUpdated":1696682708000}'),c={name:"posts/devops/042_大数据运维实战/(3094) 第23讲：Namenode、Datanode、Nodemanager 等服务状态监控策略.md"},i=e("",6),d=e("",10),_=e("",6),E=s("p",null,"告警通知属性主要对是否启用告警、告警联系人、告警周期、告警类型等进行设置，上图已经很清楚地描述了每个选项的含义，这里不再多说。",-1),y=s("h4",{id:"_2-添加主机监控",tabindex:"-1"},[n("2. 添加主机监控 "),s("a",{class:"header-anchor",href:"#_2-添加主机监控","aria-label":'Permalink to "2. 添加主机监控"'},"​")],-1),g=s("p",null,"选择 Configuration → Hosts → Hosts，点击 Add 按钮添加一个主机，如下图所示：",-1),C=s("p",null,'首先添加一个 172.16.213.31 主机，此主机无须设置更多的属性，只需要引用模板即可，模板就选择之前我们创建的"generic-active-host-custom"。这样，此主机的所有属性就配置完成了，因为更多的主机属性都通过指定的主机模板继承进去了。',-1),m=s("p",null,"要添加更多的主机，方法与上面完全相同。下面依次添加多台主机，如下图所示：",-1),h=s("p",null,"在这个界面上，有很多操作属性，可以用于对主机进行复制、删除、修改、启用和禁用等，由此可见，通过 Centreon 管理主机非常方便、简单。",-1),A=s("h4",{id:"_3-监控引擎管理",tabindex:"-1"},[n("3. 监控引擎管理 "),s("a",{class:"header-anchor",href:"#_3-监控引擎管理","aria-label":'Permalink to "3. 监控引擎管理"'},"​")],-1),u=s("p",null,[n("在完成主机和主机组添加后，这些主机信息并不会马上生效，还需要将这些信息生成 Centreon 配置文件进行保存，然后重新启动监控引擎，这就是 Centreon 的"),s("strong",null,"监控引擎管理功能"),n("。在任何配置添加或修改完成后，都需要重启监控引擎才能使这些配置生效。")],-1),F=s("p",null,"选择 Configuration → Pollers → Pollers，如下图所示：",-1),T=s("p",null,'在此图中选择"Export configuration"，如下图所示：',-1),D=e("",6),S=s("p",null,'此界面中主要用来设置服务模板的一些属性值，点击上图中的"Notification"选项，可以用来设置通知属性，如下图所示：',-1),N=s("p",null,"在此界面中，对每个选项的含义都做了详细的描述，这里不再多说。generic-active-service 服务模板中设置的属性值都是通用的或公用的，主要用于在创建服务的时候进行引用。",-1),f=s("p",null,[s("strong",null,"（2）创建监控命令")],-1),$=s("p",null,"选择 Configuration→Commands→Checks，点击 add 创建一个命令，如下图所示：",-1),M=s("p",null,'这里创建了一个"ganglia_collect"命令，此命令用来收集 Ganglia 上面的监控指标，可以看到，此命令最终应用的监控命令是 check_ganglia_metric.py，这个脚本我们在上个课时中介绍过。',-1),b=s("p",null,[s("strong",null,"（3）添加监控服务")],-1),I=s("p",null,'添加监控服务的方法与添加主机基本一样，选择 Configuration→Services→Services by host，点击 Add 按钮添加一个服务。这里添加了一个"check_hadoop_block"的服务，在"Service Template"中引用了服务模板 generic-active-service，如下图所示：',-1),q=s("p",null,"在添加监控服务过程中，只要引用了之前创建好的基础服务模板，那么大部分的属性基本都不用配置了，因为已经在服务模板配置过了。",-1),k=s("p",null,'这里重点关注"check_hadoop_block"服务中引用的命令 ganglia_collect 中三个参数的配置，分别是监控指标、警告阈值和故障阈值。其中，监控项 dfs.FSNamesystem.CorruptBlocks 表示已损坏的 block 数量。这样一个监控服务就添加完成了，如下图所示：',-1),H=s("p",null,"在上图的服务监控列表中，可以对每个服务进行复制、删除、启用、禁用等操作，这些功能对以后的监控系统运维是非常重要的。",-1),w=s("h4",{id:"_5-监控报警配置",tabindex:"-1"},[n("5. 监控报警配置 "),s("a",{class:"header-anchor",href:"#_5-监控报警配置","aria-label":'Permalink to "5. 监控报警配置"'},"​")],-1),B=s("p",null,"监控报警配置是 Centreon 中一个非常重要的组成部分，在前面介绍了主机和服务的添加，并且在主机和服务中都引用了各自的模板。而我们在模板中已经开启了报警通知功能，下面就重点讲下主机和服务的报警通知功能。",-1),P=s("p",null,[s("strong",null,"（1）开启主机报警通知")],-1),v=s("p",null,"开启主机报警通知功能有两种方法。",-1),O=s("p",null,[s("strong",null,"第一种方法"),n("是在定义主机时进行开启，选择 Configuration→Hosts→Hosts，编辑已经创建好的主机 172.16.213.31，这里重点看通知（Notification）选项，如下图所示：")],-1),x=s("p",null,'在默认情况下，通知选项处于"Default"状态，该状态表示一个继承关系，这里选择"monitoring_server"作为通知联系人，monitoring_server 就是 admin 用户的全名，"选择Supervisor"作为联系人组。这里可以根据监控需要任意添加。',-1),R=s("p",null,"接着还可以选择通知间隔、通知周期、通知类型、是否延时发送通知等选项。对于比较重要的主机可以选择短一点的通知时间间隔，可以选择通知周期为 7×24，另外还可以选择工作日（Workhours）、非工作日（Nonworkhours）两个选项，可以选择通知类型为宕机（Down）、不可到达（Unreachable）、恢复（Recovery）等。最后一个选项是设定第一次发送通知的延时时间，如果设置为 0，则表示主机故障后立刻发送通知。",-1),V=s("p",null,[s("strong",null,"第二种方法"),n("是配置主机模板中的设置。在前面介绍的主机添加过程中，都引用了主机模板，而在主机模板配置中也可以开启报警通知功能，开启方法很简单。")],-1),G=s("p",null,"那就是编辑主机模板，找到通知选项，设置方法与上图完全一样，当开启了通知功能后，对应的这个主机就继承了模板的设置，自动开启了主机通知功能。",-1),W=s("p",null,[s("strong",null,"（2）报警方式和联系人配置")],-1),J=s("p",null,"在开启了主机和服务的报警通知功能后，还需要设置报警方式和报警联系人。Centreon 支持多种报警方式，可以选择邮件报警、短信报警、微信报警、钉钉报警等方式，而邮件报警是默认方式，可以无须添加插件直接使用。",-1),K=s("p",null,"选择 Configuration→Users→Contacts/Users，然后编辑 admin 用户，如下图所示：",-1),z=e("",7),L=e("",3),U=e("",8),Y=s("p",null,[n("在创建 check_hadoop_namenodestate 命令过程中，需要使用一个 perl 脚本 check_hadoop_namenode_state.pl（"),s("a",{href:"https://www.ixdba.net/centreon/hadoop-pl.tar.gz",target:"_blank",rel:"noreferrer"},"本课时所有脚本都可点击这里下载"),n('，将下载下来的文件和目录都放到 Centreon 服务器的 /usr/lib/nagios/plugins 目录下），此脚本其中的"-H"表示主机地址，后面的参数 $ARG1$ 表示 namenode 的状态，有两种状态，即 active 和 standby。此脚本用来检测高可用 Namenode 的主、备是否发生切换，如果主、备发生切换，则意味着 Namenode 可能出现问题，所以要做好主备的状态监控。')],-1),j=s("p",null,"接着，开始添加 check_hanamenode_active 服务，如下图所示：",-1),Q=s("p",null,"注意，这里添加的服务对应的主机是 172.16.213.31，此主机是 Namenode 的主节点，因此它的状态应该是 active，注意此服务在检查命令配置项中，添加刚刚配置好的那个命令即可。",-1),X=s("p",null,"然后，继续添加第二个服务 check_hanamenode_standby，此服务用来检查 Namenode 备机运行状态，如下图所示：",-1),Z=s("p",null,"配置完毕后，对 Namenode 主、备运行状态已经配置完成。对 Namenode 监控，还需要及时了解 HDFS 数据块状态（是否丢失块、出现坏块、未复制的块等），这个功能需要通过另一个脚本实现，该脚本为 check_hadoop_replication.pl。",-1),ss=s("p",null,"要使用这个脚本，仍然是先创建一个监控命令，在 Centreon Web 界面选择 Configuration→Commands→Checks，然后点击 Add 按钮新建一个 Command，如下图所示。",-1),ns=s("p",null,"在这个界面，我们调用了刚上传到服务器上的那个脚本，此脚本中 -H 是指定 Namenode 服务器的 IP，-P 是指定 Namenode 的 Web 端口，默认是 50070，-w 是 HDFS 数据块故障状态的警告值，-c 是 HDFS 数据块故障状态的故障值。",-1),os=s("p",null,"接着，开始创建服务，这里创建了一个 check_hadoop_namenode_replicatedblocks 服务，如下图所示：",-1),as=s("p",null,"此服务中，连接了两个主机，也就是对这两个主机的 HDFS 数据块状态进行定期监控和检查。",-1),es=s("h4",{id:"_2-监控-datanode-运行状态",tabindex:"-1"},[n("2. 监控 Datanode 运行状态 "),s("a",{class:"header-anchor",href:"#_2-监控-datanode-运行状态","aria-label":'Permalink to "2. 监控 Datanode 运行状态"'},"​")],-1),ls=s("p",null,"对 Datanode 的监控主要监控节点服务是否宕机，如果发现 Datanode 服务宕机，那么需要马上处理，所以对 Datanode 的监控至关重要。要监控 Datanode，需借助一个脚本 check_hadoop_datanodes.pl，此脚本已包含在上面那个下载地址中。",-1),ts=s("p",null,"接着，在 Centreon Web 界面选择 Configuration→Commands→Checks，然后点击 Add 按钮新建一个 Command，如下图所示。",-1),ps=s("p",null,"这里创建了一个命令 check_hadoop_deaddatanode，然后将上面脚本引用进来即可，参数含义不再介绍。",-1),rs=s("p",null,"命令创建完成，接着，开始创建监控服务，这里我创建的服务名称是 check_hadoop_datanode_dead，将此服务连接到 172.16.213.31 主机上，如下图所示：",-1),cs=s("p",null,"注意，在上图中，ARG1 代表警告阈值，ARG2 代表故障阈值，这个可根据实际情况进行修改。配置完毕后，对 Datanode 的监控就添加完成了。",-1),is=s("h4",{id:"_3-监控-resourcemanager、nodemanager-状态",tabindex:"-1"},[n("3. 监控 resourcemanager、nodemanager 状态 "),s("a",{class:"header-anchor",href:"#_3-监控-resourcemanager、nodemanager-状态","aria-label":'Permalink to "3. 监控 resourcemanager、nodemanager 状态"'},"​")],-1),ds=s("p",null,"对于 Hadoop 的分布式计算，必须监控的服务有两个，即 resourcemanager 和 nodemanager。这里首先介绍如何监控 resourcemanager 服务，对该服务的监控，主要是监控 resourcemanager 对 JVM 内存资源的使用状态，当 JVM 使用资源过大时，需要考虑计算资源是否充足，是否存在异常任务等。",-1),_s=s("p",null,"因此这里我主要监控 resourcemanager 的 JVM 使用状态，要监控 resourcemanager 的 JVM 内存资源状态，需借助一个脚本 check_hadoop_yarn_resource_manager_heap.pl，此脚本已包含在上面那个下载地址中。",-1),Es=s("p",null,"接着，在 Centreon Web 界面选择 Configuration→Commands→Checks，然后点击 Add 按钮新建一个 Command，如下图所示：",-1),ys=s("p",null,"在上图中，通过创建一个命令将 check_hadoop_yarn_resource_manager_heap.pl 脚本引用进来了，其中 -t 参数表示超时时间。",-1),gs=s("p",null,"然后，开始创建监控 resourcemanager 的 JVM 内存状态的服务，这里我创建的服务名称是 check_yarn_resourcemanager_heap，将此服务连接到 172.16.213.41 主机上，如下图所示：",-1),Cs=s("ul",null,[s("li",null,[s("p",null,"ARG1 参数代表的含义是超时时间，单位是秒；")]),s("li",null,[s("p",null,"ARG2 参数代表的含义是警告阈值，这个值是百分比；")]),s("li",null,[s("p",null,"ARG3 参数代表的含义是故障阈值，对应的值也是百分比。")])],-1),ms=s("p",null,"最后，再来看看如何监控 Nodemanager，在实际运行中，也会出现各种问题，比如 Nodemanager 所在的节点可能出现磁盘只读，此时该节点就会自动进入黑名单，或者出现内存溢出，Nodemanager 服务就会自动退出。针对这些情况，运维需要及时发现、及时处理，所以对 Nodemanager 的监控至关重要，同样，需要借助一个脚本 check_hadoop_yarn_node_managers.pl，此脚本已包含在上面那个下载地址中。",-1),hs=s("p",null,"然后，在 Centreon Web 界面选择 Configuration→Commands→Checks，点击 Add 新建一个 Command，如下图所示。",-1),As=s("p",null,"命令创建完毕后，接下来开始创建服务，引入此命令，这里创建一个 check_yarn_lostnodemanager 服务，如下图所示：",-1),us=s("p",null,"注意，check_hadoop_yarn_node_managers.pl 脚本的实现是对 Nodemanager 的监控，借助了 Yarn 的 8080 端口，因此，这里监控连接主机是 172.16.213.41，而 ARG1、ARG2 和 ARG3 的含义依次是超时时间、警告阈值和故障阈值。",-1),Fs=s("h3",{id:"小结",tabindex:"-1"},[n("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),Ts=s("p",null,"本课时主要讲解了监控系统 Centreon 的使用，以及如何在 Centreon 上监控 Hadoop 的 NameNode、Datanode、resourcemanager 及 nodemanager 服务，通过 Ganglia 获取 Hadoop 集群数据，然后结合 Centreon，就可以实现将监控指标进行实时告警，Ganglia+Centreon 的组合是大数据运维监控环境下最常用的开源监控方案。",-1);function Ds(Ss,Ns,fs,$s,Ms,bs){const o=t("Image");return p(),r("div",null,[i,a(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/31/40/Ciqc1F8MJ2CAGSnuAAC9gzfBQlQ489.png"}),n(),d,a(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/31/4C/CgqCHl8MJ26AHCCqAAD_j9g5ftM359.png"}),n(),_,a(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/31/4C/CgqCHl8MJ3yAD55vAAFjuxr2vSc728.png"}),n(),E,y,g,a(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MJ4WAPpG_AACJmxWWjTw282.png"}),n(),C,m,a(o,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/31/4C/CgqCHl8MJ4yAAvATAAED2BFrWBs804.png"}),n(),h,A,u,F,a(o,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/31/4C/CgqCHl8MJ5aAG2JFAAB3Wpx7NW0860.png"}),n(),T,a(o,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/31/4C/CgqCHl8MJ52AJ2afAACH_k5NHDY004.png"}),n(),D,a(o,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MJ6mAfBKWAADpboC-JtU628.png"}),n(),S,a(o,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/31/4C/CgqCHl8MJ7KAY8FnAADrvlGcMT8676.png"}),n(),N,f,$,a(o,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MJ7qACxTbAAColsW9skw633.png"}),n(),M,b,I,a(o,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/31/4C/CgqCHl8MJ8KASx5iAACVP09wINM609.png"}),n(),q,k,a(o,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MJ8mARqRMAAC6X0tO3SE756.png"}),n(),H,w,B,P,v,O,a(o,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MJ9WAW61VAACC6D8QegE514.png"}),n(),x,R,V,G,W,J,K,a(o,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MJ-CAZ2SlAAPd-zgTfWQ531.png"}),n(),z,a(o,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MJ_WAM4zBAAD42CE0h0w232.png"}),n(),L,a(o,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/31/4C/CgqCHl8MKAKAehgTAADUjp4Zai8527.png"}),n(),U,a(o,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MKA-AbuTSAAB_V8r-Byo174.png"}),n(),Y,j,a(o,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MKB2AfXHWAACXUmkpvI8605.png"}),n(),Q,X,a(o,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image/M00/31/4C/CgqCHl8MKCaAcMG-AACXEMM6sZk815.png"}),n(),Z,ss,a(o,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MKC-AT5piAACYdEMrjg0735.png"}),n(),ns,os,a(o,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MKDmAfrqoAACdrufBttk823.png"}),n(),as,es,ls,ts,a(o,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image/M00/31/41/Ciqc1F8MKECAYyK9AACLCC4dm1E937.png"}),n(),ps,rs,a(o,{alt:"Drawing 22.png",src:"https://s0.lgstatic.com/i/image/M00/31/4D/CgqCHl8MKEmAMGYSAAC_xRN_7N0307.png"}),n(),cs,is,ds,_s,Es,a(o,{alt:"Drawing 23.png",src:"https://s0.lgstatic.com/i/image/M00/31/4D/CgqCHl8MKFKAIpf-AACVOvlvoHA808.png"}),n(),ys,gs,Cs,a(o,{alt:"Drawing 24.png",src:"https://s0.lgstatic.com/i/image/M00/31/42/Ciqc1F8MKFiAWR2AAADF6D_v1EE800.png"}),n(),ms,hs,a(o,{alt:"Drawing 25.png",src:"https://s0.lgstatic.com/i/image/M00/31/42/Ciqc1F8MKGCAcn4YAACTldjW08M979.png"}),n(),As,a(o,{alt:"Drawing 26.png",src:"https://s0.lgstatic.com/i/image/M00/31/4D/CgqCHl8MKGaACKiHAADDsCLyqiM045.png"}),n(),us,Fs,Ts])}const ks=l(c,[["render",Ds]]);export{qs as __pageData,ks as default};

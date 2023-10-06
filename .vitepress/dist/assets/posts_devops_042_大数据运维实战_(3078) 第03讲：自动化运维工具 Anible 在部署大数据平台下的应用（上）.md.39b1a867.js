import{_ as s,j as a,o as p,g as n,k as t,Q as e}from"./chunks/framework.b3d8e22e.js";const S=JSON.parse('{"title":"大数据环境下海量服务器如何运维 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3078) 第03讲：自动化运维工具 Anible 在部署大数据平台下的应用（上）.md","filePath":"posts/devops/042_大数据运维实战/(3078) 第03讲：自动化运维工具 Anible 在部署大数据平台下的应用（上）.md","lastUpdated":1696417798000}'),r={name:"posts/devops/042_大数据运维实战/(3078) 第03讲：自动化运维工具 Anible 在部署大数据平台下的应用（上）.md"},l=e(`<p>本课时主要介绍自动化运维工具 Ansible 在部署大数据平台下的应用。</p><h3 id="大数据环境下海量服务器如何运维" tabindex="-1">大数据环境下海量服务器如何运维 <a class="header-anchor" href="#大数据环境下海量服务器如何运维" aria-label="Permalink to &quot;大数据环境下海量服务器如何运维&quot;">​</a></h3><p>谷歌、Facebook 等大厂一个运维人员管理的服务器在上万台左右，这么多的服务器使用手工的方法去维护是很难做到的，那么他们是怎么运维这么多台服务器的呢？真相只有一个：使用自动化运维工具。大数据运维同样也是如此。</p><p>目前主流的自动化运维管理工具有 Puppet、Saltstack、Ansible 等，它们各有优缺点，这里我们选用 Ansible 作为大数据运维平台的自动化运维工具。</p><p>Ansible 是基于 Python 语言开发的，只需要在一台普通的服务器上运行即可，不需要在客户端服务器上安装客户端。因为 Ansible 是基于 SSH 远程管理，而 Linux 服务器基本都开启了 SSH 服务，所以 Ansible 不需要为配置工作添加额外的支持。</p><h3 id="ansible-命令行模式的使用" tabindex="-1">Ansible 命令行模式的使用 <a class="header-anchor" href="#ansible-命令行模式的使用" aria-label="Permalink to &quot;Ansible 命令行模式的使用&quot;">​</a></h3><p>Ansible 执行自动化任务，分为以下两种执行模式：</p><p>（1）<strong>ad-hoc（单个模块）</strong> ，单条命令的批量执行，或者叫命令行模式；</p><p>（2）<strong>playbook</strong>，为面向对象的编程，可以把多个想要执行的任务放到一个 playbook 中，当然多个任务在事物逻辑上最好是有上下关联的，通过多个任务可以完成一个总体的目标。</p><p>命令行模式一般用于测试、临时应用等场景，而 playbook 方式，主用用于正式环境，通过编写 playbook 文件，可实现固定的、批量的对系统或服务进行配置以及维护工作。</p><p>本课时将从头讲 Ansible，使用时需要注意两个概念：<strong>管理机</strong> 和<strong>远程主机</strong>。管理机是安装 Ansible 的机器，远程主机是 Ansible 批量操作的对象，可以是一个或一组主机。Ansible 通过管理机发出批量操作远程主机的指令，这些指令在每个远程主机上依次执行。</p><h4 id="_1-ansible-的执行流程与配置文件" tabindex="-1">1. Ansible 的执行流程与配置文件 <a class="header-anchor" href="#_1-ansible-的执行流程与配置文件" aria-label="Permalink to &quot;1. Ansible 的执行流程与配置文件&quot;">​</a></h4><p>Ansible 的安装非常简单，执行如下命令即可：</p><pre><code>[root@master ~]# yum install epel-release
</code></pre><p>然后即可通过 yum 工具安装 Ansible：</p><pre><code>[root@master ~]# yum install ansible
</code></pre><p>安装好的 Ansible 配置文件位于 /etc/ansible 目录下，需要重点关注的有 ansible.cfg、hosts 文件。</p><p>（1）hosts 文件（以下 hosts 文件均指 /etc/ansible/hosts 文件）</p><p>该文件用来定义 Ansible 批量操作的主机列表，主机列表有多种书写方式，最简单的格式如下：</p><pre><code>[webservers]
ixdba1.net
ixdba2.net 

[dbservers]
db.ixdba1.net
db.ixdba2.net
</code></pre><p>中括号中的名字代表<strong>组名</strong>，可以根据需求将庞大的主机分成具有标识的组。比如上面分了两个组 webservers 和 dbservers 组。</p><p>主机（hosts）部分可以使用域名、主机名、IP 地址表示；当然使用前两者时，需要主机能反解析到相应的 IP 地址，一般此类配置中多使用 IP 地址；未分组的机器需保留在 hosts 的顶部。</p><p>也可在 hosts 文件中，指定主机的范围，示例如下：</p><pre><code>[web]
www[01:50].ixdba.net
[db]
db[a:f].ixdba.ent
</code></pre><p>这个配置中，web 主机组的主机为 www01.ixdba.net、www02.ixdba.net、www03.ixdba.net 等以此类推，一直到 www50.ixdba.net。下面的 db 组中的 a:f 表示从 a 到 f 的字符。</p><p>在 hosts 文件中，还可以使用变量，变量分为<strong>主机变量</strong> 和<strong>组变量</strong>两种类型，常用的变量如下表所示：</p>`,26),i=e(`<p>例如，在 hosts 中可以这么使用变量：</p><pre><code>[test]
192.168.1.1 ansible_ssh_user=root ansible_ssh_pass=&#39;abc123&#39;
192.168.1.2 ansible_ssh_user=breeze ansible_ssh_pass=&#39;123456&#39;
</code></pre><p>（2）ansible.cfg 文件</p><p>此文件定义了 Ansible 主机的默认配置熟悉，比如默认是否需要输入密码、是否开启 sudo 认证、action_plugins 插件的位置、hosts 主机组的位置、是否开启 log 功能、默认端口、key 文件位置等。一般情况下这个文件无需修改，保存默认即可。</p><p>注意：host_key_checking 表示是否关闭第一次使用 Ansible 连接客户端时 yes/no 的连接确认提示，False 表示关闭，我们只需要去掉此选项的注释即可。这个问题其实是 SSH 连接的问题，因为 Linux 下的主机在第一次 SSH 连接到一个新的主机时，一般会需要 yes/no 的连接确认，这在自动化运维中是不需要的，因此需要禁止这种确认。在 Ansible 中通过设置 host_key_checking 为 False 就可以避免这种情况。</p><h4 id="_2-commands-模块" tabindex="-1">2. commands 模块 <a class="header-anchor" href="#_2-commands-模块" aria-label="Permalink to &quot;2. commands 模块&quot;">​</a></h4><p>命令行下执行 ansible，基本格式如下：</p><pre><code>ansible 主机或组  -m 模块名 -a &#39;模块参数&#39;  ansible参数
</code></pre><p>其中：</p><ul><li><p>主机或组，在 /etc/ansible/hosts 里进行指定；</p></li><li><p>模块名，可以通过 ansible-doc -l 查看目前安装的模块，默认不指定时，使用的是 command 模块；</p></li><li><p>模块参数，可以通过 &quot;ansible-doc 模块名&quot;查看具体用法。</p></li></ul><p>ansible 常用的参数如下表所示：</p>`,11),c=e(`<p>下面看几个使用 command 模块的例子：</p><pre><code>ansible 172.16.213.157 -m command  -a &#39;pwd&#39;
ansible 172.16.213.157 -m command -a &#39;chdir=/tmp/ pwd&#39;
ansible 172.16.213.157 -m command  -a &#39;chdir=/var/www tar zcvf /data/html.tar.gz html&#39;
ansible 172.16.213.157  -m command  -a &#39;creates=/tmp/tmp.txt date&#39;
ansible 172.16.213.157  -m command  -a &#39;removes=/tmp/tmp.txt date&#39;
ansible 172.16.213.157  -m command  -a &#39;ps -ef|grep sshd&#39; （此命令会执行失败）
</code></pre><p>上面的例子是对主机 172.16.213.157 进行的操作，在实际应用中需要替换为主机组。另外，还用到了 command 模块的几个选项：</p><ul><li><p>creates，后跟一个文件名，当远程主机上存在这个文件时，该命令不执行，否则执行；</p></li><li><p>chdir，在执行指令之前，先切换到该指定的目录；</p></li><li><p>removes，后跟一个文件名，当该文件存在时，该选项执行，否则不执行。</p></li></ul><p>注意：commands 模块的执行，在远程主机上，需有 Python 环境的支持。该模块通过在 -a 参数后面跟上要在远程机器上执行的命令即可完成远程操作，不过命令里如果带有特殊字符（&quot;&lt;&quot;、&quot;&gt;&quot;、&quot;|&quot;、&quot;&amp;&quot;等），则执行不成功，也就是 commands 模块不支持这些特殊字符。上面最后那个例子无法执行成功就是这个原因。</p><h4 id="_3-shell-模块" tabindex="-1">3. shell 模块 <a class="header-anchor" href="#_3-shell-模块" aria-label="Permalink to &quot;3. shell 模块&quot;">​</a></h4><p>shell 模块的功能和用法与 command 模块一样，不过 shell 模块执行命令的时候使用的是 /bin/sh，该模块可以执行任何命令。看下面几个例子：</p><pre><code>ansible 172.16.213.233  -m shell  -a &#39;ps -ef|grep sshd&#39; (此命令可执行成功）
ansible 172.16.213.233  -m shell  -a &#39;sh /tmp/install.sh &gt;/tmp/install.log&#39;
</code></pre><p>最后这个例子是执行远程机器上的脚本，其路径为 /tmp/install.sh（远程主机上的脚本，非本机的），然后将执行命令的结果存放在远程主机路径 /tmp/install.log 中，注意在进行保存文件的时候，写上全路径，否则就会保存在登录之后的默认路径中。官方文档表示 command 用起来更安全，更有可预知性，但从我使用角度来说，并没发现有多大差别。</p><h4 id="_4-raw-模块和-script-模块" tabindex="-1">4. raw 模块和 script 模块 <a class="header-anchor" href="#_4-raw-模块和-script-模块" aria-label="Permalink to &quot;4. raw 模块和 script 模块&quot;">​</a></h4><p>raw 模块功能与 command 和 shell 模块类似，shell 能够完成的操作，raw 也都能完成。不同的是，raw 模块不需要远程主机上的 Python 环境。</p><p>Ansible 要执行自动化操作，需在管理机上安装 Ansible，客户机上安装 Python，如果客户机上没有安装，那么 command、shell 模块将无法工作，但 raw 可以正常工作。因此，若有的机器没有装 Python，或者装的版本在 2.4 以下，就可以使用 raw 模块来装 Python、python-simplejson 等。</p><p>若有些机器根本安装不了 Python 的话（如交换机、路由器等），那么，直接用 raw 模块是最好的选择。下面看几个例子：</p><pre><code>[root@localhost ansible]#ansible 172.16.213.107 -m raw -a &quot;ps -ef|grep sshd|awk &#39;{print \\$2}&#39;&quot; 
[root@localhost ansible]#ansible 172.16.213.107 -m raw -a &quot;yum -y  install python26&quot; --k
</code></pre><p>script 模块是将管理端的 shell 脚本拷贝到被管理的远程主机上执行，其原理是先将 shell 复制到远程主机，再在远程主机上执行。此模块的执行，不需要远程主机上的 Python 环境。看下面这个例子：</p><pre><code>[root@localhost ansible]# ansible 172.16.213.233  -m script   -a  &#39; /mnt/install1.sh &gt;/tmp/install1.log&#39;
</code></pre><p>脚本 /tmp/install1.sh 在管理端本机上，script 模块执行的时候将脚本传送到远程的 172.16.213.233 主机中，然后执行这个脚本，同时，将执行的输出日志文件保存在远程主机对应的路径 /tmp/install.log 下，这里保存日志文件的时候，最好用全路径。</p><h4 id="_5-file-模块、copy-模块与-synchronize-模块" tabindex="-1">5. file 模块、copy 模块与 synchronize 模块 <a class="header-anchor" href="#_5-file-模块、copy-模块与-synchronize-模块" aria-label="Permalink to &quot;5. file 模块、copy 模块与 synchronize 模块&quot;">​</a></h4><p><strong>file 模块</strong>功能强大，主要用于远程主机上的文件或目录操作，该模块包含如下选项：</p>`,19),d=e(`<p>下面来看几个使用示例。</p><p>（1）创建一个不存在的目录，并进行递归授权：</p><pre><code>[root@localhost ansible]# ansible 172.16.213.233 -m file -a &quot;path=/mnt/abc123 state=directory&quot;
[root@localhost ansible]# ansible 172.16.213.233 -m file -a &quot;path=/mnt/abc123 owner=nobody  group=nobody  mode=0644 recurse=yes&quot;
[root@localhost ansible]# ansible 172.16.213.233 -m file -a &quot;path=/mnt/ansibletemp  owner=sshd  group=sshd mode=0644 state=directory &quot;
</code></pre><p>（2）创建一个文件（如果不存在），并进行授权：</p><pre><code>[root@localhost ansible]# ansible 172.16.213.233 -m file -a &quot;path=/mnt/syncfile.txt mode=0444&quot;
</code></pre><p>（3）创建一个软连接（将 /etc/ssh/sshd_config 软连接到 /mnt/sshd_config）：</p><pre><code>[root@localhost ansible]#ansible 172.16.213.233 -m file -a &quot;src=/etc/ssh/sshd_config dest=/mnt/sshd_config  owner=sshd state=link&quot;
</code></pre><p>（4）删除一个压缩文件：</p><pre><code>[root@localhost ansible]#ansible 172.16.213.233 -m file -a &quot;path=/tmp/backup.tar.gz  state=absent&quot;
</code></pre><p>（5）创建一个文件：</p><pre><code>[root@localhost ansible]#ansible 172.16.213.233 -m file -a &quot;path=/mnt/ansibletemp state=touch&quot;
</code></pre><p>接着继续来看 <strong>copy 模块</strong>，此模块用来复制文件到远程主机，copy 模块包含的选项如下表所示：</p>`,12),m=e(`<p>下面是几个例子。</p><p>（1）拷贝文件并进行权限设置。</p><pre><code>[root@localhost ansible]#ansible 172.16.213.233 -m copy -a &#39;src=/etc/sudoers dest=/mnt/sudoers owner=root group=root mode=440 backup=yes&#39;
</code></pre><p>copy 默认会对存在的备份文件进行覆盖，通过 backup=yes 参数可以在覆盖前，对之前的文件进行自动备份。</p><p>（2）拷贝文件之后进行验证。</p><pre><code>[root@localhost ansible]#ansible 172.16.213.233 -m copy -a &quot;src=/etc/sudoers dest=/mnt/sudoers  validate=&#39;visudo -cf  %s&#39;&quot;
</code></pre><p>这里用了 validate 参数，表示在复制之前验证要拷贝的文件是否正确。如果验证通过则复制到远程主机上，%s 是一个文件路径的占位符，在文件被复制到远程主机之前，它会被替换为 src 后面的文件。</p><p>（3）拷贝目录并进行递归设定目录的权限。</p><pre><code>[root@localhost ansible]#ansible 172.16.213.233 -m copy -a &#39;src=/etc/yum dest=/mnt/ owner=hadoop group=hadoop  directory_mode=644&#39; 
[root@localhost ansible]#ansible 172.16.213.233 -m copy -a &#39;src=/etc/yum/ dest=/mnt/bak owner=hadoop group=hadoop directory_mode=644&#39;
</code></pre><p>上面这两个命令执行是有区别的，第一个是拷贝管理机的 /etc/yum 目录到远程主机的 /mnt 目录下；第二个命令是拷贝管理机 /etc/yum 目录下的所有文件或子目录到远程主机的 /mnt/bak 目录下。</p><p>copy 模块拷贝小文件还可以，如果拷贝大文件或者目录的话，速度很慢，不建议使用。此时推荐使用 <strong>synchronize 模块</strong>，此模块通过调用 rsync 进行文件或目录同步，同步速度很快，还指出增量同步，该模块常用的选项如下表所示：</p>`,11),_=e(`<p>下面看几个例子。</p><p>（1）同步本地的 /mnt/rpm 到远程主机</p><pre><code>172.16.213.77 的 /tmp 目录下。
ansible 172.16.213.77 -m synchronize -a &#39;src=/mnt/rpm  dest=/tmp&#39;
</code></pre><p>（2）将远程主机 172.16.213.77 上 /mnt/a 文件拷贝到本地的 /tmp 目录下。</p><pre><code>ansible 172.16.213.77 -m synchronize -a &#39;mode=pull src=/mnt/a  dest=/tmp&#39;
</code></pre><h4 id="_6-cron-模块、yum-模块与-service-模块" tabindex="-1">6. cron 模块、yum 模块与 service 模块 <a class="header-anchor" href="#_6-cron-模块、yum-模块与-service-模块" aria-label="Permalink to &quot;6. cron 模块、yum 模块与 service 模块&quot;">​</a></h4><p><strong>cron 模块</strong>用于管理计划任务，常用选项含义如下表所示：</p>`,7),u=e(`<p>下面是几个示例。</p><p>（1）系统重启时执行 /data/bootservice.sh 脚本。</p><pre><code>ansible 172.16.213.233  -m cron -a &#39;name=&quot;job for reboot&quot; special_time=reboot  job=&quot;/data/bootservice.sh&quot; &#39;
</code></pre><p>此命令执行后，会在 172.16.213.233 的 crontab 中写入&quot;@reboot /data/bootservice.sh&quot;，通过&quot;crontab -l &quot;可以查看到。</p><p>（2）表示在每周六的 1:20 分执行&quot;yum -y update&quot;操作。</p><pre><code>ansible 172.16.213.233  -m cron -a &#39;name=&quot;yum autoupdate&quot; weekday=&quot;6&quot; minute=20 hour=1 user=&quot;root&quot; job=&quot;yum -y update&quot;&#39;
</code></pre><p>（3）表示在每周六的 1:30 分以 root 用户执行 &quot;/home/ixdba/backup.sh&quot; 脚本。</p><pre><code>ansible 172.16.213.233  -m cron -a  &#39;backup=&quot;True&quot; name=&quot;autobackup&quot; weekday=&quot;6&quot; minute=30  hour=1 user=&quot;root&quot; job=&quot;/home/ixdba/backup.sh&quot;&#39;
</code></pre><p>（4）会在 /etc/cron.d 创建一个 check_http_for_ansible 文件，表示每天的 12：30 分通过 root 用户执行 /home/ixdba/check_http.sh 脚本。</p><pre><code>ansible 172.16.213.233  -m cron -a  &#39;name=&quot;checkhttp&quot; minute=30 hour=12 user=&quot;root&quot; job=&quot;/home/ixdba/check_http.sh&quot; cron_file=&quot;check_http_for_ansible&quot; &#39;
</code></pre><p>（5）删除一个计划任务。</p><pre><code>ansible 172.16.213.233  -m cron  -a  &#39;name=&quot;yum  update&quot; state=absent&#39;
</code></pre><p>接着，再看看 <strong>yum 模块</strong>的使用，此模块用来通过 yum 包管理器来管理软件包，常用选项以及含义如下表所示：</p>`,13),h=e(`<p>下面是几个示例。</p><p>（1）通过 yum 安装 Redis。</p><pre><code>ansible 172.16.213.77 -m yum -a &quot;name=redis state=installed&quot;
</code></pre><p>（2）通过 yum 卸载 Redis。</p><pre><code>ansible 172.16.213.77 -m yum -a &quot;name=redis state=removed&quot;
</code></pre><p>（3）通过 yum 安装 Redis 最新版本，并设置 yum 源。</p><pre><code>ansible 172.16.213.77 -m yum -a &quot;name=redis state=latest enablerepo=epel&quot;
</code></pre><p>（4）通过指定地址的方式安装 bash。</p><pre><code>ansible 172.16.213.78 -m yum -a &quot;name=http://mirrors.aliyun.com/centos/7.4.1708/os/x86_64/Packages/bash-4.2.46-28.el7.x86_64.rpm&quot;  state=present&#39;
</code></pre><p>最后看看 <strong>service 模块</strong>，此模块用于管理远程主机上的服务，该模块包含如下选项：</p>`,10),b=e(`<p>下面是几个使用示例。</p><p>（1）启动 httpd 服务。</p><pre><code>ansible 172.16.213.233  -m service -a &quot;name=httpd  state=started&quot;
</code></pre><p>（2）设置 httpd 服务开机自启。</p><pre><code>ansible 172.16.213.233  -m service -a &quot;name=httpd  enabled=yes&quot;
</code></pre><h4 id="_7-setup-模块获取-ansible-facts-信息" tabindex="-1">7. setup 模块获取 Ansible facts 信息 <a class="header-anchor" href="#_7-setup-模块获取-ansible-facts-信息" aria-label="Permalink to &quot;7. setup 模块获取 Ansible facts 信息&quot;">​</a></h4><p>Ansible facts 是远程主机上的系统信息，主要包含 IP 地址、操作系统版本、网络设备、Mac 地址、内存、磁盘、硬件等信息，这些信息根据远程主机的信息来作为执行条件操作的场景，非常有用。比如，我们可以根据远程主机的操作系统版本，选择安装不同版本的软件包，或者收集远程主机上每个主机的主机名、IP 地址等信息。</p><p>那么如何获取 Ansible facts 信息呢，其实，Ansible 提供了一个 setup 模块来收集远程主机的系统信息，这些 facts 信息可以直接以变量的形式使用。</p><p>下面是两个使用的例子。</p><p>（1）查看主机内存信息。</p><pre><code>[root@localhost ~]# ansible 172.16.213.77 -m setup -a &#39;filter=ansible_*_mb&#39;
</code></pre><p>（2）查看接口为 eth0-2 的网卡信息。</p><pre><code>[root@localhost ~]# ansible 172.16.213.77 -m setup -a &#39;filter=ansible_em[1-2]&#39;
</code></pre><p>在后面 ansible-playbook 内容中会讲到的 playbooks 脚本中，经常会用到一个参数 gather_facts，其与该模块相关。gather_facts 默认值为 yes，也就是说，在使用 Ansible 对远程主机执行任何一个 playbook 之前，总会先通过 setup 模块获取 facts，并将信息暂存在内存中，直到该 playbook 执行结束为止。</p><h4 id="_8-user-模块与-group-模块" tabindex="-1">8. user 模块与 group 模块 <a class="header-anchor" href="#_8-user-模块与-group-模块" aria-label="Permalink to &quot;8. user 模块与 group 模块&quot;">​</a></h4><p>user 模块请求的是 useradd、userdel、usermod 三个指令；group 模块请求的是 groupadd、groupdel、groupmod 三个指令，常用的选项如下表所示：</p>`,16),q=e(`<p>下面看几个使用例子。</p><p>（1）创建一个用户 usertest1。</p><pre><code>ansible 172.16.213.77 -m user -a &quot;name=usertest1&quot;
</code></pre><p>（2）创建用户 usertest2，并设置附加组。</p><pre><code>ansible 172.16.213.77 -m user -a &quot;name=usertest2 groups=admins,developers&quot;
</code></pre><p>（3）删除用户 usertest1 的同时，删除用户根目录。</p><pre><code>ansible 172.16.213.77 -m user -a &quot;name=usertest1 state=absent remove=yes&quot;
</code></pre><p>（4）批量修改用户密码。</p><pre><code>[root@localhost ~]# echo &quot;linux123www&quot; | openssl passwd -1 -salt $(&lt; /dev/urandom tr -dc &#39;[:alnum:]&#39; | head -c 32)  -stdin
$1$yjJ74Wid$x0QUaaHzA8EwWU2kG6SRB1
[root@localhost ~]# ansible 172.16.213.77 -m user -a &#39;name=usertest2 password=&quot;$1$yjJ74Wid$x0QUaaHzA8EwWU2kG6SRB1&quot; &#39;
</code></pre><p>其中：</p><ul><li><p>-1 表示采用的是 MD5 加密算法；</p></li><li><p>-salt 指定 salt 值，在使用加密算法进行加密时，即使密码一样，由于 salt 不一样，所以计算出来的 hash 值也不一样，除非密码一样，salt 值也一样，计算出来的 hash 值才一样；</p></li><li><p>&quot;&lt; /dev/urandom tr -dc &#39;[:alnum:]&#39; | head -c 32&quot;产生一个随机的 salt；</p></li><li><p>passwd 的值不能是明文，passwd 关键字后面应该是密文，密文会被保存在 /etc/shadow 文件中。</p></li></ul>`,11);function g(y,A,f,T,w,k){const o=a("Image");return p(),n("div",null,[l,t(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/03/67/Ciqc1F6ymYGARYRfAADTCcT_OiU686.png"}),i,t(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/03/67/Ciqc1F6ymbKAVGbBAABzkfSBzI0956.png"}),c,t(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/03/67/Ciqc1F6ymbyAZnsjAADR82NzfYs881.png"}),d,t(o,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/03/67/CgqCHl6ymcWACCIrAADKD50ilXs502.png"}),m,t(o,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/03/67/Ciqc1F6ymc-ASlixAACl5fUyJTc535.png"}),_,t(o,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/03/67/CgqCHl6ymdaAVk-7AADD-BQ8C_I997.png"}),u,t(o,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/03/67/Ciqc1F6ymeCAVigQAABvIKwywc4267.png"}),h,t(o,{alt:"8.png",src:"https://s0.lgstatic.com/i/image/M00/03/67/CgqCHl6ymeiAVnH0AABcfgAi7w8829.png"}),b,t(o,{alt:"9.png",src:"https://s0.lgstatic.com/i/image/M00/03/67/Ciqc1F6ymiiAGJ-ZAABuQlJA8dE663.png"}),q])}const C=s(r,[["render",g]]);export{S as __pageData,C as default};

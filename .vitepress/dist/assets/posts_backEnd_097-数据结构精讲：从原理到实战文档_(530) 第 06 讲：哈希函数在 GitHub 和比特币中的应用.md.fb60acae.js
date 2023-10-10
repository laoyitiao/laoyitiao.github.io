import{_ as a,j as o,o as r,g as i,k as s,h as n,Q as c,s as t}from"./chunks/framework.cfb14fe0.js";const G=JSON.parse('{"title":"第06讲：哈希函数在GitHub和比特币中的应用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(530) 第 06 讲：哈希函数在 GitHub 和比特币中的应用.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(530) 第 06 讲：哈希函数在 GitHub 和比特币中的应用.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(530) 第 06 讲：哈希函数在 GitHub 和比特币中的应用.md"},u=c('<h1 id="第06讲-哈希函数在github和比特币中的应用" tabindex="-1">第06讲：哈希函数在GitHub和比特币中的应用 <a class="header-anchor" href="#第06讲-哈希函数在github和比特币中的应用" aria-label="Permalink to &quot;第06讲：哈希函数在GitHub和比特币中的应用&quot;">​</a></h1><p>你好，我是你的数据结构课老师蔡元楠，欢迎进入第 06 课时的内容&quot;哈希函数在 GitHub 和比特币中的应用&quot;。</p><p>在上一讲中，我们一起学习了哈希函数这个概念，哈希函数不只是在生成哈希表这种数据结构中扮演着重要的角色，它其实在密码学中也起着关键性的作用。密码学这个概念听上去离我们很遥远，但其实它已经被应用在我们身边各式各样的软件中。所以这一讲我们一起来看看哈希函数是如何被应用在 GitHub 中的，以及再看看链表和哈希函数在比特币中是怎么应用的。</p><h3 id="加密哈希函数" tabindex="-1">加密哈希函数 <a class="header-anchor" href="#加密哈希函数" aria-label="Permalink to &quot;加密哈希函数&quot;">​</a></h3><p><strong>一个哈希函数如果能够被安全地应用在密码学中，我们称它为加密哈希函数</strong>（Cryptographic Hash Function）。&quot;数字摘要&quot;这个名词，你应该不会陌生，它也是通过加密哈希函数，由任意长度的一个信息转换出来的一个固定长度的哈希值。</p><p>数字摘要通常是用于检验一段数据或者一个文件的完整性（Integrity）的，而验证数据文件完整性就是利用了哈希函数里的其中一个特性：&quot;<strong>两个相同的对象作为哈希函数的输入，它们总会得到一样的哈希值</strong> &quot;。而当这个数据文件里面的任何一点内容被修改之后，通过哈希函数所产生的哈希值也就不一样了，从而我们就可以判定这个数据文件是被修改过的文件。在很多地方，我们也会称这样的哈希值为检验和（Checksum）。当然了，我们也不能忘了哈希函数的另外一个特性：&quot;<strong>两个不同的对象作为哈希函数的输入，它们不一定会得到不同的哈希值</strong>&quot;。</p><p>常见的加密哈希函数算法，有 MD（Message Digest）算法和 SHA（Secure Hash Algorithm）算法。</p><blockquote><p>MD 算法可以通过输入产生一个 128 位的哈希值出来，用于确保信息传输的完整性；而在 SHA 算法中，比较常见的有 SHA-1、SHA-256 算法等，它们也是可以通过输入而产生一个 160 位或者 256 位的哈希值出来，它们与 MD 算法一样，都是用于确保信息传输的完整性，对这些算法感兴趣的同学，可以自行延伸阅读 <a href="https://baike.baidu.com/item/MD5/212708" target="_blank" rel="noreferrer">MD</a> 和 <a href="https://baike.baidu.com/item/SHA%E5%AE%B6%E6%97%8F" target="_blank" rel="noreferrer">SHA</a> 的百科资料。</p></blockquote><p>这些加密哈希函数算法，它们所做的事情并不是要为每一个数据文件都生成一个唯一的哈希值出来，而是通过这些加密哈希函数算法，使得不同的数据文件生成出来的哈希值产生哈希碰撞的概率非常的小，小到几乎不可能。这样的话，我们就有把握说，<strong>当两份数据文件通过加密哈希函数所生成出来的哈希值一致时，这两份数据文件就是同一份数据文件</strong>。</p><h3 id="sha-1-加密算法" tabindex="-1">SHA-1 加密算法 <a class="header-anchor" href="#sha-1-加密算法" aria-label="Permalink to &quot;SHA-1 加密算法&quot;">​</a></h3><p>但是如果有一天，我们可以人为地去修改数据文件，让两份不同的文件通过加密哈希函数之后生成同样的哈希值，那采用这些加密哈希函数去做验证的应用就有可能会被别有用心的黑客所攻击了。在 2017 年的时候，SHA-1 加密算法被正式宣布攻破了，这意味着什么呢？这意味着那些采用 SHA-1 加密算法去验证数据完整性的应用有可能会被人为地制造哈希碰撞而遭到攻击。</p><p>采用 SHA-1 加密算法来做数据完整性验证的一个很著名的应用就是 Git。简单地说，Git 采用了 SHA-1 算法来对每一个文件对象都进行了一次哈希值运算，所以每一个提交的文件都会有自己的一个哈希值。在 Git 里面要找到一个文件对象其实是通过哈希值来寻找的。</p><p>而在我们提交代码，运行&quot;git commit&quot;命令的时候，Git 会将所有的这些文件，外加一些元数据（Metadata）再做一次 SHA-1 运算来得到一个新的哈希值，这些元数据里就包括了上一次 commit 时所生成的哈希值。将上一次 commit 所产生的哈希值也包括进来主要为了防止有人恶意地去修改中间的一些 commit，这样，所有后面的 commit 就可以发现，自己所保存的上一次 commit 的哈希值和被修改过的 commit 的哈希值不一致了，也就是说中间的 commit 被人篡改了。</p><h3 id="github-面临的问题" tabindex="-1">GitHub 面临的问题 <a class="header-anchor" href="#github-面临的问题" aria-label="Permalink to &quot;GitHub 面临的问题&quot;">​</a></h3><p>现在我们知道了，Git 其实是通过 SHA-1 算法所产生的哈希值去找到一个文件对象的，那如果有恶意程序可以对两个不同的文件制造出相同的哈希值，也就是产生哈希碰撞，这样 Git 就无法确定到底哪一个文件才是&quot;真的&quot;。</p><p>著名的代码软件托管平台 GitHub 其实也面临着同样的问题。当然了，根据 2017 年所公布的实验结果，真的要人为的去制造一个 SHA-1 哈希冲突攻击的话，现阶段的代价是非常昂贵的，比方说需要耗费 6500 年的单核 CPU 计算时间，或者说需要消耗 110 年的单核 GPU 计算时间，所以单单靠着暴力枚举的方法是不太可行的。</p><p>而根据 Github.com 的报告，一些针对 Github.com 的碰撞攻击其实是运用了一些特殊的技巧来减少这些运算时间，而这些攻击里面都会有一个固定的&quot;字节模式&quot;可循。所以 GitHub.com 会针对每一个上传的文件都执行一种 SHA-1 碰撞的检测，而他们所用的检测工具也是开源的（<a href="https://github.com/cr-marcstevens/sha1collisiondetection" target="_blank" rel="noreferrer">检测工具源代码</a>）。</p><p>Linux 和 Git 之父 Linus 也对于 SHA-1 被攻破发表了一些自己的看法，下面我也附上了他本人亲自回复的一封邮件，感兴趣的话可以自行来查看这封<a href="https://marc.info/?l=git&amp;m=148787047422954" target="_blank" rel="noreferrer">邮件的内容</a>。</p><h3 id="比特币的本质" tabindex="-1">比特币的本质 <a class="header-anchor" href="#比特币的本质" aria-label="Permalink to &quot;比特币的本质&quot;">​</a></h3><p>比特币是区块链技术中比较著名的一项应用，同时，比特币也和链表、哈希函数这两种数据结构有着千丝万缕的关系。</p><p>比特币是由一个网名为&quot;中本聪&quot;的人所提出的，在 2009 年诞生的一个虚拟加密货币，它的本质思想是以区块链为基础而搭建起来的一个去中心化的记账系统。我们平时所使用的记账系统，无论是使用实体银行卡或者是使用移动支付，其交易信息都会记录在一个统一的数据库中。而在去中心化的记账系统里，则会把这些交易信息进行加密直接存放在用户那里。</p><p><strong>比特币将所有的交易记录都存放在了一个叫区块（Block）的数据结构里面</strong> ，我们可以把这里的区块看作是链表数据结构中的一个节点。当用户需要将新的交易记录打包的时候，可以自己创建一个新的区块出来，放在整个区块链的结尾，也就相当于在一个链表的结尾插入一个新的节点，而在<strong>整个区块链中的第一个区块，也就是链表的头节点，叫做创世区块</strong>（Genesis Block）。</p><p>与链表数据结构使用内存地址去寻找下一个节点不同的是，<strong>区块链采用了哈希值的方式去寻找节点</strong>。在比特币里，它采用的是 SHA-256 这种加密哈希函数，将每一个区块都计算出一个 256 位的哈希值。在每一个新的区块中都会保存着上一个区块所计算出来的哈希值，通过这个哈希值，我们就可以找到哪一个区块是这个新区块的上一个区块。所有的区块都可以通过这种机制去寻找上一个区块，从而遍历整个区块链，直到找到创世区块为止。</p><p>当然了，不是每个人都是有&quot;资格&quot;去创建一个新区块的。就如上一讲中所讲述的区块链&quot;挖矿&quot;原理一样，只有当一个用户&quot;挖矿&quot;成功了，那这个用户才有资格去打包交易信息并建立一个新的区块。一个典型的比特币区块链就如下图所示：</p>',24),h=t("p",null,"备注：图片来自《Mastering Bitcoin》图书的第 7 章。",-1),_=t("p",null,'OK，这节课就讲到这里啦，下一课时我将分享"哈希碰撞的本质及解决方式"，记得按时来听课哈。',-1);function l(m,b,d,g,q,H){const e=o("Image");return r(),i("div",null,[u,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5E/A4/CgpOIF4NlRCAbNzlAAF29h8pAYQ631.png"}),n(),h,_])}const S=a(p,[["render",l]]);export{G as __pageData,S as default};

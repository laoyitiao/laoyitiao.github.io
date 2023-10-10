import{_ as i,j as p,o as l,g as s,k as o,h as t,Q as e,s as r}from"./chunks/framework.cfb14fe0.js";const y=JSON.parse('{"title":"18分布式事务（上）：除了XA，还有哪些原子提交算法吗？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6313) 18  分布式事务（上）：除了 XA，还有哪些原子提交算法吗？.md","filePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6313) 18  分布式事务（上）：除了 XA，还有哪些原子提交算法吗？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/24讲吃透分布式数据库_文档/(6313) 18  分布式事务（上）：除了 XA，还有哪些原子提交算法吗？.md"},n=e("",30),_=r("p",null,"一个账户表中，Bob 有 10 美元，Joe 有 2 美元。我们可以看到 Bob 的记录在 write 字段中最新的数据是 data@5，它表示当前最新的数据是 ts=5 那个版本的数据，ts=5 版本中的数据是 10 美元，这样读操作就会读到这个 10 美元。同理，Joe 的账号是 2 美元。",-1),m=r("p",null,"现在我们要做一个转账操作，从 Bob 账户转 7 美元到 Joe 账户。这需要操作多行数据，这里是两行。首先需要加锁，Percolator 从要操作的行中随机选择一行作为 Primary Row，其余为 Secondary Row。对 Primary Row 加锁，成功后再对 Secondary Row 加锁。从上图我们看到，在 ts=7 的行 lock 列写入了一个锁：I am primary，该行的 write 列是空的，数据列值为 3（10-7=3）。 此时 ts=7 为 start_ts。",-1),d=r("p",null,"然后对 Joe 账户加锁，同样是 ts=7，在 Joe 账户的加锁信息中包含了指向 Primary lock 的引用，如此这般处于同一个事务的行就关联起来了。Joe 的数据列写入 9(2+7=9)，write 列为空，至此完成 Prewrite 阶段。",-1),g=r("p",null,"接下来事务就要 Commit 了。Primary Row 首先执行 Commit，只要 Primary Row Commit 成功了，事务就成功了。Secondary Row 失败了也不要紧，后续会有补救措施。Commit 操作首先清除 Primary Row 的锁，然后写入 ts=8 的行（因为时间是单向递增的，这里是 commit_ts），该行可以称为 Commit Row，因为它不包含数据，只是在 write 列中写入 data@7，标识 ts=7 的数据已经可见了，此刻以后的读操作可以读到版本 ts=7 的数据了。",-1),P=e("",12);function h(b,C,T,w,S,B){const a=p("Image");return l(),s("div",null,[n,o(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/1C/F9/Cgp9HWBPCKiAbXCoAAB0tHTHvis535.png"}),t(),_,o(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/1C/F9/Cgp9HWBPCK-ABB4wAAC8TLGF6II238.png"}),t(),m,o(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/1C/F9/Cgp9HWBPCLqAAl_ZAAE417OCMCw175.png"}),t(),d,o(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/1C/F9/Cgp9HWBPCMKAR9C1AAEYmGw4fnE874.png"}),t(),g,o(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/1C/F6/CioPOWBPCMmARbSjAAC7HQrDF0I862.png"}),t(),P])}const u=i(c,[["render",h]]);export{y as __pageData,u as default};

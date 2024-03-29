# 第17讲：如何设计与实现事件源（Eventourcing）

本课时主要讲解如何设计与实现事件源（Event Sourcing）。

在第 15 课时，我介绍了事务性消息模式的使用。事务性消息模式的出发点是解决应用中可能会出现的数据一致性问题，数据一致性问题在微服务架构的应用中尤其明显。这是因为微服务相互独立，并且一般使用各自独立的数据存储，每个微服务负责维护各自的数据集，同时与其他微服务进行协作来更新相关的数据。

在事务性消息模式中，对当前微服务数据的修改由数据库操作来完成，而与其他微服务的协作则由事件来完成。这种把数据和事件分离的做法，有其实现上的复杂度。本课时介绍的事件源（Event Sourcing）技术从另外一个维度来解决这个问题，下面介绍事件源技术的基本概念。

#### 事件源技术

数据一致性问题的根源在于**对象状态与事件的分离**，对象的当前状态保存在数据库中，而事件则在对象的状态发生变化时被发布。事件源技术的核心在于使用事件来捕获对对象状态的修改，这些事件按照发生的时间顺序来保存。当需要获取对象的当前状态时，只需要从一个初始状态的对象开始，然后对该对象依次应用保存的事件即可，这个过程的最终结果就是对象的当前状态。

最典型的事件源技术的例子是银行的账户管理操作，银行账户对象 Account 维护着当前的余额这一状态值。取款和存款这两个不同的操作会对账户对象的状态产生影响，并改变当前的余额。在一般的面向对象实现中，Account 对象的 balance 属性维护当前的余额。

下面的代码是 Account 类的声明，其中 credit 和 debit 方法分别对应于存款和取款操作，这两个方法都会对 balance 属性进行修改。这也是常见的面向对象设计的实现方式。

```java
public class Account {

  private final String id;

  private MonetaryAmount balance = this.ofAmount(BigDecimal.ZERO);

  public Account(final String id) {
    this.id = id;
  }

  public String getId() {
    return this.id;
  }

  public MonetaryAmount getBalance() {
    return this.balance;
  }

  public void credit(final BigDecimal amount) {
    this.balance = this.balance.add(this.ofAmount(amount));
  }

  public void debit(final BigDecimal amount) {
    this.balance = this.balance.subtract(this.ofAmount(amount));
  }

  private MonetaryAmount ofAmount(final BigDecimal amount) {
    return Money.of(amount, "CNY");
  }
}
```

下面代码中的 TransactionalMessagingAccountService 使用了事务性消息模式，在修改 Account 对象的状态之后，发布对应的事件。第 16 课时已经详细介绍了事务性消息模式的实现，这里只是使用了这个模式。

```java
public class TransactionalMessagingAccountService implements AccountService {

  private final AccountRepository accountRepository;
  private final EventPublisher eventPublisher;

  public TransactionalMessagingAccountService(
      final AccountRepository accountRepository,
      final EventPublisher eventPublisher) {
    this.accountRepository = accountRepository;
    this.eventPublisher = eventPublisher;
  }

  @Override
  public void credit(final String accountId, final BigDecimal amount) {
    this.accountRepository.findById(accountId).ifPresent(account -> {
      account.credit(amount);
      this.accountRepository.save(account);
      this.eventPublisher
          .publish(new AccountCreditedEvent(accountId, this.ofAmount(amount)));
    });
  }

  @Override
  public void debit(final String accountId, final BigDecimal amount) {
    this.accountRepository.findById(accountId).ifPresent(account -> {
      account.debit(amount);
      this.accountRepository.save(account);
      this.eventPublisher
          .publish(new AccountDebitedEvent(accountId, this.ofAmount(amount)));
    });
  }

  private MonetaryAmount ofAmount(final BigDecimal amount) {
    return Money.of(amount, "CNY");
  }
}
```

在使用事件源技术时，我们使用事件来描述对对象状态的修改。下面代码中的 DomainEvent 接口是所有事件类的接口，其中的 getTimestamp 方法的作用是返回事件发生的时间戳。

```java
public interface DomainEvent {
  long getTimestamp();
}
```

下面代码中的 AccountEvent 接口是与账户相关的事件类公共接口，其中 getAccountId 方法返回产生该事件的 Account 对象标识符，而 getAmount 方法则返回事件相关的金额。

```java
public interface AccountEvent extends DomainEvent {
  String getAccountId();
  MonetaryAmount getAmount();
}

下面代码中的 AccountCreditedEvent 类表示账户存款事件。
public class AccountCreditedEvent extends AbstractAccountEvent {

  public AccountCreditedEvent(final String accountId,
      final MonetaryAmount amount) {
    super(accountId, amount);
  }
}
```

下面代码中的 EventSourcingAccountService 类是使用事件源技术的 AccountService 接口的实现，其中的 credit 和 debit 方法都只是调用 EventRepository 类的 addEvent 方法来保存事件。通过比较两个不同的 AccountService 实现可以发现，EventSourcingAccountService 并不保存对象状态，而只是发布事件。这样就避免了对象状态和事件发布之间可能存在的不一致问题。

```java
public class EventSourcingAccountService implements AccountService {

  private final EventRepository eventRepository;

  public EventSourcingAccountService(
      final EventRepository eventRepository) {
    this.eventRepository = eventRepository;
  }

  @Override
  public void credit(final String accountId, final BigDecimal amount) {
    this.eventRepository
        .addEvent(new AccountCreditedEvent(accountId, this.ofAmount(amount)));
  }

  @Override
  public void debit(final String accountId, final BigDecimal amount) {
    this.eventRepository
        .addEvent(new AccountDebitedEvent(accountId, this.ofAmount(amount)));
  }

  private MonetaryAmount ofAmount(final BigDecimal amount) {
    return Money.of(amount, "CNY");
  }
}
```

#### 查询对象状态

事件源技术实现中的一个重要的问题是如何查询对象的当前状态，对于银行账户对象来说，我们需要知道账户的当前余额是多少。我们只需要从对象的初始状态开始，按照时间顺序依次应用不同事件所对应的改动，最终得到的结果就是对象的当前状态。

下面代码中的 Account 是表示银行账户的对象类，其中，apply 方法表示应用不同类型的事件所对应的改动。比如，AccountCreditedEvent 表示的是存款事件，在对应的 apply 方法中，余额 balance 需要加上事件中包含的金额。而 AccountDebitedEvent 事件对应的 apply 方法中，余额 balance 被减去事件中包含的金额。

```java
public class Account {

  private final String id;

  private MonetaryAmount balance = Money.of(BigDecimal.ZERO, "CNY");

  public Account(final String id) {
    this.id = id;
  }

  public String getId() {
    return this.id;
  }

  public MonetaryAmount getBalance() {
    return this.balance;
  }

  public void apply(final AccountCreditedEvent event) {
    this.balance = this.balance.add(event.getAmount());
  }

  public void apply(final AccountDebitedEvent event) {
    this.balance = this.balance.subtract(event.getAmount());
  }
}
```

在获取对象的状态之前，首先需要找到相关的事件。在下面的代码中，EventRepository 类的 query 方法用来查询与某个 Account 对象相关的事件。在查询时，除了 Account 对象的标识符之外，还可以提供一个时间戳，用来查询特定时间点之前或之后发生的事件。如果提供两个时间戳，还可以查询两个时间点中间发生的事件。

```java
public class EventRepository {

  private final List<AccountEvent> events = new ArrayList<>();

  public void addEvent(final AccountEvent event) {
    this.events.add(event);
  }

  public List<AccountEvent> query(final String accountId) {
    return Stream.ofAll(this.events)
        .filter(event -> Objects.equals(accountId, event.getAccountId()))
        .toJavaList();
  }

  public List<AccountEvent> queryBefore(final String accountId,
      final long timestamp) {
    return Stream.ofAll(this.events).takeWhile(
        event -> Objects.equals(accountId, event.getAccountId())
            && event.getTimestamp() <= timestamp
    ).toJavaList();
  }

  public List<AccountEvent> queryAfter(final String accountId,
      final long timestamp) {
    return Stream.ofAll(this.events)
        .dropWhile(event -> event.getTimestamp() <= timestamp)
        .filter(event -> Objects.equals(accountId, event.getAccountId()))
        .toJavaList();
  }

  public List<AccountEvent> queryBetween(final String accountId,
      final long startTimestamp,
      final long endTimestamp) {
    return Stream.ofAll(this.events)
        .dropWhile(event -> event.getTimestamp() < startTimestamp)
        .takeWhile(event -> event.getTimestamp() < endTimestamp)
        .filter(event -> Objects.equals(accountId, event.getAccountId()))
        .toJavaList();
  }
}
```

下面代码中的 AccountQuery 类用来查询 Account 对象。首先使用 EventRepository 类的 query 方法查询到相关的事件列表，再调用 applyEvents 方法来应用事件。在应用事件时，从一个新建的 Account 对象开始，再对事件列表中的每个 AccountEvent 事件，调用 apply 方法来应用事件对应的改动。在 apply 方法中，通过 Java 的反射 API 来找到 Account 对象中用来处理对应类型的事件的方法，并调用该方法来处理事件。applyEvents 方法的返回值就是包含了最新状态的 Account 对象。

```js
public class AccountQuery {

  private final EventRepository eventRepository;

  private static final Logger LOGGER = LoggerFactory
      .getLogger(AccountQuery.class);

  public AccountQuery(
      final EventRepository eventRepository) {
    this.eventRepository = eventRepository;
  }

  public Account getAccount(final String accountId) {
    return this.applyEvents(accountId,
        this.eventRepository.query(accountId));
  }

  public Account getAccount(final String accountId, final long timestamp) {
    return this.applyEvents(accountId,
        this.eventRepository.queryBefore(accountId, timestamp));
  }

  private Account applyEvents(final String accountId, final List<AccountEvent> events) {
    final Account account = new Account(accountId);
    events.forEach(event -> this.apply(account, event));
    return account;
  }

  private void apply(final Account account, final AccountEvent event) {
    try {
      final Method method = Account.class.getMethod("apply", event.getClass());
      method.invoke(account, event);
    } catch (final NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
      LOGGER.warn("Ignore event without handler {}", event, e);
    }
  }
}
```

由于每个事件都有自己的时间戳，我们可以查询到一个对象在任何时间点上的状态，只需要从一个初始状态开始，然后仅应用发生在给定时间点之前的事件即可。EventRepository 类已经提供了 queryBefore 方法来指定查询时间戳，这给了我们一个强大的类似时间机器的追溯功能。如果用户想知道上个月底时的账户余额是多少，只需要把查询的时间戳设置为上个月底的午夜，查询的返回结果就是包含了当时的余额的 Account 对象。

#### 快照

使用事件来表示对对象状态的修改之后，查询对象的状态变得复杂，需要依次应用所有的事件。当事件的数量非常大时，查询操作的性能会变低，这是因为每次都需要从初始状态开始遍历全部的事件。**快照**（Snapshot）的作用是提高查询状态时的性能，快照可以看成是一次状态查询的结果，在执行查询操作之后得到的对象状态被保存成快照。之后的查询操作不再需要从初始状态开始，而是从最近的快照开始，再应用快照保存之后产生的事件即可。在使用了快照之后，每次查询操作所要处理的事件数量可以控制在一个合理的范围。

快照可以保存在内存中或磁盘上。由于快照可以从历史事件中重新创建，丢失快照并不是一个严重的问题，因此保存在内存中是很合理的，性能也很好。也可以定期把快照保存在磁盘上，这样当应用崩溃之后，可以从磁盘上保存的快照中快速恢复状态，而不用从头开始应用全部事件来创建新的快照。

下面代码中的 Snapshot 是实现快照的一个基本接口。Snapshot 接口封装了一个类型为 V 的对象，以及快照创建的时间戳。

```java
public interface Snapshot<V> {

  V getValue();

  long getTimestamp();
}
```

对于 Account 对象相关的快照，下面代码中的 AccountSnapshotRepository 类提供了基于内存中的哈希表的存储。AccountSnapshot.createBlank 方法的作用是创建一个新的 Account 对象的快照，其中时间戳的值为 0。

```java
public class AccountSnapshotRepository {

  private final Map<String, AccountSnapshot> snapshots = new HashMap<>();

  public void save(final Account account) {
    this.snapshots.put(account.getId(), new AccountSnapshot(account));
  }

  public AccountSnapshot get(final String accountId) {
    return Optional.ofNullable(this.snapshots.get(accountId))
        .orElse(AccountSnapshot.createBlank(accountId));
  }
}
```

进行对象查询的 AccountQuery 类也需要进行相应的修改，来使用 AccountSnapshotRepository 对象中保存的快照。在 doGetAccount 方法中，首先从 AccountSnapshotRepository 对象中得到对应的 Account 对象最近的快照，然后使用 EventRepository 对象的 queryAfter 方法查询到快照创建的时间戳之后产生的事件，最后在快照中的 Account 对象上应用这些事件，就得到了 Account 对象的最新状态。在 postProcess 方法中，把上一次查询时得到的 Account 对象保存在 AccountSnapshotRepository 中，提供给下一次查询使用。

```java
public class AccountQuery {

  public Account getAccount(final String accountId) {
    return this.postProcess(this.doGetAccount(accountId));
  }

  private Account doGetAccount(final String accountId) {
    final AccountSnapshot snapshot = this.snapshotRepository.get(accountId);
    return this.applyEvents(snapshot.getValue(),
        this.eventRepository.queryAfter(accountId, snapshot.getTimestamp()));
  }

  private Account postProcess(final Account account) {
    this.snapshotRepository.save(account);
    return account;
  }
}
```

#### 事件反转

由于所有对对象状态的修改都由事件对象来保存，如果产生了错误的事件，可以很容易就进行纠正。对于一个事件，除了可以应用事件所对应的修改之外，还可以反转事件所对应的修改。比如，对于 AccountCreditedEvent 事件，在进行反转时，执行的是取款操作。在一个事件序列中，如果某个事件的产生是错误的，只需要对这个事件及其之后的事件都进行反转操作，再重新应用正确的事件以及之后产生的事件，所得到的结果就是正确的状态。

举例来说，如果事件序列中的一个 AccountCreditedEvent 事件的金额发生了错误，那么这个事件及其之后的事件都要被反转，再重新应用一个新的金额正确的 AccountCreditedEvent 事件，最后再重新应用该 AccountCreditedEvent 事件之后产生的相关事件，就可以得到 Account 对象的正确状态。

在查询对象的状态时，可以从初始状态开始，依次应用事件。当处理到错误的事件时，用正确的事件替换即可。如果保存了对象的快照，可以从错误事件发生之前的最近一个快照开始。

在下面的代码中，Account 类的 reverse 方法用来对不同类型的事件进行反转操作。

```java
public class Account {

  public void reverse(final AccountCreditedEvent event) {
    this.balance = this.balance.subtract(event.getAmount());
  }

  public void reverse(final AccountDebitedEvent event) {
    this.balance = this.balance.add(event.getAmount());
  }
}
```

#### 与外部系统交互

事件源技术的最大优势在于可以随时重放事件，有些事件在应用时会调用外部系统提供的服务来进行修改操作。当进行事件重放时，这些对外部系统服务的调用是不应该发生的，这就需要在事件的正常处理和重放时，对外部系统的调用采用不同的策略。比如，AccountCreditedEvent 事件的处理逻辑会发送短信通知给用户，告知有新的资金入账。当这个事件被重放时，并不需要发送短信通知。

推荐的做法是把所有与外部系统的交互都封装在网关（Gateway）中，网关的实现会根据事件处理的状态来确定是否发送实际的调用给外部系统。

与调用外部系统服务相关的是，事件处理时依赖外部系统提供的数据。比如，如果银行账户的存款操作支持不同的货币，假设 AccountCreditedEvent 事件中的金额使用的不是人民币，在处理该事件时，则需要根据当时的汇率来得到人民币的金额。当进行事件重放时，我们需要的是事件产生时的汇率值来完成处理，而不是重放事件时的汇率值，这就要求外部系统支持历史数据的查询。如果外部系统不支持查询历史数据，可以在网关中保存全部调用的结果。

下面代码中的 ExchangeRateGateway 展示了获取汇率网关的实现。ExchangeRateGateway 会保存每一个 AccountCreditedEvent 对象对应的汇率查询结果，不论在什么时候执行事件重放操作，ExchangeRateGateway 会保证 query 方法返回正确的结果。

```java
public class ExchangeRateGateway {

  private final ExternalExchangeRateService exchangeRateService = new ExternalExchangeRateService();

  private final Map<AccountCreditedEvent, BigDecimal> results = new HashMap<>();

  public BigDecimal query(final AccountCreditedEvent event) {
    final BigDecimal oldResult = this.results.get(event);
    if (oldResult != null) {
      return oldResult;
    }
    final BigDecimal result = this.doQuery(event);
    this.results.put(event, result);
    return result;
  }

  public BigDecimal doQuery(final AccountCreditedEvent event) {
    final String currencyCode = event.getAmount().getCurrency()
        .getCurrencyCode();
    if (!Objects.equals(currencyCode, "CNY")) {
      return this.exchangeRateService.query(currencyCode, "CNY");
    }
    return BigDecimal.ONE;
  }
}
```

#### 代码更新

随着应用版本的更新，对于同样类型的事件处理逻辑也有可能发生变化。下面讨论三种不同的代码更新方式。

第一种代码更新是**增加新功能**，新功能并不影响之前已经处理过的事件。当代码更新之后，新增的功能会对更新之后产生的事件生效。如果新功能对之前的事件也适用，只需要重放之前的事件即可，这是事件源技术的一个强大功能。比如，银行系统添加了一个新的功能，可以智能分析付款记录并进行归类。在代码更新之后，只需要重放所有的 AccountDebitedEvent 事件，就可以完成对历史付款记录的处理。

第二种代码更新是**修复 bug**。在 bug 被修复之后，只需要重放事件，对象的状态就会被自动修复，如果 bug 涉及到外部系统，那么需要根据 bug 的情况来具体分析，采取不同的策略。比如，如果系统对 AccountDebitedEvent 事件的处理方式出现了 bug，导致了错误的短信通知被发送给客户，那么 bug 修复完成之后，则需要发送新的通知来告知用户之前的通知是错误的。在另外的情况下，网关会需要计算 bug 修复前后的差异性来进行补偿。比如，如果转账事件的处理代码中的 bug 造成了调用第三方服务时的金额产生了错误，则需要计算出相应的差额来执行多退少补的操作。这些补偿操作由网关来完成，对之前所有受到 bug 影响的事件都需要执行一次。

第三种代码更新是**与时间相关的代码处理逻辑**。比如 AccountDebitedEvent 事件的处理逻辑中需要扣除取款操作的手续费，而手续费的金额会随着时间而变化，这就要求领域模型可以根据事件的发生时间来应用对应的处理策略。最简单的做法是用一系列 if-else 语句来根据事件的发生时间，返回不同的值。

#### 审计日志

事件源技术的一个非常重要的应用场景是**实现审计日志**（Audit Log），审计日志在很多涉及敏感数据的系统中至关重要。这些系统要求对数据的所有修改都需要记录下来，方便以后查询。在使用事件源技术之后，保存的事件序列实际上就形成了审计日志，这是使用事件源技术带来的直接好处。

#### 事件存储

事件源技术在实现时的一个重要考虑是事件的持久化存储。由于事件是有序，而且不可变的，我们可以利用这些特性实现高效的事件存储，典型的实现是采用只追加（Apppend Only）的数据存储。当新的事件产生，只是往事件日志中追加记录，由于事件是不可变的，不需要考虑已有事件的更新。从实现上来说，事件存储类似于数据库中的事务日志，以及时间序列数据库（Time Series Database）对数据的存储。

#### 总结

事件源技术使用事件来保存所有对状态的修改。通过事件的重放，可以实现很多强大的功能，如查询对象在任意时刻的状态。本课时介绍了事件源技术的基本概念，包括事件的发布和对象状态的查询。除此之外，还讨论了快照的使用、事件反转、与外部系统交互、代码更新、审计日志和事件存储等相关的内容。


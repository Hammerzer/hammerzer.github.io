---
title: Redis必会
description: MySQL 入门实操笔记，梳理基础语法、核心操作与常用命令，快速掌握数据库使用。
urlname: Redis-must
date: 2025-10-15T21:32:00
tags:
  - 数据库
  - 开发部署
categories:
  - Tools and Platforms
draft: false
---


> [!note] [Redis官方教程](https://www.redis.net.cn/tutorial/3501.html)


# 一 认识 Redis

## 1 数据库分类

目前数据库分：关系型数据库与非关系型数据库

- 常用的关系型数据库： Oracle，**MySQL**，SqlServer，DB2

- 常用的非关系数据库：**Redis**，MongoDB，ElasticSearch， Hbase，Neo4j


那啥是非关系数据库呢？此处涉及到新名词：NoSQL

**NoSQL**最常见的解释是“non-relational”， “Not Only SQL”也被很多人接受。NoSQL仅仅是一个概念，泛指非关系型的数据库，区别于关系数据库，它们不保证关系数据的ACID特性。

> 详情见：[百度百科](https://baike.baidu.com/item/NoSQL/8828247?fr=aladdin)

NoSQL分类：

![](redis1-1.png)


## 2 Mysql与Redis区别

### 2.1 出身与定位

MySQL 是一位 “老牌选手”，属于[关系型数据库](https://cloud.tencent.com/product/tencentdb-catalog?from=20067&from_column=20067)。它就像一个超级规整的大仓库，数据按照预先设计好的表结构，整齐地存放其中，不同表之间通过关系相互关联。这种特性让它在处理复杂事务和大规模数据存储方面游刃有余，是传统企业级应用的得力助手。

Redis 则是 “后起之秀”，属于非关系型数据库，更确切地说是键值对数据库。它好比一个灵活的小盒子，数据以键值对形式存储，查询时通过键能快速找到对应的值，就像在小盒子里翻找物品，速度那叫一个快。所以，Redis 在缓存、实时计数、排行榜等对读写速度要求极高的场景中表现出色。

### 2.2 数据存储方式

MySQL 把数据存储在磁盘上，数据组织形式严谨，遵循 ACID（原子性、一致性、隔离性、持久性）原则，确保数据的完整性和可靠性。不过，磁盘读写速度相对较慢，这在一定程度上影响了查询效率，尤其是面对高并发请求时。

Redis 数据主要存储在内存中，内存的读写速度比磁盘快得多，能轻松应对每秒上万次的读写操作。不过，由于内存空间有限，数据量过大时可能需要考虑扩容或采用其他策略。当然，Redis 也支持将数据持久化到磁盘，以便在重启后恢复数据。

### 2.3 数据结构

MySQL 以表为基础，数据结构相对固定。表由行和列组成，每一行代表一条记录，每一列代表一个字段。这种结构适合处理结构化数据，方便进行复杂的查询和统计分析。

Redis 支持丰富的数据结构，如字符串（string）、哈希（hash）、列表（list）、集合（set）和有序集合（sorted set）。不同的数据结构适用于不同场景。例如，字符串可用于缓存简单数据；哈希用于存储对象；列表适合实现队列；集合和有序集合在去重、排序等场景中发挥作用。

### 2.4 应用场景

MySQL 适合处理需要事务支持、数据一致性要求高的场景，如电商系统中的订单处理、金融系统的账务管理等。在这些场景中，数据的准确性和完整性至关重要，MySQL 能通过事务机制确保操作的原子性和一致性。

Redis 常用于缓存、实时统计、[消息队列](https://cloud.tencent.com/product/message-queue-catalog?from=20067&from_column=20067)等场景。在网站应用中，Redis 可缓存热门页面、数据库查询结果，减少数据库压力，提高页面响应速度。在实时统计场景，如统计网站在线人数、点赞数，Redis 的原子操作和高速读写性能能快速完成计数任务。此外，Redis 还能作为轻量级消息队列，实现系统间的异步通信。

### 2.5 性能对比

在读写性能方面，Redis 凭借内存存储优势，读写速度极快，尤其在高并发场景下表现卓越。而 MySQL 在处理大量磁盘 I/O 操作时，性能会受到一定影响，不过通过优化索引、配置参数等方式，也能提升查询性能。

在数据一致性方面，MySQL 遵循 ACID 原则，能保证事务的原子性和一致性，数据可靠性高。Redis 虽然也提供了一些保证数据一致性的机制，但相比之下，在强一致性要求场景中，MySQL 更具优势。

### 2.6 总结

Redis 和 MySQL 各有所长，不存在绝对的优劣之分。在实际开发中，我们应根据项目需求、数据特点和业务场景，合理选择使用。有时，将二者结合使用，能发挥出更大威力，为用户提供更高效、稳定的服务。

<br>

## 3 什么是Redis

Redis是一个开源的高性能**键值存储**数据库，它提供了多种数据结构来存储数据，如字符串、哈希、列表、集合、有序集合等。

Redis将数据存储在内存中，以提供快速的读写访问速度，并且能够通过异步的方式将数据持久化到磁盘上。

它支持复制、Lua脚本、事务处理、不同级别的持久化选项以及多种客户端语言的接口。

Redis广泛用于缓存、消息队列、短时数据存储和高性能的应用场景中。

### 3.1 Redis是如何演变的？

1. 初创阶段（2009年）：Redis由意大利的开发者Salvatore Sanfilippo（也被称为antirez）创建，并在2009年发布。最初，它被设计为一个简单的键值存储系统，用以支持Sanfilippo的创业项目。Redis因其卓越的性能和简易性迅速获得了开发者社区的关注。
2. 成长阶段（2010-2013年）：在这一阶段，Redis逐渐增加了对多种数据类型的支持，并引入了诸如发布/订阅、事务处理等高级功能。这段时间内，Redis的可靠性和功能性大幅提升，使得它不仅仅作为缓存解决方案，也开始被用于各种复杂的数据存储场景。
3. 成熟阶段（2014-2017年）：Redis开始实现功能的全面化，包括对集群的支持、更高级的数据持久化选项，以及更丰富的数据处理能力，如Lua脚本支持。在此阶段，Redis从一个单机解决方案演变成一个可以在分布式环境下运行的系统。
4. 扩展阶段（2018年至今）：随着云计算和容器技术的兴起，Redis也被扩展到了云服务和微服务架构中。Redis实现了更多的模块化特性，例如Redis Modules API，允许开发者扩展Redis的功能。同时，Redis的企业版也在这个阶段发布，提供了高可用性、数据分片、自动故障转移等企业级特性。

### 3.2 Redis**有什么优势？**

- 极高性能

  Redis是一个基于内存的数据存储系统，能够提供极快的读写速度，通常以微秒到毫秒级别的延迟完成操作。这使得Redis非常适用于需要快速响应的场景，如缓存、实时分析等。

- 多样化数据结构

  Redis不仅仅是一个简单的键值存储，它支持字符串、哈希、列表、集合、有序集合等多种复杂数据结构，这为处理各种不同类型的数据提供了极大的灵活性，并且这些数据结构可以很好地降低业务开发复杂度。

- 持久性及可靠性

  Redis提供RDB和AOF两种持久化机制，并且可以灵活地根据需要配置持久化策略。

- 高可用性和分布式支持

  Redis提供了哨兵（Sentinel）和集群（Cluster）模式，支持自动故障恢复和数据分片，这些特性为构建高可用和可扩展的系统提供了强有力的支持。

- 简单易用

  Redis的设计以简单易用为核心，它提供了简洁直观的命令集，使得开发者可以快速上手并进行数据操作。同时，Redis的客户端库在多种编程语言中可用，进一步降低了学习成本和开发难度。

- 生态和社区支持

  Redis有一个非常活跃的社区，提供了丰富的文档、客户端库和支持资源。这使得Redis能够在多种编程环境中快速集成，并不断推出新特性和性能改进。

### 3.3 Redis**有哪些实际应用？**

缓存系统

- Redis通过提供超高速的数据访问，常用于缓存网站内容，减轻后端数据库的负担，提高响应速度。它可以缓存网页、数据库查询结果和常用对象。
- 例如，网站可以将热门文章的内容（用户信息、验证码过期时间）缓存在Redis中，以快速向用户展示，避免每次访问都查询数据库。	

会话存储

- 在Web应用中，Redis被用来存储用户会话信息。它能够快速读写用户的会话数据，支持大量并发的访问。
- 例如，在线购物平台可将用户的登录信息和购物车状态存储在Redis中，实现快速会话恢复。

消息队列

- Redis的发布/订阅模式和列表数据结构使其成为实现消息队列的理想选择。它能够在生产者和消费者之间高效地传递消息。
- 例如，一个应用可以用`Redis`来处理发送邮件的任务队列，确保邮件按顺序发送；秒杀系统等。

实时分析

- Redis的速度使其非常适合于需要实时分析的应用场景，如计数器、实时监控和事件分析等。
- 例如，一个网站可能使用Redis来追踪每个页面的实时访问次数；社交网络的粉丝、共同好友（集合的交并补）。

排行榜和计数器

- 利用`Redis`的有序集合`zset`，可以有效地实现排行榜系统。它允许快速更新和检索排名信息。
- 例如，游戏应用可以用`Redis`来维护玩家的分数排行榜，实时更新玩家排名。

地理空间数据处理

- `Redis`提供了地理空间索引功能，可以快速进行地理位置存储和查询。这适用于需要处理地理位置信息的服务。
- 例如，一个位置基础的服务可以用`Redis`来追踪和查询附近的兴趣点或用户。

<br>

### 3.4 Redis**的工作原理是什么？**

#### 3.4.1 基于内存的数据存储

Redis是一个内存中的数据结构存储系统，意味着它使用计算机的主内存（RAM）来存储所有的数据。这种内存优先的设计使得Redis能够提供极高的性能，因为内存的数据访问速度远远超过了传统硬盘存储。

由于存储在内存中，Redis能够以微秒级别的延迟对数据进行读写操作，这对于需要快速响应的应用来说至关重要，如缓存系统、实时分析平台和高频交易系统等。然而，内存资源相对有限且价格较高，因此Redis也提供了数据驱动的逐出策略（如LRU—最近最少使用算法）和精细的内存管理功能，确保有效利用可用内存。

#### 3.4.2 数据结构与操作命令

Redis提供了丰富的数据结构，每种结构都有专门的操作命令：

- 字符串（String）：最基本的数据类型，用于存储文本或二进制数据。常用命令包括 GET、SET 用于存取数据，INCR、DECR 用于原子性递增或递减操作。
- 哈希（Hash）：用于存储对象，由字段和字段值组成的映射表。HGET、HSET 用于获取和设置字段值，HGETALL 用来获取哈希表的所有字段和值。
- 列表（List）：有序集合，支持双端插入和删除操作。LPUSH、RPUSH 用于从左端或右端插入元素，LPOP、RPOP 用于从两端弹出元素，LRANGE 用于获取列表片段。
- 集合（Set）：无序且元素唯一的集合。SADD、SREM 用于添加或移除元素，SMEMBERS 用于获取所有元素，SINTER、SUNION 和 SDIFF 用于集合运算。
- 有序集合（Sorted Set）：类似 Set，但每个元素关联一个分数值，按分数有序排列。ZADD 添加元素，ZRANGE 按照分数范围查询元素，ZREM 删除元素。

Redis还支持位操作、地理空间索引、HyperLogLogs等高级数据结构，通过一系列特定的命令进行操作，使得Redis能够应用于广泛的场景中。

#### 3.4.3 持久化机制

为了保证内存中的数据在断电或故障时不会丢失，Redis提供了两种主要的持久化机制：RDB（Redis Database）和AOF（Append Only File）。

- RDB：通过创建数据集的时间点快照来实现持久化。这是通过周期性地执行一个称为“BGSAVE”的操作来完成的，它会产生一个包含了Redis在某一时刻所有数据的二进制文件。RDB文件是一个压缩的二进制文件，可以用来在需要的时候，快速恢复整个数据集。它适合于数据备份和灾难恢复，但在发生故障后，自上次快照以来的所有数据都有可能丢失。
- AOF：记录每一个写操作命令到一个日志文件中，命令以追加的方式保存。AOF文件以纯文本格式存储，提供了更好的数据安全性，因为它可以配置为每次写操作后同步到磁盘，或者每秒同步一次。在Redis重启时，AOF文件中的命令会被重新执行，以重建内存中的数据状态。通过AOF恢复数据通常比RDB更慢，但可以更频繁地记录数据状态，减少数据丢失的可能性。

#### 3.4.4 单线程架构

Redis的单线程架构指的是它的核心数据操作是由一个单一的线程来执行的。

这种设计带来了简单性和效率，因为避免了多线程上下文切换的开销，并简化了并发控制，因为不需要考虑数据在多个线程间的同步问题。尽管Redis处理命令的主循环是单线程的，它还是能利用IO多路复用技术来同时处理多个客户端的请求。此外，对于某些耗时操作，如持久化和部分网络IO处理，Redis会使用后台线程来避免阻塞主线程，确保了服务的响应性。单线程架构使得Redis可以高效地处理大量的请求，同时保持操作的原子性和一致性。

#### 3.4.5 哨兵和集群机制

为了实现高可用性和水平扩展，Redis提供了哨兵（Sentinel）机制和集群（Cluster）模式。

- Redis哨兵（Sentinel）是一个高可用性解决方案。哨兵系统可以监测Redis主从服务器的健康状态，自动执行故障转移，选举新的主服务器，并通知应用程序新主服务器的地址。哨兵还负责通知管理员，发送警报，并执行自定义脚本响应各种事件。
- Redis集群（Cluster）提供了一个数据分区（sharding）和自动管理的环境，支持在多个节点间进行数据共享。它能够在节点间自动分配数据，并在节点故障时提供自动的故障转移功能。集群通过分片来提高数据库的可扩展性，并能在不中断服务的情况下，动态地添加或移除节点。

> 一般提到缓存，首要候选就是`Redis`，提高书写速度，减轻对数据库存储与访问压力。

<br>



## 4 Redis的安装

> [安装教程](https://blog.csdn.net/m0_73451795/article/details/140176306)
>
> [Redis中文教程：安装](https://www.redis.net.cn/tutorial/3503.html)
>
> [安装视频教程](https://www.bilibili.com/video/BV1q64LzsEsa?spm_id_from=333.788.videopod.episodes&vd_source=ad866fe26d18693e4132a3c33f8fba36&p=3)

CS架构，默认端口：6379

测试学习用的内存分配一般为100M

<br>

# 二 数据类型

`Redis`存储的是`key-value`结构的数据，其中`key`是字符串类型，`value`有五种常用到的数据类型：

- `String`：字符串类型（最常用）
- `Hash`：字典类型（最常用）
- `List`：列表类型
- `Set` ：集合类型
- `ZSet` ：有序集合类型

> 不常用：`HyperLogLog`，`Bitmap`(位图)，`Bloom Filter`(布隆过滤器)，`Geospatial`(地理位置) ，Module`(`模块)， `Streams`(流信息)

**命令格式**

```
类型命令    key       参数数据
set       name       dafei
```

> `Redis` 操作有点类似 `Java` 的`Map`集合，都是key-value形式存储数据，在学习过程中，可以进行类比。

🔺`Redis`中的`key`大部分为`String`类型，`value`值根据缓存数据结构可以选用常用的五种类型。



## 1 `String`类型

> [参考Redis文档](https://www.redis.net.cn/tutorial/3505.html)

string是redis最基本的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value。

string类型是二进制安全的。意思是redis的string可以包含任何数据。比如jpg图片或者序列化的对象 。

string类型是Redis最基本的数据类型，一个键最大能存储512MB。

在Redis内容数据存储结构：

**实例**

```redis
redis 127.0.0.1:6379> SET name "redis.net.cn"
OK
redis 127.0.0.1:6379> GET name
"redis.net.cn"
```

在以上实例中我们使用了 Redis 的 **SET** 和 **GET** 命令。键为 name，对应的值为redis.net.cn。

**注意：**一个键最大能存储512MB。

### 1.1 命令

**常用的命令**

| 命令格式                | 功能                                               | 案例                |
| ----------------------- | -------------------------------------------------- | ------------------- |
| set key value           | 将key-value缓存redis中                             | set name dafei      |
| get key                 | 从redis中获取key对应value值                        | get name            |
| incr key                | 将key对应value值 + 1                               | incr age            |
| decr key                | 将key对应value值-1                                 | decr age            |
| setex key seconds value | 将key-value缓存到redis中，seconds 秒后失效         | setex  sex  10  man |
| ttl key                 | 查看key存活时间                                    | ttl sex             |
| del  key                | 从redis中删除key                                   | del name            |
| setnx key value         | 如果key已经存，不做任何操作，如果key不存，直接添加 | setnx  name xiaofei |



**非常用命令**

| 命令格式                    | 功能                                                      | 案例                   |
| --------------------------- | --------------------------------------------------------- | ---------------------- |
| incrby key increment        | 给key对应值加increment                                    | incrby age 10          |
| mset k1 v1 k2 v2....        | 批量添加k1v1 k2v2 key value对                             | mset name dafei age 18 |
| mget k1  k2....             | 批量获取k1, k2的值                                        | mget name  age         |
| append key  value           | 在key对应的value值中拼+value                              | append name yes        |
| setrange key  offset  value | 修改key对应的value值,替换为指定value,冲offset索引位置开始 | setrange name 2   xx   |



### 1.2 应用场景

#### 1.2.1 计数器

如：视频播放数系统就是使用redis作为视频播放数计数的基础组件。

```
incr  viewnum 1
```

#### 1.2.2 共享session

出于负载均衡的考虑，分布式服务会将用户信息的访问均衡到不同服务器上，用户刷新一次访问可能会需要重新登录。

为避免这个问题，可以用`redis`将用户`session`集中管理，  在这种模式下只要保证redis的高可用和扩展性的，每次获取用户更新或查询登录信息都直接从`redis`中集中获取。

| key  | value    |
| ---- | -------- |
| name | zhangsan |
| age  | 18       |

<br>



## 2 Hash类型

Redis `hash` 是一个键值对集合。

Redis `hash`是一个`string`类型的`field`和`value`的映射表，hash`特别`适合用于存储**对象**。

**实例**

```
redis 127.0.0.1:6379> HMSET user:1 username redis.net.cn password redis.net.cn points 200
OK
redis 127.0.0.1:6379> HGETALL user:1
1) "username"
2) "redis.net.cn"
3) "password"
4) "redis.net.cn"
5) "points"
6) "200"
redis 127.0.0.1:6379>
```

以上实例中 hash 数据类型存储了包含用户脚本信息的用户对象。 实例中我们使用了 Redis **HMSET, HEGTALL** 命令，**user:1** 为键值。

🔺每个 `hash` 可以存储 `2^32 - 1` 键值对（40多亿）。

 

### 2.1 常用的命令

| 命令格式                       | 功能                                                | 案例                 |
| ------------------------------ | --------------------------------------------------- | -------------------- |
| hset key field  value          | 将field  value对缓存到redis中hash中，键值为key      | hset user name dafei |
| hget key field                 | 从key对应hash列表中获取field字段                    | hget user  name      |
| hexists key  field             | 判断key对应的hash列表是否存在 field字段             | hexists user age     |
| hdel key  field                | 删除key对应hash列表中field字段                      | hdel user age        |
| hincrby  key  field  increment | 给key对应hash列表中field字段 + increment            | hincrby user  age 10 |
| hlen key                       | 查看key对应的hash列表field的数量                    | hlen user            |
| hkeys  key                     | 获取key对应的hash列表所有的field值                  | hkeys  user          |
| hvals  key                     | 获取key对应的hash列表所有的field对应的value值       | kvals  user          |
| hgetall key                    | 获取key对应的hash列表中所有的field及其对应的value值 | hgetall user         |



### 2.2 应用场景

Hash结构相对于字符串序列化缓存信息更加直观，并且在更新操作上更加便捷。

**共享session设计**

```java
public class User{
	private String userame;
	private String password;
	private  int age;
}
```

登录用户：

```java
User user = new User("dafei", "666", 18);
```



登录缓存：

- 方案1： 将user对象转换json格式字符串存redis  【侧重于查， 改非常麻烦】

  ```
  user_token   ：   "{name:dafei, age:18, password:666}"
  ```

  

- 方案2： 将user对象转换hash对象存redis【侧重于改，查询相对麻烦】

  ```
  user_token：{
   	name：ddafei
   	age ：18
   	password： 666
  }
  ```

  

<br>



## 3 List类型

`Redis` 列表是简单的**字符串**列表，按照插入顺序排序。你可以添加一个元素导列表的头部（左边）或者尾部（右边）。

**实例**

```
redis 127.0.0.1:6379> lpush redis.net.cn redis
(integer) 1
redis 127.0.0.1:6379> lpush redis.net.cn mongodb
(integer) 2
redis 127.0.0.1:6379> lpush redis.net.cn rabitmq
(integer) 3
redis 127.0.0.1:6379> lrange redis.net.cn 0 10
1) "rabitmq"
2) "mongodb"
3) "redis"
redis 127.0.0.1:6379>
```

- 列表最多可存储 `2^32 - 1` 元素 (4294967295, 每个列表可存储40多亿)。

- Redis中的List类似Java中的Queue，也可以当做List来用。


> List类型是一个链表结构的集合，其主要功能有push、pop、获取元素等，更详细的说,List类型是一个**双端链表**的结构，我们可以通过相关操作进行集合的头部或者尾部添加删除元素，List的设计非常简单精巧，即可以作为栈,又可以作为队列，满足绝大多数需求。
>



### 3.1 命令 

**常用的命令**

| 命令格式              | 功能                                                 | 案例              |
| --------------------- | ---------------------------------------------------- | ----------------- |
| rpush  key  value     | 从右边往key集合中添加value值                         | rpush hobby java  |
| lrange key start stop | 从左边开始列表key集合，从start位置开始，stop位置结束 | lrange hobby 0 -1 |
| lpush key value       | 从左边往key集合中添加value值                         | lpush hobby c++   |
| lpop key              | 弹出key集合中最左边的数据                            | lpop hobby        |
| rpop key              | 弹出key集合中最右边的数据                            | rpop hobby        |
| llen key              | 获取列表长度                                         | llen hooby        |



**非常用命令**

| 命令格式                        | 功能                                    | 案例                          |
| ------------------------------- | --------------------------------------- | ----------------------------- |
| linsert key before pivot value  | 操作key集合，在pivot值之前插入value     | linsert hobby before java  c# |
| linsert key  after  pivot value | 操作key集合，在pivot值之后插入value     | linsert hobby after  java  c# |
| lset key  index  value          | 操作key集合，更新索引index位置值为value | lset hobby 1  go              |
| lrem key count  value           | 操作key集合，删除 count个 value值       | lrem hobby 3   go             |
| ltrim   key  start stop         | 操作key集合，从start到stop截取自列表    | ltrim  hobby 2   4            |
| lindex  key  index              | 操作key集合，获取索引为index位置的数据  | lindex  hobby 1               |



### 3.2 应用场景

用户收藏文章列表：

```
key：user_favor_article_list
value: [aid1, aid2, aid3......]
```

<br>

## 4 Set类型

Redis的Set是`string`类型的**无序集合**。

集合是通过**哈希表**实现的，所以添加，删除，查找的复杂度都是O(1)。

**`sadd` 命令**：添加一个`string`元素到key对应的set集合中，成功返回1；如果元素以及在集合中返回0，key对应的set不存在返回错误。

```
sadd key member
```

**实例**

```
redis 127.0.0.1:6379> sadd redis.net.cn redis
(integer) 1
redis 127.0.0.1:6379> sadd redis.net.cn mongodb
(integer) 1
redis 127.0.0.1:6379> sadd redis.net.cn rabitmq
(integer) 1
redis 127.0.0.1:6379> sadd redis.net.cn rabitmq
(integer) 0
redis 127.0.0.1:6379> smembers redis.net.cn 
1) "rabitmq"
2) "mongodb"
3) "redis"
```

**注意：**以上实例中 rabitmq 添加了两次，但根据集合内元素的唯一性，第二次插入的元素将被忽略。

- 集合中最大的成员数为 `2^32 - 1` (4294967295, 每个集合可存储40多亿个成员)。
- Set集合是String类型的无序集合,set是通过HashTable实现的，对集合我们可以取**交集、并集、差集。**

<br>



### 4.1 命令

**常用的命令**

| 命令格式                 | 功能                           | 案例               |
| ------------------------ | ------------------------------ | ------------------ |
| sadd key  members [....] | 往key 集合中添加member元素     | sadd myset a  b  c |
| smembers key             | 遍历key集合中所有的元素        | smembers myset     |
| srem  key members [....] | 删除key集合中members元素       | srem myset a       |
| spop key count           | 从key集合中随机弹出count个元素 | spop myset 1       |



**非常用命令**

| 命令格式                        | 功能                                                 | 案例                         |
| ------------------------------- | ---------------------------------------------------- | ---------------------------- |
| **sdiff key1   key2**           | **返回key1中特有的元素(差集)**                       | **sdiff key1 key2**          |
| sidiffstore  dest  key1 key2    | 返回key1中特有的元素，并将返回值缓存到dest集合中     | sidiffstore  dest  key1 key2 |
| **sinter key1 key2**            | **返回key1跟key2集合的交集**                         | **sinter key1 key2**         |
| sinterstore  dest key1 key2     | 返回key1跟key2集合的交集，并将返回值缓存到dest集合中 | sinterstore  dest key1 key2  |
| **sunion key1  key2**           | **返回key1跟key2集合的并集**                         | **sunion key1  key2**        |
| sunionstore dest key1  key2     | 返回key1跟key2集合的并集，并将返回值缓存到dest集合中 | sunionstore dest key1  key2  |
| smove source destination member | 将source集合中member元素移动到destination集合中      | smove key1  key2 aa          |
| sismember key member            | 判断member元素是否在key集合中                        | sismember key1   aa          |
| srandmember  key  count         | 随机获取set集合中count 个元素                        | srandmember key1 1           |

<br>

### 4.2 应用场景

1. 去重

2. 抽奖

   ```
   // 准备一个抽奖：
   sadd luckydraw 1 2 3 4 5 6 7 8 9 10 11 12 13
   
   // 抽3个三等奖：
   spop luckydraw 3
   // 抽2个二等奖：
   spop luckydraw 2
   // 抽1个:一等奖：
   spop luckydraw 1
   ```

<br>



## 5 Sorted set 类型

Redis `zset` 和 set 一样也是`string`类型元素的集合，且不允许重复的成员。

- 不同的是每个元素都会关联一个`double`类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。
- zset的成员是唯一的，但分数(score)却可以重复。

**zadd 命令**：添加元素到集合，元素在集合中存在则更新对应score

```
zadd key score member 
```

**实例**

```
redis 127.0.0.1:6379> zadd redis.net.cn 0 redis(integer) 1redis 127.0.0.1:6379> zadd redis.net.cn 0 mongodb(integer) 1redis 127.0.0.1:6379> zadd redis.net.cn 0 rabitmq(integer) 1redis 127.0.0.1:6379> zadd redis.net.cn 0 rabitmq(integer) 0redis 127.0.0.1:6379> ZRANGEBYSCORE redis.net.cn 0 1000 1) "redis"2) "mongodb"3) "rabitmq"
```

Sorted set集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。 集合中最大的成员数为 `2^32 - 1` (4294967295, 每个集合可存储40多亿个成员)。



### 5.1 命令

常用的命令

| 命令格式                                | 功能                                       | 案例                               |
| --------------------------------------- | ------------------------------------------ | ---------------------------------- |
| zadd key score member                   | 往key集合中添加member元素，分数为score     | zadd players 100  a                |
| zincrby  key increment  member          | 将key集合中的member元素 分数 + increment   | zadd players 100  a                |
| zrange  key  start  stop [withscores]   | 将key集合中的元素按分数升序排列 [显式分数] | zrange players 0 -1  withscores    |
| zrevrange key  start  stop [withscores] | 将key集合中的元素按分数降序排列 [显式分数] | zrevrange players 0 -1  withscores |
| zrank  key  member                      | 返回member元素在key结合中的正序排名        | zrank players  a                   |
| zrevrank key  member                    | 返回member元素在key结合中的倒序排名        | zrevrank players  a                |
| zcard  key                              | 返回key集合元素个数                        | zcard  players                     |



非常用命令

| 命令格式                                     | 功能                                          | 案例                                           |
| -------------------------------------------- | --------------------------------------------- | ---------------------------------------------- |
| zrangebyscore  key  min  max  [withscores]   | 按[min, max) 分数范围返回key集合中元素(正序)  | zrangebyscore players  200 300  withscores     |
| zrevrangebyscore key  min  max  [withscores] | 按[min, max) 分数范围返回key集合中元素(倒序)  | zrevrangebyscore players  200 300  withscores  |
| zrem key member                              | 删除key集合中member元素与分数                 | zrem players  a                                |
| zremrangebyscore  key min max  withscores    | 按[min, max) 分数范围删除key集合中元素        | zremrangebyscore  players  200 300  withscores |
| zremrangebyrank  key start  stop             | 删除key集合正序排名落在[start, stop) 范围元素 | zremrangebyrank  players  10  20               |
| zcount key min max                           | 按照分数范围[min, max]统计key集合中元素个数   | zcount  players  100 300                       |



### 5.2 应用场景

排行榜：有序集合经典使用场景。

例如：视频网站需要对用户上传的视频做排行榜，榜单维护可能是多方面：按照时间、按照播放量、按照获得的赞数等。



<br>

## 6 类型总结

一个问题，Redis在项目中如何使用？

思考点：

1. 项目是否需要使用到缓存？使用

2. 使用缓存是否选用Redis？选用

3. 使用Redis那该怎么设计Key-Value值？


这里重点讨论Redis的KV对的设计。



### 6.1 Value设计

先说value值的设计其实就是value类型选用： String， Hash， List， Set， Sort Set

一般考虑：

- 是否需要排序？要使用Sort Set
- 缓存的数据是多个值还是单个值？
  - 多个值：允许重复选List ，不允许重复选择Set
  - 单个值：简单值选择`String`， 对象值选择`Hash`




一种取巧的方式：

- 是否需要排序？要使用`Sort Set`
- 剩下使用`String`



操作方式：所有value之后都转换成json格式字符串，然后缓存到Redis

> 原因：Java操作方便，减少泛型操作麻烦

比如：

```java
List<String>list = ...
Set<String> set = ....
Map<String, Object> map = ....


List<Object>  list = redis对象.getList
Set<Object> set =redis对象.getSet   
Map<Object, Object> map  =  redis对象.getMap
```

不管存放啥数据类型，从reds中获取出来都是Object类型，后续对象强制转换麻烦，干脆直接使用字符串。

<br>

### 6.2 Key设计

`Redis` 的`key` 设计讲究4个性：

#### 6.2.1 唯一性

Redis 类似Map集合，key必须保证唯一，缓存同一个key时，后者会覆盖前者，所有必须要求唯一，那如何保证唯一呢？

最常用的方式：使用缓存数据的主键作为key。



#### 6.2.2 可读性

可读性是保证`Redis`的`key`能做到见名知意。例如：上面的员工id：key=1， 员工id:key=2。虽说能保证`key`唯一，但可读性非常差，维护`key`时，无法从， 1、2中快速判断该`key`对应`value`值。

所以一一般在保证`key`唯一的前提下，给`key`加上前缀：

| key               | value |
| ----------------- | ----- |
| employee_info:id1 | 员工1 |
| employee_info:id2 | 员工2 |



类似关系型数据库设计：【表名:主键名:主键值:列名】

通用玩法：【业务模块名:业务逻辑含义:其他:value类型】



- 业务模块名：表示该`key`属于哪个功能模块。

- 业务逻辑含义段：这里可以使用  `.`  分开， 具体业务逻辑表示。

  - 比如：缓存员工权限
  -  `employee:auth.permission:id1:set`   ： 员工权限集合
- 其他：一般设置唯一标识，比如主键

- `value`类型：`key`对应`value`类型值，提高可读性。



#### 6.2.3 灵活性

一般key保证唯一时，可以使用主键，有的使用，一个主键不能表达出全部意思，可以使用联合主键。

比如：id为1的朋友圈下id为A的评论。

| key            | value    |
| -------------- | -------- |
| post:1:reply:A | 评论内容 |
| post:1:reply:B | 评论内容 |

<br>

#### 6.2.4 时效性

Redis key一定要设置过期时间。要跟自己的业务场景，需要对key设置合理的过期时间。

- 可以在写入key时，就要追加过期时间；也可以在按照需要动态设置。

这里要注意：

- 不设置过期时间，这种key为永久key，会一直占用内存不释放，时间久了，数量一多，就容易达到服务器的内存上限，导致宕机，开发时一般配合`Key`过期策略使用哦。
- `key`的时效性设置，必须根据业务场景进行评估，设置合理有效期；

<br>



# 三 Redis全局命令

全局命令针对的是所有的key，大部分用来做运维，做管理的。

常用的全局`key`

| 命令格式            | 功能                                       | 案例                 |
| ------------------- | ------------------------------------------ | -------------------- |
| keys  pattern       | 按照pattern 匹配规则，列表redis中所有的key | keys xxx:*           |
| exists  key         | 判断key是否存在                            | exists name          |
| expire key  seconds | 给key设置过期时间，超时：seconds           | expire name 10       |
| persist key         | 取消key过期时间                            | persist  name        |
| select  index       | 切换数据库，默认是第0个，共有【0,15】个    | select 0             |
| move key   db       | 从当前数据库将key移动到指定db库            | move name 1          |
| randomkey           | 随机返回一个key                            | randomkey            |
| rename key newkey   | 将key改名为newkey                          | rename name  newname |
| echo message        | 打印message信息                            | echo  message        |
| dbsize              | 查看key个数                                | dbsize               |
| info                | 查看redis数据库信息                        | info                 |
| config get  *       | 查看所有redis配置信息                      | config get *         |
| flushdb             | 清空当前数据库                             | flushdb              |
| flushall            | 清空所有数据库                             | flushall             |

<br>

# 四 Redis安全性

由于`Redis`速度非常快，所以在一台比较好的服务器下，一个外部用户在一秒内可以进行15w次的密码尝试，这意味你需要设定非常强大的密码来方式暴力破解。此时就需要对`Redis`进行密码设置了。

Linux系统：

1. 编辑 `redis.conf` 文件，找到下面进行保存修改：`requirepass 自定义密码`
2. 重启Redis服务，访问时，使用带密码的命令：`redis-cli -a 自定义密码`
   - 否则会提示： `(error)NOAUTH Authentication required.`



Window系统：跟Linux系统一样，区别是，window系统的文件是`redis.window-service.config`

<br>

# 五 Redis事务

一个事务从开始到执行会经历以下三个阶段：

- 开始事务。
- 命令入队。
- 执行事务。

它先以 **MULTI** 开始一个事务， 然后将多个命令入队到事务中， 最后由 **EXEC** 命令触发事务， 一并执行事务中的所有命令：

```bash
redis 127.0.0.1:6379> MULTI
OK

redis 127.0.0.1:6379> SET book-name "Mastering C++ in 21 days"
QUEUED

redis 127.0.0.1:6379> GET book-name
QUEUED

redis 127.0.0.1:6379> SADD tag "C++" "Programming" "Mastering Series"
QUEUED

redis 127.0.0.1:6379> SMEMBERS tag
QUEUED

redis 127.0.0.1:6379> EXEC
1) OK
2) "Mastering C++ in 21 days"
3) (integer) 3
4) 1) "Mastering Series"
   5) "C++"
   6) "Programming"
```

单个 Redis 命令的执行是原子性的，但 Redis 没有在事务上增加任何维持原子性的机制，所以 Redis 事务的执行并不是原子性的。

Redis事务可以理解为一个**打包的批量执行脚本**，但批量指令并非原子化的操作，中间某条指令的失败不会导致前面已做指令的回滚，也不会造成后续的指令不做。

```bash
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> set name dafei
QUEUED
127.0.0.1:6379(TX)> set age 18
QUEUED
127.0.0.1:6379(TX)> incr age 
QUEUED
127.0.0.1:6379(TX)> incr name
QUEUED
127.0.0.1:6379(TX)> get age
QUEUED
127.0.0.1:6379(TX)> get name
QUEUED
127.0.0.1:6379(TX)> exec
1) OK
2) OK
3) (integer) 19
4) (error) ERR value is not an integer or out of range
5) "19"
6) "dafei"
127.0.0.1:6379> 
```



Redis 事务可以一次执行多个命令， 并且带有以下三个重要的保证：

- 批量操作在发送 EXEC 命令前被放入队列缓存。
- 收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余的命令依然被执行。
- 在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。

<br>

# 六 Redis持久化机制

案例：

1. 步骤1：在Redis中添加2个key-value对

   ```
   127.0.0.1:6379> set aa aa
   OK
   127.0.0.1:6379> set bb bb
   OK
   127.0.0.1:6379> keys *
   ```

   

2. 步骤2：重启Redis 服务器，在执行`keys *` 观察数据

3. 步骤3：分析结果

4. 会出现一下几种结果：

   - 之前的key在，aa  bb 都在（最理想的结果）
   - 之前的key在，aa也在，bb不见了
   - 之前的key在，aa， bb 不在
   - 之前的key， aa， bb 都不在了（最坏的结果）

**思考：**

为啥会这样？以我们对内存的操作理解，按道理重启之后数据应该全丢失了，为啥Redis 可能丢失，也可能不丢失，为何？

这里就涉及到Redis的持久化机制了。

![image-20220902113153504](redis6-1.png)



Redis持久化机制目前以后3种，分别为：

1. **快照方式**（RDB, Redis DataBase）
2. **文件追加方式**（AOF, Append Only File）
3. **混合持久化方式**（Redis4版本之后）

<br>

## 1 RDB方式

`Snapshotting`（快照）默认方式，将内存数据中以快照的方式写入到二进制文件中，默认为`dump.rdb`。

触发RDB持久化过程分为：手动触发与自动触发。



### 1.1 触发机制

**手动触发**

- 使用`save`命令：会阻塞当前Redis服务器，直到RDB过程完成为主，如果内存数据较多，会造成长时间阻塞，影响其他命令的使用，不建议轻易使用。

- 使用`bgsave`命令：Redis进程执行`fork`指令创建子进程，由子进程实现RDB持久化，有需要时建议使用`bgsave`命令。


**自动触发**

使用`save`相关配置，格式： `save m n`  。 表示m秒内数据集存在n次修改时会自动触发`bgsave`命令。

```java
save 900 1  #900秒内如果超过1个Key被修改则发起快照保存
save 300 10 #300秒内如果超过10个key被修改,则发起快照保存
save 60 10000
```

![image-20220902151151422](redis6-2.png)



### 1.2 优缺点

优点

- RDB快照文件是一个紧凑压缩的二进制文件，非常使用用于备份，全量复制等场景。开发中可以按照每6小时执行一次bgsave备份，用于容灾备份。

- Redis加载RDB恢复数据远远快于AOF方式

缺点

- RDB无法做到实时持久化/秒级持久化，每次bgsave时都需要fork子进程，频繁执行有时间成本。
- RDB快照文件不同版本格式不一样，容易引起兼容问题。

<br>

## 2 AOF方式

AOF与RDB不一样，它是以**独立日志的方式**记录**每次写命令**，重启时再重新执行AOF文件中命令，从而达到恢复数据的目的，解决了数据持久化的实时性的问题。

> Redis默认是不开启的，需要使用时，需要配置： `appendonly yes`
>

AOF 有3种文件同步策略：

| 策略                 | 解释                                                       |
| -------------------- | ---------------------------------------------------------- |
| appendfsync always   | 收到命令就立即写到磁盘，效率最慢。但是能保证完全的持久化。 |
| appendfsync everysec | 每秒写入磁盘一次，在性能和持久化方面做了很好的折中。       |
| appendfsync no       | 完全以依赖os，一般同步周期是30秒。                         |

![image-20220902152951385](redis6-2.png)

**优点**

- AOF方式数据安全性更高，配置得当，最多损失1秒的数据量
- 在不小心执行flushall命令，也可以通过AOF方式恢复(删除最后一个命令即可)

- AOF 日志是一个增量日志文件，不会存在断电时出现损坏问题。即使出现问题，redis-check-aof 工具也能够轻松修复它。
- 当 AOF 变得太大时，Redis 能够在后台自动重写 AOF



**缺点**

- 相同数据量来说，AOF文件体积通常大于RDB文件
- 数据持久化性能上来说，AOF 比 RDB 慢

<br>

## 3 RDB-AOF混合方式

混合持久化是结合了 RDB 和 AOF 的优点：

1. 在写入的时候，先把当前的数据以 RDB 的形式写入文件的开头
2. 再将后续的操作命令以 AOF 的格式存入文件。

即以 RDB 作为全量备份，AOF 作为增量备份，来提高备份效率。这样既能保证 Redis 重启时的速度，又能防止数据丢失的风险， 这就是 Redis 4.0 之后推出的 **RDB-AOF 混合持久化模式**，其作为默认配置来使用。

<br>

## 4 持久化机制选择

- 如果对数据安全性有非常高的要求，建议 `RDB` 和 `AOF` 同时启用。

- 如果对数据安全性要求不是很高，能够容忍数据的丢失，建议单独使用 `RDB`。

- 不推荐单独使用 `AOF`，因为对于进行数据库备份、更快重启以及 `AOF` 引擎中出现错误的情况来说，`RDB` 是更好的选择。

- 如果没特殊要求，`Redis`又是4.x版本以上，可以选择`RDB-AOF`混合方式。

  

如果不是混合模式，而是普通的`RDB`与`AOF`一起启动时，Redis加载数据执行流程

![image-20220902153031549](redis6-3.png)

<br>



# 七 `Redis`内存淘汰机制

`Redis` 启动会加载一个配置：

```bash
maxmemory <byte>   //内存上限
```

默认值为 0 (window版的限制为100M)，表示默认设置Redis内存上限。但是真实开发还是需要提前评估`key`的体量，提前设置好内容上限。

此时思考一个问题，开发中，在设置完内存上限之后，如果Redis key达到上限了，该怎么办？这就设置到Redis的内存淘汰机制了。

<br>

## 1 内存淘汰算法

Redis内存淘汰机制，也可以称之为key内卷机制，当资源不足时，该如何选择？

常见的内存淘汰机制分为四大类：

- **LRU：**LRU是Least recently used，最近最少使用的意思，简单的理解就是从数据库中删除最近最少访问的数据，该算法认为，你长期不用的数据，那么被再次访问的概率也就很小了，淘汰的数据为最长时间没有被使用，仅与时间相关。

![image-20220902161050652](redis7-1.png)

- **LFU：**LFU是Least Frequently Used，最不经常使用的意思，简单的理解就是淘汰一段时间内，使用次数最少的数据，这个与频次和时间相关。

  

- **TTL：**Redis中，有的数据是设置了过期时间的，而设置了过期时间的这部分数据，就是该算法要解决的对象。如果你快过期了，不好意思，我内存现在不够了，反正你也要退休了，提前送你一程，把你干掉吧。

- 随机淘汰：生死有命，富贵在天，是否被干掉，全凭天意了。

<br>

## 2 Redis淘汰策略

Redis 通过配置 `maxmemroy-policy` ，来配置指定具体的淘汰机制，可供选择的值有：

- `volatile-lru` ：找出已经设置过期时间的数据集，将最近最少使用（被访问到）的数据干掉。
- `volatile-ttl`：找出已经设置过期时间的数据集，将即将过期的数据干掉。
- `volatile-random`：找出已经设置过期时间的数据集，进行无差别攻击，随机干掉数据。
- `volatile-lfu`：找出已经设置过期时间的数据集，将一段时间内，使用次数最少的数据干掉。



- `allkeys-lru`：与第1个差不多，数据集从设置过期时间数据变为全体数据。
- `allkeys-lfu` ：与第4个差不多，数据集从设置过期时间数据变为全体数据。
- `allkeys-random`：与第3个差不多，数据集从设置过期时间数据变为全体数据。



- `no-enviction`：什么都不干，报错，告诉你内存不足，这样的好处是可以保证数据不丢失

> 系统默认选择： noenviction 
>

<br>

# 八 过期Key处理

接下讨论一个问题：Redis的key过期了，该如何清理问题。

Redis给出3种实现方案：

1. **惰性删除**：当访问Key时，才去判断它是否过期，如果过期，直接干掉。这种方式对CPU很友好，但是一个key如果长期不用，一直存在内存里，会造成内存浪费。
2. **定时删除**：设置键的过期时间的同时，创建一个定时器，当到达过期时间点，立即执行对Key的删除操作，这种方式对CPU不友好，得额外让出CPU维护定时器。
3. **定期删除**：隔一段时间，对数据进行一次检查，删除里面的过期Key，至于要删除多少过期Key，检查多少数据，则由算法决定。

Redis服务器实际使用的是惰性删除和定期删除两种策略：通过配合使用这两种删除策略，可以很好地在合理使用CPU和避免浪费内存之间取得平衡。

<br>

# 九 Redis编程

Redis编程就是使用编程方式操作Redis，当前Redis支持的编程语言有：https://redis.io/docs/clients/

java实现操作Redis的客户端有很多，其中名气最高的：**Redisson**，**Jedis**，**lettuce** 3个客户端，其中Jedis，lettuce侧重于单例Redis 数据库的 CRUD（增删改查），Redisson 侧重于分布式开发。当前重点讲解Jedis与lettuce的使用，后续有机会再重点讲解Redisson使用。

## Jedis

项目使用的SpringBoot，所以重点讲解SpringBoot继承Jedis

**步骤1：建项目，导入依赖**

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.4.3</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
    </dependency>

    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

**步骤2：导入配置文件**

```yml
#redis配置--jedis版
jedis:
  pool:
    #redis服务器的IP
    host: localhost
    #redis服务器的Port
    port: 6379
    #数据库密码
    password:
    #连接超时时间
    timeout: 7200
    #最大活动对象数
    maxTotall: 100
    #最大能够保持idel状态的对象数
    maxIdle: 100
    #最小能够保持idel状态的对象数
    minIdle: 50
    #当池内没有返回对象时，最大等待时间
    maxWaitMillis: 10000
    #当调用borrow Object方法时，是否进行有效性检查
    testOnBorrow: true
    #当调用return Object方法时，是否进行有效性检查
    testOnReturn: true
    #“空闲链接”检测线程，检测的周期，毫秒数。如果为负值，表示不运行“检测线程”。默认为-1.
    timeBetweenEvictionRunsMillis: 30000
    #向调用者输出“链接”对象时，是否检测它的空闲超时；
    testWhileIdle: true
    # 对于“空闲链接”检测线程而言，每次检测的链接资源的个数。默认为3.
    numTestsPerEvictionRun: 50


```

**步骤3：加载配置文件**

```java
@Component
@ConfigurationProperties(prefix = "jedis.pool")
@Getter
@Setter
public class JedisProperties {
    private int  maxTotall;
    private int  maxIdle;
    private int  minIdle;
    private int  maxWaitMillis;
    private boolean  testOnBorrow;
    private boolean  testOnReturn;
    private int  timeBetweenEvictionRunsMillis;
    private boolean  testWhileIdle;
    private int  numTestsPerEvictionRun;

    private String host;
    private String password;
    private int port;
    private int timeout;
}
```

**步骤4：编写Jedis配置类**

```java
@Configuration
public class JedisConfig {
    /**
     * jedis连接池
     * @param jedisProperties
     * @return
     */
    @Bean
    public JedisPool jedisPool(JedisProperties jedisProperties) {

        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxTotal(jedisProperties.getMaxTotall());
        config.setMaxIdle(jedisProperties.getMaxIdle());
        config.setMinIdle(jedisProperties.getMinIdle());
        config.setMaxWait(Duration.ofMillis(jedisProperties.getMaxWaitMillis()));
        config.setTestOnBorrow(jedisProperties.isTestOnBorrow());
        config.setTestOnReturn(jedisProperties.isTestOnReturn());
        config.setTimeBetweenEvictionRuns(Duration.ofMillis(jedisProperties.getTimeBetweenEvictionRunsMillis()));
        config.setTestWhileIdle(jedisProperties.isTestWhileIdle());
        config.setNumTestsPerEvictionRun(jedisProperties.getNumTestsPerEvictionRun());

        if (StringUtils.hasText(jedisProperties.getPassword())) {
            return new JedisPool(config, jedisProperties.getHost(), jedisProperties.getPort(),
                    jedisProperties.getTimeout(), jedisProperties.getPassword());
        }
        return new JedisPool(config, jedisProperties.getHost(), jedisProperties.getPort(),
                jedisProperties.getTimeout());
    }
}
```

**步骤5：编写测试类，实现测试**

```java
@SpringBootTest
public class JedisTest {
    @Autowired
    private JedisPool jedisPool;
    @Test
    public void testConnection(){
        System.out.println(jedisPool);
        Jedis jedis = jedisPool.getResource();
        //需求：往redis中添加kv对： name：dafei
        jedis.set("name", "dafei");
        System.out.println(jedis.get("name"));
        jedis.close();
    }
}
```

**操作技巧：jedis中方法跟Redis中命令一样**

## Lettuce

Lettuce 之所以能流行，因为它抱了根好大腿-Spring-data。Spring-data-redis底层就封装了Lettuce，接下来看下Springboot版的lettuce实现。

**步骤1：导入依赖**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

**步骤2：Redis配置**

```yml
spring:
  redis:
    host: 127.0.0.1
    port: 6379
    password: admin
```

**步骤3：编写测试类，实现测试**

```java
@SpringBootTest
public class LettureTest {


    @Autowired
    //约定：
    // 操作redis的key  是字符串
    // value是字符串类型或字符串类型元素
    private StringRedisTemplate template;

    @Test
    public void testRedis(){

        //name：dafei
        template.opsForValue().set("name", "dafei");
        System.out.println(template.opsForValue().get("name"));

        // 操作string
        //template.opsForValue().xx();
        // 操作hash
        //template.opsForHash().xx();
        // 操作list
        //template.opsForList().xx();
        // 操作set
        //template.opsForSet().xx();
        // 操作zset
        //template.opsForZSet().xx();


        //spring-data-redis  方法是redis 命令全称
        //template.opsForList().rightPush()  //rpush

        //全局命令在template类上
        //template.keys("*");
    }
}

```

**操作技巧：Lettuce中方法跟Redis中命令全称**



<br>

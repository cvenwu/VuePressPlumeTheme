---
title: Kafka学习与使用
createTime: 2023/07/24 21:15:55
permalink: /article/inh8wwpp/
author: yirufeng
tags:
  - 中间件
  - kafka
---



## 大纲

![211632-1c9CgT](https://cdn.jsdelivr.net/gh/sivanWu0222/UpicImageHosting@dev/uPic/2023-07-24/211632-1c9CgT.png)


## 环境
> kafka 3.0.0版本（kafka 2.8.0之前必须安装zookeeper才可以安装和使用kafka，2.8.0之后不用安装zookeeper也可以独立运行）

## kafka基础架构
1. 为方便扩展，并提高吞吐量，一个topic分为多个partition
2. 配合分区的设计，提出消费者组的概念，组内每个消费者并行消费
3. 为提高可用性，为每个partition增加若干副本，类似NameNode HA
   1. kafka中的副本有leader和follower之分，生产和消费都是针对leader的，当leader挂了之后，follower有条件可以成为新的leader。
4. ZK中记录谁是leader， Kafka2.8.0以后也可以配置不采用ZK
   1. kafka中还有部分数据存储在zookeeper中，存储整个集群中有哪些节点，以及节点运行的状态，并且记录谁是leader

> 如果要生产 100T 数据，此时单机处理能力有限，一般我们会采用分而治之的策略，此时就会引入分区，把topic切割成多块来提高吞吐量，kafka中会将一个topic分割成多个partition，然后可以让每个服务器存储不同的分区。此时单个消费者肯定无法消费整个主题（因为topic有多个分区），所以此时就需要消费者组。**需要注意的是1个分区的数据只能由1个消费者进行消费，防止不同消费者消费同1个分区的数据不知道消费到哪一条了，容易混乱**

`kafka_2.13-3.5.1.tgz` 表示kafka使用2.13的scala编写的，当前kafka的版本是3.5.1

<!-- more -->

## kafka消费者讲解


### 消费方式

> 正常的消息队列有两种使用方式：Pull（拉）模式、push（推）模式

**kafka采用从broker中主动拉取数据的方式，为什么不采用推呢？**
> 因为broker主动推送数据给消费者的话，每一个消费者消费能力有较大差异，所以该以哪个速率进行推呢。因此kafka采用根据消费者自身情况来拉取数据


**（面试题）pull模式有哪些不足？**
如果topic里面没有数据，那么消费者会一直陷入循环中，也会影响一定效率。![215516-1IKpYb](https://cdn.jsdelivr.net/gh/sivanWu0222/UpicImageHosting@dev/uPic/2023-07-31/215516-1IKpYb.png)


### 消费者整体工作流程

![220519-iyNHRd](https://cdn.jsdelivr.net/gh/sivanWu0222/UpicImageHosting@dev/uPic/2023-07-31/220519-iyNHRd.png)
注意：不是一个消费者组的消费者是完全独立的。如果是一个消费者组，每一个分区中的数据只能由消费者组中的一个消费者来进行消费，否则会重复消费不利于管理。

消费的过程中挂了重启，或者我们随时想知道消费的进度，通过offset来查看，每一个消费者的offset由消费者提交到系统主题中进行保存（即新版本的kafka会将offset记录在系统主题（另外一个topic）中，因为系统主题肯定是持久化到硬盘中，所以可靠性较高）。


**老版本的offset会存储在对应的zookeeper里面，为什么从zookeeper挪到系统主题里面呢？**
> 所有消费者都要与zookeeper进行交互，会导致网络压力剧增，所以维护在系统主题里面方便维护管理

### 消费者组工作原理


Consumer Group (CG)：消费者组，由多个consumer组成。形成一个消费者组的条件，是所有消费者的groupid相同。
- 消费者组内每个消费者负责消费不同分区的数据，一个分区只能由一个组内消费者消费。
- 消费者组之间互不影响。所有的消费者都属于某个消费者组，即消费者组是逻辑上的一个订阅者。
- 如果向消费组中添加更多的消费者，超过主题分区数量，则有一部公消费者就会闲置，不会接收到任何消息
- 消费者组之间互不影响。所有的消费者都属于某个消费者组，即消费者组是逻辑上的一个订阅者

![223250-Fuk4zP](https://cdn.jsdelivr.net/gh/sivanWu0222/UpicImageHosting@dev/uPic/2023-07-31/223250-Fuk4zP.png)

![223357-vQExR5](https://cdn.jsdelivr.net/gh/sivanWu0222/UpicImageHosting@dev/uPic/2023-07-31/223357-vQExR5.png)


### 消费者组初始化流程
每一个broker都有一个coordinator，再平衡会影响kafka的性能。
![224545-QCu3fW](https://cdn.jsdelivr.net/gh/sivanWu0222/UpicImageHosting@dev/uPic/2023-07-31/224545-QCu3fW.png)


### 消费者组详细消费流程
![224942-Shubfb](https://cdn.jsdelivr.net/gh/sivanWu0222/UpicImageHosting@dev/uPic/2023-07-31/224942-Shubfb.png)

### 消费者消费一个主题

步骤一般是：配置(连接,反序列化,消费组id)->创建消费者->消费者配置->订阅主题(使用subscribe订阅主题)->拉取数据

1. `ConsumerRecords<String, String> consumerRecords = kafkaConsumer.polL(Duration.ofSeconds (1));`表示拉取不同批次数据时之间的间隔时间
2. `bin/kafka-console- producer.sh --bootstrap-server hadoop102:9092 --topic first`表示开始向first主题发送数据
3. 

注意：
1. **在消费者 API 代码中必须配置消费者组 id**。之前使用命令行启动消费者时，如果不填写消费者组id会被自动填写随机的消费者组id.
2. 某个消费者可以消费多个主题的数据


### 消费者消费某一个分区
步骤一般是：配置(连接,反序列化,消费组id)->创建消费者->消费者配置->订阅主题(使用assign订阅分区)->拉取数据

```java
ArrayList<TopicPartition> topicPartitions = new ArrayList<>()；
// 第1个参数是主题，第2个参数是分区
topicPartitions.add(new TopicPartition("first", 0))；
kafkaConsumer.assign(topicPartitions);
```

### 消费者组案例
需求：验证同一个主题的分区数据只能由同一个消费者组中的一个进行消费


### 消费者-Range分配
问题发生：一个consumer group中有多个consumer组成，一个 topic有多个partition组成，现在的问题是，到底由哪个consumer来消费哪个
partition的数据。
解决方案：Kafka有四种主流的分区分配策略：Range、 RoundRobin、 Sticky、 CooperativeSticky。可以通过配置参数`partition.assignment.strategy`，修改分区的分配策略。默认策略是`Range + CooperativeSticky`。Kalka可以同时使用多个分区分配策略。
![222659-Y9LfL6](https://cdn.jsdelivr.net/gh/sivanWu0222/UpicImageHosting@dev/uPic/2023-08-01/222659-Y9LfL6.png)
![222734-fhP5sf](https://cdn.jsdelivr.net/gh/sivanWu0222/UpicImageHosting@dev/uPic/2023-08-01/222734-fhP5sf.png)
![223033-2bTbGV](https://cdn.jsdelivr.net/gh/sivanWu0222/UpicImageHosting@dev/uPic/2023-08-01/223033-2bTbGV.png)

案例是这样的：
现在有某个topic，有7个分区，涉及到3个消费者，按照最开始的Range分配策略，每个消费者会得到7/3=2个分区，剩余的按照消费者id进行排序划分，比如这里剩余1个分区，就划分给consumer0，所以consumer0分配0、1、2分区，consumer1分配3、4分区，consumer2分配5、6分区。
- 当consumer0挂了之后，过超时时间之后就会把这部分没有消费的数据（0、1、2分区的数据）全部转发给另外一个选择到的consumer。
- 当认为consumer0退出消费者组之后，就会触发rebalance机制，重新对7个分区进行划分，那么consumer0得到0、1、2、3分区的数据，consumer1得到4、5、6分区的数据


Tips: 官方文档中也可以查询到分区分配策略的参数


注意：分区数只可以增加不可以减少

### 消费者-Roundrobin策略

> Range分配策略是针对一个topic而言，RoundRobin是针对所有topic而言，

使用Roundrobin策略的时候记得指定，不然会使用默认的Range分配策略


案例：现在有某个topic，有7个分区，涉及到3个消费者，按照最开始的Roundrobin分配策略，其中一个消费者会得到0、3、6分区的数据，另外一个消费者得到1、4分区的数据，最后一个消费者得到2、7分区的数据。当其中一个消费者退出之后，该消费者对应分区的数据执行Roundrobin策略进行分配，比如消费1、4分区数据的消费者退出，1、4分区分别会落到两个消费者上
当生产者重新发送数据，触发rebalance，第一个消费者拿到0、2、4、6分区的数据，另外一个消费者拿到3、5、7分区的数据


### 消费者-sticky
原理：消费者分配的分区数量尽可能均匀但顺序尽可能随机

程序重新启动，消费者消费的分区序号与上一次极大概率会不同。

案例：现在有某个topic，有7个分区，涉及到3个消费者。比如某一个消费者挂了之后，消费的分区数据会随机分配给其他消费者，比如消费者2之前负责消费3、4分区的数据，退出之后3分区的数据会分配给其中一个消费者，4分区的数据会分配给另外一个消费者。


```java
//设置分区分配策略
properties.put(ConsumerConfig. PARTITION_ASSIGNMENT_STRATEGY_CONFIG, "org.apache.kafka.clients.consumer.StickyAssignor");
```

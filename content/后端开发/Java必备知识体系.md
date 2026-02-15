---
title: Java必备知识体系
description: 关于Java的知识框架
urlname: java-base
date: 2023-01-09
tags:
  - Java
categories:
  - 后端开发
draft: false
---
# 一 Java基础

> [!tip] 量大管饱：[廖雪峰Java教程](https://liaoxuefeng.com/books/java/introduction/index.html)


# 二 快速开发的一次经历

> 应该是最后一次被动使用Java开发应用，Gitee项目地址[在此](https://gitee.com/Hammerzer/baiyun-back-end)


> [!tip] 这个Up主的视频是真的顶，直接让我零基础Springboot，视频《一小时带你从0到1实现一个SpringBoot项目开发》[传送门](https://www.bilibili.com/video/BV1gm411m7i6/?spm_id_from=333.999.0.0)，牛批！

使用到的库和依赖如下：

- `Springboot`
    
- `Jpa`：CUDR生成
    
- `lombok`：使用注解简化代码，如`Getter`/`Setter`方法生成
    
- `EasyExcel`：Excel导入导出
    
- `logback`：日志答应
    
- `screw`：数据库文档生成
    

这也都是零基础使用，算是快速上手开发，只为完成任务。至于更深入的，比如：`MyBatis`和`MyBatis Plus`、数据库更深的那些锁什么的【在Service层实现对DAO数据的校验，保证数据库数据正确性】等，都没有涉及，此处也不再多说。

# 三 Java进阶

## Java进阶系统学习路线

### 阶段一：Java核心进阶
1. **Java集合框架**
2. **Java并发编程**
3. **Java IO与NIO**
4. **Java虚拟机（JVM）**
5. **Java反射与注解**

### 阶段二：数据库与持久化
1. **MySQL高级**
2. **Redis缓存**
3. **MyBatis框架**
4. **Hibernate框架**

### 阶段三：Web开发
1. **Servlet与JSP**
2. **Spring框架**
3. **Spring MVC**
4. **Spring Boot**
5. **Spring Cloud**

### 阶段四：微服务与分布式
1. **Dubbo/RPC**
2. **消息队列（RabbitMQ/Kafka）**
3. **分布式协调（Zookeeper）**
4. **分布式缓存（Redis Cluster）**
5. **分布式事务**

### 阶段五：性能优化与架构
1. **JVM调优**
2. **数据库优化**
3. **高并发系统设计**
4. **系统架构设计**

## 必会的知识架构

### 1. Java核心技术
- **Java集合框架**：List、Set、Map的实现原理（ArrayList、LinkedList、HashMap、TreeMap等），集合的遍历、排序、去重方法。
- **Java并发编程**：线程基础、synchronized、Lock锁、线程池、并发集合（ConcurrentHashMap、CopyOnWriteArrayList等）、Java内存模型。
- **JVM**：类加载机制、JVM内存结构、垃圾回收算法、JVM调优工具（jstat、jmap、jstack、jconsole等）。

### 2. 数据库技术
- **MySQL高级**：索引优化、SQL优化、事务隔离级别、锁机制、分库分表、主从复制。
- **Redis**：Redis数据结构、缓存穿透/击穿/雪崩、Redis持久化（RDB/AOF）、Redis Cluster。

### 3. Spring生态
- **Spring框架**：IOC容器、AOP原理、Bean生命周期、Spring注解、Spring事务管理。
- **Spring Boot**：自动配置原理、Starter机制、Actuator监控、Spring Boot整合其他组件。
- **Spring Cloud**：Eureka/Nacos服务注册中心、Ribbon/Feign负载均衡、Hystrix/Sentinel熔断降级、Gateway网关。

### 4. Web开发
- **Servlet**：Servlet生命周期、HTTP请求/响应、Session/Cookie、过滤器与监听器。
- **RESTful API**：RESTful设计原则、HTTP状态码、API文档（Swagger）。

## 需要了解的知识架构

### 1. 架构模式
- **微服务架构**：微服务拆分原则、服务通信、服务治理。
- **分布式系统**：CAP定理、BASE理论、一致性哈希、分布式锁。

### 2. 中间件
- **消息队列**：RabbitMQ（AMQP）、Kafka（高吞吐量）、消息队列应用场景。
- **分布式协调**：Zookeeper原理、ZAB协议、Curator客户端。

### 3. 性能优化
- **JVM调优**：GC调优、内存泄漏排查、性能监控。
- **数据库优化**：SQL优化、索引优化、慢查询分析。

### 4. 其他技术
- **Docker容器化**：Docker基本命令、Docker Compose、镜像制作。
- **Kubernetes**：K8s基本概念、Deployment、Service、Ingress。

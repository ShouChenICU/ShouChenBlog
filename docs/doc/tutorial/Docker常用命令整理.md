---
cover: /imgs/docker.webp
title: Docker常用命令整理
tags: Linux Docker Command
description: Docker常用命令整理和记录
author: ShouChen
category: tutorial
updateTime: 2024-04-07T19:00:00+08:00
draft: false
---

## 一、基础用法

### 1、搜索镜像

```bash
sudo docker search <搜索内容>

# 示例
sudo docker search alpine
```

### 2、拉取镜像

```bash
sudo docker pull <镜像名>

# 示例
sudo docker pull alpine
```

### 3、启动容器

```bash
sudo docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

**示例1**：启动镜像名为`alpine`的容器，执行容器中的`/bin/sh`程序，并连接到控制台

```bash
sudo docker run -it alpine /bin/sh
```

> 可以使用`Ctrl`+`p`，`Ctrl`+`q`组合键来分离控制台，不会停止容器进程  
> 如果找不到镜像将会尝试自动拉取镜像

**示例2**：启动镜像名为`alpine`的容器，执行容器中的`/bin/sh`程序，并放到后台运行

```bash
sudo docker run -d alpine /bin/sh
```

> 如果不指定`/bin/sh`，则会执行镜像的默认启动命令，一般在`Dockerfile`的`CMD`命令指定

::: tip
Docker的`镜像`和`容器`是两个重要的概念，`镜像`是`容器`的模板，每个`容器`都有自己的持久层来存储运行时的数据，每次执行`docker run`都会产生一个新的`容器`，哪怕启动失败，所以请注意要及时删除不用的容器
:::

### 4、显示容器列表

```bash
# 显示正在运行中的容器列表
sudo docker ps

# 显示全部容器列表，包括已终止的
sudo docker ps -a

# 同时显示容器占用存储空间的大小
sudo docker ps -s
```

### 5、停止容器

```bash
sudo docker stop [OPTIONS] CONTAINER [CONTAINER...]
```

**示例1**： 停止ID为`b5ab7d24773d`的容器

```bash
sudo docker stop b5ab7d24773d
```

**示例2**： 停止名称为`alpine`的容器

```bash
sudo docker stop alpine
```

### 6、启动容器

```bash
# 启动已结束的容器
sudo docker start [容器ID/容器名称]
```

### 7、删除容器

```bash
sudo docker rm [容器ID/容器名称]
```

### 8、设置容器名称

```bash
sudo docker rename [容器ID/容器名称] <新名称>
```

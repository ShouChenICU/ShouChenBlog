---
cover: /imgs/banner.webp
title: Termux-X11图形硬件加速
tags: Termux X11 virglrenderer Android
description: 利用virglrenderer加速Termux-X11的图形性能
author: ShouChen
category: tutorial
updateTime: 2024-04-17T12:00:00+08:00
draft: false
---

## 准备工作

Termux内安装virgl-test-server-android

```bash
apt install x11-repo
apt update
apt install virgl-test-server-android
```

然后将Termux的tmp目录映射到chroot中（主要是.virgl_test这个Unix域套接字）

## 启动virgl服务

设置环境变量

```bash
export GALLIUM_DRIVER=virpipe
export GLIBGL_ALWAYS_SOFTAWRE=1
# 可选
# export GMESA_GL_VERSION_OVERRIDE=4.0
```

## 最后启动X程序即可

```bash
glxgears -info

startxfce4
```
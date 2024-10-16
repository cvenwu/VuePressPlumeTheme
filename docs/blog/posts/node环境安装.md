---
title: node环境安装
createTime: 2024/10/12 12:51:07
author: yirufeng
permalink: /article/khzwm2gm/
tags:
  - node
  - 环境安装
---

## node环境设置

### 普通安装
点击[node官网](https://nodejs.org/zh-cn/download/package-manager)下载安装即可

### windows升级node版本
直接在[node官网](https://nodejs.org/zh-cn/download/package-manager)下载msi二进制安装文件重新安装即可


## yarn安装
### 安装 v2 版本的 yarn
> 需要 node 版本 20 以上
1. 使用 `node -v`检查 node 的版本信息
2. 使用 `sudo npm install -g yarn@berry`安装 yarn 的 v2 版本

### 安装普通版本的yarn
执行命令`npm install --global yarn`


### node版本升级后升级对应的yarn
执行命令：`npm install --global yarn`

## 安装 nvm

## 安装对应的 node 版本
1. 使用`nvm list available`查看可用的Node版本
2. 使用`nvm install node-version-number`安装对应版本的node，例如，`nvm install 14.20.0`

## 安装 pnpm
## 卸载 pnpm
执行命令`npm rm -g pnpm`

<!-- more -->


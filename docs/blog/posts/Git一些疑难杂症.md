---
title: Git一些疑难杂症
author: yirufeng
createTime: 2024/05/12 14:54:29
tags:
  - Git
  - Problems
permalink: /article/4x6pihii/
---


## Git无法看到分支
> 当使用`git init`初始化一个仓库后，使用`git branch`命令无法看到当前分支


### 原因
第一次初始化时一定要先使用`git add .`和`git commit -m "提交信息"`这两个命令后才会出现master分支，并且可以创建其它分支。

## Git设置当前仓库的用户名和邮箱
执行如下指令即可：
```go

```

<!-- more -->
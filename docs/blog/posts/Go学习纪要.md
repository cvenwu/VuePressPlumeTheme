---
title: Go学习纪要
createTime: 2024/10/14 19:55:56
permalink: /article/2rt81ud9/
tags:
  - Go
---

## 开发环境安装
1. [官网](https://go.dev/dl/)下载安装即可，其他Linux环境下可以直接将源码包解压到`/usr/local`目录中，并且目录名要定义为go
2. 配置环境变量
   1. `GOROOT`表示Go源码包安装的路径
   2. `GOPATH`表示当前开发者写Go语言的开发路径，所以我们写的代码都在`GOPATH`中。在接触go mod之后我们就不需要这个环境变量了
   3. `PATH`在原来基础上加入`GOROOT`的bin路径以及`GOPATH`的bin路径
3. 检测开发环境是否OK
   1. 手动加载`~/.bashrc`
   2. 执行命令查看Go版本`go version`，如果没有任何错误提示表示环境搭建成功

### iota与const学习
iota只能出现在const中，iota只有在const中才有累加效果，每行累加1，第一行从0开始

![110715-Txlqq2](https://cdn.jsdelivr.net/gh/cvenwu/UpicImageHosting@dev/uPic/2024-10-15/110715-Txlqq2.png)

::: code-tabs
@tab const.go
```go
package main

import "fmt"

// const可以用来定义枚举类型
const (
	BEIJING   = 0
	SHANGHAI  = 1
	GUANGZHOU = 2
	CHONGQING = 3
	SHENZHEN  = 4
	HAERBIN   = 5
)

// const与iota搭配使用
const (
	a, b = iota + 1, iota + 2
	c, d
	e, f

	g, h = iota * 2, iota * 3
	i, k
)

func main() {

	// 定义一个常量
	const length int = 32
	fmt.Println("length = ", length)

	// 报错：常量不允许修改
	// length = 33

	fmt.Println(a, b, c, d, e, f)
	fmt.Println(g, h, i, k)

}

```

@tab output
```ts
length =  32
1 2 2 3 3 4
6 9 8 12
```
:::

### import、const、var 与 init函数执行顺序
![112912-ezd7YG](https://cdn.jsdelivr.net/gh/cvenwu/UpicImageHosting@dev/uPic/2024-10-15/112912-ezd7YG.png)

![124933-tf0dKK](https://cdn.jsdelivr.net/gh/cvenwu/UpicImageHosting@dev/uPic/2024-10-15/124933-tf0dKK.png)

### 几种不同的导包方式
![130043-IsrgN3](https://cdn.jsdelivr.net/gh/cvenwu/UpicImageHosting@dev/uPic/2024-10-15/130043-IsrgN3.png)

1. 匿名导入：无法使用当前包的方法，但是会执行包内部的init方法。Go语言如果我们导入一个包没有使用就会报错，如果我们有一个需求是导入包但是不使用这个包里面的内容，我们可以通过**匿名导入**的方式来进行解决`import _ 包名`
2. 别名导入：给包起一个别名，通过别名调用导入
3. 当前导入（不推荐）：表示将包里面的全部方法导入到当前本包的作用域中，fmt包中全部的方法可以直接使用API来调用



```go
package main

import (
	"fmt"
	_ "math"      // 匿名导入
	mysort "sort" // 起一个别名
	. "sync"      // 表示导入包的内容，下次不需要使用包名.来调用，注意方法名可能冲突
)

func main() {
	fmt.Println("123")
	mysort.IntsAreSorted([]int{1, 2, 3})
	fmt.Println(Mutex{})
}
```
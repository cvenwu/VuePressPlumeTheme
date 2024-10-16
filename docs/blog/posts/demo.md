---
title: demo
author: yirufeng
createTime: 2024/05/12 09:58:29
tags:
  - redis
sticky: 5
permalink: /article/7zs63svx/
---




### 上下角标

- 19^th^
- H~2~O

### 不同风格的提示和警报


::: caution STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::


::: note
This is a note box
:::

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: caution
This is a dangerous warning.
:::

::: details
This is a details block.
:::


Github风格的提示和警报：

> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。


### 代码选项卡

::: code-tabs
@tab config.js
```js
/**
 * @type {import('vuepress').UserConfig}
 */
const config = {
  // ..
}

export default config
```

@tab config.ts
```ts
import type { UserConfig } from 'vuepress'

const config: UserConfig = {
  // ..
}

export default config
```

@tab config.go
```go
func main() {

}
```
:::



::: tabs
@tab npm

npm 应该与 Node.js 被一同安装。

@tab pnpm

```sh
corepack enable
corepack use pnpm@8
```

:::

### 折叠代码块：


::: code-tabs

@tab:active 先序遍历方式1.go
```go :collapsed-lines
//✅代码
func PreorderTraverse(root *TreeNode) []int {
	if root == nil {
		return nil
	}

	var ret []int
	ret = append(ret, root.Val)
	if root.Left != nil {
		ret = append(ret, PreorderTraverse(root.Left)...)
	}

	if root.Right != nil {
		ret = append(ret, PreorderTraverse(root.Right)...)
	}

	return ret
}
```

@tab 先序遍历方式2.go
```go
func PreorderTraverseII(root *TreeNode) []int {
	if root == nil {
		return nil
	}

	var ret []int
	ret = append(ret, root.Val)
	ret = append(ret, PreorderTraverse(root.Left)...)
	ret = append(ret, PreorderTraverse(root.Right)...)

	return ret
}
```

:::


### 卡片

<!-- 单个卡片 -->
::: card title="标题" icon="twemoji:astonished-face"

这里是卡片内容。
:::

<!-- 多个卡片 -->
:::: card-grid

::: card title="卡片标题 1" icon="twemoji:astonished-face"

这里是卡片内容。
:::

::: card title="卡片标题 2" icon="twemoji:astonished-face"

这里是卡片内容。
:::

::::

::: card title="卡片标题" icon="twemoji:astonished-face"

这里是卡片内容。
:::


:::: card-grid
::: card title="卡片标题 1" icon="twemoji:astonished-face"

这里是卡片内容。
:::

::: card title="卡片标题 2" icon="twemoji:astonished-face"

这里是卡片内容。
:::
::::


### 步骤

:::: steps
1. 步骤 1

   ```ts
   console.log('Hello World!')
   ```

2. 步骤 2

   这里是步骤 2 的相关内容

3. 步骤 3

   ::: tip
   提示容器
   :::

4. 结束
::::
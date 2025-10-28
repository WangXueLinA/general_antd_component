# react/vue不同点

## 核心思想不同

Vue早期定位是尽可能的降低前端开发的门槛（这跟Vue作者是独立开发者也有关系）。所以Vue推崇灵活易用（渐进式开发体验），数据可变，双向数据绑定（依赖收集）。

React推崇函数式编程（纯组件），数据不可变以及单向数据流。函数式编程最大的好处是其稳定性（无副作用）和可测试性（输入相同，输出一定相同），所以通常大家说的React适合大型应用，根本原因还是在于其函数式编程。

| 维度     | Vue                | React                               |
| -------- | ------------------ | ----------------------------------- |
| 哲学     | 渐进式框架         | 声明式组件化库                      |
| 核心目标 | 低门槛、高集成     | 灵活性、自由组合                    |
| 典型场景 | 快速开发中小型项目 | 复杂大型应用（如企业级/跨平台开发） |
| 设计特点 | 官方提供完整技术栈 | 专注视图层，生态由社区驱动          |

由于两者核心思想的不同，所以导致Vue和React许多外在表现不同（从开发层面看）。

## 语法与开发模式

Vue推崇template（简单易懂，从传统前端转过来易于理解）、单文件vue。而且虽然Vue2.0以后使用了Virtual DOM，使得Vue也可以使用JSX（babel工具转换支持），但Vue官方依然首先推荐template，这跟Vue的核心思想和定位有一定关系。

- 基于 HTML 的模板语法（.vue 单文件组件）
- 指令系统（v-if, v-for, v-model）
- 支持 JSX 但非主流用法

```js
<template>
  <button @click="count++">{{ count }}</button>
</template>
```

React：

- 强制使用 JSX（JavaScript + HTML 混合语法）
- 完全 JavaScript 表达视图逻辑

```js
// React JSX
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

## 核心思想不同导致api差异

Vue定位简单易上手，基于template模板 + options API，所以不可避免的有较多的概念和api。比如template模板中需要理解slot、filter、指令等概念和api，options API中需要理解watch、computed（依赖收集）等概念和api。

React本质上核心只有一个Virtual DOM + Diff算法，所以API非常少，知道setState就能开始开发了。


## 响应式原理对比

| 机制       | Vue (v3)                | React                       |
| ---------- | ----------------------- | --------------------------- |
| 实现方式   | Proxy 数据劫持          | 虚拟 DOM + 手动状态更新     |
| 更新粒度   | 组件级/属性级细粒度更新 | 组件级重新渲染              |
| 副作用管理 | watch/watchEffect       | useEffect                   |
| 性能优化   | 自动依赖跟踪            | 需手动优化（React.memo 等） |

## diff 算法

想象一下：你有一个玩具箱（DOM 树），里面堆满了玩具（节点）。现在你想按新顺序整理玩具，但不想全部重新摆一遍，而是尽量复用旧的玩具位置。Vue3 和 React 整理玩具的策略不同

vue3先看头和尾：

- 看一眼最前面的玩具，如果新旧顺序一样（比如都是乐高），直接跳过不管。
- 再看最后面的玩具，如果一样（比如都是积木），也跳过。
- 中间的玩具再仔细处理。

贴标签找对应（key）：如果玩具上贴了唯一标签（比如“小明的乐高”），直接按标签快速找到新旧对应关系，复用旧位置。

只移动必要的玩具：中间的玩具如果大部分顺序没变（比如“小车、恐龙、飞机”变成“恐龙、飞机、小车”），Vue3 会找到最长不用动的那部分（恐龙 → 飞机），只移动剩下的（小车）。

结果：省时省力，动作最少。


React按顺序一个个对比：

- 不管头尾，直接从第一个玩具开始对比新旧顺序。
- 如果发现第一个位置的新玩具（比如原本是乐高，现在变成积木），直接扔了旧的，放新的。

依赖标签提示（key）：如果玩具贴了标签，React 能更快找到对应关系。

但没标签的话，就按位置硬匹配，容易误判（比如把第二个玩具当成第一个）。

可能多做无用功：如果中间插入一个新玩具（比如旧顺序是 A-B-C，新顺序是 A-D-B-C），React 会以为 B 变成了 D，C 变成了 B，导致删掉 B、C，创建 D、B、C。

### 为啥会采用这种不同的方式?

Vue 相信“大部分结构是固定的”，React 相信“结构可能是完全动态的”

```js
// Vue模板是声明式的，结构清晰固定
<template>
  <div>
    <header>{{ title }}</header>
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.text }}</li>
    </ul>
  </div>
</template>
```

Vue 的模板在编译阶段就被分析完毕，框架知道哪里是静态内容（如`<header>`标签），哪里是动态内容（如 v-for 循环）。

带来的优势：可以提前做优化（比如静态节点提升），运行时只需要关注变化的部分。

```js
function DynamicList({ items, layout }) {
  return (
    <div>
      {layout === 'grid' ? (
        <div className="grid">{items.map(renderItem)}</div>
      ) : (
        <ul className="list">{items.map(renderItem)}</ul>
      )}
    </div>
  );
}
```

JSX 本质是 JavaScript 的语法糖，可以随意嵌套逻辑（如三元表达式、map 循环）。React 可以随时根据数据变化生成完全不同的 DOM 结构。

带来的灵活性：适合需要高度动态交互的场景（如拖拽生成界面、实时数据可视化），但需要开发者自己控制优化（如合理使用 key）。

具体例子：列表渲染

```js
// vue 需要提前定义两种布局
<template>
  <div v-if="isHorizontal" class="horizontal-list">
    <Item v-for="item in list" :key="item.id" />
  </div>
  <ul v-else class="vertical-list">
    <Item v-for="item in list" :key="item.id" />
  </ul>
</template>


// react
function List({ items, isHorizontal }) {
  // 可以动态选择容器标签
  const Container = isHorizontal ? 'div' : 'ul';

  return (
    <Container className={isHorizontal ? 'horizontal' : 'vertical'}>
      {items.map(item => (
        <Item key={item.id} />
      ))}
    </Container>
  );
}
```

Vue 需要明确写出两种分支结构，React 却可以动态决定使用`<div>`还是`<ul>`作为容器，甚至容器类型可以是动态变量。

## 事件机制不同
Vue: 

Vue原生事件使用标准Web事件
Vue组件自定义事件机制，是父子组件通信基础

React:

React原生事件被包装，所有事件都冒泡到顶层document监听，然后在这里合成事件下发。基于这套，可以跨端使用事件机制，而不是和Web DOM强绑定。
React组件上无事件，父子组件通信使用props

## 数据更新机制不同

一、基础更新机制对比

React useState 更新机制
状态更新：异步
DOM 更新：异步

```js
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    console.log('更新前:', count); // 0
    
    setCount(count + 1);
    console.log('更新后立即获取:', count); // 0 (还是旧值)
    
    // 多个更新会被合并
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };
  
  // 状态真正更新后触发
  useEffect(() => {
    console.log('状态已更新:', count);
    console.log('DOM 已更新:', document.getElementById('count').textContent);
  }, [count]);
  
  return <div id="count">{count}</div>;
}
```

Vue 3 ref/reactive 更新机制
状态更新：同步
DOM 更新：异步

```js
<template>
  <div id="count">{{ count }}</div>
  <button @click="handleClick">Increment</button>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const count = ref(0);

const handleClick = async () => {
  console.log('更新前:', count.value); // 0
  
  count.value = count.value + 1;
  console.log('更新后立即获取:', count.value); // 1 (立即更新)
  
  // DOM 还未更新
  console.log('DOM 当前值:', document.getElementById('count').textContent); // 0
  
  // 等待 DOM 更新完成
  await nextTick();
  console.log('DOM 更新后:', document.getElementById('count').textContent); // 1
};
</script>
```

二、setTimeout 场景下的行为
React 在 setTimeout 中的表现

```js
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  const handleTimeout = () => {
    setTimeout(() => {
      console.log('setTimeout 内 - 更新前:', count); // 0
      
      setCount(count + 1);
      console.log('setTimeout 内 - 更新后:', count); // 0 (异步更新)
      
      // React 18 中，setTimeout 内的多个更新也会被批处理
      setCount(prev => prev + 1);
      setCount(prev => prev + 1);
    }, 1000);
  };
  
  useEffect(() => {
    console.log('状态已更新:', count);
  }, [count]);
  
  return (
    <div>
      <div id="count">{count}</div>
      <button onClick={handleTimeout}>Start Timeout</button>
    </div>
  );
}
```

React 18 之前 vs React 18：
React 18 之前：setTimeout 内的更新不会被批处理
React 18：setTimeout 内的更新会被批处理（默认开启自动批处理）


Vue 3 在 setTimeout 中的表现

```js
<template>
  <div id="count">{{ count }}</div>
  <button @click="handleTimeout">Start Timeout</button>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const count = ref(0);

const handleTimeout = () => {
  setTimeout(async () => {
    console.log('setTimeout 内 - 更新前:', count.value); // 0
    
    count.value = count.value + 1;
    console.log('setTimeout 内 - 更新后:', count.value); // 1 (同步更新)
    
    // DOM 还未更新
    console.log('DOM 当前值:', document.getElementById('count').textContent); // 0
    
    await nextTick();
    console.log('nextTick 后:', document.getElementById('count').textContent); // 1
    
    // 多个更新会被合并
    count.value = count.value + 1;
    count.value = count.value + 1;
    console.log('多次更新后:', count.value); // 3
    
    await nextTick();
    console.log('最终 DOM 值:', document.getElementById('count').textContent); // 3
  }, 1000);
};
</script>
```

| 场景 | React useState | Vue 3 ref/reactive |
|------|---------------|-------------------|
| **状态更新** | 异步 | 同步 |
| **DOM 更新** | 异步 | 异步 |
| **setTimeout 内状态更新** | 异步 | 同步 |
| **settimeout 内 DOM 更新** | 异步 | 异步 |
| **settimeout 内批处理** | React 18 支持 | 自动合并 |
| **闭包问题** | 存在 | 不存在 |
| **获取最新状态** | 需要 useEffect 或函数式更新 | 直接访问 .value |

> 说明：React 18 引入了自动批处理机制，在 setTimeout 等异步场景下也能批处理更新。Vue 3 的响应式系统基于 Proxy，状态更新是同步的，但 DOM 更新是异步的，通过 nextTick 可以等待 DOM 更新完成。
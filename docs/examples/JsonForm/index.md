# JsonForm： 表单

<script setup>
import Demo from './Demo.vue'
import Demo1 from './Demo1.vue'
import Demo2 from './Demo2.vue'
import Demo3 from './Demo3.vue'
import Demo4 from './Demo4.vue'
import Demo5 from './Demo5.vue'
</script>

## 介绍
JsonForm 是基于 ant-design-vue 的表单组件，通过 json 配置实现表单的渲染，组件内置的表单都是基于ant-design-vue 的表单组件，有Input、TextArea、InputNumber、Select、Radio、RadioGroup、Checkbox、CheckboxGroup、DatePicker、RangePicker、Switch、TreeSelect及详情的Text跟Time 组件

## 基础用法

通过注入已有的表单组件，即可实现表单的渲染，如需增加其他表单组件，可在`registerForm`文件中进行增加

<div style="border: 1px solid #eee; padding: 20px"><Demo></Demo></div>

::: details 查看代码
<<< ./Demo.vue
:::

## 自定义表单

支持自定义表单，通过`h`函数来创建表单节点

<div style="border: 1px solid #eee; padding: 20px"><Demo1></Demo1></div>

::: details 查看代码
<<< ./Demo1.vue
:::

## 异步获取表单数据

表单组件（如 Select、TreeSelect、CheckboxGroup、RadioGroup）支持通`options`属性直接配置渲染数据；新增`getOptions`异步方法，可动态获取并加载表单数据，灵活适配需要远程请求的场景。需返回一个 Promise 对象，格式为：`{ label: string, value: string | number }[]`

<div style="border: 1px solid #eee; padding: 20px"><Demo2></Demo2></div>

::: details 查看代码
<<< ./Demo2.vue
:::

## 内置详情Text及日期Time组件

内置详情Text组件，可以使表单支持编辑跟详情使用一套代码逻辑，时间格式表单详情为Time，极大简化代码量

<div style="border: 1px solid #eee; padding: 20px"><Demo4></Demo4></div>

::: details 查看代码
<<< ./Demo4.vue
:::

## 布局


<div style="border: 1px solid #eee; padding: 20px"><Demo3></Demo3></div>

::: details 查看代码
<<< ./Demo3.vue
:::

## 复杂表单

<div style="border: 1px solid #eee; padding: 20px"><Demo5></Demo5></div>

::: details 查看代码
<<< ./Demo5.vue
---
<<< ./components/table.vue
:::


## API

| 参数名                    | 类型       | 默认值 | 说明                                             |
| ------------------------- | ---------- | ------ | ------------------------------------------------ |
| columns               | FormItem[] | 无     | 表单列配置数组                                   |
| span                      | number     | 无     | a-col 组件的 span 属性，用于控制表单项的布局个数 |
| 其余参数同 antd form 一样 | ---        | ---    | 参考 antd form                                   |


### columns 参数

| 参数名         | 类型                | 说明                                                                                                                   |
| -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| el             | **string \| Function**  | 表单项使用的组件名称（在 registerForm 文件中查看枚举）或自定义组件函数或 h 函数生成组件                                |
| label          | string              | 表单项的标签文本                                                                                                       |
| field          | string              | 同表单绑定的 v-model:value 或者 v-model:checked                                                                        |
| value          | any                 | 表单项的默认值                                                                                                         |
| isShow         | boolean             | 表单项的显示隐藏                                                                                                       |
| getOptions     | Promise.resolve     | 表单项有 options 配置的可以通过 getOptions 函数异步拿取 options 并将数据 return 为 Array<{label：'显示标题', value：'值'}> |
| 剩余表单 props | any                 | 表单项各自的属性的配置可直接作用到表单项上                                                                       |

引入组件可以通过 import 来导入，或者内部的 hook 方式引入组件，抛出的实例可根据业务进行自己增加或者修改

```js
<template>
  <JsonForm />
</template>
  import { useForm } from '@/components/Form/useForm';
  import { JsonForm, validateFields } = useForm()
```

registerForm 可根据需要进行增加全局通用的表单组件进行统一配置，或单独自定义组件来导入

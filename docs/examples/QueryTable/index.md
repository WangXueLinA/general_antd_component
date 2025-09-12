# QueryTable： 列表查询

<script setup>
import Demo from './Demo.vue'

</script>

## 基础用法

通过json配置实现表单查询显示table列表，无需关注分页等逻辑，组件内部会自动处理

<div style="border: 1px solid #eee; padding: 20px"><Demo></Demo></div>

::: details 查看代码
<<< ./Demo.vue
:::

## API

| 名称           | 类型                                                                                                                                        | 说明                                                                                                                                                                                                                      |
| ------------------- |  -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bottomExtra    | v-slot:bottomExtra                                                                                           | 搜索表单下方的操作按钮组插槽                                                                     |
| formProps           | [FormProps](/examples/QueryTable/#my-FormProps)                                                                                       | 搜索表单的配置信息，包含 columns（Form 的 json 配置）、defaultData（表单默认数据）、layout（表单布局方式）、labelCol（表单标签列布局配置）、wrapperCol（表单控件列布局配置）等 |
| tableProps          | 详见：[TableProps](https://www.antdv.com/components/table-cn#api)                                                     | 表格的配置信息，同ant-design-vue的 Table 的传值一样                                                                                                                  |
| requestApi          | `(params: Record<string, any>) => Promise<any>`             | 后端请求数据接口，返回一个 Promise，                                                                                          | 用于获取表格数据的异步请求函数，接收一个包含请求参数的对象，返回一个 Promise                                                                                                                                              |
| formatParams        | `(params: Record<string, any>) => Record<string, any>`        `                                                                                 | 用于格式化请求参数的函数，接收一个包含原始请求参数的对象，返回一个格式化后的请求参数对象                                                                                                                                  |

### FormProps {#my-FormProps}

| 名称 | 类型 | 说明 |
| ----- | ----- | ----- |
| defaultData | Record<string, any> | 表单默认数据，适用于传给后端一些固定参数 |
| 剩余参数 | [FormProps](/examples/JsonForm/#api) | 表格查询表单枚举，同JsonForm配置一样 |


## useQueryTable
useQueryTable 组合式函数，其主要功能是创建 QueryTable 组件的实例，并返回一些用于操作该组件的方法。可根据需要自己添加暴露在实例上的方法

```js
<template>
  <QueryTable/>
</template>
<script setup>
   import { useQueryTable } from '@/components/QueryTable/useQueryTable';
   const { QueryTable, handleRefresh } = useQueryTable()
</script>
```

# QueryTable

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

| Prop 名称           | 类型                                                   | 是否必填 | 默认值                                                                                       | 说明                                                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| topActionButtons    | Array<ButtonProps & { label: string }>   | 否       | undefined                                                                                    | 顶部操作按钮数组，每个按钮对象包含 ant-design-vue 的 Button的props及label（按钮显示文本）                                                                     |
| bottomActionButtons | Array<ButtonProps & { label: string }>   | 否       | undefined                                                                                    | 同 topActionButtons为底部操作按钮组                                                                                                                                                                                                       |
| formProps           | FormProps                                              | 否       | `{ columns: [], defaultData: {}, otherColumns: [] }`                                         | 搜索表单的配置信息，包含 columns（Form 的 json 配置）、defaultData（表单默认数据）、layout（表单布局方式）、labelCol（表单标签列布局配置）、wrapperCol（表单控件列布局配置）和 otherColumns（表单操作区其他按钮配置数组） |
| tableProps          | TableProps                                             | 否       | `{ columns: [], pagination: { current: 1, pageSize: 10, total: 0, showSizeChanger: true } }` | 表格的配置信息，包含 columns（表格列配置）和 pagination（分页配置）等 ant-design-vue 的 TableProps 属性                                                                                                                   |
| requestApi          | `(params: Record<string, any>) => Promise<any>`        | 是       | 无                                                                                           | 用于获取表格数据的异步请求函数，接收一个包含请求参数的对象，返回一个 Promise                                                                                                                                              |
| formatParams        | `(params: Record<string, any>) => Record<string, any>` | 否       | `() => ({})`                                                                                 | 用于格式化请求参数的函数，接收一个包含原始请求参数的对象，返回一个格式化后的请求参数对象                                                                                                                                  |

QueryTable/useQueryTable 组合式函数，其主要功能是创建 QueryTable 组件的实例，并返回一些用于操作该组件的方法。可根据需要自己添加暴露在实例上的方法

```js
<template>
  <QueryTable/>
</template>
<script setup>
   import { useQueryTable } from '@/components/QueryTable/useQueryTable';
   const { QueryTable, handleRefresh } = useQueryTable()
</script>
```

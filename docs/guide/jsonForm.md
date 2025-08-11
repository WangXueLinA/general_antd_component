# JsonForm

| 参数名                    | 类型       | 默认值 | 说明                                             |
| ------------------------- | ---------- | ------ | ------------------------------------------------ |
| formColumns               | FormItem[] | 无     | 表单列配置数组                                   |
| span                      | number     | 无     | a-col 组件的 span 属性，用于控制表单项的布局个数 |
| 其余参数同 antd form 一样 | ---        | ---    | 参考 antd form                                   |

## formColumns 参数

| 参数名         | 类型                | 说明                                                                                                                   |
| -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| el             | string \| Function  | 表单项使用的组件名称（在 registerForm 文件中查看枚举）或自定义组件函数或 h 函数生成组件                                |
| label          | string              | 表单项的标签文本                                                                                                       |
| field          | string              | 同表单绑定的 v-model:value 或者 v-model:checked                                                                        |
| formItemProps  | Record<string, any> | ant-design-vue 中 FormItem 的额外属性，如验证规则等                                                                    |
| value          | any                 | 表单项的默认值                                                                                                         |
| isShow         | boolean             | 表单项的显示隐藏                                                                                                       |
| getOptions     | Promise.resolve     | 表单项有 options 配置的可以通过 getOptions 函数异步拿取 options 并将数据 return 为 Array<{label：显示标题, value：值}> |
| 剩余表单 props | any                 | 表单独有的配置可直接通过直接配置会作用到表单项上                                                                       |

引入组件可以通过 import 来导入，或者内部的 hook 方式引入组件，抛出的实例可根据业务进行自己增加或者修改

```js
<template>
  <JsonForm />
</template>
  import { useForm } from '@/components/Form/useForm';
  import { JsonForm, validateFields } = useForm()
```

registerForm 可根据需要进行增加全局通用的表单组件进行统一配置，或单独自定义组件来导入

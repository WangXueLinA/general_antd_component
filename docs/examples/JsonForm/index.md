# JsonForm： 表单

<script setup>
import Demo from './Demo.vue'
import Demo1 from './Demo1.vue'
import Demo2 from './Demo2.vue'
import Demo3 from './Demo3.vue'
import Demo4 from './Demo4.vue'
import Demo5 from './Demo5.vue'
import Demo6 from './Demo6.vue'
</script>

## 介绍
JsonForm 是基于 ant-design-vue 的表单组件，通过 json 配置实现表单的渲染，组件内置的表单都是基于ant-design-vue 的表单组件，有Input、TextArea、InputNumber、Select、Radio、RadioGroup、Checkbox、CheckboxGroup、DatePicker、RangePicker、Switch、TreeSelect及详情的Text跟Time组件，通过`registerForm`进行全局组件注册。

```js
import { 
  Input, 
  Textarea, 
  Switch, 
  Checkbox, 
  InputNumber, 
  Radio, 
  DatePicker, 
  Select, 
  TreeSelect 
} from 'ant-design-vue';
import Text from './components/text.vue';
import Time from './components/time.vue';
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

import {
  defineComponent,
  h,
  useModel,
  reactive,
  computed,
  onMounted,
  watch,
  type Component,
} from 'vue'

// 处理 v-model:checked 绑定
export const transformBinding = (Component: Component) => {
  return defineComponent({
    name: Component.name,
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { attrs, slots, emit }) {
      const model = useModel(props, 'value');

      watch(
        () => props.value,
        newValue => {
          model.value = !!newValue;
        },
      );

      return () =>
        h(
          Component,
          {
            ...attrs,
            checked: !!model.value,
            onChange: (e: { target: { checked: boolean } }) => {
              const checked = typeof e === 'object' ? e.target.checked : e;
              model.value = !!checked;
              emit('update:value', !!checked);
            },
          },
          slots,
        );
    },
  });
};

// 扩展组件，支持异步属性getOptions获取options
const extendComponentsOptions = (Component: Component, config?: any) => {
  return defineComponent({
    name: Component.name,
    props: {
      getOptions: {
        type: Function,
        default: undefined,
      },
      options: {
        type: Array,
        default: () => [],
      },
    },
    setup(props, { attrs, slots }) {
      const state = reactive({
        options: props.options || [], // 默认使用传入的 options
      });

      // 过滤掉扩展属性getOptions，只保留独有的props
      const selectProps = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { getOptions, ...rest } = props;
        return rest;
      });

      // 获取选项数据
      const fetchOptions = async (...args: any) => {
        if (!props.getOptions) return; // 如果没有提供 getOptions，直接返回
        try {
          const result = await props.getOptions(...args);
          // 格式化选项数据，自己在接口里map处理label跟value的对应值
          state.options = result;
        } catch (error) {
          state.options = [];
        }
      };

      onMounted(() => {
        fetchOptions();
      });

      watch(
        () => props.options,
        newOptions => {
          if (newOptions && !props.getOptions) {
            state.options = newOptions;
          }
        },
      );
      return () =>
        h(
          Component,
          {
            ...attrs,
            // treeSelect需要treeData, 需要特殊处理，正常配置options就可以
            // 如有嵌套childern的话，也需要深层递归满足label跟value格式
            ...(Component.name === 'ATreeSelect' ? { treeData: state.options } : { options: state.options }),
            ...config,
            ...selectProps,
          },
          slots,
        );
    },
  });
};

export const componentsMap = {
  Text,
  Time,
  Textarea,
  InputNumber,
  DatePicker,
  Input,
  RangePicker,
  TreeSelect: extendComponentsOptions(TreeSelect, {
    allowClear: true,
    showSearch: true,
    getPopupContainer: (triggerNode: HTMLElement) => triggerNode.parentNode,
    filterTreeNode: (inputValue: string, { label }: any) => label.indexOf(inputValue) !== -1,
  }),
  Select: extendComponentsOptions(Select, {
    allowClear: true,
    showSearch: true,
    getPopupContainer: (triggerNode: HTMLElement) => triggerNode.parentNode,
  }),
  CheckboxGroup: extendComponentsOptions(CheckboxGroup),
  RadioGroup: extendComponentsOptions(RadioGroup),
  Checkbox: transformBinding(Checkbox), // 处理 v-model:checked 绑定
  Switch: transformBinding(Switch), // 处理 v-model:checked 绑定
  Radio: transformBinding(Radio), // 处理 v-model:checked 绑定
};
```

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



## 动态增减自定义表格

<div style="border: 1px solid #eee; padding: 20px"><Demo5></Demo5></div>

::: details 查看代码
<<< ./Demo5.vue
---
<<< ./components/table.vue
:::

## 高级搜索

<div style="border: 1px solid #eee; padding: 20px"><Demo6></Demo6></div>

::: details 查看代码
<<< ./Demo6.vue
:::

## 布局

<div style="border: 1px solid #eee; padding: 20px"><Demo3></Demo3></div>

::: details 查看代码
<<< ./Demo3.vue
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

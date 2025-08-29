## JsonForm

JsonForm 是基于 ant-design-vue@4.x + vue3 的表单组件，通过 json 配置实现表单的渲染，组件内置的表单都是基于ant-design-vue 的表单组件，有Input、TextArea、InputNumber、Select、Radio、RadioGroup、Checkbox、CheckboxGroup、DatePicker、RangePicker、Switch、TreeSelect及详情的Text跟Time 组件

```vue
<template>
  <JsonForm 
    :columns="columns"
    :labelCol="{ style: { width: '100px' } }"
    :rules="rules"
    v-model="formData"
    ref="formRef"
  > 
  </JsonForm>
</template>
<script setup>
import { h, ref, useTemplateRef, computed } from 'vue'
import { Button } from 'ant-design-vue'

const formRef = useTemplateRef('formRef')

const formData = ref({})

const rules = {
  projectName: [{ required: true, message: '请输入项目名称' }],
  toPdt: [{ required: true, message: '请选择地区' }],
}

const columns = ref([
  {
    label: '项目名称',
    field: 'projectName',
    el: 'Input',
    placeholder: '输入项目名称',
  },
  {
    label: '项目描述',
    field: 'projectDesc',
    el: 'Textarea',
    placeholder: '输入项目描述',
  },
  {
    label: '项目数量',
    field: 'projectNum',
    el: 'InputNumber',
    placeholder: '输入项目数量',
    min: 1,
    max: 100,
    style: { width: '30%' }, 
  },
  {
    label: '地区',
    field: 'toPdt',
    el: 'Select',
    placeholder: '请选择地区',
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
    ],
  },
  {
    label: '节点',
    field: 'node',
    el: 'TreeSelect',
    placeholder: '请选择节点',
    treeDefaultExpandAll: true,
    treeNodeFilterProp: "label",
    options: [
      {
        label: 'root 1',
        value: 'root 1',
        children: [
          {
            label: 'parent 1',
            value: 'parent 1',
            children: [
              {
                label: 'parent 1-0',
                value: 'parent 1-0',
                children: [
                  {
                    label: 'my leaf',
                    value: 'leaf1',
                  },
                  {
                    label: 'your leaf',
                    value: 'leaf2',
                  },
                ],
              },
              {
                label: 'parent 1-1',
                value: 'parent 1-1',
              },
            ],
          },
          {
            label: 'parent 2',
            value: 'parent 2',
          },
        ]
      },
    ]
  },
  {
    label: '项目状态',
    field: 'projectStatus',
    el: 'RadioGroup',
    options: [
      { label: '进行中', value: 1 },
      { label: '已完成', value: 2 },
      { label: '已取消', value: 3 },
    ],
  },
  {
    label: '项目类型',
    field: 'projectType',
    el: 'CheckboxGroup',
    options: [
      { label: '服务', value: 'service' },
      { label: '咨询', value: 'consulting' },
    ]
  },
  {
    label: '时间',
    field: 'date',
    el: 'RangePicker',
  },
  {
    label: 'Switch',
    field: 'switch',
    el: 'Switch',
    value: true,
  },
  {
    label: 'Checkbox',
    field: 'checkbox',
    el: 'Checkbox'
  },
  {
    label: 'Radio',
    field: 'radio',
    el: 'Radio'
  },
  {
    label: '',
    field: '',
    style: { textAlign: 'center' },
    el: h('div', [
      h(Button, {
        type: 'primary',
        onClick: async () => { 
          await formRef.value?.validateFields()
        }
      }, '提交')
    ]
    ),
  },
])

</script>
```

[具体文档及其他组件](https://wangxuelina.github.io/general_antd_component/)
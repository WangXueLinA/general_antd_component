<template>
  <div style="margin-bottom: 40px;">
    <a-switch 
      v-model:checked="checked" 
      checked-children="编辑" 
      un-checked-children="详情" 
    />
  </div>
  <JsonForm 
    :columns="columns"
    :labelCol="{ style: { width: '120px' } }"
    v-model="formData"
  > 
  </JsonForm>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import dayjs from 'dayjs'

const checked = ref(true)

const formData = ref({
  projectName: '项目名称',
  projectDesc: '项目描述',
  projectNums: 1,
  toPdt: ['beijing', 'shanghai'],
  node: 'root 1',
  projectStatus: 2,
  projectType: ['service'],
  switch: true,
  checkbox: true,
  date: dayjs('2022-01-01', 'YYYY-MM-DD'),
  time: [ dayjs('2022-02-02', 'YYYY-MM-DD'), dayjs('2022-03-03', 'YYYY-MM-DD') ],
})

const columns = reactive([
  {
    label: 'Input',
    field: 'projectName',
    el: computed(() => checked.value ? 'Input' : 'Text'),
    placeholder: '输入项目名称',
  },
  {
    label: 'Textarea',
    field: 'projectDesc',
    el: computed(() => checked.value ? 'Textarea' : 'Text'),
    placeholder: '输入项目描述',
  },
  {
    label: 'InputNumber',
    field: 'projectNums',
    el: computed(() => checked.value ? 'InputNumber' : 'Text'),
    placeholder: '输入项目描述',
  },
  {
    label: 'Select',
    field: 'toPdt',
    el: computed(() => checked.value ? 'Select' : 'Text'),
    placeholder: '请选择地区',
    mode: 'multiple',
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
    ],
  },
  {
    label: 'TreeSelect',
    field: 'node',
    el: computed(() => checked.value ? 'TreeSelect' : 'Text'),
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
    label: 'RadioGroup',
    field: 'projectStatus',
    el: computed(() => checked.value ? 'RadioGroup' : 'Text'),
    // TODO: 文档框架对RadioGroup的监听无效，正常不需要监听value
    value: computed(() => formData.value.projectStatus || 1),
    onChange: (e) => {
      formData.value.projectStatus = e.target.value || undefined
    },
    options: [
      { label: '进行中', value: 1 },
      { label: '已完成', value: 2 },
      { label: '已取消', value: 3 },
    ],
  },
  {
    label: 'CheckboxGroup',
    field: 'projectType',
    el: computed(() => checked.value ? 'CheckboxGroup' : 'Text'),
    options: [
      { label: '服务', value: 'service' },
      { label: '咨询', value: 'consulting' },
    ]
  },
  {
    label: 'Switch',
    field: 'switch',
    el: computed(() => checked.value ? 'Switch' : 'Text'),
  },
  {
    label: 'Checkbox',
    field: 'checkbox',
    el: computed(() => checked.value ? 'Checkbox' : 'Text')
  },
  {
    label: 'DatePicker',
    field: 'date',
    el: computed(() => checked.value ? 'DatePicker' : 'Time'),
  },
  {
    label: 'RangePicker',
    field: 'time',
    el: computed(() => checked.value ? 'RangePicker' : 'Time'),
  },
])
</script>
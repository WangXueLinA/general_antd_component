<template>
  <div style="margin-bottom: 40px;">
    <a-radio-group v-model:value="layout" button-style="solid">
      <a-radio-button value="horizontal">Horizontal</a-radio-button>
        <a-radio-button value="vertical">Vertical</a-radio-button>
        <a-radio-button value="inline">Inline</a-radio-button>
      </a-radio-group>
    <span style="margin:0 20px;">禁用: <a-switch v-model:checked="disabled" /></span>
    <a-radio-group v-model:value="col" button-style="solid">
      <a-radio-button :value="1">1列</a-radio-button>
      <a-radio-button :value="2">2列</a-radio-button>
      <a-radio-button :value="3">3列</a-radio-button>
    </a-radio-group>
  </div>
  <JsonForm 
    :columns="columns"
    :labelCol="{ style: { width: '100px' } }"
    :disabled="disabled"
    :layout="layout"
    :span="span"
  > 
  </JsonForm>
</template>
<script setup>
import { ref, computed } from 'vue'
const layout = ref('horizontal')
const disabled = ref(false)
const col = ref(1)
const span = computed(() => {
  return Number(24 / col.value)
})

const columns = [
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
    label: '项目状态',
    field: 'projectStatus',
    el: 'Select',
    placeholder: '选择项目状态',
    options: [
      { label: '进行中', value: '进行中' },
      { label: '已完成', value: '已完成' },
      { label: '已取消', value: '已取消' },
    ],
  },
  {
    label: '项目负责人',
    field: 'projectLeader',
    el: 'Select',
    placeholder: '选择项目负责人',
    options: [
      { label: '张三', value: '张三' },
      { label: '李四', value: '李四' },
      { label: '王五', value: '王五' },
    ],
  },
  {
    label: '开始日期',
    field: 'startDate',
    el: 'DatePicker',
    placeholder: '选择开始日期',
  },
  {
    label: '结束日期',
    field: 'endDate',
    el: 'DatePicker',
    placeholder: '选择结束日期',
  },
]
</script>
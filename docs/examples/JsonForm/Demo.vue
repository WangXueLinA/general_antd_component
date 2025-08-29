<template>
  <JsonForm 
    :columns="columns"
    :labelCol="{ style: { width: '100px' } }"
    :rules="rules"
    v-model="formData"
    ref="formRef"
  > 
  </JsonForm>
  <contextHolder />
</template>
<script setup>
import { h, ref, useTemplateRef, computed } from 'vue'
import { Button, Modal } from 'ant-design-vue'

const [modal, contextHolder] = Modal.useModal();
const formRef = useTemplateRef('formRef')

const formData = ref({
  projectNum: 1,
  toPdt: 'beijing',
  switch: true,
  projectStatus: 'doing'
})

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
      { label: '进行中', value: 'doing' },
      { label: '已完成', value: 'done' },
      { label: '已取消', value: 'cancel' },
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
    label: '开关',
    field: 'switch',
    el: 'Switch',
  },
  {
    label: '同意条款',
    field: 'checkbox',
    el: 'Checkbox',
  },
  {
    label: 'radio',
    field: 'radio',
    el: 'Radio',
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
          modal.success({
            title: '提交参数',
            content: h('div', Object.entries(formData.value).map(([key, value]) => h('div', `${key}: ${value}`))),
          });
        }
      }, '提交'),
      h(Button, {
        style: { marginLeft: '10px' },
        onClick: () => {
          console.log('重置')
          formRef.value?.resetFields()
        }
      }, '重置'),
    ]),
  },
])

</script>
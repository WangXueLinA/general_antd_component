<template>
  <JsonForm 
    :columns="columns"
    :labelCol="{ style: { width: '100px' } }"
    v-model="formData"
    ref="formRef"
  > 
  </JsonForm>
  <contextHolder />
</template>
<script setup>
import { h, useTemplateRef, ref, computed } from 'vue'
import { Input, Modal, Tooltip, Button } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
const [modal, contextHolder] = Modal.useModal();
const formRef = useTemplateRef('formRef')

const formData = ref({})

const columns = [
  {
    label: '项目名称',
    field: 'projectName',
    el: h(Input),
    placeholder: '输入项目名称',
  },
  {
    label: h('span', [
      h('span', '版本号'),
      h(
        Tooltip,
        {
          title: '输入多个版本号',
          getPopupContainer: () => document.body,
          color: 'blue',
        },
        h(
          QuestionCircleOutlined,
          {
            style: { color: 'blue' },
          }
        )
      ),
    ]),
    field: 'toVersion',
    el: h(
      'div',
      [
        h(Input, {
          style: { width: '100%' },
          placeholder: '请输入版本号',
          value: computed(() => formData.value.toVersion),
          onChange: (e) => {
            formData.value.toVersion = e.target.value || undefined
          },
        }),
      ])
  },
  {
    label: '',
    field: '',
    style: { textAlign: 'center' },
    el: h('div', h(Button, {
        type: 'primary',
        onClick: async () => { 
          await formRef.value?.validateFields()
          modal.success({
            title: '提交参数',
            content: h('div', Object.entries(formData.value).map(([key, value]) => h('div', `${key}: ${value}`))),
          });
        }
      }, '提交')
    ),
  },
]
</script>
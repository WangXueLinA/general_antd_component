<template>
  <JsonForm 
    :columns="columns"
    :labelCol="{ style: { width: '70px' } }"
    v-model="formData"
    ref="formRef"
  > 
  </JsonForm>
  <contextHolder />
</template>
<script setup>
import { h, useTemplateRef, ref, computed } from 'vue'
import { Modal, Button } from 'ant-design-vue'
import Table from './components/table.vue';
const [modal, contextHolder] = Modal.useModal();
const formRef = useTemplateRef('formRef')

const formData = ref({})

const columns = [
  {
    label: '姓名',
    field: 'projectName',
    el: 'Input',
    placeholder: '请输入姓名',
    span: 12,
  },
  {
    label: '手机号',
    field: 'projectNo',
    el: 'Input',
    span: 12,
  },
  {
    label: '地址',
    field: 'address',
    el: h(Table,{
      onGetValue: (value) => {
        console.log(value, '----')
        formData.value.address = value
      }
    }),
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
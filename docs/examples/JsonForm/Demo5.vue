<template>
  <div style="margin-bottom: 40px">
    <a-switch v-model:checked="checked" checked-children="编辑" un-checked-children="详情" />
  </div>
  <JsonForm :columns="columns" :labelCol="{ style: { width: '70px' } }" v-model="formData" ref="formRef"> </JsonForm>
  <contextHolder />
</template>
<script setup>
  import { h, useTemplateRef, ref, reactive, computed } from 'vue';
  import { Modal, Button } from 'ant-design-vue';
  import Table from './components/table.vue';
  const [modal, contextHolder] = Modal.useModal();
  const formRef = useTemplateRef('formRef');

  const checked = ref(true);

  const formData = reactive({
    address: [
      {
        city: '中国',
        phone: '12345678901',
      },
    ],
  });

  const columns = reactive([
    {
      label: '姓名',
      field: 'projectName',
      el: computed(() => (checked.value ? 'Input' : 'Text')),
      placeholder: '请输入姓名',
      span: 12,
    },
    {
      label: '手机号',
      field: 'projectNo',
      el: computed(() => (checked.value ? 'Input' : 'Text')),
      placeholder: '请输入手机号',
      span: 12,
    },
    {
      label: '地址',
      field: 'address',
      el: h(Table),
      isEdit: checked,
    },
    {
      label: '',
      field: '',
      isShow: checked,
      style: { textAlign: 'center' },
      el: h(
        'div',
        h(
          Button,
          {
            type: 'primary',
            onClick: async () => {
              await formRef.value?.validateFields();
              modal.success({
                title: '提交参数',
                content: h(
                  'div',
                  Object.entries(formData).map(([key, value]) => h('div', `${key}: ${JSON.stringify(value)}`)),
                ),
              });
            },
          },
          '提交',
        ),
      ),
    },
  ]);
</script>

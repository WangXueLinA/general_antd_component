<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="false"
  />
  <a-button danger style="width: 100%" @click="addRow">添加一行</a-button>
</template>

<script setup>
  import { Input } from 'ant-design-vue';
  import { h, reactive, useModel, watch } from 'vue'
  import { Form } from "ant-design-vue";

  const formItemContext = Form.useInjectFormItemContext();
  const props = defineProps({
    value: {
      type: Array,
      default: () => []
    }
  })

  const model = useModel(props, 'value')
  const data = reactive([]);

  watch(() => props.value, (newValue) => {
    data.length = 0;
    (newValue || []).forEach((item, index) => {
      data.push({
        key: `${index + 1}`,
        city: item.city || '',
        phone: item.phone || ''
      });
    });
  }, { immediate: true, deep: true });

  const addRow = () => {
    data.push({
      key: `${data.length + 1}`,
      city: '',
      phone: ''
    });
    model.value = JSON.parse(JSON.stringify(data));
    formItemContext.onFieldChange();
  };

  const handleChange = (name, value, index) => {
    if (!data[index]) return;
    data[index][name] = value;
    model.value = JSON.parse(JSON.stringify(data));
    formItemContext.onFieldChange();
  };

  const columns = [
    {
      title: '地址',
      dataIndex: 'city',
      width: 190,
      customRender: ({ _, record, index }) => h(Form.Item, {
        name: ['address', index, 'city'],
        rules: [{ required: true, message: '请输入地址' }]
      },
        h(Input, {
          placeholder: '请输入地址',
          value: data[index]?.city || '',
          onChange: (e) => handleChange('city', e.target.value, index)
        })
      )
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 190,
      customRender: ({ _, record, index }) => h(Form.Item, {
        name: ['address', index, 'phone'],
        rules: [{ required: true, message: '请输入手机号' }]
      },
        h(Input, {
          placeholder: '请输入手机号',
          value: data[index]?.phone || '',
          onChange: (e) => handleChange('phone', e.target.value, index)
        })
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 190,
      customRender: ({ _, record, index }) => h('span', {
        style: { color: '#1890ff', cursor: 'pointer' },
        onClick: () => {
          data.splice(index, 1).forEach((_, i) => data[i].key = `${i + 1}`);
          model.value = JSON.parse(JSON.stringify(data));
          formItemContext.onFieldChange();
        }
      }, '删除')
    },
  ];
</script>

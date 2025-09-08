<template>
  <a-table :columns="columns" :data-source="data" :pagination="false" />
  <a-button danger style="width: 100%" @click="addRow" v-if="checked">添加一行</a-button>
</template>

<script setup>
  import { Input } from 'ant-design-vue';
  import { h, reactive, useModel, watch, ref } from 'vue';
  import { Form } from 'ant-design-vue';

  const formItemContext = Form.useInjectFormItemContext();
  const props = defineProps({
    value: {
      type: Array,
      default: () => [],
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
  });

  const model = useModel(props, 'value');
  const data = reactive([]);
  const checked = ref(true);

  watch(
    () => props.value,
    newValue => {
      data.length = 0;
      (newValue || []).forEach(item => {
        data.push({
          city: item.city || '',
          phone: item.phone || '',
        });
      });
    },
    { immediate: true, deep: true },
  );

  watch(
    () => props.isEdit,
    newValue => {
      checked.value = newValue;
    },
  );

  const addRow = () => {
    data.push({
      city: '',
      phone: '',
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

  const columns = reactive([
    {
      title: '城市',
      dataIndex: 'city',
      width: 190,
      customRender: ({ _, record, index }) =>
        checked.value
          ? h(
              Form.Item,
              {
                name: ['address', index, 'city'],
                rules: [{ required: true, message: '请输入城市' }],
              },
              h(Input, {
                placeholder: '请输入城市',
                value: data[index]?.city || '',
                onChange: e => handleChange('city', e.target.value, index),
              }),
            )
          : h('span', data[index]?.city || ''),
    },
    {
      title: '具体地址',
      dataIndex: 'phone',
      width: 190,
      customRender: ({ _, record, index }) =>
        checked.value
          ? h(
              Form.Item,
              {
                name: ['address', index, 'phone'],
                rules: [{ required: true, message: '请输入具体地址' }],
              },
              h(Input, {
                placeholder: '请输入具体地址',
                value: data[index]?.phone || '',
                onChange: e => handleChange('phone', e.target.value, index),
              }),
            )
          : h('span', data[index]?.phone || ''),
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 190,
      customRender: ({ _, record, index }) =>
        checked.value
          ? h(
              'span',
              {
                style: { color: '#1890ff', cursor: 'pointer' },
                onClick: () => {
                  data.splice(index, 1);
                  model.value = JSON.parse(JSON.stringify(data));
                  formItemContext.onFieldChange();
                },
              },
              '删除',
            )
          : h('span', '--'),
    },
  ]);
</script>
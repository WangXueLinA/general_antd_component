
<!-- Table -->
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
import { h, reactive } from 'vue'
const modelValue = defineModel([])
const props = defineProps([])
const emits = defineEmits(['getValue'])

const addRow = () => {
  data.push({
    key: `${data.length + 1}`,
  });
};

const columns = [
  {
    title: '地址',
    dataIndex: 'address',
    width: 170,
    customRender: ({ _, record ,index }) => h(Input,
      { 
        placeholder: '请输入地址', 
        value: modelValue?.[index]?.address, 
        onChange: (e) => {
          console.log(e.target.value, '000000')
          modelValue[index].address = e.target.value
          emits('getValue', 22121212)
        } 
      }
    )
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 170,
    customRender: ({ _, record ,index }) => h(Input, { placeholder: '请输入手机号', value: modelValue?.[index]?.phone })
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 150,
    customRender: ({ _, record }) => h('span',
      { 
        style: {color: '#1890ff'},
        onClick: () => {
          // 删除一行
          data.splice(data.indexOf(record), 1);
        }
      }, 
      '删除')
  },
];
const data = reactive([
  {
    key: '1',
  },
  {
    key: '2',
  }
]);
</script>
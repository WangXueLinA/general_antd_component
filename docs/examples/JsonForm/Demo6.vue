<template>
  <JsonForm
    :columns="columns.slice(0, expand ? columns.length : 6)"
    :labelCol="{ style: { width: '60px' } }"
    :wrapperCol="{ style: { width: '100px' } }"
    layout="inline"
    class="search-form"
    :span="8"
    ref="formRef"
    v-model="formData"
  >
    <div style="margin-top: 15px">
      <a-button type="primary" @click="handleSearch" >查询</a-button>
      <a-button style="margin: 0 8px" @click="handleReset" >重置</a-button>
      <a style="font-size: 12px; text-decoration: none" @click="expand = !expand">
        <template v-if="expand">
          <UpOutlined />
        </template>
        <template v-else>
          <DownOutlined />
        </template>
        {{ !expand ? '高级搜索' : '收起'}}
      </a>
    </div>
  </JsonForm>
</template>
<script setup>
  import { reactive, ref, useTemplateRef, h } from 'vue';
  import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
  import { Modal } from 'ant-design-vue';

  const expand = ref(false);
  const formRef = useTemplateRef('formRef');
  const formData = reactive({});

  const handleSearch = async() => { 
    await formRef.value?.validateFields();
    Modal.success({
      title: '查询参数',
      content: h(
        'div',
        Object.entries(formData).map(([key, value]) => h('div', `${key}: ${value}`)),
      ),
      onOk() {},
      onCancel() {},
    });
  }

  const handleReset = () => {
    formRef.value?.resetFields();
  };

  const columns = reactive([
    {
      label: '姓名1',
      field: 'projectName1',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名2',
      field: 'projectName2',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名3',
      field: 'projectName3',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名4',
      field: 'projectName4',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名5',
      field: 'projectName5',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名6',
      field: 'projectName6',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名7',
      field: 'projectName7',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名8',
      field: 'projectName8',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名9',
      field: 'projectName9',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名10',
      field: 'projectName10',
      el: 'Input',
      placeholder: '请输入姓名',
    },
  ]);
</script>
<style scoped>
  .search-form {
    justify-content: flex-end;
  }
</style>

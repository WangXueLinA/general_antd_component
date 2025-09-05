<template>
  <JsonForm
    :columns="columns.slice(0, expand ? columns.length : 6)"
    :labelCol="{ style: { width: '40px' } }"
    :wrapperCol="{ style: { width: '100px' } }"
    layout="inline"
    class="search-form"
    :span="8"
  >
    <div style="margin-top: 15px">
      <a-button type="primary">查询</a-button>
      <a-button style="margin: 0 8px">重置</a-button>
      <a style="font-size: 12px" @click="expand = !expand">
        <template v-if="expand">
          <UpOutlined />
        </template>
        <template v-else>
          <DownOutlined />
        </template>
        高级搜索
      </a>
    </div>
  </JsonForm>
</template>
<script setup>
  import { reactive, ref } from 'vue';
  import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';

  const expand = ref(false);

  const columns = reactive([
    {
      label: '姓名',
      field: 'projectName',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名',
      field: 'projectName',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名',
      field: 'projectName',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名',
      field: 'projectName',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名',
      field: 'projectName',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名',
      field: 'projectName',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名',
      field: 'projectName',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名',
      field: 'projectName',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名',
      field: 'projectName',
      el: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '姓名',
      field: 'projectName',
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

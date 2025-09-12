<template>
  <QueryTable
    :table-props="tableProps"
    :request-api="requestApi"
    :form-props="formProps"
    :format-params="formatParams"
    ref="queryTableRef"
  >
    <template #bottomExtra>
      <a-button 
        type="primary" 
        :disabled="!selectedList.length" 
        @click="() => message.success(`选中了${selectedList.length}条数据`)"
      >底部按钮</a-button>
      <a-upload
        :customRequest="uploadFile"
        :showUploadList="false"
        v-model:file-list="fileList"
        name="file"
        action
        accept=".xls , .xlsx"
        :headers="{ authorization: 'authorization-text' }"
      >
        <a-button 
          type="primary" 
          style="margin-right: 20px" 
          :disabled="optionFlag"
        >上传文件</a-button>
      </a-upload>
    </template>
  </QueryTable>
</template>
<script setup>
  import { reactive, useTemplateRef, ref } from 'vue';
  import { dateToStr } from './const';
  import { message } from 'ant-design-vue';
  const queryTableRef = useTemplateRef('queryTableRef'); // 获取子组件实例
  const selectedList = ref([]); // 选中的数据
  const fileList = ref([]); // 上传的文件列表

  // 后端接口返回data有list集合展示dataSource，直接写api接口即可, 否则自己需拼凑
  const requestApi = (...args) =>
    Promise.resolve({
      data: {
        total: 6,
        list: [
          {
            id1: '1111111',
            id2: '22222222',
            id3: '333333333333333333',
            id4: '4444444',
            id5: '5555555555',
            id6: '66666666666666666',
            id7: '777777777777777777',
            id8: '888888888888888888',
            id9: '999999999999999999',
            id10: '1010101010101010101',
            id: 1,
          },
          {
            id1: '1111111',
            id2: '22222222',
            id3: '333333333333333333',
            id4: '4444444',
            id5: '5555555555',
            id6: '66666666666666666',
            id7: '777777777777777777',
            id8: '888888888888888888',
            id9: '999999999999999999',
            id10: '1010101010101010101',
            id: 2,
          },
          {
            id1: '1111111',
            id2: '22222222',
            id3: '333333333',
            id4: '4444444',
            id5: '5555555555',
            id6: '66666666666666666',
            id7: '777777777777777777',
            id8: '888888888888888888',
            id9: '999999999999999999',
            id10: '1010101010101010101',
            id: 3,
          },
          {
            id1: '1111111',
            id2: '22222222',
            id3: '333333333',
            id4: '4444444',
            id5: '5555555555',
            id6: '66666666666666666',
            id7: '777777777777777777',
            id8: '888888888888888888',
            id9: '999999999999999999',
            id10: '1010101010101010101',
            id: 4,
          },
          {
            id1: '1111111',
            id2: '22222222',
            id3: '333333333',
            id4: '4444444',
            id5: '5555555555',
            id6: '66666666666666666',
            id7: '777777777777777777',
            id8: '888888888888888888',
            id9: '999999999999999999',
            id10: '1010101010101010101',
            id: 5,
          },
          {
            id1: '1111111',
            id2: '22222222',
            id3: '333333333',
            id4: '4444444',
            id5: '5555555555',
            id6: '66666666666666666',
            id7: '777777777777777777',
            id8: '888888888888888888',
            id9: '999999999999999999',
            id10: '1010101010101010101',
            id: 6,
          },
        ],
      },
    });

  // 格式化搜索表单数据, 过滤出表格的filters, sorter，然后根据后端需要传参数格式自行拼接
  const formatParams = ({ filters, sorter, ...payload }) => {
    const { createdTime, ...rest } = payload;
    const [startTime] = dateToStr(createdTime);
    return {
      fetchCount: true,
      query: {
        params: {
          createdTime: startTime,
          ...rest,
        },
      },
    };
  };

  const uploadFile = ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);
    // importTaocanExcel({
    //   file,
    //   type: flowType.value || 'CREATE',
    //   flowBusinessId: flowBusinessId.value,
    //   projectCode: projectCodeStore,
    // })
  };

  const formProps = reactive({
    layout: 'inline',
    span: 12,
    columns: [
      {
        el: 'Input',
        field: 'customerPackageName',
        label: '套餐名',
        placeholder: '请输入套餐名',
      },
      {
        el: 'DatePicker',
        field: 'createdTime',
        label: '创建时间',
        placeholder: '请选择创建时间',
        style: { width: '100%' },
      },
      {
        el: 'Select',
        field: 'status',
        label: '状态',
        placeholder: '请选择状态',
        options: [
          { label: '进行中', value: 1 },
          { label: '已完成', value: 2 },
          { label: '已取消', value: 3 },
        ],
      },
    ],
  });

  const tableProps = reactive({
    scroll: { x: '100%' },
    rowSelection: {
      onChange: (_, selectedRows) => {
        selectedList.value = selectedRows;
      },
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    },
    columns: [
      {
        dataIndex: 'id1',
        key: 'id1',
        title: '客户1',
        width: 200,
        fixed: 'left',
      },
      {
        dataIndex: 'id2',
        key: 'id2',
        title: '客户2',
        width: 200,
      },
      {
        dataIndex: 'id3',
        title: '客户3',
        key: 'id3',
        width: 100,
        ellipsis: true,
      },
      {
        dataIndex: 'id4',
        title: '客户4',
        key: 'id4',
        width: 200,
      },
      {
        dataIndex: 'id5',
        title: '客户5',
        key: 'id5',
        width: 200,
      },
      {
        dataIndex: 'id6',
        title: '客户6',
        key: 'id6',
        width: 200,
      },
      {
        dataIndex: 'id7',
        title: '客户7',
        key: 'id7',
        width: 200,
      },
      {
        dataIndex: 'id8',
        title: '客户8',
        key: 'id8',
        width: 200,
      },
      {
        dataIndex: 'id9',
        title: '客户9',
        key: 'id9',
        width: 200,
      },
      {
        dataIndex: 'id10',
        title: '客户10',
        key: 'id10',
        width: 100,
      },
    ],
  });
</script>

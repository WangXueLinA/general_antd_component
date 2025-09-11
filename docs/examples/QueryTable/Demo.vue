<template>
  <QueryTable
    :table-props="tableProps"
    :request-api="requestApi"
    :form-props="formProps"
    :format-params="formatParams"
    ref="queryTableRef"
  >
    <template #bottomExtra>
      <a-button type="primary" :disabled="!selectedList.length" @click="handleAction1">底部按钮</a-button>
      <a-upload
        :customRequest="uploadFile"
        :showUploadList="false"
        v-model:file-list="fileList"
        name="file"
        action
        accept=".xls , .xlsx"
        :headers="{ authorization: 'authorization-text'}"
      >
        <a-button type="primary" style="margin-right: 20px" :disabled="optionFlag">上传文件</a-button>
      </a-upload>
    </template>
  </QueryTable>
</template>
<script setup>
  import { reactive, useTemplateRef, ref } from 'vue';
  import { dateToStr } from './const'
  import { message } from 'ant-design-vue';
  const queryTableRef = useTemplateRef('queryTableRef'); // 获取子组件实例
  const selectedList = ref([]); // 选中的数据
  const fileList = ref([]); // 上传的文件列表


  // 后端接口返回data有list集合展示dataSource，直接写api接口即可, 否则自己需拼凑
  const requestApi = (...args) => Promise.resolve({
    data: {
      total: 6,
      list: [
        { id1: 1111111, id2: 22222222, id3: 333333333, id4: 4444444, id5: 5555555555, id6: 66666666666666666 },
        { id1: 1111111, id2: 22222222, id3: 333333333, id4: 4444444, id5: 5555555555, id6: 66666666666666666 },
        { id1: 1111111, id2: 22222222, id3: 333333333, id4: 4444444, id5: 5555555555, id6: 66666666666666666 },
        { id1: 1111111, id2: 22222222, id3: 333333333, id4: 4444444, id5: 5555555555, id6: 66666666666666666 },
        { id1: 1111111, id2: 22222222, id3: 333333333, id4: 4444444, id5: 5555555555, id6: 66666666666666666 },
        { id1: 1111111, id2: 22222222, id3: 333333333, id4: 4444444, id5: 5555555555, id6: 66666666666666666 },
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
  }

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
        style:{ width: '100%' }
      },
      {
        el:'Select',
        field: 'status',
        label: '状态',
        placeholder: '请选择状态',
        options: [
          { label: '进行中', value: 1 },
          { label: '已完成', value: 2 },
          { label: '已取消', value: 3 },
        ]
      }
    ],
  });

  const handleAction1 = () => {
    message.success(`选中了${selectedList.value.length}条数据`);
  };

  const tableProps = ref({
    scroll: { x: 'max-content' },
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
        title: '客户1',
        width: 140,
      },
      {
        dataIndex: 'id2',
        title: '客户2',
        width: 140,
      },
      {
        dataIndex: 'id3',
        title: '客户3',
        width: 140,
      },
      {
        dataIndex: 'id4',
        title: '客户4',
        width: 140,
      },
      {
        dataIndex: 'id5',
        title: '客户5',
        width: 140,
      },
      {
        dataIndex: 'id6',
        title: '客户6',
        width: 140,
      },
    ],
  });
</script>
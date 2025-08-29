<template>
  <QueryTable
    :top-action-buttons="topActionButtons"
    :bottom-action-buttons="bottomActionButtons"
    :table-props="tableProps"
    :request-api="requestApi"
    :form-props="formProps"
    :format-params="formatParams"
    ref="queryTableRef"
  />
  <contextHolder />
</template>
<script setup>
  import { reactive, computed, useTemplateRef, h, ref } from 'vue';
  import { Modal } from 'ant-design-vue'
  import { dateToStr } from './const'
  const [modal, contextHolder] = Modal.useModal();
  const queryTableRef = useTemplateRef('queryTableRef');
  const selectedList = ref([]);

  // 后端接口返回data有list集合展示dataSource，直接写api接口即可, 否则自己需拼凑
  const requestApi = (...args) => Promise.resolve({
    data: {
      total: 5,
      list: [
        { id: 1, customerPackageName: '套餐A', createdTime: '2023-01-01', status: '进行中' },
        { id: 2, customerPackageName: '套餐B', createdTime: '2023-01-01', status: '进行中' },
        { id: 3, customerPackageName: '套餐C', createdTime: '2023-01-01', status: '进行中' },
        { id: 4, customerPackageName: '套餐D', createdTime: '2023-01-01', status: '进行中' },
        { id: 5, customerPackageName: '套餐E', createdTime: '2023-01-01', disabled: true,  status: '已发布' },
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
    otherColumns: [
      {
        label: '刷新',
        type: 'primary',
        onClick: () => queryTableRef.value.handleRefresh(),
      },
      {
        label: '重置',
        type: 'primary',
        onClick: () => queryTableRef.value?.handleReset()
      },
    ]
  });

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
        dataIndex: 'id',
        title: '客户',
        width: 140,
      },
      {
        dataIndex: 'customerPackageName',
        title: '套餐名',
        width: 140,
      },
      {
        dataIndex: 'createdTime',
        title: '创建时间',
        width: 140,
      },
      {
        dataIndex: 'status',
        title: '套餐状态',
        width: 140,
      },
    ],
  });

  const topActionButtons = ref([
    {
      label: '顶部按钮1',
      type: 'primary',
      disabled: computed(() => !selectedList.value.length),
      onClick: () => {
        console.log(selectedList.value, '选中的数据');
      },
    },
    {
      label: '顶部按钮2',
      type: 'primary',
      onClick: () => {
        console.log(selectedList.value, '选中的数据');
      },
    },
  ]);

  const bottomActionButtons = ref([
    {
      label: '底部按钮1',
      danger: true,
      type: "primary",
      disabled: computed(() => !selectedList.value.length),
      onClick: () => {
        console.log(selectedList.value, '选中的数据');
      },
    },
    {
      label: '底部按钮2',
      type: 'dashed',
      danger: true,
      onClick: () => {
        console.log(selectedList.value, '选中的数据');
      },
    },
  ]);
</script>
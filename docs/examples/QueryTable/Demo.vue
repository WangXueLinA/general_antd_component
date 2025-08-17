<template>
  <QueryTable
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
  import { reactive, computed, useTemplateRef, h } from 'vue';
  import { Modal } from 'ant-design-vue'
  const [modal, contextHolder] = Modal.useModal();
  const queryTableRef = useTemplateRef('queryTableRef')


  // 后端接口返回data有list集合展示dataSource，直接写api接口即可
  // 否则自己需拼凑
const requestApi = (...args) => Promise.resolve({
  data: {
    total: 20,
    list: [
      { id: 1, customerPackageName: '套餐A', createdTime: '2023-01-01' },
      { id: 2, customerPackageName: '套餐B', createdTime: '2023-01-01' },
    ],
  },
});

    // 格式化搜索表单数据, 过滤出表格的filters, sorter，然后根据后端需要传参数格式自行拼接
    const formatParams = ({ filters, sorter, ...payload }) => {
      const { createdTime, ...rest } = payload;
      // const [startTime, endTime] = dateToStr(createdTime);
      return {
        fetchCount: true,
        query: {
          params: {
            ...rest,
          },
        },
      };
    };

  const formProps = reactive({
    columns: [
      {
        el: 'Input',
        field: 'customerPackageName',
        label: '套餐名',
        placeholder: '请输入套餐名',
      },
      {
        el: 'Input',
        field: 'customerPackageCode',
        label: '套餐编号',
        placeholder: '请输入套餐编号',
      },
      {
        el: 'DatePicker',
        field: 'createdTime',
        label: '创建时间',
        placeholder: '请选择创建时间',
      },
    ],
    otherColumns: computed(() => [
      {
        label: '点这个搜索',
        type: 'primary',
        // disabled: selectedRowKeys.value.length === 0,
        onClick: async () => {
          const formData = await queryTableRef.value?.getFormValues()
          const dataSource = queryTableRef.value?.getTableData()

          modal.success({
            title: '提交参数',
            content: h('div', [
              h('h3', '表单参数:'),
              h('div', Object.entries(formData).map(([key, value]) => h('div', `${key}: ${value}`))),
              h('h3', '表格datasource:'),
              h('div', JSON.stringify(dataSource))
            ]),
          });
        },
      },
    ]),
  });

  const tableProps = reactive({
    scroll: { x: 'max-content' },
    columns: [
      {
        dataIndex: 'id',
        title: '客户',
        width: 170,
      }
    ],
  });

  const bottomActionButtons = reactive([
    {
      label: '底部按钮',
      key: 'export',
      type: 'primary',
      onClick: () => {
        console.log(selectedRowKeys.value, '选中的数据');
      },
    },
  ]);
</script>
<template>
  <div class="common-table-wrapper">
    <!-- 搜索表单 -->
    <JsonForm
      ref="formRef"
      :columns="formColumns"
      v-bind="formBindings"
      v-model="formData"
      v-if="!!formProps?.columns?.length"
    >
      <template #actions>
        <a-button type="primary" @click="handleSearch" class="common-btn">搜索</a-button>
        <a-button type="primary" @click="handleReset" class="common-btn">重置</a-button>
      </template>
    </JsonForm>

    <div class="bottomExtra">
      <slot name="bottomExtra" />
      <div style="margin-left: auto" class="bottomAction" @click="handleRefresh"><RedoOutlined /></div>
      <a-popover title="表格列设置" trigger="click" placement="bottomRight" :arrow="false">
        <template #content>
          <a-table
            :columns="setColumns"
            :pagination="false"
            :data-source="setTableData"
            size="small"
            bordered
            row-key="dataIndex"
            :customRow="customRow"
            style="width: 300px;"
            :scroll="{ y: 200 }"
          >
            <template #headerCell="{ column }">
              <template v-if="column.key === 'showColumn'">
                <span>
                  显示
                  <a-checkbox
                    v-model:checked="allColumnsVisible"
                    @change="handleSelectAll"
                    :indeterminate="isIndeterminate"
                  />
                </span>
              </template>
            </template>
          </a-table>
        </template>
        <div class="bottomAction"><SettingOutlined /></div>
      </a-popover>
    </div>

    <!-- 数据表格 -->
    <a-table
      :data-source="tableData"
      :pagination="shouldShowPagination ? pagination : false"
      :loading="loading"
      size="middle"
      :row-key="tableProps.rowKey || 'id'"
      v-bind="tableBindings"
      :columns="filteredColumns"
      @change="handleTableChange"
      @resizeColumn="handleResizeColumn"
    >
      <!-- 动态传递插槽 -->
      <template v-for="[slotName] in Object.entries($slots)" #[slotName]="scope">
        <slot :name="slotName" v-bind="scope" />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
  import JsonForm from '../JsonForm/index.vue';
  import { ref, reactive, computed, onMounted, defineProps, withDefaults, useTemplateRef, watch, h } from 'vue';
  import { Checkbox, message, type TablePaginationConfig, type TableProps } from 'ant-design-vue';
  import { RedoOutlined, SettingOutlined, HolderOutlined } from '@ant-design/icons-vue';
  import type { QueryTableProps } from './types';
  import useDraggableTable from './hooks/useDraggableTable';

  const props = withDefaults(defineProps<QueryTableProps>(), {
    bottomActionButtons: () => [],
    formatParams: () => ({}),
    tableProps: () => ({
      columns: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
      },
    }),
    formProps: () => ({
      columns: [],
      defaultData: {},
    }),
  });

  const formInstance = useTemplateRef('formRef');
  const formData = ref({});

  const setTableData = ref<
    Array<
      any & {
        showColumn: boolean;
        fixed?: 'left' | undefined;
      }
    >
  >([]);

  watch(
    () => props.tableProps.columns,
    newColumns => {
      setTableData.value = (newColumns || []).map(col => ({
        ...col,
        showColumn: col.showColumn !== false,
        fixed: col.fixed || undefined,
      }));
    },
    { immediate: true, deep: true },
  );

  const isIndeterminate = computed(() => {
    const checkedCount = setTableData.value.filter(col => col.showColumn).length;
    return checkedCount > 0 && checkedCount < setTableData.value.length;
  });

  const allColumnsVisible = computed(() => {
    return setTableData.value.length > 0 && setTableData.value.every(col => col.showColumn);
  });

  const handleSelectAll = e => {
    const checked = e.target.checked;
    setTableData.value = setTableData.value.map(col => ({
      ...col,
      showColumn: checked,
    }));
  };

  const { customRow } = useDraggableTable(setTableData, true);

  const state = reactive({
    tableData: [] as any[],
    pagination: {
      ...props.tableProps.pagination,
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showTotal: (total: number) => `共 ${total} 条`,
    },
    loading: false,
  });

  const handleResizeColumn: TableProps['onResizeColumn'] = (w, col) => {
    col.width = w;
  };

  const filteredColumns = computed((pre) => {
    return setTableData.value.filter(col => col.showColumn)
  });

  const formColumns = computed(() => {
    const columns = (props.formProps.columns || [])?.map(column => ({
      ...column,
      key: column.field,
    }));

    if (columns.length) {
      return [
        ...columns,
        {
          field: 'actions',
          formItemProps: { wrapperCol: { span: 24, offset: 0 } },
        },
      ];
    }

    return columns;
  });

  const formLayout = computed(() => props.formProps.layout || 'inline');

  const formBindings = computed(() => {
    const { columns, defaultData, ...rest } = props.formProps;
    return {
      layout: formLayout.value,
      labelCol: { style: { width: '70px' } },
      ...rest,
    };
  });

  const tableBindings = computed(() => {
    const { pagination, ...rest } = props.tableProps;
    return rest;
  });

  const tableData = computed(() => state.tableData);
  const pagination = computed(() => state.pagination);
  const loading = computed(() => state.loading);

  const shouldShowPagination = computed(() => props.tableProps.pagination !== false);

  const formatRequestParams = (params: Record<string, any>) => {
    const { current, pageSize, ...businessParams } = params;

    const formattedBusinessParams = props?.formatParams({
      ...formData.value,
      ...businessParams,
    });

    return {
      ...props.formProps.defaultData,
      ...formattedBusinessParams,
    };
  };

  const loadData = async (params: Record<string, any> = {}) => {
    state.loading = true;

    try {
      if (typeof props.requestApi !== 'function') {
        throw new Error('requestApi必须是一个函数');
      }

      const pageParams = {
        current: params.current ?? state.pagination.current,
        pageSize: params.pageSize ?? state.pagination.pageSize,
      };

      updatePagination({
        current: pageParams.current,
        pageSize: pageParams.pageSize,
      });

      const formattedParams = formatRequestParams(pageParams);

      message.info(`提交数据: ${JSON.stringify(formattedParams)}`);

      const result = await props.requestApi(formattedParams);

      state.tableData = result.data?.list || [];
      state.pagination.total = result.data?.total || 0;
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      state.loading = false;
    }
  };

  const updatePagination = (pagination: Partial<TablePaginationConfig>) => {
    Object.assign(state.pagination, pagination);
  };

  const handleSearch = () => {
    loadData({ current: 1 });
  };

  const handleReset = () => {
    formInstance.value?.resetFields();
    updatePagination({ current: 1, pageSize: 10 });
    loadData({ current: 1, pageSize: 10 });
  };

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
    };

    if (sorter?.order) {
      params['sorter'] = sorter.order === 'ascend' ? 'asc' : 'desc';
    }

    if (Object.keys(filters).length > 0) {
      params['filters'] = filters;
    }

    loadData(params);
  };

  const handleRefresh = async () => {
    try {
      await loadData();
      message.success('刷新成功');
    } catch (error) {
      console.error('刷新数据失败:', error);
    }
  };

  onMounted(() => {
    loadData();
  });

  const setColumns = [
    {
      title: '字段名称',
      dataIndex: 'title',
      key: 'title',
      customRender: ({ text }) => {
        return h('span', null, [h(HolderOutlined), text]);
      },
    },
    {
      title: '显示',
      dataIndex: 'showColumn',
      key: 'showColumn',
      customRender: ({ _, record }) => {
        return h(Checkbox, {
          checked: record.showColumn,
          onChange: (e) => {
            const columnIndex = setTableData.value.findIndex(col => col.dataIndex === record.dataIndex);
            if (columnIndex !== -1) {
              setTableData.value[columnIndex].showColumn = e.target.checked;
            }
          },
        });
      },
    },
    {
      title: '固定',
      dataIndex: 'fixed',
      key: 'fixed',
      customRender: ({ _, record }) => {
        return h(Checkbox, {
          checked: record.fixed === 'left',
          onChange: (e) => {
            const columnIndex = setTableData.value.findIndex(col => col.dataIndex === record.dataIndex);
            if (columnIndex !== -1) {
              setTableData.value[columnIndex].fixed = e.target.checked ? 'left' : undefined;
            }
          },
        });
      },
    },
  ];

  defineExpose({
    handleRefresh,
    handleReset,
    getFormValues: () => formData.value,
    getTableData: () => state.tableData,
  });
</script>

<style scoped>
  .common-btn {
    margin-right: 25px;
  }
  .query-topButton {
    margin-bottom: 20px;
  }
  .query-bottomButton {
    margin-top: 20px;
  }

  .bottomExtra {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }

  .bottomAction {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #eee;
    border-radius: 4px;
  }

  .bottomAction:hover {
    cursor: pointer;
    background-color: #ccc;
    border-radius: 4px;
  }

  :deep(.ant-table-tbody > tr.target > td) {
    border-top: 1px solid #409eff;
  }

  /* 拖拽时的样式反馈 */
  :deep(.ant-table-tbody > tr.dragging) {
    background-color: #e6f7ff;
  }

  :deep(.ant-table-tbody > tr.over) {
    background-color: #fffbe6;
  }
</style>

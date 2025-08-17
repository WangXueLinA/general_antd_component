<template>
  <div class="common-table-wrapper">
    <!-- 顶部操作按钮 -->
    <div class="topActionButtons">
      <a-button
        v-for="button in topActionButtons"
        :key="button?.key || button.label"
        class="common-btn"
        v-bind="mergeProps(button)"
      >
        {{ button.label }}
      </a-button>
    </div>

    <!-- 搜索表单 -->
    <JsonForm
      ref="formRef"
      :columns="formColumns"
      v-bind="formBindings"
      v-model="formData"
      v-if="!!formProps?.columns?.length"
    >
      <template #actions>
        <a-button type="primary" @click="handleSearch" class="common-btn"
          >搜索</a-button
        >

        <!-- 其他操作按钮 -->
        <a-button
          v-for="button in formProps.otherColumns || []"
          :key="button.key || button.label"
          class="common-btn"
          v-bind="mergeProps(button)"
        >
          {{ button.label }}
        </a-button>
      </template>
    </JsonForm>

    <!-- 底部操作按钮 -->
    <div class="bottomActionButtons">
      <a-button
        v-for="action in bottomActionButtons"
        :key="action.key || action.label"
        v-bind="mergeProps(action)"
        class="common-btn"
      >
        {{ action.label }}
      </a-button>
    </div>

    <!-- 数据表格 -->
    <a-table
      :data-source="tableData"
      :pagination="shouldShowPagination ? pagination : false"
      :loading="loading"
      size="middle"
      :row-key="tableProps.rowKey || 'id'"
      v-bind="tableBindings"
      @change="handleTableChange"
      @resizeColumn="handleResizeColumn"
    >
      <!-- 动态传递插槽 -->
      <template
        v-for="[slotName] in Object.entries($slots)"
        #[slotName]="scope"
      >
        <slot :name="slotName" v-bind="scope" />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import JsonForm from '../JsonForm/index.vue'
import {
  ref,
  reactive,
  computed,
  onMounted,
  defineProps,
  withDefaults,
  mergeProps,
  useTemplateRef
} from 'vue'
import type { TablePaginationConfig, TableProps } from 'ant-design-vue'
import type { QueryTableProps } from './types'

// 定义props
const props = withDefaults(defineProps<QueryTableProps>(), {
  topActionButtons: () => [],
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
    otherColumns: [],
  }),
})

const formInstance = useTemplateRef('formRef')

const formData = ref({})

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
})

const handleResizeColumn: TableProps['onResizeColumn'] = (w, col) => {
  col.width = w
}

// 计算属性
const formColumns = computed(() => {
  const columns = (props.formProps.columns || [])?.map((column) => ({
    ...column,
    key: column.field,
    component: column.el,
  }))

  if (columns.length) {
    // 添加查询按钮
    return [
      ...columns,
      {
        field: 'actions',
        formItemProps: { wrapperCol: { span: 24, offset: 0 } },
      },
    ]
  }

  return columns
})

const formLayout = computed(() => props.formProps.layout || 'inline')

const formBindings = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { columns, defaultData, ...rest } = props.formProps
  return {
    layout: formLayout.value,
    labelCol: { style: { width: '120px' } },
    wrapperCol: { style: { width: '260px' } },
    ...rest,
  }
})

const tableBindings = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pagination, ...rest } = props.tableProps
  return rest
})

const tableData = computed(() => state.tableData)
const pagination = computed(() => state.pagination)
const loading = computed(() => state.loading)

// 判断是否应该显示分页
const shouldShowPagination = computed(
  () => props.tableProps.pagination !== false
)

// 格式化请求参数
const formatRequestParams = (params: Record<string, any>) => {
  // 提取分页参数，不暴露出pageNum跟pageSize
  const { current, size, ...businessParams } = params

  // 调用提供的 formatParams 时，只传递业务参数
  const formattedBusinessParams = props?.formatParams({
    ...formData.value,
    ...businessParams,
  })

  // 将分页参数和格式化后的业务参数合并
  return {
    ...props.formProps.defaultData, // 只适用于第一层，不适用于嵌套
    ...formattedBusinessParams,
    current,
    size,
  }
}

// 加载数据
const loadData = async (params: Record<string, any> = {}) => {
  state.loading = true

  try {
    if (typeof props.requestApi !== 'function') {
      throw new Error('requestApi必须是一个函数')
    }

    // 处理分页参数
    const pageParams = {
      current:
        params.current !== undefined
          ? params.current
          : state.pagination.current,
      size: params.size !== undefined ? params.size : state.pagination.pageSize,
    }

    // 更新分页状态
    updatePagination({
      current: pageParams.current,
      pageSize: pageParams.size,
    })

    // 格式化请求参数
    const formattedParams = formatRequestParams(pageParams)

    // console.log('请求参数:', formattedParams);

    // 调用API获取数据
    const result = await props.requestApi(formattedParams)

    // console.log('返回结果:', result);

    // 更新表格数据和分页总数
    state.tableData = result.data?.list || []
    state.pagination.total = result.data?.total || 0

    // emits('success', result);
  } catch (error) {
    console.error('加载数据失败:', error)
    // emits('error', error);
  } finally {
    state.loading = false
  }
}

// 更新分页状态
const updatePagination = (pagination: Partial<TablePaginationConfig>) => {
  Object.assign(state.pagination, pagination)
}

// 处理搜索
const handleSearch = () => {
  loadData({ current: 1 })
}

// 处理重置
const handleReset = () => {
  // 重置表单
  formInstance.value?.resetFields()

  // 重置分页
  updatePagination({
    current: 1,
    pageSize: 10,
  })

  // 重新加载数据
  loadData({ current: 1, size: 10 })
}

// 处理表格变化
const handleTableChange: TableProps['onChange'] = (
  pagination,
  filters,
  sorter
) => {
  const params = {
    current: pagination.current,
    size: pagination.pageSize,
  }

  // 处理排序
  if (sorter?.order) {
    params['sorter'] = sorter.order === 'ascend' ? 'asc' : 'desc'
  }

  // 处理过滤
  if (Object.keys(filters).length > 0) {
    params['filters'] = filters
  }

  loadData(params)
}

// 根层用keep-alive包裹，替换onMounted
onMounted(() => {
  loadData()
})

// 对外暴露方法
defineExpose({
  handleRefresh: handleSearch, // 刷新数据
  handleReset, // 重置搜索
  getFormValues: () => formData.value, // 获取当前表单值
  getTableData: () => state.tableData, // 获取当前表格数据源
})
</script>

<style scoped>
.common-btn {
  margin-right: 25px;
}
</style>

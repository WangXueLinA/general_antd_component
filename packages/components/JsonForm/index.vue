<template>
  <a-form ref="formRef" :model="modelValue" v-bind="formProps">
    <a-row>
      <a-col :span="item.span || props.span" v-for="item in formItems" :key="item.field">
        <a-form-item
          :name="item.field"
          :label="item.label"
          colon
          v-bind="item.formItemProps"
        >
          <slot :name="item.field">
            <component
              :is="getComponent(item)"
              v-model:value="modelValue[item.field]"
              v-bind="{ ...item }"
            />
          </slot>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
import {
  onMounted,
  defineProps,
  defineExpose,
  computed,
  watch,
  reactive,
  useTemplateRef,
  withDefaults,
} from 'vue'
import { componentsMap } from './registerForm'
import type { FormItem } from './types'
import type { FormProps, FormInstance } from 'ant-design-vue'

export interface JsonFormProps extends Omit<FormProps, 'model'> {
  columns: FormItem[]
  span?: number
  modelValue?: Record<string, any>
}

const props = withDefaults(defineProps<JsonFormProps>(), {
  columns: [],
  modelValue: {},
  span: 24,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void
}>()

const formInstance = useTemplateRef<FormInstance>('formRef')

// 内部表单数据
const formData = reactive<Record<string, any>>({})

const formItems = computed(() => {
  return props.columns?.filter((item) => item.isShow !== false)
})

const formProps = computed(() => {
  const { columns, modelValue, span, ...rest } = props
  return rest
})

// 初始化表单
const initForm = () => {
  // 合并外部传入的modelValue和表单配置中的默认值
  const initialValues = { ...props?.modelValue }

  // 确保每个表单项都包含必要的属性
  props?.columns?.forEach((item) => {
    if (item.field && initialValues[item.field] === undefined) {
      initialValues[item.field] = item.value
    }
  })

  // 更新内部表单数据
  Object.assign(formData, initialValues)
}

// 可扩展el可以为h('div', null, '自定义组件'), 可以为自定义组件import引入
const getComponent = (item: FormItem) => {
  const { el } = item
  if (typeof el !== 'string') {
    return el
  }
  return componentsMap[item.el as keyof typeof componentsMap]
}

// 监听外部modelValue变化
watch(
  () => props?.modelValue,
  (newVal) => {
    if (newVal) {
      Object.assign(formData, newVal)
    }
  },
  { deep: true }
)

// 监听内部表单数据变化并通知父组件
watch(
  formData,
  (newVal) => {
    emit('update:modelValue', { ...newVal })
  },
  { deep: true }
)

onMounted(() => {
  initForm()
})

const validateFields = (): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    formInstance.value
      ?.validateFields()
      .then((formData) => resolve(formData))
      .catch((err) => reject(err))
  })
}

/**
 * 重置表单字段
 * @param {boolean} [isInit=true] 是否恢复初始值，默认为true
 */
const resetFields = (isInit = true) => {
  if (isInit) {
    initForm() // 重新初始化表单，恢复默认值
    formInstance.value?.clearValidate()
  } else {
    formInstance.value?.clearValidate()
    formInstance.value?.resetFields()
  }
}

defineExpose({
  validateFields,
  resetFields,
})
</script>
<style scoped less></style>

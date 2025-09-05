<template>
  <a-form ref="formRef" :model="formData" v-bind="formProps">
    <a-row :gutter="formProps.layout === 'inline' ? [0, 24] : undefined">
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
              v-model:value="formData[item.field]"
              v-bind="mergeProps(item, $attrs)"
            />
          </slot>
        </a-form-item>
      </a-col>
    </a-row>
    <slot/>
  </a-form>
</template>

<script lang="ts" setup>
import {
  onMounted,
  defineProps,
  defineExpose,
  computed,
  useTemplateRef,
  withDefaults,
  mergeProps,
  provide
} from 'vue'
import { componentsMap } from './registerForm'
import type { FormItem } from './types'
import type { FormProps, FormInstance,  } from 'ant-design-vue'

export interface JsonFormProps extends Omit<FormProps, 'model'> {
  columns?: FormItem[]
  span?: number
}

const props = withDefaults(defineProps<JsonFormProps>(), {
  columns: [],
  span: 24,
})

const formInstance = useTemplateRef<FormInstance>('formRef')

const formData = defineModel({
  type: Object,
  required: false,
  default: () => ({}),
})

const formItems = computed(() => {
  return props.columns?.filter((item) => item.isShow !== false)
})

const formProps = computed(() => {
  const { columns, span, ...rest } = props
  return rest
})

const initForm = () => {
  const initialValues = {};
  props?.columns?.forEach((item) => {
    if (item.field && item.value !== undefined) { // 只处理有值的情况
      initialValues[item.field] = item.value;
    }
  });

  // 只合并initialValues中值不为undefined的属性
  Object.keys(initialValues).forEach(key => {
    if (initialValues[key] !== undefined) {
      formData.value[key] = initialValues[key];
    }
  });
}

// 可扩展el可以为h('div', null, '自定义组件'), 可以为自定义组件import引入
const getComponent = (item: FormItem) => {
  const { el } = item
  if (typeof el !== 'string') {
    return el
  }
  return componentsMap[item.el as keyof typeof componentsMap]
}

onMounted(() => {
  initForm()
})

const validateFields = (): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    formInstance.value
      ?.validateFields()
      .then((formData) =>{
        return resolve(formData)})
      .catch((err) => reject(err))
  })
}

const resetFields = () => {
  initForm() 
  formInstance.value?.resetFields()    
  formInstance.value?.clearValidate()
}

defineExpose({
  validateFields,
  resetFields,
})
</script>
<style scoped less></style>

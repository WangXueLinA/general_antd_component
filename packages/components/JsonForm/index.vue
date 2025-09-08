<template>
  <a-form ref="formRef" :model="formData" v-bind="formProps">
    <a-row :gutter="formProps.layout === 'inline' ? [0, 24] : undefined">
      <a-col :span="item.span || props.span" v-for="item in formItems" :key="item.field">
        <a-form-item :name="item.field" :label="item.label" colon v-bind="item.formItemProps">
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
    <slot />
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
    watch,
    unref
  } from 'vue';
  import { componentsMap } from './registerForm';
  import type { FormItem } from './types';
  import type { FormProps, FormInstance } from 'ant-design-vue';

  export interface JsonFormProps extends Omit<FormProps, 'model'> {
    columns?: FormItem[];
    span?: number;
  }

  export interface FormItemWithDependency extends FormItem {
    isShow?:
      | boolean
      | {
          notIn?: boolean;
          relation?: 'and' | 'or';
          relyOn?: Record<string, any[]>;
          external?: boolean;
        };
  }

  const props = withDefaults(defineProps<JsonFormProps>(), {
    columns: [],
    span: 24,
  });

  const formInstance = useTemplateRef<FormInstance>('formRef');

  const formData = defineModel({
    type: Object,
    required: false,
    default: () => ({}),
  });

  const shouldShowItem = (item: FormItemWithDependency): boolean => {
    let isShow: boolean;

    if (typeof item.isShow === 'boolean') {
      isShow = unref(item.isShow);
    } else if (!item.isShow) {
      isShow = true;
    } else {
      const { 
        notIn = false,
        relation = 'or',
        relyOn,
        external
      } = item.isShow;
      const relyOnKeys = Object.keys(relyOn || {});

      if (relyOnKeys.length === 0) {
        isShow = true;
      } else {
        const checkResults = relyOnKeys.map(key => {
          const targetValues = relyOn![key];
          const currentValue = formData.value[key];
          return targetValues.includes(currentValue);
        });

        if (relation === 'and') {
          isShow = checkResults.every(Boolean);
        } else {
          isShow = checkResults.some(Boolean);
        }
        isShow = notIn ? !isShow : isShow;
      }

      if (external !== undefined) {
        const externalValue = unref(external);
        if (relation === 'and') {
          isShow = isShow && externalValue;
        } else {
          isShow = isShow || externalValue;
        }
      }
    }

    if (isShow) {
      if (formData.value[item.field] === undefined && item.value !== undefined) {
        formData.value[item.field] = item.value;
      }
    } else {
      if (formData.value[item.field] !== undefined) {
        const { [item.field]: _, ...rest } = formData.value;
        formData.value = rest;
      }
    }
    return isShow;
  };

  // 收集所有依赖关系，用于级联重置
  const getDependencyMap = () => {
    const map: Record<string, string[]> = {};
    props.columns?.forEach(item => {
      if (item.isShow && typeof item.isShow !== 'boolean' && item.isShow.relyOn) {
        Object.keys(item.isShow.relyOn).forEach(relyKey => {
          if (!map[relyKey]) {
            map[relyKey] = [];
          }
          if (!map[relyKey].includes(item.field)) {
            map[relyKey].push(item.field);
          }
        });
      }
    });
    return map;
  };

  const resetDependentFields = (field: string) => {
    const dependencyMap = getDependencyMap();
    const dependentFields = dependencyMap[field] || [];

    dependentFields.forEach(depField => {
      formData.value[depField] = undefined;
      resetDependentFields(depField);
    });
  };

  // 依赖表单字段的值变化时，要将自己设置为undefined
  watch(
    () => ({ ...formData.value }),
    (newVal, oldVal) => {
      const changedFields = new Set<string>();
      Object.keys(newVal).forEach(key => {
        if (newVal[key] !== oldVal?.[key]) {
          changedFields.add(key);
        }
      });

      if (oldVal) {
        Object.keys(oldVal).forEach(key => {
          if (!(key in newVal)) {
            changedFields.add(key);
          }
        });
      }

      changedFields.forEach(field => {
        resetDependentFields(field);
      });
    },
    { deep: true },
  );

  const formItems = computed(() => {
    return props.columns?.filter(item => shouldShowItem(item)) || [];
  });

  const formProps = computed(() => {
    const { columns, span, ...rest } = props;
    return rest;
  });

  const initForm = () => {
    const initialValues = {};
    props?.columns?.forEach(item => {
      if (item.field && item.value !== undefined) {
        initialValues[item.field] = item.value;
      }
    });

    Object.keys(initialValues).forEach(key => {
      if (initialValues[key] !== undefined) {
        formData.value[key] = initialValues[key];
      }
    });
  };

  const getComponent = (item: FormItem) => {
    const { el } = item;
    if (typeof el !== 'string') {
      return el;
    }
    return componentsMap[item.el as keyof typeof componentsMap];
  };

  onMounted(() => {
    initForm();
  });

  const validateFields = (): Promise<Record<string, any>> => {
    return new Promise((resolve, reject) => {
      formInstance.value
        ?.validateFields()
        .then(formData => resolve(formData))
        .catch(err => reject(err));
    });
  };

  const resetFields = () => {
    initForm();
    formInstance.value?.resetFields();
    formInstance.value?.clearValidate();
  };

  defineExpose({
    validateFields,
    resetFields,
  });
</script>
<style scoped less></style>

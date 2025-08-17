import Form, { type JsonFormProps } from './index.vue';
import { h, ref, reactive } from 'vue';

export const useForm = (props: JsonFormProps) => {
  const formRef = ref();
  // @ts-ignore
  const Component = (_, { slots }) => {
    // @ts-ignore
    return h(Form, { ...reactive(props), ref: formRef }, slots);
  };

  return {
    JsonForm: Component,
    validateFields: formRef.value?.validateFields,
    resetFields: formRef.value?.resetFields,
  };
};

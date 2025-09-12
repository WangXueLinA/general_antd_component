import type { FormProps as AntdFormProps, FormItemProps } from 'ant-design-vue';
import { Component } from 'vue';

export interface ShowExtends {
  relyOn: { 
    [k: string]: string[] 
  },
  relation?: 'and' | 'or'
  notIn?: boolean
  external?: boolean
}
// 表单布局配置类型
export interface FormLayout {
  labelCol: {
    xs: { span: number };
    sm: { span: number };
  };
  wrapperCol: {
    xs: { span: number };
    sm: { span: number };
  };
}

// 表单项配置类型
export interface FormItem {
  field: string;
  el: string | Component;
  label: string;
  span?: number;
  formItemProps?: FormItemProps;
  isShow?: boolean | ShowExtends | undefined;
  value?: any;
  onChange?: (value: any, ...args: any[]) => void
  [k: string]: any
}

export interface JsonFormProps extends AntdFormProps {
  span?: number;
  columns?: FormItem[] | undefined | [];
}

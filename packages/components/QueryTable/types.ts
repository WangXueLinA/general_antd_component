import type { TableProps, FormProps as AntdFormProps, FormItemProps } from 'ant-design-vue';
import { Component } from 'vue';

interface ShowExtends {
  relyOn: { 
    [k: string]: string[] 
  },
  relation?: 'and' | 'or'
  notIn?: boolean
  external?: boolean
}

export type FormColumn = {
  field: string;
  el: string | Component;
  label: string;
  span?: number;
  formItemProps?: FormItemProps;
  isShow?: boolean | ShowExtends | undefined;
  value?: any;
  onChange?: (value: any, ...args: any[]) => void
  [k: string]: any
};

export const defineJsonColumns = (
  columns: Array<FormColumn>
) => columns

export type FormProps = {
  columns?: FormColumn[]| undefined ;
  defaultData?: Record<string, any>;
  layout?: string;
  labelCol?: AntdFormProps['labelCol'];
  wrapperCol?: AntdFormProps['wrapperCol'];
};

export type QueryTableProps = {
  formProps: FormProps;
  tableProps: TableProps;
  requestApi: (params: Record<string, any>) => Promise<any>;
  formatParams?: (params: Record<string, any>) => Record<string, any>;
};
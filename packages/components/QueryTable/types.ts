import type { TableProps, ButtonProps, FormProps as AntdFormProps } from 'ant-design-vue';

export type QueryTableProps = {
  topActionButtons?: Array<ButtonProps & { label: string; key?: string }>;
  bottomActionButtons?: Array<ButtonProps & { label: string; key?: string }>;
  formProps: FormProps;
  tableProps: TableProps;
  requestApi: (params: Record<string, any>) => Promise<any>;
  formatParams?: (params: Record<string, any>) => Record<string, any>;
};
export type FormColumn = {
  field: string;
  el: string;
  label: string;
  span?: number;
  [key: string]: any;
};

export type FormProps = {
  columns: FormColumn[];
  defaultData?: Record<string, any>;
  layout?: string;
  labelCol?: AntdFormProps['labelCol'];
  wrapperCol?: AntdFormProps['wrapperCol'];
  otherColumns?: ButtonConfig[];
};

export type ButtonConfig = {
  label: string;
  key?: string;
  [key: string]: any;
};

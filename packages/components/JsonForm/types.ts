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
  el: string | Function; // 组件名称
  label: string; // 标签文本
  field: string; // 绑定的模型值
  formItemProps?: Record<string, any>; // FormItem 的额外属性
  [key: string]: any; // 其他属性
}

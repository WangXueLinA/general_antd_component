import {
  Input,
  Textarea,
  Switch,
  Checkbox,
  InputNumber,
  Radio,
  DatePicker,
  Select,
  TreeSelect,
  Cascader
} from 'ant-design-vue'
import Text from './components/text.vue'
import Time from './components/time.vue'
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

import {
  defineComponent,
  h,
  useModel,
  reactive,
  computed,
  onMounted,
  watch,
  type Component,
} from 'vue'
import { get } from 'http'

// 处理 v-model:checked 绑定
export const transformBinding = (Component: Component) => {
  return defineComponent({
    name: Component.name,
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { attrs, slots, emit }) {
      const model = useModel(props, 'value')

      watch(
        () => props.value,
        (newValue) => {
          model.value = !!newValue
        }
      )

      return () =>
        h(
          Component,
          {
            ...attrs,
            checked: !!model.value,
            onChange: (e: { target: { checked: boolean } }) => {
              const checked = typeof e === 'object' ? e.target.checked : e
              model.value = !!checked
              emit('update:value', !!checked)
            },
          },
          slots
        )
    },
  })
}

// 扩展组件，支持异步属性getOptions获取options
const extendComponentsOptions = (Component: Component, config?: any) => {
  return defineComponent({
    name: Component.name,
    props: {
      getOptions: {
        type: Function,
        default: undefined,
      },
      options: {
        type: Array,
        default: () => [],
      },
    },
    setup(props, { attrs, slots }) {
      const state = reactive({
        options: props.options || [], // 默认使用传入的 options
      })

      // 过滤掉扩展属性getOptions，只保留独有的props
      const selectProps = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { getOptions, ...rest } = props
        return rest
      })

      // 获取选项数据
      const fetchOptions = async (...args: any) => {
        if (!props.getOptions) return // 如果没有提供 getOptions，直接返回
        try {
          const result = await props.getOptions(...args)
          // 格式化选项数据，自己在接口里map处理label跟value的对应值
          state.options = result
        } catch (error) {
          state.options = []
        }
      }

      onMounted(() => {
        fetchOptions()
      })

      watch(
        () => props.options,
        (newOptions) => {
          if (newOptions && !props.getOptions) {
            state.options = newOptions
          }
        }
      )
      return () =>
        h(
          Component,
          {
            ...attrs,
            // treeSelect需要treeData, 需要特殊处理，正常配置options就可以
            // 如有嵌套childern的话，也需要深层递归满足label跟value格式
            ...(Component.name === 'ATreeSelect'
              ? { treeData: state.options }
              : { options: state.options }),
            ...config,
            ...selectProps,
          },
          slots
        )
    },
  })
}

export const componentsMap = {
  Text,
  Time,
  Textarea,
  InputNumber,
  DatePicker,
  Input,
  RangePicker,
  Cascader: extendComponentsOptions(Cascader, {
    allowClear: true,
    showSearch: true,
    getPopupContainer: (triggerNode: HTMLElement) => triggerNode.parentNode,
  }),
  TreeSelect: extendComponentsOptions(TreeSelect, {
    allowClear: true,
    showSearch: true,
    getPopupContainer: (triggerNode: HTMLElement) => triggerNode.parentNode,
    filterTreeNode: (inputValue: string, { label }: any) =>
      label.indexOf(inputValue) !== -1,
  }),
  Select: extendComponentsOptions(Select, {
    allowClear: true,
    showSearch: true,
    getPopupContainer: (triggerNode: HTMLElement) => triggerNode.parentNode,
  }),
  CheckboxGroup: extendComponentsOptions(CheckboxGroup),
  RadioGroup: extendComponentsOptions(RadioGroup),
  Checkbox: transformBinding(Checkbox), // 处理 v-model:checked 绑定
  Switch: transformBinding(Switch), // 处理 v-model:checked 绑定
  Radio: transformBinding(Radio), // 处理 v-model:checked 绑定
}

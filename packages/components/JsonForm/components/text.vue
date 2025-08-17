<!--主要作用是将值映射为对应的标签显示, 常用详情页回显值-->
<template>
  <a-tooltip :title="displayValue">
    <template #content>
      {{ displayValue }}
    </template>
    <span>{{ displayValue }}</span>
  </a-tooltip>
</template>

<script setup>
  import { computed, defineProps } from 'vue';

  const props = defineProps({
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Array],
      default: '',
    },
    split: {
      type: String,
      default: '、',
    },
  });

  // 计算显示值
  const displayValue = computed(() => {
    // 处理空值情况
    if (props.value === null || props.value === undefined || props.value === '') {
      return '--';
    }

    // 处理数组为空的情况
    const isArr = Array.isArray(props.value);
    if (isArr && props.value.length === 0) {
      return '-';
    }

    // 确保值为数组以便统一处理
    const val = isArr ? [...props.value] : [props.value];

    // 如果提供了选项，则将值映射为标签
    if (props.options?.length) {
      // 递归查找选项及其子选项

      props.options.forEach(function deep(obj) {
        if (val.includes(obj.value)) {
          const index = val.indexOf(obj.value);
          val.splice(index, 1, obj.label);
        }
        obj.children?.forEach(deep);
      });
    }

    // 使用分隔符连接所有值
    return val.join(props.split);
  });
</script>

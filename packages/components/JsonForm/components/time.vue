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
  import dayjs from 'dayjs';

  const props = defineProps({
    value: {
      type: [String, Array],
      default: '',
    },
    split: {
      type: String,
      default: '——',
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD',
    }
  });

  const displayValue = computed(() => {
    // 处理空值情况
    if (props.value === null || props.value === undefined || props.value === '') {
      return '--';
    }

    if (Array.isArray(props.value)) {
      if (props.value.length === 0) {
        return '--';
      }
      return props.value.map(item => dayjs(item).format(props.format)).join(props.split);
    } else {
      return dayjs(props.value).format(props.format);
    }

  });
</script>

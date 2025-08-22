<template>
  <div class="action-buttons">
    <template v-for="(render, index) in renders" :key="index">
      <component :is="render" />
    </template>
  </div>
</template>

<script setup>
import { computed, h, useSlots, ref, isVNode } from 'vue';
import { Divider, Dropdown, Menu, MenuItem } from 'ant-design-vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  showDivider: {
    type: Boolean,
    default: true
  },
  limit: {
    type: Number,
    default: 3
  },

  size: {
    type: String,
    default: 'middle'
  }
});

const slots = useSlots();

const visible = ref(false);

const getSlotButtons = () => {
  const slotContent = slots.default?.() || [];
  
  return slotContent.filter(item => {
    if (!item) return false;
    if (item.type === Divider) return false;
    if (!item.children) return false;
    if (item?.props && item?.props?.style?.display === 'none') return false;
    return isVNode(item);
  });
};

const renderMoreButton = (buttonVNode) => {
  const { props: buttonProps, on, children } = buttonVNode;
  
  return h(MenuItem, {
    disabled: buttonProps?.disabled,
    onClick: (e) => {
      if (on?.click) {
        on.click(e);
      }
    }
  }, {
    default: () => h('span', children)
  });
};

const renderMore = (foldButtons) => {
  return h(Dropdown, 
    {
      onOpenChange: (open) => visible.value = open
    }, 
    {
      default: () => h('span',
        { style: { cursor: 'pointer', color: '#1890ff' } },
        [
          h(!!visible.value ? UpOutlined : DownOutlined, { style: { fontSize: '12px', marginRight: '5px' }}), '更多'
        ]),
        overlay: () => h(Menu, null, {
          default: () => foldButtons.map(button => renderMoreButton(button))
        })
    }
  );
};

// 渲染分隔线
const renderDivider = () => {
  return h(Divider, {
    type: 'vertical',
    style: {
      margin: '0 8px'
    }
  });
};

const renders = computed(() => {
  let elements = [];
  const unflod = [];
  const flod = [];
  const slotButtons = getSlotButtons();

  slotButtons.forEach((button, index) => {
    if (props.limit === 0 || index < props.limit - 1) {
      unflod.push(button);
    } else {
      flod.push(button);
    }
  });

  if (flod.length === 1) {
    unflod.push(flod.pop());
  }

  unflod.forEach(button => {
    elements.push(button);
  });

  if (flod.length > 0) {
    elements.push(renderMore(flod));
  }

  if (props.showDivider && elements.length > 0) {
    const withDividers = [];
    elements.forEach((el, index) => {
      if (index > 0) {
        withDividers.push(renderDivider());
      }
      withDividers.push(el);
    });
    elements = withDividers;
  }
  return elements;
});
</script>

<style scoped>
.action-buttons {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
    

<template>
  <div>默认最多展示3个操作：</div>
  <Operation>
    <a>操作1</a>
    <a>操作2</a>
    <a>操作3</a>
  </Operation>

  <a-divider />

  <div>超过3个操作显示更多下拉操作：</div>
  <Operation>
    <a>操作1</a>
    <a>操作2</a>
    <a>操作3</a>
    <a>操作4</a>
  </Operation>

  <a-divider />

  <div>h函数动态渲染：操作1跟2根据条件隐藏</div>
  <component :is="customRender" />
</template>
<script setup >
import { h } from 'vue'
import Operation from '../../../packages/components/Operation/index.vue'

const customRender = () => {
  return h(Operation, [
    false && h('a','操作1'),
    h('a',{ style: { display:'none' }}, '操作2'),
    h('a', '操作3'),
    h('a', '操作4'),
  ])
}
</script>

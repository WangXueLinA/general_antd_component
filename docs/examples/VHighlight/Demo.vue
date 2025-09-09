<template>
  <a-input 
    type="text" 
    v-model="searchText" 
    placeholder="输入要高亮的文本..."
    @change="searchText = $event.target.value"
  />

  <div class="content">
    <p v-highlight="highlightOptions">这是一段要高亮的文本</p>
    <p v-highlight="highlightOptions">这是一段要高亮的文本</p>
    <p v-highlight="highlightOptions">这是一段要高亮的文本</p>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';

  const searchText = ref('');

  // 高亮选项 - 不指定样式时将使用默认的红色字体
  const highlightOptions = computed(() => ({
    searchText: searchText.value,
    // 可以通过以下方式自定义样式：
    // highlightStyle: {
    //   color: '#0000ff',  // 蓝色字体
    //   fontWeight: 'bold'
    // }
  }));
</script>

<template>
  <div class="controls">
    展示行数： 
    <a-input-number 
      v-model:value="count" 
      @change="handleCountChange"
      min="1" 
      :max="maxLines"
    />
    <span>（最多 {{ maxLines }} 行）</span>
  </div>
    
  <div class="text-content">
    <span v-tooltip="count">
      这是一段超出的文本这是一段超出的文本这是一段超出的文本这是一段超出的文本这是一段超出的文本这是一段超出的文本这是一段超出的文本这是一段超出的文本这是一段超出的文本这是一段超出的文本这是一段超出的文本这是一段超出的文本这是一段超出的文本
    </span>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const count = ref(2);
  const maxLines = ref(5);

  const handleCountChange = (value) => {
    if (value) {
      count.value = Math.min(value, maxLines.value);
    }
  };
</script>

<style>
  .controls {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .text-content {
    font-size: 16px;
    line-height: 1.5;
    border: 1px dashed #ccc;
    padding: 10px;
}
</style>

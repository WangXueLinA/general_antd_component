<template>
  <a-space>
    <a-input v-model:value="value"/>
    <CopyButton :text="value">
      复制内容
    </CopyButton>
  </a-space>
</template>

<script setup>
import { ref } from 'vue';
const value = ref('');
</script>


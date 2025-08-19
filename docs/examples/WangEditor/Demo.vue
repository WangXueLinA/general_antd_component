<template>
  <div class="app-container">
    <WangEditor v-model="value" height="400px" />
    <div style="margin-top: 10px">
      <textarea v-model="value" readonly style="width: 100%; height: 200px; outline: none" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const value = ref("初始化内容");
</script>



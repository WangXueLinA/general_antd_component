<template>
  <!-- 1.定义模板 -->
  <DefineTemplate v-slot="{ title, onCustomClick, index }">
    <div>
      <div>{{ title }}</div>
      <div>
        {{`我是模版${index}内容`}}
        <a-button type="primary" @click="onCustomClick(123)">点击</a-button>
      </div>
    </div>
  </DefineTemplate>

  <!-- 2.使用模板 -->
  <UseTemplate title="使用模版传入头部" index="1" @customClick="message.success" />

  <a-divider />
  <UseTemplate index="2" @customClick="message.error" />
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { useTemplate } from '../../../packages/hooks/useTemplate'

  const [ DefineTemplate, UseTemplate ] = useTemplate()
</script>
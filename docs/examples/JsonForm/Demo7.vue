<template>
  <div style="margin-bottom: 40px">
    是否展示项目名称：<a-switch v-model:checked="checked"  />
  </div>

  <JsonForm 
    :columns="columns" 
    :labelCol="{ style: { width: '100px' } }" 
    v-model="formData" 
    ref="formRef"
  />
</template>
<script setup>
  import { h, useTemplateRef, ref, computed, reactive } from 'vue';
  import { Modal, Button } from 'ant-design-vue';
  const formRef = useTemplateRef('formRef');

  const formData = ref({});
  const checked = ref(true);

  const city= computed(() => {
    if (formData.value.province === 'jiangsu') {
      return [
        { label: '苏州', value: 'suzhou' },
      ];
    }
    if (formData.value.province === 'zhejiang') {
      return [
        { label: '杭州', value: 'hangzhou' },
      ];
    }
    return [];
  })

  const district = computed(() => {
    if (formData.value.city === 'suzhou') {
      return [
        { label: '吴中区', value: 'wuzhong' },
        { label: '姑苏区', value: 'gusu' },
        { label: '虎丘区', value: 'huqiu' },
      ];
    }
    if (formData.value.city === 'hangzhou') {
      return [
        { label: '余杭区', value: 'yuhang' },
        { label: '临安区', value: 'linan' },
        { label: '上城区', value: 'shangcheng' },
        { label: '下城区', value: 'xiacheng' },
        { label: '江干区', value: 'jianggan' },
        { label: '拱墅区', value: 'gongshu' },
        { label: '西湖区', value: 'xihu' },
        { label: '滨江区', value: 'binjiang' },
        { label: '萧山区', value: 'xiaoshan' }
      ]
    }
    return [];
  })

  const columns = reactive([
    {
      label: '项目名称',
      field: 'projectName',
      el: 'Input',
      isShow: checked,
      placeholder: '输入项目名称',
    },
    {
      label: '项目类型',
      field: 'projectType',
      el: 'Select',
      placeholder: '请选择项目类型',
      options: [
        { label: '项目1展示描述', value: 'project1' },
        { label: '项目2展示描述', value: 'project2' },
        { label: '项目3不展示描述', value: 'project3' },
      ],
    },
    {
      label: '项目描述',
      field: 'projectDesc',
      el: 'Textarea',
      placeholder: '输入项目描述',
      isShow: {
        // 项目描述在选中项目类型为project1, project2的时候展示
        relyOn: {
          projectType: ['project1', 'project2'],
        }
      }
    },
    {
      label: '省',
      field: 'province',
      el: 'Select',
      placeholder: '请选择省',
      span: 8,
      options: [
        { label: '江苏', value: 'jiangsu' },
        { label: '浙江', value: 'zhejiang' }, 
      ], 
    },
    {
      label: '市',
      field: 'city',
      el: 'Select',
      placeholder: '请选择市',
      span: 8,
      isShow: {
        // 省有值时，市才进行显示
        notIn: true,  // 取反
        relyOn: {
          province: [undefined], // 市值undefined时
        }
      },
      options: city,
    },
    {
      label: '区',
      field: 'district',
      el: 'Select',
      placeholder: '请选择区',
      span: 8,
      isShow: {
        // 市有值时，区才进行显示
        notIn: true, // 取反
        relyOn: {
          city: [undefined],// 市值undefined时
        }
      },
      options: district,
    },
    {
      label: '',
      field: '',
      style: { textAlign: 'center' },
      el: h('div', [
        h(
          Button,
          {
            type: 'primary',
            onClick: async () => {
              await formRef.value?.validateFields();
              Modal.success({
                title: '提交参数',
                content: h(
                  'div',
                  Object.entries(formData.value).map(([key, value]) => h('div', `${key}: ${value}`)),
                ),
                onOk() {},
                onCancel() {},
              });
            },
          },
          '提交',
        ),
        h(
          Button,
          {
            style: { marginLeft: '10px' },
            onClick: () => {
              formRef.value?.resetFields();
            },
          },
          '重置',
        ),
      ]),
    },
  ]);
</script>

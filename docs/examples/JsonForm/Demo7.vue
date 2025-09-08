<template>
  <div style="margin-bottom: 40px"> 
    项目名称：
    <a-switch v-model:checked="checked" checked-children="展示" un-checked-children="隐藏" /> 

    <span style="margin-left: 50px;">
      性别：
      <a-switch v-model:checked="sexChecked" checked-children="展示" un-checked-children="隐藏" /> 
    </span>

  </div>

  <JsonForm :columns="columns" :labelCol="{ style: { width: '70px' } }" v-model="formData" ref="formRef" />
</template>
<script setup>
  import { h, useTemplateRef, ref, reactive, watch, computed } from 'vue';
  import { Modal, Button } from 'ant-design-vue';
  import jsonp from 'fetch-jsonp';

  const formRef = useTemplateRef('formRef');

  const formData = ref({});
  const checked = ref(true);
  const cityId = ref(undefined)
  const cityOptions = ref([])
  const districtId = ref(undefined)
  const districtOptions = ref([])
  const sexChecked = ref(true)

  watch(cityId, (newVal) => {
    if (newVal) {
      jsonp(`https://fts.jd.com/area/get?fid=${newVal}`)
        .then(res => res.json())
        .then(res => {
          cityOptions.value = res.map(item => ({ label : item.name, value: item.id }))
        })
    }
  })

  watch(districtId, (newVal) => {
    if (newVal) {
      jsonp(`https://fts.jd.com/area/get?fid=${newVal}`)
        .then(res => res.json())
        .then(res => {
          districtOptions.value = res.map(item => ({ label : item.name, value: item.id }))
        })
    }
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
        relyOn: {
          // 项目类型的field为projectType，值为project1或project2展示项目描述
          projectType: ['project1', 'project2'],
        },
      },
    },
    {
      label: '省',
      field: 'province',
      el: 'Select',
      placeholder: '请选择省',
      span: 8,
      onSelect: (value) => cityId.value = value,
      optionFilterProp: 'label',
      // fi=-1以国家开始查询， fid=4744为中国
      getOptions: () => jsonp(`https://fts.jd.com/area/get?fid=4744`)
        .then(res => res.json())
        .then(res => res.map(item => ({ label : item.name, value: item.id })))
        
    },
    {
      label: '市',
      field: 'city',
      el: 'Select',
      placeholder: '请选择市',
      span: 8,
      onSelect: (value) => districtId.value = value,
      optionFilterProp: 'label',
      isShow: {
        // 省有值时，市才进行显示
        notIn: true, // 取反
        relyOn: {
          province: [undefined], // 市值undefined时
        },
      },
      options: cityOptions,
    },
    {
      label: '区',
      field: 'district',
      el: 'Select',
      placeholder: '请选择区',
      span: 8,
      optionFilterProp: 'label',
      isShow: {
        // 市有值时，区才进行显示
        notIn: true, // 取反
        relyOn: {
          city: [undefined], // 市值undefined时
        },
      },
      options: districtOptions,
    },
    {
      label: '性别',
      field: 'sex',
      el: 'Select',
      placeholder: '请选择性别',
      options: [
        { label: '男(展示年龄)', value: 'male' },
        { label: '女(不展示年龄)', value: 'female' },
      ],
      isShow: sexChecked,
    },
    {
      label: '年龄',
      field: 'age',
      el: 'InputNumber',
      style: { width: '100%' },
      span: 24,
      status: 'warning',
      placeholder: '输入年龄',
      addonBefore: '显示条件为性别为男并且项目名称展示的时候才展示',
      // isShow: computed(() => sexChecked.value && checked.value),
      isShow: {
        relation: 'and',
        relyOn: {
          sex: ['male'],
        },
        external: checked
      },
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
              cityId.value = undefined
              districtId.value = undefined
            },
          },
          '重置',
        ),
      ]),
    },
  ]);
</script>

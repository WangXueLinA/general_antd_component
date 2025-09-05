<template>
  <JsonForm :columns="columns" :labelCol="{ style: { width: '100px' } }" v-model="formData"> </JsonForm>
</template>

<script setup>
  import { computed, reactive, ref } from 'vue';

  const formData = ref({});

  const columns = reactive([
    {
      label: '项目地址',
      field: 'name',
      el: 'Select',
      placeholder: '请选择项目名称',
      getOptions: () =>
        Promise.resolve([
          { label: '项目1', value: 'project1' },
          { label: '项目2', value: 'project2' },
          { label: '项目3', value: 'project3' },
        ]),
    },
    {
      label: '爱好',
      field: 'hobby',
      el: 'CheckboxGroup',
      getOptions: () =>
        Promise.resolve([
          { name: '吃饭', key: 'eat' },
          { name: '睡觉', key: 'sleep' },
          { name: '打游戏', key: 'game' },
        ]).then(options => options.map(item => ({ label: item.name, value: item.key }))),
    },
    {
      label: '性别',
      field: 'sex',
      el: 'RadioGroup',
      value: computed(() => formData.value.sex || 'female'),
      onChange: e => {
        formData.value.sex = e.target.value;
      },
      getOptions: () =>
        Promise.resolve([
          { name: '男', value: 'male' },
          { name: '女', value: 'female' },
        ]).then(options => options.map(item => ({ ...item, label: item.name }))),
    },
    {
      label: '节点',
      field: 'node',
      placeholder: '请选择节点',
      el: 'TreeSelect',
      treeDefaultExpandAll: true,
      treeNodeFilterProp: 'label',
      getOptions: () =>
        Promise.resolve([
          {
            name: 'root 1',
            value: 'root 1',
            children: [
              {
                name: 'parent 1',
                value: 'parent 1',
                children: [
                  {
                    name: 'parent 1-0',
                    value: 'parent 1-0',
                    children: [
                      {
                        name: 'my leaf',
                        value: 'leaf1',
                      },
                      {
                        name: 'your leaf',
                        value: 'leaf2',
                      },
                    ],
                  },
                  {
                    name: 'parent 1-1',
                    value: 'parent 1-1',
                  },
                ],
              },
              {
                name: 'parent 2',
                value: 'parent 2',
              },
            ],
          },
        ]).then(options =>
          options.map(function deep(item) {
            if (item.children) {
              item.children = item.children.map(deep);
            }
            return { label: item.name, value: item.value, children: item.children };
          }),
        ),
    },
    {
      label: '级联',
      field: 'cascader',
      el: 'Cascader',
      placeholder: '请选择级联',
      getOptions: () =>
        Promise.resolve([
          { label: '浙江', value: 'zhejiang', children: [{ label: '杭州', value: 'hangzhou' }] },
          { label: '江苏', value: 'jiangsu', children: [{ label: '南京', value: 'nanjing' }] },
        ])
    },
  ]);
</script>

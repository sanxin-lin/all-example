<template>
  <!-- <Form :model="formState" @values-change="e => console.log(e)">
    <FormItem label="999" name="name" :rules="[{ required: true, message: 'sssss' }]">
      <Input v-model:value="formState.name" />
    </FormItem>
  </Form> -->
  <!-- <Button @click="click">点击</Button>
  {{ formState }} -->
  <FormFactory ref="formRef" :options="options" v-model="formState" :config="config">
    <template #input_prefix>
      <UserOutlined />
    </template>
  </FormFactory>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, toRaw } from 'vue';
import { Button } from 'ant-design-vue';
import FormFactory from './src/ant-design-vue/src';
import { UserOutlined } from '@ant-design/icons-vue';
import type {
  TAntdvFormOptions,
  IAntdvFormConfig,
  AntdvFormInstance,
} from './src/ant-design-vue/src';
import Custom from './src/custom/custom.vue';
const formRef = ref<AntdvFormInstance>();
const flag = ref(false);
const formState = reactive({
  name: 'name',
  users: '1',
});
const options = computed<TAntdvFormOptions[]>(() => {
  const o: TAntdvFormOptions[] = [
    [
      {
        type: 'input', // 类型
        props: {
          // 属性
          placeholder: '请输入',
        },
        label: '输入框', // 表单字段标题
        field: 'name', // 字段名
        slots: {
          prefix: 'input_prefix', // 插槽
        },
        rules: [{ required: true, message: '填写啊' }], // 校验规则
        col: 12, // 栅格
      },
      // 。。。下面类似
      {
        type: 'input',
        props: {
          placeholder: '请输入',
        },
        label: '输入框',
        field: 'name',
        slots: {
          prefix: 'input_prefix',
        },
        rules: [{ required: true, message: '填写啊' }],
        col: 12,
      },
    ],
    {
      type: 'select',
      props: {
        placeholder: '请输入',
        allowClear: true,
        options: [
          {
            label: '哈哈',
            value: '1',
          },
          {
            label: '嘻嘻',
            value: '2',
          },
        ],
      },
      label: '选择框',
      field: 'users',
      slots: {
        suffixIcon: 'select_suffix',
      },
      rules: [{ required: true, message: '填写啊' }],
    },
    {
      type: 'timePicker',
      field: 'time',
      label: '时间选择',
    },
    {
      type: 'timeRangePicker',
      field: 'time',
      label: '时间选择',
    },
    {
      type: 'custom',
      field: 'name',
      label: '自定义',
      component: Custom,
      rules: [{ required: true, message: '填写啊' }],
    },
  ];
  if (!flag.value) {
    o.push({
      type: 'select',
      props: {
        // value: formState.users,
        placeholder: '请输入',
        // mode: 'multiple',
        allowClear: true,
        options: [
          {
            label: '哈哈',
            value: '1',
          },
          {
            label: '嘻嘻',
            value: '2',
          },
        ],
      },
      label: '选择框',
      field: 'users',
      slots: {
        suffixIcon: 'select_suffix',
      },
      rules: [{ required: true, message: '填写啊' }],
    });
  }
  return o;
});
const config = computed<IAntdvFormConfig>(() => {
  return {
    onSubmit: res => {
      console.log(res, toRaw(formState));
    },
    onReset: () => {
      console.log(toRaw(formState));
    },
    buttons: [
      {
        type: 'submit',
        content: '提交',
        props: {
          type: 'primary',
        },
      },
      {
        type: 'reset',
        content: '重置',
        props: {
          class: 'ml-1',
        },
      },
      {
        content: '按钮啊',
        props: {
          class: 'ml-1',
          onClick: () => {
            console.log(777);
            console.log(formRef.value);
            formRef.value?.resetFields();
          },
        },
      },
    ],
  };
});
const slots = computed(() => (flag.value ? ['input_prefix'] : ['input_prefix', 'select_suffix']));
const click = () => {
  flag.value = !flag.value;
  console.log(formRef.value);
};
</script>

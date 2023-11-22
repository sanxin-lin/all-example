<template>
  <Input :value="value" @change="change" />
</template>

<script lang="ts" setup>
import { Input } from 'ant-design-vue';
defineProps<{
  value: any;
}>();
const emits = defineEmits<{
  (e: 'change', ...args: any[]): void;
}>();

const change = (e: any) => {
  emits('change', e.target.value);
};
</script>

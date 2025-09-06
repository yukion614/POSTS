<template>
  <button
    class="join-item btn btn-sm"
    :class="{ 'text-white': isDisabled }"
    :disabled="isDisabled"
  >
    {{ props.pageNum?.id }}<slot></slot>
  </button>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";

interface PageNum {
  id: number;
  curr: number;
}
// 透過 props 接收父組件傳進來的 pageNum
const props = defineProps<{ pageNum?: PageNum }>();
const isDisabled = computed(() => props.pageNum?.id === props.pageNum?.curr);
</script>

<style scoped></style>

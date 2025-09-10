<script setup lang="ts">
import{ref , provide} from "vue"
import Navbar from "./components/Navbar.vue";
import Toast from "./components/Toast.vue";

// toast 事件
const toasts = ref([]);

function addToast(message:any, type = "info") {
  const id = Date.now(); // 簡單 ID
  toasts.value.push({ id, message, type });

  // 3 秒後自動移除
  setTimeout(() => {
    removeToast(id);
  }, 3000);
}

function removeToast(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}
// 提供給全局使用
provide('addToast', addToast)
</script>

<template>
  <Toast :toasts="toasts" :removeToast="removeToast" />
  <Navbar />
  <div class="app-container flex justify-center px-10">
    <!-- router-view  -->
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  background-color: rgb(35, 35, 35);
  min-height: 100vh; 
  justify-content: center;
  display: flex;
  flex-direction: column;
}
</style>

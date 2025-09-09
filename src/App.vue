<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
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

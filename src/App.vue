<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="app-container flex justify-center p-10">
    <!-- router-view  -->
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  background-color: rgb(35, 35, 35);
  height: 100vh;
}
</style>

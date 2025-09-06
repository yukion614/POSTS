<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";

import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="app-container flex justify-center p-10">
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  background-color: black;
  height: 100vh;
}
</style>

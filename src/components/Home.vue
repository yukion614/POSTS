<template>
  <section
    class="section relative h-96"
    style="
      background-image: url('/images/blurred-motion-sports-car-track-generative-ai.jpg');
    "
  ></section>

  <div class="container mx-auto my-20 px-4">
    <!-- content -->
    <h1 class="text-white font-bold text-5xl justify-self-center my-11">
      CALENDAR
    </h1>
    <!-- scroll -->
    <div class="flex flex-nowrap overflow-x-auto space-x-4 p-4 scrollable">
      <!-- card -->
      <Calender v-for="el in 8" :key="el" :post="null" />
      <!-- card end -->
    </div>
  </div>
</template>

<script setup lang="ts">
import Calender from "./Calender.vue";
</script>

<style scoped>
/* GOOGLE FONTS */
.fugaz-one-regular {
  font-family: "Fugaz One", sans-serif;
  font-weight: 400;
  font-style: normal;
}

/* END */
.section {
  /* background-image: url(/images/blurred-motion-sports-car-track-generative-ai.jpg); */
  background-size: cover;
  background-position: center -150px;
  height: 400px;
}

.scrollable {
  scrollbar-color: red rgb(0, 0, 0);
}
</style>

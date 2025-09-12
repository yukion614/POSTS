<template>
  <div class="flex-col m-0">
    <img class="h-96 w-full object-cover" src="/blurred-motion-sports-car-track-generative-ai.jpg" alt="">

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
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Calender from "./Calender.vue";
import { useRoute } from "vue-router"
import { useUserStore } from "../stores/user"
import jwt_decode from "jwt-decode"

const route = useRoute()
const userStore = useUserStore()
onMounted(()=>{
  const token =  route.query?.token

  if(token){
      localStorage.setItem('token',token)
      const decode = jwt_decode(token)
      userStore.setUser(decode)
  }
})

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

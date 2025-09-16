<template>

  <div class="flex-col m-0">
    <Carousel />
     <!--  -->
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
    <!--  -->
  </div>
  <div class="w-full bg-white py-20">
    <div class="w-8/12 mx-auto flex">
      <div class="w-1/5">
        <h1>NEWS</h1>
        <p>活動消息</p>
        <button class="view_btn">View All</button>
      </div>
      <div class="w-4/5 flex gap-10">
        <div class="w-1/5 news_box" >
          VENT
          ■ 9/12 ~ 9/14 - AKB48 Team TP 公演～RESET (2025.9月)～
          ■ 9/21 - 2025 生日塊肉 生日會
          ■ 9/21 - 2025 Hi SunDream 生
        </div>
                <div class="w-1/5 news_box" >
          VENT
          ■ 9/12 ~ 9/14 - AKB48 Team TP 公演～RESET (2025.9月)～
          ■ 9/21 - 2025 生日塊肉 生日會
          ■ 9/21 - 2025 Hi SunDream 生
        </div>
                <div class="w-1/5 news_box" >
          VENT
          ■ 9/12 ~ 9/14 - AKB48 Team TP 公演～RESET (2025.9月)～
          ■ 9/21 - 2025 生日塊肉 生日會
          ■ 9/21 - 2025 Hi SunDream 生
        </div>
                <div class="w-1/5 news_box" >
          VENT
          ■ 9/12 ~ 9/14 - AKB48 Team TP 公演～RESET (2025.9月)～
          ■ 9/21 - 2025 生日塊肉 生日會
          ■ 9/21 - 2025 Hi SunDream 生
        </div>
      </div>
      
    </div>
  </div>

  <div class="w-full">
      <h1 class="text-white font-bold text-5xl justify-self-center my-11">
        想去哪裡呢？
      </h1>

      <div class="">
        <div class="circle_bk">
          <div v-for="el in 10" :key="el" class="circle"></div>
        </div>

        <div class="flex justify-center"  style="background: #FBC51D;">    
          <div class="w-10/12 flex flex-col md:flex-row gap-10 items-center">
            <Stacked />
            <Stacked />
            <Stacked />
          </div>
        </div>

        <div class="w-full h-64" style="background: #FBC51D;"></div>
      </div>
  </div>

  <div class="w-full" style="margin-top: -5%;">
      <div class="">
        <div class="circle_bk">
          <div v-for="el in 10" :key="el" class="circle_white"></div>
        </div>

        <div class="flex justify-center" style="background-color:white;">    
          <div class="w-10/12 flex flex-col md:flex-row gap-10 items-center">
            <Stacked />
            <Stacked />
            <Stacked />
          </div>
        </div>

        <div class="w-full h-64" style="background-color:white;"></div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Calender from "./Calender.vue";
import { useRoute } from "vue-router"
import { useUserStore } from "../stores/user"
import jwt_decode from "jwt-decode"
import Carousel from './Carousel.vue'
import Stacked from "./Stacked.vue"

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

.w-full {
  overflow-x: hidden;
}


.circle_bk{
  width: 105%;
  display: flex;
  margin-left: 10px;

}

.circle{
    width: 375%;
    height: 175px;
    background: #FBC51D;
    border-top-right-radius: 175px;
    border-top-left-radius: 175px;
    margin-left: -5%;
}
.circle_white{
    width: 375%;
    height: 175px;
    background: #ffffff;
    border-top-right-radius: 175px;
    border-top-left-radius: 175px;
    margin-left: -5%;
}

.view_btn{
   background: #FBC51D;
   border-radius: 25px;
   color:white;
   padding: 10px 50px;
}
.news_box{
  border: solid 2px #FBC51D;
  padding: 10px;
}
</style>

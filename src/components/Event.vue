<template>
    <h1 class="w-full h-28 text-center">SCHEDULE</h1>
    <div class="w-10/12 mx-auto flex gap-7">

        <div class="w-2/3">
            <div class="flex items-end">
                <h2>09</h2>
                <h4>Sep</h4>
            </div>
            <hr class="border-0 h-0.5 bg-yellow-400 mx-auto">
            <hr class="border-0 h-1 bg-yellow-200 mx-auto">
            <hr class="border-0 h-0.5 bg-yellow-400 mx-auto">
            <!--  -->
            <Event_item v-for="el in 5" :key="el"/>

            <div class="flex items-end mt-20">
                <h2>08</h2>
                <h4>Sep</h4>
            </div>
            <hr class="border-0 h-0.5 bg-yellow-400 mx-auto">
            <hr class="border-0 h-1 bg-yellow-200 mx-auto">
            <hr class="border-0 h-0.5 bg-yellow-400 mx-auto">
            <!--  -->
            <Event_item v-for="el in 5" :key="el"/>

        </div>


        <!-- calendar  -->
        <div class="w-1/3 flex flex-col gap-10">
            <div data-aos="fade-up" data-aos-duration="1000"  class="bg-slate-200 shadow-lg p-3 flex justify-center"
            style="clip-path: polygon(5% 0, 100% 0, 100% 90%, 90% 100%, 0 100%,0 5%);">
                <img class="w-72" src="https://cdn.hk01.com/di/media/images/2403173/org/57a35d379caba8a8581bec8ffea16917.jpg/yBX5YOEBWu2Lpg3yi3Sg6UshdLhPq4wB2AIJXdgCCV0?v=w1280r16_9" 
                style="clip-path: polygon(5% 0, 100% 0, 100% 90%, 90% 100%, 0 100%,0 5%);"
                alt="">
            </div>

            <div data-aos="fade-left" data-aos-duration="1000"  class="bg-slate-200 shadow-lg p-3 flex justify-center"
            style="clip-path: polygon(5% 0, 100% 0, 100% 90%, 90% 100%, 0 100%,0 5%);">
                <img class="w-72" src="https://www.japaholic.com/storage/article/images/2020/01/1cc70f5e19f62b99eee7207c91f4aca0.jpg" 
                style="clip-path: polygon(5% 0, 100% 0, 100% 90%, 90% 100%, 0 100%,0 5%);"
                alt="">
            </div>

            <div  data-aos="zoom-out" data-aos-duration="1000"  class="bg-slate-200 shadow-lg p-3 flex justify-center"
            style="clip-path: polygon(5% 0, 100% 0, 100% 90%, 90% 100%, 0 100%,0 5%);">
                <img class="w-72" src="https://cms-image-bucket-productionv3-ap-northeast-1-a7d2.s3.ap-northeast-1.amazonaws.com/images/4/6/8/0/43800864-3-eng-GB/Cropped-1672912061photo_SXM2022121900006738.jpg" 
                style="clip-path: polygon(5% 0, 100% 0, 100% 90%, 90% 100%, 0 100%,0 5%);"
                alt="">
            </div>

            <div  data-aos="zoom-out-up" data-aos-duration="1000"  class="bg-slate-200 shadow-lg p-3 flex justify-center"
            style="clip-path: polygon(5% 0, 100% 0, 100% 90%, 90% 100%, 0 100%,0 5%);">
                <img class="w-72" src="https://www.nikkansports.com/entertainment/news/img/201908140001317-w1300_0.jpg" 
                style="clip-path: polygon(5% 0, 100% 0, 100% 90%, 90% 100%, 0 100%,0 5%);"
                alt="">
            </div>

            <div data-aos="fade-down-left" data-aos-duration="1000"  class="bg-slate-200 shadow-lg p-3 flex justify-center"
            style="clip-path: polygon(5% 0, 100% 0, 100% 90%, 90% 100%, 0 100%,0 5%);">
                <img class="w-72" src="https://cdn.hk01.com/di/media/images/2403173/org/57a35d379caba8a8581bec8ffea16917.jpg/yBX5YOEBWu2Lpg3yi3Sg6UshdLhPq4wB2AIJXdgCCV0?v=w1280r16_9" 
                style="clip-path: polygon(5% 0, 100% 0, 100% 90%, 90% 100%, 0 100%,0 5%);"
                alt="">
            </div>


        </div>
    </div>
</template>

<script setup>
    import Event_item from './Event_item.vue';    
    import AOS from 'aos';
    import 'aos/dist/aos.css';
    import { onMounted } from 'vue';
    onMounted(() => {
        AOS.init({
            duration: 800, // 動畫持續時間（ms）
            easing: 'ease-in-out', // 動畫緩動
            once: true, // 是否只執行一次
        });
    });
</script>



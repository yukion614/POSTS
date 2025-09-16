<template>

<div ref="carousel" class="carousel w-full h-screen">

    <!--  -->
    <div class="absolute top-56 z-50 w-full flex justify-between items-center px-5">
        <a id="pre" @click.prevent="pre()" href="#" class="btn btn-circle">❮</a>
        <a id="next" @click.prevent="next()"  href="#" class="btn btn-circle">❯</a>
    </div>

    <div class="carousel-item relative w-full" v-for="el in imgs" :key="el">
        <img class="w-full object-cover h-screen block" :src="el" alt="">
    </div>
</div>

</template>

<script setup>
import {computed, onMounted, ref} from "vue"

const carousel = ref(null)
const carouselWidth = ref(0)
const currentIndex = ref(0)
onMounted(()=>{
    carouselWidth.value = carousel.value.offsetWidth
})



const imgs=[
    'https://www.gumi.tw/image/catalog/News/20200107_/01.jpg',
    'https://www.anitrendz.com/_next/image?url=https%3A%2F%2Fi0.wp.com%2Fanitrendz.net%2Fnews%2Fwp-content%2Fuploads%2F2025%2F08%2FScreenshot-2025-08-01-224827.png%3Ffit%3D1193%252C693%26ssl%3D1&w=1920&q=75',
    'https://www.tokyohive.com/upload/2020/11/content/131309/1605290945-20201113-nogizaka46.jpg',
    'https://www.asiaworld-expo.com/AsiaWorldExpoLocal/media/AWE/assets/images/upcoming-events/2025/1100%c3%97704-%e6%8b%b7%e8%b4%9d.jpg?ext=.jpg'
]

function next(){
    const carousel_items = document.querySelectorAll('.carousel-item')

    currentIndex.value += carouselWidth.value
    if(currentIndex.value >= imgs.length * carouselWidth.value) currentIndex.value = (imgs.length-1) * carouselWidth.value
    imgs.forEach((el,index)=>{
        const item = carousel_items[index]
        item.style.transform =  `translateX(-${currentIndex.value}px)`
        item.style.transition = 'transform 0.5s ease'
    })
}

function pre(){
    const carousel_items = document.querySelectorAll('.carousel-item')
    currentIndex.value -= carouselWidth.value
    if(currentIndex.value < 0) currentIndex.value = 0
    imgs.forEach((el,index)=>{
        const item = carousel_items[index]
        item.style.transform =  `translateX(-${currentIndex.value}px)`
        item.style.transition = 'transform 0.5s ease'
    })
}



</script>
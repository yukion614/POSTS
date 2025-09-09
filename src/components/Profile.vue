<template>
    <div class="flex flex-col text-white ">
        <div class="avatar flex-col w-4/12 m-auto">
            <h3 class="text-white ml-0">大頭貼照</h3>
            <img class="avatarImg m-auto" :src="avatarImg" alt="">
            <router-link :to="{name: 'editavatar'}" class="btn ml-auto">編輯</router-link>
        </div>
        <div class="flex-col w-4/12 m-auto">
            <h3>個人資訊</h3>
            <p>name: <span>{{ userStore.userName }}</span></p>
            <p>email: <span>{{ userStore.userEmail }}</span></p>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref, watch, watchEffect} from "vue"
import {useUserStore} from "../stores/user"
const  userStore =  useUserStore()
const defaultImg = "/da7ed7b0-5f66-4f97-a610-51100d3b9fd2-01.png"

const avatarImg =  ref<any>(userStore.userAvatar || defaultImg) 

watch(
    ()=> userStore.userAvatar,
    (newVal)=>{
    avatarImg.value = userStore.userAvatar
})

</script>
<style>
.avatarImg{
    width: 300px !important;
    height: 300px !important;
  
    border-radius: 50%;
    border: 2px solid #ccc;
}   
</style>

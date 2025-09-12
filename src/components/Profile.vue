<template>
    <div class="flex flex-col text-white ">
        <div class="avatar flex-col w-4/12 m-auto">
            <h3 class="text-white ml-0">大頭貼照</h3>
            <img class="avatarImg m-auto" :src="avatarImg" alt="">
            <!-- <router-link :to="{name: 'editavatar'}" @click="checkProvider()" class="btn ml-auto">編輯</router-link> -->
             <button @click="checkProvider()" class="btn ml-auto">編輯</button> 
        </div>
        <div class="flex-col w-4/12 m-auto">
            <h3>個人資訊</h3>
            <p>name: <span>{{ userStore.userName }}</span></p>
            <p>email: <span>{{ userStore.userEmail }}</span></p>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref, watch, watchEffect ,inject} from "vue"
import {useUserStore} from "../stores/user"
import { useRouter } from "vue-router"
const  userStore =  useUserStore()
const defaultImg = "/da7ed7b0-5f66-4f97-a610-51100d3b9fd2-01.png"

const avatarImg =  ref<any>(userStore.userAvatar || defaultImg) 
const addToast = inject('addToast')
const router =  useRouter()

watch(
    ()=> userStore.userAvatar,
    (newVal)=>{
    avatarImg.value = userStore.userAvatar
})

function checkProvider(){    
  if(userStore.user.provider !== "local"){
    addToast("外部登入者不能上傳圖像")
    // console.log("外部登入者不能上傳圖像")
    return
  }else{
    router.push({name: 'editavatar'})
  }
}

</script>
<style>
.avatarImg{
    width: 300px !important;
    height: 300px !important;
  
    border-radius: 50%;
    border: 2px solid #ccc;
}   
</style>

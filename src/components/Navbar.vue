<template>
  <div class="navbar bg-red-700 shadow-sm w-full">
    <div class="flex-1">
      <router-link to="/" class="btn btn-ghost text-xl text-white"
        >daisyUI</router-link
      >
    </div>
    <div class="flex gap-2">
      <!-- button -->
      <a class="btn btn-ghost text-white">賽程</a>
      <a class="btn btn-ghost text-white">車手</a>
      <router-link to="/posts" class="btn btn-ghost text-white"
        >留言板</router-link
      >
      <a class="btn btn-ghost text-white">NEWS</a>
      <button class="btn btn-outline text-white">積分榜</button>

      <!-- Search -->
      <input
        type="text"
        placeholder="Search"
        class="input input-bordered w-24 md:w-auto"
      />
      <!-- avatar -->
      <router-link :to="isLogin ? route.fullPath : { name: 'login' }">
        <div class="dropdown dropdown-end" >
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img class="opacity-60"
                alt="Tailwind CSS Navbar component"
                :src="AvatarImg"
              />
            </div>
          </div>
          <!-- dropdown -->
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            v-show="userStore.user"
          >
            <li>
              <router-link :to="{name: 'profile'}" class="justify-between">
                Profile
                <span class="badge">New</span>
              </router-link>
            </li>
            <li><a>Settings</a></li>+
            <li><a @click.prevent="Logout()">Logout</a></li>
          </ul>
          <!-- dropdown end-->
        </div>
      </router-link>
      <!-- avatar end-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter,useRoute } from 'vue-router';
import {computed,watchEffect, ref,type Ref, watch, onBeforeMount ,onMounted} from "vue"
import { useUserStore } from "../stores/user"
import jwt_decode from "jwt-decode";

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const defaultAvatar = "/da7ed7b0-5f66-4f97-a610-51100d3b9fd2-01.png"
const AvatarImg = ref<string>(defaultAvatar)
const token =ref<any>(localStorage.getItem('token')) 
const isLogin = ref<boolean>()


  // const avatarLink = computed(() => {
  //   return isLogin.value ? route.fullPath : { name: 'login' }
  // })


// 初始化一次
onMounted(() => updateUserFromToken(token.value));



watch(
  ()=>userStore.user,(newUser)=>{
    AvatarImg.value = userStore.userAvatar || defaultAvatar
    isLogin.value = !!newUser 
  },
  { immediate: true }
)

// 更新 user 與 avatar
function updateUserFromToken(jwt: string | null) {
  if (jwt) {
    try {
      const decoded: any = jwt_decode(jwt);

      userStore.setUser(decoded);
      isLogin.value = true;
      
    } catch (err) {
      console.error("JWT 解析錯誤:", err);
      localStorage.removeItem("token");
      userStore.clearUser();
      AvatarImg.value = defaultAvatar;
      isLogin.value = false;
    }
  } else {
    userStore.clearUser();
    isLogin.value = false;
  }
}

function Logout(){
  localStorage.removeItem('token')
  token.value = null 
  userStore.clearUser()
  router.push('/') 
}
</script>

<style scoped></style>

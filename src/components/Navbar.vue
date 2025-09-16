<template>
  <div class="navbar shadow-sm w-full">
    <div class="flex-1 flex">
      <router-link to="/" class="btn btn-ghost text-xl text-white"
        ><img class="w-20" src="/images/logo-01.png" alt=""></router-link
      >
     
        <div @click="show_lang" class="ml-28 mt-1 z-50 absolute chg_lang_list w-40 bg-white p-1 px-2 text-xs" style="border-radius:15px; border: solid 1px #FBC51D;">
          <div class="flex justify-between items-center">
            <FontAwesomeIcon class="text-gray-400" :icon="faGlobe" />
             繁體中文 
             <FontAwesomeIcon class="mb-2" :class="{'rotate-45':chg_lang}"  :icon="faSortDown" />
          </div>     
              <div v-for="(el,index) in [{label:'簡體中文',value:'zh-CN'},{label:'english',value:'en-US'},{label:'日文',value:'ja-JP'}]" :key="el.value">
                <transition
                  enter-active-class="transition duration-1000 ease-in-out"
                  enter-from-class="opacity-0 translate-y-[-5px]"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition duration-700 ease-in-out"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-[-5px]"
                >
                  <p v-if="chg_lang" :style="{ transitionDelay: `${index * 100}ms` }" class="text-center" @click="switchLang(el.value)">{{ el.label }}</p>
                </transition>
              </div>

        </div>
    


      
    </div>
    <div class="flex gap-2">
      <!-- button -->
      <router-link :to="{name:'event'}" class="btn btn-ghost text-white">{{ $t('event') }}</router-link>
      <router-link :to="{name:'ranking'}" class="btn btn-ghost text-white">{{ $t('charts') }}</router-link>
      <router-link to="/posts" class="btn btn-ghost text-white"
        >{{ $t('forum') }}</router-link
      >
      <router-link :to="{ name:'news' }" class="btn btn-ghost text-white">{{ $t('news') }}</router-link>
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
import { faSortDown,faGlobe } from '@fortawesome/free-solid-svg-icons'
import { useRouter,useRoute } from 'vue-router';
import {computed,watchEffect, ref,type Ref, watch, onBeforeMount ,onMounted} from "vue"
import { useUserStore } from "../stores/user"
import jwt_decode from "jwt-decode";
import { i18n } from "../plugins/i18n"


const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const defaultAvatar = "/da7ed7b0-5f66-4f97-a610-51100d3b9fd2-01.png"
const AvatarImg = ref<string>(defaultAvatar)
const token =ref<any>(localStorage.getItem('token')) 
const isLogin = ref<boolean>()

// 初始化一次
onMounted(() => updateUserFromToken(token.value));


//監聽使用者圖像登入狀態有沒改變
watch(
  ()=>userStore.user,(newUser)=>{
    console.log(userStore.user?.avatar)
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
      console.log(decoded)
      //檢查是否過期
      const now = Math.floor(Date.now()/1000) 
      if(decoded.exp < now){
        //過期
        localStorage.removeItem('token')
        return
      }else{
        //沒過期
        userStore.setUser(decoded);
        isLogin.value = true;
      }
   
      
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

// chg_lang
const chg_lang = ref<boolean>(false)
function show_lang(){
  chg_lang.value = !chg_lang.value

}

function switchLang(lang:string) {
  console.log('down',lang)
  i18n.global.locale.value = lang

}

</script>

<style scoped>
.item {
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: 0.3s; /* 延遲 0.3 秒再開始 */
}
.item.show {
  opacity: 1;
  transform: translateY(0);
}
.navbar{
  background: linear-gradient(90deg,rgba(255, 145, 0, 1) 0%, rgba(255, 208, 0, 1) 50%, rgba(255, 217, 0, 1) 100%);
}
</style>

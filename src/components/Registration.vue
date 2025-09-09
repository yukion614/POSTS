<template>
    <!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-900">
  <body class="h-full">
  ```
-->
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" class="mx-auto h-10 w-auto" />
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create an account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action="#" method="POST" class="space-y-6">
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-100">Email address</label>
        <div class="mt-2">
          <input v-model="email" id="email" type="email" name="email" required autocomplete="email" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>
      <!-- password -->
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-100">輸入密碼</label>
        </div>
        <div class="mt-2">
          <input v-model="password" id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>
       <!-- password -->
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-100">再次輸入密碼</label>
        </div>
        <div class="mt-2">
          <input v-model="confirmPassword" id="confirmPassword" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          <span class="text-red-700">{{confirmPassword_message}}</span>
        </div>
      </div>
       <!-- name -->
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-100">name</label>
        </div>
        <div class="mt-2">
          <input v-model="name" id="password" type="text" name="name"  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <button @click.prevent="submitForm()" type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">註冊</button>
      </div>
    </form>
  </div>
</div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import { useEnvStore } from "../stores/post"
import { useRouter } from "vue-router"
const envStore = useEnvStore()
const router = useRouter()

const api = `${envStore.env}/api/users/register`
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const confirmPassword_message = ref<string>()
const name = ref<string>('')


async function submitForm(){
    if (password.value !== confirmPassword.value) {
        confirmPassword_message.value = "兩次輸入的密碼不一致！"
        return; // 停止送出
    }
    const form ={
        email:email.value,
        password:password.value,
        name:name.value
    }
    try{
        const res = await fetch(api,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        console.log(data)
        if(data.success){
          router.push({name: "login"})
        }

    }catch(err){
        console.log(err)
    }

  
}
</script>
<style scoped>
</style>
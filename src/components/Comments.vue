<template>
  <div class="chat chat-start">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          :src="avatarImg"
        />
      </div>
    </div>
    <div class="chat-header">
      {{ name }}
      <time class="text-xs opacity-50">{{
        comment.updatedAt.split("T")[0]
      }}</time>
    </div>
    <div class="chat-bubble">{{ comment.content }}</div>
  </div>
</template>


<script setup lang="ts">
import { computed, defineProps ,ref } from "vue";
// import Login from "./Login.vue";
import { useEnvStore } from "../stores/post"

const props = defineProps<{
  comment: {
    id: number;
    content: string;
    updatedAt: string;
    authorId: number;
    author?: {name: string,avatar:string}
  };
}>();


// 

const envStore = useEnvStore()
const avatarImg = computed(()=>{
  return props.comment.author?.avatar ? `${envStore.env}${props.comment.author.avatar}` : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
})

const name = computed(()=>{
  return props.comment.author?.avatar ? props.comment.author.name : '未命名'
})
</script>

<style scoped></style>


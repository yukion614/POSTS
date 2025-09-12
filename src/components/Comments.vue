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
    
    <div class="flex justify-between w-full">
      <div>
        <div class="chat-header">
          {{ name }}
          <time class="text-xs opacity-50">{{
            comment.updatedAt.split("T")[0]
          }}</time>
        </div>
        <div class="chat-bubble">{{ comment.content }}</div>
      </div>
      <FontAwesomeIcon v-show="trashShow" @click="delete_comment()" :icon="faTrash" class="self-end m-3 text-gray-400"/>
    </div>


    

  </div>
</template>


<script setup lang="ts">
import { computed, defineProps ,ref,inject } from "vue";
// import Login from "./Login.vue";
import { useEnvStore } from "../stores/post"
import { useUserStore } from "../stores/user"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { usePostStore } from "../stores/post"

const postStore = usePostStore()


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
const userStore = useUserStore()
const addToast = inject('addToast')

const avatarImg = computed(()=>{
  if(props.comment.author){
    return props.comment.author.avatar.startsWith('https://') ? props.comment.author.avatar : `${import.meta.env.VITE_API_HOST}${props.comment.author.avatar}`
  }else{
      return '/da7ed7b0-5f66-4f97-a610-51100d3b9fd2-01.png'
  }
  // return props.comment.author?.avatar ? `${envStore.env}${props.comment.author.avatar}` : '/da7ed7b0-5f66-4f97-a610-51100d3b9fd2-01.png'
})

const name = computed(()=>{
  return props.comment.author?.avatar ? props.comment.author.name : '無名氏'
})

const trashShow = computed(()=>{
  return props.comment.authorId === userStore.user?.member_id 
})


async function delete_comment(){
  const api = `${import.meta.env.VITE_API_HOST}/api/comments/delete/${props.comment.id}`
  const result = await fetch(api,{
    method:"DELETE"
  })
  const data = await result.json()
  if(data.success){
    addToast(data.message,'success')
    await postStore.fetchPostById(postStore.post.id);
  }else{
    addToast(data.message)
  }
}
</script>



<style scoped></style>


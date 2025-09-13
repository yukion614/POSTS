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

        <div 
          class="chat-bubble" 
          :contenteditable="edit" 
          :style="{ color: edit ? 'gray' : 'black', width: edit ? '400px' : 'auto' }" 
          @input="commentContent = $event.target.innerText"
          @keydown.enter.prevent="submitEdit()"
          >{{ comment.content }}</div>
         
      </div>

        <div v-show="editShow" class="flex gap-2 mt-6 ml-auto">
          <button class="text-gray-400 ml-auto" @click.prevent="edit_comment()">編輯</button>
          <FontAwesomeIcon  @click="delete_comment()" :icon="faTrash" class="mt-2 text-gray-400"/>
        </div>
     
    </div>


    

  </div>
</template>


<script setup lang="ts">
import { computed, defineProps ,ref,inject } from "vue";
// import Login from "./Login.vue";
import { useEnvStore } from "../stores/post"
import { useUserStore } from "../stores/user"
import { faL, faSleigh, faTrash } from '@fortawesome/free-solid-svg-icons'
import { usePostStore } from "../stores/post"

const postStore = usePostStore()
const edit = ref<boolean>(false)
const commentContent = ref<string>("")
const envStore = useEnvStore()
const userStore = useUserStore()
const addToast = inject('addToast')
const props = defineProps<{
  comment: {
    id: number;
    content: string;
    updatedAt: string;
    authorId: number;
    author?: {name: string,avatar:string}
  },
  postId: number 
}>();

async function submitEdit(){
  const api =  `${import.meta.env.VITE_API_HOST}/api/comments/posts/${props.postId}/comments/${props.comment.id}`
  const result =  await fetch(api,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      content:commentContent.value
    }) 
  });
  const data = await result.json()
  console.log(result)
  if(data.success){
    edit.value = false
    // await postStore.fetchPostById(props.postId);
    addToast(data.message,'success')
  }
}






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

const editShow = computed(()=>{
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

function edit_comment(){
    edit.value = true
}
</script>



<style scoped>

</style>


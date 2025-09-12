<template>
  <td>
    {{ post.title }}
    <br />
    <span class="badge badge-ghost badge-sm">{{
      post.content?.slice(0, 20)
    }}</span>
  </td>
  <td>
    {{ post.likeCount }}
  </td>
  <td>
    {{ post?.comments?.length || 0 }}
  </td>
  <td>
    <div class="flex items-center gap-3">
      <div class="avatar">
        <div class="mask mask-squircle h-12 w-12">
          <img
            :src="avatarImg"
            alt="Avatar Tailwind CSS Component"
          />
        </div>
      </div>
      <!-- <div> -->
        <!-- <div class="font-bold">{{ post.author.name }}</div> -->
        <!-- <div class="text-sm opacity-50">United States</div> -->
      <!-- </div> -->
    </div>
  </td>
  <td>
    <!-- {{ post.authorId }} -->
     <div class="font-bold">{{ post.author.name }}</div>
    <!-- <br /> -->
    <span>{{ post.createdAt.split('T')[0] }}
    &nbsp; <!-- 空格 -->
    {{ post.createdAt.split('T')[1].substring(0,5) }}</span>
  </td>
</template>

<script setup lang="ts">
import { computed } from 'vue';

//定義props
const props = defineProps<{
  post: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    likeCount: number;
    author: {
      id: string
      name: string
      avatar: string
    }
  };
}>();

// const avatarImg = `${import.meta.env.VITE_API_HOST}${props.post.author.avatar}`

const avatarImg = computed(()=>{
  if(props.post.author.avatar !== null){
    //判斷是不是google 來的頭像
    if(props.post.author.avatar.startsWith('https://')){
      return props.post.author.avatar
    }else{
      return `${import.meta.env.VITE_API_HOST}${props.post.author.avatar}` 
    }
    // return `${import.meta.env.VITE_API_HOST}${props.post.author.avatar}`
  }else{
    return '/da7ed7b0-5f66-4f97-a610-51100d3b9fd2-02.png'
  }
})

</script>

<style scoped></style>

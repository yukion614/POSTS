<template>
  <!-- http://localhost:5173/post/13 -->
  <div class="flex-col w-full">
    <div class="card bg-base-100 shadow-xl p-6 mb-4">
      <div class="card-body">
        <div class="flex gap-5">
          <!-- avatar -->
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                :src=" avatarImg "
              />
            </div>
          </div>
          <div class="flex justify-between w-full">
            <!-- 左邊：標題 -->
            <h2 class="card-title text-2xl">{{title}}</h2>
            <!-- 右邊：時間 -->
            <div class="mt-4 text-sm text-gray-500">
              發佈時間: {{ postStore.post?.createdAt.split("T")[0] }}<br>
              更新時間: {{ postStore.post?.updatedAt.split("T")[0] }}
            </div>
            
          </div>
        </div>

        <hr />
        <!-- <p class="text-lg mt-2">{{ postStore.post?.content }}</p> -->
        <div class="comment-content" v-html="content"></div>
        <!-- revise -->
         <button @click="toRevisePost(title , content,postId)" class="btn w-20 ml-auto" v-if="isPoster">編輯內容</button>
        <!-- like btn -->
        <button class="btn flex items-center gap-2 w-20 ml-auto" @click.prevent="sendLike()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :fill="likeColor"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          Like
        </button>

        <hr />
        <!-- chat -->

        <Comments
          v-for="el in postStore.post?.comments"
          :key="el.id"
          :comment="el"
        />
        <!-- chat end -->
      </div>
      <hr />
      <!-- 留言區 -->
      <div class="mt-4 block m-auto w-8/12">
        <textarea
          v-model="comment"
          class="textarea textarea-bordered w-full"
          placeholder="寫下你的留言..."
        ></textarea>
        <button
          class="btn btn-primary mt-2 block ml-auto"
          @click="submit()"
        >
          送出
        </button>
      </div>
    </div>
    <!-- back to postPage -->
    <button class="btn block m-auto" @click="toPosts()">回到討論區</button>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { usePostStore } from "../stores/post";
import { useUserStore } from "../stores/user";
import { useRoute,useRouter  } from "vue-router";
import Comments from './Comments.vue'



const route = useRoute();
const postStore = usePostStore();
const userStore = useUserStore()
const comment = ref<string>("");
const authorId =ref<number>(4);
const content = computed(()=>postStore.post?.content) 
const title = computed(()=>postStore.post?.title) 
const postId = computed(()=>postStore.post?.id) 

const likeColor = ref<string>('none')



// const likeColor = computed(()=>{
//    return postStore.post?.likeCount > 0 ? "red" : 'none'
// })

const isPoster = computed(()=>{
  if(postStore.post.authorId === userStore.userId){
    return true
  }else{
    return false
  }
})



// const avatarImg =`${import.meta.env.VITE_API_HOST}${postStore.post?.author.avatar}` 

const avatarImg = computed(()=>{
  if(postStore.post?.author.avatar !== null){
    return `${import.meta.env.VITE_API_HOST}${postStore.post?.author.avatar}` 
  }else{
    return '/da7ed7b0-5f66-4f97-a610-51100d3b9fd2-02.png'
  }
})

onBeforeMount(() => {
  postStore.fetchPostById(Number(route.params.id));
});

const router = useRouter();
//返回討論區
function toPosts() {
  router.push({ name: "posts" });
}
//發留言
async function submit(){
  const authorId = userStore.userId
  await postStore.submitComment(
    Number(postStore.post?.id),
    comment.value ,
    Number(authorId) )
  //清空comment
  comment.value = ''
}


function toRevisePost(title:string,content:string,postId:number){

  router.push({
    name: 'revise_post' ,
    query:{title, content ,postId}
  })
}

async function sendLike(){
  const postId = postStore.post?.id
  const authorId = userStore.userId
  const api = `http://127.0.0.1:3000/api/posts/${postId}/${authorId}`
  console.log(api,"<====")
  const result = await fetch(api,{
    method:"POST",
  })
  const data = await result.json()
  if(data.success){
    likeColor.value = 'red'
  }
  console.log(data)
}

</script>
<script scope></script>

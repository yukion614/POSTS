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
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div class="flex justify-between w-full">
            <!-- 左邊：標題 -->
            <h2 class="card-title text-2xl">{{ postStore.post?.title }}</h2>
            <!-- 右邊：時間 -->
            <div class="mt-4 text-sm text-gray-500">
              發佈時間: {{ postStore.post?.createdAt.split("T")[0] }}
            </div>
          </div>
        </div>

        <hr />
        <p class="text-lg mt-2">{{ postStore.post?.content }}</p>
        <!-- like btn -->
        <button class="btn flex items-center gap-2 w-20 ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
      {{ comment }}
      <div class="mt-4 block m-auto w-8/12">
        <textarea
          v-model="comment"
          class="textarea textarea-bordered w-full"
          placeholder="寫下你的留言..."
        ></textarea>
        <button
          class="btn btn-primary mt-2 block ml-auto"
          @click="submitComment(Number(postStore.post?.id))"
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
import { onBeforeMount, ref } from "vue";
import { usePostStore } from "../stores/post";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import Comments from "../components/Comments.vue";
import func from "../../vue-temp/vue-editor-bridge";

const route = useRoute();
const postStore = usePostStore();
const comment = ref<string>("");

onBeforeMount(() => {
  postStore.fetchPostById(Number(route.params.id));
});
const router = useRouter();
function toPosts() {
  router.push({ name: "posts" });
}

// http://127.0.0.1:3000/api/comments/posts/23/comments
async function submitComment(id: number) {
  const api = `http://127.0.0.1:3000/api/comments/posts/${id}/comments`;
  try {
    const res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: comment.value,
        authorId: 4,
      }),
    });
    const data = await res.json();
    comment.value = ""; // 清空輸入框
    // return data;
    await postStore.fetchPostById(Number(route.params.id));
  } catch (err) {
    console.log("留言失敗", err);
  }
}
</script>
<script scope></script>

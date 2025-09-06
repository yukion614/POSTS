<template>
  <div class="flex flex-col gap-2 w-full">
    <!-- 數字bar -->
    <div class="join flex w-full border-gray-200">
      <Pagination :disabled="paginationData.isFirstPage" @click="toPage(1)">
        <FontAwesomeIcon class="text-gray-400" :icon="['fas', 'angles-left']"
      /></Pagination>
      <Pagination
        :disabled="paginationData.isFirstPage"
        @click="toPage(page - 1)"
      >
        <FontAwesomeIcon class="text-gray-400" :icon="['fas', 'angle-left']" />
      </Pagination>

      <Pagination
        v-for="index in paginationData.pageCount"
        :key="index"
        :pageNum="{ id: index, curr: paginationData.currentPage }"
        @click="toPage(index)"
      />

      <Pagination
        :disabled="paginationData.isLastPage"
        @click="toPage(page + 1)"
      >
        <FontAwesomeIcon class="text-gray-400" :icon="['fas', 'angle-right']" />
      </Pagination>
      <Pagination
        :disabled="paginationData.isLastPage"
        @click="toPage(paginationData.pageCount)"
      >
        <FontAwesomeIcon
          class="text-gray-400"
          :icon="['fas', 'angles-right']"
        />
      </Pagination>
    </div>
    <!-- 數字bar end -->
    <div class="overflow-x-auto w-full">
      <table class="table bg-gray-500">
        <!-- head -->
        <thead>
          <tr>
            <th class="px-4 py-2 text-left w-2/3">主題</th>
            <th class="px-4 py-2 text-left">avatar</th>
            <th class="px-4 py-2 text-left w-1/3">作者</th>
          </tr>
        </thead>
        <!-- tbody -->
        <tbody>
          <tr
            v-for="(post, index) in postsData"
            :key="post.id"
            :class="{ 'bg-gray-200': index % 2 === 0 }"
            @click="toPost(post.id)"
          >
            <PostItem :post="post" />
          </tr>
        </tbody>
        <!-- foot -->
        <tfoot></tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, reactive, computed } from "vue";
import PostItem from "./PostItem.vue";
import Pagination from "./pagination.vue";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
}

// ---------------------------
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
}

interface PaginationResponse {
  contacts: Post[];
  meta: any;
}
async function fetchPosts(api: string) {
  const res = await fetch(api);
  const data: PaginationResponse = await res.json();
  return data;
}
const page = ref<number>(1);
const limit = ref<number>(4);

const api = `http://127.0.0.1:3000/api/posts/pagination?page=${page.value}&limit=${limit.value}`;

const postsData = ref<Post[]>([]);
const paginationData = ref<any>({});

onBeforeMount(async () => {
  const data = await fetchPosts(api);
  postsData.value = data.contacts;
  paginationData.value = data.meta;
});

async function toPage(pageNumber: number) {
  const api = `http://127.0.0.1:3000/api/posts/pagination?page=${pageNumber}&limit=${limit.value}`;
  const data = await fetchPosts(api);
  postsData.value = data.contacts;
  paginationData.value = data.meta;
  page.value = pageNumber;
}

//router
import { useRouter } from "vue-router";
const router = useRouter();
async function toPost(postId: number) {
  router.push({ name: "post", params: { id: postId } });
}

// Object
// currentPage: 1
// isFirstPage: true
// isLastPage: false
// nextPage: 2
// pageCount: 2
// previousPage: null
// totalCount: 10
// [[Prototype]]: Object
</script>

<style scoped>
button:disabled {
  opacity: 1 !important; /* 改透明度 */
  background-color: #7a2409 !important; /* 想要的灰色 (Tailwind: bg-gray-600) */
  color: white !important;
}
</style>

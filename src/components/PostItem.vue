<template>
  <td>
    {{ post.title }}
    <br />
    <span class="badge badge-ghost badge-sm">{{
      post.content?.slice(0, 20)
    }}</span>
  </td>
  <td>
    <div class="flex items-center gap-3">
      <div class="avatar">
        <div class="mask mask-squircle h-12 w-12">
          <img
            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
            alt="Avatar Tailwind CSS Component"
          />
        </div>
      </div>
      <div>
        <div class="font-bold">Hart Hagerty</div>
        <div class="text-sm opacity-50">United States</div>
      </div>
    </div>
  </td>
  <td>
    {{ post.authorId }}
    <br />
    <span>{{ post.createdAt }}</span>
  </td>
</template>

<script setup lang="ts">
//定義props
defineProps<{
  post: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: number;
  };
}>();
</script>

<style scoped></style>

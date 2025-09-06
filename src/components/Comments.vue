<template>
  <div class="chat chat-start">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
        />
      </div>
    </div>
    <div class="chat-header">
      {{ comment.id }}
      <time class="text-xs opacity-50">{{
        comment.updatedAt.split("T")[0]
      }}</time>
    </div>
    <div class="chat-bubble">{{ comment.content }}</div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{
  comment: {
    id: number;
    content: string;
    updatedAt: string;
    authorId: number;
  };
}>();
</script>

<style scope="this api replaced by slot-scope in 2.5.0+"></style>

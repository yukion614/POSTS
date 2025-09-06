import { defineStore } from "pinia";

interface Comments {
  id: number;
  content: string;
  updatedAt: string;
  authorId: number;
}
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  comments: Comments[];
}

export const usePostStore = defineStore("post", {
  state: () => ({
    post: null as Post | null,
  }),
  actions: {
    async fetchPostById(id: number) {
      const res = await fetch(`http://127.0.0.1:3000/api/posts/${id}`);
      this.post = await res.json();
    },
  },
});

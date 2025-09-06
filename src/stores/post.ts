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
    //---------------------------------
    async fetchPostById(id: number) {
      const res = await fetch(`http://127.0.0.1:3000/api/posts/${id}`);
      this.post = await res.json();
    },
    //---------------------------------
    async submitComment(postId: number, content: string, authorId: number) {
      const api = `http://127.0.0.1:3000/api/comments/posts/${postId}/comments`;
      try {
        const res = await fetch(api, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ content,authorId }),
        });
      //刷新留言區畫面       
      await this.fetchPostById(postId);
    } catch (err) {
      console.log("留言失敗", err);
      throw err;
    }
}
  },
});

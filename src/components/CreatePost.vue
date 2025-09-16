
<template>
  <main id="sample">
    <!-- title -->
    <input 
      type="text" 
      placeholder="請輸入文章標題" 
      style="width:100%; padding:8px; font-size:18px; margin-bottom:10px;"
      v-model="title"
    />
    <!-- content -->
    <!-- <Editor
      :api-key="api_key"
      v-model="content"
      :init="editorInit"
    /> -->
    <Editor
      :api-key="no-api-key"
      v-model="content"
      :init="editorInit"
    />



    <button class="text-white" @click="addComment()">發表文章</button>
  </main>
</template>


<script setup lang="ts">
import { ref,inject } from "vue"
import Editor from '@tinymce/tinymce-vue';
import { comment } from "postcss";
import { useUserStore } from "../stores/user"
import { useRouter } from "vue-router"
const router = useRouter()
const addToast =  inject('addToast')
const userStore = useUserStore()
const api_key = import.meta.env.VITE_TINTMCE_KEY
const title = ref('')
const content = ref('Welcome to TinyMCE!');

const editorInit ={ 
   toolbar_mode: 'sliding',
        menubar: false,
        statusbar: false,
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'uploadcare',
        ],
        toolbar: 'undo redo |forecolor backcolor| blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments |   typography uploadcare | align lineheight | indent outdent', 
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
        uploadcare_public_key: '6efb31ae97db33fdaa9f',//上傳到雲端
}





/**
 * 發表留言******************************************************************
 */
async function addComment() {
  // const html = content_editor.value.innerHTML.trim();
  // const title = title.trim();
  // const content = content
  const token = localStorage.getItem('token')
  const tokenPlus = `Bearer ${token}`
  if (!title.value.trim()) return alert("標題不能空白");
  if (!content.value.trim()) return alert("留言不能空白");
  // 發送給後端
  try{
    const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/posts/create`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: tokenPlus
          },
        body: JSON.stringify({ title: title.value, content: content.value ,authorId :userStore.userId }), // ← HTML 格式
      });
      const data = await response.json(); // 假設後端回傳 JSON
      addToast(data.message,'success')
      title.value = "";
      content.value = "";
      
      setTimeout(()=>{
         router.back()
      },1000)
     
  }catch(err){
    console.log(err)
    addToast('發文失敗')
  }
}


</script>
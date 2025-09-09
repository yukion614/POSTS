<template>
  <div class="comment-board bg-gray-300 p-10">
    <!-- 新增留言區 -->
    <div class="new-comment">
      <!-- 文字編輯按鈕區 -->
      <div class="toolbar">
        <!-- 粗體按鈕，按下後會套用文字粗體 -->
        <button @click.prevent="exec('bold')">粗體</button>


        <!-- COLOR -->
        <label for="">文字顏色</label>
        <input
          type="color"
          id="colorPicker"
          value="#ff0000"
          @input="onColorChange"
        />


        <!-- 字體選擇下拉選單 -->
        <!-- <select @change="changeFont($event)">
          <option value="">字體</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
        </select> -->
      </div>
      <!-- title -->
      <p class="text-white">標題:</p>
      <textarea class="edit_title" ref="edit_title"></textarea>
      <!-- 可編輯文字區 -->
      <p class="text-white">內容:</p>
      <div
        class="editable"
        contenteditable="true"
        ref="content_editor"
      
      ></div>


      <!-- 圖片上傳 input -->
      <input type="file" @change="onFileChange" accept="image/*" />


      <!-- 發表留言按鈕 -->
      <button @click="addComment">發表留言</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../stores/user"
const userStore = useUserStore()

// 取得可編輯 div 的 DOM
const edit_title = ref(null);
const content_editor = ref(null);


//******************************************************************************* */
/**
 * 處理圖片上傳
 * 再插入到光標位置
 */
async function onFileChange(event) {
  const img = event.target.files[0]; //img
  if (!img) return;
  const formData = new FormData();
  formData.append("img", img);
  const api = `${import.meta.env.VITE_API_HOST}/api/posts/_img`;
  const res = await fetch(api, {
    method: "POST",
    body: formData, // 注意：不要設定 Content-Type，瀏覽器會自動加上 multipart/form-data
  });
  const data = await res.json();
  console.log(data);
  if (data.filename) {
    const imgHtml = `<img src="${import.meta.env.VITE_API_HOST}/uploads/post-img/${data.filename}" style="max-width:200px; max-height:200px;" />`;
    insertHtmlAtCursor(imgHtml); //插入光標出線位置
    
  }
}


// 改變字體顏色
function onColorChange(e) {
  const color = e.target.value;
  document.execCommand("foreColor", false, color);
}
//bold
function exec(e) {
  document.execCommand("bold", false, null);
}


//******************************************************************************* */
/**
 * 在光標位置插入 HTML（文字或圖片）
 */
function insertHtmlAtCursor(html) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) {
    // 如果沒有光標，直接加到內容末尾
    content_editor.value.innerHTML += html;
    return;
  }


  const range = sel.getRangeAt(0);
  range.deleteContents(); // 刪除選取範圍的文字（如果有）


  // 建立臨時 div，把 HTML 轉成節點
  const el = document.createElement("div");
  el.innerHTML = html;
  const frag = document.createDocumentFragment();
  let node, lastNode;
  while ((node = el.firstChild)) {
    lastNode = frag.appendChild(node);
  }


  // 將節點插入光標位置
  range.insertNode(frag);


  // // 移動光標到插入內容後
  if (lastNode) {
    range.setStartAfter(lastNode);
    range.setEndAfter(lastNode);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}


/**
 * 發表留言******************************************************************
 */
async function addComment() {
  const html = content_editor.value.innerHTML.trim();
  const title = edit_title.value.value.trim();
  const token = localStorage.getItem('token')
  const tokenPlus = `Bearer ${token}`
  if (!html) return alert("留言不能空白");
  // 發送給後端
    
  const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/posts/create`, {
    //  { title, content ,authorId }

        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: tokenPlus

         },
        body: JSON.stringify({ title: title, content: html ,authorId :userStore.userId }), // ← HTML 格式
        
    });
    edit_title.value.innerHTML = "";
    content_editor.value.innerHTML = "";

    const data = await response.json(); // 假設後端回傳 JSON
    console.log("回傳資料:", data);
  
}
</script>


<style scoped>
.comment-board {
  max-width: 500px;
  margin: 0 auto;
}
.toolbar {
  margin-bottom: 8px;
}
.toolbar button,
.toolbar select {
  margin-right: 5px;
}
.new-comment {
  position: relative;
  margin-bottom: 20px;
}
.editable {
  border: 1px solid #ccc;
  min-height: 80px;
  padding: 8px;
}
.placeholder {
  position: absolute;
  left: 8px;
  top: 8px;
  color: #aaa;
  pointer-events: none; /* 讓 placeholder 不會擋住點擊編輯 */
}
.comment {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
</style>




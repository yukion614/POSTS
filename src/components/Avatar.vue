<template>
  <div class="text-white flex gap-10">
    <div class="w-6/12">
     <cropper
        ref="cropperRef"
        :src="image"
        :stencil-component="CircleStencil"
        :stencil-props="{
          aspectRatio: 1,
          movable: true,
          resizable: true,
          minWidth: 100,
          minHeight: 100,
          maxWidth: 400,
          maxHeight: 400,
        }"
      />
      <input type="file" @change="onFileChange" />
      <div v-if="isLoading">讀取中....</div>
      <button v-if="image" @click="confirmCrop">確認裁切</button>
    </div>
    <div class="w-6/12 flex justify-center">
      <div class="preview">
        <h3>裁切後圖片：</h3>
        <img  v-if="croppedImage" :src="croppedImage" alt="Cropped" />
        <button v-if="croppedImage" class="ml-auto" @click="cancel">取消</button>
        <button v-if="croppedImage" class="ml-auto" @click="submit">確認</button>
      </div>

    </div>
   

   


    <!-- <div
      class="cropper-wrapper"
      v-if="image && !isLoading"
      :style="{ width: containerWidth + 'px', height: containerHeight + 'px' }"
    >
      
    </div> -->


   


  
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { useUserStore } from "../stores/user"
import { useRoute,useRouter } from "vue-router";
import jwt_decode from "jwt-decode";

const userStore = useUserStore()
const image = ref(null);
const croppedImage = ref(null);
const cropperRef = ref(null);
const isLoading = ref(false);
const containerWidth = ref(200);
const containerHeight = ref(200);
const router = useRouter()
const route = useRoute()

  console.log('userStore.user=>', userStore.user )
// 非同步載入圖片
function loadImageAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


async function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  isLoading.value = true;
  croppedImage.value = null;
  image.value = null; // 先清空圖片


  try {
    const img = await loadImageAsync(file);


    containerWidth.value = Math.min(img.width, 300);
    containerHeight.value = Math.min(img.height, 300);


    // 圖片完全載入後再顯示 cropper
    image.value = img.src;
  } catch (err) {
    console.error("圖片載入失敗", err);
  } finally {
    // 等圖片顯示後再關閉 loading
    // 可以加個短延遲保險
    setTimeout(() => {
      isLoading.value = false;
    }, 50);
  }
}


function confirmCrop() {
  if (!cropperRef.value) return;
  const result = cropperRef.value.getResult();
  if (result.canvas) {
    croppedImage.value = result.canvas.toDataURL("image/png"); // 這才是真正的圖片 Base64

  }
}

function cancel(){
  croppedImage.value = null

}
async function submit(){
  const id = String(userStore.userId) 
  const api = `${import.meta.env.VITE_API_HOST}/api/users/${id}/avatar`
  const avatarImg = croppedImage.value // Base64

  // 1. 將 Base64 轉成 Blob
  function base64ToBlob(base64) {
    const [header, data] = base64.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(data);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
  }

  const blob = base64ToBlob(avatarImg);

  // 2. 放進 FormData
  const formData = new FormData();
  formData.append('avatar', blob, 'avatar.png'); // 'file' 要跟 multer field 名稱一致



  try{
    const result =  await fetch(api,{
      method:"PATCH",
      body: formData
    })
    const data = await result.json()
    if(data.success){
      localStorage.removeItem('token')//移除舊token
      // const token = data.token
      localStorage.setItem('token',data.token)//生成新token
      const jwt = localStorage.getItem('token')
      const decoded = jwt_decode(jwt);
      userStore.setUser(decoded);
      router.push({ name: 'profile'})
      // route.fullPath
    }
  }catch(err){
    console.log(err)
  } 

}


</script>


<style>
/* .cropper-wrapper {
  border: 1px solid #ccc;
  overflow: hidden;
  position: relative;
} */


/* .cropper-wrapper .cropper__image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
} */


.preview img {
  margin-top: 16px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border: 2px solid #ccc;
}
</style>




<template>
  <div class="flex w-full m-auto p-7">
    <div ref="leftHeight"  class="w-7/12 ml-0 flex flex-wrap h-full">
      <div class="w-full flex">
         <div class="w-2 h-10  bg-amber-400"></div>
         <h4 class=" text-center text-right items-end p-2">每週新曲精選</h4>
      </div>
      
      <div v-for="(item ,index) in data"  :key="index">
        <List class="my-2"
        :index="index+1"
        :title="item.title"
        :description="item.description"
        :images="item.images"
        @click="getAlbum(item.id)"
        />
      </div>
    </div>

    <div class="w-5/12" >
      <div class="w-full flex items-center">
         <!-- <div class="w-2 h-10  bg-amber-400"></div> -->
         <h3 class=" text-center text-right items-end p-2 text-yellow-400 font-bold">TOP.100</h3>
         <h5 class="text-gray-400">百大精選</h5>
      </div>
      <div class="overflow-auto" :style="{ height: leftHeight?.offsetHeight + 'px' }">
        <List_item
        v-for="(el, index) in results" 
        :key="index" 
        :index="index"
        :name="el.album.name"
        :release_date="el.album.release_date"
        :artist="el.album.artist"
        :url="el.url"
        />
      </div>
    </div>

   
  </div>

</template>

<script setup>
import { onMounted,ref, watch } from 'vue';
import List from './List.vue';
import List_item from './List_item.vue';
const api = `${import.meta.env.VITE_API_HOST}/api/rank/`
const data =ref([])
const search = ref('')
const leftHeight = ref(0)
onMounted(async()=>{
  try{
    const res =  await fetch(api)
    data.value = await res.json()
  }catch(err){
    console.log(err)
  }
})

const results = ref([])

async function getAlbum(id) {

  try {
    const api = `${import.meta.env.VITE_API_HOST}/api/rank/album/${id}`
    const res = await fetch(api)
    results.value = await res.json()
    console.log(results.value)
    // return results.value 
  } catch (err) {
    console.error(err)
  }
}



</script>

<style scoped>
</style>
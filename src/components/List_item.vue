<template>
    <ul class="list bg-base-100 rounded-box shadow-md mb-2">
    
        <li class="list-row flex items-center justify-between hover:border-b-2 border-b-amber-300 hover:bg-gray-50">
            <div class="flex items-center gap-5">
                <div class="text-lg font-thin opacity-30 tabular-nums ">{{ String(props.index+1).padStart(2,'0') }}</div>
                <div><img class="w-10 rounded-box" :src="props.artist?.images[0].url"/></div>
                <div class="list-col-grow">
                    <div>{{ props.name }}</div>
                    <div>{{ props.artist?.name }}</div>
                </div>
            </div>
  
            <div class="flex items-center">
                <a :href="props.url" target="_blank">
                    <button class="btn btn-square btn-ghost">
                        <FontAwesomeIcon class="text-2xl" :icon="faCirclePlay" style="color:#FBC51D;"/>
                    </button>
                </a>
                <p class="text-gray-400">{{ props.release_date }}</p>
            </div>

           
        </li>
    </ul>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { faCirclePlay} from '@fortawesome/free-solid-svg-icons'
interface Image {
  height: number;
  width: number;
  url: string;
}

interface Artist{
    images:Image[]
    name:string 
    url: string
}

interface Props {
//   id: string;
    index:number
    title?: string;
    name?:string;
    release_date?:string;
    description?: string;
    url?: string;
    images?: Image[];
    artist?:Artist
}
const props = defineProps<Props>()

</script>
<style scoped>
</style>
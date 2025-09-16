<template>
    <ul class="list bg-base-100 rounded-box hover:shadow-md w-44 items-center">
    
        <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">{{ props.description }}</li>
        
        <li class="list-row inline-block p-3">
            <!-- <div class="text-4xl font-thin opacity-30 tabular-nums">{{ String(props.index).padStart(2,'0') }}</div> -->
            <div><img class="w-32 " :src="props.images?.[0].url"/></div>
            <div class="list-col-grow">
            <!-- <div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div> -->
            </div>     
        </li>
    </ul>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
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
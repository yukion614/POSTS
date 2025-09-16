<template>
    <div class="flex justify-around items-center p-5 border-b-2 border-b-yellow-200 hover:opacity-70">
        <div class=" bg-yellow-400 text-white h-8 flex items-center  px-10 rounded-full">09.01</div>
        <FontAwesomeIcon class="text-lime-400" :icon="faTv" />
        <div class="">
            <p class="text-gray-500">YouTube「週刊乃木坂ニュース」菅原咲月</p>
            <p class="text-yellow-600">https://youtube.com/live/3OJsOn7iQtQ</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {faTv} from "@fortawesome/free-solid-svg-icons"
</script>
<style>
</style>
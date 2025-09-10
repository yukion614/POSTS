<template>
    <!--  -->
      <div class="toast toast-end z-50">
        <div class="alert alert-info"
        v-for="(toast, index) in toasts"
        :key="toast.id"
        :class="`alert alert-${toast.type} shadow-lg mb-2`"
        >
            <span>{{ toast.message }}</span>
             <button
                class="btn btn-sm btn-ghost ml-2"
                @click="removeToast(toast.id)"
            >✕</button>
        </div>
        <!-- <div class="alert alert-success">
            <span>Message sent successfully.</span>
        </div> -->
    </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  toasts: Array,
  removeToast: Function
})

</script>



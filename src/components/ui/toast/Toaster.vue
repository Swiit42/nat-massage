<template>
  <teleport to="body">
    <div class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80">
      <transition-group
        name="toast"
        tag="div"
        class="flex flex-col gap-2"
      >
        <Toast
          v-for="toast in uiStore.toasts"
          :key="toast.id"
          :type="toast.type"
          :title="toast.title"
          :message="toast.message"
          @close="uiStore.removeToast(toast.id)"
        />
      </transition-group>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
import Toast from './Toast.vue'

const uiStore = useUiStore()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.toast-move {
  transition: transform 0.3s ease;
}
</style>

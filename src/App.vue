<template>
  <div :class="{ dark: uiStore.darkMode }">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
import Toaster from '@/components/ui/toast/Toaster.vue'
console.log('VERSION TEST 20260604')
const uiStore = useUiStore()
</script>

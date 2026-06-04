<template>
  <div
    :class="cn(
      'flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-hover text-sm transition-all duration-300',
      type === 'success' && 'border-forest-200 bg-forest-50 text-forest-800 dark:border-forest-800 dark:bg-forest-950 dark:text-forest-200',
      type === 'error' && 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
      type === 'info' && 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200',
    )"
  >
    <span class="mt-0.5 text-lg">{{ icon }}</span>
    <div class="flex-1">
      <p class="font-semibold">{{ title }}</p>
      <p v-if="message" class="mt-0.5 opacity-80">{{ message }}</p>
    </div>
    <button class="ml-2 opacity-60 hover:opacity-100 transition-opacity" @click="$emit('close')">
      <X class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<{
  type: 'success' | 'error' | 'info'
  title: string
  message?: string
}>()

defineEmits<{ close: [] }>()

const icon = computed(() => {
  if (props.type === 'success') return '✅'
  if (props.type === 'error') return '❌'
  return 'ℹ️'
})
</script>

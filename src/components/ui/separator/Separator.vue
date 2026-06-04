<template>
  <div
    :class="cn(
      'shrink-0 bg-stone-200 dark:bg-stone-700',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      props.class
    )"
  />
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = withDefaults(defineProps<{ orientation?: 'horizontal' | 'vertical'; class?: string }>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <span
    :class="cn(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
      variant === 'default' && 'bg-forest-100 text-forest-800 dark:bg-forest-900 dark:text-forest-200',
      variant === 'secondary' && 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
      variant === 'success' && 'bg-emerald-100 text-emerald-800',
      variant === 'destructive' && 'bg-red-100 text-red-700',
      props.class
    )"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = withDefaults(defineProps<{ variant?: 'default' | 'secondary' | 'success' | 'destructive'; class?: string }>(), {
  variant: 'default',
})
</script>

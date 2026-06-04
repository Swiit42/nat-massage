<template>
  <label
    :class="cn('text-sm font-medium text-stone-700 dark:text-stone-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </label>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
defineOptions({ inheritAttrs: false })
</script>

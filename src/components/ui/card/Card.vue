<template>
  <div :class="cn('rounded-2xl bg-white shadow-card dark:bg-stone-900', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
</script>

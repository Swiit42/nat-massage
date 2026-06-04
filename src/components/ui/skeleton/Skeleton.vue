<template>
  <div :class="cn('animate-pulse rounded-xl bg-stone-200 dark:bg-stone-800', props.class)" />
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
</script>

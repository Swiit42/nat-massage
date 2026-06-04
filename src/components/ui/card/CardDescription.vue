<template>
  <p :class="cn('text-sm text-stone-500 dark:text-stone-400', props.class)"><slot /></p>
</template>
<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
</script>

<template>
  <h3 :class="cn('font-serif text-xl font-semibold text-forest-900 dark:text-forest-100', props.class)"><slot /></h3>
</template>
<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
</script>

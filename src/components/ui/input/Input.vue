<template>
  <input
    :value="modelValue"
    :class="cn(
      'flex h-11 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 shadow-sm ring-offset-white transition-colors placeholder:text-stone-400',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500',
      props.class
    )"
    v-bind="$attrs"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string; modelValue?: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
defineOptions({ inheritAttrs: false })
</script>

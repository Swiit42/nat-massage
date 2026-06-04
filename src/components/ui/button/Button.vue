<template>
  <component
    :is="as || 'button'"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-forest-700 text-white shadow-md hover:bg-forest-800 hover:-translate-y-0.5 hover:shadow-hover active:translate-y-0',
        secondary: 'border-2 border-forest-700 text-forest-700 hover:bg-forest-50 hover:-translate-y-0.5',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        ghost: 'hover:bg-forest-50 hover:text-forest-700',
        outline: 'border border-stone-200 bg-white hover:bg-stone-50 hover:text-stone-900',
        link: 'text-forest-700 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 px-4 py-2 text-xs',
        lg: 'h-13 px-8 py-3 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonVariants = VariantProps<typeof buttonVariants>

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  as?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
})
</script>

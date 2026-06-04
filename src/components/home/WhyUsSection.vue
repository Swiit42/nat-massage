<template>
  <section class="py-14 bg-cream-100 dark:bg-stone-950 border-y border-cream-200 dark:border-stone-800">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
        <div class="shrink-0 text-center lg:text-left">
          <p class="font-serif text-2xl font-semibold text-forest-900 dark:text-forest-100">
            Чому обирають нас?
          </p>
        </div>

        <div class="hidden lg:block h-px flex-1 bg-cream-300 dark:bg-stone-800" />

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full lg:w-auto">
          <div v-for="reason in reasons" :key="reason" class="flex items-center gap-3">
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-100 dark:bg-forest-900">
              <CheckCircle2 class="h-4 w-4 text-forest-700 dark:text-forest-300" />
            </div>
            <span class="text-sm font-medium text-stone-700 dark:text-stone-300">{{ reason }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CheckCircle2 } from 'lucide-vue-next'

const reasons = [
  'Індивідуальний підхід',
  'Комплексна робота з болем',
  'Спокійна атмосфера',
  "М'які та ефективні техніки",
]
</script>

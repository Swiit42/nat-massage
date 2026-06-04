<template>
  <div class="min-h-screen bg-cream-50 dark:bg-stone-950 flex items-center justify-center p-4">
    <div class="text-center">
      <p class="font-serif text-8xl font-bold text-forest-200 dark:text-forest-900 mb-4">404</p>
      <h1 class="font-serif text-2xl font-semibold text-forest-900 dark:text-forest-100 mb-3">
        Сторінку не знайдено
      </h1>
      <p class="text-stone-500 dark:text-stone-400 mb-8">
        Схоже, ця сторінка не існує.
      </p>
      <router-link to="/">
        <button class="inline-flex items-center gap-2 rounded-full bg-forest-700 px-6 py-3 text-sm font-semibold text-white hover:bg-forest-800 transition-colors">
          <ArrowLeft class="h-4 w-4" />
          На головну
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <section class="py-24 bg-cream-100 dark:bg-stone-950">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <span class="inline-block rounded-full bg-beige-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-beige-700 dark:bg-beige-900/30 dark:text-beige-400 mb-4">
          Комплексний підхід
        </span>
        <h2 class="section-title mb-4 text-balance">
          Чому масаж — це більше,<br />
          <span class="text-forest-600 dark:text-forest-400 italic">ніж просто розслаблення</span>
        </h2>
        <p class="text-stone-500 dark:text-stone-400 max-w-lg mx-auto leading-relaxed">
          Повна схема того, як різні техніки впливають на тіло, які проблеми вирішують та яких результатів можна досягти.
        </p>
      </div>

      <!-- Full explanation image -->
      <div class="relative rounded-3xl overflow-hidden shadow-hover">
        <img
          src="/pictures/schema/full_explanation.jpeg"
          alt="Комплексний підхід до масажу"
          class="w-full object-contain bg-white dark:bg-stone-900"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-forest-950/20 via-transparent to-transparent pointer-events-none" />
      </div>

      <div class="mt-10 text-center">
        <router-link to="/booking">
          <button class="inline-flex items-center gap-2.5 rounded-full bg-forest-700 px-8 py-4 text-base font-semibold text-white shadow-hover transition-all duration-200 hover:bg-forest-800 hover:-translate-y-1">
            <CalendarDays class="h-5 w-5" />
            Записатися на сеанс
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CalendarDays } from 'lucide-vue-next'
</script>

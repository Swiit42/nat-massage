<template>
  <section class="py-28 bg-cream-100 dark:bg-stone-950 relative overflow-hidden">
    <!-- Decorative -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 h-px w-24 bg-forest-200 dark:bg-forest-800" />

    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
      <!-- Big phrase -->
      <div class="mb-14">
        <p class="font-serif text-4xl sm:text-5xl font-semibold text-forest-900 dark:text-forest-100 text-balance leading-tight">
          Ваше тіло заслуговує<br />
          <span class="text-forest-600 dark:text-forest-400 italic">на турботу та відновлення</span>
          <span class="ml-2">🌿</span>
        </p>
        <p class="mt-6 text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed text-lg">
          Не чекайте, поки дискомфорт стане частиною життя. Зверніться зараз — відчуйте перше полегшення вже після сеансу.
        </p>
      </div>

      <!-- CTA button -->
      <div class="mb-16">
        <router-link to="/booking">
          <button class="inline-flex items-center gap-2.5 rounded-full bg-forest-700 px-10 py-4 text-base font-semibold text-white shadow-hover transition-all duration-200 hover:bg-forest-800 hover:-translate-y-1 hover:shadow-xl active:translate-y-0">
            <CalendarDays class="h-5 w-5" />
            Записатися на консультацію
          </button>
        </router-link>
      </div>

      <!-- Contacts -->
      <div class="grid gap-4 sm:grid-cols-3 max-w-xl mx-auto">
        <a
          href="https://t.me/massage_balance"
          target="_blank"
          class="rounded-3xl border border-forest-200 bg-white p-5 text-center text-sm font-medium text-forest-900 transition hover:border-forest-400 hover:shadow-soft dark:border-forest-800 dark:bg-stone-900 dark:text-forest-100"
        >
          Telegram<br />
          <span class="text-xs text-stone-400 font-normal">@massage_balance</span>
        </a>
        <div class="rounded-3xl border border-forest-200 bg-white p-5 text-center text-sm font-medium text-forest-900 dark:border-forest-800 dark:bg-stone-900 dark:text-forest-100">
          Viber<br />
          <span class="text-xs text-stone-400 font-normal">+38 097 403 8443</span>
        </div>
        <a
          href="https://www.facebook.com/massage.balance"
          target="_blank"
          class="rounded-3xl border border-forest-200 bg-white p-5 text-center text-sm font-medium text-forest-900 transition hover:border-forest-400 hover:shadow-soft dark:border-forest-800 dark:bg-stone-900 dark:text-forest-100"
        >
          Facebook<br />
          <span class="text-xs text-stone-400 font-normal">massage.balance</span>
        </a>
      </div>

      <!-- Trust badges -->
      <div class="mt-14 flex flex-wrap items-center justify-center gap-8">
        <div v-for="badge in badges" :key="badge.text" class="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
          <component :is="badge.icon" class="h-4 w-4 text-forest-600 dark:text-forest-400" />
          {{ badge.text }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CalendarDays, ShieldCheck, Clock, Award } from 'lucide-vue-next'

const badges = [
  { icon: ShieldCheck, text: 'Сертифікований терапевт' },
  { icon: Clock, text: 'Гнучкий розклад' },
  { icon: Award, text: '5+ років досвіду' },
]
</script>

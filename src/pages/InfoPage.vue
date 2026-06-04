<template>
  <div>
    <Navbar />
    <main>

      <!-- Hero -->
      <section class="py-24 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 relative overflow-hidden">
        <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 32px 32px;" />
        <div class="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <router-link
            to="/"
            class="inline-flex items-center gap-2 text-forest-400 hover:text-forest-200 transition-colors text-sm mb-8"
          >
            <ArrowLeft class="h-4 w-4" />
            На головну
          </router-link>
          <h1 class="font-serif text-4xl sm:text-5xl font-semibold text-white mb-4 text-balance">
            Масаж — це більше,<br />
            <span class="text-beige-300 italic">ніж просто розслаблення</span>
          </h1>
          <p class="text-forest-300 text-lg max-w-xl mx-auto leading-relaxed">
            Що відбувається з вашим тілом під час і після сеансу, та чому це працює.
          </p>
        </div>
      </section>

      <!-- Results section: Що ви відчуєте після сеансу -->
      <section class="py-24 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 relative overflow-hidden">
        <div class="absolute top-0 right-0 h-64 w-64 rounded-full bg-beige-400/5 blur-3xl pointer-events-none" />
        <div class="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-forest-600/10 blur-3xl pointer-events-none" />

        <div class="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-16 lg:grid-cols-2 lg:items-center">

            <!-- Left: results -->
            <div>
              <span class="inline-block rounded-full border border-forest-600/50 bg-forest-800/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest-300 backdrop-blur-sm mb-6">
                Після сеансу
              </span>
              <h2 class="font-serif text-3xl sm:text-4xl font-semibold text-white mb-4 text-balance">
                Що ви відчуєте після сеансу?
              </h2>
              <p class="text-forest-300 mb-10 leading-relaxed max-w-sm">
                Вже після першого сеансу тіло починає відповідати по-іншому.
              </p>

              <div class="grid grid-cols-2 gap-3">
                <div
                  v-for="result in results"
                  :key="result"
                  class="flex items-center gap-3 rounded-2xl bg-forest-800/40 border border-forest-700/30 px-4 py-3 backdrop-blur-sm"
                >
                  <span class="text-lg shrink-0">🌿</span>
                  <p class="text-sm font-medium text-forest-100">{{ result }}</p>
                </div>
              </div>
            </div>

            <!-- Right: photo -->
            <div class="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-hover">
              <img
                src="/pictures/picto/after_massage_pic.jpeg"
                alt="Після сеансу масажу"
                class="h-full w-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
            </div>

          </div>
        </div>
      </section>

      <!-- Full explanation section -->
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

    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, CalendarDays } from 'lucide-vue-next'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

const results = [
  'Легкість у тілі',
  'Менше напруги',
  "Розслаблення м'язів",
  'Тепло та комфорт',
  'Легше рухатись',
  'Більше енергії',
  'Спокій та якісний сон',
]
</script>

<template>
  <div>
    <Navbar />
    <main>
      <!-- Not found -->
      <div v-if="!technique" class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <p class="text-stone-500 mb-4">Техніку не знайдено.</p>
          <router-link to="/" class="text-forest-700 font-medium hover:underline">← На головну</router-link>
        </div>
      </div>

      <template v-else>
        <!-- Hero -->
        <section class="relative py-24 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 overflow-hidden">
          <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 32px 32px;" />
          <div class="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <router-link
              to="/#services"
              class="inline-flex items-center gap-2 text-forest-400 hover:text-forest-200 transition-colors text-sm mb-8"
            >
              <ArrowLeft class="h-4 w-4" />
              Всі техніки
            </router-link>
            <h1 class="font-serif text-4xl sm:text-5xl font-semibold text-white mb-4 text-balance">
              {{ technique.title }}
            </h1>
            <p class="text-forest-300 text-lg max-w-lg mx-auto">{{ technique.subtitle }}</p>
          </div>
        </section>

        <!-- Content -->
        <section class="py-20 bg-cream-100 dark:bg-stone-950">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div class="grid gap-16 lg:grid-cols-2 lg:items-start">

              <!-- Left: schemas -->
              <div class="space-y-6">
                <div
                  v-for="(schema, i) in technique.schemas"
                  :key="i"
                  class="rounded-3xl overflow-hidden shadow-hover bg-white dark:bg-stone-900"
                >
                  <img
                    :src="schema"
                    :alt="technique.title"
                    class="w-full object-contain"
                  />
                </div>
              </div>

              <!-- Right: text -->
              <div class="lg:sticky lg:top-24">
                <span class="inline-block rounded-full bg-forest-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest-700 dark:bg-forest-900 dark:text-forest-300 mb-6">
                  Техніка
                </span>
                <h2 class="font-serif text-2xl font-semibold text-forest-900 dark:text-forest-100 mb-6">
                  {{ technique.title }}
                </h2>
                <p class="text-stone-600 dark:text-stone-400 leading-relaxed mb-10">
                  {{ technique.description }}
                </p>

                <!-- Benefits -->
                <div class="rounded-3xl bg-gradient-to-br from-forest-800 to-forest-950 p-8 text-white mb-8">
                  <p class="font-serif text-lg font-semibold mb-5">Що дає ця техніка:</p>
                  <ul class="space-y-3">
                    <li
                      v-for="benefit in technique.benefits"
                      :key="benefit"
                      class="flex items-start gap-3"
                    >
                      <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-beige-300/20 text-beige-300 text-xs font-bold">✓</span>
                      <span class="text-sm text-forest-200">{{ benefit }}</span>
                    </li>
                  </ul>
                </div>

                <!-- CTA -->
                <router-link to="/booking">
                  <button class="w-full rounded-full bg-beige-300 py-4 text-base font-semibold text-forest-900 shadow-hover transition-all duration-200 hover:bg-beige-200 hover:-translate-y-1">
                    Записатися на сеанс
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </section>

        <!-- Other techniques -->
        <section class="py-20 bg-white dark:bg-stone-900">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h3 class="font-serif text-2xl font-semibold text-forest-900 dark:text-forest-100 mb-10 text-center">
              Інші техніки
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <router-link
                v-for="other in otherTechniques"
                :key="other.slug"
                :to="`/techniques/${other.slug}`"
                class="group rounded-2xl overflow-hidden bg-cream-100 dark:bg-stone-800 hover:shadow-hover transition-all duration-200 hover:-translate-y-0.5"
              >
                <div class="aspect-square overflow-hidden">
                  <img :src="other.picto" :alt="other.title" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p class="px-3 py-2 text-sm font-medium text-forest-900 dark:text-forest-100 text-center">{{ other.title }}</p>
              </router-link>
            </div>
          </div>
        </section>
      </template>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { techniques, getTechniqueBySlug } from '@/data/techniques'

const route = useRoute()
const technique = computed(() => getTechniqueBySlug(route.params.slug as string))

watchEffect(() => {
  if (technique.value) {
    document.title = `${technique.value.title} — Nat Massage`
  }
})
const otherTechniques = computed(() =>
  techniques.filter((t) => t.slug !== route.params.slug).slice(0, 4)
)
</script>

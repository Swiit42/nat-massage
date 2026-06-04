<template>
  <section id="services" class="py-24 bg-white dark:bg-stone-900">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="inline-block rounded-full bg-forest-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest-700 dark:bg-forest-900 dark:text-forest-300 mb-4">
          Техніки
        </span>
        <h2 class="section-title mb-4 text-balance">Наш підхід до відновлення</h2>
        <p class="text-stone-500 max-w-md mx-auto dark:text-stone-400 leading-relaxed">
          Комплекс перевірених технік — обираємо те, що підходить саме вашому тілу.
        </p>
      </div>

      <!-- 6 picto tiles: 2 cols mobile, 3 cols desktop -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-5">
        <router-link
          v-for="service in services"
          :key="service.slug"
          :to="`/techniques/${service.slug}`"
          class="group relative rounded-3xl overflow-hidden bg-cream-100 dark:bg-stone-800 hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Picto image — 85% of tile = 15% reduction -->
          <div class="aspect-square bg-cream-200 dark:bg-stone-700 flex items-center justify-center">
            <img
              :src="service.picto"
              :alt="service.title"
              class="h-[85%] w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <!-- Label -->
          <div class="p-4">
            <h3 class="font-serif text-base font-semibold text-forest-900 dark:text-forest-100 mb-1">
              {{ service.title }}
            </h3>
            <p class="text-xs text-stone-500 dark:text-stone-400 leading-snug line-clamp-2">
              {{ service.short }}
            </p>
            <div class="mt-3 flex items-center gap-1 text-xs font-semibold text-forest-700 dark:text-forest-400 group-hover:gap-2 transition-all duration-200">
              Докладніше
              <ArrowRight class="h-3 w-3" />
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const services = [
  {
    slug: 'manipulation',
    title: 'Мобілізація',
    short: 'Відновлення рухливості суглобів та тригерні точки.',
    picto: '/pictures/picto/mobilisation_pic.png',
  },
  {
    slug: 'cups',
    title: 'Глибокий масаж',
    short: 'Глибока робота з м\'язами — знімає хронічну напругу та відновлює рухливість.',
    picto: '/pictures/picto/deep_pic.png',
  },
  {
    slug: 'manipulation',
    title: 'Тригерні точки',
    short: 'Зняття спазму та болю у проблемних зонах.',
    picto: '/pictures/picto/points_pic.png',
  },
  {
    slug: 'redlamp',
    title: 'Червоне світло',
    short: 'Інфрачервона теплова терапія для глибокого розслаблення.',
    picto: '/pictures/picto/heat_pic.png',
  },
  {
    slug: 'lympho',
    title: 'Лімфодренаж',
    short: 'Виведення набряків та відновлення циркуляції.',
    picto: '/pictures/picto/lympho_pic.png',
  },
  {
    slug: 'tens',
    title: 'TENS',
    short: 'Безболісна електростимуляція для зняття болю.',
    picto: '/pictures/picto/tens_pic.png',
  },
]
</script>

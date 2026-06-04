<template>
  <section class="py-24 bg-cream-100 dark:bg-stone-950">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-16 lg:grid-cols-2 lg:items-center">
        <!-- Left: list -->
        <div>
          <span class="inline-block rounded-full bg-beige-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-beige-700 dark:bg-beige-900/30 dark:text-beige-400 mb-4">
            Для кого
          </span>
          <h2 class="section-title mb-4">
            Вам підійде якщо:
          </h2>
          <p class="text-stone-500 dark:text-stone-400 mb-10 leading-relaxed">
            Якщо тіло сигналізує про втому чи дискомфорт — це знак, що воно потребує турботи.
          </p>

          <div class="grid gap-3 sm:grid-cols-2">
            <div
              v-for="pain in pains"
              :key="pain.label"
              class="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft dark:bg-stone-900"
            >
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-100 dark:bg-forest-900">
                <component :is="pain.icon" class="h-4 w-4 text-forest-700 dark:text-forest-300" />
              </div>
              <span class="text-sm font-medium text-stone-700 dark:text-stone-300">{{ pain.label }}</span>
            </div>
          </div>
        </div>

        <!-- Right: carousel -->
        <div class="relative">
          <div class="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-hover">
            <!-- Images -->
            <template v-for="(img, i) in images" :key="img.src">
              <img
                :src="img.src"
                :alt="img.alt"
                class="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
                :class="i === current ? 'opacity-100' : 'opacity-0'"
              />
            </template>
            <div class="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />

            <!-- Dots -->
            <div class="absolute bottom-20 left-0 right-0 flex justify-center gap-1.5">
              <button
                v-for="(_, i) in images"
                :key="i"
                @click="goTo(i)"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="i === current ? 'w-6 bg-beige-300' : 'w-1.5 bg-white/40'"
              />
            </div>
          </div>

          <!-- Decorative -->
          <div class="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-beige-200/60 blur-2xl dark:bg-beige-900/30 pointer-events-none" />
          <div class="absolute -top-4 -left-4 h-20 w-20 rounded-full bg-forest-200/40 blur-2xl dark:bg-forest-900/30 pointer-events-none" />

          <!-- CTA card overlay -->
          <div class="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm border border-cream-200 dark:border-stone-700 p-5 shadow-hover">
            <p class="font-serif text-base font-semibold text-forest-900 dark:text-forest-100 mb-3">
              Тут мене зрозуміють і мені стане легше.
            </p>
            <router-link to="/booking">
              <button class="w-full rounded-full bg-forest-700 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-forest-800">
                Записатися на сеанс
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Activity, Monitor, Brain, Zap, Wind, Dumbbell, Moon, MoveHorizontal } from 'lucide-vue-next'

const pains = [
  { icon: Activity, label: 'Біль у спині або шиї' },
  { icon: Monitor, label: 'Сидяча робота' },
  { icon: Brain, label: 'Хронічна втома' },
  { icon: Zap, label: 'Стрес та напруга' },
  { icon: Wind, label: 'Набряки та важкість у ногах' },
  { icon: Dumbbell, label: 'Спортивне навантаження' },
  { icon: Moon, label: 'Поганий сон' },
  { icon: MoveHorizontal, label: 'Відчуття скутості в тілі' },
]

const images = [
  { src: '/pictures/massage/back_massage.jpeg', alt: 'Масаж спини' },
  { src: '/pictures/massage/cups_massage.jpeg', alt: 'Вакуумні банки' },
  { src: '/pictures/massage/bone_massage.jpeg', alt: 'Мануальна терапія' },
  { src: '/pictures/massage/leg_massage.jpeg', alt: 'Масаж ніг' },
]

const current = ref(0)
let timer: ReturnType<typeof setInterval>

function goTo(i: number) {
  current.value = i
}

onMounted(() => {
  timer = setInterval(() => {
    current.value = (current.value + 1) % images.length
  }, 4000)
})

onUnmounted(() => clearInterval(timer))
</script>

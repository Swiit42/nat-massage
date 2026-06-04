<template>
  <section class="relative h-[420px] sm:h-[520px] overflow-hidden bg-forest-950">
    <!-- Images -->
    <div
      v-for="(img, index) in images"
      :key="img.src"
      class="absolute inset-0 transition-opacity duration-700"
      :class="index === current ? 'opacity-100' : 'opacity-0'"
    >
      <img
        :src="img.src"
        :alt="img.alt"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-forest-950/30 via-transparent to-forest-950/50" />
    </div>

    <!-- Caption -->
    <div class="absolute bottom-14 left-0 right-0 text-center z-10 pointer-events-none">
      <p class="text-sm font-medium text-white/70 tracking-wider uppercase transition-all duration-500">
        {{ images[current].alt }}
      </p>
    </div>

    <!-- Arrows -->
    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition hover:bg-white/20"
      @click="prev"
    >
      <ChevronLeft class="h-5 w-5" />
    </button>
    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition hover:bg-white/20"
      @click="next"
    >
      <ChevronRight class="h-5 w-5" />
    </button>

    <!-- Dots -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
      <button
        v-for="(_, index) in images"
        :key="index"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="index === current ? 'w-6 bg-beige-300' : 'w-1.5 bg-white/40'"
        @click="goTo(index)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const images = [
  { src: '/pictures/massage/back_massage.jpeg', alt: 'Масаж спини' },
  { src: '/pictures/massage/cups_massage.jpeg', alt: 'Вакуумні банки' },
  { src: '/pictures/massage/bone_massage.jpeg', alt: 'Мануальна терапія' },
  { src: '/pictures/massage/leg_massage.jpeg', alt: 'Масаж ніг' },
  { src: '/pictures/complex_massage.jpeg', alt: 'Комплексний сеанс' },
]

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function next() {
  current.value = (current.value + 1) % images.length
}

function prev() {
  current.value = (current.value - 1 + images.length) % images.length
}

function goTo(index: number) {
  current.value = index
}

function startAutoplay() {
  timer = setInterval(next, 4000)
}

function stopAutoplay() {
  if (timer) clearInterval(timer)
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)
</script>

<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800" />
    <div class="absolute top-1/4 -right-24 h-96 w-96 rounded-full bg-forest-700/20 blur-3xl" />
    <div class="absolute bottom-1/4 -left-24 h-80 w-80 rounded-full bg-beige-400/10 blur-3xl" />
    <div
      class="absolute inset-0 opacity-5"
      style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 32px 32px;"
    />

    <div class="relative z-10 mx-auto max-w-6xl w-full px-4 py-24 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        <!-- Left: text -->
        <div>
          <h1 class="animate-slide-up font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl text-balance mb-6">
            Турбота про тіло,<br />
            <span class="text-beige-300 italic">яка відчувається вже після першого сеансу</span>
          </h1>

          <p class="animate-slide-up text-lg text-forest-300 mb-10 leading-relaxed" style="animation-delay:0.1s">
            Комплексний терапевтичний масаж,<br />мануальні техніки, відновлення м'язів.
          </p>

          <div class="animate-slide-up flex flex-col sm:flex-row items-start gap-4 mb-14" style="animation-delay:0.2s">
            <router-link to="/booking">
              <button class="inline-flex items-center gap-2.5 rounded-full bg-beige-300 px-8 py-4 text-base font-semibold text-forest-900 shadow-hover transition-all duration-200 hover:bg-beige-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0">
                <CalendarDays class="h-5 w-5" />
                Записатися на консультацію
              </button>
            </router-link>
            <a href="#services" class="inline-flex items-center gap-2 self-center text-sm font-medium text-forest-400 hover:text-forest-200 transition-colors">
              Дізнатися більше
              <ChevronDown class="h-4 w-4 animate-bounce" />
            </a>
          </div>

          <!-- Mini "for who" block -->
          <div class="animate-fade-in" style="animation-delay:0.4s">
            <p class="text-[11px] font-semibold uppercase tracking-widest text-forest-500 mb-4">Вам підійде якщо:</p>
            <div class="grid grid-cols-2 gap-y-2.5 gap-x-4">
              <div v-for="item in forWho" :key="item" class="flex items-center gap-2.5 text-sm text-forest-200">
                <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-700/60 text-beige-300 text-[10px] font-bold">✓</span>
                {{ item }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right: photo -->
        <div class="animate-fade-in relative hidden lg:block" style="animation-delay:0.3s">
          <div class="relative rounded-4xl overflow-hidden aspect-[4/5] bg-forest-800/40 border border-forest-700/30 shadow-hover">
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-forest-600">
              <img src="/pictures/salon.jpeg" alt="Фото масажу" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
          </div>

          <!-- Decorative blobs -->
          <div class="absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-beige-300/10 blur-2xl pointer-events-none" />
          <div class="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-forest-600/20 blur-2xl pointer-events-none" />

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CalendarDays, ChevronDown, Camera } from 'lucide-vue-next'

const forWho = [
  'Біль у спині або шиї',
  'Сидяча робота',
  'Напруга та спазми',
  'Хронічна втома',
  'Набряки у ногах',
  'Стрес та поганий сон',
]

</script>

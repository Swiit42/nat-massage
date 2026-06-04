<template>
  <section class="py-24 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 relative overflow-hidden">
    <div class="absolute top-0 right-0 h-64 w-64 rounded-full bg-beige-400/5 blur-3xl pointer-events-none" />
    <div class="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-forest-600/10 blur-3xl pointer-events-none" />

    <div class="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-16 lg:grid-cols-2 lg:items-center">

        <!-- Left: results -->
        <div>
          <span class="inline-block rounded-full border border-forest-600/50 bg-forest-800/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest-300 backdrop-blur-sm mb-6">
            Результат
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
</template>

<script setup lang="ts">
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

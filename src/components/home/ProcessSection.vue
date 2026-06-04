<template>
  <section class="py-24 bg-white dark:bg-stone-900">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-16 lg:grid-cols-2 lg:items-center">

        <!-- Left: steps -->
        <div>
          <span class="inline-block rounded-full bg-forest-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest-700 dark:bg-forest-900 dark:text-forest-300 mb-6">
            Сеанс
          </span>
          <h2 class="section-title mb-4">Як проходить сеанс?</h2>
          <p class="text-stone-500 dark:text-stone-400 mb-10 leading-relaxed">
            Кожен сеанс — це індивідуальна робота з вашим тілом від початку до кінця.
          </p>

          <div class="space-y-8">
            <div v-for="(step, index) in steps" :key="step.title" class="flex gap-5">
              <div class="flex flex-col items-center">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-forest-200 dark:border-forest-800 bg-forest-50 dark:bg-forest-900 shadow-soft">
                  <span class="font-serif text-lg font-bold text-forest-700 dark:text-forest-300">{{ index + 1 }}</span>
                </div>
                <div v-if="index < steps.length - 1" class="mt-2 h-full w-px bg-forest-100 dark:bg-forest-900 min-h-[2rem]" />
              </div>
              <div class="pb-2">
                <h3 class="font-serif text-base font-semibold text-forest-900 dark:text-forest-100 mb-1">
                  {{ step.title }}
                </h3>
                <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: photo -->
        <div class="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-hover">
          <img
            src="/pictures/picto/how_we_work.jpeg"
            alt="Як проходить сеанс"
            class="h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent" />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    title: 'Консультація',
    description: "Обговорюємо біль, напругу та проблемні зони.",
  },
  {
    title: 'Підготовка тіла',
    description: "Прогрівання та розслаблення м'язів.",
  },
  {
    title: 'Комплексна робота',
    description: 'Масаж, мобілізація, TENS, банки, тригерні точки.',
  },
  {
    title: 'Відновлення',
    description: 'Рекомендації після сеансу для кращого результату.',
  },
]
</script>

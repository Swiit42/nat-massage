<template>
  <div class="min-h-screen bg-cream-50 dark:bg-stone-950">
    <Navbar />

    <main class="pt-24 pb-16">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <!-- Page header -->
        <div class="text-center mb-10">
          <span class="inline-block rounded-full bg-forest-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest-700 dark:bg-forest-900 dark:text-forest-300 mb-4">
            Онлайн запис
          </span>
          <h1 class="section-title mb-3">Запис на сеанс</h1>
          <p class="text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            Оберіть зручний для вас день та час. Сеанс тривалістю 1 година.
          </p>
        </div>

        <!-- Info pills -->
        <div class="flex flex-wrap justify-center gap-3 mb-8">
          <div v-for="info in infos" :key="info.text" class="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-stone-600 shadow-soft dark:bg-stone-900 dark:text-stone-400">
            <component :is="info.icon" class="h-3.5 w-3.5 text-forest-600" />
            {{ info.text }}
          </div>
        </div>

        <!-- Calendar -->
        <WeekCalendar ref="calendarRef" @select-slot="openBookingModal" />

        <!-- Success message -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div
            v-if="showSuccess"
            class="mt-6 rounded-2xl bg-forest-50 border border-forest-200 p-5 flex items-start gap-3 dark:bg-forest-950 dark:border-forest-800"
          >
            <CheckCircle2 class="h-5 w-5 text-forest-600 mt-0.5 shrink-0" />
            <div>
              <p class="font-semibold text-forest-800 dark:text-forest-200">Запис успішно підтверджено!</p>
              <p class="text-sm text-forest-600 dark:text-forest-400 mt-1">Очікуйте підтвердження. До зустрічі!</p>
            </div>
          </div>
        </transition>
      </div>
    </main>

    <!-- Booking modal -->
    <BookingModal
      v-model:open="modalOpen"
      :selected-slot="selectedSlot"
      @success="onBookingSuccess"
    />

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type WeekCalendarType from '@/components/booking/WeekCalendar.vue'
import { Clock, CalendarDays, MapPin, CheckCircle2 } from 'lucide-vue-next'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import WeekCalendar from '@/components/booking/WeekCalendar.vue'
import BookingModal from '@/components/booking/BookingModal.vue'

const calendarRef = ref<InstanceType<typeof WeekCalendarType> | null>(null)
const modalOpen = ref(false)
const selectedSlot = ref<{ start: Date; end: Date } | null>(null)
const showSuccess = ref(false)

const infos = [
  { icon: Clock, text: '1 година сеанс' },
  { icon: CalendarDays, text: 'Пн–Сб, 9:00–19:00' },
  { icon: MapPin, text: 'Біла Церква, Київська область, Україна, 09109' },
]

function openBookingModal(start: Date, end: Date) {
  selectedSlot.value = { start, end }
  modalOpen.value = true
}

function onBookingSuccess() {
  showSuccess.value = true
  setTimeout(() => (showSuccess.value = false), 6000)
  calendarRef.value?.fetchSlots()
}
</script>

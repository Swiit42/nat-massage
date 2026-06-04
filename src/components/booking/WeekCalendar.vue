<template>
  <div class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">

    <!-- Header: arrows + day names -->
    <div class="flex items-stretch border-b border-stone-200 dark:border-stone-800">

      <button
        :disabled="!canGoPrev"
        @click="prevWeek"
        class="w-10 flex items-center justify-center text-stone-400 hover:text-stone-700 disabled:opacity-20 disabled:cursor-not-allowed border-r border-stone-200 dark:border-stone-800 transition-colors flex-shrink-0"
      >
        <ChevronLeft class="h-4 w-4" />
      </button>

      <div class="flex-1 grid grid-cols-7">
        <div
          v-for="day in weekDays"
          :key="day.iso"
          :class="[
            'text-center py-4 border-r last:border-r-0 border-stone-200 dark:border-stone-800',
            day.isPast ? 'opacity-30' : '',
          ]"
        >
          <p class="text-sm font-medium text-stone-700 dark:text-stone-300 capitalize">{{ day.weekdayLabel }}</p>
          <p class="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{{ day.dateLabel }}</p>
        </div>
      </div>

      <button
        @click="nextWeek"
        class="w-10 flex items-center justify-center text-stone-400 hover:text-stone-700 border-l border-stone-200 dark:border-stone-800 transition-colors flex-shrink-0"
      >
        <ChevronRight class="h-4 w-4" />
      </button>

    </div>

    <!-- Slots grid -->
    <div class="flex items-stretch">
      <div class="w-10 border-r border-stone-200 dark:border-stone-800 flex-shrink-0" />

      <div class="flex-1 grid grid-cols-7 p-3 gap-x-1 min-h-[200px]">
        <div
          v-for="day in weekDays"
          :key="day.iso"
          class="flex flex-col gap-1.5 px-1 border-r last:border-r-0 border-stone-100 dark:border-stone-800 py-2"
        >
          <div v-if="loading" class="space-y-1.5">
            <div v-for="i in 3" :key="i" class="h-9 rounded-lg bg-stone-100 dark:bg-stone-800 animate-pulse" />
          </div>

          <template v-else>
            <button
              v-for="slot in getAvailableSlots(day)"
              :key="slot.start.toISOString()"
              @click="$emit('select-slot', slot.start, slot.end)"
              class="w-full py-2 text-sm font-medium rounded-lg border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-forest-500 hover:bg-forest-50 hover:text-forest-700 dark:hover:bg-forest-950 dark:hover:text-forest-300 transition-all duration-150 cursor-pointer"
            >
              {{ formatTime(slot.start) }}
            </button>
          </template>
        </div>
      </div>

      <div class="w-10 border-l border-stone-200 dark:border-stone-800 flex-shrink-0" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import {
  addWeeks, subWeeks, startOfWeek, addDays, format,
  isToday, startOfDay, addHours, isBefore,
} from 'date-fns'
import { uk } from 'date-fns/locale'
import { useReservationStore } from '@/stores/reservations'
import type { TimeSlot } from '@/types'

const emit = defineEmits<{
  'select-slot': [start: Date, end: Date]
}>()

const store = useReservationStore()
const weekStart = ref(startOfWeek(new Date(), { weekStartsOn: 1 }))

const WORK_START = 9
const WORK_END = 19

const weekDays = computed(() =>
  Array.from({ length: 7 }, (_, i) => {
    const d = addDays(weekStart.value, i)
    return {
      dateLabel: format(d, 'd MMM', { locale: uk }),
      weekdayLabel: format(d, 'EEEE', { locale: uk }),
      iso: format(d, 'yyyy-MM-dd'),
      isToday: isToday(d),
      isPast: isBefore(startOfDay(d), startOfDay(new Date())),
      raw: d,
    }
  })
)

const canGoPrev = computed(() => {
  const thisWeek = startOfWeek(new Date(), { weekStartsOn: 1 })
  return isBefore(thisWeek, weekStart.value)
})

const loading = computed(() => store.loading)

function getAvailableSlots(day: { raw: Date; isPast: boolean }): TimeSlot[] {
  if (day.isPast) return []
  const slots: TimeSlot[] = []
  for (let h = WORK_START; h < WORK_END; h++) {
    const start = new Date(day.raw)
    start.setHours(h, 0, 0, 0)
    const end = addHours(start, 1)
    if (!isBefore(start, new Date()) && !store.isSlotBooked(start, end)) {
      slots.push({ start, end, available: true })
    }
  }
  return slots
}

function formatTime(date: Date) {
  return format(date, 'HH:mm')
}

function prevWeek() {
  const prev = subWeeks(weekStart.value, 1)
  const thisWeek = startOfWeek(new Date(), { weekStartsOn: 1 })
  if (!isBefore(prev, thisWeek)) weekStart.value = prev
}

function nextWeek() {
  weekStart.value = addWeeks(weekStart.value, 1)
}

async function fetchSlots() {
  const from = new Date(weekStart.value)
  const to = addDays(weekStart.value, 6)
  to.setHours(23, 59, 59)
  await store.fetchBookedSlots(from, to)
}

watch(weekStart, fetchSlots)

onMounted(() => fetchSlots())

defineExpose({ fetchSlots })
</script>

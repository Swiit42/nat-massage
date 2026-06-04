<template>
  <div class="rounded-3xl bg-white shadow-card dark:bg-stone-900 overflow-hidden">
    <!-- Week navigation header -->
    <div class="flex items-center justify-between px-6 py-5 border-b border-stone-100 dark:border-stone-800">
      <button
        :disabled="!canGoPrev"
        class="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-all hover:bg-forest-50 hover:border-forest-300 hover:text-forest-700 disabled:opacity-30 disabled:cursor-not-allowed dark:border-stone-700 dark:text-stone-400 dark:hover:bg-forest-900"
        @click="prevWeek"
      >
        <ChevronLeft class="h-4 w-4" />
      </button>

      <div class="text-center">
        <h3 class="font-semibold text-stone-900 dark:text-stone-100 capitalize">
          {{ monthLabel }}
        </h3>
        <p class="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
          {{ weekRangeLabel }}
        </p>
      </div>

      <button
        class="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-all hover:bg-forest-50 hover:border-forest-300 hover:text-forest-700 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-forest-900"
        @click="nextWeek"
      >
        <ChevronRight class="h-4 w-4" />
      </button>
    </div>

    <!-- Day columns -->
    <div class="grid grid-cols-7 border-b border-stone-100 dark:border-stone-800">
      <div
        v-for="day in weekDays"
        :key="day.iso"
        :class="[
          'flex flex-col items-center py-4 transition-colors border-r last:border-r-0 border-stone-100 dark:border-stone-800',
          day.isToday && selectedDay !== day.iso && 'bg-forest-50 dark:bg-forest-950/50',
          selectedDay === day.iso ? 'bg-forest-700' : '',
          !day.isToday && selectedDay !== day.iso && !day.isPast ? 'hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer' : '',
          day.isPast ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
        ]"
        @click="!day.isPast && selectDay(day.iso)"
      >
        <span
          :class="[
            'text-[10px] font-semibold uppercase tracking-wider mb-1.5',
            selectedDay === day.iso ? 'text-forest-200' : 'text-stone-400 dark:text-stone-500',
          ]"
        >
          {{ day.weekdayShort }}
        </span>
        <span
          :class="[
            'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors',
            selectedDay === day.iso
              ? 'bg-white/20 text-white'
              : day.isToday
              ? 'border-2 border-forest-500 text-forest-700 dark:text-forest-300'
              : 'text-stone-700 dark:text-stone-300',
          ]"
        >
          {{ day.date }}
        </span>
      </div>
    </div>

    <!-- Time slots -->
    <div class="p-6">
      <div v-if="loading" class="grid grid-cols-3 gap-3 sm:grid-cols-4">
        <Skeleton v-for="i in 12" :key="i" class="h-11 rounded-xl" />
      </div>

      <div v-else-if="selectedDay">
        <p class="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-4">
          Доступні години
        </p>
        <div class="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          <button
            v-for="slot in daySlots"
            :key="slot.start.toISOString()"
            :disabled="!slot.available"
            :class="[
              'flex flex-col items-center justify-center rounded-xl border py-2.5 text-sm font-medium transition-all duration-150',
              slot.available
                ? 'border-forest-200 bg-forest-50 text-forest-700 hover:border-forest-400 hover:bg-forest-100 hover:shadow-soft dark:border-forest-800 dark:bg-forest-950/50 dark:text-forest-300 dark:hover:bg-forest-900 cursor-pointer'
                : 'border-stone-100 bg-stone-50 text-stone-300 line-through cursor-not-allowed dark:border-stone-800 dark:bg-stone-900 dark:text-stone-600',
            ]"
            @click="slot.available && $emit('select-slot', slot.start, slot.end)"
          >
            {{ formatTime(slot.start) }}
          </button>
        </div>

        <p v-if="daySlots.length > 0 && daySlots.every(s => !s.available)" class="text-center text-sm text-stone-400 py-8">
          На цей день немає вільних місць.<br />Оберіть інший день.
        </p>
      </div>

      <div v-else class="text-center py-10 text-stone-400 dark:text-stone-500">
        <CalendarDays class="h-8 w-8 mx-auto mb-3 opacity-40" />
        <p class="text-sm">Оберіть день для перегляду доступних годин</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-vue-next'
import {
  addWeeks, subWeeks, startOfWeek, addDays, format,
  isToday, startOfDay, addHours, isBefore,
} from 'date-fns'
import { uk } from 'date-fns/locale'
import { useReservationStore } from '@/stores/reservations'
import { Skeleton } from '@/components/ui/skeleton'
import type { TimeSlot } from '@/types'

const emit = defineEmits<{
  'select-slot': [start: Date, end: Date]
}>()

const store = useReservationStore()
const weekStart = ref(startOfWeek(new Date(), { weekStartsOn: 1 }))
const selectedDay = ref<string | null>(null)

const WORK_START = 9
const WORK_END = 19

const weekDays = computed(() => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(weekStart.value, i)
    return {
      date: format(d, 'd'),
      weekdayShort: format(d, 'EEE', { locale: uk }).slice(0, 2),
      iso: format(d, 'yyyy-MM-dd'),
      isToday: isToday(d),
      isPast: isBefore(startOfDay(d), startOfDay(new Date())),
      raw: d,
    }
  })
})

const monthLabel = computed(() =>
  format(weekStart.value, 'LLLL yyyy', { locale: uk })
)

const weekRangeLabel = computed(() => {
  const end = addDays(weekStart.value, 6)
  return `${format(weekStart.value, 'd')} — ${format(end, 'd MMM', { locale: uk })}`
})

const canGoPrev = computed(() => {
  const thisWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  return isBefore(thisWeekStart, weekStart.value)
})

const loading = computed(() => store.loading)

const daySlots = computed((): TimeSlot[] => {
  if (!selectedDay.value) return []
  const day = weekDays.value.find(d => d.iso === selectedDay.value)
  if (!day) return []

  const slots: TimeSlot[] = []
  for (let h = WORK_START; h < WORK_END; h++) {
    const start = new Date(day.raw)
    start.setHours(h, 0, 0, 0)
    const end = addHours(start, 1)
    const isPastSlot = isBefore(start, new Date())
    const isBooked = store.isSlotBooked(start, end)
    slots.push({ start, end, available: !isPastSlot && !isBooked })
  }
  return slots
})

function formatTime(date: Date) {
  return format(date, 'HH:mm')
}

function selectDay(iso: string) {
  selectedDay.value = iso
}

function prevWeek() {
  const prev = subWeeks(weekStart.value, 1)
  const thisWeek = startOfWeek(new Date(), { weekStartsOn: 1 })
  if (!isBefore(prev, thisWeek)) {
    weekStart.value = prev
  }
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

onMounted(() => {
  fetchSlots()
  const today = weekDays.value.find(d => d.isToday && !d.isPast)
  if (today) selectedDay.value = today.iso
})
</script>

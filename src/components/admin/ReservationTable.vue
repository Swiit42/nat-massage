<template>
  <div class="rounded-2xl bg-white shadow-card overflow-hidden dark:bg-stone-900">
    <!-- Table header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
      <h2 class="font-semibold text-stone-900 dark:text-stone-100">
        Усі записи
        <Badge variant="secondary" class="ml-2">{{ reservations.length }}</Badge>
      </h2>
      <button
        class="flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-800"
        @click="$emit('refresh')"
      >
        <RefreshCw :class="['h-4 w-4', loading && 'animate-spin']" />
        Оновити
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="divide-y divide-stone-100 dark:divide-stone-800">
      <div v-for="i in 5" :key="i" class="flex items-center gap-4 px-6 py-4">
        <Skeleton class="h-10 w-10 rounded-full" />
        <div class="flex-1 space-y-2">
          <Skeleton class="h-4 w-48" />
          <Skeleton class="h-3 w-32" />
        </div>
        <Skeleton class="h-8 w-24 rounded-full" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!reservations.length" class="py-16 text-center">
      <CalendarX class="h-12 w-12 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
      <p class="text-stone-400 dark:text-stone-500">Немає записів</p>
    </div>

    <!-- Reservations list -->
    <div v-else class="divide-y divide-stone-100 dark:divide-stone-800">
      <div
        v-for="reservation in sortedReservations"
        :key="reservation.id"
        class="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
      >
        <!-- Avatar -->
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700 text-sm font-semibold dark:bg-forest-900 dark:text-forest-300">
          {{ reservation.firstName[0] }}{{ reservation.lastName[0] }}
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <p class="font-medium text-stone-900 dark:text-stone-100 truncate">
            {{ reservation.firstName }} {{ reservation.lastName }}
          </p>
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
            <span class="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
              <Phone class="h-3 w-3" />
              {{ reservation.phone }}
            </span>
            <span class="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
              <Clock class="h-3 w-3" />
              {{ formatDateTime(reservation.startTime) }}
            </span>
          </div>
          <p v-if="reservation.message" class="text-xs text-stone-400 dark:text-stone-500 mt-1 truncate italic">
            "{{ reservation.message }}"
          </p>
        </div>

        <!-- Date badge + actions -->
        <div class="flex items-center gap-3 shrink-0">
          <Badge :variant="isFuture(reservation.startTime) ? 'default' : 'secondary'">
            {{ isFuture(reservation.startTime) ? 'Майбутній' : 'Минулий' }}
          </Badge>
          <button
            class="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
            title="Видалити"
            @click="confirmDelete(reservation.id)"
          >
            <Trash2 class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm delete dialog -->
  <Dialog :open="!!deletingId" @update:open="deletingId = null">
    <div class="p-8 text-center">
      <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <Trash2 class="h-8 w-8 text-red-500" />
      </div>
      <h3 class="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
        Видалити запис?
      </h3>
      <p class="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Цю дію неможливо скасувати.
      </p>
      <div class="flex gap-3">
        <button
          class="flex-1 rounded-full border-2 border-stone-200 py-3 text-sm font-semibold text-stone-600 dark:border-stone-700 dark:text-stone-400"
          @click="deletingId = null"
        >
          Скасувати
        </button>
        <button
          :disabled="deleting"
          class="flex-1 rounded-full bg-red-500 py-3 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60"
          @click="doDelete"
        >
          {{ deleting ? 'Видалення...' : 'Видалити' }}
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { format, isAfter } from 'date-fns'
import { uk } from 'date-fns/locale'
import { RefreshCw, Trash2, Phone, Clock, CalendarX } from 'lucide-vue-next'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/dialog'
import { useReservationStore } from '@/stores/reservations'
import { useUiStore } from '@/stores/ui'
import type { Reservation } from '@/types'

const props = defineProps<{ reservations: Reservation[]; loading: boolean }>()
defineEmits<{ refresh: [] }>()

const store = useReservationStore()
const uiStore = useUiStore()
const deletingId = ref<string | null>(null)
const deleting = ref(false)

const sortedReservations = computed(() =>
  [...props.reservations].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  )
)

function formatDateTime(iso: string) {
  return format(new Date(iso), 'EEE d MMM yyyy · HH:mm', { locale: uk })
}

function isFuture(iso: string) {
  return isAfter(new Date(iso), new Date())
}

function confirmDelete(id: string) {
  deletingId.value = id
}

async function doDelete() {
  if (!deletingId.value) return
  deleting.value = true
  try {
    await store.deleteReservation(deletingId.value)
    uiStore.addToast({ type: 'success', title: 'Запис видалено' })
    deletingId.value = null
  } catch {
    uiStore.addToast({ type: 'error', title: 'Помилка видалення' })
  } finally {
    deleting.value = false
  }
}
</script>

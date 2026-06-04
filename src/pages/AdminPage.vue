<template>
  <div class="min-h-screen bg-cream-50 dark:bg-stone-950">
    <!-- Admin navbar -->
    <header class="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/95">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-forest-700">
              <Leaf class="h-4 w-4 text-white" />
            </div>
            <span class="font-serif font-semibold text-forest-900 dark:text-forest-100">Nat Massage</span>
            <span class="rounded-full bg-forest-100 px-2 py-0.5 text-xs font-semibold text-forest-700 dark:bg-forest-900 dark:text-forest-300">
              Admin
            </span>
          </div>
          <div class="flex items-center gap-3">
            <router-link
              to="/"
              class="text-xs text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
            >
              ← Сайт
            </router-link>
            <button
              class="flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-800"
              @click="logout"
            >
              <LogOut class="h-4 w-4" />
              Вийти
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Stats -->
      <div class="grid gap-4 sm:grid-cols-3 mb-8">
        <div v-for="stat in stats" :key="stat.label" class="rounded-2xl bg-white p-5 shadow-card dark:bg-stone-900">
          <div class="flex items-center justify-between mb-3">
            <p class="text-sm text-stone-500 dark:text-stone-400">{{ stat.label }}</p>
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-forest-100 dark:bg-forest-900">
              <component :is="stat.icon" class="h-4 w-4 text-forest-700 dark:text-forest-300" />
            </div>
          </div>
          <p class="font-serif text-3xl font-semibold text-forest-900 dark:text-forest-100">
            {{ stat.value }}
          </p>
        </div>
      </div>

      <!-- Reservations table -->
      <ReservationTable
        :reservations="store.reservations"
        :loading="store.loading"
        @refresh="store.fetchAllReservations()"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Leaf, LogOut, CalendarDays, Clock, TrendingUp } from 'lucide-vue-next'
import { isAfter } from 'date-fns'
import { useReservationStore } from '@/stores/reservations'
import { useAuthStore } from '@/stores/auth'
import ReservationTable from '@/components/admin/ReservationTable.vue'

const store = useReservationStore()
const auth = useAuthStore()
const router = useRouter()

const stats = computed(() => [
  {
    icon: CalendarDays,
    label: 'Усього записів',
    value: store.reservations.length,
  },
  {
    icon: Clock,
    label: 'Майбутні',
    value: store.reservations.filter(r => isAfter(new Date(r.startTime), new Date())).length,
  },
  {
    icon: TrendingUp,
    label: 'Цього місяця',
    value: store.reservations.filter(r => {
      const d = new Date(r.startTime)
      const now = new Date()
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length,
  },
])

function logout() {
  auth.logout()
  router.push('/admin/login')
}

onMounted(() => store.fetchAllReservations())
</script>

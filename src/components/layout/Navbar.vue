<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-soft dark:bg-stone-900/95'
        : 'bg-transparent',
    ]"
  >
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2.5 group">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-forest-700 shadow-md transition-transform duration-200 group-hover:scale-105">
            <Leaf class="h-5 w-5 text-white" />
          </div>
          <div>
            <span
              class="font-serif text-lg font-semibold transition-colors duration-300"
              :class="scrolled ? 'text-forest-900 dark:text-forest-100' : 'text-white'"
            >Nat</span>
            <span
              class="font-serif text-lg font-light transition-colors duration-300"
              :class="scrolled ? 'text-forest-600 dark:text-forest-300' : 'text-white/80'"
            > Massage</span>
          </div>
        </router-link>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-1">
          <router-link
            to="/"
            class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
            :class="scrolled
              ? 'text-stone-600 hover:bg-forest-50 hover:text-forest-700 dark:text-stone-300'
              : 'text-white hover:bg-white/10 hover:text-white'"
            active-class=""
          >
            Головна
          </router-link>

          <!-- Techniques dropdown — opens on hover -->
          <div
            class="relative"
            @mouseenter="techniquesOpen = true"
            @mouseleave="techniquesOpen = false"
          >
            <button
              class="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
              :class="scrolled
                ? 'text-stone-600 hover:bg-forest-50 hover:text-forest-700 dark:text-stone-300'
                : 'text-white hover:bg-white/10'"
            >
              Техніки
              <ChevronDown class="h-3 w-3 transition-transform duration-200" :class="techniquesOpen ? 'rotate-180' : ''" />
            </button>
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div
                v-if="techniquesOpen"
                class="absolute top-full left-0 mt-1 w-60 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-soft py-2 z-50"
              >
                <router-link
                  v-for="t in techniques"
                  :key="t.slug"
                  :to="`/techniques/${t.slug}`"
                  class="block px-4 py-2.5 text-sm text-stone-600 hover:bg-forest-50 hover:text-forest-700 dark:text-stone-300 dark:hover:bg-forest-950 dark:hover:text-forest-300 transition-colors"
                  @click="techniquesOpen = false"
                >
                  {{ t.title }}
                </router-link>
              </div>
            </transition>
          </div>

          <router-link
            to="/info"
            class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
            :class="scrolled
              ? 'text-stone-600 hover:bg-forest-50 hover:text-forest-700 dark:text-stone-300'
              : 'text-white hover:bg-white/10 hover:text-white'"
            active-class=""
          >
            Про масаж
          </router-link>

          <!-- Booking button -->
          <router-link to="/booking" class="ml-2">
            <button class="inline-flex items-center gap-2 rounded-full bg-forest-700 px-5 py-2 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-forest-800 hover:-translate-y-0.5">
              <CalendarDays class="h-4 w-4" />
              Записатися
            </button>
          </router-link>

          <!-- Dark mode toggle -->
          <button
            class="ml-1 rounded-full p-2 transition-colors"
            :class="scrolled
              ? 'text-stone-500 hover:bg-stone-100 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800'
              : 'text-white/70 hover:bg-white/10 hover:text-white'"
            @click="uiStore.toggleDarkMode()"
          >
            <Sun v-if="uiStore.darkMode" class="h-4 w-4" />
            <Moon v-else class="h-4 w-4" />
          </button>
        </div>

        <!-- Mobile menu button -->
        <button
          class="md:hidden rounded-full p-2 transition-colors"
          :class="scrolled
            ? 'text-stone-600 hover:bg-stone-100 dark:text-stone-300'
            : 'text-white hover:bg-white/10'"
          @click="mobileOpen = !mobileOpen"
        >
          <Menu v-if="!mobileOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden border-t border-stone-100 bg-white px-4 py-4 dark:border-stone-800 dark:bg-stone-900"
      >
        <div class="flex flex-col gap-1">
          <router-link
            to="/"
            class="rounded-xl px-4 py-3 text-sm font-medium text-stone-600 hover:bg-forest-50 hover:text-forest-700 dark:text-stone-300"
            @click="mobileOpen = false"
          >
            Головна
          </router-link>

          <router-link
            to="/info"
            class="rounded-xl px-4 py-3 text-sm font-medium text-stone-600 hover:bg-forest-50 hover:text-forest-700 dark:text-stone-300"
            @click="mobileOpen = false"
          >
            Про масаж
          </router-link>

          <!-- Mobile techniques list -->
          <div class="rounded-xl px-4 py-2">
            <p class="text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">Техніки</p>
            <div class="flex flex-col gap-0.5">
              <router-link
                v-for="t in techniques"
                :key="t.slug"
                :to="`/techniques/${t.slug}`"
                class="rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-forest-50 hover:text-forest-700 dark:text-stone-300"
                @click="mobileOpen = false"
              >
                {{ t.title }}
              </router-link>
            </div>
          </div>

          <router-link to="/booking" @click="mobileOpen = false">
            <button class="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
              <CalendarDays class="h-4 w-4" />
              Записатися на сеанс
            </button>
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'
import { Leaf, Menu, X, Sun, Moon, ChevronDown, CalendarDays } from 'lucide-vue-next'
import { useUiStore } from '@/stores/ui'
import { techniques } from '@/data/techniques'

const uiStore = useUiStore()
const mobileOpen = ref(false)
const techniquesOpen = ref(false)
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 20)
</script>

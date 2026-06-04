import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePreferredDark } from '@vueuse/core'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  message?: string
}

export const useUiStore = defineStore('ui', () => {
  const prefersDark = usePreferredDark()
  const darkMode = ref(localStorage.getItem('dark_mode') === 'true' ?? prefersDark.value)
  const toasts = ref<Toast[]>([])

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    localStorage.setItem('dark_mode', String(darkMode.value))
    applyDarkMode()
  }

  function applyDarkMode() {
    document.documentElement.classList.toggle('dark', darkMode.value)
  }

  function addToast(toast: Omit<Toast, 'id'>) {
    const id = Math.random().toString(36).slice(2)
    toasts.value.push({ ...toast, id })
    setTimeout(() => removeToast(id), 5000)
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  applyDarkMode()

  return { darkMode, toasts, toggleDarkMode, addToast, removeToast }
})

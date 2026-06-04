import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/lib/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('admin_token'))

  const isAuthenticated = computed(() => !!token.value)

  function setToken(t: string) {
    token.value = t
    localStorage.setItem('admin_token', t)
    api.defaults.headers.common['Authorization'] = `Bearer ${t}`
  }

  function clearToken() {
    token.value = null
    localStorage.removeItem('admin_token')
    delete api.defaults.headers.common['Authorization']
  }

  async function login(password: string) {
    const { data } = await api.post('/api/admin/login', { password })
    setToken(data.token)
    return data.token
  }

  function logout() {
    clearToken()
  }

  // Restore token on init
  if (token.value) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  return { token, isAuthenticated, login, logout }
})

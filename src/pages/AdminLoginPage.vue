<template>
  <div class="min-h-screen bg-gradient-to-br from-forest-950 to-forest-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-forest-700 shadow-hover">
          <Leaf class="h-8 w-8 text-white" />
        </div>
        <h1 class="font-serif text-2xl font-semibold text-white">Nat Massage</h1>
        <p class="text-forest-400 text-sm mt-1">Панель адміністратора</p>
      </div>

      <!-- Card -->
      <div class="rounded-3xl bg-white p-8 shadow-2xl dark:bg-stone-900">
        <h2 class="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 mb-6">Вхід</h2>

        <form @submit.prevent="onLogin" class="space-y-4">
          <div class="space-y-1.5">
            <Label for="password">Пароль</Label>
            <div class="relative">
              <Input
                id="password"
                v-model="password"
                :type="showPwd ? 'text' : 'password'"
                placeholder="••••••••"
                :class="error && 'border-red-400'"
                class="pr-10"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                @click="showPwd = !showPwd"
              >
                <Eye v-if="!showPwd" class="h-4 w-4" />
                <EyeOff v-else class="h-4 w-4" />
              </button>
            </div>
            <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full inline-flex items-center justify-center gap-2 rounded-full bg-forest-700 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-forest-800 disabled:opacity-60"
          >
            <Loader2 v-if="loading" class="h-4 w-4 animate-spin" />
            <LogIn v-else class="h-4 w-4" />
            {{ loading ? 'Вхід...' : 'Увійти' }}
          </button>
        </form>
      </div>

      <p class="text-center mt-6">
        <router-link to="/" class="text-xs text-forest-500 hover:text-forest-300 transition-colors">
          ← Повернутися на сайт
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Leaf, LogIn, Loader2, Eye, EyeOff } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const password = ref('')
const loading = ref(false)
const error = ref('')
const showPwd = ref(false)

async function onLogin() {
  if (!password.value) {
    error.value = 'Введіть пароль'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await auth.login(password.value)
    router.push('/admin')
  } catch {
    error.value = 'Невірний пароль'
  } finally {
    loading.value = false
  }
}
</script>

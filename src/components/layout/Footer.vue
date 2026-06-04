<template>
  <footer class="bg-forest-950 text-forest-200">
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-8 md:grid-cols-3">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2.5 mb-4">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-forest-700">
              <Leaf class="h-5 w-5 text-white" />
            </div>
            <span class="font-serif text-lg font-semibold text-white">Nat Massage</span>
          </div>
          <p class="text-sm text-forest-400 leading-relaxed">
            Індивідуальний терапевтичний масаж.<br />
            Полегшення болю, відновлення, баланс тіла.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Навігація</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-sm text-forest-400 hover:text-forest-200 transition-colors">Головна</router-link>
            </li>
            <li>
              <router-link to="/booking" class="text-sm text-forest-400 hover:text-forest-200 transition-colors">Запис на сеанс</router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Контакт</h4>
          <ul class="space-y-3">
            <li class="flex items-center gap-2 text-sm text-forest-400">
              <MapPin class="h-4 w-4 text-forest-600 shrink-0" />
              вул. Гетьмана, Біла Церква, Київська область, Україна, 09109
            </li>
            <li class="flex items-center gap-2 text-sm text-forest-400">
              <MessageSquare class="h-4 w-4 text-forest-600 shrink-0" />
              Telegram: @massage_balance
            </li>
            <li class="flex items-center gap-2 text-sm text-forest-400">
              <Phone class="h-4 w-4 text-forest-600 shrink-0" />
              Viber: +380 97 403 8443
            </li>
            <li class="flex items-center gap-2 text-sm text-forest-400">
              <Globe class="h-4 w-4 text-forest-600 shrink-0" />
              Facebook: massage.balance
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 border-t border-forest-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-forest-600">© {{ new Date().getFullYear() }} Nat Massage. Усі права захищені.</p>
        <p class="text-xs text-forest-700">Терапевтичний масаж · Україна</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Leaf, MapPin, MessageSquare, Phone, Globe } from 'lucide-vue-next'
</script>

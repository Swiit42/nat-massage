<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <div class="p-8">
      <!-- Header -->
      <div class="mb-6 pr-8">
        <div class="inline-flex items-center gap-2 rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-700 dark:bg-forest-900 dark:text-forest-300 mb-3">
          <CalendarDays class="h-3.5 w-3.5" />
          Підтвердження запису
        </div>
        <h2 class="font-serif text-2xl font-semibold text-forest-900 dark:text-forest-100">
          Запис на сеанс
        </h2>
        <p v-if="selectedSlot" class="text-sm text-stone-500 dark:text-stone-400 mt-1">
          {{ slotLabel }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="onSubmit" @keydown.enter="handleEnter" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <!-- First name -->
          <div class="space-y-1.5">
            <Label for="firstName">Ім'я *</Label>
            <Input
              id="firstName"
              v-model="firstName"
              placeholder="Іванко"
              :class="errors.firstName && 'border-red-400 focus-visible:ring-red-400'"
            />
            <p v-if="errors.firstName" class="text-xs text-red-500">{{ errors.firstName }}</p>
          </div>

          <!-- Last name -->
          <div class="space-y-1.5">
            <Label for="lastName">Прізвище *</Label>
            <Input
              id="lastName"
              v-model="lastName"
              placeholder="Петренко"
              :class="errors.lastName && 'border-red-400 focus-visible:ring-red-400'"
            />
            <p v-if="errors.lastName" class="text-xs text-red-500">{{ errors.lastName }}</p>
          </div>
        </div>

        <!-- Phone -->
        <div class="space-y-1.5">
          <Label for="phone">Телефон *</Label>
          <Input
            id="phone"
            v-model="phone"
            type="tel"
            placeholder="+1 (514) 000-0000"
            :class="errors.phone && 'border-red-400 focus-visible:ring-red-400'"
          />
          <p v-if="errors.phone" class="text-xs text-red-500">{{ errors.phone }}</p>
        </div>

        <!-- Email (optional) -->
        <div class="space-y-1.5">
          <Label for="email">Email <span class="text-stone-400 font-normal">(для підтвердження)</span></Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="email@example.com"
            :class="errors.email && 'border-red-400 focus-visible:ring-red-400'"
          />
          <p v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</p>
        </div>

        <!-- Message -->
        <div class="space-y-1.5">
          <Label for="message">Ваш біль або повідомлення</Label>
          <Textarea
            id="message"
            v-model="message"
            placeholder="Опишіть ваші болі або побажання..."
            rows="3"
          />
        </div>

        <!-- Submit -->
        <div class="flex gap-3 pt-2">
          <button
            type="button"
            class="flex-1 rounded-full border-2 border-stone-200 py-3 text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:text-stone-400"
            @click="$emit('update:open', false)"
          >
            Скасувати
          </button>
          <button
            type="submit"
            :disabled="store.loading"
            class="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-forest-700 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-forest-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Loader2 v-if="store.loading" class="h-4 w-4 animate-spin" />
            <CheckCircle2 v-else class="h-4 w-4" />
            {{ store.loading ? 'Записуємо...' : 'Підтвердити запис' }}
          </button>
        </div>
      </form>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { CalendarDays, Loader2, CheckCircle2 } from 'lucide-vue-next'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useReservationStore } from '@/stores/reservations'
import { useUiStore } from '@/stores/ui'

const props = defineProps<{
  open: boolean
  selectedSlot: { start: Date; end: Date } | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  success: []
}>()

const store = useReservationStore()
const uiStore = useUiStore()

const schema = toTypedSchema(
  z.object({
    firstName: z.string().min(2, 'Мінімум 2 символи'),
    lastName: z.string().min(2, 'Мінімум 2 символи'),
    phone: z.string().min(10, 'Введіть коректний номер'),
    email: z.string().email('Невірний email').optional().or(z.literal('')),
    message: z.string().optional(),
  })
)

const { defineField, handleSubmit, errors, resetForm } = useForm({ validationSchema: schema })

const [firstName] = defineField('firstName')
const [lastName] = defineField('lastName')
const [phone] = defineField('phone')
const [email] = defineField('email')
const [message] = defineField('message')

const slotLabel = computed(() => {
  if (!props.selectedSlot) return ''
  const { start, end } = props.selectedSlot
  const date = format(start, 'EEEE, d MMMM yyyy', { locale: uk })
  const startT = format(start, 'HH:mm')
  const endT = format(end, 'HH:mm')
  return `${date} · ${startT} — ${endT}`
})

function handleEnter(e: KeyboardEvent) {
  if ((e.target as HTMLElement).tagName !== 'TEXTAREA') {
    e.preventDefault()
    onSubmit()
  }
}

const onSubmit = handleSubmit(async (values) => {
  if (!props.selectedSlot) return

  try {
    await store.createReservation(
      { firstName: values.firstName, lastName: values.lastName, phone: values.phone, email: values.email || undefined, message: values.message },
      props.selectedSlot.start,
      props.selectedSlot.end
    )

    uiStore.addToast({
      type: 'success',
      title: 'Запис підтверджено!',
      message: `${values.firstName}, чекаємо вас ${format(props.selectedSlot.start, 'd MMMM', { locale: uk })} о ${format(props.selectedSlot.start, 'HH:mm')}`,
    })

    resetForm()
    emit('success')
    emit('update:open', false)
  } catch {
    uiStore.addToast({
      type: 'error',
      title: 'Помилка',
      message: store.error || 'Спробуйте ще раз',
    })
  }
})
</script>

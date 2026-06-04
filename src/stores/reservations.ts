import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/lib/api'
import type { Reservation, BookingFormData } from '@/types'

export const useReservationStore = defineStore('reservations', () => {
  const reservations = ref<Reservation[]>([])
  const bookedSlots = ref<{ startTime: string; endTime: string }[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchBookedSlots(from: Date, to: Date) {
    loading.value = true
    try {
      const { data } = await api.get('/api/reservations/slots', {
        params: {
          from: from.toISOString(),
          to: to.toISOString(),
        },
      })
      bookedSlots.value = data
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function createReservation(
    formData: BookingFormData,
    startTime: Date,
    endTime: Date
  ) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.post('/api/reservations', {
        ...formData,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      })
      return data as Reservation
    } catch (e: any) {
      const msg = e.response?.data?.error
      error.value = typeof msg === 'string' ? msg : 'Помилка при записі'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function fetchAllReservations() {
    loading.value = true
    try {
      const { data } = await api.get('/api/reservations')
      reservations.value = data
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function deleteReservation(id: string) {
    await api.delete(`/api/reservations/${id}`)
    reservations.value = reservations.value.filter(r => r.id !== id)
  }

  function isSlotBooked(start: Date, end: Date): boolean {
    return bookedSlots.value.some(slot => {
      const s = new Date(slot.startTime)
      const e = new Date(slot.endTime)
      return start < e && end > s
    })
  }

  return {
    reservations,
    bookedSlots,
    loading,
    error,
    fetchBookedSlots,
    createReservation,
    fetchAllReservations,
    deleteReservation,
    isSlotBooked,
  }
})

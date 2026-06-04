export interface Reservation {
  id: string
  firstName: string
  lastName: string
  phone: string
  message?: string | null
  startTime: string
  endTime: string
  createdAt: string
}

export interface TimeSlot {
  start: Date
  end: Date
  available: boolean
}

export interface BookingFormData {
  firstName: string
  lastName: string
  phone: string
  email?: string
  message?: string
}

export interface ApiError {
  error: string | Record<string, string[]>
}

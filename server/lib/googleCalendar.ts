import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  keyFile: './server/service_key_google.json',
  scopes: ['https://www.googleapis.com/auth/calendar'],
})

const calendar = google.calendar({ version: 'v3', auth })

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'nat.massage.pro@gmail.com'

export async function createCalendarEvent(data: {
  firstName: string
  lastName: string
  phone: string
  message?: string | null
  startTime: Date
  endTime: Date
}) {
  const event = {
    summary: `Масаж — ${data.firstName} ${data.lastName}`,
    description: [
      `Клієнт: ${data.firstName} ${data.lastName}`,
      `Телефон: ${data.phone}`,
      data.message ? `Повідомлення: ${data.message}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
    start: { dateTime: data.startTime.toISOString(), timeZone: 'Europe/Kiev' },
    end: { dateTime: data.endTime.toISOString(), timeZone: 'Europe/Kiev' },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 30 },
        { method: 'email', minutes: 60 },
      ],
    },
  }

  const result = await calendar.events.insert({ calendarId: CALENDAR_ID, requestBody: event })
  console.log('[Google Calendar] Événement créé :', result.data.htmlLink)
  return result.data
}

export async function deleteCalendarEvent(eventId: string) {
  await calendar.events.delete({ calendarId: CALENDAR_ID, eventId })
  console.log('[Google Calendar] Événement supprimé :', eventId)
}

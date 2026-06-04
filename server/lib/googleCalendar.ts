import { google } from 'googleapis'

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'nat.massage.pro@gmail.com'

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  console.log('[Google Calendar] Auth mode:', email ? 'ENV_VARS' : 'KEY_FILE')
  console.log('[Google Calendar] Service email:', email || 'NON DÉFINI')
  console.log('[Google Calendar] Private key présente:', !!key)
  console.log('[Google Calendar] Calendar ID:', CALENDAR_ID)

  if (email && key) {
    return new google.auth.JWT({
      email,
      key,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    })
  }

  console.warn('[Google Calendar] ⚠️ Vars manquantes — tentative fichier local')
  return new google.auth.GoogleAuth({
    keyFile: './server/service_key_google.json',
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })
}

export async function createCalendarEvent(data: {
  firstName: string
  lastName: string
  phone: string
  message?: string | null
  startTime: Date
  endTime: Date
}) {
  console.log('[Google Calendar] createCalendarEvent appelé pour:', data.firstName, data.lastName)
  try {
    const auth = getAuth()
    const calendar = google.calendar({ version: 'v3', auth })

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

    console.log('[Google Calendar] Envoi vers agenda:', CALENDAR_ID)
    const result = await calendar.events.insert({ calendarId: CALENDAR_ID, requestBody: event })
    console.log('[Google Calendar] ✅ Événement créé :', result.data.htmlLink)
    return result.data
  } catch (err: any) {
    console.error('[Google Calendar] ❌ Erreur:', err?.message)
    console.error('[Google Calendar] Détails:', err?.response?.data || err)
    throw err
  }
}

export async function deleteCalendarEvent(eventId: string) {
  try {
    const auth = getAuth()
    const calendar = google.calendar({ version: 'v3', auth })
    await calendar.events.delete({ calendarId: CALENDAR_ID, eventId })
    console.log('[Google Calendar] ✅ Événement supprimé :', eventId)
  } catch (err: any) {
    console.error('[Google Calendar] ❌ Erreur suppression:', err?.message)
    throw err
  }
}

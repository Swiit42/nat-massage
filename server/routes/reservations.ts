import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { sendEmail, buildConfirmationEmail } from '../lib/email.js'
import { createCalendarEvent } from '../lib/googleCalendar.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const prisma = new PrismaClient()

const reservationSchema = z.object({
  firstName: z.string().min(2, 'Мінімум 2 символи'),
  lastName: z.string().min(2, 'Мінімум 2 символи'),
  phone: z.string().min(10, 'Введіть коректний номер телефону'),
  message: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
})

// GET /api/reservations — liste des réservations (admin)
router.get('/', requireAuth, async (_req, res) => {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { startTime: 'asc' },
    })
    res.json(reservations)
  } catch (err) {
    res.status(500).json({ error: 'Помилка сервера' })
  }
})

// GET /api/reservations/slots?from=ISO&to=ISO — créneaux réservés (public)
router.get('/slots', async (req, res) => {
  try {
    const from = req.query.from as string
    const to = req.query.to as string

    if (!from || !to) {
      return res.status(400).json({ error: 'from et to sont requis' })
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        startTime: { gte: new Date(from) },
        endTime: { lte: new Date(to) },
      },
      select: { startTime: true, endTime: true },
    })

    res.json(reservations)
  } catch (err) {
    res.status(500).json({ error: 'Помилка сервера' })
  }
})

// POST /api/reservations — créer une réservation
router.post('/', async (req, res) => {
  const result = reservationSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten().fieldErrors })
  }

  const { firstName, lastName, phone, message, startTime, endTime } = result.data
  const start = new Date(startTime)
  const end = new Date(endTime)

  // Check chevauchement
  const conflict = await prisma.reservation.findFirst({
    where: {
      OR: [
        { startTime: { lt: end }, endTime: { gt: start } },
      ],
    },
  })

  if (conflict) {
    return res.status(409).json({ error: 'Цей час вже зайнятий. Будь ласка, оберіть інший.' })
  }

  try {
    const reservation = await prisma.reservation.create({
      data: { firstName, lastName, phone, message, startTime: start, endTime: end },
    })

    // Email de confirmation au client (si email disponible dans request)
    const clientEmail = (req.body as any).email
    if (clientEmail) {
      const { subject, html } = buildConfirmationEmail({ firstName, lastName, startTime: start, endTime: end })
      sendEmail({ to: clientEmail, subject, html }).catch(console.error)
    }

    // Email notification au praticien
    if (process.env.EMAIL_USER) {
      const { subject, html } = buildConfirmationEmail({ firstName, lastName, startTime: start, endTime: end })
      sendEmail({ to: process.env.EMAIL_USER, subject: `[Новий запис] ${subject}`, html }).catch(console.error)
    }

    // Google Calendar
    console.log('[Google Calendar] Appel createCalendarEvent pour', firstName, lastName)
    createCalendarEvent({ firstName, lastName, phone, message, startTime: start, endTime: end })
      .then((ev) => { if (ev) console.log('[Google Calendar] OK :', ev.htmlLink) })
      .catch((err) => console.error('[Google Calendar] ERREUR :', err?.message || err))

    res.status(201).json(reservation)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Помилка сервера' })
  }
})

// DELETE /api/reservations/:id — supprimer (admin)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.reservation.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch {
    res.status(404).json({ error: 'Запис не знайдено' })
  }
})

export default router

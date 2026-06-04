import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { signToken } from '../middleware/auth.js'
import { createCalendarEvent } from '../lib/googleCalendar.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'nat_massage_secret'

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { password } = req.body as { password: string }

  if (!password) {
    return res.status(400).json({ error: 'Введіть пароль' })
  }

  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  let valid = false
  if (adminPassword.startsWith('$2')) {
    valid = await bcrypt.compare(password, adminPassword)
  } else {
    valid = password === adminPassword
  }

  if (!valid) {
    return res.status(401).json({ error: 'Невірний пароль' })
  }

  const token = signToken({ role: 'admin' })
  res.json({ token })
})

// POST /api/admin/verify — verify token validity
router.post('/verify', (req, res) => {
  const { token } = req.body as { token: string }
  if (!token) return res.status(400).json({ valid: false })
  try {
    jwt.verify(token, JWT_SECRET)
    res.json({ valid: true })
  } catch {
    res.status(401).json({ valid: false })
  }
})

// GET /api/admin/test-calendar — teste la connexion Google Calendar
router.get('/test-calendar', async (_req, res) => {
  try {
    const now = new Date()
    const end = new Date(now.getTime() + 60 * 60 * 1000)
    const result = await createCalendarEvent({
      firstName: 'Test',
      lastName: 'Réservation',
      phone: '+380000000000',
      message: 'Événement de test depuis le serveur',
      startTime: now,
      endTime: end,
    })
    if (result) {
      res.json({ success: true, link: result.htmlLink })
    } else {
      res.status(500).json({ success: false, error: 'createCalendarEvent a retourné null — voir logs serveur' })
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || String(err) })
  }
})

export default router

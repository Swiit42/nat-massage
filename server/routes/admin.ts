import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { signToken } from '../middleware/auth.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'nat_massage_secret'

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

export default router

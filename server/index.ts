import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import reservationsRouter from './routes/reservations.js'
import adminRouter from './routes/admin.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://swiit42.github.io',
    'https://nat-massage-production.up.railway.app',
  ],
  credentials: true,
}))
app.use(express.json())

app.use('/api/reservations', reservationsRouter)
app.use('/api/admin', adminRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`\n🌿 Nat Massage Server running on 0.0.0.0:${PORT}`)
  console.log(`   API: http://localhost:${PORT}/api/health\n`)
})

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import reservationsRouter from './routes/reservations.js'
import adminRouter from './routes/admin.js'

const app = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://swiit42.github.io']
  : ['http://localhost:5173']

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())

app.use('/api/reservations', reservationsRouter)
app.use('/api/admin', adminRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`\n🌿 Nat Massage Server running on http://localhost:${PORT}`)
  console.log(`   API: http://localhost:${PORT}/api/health\n`)
})

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('[Email] Credentials not configured, skipping email send')
    return
  }

  await transporter.sendMail({
    from: `"Nat Massage" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  })
}

export function buildConfirmationEmail(data: {
  firstName: string
  lastName: string
  startTime: Date
  endTime: Date
}) {
  const dateStr = new Intl.DateTimeFormat('uk-UA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(data.startTime)

  const startStr = new Intl.DateTimeFormat('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(data.startTime)

  const endStr = new Intl.DateTimeFormat('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(data.endTime)

  return {
    subject: `Підтвердження запису — ${dateStr}`,
    html: `
      <!DOCTYPE html>
      <html lang="uk">
      <head>
        <meta charset="UTF-8"/>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background: #faf8f3; margin: 0; padding: 20px; }
          .container { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #1a3a19 0%, #2d5c23 100%); padding: 40px 32px; text-align: center; }
          .header h1 { color: #faf3e0; margin: 0; font-size: 24px; font-weight: 600; }
          .header p { color: #b9dfaa; margin: 8px 0 0; font-size: 14px; }
          .body { padding: 32px; }
          .greeting { font-size: 18px; color: #244920; font-weight: 600; margin-bottom: 16px; }
          .card { background: #f0f7ec; border-radius: 12px; padding: 20px 24px; margin: 20px 0; border-left: 4px solid #2d5c23; }
          .card p { margin: 6px 0; color: #38742b; font-size: 15px; }
          .card .label { font-weight: 600; color: #1a3a19; }
          .cta { text-align: center; margin-top: 28px; }
          .cta p { color: #6b7280; font-size: 14px; }
          .footer { background: #f5f0e6; padding: 20px 32px; text-align: center; }
          .footer p { color: #9ca3af; font-size: 12px; margin: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌿 Nat Massage</h1>
            <p>Терапевтичний масаж</p>
          </div>
          <div class="body">
            <p class="greeting">Вітаємо, ${data.firstName} ${data.lastName}!</p>
            <p style="color:#4b5563;">Ваш запис підтверджено. Чекаємо на вас!</p>
            <div class="card">
              <p><span class="label">📅 Дата:</span> ${dateStr}</p>
              <p><span class="label">🕐 Час:</span> ${startStr} — ${endStr}</p>
              <p><span class="label">📍 Адреса:</span> Монреаль, Квебек</p>
            </div>
            <div class="cta">
              <p>Якщо вам потрібно перенести або скасувати запис, будь ласка, зв'яжіться з нами заздалегідь.</p>
            </div>
          </div>
          <div class="footer">
            <p>© 2024 Nat Massage · Терапевтичний масаж · Монреаль</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }
}

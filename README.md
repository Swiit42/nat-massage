# 🌿 Nat Massage — Сайт терапевтичного масажу

Site web moderne pour un cabinet de massage thérapeutique ukrainien.

## Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **Styles**: TailwindCSS + shadcn-vue (composants intégrés)
- **State**: Pinia
- **Router**: Vue Router
- **Validation**: VeeValidate + Zod
- **Utilitaires**: VueUse, date-fns, lucide-vue-next
- **Backend**: Express.js + TypeScript
- **Database**: Prisma + SQLite
- **Email**: Nodemailer (Gmail)
- **Calendar**: Google Calendar API

---

## Installation rapide

### 1. Cloner et installer les dépendances

```bash
cd nat_massage
npm install
```

### 2. Configuration de l'environnement

```bash
cp .env.example .env
```

Éditez `.env` avec vos valeurs :

```env
# Admin (passe pour accéder à /admin)
ADMIN_PASSWORD=votre_mot_de_passe
JWT_SECRET=une_clé_secrète_longue_et_aléatoire

# Email (Gmail SMTP)
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=votre_app_password_gmail  # Mot de passe d'application Gmail

# Google Calendar (optionnel)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_CALENDAR_ID=primary
```

### 3. Base de données

```bash
npm run prisma:migrate
```

### 4. Lancer le projet

```bash
npm run dev
```

- **Site**: http://localhost:5173
- **API**: http://localhost:3001
- **Admin**: http://localhost:5173/admin (mot de passe: voir `.env`)

---

## Configuration Gmail

1. Activer la vérification en 2 étapes sur votre compte Google
2. Aller dans "Compte Google > Sécurité > Mots de passe des applications"
3. Créer un mot de passe pour "Autre (nom personnalisé)" → "Nat Massage"
4. Copier le mot de passe généré dans `EMAIL_PASS`

---

## Configuration Google Calendar

1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Créer un nouveau projet
3. Activer l'API Google Calendar
4. Créer des identifiants OAuth 2.0 (application de bureau)
5. Télécharger les credentials et obtenir le refresh token via OAuth playground

### Obtenir le Refresh Token

```bash
# Utiliser Google OAuth Playground: https://developers.google.com/oauthplayground
# Scope: https://www.googleapis.com/auth/calendar
# Échanger le code d'autorisation → copier le refresh_token
```

---

## Structure du projet

```
nat_massage/
├── prisma/
│   └── schema.prisma          # Modèle de base de données
├── server/
│   ├── index.ts               # Serveur Express
│   ├── routes/
│   │   ├── reservations.ts    # CRUD réservations
│   │   └── admin.ts           # Auth admin
│   ├── middleware/
│   │   └── auth.ts            # JWT middleware
│   └── lib/
│       ├── email.ts           # Nodemailer
│       └── googleCalendar.ts  # Google Calendar API
└── src/
    ├── components/
    │   ├── ui/                # Composants UI (shadcn-style)
    │   ├── layout/            # Navbar, Footer
    │   ├── home/              # Sections de la page d'accueil
    │   ├── booking/           # Calendrier + Modal de réservation
    │   └── admin/             # Table des réservations
    ├── pages/                 # Pages Vue
    ├── stores/                # Pinia stores
    ├── router/                # Vue Router
    └── types/                 # TypeScript types
```

---

## Pages

| URL | Description |
|-----|-------------|
| `/` | Page d'accueil (hero, services, douleurs, CTA) |
| `/booking` | Calendrier de réservation (style Calendly) |
| `/admin` | Panel admin (protégé par JWT) |
| `/admin/login` | Connexion admin |

---

## API Endpoints

| Méthode | URL | Auth | Description |
|---------|-----|------|-------------|
| `GET` | `/api/reservations/slots?from=&to=` | Non | Créneaux réservés |
| `POST` | `/api/reservations` | Non | Créer une réservation |
| `GET` | `/api/reservations` | Admin | Toutes les réservations |
| `DELETE` | `/api/reservations/:id` | Admin | Supprimer une réservation |
| `POST` | `/api/admin/login` | Non | Connexion admin |

---

## Scripts

```bash
npm run dev              # Lancer frontend + backend
npm run dev:client       # Frontend seul (port 5173)
npm run dev:server       # Backend seul (port 3001)
npm run build            # Build de production
npm run prisma:migrate   # Créer/migrer la DB
npm run prisma:generate  # Régénérer le client Prisma
npm run prisma:studio    # Ouvrir Prisma Studio
```

---

## Dark Mode

Le site supporte le mode sombre. Le bouton bascule est dans la navbar (icône lune/soleil).

---

## Déploiement

Pour la production, construire le frontend et servir les fichiers statiques via Express :

```bash
npm run build
NODE_ENV=production node server/index.js
```

Ou utiliser des services comme:
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, Fly.io
- **Database**: PlanetScale (MySQL) au lieu de SQLite

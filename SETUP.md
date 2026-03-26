# Jefte Portfolio — Setup Guide

## Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)
- Gmail account with App Password enabled

---

## 1. Clone & Install

```bash
# From project root:
npm run install:all
```

---

## 2. Backend Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in:

```env
PORT=5000
MONGODB_URI=mongodb+srv://...        # Your MongoDB Atlas URI
JWT_SECRET=a-long-random-string      # Generate with: openssl rand -base64 64
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-gmail-app-password   # From Google Account > App Passwords
EMAIL_FROM=Jefte <your@gmail.com>
ADMIN_EMAIL=jefte@yourdomain.com     # Where booking notifications go
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL_LOGIN=admin@jefte.com
ADMIN_PASSWORD=your-secure-password
```

---

## 3. Frontend Environment Variables

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=+27000000000
VITE_INSTAGRAM_URL=https://instagram.com/yourhandle
VITE_YOUTUBE_URL=https://youtube.com/@yourchannel
```

---

## 4. Create Admin Account (First Time Only)

Start the backend, then run:

```bash
curl -X POST http://localhost:5000/api/auth/setup
```

This creates the admin using `ADMIN_EMAIL_LOGIN` and `ADMIN_PASSWORD` from your `.env`.
This endpoint is disabled once an admin exists.

---

## 5. Run in Development

```bash
# From project root — starts both frontend and backend:
npm run dev

# Frontend: http://localhost:5173
# Backend:  http://localhost:5000
# Admin:    http://localhost:5173/admin
```

---

## 6. Add Your Content

### Via Admin Dashboard (recommended):
1. Go to `http://localhost:5173/admin`
2. Log in with your admin credentials
3. Navigate to **Portfolio** → **Add Item**
4. Upload images/videos directly — they go to Cloudinary automatically

### Add Highlight Reel:
In `frontend/src/pages/Home.jsx`, find the comment:
```js
// Replace this div with: <ReactPlayer url="YOUR_REEL_URL" .../>
```
Replace with your YouTube/Vimeo URL.

### Add Your Photo:
In `frontend/src/pages/About.jsx`, find:
```jsx
<p className="text-mist ...">[ Professional Photo ]</p>
```
Replace with an `<img>` tag pointing to your photo.

---

## 7. Customise Content

| File | What to change |
|------|---------------|
| `frontend/src/pages/Home.jsx` | Hero text, reel URL |
| `frontend/src/pages/About.jsx` | Bio, timeline, photo |
| `frontend/src/pages/Services.jsx` | Services, pricing |
| `frontend/src/components/layout/Footer.jsx` | Social links |
| `frontend/src/components/sections/StatsBar.jsx` | Your stats |
| `frontend/tailwind.config.js` | Brand colours |

---

## 8. Production Deployment

### Backend (Railway / Render / Fly.io):
1. Set all env vars from `backend/.env.example`
2. Set `NODE_ENV=production`
3. Set `FRONTEND_URL=https://yourdomain.com`

### Frontend (Vercel / Netlify):
1. Build command: `npm run build`
2. Output dir: `dist`
3. Set `VITE_API_URL=https://your-backend-url.com/api`
4. Add `_redirects` file to `frontend/public`:
   ```
   /*  /index.html  200
   ```

---

## Project Structure

```
jefte-portfolio/
├── backend/
│   ├── config/        # DB, Cloudinary setup
│   ├── middleware/    # JWT auth
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── utils/         # Email helpers
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── layout/    # Navbar, Footer, AdminLayout
│       │   ├── sections/  # Homepage sections
│       │   └── ui/        # Shared components
│       ├── context/       # Auth context
│       ├── pages/         # All pages + admin pages
│       └── utils/         # Axios API client
└── package.json
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | — | Admin login |
| GET | `/api/auth/me` | ✓ | Current user |
| GET | `/api/portfolio` | — | All published items |
| GET | `/api/portfolio/featured` | — | Featured items |
| POST | `/api/portfolio` | ✓ | Add item + upload |
| PUT | `/api/portfolio/:id` | ✓ | Edit item |
| DELETE | `/api/portfolio/:id` | ✓ | Delete + Cloudinary cleanup |
| POST | `/api/bookings` | — | Submit booking (sends emails) |
| GET | `/api/bookings` | ✓ | View all bookings |
| PUT | `/api/bookings/:id` | ✓ | Update booking status |
| POST | `/api/quotes` | — | Submit quote request |
| GET | `/api/quotes` | ✓ | View all quotes |
| POST | `/api/contact` | — | Send contact message |
| GET | `/api/admin/stats` | ✓ | Dashboard stats |

---

## WhatsApp Integration

The WhatsApp button is already wired up in Services and Booking pages.
Just set your number in `frontend/.env`:
```
VITE_WHATSAPP_NUMBER=+27820000000
```

It opens a pre-filled WhatsApp message directly.

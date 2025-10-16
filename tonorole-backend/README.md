# Tô no Rolê - Backend (file-based)

This backend uses a simple JSON file as storage (no Mongo). Ready to deploy on Render.

## Setup

1. Copy `.env.example` to `.env` and edit:
   - `JWT_SECRET` — change to a secure random string
   - `PORT` (optional)
   - `FRONTEND_URL` (optional)

2. Install and run:
   ```
   npm install
   npm start
   ```

## Endpoints

- POST /api/auth/register { name, email, password } -> { user, token }
- POST /api/auth/login { email, password } -> { user, token }
- GET /api/events
- POST /api/events (protected — Authorization: Bearer <token>)
- POST /api/tickets { eventId, buyerName }

## Notes
- This is a simple implementation for quick deployment when you don't want Mongo. For production you should use a proper DB.

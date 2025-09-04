# Bookotel
Live - https://bookotel.vercel.app/

Hotel booking platform built with MERN stack, featuring seamless room reservations, real-time availability checks and secure payment processing.

## Tech Stack
- Frontend: React + Vite, Tailwind CSS
- Backend: Express (Node.js), Mongoose (MongoDB)
- Auth: Clerk
- Payments: Stripe
- Caching: Upstash Redis (optional, env‑toggled)

## Project Structure
```
bookotel/
├── client/     # React frontend
└── server/     # Express API
```

## Development
1. Install dependencies:
```bash
cd client && npm install
cd ../server && npm install
```

2. Start the services:
```bash
# Terminal 1 - Backend
cd server && npm start

# Terminal 2 - Frontend
cd client && npm run dev
```


## Notes
- The app can run without Redis. To enable caching in production, set these on the backend:
  - `ENABLE_CACHE=true`, `REDIS_URL`, `REDIS_TOKEN`
- Frontend (vercel) connects to the backend via `VITE_BACKEND_URL`(render).

See `client/README.md` and `server/README.md` for details.

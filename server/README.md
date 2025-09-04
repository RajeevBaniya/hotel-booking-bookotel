# Bookotel Server

Express backend API for the Bookotel hotel booking application.

## Environment Variables
```env
PORT=3001
MONGODB_URI=your_uri
STRIPE_SECRET_KEY=your_key
STRIPE_WEBHOOK_SECRET=your_key
CLERK_WEBHOOK_SECRET=your_key
SENDER_EMAIL=...
SENDER_PASS=...

# caching - Upstash Redis
ENABLE_CACHE=true
REDIS_URL=https://your-upstash-rest-url
REDIS_TOKEN=your-upstash-rest-token
```

## Quick Start
```bash
npm install
npm start
```

## Caching 
- Read through cache for `GET /api/rooms` and `GET /api/cities` using Upstash Redis.
- Enable by setting `ENABLE_CACHE=true` and providing `REDIS_URL` and `REDIS_TOKEN`.
- Cache TTLs: rooms 120s, cities 6h. Cache is invalidated on writes.

## Webhooks
- Stripe: POST /api/stripe (checkout.session.completed)
- Clerk: POST /api/clerk (user events)

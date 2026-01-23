# Bookotel Server

Express backend API for the Bookotel hotel booking application.

## Environment Variables
```env
PORT=3001
MONGODB_URI=your_uri
STRIPE_SECRET_KEY=your_key
STRIPE_WEBHOOK_SECRET=your_key
CLERK_WEBHOOK_SECRET=your_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_REDIRECT_URI=your_redirect_uri
GMAIL_USER_EMAIL=your_gmail_address@gmail.com

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

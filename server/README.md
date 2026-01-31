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

# caching - Redis
ENABLE_CACHE=true
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
```

## Quick Start
```bash
npm install
npm start
```


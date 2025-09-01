import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import cityRouter from "./routes/cityRoutes.js";
import bodyParser from "body-parser";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

console.log("All imports loaded successfully");
console.log("Environment check:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Set" : "Missing");
console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY ? "Set" : "Missing");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Missing");

// Initialize services (Cloudinary does internal caching; safe to call)
console.log("Initializing Cloudinary...");
connectCloudinary();
console.log("Cloudinary initialized");

// Initialize predefined cities
import { initializePredefinedCities } from "./controllers/cityController.js";

const app = express();
// CORS configuration for production and development
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? allowedOrigins
      : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
};
app.use(cors(corsOptions));

// api to listen to stripe webhooks
app.post('/api/stripe', express.raw({type: "application/json"}), stripeWebhooks);


// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// Ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    // Initialize predefined cities on first request
    if (!global.citiesInitialized) {
      await initializePredefinedCities();
      global.citiesInitialized = true;
    }

    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});

// API to listen to Clerk Webhooks
app.post("/api/clerk", bodyParser.raw({ type: "*/*" }), clerkWebhooks);

app.get("/", (req, res) => res.send("API is running"));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/cities", cityRouter);

// Export for Vercel serverless
export default app;

// Enable local development with `node server.js`
// Don't start server on Vercel (serverless), but do start on Render and local
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  console.log("Starting server on port:", PORT);
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
} else {
  console.log(" Vercel detected - skipping app.listen");
}

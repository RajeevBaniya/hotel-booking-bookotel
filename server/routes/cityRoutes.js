import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllCities, addCity, resetCities } from "../controllers/cityController.js";

const cityRouter = express.Router();

// Public route to get all cities
cityRouter.get("/", getAllCities);

// Protected route to add new city (only authenticated users)
cityRouter.post("/", protect, addCity);

// Reset cities (for testing - remove in production)
cityRouter.post("/reset", resetCities);

export default cityRouter;

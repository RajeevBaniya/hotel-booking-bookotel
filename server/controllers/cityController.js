import City from "../models/City.js";
import { getJSON, setJSON, del, isCacheEnabled } from "../utils/cache.js";

// Get all cities
export const getAllCities = async (req, res) => {
  try {
    const cacheKey = "cities:all";
    const cached = await getJSON(cacheKey);
    if (cached) {
      return res.json({ success: true, cities: cached });
    }
    const cities = await City.find().sort({ name: 1 });
    const names = cities.map(city => city.name);
    await setJSON(cacheKey, names, 21600); // 6 hours
    res.json({ success: true, cities: names });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add new city
export const addCity = async (req, res) => {
  try {
    const { name } = req.body;
    const { userId } = req.auth();

    if (!name || name.trim() === "") {
      return res.json({ success: false, message: "City name is required" });
    }

    // Check if city already exists
    const existingCity = await City.findOne({ 
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } 
    });

    if (existingCity) {
      return res.json({ success: false, message: "City already exists" });
    }

    // Create new city
    const newCity = await City.create({
      name: name.trim(),
      addedBy: userId,
      isPredefined: false
    });

    if (isCacheEnabled()) {
      await del("cities:all");
    }

    res.json({ 
      success: true, 
      message: "City added successfully",
      city: newCity
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Reset cities to predefined list (for testing)
export const resetCities = async (req, res) => {
  try {
    await City.deleteMany({});
    
    const predefinedCities = [
      "Dubai",
      "Singapore", 
      "New York",
      "Paris",
      "Tokyo",
      "Sydney",
      "Mumbai"
    ];

    for (const cityName of predefinedCities) {
      await City.create({
        name: cityName,
        isPredefined: true
      });
    }
    if (isCacheEnabled()) {
      await del("cities:all");
    }
    
    res.json({ success: true, message: "Cities reset successfully", cities: predefinedCities });
  } catch (error) {
    console.error("Error resetting cities:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Initialize predefined cities (run once)
export const initializePredefinedCities = async () => {
  try {
    const predefinedCities = [
      "Dubai",
      "Singapore", 
      "New York",
      "Paris",
      "Tokyo",
      "Sydney",
      "Mumbai"
    ];

    // If collection already has cities, assume initialized
    const existingCount = await City.estimatedDocumentCount();
    if (existingCount > 0) {
      return;
    }

    // Idempotent upserts to avoid duplicates on concurrent runs
    const operations = predefinedCities.map((cityName) => ({
      updateOne: {
        filter: { name: cityName },
        update: {
          $setOnInsert: { name: cityName, isPredefined: true },
        },
        upsert: true,
      },
    }));

    await City.bulkWrite(operations, { ordered: false });
    console.log("Predefined cities initialized");
  } catch (error) {
    // Ignore duplicate errors from concurrent upserts
    if (error && error.code === 11000) {
      console.log("Cities already initialized (duplicate key)");
      return;
    }
    console.error("Error initializing predefined cities:", error.message);
  }
};

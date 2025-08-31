import City from "../models/City.js";

// Get all cities
export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find().sort({ name: 1 });
    res.json({ success: true, cities: cities.map(city => city.name) });
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
    
    res.json({ success: true, message: "Cities reset successfully", cities: predefinedCities });
  } catch (error) {
    console.error("❌ Error resetting cities:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Initialize predefined cities (run once)
export const initializePredefinedCities = async () => {
  try {
    // First, remove any existing cities to start fresh
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
    
    console.log("✅ Predefined cities initialized");
  } catch (error) {
    console.error("❌ Error initializing predefined cities:", error.message);
  }
};

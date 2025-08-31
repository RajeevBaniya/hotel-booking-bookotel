import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    addedBy: { type: String, ref: "User" }, // Track who added the city
    isPredefined: { type: Boolean, default: false }, // Distinguish predefined vs user-added cities
  },
  { timestamps: true }
);

const City = mongoose.model("City", citySchema);

export default City;

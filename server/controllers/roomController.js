import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";
import { getJSON, setJSON, del, isCacheEnabled } from "../utils/cache.js";

//  Api to create a new room for a hotel
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth().userId });

    if (!hotel) return res.json({ success: false, message: "Hotel not found" });

    // Upload image to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    // wait for all images to be uploaded
    const images = await Promise.all(uploadImages);

    // Create room
    const room = await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });
    // Invalidate rooms cache
    if (isCacheEnabled()) {
      await del("rooms:all");
    }
    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all rooms
export const getRooms = async (req, res) => {
  try {
    // Try cache first
    let cached = await getJSON("rooms:all");
    if (cached) {
      return res.json({ success: true, rooms: cached });
    }

    const rooms = await Room.find({ isAvailable: true })
      .select('roomType pricePerNight amenities images hotel createdAt')
      .populate({
        path: "hotel",
        select: "name address city",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 })
      .lean();
    // Cache the result with longer TTL for better performance
    await setJSON("rooms:all", rooms, 300);
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all rooms for specific hotel
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth().userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel"
    );
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    if (isCacheEnabled()) {
      await del("rooms:all");
    }
    res.json({ success: true, message: "Room availability Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

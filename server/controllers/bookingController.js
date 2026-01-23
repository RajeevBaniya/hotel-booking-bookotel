import { sendEmail } from "../services/email.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
import stripe from "stripe";

// Function to check Avaialability of Room
const checkAvailability = async (checkInDate, checkOutDate, room) => {
  try {
    // Convert string dates to Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOut },
      checkOutDate: { $gte: checkIn },
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.error(error.message);
    return false; // Return false if there's an error
  }
};

// API to check Avaialability of Room
// POST /api/booking/check-availability

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;

    const isAvailable = await checkAvailability(
      checkInDate,
      checkOutDate,
      room
    );

    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to create a new Booking
// POST /api/bookings/book

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const { userId } = req.auth();
    
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }
    
    // Ensure user exists in database
    let user = await User.findById(userId);
    if (!user) {
      // User doesn't exist in our DB yet - webhook may not have fired
      // Wait a moment and retry once
      console.log("⏳ User not found, waiting for webhook to sync:", userId);
      await new Promise(resolve => setTimeout(resolve, 2000));
      user = await User.findById(userId);
      
      if (!user) {
        console.error("❌ User still not found after waiting:", userId);
        return res.json({ 
          success: false, 
          message: "User account not synced yet. Please try again in a moment." 
        });
      }
    }
    
    const userIdForBooking = user._id;
    // checking availability before booking
    const isAvailable = await checkAvailability(
      checkInDate,
      checkOutDate,
      room
    );
    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }
    // Getting totalprice for room
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;

    //  Calculate totalPrice based on nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    totalPrice *= nights;
    const booking = await Booking.create({
      user: userIdForBooking,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    const emailHtml = `
      <h2>Your Booking Details</h2>
      <p>Dear ${user.username},</p>
      <p>Thank you for choosing us. Here are your booking details:</p>
      <ul>
        <li><strong>Booking ID:</strong> ${booking._id}</li>
        <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
        <li><strong>Location:</strong> ${roomData.hotel.address}</li>
        <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}</li>
        <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || "$"} ${
      booking.totalPrice
    } /night</li>
      </ul>
      <p>We look forward to welcoming you!</p>
      <p>if you need to make any changes, feel free to contact us.</p>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Hotel Booking Details",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError.message);
      // Don't fail the booking if email fails
    }

    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to create booking" });
  }
};

// API to get all bookings for a user
// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.auth();
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }
    
    const bookings = await Booking.find({ user: userId })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log("Error fetching user bookings:", error.message);
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth().userId });
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });
    // Total Bookings
    const totalBookings = bookings.length;
    // Total Revenue
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

export const stripePayment  = async (req, res) => {
  try {
    const { bookingId } = req.body;
    
    const booking = await Booking.findById(bookingId);
    const roomData = await Room.findById(booking.room).populate('hotel');
    const totalPrice = booking.totalPrice;
    const { origin } = req.headers;

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [
      {
        price_data:{
          currency: "usd",
          product_data:{
            name: roomData.hotel.name,
          },
          unit_amount: totalPrice * 100
        },
        quantity: 1,
      }
    ]
    // to create checkout session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      metadata: {
        bookingId,
      },
      payment_intent_data: {
        metadata: {
          bookingId,
        }
      }
    })
    res.json({success: true, url: session.url})

  } catch (error) {
    res.json({success: false, message: "Payment Failed"})
  }
}
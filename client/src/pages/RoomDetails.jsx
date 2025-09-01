import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons } from "../assets/assets";
import StarRating from "../components/StarRating";
import { roomCommonData } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import DateInput from "../components/DateInput";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, getToken, axios, navigate, user } = useAppContext();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const [isAvailable, setIsAvailable] = useState(false);

  // to check if room is available
  const checkAvailability = async () => {
    try {
      // Check if both dates are entered
      if (!checkInDate || !checkOutDate) {
        toast.error("Please enter both check-in and check-out dates");
        return;
      }
      
      // Check if check-in date is greater than or equal to check-out date
      if (checkInDate >= checkOutDate) {
        toast.error("Check-In Date should be less than Check-Out Date");
        return;
      }
      
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });
      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is available");
        } else {
          setIsAvailable(false);
          toast.error("Room is not available");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // onSubmitHandler to check availability & book the room
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!isAvailable) {
        return checkAvailability();
      } else {
        // Check if user is authenticated before attempting to book
        if (!user) {
          toast.error("Please login to book this room");
          return;
        }

        const token = await getToken();
        
        const { data } = await axios.post(
          "/api/bookings/book",
          {
            room: id,
            checkInDate,
            checkOutDate,
            guests,
            paymentMethod: "Pay At Hotel",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      // Handle authentication errors more gracefully
      if (error.message.includes("authentication") || error.message.includes("token")) {
        toast.error("Please login to book this room");
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    const room = rooms.find((room) => room._id == id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, [rooms]);

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inter text-sm">({room.roomType})</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500">
            20% OFF
          </p>
        </div>
        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>
        {/* Room Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room Image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt="Room Image"
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainImage === image && "outline-3 outline-orange-500"
                  }`}
                />
              ))}
          </div>
        </div>
        {/* Room Highlights */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience unmatched style and comfort like never before.
            </h1>
            <div className="flex flex-wrap items-center mb-6 gap-4 mt-3">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Room Price */}
          <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
        </div>
        {/* CheckIn CheckOut Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check-In
              </label>
              <DateInput
                id="checkInDate"
                value={checkInDate}
                onChange={setCheckInDate}
                min={new Date().toISOString().split("T")[0]}
                placeholder="mm/dd/yyyy"
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-Out
              </label>
              <DateInput
                id="checkOutDate"
                value={checkOutDate}
                onChange={setCheckOutDate}
                min={checkInDate}
                placeholder="mm/dd/yyyy"
                className={`w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none ${!checkInDate ? "opacity-60 cursor-not-allowed" : ""}`}
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                onChange={(e) => setGuests(e.target.value)}
                value={guests}
                type="number"
                id="guests"
                placeholder="1"
                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-secondary active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
          >
            {isAvailable ? "Book Now" : "Check Availability"}
          </button>
        </form>

        {/* Room Features and About Room in side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-6 mt-25 mb-15 w-full md:w-[95%] mx-auto">
          {/* Room Features & Services - Left Side */}
          <div className="w-full lg:w-1/2 bg-gray-50 rounded-2xl shadow-sm py-10 px-6 md:px-8 lg:px-10">
            <h2 className="text-2xl font-playfair text-center mb-8">
              Room Features & Services
            </h2>
            <div className="flex flex-col gap-4">
              {roomCommonData.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-orange-100 p-2 rounded-full">
                    <img
                      src={spec.icon}
                      alt={`${spec.title}-icon`}
                      className="w-6"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium">{spec.title}</p>
                    <p className="text-gray-500">{spec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About This Room - Right Side */}
          <div className="w-full lg:w-1/2 rounded-2xl bg-gradient-to-br bg-gray-50 shadow-sm py-10 px-6 md:px-8 lg:px-10 border border-gray-100">
            <div className="flex justify-center mb-11">
              <h2 className="text-2xl font-playfair text-center relative inline-block">
                <span className="relative z-10 font-playfair text-2xl">
                  Room Overview
                </span>
                <span className="absolute bottom-0 left-0 w-full"></span>
              </h2>
            </div>

            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100/50 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-orange-300"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-orange-300"></div>

              <p className="ml-0 md:ml-4 text-base md:text-lg leading-relaxed">
                Guests will be allocated on the ground floor according to
                availability. You get a comfortable Two bedroom apartment has a
                true city feeling. The price quoted is for two guest, at the
                guest slot please mark the number of guests to get the exact
                price for groups. The Guests will be allocated ground floor
                according to availability. You get the comfortable two bedroom
                apartment that has a true city feeling.
              </p>
            </div>
          </div>
        </div>
        {/* Hosted By */}
        <div className="w-full md:w-[95%] mx-auto bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-sm py-5 px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-20"></div>
                <img
                  src={room.hotel.owner.image}
                  alt="Host"
                  className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover relative z-10 ring-2 ring-white"
                />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-medium">
                  Hosted by {room.hotel.name}
                </p>
                <div className="flex items-center mt-2">
                  <StarRating />
                  <p className="ml-2 text-gray-600">200+ reviews</p>
                </div>
              </div>
            </div>
            <button className="mt-6 md:mt-0 px-8 py-3 rounded-lg text-white bg-primary hover:bg-secondary transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
              Contact Now
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default RoomDetails;

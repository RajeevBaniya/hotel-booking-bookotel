import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// Import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { useAppContext } from "../context/AppContext";

const RecommendedHotels = () => {
  const { rooms, searchedCities, roomsLoading } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const normalize = (s) => (s || "").toString().trim().toLowerCase();

  const filterHotels = () => {
    if (!searchedCities || searchedCities.length === 0) {
      setRecommended([]);
      return;
    }

    const filteredHotels = rooms.filter((room) => {
      const roomCity = normalize(room?.hotel?.city);
      return searchedCities.some((city) => {
        const q = normalize(city);
        return roomCity === q || roomCity.includes(q);
      });
    });
    
    setRecommended(filteredHotels);
  }

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities])

  // Show loading state
  if (roomsLoading && searchedCities && searchedCities.length > 0) {
    return (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title="Recommended Hotels"
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />
        <div className="w-full mt-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-[200px] rounded-t-xl"></div>
              <div className="bg-white p-4 rounded-b-xl">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Only show section if there are searched cities AND recommended hotels
  if (!searchedCities || searchedCities.length === 0 || recommended.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Title
        title="Recommended Hotels"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />

      <div className="w-full mt-15 relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={false}
          pagination={{
            clickable: true,
            el: ".swiper-recommended-pagination",
            type: "bullets",
            dynamicBullets: true,
            dynamicMainBullets: 4,
            hideOnClick: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          allowTouchMove={true}
          simulateTouch={true}
          grabCursor={true}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {recommended.map((room, index) => (
            <SwiperSlide key={index}>
              <HotelCard room={room} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-recommended-pagination mt-8 flex justify-center"></div>
      </div>
    </div>
  );
};

export default RecommendedHotels;

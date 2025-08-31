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
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    if (!searchedCities || searchedCities.length === 0) {
      setRecommended([]);
      return;
    }

    const filteredHotels = rooms.filter(room => 
      searchedCities.some(city => 
        room.hotel.city.toLowerCase() === city.toLowerCase()
      )
    );
    
    setRecommended(filteredHotels);
  }

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities])

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

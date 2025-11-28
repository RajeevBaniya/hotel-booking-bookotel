import React from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// Import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const { rooms, navigate, roomsLoading } = useAppContext();

  if (roomsLoading) {
    return (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title="Featured Destinations"
          subTitle="Experience our handpicked properties, where premium comfort meets unforgettable moments in stunning locations."
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

  return rooms.length > 0 && (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Title
        title="Featured Destinations"
        subTitle="Experience our handpicked properties, where premium comfort meets unforgettable moments in stunning locations."
      />

      <div className="w-full mt-15 relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={false}
          pagination={{
            clickable: true,
            el: ".swiper-custom-pagination",
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
          {rooms.map((room, index) => (
            <SwiperSlide key={index}>
              <HotelCard room={room} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-custom-pagination mt-8 flex justify-center"></div>
      </div>

      <button
        onClick={() => {
          navigate("/rooms");
          scrollTo(0, 0);
        }}
        className="my-10 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-100 transition-all cursor-pointer"
      >
        View All Destinations
      </button>
    </div>
  );
};

export default FeaturedDestination;

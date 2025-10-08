import React from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
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
  const { rooms, navigate } = useAppContext();

  return rooms.length > 0 && (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Title
        title="Featured Destinations"
        subTitle="Experience our handpicked properties, where premium comfort meets unforgettable moments in stunning locations."
      />

      <div className="w-full mt-15 relative max-w-7xl mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={false}
          centeredSlides={true}
          centeredSlidesBounds={true}
          centerInsufficientSlides={true}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
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
          loopAdditionalSlides={4}
          loopPreventsSliding={false}
          watchOverflow={false}
          allowTouchMove={true}
          simulateTouch={true}
          grabCursor={true}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              centeredSlides: false,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
              centeredSlides: false,
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

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // Import navigation styles
import { Navigation, FreeMode } from "swiper/modules";
import GameCard from "./GameCard";

function Games({ games }) {
  const games1 = games.slice(0, 15);
  const games2 = games.slice(16, 30);
  const games3 = games.slice(31, 45);

  return (
    <div className="mt-16">
      <div className="text-center"></div>
      <div className="p-4">
        <Swiper
          slidesPerView={1}
          navigation={true} // Include navigation arrows
          spaceBetween={30}
          freeMode={true} // Enable free mode for continuous scrolling
          modules={[Navigation, FreeMode]} // Include FreeMode module
          className="mySwiper"
          breakpoints={{
            333: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
            1800: {
              slidesPerView: 5,
            },
          }}
        >
          {games1.map((game) => (
            <SwiperSlide key={game._id}>
              <GameCard game={game} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="">
        <Swiper
          slidesPerView={1}
          navigation={true} // Include navigation arrows
          spaceBetween={30}
          freeMode={true} // Enable free mode for continuous scrolling
          modules={[Navigation, FreeMode]} // Include FreeMode module
          className="mySwiper"
          breakpoints={{
            333: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
            1800: {
              slidesPerView: 5,
            },
          }}
        >
          {games2.map((game) => (
            <SwiperSlide key={game._id}>
              <GameCard game={game} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="">
        <Swiper
          slidesPerView={1}
          navigation={true} // Include navigation arrows
          spaceBetween={30}
          freeMode={true} // Enable free mode for continuous scrolling
          modules={[Navigation, FreeMode]} // Include FreeMode module
          className="mySwiper"
          breakpoints={{
            333: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
            1800: {
              slidesPerView: 5,
            },
          }}
        >
          {games3.map((game) => (
            <SwiperSlide key={game._id}>
              <GameCard game={game} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Games;

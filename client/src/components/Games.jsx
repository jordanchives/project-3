import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import GameCard from "./GameCard";
import SideBar from "./SideBar";

function Games({ games }) {
  const games1 = games.slice(0, 15);
  const games2 = games.slice(16, 30);
  const games3 = games.slice(31, 45);
  return (
   
    
    <div className="mt-16">
    
      <div className="text-center"></div>
    {/* <SideBar /> */}
       <div className="p-4">
        
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            // when window width is >= 640px
            333: {
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
            },
            // when window width is >= 1024px
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
            <SwiperSlide className="" key={game._id}>
              <GameCard className="" game={game} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="">
      <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            // when window width is >= 640px
            333: {
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
            },
            // when window width is >= 1024px
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
            <SwiperSlide className="" key={game._id}>
              <GameCard className="" game={game} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    
    </div>
    
  );
}

export default Games;

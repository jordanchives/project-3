import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Game from './Game';

function Games({ games }) {
  return (
    <div className=" mt-48  ">
      <div className="text-center">
        <h2 className="title">Games</h2>
      </div>
      <div className="p-4">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {games.map(game => (
            <SwiperSlide className="" key={game.cover}>
              <Game className="" game={game} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Games;

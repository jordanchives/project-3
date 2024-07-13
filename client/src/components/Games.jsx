import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Game from './Game';

function Games({ games }) {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mt-56">
      <div className="text-center">
        <h2 className="title">Games</h2>
      </div>
      <div className="mb-16">
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
            <SwiperSlide key={game._id}>
              <Game game={game} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Games;

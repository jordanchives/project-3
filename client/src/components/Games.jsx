import React, {useRef, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from "./Card";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


import { FreeMode, Pagination } from 'swiper/modules';
import data from "../assets/index.json";
//useEffect that calls api to fill in data like above json
function Games (props) {

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mt-56">
         <div className="text-center">
          <h2 className="title">Games</h2>
         
         
         </div>
         {/* Games Cards */}
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
        {
          props.map(game => {
            return(
             <SwiperSlide>
              <Card  key={game._id} game={game} />
             </SwiperSlide>
            )
          })
        }
       
        
      </Swiper>
    
         </div>
       
          
    </div>
  );
};

export default Games;
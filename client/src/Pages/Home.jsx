


import Games from '../components/Games';
import Card from '../components/Card';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SearchBar from '../components/SearchBar';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';


export function Home() {
    return (
        <main>
        <div>
            <SearchBar/>
            <Games />
            <Card/>
            
</div>
{/* Catagories game type */}
<div className="" id="slider">
<Swiper rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="bg-blue-600 opacity-50  p-20">
          <p className="">Co-Op</p>
        </SwiperSlide>
        <SwiperSlide className="bg-red-600 opacity-50  p-20">
          <p className="">Stratagy</p>
        </SwiperSlide>
        <SwiperSlide className="bg-yellow-600 opacity-50  p-20">
         <p className="">Rouge Like</p>
        </SwiperSlide>
        <SwiperSlide className="bg-orange-600 opacity-50  p-20">
        <p className="">Fighting</p>
        </SwiperSlide>
        <SwiperSlide className="bg-teal-600 opacity-50  p-20">
        <p className="">Open World</p>
        </SwiperSlide>
        <SwiperSlide className="bg-sky-500 opacity-50  p-20">
        <p className="">Sports</p>
        </SwiperSlide>
      </Swiper>
</div>
</main>


    );
}
export default Home;
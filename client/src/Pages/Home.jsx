import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GAMES } from "../utils/queries";
import Games from '../components/Games';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import SideBar from '../components/SideBar';
import { NavLink } from 'react-router-dom';
import Auth from "../utils/auth";



export function Home() {
  const { loading, data } = useQuery(QUERY_GAMES);
  const [games2, setGames2] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [games1, setGames1]= useState([]);
  const [games3, setGames3]= useState([]);
    
  
  
  useEffect(() => {
    if (data) {
      setGames1(data.games.slice(0, 15));
      setGames2(data.games.slice(16, 30));
      setGames3(data.games.slice(31, 45));
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
    
  {Auth.loggedIn() ? (
    // Replace the empty <div></div> with the desired JSX code
    <div>
Logged in
<main className="">
       {!isOpen ? 
        (<button className="fixed  z-30 flex items-center cursor-pointer right-3 top-6 mt-0" onClick={() => setIsOpen(!isOpen)}>
    <svg
        
      className=""
      fill="#2563EB"
      viewBox="0 0 100 80"
      width="20"
      height="20"
    >
      <rect width="100" height="10"></rect>
      <rect y="30" width="100" height="10"></rect>
      <rect y="60" width="100" height="10"></rect>
    </svg>
        </button>) :
        ( 
            <button className="flex text-xl text-white items-center cursor-pointer fixed right-6 top-6 z-50 "onClick={()=> setIsOpen(!isOpen)}>
                X
                </button>
    
    )
    } 
       <div className={`top-0 right-0 fixed bg-blue-500 w-[15vw] h-full p-10
       ${isOpen ? 'translate-x-0':'translate-x-full'} ease-in-out duration-300`}
       >
            <h2 className="text-2xl text-white">Side Bar</h2>
            <div className="">
                <ul className="text-white">
                    <li><NavLink to="/Library">Library</NavLink></li>
                    {/* <li>Categories</li> */}
                    

                    
                </ul>
                
            </div>
          
        </div>
    {isOpen ? 

    <div className="active-sidebar translate-x-0':'translate-x-full'} ease-in-out duration-300">
    <Games className="" games={games1}/>
    
    
    </div>
    
    : 
      <div className="delay">
        <Games className="" games={games1}/>
        <Games className="" games={games2} />
        <Games className="" games={games3} />
        
        
      </div>
      
    } 
      {/* Categories game type */}
      {/* <div className="" id="slider">
        <Swiper 
          rewind={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide className="bg-blue-600 opacity-50 p-20">
            <p className="">Co-Op</p>
          </SwiperSlide>
          <SwiperSlide className="bg-red-600 opacity-50 p-20">
            <p className="">Strategy</p>
          </SwiperSlide>
          <SwiperSlide className="bg-yellow-600 opacity-50 p-20">
            <p className="">Rogue Like</p>
          </SwiperSlide>
          <SwiperSlide className="bg-orange-600 opacity-50 p-20">
            <p className="">Fighting</p>
          </SwiperSlide>
          <SwiperSlide className="bg-teal-600 opacity-50 p-20">
            <p className="">Open World</p>
          </SwiperSlide>
          <SwiperSlide className="bg-sky-500 opacity-50 p-20">
            <p className="">Sports</p>
          </SwiperSlide>
        </Swiper>
      </div> */}
      
    </main>
    </div>

    
  ) : (
    // Replace the empty <div></div> with the desired JSX code
    <div>
      Logged out
      <div className="">
        <Games className="" games={games1} />
      </div>
      <div className="">
        <Games className="" games={games2} />
      </div>
      <div className="">
        <Games className="" games={games3} />
      </div>
      {/* <div className="" id="slider">
        <Swiper 
          rewind={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide className="bg-blue-600 opacity-50 p-20">
            <p className="">Co-Op</p>
          </SwiperSlide>
          <SwiperSlide className="bg-red-600 opacity-50 p-20">
            <p className="">Strategy</p>
          </SwiperSlide>
          <SwiperSlide className="bg-yellow-600 opacity-50 p-20">
            <p className="">Rogue Like</p>
          </SwiperSlide>
          <SwiperSlide className="bg-orange-600 opacity-50 p-20">
            <p className="">Fighting</p>
          </SwiperSlide>
          <SwiperSlide className="bg-teal-600 opacity-50 p-20">
            <p className="">Open World</p>
          </SwiperSlide>
          <SwiperSlide className="bg-sky-500 opacity-50 p-20">
            <p className="">Sports</p>
          </SwiperSlide>
        </Swiper> */}
      </div>
    
  )}

     
   
    </>
   
  );
  
}

export default Home;

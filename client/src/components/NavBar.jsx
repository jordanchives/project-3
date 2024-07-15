import React from "react";
import logo from "../assets/images/logo.svg";
import SearchBar from "./SearchBar";

function NavBar() {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-[#171a21]">
      {/* Left */}
      <div className="flex items-center justify-center lg:justify-start py-2 px-2 lg:p-6 lg:py-6 lg:px-8 w-full lg:w-auto">
        <a href="/">
          <img
            src={logo}
            width="176"
            height="44"
            alt="Link to HomePage"
          />
        </a>
      </div>
      {/* Middle */}
      <div className="w-full lg:w-auto mt-4 lg:mt-0">
        <SearchBar />
      </div>
      {/* Right */}
      <div className="text-white absolute top-0 right-[2.5rem] text-[8px] flex items-center mt-1.5">
        <div className="py-[2px] px-2 ml-4 bg-black rounded-[0.5rem] hover:bg-inherit group duration-100">
          <p className="text-[white] font-semibold group-hover:text-red-700">
            Login
          </p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

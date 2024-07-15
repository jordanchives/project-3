import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import SearchBar from "./SearchBar";
import auth from "../utils/auth";

function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = auth.loggedIn(); // Check if the user is logged in

  const handleLogout = () => {
    auth.logout(); // Perform logout
    window.location.reload(); // Refresh the current page
  };

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
      <div className="w-full mt-4 lg:mt-0">
        <SearchBar />
      </div>
      {/* Right */}
      <div className="flex items-center justify-center w-full lg:w-auto lg:ml-auto mt-4 lg:mt-0 pr-10">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white py-[2px] px-2 bg-red-700 rounded-[0.5rem] hover:bg-red-800 group duration-100"
          >
            <p className="text-[white] font-semibold group-hover:text-gray-200">
              Logout
            </p>
          </button>
        ) : (
          <a
            href="/login"
            className="text-white py-[2px] px-2 bg-black rounded-[0.5rem] hover:bg-inherit group duration-100"
          >
            <p className="text-[white] font-semibold group-hover:text-red-700">
              Login
            </p>
          </a>
        )}
      </div>
    </div>
  );
}

export default NavBar;

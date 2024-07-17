import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import SearchBar from "./SearchBar";
import auth from "../utils/auth";

function NavBar() {
  const isLoggedIn = auth.loggedIn(); // Check if the user is logged in
  const [open, setOpen] = useState(false); // State to manage menu open/close

  const handleLogout = () => {
    auth.logout(); // Perform logout
    window.location.reload(); // Refresh the current page
  };

  return (
    <div className="flex flex-col lg:flex-row items-center bg-[#171a21]">
      {/* Left */}
      <div className="flex items-center justify-center lg:justify-start py-2 px-2 lg:p-6 lg:py-6 lg:px-8 w-full lg:w-auto">
        <a href="/">
          <img src={logo} width="176" height="44" alt="Link to HomePage" />
        </a>
      </div>
      {/* Middle */}
      <div className="w-full mt-4 lg:mt-0">
        <SearchBar />
      </div>
      {/* Right */}
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-hamburger"
        aria-expanded={open}
        aria-label="Toggle navigation menu" // Added aria-label for accessibility
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div
        className={`w-full ${open ? "block" : "hidden"}`}
        id="navbar-hamburger"
      >
        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <li>
            <a
              href="/"
              className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/services"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="/pricing"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;

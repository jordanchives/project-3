import React, { useState, useEffect, useRef } from "react";
import logo2 from "../assets/images/logo2.svg";
import burger from "../assets/images/burger.svg";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import { Button, Sidebar } from "flowbite-react";

function NavBar() {
  const isLoggedIn = auth.loggedIn(); // Check if the user is logged in
  const [open, setOpen] = useState(false); // State to manage menu open/close
  const navigate = useNavigate();
  const sidebarRef = useRef(null); // Ref to the sidebar container
  const [isRendered, setIsRendered] = useState(false); // Flag to track rendering

  const handleLogout = () => {
    auth.logout(); // Perform logout
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const query = new URLSearchParams(new FormData(form)).get("search");
    navigate(`/search?term=${query}`);
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      console.log("Clicked outside sidebar");
      setOpen(false);
    }
  };

  useEffect(() => {
    console.log("open state:", open);

    if (open) {
      console.log("Adding click event listener");
      const timeoutId = setTimeout(() => {
        setIsRendered(true); // Set the flag to true after a delay
        document.addEventListener("click", handleClickOutside);
      }, 10); // Delay added here

      return () => {
        console.log("Cleaning up event listener");
        setIsRendered(false); // Reset the flag
        clearTimeout(timeoutId);
        document.removeEventListener("click", handleClickOutside);
      };
    } else {
      console.log("Removing click event listener");
      document.removeEventListener("click", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="flex flex-col lg:flex-row items-center">
      {/* Top Bar */}
      <div className="topbar flex items-center justify-between w-full lg:px-6 lg:py-4 px-2 py-2">
        {/* Header */}
        <div>
          <a href="/" className="primary-header">
            <img src={logo2} alt="Link to HomePage" />
            <h1>checkrd</h1>
          </a>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          type="button"
          id="navbar-hamburger"
          className="hamburger inline-flex items-center justify-center p-2 w-14 h-14 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          <img
            className=""
            src={burger}
            alt="Hamburger menu icon"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Slide-Out Menu */}
      <div
        ref={sidebarRef}
        className={`sidebar fixed top-0 right-0 h-full transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <Sidebar aria-label="Sidebar">
          <div className="flex flex-col p-4">
            {/* SearchBar for slide-out menu */}
            <form
              className="flex items-center w-full mb-4"
              onSubmit={handleSubmit}
            >
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  name="search"
                  spellCheck="false"
                  className="rounded-lg block w-full ps-10 p-2.5"
                  placeholder="Search..."
                  required
                />
              </div>
            </form>
            <ul className="sidebar-list flex flex-col mt-4 rounded-lg">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 rounded"
                  aria-current="page"
                >
                  Home
                </a>
              </li>

              {!isLoggedIn ? (
                <>
                  <li>
                    <a
                      href="/login"
                      className="block py-2 px-3 text-gray-900 rounded dark:text-gray-400"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="/register"
                      className="block py-2 px-3 text-gray-900 rounded dark:text-gray-400"
                    >
                      Sign Up
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a
                      href="/cart"
                      className="block py-2 px-3 text-gray-900 rounded dark:text-gray-400"
                    >
                      Cart
                    </a>
                  </li>
                  <li>
                    <a
                      href="/library"
                      className="block py-2 px-3 text-gray-900 rounded"
                    >
                      Library
                    </a>
                  </li>
                  <li className="logout-button rounded">
                    <button
                      onClick={handleLogout}
                      className="sidebar-list-button block py-2 px-3 text-gray-900 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Sidebar>
      </div>
    </div>
  );
}

export default NavBar;

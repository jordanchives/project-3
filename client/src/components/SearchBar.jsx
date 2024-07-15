import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target; // Get the form element
    const query = new URLSearchParams(new FormData(form)).get('search'); // Get the search term
    navigate(`/search?term=${query}`); // Navigate to the search page with the query
  };

  return (
    <form className="flex items-center mx-auto w-full max-w-xl" onSubmit={handleSubmit}>
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
          name="search" // Add a name attribute to the input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          required
        />
      </div>
    </form>
  );
}

export default SearchBar;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GAMES_NAME } from "../utils/queries";

function SearchList() {
  const location = useLocation();
  const name = new URLSearchParams(location.search).get("term");
  const { loading, data } = useQuery(QUERY_GAMES_NAME, {
    variables: { name: name },
  });
  const [games, setGames] = useState([]);
  useEffect(() => {
    if (data) {
      setGames(data.gamesByName);
      console.log(data.gamesByName);
    }
  }, [data]);
  if (loading) {
    return <div><h1>Loading...</h1></div>;
  }

  return (
    <ul>
      {games.map((game) => (
        <a href={`/games/${game._id}`} class="search-a mb-3 flex flex-row items-center justify-between shadow w-full md:flex-row hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div class="search-img-container flex flex-col">
              <img class="search-img object-cover w-auto max-h-28 " src={game.cover} alt=""></img>
          </div>
          <div class="search-text-container flex flex-col px-2 leading-normal">
              <h5 class="search-title mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{game.name}</h5>
              <p class="search-genres font-normal text-gray-900 dark:text-gray-400">{game.genres.join(', ')}</p>
          </div>

          <div class="search-cart-container flex flex-col items-center pr-2">
              <span class="search-price text-xs font-bold text-gray-900 dark:text-white">{game.price}</span>
              <a href="#" class="search-cart-button text-white bg-gray-900 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
          </div>
        </a>
      ))}
    </ul>
  );
}



export default SearchList;
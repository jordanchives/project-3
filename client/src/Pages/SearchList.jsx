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
        // <li key={game._id}>
        //   <p>{game.name}</p>
        // </li>
        <a href={`/games/${game._id}`} class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={game.cover} alt=""></img>
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{game.name}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{game.genres.join(', ')}</p>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">{game.price}</span>
            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
        </div>
        </a>
      ))}
    </ul>
  );
}



export default SearchList;
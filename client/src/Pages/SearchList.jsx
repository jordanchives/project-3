import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GAMES_NAME, QUERY_USER } from "../utils/queries";
import { ADD_TO_CART } from "../utils/actions";
import { useGameContext } from "../utils/GlobalState";

function SearchList() {
  const location = useLocation();
  const searchName = new URLSearchParams(location.search).get("term");
  const [games, setGames] = useState([]);
  const [game, setGame] = useState(null);
  const [state, dispatch] = useGameContext();
  const userID = localStorage.getItem("user_id");
  const [isInCart, setIsInCart] = useState(false);
  const [isInLibrary, setIsInLibrary] = useState(false);

  // Fetch game data
  const {
    loading: loadingGame,
    data: gameData,
    error: gameError,
  } = useQuery(QUERY_GAMES_NAME, {
    variables: { name: searchName },
  });

  // Fetch user data
  const {
    loading: loadingUser,
    data: userData,
    error: userError,
  } = useQuery(QUERY_USER, {
    variables: { id: userID },
  });

  const handleAddToCart = () => {
    dispatch({ type: ADD_TO_CART, game });
  };

  useEffect(() => {
    if (userData) {
      const userLibrary = userData.user.library;
      const gameInLibrary = userLibrary.some((item) => item.name === searchName);
      const gameInCart = state.cart.some((item) => item.name === searchName);
      setIsInLibrary(gameInLibrary);
      setIsInCart(gameInCart);
    }
    if (userError) {
      console.error("Error fetching user data:", userError);
    }
  }, [userData, gameData, userError, state.cart]);

  useEffect(() => {
    if (gameData) {
      setGames(gameData.gamesByName);
      console.log(gameData.gamesByName);
    }
    if (gameError) {
      console.error("Error fetching game:", gameError);
    }
  }, [gameData, gameError]);

  if (loadingGame || loadingUser) {
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
          <button
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
              isInCart ? "opacity-50 cursor-not-allowed" : 
              isInLibrary ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart
              ? "In Cart"
              : isInLibrary
              ? "In Library"
              : "Add to Cart"}
          </button>
          
          </div>
        </a>
      ))}
    </ul>
  );
}



export default SearchList;
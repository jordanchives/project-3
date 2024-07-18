import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GAME_ID, QUERY_USER } from "../utils/queries";
import { ADD_TO_CART } from "../utils/actions";
import { useGameContext } from "../utils/GlobalState";

function GamePage() {
  const [state, dispatch] = useGameContext();
  const { gameID } = useParams();
  const userID = localStorage.getItem("user_id");
  const [game, setGame] = useState(null);
  const [isInCart, setIsInCart] = useState(false); // State to check if the game is in the cart
  const [isInLibrary, setIsInLibrary] = useState(false); // State to check if the game is in the library

  // Fetch game data
  const {
    loading: loadingGame,
    data: gameData,
    error: gameError,
  } = useQuery(QUERY_GAME_ID, {
    variables: { id: gameID },
  });

  // Fetch user data
  const {
    loading: loadingUser,
    data: userData,
    error: userError,
  } = useQuery(QUERY_USER, {
    variables: { id: userID },
  });

  useEffect(() => {
    if (gameData) {
      setGame(gameData.gameById);
    }
    if (gameError) {
      console.error("Error fetching game:", gameError);
    }
  }, [gameData, gameError]);

  useEffect(() => {
    if (userData) {
      const userLibrary = userData.user.library;
      const gameInLibrary = userLibrary.some((item) => item._id === gameID);
      const gameInCart = state.cart.some((item) => item._id === gameID);
      setIsInLibrary(gameInLibrary);
      setIsInCart(gameInCart);
    }
    if (userError) {
      console.error("Error fetching user data:", userError);
    }
  }, [userData, userError, gameID, state.cart]);

  const handleAddToCart = () => {
    dispatch({ type: ADD_TO_CART, game });
  };

  if (loadingGame || loadingUser) {
    return <div>Loading...</div>;
  }

  if (gameError || userError) {
    return <div>Error loading game or user data. Please try again later.</div>;
  }

  if (!game) {
    return <div>404 Game not found</div>;
  }

  return (
    <main className="p-4">
      <div className="gamepage-container flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
        {/* Image Container */}
        <div className="gamepage-image relative lg:w-1/4 md:w-1/2 xs:w-full">
          <img
            src={game.cover}
            alt={game.name}
            className=" w-full h-full object-cover"
          />
        </div>
        {/* Description Container */}
        <div className="gamepage-text-box md:w-1/2 flex flex-col">
          <div>
            <h2 className="gamepage-name text-2xl mb-2">{game.name.toUpperCase()}</h2>
            <p>{game.genres.join(', ')}</p>
            <p className="text-lg mb-4">${game.price}</p>
            <p className="summary">{game.summary}</p>
          </div>
          <div className="pt-5">
            <button
              className={`gamepage-cart text-white font-bold py-2 px-4 rounded ${
                isInCart ? "opacity-50" : 
                isInLibrary ? "opacity-50" : ""
              }`}
              onClick={handleAddToCart}
              disabled={isInCart || isInLibrary}
            >
              {isInCart
                ? "In Cart"
                : isInLibrary
                ? "In Library"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GamePage;

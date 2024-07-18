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
  const [isInLibrary, setIsInLibrary] = useState(false);
   // State to check if the game is in the library

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
function goToCart(){
  window.location.assign("/cart");
}
  return (
    <main className="p-4">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
        {/* Image Container */}
        <div className="relative lg:w-1/4 md:w-1/2 sm:w-full">
          <img
            src={game.cover}
            alt={game.name}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        {/* Description Container */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">{game.name}</h2>
            <p className="text-lg text-white mb-4">${game.price}</p>
            <p className="text-[#ffff]">{game.summary}</p>
          </div>
          <div className="pt-5">
            <button
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                isInCart ? "opacity-50 cursor-not-allowed" : 
                isInLibrary ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
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
            {isInCart ? (
              <div><button onClick={goToCart} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-3">
                Go to Cart
                </button></div>
            ): ""
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default GamePage;

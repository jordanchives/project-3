import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { QUERY_GAMES_NAME, QUERY_USER } from "../utils/queries";
import { ADD_TO_CART } from "../utils/actions";
import { useGameContext } from "../utils/GlobalState";
import auth from "../utils/auth";

function SearchList() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchName = new URLSearchParams(location.search).get("term");
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [state, dispatch] = useGameContext();
  const userID = localStorage.getItem("user_id");

  const [getUser, { loading: loadingUser, error: userError, data: userData }] = useLazyQuery(QUERY_USER);
  const [doSearch, { loading: loadingSearch, error: searchError, data: searchData }] = useLazyQuery(QUERY_GAMES_NAME);

  const handleAddToCart = (event, game) => {
    event.preventDefault();
    event.stopPropagation();
    if (!auth.loggedIn()) {
      navigate("/login");
    } else {
      dispatch({ type: ADD_TO_CART, game });
    }
  };

  useEffect(() => {
    const loadUserAndSearch = async () => {
      try {
        if (auth.loggedIn()) {
          const userResponse = await getUser({ variables: { id: userID } });

          if (userResponse.data) {
            setUser(userResponse.data.user);
          }
        }

        const searchResponse = await doSearch({ variables: { name: searchName } });

        if (searchResponse.data) {
          const items = searchResponse.data.gamesByName.map((game) => {
            const carted = state.cart.some((cartItem) => cartItem._id === game._id);
            const owned = user ? user.library.some((libItem) => libItem._id === game._id) : false;
            return { ...game, active: carted || owned };
          });

          setGames(items);
        }
      } catch (error) {
        console.error("Error loading user or searching games:", error);
      }
    };

    loadUserAndSearch();
  }, [searchName, state.cart, getUser, doSearch, userID, user]);

  if (loadingSearch || (auth.loggedIn() && loadingUser)) {
    return <div><h1>Loading...</h1></div>;
  }

  return (
    <ul className='list'>
      {games.map((game) => (
        <a key={game._id} href={`/games/${game._id}`} className="search-a mb-3 flex flex-row items-center shadow w-full md:flex-row">
          <div className='list-container'>
            <div className="search-img-container flex">
                <img className="search-img object-cover" src={game.cover} alt=""></img>
            </div>
            <div className="search-text-container flex flex-col leading-normal">
                <h5 className="search-title mb-2 tracking-tight">{game.name}</h5>
                <p className="search-genres">{game.genres.slice(0, 3).join(', ')}</p>
            </div>
          </div>

          <div className="search-cart-container flex flex-col items-center">
            <span className="search-price text-xs font-bold">{game.price}</span>
              
            <button className={`search-cart-button rounded disabled ${
              game.active ? "opacity-35" : ""
              }`} onClick={(event) => handleAddToCart(event, game)}
              disabled={game.active}>
                Add to Cart
             </button>
          </div>
        </a>
      ))}
    </ul>
  );
}

export default SearchList;

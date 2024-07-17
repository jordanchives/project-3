import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_USER } from "../utils/queries";
import { REMOVE_FROM_CART } from '../utils/actions';
import { TRANSACTION } from '../utils/mutations'; 
import { useGameContext } from "../utils/GlobalState";
import auth from "../utils/auth";

function Cart () {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [state, dispatch] = useGameContext();
  const userID = localStorage.getItem("user_id");
  

  const [getUser, { loading: loadingUser, error: userError, data: userData }] = useLazyQuery(QUERY_USER);

  let cartItems = state.cart;

  useEffect(() => {
    if(!auth.loggedIn()) {
      window.location.assign("/login");
    }
    const loadUser = async () => {
      try {
        const userResponse = await getUser({ variables: { id: userID } });

        if (userResponse.data) {
          setUser(userResponse.data.user);
        }

        setGames(cartItems);

        // Calculate the subtotal
        const cartItemsSubTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setSubTotal(cartItemsSubTotal);
        console.log(cartItemsSubTotal, "cartItemsSubTotal");
        // Calculate the tax (8% of the subtotal)
        const cartItemsTax = cartItemsSubTotal * 0.08;
        setTax(cartItemsTax);
        console.log(cartItemsTax, "cartItemsTax");
        // Calculate the total (subtotal + tax)
        const cartItemsTotal = cartItemsSubTotal + cartItemsTax;
        setTotal(cartItemsTotal);
        console.log(cartItemsTotal, "cartItemsTotal");
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    loadUser();
  }, [cartItems, getUser, userID]);

  const handleRemoveFromCart = (event, game) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({ type: REMOVE_FROM_CART, game });
    setGames(state.cart.filter((cartGame) => cartGame._id !== game._id));
  };

  const handleTransaction = (event, games) => {
    dispatch({ type: TRANSACTION, games });
  };

    return (
      <div>
        <h1 className="text-2xl font-bold mb-2 text-white">Cart</h1>
        <ul>
          {games.map((game) => (
            <a key={game._id} href={`/games/${game._id}`} className="search-a mb-3 flex flex-row items-center justify-between shadow w-full md:flex-row hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="search-img-container flex flex-col">
                <img src={game.cover} alt={game.name} className="search-img object-cover w-auto max-h-28" />
              </div>
              <div className="search-text-container flex flex-col px-2 leading-normal">
                <h5 className="search-title mb-2 font-bold tracking-tight text-white">{game.name}</h5>
                <p className="search-genres font-normal  text-white">{game.genres.join(', ')}</p>
              </div>

              <div className="search-cart-container flex flex-col items-center pr-2">
                <span className="search-price text-3xl font-bold  text-white">{game.price}</span>
              
                <button className={`search-cart-button bg-blue-500 text-white px-2 py-1 rounded disabled`} onClick={(event) => handleRemoveFromCart(event, game)}>
                    Remove
                </button>
              </div>
            </a>
          ))}
        </ul>
        <div>
            <div>
                <h3 className="text-white">Subtotal: ${subTotal.toFixed(2)}</h3>
                <h3 className="text-white">Tax: ${tax.toFixed(2)}</h3>
                <h3 className="text-white">Total: ${total.toFixed(2)}</h3>
            </div>
            <button className={`search-cart-button bg-blue-500 text-white px-2 py-1 rounded disabled`} onClick={(event) => handleTransaction(event, userID, games)}>
                Checkout
            </button>
        </div>
     </div>
    );
}
export default Cart;
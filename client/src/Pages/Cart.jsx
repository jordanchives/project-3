import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from "../utils/queries";
import { REMOVE_FROM_CART } from '../utils/actions';
import { TRANSACTION } from '../utils/mutations'; 
import { useGameContext } from "../utils/GlobalState";
// import { AuthenticationError } from 'apollo-server-express';

function Cart () {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [state, dispatch] = useGameContext();
  const userID = localStorage.getItem("user_id");

  const [getUser, { loading: loadingUser, error: userError, data: userData }] = useLazyQuery(QUERY_USER);
  const [addTransaction, { loading: transactionLoading, error: transactionError }] = useMutation(TRANSACTION);


  const cartItems = state.cart;

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userResponse = await getUser({ variables: { id: userID } });

        if (userResponse.data) {
          setUser(userResponse.data.user);
        }

        setGames(cartItems);

        // Calculate the subtotal
        const cartItemsSubTotal = await cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setSubTotal(cartItemsSubTotal);

        // Calculate the tax (8% of the subtotal)
        const cartItemsTax = await cartItemsSubTotal * 0.08;
        setTax(cartItemsTax);

        // Calculate the total (subtotal + tax)
        const cartItemsTotal = await cartItemsSubTotal + cartItemsTax;
        setTotal(cartItemsTotal);

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

  const handleTransaction = async (event) => {
    event.preventDefault();
    console.log(games, "games");
    try {
      const gameIds = games.map(game => game._id);
      console.log({gameIds});
      const newTransaction = { userId: userID, games: gameIds };
      console.log({newTransaction});
      const { data } = await addTransaction({
        variables: { transaction: newTransaction },
      });
      console.log(data);

      if (data) {
        // Update the user's library and transactions in the state or refetch the user data
        // Reset the cart state
        dispatch({ type: 'CLEAR_CART' });
      }
    } catch (error) {
      console.error('Transaction error:', error);
    }
  };

    return (
      <div>
        <h1 className="text-2xl font-bold mb-2">Cart</h1>
        <ul>
          {games.map((game) => (
            <a key={game._id} href={`/games/${game._id}`} className="search-a mb-3 flex flex-row items-center justify-between shadow w-full md:flex-row hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="search-img-container flex flex-col">
                <img src={game.cover} alt={game.name} className="search-img object-cover w-auto max-h-28" />
              </div>
              <div className="search-text-container flex flex-col px-2 leading-normal">
                <h5 className="search-title mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{game.name}</h5>
                <p className="search-genres font-normal text-gray-900 dark:text-gray-400">{game.genres.join(', ')}</p>
              </div>

              <div className="search-cart-container flex flex-col items-center pr-2">
                <span className="search-price text-xs font-bold text-gray-900 dark:text-white">{game.price}</span>
              
                <button className={`search-cart-button bg-blue-500 text-white px-2 py-1 rounded disabled`} onClick={(event) => handleRemoveFromCart(event, game)}>
                    Remove
                </button>
              </div>
            </a>
          ))}
        </ul>
        <div>
            <div>
                <h3>Subtotal: ${subTotal.toFixed(2)}</h3>
                <h3>Tax: ${tax.toFixed(2)}</h3>
                <h3>Total: ${total.toFixed(2)}</h3>
            </div>
            <button className={`search-cart-button bg-blue-500 text-white px-2 py-1 rounded disabled`} onClick={handleTransaction}>
                Checkout
            </button>
        </div>
     </div>
    );
}
export default Cart;
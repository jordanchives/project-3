import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from "../utils/queries";
import { REMOVE_FROM_CART, CLEAR_CART } from '../utils/actions';
import { TRANSACTION } from '../utils/mutations'; 
import { useGameContext } from "../utils/GlobalState";
import auth from "../utils/auth";
import cart from '../assets/images/cart.svg';


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
      console.log({ gameIds });
      const newTransaction = { userId: userID, games: gameIds };
      console.log({ newTransaction });
  
      const { data } = await addTransaction({
        variables: { transaction: newTransaction },
      });
  
      if (data) {
        // Update the user's library and transactions in the state or refetch the user data
        // Reset the cart state
        dispatch({ type: CLEAR_CART });
        console.log('Transaction successful:', data);
      }
    } catch (error) {
      console.error('Transaction error:', error.message || transactionError.message);
    }
  };
  

    return (
      <div>
        <div className='cart-header-container mt-5 mb-2'>
          <img src={cart} alt="shopping cart icon"></img>
        </div>
        <ul className='list'>
          {games.map((game) => (
            <a key={game._id} href={`/games/${game._id}`} className="search-a mb-3 flex flex-row items-center w-full md:flex-row">
              <div className='list-container'>
                <div className="search-img-container flex flex-col">
                  <img src={game.cover} alt={game.name} className="search-img object-cover" />
                </div>
                <div className="search-text-container flex flex-col leading-normal">
                  <h5 className="search-title mb-2 tracking-tight">{game.name}</h5>
                  <p className="search-genres">{game.genres.join(', ')}</p>
                </div>
              </div>

              <div className="search-cart-container flex flex-col items-center pr-2">
                <span className="search-price">{game.price}</span>
              
                <button className={`search-cart-button rounded disabled`} onClick={(event) => handleRemoveFromCart(event, game)}>
                    Remove
                </button>
              </div>
            </a>
          ))}
        </ul>
        <div className='checkout-container flex flex-col px-4'>
          <div className='checkout-totals p-4'>
            <div className='pb-2'>
                <h3 className="checkout-value">Subtotal: ${subTotal.toFixed(2)}</h3>
                <h3 className="checkout-value">Tax: ${tax.toFixed(2)}</h3>
                <h3 className="checkout-value">Total: ${total.toFixed(2)}</h3>
            </div>
            <div>
            <button className={`checkout-button py-2 px-4 font-bold text-white rounded disabled`} onClick={handleTransaction}>
                Checkout
            </button>
            </div>
            </div>
        </div>
     </div>
    );
}
export default Cart;
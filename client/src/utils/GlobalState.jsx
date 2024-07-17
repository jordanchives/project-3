import React, { createContext, useContext, useReducer, useEffect } from "react";
import { reducer } from "./reducers";
import { LOAD_CART } from "./actions";

const GlobalStateContext = createContext();

const GameProvider = ({ value = [], ...props }) => {
  const initialState = {
    products: [],
    cart: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch({ type: LOAD_CART, cart: savedCart });
  }, []);

  return <GlobalStateContext.Provider value={[state, dispatch]} {...props} />;
};

const useGameContext = () => {
  return useContext(GlobalStateContext);
};

export { GameProvider, useGameContext };

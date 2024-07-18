import { LOAD_CART, ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOAD_CART:
      console.log("LOAD_CART action:", action);
      console.log("LOAD_CART cart:", action.cart);
      return {
        ...state,
        cart: action.cart,
      };

    case ADD_TO_CART:
      const updatedCartAdd = [...state.cart, action.game];
      localStorage.setItem("cart", JSON.stringify(updatedCartAdd));
      return {
        ...state,
        cart: updatedCartAdd,
      };

    case REMOVE_FROM_CART:
      const updatedCartRemove = state.cart.filter(
        (game) => game._id !== action.game._id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartRemove));
      return {
        ...state,
        cart: updatedCartRemove,
      };

    case CLEAR_CART:
        localStorage.removeItem("cart");
        return {
          ...state,
          cart: [],
      };

    default:
      return state;
  }
};

import {
  GET_CART,
  ADD_CART_ITEM,
  EMPTY_CART,
  REMOVE_CART_ITEM,
} from "../actions/types";

const initialState = {
  cart: {},
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_CART_ITEM:
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: { ...state.cart, ...action.payload },
      };
    case EMPTY_CART:
      return {
        ...state,
        cart: {},
      };
    default:
      return state;
  }
}

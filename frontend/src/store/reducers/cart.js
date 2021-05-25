import {
  GET_CART,
  ADD_PLANT_TO_CART,
  REMOVE_PLANT_FROM_CART,
  EMPTY_CART,
} from "../actions/types";

const initialState = {
  cart: {
    plants: []
  },
};

export default function cartReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_PLANT_TO_CART:
    case REMOVE_PLANT_FROM_CART:
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

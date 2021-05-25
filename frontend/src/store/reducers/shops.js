import { GET_SHOPS } from "../actions/types";

const initialState = {
  SHOPS: [],
};

export default function shopsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SHOPS:
      return {
        ...state,
        SHOPS: action.payload,
      };
    default:
      return state;
  }
}

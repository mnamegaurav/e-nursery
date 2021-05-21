import { combineReducers } from "redux";
import auth from "./auth";
import cart from "./cart";
import orders from "./orders";
import plants from "./plants";
import shops from "./shops";

export default combineReducers({
  authReducer: auth,
  cartReducer: cart,
  ordersReducer: orders,
  plantsReducer: plants,
  shopsReducer: shops,
});

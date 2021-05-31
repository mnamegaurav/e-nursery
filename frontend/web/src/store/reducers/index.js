import { combineReducers } from "redux";
import authReducer from "./auth";
import cartReducer from "./cart";
import plantsReducer from "./plants";
import ordersReducer from "./orders";
import shopsReducer from "./shops";
import uiReducer from "./ui";

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  plants: plantsReducer,
  orders: ordersReducer,
  shops: shopsReducer,
  ui: uiReducer,
});

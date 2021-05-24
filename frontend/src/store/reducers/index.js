import { combineReducers } from 'redux';
import authReducer from './auth';
import cartReducer from './cart';
// import orders from "./orders";
// import plants from "./plants";
// import shops from "./shops";

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

import axios from "axios";

import { MY_CART_API } from "../../api";
import { GET_CART } from "../actions/types";
import { tokenConfig } from "./auth";

// Get Cart
export const getCart = () => (dispatch) => {
  const url = MY_CART_API;

  axios
    .get(url, tokenConfig())
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

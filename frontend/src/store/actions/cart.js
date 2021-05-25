import axios from "axios";

import { MY_CART_API } from "../../api";
import { GET_CART, UNAUTHORIZED_ACCESS } from "../actions/types";
import { tokenConfig } from "./auth";

// Get Cart
export const getCart = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  axios
    .get(MY_CART_API, tokenConfig(accessToken))
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
      }
      console.log(err);
    });
};

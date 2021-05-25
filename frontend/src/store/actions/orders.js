import axios from "axios";

import { MY_ORDERS_LIST_API, ORDER_API, ORDER_CREATE_API } from "../../api";
import {
  GET_ORDERS,
  CREATE_ORDER,
  CANCEL_ORDER,
  UNAUTHORIZED_ACCESS,
} from "../actions/types";
import { tokenConfig } from "./auth";

// Get Orders List
export const getOrders = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  axios
    .get(MY_ORDERS_LIST_API, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
      }
    });
};

// Order Cancel API
export const cancelOrder = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  axios
    .get(ORDER_API, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: CANCEL_ORDER,
        payload: res.data.id,
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
      }
    });
};

// Order Create API
export const createOrder = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  axios
    .get(ORDER_CREATE_API, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: CREATE_ORDER,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
      }
    });
};

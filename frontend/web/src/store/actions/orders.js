import axios from "axios";

import { MY_ORDERS_LIST_API, ORDER_API, ORDER_CREATE_API } from "../../api";
import {
  GET_ORDERS,
  CREATE_ORDER,
  CANCEL_ORDER,
  UI_LOADING_START,
  UI_LOADING_END,
  UNAUTHORIZED_ACCESS,
  SHOW_ALERT_MESSAGE,
} from "../actions/types";
import { tokenConfig } from "../../utils";

// Get Orders List
export const getOrders = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .get(MY_ORDERS_LIST_API, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
      }
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    });
};

// Order Cancel API
export const cancelOrder = (orderId) => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .patch(
      `${ORDER_API}${orderId}/`,
      JSON.stringify({ is_active: false }),
      tokenConfig(accessToken)
    )
    .then((res) => {
      dispatch({
        type: CANCEL_ORDER,
        payload: res.data.id,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
      //Show the alert
      dispatch({
        type: SHOW_ALERT_MESSAGE,
        payload: {
          text: "Successfully cancelled your order",
          type: "success",
        },
      });
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
        //Show the alert
        dispatch({
          type: SHOW_ALERT_MESSAGE,
          payload: {
            text: "You are authorized to perform this action!",
            type: "error",
          },
        });
      }
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    });
};

// Order Create API
export const createOrder = (plantIds) => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .post(
      ORDER_CREATE_API,
      JSON.stringify({ plants: plantIds }),
      tokenConfig(accessToken)
    )
    .then((res) => {
      //Show the alert
      dispatch({
        type: SHOW_ALERT_MESSAGE,
        payload: {
          text: "Created your new order!",
          type: "success",
        },
      });
      dispatch({
        type: CREATE_ORDER,
        payload: res.data,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
        //Show the alert
        dispatch({
          type: SHOW_ALERT_MESSAGE,
          payload: {
            text: "You are not authorized to perform this action!",
            type: "error",
          },
        });
      }
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    });
};

import axios from "axios";

import { MY_CART_API } from "../../api";
import {
  GET_CART,
  ADD_PLANT_TO_CART,
  REMOVE_PLANT_FROM_CART,
  EMPTY_CART,
  UI_LOADING_START,
  UI_LOADING_END,
  UNAUTHORIZED_ACCESS,
  SHOW_ALERT_MESSAGE,
} from "../actions/types";
import { tokenConfig } from "../../utils";

// Get Cart
export const getCart = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });

  axios
    .get(MY_CART_API, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
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

// Add Plant Cart
export const addPlantToCart = (plantId) => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  const plantIds = getState().cart.cart.plants;

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .patch(
      MY_CART_API,
      { plants: [...plantIds, plantId] },
      tokenConfig(accessToken)
    )
    .then((res) => {
      dispatch({
        type: ADD_PLANT_TO_CART,
        payload: res.data,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
      //Show the alert
      dispatch({
        type: SHOW_ALERT_MESSAGE,
        payload: {
          text: "Added the plant to cart!",
          type: "success",
        },
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
        //Show the alert
        dispatch({
          type: SHOW_ALERT_MESSAGE,
          payload: {
            text: "You are not authorized to perform this action.",
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

// Remove Plant fROM Cart
export const removePlantFromCart = (plantId) => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  const plants = getState().cart.cart.plants;
  const plantIds = plants.filter((prevPlantId) => prevPlantId !== plantId);

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .patch(MY_CART_API, { plants: plantIds }, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: REMOVE_PLANT_FROM_CART,
        payload: res.data,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
      //Show the alert
      dispatch({
        type: SHOW_ALERT_MESSAGE,
        payload: {
          text: "Removed a plant from the cart!",
          type: "success",
        },
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
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

// Empty Cart
export const emptyCart = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .patch(MY_CART_API, { plants: [] }, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: EMPTY_CART,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
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

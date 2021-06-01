import axios from "axios";

import { PLANTS_LIST_API } from "../../api";
import {
  GET_PLANTS,
  UI_LOADING_START,
  UI_LOADING_END,
  UNAUTHORIZED_ACCESS,
  SHOW_ALERT_MESSAGE,
} from "../actions/types";
import { tokenConfig } from "../../utils";

// Get Plants List
export const getPlants = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .get(PLANTS_LIST_API, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: GET_PLANTS,
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
            text: "You  are not authorized to perform this action!",
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

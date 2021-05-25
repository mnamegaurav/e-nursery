import axios from "axios";

import { PLANTS_LIST_API } from "../../api";
import { GET_PLANTS, UNAUTHORIZED_ACCESS } from "../actions/types";
import { tokenConfig } from "../../utils";

// Get Plants List
export const getPlants = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  axios
    .get(PLANTS_LIST_API, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: GET_PLANTS,
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

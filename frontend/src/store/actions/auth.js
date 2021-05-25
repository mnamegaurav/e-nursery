import axios from "axios";

import {
  SIGNIN_API,
  SIGNUP_API,
  SIGNOUT_API,
  USER_DETAIL_API,
} from "../../api";
import {
  USER_LOADING,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "../actions/types";
import { tokenConfig } from "../../utils";

// Load User during app loading
export const loadUser = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  if (accessToken) {
    // USER LOADING
    dispatch({
      type: USER_LOADING,
    });
    axios
      .get(USER_DETAIL_API, tokenConfig(accessToken))
      .then((res) => {
        dispatch({
          type: USER_LOADING_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: USER_LOADING_FAIL,
        });
      });
  }
};

// Signin
export const signIn = (email, password) => (dispatch) => {
  axios
    .post(
      SIGNIN_API,
      JSON.stringify({
        email,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SIGNIN_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SIGNIN_FAIL,
        });
      }
    });
};

// Signup
export const signUp = (credentials) => (dispatch) => {
  axios
    .post(SIGNUP_API, JSON.stringify(credentials), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SIGNUP_FAIL,
        });
      }
    });
};

// Signout
export const signOut = () => (dispatch, getState) => {
  axios
    .post(SIGNOUT_API, {
      refresh_token: getState().auth.refresh,
    })
    .then((res) => {
      dispatch({
        type: SIGNOUT_SUCCESS,
      });
    });
};

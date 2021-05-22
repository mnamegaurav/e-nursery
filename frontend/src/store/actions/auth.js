import axios from "axios";

import { SIGNIN_API, SIGNUP_API, SIGNOUT_API } from "../../api";
import {
  USER_LOADING,
  USER_LOADED,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "../actions/types";

// Setup config with token - helper function
export const tokenConfig = () => {
  // GET TOKEN FROM STATE
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIxNjY4NDk2LCJqdGkiOiI4MjY5NGRiODA3Njg0ODVjYjU1N2ZkYmM1ZWFjNmViMCIsInVzZXJfaWQiOjF9.d9N3iGvGq3E8Adx5mQQB2wFU2CZ2xNOlVdcOPfQAAE0";

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // if token add it to headers
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

// Signin
export const signIn =
  ({ email, password }) =>
  (dispatch) => {
    const url = SIGNIN_API;
    const data = {
      email,
      password,
    };

    if (typeof window !== undefined) {
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          localStorage.setItem("access", res.access);
          localStorage.setItem("refresh", res.refresh);
          dispatch({
            type: SIGNIN_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            dispatch({
              type: SIGNIN_FAIL,
              payload: err.response.data,
            });
          }
        });
    }
  };

// Signup
export const signUp = (user) => (dispatch) => {
  const url = SIGNUP_API;
  const data = user;

  if (typeof window !== undefined) {
    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          dispatch({
            type: SIGNUP_FAIL,
            payload: err.response.data,
          });
        }
      });
  }
};

// Signout
export const signOut = () => (dispatch) => {
  const url = SIGNOUT_API;

  if (typeof window !== undefined) {
    const refresh_token = window.localStorage.getItem("refresh");
    const data = {
      refresh_token,
    };

    localStorage.clear();

    axios.post(url, data).then((res) => {
      console.log(res);
      localStorage.clear();
      dispatch({
        type: SIGNOUT_SUCCESS,
      });
    });
  }
};

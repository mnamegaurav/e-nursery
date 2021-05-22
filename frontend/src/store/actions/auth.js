import axios from "axios";

import {
  SIGNIN_API,
  SIGNUP_API,
  SIGNOUT_API,
  TOKEN_REFRESH_API,
} from "../../api";
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
  const token = localStorage.getItem("access");

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

// Load User during app loading
export const loadUser = () => (dispatch, getState) => {
  const url = TOKEN_REFRESH_API;
  const data = JSON.stringify({
    refresh: localStorage.getItem("refresh"),
  });

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (typeof window !== undefined) {
    axios
      .post(url, data, config)
      .then((res) => {
        if (res.data && res.data.access) {
          localStorage.setItem("access", res.data.access);
        }
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("some error in token refresh bhai", err);
        if (err.response) {
          dispatch({
            type: SIGNIN_FAIL,
            payload: err.response.data,
          });
        }
      });
  }
};

// Signin
export const signIn = (email, password) => (dispatch) => {
  const url = SIGNIN_API;
  const data = JSON.stringify({
    email,
    password,
  });

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (typeof window !== undefined) {
    axios
      .post(url, data, config)
      .then((res) => {
        if (res.data && res.data.access && res.data.refresh) {
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
        }
        dispatch({
          type: SIGNIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
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
export const signUp = (credentials) => (dispatch) => {
  const url = SIGNUP_API;
  const data = JSON.stringify(credentials);

  console.log(data);
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (typeof window !== undefined) {
    axios
      .post(url, data, config)
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
    const data = {
      refresh_token: localStorage.getItem("refresh"),
    };

    localStorage.clear();

    axios.post(url, data).then((res) => {
      console.log(res);
      dispatch({
        type: SIGNOUT_SUCCESS,
      });
    });
  }
};

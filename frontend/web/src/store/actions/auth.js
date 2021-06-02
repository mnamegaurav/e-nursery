import axios from "axios";

import {
  SIGNIN_API,
  SIGNUP_API,
  SIGNOUT_API,
  USER_DETAIL_API,
  USER_DEACTIVATE_API,
  TOKEN_REFRESH_API,
} from "../../api";
import {
  USER_LOADING,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAIL,
  TOKEN_REFRESHED,
  USER_DEACTIVATED,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  UI_LOADING_START,
  UI_LOADING_END,
  SHOW_ALERT_MESSAGE,
  USER_DETAILS_UPDATED,
} from "../actions/types";
import { tokenConfig } from "../../utils";

export const getAccessTokenByRefreshToken = (
  accessToken,
  refreshToken,
  dispatch
) => {
  // retrieve the access token
  axios
    .post(
      TOKEN_REFRESH_API,
      JSON.stringify({ refresh: refreshToken }),
      tokenConfig(accessToken)
    )
    .then((res) => {
      if (res.data && res.data.access) {
        // Token refreshed
        dispatch({
          type: TOKEN_REFRESHED,
          payload: res.data.access,
        });
        // load the user
        dispatch(loadUser());
      } else {
        dispatch({
          type: USER_LOADING_FAIL,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: USER_LOADING_FAIL,
      });
    });
};

// Load User during app loading
export const loadUser = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;
  const refreshToken = auth.refresh;

  if (accessToken) {
    // Start Loading the UI
    dispatch({
      type: UI_LOADING_START,
    });
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
        // End Loading the UI
        dispatch({
          type: UI_LOADING_END,
        });
      })
      .catch((err) => {
        if (refreshToken) {
          // try using refresh token to load the user
          getAccessTokenByRefreshToken(accessToken, refreshToken, dispatch);
        } else {
          dispatch({
            type: USER_LOADING_FAIL,
          });
        }
        // End Loading the UI
        dispatch({
          type: UI_LOADING_END,
        });
      });
  }
};

// Signin
export const signIn = (email, password) => (dispatch) => {
  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
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
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
      //Show the alert
      dispatch({
        type: SHOW_ALERT_MESSAGE,
        payload: {
          text: "Successfully signed in, Welcome!",
          type: "success",
        },
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SIGNIN_FAIL,
        });
        //Show the alert
        dispatch({
          type: SHOW_ALERT_MESSAGE,
          payload: {
            text:
              (err.response && err.response.detail) || "Some Error occured.",
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

// Signup
export const signUp = (credentials) => (dispatch) => {
  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
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
        //Show the alert
        dispatch({
          type: SHOW_ALERT_MESSAGE,
          payload: {
            text: "Successfully created your account, Please Signin.",
            type: "success",
          },
        });
      }
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SIGNUP_FAIL,
        });
        //Show the alert
        dispatch({
          type: SHOW_ALERT_MESSAGE,
          payload: {
            text:
              (err.response && err.response.detail) || "Some Error occured.",
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

// Signout
export const signOut = () => (dispatch, getState) => {
  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .post(SIGNOUT_API, {
      refresh_token: getState().auth.refresh,
    })
    .then((res) => {
      dispatch({
        type: SIGNOUT_SUCCESS,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
      //Show the alert
      dispatch({
        type: SHOW_ALERT_MESSAGE,
        payload: {
          text: "We are hoping to see you again very soon!",
          type: "success",
        },
      });
    });
};

// Update the profile
export const updateUserDetails = (userDetail) => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  if (accessToken) {
    // Start Loading the UI
    dispatch({
      type: UI_LOADING_START,
    });
    axios
      .patch(
        USER_DETAIL_API,
        JSON.stringify(userDetail),
        tokenConfig(accessToken)
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: USER_DETAILS_UPDATED,
            payload: res.data,
          });
          //Show the alert
          dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: {
              text: "Successfully updated the profile details!",
              type: "success",
            },
          });
        }
        // End Loading the UI
        dispatch({
          type: UI_LOADING_END,
        });
      })
      .catch((err) => {
        if (err.response) {
          //Show the alert
          dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: {
              text: "Unable to update the details, some error occured!",
              type: "error",
            },
          });
        }
        // End Loading the UI
        dispatch({
          type: UI_LOADING_END,
        });
      });
  }
};

// deactivate the profile
export const deactivateUser = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  if (accessToken) {
    // Start Loading the UI
    dispatch({
      type: UI_LOADING_START,
    });
    axios
      .patch(
        USER_DEACTIVATE_API,
        JSON.stringify({ is_active: false }),
        tokenConfig(accessToken)
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: USER_DEACTIVATED,
          });
          //Show the alert
          dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: {
              text: "We are sorry to see you go, hoping for your return!",
              type: "success",
            },
          });
        }
        // End Loading the UI
        dispatch({
          type: UI_LOADING_END,
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          //Show the alert
          dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: {
              text: "You are not authorized to perform this action",
              type: "error",
            },
          });
        }
        // End Loading the UI
        dispatch({
          type: UI_LOADING_END,
        });
      });
  }
};

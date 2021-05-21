import axios from "axios";

import { SIGNIN_API, SIGNUP_API, SIGNOUT_API } from "./index";

// Signin
export const signIn = ({ email, password }) => {
  const url = SIGNIN_API;
  const data = {
    email,
    password,
  };

  axios
    .post(url, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Signup
export const signUp = (user) => {
  const url = SIGNUP_API;
  const data = user;

  axios
    .post(url, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Signout
export const signOut = () => {
  const url = SIGNOUT_API;

  if (typeof window !== undefined) {
    const refresh_token = window.localStorage.getItem("refreshToken");
    const data = {
      refresh_token,
    };

    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

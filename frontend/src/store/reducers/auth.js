import {
  USER_LOADING,
  USER_LOADED,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "../actions/types";

const initialState = {
  refresh: localStorage.getItem("refresh"),
  access: localStorage.getItem("access"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload,
      };
    case SIGNIN_FAIL:
    case SIGNUP_FAIL:
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        access: null,
        refresh: null,
      };
    default:
      return state;
  }
}

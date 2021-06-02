import {
  USER_LOADING,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAIL,
  TOKEN_REFRESHED,
  USER_DETAILS_UPDATED,
  USER_DEACTIVATED,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNOUT_SUCCESS,
  UNAUTHORIZED_ACCESS,
} from "../actions/types";

const initialState = {
  refresh: localStorage.getItem("refresh") || null,
  access: localStorage.getItem("access") || null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADING_SUCCESS:
    case USER_DETAILS_UPDATED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload,
      };
    case SIGNIN_FAIL:
    case SIGNUP_FAIL:
    case SIGNOUT_SUCCESS:
    case USER_LOADING_FAIL:
    case UNAUTHORIZED_ACCESS:
    case USER_DEACTIVATED:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        access: null,
        refresh: null,
      };
    case TOKEN_REFRESHED:
      localStorage.setItem("access", action.payload);
      return {
        ...state,
        access: action.payload,
      };
    default:
      return state;
  }
}

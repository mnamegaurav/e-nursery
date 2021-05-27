import {
  UI_LOADING_START,
  UI_LOADING_END,
  UI_THEME_TOGGLE,
} from "../actions/types";

const initialState = {
  isUiLoading: false,
  defaultTheme: localStorage.getItem("defaultTheme") || "dark",
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case UI_LOADING_START:
      return {
        ...state,
        isUiLoading: true,
      };
    case UI_LOADING_END:
      return {
        ...state,
        isUiLoading: false,
      };
    case UI_THEME_TOGGLE:
      localStorage.setItem("defaultTheme", action.payload);
      return {
        ...state,
        defaultTheme: action.payload,
      };
    default:
      return state;
  }
}

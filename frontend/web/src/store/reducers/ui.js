import {
  UI_LOADING_START,
  UI_LOADING_END,
  UI_THEME_TOGGLE,
  SHOW_ALERT_MESSAGE,
  HIDE_ALERT_MESSAGE,
} from "../actions/types";

const initialState = {
  isUiLoading: false,
  defaultTheme: localStorage.getItem("defaultTheme") || "dark",
  alertMessage: {
    text: null,
    type: null,
  },
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
    case SHOW_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.payload,
      };
    case HIDE_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: {
          text: null,
          type: null,
        },
      };
    default:
      return state;
  }
}

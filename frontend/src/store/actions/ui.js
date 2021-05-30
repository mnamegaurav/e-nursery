import {
  UI_THEME_TOGGLE,
  SHOW_ALERT_MESSAGE,
  HIDE_ALERT_MESSAGE,
} from "../actions/types";

// Toggle Theme
export const toggleTheme = (defaultTheme) => (dispatch) => {
  // Start Loading the UI
  dispatch({
    type: UI_THEME_TOGGLE,
    payload: defaultTheme,
  });
};

// Show alert message
export const showAlert =
  ({ text, type }) =>
  (dispatch) => {
    // dispatch the action
    dispatch({
      type: SHOW_ALERT_MESSAGE,
      payload: { text, type },
    });
  };

// Hide alert message
export const hideAlert = () => (dispatch) => {
  // dispatch the action
  dispatch({
    type: HIDE_ALERT_MESSAGE,
  });
};

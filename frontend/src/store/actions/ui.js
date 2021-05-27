import { UI_THEME_TOGGLE } from "../actions/types";

// Toggle Theme
export const toggleTheme = (defaultTheme) => (dispatch) => {
  // Start Loading the UI
  dispatch({
    type: UI_THEME_TOGGLE,
    payload: defaultTheme,
  });
};

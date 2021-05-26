import { UI_LOADING_START, UI_LOADING_END } from "../actions/types";

const initialState = {
  isUiLoading: false,
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
    default:
      return state;
  }
}

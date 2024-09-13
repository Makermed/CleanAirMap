import * as ActionTypes from "./ActionTypes";

export const selectThemeMode = (mode) => (dispatch) => {
  dispatch({
    type: ActionTypes.SELECT_THEME_MODE,
    mode,
  });
};

export const initScrollPos = () => (dispatch) => {
  dispatch({
    type: ActionTypes.INIT_SCROLL_POS,
  });
};

export const showTopNavbar = (show) => (dispatch) => {
  dispatch({
    type: ActionTypes.SHOW_TOP_NAVBAR,
    show,
  });
};

export const setLoginBackRoute = (route) => (dispatch) => {
  dispatch({
    type: ActionTypes.LOGIN_BACKROUTE,
    route,
  });
};

import * as ActionTypes from "../actions/ActionTypes";
import {
  THEME_MODE_LIGHT 
} from "../constants/types";

const initialState = {
  theme_mode: THEME_MODE_LIGHT,
  show_splash: true,
  topNavbar: true,
  bottomNavbar: true,


  login_backroute: null,

  requesting: false,
  message: "",

  scrollPos: { x: 0, y: 0 },
  searchScrollPos: { x: 0, y: 0 },

};


function uiReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SELECT_THEME_MODE: {
      return {
        ...state,
        theme_mode: action.mode
      };
    }
    default:
      return state;
  }
}

export default uiReducer;

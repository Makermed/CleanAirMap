import * as ActionTypes from "actions/ActionTypes";
import {
  THEME_MODE_LIGHT, 
  TAB_FEED, 
  TAB_TRENDING, 
} from "constants/types";
import * as ROUTES from 'constants/routes';
import { ARTICLE_BRANCH_YOUTUBE } from "constants/branches";
import { USA } from "constants/country";

const initialState = {
  theme_mode: THEME_MODE_LIGHT,
  show_splash: true,
  topNavbar: true,
  bottomNavbar: true,

  feedtab: TAB_FEED,
  discovertab: TAB_TRENDING,
  // locationtab: TAB_LOC_READINGS,

  category_backroute: ROUTES.HOME,
  feed_backroute: ROUTES.HOME,
  source_backroute: ROUTES.HOME,
  article_backroute: ROUTES.HOME,
  user_backroute: ROUTES.HOME,

  login_backroute: null,

  requesting: false,
  message: "",

  scrollPos: { x: 0, y: 0 },
  searchScrollPos: { x: 0, y: 0 },

  trending_branch: ARTICLE_BRANCH_YOUTUBE,
  trending_country: USA,
  trending_tagindex: 0,

  feed_create_state: null
};


function uiReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SELECT_THEME_MODE: {
      return {
        ...state,
        theme_mode: action.mode
      };
    }

    case ActionTypes.SHOW_SPLASH_SCREEN: {
      return {
        ...state,
        show_splash: action.now
      };
    }

    case ActionTypes.REQUEST_DATA_PENDING: {
      return {
        ...state,
        requesting: true
      };
    }

    case ActionTypes.REQUEST_DATA_FINISHED: {
      return {
        ...state,
        requesting: false
      };
    }

    case ActionTypes.LOGIN_BACKROUTE: {
      return {
        ...state,
        login_backroute: action.route
      };
    }

    case ActionTypes.CATEGORY_BACK_ROUTE: {
      return {
        ...state,
        category_backroute: action.route
      };
    }

    case ActionTypes.FEED_BACK_ROUTE: {
      return {
        ...state,
        feed_backroute: action.route
      };
    }

    case ActionTypes.SOURCE_BACK_ROUTE: {
      return {
        ...state,
        source_backroute: action.route
      };
    }

    case ActionTypes.ARTICLE_BACK_ROUTE: {
      return {
        ...state,
        article_backroute: action.route
      };
    }

    case ActionTypes.INIT_SCROLL_POS:
      return {
        ...state,
        scrollPos: { x: 0, y: 0 },
        topNavbar: true
      }

    case ActionTypes.SAVE_SCROLL_POS:
      return {
        ...state,
        scrollPos: action.pos
      };

    case ActionTypes.INIT_SEARCH_SCROLL_POS:
      return {
        ...state,
        searchScrollPos: { x: 0, y: 0 }
      };

    case ActionTypes.SAVE_SEARCH_SCROLL_POS:
      return {
        ...state,
        searchScrollPos: action.pos
      };

    case ActionTypes.SHOW_TOP_NAVBAR: {
      let prevShow = state.topNavbar;
      if (prevShow === action.show) {
        return state;
      }
      return {
        ...state,
        topNavbar: action.show
      };
    }

    case ActionTypes.SHOW_BOTTOM_NAVBAR: {
      let prevShow = state.bottomNavbar;
      if (prevShow === action.show) {
        return state;
      }
      return {
        ...state,
        bottomNavbar: action.show
      };
    }

    case ActionTypes.SELECT_FEED_TAB: {
      return {
        ...state,
        feedtab: action.tab
      };
    }

    case ActionTypes.SELECT_DISCOVER_TAB: {
      return {
        ...state,
        discovertab: action.tab
      };
    }

    // case ActionTypes.SELECT_LOCATION_TAB: {
    //   return {
    //     ...state,
    //     locationtab: action.tab
    //   };
    // }

    case ActionTypes.SET_TRENDING_BRANCH: {
      return {
        ...state,
        trending_branch: action.branch,
        trending_tagindex: 0,
      };
    }

    case ActionTypes.SET_TRENDING_COUNTRY: {
      return {
        ...state,
        trending_country: action.country,
        trending_tagindex: 0,
      };
    }

    case ActionTypes.SET_TRENDING_TAGINDEX: {
      return {
        ...state,
        trending_tagindex: action.tagindex
      };
    }

    case ActionTypes.SET_FEED_CREATE_STATE: {
      return {
        ...state,
        feed_create_state: action.state
      };
    }

    default:
      return state;
  }
}

export default uiReducer;

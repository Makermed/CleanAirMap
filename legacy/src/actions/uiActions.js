import * as ActionTypes from "./ActionTypes";

export const selectThemeMode = mode => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_THEME_MODE,
    mode
  });
}

export const showSplashScreen = show => dispatch => {
  dispatch({
    type: ActionTypes.SHOW_SPLASH_SCREEN,
    show
  });
}

export const requestDataPending = () => dispatch => {
  dispatch({
    type: ActionTypes.REQUEST_DATA_PENDING
  });
}

export const requestDataFinished = () => dispatch => {
  dispatch({
    type: ActionTypes.REQUEST_DATA_FINISHED
  });
}

export const initScrollPos = () => dispatch => {
  dispatch({ 
    type: ActionTypes.INIT_SCROLL_POS 
  });
};

export const saveScrollPos = (X, Y) => dispatch => {
  dispatch({ 
    type: ActionTypes.SAVE_SCROLL_POS, 
    pos: { x: X, y: Y } 
  });
};

export const showTopNavbar = show => dispatch => {
  dispatch({
    type: ActionTypes.SHOW_TOP_NAVBAR,
    show
  });
};

export const showBottomNavbar = show => dispatch => {
  dispatch({
    type: ActionTypes.SHOW_BOTTOM_NAVBAR,
    show
  });
};

export const selectFeedTab = tab => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_FEED_TAB,
    tab
  });
};

export const selectDiscoverTab = tab => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_DISCOVER_TAB,
    tab
  });
};

export const setLoginBackRoute = route => dispatch => {
  dispatch({
    type: ActionTypes.LOGIN_BACKROUTE,
    route
  })
}

export const setCategoryBackRoute = route => dispatch => {
  dispatch({
    type: ActionTypes.CATEGORY_BACK_ROUTE,
    route
  })
}

export const setFeedBackRoute = route => dispatch => {
  dispatch({
    type: ActionTypes.FEED_BACK_ROUTE,
    route
  })
}

export const setSourceBackRoute = route => dispatch => {
  dispatch({
    type: ActionTypes.SOURCE_BACK_ROUTE,
    route
  })
}

export const setArticleBackRoute = route => dispatch => {
  dispatch({
    type: ActionTypes.ARTICLE_BACK_ROUTE,
    route
  })
}

export const setUserBackRoute = route => dispatch => {
  dispatch({
    type: ActionTypes.USER_BACK_ROUTE,
    route
  })
}

export const initSearchScrollPos = () => dispatch => {
  dispatch({
    type: ActionTypes.INIT_SEARCH_SCROLL_POS
  })
};

export const saveSearchScrollPos = (X, Y) => dispatch => {
  dispatch({
    type: ActionTypes.SAVE_SEARCH_SCROLL_POS,
    pos: { x: X, y: Y }
  })
};

export const setTrendingBranch = (branch) => dispatch => {
  dispatch({
    type: ActionTypes.SET_TRENDING_BRANCH,
    branch
  });
};

export const setTrendingCountry = (country) => dispatch => {
  dispatch({
    type: ActionTypes.SET_TRENDING_COUNTRY,
    country
  });
};

export const setTrendingTag = (tagindex) => dispatch => {
  dispatch({
    type: ActionTypes.SET_TRENDING_TAGINDEX,
    tagindex
  });
};


export const setFeedCreateState = (state) => dispatch => {
  dispatch({
    type: ActionTypes.SET_FEED_CREATE_STATE,
    state
  });
};
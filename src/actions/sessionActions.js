import * as ActionTypes from './ActionTypes';

export const setAuthUser = authUser => dispatch =>
  dispatch({ 
    type: ActionTypes.SET_AUTH_USER,
    authUser
   });

export const signIn = authUser => dispatch =>
  dispatch({
    type: ActionTypes.SESSION_LOGIN,
    authUser
  });

export const signOut = () => dispatch =>
  dispatch({
    type: ActionTypes.SESSION_LOGOUT
  });

export const updateUserProfile = profile => dispatch =>
  dispatch({
    type: ActionTypes.UPDATE_USER_PROFILE,
    profile
  });

export const updateUserPaid = paid => dispatch =>
  dispatch({
    type: ActionTypes.UPDATE_USER_PAID,
    paid
  });

export const setFollowingFeedUser = (feed, following) => dispatch =>
  dispatch({
    type: ActionTypes.SET_FOLLOWING_FEED_USER,
    feed,
    following
  });

export const giveupFeedOwnerUser = (feed) => dispatch =>
  dispatch({
    type: ActionTypes.GIVEUP_FEED_OWNER_USER,
    feed
  });

export const addCategoryModerated = category => dispatch =>
  dispatch({
    type: ActionTypes.ADD_CATEGORY_MODERATED,
    category
  });

export const deleteCategoryModerated = category_id => dispatch =>
  dispatch({
    type: ActionTypes.DELETE_CATEGORY_MODERATED,
    category_id
  });
  
export const addFeedModerated = feed => dispatch =>
  dispatch({
    type: ActionTypes.ADD_FEED_MODERATED,
    feed
  });

export const deleteFeedModerated = feed => dispatch =>
  dispatch({
    type: ActionTypes.DELETE_FEED_MODERATED,
    feed
  });

export const addFollowUser = user => dispatch =>
  dispatch({
    type: ActionTypes.ADD_FOLLOW_USER,
    user
  });

export const deleteFollowUser = user_id => dispatch =>
  dispatch({
    type: ActionTypes.DELETE_FOLLOW_USER,
    user_id
  });

export const addUserInvite = user => dispatch =>
  dispatch({
    type: ActionTypes.ADD_USER_INVITE,
    user
  });

export const deleteUserInvite = user_id => dispatch =>
  dispatch({
    type: ActionTypes.DELETE_USER_INVITE,
    user_id
  });

export const updateFeedsSubscribed = feeds_subscribed => dispatch =>
  dispatch({
    type: ActionTypes.UPDATE_FEEDS_SUBSCRIBED,
    feeds_subscribed
  });

export const deleteFeedsSubscribed = () => dispatch =>
  dispatch({
    type: ActionTypes.DELETE_FEEDS_SUBSCRIBED
  });

export const addUserFeedShowFirst = (feed_id) => dispatch => {
  dispatch({
    type: ActionTypes.ADD_USER_FEED_SHOWFIRST,
    feed_id
  });
}

export const updateFeedsOrder = (orders) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEEDS_ORDER,
    orders
  });
}

export const deleteUserFeedShowFirst = (feed_id) => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_USER_FEED_SHOWFIRST,
    feed_id
  });
}


export const setMapCenterPos = (lng, lat) => dispatch => {
  dispatch({
    type: ActionTypes.SET_MAP_CENTER_POS,
    lng,
    lat
  });
}

export const setMapParams = (lng, lat, zoom, bounds) => dispatch => {
  dispatch({
    type: ActionTypes.SET_MAP_PARAMS,
    lng,
    lat,
    zoom,
    bounds
  });
}

export const insertFollowingLocation = (location_id) => (dispatch) => {
  dispatch({
    type: ActionTypes.INSERT_FOLLOWING_LOCATION,
    location_id,
  });
};

export const deleteFollowingLocation = (location_id) => (dispatch) => {
  dispatch({
    type: ActionTypes.DELETE_FOLLOWING_LOCATION,
    location_id,
  });
}

export const insertRegionModerator = (moderator) => (dispatch) => {
  dispatch({
    type: ActionTypes.INSERT_REGION_MODERATOR,
    moderator,
  });
};

export const deleteRegionModerator = (moderator_id) => (dispatch) => {
  dispatch({
    type: ActionTypes.DELETE_REGION_MODERATOR,
    moderator_id,
  });
}

export const approveRegionModerator = (moderator) => (dispatch) => {
  dispatch({
    type: ActionTypes.APPROVE_REGION_MODERATOR,
    moderator,
  });
};

export const insertLocationModerator = (moderator) => (dispatch) => {
  dispatch({
    type: ActionTypes.INSERT_LOCATION_MODERATOR,
    moderator,
  });
};

export const deleteLocationModerator = (moderator_id) => (dispatch) => {
  dispatch({
    type: ActionTypes.DELETE_LOCATION_MODERATOR,
    moderator_id,
  });
}

export const approveLocationModerator = (moderator) => (dispatch) => {
  dispatch({
    type: ActionTypes.APPROVE_LOCATION_MODERATOR,
    moderator,
  });
};
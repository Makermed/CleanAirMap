import * as ActionTypes from "./ActionTypes";


export const setMapViewMode = (mode) => dispatch => {
  dispatch({
    type: ActionTypes.SET_MAP_VIEW_MODE,
    mode
  });
}

export const setMapRegions = (regions) => dispatch => {
  dispatch({
    type: ActionTypes.SET_MAP_REGIONS,
    regions
  });
}

export const insertMapRegion = (region) => dispatch => {
  dispatch({
    type: ActionTypes.INSERT_MAP_REGION,
    region
  });
}

export const deleteMAPRegion = (region_id) => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_MAP_REGION,
    region_id
  });
}

export const setMapLocations = (locations) => dispatch => {
  dispatch({
    type: ActionTypes.SET_MAP_LOCATIONS,
    locations
  });
}

export const selectMapLocation = (location) => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_MAP_LOCATION,
    location
  });
}

export const insertMapLocation = (location) => dispatch => {
  dispatch({
    type: ActionTypes.INSERT_MAP_LOCATION,
    location
  });
}

export const updateMapLocation = (location) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_MAP_LOCATION,
    location
  });
}

export const updateMapLocationOpReadings = (location_id, op_readings) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_MAP_LOCATION_OP_READINGS,
    location_id,
    op_readings
  });
}

export const updateMapLocationOpImageupload = (location_id, op_imageupload) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_MAP_LOCATION_OP_IMAGEUPLOAD,
    location_id,
    op_imageupload
  });
}

export const updateMapLocationOpModeration = (location_id, op_moderation) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_MAP_LOCATION_OP_MODERATION,
    location_id,
    op_moderation
  });
}

export const updateMapLocationOpDescription = (location_id, op_description) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_MAP_LOCATION_OP_DESCRIPTION,
    location_id,
    op_description
  });
}

export const updateMapLocationOpComments = (location_id, op_comments) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_MAP_LOCATION_OP_COMMENTS,
    location_id,
    op_comments
  });
}

export const updateMapLocationReadingConf = (location_id, reading_conf) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_MAP_LOCATION_READINGCONF,
    location_id,
    reading_conf
  });
}

export const deleteMapLocation = (location_id) => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_MAP_LOCATION,
    location_id
  });
}

export const setLocationGeoPos = (lng, lat) => dispatch => {
  dispatch({
    type: ActionTypes.SET_LOCATION_GEOPOS,
    lng,
    lat
  });
}

export const selectLocationTab = (tab) => (dispatch) => {
  dispatch({
    type: ActionTypes.SELECT_LOCATION_TAB,
    tab,
  });
}

export const setMapPosts = (articles, last_offset) => dispatch => {
  dispatch({
    type: ActionTypes.SET_MAP_POSTS,
    articles,
    last_offset
  });
}

export const appendMapPosts = (articles, last_offset) => dispatch => {
  dispatch({
    type: ActionTypes.APPEND_MAP_POSTS,
    articles,
    last_offset
  });
}

export const selectMapPost = (article) => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_MAP_POST,
    article
  });
}
import * as ActionTypes from "./ActionTypes";

export const setMapViewMode = (mode) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_MAP_VIEW_MODE,
    mode,
  });
};

export const setMapRegions = (regions) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_MAP_REGIONS,
    regions,
  });
};

export const setMapLocations = (locations) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_MAP_LOCATIONS,
    locations,
  });
};

export const selectMapLocation = (location) => (dispatch) => {
  dispatch({
    type: ActionTypes.SELECT_MAP_LOCATION,
    location,
  });
};

export const setLocationGeoPos = (lng, lat) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_LOCATION_GEOPOS,
    lng,
    lat,
  });
};

export const selectLocationTab = (tab) => (dispatch) => {
  dispatch({
    type: ActionTypes.SELECT_LOCATION_TAB,
    tab,
  });
};

export const selectMapPost = (post) => (dispatch) => {
  dispatch({
    type: ActionTypes.SELECT_MAP_POST,
    post,
  });
};

export const selectMapTab = (tab) => (dispatch) => {
  dispatch({
    type: ActionTypes.SELECT_MAP_TAB,
    tab,
  });
};

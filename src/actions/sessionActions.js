import * as ActionTypes from './ActionTypes';

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

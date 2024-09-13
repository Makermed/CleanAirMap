import * as ActionTypes from "../actions/ActionTypes";
import {
  TAB_MAP_READINGS,
} from "../constants/types";
import { MAP_VIEW_ALL } from "../constants/maplocation";
import { logger } from "../utility/logging";

const initialState = {
  map_view_mode: MAP_VIEW_ALL,
  regions: [],
  locations: [],
  selected_location: null,
  cleanair_values: [],
  map_posts: [],
  map_posts_last_offset: 0,
  selected_map_post: null,

  map_articles: [],
  map_articles_last_offset: 0,

  geo_lat: null,
  geo_lng: null,
  selected_reading: null,

  maptab: TAB_MAP_READINGS,
};

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_MAP_VIEW_MODE: {
      return {
        ...state,
        map_view_mode: action.mode,
      };
    }

    case ActionTypes.SET_MAP_REGIONS: {
      return {
        ...state,
        regions: action.regions,
      };
    }

    case ActionTypes.SET_MAP_LOCATIONS: {
      let locations = state.locations;
      const new_locations = JSON.parse(JSON.stringify(action.locations));
      for (let new_location of new_locations) {
        if (new_location.readings.length === 0) continue;
        if (
          locations.findIndex((location) => location.id === new_location.id) ===
          -1
        ) {
          locations.push(new_location);
        } else {
          logger.log("duplicate location : ", new_location.name);
        }
      }
      return {
        ...state,
        locations: locations,
      };
    }

    case ActionTypes.SELECT_MAP_LOCATION: {
      const locations =
        action.location === null
          ? state.locations
          : state.locations.map((location) => {
              return location.id === action.location.id
                ? action.location
                : location;
            });
      return {
        ...state,
        locations: locations,
        selected_location: action.location,
      };
    }

    case ActionTypes.SET_LOCATION_GEOPOS: {
      return {
        ...state,
        geo_lat: action.lat,
        geo_lng: action.lng,
      };
    }


    case ActionTypes.SELECT_MAP_POST: {
      return {
        ...state,
        selected_map_post: action.post,
      };
    }

    case ActionTypes.SELECT_MAP_TAB: {
      return {
        ...state,
        maptab: action.tab,
      };
    }

    default:
      return state;
  }
}

export default mapReducer;

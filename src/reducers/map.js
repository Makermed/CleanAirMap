import * as ActionTypes from "actions/ActionTypes";
import { TAB_LOC_READINGS } from "constants/types";
import { MAP_VIEW_ALL } from "constants/maplocation";

const initialState = {
  map_view_mode: MAP_VIEW_ALL,
  regions: [],
  locations: [],
  selected_location: null,
  cleanair_values: [],
  map_posts: [],
  map_posts_last_offset: 0,
  selected_map_post: null,

  geo_lat: null,
  geo_lng: null,

  locationtab: TAB_LOC_READINGS,
};

function mapReducer(state = initialState, action) {
  switch (action.type) {

    case ActionTypes.SET_MAP_VIEW_MODE: {
      return {
        ...state,
        map_view_mode: action.mode
      };
    }

    case ActionTypes.SET_MAP_REGIONS: {
      return {
        ...state,
        regions: action.regions,
      };
    }

    case ActionTypes.INSERT_MAP_REGION: {
      let regions = state.regions.slice();
      if (regions.find(region => region.id === action.region.id) === undefined) {
        regions.push(action.region);
      }
      return {
        ...state,
        regions: regions
      };
    }

    case ActionTypes.DELETE_MAP_REGION: {
      const regions = state.regions.filter(region => region.id !== action.region.id);
      return {
        ...state,
        regions: regions
      };
    }

    case ActionTypes.SET_MAP_LOCATIONS: {
      let locations = state.locations;
      const new_locations = JSON.parse(JSON.stringify(action.locations));
      for (let new_location of new_locations) {
        if (locations.findIndex(location => location.id === new_location.id) === -1) {
          locations.push(new_location);
        } else {
          console.log("duplicate location : ", new_location.name);
        }
      }
      return {
        ...state,
        locations: locations,
      };
    }

    case ActionTypes.SELECT_MAP_LOCATION: {
      const locations = action.location === null ? state.locations : state.locations.map(location => {
        return location.id === action.location.id ? action.location : location;
      });
      return {
        ...state,
        locations: locations,
        selected_location: action.location,
      };
    }

    case ActionTypes.INSERT_MAP_LOCATION: {
      let locations = state.locations.slice();
      if (locations.find(location => location.id === action.location.id) === undefined) {
        locations.push(action.location);
      }
      return {
        ...state,
        locations: locations,
        selected_location: action.location,
      };
    }

    case ActionTypes.UPDATE_MAP_LOCATION: {
      const locations = state.locations.map((location) =>
        location.id === action.location.id ? action.location : location
      );

      if (state.selected_location.id === action.location.id) {
        return {
          ...state,
          locations: locations,
          selected_location: action.location,
        };
      } else {
        return {
          ...state,
          locations: locations
        };
      }
    }

    case ActionTypes.UPDATE_MAP_LOCATION_OP_READINGS: {
      const new_location = state.selected_location;
      new_location.op_readings = action.op_readings;

      const new_locations = state.locations.map(location => {
        if (location.id === action.location_id) {
          location.op_readings = action.op_readings;
        }
        return location;
      });

      return {
        ...state,
        selected_location: new_location,
        locations: new_locations
      };
    }

    case ActionTypes.UPDATE_MAP_LOCATION_OP_IMAGEUPLOAD: {
      const new_location = state.selected_location;
      new_location.op_imageupload = action.op_imageupload;

      const new_locations = state.locations.map(location => {
        if (location.id === action.location_id) {
          location.op_imageupload = action.op_imageupload;
        }
        return location;
      });

      return {
        ...state,
        selected_location: new_location,
        locations: new_locations
      };
    }

    case ActionTypes.UPDATE_MAP_LOCATION_OP_MODERATION: {
      const new_location = state.selected_location;
      new_location.op_moderation = action.op_moderation;

      const new_locations = state.locations.map(location => {
        if (location.id === action.location_id) {
          location.op_moderation = action.op_moderation;
        }
        return location;
      });

      return {
        ...state,
        selected_location: new_location,
        locations: new_locations
      };
    }

    case ActionTypes.UPDATE_MAP_LOCATION_OP_DESCRIPTION: {
      const new_location = state.selected_location;
      new_location.op_description = action.op_description;

      const new_locations = state.locations.map(location => {
        if (location.id === action.location_id) {
          location.op_description = action.op_description;
        }
        return location;
      });

      return {
        ...state,
        selected_location: new_location,
        locations: new_locations
      };
    }

    case ActionTypes.UPDATE_MAP_LOCATION_OP_COMMENTS: {
      const new_location = state.selected_location;
      new_location.op_comments = action.op_comments;

      const new_locations = state.locations.map(location => {
        if (location.id === action.location_id) {
          location.op_comments = action.op_comments;
        }
        return location;
      });

      return {
        ...state,
        selected_location: new_location,
        locations: new_locations
      };
    }

    case ActionTypes.UPDATE_MAP_LOCATION_READINGCONF: {
      const locations = state.locations.map((location) => {
        if (location.id === action.location_id) {
          location.reading_conf = action.reading_conf;
        }
        return location;
      });

      if (state.selected_location.id === action.location.id) {
        let location = state.selected_location;
        location.reading_conf = action.reading_conf;
        return {
          ...state,
          locations: locations,
          selected_location: location
        };
      } else {
        return {
          ...state,
          locations: locations
        };
      }
    }

    case ActionTypes.DELETE_MAP_LOCATION: {
      const locations = state.locations.filter(
        (location) => location.id !== action.location.id
      );

      return {
        ...state,
        locations: locations,
        selected_location:
          state.selected_location.id === action.location.id
            ? null
            : state.selected_location,
      };
    }

    case ActionTypes.SET_LOCATION_GEOPOS: {
      return {
        ...state,
        geo_lat: action.lat,
        geo_lng: action.lng
      };
    }

    case ActionTypes.SELECT_LOCATION_TAB: {
      return {
        ...state,
        locationtab: action.tab,
      };
    }

    case ActionTypes.SET_MAP_POSTS: {
      const articles = JSON.parse(JSON.stringify(action.articles));
      return {
        ...state,
        map_posts: articles,
        map_posts_last_offset: action.last_offset
      };
    }

    case ActionTypes.APPEND_MAP_POSTS: {
      let articles = state.map_posts;
      const new_articles = JSON.parse(JSON.stringify(action.articles));
      for (let article of new_articles) {
        if (articles.findIndex(item => item.nid === article.nid) === -1) {
          articles.push(article);
        } else {
          console.log("duplicate article : ", article.title);
        }
      }

      return {
        ...state,
        map_posts: articles,
        map_posts_last_offset: action.last_offset
      };
    }

    case ActionTypes.SELECT_MAP_POST: {
      return {
        ...state,
        selected_map_post: action.article
      };
    }

    default:
      return state;
  }
}

export default mapReducer;

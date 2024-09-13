import * as ActionTypes from "../actions/ActionTypes";
import { SIGN_METHOD_EMAIL } from "../constants/types";
const INITIAL_STATE = {
  loggedIn: null,
  map: {
    center_lat: 43.66,
    center_lng: -79.39,
    zoom: 13,
    bounds: null,
  },
  authUser: {
    uid: "",
    token: "",
    hasuraClaim: null,
    name: "",
    username: "",
    biography: "",
    image: "",
    provider: null,
    email: "",
    emailVerified: false,
    phone: "",
    phoneVerified: false,
    state: "",
    country: "",
    links: [],
    approved: false,
    signMethod: SIGN_METHOD_EMAIL,
    skipProfile: false,
    msgToken: null,
    cryptoAddress: "",
    cryptoENS: "",
    cryptoAmount: null,
    paid: false,
    paid_until: null,
    subscribe_email: null,
    project_scistarter: false,
    project_librarykit: false,
    created_at: null,
    tag_category: [],
    tags: [],
    categories_moderated: [],
    feeds_created: [],
    feeds_moderated: [],
    feeds_order: [],
    feeds_followed: [],
    sources_created: [],
    sources_followed: [],
    users_followed: [],
    user_followers: [],
    users_invites: [],
    users_blockmutes: [],
    user_suspensions: [], // suspensions by me
    suspensions: [], // suspensions for me
    feeds_subscribed: [],
    feeds_showfirst: [],
    regions_moderated: [],
    locations_moderated: [],
    locations_followed: [],
    articles_voted: [],
    articles_reposted: [],
    threads_voted: [],
    summaryGenerationStatus: 0,
    is_mastodon_enabled: false,
    is_bluesky_enabled: false,
  },
  socketId: null,
};

const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_MAP_CENTER_POS: {
      const map = {
        ...state.map,
        center_lat: action.lat,
        center_lng: action.lng,
      };

      localStorage.setItem("mapParams", JSON.stringify(map));

      return {
        ...state,
        map: map,
      };
    }

    case ActionTypes.SET_MAP_PARAMS: {
      const map = {
        ...state.map,
        center_lat: action.lat,
        center_lng: action.lng,
        zoom: action.zoom,
        bounds: action.bounds,
      };

      localStorage.setItem("mapParams", JSON.stringify(map));

      return {
        ...state,
        map: map,
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;

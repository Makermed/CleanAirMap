import * as ActionTypes from 'actions/ActionTypes';
import { ROLE_ANONYMOUS } from 'constants/user';
import { SIGN_METHOD_EMAIL } from 'constants/types';


const INITIAL_STATE = {
  loggedIn: false,
  map: {
    center_lat          : 43.66,
    center_lng          : -79.39,
    zoom                : 13,
    bounds              : null,
  },
  authUser: {
    uid                 : '',
    token               : '',
    hasuraClaim         : null,
    name                : '',
    username            : '',
    image               : '',
    biography           : '',
    email               : '',
    emailVerified       : false,
    phone               : '',
    phoneVerified       : false,
    links               : [],
    tags                : [],
    role                : ROLE_ANONYMOUS,
    approved            : false,
    paid                : false,
    paid_until          : null,
    signMethod          : SIGN_METHOD_EMAIL,
    skipProfile         : false,
    msgToken            : null,
    subscribe_email     : null,
    created_at          : null,
    categories_moderated: [],
    feeds_created       : [],
    feeds_moderated     : [],
    feeds_order         : [],
    feeds_followed      : [],
    sources_created     : [],
    sources_followed    : [],
    users_followed      : [],
    user_followers      : [],
    users_invites       : [],
    feeds_subscribed    : [],
    feeds_showfirst     : [],
    regions_moderated   : [],
    locations_moderated : [],
    locations_followed  : []
  }
};


const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_AUTH_USER: {
      if (action.authUser === null) {
        return INITIAL_STATE;
      }

      //let user = Object.assign({}, state.authUser, action.authUser);
      let user = {...state.authUser, ...action.authUser};
      return {
        ...state,
        loggedIn: true,
        authUser: user
      };
    }
    
    case ActionTypes.SESSION_LOGIN: {
      let user = {...state.authUser, ...action.authUser};
      return {
        ...state,
        loggedIn: true,
        authUser: user
      };
    }

    case ActionTypes.SESSION_LOGOUT: {
      // console.log("remove localstorage item");
      window.localStorage.removeItem("authUser");
      window.location.reload(false);
      return INITIAL_STATE;
    }

    case ActionTypes.UPDATE_USER_PROFILE: {
      let user = {...state.authUser, ...action.profile};
      return {
        ...state,
        loggedIn: true,
        authUser: user
      };      
    }

    case ActionTypes.UPDATE_USER_PAID: {
      let user = {
        ...state.authUser,
        paid: action.paid
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.ADD_TAG_USER: {
      let tags = state.authUser.tags.slice();
      tags.push(action.tag_user.tag_name);
      let user = {
        ...state.authUser,
        tags: tags
      };
      return {
        ...state,
        authUser: user
      };      
    }

    case ActionTypes.DELETE_TAG_USER: {
      let tags = state.authUser.tags.filter(tag => tag.tag_name !== action.tag_user.tag_name);
      let user = {
        ...state.authUser,
        tags: tags
      };
      return {
        ...state,
        authUser: user
      };      
    }

    case ActionTypes.SET_FOLLOWING_FEED_USER: {
      let feeds_followed = state.authUser.feeds_followed.slice();
      if (action.following) {
        feeds_followed.push(action.feed.id);
      } else {
        feeds_followed = feeds_followed.filter(item => item.feed_id !== action.feed.id);
      }

      const user = {
        ...state.authUser,
        feeds_followed: feeds_followed
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.ADD_CATEGORY_MODERATED: {
      let new_categories_moderated = state.authUser.categories_moderated.slice();
      new_categories_moderated.push({category_id: action.category.id});
      const user = {
        ...state.authUser,
        categories_moderated: new_categories_moderated
      };
      return {
        ...state,
        authUser: user
      };      
    }

    case ActionTypes.DELETE_CATEGORY_MODERATED: {
      let new_categories_moderated = state.authUser.categories_moderated.filter(category_moderated =>
        category_moderated.category_id !== action.category_id
      );

      const user = {
        ...state.authUser,
        catgories_moderated: new_categories_moderated
      };
      return {
        ...state,
        authUser: user
      };      
    }

    case ActionTypes.UPDATE_FEEDS_ORDER: {
      const user = {
        ...state.authUser,
        feeds_order: action.orders
      };
      return {
        ...state,
        authUser: user
      }; 
    }

    case ActionTypes.ADD_FEED_MODERATED: {
      let new_feeds_moderated = state.authUser.feeds_moderated.slice();
      new_feeds_moderated.push({feed_id: action.feed.id});
      const user = {
        ...state.authUser,
        feeds_moderated: new_feeds_moderated
      };
      return {
        ...state,
        authUser: user
      };      
    }

    case ActionTypes.DELETE_FEED_MODERATED: {
      let new_feeds_moderated = state.authUser.feeds_moderated.filter(feed_moderated =>
        feed_moderated.feed_id !== action.feed.id
      );

      const user = {
        ...state.authUser,
        feeds_moderated: new_feeds_moderated
      };
      return {
        ...state,
        authUser: user
      };      
    }
    
    case ActionTypes.GIVEUP_FEED_OWNER_USER: {
      let new_feeds_moderated = state.authUser.feeds_moderated.map(feed_moderated => {
        if (feed_moderated.feed_id !== action.feed.id) {
          return feed_moderated;
        } else {
          feed_moderated.owner = false;
          return feed_moderated;
        }
      });

      const user = {
        ...state.authUser,
        feeds_moderated: new_feeds_moderated
      };
      return {
        ...state,
        authUser: user
      }; 
    }

    case ActionTypes.ADD_FOLLOW_USER: {
      let users_followed = state.authUser.users_followed.slice();
      users_followed.push(action.user);

      const user = {
        ...state.authUser,
        users_followed: users_followed
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.DELETE_FOLLOW_USER: {
      const users_followed = state.authUser.users_followed.filter(user => 
        user.user_id !== action.user_id
      );
      
      const user = {
        ...state.authUser,
        users_followed: users_followed
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.ADD_USER_INVITE: {
      let users_invites = state.authUser.users_invites.slice();
      users_invites.push(action.user);

      const user = {
        ...state.authUser,
        users_invites: users_invites
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.DELETE_USER_INVITE: {
      const users_invites = state.authUser.users_invites.filter(user => 
        user.user_id !== action.user_id
      );
      
      const user = {
        ...state.authUser,
        users_invites: users_invites
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.UPDATE_FEEDS_SUBSCRIBED: {
      const user = {
        ...state.authUser,
        feeds_subscribed: action.feeds_subscribed
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.DELETE_FEEDS_SUBSCRIBED: {
      const user = {
        ...state.authUser,
        feeds_subscribed: []
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.ADD_USER_FEED_SHOWFIRST: {
      let feeds_showfirst = state.authUser.user_feed_showfirst.slice();
      feeds_showfirst.push(action.feed_id);

      const user = {
        ...state.authUser,
        feeds_showfirst: feeds_showfirst
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.DELETE_USER_FEED_SHOWFIRST: {
      const feeds_showfirst = state.authUser.user_feed_showfirst.filter(item => 
        item.feed_id !== action.feed_id
      );
      
      const user = {
        ...state.authUser,
        feeds_showfirst: feeds_showfirst
      };
      return {
        ...state,
        authUser: user
      };
    }

    
    case ActionTypes.SET_MAP_CENTER_POS: {
      const map = {
        ...state.map,
        center_lat: action.lat,
        center_lng: action.lng
      };

      localStorage.setItem('mapParams', JSON.stringify(map));
      
      return {
        ...state,
        map: map
      };
    }

    case ActionTypes.SET_MAP_PARAMS: {
      const map = {
        ...state.map,
        center_lat: action.lat,
        center_lng: action.lng,
        zoom: action.zoom,
        bounds: action.bounds
      };

      localStorage.setItem('mapParams', JSON.stringify(map));

      return {
        ...state,
        map: map
      };
    }

    case ActionTypes.INSERT_REGION_MODERATOR: {
      let regions_moderated = state.authUser.regions_moderated.slice();
      if (regions_moderated.find(moderator => moderator.id === action.moderator.id) !== undefined) {
        return state;
      }

      regions_moderated.push({
        id: action.moderator.id,
        region_id: action.moderator.region_id,
        approved: action.moderator.approved
      });

      const user = {
        ...state.authUser,
        regions_moderated: regions_moderated
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.DELETE_REGION_MODERATOR: {
      const regions_moderated = state.authUser.regions_moderated.filter(moderated => 
        moderated.region_id !== action.moderator.region_id
      );
      
      const user = {
        ...state.authUser,
        regions_moderated: regions_moderated
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.APPROVE_REGION_MODERATOR: {
      const regions_moderated = state.authUser.regions_moderated.map(moderated => {
        if (moderated.region_id === action.moderator.region_id) {
          moderated.approved = true;
          moderated.approved_by = action.moderator.approved_by;
          moderated.approved_at = action.moderator.approved_at;
        }
        return moderated;
      });
      
      const user = {
        ...state.authUser,
        regions_moderated: regions_moderated
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.INSERT_FOLLOWING_LOCATION: {
      let locations_followed = state.authUser.locations_followed.slice();
      locations_followed.push({
        location_id: action.location_id
      });

      const user = {
        ...state.authUser,
        locations_followed: locations_followed
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.DELETE_FOLLOWING_LOCATION: {
      const locations_followed = state.authUser.locations_followed.filter(followed => 
        followed.location_id !== action.location_id
      );
      
      const user = {
        ...state.authUser,
        locations_followed: locations_followed
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.INSERT_LOCATION_MODERATOR: {
      let locations_moderated = state.authUser.locations_moderated.slice();
      if (locations_moderated.find(moderator => moderator.id === action.moderator.id) !== undefined) {
        return state;
      }
      locations_moderated.push({
        id: action.moderator.id,
        location_id: action.moderator.location_id,
        approved: action.moderator.approved
      });

      const user = {
        ...state.authUser,
        locations_moderated: locations_moderated
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.DELETE_LOCATION_MODERATOR: {
      const locations_moderated = state.authUser.locations_moderated.filter(moderated => 
        moderated.location_id !== action.moderator.location_id
      );
      
      const user = {
        ...state.authUser,
        locations_moderated: locations_moderated
      };
      return {
        ...state,
        authUser: user
      };
    }

    case ActionTypes.APPROVE_LOCATION_MODERATOR: {
      const locations_moderated = state.authUser.locations_moderated.map(moderated => {
        if (moderated.location_id === action.moderator.location_id) {
          moderated.approved = true;
          moderated.approved_by = action.moderator.approved_by;
          moderated.approved_at = action.moderator.approved_at;
        }
        return moderated;
      });
      
      const user = {
        ...state.authUser,
        locations_moderated: locations_moderated
      };
      return {
        ...state,
        authUser: user
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;

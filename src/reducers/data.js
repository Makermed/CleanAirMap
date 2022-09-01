import * as ActionTypes from "actions/ActionTypes";
import * as COUNTRY from "constants/country";
import { 
  BRANCH_ALL,
} from "constants/branches";


const initialState = {
  initialized: false,
  newssites: [],
  socialtypes: [],
  categories: [],
  feeds: [],
  sources: [],
  default_feeds: [],
  followed_feeds: [],
  yourfeeds_order: [],
  lists: [],
  
  articles: [],
  last_offset: 0,
  saved_articles: [],
  showfirst_articles: [],
  feed_posts: [],

  podcasts: [],
  podcast_last_offset: 0,

  pins: [],
  movetops: [],
  tags: [],
  unfollowed_sources: [],
  showretweet_sources: [],

  // locations: [],
  // cleanair_values: [],
  // cleanair_posts: [],

  moderate: false,

  selected_category: null,
  selected_list: null,
  selected_feed: null,
  selected_source: null,
  selected_article: null,
  selected_podcast: null,
  selected_user: null,
  // selected_location: null,

  feed_join_info: null,
  feed_share_info: null,
  
  country: COUNTRY.ALL,
  branch: BRANCH_ALL,

  searchKey: "",
  searchResults: [],
  selectedSearchArticle: null,

  comments: [],
  comments_top_last_offset: 0,
  comments_child_last_offset: 0,

  threads: [],
  threads_last_offset: 0,
  selected_thread: null,

  temp_feed_sources: null,
  temp_feed_sourcelinks: null,

  newsletter_feeds: []
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.RESET_ALL_DATA: {
      return initialState;
    }

    case ActionTypes.SET_NEWSSITE_INFO: {
      return {
        ...state,
        newssites: action.newssites,
        initialized: true
      };
    }

    case ActionTypes.SET_SOCIALTYPE_INFO: {
      return {
        ...state,
        socialtypes: action.socialtypes
      };
    }

    case ActionTypes.SET_CATEGORIES: {
      let sorted_categories = action.categories.sort(
        (a, b) => a.created_at - b.created_at
      );

      let selected_category = state.selected_category;
      if (!selected_category && sorted_categories.length > 0) {
        selected_category = sorted_categories[0];
      }

      return {
        ...state,
        categories: sorted_categories,
        selected_category: selected_category,
      };
    }

    case ActionTypes.SET_FEEDS: {
      // let sorted_feeds = action.feeds.sort(
      //   (a, b) => a.created_at - b.created_at
      // );

      return {
        ...state,
        feeds: action.feeds,
      };
    }

    case ActionTypes.SET_SOURCES: {
      let sorted_sources = action.sources.sort(
        (a, b) => a.created_at - b.created_at
      );

      return {
        ...state,
        sources: sorted_sources
      };
    }

    case ActionTypes.SET_DEFAULT_FEEDS: {
      if (action.feeds.length === 0) {
        return {
          ...state,
          default_feeds: [],
        };
      }

      return {
        ...state,
        default_feeds: action.feeds
      };
    }

    case ActionTypes.SET_LISTS: {
      if (action.lists.length === 0) {
        return state;
      }

      return {
        ...state,
        lists: action.lists
      };
    }

    case ActionTypes.SELECT_LIST: {
      return {
        ...state,
        selected_list: action.list
      };
    }

    case ActionTypes.SET_FOLLOWED_FEEDS: {
      if (action.feeds.length === 0) {
        return {
          ...state,
          followed_feeds: [],
        };
      }

      return {
        ...state,
        followed_feeds: action.feeds
      };
    }
    
    case ActionTypes.SET_FOLLOWING_FEEDS: {
      if (state.feeds.length === 0) {
        return state;
      }
      if (action.followings.length === 0) {
        return {
          ...state,
          followed_feeds: [],
        };
      }

      let followings = action.followings.sort(
        (a, b) => a.order - b.order
      );

      // make followed feeds
      let followed_feeds = [];
      for (let following of followings) {
        let feed = state.feeds.find(item => item.id === following.feed_id);
        if (feed) {
          followed_feeds.push(feed);
        }
      }

      return {
        ...state,
        followed_feeds: followed_feeds,
      };
    }

    case ActionTypes.SET_FOLLOWING_FEED: {
      // make following table
      let followings = state.feeds.map(feed => {
        let result = state.followed_feeds.find(
          element => element.id === feed.id
        );
        return result === undefined ? false : true;
      });

      // modify following table by action
      let index = state.feeds.findIndex(feed => feed.id === action.feed.id);
      if (index !== -1) {
        followings[index] = action.following;
      }

      // get followed feeds
      let followed_feeds = state.feeds.filter((feed, index) => followings[index]);

      // set state
      return {
        ...state,
        followed_feeds: followed_feeds
      };
    }

    case ActionTypes.SET_SOURCE_FOLLOWERS: {
      let sources = state.sources.map(source => {
        if (source.id === action.source.id) {
          source.followers = action.followers;
        }
        return source;
      });

      return {
        ...state,
        sources: sources
      };
    }

    case ActionTypes.SET_MODERATE:
      return {
        ...state,
        moderate: action.moderate
      };

    case ActionTypes.SET_TAGS: {
      return {
        ...state,
        tags: action.tags
      };
    }

    case ActionTypes.SET_UNFOLLOWED_SOURCES: {
      return {
        ...state,
        unfollowed_sources: action.unfollowed
      };
    }

    case ActionTypes.SET_SHOWRETWEET_SOURCES: {
      return {
        ...state,
        showretweet_sources: action.showretweets
      };
    }

    case ActionTypes.ADD_TAG_USER: {
      let new_tags = state.tags.slice();

      let tag = new_tags.find(item => item.name === action.tag_user.tag_name);
      if (!tag) {
        return state;
      }

      let found = tag.tag_users.findIndex(item => item.user_id === action.tag_user.user_id);
      if (found === -1) {
        tag.tag_users.push({
          user_id: action.tag_user.user_id
        });
      }

      return {
        ...state,
        tags: new_tags
      };
    }

    case ActionTypes.DELETE_TAG_USER: {
      let new_tags = state.tags.slice();
      
      let tag_index = new_tags.findIndex(item => item.name === action.tag_user.tag_name);
      if (tag_index === -1) {
        return state;
      }

      let tag_users = new_tags[tag_index].tag_users.filter(item => item.user_id !== action.tag_user.user_id);
      new_tags[tag_index].tag_users = tag_users.slice();

      return {
        ...state,
        tags: new_tags
      };
    }

    case ActionTypes.SELECT_CATEGORY: {
      return {
        ...state,
        selected_category: action.category,
        // selected_feed: null
      };
    }

    case ActionTypes.CHANGE_CATEGORY: {
      return {
        ...state,
        selected_category: action.category
      };
    }

    case ActionTypes.RESIGN_CATEGORY_MODERATOR: {
      let new_selected_category = state.selected_category;
      if (new_selected_category.moderators === undefined || 
        new_selected_category.moderators.length === 0) {
        return state;
      }

      new_selected_category.moderators = state.selected_category.moderators.filter(moderator => 
        moderator.category_id !== action.category_id && moderator.user.uid !== action.user_id
      );

      return {
        ...state,
        selected_category: new_selected_category
      };
    }

    case ActionTypes.DELETE_FEED_REPORTS: {
      let new_selected_category = state.selected_category;
      if (new_selected_category.feed_reports === undefined ||
        new_selected_category.feed_reports.length === 0) {
        return state;
      }

      new_selected_category.feed_reports = state.selected_category.feed_reports(report =>
        report.feed_id !== action.feed_id
      );

      return {
        ...state,
        selected_category: new_selected_category
      };
    }

    case ActionTypes.SELECT_FEED: {
      if (action.feed === null) {
        return {
          ...state,
          selected_feed: action.feed,
          articles: [],
          threads: []
        };
      } else {
        // get category of this feed
        const selected_category = state.categories.find(category => category.id === action.feed.category_id);
        
        let articles = state.articles;
        if (state.selected_feed === null || state.selected_feed.id !== action.feed.id) {
          articles = [];
        };

        return {
          ...state,
          selected_feed: action.feed,
          selected_category: selected_category,
          articles: articles,
          threads: []
        };
      }
    }

    case ActionTypes.SELECT_FEED_FOR_COMMENTS: {
      return {
        ...state,
        selected_feed: action.feed
      }
    }

    case ActionTypes.ADD_FEED: {
      let feeds = state.feeds.slice();

      feeds.push(action.feed);

      let sorted_feeds = feeds.sort((a, b) =>
        a.created_at - b.created_at
      );

      return {
        ...state,
        feeds: sorted_feeds,
        selected_feed: action.feed
      };
    }

    case ActionTypes.APPROVE_FEED: {
      let feeds = state.feeds.slice();

      let feed_index = feeds.findIndex(feed => feed.id === action.feed_id);
      if (feed_index !== -1) {
        feeds[feed_index].approved = true;
      }

      return {
        ...state,
        feeds: feeds,
      };
    }

    case ActionTypes.UPDATE_FEED: {
      let feeds = state.feeds.slice();

      let feed_index = feeds.findIndex(feed => feed.id === action.feed.id);
      if (feed_index !== -1) {
        feeds[feed_index] = action.feed;
      }

      return {
        ...state,
        feeds: feeds,
        selected_feed: action.feed
      };
    }

    case ActionTypes.DELETE_FEED: {
      const feeds = state.feeds.filter(feed => feed.id !== action.feed_id);
      let selected_feed = state.selected_feed;
      if (selected_feed !== null && selected_feed.id === action.feed_id) {
        selected_feed = null;
      }

      return {
        ...state,
        feeds: feeds,
        selected_feed: selected_feed
      };
    }

    case ActionTypes.SET_FEED_JOIN_INFO: {
      return {
        ...state,
        feed_join_info: {
          feed_id: action.feed_id,
          feed_slug: action.feed_slug
        }
      };
    }

    case ActionTypes.DELETE_FEED_JOIN_INFO: {
      return {
        ...state,
        feed_join_info: null
      };
    }

    case ActionTypes.SET_FEED_SHARE_INFO: {
      return {
        ...state,
        feed_share_info: {
          feed_id: action.feed_id,
          feed_slug: action.feed_slug,
          share_id: action.share_id
        }
      };
    }

    case ActionTypes.DELETE_FEED_SHARE_INFO: {
      return {
        ...state,
        feed_share_info: null
      };
    }

    case ActionTypes.SET_TEMP_FEED_SOURCELINKS: {
      if (state.temp_feed_sourcelinks === null) {
        return {
          ...state,
          temp_feed_sourcelinks: action.source_links
        };
      }

      let new_source_links = state.temp_feed_sourcelinks.slice();
      for (let source_link of action.source_links) {
        if (new_source_links.find(item => 
          item.branch === source_link.branch &&
          item.type === source_link.type &&
          item.tag === source_link.tag
        ) === undefined) {
          new_source_links.push(source_link);
        }
      }

      return {
        ...state,
        temp_feed_sourcelinks: new_source_links
      };
    }

    case ActionTypes.CLS_TEMP_FEED_SOURCELINKS: {
      return {
        ...state,
        temp_feed_sourcelinks: null
      };
    }

    case ActionTypes.DEL_TEMP_FEED_SOURCELINK: {
      if (state.temp_feed_sourcelinks === null) {
        return;
      }
      
      let new_source_links = state.temp_feed_sourcelinks.filter(source_link => 
        source_link.branch !== action.source_link.branch ||
        source_link.type !== action.aource_link.type ||
        source_link.tag !== action.source_link.tag
      );
      
      return {
        ...state,
        temp_feed_sources: new_source_links
      };
    }

    case ActionTypes.SET_TEMP_FEED_SOURCES: {
      if (state.temp_feed_sources === null) {
        return {
          ...state,
          temp_feed_sources: action.feed_sources
        };
      }

      let new_feed_sources = state.temp_feed_sources.slice();
      for (let source of action.feed_sources) {
        if (new_feed_sources.find(item => item.id === source.id) === undefined) {
          new_feed_sources.push(source);
        }
      }

      return {
        ...state,
        temp_feed_sources: new_feed_sources
      };
    }

    case ActionTypes.CLS_TEMP_FEED_SOURCES: {
      return {
        ...state,
        temp_feed_sources: null
      };
    }

    case ActionTypes.DEL_TEMP_FEED_SOURCE: {
      if (state.temp_feed_sources === null) {
        return;
      }
      
      let new_feed_sources = state.temp_feed_sources.filter(source => source.id !== action.source_id);
      return {
        ...state,
        temp_feed_sources: new_feed_sources
      };
    }

    case ActionTypes.UPDATE_FEED_SOURCES: {
      let feeds = state.feeds.slice();

      let feed_index = feeds.findIndex(feed => feed.id === action.feed_id);
      if (feed_index !== -1) {
        feeds[feed_index].feed_sources = action.feed_sources;
      }

      return {
        ...state,
        feeds: feeds,
        selected_feed: feeds[feed_index]
      };
    }

    case ActionTypes.UPDATE_FEED_FOLLOWERS: {
      let feeds = state.feeds.slice();

      let feed_index = feeds.findIndex(feed => feed.id === action.feed_id);
      if (feed_index === -1) {
        return state;
      }
      feeds[feed_index].followers = action.followers;

      return {
        ...state,
        feeds: feeds,
        selected_feed: feeds[feed_index]
      };
    }

    case ActionTypes.APPROVE_FEED_MODERATOR: {
      let new_selected_feed = state.selected_feed;
      if (new_selected_feed.moderators === undefined || 
        new_selected_feed.moderators.length === 0) {
        return state;
      }

      for (let feed_moderator of new_selected_feed.moderators) {
        if (feed_moderator.id === action.moderator_id) {
          feed_moderator.approved = action.approved;
          feed_moderator.approved_by = action.approved_by;
          feed_moderator.approved_at = action.approved_at;
        }
      }

      return {
        ...state,
        selected_feed: new_selected_feed
      };
    }

    case ActionTypes.DELETE_FEED_MODERATOR: {
      let new_selected_feed = state.selected_feed;
      if (new_selected_feed.moderators === undefined || 
        new_selected_feed.moderators.length === 0) {
        return state;
      }

      new_selected_feed.moderators = state.selected_feed.moderators.filter(moderator => 
        moderator.id !== action.moderator_id
      );

      return {
        ...state,
        selected_feed: new_selected_feed
      };
    }

    case ActionTypes.RESIGN_FEED_MODERATOR: {
      let new_selected_feed = state.selected_feed;
      if (new_selected_feed.moderators === undefined || 
        new_selected_feed.moderators.length === 0) {
        return state;
      }

      new_selected_feed.moderators = state.selected_feed.moderators.filter(moderator => 
        moderator.feed_id !== action.feed_id && moderator.user.uid !== action.user_id
      );

      return {
        ...state,
        selected_feed: new_selected_feed
      };
    }

    case ActionTypes.MAKE_FEED_OWNER: {
      let new_selected_feed = state.selected_feed;
      if (new_selected_feed.moderators === undefined || 
        new_selected_feed.moderators.length === 0) {
        return state;
      }

      for (let feed_moderator of new_selected_feed.moderators) {
        if (feed_moderator.id === action.moderator_id) {
          feed_moderator.owner = true;
        } else {
          feed_moderator.owner = false;
        }
      }

      return {
        ...state,
        selected_feed: new_selected_feed
      };
    }

    case ActionTypes.UPDATE_FEED_OP_VISIBILITY: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.private = !action.op_visibility;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.private = !action.op_visibility;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    case ActionTypes.UPDATE_FEED_OP_COMMENTS: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.op_comments = action.op_comments;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.op_comments = action.op_comments;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    case ActionTypes.UPDATE_FEED_OP_POSTS: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.op_posts = action.op_posts;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.op_posts = action.op_posts;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    case ActionTypes.UPDATE_FEED_OP_MEMBERS: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.op_members = action.op_members;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.op_members = action.op_members;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    case ActionTypes.UPDATE_FEED_OP_PAYMENT: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.op_payment = action.op_payment;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.op_payment = action.op_payment;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    case ActionTypes.UPDATE_FEED_OP_ANONYMITY: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.op_anonymity = action.op_anonymity;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.op_anonymity = action.op_anonymity;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    case ActionTypes.UPDATE_FEED_COMMENTCONF: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.comment_conf = action.comment_conf;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.comment_conf = action.comment_conf;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    case ActionTypes.UPDATE_FEED_TG_WALLET: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.tg_wallet = action.tg_wallet;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.tg_wallet = action.tg_wallet;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    case ActionTypes.UPDATE_FEED_TG_ADDRESS: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.tg_address = action.tg_address;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.tg_address = action.tg_address;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    case ActionTypes.UPDATE_FEED_TG_AMOUNT: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.tg_amount = action.tg_amount;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.tg_amount = action.tg_amount;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    case ActionTypes.UPDATE_FEED_TOKEN_ADDRESS: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.token_address = action.token_address;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.token_address = action.token_address;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    case ActionTypes.UPDATE_FEED_TOKEN_AMOUNT: {
      const new_selected_feed = state.selected_feed;
      new_selected_feed.token_amount = action.token_amount;

      const new_feeds = state.feeds.map(feed => {
        if (feed.id === action.feed_id) {
          feed.token_amount = action.token_amount;
          return feed;
        } else {
          return feed;
        }
      });

      return {
        ...state,
        selected_feed: new_selected_feed,
        feeds: new_feeds
      };
    }

    // case ActionTypes.UPDATE_FEED_SOURCE_APPROVE: {
    //   let selected_feed = state.selected_feed;

    //   let source_index = selected_feed.feed_sources.findIndex(feed_source => feed_source.source_id === action.source.id);
    //   if (source_index !== -1) {
    //     selected_feed.feed_sources[source_index].approved = action.approved;
    //   }

    //   // delete the source from proposed sources

    //   // approve the source if it isn't approved
    //   let sources = state.sources.slice();
    //   if (action.source.approved === false) {
    //     let source_index = sources.findIndex(source => source.id === action.source.id);
    //     if (source_index !== -1) {
    //       sources[source_index].approved = action.approved;
    //     } 
    //   }

    //   return {
    //     ...state,
    //     selected_feed: selected_feed,
    //     sources: sources
    //   };
    // }

    // case ActionTypes.DELETE_FEED_SOURCE: {
    //   let selected_feed = state.selected_feed;
    //   let new_feed_sources = selected_feed.feed_sources.filter(feed_source => feed_source.source_id !== action.source.id);
    //   selected_feed.feed_sources = new_feed_sources;

    //   // delete the source if it isn't approved
    //   let sources = state.sources.slice();
    //   if (action.source.approved === false) {
    //      sources = sources.filter(source => source.id !== action.source.id);
    //   }

    //   return {
    //     ...state,
    //     selected_feed: selected_feed,
    //     sources: sources
    //   };
    // }

    case ActionTypes.SELECT_SOURCE: {
      return {
        ...state,
        selected_source: action.source
      };
    }

    case ActionTypes.ADD_SOURCE: {
      let sources = state.sources.slice();
      sources.push(action.source);

      let sorted_sources = sources.sort((a, b) => 
        a.created_at - b.created_at
      );

      return {
        ...state,
        sources: sorted_sources,
        selected_source: action.source
      };
    }

    case ActionTypes.UPDATE_SOURCE: {
      let sources = state.sources.slice();

      let source_index = sources.findIndex(source => source.id === action.source.id);
      if (source_index !== -1) {
        sources[source_index] = action.source;
      }      

      return {
        ...state,
        sources: sources,
        selected_source: action.source
      };
    }

    case ActionTypes.UPDATE_SOURCE_APPROVE: {
      let sources = state.sources.slice();

      let source_index = sources.findIndex(source => source.id === action.source_id);
      if (source_index !== -1) {
        sources[source_index].approved = action.approved;
      }      

      return {
        ...state,
        sources: sources
      };
    }

    case ActionTypes.UPDATE_SOURCE_UPVOTES: {
      let sources = state.sources.slice();

      let source_index = sources.findIndex(source => source.id === action.source_id);
      if (source_index !== -1) {
        sources[source_index].upvotes = action.upvotes;
      }

      return {
        ...state,
        sources: sources
      };
    }

    case ActionTypes.SELECT_ARTICLE: {
      return {
        ...state,
        selected_article: action.article,
        selected_thread: null
      };
    }

    case ActionTypes.DELETE_ARTICLE: {
      const articles = state.articles.filter(article => article.nid !== action.article_id);
      let selected_article = state.selected_article;
      if (selected_article !== null && selected_article.nid === action.article_id) {
        selected_article = null;
      }

      return {
        ...state,
        articles: articles,
        selected_article: selected_article,
        selected_thread: null
      };
    }

    case ActionTypes.ADD_USERPOST: {
      let articles = state.articles.slice();
      articles.push(action.userpost);

      return {
        ...state,
        articles: articles,
      };
    }

    case ActionTypes.UPDATE_USERPOST: {
      let new_articles = state.articles.map(article => 
        article.nid === action.userpost.nid ? action.userpost : article
      );

      return {
        ...state,
        articles: new_articles,
      };
    }

    case ActionTypes.APPROVE_USERPOST: {
      let articles = state.articles.slice();
      for (let article of articles) {
        if (article.nid === action.userpost.nid) {
          article.param1 = 1;
          break;
        }
      }

      return {
        ...state,
        articles: articles,
      };
    }

    case ActionTypes.REFRESH_FEEDPOSTS: {
      return {
        ...state,
        feed_posts: []
      };
    }

    case ActionTypes.SET_FEEDPOSTS: {
      let feed_posts = action.feed_posts;
      const sorted_posts = feed_posts.sort((a, b) => 
        b.published - a.published
      );

      return {
        ...state,
        feed_posts: sorted_posts
      };
    }

    case ActionTypes.APPROVE_FEEDPOST: {
      let feed_posts = state.feed_posts.slice();
      feed_posts.push(action.feedpost);

      const sorted_posts = feed_posts.sort((a, b) => 
        b.published - a.published
      );

      return {
        ...state,
        feed_posts: sorted_posts
      };
    }

    case ActionTypes.REFRESH_SAVED_ARTICLES: {
      return {
        ...state,
        saved_articles: []
      };
    }

    case ActionTypes.SET_SAVED_ARTICLES: {
      return {
        ...state,
        saved_articles: action.articles
      };
    }

    case ActionTypes.DELETE_SAVED_ARTICLE: {
      const articles = state.saved_articles.filter(
        article => article.id !== action.save_id
      );
      return {
        ...state,
        saved_articles: articles
      };
    }

    case ActionTypes.SELECT_BRANCH: {
      return {
        ...state,
        branch: action.branch,
      };
    }

    case ActionTypes.SELECT_COUNTRY: {
      return {
        ...state,
        country: action.country,
      };
    }

    case ActionTypes.REFRESH_ARTICLES: {
      return {
        ...state,
        articles: [],
        selected_article: null,
        last_offset: 0
      };
    }

    case ActionTypes.SET_ARTICLES: {
      // const sorted_articles = action.articles.sort((a, b) => 
      //   b.published - a.published
      // );
      const articles = JSON.parse(JSON.stringify(action.articles));
      return {
        ...state,
        articles: articles,
        last_offset: action.last_offset
      };
    }

    case ActionTypes.APPEND_ARTICLES: {
      let articles = state.articles;
      // const sorted_articles = action.articles.sort((a, b) => 
      //   b.published - a.published
      // );
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
        articles: articles,
        last_offset: action.last_offset
      };
    }

    case ActionTypes.SET_SHOWFIRST_ARTICLES: {
      const articles = JSON.parse(JSON.stringify(action.articles));
      return {
        ...state,
        showfirst_articles: articles
      };
    }

    case ActionTypes.REFRESH_PODCASTS: {
      return {
        ...state,
        podcasts: [],
        selected_podcast: null,
        last_offset: 0
      };
    }

    case ActionTypes.SET_PODCASTS: {
      const podcasts = JSON.parse(JSON.stringify(action.podcasts));
      return {
        ...state,
        podcasts: podcasts,
        podcast_last_offset: action.last_offset
      };
    }

    case ActionTypes.APPEND_PODCASTS: {
      let podcasts = state.podcasts;
      let count = 0;
      const new_podcasts = JSON.parse(JSON.stringify(action.podcasts));
      for (let podcast of new_podcasts) {
        if (podcasts.findIndex(item => item.nid === podcast.nid) === -1) {
          podcasts.push(podcast);
          count ++;
        } else {
          console.log("duplicate podcast : ", podcast.title);
        }
      }

      return {
        ...state,
        podcasts: podcasts,
        podcast_last_offset: state.podcast_last_offset + count
      };
    }

    case ActionTypes.SELECT_PODCAST: {
      return {
        ...state,
        selected_podcast: action.podcast
      };
    }

    case ActionTypes.UNSELECT_PODCAST: {
      if (state.selected_podcast === null) {
        return state;
      }

      return {
        ...state,
        selected_podcast: action.podcast.nid === state.selected_podcast.nid ? null : state.selected_podcast.nid
      };
    }

    case ActionTypes.DELETE_PODCAST: {
      const podcasts = state.podcasts.filter(podcast => podcast.nid !== action.podcast_id);
      let selected_podcast = state.selected_podcast;
      if (selected_podcast !== null && selected_podcast.nid === action.podcast_id) {
        selected_podcast = null;
      }

      return {
        ...state,
        podcasts: podcasts,
        selected_podcast: selected_podcast
      };
    }

    case ActionTypes.UPDATE_SEARCH_KEY: {
      return {
        ...state,
        searchKey: action.searchKey,
        searchResults: []
      };
    }

    case ActionTypes.UPDATE_SEARCH_RESULT: {
      let articles = [];
      const new_articles = JSON.parse(JSON.stringify(action.results));
      for (let article of new_articles) {
        if (articles.findIndex(item => item.nid === article.nid) === -1) {
          articles.push(article);
        } else {
          console.log("duplicate searched article : ", article.title);
        }
      }

      const sorted_articles = articles.sort((a, b) => 
        b.published - a.published
      );
      return {
        ...state,
        searchResults: sorted_articles
      };
    }

    case ActionTypes.SELECT_SEARCH_ARTICLE: {
      return {
        ...state,
        selectedSearchArticle: action.article
      };
    }

    case ActionTypes.INS_FEED_SOURCE_UNFOLLOWER: {
      let unfollowed = state.unfollowed_sources.slice();
      const unfollower = unfollowed.find(item => 
        item.feed_id === action.unfollower.feed_id && 
        item.source_id === action.unfollower.source_id &&
        item.user_id === action.unfollower.user_id
      );
      if (unfollower !== undefined) {
        return state;
      }

      unfollowed.push(action.unfollower);
      return {
        ...state,
        unfollowed_sources: unfollowed
      };
    }

    case ActionTypes.DEL_FEED_SOURCE_UNFOLLOWER: {
      const unfollowed = state.unfollowed_sources.filter(item => 
        item.feed_id !== action.feed_id || 
        item.source_id !== action.source_id ||
        item.user_id !== action.user_id
      );

      return {
        ...state,
        unfollowed_sources: unfollowed
      };
    }

    case ActionTypes.INS_FEED_SOURCE_SHOWRETWEET: {
      let showretweets = state.showretweet_sources.slice();
      const showretweet = showretweets.find(item => 
        item.feed_id === action.feed_id && 
        item.source_id === action.source_id &&
        item.user_id === action.user_id
      );
      if (showretweet !== undefined) {
        return state;
      }

      showretweets.push({
        feed_id: action.feed_id,
        source_id: action.source_id,
        user_id: action.user_id
      });
      return {
        ...state,
        showretweet_sources: showretweets
      };
    }

    case ActionTypes.DEL_FEED_SOURCE_SHOWRETWEET: {
      const showretweets = state.showretweet_sources.filter(item => 
        item.feed_id !== action.feed_id || 
        item.source_id !== action.source_id ||
        item.user_id !== action.user_id
      );

      return {
        ...state,
        showretweet_sources: showretweets
      };
    }

    case ActionTypes.SET_ARTICLE_PINS: {
      return {
        ...state,
        pins: action.pins
      };
    }

    case ActionTypes.CLS_ARTICLE_PINS: {
      return {
        ...state,
        pins: []
      };
    }

    case ActionTypes.PIN_ARTICLE: {
      const isNew = state.pins.find(pin => pin.feed_id === action.pin.feed_id && 
        pin.article.nid === action.pin.article_id) === undefined;
      if (isNew) {
        let new_pins = state.pins;
        new_pins.push(action.pin);
        return {
          ...state,
          pins: new_pins
        };
      }
      return state;
    }

    case ActionTypes.UNDO_PIN_ARTICLE: {
      const new_pins = state.pins.filter(pin => pin.feed_id !== action.feed_id || 
        pin.article.nid !== action.article_id);
      return {
        ...state,
        pins: new_pins
      };
    }

    case ActionTypes.SET_ARTICLE_MOVETOPS: {
      return {
        ...state,
        movetops: action.movetops
      };
    }

    case ActionTypes.CLS_ARTICLE_MOVETOPS: {
      return {
        ...state,
        movetops: []
      };
    }

    case ActionTypes.MOVETOP_ARTICLE: {
      const isNew = state.movetops.find(movetop => movetop.feed_id === action.movetop.feed_id && 
        movetop.article.nid === action.movetop.article_id) === undefined;
      if (isNew) {
        let new_movetops = state.movetops;
        new_movetops.push(action.movetop);
        return {
          ...state,
          movetops: new_movetops
        };
      }
      return state;
    }

    case ActionTypes.UNDO_MOVETOP_ARTICLE: {
      const new_movetops = state.movetops.filter(movetop => movetop.feed_id !== action.feed_id || 
        movetop.article.nid !== action.article_id);
      return {
        ...state,
        movetops: new_movetops
      };
    }

    case ActionTypes.REFRESH_THREADS: {
      return {
        ...state,
        threads: [],
        threads_last_offset: 0
      };
    }

    case ActionTypes.SET_THREADS: {
      return {
        ...state,
        threads: action.threads,
        threads_last_offset: action.last_offset
      };
    }

    case ActionTypes.APPEND_THREADS: {
      let threads = state.threads;
      for (let thread of action.threads) {
        if (threads.findIndex(item => item.id === thread.id) === -1) {
          threads.push(thread);
        } else {
          console.log("duplicate thread : ", thread.title);
        }
      }
      return {
        ...state,
        threads: action.threads,
        threads_last_offset: action.last_offset
      };
    }

    case ActionTypes.SELECT_THREAD: {
      return {
        ...state,
        selected_thread: action.thread
      };
    }

    case ActionTypes.ADD_THREAD: {
      let threads = state.threads.slice();
      threads.push(action.thread);

      let sorted_threads = threads.sort((a, b) => 
        a.posted_at - b.posted_at
      );

      return {
        ...state,
        threads: sorted_threads,
        threads_last_offset: state.threads_last_offset + 1,
        selected_thread: action.thread
      };
    }

    case ActionTypes.UPDATE_THREAD: {
      const threads = state.threads.map(thread => 
        thread.id === action.thread.id ? action.thread : thread
      );

      return {
        ...state,
        threads: threads,
        selected_thread: action.thread,
      };
    }

    case ActionTypes.APPROVE_THREAD: {
      let threads = state.threads.slice();

      let thread_index = threads.findIndex(thread => thread.id === action.thread_id);
      if (thread_index !== -1) {
        threads[thread_index].approved = true;
      }

      return {
        ...state,
        threads: threads
      };
    }

    case ActionTypes.DELETE_THREAD: {
      const threads = state.threads.filter(thread => thread.id !== action.thread_id);
      let selected_thread = state.selected_thread;
      if (selected_thread !== null && selected_thread.id === action.thread_id) {
        selected_thread = null;
      }

      return {
        ...state,
        threads: threads,
        threads_last_offset: state.threads_last_offset - 1,
        selected_thread: selected_thread
      };
    }

    case ActionTypes.DELETE_THREAD_BY_FROM: {
      const threads = state.threads.filter(thread => thread.from !== action.from);
      const delete_thread = state.threads.find(thread => thread.from === action.from);
      let selected_thread = state.selected_thread;
      if (delete_thread !== undefined && selected_thread !== null && selected_thread.id === delete_thread.id) {
        selected_thread = null;
      }

      return {
        ...state,
        threads: threads,
        threads_last_offset: state.threads_last_offset - 1,
        selected_thread: selected_thread
      };
    }

    case ActionTypes.CLOSE_THREAD: {
      let threads = state.threads.slice();

      let thread_index = threads.findIndex(thread => thread.id === action.thread_id);
      if (thread_index !== -1) {
        threads[thread_index].closed = true;
      }

      return {
        ...state,
        threads: threads
      };
    }
    
    case ActionTypes.UPDATE_THREAD_UPVOTES: {
      let threads = state.threads.slice();

      let thread_index = threads.findIndex(thread => thread.id === action.thread_id);
      if (thread_index !== -1) {
        threads[thread_index].upvotes = action.upvotes;
      }

      return {
        ...state,
        threads: threads
      };
    }

    case ActionTypes.INSERT_BANNED_USER: {
      if (state.selected_feed === null) {
        return state;
      }

      let feed = state.selected_feed;
      let banned = feed.banned_users.find(banned_user => banned_user.user_id === action.banned.user_id);
      if (feed.banned_users.find(banned_user => banned_user.user_id === action.banned.user_id) === undefined) {
        feed.banned_users.push(banned);
      } else {
        feed.banned_users.map(banned_user => {
          if (banned_user.user_id === action.banned.user_id) {
            return action.banned;
          } else {
            return banned_user;
          }
        })
      }

      return {
        ...state,
        selected_feed: feed
      };
    }

    case ActionTypes.DELETE_BANNED_USER: {
      if (state.selected_feed === null) {
        return state;
      }

      let feed = state.selected_feed.banned_users.filter(banned_user => 
        banned_user.user_id !== action.user_id || 
        banned_user.feed_id !== action.feed_id
      );

      return {
        ...state,
        selected_feed: feed
      };
    }

    case ActionTypes.INSERT_PREAPPROVE_USER: {
      if (state.selected_feed === null) {
        return state;
      }

      let feed = state.selected_feed;
      let approved = feed.preapproved_users.find(preapproved_user => preapproved_user.user_id === action.approved.user_id);
      if (feed.preapproved_users.find(preapproved_user => preapproved_user.user_id === action.approved.user_id) === undefined) {
        feed.preapproved_users.push(approved);
      } else {
        feed.preapproved_users.map(preapproved_user => {
          if (preapproved_user.user_id === action.approved.user_id) {
            return action.approved;
          } else {
            return preapproved_user;
          }
        })
      }

      return {
        ...state,
        selected_feed: feed
      };
    }

    case ActionTypes.DELETE_PREAPPROVE_USER: {
      if (state.selected_feed === null) {
        return state;
      }

      let feed = state.selected_feed.preapproved_users.filter(preapproved_user => 
        preapproved_user.user_id !== action.user_id || 
        preapproved_user.feed_id !== action.feed_id
      );

      return {
        ...state,
        selected_feed: feed
      };
    }

    case ActionTypes.SELECT_USER: {
      return {
        ...state,
        selected_user: action.user
      };
    }
        
    case ActionTypes.SET_NEWSLETTER_FEEDS: {
      return {
        ...state,
        newsletter_feeds: action.feed_ids
      };
    }

    case ActionTypes.DELETE_NEWSLETTER_FEEDS: {
      return {
        ...state,
        newsletter_feeds: []
      };
    }

    // case ActionTypes.SET_MAP_LOCATIONS: {
    //   return {
    //     ...state,
    //     locations: action.locations
    //   };
    // }

    // case ActionTypes.SELECT_MAP_LOCATION: {
    //   return {
    //     ...state,
    //     selected_location: action.location
    //   };
    // }

    // case ActionTypes.INSERT_MAP_LOCATION: {
    //   let locations = state.locations.slice();

    //   locations.push(action.location);

    //   return {
    //     ...state,
    //     locations: locations,
    //     selected_location: action.location
    //   };
    // }

    // case ActionTypes.UPDATE_CAM_LOCATION: {
    //   const locations = state.locations.map(location => 
    //     location.id === action.location.id ? action.location : location
    //   );

    //   return {
    //     ...state,
    //     locations: locations,
    //     selected_location: action.location
    //   };
    // }

    // case ActionTypes.DELETE_MAP_LOCATION: {
    //   const locations = state.locations.filter(location => location.id !== action.location.id);

    //   return {
    //     ...state,
    //     locations: locations,
    //     selected_location: state.selected_location.id === action.location.id ? null : state.selected_location
    //   };
    // }

    default:
      return state;
  }
}

export default dataReducer;

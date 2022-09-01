import { GraphQLClient } from "graphql-request";
import {
  GRAPHQL_SUCCESS,
  GRAPHQL_ERROR,
  ARTICLES_PER_PAGE,
} from "constants/types";
import {
  /* #region  BaseData */
  QUERY_BASE_DATA,
  QUERY_BASE_DATA_USER,
  QUERY_BASE_DATA_PAIDUSER,
  QUERY_LISTS,
  /* #endregion */
  /* #region  Category Moderation */
  QUERY_CATEGORY_MODERATION_FIELDS,
  QUERY_CATEGORY_MODERATION_COUNT,
  QUERY_CATEGORY_MODERATORS_BY_CATEGORY,
  MUTATION_INSERT_CATEGORY_MODERATOR,
  MUTATION_DELETE_CATEGORY_MODERATOR,
  MUTATION_RESIGN_CATEGORY_MODERATOR,
  MUTATION_UPDATE_CATEGORY_MODERATOR,
  MUTATION_UPDATE_CATEGORY_LASTVIEWLOG,
  MUTATION_UPDATE_CATEGORY_NOTIFICATIONS,
  /* #endregion */
  /* #region  Feed Moderation */
  QUERY_FEED_BY_ID,
  QUERY_FEED_BY_SLUG,
  QUERY_FEED_EXIST_BY_SLUG,
  QUERY_FEED_MODERATION_COUNT,
  QUERY_FEED_MODERATION_FIELDS,
  QUERY_FEED_MEMBERS,
  /* #endregion */
  /* #region  Feed Operations */
  MUTATION_INSERT_FEED,
  MUTATION_UPDATE_FEED,
  MUTATION_DELETE_FEED,
  MUTATION_DELETE_FEEDS,
  MUTATION_UPDATE_FEED_APPROVED,
  MUTATION_UPDATE_FEED_FOLLOWERS,
  MUTATION_UPDATE_FEED_COMMENTCONF,
  MUTATION_UPDATE_FEED_LASTVIEWLOG,
  MUTATION_UPDATE_FEED_OP_VISIBILITY,
  MUTATION_UPDATE_FEED_OP_COMMENTS,
  MUTATION_UPDATE_FEED_OP_POSTS,
  MUTATION_UPDATE_FEED_OP_MEMBERS,
  MUTATION_UPDATE_FEED_OP_PAYMENT,
  MUTATION_UPDATE_FEED_OP_ANONYMITY,
  MUTATION_UPDATE_FEED_TG_WALLET,
  MUTATION_UPDATE_FEED_TG_ADDRESS,
  MUTATION_UPDATE_FEED_TG_AMOUNT,
  MUTATION_UPDATE_FEED_TOKEN_ADDRESS,
  MUTATION_UPDATE_FEED_TOKEN_AMOUNT,
  MUTATION_UPDATE_FEED_NOTIFICATIONS,
  /* #endregion */
  /* #region  Feed Followers */
  QUERY_FEED_FOLLOWERS_BY_UID,
  QUERY_FEED_FOLLOWERS_BY_FEED,
  MUTATION_INSERT_FEED_FOLLOWER,
  MUTATION_UPDATE_FEED_FOLLOWER_ORDER,
  MUTATION_DELETE_FEED_FOLLOWER,
  /* #endregion */
  /* #region  Feed Order */
  QUERY_FEED_ORDER_BY_USER,
  MUTATION_INSERT_FEED_ORDER,
  MUTATION_INSERT_FEED_ORDERS,
  MUTATION_UPDATE_FEED_ORDER,
  MUTATION_DELETE_FEED_ORDER,
  /* #endregion */
  /* #region  Feed Subscribers */
  QUERY_FEED_SUBSCRIBERS_BY_UID,
  QUERY_FEED_SUBSCRIBERS_BY_FEED,
  MUTATION_INSERT_FEED_SUBSCRIBER,
  MUTATION_DELETE_FEED_SUBSCRIBER,
  MUTATION_DELETE_FEED_SUBSCRIBERS,
  /* #endregion */
  /* #region  Feed Moderators */
  QUERY_FEED_MODERATORS_BY_FEED,
  QUERY_FEED_MODERATOR,
  MUTATION_INSERT_FEED_MODERATOR,
  MUTATION_DELETE_FEED_MODERATOR,
  MUTATION_RESIGN_FEED_MODERATOR,
  MUTATION_UPDATE_FEED_MODERATOR,
  /* #endregion */
  /* #region  Feed Moderator Reports */
  QUERY_MODERATOR_REPORTS_BY_FEED,
  MUTATION_INSERT_MODERATOR_REPORT,
  MUTATION_UPDATE_MODERATOR_REPORT,
  MUTATION_DELETE_MODERATOR_REPORT,
  MUTATION_DELETE_MODERATOR_REPORTS,
  /* #endregion */
  /* #region  Feed Reports */
  QUERY_FEED_REPORTS_BY_FEED,
  MUTATION_INSERT_FEED_REPORT,
  MUTATION_DELETE_FEED_REPORT,
  MUTATION_UPDATE_FEED_REPORT,
  /* #endregion */
  /* #region  Feed Posts */
  QUERY_FEED_POSTS,
  QUERY_FEED_POST,
  MUTATION_INSERT_FEED_POST,
  MUTATION_DELETE_FEED_POST,
  MUTATION_UPDATE_FEED_POST,
  /* #endregion */
  /* #region  Feed Comments */
  QUERY_FEED_COMMENTS,
  QUERY_FEED_COMMENT,
  MUTATION_INSERT_FEED_COMMENT,
  MUTATION_DELETE_FEED_COMMENT,
  MUTATION_UPDATE_FEED_COMMENT,
  /* #endregion */
  /* #region  Feed Sources */
  QUERY_FEED_SOURCES_BY_FEED,
  MUTATION_INSERT_FEED_SOURCES,
  MUTATION_DELETE_FEED_SOURCE,
  MUTATION_UPDATE_FEED_SOURCE,
  MUTATION_UPDATE_FEED_SOURCE_KEYWORD,
  QUERY_FEED_SOURCE_UNFOLLOWERS,
  QUERY_FEED_SOURCE_UNFOLLOWERS_BY_FEED,
  MUTATION_INSERT_FEED_SOURCE_UNFOLLOWER,
  MUTATION_DELETE_FEED_SOURCE_UNFOLLOWER,
  QUERY_FEED_SOURCE_SHOWRETWEETS,
  QUERY_FEED_SOURCE_SHOWRETWEETS_BY_FEED,
  MUTATION_INSERT_FEED_SOURCE_SHOWRETWEET,
  MUTATION_DELETE_FEED_SOURCE_SHOWRETWEET,
  /* #endregion */
  /* #region  Feed Sources */
  QUERY_FEED_SHARE_BY_ID,
  QUERY_FEED_SHARE_BY_FEED,
  MUTATION_INSERT_FEED_SHARE,
  MUTATION_DELETE_FEED_SHARE,
  /* #endregion */
  /* #region  Source Operations */
  QUERY_SOURCES,
  QUERY_SOURCE_BY_ID,
  QUERY_SOURCE_BY_SLUG,
  QUERY_EXIST_SOURCE_BY_SLUG,
  MUTATION_INSERT_SOURCE,
  MUTATION_UPDATE_SOURCE,
  MUTATION_DELETE_SOURCE,
  MUTATION_INSERT_SOCIALTAG,
  MUTATION_UPDATE_SOCIALTAG,
  MUTATION_DELETE_SOCIALTAG,
  MUTATION_UPDATE_SOURCE_THROTTLE,
  MUTATION_UPDATE_SOURCE_LASTUPDATED,
  /* #endregion */
  /* #region  Source Upvotes */
  QUERY_SOURCE_VOTER,
  MUTATION_SOURCE_INC_UPVOTES,
  MUTATION_SOURCE_DEC_UPVOTES,
  /* #endregion */
  /* #region  Source Followers */
  QUERY_SOURCE_FOLLOWERS_BY_SOURCE,
  MUTATION_INSERT_SOURCE_FOLLOWER,
  MUTATION_DELETE_SOURCE_FOLLOWER,
  MUTATION_UPDATE_SOURCE_FOLLOWERS,
  /* #endregion */
  /* #region  Source Reports */
  QUERY_SOURCE_REPORTS_BY_SOURCE,
  QUERY_SOURCE_REPORTS_BY_SOURCES,
  MUTATION_INSERT_SOURCE_REPORT,
  MUTATION_DELETE_SOURCE_REPORTS,
  MUTATION_DELETE_SOURCE_REPORT,
  MUTATION_UPDATE_SOURCE_REPORT,
  /* #endregion */
  /* #region  Article Operations */
  QUERY_ARTICLE_BY_NID,
  QUERY_ARTICLES,
  QUERY_ARTICLES_EQ_BRANCH,
  QUERY_ARTICLES_EQ_SOURCE,
  QUERY_NEWSPAPERS_EQ_COUNTRY,
  QUERY_ARTICLES_IN_SOURCES_OF_BRANCH,
  QUERY_ARTICLES_IN_SOURCES,
  QUERY_NEWSPAPERS_IN_SOURCES_OF_COUNTRY,
  // QUERY_ARTICLES_IN_SOURCES_OF_BRANCH_BYFUNC,
  // QUERY_ARTICLES_IN_SOURCES_BYFUNC,
  // QUERY_ARTICLES_IN_SOURCES_OF_COUNTRY_BYFUNC,
  MUTATION_DELETE_ARTICLE,
  MUTATION_INSERT_USERPOST,
  MUTATION_UPDATE_USERPOST,
  MUTATION_APPROVE_USERPOST,
  /* #endregion */
  /* #region  Article Upvotes */
  QUERY_ARTICLE_VOTER,
  MUTATION_ARTICLE_INC_UPVOTES,
  MUTATION_ARTICLE_DEC_UPVOTES,
  /* #endregion */
  /* #region  Article Save */
  QUERY_ARTICLE_SAVE_BY_USER,
  QUERY_ARTICLE_SAVE,
  MUTATION_INSERT_ARTICLE_SAVE,
  MUTATION_DELETE_ARTICLE_SAVE,
  /* #endregion */
  /* #region  Article Reports */
  QUERY_ARTICLE_REPORTS_BY_ARTICLE,
  QUERY_ARTICLE_REPORTS_BY_SOURCES,
  MUTATION_INSERT_ARTICLE_REPORT,
  MUTATION_DELETE_ARTICLE_REPORTS,
  MUTATION_DELETE_ARTICLE_REPORT,
  MUTATION_UPDATE_ARTICLE_REPORT,
  /* #endregion */
  /* #region  Article Pins */
  QUERY_ARTICLE_PINS_IN_FEEDS,
  MUTATION_INSERT_ARTICLE_PIN,
  MUTATION_DELETE_ARTICLE_PIN,
  /* #endregion */
  /* #region  Article MoveTops */
  QUERY_ARTICLE_MOVETOPS_IN_FEEDS,
  MUTATION_INSERT_ARTICLE_MOVETOP,
  MUTATION_DELETE_ARTICLE_MOVETOP,
  /* #endregion */
  /* #region  User Operations */
  QUERY_USER_BY_ID,
  QUERY_USER_BY_USERNAME,
  QUERY_USERS_BY_SEARCHKEY,
  MUTATION_INSERT_USER,
  MUTATION_UPDATE_USER,
  MUTATION_UPDATE_USER_PHONE,
  MUTATION_UPDATE_USER_LINKS,
  MUTATION_UPDATE_USER_MSGTOKEN,
  MUTATION_UPDATE_USER_SKIPPROFILE,
  MUTATION_UPDATE_USER_SUBSCRIBE_EMAIL,
  MUTATION_DELETE_USER_SUBSCRIBE_EMAIL,
  /* #endregion */
  /* #region  Tag User */
  QUERY_TAG_USER_BY_REF,
  MUTATION_ADD_TAG_USER,
  MUTATION_DELETE_TAG_USER,
  /* #endregion */
  /* #region  ActivityLogs */
  QUERY_ACTIVITYLOGS_BY_USER,
  QUERY_ACTIVITYLOGS_BY_TYPE,
  QUERY_ACTIVITYLOGS_BY_TYPEID,
  MUTATION_INSERT_ACTIVITYLOG,
  /* #endregion */
  /* #region  Scrape Request */
  QUERY_SCRAPE_REQUEST,
  MUTATION_INSERT_SCRAPE_REQUEST,
  MUTATION_UPDATE_SCRAPE_REQUEST,
  MUTATION_DELETE_SCRAPE_REQUEST,
  /* #endregion */
  /* #region Comment */
  QUERY_TOP_ARTICLE_COMMENTS_BY_NEWEST,
  QUERY_TOP_ARTICLE_COMMENTS_BY_OLDEST,
  QUERY_TOP_ARTICLE_COMMENTS_BY_RECOMMENDS,
  QUERY_TOP_ARTICLE_COMMENTS_BY_REPLIES,
  QUERY_TOP_THREAD_COMMENTS_BY_NEWEST,
  QUERY_TOP_THREAD_COMMENTS_BY_OLDEST,
  QUERY_TOP_THREAD_COMMENTS_BY_RECOMMENDS,
  QUERY_TOP_THREAD_COMMENTS_BY_REPLIES,
  QUERY_ARTICLE_COMMENTS_BY_NEWEST,
  QUERY_ARTICLE_COMMENTS_BY_OLDEST,
  QUERY_ARTICLE_COMMENTS_BY_RECOMMENDS,
  QUERY_ARTICLE_COMMENTS_BY_REPLIES,
  QUERY_THREAD_COMMENTS_BY_NEWEST,
  QUERY_THREAD_COMMENTS_BY_OLDEST,
  QUERY_THREAD_COMMENTS_BY_RECOMMENDS,
  QUERY_THREAD_COMMENTS_BY_REPLIES,
  MUTATION_INSERT_COMMENT,
  MUTATION_UPDATE_COMMENT,
  MUTATION_APPROVE_COMMENT,
  MUTATION_DELETE_COMMENT,
  MUTATION_DELETEALL_COMMENTS,
  QUERY_COMMENT_RECOMMENDER,
  MUTATION_COMMENT_INC_RECOMMENDS,
  MUTATION_COMMENT_DEC_RECOMMENDS,
  /* #endregion */
  /* #region Comment Reports */
  QUERY_COMMENT_REPORTS_BY_COMMENT,
  MUTATION_INSERT_COMMENT_REPORT,
  MUTATION_DELETE_COMMENT_REPORT,
  MUTATION_UPDATE_COMMENT_REPORT,
  /* #endregion */
  /* #region Thread */
  QUERY_THREADS_BY_FEEDS,
  QUERY_THREAD_BY_ID,
  QUERY_THREAD_BY_ARTICLE,
  MUTATION_INSERT_THREAD,
  MUTATION_APPROVE_THREAD,
  MUTATION_CLOSE_THREAD,
  MUTATION_DELETE_THREAD,
  MUTATION_DELETE_THREAD_BY_FROM,
  /* #endregion */
  /* #region  Thread Upvotes */
  QUERY_THREAD_VOTER,
  MUTATION_THREAD_INC_UPVOTES,
  MUTATION_THREAD_DEC_UPVOTES,
  /* #endregion */
  /* #region  Thread Reports */
  QUERY_THREAD_REPORT_BY_THREAD,
  MUTATION_INSERT_THREAD_REPORT,
  MUTATION_APPROVE_THREAD_REPORT,
  MUTATION_DELETE_THREAD_REPORT,
  /* #endregion */
  /* #region  Banned User */
  QUERY_BANNED_USERS_BY_FEED,
  MUTATION_INSERT_BANNED_USER,
  MUTATION_UPDATE_BANNED_USER,
  MUTATION_DELETE_BANNED_USER,
  /* #endregion */
  /* #region  Preapproved User */
  QUERY_PREAPPROVED_USERS_BY_FEED,
  MUTATION_INSERT_PREAPPROVED_USER,
  MUTATION_DELETE_PREAPPROVED_USER,
  /* #endregion */
  /* #region  User Followers */
  QUERY_USERS_BY_FOLLOWER,
  MUTATION_INSERT_USER_FOLLOWER,
  MUTATION_DELETE_USER_FOLLOWER,
  /* #endregion */
  /* #region  User Invites */
  QUERY_INVITES_BY_USER,
  QUERY_INVITES_BY_PHONE,
  MUTATION_INSERT_USER_INVITE,
  MUTATION_INSERT_USER_INVITE_BYPHONE,
  MUTATION_DELETE_USER_INVITE,
  /* #endregion */
  /* #region  Trending */
  QUERY_TRENDING_SOURCES,
  QUERY_TRENDING_ARTICLES_OF_BRANCH,
  QUERY_TRENDING_ARTICLES_OF_BRANCH_COUNTRY,
  /* #endregion */
  /* #region  User Feed ShowFirst */
  QUERY_SHOWFIRST_FEEDS,
  MUTATION_INSERT_USER_FEED_SHOWFIRST,
  MUTATION_DELETE_USER_FEED_SHOWFIRST,
  /* #endregion */
  /* #region  Notifications */
  QUERY_NOTIFICATIONS_TO_USER,
  MUTATION_INSERT_NOTIFICATION,
  MUTATION_CONFIRM_NOTIFICATION,
  /* #endregion */
  /* #region  Uptime Stats */
  QUERY_STATS,
  /* #endregion */
  /* #region  Map Regions */
  QUERY_MAP_REGIONS,
  QUERY_MAP_REGION_BY_ID,
  QUERY_MAP_REGION_BY_SLUG,
  MUTATION_INSERT_MAP_REGION,
  MUTATION_DELETE_MAP_REGION,
  MUTATION_INSERT_REGION_MODERATOR,
  MUTATION_APPROVE_REGION_MODERATOR,
  MUTATION_DELETE_REGION_MODERATOR,
  /* #endregion */
  /* #region  Locations */
  QUERY_MAP_LOCATION_BY_ID,
  QUERY_MAP_LOCATION_BY_SLUG,
  QUERY_MAP_LOCATIONS_BY_BOX,
  QUERY_MAP_LOCATIONS_BY_BOX_DDAY,
  QUERY_MAP_LOCATIONS_BY_REGION,
  MUTATION_INSERT_MAP_LOCATION,
  MUTATION_UPDATE_MAP_LOCATION,
  MUTATION_UPDATE_MAP_LOCATION_OP_READINGS,
  MUTATION_UPDATE_MAP_LOCATION_OP_IMAGEUPLOAD,
  MUTATION_UPDATE_MAP_LOCATION_OP_MODERATION,
  MUTATION_UPDATE_MAP_LOCATION_OP_DESCRIPTION,
  MUTATION_UPDATE_MAP_LOCATION_OP_COMMENTS,
  MUTATION_UPDATE_MAP_LOCATION_READINGCONF,
  MUTATION_DELETE_MAP_LOCATION,
  /* #endregion */
  /* #region  Location Reports */
  QUERY_LOCATION_REPORTS_BY_LOCATION,
  MUTATION_INSERT_LOCATION_REPORT,
  MUTATION_DELETE_LOCATION_REPORT,
  MUTATION_APPROVE_LOCATION_REPORT,
  /* #endregion */
  /* #region  Location Moderators */
  QUERY_LOCATION_MODERATORS_BY_LOCATION,
  QUERY_LOCATION_MODERATOR,
  MUTATION_INSERT_LOCATION_MODERATOR,
  MUTATION_DELETE_LOCATION_MODERATOR,
  MUTATION_APPROVE_LOCATION_MODERATOR,
  /* #endregion */
  /* #region  Location Followers */
  QUERY_LOCATION_FOLLOWERS_BY_UID,
  QUERY_LOCATION_FOLLOWERS_BY_LOCATION,
  MUTATION_INSERT_LOCATION_FOLLOWER,
  MUTATION_DELETE_LOCATION_FOLLOWER,
  /* #endregion */
  /* #region  Readings */
  QUERY_MAP_READINGS_BY_LOCATION,
  MUTATION_INSERT_MAP_READING,
  MUTATION_UPDATE_MAP_READING,
  MUTATION_APPROVE_MAP_READING,
  MUTATION_DELETE_MAP_READING,
  /* #endregion */
  /* #region  Reading Reports */
  QUERY_READING_REPORTS_BY_READING,
  QUERY_READING_REPORTS_BY_LOCATION,
  MUTATION_INSERT_READING_REPORT,
  MUTATION_DELETE_READING_REPORT,
  MUTATION_APPROVE_READING_REPORT,
  /* #endregion */
  /* #region  Mappost */
  QUERY_MAPPOST_BY_NID,
  QUERY_MAPPOSTS_BY_LOCATION,
  /* #endregion */
  /* #region  Location Moderation */
  QUERY_LOCATION_MODERATION_COUNT,
  QUERY_LOCATION_MODERATION_FIELDS,
  /* #endregion */
  /* #region  Maplocation Moderator Reports */
  QUERY_MAPLOCATION_MODERATOR_REPORTS_BY_LOCATION,
  MUTATION_INSERT_MAPLOCATION_MODERATOR_REPORT,
  MUTATION_UPDATE_MAPLOCATION_MODERATOR_REPORT,
  MUTATION_DELETE_MAPLOCATION_MODERATOR_REPORT,
  MUTATION_DELETE_MAPLOCATION_MODERATOR_REPORTS,
  /* #endregion */
  /* #region  Map location Banned User */
  QUERY_MAPLOCATION_BANNED_USERS_BY_LOCATION,
  MUTATION_INSERT_MAPLOCATION_BANNED_USER,
  MUTATION_UPDATE_MAPLOCATION_BANNED_USER,
  MUTATION_DELETE_MAPLOCATION_BANNED_USER,
  /* #endregion */
} from "./endpoints";

// const RAVEN_API = "http://64.225.56.54/v1/graphql";
const RAVEN_API = "https://graphql.raventalk.org/v1/graphql";

class GraphqlService {
  constructor() {
    this.client = new GraphQLClient(RAVEN_API, { headers: {} });
    this.pagesize = ARTICLES_PER_PAGE;
  }

  /* #region  Graphql Request Header */
  set_auth_jwt = (token, moderator = false) => {
    const bearerToken = `Bearer ${token}`;
    this.client.setHeader("Authorization", bearerToken);
    if (moderator) {
      this.client.setHeader("x-hasura-role", "moderator");
    } else {
      this.client.setHeader("x-hasura-role", "user");
    }
  };
  /* #endregion */

  /* #region  Base Data */
  base_data = () =>
    new Promise((resolve, reject) => {
      this.client
        .request(QUERY_BASE_DATA)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting base data :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  base_data_by_user = () =>
    new Promise((resolve, reject) => {
      this.client
        .request(QUERY_BASE_DATA_USER)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting base data :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  base_data_by_paiduser = () =>
    new Promise((resolve, reject) => {
      this.client
        .request(QUERY_BASE_DATA_PAIDUSER)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting base data :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  lists = () =>
    new Promise((resolve, reject) => {
      this.client
        .request(QUERY_LISTS)
        .then(data => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data
          });
        })
        .catch(err => {
          let msg = 'Error getting lists :' + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Category Moderation Fields */
  category_moderation_fields = (category_id, category_feed_ids, logtype, after) =>
    new Promise((resolve, reject) => {
      const variables = {
        category_id: category_id,
        category_feed_ids: category_feed_ids,
        logtype: logtype,
        after: after
      };

      this.client
        .request(QUERY_CATEGORY_MODERATION_FIELDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting category moderation fields :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  category_moderation_count = (category_id, category_feed_ids) =>
    new Promise((resolve, reject) => {
      const variables = {
        category_id: category_id,
        category_feed_ids: category_feed_ids
      };

      this.client
        .request(QUERY_CATEGORY_MODERATION_COUNT, variables)
        .then(data => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data
          });
        })
        .catch(err => {
          let msg = 'Error getting category moderation count :' + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Category Moderators */
  category_moderators_by_category = (category_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        category_id: category_id,
      };

      this.client
        .request(QUERY_CATEGORY_MODERATORS_BY_CATEGORY, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting moderators of category :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_category_moderator = (moderator) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: moderator.id,
        category_id: moderator.category_id,
        user_id: moderator.user_id,
      };

      this.client
        .request(MUTATION_INSERT_CATEGORY_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert category moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_category_moderator = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_CATEGORY_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete category moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  resign_category_moderator = (category_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        category_id: category_id,
        user_id: user_id
      };

      this.client
        .request(MUTATION_RESIGN_CATEGORY_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error resign category moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_category_moderator = (id, approved, approved_by) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
      };

      this.client
        .request(MUTATION_UPDATE_CATEGORY_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update category moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_category_last_viewlog = (id, viewtime) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        viewtime: viewtime
      };

      this.client
        .request(MUTATION_UPDATE_CATEGORY_LASTVIEWLOG, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update category last view time :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_category_notifications = (id, notifications) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        notifications: notifications
      };

      this.client
        .request(MUTATION_UPDATE_CATEGORY_NOTIFICATIONS, variables)
        .then(data => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data
          });
        })
        .catch(err => {
          let msg = 'Error update category notifications :' + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Feed Moderation Fields */
  feed_by_id = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: feed_id,
      };

      this.client
        .request(QUERY_FEED_BY_ID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed info :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_by_slug = (slug) =>
    new Promise((resolve, reject) => {
      const variables = {
        slug: slug,
      };

      this.client
        .request(QUERY_FEED_BY_SLUG, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed info by slug :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_exist_by_slug = (feed_id, slug) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        slug: slug,
      };

      this.client
        .request(QUERY_FEED_EXIST_BY_SLUG, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed info by slug :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_moderation_count = (feed_id, feed_source_ids, after, logtype, last_viewtime) =>
    new Promise((resolve, reject) => {
      const userpost_source_id = `${feed_id}-userpost`;
      const variables = {
        feed_id: feed_id,
        userpost_source_id: userpost_source_id,
        feed_source_ids: feed_source_ids,
        after: after,
        logtype: logtype,
        last_viewtime: last_viewtime
      };

      this.client
        .request(QUERY_FEED_MODERATION_COUNT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed moderation count :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_moderation_fields = (feed_id, feed_source_ids, after, logtype) =>
    new Promise((resolve, reject) => {
      const userpost_source_id = `${feed_id}-userpost`;
      const variables = {
        feed_id: feed_id,
        userpost_source_id: userpost_source_id,
        feed_source_ids: feed_source_ids,
        after: after,
        logtype: logtype
      };

      this.client
        .request(QUERY_FEED_MODERATION_FIELDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed moderation fields :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_members = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id
      };

      this.client
        .request(QUERY_FEED_MEMBERS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed members :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Feed Operations */
  insert_feed = (feed, feed_sources) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_objects: [feed],
        feed_sources_objects: feed_sources,
      };

      this.client
        .request(MUTATION_INSERT_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed = (feed) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_UPDATE_FEED, feed)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feeds = (ids) =>
    new Promise((resolve, reject) => {
      const variables = {
        ids: ids,
      };

      this.client
        .request(MUTATION_DELETE_FEEDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feeds :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_approve = (id, approved) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_APPROVED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed approved :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_followers = (id, followers) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        followers: followers,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_FOLLOWERS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed followers :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_commentconf = (id, commentconf) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        conf: commentconf,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_COMMENTCONF, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed comment configuration :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_last_viewlog = (id, viewtime) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        viewtime: viewtime,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_LASTVIEWLOG, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed last view time :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_op_visibility = (id, visibility) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        visibility: visibility,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_OP_VISIBILITY, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed option visibility :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_op_comments = (id, comments) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        comments: comments,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_OP_COMMENTS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed option comments :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_op_posts = (id, posts) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        posts: posts,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_OP_POSTS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed option posts :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_op_members = (id, members) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        members: members,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_OP_MEMBERS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed option members :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_op_payment = (id, payment) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        payment: payment,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_OP_PAYMENT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed option payment :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_op_anonymity = (id, anonymity) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        anonymity: anonymity,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_OP_ANONYMITY, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed option anonymity :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_tg_wallet = (id, tg_wallet) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        tg_wallet: tg_wallet,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_TG_WALLET, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed tg wallet :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_tg_address = (id, tg_address) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        tg_address: tg_address,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_TG_ADDRESS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed tg address :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_tg_amount = (id, tg_amount) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        tg_amount: tg_amount,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_TG_AMOUNT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed tg amount :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_token_address = (id, token_address) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        token_address: token_address,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_TOKEN_ADDRESS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed token address :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_token_amount = (id, token_amount) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        token_amount: token_amount,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_TOKEN_AMOUNT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed token amount :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_notifications = (id, notifications, notif_date) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        notifications: notifications,
        notif_date: notif_date
      };

      this.client
        .request(MUTATION_UPDATE_FEED_NOTIFICATIONS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data            
          });
        })
        .catch((err) => {
          let msg = "Error update feed notifications :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Feed Followers */
  feed_followers = (user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
      };

      this.client
        .request(QUERY_FEED_FOLLOWERS_BY_UID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting followers of feeds :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_followers_by_feeds = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_FEED_FOLLOWERS_BY_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting followers of feeds :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_follower = (follower) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: follower.id,
        feed_id: follower.feed_id,
        user_id: follower.user_id,
        order: follower.order,
      };

      this.client
        .request(MUTATION_INSERT_FEED_FOLLOWER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed follower :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_follower_order = (feed_id, user_id, order) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        user_id: user_id,
        order: order,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_FOLLOWER_ORDER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed follower order :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_follower = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_FEED_FOLLOWER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed follower :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Feed Order */
  feed_orders = (user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
      };

      this.client
        .request(QUERY_FEED_ORDER_BY_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed orders :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_order = (order) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_FEED_ORDER, order)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert a feed order :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_orders = (orders) =>
    new Promise((resolve, reject) => {
      const variables = {
        orders: orders,
      };
      this.client
        .request(MUTATION_INSERT_FEED_ORDERS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed orders :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_order = (new_order) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_UPDATE_FEED_ORDER, new_order)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed order :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_order = (user_id, feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
        feed_id: feed_id
      };

      this.client
        .request(MUTATION_DELETE_FEED_ORDER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed order :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Feed Subscribers */
  feed_subscribers = (user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
      };

      this.client
        .request(QUERY_FEED_SUBSCRIBERS_BY_UID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting subscribers of feeds :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_subscribers_by_feeds = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_FEED_SUBSCRIBERS_BY_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting subscribers of feeds :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_subscriber = (feed_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        user_id: user_id
      };

      this.client
        .request(MUTATION_INSERT_FEED_SUBSCRIBER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed subscriber :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_subscriber = (feed_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        user_id: user_id
      };

      this.client
        .request(MUTATION_DELETE_FEED_SUBSCRIBER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed subscriber :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_subscribers = (user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id
      };

      this.client
        .request(MUTATION_DELETE_FEED_SUBSCRIBERS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed subscribers :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Feed Moderators */
  feed_moderators_by_feed = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_FEED_MODERATORS_BY_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting moderators of feed :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_moderator = (feed_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        user_id: user_id
      };

      this.client
        .request(QUERY_FEED_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting moderators of feed :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_moderator = (moderator) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: moderator.id,
        feed_id: moderator.feed_id,
        user_id: moderator.user_id,
        approved: moderator.approved,
        owner: moderator.owner
      };

      this.client
        .request(MUTATION_INSERT_FEED_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_moderator = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_FEED_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  resign_feed_moderator = (feed_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        user_id: user_id
      };

      this.client
        .request(MUTATION_RESIGN_FEED_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error resign feed moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_moderator = (id, approved, approved_by, approved_at, owner) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
        owner: owner
      };

      this.client
        .request(MUTATION_UPDATE_FEED_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Moderator Reports(Feed Moderator) */
  moderator_reports_by_feed = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_MODERATOR_REPORTS_BY_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting moderator reports :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_moderator_report = (report) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: report.id,
        moderator_id: report.moderator_id,
        feed_id: report.feed_id,
        report: report.report,
        reported_by: report.reported_by,
      };

      this.client
        .request(MUTATION_INSERT_MODERATOR_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert moderator report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_moderator_report = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_MODERATOR_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete moderator report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_moderator_reports = (feed_id, moderator_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        moderator_id: moderator_id,
      };

      this.client
        .request(MUTATION_DELETE_MODERATOR_REPORTS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete moderator reports :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });


  update_moderator_report = (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_UPDATE_MODERATOR_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update moderator report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  /* #endregion */

  /* #region  Feed Reports */
  feed_reports_by_feed = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_FEED_REPORTS_BY_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting reports of feed :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_report = (report) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: report.id,
        feed_id: report.feed_id,
        report: report.report,
        reported_by: report.reported_by,
      };

      this.client
        .request(MUTATION_INSERT_FEED_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_report = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_FEED_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_report = (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Feed Posts */
  feed_posts = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_FEED_POSTS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting posts of feed :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_post = (feed_id, article_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        article_id: article_id
      };

      this.client
        .request(QUERY_FEED_POST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting a post of feed :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_post = (post) =>
    new Promise((resolve, reject) => {

      this.client
        .request(MUTATION_INSERT_FEED_POST, post)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed post :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_post = (feed_id, article_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        article_id: article_id
      };

      this.client
        .request(MUTATION_DELETE_FEED_POST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed post :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_post = (feed_id, article_id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        article_id: article_id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_POST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed post :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Feed Comments */
  feed_comments = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_FEED_COMMENTS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting comments of feed :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_comment = (feed_id, comment_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        comment_id: comment_id
      };

      this.client
        .request(QUERY_FEED_COMMENT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting a comment of feed :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_comment = (comment) =>
    new Promise((resolve, reject) => {

      this.client
        .request(MUTATION_INSERT_FEED_COMMENT, comment)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed comment :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_comment = (feed_id, comment_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        comment_id: comment_id
      };

      this.client
        .request(MUTATION_DELETE_FEED_COMMENT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed comment :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_comment = (feed_id, comment_id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        comment_id: comment_id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_COMMENT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed comment :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Feed Sources */
  feed_sources_by_feed = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_FEED_SOURCES_BY_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting sources of feed :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_sources = (feed_sources) =>
    new Promise((resolve, reject) => {
      const variables = {
        objects: feed_sources,
      };

      this.client
        .request(MUTATION_INSERT_FEED_SOURCES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed sources :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_source = (feed_id, source_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        source_id: source_id,
      };

      this.client
        .request(MUTATION_DELETE_FEED_SOURCE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed source :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_source = (id, source_id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        source_id: source_id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_UPDATE_FEED_SOURCE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed source :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_feed_source_keyword = (feed_id, source_id, keyword) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        source_id: source_id,
        keyword: keyword
      };

      this.client
        .request(MUTATION_UPDATE_FEED_SOURCE_KEYWORD, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update feed source keyword :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Social Tag */
  insert_socialtag = (socialtag) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_SOCIALTAG, socialtag)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert socialtag :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_socialtag = (socialtag) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_UPDATE_SOCIALTAG, socialtag)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update socialtag :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_socialtag = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_SOCIALTAG, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete socialtag :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_source_throttle = (source_id, throttle) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: source_id,
        throttle: throttle
      };

      this.client
        .request(MUTATION_UPDATE_SOURCE_THROTTLE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update source throttle :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_source_lastupdated = (source_id, last_updated) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: source_id,
        last_updated: last_updated
      };

      this.client
        .request(MUTATION_UPDATE_SOURCE_LASTUPDATED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update source last_updated :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Feed Source Unfollowers */
  feed_source_unfollowers = () =>
    new Promise((resolve, reject) => {
      this.client
        .request(QUERY_FEED_SOURCE_UNFOLLOWERS)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed source unfollowers :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_source_unfollowers_by_feed = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_FEED_SOURCE_UNFOLLOWERS_BY_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed source unfollowers :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_source_unfollower = (unfollower) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_FEED_SOURCE_UNFOLLOWER, unfollower)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed source unfollower :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_source_unfollower = (feed_id, source_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        source_id: source_id,
        user_id: user_id,
      };

      this.client
        .request(MUTATION_DELETE_FEED_SOURCE_UNFOLLOWER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed source unfollower :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Feed Source ShowRetweet */
  feed_source_showretweets = () =>
    new Promise((resolve, reject) => {
      this.client
        .request(QUERY_FEED_SOURCE_SHOWRETWEETS)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed source showretweet :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_source_showretweets_by_feed = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_FEED_SOURCE_SHOWRETWEETS_BY_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed source showretweet :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_source_showretweet = (feed_id, source_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        source_id: source_id,
        user_id: user_id,
      };

      this.client
        .request(MUTATION_INSERT_FEED_SOURCE_SHOWRETWEET, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed source showretweet :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_source_showretweet = (feed_id, source_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        source_id: source_id,
        user_id: user_id,
      };

      this.client
        .request(MUTATION_DELETE_FEED_SOURCE_SHOWRETWEET, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed source showretweet :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Source Operations */
  feed_share_by_id = (share_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: share_id
      };

      this.client
        .request(QUERY_FEED_SHARE_BY_ID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed share :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  feed_share_by_feed = (feed_id, after) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        after: after
      };

      this.client
        .request(QUERY_FEED_SHARE_BY_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting feed share :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_feed_share = (shareInfo) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_FEED_SHARE, shareInfo)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert feed share :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_feed_share = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id
      };

      this.client
        .request(MUTATION_DELETE_FEED_SHARE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete feed share :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Source Operations */
  sources = () => 
    new Promise((resolve, reject) => {
      this.client
        .request(QUERY_SOURCES)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting sources :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  source_by_id = (source_id) => 
    new Promise((resolve, reject) => {
      const variables = {
        id: source_id,
      };

      this.client
        .request(QUERY_SOURCE_BY_ID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting source info :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  source_by_slug = (slug) => 
    new Promise((resolve, reject) => {
      const variables = {
        slug: slug,
      };

      this.client
        .request(QUERY_SOURCE_BY_SLUG, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting source info by slug :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  source_exist_by_slug = (source_id, slug) => 
    new Promise((resolve, reject) => {
      const variables = {
        id: source_id,
        slug: slug
      };

      this.client
        .request(QUERY_EXIST_SOURCE_BY_SLUG, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting exist source info by slug :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  

  insert_source = (source) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_SOURCE, source)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert source :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_source = (source) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_UPDATE_SOURCE, source)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update source :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_source = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_SOURCE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete source :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Source Followers */
  source_followers_by_source = (source_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        source_id: source_id,
      };

      this.client
        .request(QUERY_SOURCE_FOLLOWERS_BY_SOURCE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting followers of source :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_source_follower = (follower) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: follower.id,
        source_id: follower.source_id,
        user_id: follower.user_id,
      };

      this.client
        .request(MUTATION_INSERT_SOURCE_FOLLOWER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert source follower :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_source_follower = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_SOURCE_FOLLOWER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete source follower :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_source_followers = (id, followers) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        followers: followers,
      };

      this.client
        .request(MUTATION_UPDATE_SOURCE_FOLLOWERS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update source followers :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Source Upvotes */
  source_voter = (source_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        source_id: source_id,
        user_id: user_id,
      };

      this.client
        .request(QUERY_SOURCE_VOTER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting source voter :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  source_inc_upvotes = async (source_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        source_id: source_id,
        user_id: user_id,
      };

      this.client
        .request(MUTATION_SOURCE_INC_UPVOTES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error increment source upvotes :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  source_dec_upvotes = (source_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        source_id: source_id,
        user_id: user_id,
      };

      this.client
        .request(MUTATION_SOURCE_DEC_UPVOTES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error decrement source upvotes :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Source Reports */
  source_reports_by_source = (source_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        source_id: source_id,
      };

      this.client
        .request(QUERY_SOURCE_REPORTS_BY_SOURCE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting reports of source :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  source_reports_by_sources = (source_ids) =>
    new Promise((resolve, reject) => {
      const variables = {
        source_ids: source_ids,
      };

      this.client
        .request(QUERY_SOURCE_REPORTS_BY_SOURCES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting reports of sources :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_source_report = (report) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: report.id,
        source_id: report.source_id,
        report: report.report,
        reported_by: report.reported_by,
      };

      this.client
        .request(MUTATION_INSERT_SOURCE_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert source report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_source_reports = (source_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        source_id: source_id,
      };

      this.client
        .request(MUTATION_DELETE_SOURCE_REPORTS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete source reports :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_source_report = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_SOURCE_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete source report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_source_report = (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_UPDATE_SOURCE_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update source report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Article Operations */
  article_by_nid = (nid) =>
    new Promise((resolve, reject) => {
      const variables = {
        nid: nid,
      };

      this.client
        .request(QUERY_ARTICLE_BY_NID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting article :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  articles = (offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_ARTICLES, variables)
        .then((result) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data: result.articles,
          });
        })
        .catch((err) => {
          let msg = "Error getting articles :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  newspapers_eq_country = (country, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        country: country,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_NEWSPAPERS_EQ_COUNTRY, variables)
        .then((result) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data: result.articles,
          });
        })
        .catch((err) => {
          let msg = "Error getting newspapers of country :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  articles_eq_branch = (branch, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        branch: branch,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_ARTICLES_EQ_BRANCH, variables)
        .then((result) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data: result.data.articles,
          });
        })
        .catch((err) => {
          let msg = "Error getting articles of branch :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  articles_eq_source = (source_id, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        source_id: source_id,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_ARTICLES_EQ_SOURCE, variables)
        .then((result) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data: result.articles,
          });
        })
        .catch((err) => {
          let msg = "Error getting articles of source :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  articles_in_sources = (source_ids, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        source_ids: source_ids,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_ARTICLES_IN_SOURCES, variables)
        .then((result) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data: result.articles,
          });
        })
        .catch((err) => {
          let msg = "Error getting articles in sources :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  articles_in_sources_of_branch = (branch, source_ids, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        branch: branch,
        source_ids: source_ids,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_ARTICLES_IN_SOURCES_OF_BRANCH, variables)
        .then((result) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data: result.articles,
          });
        })
        .catch((err) => {
          let msg = "Error getting articles in sources of branch :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  newspapers_in_sources_of_country = (country, source_ids, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        country: country,
        source_ids: source_ids,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_NEWSPAPERS_IN_SOURCES_OF_COUNTRY, variables)
        .then((result) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data: result.articles,
          });
        })
        .catch((err) => {
          let msg = "Error getting newspapers in sources of country :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });


  // articles_in_sources_func = (source_ids, offset) =>
  //   new Promise((resolve, reject) => {
  //     const query = QUERY_ARTICLES_IN_SOURCES_BYFUNC(source_ids, this.pagesize, offset);

  //     this.client
  //       .request(query)
  //       .then((result) => {
  //         resolve({
  //           status_code: GRAPHQL_SUCCESS,
  //           data: result.articles_in_sources_aggregate.nodes,
  //         });
  //       })
  //       .catch((err) => {
  //         let msg = "Error getting articles in sources :" + err;
  //         console.log(msg);
  //         reject({ status_code: GRAPHQL_ERROR, msg: msg });
  //       });
  //   });

  // articles_in_sources_of_branch_func = (branch, source_ids, offset) =>
  //   new Promise((resolve, reject) => {
  //     const query = QUERY_ARTICLES_IN_SOURCES_OF_BRANCH_BYFUNC(branch, source_ids, this.pagesize, offset);

  //     this.client
  //       .request(query)
  //       .then((result) => {
  //         resolve({
  //           status_code: GRAPHQL_SUCCESS,
  //           data: result.articles_in_sources_of_branch_aggregate.nodes,
  //         });
  //       })
  //       .catch((err) => {
  //         let msg = "Error getting articles in sources of branch :" + err;
  //         console.log(msg);
  //         reject({ status_code: GRAPHQL_ERROR, msg: msg });
  //       });
  //   });

  // newspapers_in_sources_of_country_func = (country, source_ids, offset) =>
  //   new Promise((resolve, reject) => {
  //     const query = QUERY_ARTICLES_IN_SOURCES_OF_COUNTRY_BYFUNC(country, source_ids, this.pagesize, offset);

  //     this.client
  //       .request(query)
  //       .then((result) => {
  //         resolve({
  //           status_code: GRAPHQL_SUCCESS,
  //           data: result.articles_in_sources_of_country_aggregate.nodes,
  //         });
  //       })
  //       .catch((err) => {
  //         let msg = "Error getting newspapers in sources of country :" + err;
  //         console.log(msg);
  //         reject({ status_code: GRAPHQL_ERROR, msg: msg });
  //       });
  //   });
  

  delete_article = (article_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        nid: article_id,
      };

      this.client
        .request(MUTATION_DELETE_ARTICLE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete article :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_userpost = (post) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_USERPOST, post)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert user post :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_userpost = (post) =>
    new Promise((resolve, reject) => {
      const variables = {
        nid: post.nid,
        summary: post.summary,
        text: post.text,
        published: post.published,
        link_preview: post.link_preview
      };

      this.client 
        .request(MUTATION_UPDATE_USERPOST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert user post :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  approve_userpost = (post_id, approved) =>
    new Promise((resolve, reject) => {
      const variables = {
        nid: post_id,
        approved: approved ? 1 : 0
      };
      this.client
        .request(MUTATION_APPROVE_USERPOST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error approve user post :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Article Upvotes */
  article_voter = (article_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        user_id: user_id,
      };

      this.client
        .request(QUERY_ARTICLE_VOTER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting article voter :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  article_inc_upvotes = async (article_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        user_id: user_id,
      };

      this.client
        .request(MUTATION_ARTICLE_INC_UPVOTES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error increment article upvotes :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  article_dec_upvotes = (article_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        user_id: user_id,
      };

      this.client
        .request(MUTATION_ARTICLE_DEC_UPVOTES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error decrement article upvotes :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Article Save */
  article_save_by_user = (user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
      };

      this.client
        .request(QUERY_ARTICLE_SAVE_BY_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting article save by user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  article_save = (article_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        user_id: user_id
      };

      this.client
        .request(QUERY_ARTICLE_SAVE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error get article save :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_article_save = (article_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        user_id: user_id
      };

      this.client
        .request(MUTATION_INSERT_ARTICLE_SAVE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert article save :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_article_save = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id
      };

      this.client
        .request(MUTATION_DELETE_ARTICLE_SAVE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete article save :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Article Reports */
  article_reports_by_article = (article_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
      };

      this.client
        .request(QUERY_ARTICLE_REPORTS_BY_ARTICLE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting reports of article :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  article_reports_by_sources = (source_ids) =>
    new Promise((resolve, reject) => {
      const timestamp = new Date() - 86400 * 1000;
      const after = new Date(timestamp).toISOString();

      const variables = {
        source_ids: source_ids,
        after: after,
      };

      this.client
        .request(QUERY_ARTICLE_REPORTS_BY_SOURCES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting reports of articles in sources :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_article_report = (report) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: report.id,
        article_id: report.article_id,
        source_id: report.source_id,
        report: report.report,
        reported_by: report.reported_by,
      };

      this.client
        .request(MUTATION_INSERT_ARTICLE_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert article report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_article_reports = (article_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
      };

      this.client
        .request(MUTATION_DELETE_ARTICLE_REPORTS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete article reports :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_article_report = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_ARTICLE_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete article report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_article_report = (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_UPDATE_ARTICLE_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update article report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Article Pins */
  article_pins_in_feeds = (feed_ids, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_ids: feed_ids,
      };

      this.client
        .request(QUERY_ARTICLE_PINS_IN_FEEDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting article pins in feeds :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_article_pin = (pin) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: pin.id,
        article_id: pin.article_id,
        feed_id: pin.feed_id,
        pinned_by: pin.pinned_by,
      };

      this.client
        .request(MUTATION_INSERT_ARTICLE_PIN, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert article pin :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_article_pin = (article_id, feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        feed_id: feed_id,
      };

      this.client
        .request(MUTATION_DELETE_ARTICLE_PIN, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete article pin :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Article MoveTops */
  article_movetops_in_feeds = (feed_ids) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_ids: feed_ids,
      };

      this.client
        .request(QUERY_ARTICLE_MOVETOPS_IN_FEEDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting article movetops in feeds :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_article_movetop = (movetop) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: movetop.id,
        article_id: movetop.article_id,
        feed_id: movetop.feed_id,
        moved_by: movetop.moved_by,
      };

      this.client
        .request(MUTATION_INSERT_ARTICLE_MOVETOP, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert article movetop :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_article_movetop = (article_id, feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        feed_id: feed_id,
      };

      this.client
        .request(MUTATION_DELETE_ARTICLE_MOVETOP, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete article movetop :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  User Operations */
  user_by_id = (uid) =>
    new Promise((resolve, reject) => {
      const variables = {
        uid: uid,
      };

      this.client
        .request(QUERY_USER_BY_ID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  user_by_username = (username) =>
    new Promise((resolve, reject) => {
      const variables = {
        username: username,
      };

      this.client
        .request(QUERY_USER_BY_USERNAME, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting user by username :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  users_by_searchkey = (searchkey) =>
    new Promise((resolve, reject) => {
      const variables = {
        searchkey: `%${searchkey}%`,
      };

      this.client
        .request(QUERY_USERS_BY_SEARCHKEY, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting users by searchkey :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_user = (user) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_USER, user)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_user = (user) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_UPDATE_USER, user)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_user_phone = (uid, phone) =>
    new Promise((resolve, reject) => {
      const variables = {
        uid: uid,
        phone: phone
      };

      this.client
        .request(MUTATION_UPDATE_USER_PHONE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update user phone:" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_user_links = (uid, links) =>
    new Promise((resolve, reject) => {
      const variables = {
        uid: uid,
        links: links
      };

      this.client
        .request(MUTATION_UPDATE_USER_LINKS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update user links:" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_user_msgtoken = (uid, msgtoken) =>
    new Promise((resolve, reject) => {
      const variables = {
        uid: uid,
        msgToken: msgtoken
      };

      this.client
        .request(MUTATION_UPDATE_USER_MSGTOKEN, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update user msgtoken :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_user_skipprofile = (uid, skipprofile) =>
    new Promise((resolve, reject) => {
      const variables = {
        uid: uid,
        skipProfile: skipprofile
      };

      this.client
        .request(MUTATION_UPDATE_USER_SKIPPROFILE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update user skip profile :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_user_subscribe_email = (uid, email) =>
    new Promise((resolve, reject) => {
      const variables = {
        uid: uid,
        subscribe_email: email
      };

      this.client
        .request(MUTATION_UPDATE_USER_SUBSCRIBE_EMAIL, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update user subscribe email :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_user_subscribe_email = (uid) =>
    new Promise((resolve, reject) => {
      const variables = {
        uid: uid
      };

      this.client
        .request(MUTATION_DELETE_USER_SUBSCRIBE_EMAIL, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete user subscribe email :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  
  add_user = (user) =>
    new Promise(async (resolve, reject) => {
      var isNew = true;
      var isUpdated = false;
      this.user_by_id(user.uid)
        .then((data) => {
          if (data.data.users.length > 0) {
            isNew = false;
            const existuser = data.data.users[0];
            if (existuser.msgToken !== user.msgToken) {
              isUpdated = true;
              return this.update_user_msgtoken(existuser.uid, user.msgToken);
            } else {
              return data;
            }
          } else {
            isNew = true;
            return this.insert_user(user);
          }
        })
        .then((result) => {
          let data = null;
          if (isNew) {
            data = result.data.insert_users.returning;
            data.isNew = true;
          } else {
            data = isUpdated ? result.data.update_users.returning : result.data.users;
            data.isNew = false;
          }
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update user approved :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Tag User */
  tag_user = (tag_user) =>
    new Promise((resolve, reject) => {
      const variables = {
        tag_name: tag_user.tag_name,
        user_id: tag_user.user_id,
      };

      this.client
        .request(QUERY_TAG_USER_BY_REF, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error get tag_user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  add_tag_user = (tag_user) =>
    new Promise((resolve, reject) => {
      this.tag_user(tag_user)
        .then((data) => {
          if (data.data.tag_user.length > 0) {
            resolve({
              status_code: GRAPHQL_SUCCESS,
              data,
            });
          } else {
            this.client
              .request(MUTATION_ADD_TAG_USER, tag_user)
              .then((data) => {
                resolve({
                  status_code: GRAPHQL_SUCCESS,
                  data,
                });
              })
              .catch((err) => {
                let msg = "Error insert tag_user :" + err;
                console.log(msg);
                reject({ status_code: GRAPHQL_ERROR, msg: msg });
              });
          }
        })
        .catch((err) => {
          let msg = "Error get tag_user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_tag_user = (tag_user) =>
    new Promise((resolve, reject) => {
      const variables = {
        tag_name: tag_user.tag_name,
        user_id: tag_user.user_id,
      };

      this.client
        .request(MUTATION_DELETE_TAG_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete tag_user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  ActivityLogs */
  activitylogs_by_user = (uid) =>
    new Promise((resolve, reject) => {
      const variables = {
        uid: uid,
      };

      this.client
        .request(QUERY_ACTIVITYLOGS_BY_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting activitylogs by user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  activitylogs_by_type = (type) =>
    new Promise((resolve, reject) => {
      const variables = {
        type: type,
      };

      this.client
        .request(QUERY_ACTIVITYLOGS_BY_TYPE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting activitylogs by type :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  activitylogs_by_typeid = (type, type_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        type: type,
        type_id: type_id,
      };

      this.client
        .request(QUERY_ACTIVITYLOGS_BY_TYPEID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting activitylogs by typeid :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_activitylog = (activitylog) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_ACTIVITYLOG, activitylog)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert activitylog :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  /* #endregion */

  /* #region  Scrape Request */
  scrape_request = () =>
    new Promise((resolve, reject) => {
      this.client
        .request(QUERY_SCRAPE_REQUEST)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting scrape request :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_scrape_request = (source) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_SCRAPE_REQUEST, source)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert scrape request :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_scrape_request = (request) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_UPDATE_SCRAPE_REQUEST, request)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update scrape request :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_scrape_request = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_SCRAPE_REQUEST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete scrape request :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Comment */
  top_article_comments_by_newest = (article_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_TOP_ARTICLE_COMMENTS_BY_NEWEST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting top article comments (by newest):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  top_article_comments_by_oldest = (article_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_TOP_ARTICLE_COMMENTS_BY_OLDEST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting top article comments (by oldest):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  top_article_comments_by_recommends = (article_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_TOP_ARTICLE_COMMENTS_BY_RECOMMENDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting top article comments (by recommends):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  top_article_comments_by_replies = (article_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_TOP_ARTICLE_COMMENTS_BY_REPLIES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting top article comments (by replies):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  top_thread_comments_by_newest = (thread_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_TOP_THREAD_COMMENTS_BY_NEWEST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting top thread comments (by newest):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  top_thread_comments_by_oldest = (thread_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_TOP_THREAD_COMMENTS_BY_OLDEST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting top thread comments (by oldest):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  top_thread_comments_by_recommends = (thread_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_TOP_THREAD_COMMENTS_BY_RECOMMENDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting top thread comments (by recommends):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  top_thread_comments_by_replies = (thread_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_TOP_THREAD_COMMENTS_BY_REPLIES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting top thread comments (by replies):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  article_comments_by_newest = (article_id, parent_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        parent_id: parent_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_ARTICLE_COMMENTS_BY_NEWEST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting article comments (by newest):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  article_comments_by_oldest = (article_id, parent_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        parent_id: parent_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_ARTICLE_COMMENTS_BY_OLDEST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting article comments (by oldest):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  article_comments_by_recommends = (article_id, parent_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        parent_id: parent_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_ARTICLE_COMMENTS_BY_RECOMMENDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting article comments (by recommends):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  article_comments_by_replies = (article_id, parent_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        parent_id: parent_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_ARTICLE_COMMENTS_BY_REPLIES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting article comments (by replies):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  thread_comments_by_newest = (thread_id, parent_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        parent_id: parent_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_THREAD_COMMENTS_BY_NEWEST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting thread comments (by newest):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  thread_comments_by_oldest = (thread_id, parent_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        parent_id: parent_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_THREAD_COMMENTS_BY_OLDEST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting thread comments (by oldest):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  thread_comments_by_recommends = (thread_id, parent_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        parent_id: parent_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_THREAD_COMMENTS_BY_RECOMMENDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting thread comments (by recommends):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  thread_comments_by_replies = (thread_id, parent_id, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        parent_id: parent_id,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_THREAD_COMMENTS_BY_REPLIES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting thread comments (by replies):" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_comment = (comment) =>
    new Promise((resolve, reject) => {
      let variables = {
        article_id: comment.article_id,
        thread_id: comment.thread_id,
        text: comment.text,
        author_id: comment.author_id,
        approved: comment.approved,
        approved_by: comment.approved_by,
        approved_at: comment.approved_at
      };
      if (comment.parent_id !== null) {
        variables.parent_id = comment.parent_id;
      }

      this.client
        .request(MUTATION_INSERT_COMMENT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting comment :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_comment = (id, text, modified_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        text: text,
        modified_at: modified_at,
      };

      this.client
        .request(MUTATION_UPDATE_COMMENT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error updating comment :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  approve_comment = (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_APPROVE_COMMENT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error approving comment :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_comment = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_COMMENT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting comment :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  deleteall_comment = (thread_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
      };

      this.client
        .request(MUTATION_DELETEALL_COMMENTS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting all comment :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  comment_recommender = (comment_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        comment_id: comment_id,
        user_id: user_id,
      };

      this.client
        .request(QUERY_COMMENT_RECOMMENDER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting comment recommender :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  comment_inc_recommends = async (comment_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        comment_id: comment_id,
        user_id: user_id,
      };

      this.client
        .request(MUTATION_COMMENT_INC_RECOMMENDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error increment comment recommends :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  comment_dec_recommends = (comment_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        comment_id: comment_id,
        user_id: user_id,
      };

      this.client
        .request(MUTATION_COMMENT_DEC_RECOMMENDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error decrement comment recommends :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Comment Reports */
  comments_reports_by_comment = (comment_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        comment_id: comment_id,
      };

      this.client
        .request(QUERY_COMMENT_REPORTS_BY_COMMENT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting reports of comment :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_comment_report = (report) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: report.id,
        comment_id: report.comment_id,
        report: report.report,
        reported_by: report.reported_by,
      };

      this.client
        .request(MUTATION_INSERT_COMMENT_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert comment report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_comment_report = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_COMMENT_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete comment report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_comment_report = (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_UPDATE_COMMENT_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update comment report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Threads */
  threads_by_feeds = (feed_id, feed_source_ids, approved, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        source_ids: feed_source_ids,
        approved: approved,
        pagesize: this.pagesize,
        offset: offset,
      };

      this.client
        .request(QUERY_THREADS_BY_FEEDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting threads:" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  thread_by_id = (thread_id, approved) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        approved: approved
      };

      this.client
        .request(QUERY_THREAD_BY_ID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting thread:" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  thread_by_article = (article_id, approved) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
        approved: approved
      };

      this.client
        .request(QUERY_THREAD_BY_ARTICLE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting article thread:" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_thread = (thread) =>
    new Promise((resolve, reject) => {
      let variables = {
        title: thread.title,
        text: thread.text,
        type: thread.type,
        approved: thread.approved,
        approved_at: thread.approved_at,
        approved_by: thread.approved_by
      };
      if (thread.posted_by !== null) {
        variables.posted_by = thread.posted_by;
        variables.feed_id = thread.feed_id;
      }
      if (thread.from !== null) {
        variables.from = thread.from;
      }

      this.client
        .request(MUTATION_INSERT_THREAD, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting thread :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  approve_thread = (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_APPROVE_THREAD, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error approving thread :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  close_thread = (id, closed, closed_by, closed_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        closed: closed,
        closed_by: closed_by,
        closed_at: closed_at,
      };

      this.client
        .request(MUTATION_CLOSE_THREAD, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error closing thread :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });  

  delete_thread = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_THREAD, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting thread :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_thread_by_from = (article_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        article_id: article_id,
      };

      this.client
        .request(MUTATION_DELETE_THREAD_BY_FROM, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting thread by from :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Thread Upvotes */
  thread_voter = (thread_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        user_id: user_id,
      };

      this.client
        .request(QUERY_THREAD_VOTER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting thread voter :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  thread_inc_upvotes = async (thread_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        user_id: user_id,
      };

      this.client
        .request(MUTATION_THREAD_INC_UPVOTES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error increment thread upvotes :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  thread_dec_upvotes = (thread_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
        user_id: user_id,
      };

      this.client
        .request(MUTATION_THREAD_DEC_UPVOTES, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error decrement thread upvotes :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Thread Reports */
  thread_reports_by_thread = (thread_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        thread_id: thread_id,
      };

      this.client
        .request(QUERY_THREAD_REPORT_BY_THREAD, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting thread reports :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_thread_report = async (feed_id, report) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
        thread_id: report.thread_id,
        report: report.report,
        reported_by: report.reported_by
      }

      this.client
        .request(MUTATION_INSERT_THREAD_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting thread report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  approve_thread_report = async (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_APPROVE_THREAD_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error approving thread report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_thread_report = async (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_THREAD_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting thread report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Banned User */
  banned_users_by_feed = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_BANNED_USERS_BY_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting banned users :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_banned_user = async (banned) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: banned.user_id,
        feed_id: banned.feed_id,
        banned_at: banned.banned_at,
        banned_till: banned.banned_till,
        type: banned.type,
        banned_by: banned.banned_by,
      };

      this.client
        .request(MUTATION_INSERT_BANNED_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting banned user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_banned_user = async (banned) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: banned.user_id,
        feed_id: banned.feed_id,
        banned_at: banned.banned_at,
        banned_till: banned.banned_till,
        type: banned.type,
        banned_by: banned.banned_by,
      };

      this.client
        .request(MUTATION_UPDATE_BANNED_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error updating banned user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });    

  delete_banned_user = async (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_BANNED_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting banned user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Pre Approved User */
  preapproved_users_by_feed = (feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        feed_id: feed_id,
      };

      this.client
        .request(QUERY_PREAPPROVED_USERS_BY_FEED, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting preapproved users :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_preapproved_user = async (approved) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: approved.user_id,
        feed_id: approved.feed_id,
        approved_by: approved.approved_by,
      };

      this.client
        .request(MUTATION_INSERT_PREAPPROVED_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting preapproved user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_preapproved_user = async (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_PREAPPROVED_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting preapproved user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */  

  /* #region  User Follower */
  users_by_follower = (follower_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        follower_id: follower_id,
      };

      this.client
        .request(QUERY_USERS_BY_FOLLOWER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting users by follower :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_user_follower = async (user_id, follower_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
        follower_id: follower_id
      };

      this.client
        .request(MUTATION_INSERT_USER_FOLLOWER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting user follower :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_user_follower = async (user_id, follower_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
        follower_id: follower_id
      };

      this.client
        .request(MUTATION_DELETE_USER_FOLLOWER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting user follower :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  User Invite */
  invites_by_user = (invitee) =>
    new Promise((resolve, reject) => {
      const variables = {
        invitee: invitee,
      };

      this.client
        .request(QUERY_INVITES_BY_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting users by invitee :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  invites_by_phone = (phone) =>
    new Promise((resolve, reject) => {
      const variables = {
        phone: phone,
      };

      this.client
        .request(QUERY_INVITES_BY_PHONE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting users by inviter :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_user_invite = async (invitee, inviter_id, invited_to, is_phone) =>
    new Promise((resolve, reject) => {
      const variables = {
        invitee: invitee,
        is_phone: is_phone,
        invited_by: inviter_id,
        invited_to: invited_to,
      };

      this.client
        .request(MUTATION_INSERT_USER_INVITE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting user invite :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_user_invite_by_phone = async (phoneno, inviter_id, invited_to, is_phone) =>
    new Promise((resolve, reject) => {
      const variables = {
        phoneno: phoneno,
        is_phone: is_phone,
        invited_by: inviter_id,
        invited_to: invited_to,
      };

      this.client
        .request(MUTATION_INSERT_USER_INVITE_BYPHONE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting user invite by phone:" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_user_invite = async (user_id, inviter_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
        invited_by: inviter_id
      };

      this.client
        .request(MUTATION_DELETE_USER_INVITE, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting user invite :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Trending */
  trending_sources = () =>
    new Promise((resolve, reject) => {
      this.client
        .request(QUERY_TRENDING_SOURCES)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting trending sources :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  trending_articles_of_branch = (branch, source_ids, last_time) =>
    new Promise((resolve, reject) => {
      const variables = {
        branch: branch,
        source_ids: source_ids,
        last_time: last_time
      };

      this.client
        .request(QUERY_TRENDING_ARTICLES_OF_BRANCH, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting trending articles of branch :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  trending_articles_of_branch_country = (branch, country, source_ids, last_time) =>
    new Promise((resolve, reject) => {
      const variables = {
        branch: branch,
        country: country,
        source_ids: source_ids,
        last_time: last_time
      };

      this.client
        .request(QUERY_TRENDING_ARTICLES_OF_BRANCH_COUNTRY, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting trending articles of branch and country :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  User Feed ShowFirst */
  showfirst_feeds_by_user = (user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
      };

      this.client
        .request(QUERY_SHOWFIRST_FEEDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting showfirst feeds by user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_user_feed_showfirst = async (user_id, feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
        feed_id: feed_id
      };

      this.client
        .request(MUTATION_INSERT_USER_FEED_SHOWFIRST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting user feed showfirst :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_user_feed_showfirst = async (user_id, feed_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
        feed_id: feed_id
      };

      this.client
        .request(MUTATION_DELETE_USER_FEED_SHOWFIRST, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting user feed showfirst :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Notifications */
  notifications_to_user = (user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
      };

      this.client
        .request(QUERY_NOTIFICATIONS_TO_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting notifications to user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_notification = async (notification) =>
    new Promise((resolve, reject) => {

      this.client
        .request(MUTATION_INSERT_NOTIFICATION, notification)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting notification :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  confirm_notification = async (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id
      };

      this.client
        .request(MUTATION_CONFIRM_NOTIFICATION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error confirm notification :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */
  
  /* #region  Stats */
  get_uptimestats = () =>
  new Promise((resolve, reject) => {
    this.client
      .request(QUERY_STATS)
      .then((data) => {
        resolve({
          status_code: GRAPHQL_SUCCESS,
          data,
        });
      })
      .catch((err) => {
        let msg = "Error getting uptime stats :" + err;
        console.log(msg);
        reject({ status_code: GRAPHQL_ERROR, msg: msg });
      });
  });
  /* #endregion */

  /* #region  Map Regions */
  map_regions = () =>
    new Promise((resolve, reject) => {
      this.client
        .request(QUERY_MAP_REGIONS)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting regions :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  map_region_by_id = (region_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: region_id
      };

      this.client
        .request(QUERY_MAP_REGION_BY_ID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting region by id :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  map_region_by_slug = (slug) =>
    new Promise((resolve, reject) => {
      const variables = {
        slug: slug,
      };

      this.client
        .request(QUERY_MAP_REGION_BY_SLUG, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting region by slug :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_map_region = (region) =>
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_MAP_REGION, region)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting map region :" + err;
          console.log(msg);
          resolve({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_map_region = (region_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: region_id
      };

      this.client
        .request(MUTATION_DELETE_MAP_REGION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting map region :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_map_region_moderator = (region) =>
    new Promise((resolve, reject) => {
      const variables = {
        region_id: region.region_id,
        user_id: region.user_id,
        approved: region.approved,
        approved_at: region.approved_at,
        approved_by: region.approved_by
      };

      this.client
        .request(MUTATION_INSERT_REGION_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting map region moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  approve_map_region_moderator = (moderator_id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: moderator_id,
        approved: approved,
        approved_at: approved_at,
        approved_by: approved_by
      };

      this.client
        .request(MUTATION_APPROVE_REGION_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error approving map region moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_map_region_moderator = (moderator_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: moderator_id
      };

      this.client
        .request(MUTATION_DELETE_REGION_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting map region moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Map Locations */
  map_location_by_id = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id
      };

      this.client
        .request(QUERY_MAP_LOCATION_BY_ID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  map_location_by_slug = (slug) =>
    new Promise((resolve, reject) => {
      const variables = {
        slug: slug
      };

      this.client
        .request(QUERY_MAP_LOCATION_BY_SLUG, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  map_locations_by_box = (lng_min, lng_max, lat_min, lat_max) =>
    new Promise((resolve, reject) => {
      const variables = {
        lng_min: lng_min,
        lng_max: lng_max,
        lat_min: lat_min,
        lat_max: lat_max
      };

      this.client
        .request(QUERY_MAP_LOCATIONS_BY_BOX, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting locations by box :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  map_locations_by_box_dday = (lng_min, lng_max, lat_min, lat_max, dday) =>
    new Promise((resolve, reject) => {
      const variables = {
        lng_min: lng_min,
        lng_max: lng_max,
        lat_min: lat_min,
        lat_max: lat_max,
        dday: dday
      };

      this.client
        .request(QUERY_MAP_LOCATIONS_BY_BOX_DDAY, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting locations by box :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  map_locations_by_region = (region_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        region_id: region_id
      };

      this.client
        .request(QUERY_MAP_LOCATIONS_BY_REGION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting locations by region :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_map_location = (location) => 
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_MAP_LOCATION, location)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_map_location = (location) => 
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_UPDATE_MAP_LOCATION, location)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        }, (reason) => {
          return;
        })
        .catch((err) => {
          let msg = "Error updating location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_map_location_op_readings = (location_id, readings) => 
    new Promise((resolve, reject) => {
      const variables = {
        id: location_id,
        readings: readings
      };

      this.client
        .request(MUTATION_UPDATE_MAP_LOCATION_OP_READINGS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error updating location op readings :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_map_location_op_imageupload = (location_id, imageupload) => 
    new Promise((resolve, reject) => {
      const variables = {
        id: location_id,
        imageupload: imageupload
      };

      this.client
        .request(MUTATION_UPDATE_MAP_LOCATION_OP_IMAGEUPLOAD, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error updating location op imageupload :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_map_location_op_moderation = (location_id, moderation) => 
    new Promise((resolve, reject) => {
      const variables = {
        id: location_id,
        moderation: moderation
      };

      this.client
        .request(MUTATION_UPDATE_MAP_LOCATION_OP_MODERATION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error updating location op moderation :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_map_location_op_description = (location_id, description) => 
    new Promise((resolve, reject) => {
      const variables = {
        id: location_id,
        description: description
      };

      this.client
        .request(MUTATION_UPDATE_MAP_LOCATION_OP_DESCRIPTION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error updating location op description :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_map_location_op_comments = (location_id, comments) => 
    new Promise((resolve, reject) => {
      const variables = {
        id: location_id,
        comments: comments
      };

      this.client
        .request(MUTATION_UPDATE_MAP_LOCATION_OP_COMMENTS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error updating location op comments :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_map_location_readingconf = (location_id, conf) => 
    new Promise((resolve, reject) => {
      const variables = {
        id: location_id,
        conf: conf
      };

      this.client
        .request(MUTATION_UPDATE_MAP_LOCATION_READINGCONF, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error updating location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_map_location = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id
      };

      this.client
        .request(MUTATION_DELETE_MAP_LOCATION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Location Reports */
  location_reports_by_location = (location_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id,
      };

      this.client
        .request(QUERY_LOCATION_REPORTS_BY_LOCATION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting reports of location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_location_report = (report) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: report.location_id,
        report: report.report,
        reported_by: report.reported_by,
      };

      this.client
        .request(MUTATION_INSERT_LOCATION_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert location report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_location_report = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_LOCATION_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete location report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  approve_location_report = (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_APPROVE_LOCATION_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error approve location report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Location Moderators */
  location_moderators_by_location = (location_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id,
      };

      this.client
        .request(QUERY_LOCATION_MODERATORS_BY_LOCATION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting moderators of location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  map_location_moderator = (location_id, user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id,
        user_id: user_id
      };

      this.client
        .request(QUERY_LOCATION_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting moderators of location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_map_location_moderator = (moderator) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: moderator.user_id,
        location_id: moderator.location_id,
        approved: moderator.approved,
        approved_by: moderator.approved_by,
        approved_at: moderator.approved_at
      };

      this.client
        .request(MUTATION_INSERT_LOCATION_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert location moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_map_location_moderator = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_LOCATION_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete location moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  approve_map_location_moderator = (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at
      };

      this.client
        .request(MUTATION_APPROVE_LOCATION_MODERATOR, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error approve location moderator :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Location Followers */
  location_followers_by_uid = (user_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: user_id,
      };

      this.client
        .request(QUERY_LOCATION_FOLLOWERS_BY_UID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting followers of location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  location_followers_by_location = (location_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id,
      };

      this.client
        .request(QUERY_LOCATION_FOLLOWERS_BY_LOCATION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting followers of location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_location_follower = (follower) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: follower.location_id,
        user_id: follower.user_id
      };

      this.client
        .request(MUTATION_INSERT_LOCATION_FOLLOWER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert location follower :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_location_follower = (follower) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: follower.location_id,
        user_id: follower.user_id
      };

      this.client
        .request(MUTATION_DELETE_LOCATION_FOLLOWER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete location follower :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Map Readings */
  get_map_readings_by_location = (location_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id
      };

      this.client
        .request(QUERY_MAP_READINGS_BY_LOCATION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting readings :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_map_reading = (reading) => 
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_INSERT_MAP_READING, reading)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert reading :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_map_reading = (reading) => 
    new Promise((resolve, reject) => {
      this.client
        .request(MUTATION_UPDATE_MAP_READING, reading)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error updating reading :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  approve_map_reading = (reading_id, approved_at, approved_by) => 
    new Promise((resolve, reject) => {
      const variables = {
        id: reading_id,
        approved: true,
        approved_at: approved_at,
        approved_by: approved_by
      };
      this.client
        .request(MUTATION_APPROVE_MAP_READING, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error approve reading :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_map_reading = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id
      };

      this.client
        .request(MUTATION_DELETE_MAP_READING, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting reading :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Reading Reports */
  reading_reports_by_reading = (reading_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        reading_id: reading_id,
      };

      this.client
        .request(QUERY_READING_REPORTS_BY_READING, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting reports of reading :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  reading_reports_by_location = (location_id, after) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id,
        after: after
      };

      this.client
        .request(QUERY_READING_REPORTS_BY_LOCATION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting reading reports of the location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_reading_report = (report) =>
    new Promise((resolve, reject) => {
      const variables = {
        reading_id: report.reading_id,
        location_id: report.location_id,
        report: report.report,
        reported_by: report.reported_by,
      };

      this.client
        .request(MUTATION_INSERT_READING_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert reading report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_reading_report = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_READING_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete reading report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  approve_reading_report = (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_APPROVE_READING_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error approve reading report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Mappost */
  map_post_by_nid = (nid) =>
    new Promise((resolve, reject) => {
      const variables = {
        nid: nid,
      };

      this.client
        .request(QUERY_MAPPOST_BY_NID, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting map post :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  
  map_posts_by_location = (location_id, offset) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id,
        pagesize: this.pagesize,
        offset: offset
      };

      this.client
        .request(QUERY_MAPPOSTS_BY_LOCATION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting map posts of location :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */
  
  /* #region  Location Moderation */
  location_moderation_count = (location_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id
      };

      this.client
        .request(QUERY_LOCATION_MODERATION_COUNT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting location moderation count :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  location_moderation_fields = (location_id, after, logtype) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id,
        location_id_str: location_id.toString(),
        after: after,
        logtype: logtype
      };

      this.client
        .request(QUERY_LOCATION_MODERATION_FIELDS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting location moderation fields :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

  /* #region  Moderator Reports(Map location) */
  maplocation_moderator_reports_by_location = (location_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id,
      };

      this.client
        .request(QUERY_MAPLOCATION_MODERATOR_REPORTS_BY_LOCATION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting location moderator reports :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_maplocation_moderator_report = (report) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: report.id,
        moderator_id: report.moderator_id,
        location_id: report.location_id,
        report: report.report,
        reported_by: report.reported_by,
      };

      this.client
        .request(MUTATION_INSERT_MAPLOCATION_MODERATOR_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error insert location moderator report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_maplocation_moderator_report = (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_MAPLOCATION_MODERATOR_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete location moderator report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  delete_maplocation_moderator_reports = (location_id, moderator_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id,
        moderator_id: moderator_id,
      };

      this.client
        .request(MUTATION_DELETE_MAPLOCATION_MODERATOR_REPORTS, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error delete location moderator reports :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });


  update_maplocation_moderator_report = (id, approved, approved_by, approved_at) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
        approved: approved,
        approved_by: approved_by,
        approved_at: approved_at,
      };

      this.client
        .request(MUTATION_UPDATE_MAPLOCATION_MODERATOR_REPORT, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error update location moderator report :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  /* #endregion */

  /* #region  Map location Banned User */
  maplocation_banned_users_by_location = (location_id) =>
    new Promise((resolve, reject) => {
      const variables = {
        location_id: location_id,
      };

      this.client
        .request(QUERY_MAPLOCATION_BANNED_USERS_BY_LOCATION, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error getting map location banned users :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  insert_maplocation_banned_user = async (banned) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: banned.user_id,
        location_id: banned.location_id,
        banned_at: banned.banned_at,
        banned_by: banned.banned_by,
      };

      this.client
        .request(MUTATION_INSERT_MAPLOCATION_BANNED_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error inserting map location banned user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });

  update_maplocation_banned_user = async (banned) =>
    new Promise((resolve, reject) => {
      const variables = {
        user_id: banned.user_id,
        location_id: banned.location_id,
        banned_at: banned.banned_at,
        banned_by: banned.banned_by,
      };

      this.client
        .request(MUTATION_UPDATE_MAPLOCATION_BANNED_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error updating map location banned user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });    

  delete_maplocation_banned_user = async (id) =>
    new Promise((resolve, reject) => {
      const variables = {
        id: id,
      };

      this.client
        .request(MUTATION_DELETE_MAPLOCATION_BANNED_USER, variables)
        .then((data) => {
          resolve({
            status_code: GRAPHQL_SUCCESS,
            data,
          });
        })
        .catch((err) => {
          let msg = "Error deleting map location banned user :" + err;
          console.log(msg);
          reject({ status_code: GRAPHQL_ERROR, msg: msg });
        });
    });
  /* #endregion */

}

export default GraphqlService;

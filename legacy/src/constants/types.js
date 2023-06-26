// signin method
export const SIGN_METHOD_EMAIL          = 0;
export const SIGN_METHOD_GOOGLE         = 1;
export const SIGN_METHOD_APPLE          = 2;
export const SIGN_METHOD_PHONE          = 3;

// theme mode
export const THEME_MODE_LIGHT           = 'light';
export const THEME_MODE_DARK            = 'dark';

// usage quota
export const USE_QUOTA                  = false;
export const FREE_FEED_CREATE_LIMIT     = 4;
export const FREE_FEED_FOLLOW_LIMIT     = 8;
export const FREE_NEWSLETTER_LIMIT      = 8;
export const PAID_FEED_CREATE_LIMIT     = 20;
export const PAID_FEED_FOLLOW_LIMIT     = 45;

// article source type
export const SOURCE_TYPE_NEWSSITE       = 0;
export const SOURCE_TYPE_SOCIALFEED     = 1;

// 3th party api status
export const FIREBASE_SUCCESS           = 200;
export const FIREBASE_FIRESTORE_ERROR   = 501;
export const FIREBASE_STORAGE_ERROR     = 502;
export const AUTH_NOT_APPROVED          = 401;
export const GRAPHQL_SUCCESS            = 0;
export const GRAPHQL_ERROR              = -1;

// width of card & view
export const MAX_WINDOW_WIDTH           = 1280;     // breakpoint lg
export const MIN_TABLET_WIDTH           = 844;
export const MIN_CARD_WIDTH             = 320;
export const MAX_CARD_WIDTH             = 414;
export const MAX_ARTICLE_WIDTH          = 640;

// app constants
export const ARTICLES_PER_PAGE          = 10;
export const USER_TAGS_MIN_CNT          = 3;
export const TOP_FEEDS_CNT              = 10;

// status of scrape request
export const SCRAPE_REQUESTED           = 0;
export const SCRAPE_REJECTED            = 1;
export const SCRAPE_ACCEPTED            = 2;
export const SCRAPE_PROCESSING          = 3;
export const SCRAPE_DONE                = 4;

// Discover Page tab type
export const TAB_CATEGORIES             = 0;
export const TAB_TRENDING               = 1;
export const TAB_FORYOU                 = 2;
export const TAB_TOPFEEDS               = 3;

// feed tab type
export const TAB_FEED                   = 0;
export const TAB_SOURCES                = 1;
export const TAB_COMMENTS               = 2;
export const TAB_MODERATORS             = 3;

// location tab type
export const TAB_LOC_READINGS           = 0;
export const TAB_LOC_FEEDS              = 1;
export const TAB_LOC_MODERATORS         = 2;

// thread type
export const THREAD_TYPE_USERPOST       = 0;
export const THREAD_TYPE_ARTICLE        = 1;

// user ban type
export const BANNED_TYPE_1D             = 0;
export const BANNED_TYPE_7D             = 1;
export const BANNED_TYPE_PERM           = 2;

// feed comment setting
export const FEED_COMMENT_DISABLE       = 0;
export const FEED_COMMENT_CLOSEALL      = 1;  //'CLOSEALL';
export const FEED_COMMENT_UNMODERATED   = 2;  //'UNMODERATED';
export const FEED_COMMENT_MODERATED     = 3;  //'MODERATED';
export const FEED_COMMENT_DELETEALL     = 4;  //'DELETEALL';
export const FEED_COMMENT_TWITTERUSER   = 5;

// discussion type
export const DISCUSSION_TWITTER         = 0;
export const DISCUSSION_REDDIT          = 1;
export const DISCUSSION_RAVEN           = 2;

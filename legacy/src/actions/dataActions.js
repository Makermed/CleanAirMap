import * as ActionTypes from "./ActionTypes";

export const resetAllData = () => dispatch => {
  dispatch({
    type: ActionTypes.RESET_ALL_DATA
  });
}

export const setNewssiteInfo = newssites => dispatch => {
  dispatch({
    type: ActionTypes.SET_NEWSSITE_INFO,
    newssites
  });
}

export const setSocialtypeInfo = socialtypes => dispatch => {
  dispatch({
    type: ActionTypes.SET_SOCIALTYPE_INFO,
    socialtypes
  });
}

export const setCategories = categories => dispatch => {
  dispatch({
    type: ActionTypes.SET_CATEGORIES,
    categories: categories
  });
}

export const setFeeds = feeds => dispatch => {
  dispatch({
    type: ActionTypes.SET_FEEDS,
    feeds: feeds
  });
}

export const setSources = sources => dispatch => {
  dispatch({
    type: ActionTypes.SET_SOURCES,
    sources: sources
  });
}

export const setDefaultFeeds = feeds => dispatch => {
  dispatch({
    type: ActionTypes.SET_DEFAULT_FEEDS,
    feeds
  });
}

export const setLists = lists => dispatch => {
  dispatch({
    type: ActionTypes.SET_LISTS,
    lists: lists
  });
}

export const selectList = list => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_LIST,
    list
  });
}

export const setModerate = moderate => dispatch => {
  dispatch({
    type: ActionTypes.SET_MODERATE,
    moderate
  });
}

export const setTags = tags => dispatch => {
  dispatch({
    type: ActionTypes.SET_TAGS,
    tags
  });
}

export const setUnfollowedSources = unfollowed => dispatch => {
  dispatch({
    type: ActionTypes.SET_UNFOLLOWED_SOURCES,
    unfollowed
  });
}

export const setShowRetweetSources = showretweets => dispatch => {
  dispatch({
    type: ActionTypes.SET_SHOWRETWEET_SOURCES,
    showretweets
  });
}

export const addTagUser = tag_user => dispatch => {
  dispatch({
    type: ActionTypes.ADD_TAG_USER,
    tag_user
  });
}

export const deleteTagUser = tag_user => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_TAG_USER,
    tag_user
  })
}

export const selectCategory = category => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_CATEGORY,
    category
  });
}

export const changeCategory = category => dispatch => {
  dispatch({
    type: ActionTypes.CHANGE_CATEGORY,
    category
  });
}

export const resignCategoryModerator = (category_id, user_id) => dispatch => {
  dispatch({
    type: ActionTypes.RESIGN_CATEGORY_MODERATOR,
    category_id,
    user_id
  });
}

export const deleteFeedReports = (feed_id) => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_FEED_REPORTS,
    feed_id
  });
}

export const selectFeed = feed => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_FEED,
    feed
  });
}

export const selectFeedforComments = feed => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_FEED_FOR_COMMENTS,
    feed
  });
}

export const addFeed = (feed) => dispatch => {
  dispatch({
    type: ActionTypes.ADD_FEED,
    feed
  });
}

export const approveFeed = (feed_id) => dispatch => {
  dispatch({
    type: ActionTypes.APPROVE_FEED,
    feed_id,
  });
}

export const updateFeed = (feed) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED,
    feed,
  });
}

export const deleteFeed = (feed_id) => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_FEED,
    feed_id
  });
}

export const setFeedJoinInfo = (feed_id, feed_slug) => dispatch => {
  dispatch({
    type: ActionTypes.SET_FEED_JOIN_INFO,
    feed_id,
    feed_slug
  });
}

export const deleteJoinFeedSlug = () => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_FEED_JOIN_INFO
  });
}

export const setFeedShareInfo = (feed_id, feed_slug, share_id) => dispatch => {
  dispatch({
    type: ActionTypes.SET_FEED_SHARE_INFO,
    feed_id,
    feed_slug,
    share_id
  });
}

export const deleteFeedShareInfo = () => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_FEED_SHARE_INFO
  });
}

export const setTempFeedSourceLinks = (source_links) => dispatch => {
  dispatch({
    type: ActionTypes.SET_TEMP_FEED_SOURCELINKS,
    source_links
  });
}

export const clearTempFeedSourceLinks = () => dispatch => {
  dispatch({
    type: ActionTypes.CLS_TEMP_FEED_SOURCELINKS,
  });
}

export const deleteTempFeedSourceLink = (source_link) => dispatch => {
  dispatch({
    type: ActionTypes.DEL_TEMP_FEED_SOURCE,
    source_link
  });
}

export const setTempFeedSources = (feed_sources) => dispatch => {
  dispatch({
    type: ActionTypes.SET_TEMP_FEED_SOURCES,
    feed_sources
  });
}

export const clearTempFeedSources = () => dispatch => {
  dispatch({
    type: ActionTypes.CLS_TEMP_FEED_SOURCES,
  });
}

export const deleteTempFeedSource = (source_id) => dispatch => {
  dispatch({
    type: ActionTypes.DEL_TEMP_FEED_SOURCE,
    source_id
  });
}

export const updateFeedSources = (feed_id, feed_sources) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_SOURCES,
    feed_id,
    feed_sources
  });
}

export const updateFeedFollowers = (feed_id, followers) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_FOLLOWERS,
    feed_id,
    followers
  });
}

export const approveFeedModerator = (moderator_id, approved, approved_by, approved_at) => dispatch => {
  dispatch({
    type: ActionTypes.APPROVE_FEED_MODERATOR,
    moderator_id,
    approved,
    approved_by,
    approved_at
  });
}

export const deleteFeedModerator = (moderator_id) => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_FEED_MODERATOR,
    moderator_id
  });
}

export const resignFeedModerator = (feed_id, user_id) => dispatch => {
  dispatch({
    type: ActionTypes.RESIGN_FEED_MODERATOR,
    feed_id,
    user_id
  });
}

export const makeFeedOwner = (moderator_id) => dispatch => {
  dispatch({
    type: ActionTypes.MAKE_FEED_OWNER,
    moderator_id
  });
}

export const updateFeedOpVisibility = (feed_id, op_visibility) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_OP_VISIBILITY,
    feed_id,
    op_visibility
  });
}

export const updateFeedOpComments = (feed_id, op_comments) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_OP_COMMENTS,
    feed_id,
    op_comments
  });
}

export const updateFeedOpPosts = (feed_id, op_posts) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_OP_POSTS,
    feed_id,
    op_posts
  });
}

export const updateFeedOpMembers = (feed_id, op_members) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_OP_MEMBERS,
    feed_id,
    op_members
  });
}

export const updateFeedOpPayment = (feed_id, op_payment) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_OP_PAYMENT,
    feed_id,
    op_payment
  });
}

export const updateFeedOpAnonymity = (feed_id, op_anonymity) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_OP_ANONYMITY,
    feed_id,
    op_anonymity
  });
}

export const updateFeedCommentConf = (feed_id, comment_conf) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_COMMENTCONF,
    feed_id,
    comment_conf
  });
}

export const updateFeedTGWallet = (feed_id, tg_wallet) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_TG_WALLET,
    feed_id,
    tg_wallet
  });
}

export const updateFeedTGAddress = (feed_id, tg_address) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_TG_ADDRESS,
    feed_id,
    tg_address
  });
}

export const updateFeedTGAmount = (feed_id, tg_amount) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_TG_AMOUNT,
    feed_id,
    tg_amount
  });
}

export const updateFeedTokenAddress = (feed_id, token_address) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_TOKEN_ADDRESS,
    feed_id,
    token_address
  });
}

export const updateFeedTokenAmount = (feed_id, token_amount) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_FEED_TOKEN_AMOUNT,
    feed_id,
    token_amount
  });
}

export const selectSource = source => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_SOURCE,
    source
  });
}

export const addSource = source => dispatch => {
  dispatch({
    type: ActionTypes.ADD_SOURCE,
    source
  });
}

export const updateSource = source => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_SOURCE,
    source
  });
}

export const updateSourceApprove = (source_id, approved) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_SOURCE_APPROVE,
    source_id,
    approved
  });
}

export const updateSourceUpvotes = (source_id, upvotes) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_SOURCE_UPVOTES,
    source_id,
    upvotes
  });
} 

export const selectArticle = article => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_ARTICLE,
    article
  });
}

export const deleteArticle = article_id => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_ARTICLE,
    article_id
  });
}

export const refreshArticles = () => dispatch => {
  dispatch({
    type: ActionTypes.REFRESH_ARTICLES
  });
}

export const setArticles = (articles, last_offset) => dispatch => {
  dispatch({
    type: ActionTypes.SET_ARTICLES,
    articles,
    last_offset
  });
}

export const appendArticles = (articles, last_offset) => dispatch => {
  dispatch({
    type: ActionTypes.APPEND_ARTICLES,
    articles,
    last_offset
  });
}

export const setShowFirstArticles = (articles) => dispatch => {
  dispatch({
    type: ActionTypes.SET_SHOWFIRST_ARTICLES,
    articles
  });
}

export const refreshFeedPosts = () => dispatch => {
  dispatch({
    type: ActionTypes.REFRESH_FEEDPOSTS
  });
}

export const setFeedPosts = (feed_posts) => dispatch => {
  dispatch({
    type: ActionTypes.SET_FEEDPOSTS,
    feed_posts
  });
}

export const refreshPodcasts = () => dispatch => {
  dispatch({
    type: ActionTypes.REFRESH_PODCASTS
  });
}

export const setPodcasts = (podcasts, last_offset) => dispatch => {
  dispatch({
    type: ActionTypes.SET_PODCASTS,
    podcasts,
    last_offset
  });
}

export const appendPodcasts = (podcasts, last_offset) => dispatch => {
  dispatch({
    type: ActionTypes.APPEND_PODCASTS,
    podcasts,
    last_offset
  });
}

export const selectPodcast = podcast => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_PODCAST,
    podcast
  });
}

export const unselectPodcast = podcast => dispatch => {
  dispatch({
    type: ActionTypes.UNSELECT_PODCAST,
    podcast
  });
}

export const deletePodcast = podcast_id => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_PODCAST,
    podcast_id
  });
}

export const setArticlePins = (pins) => dispatch => {
  dispatch({
    type: ActionTypes.SET_ARTICLE_PINS,
    pins
  });
}

export const clsArticlePins = () => dispatch => {
  dispatch({
    type: ActionTypes.CLS_ARTICLE_PINS,
  });
}

export const pinArticle = (pin) => dispatch => {
  dispatch({
    type: ActionTypes.PIN_ARTICLE,
    pin
  });
}

export const undoPinArticle = (article_id, feed_id) => dispatch => {
  dispatch({
    type: ActionTypes.UNDO_PIN_ARTICLE,
    article_id,
    feed_id
  });
}

export const setArticleMovetops = (movetops) => dispatch => {
  dispatch({
    type: ActionTypes.SET_ARTICLE_MOVETOPS,
    movetops
  });
}

export const clsArticleMovetops = () => dispatch => {
  dispatch({
    type: ActionTypes.CLS_ARTICLE_MOVETOPS,
  });
}

export const movetopArticle = (movetop) => dispatch => {
  dispatch({
    type: ActionTypes.MOVETOP_ARTICLE,
    movetop
  });
}

export const undoMovetopArticle = (article_id, feed_id) => dispatch => {
  dispatch({
    type: ActionTypes.UNDO_MOVETOP_ARTICLE,
    article_id,
    feed_id
  });
}

export const refreshSavedArticles = () => dispatch => {
  dispatch({
    type: ActionTypes.REFRESH_SAVED_ARTICLES
  });
}

export const setSavedArticles = (articles) => dispatch => {
  dispatch({
    type: ActionTypes.SET_SAVED_ARTICLES,
    articles
  });
}

export const deleteSavedArticle = (save_id) => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_SAVED_ARTICLE,
    save_id
  });
}

export const selectCountry = country => dispatch => {
  dispatch({
    type: ActionTypes.REFRESH_ARTICLES
  });
  dispatch({
    type: ActionTypes.SELECT_COUNTRY,
    country
  });
}

export const selectBranch = branch => dispatch => {
  dispatch({
    type: ActionTypes.REFRESH_ARTICLES
  });
  dispatch({
    type: ActionTypes.SELECT_BRANCH,
    branch
  });
}

export const addUserPost = userpost => dispatch => {
  dispatch({
    type: ActionTypes.ADD_USERPOST,
    userpost
  });
}

export const updateUserPost = userpost => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_USERPOST,
    userpost
  });
}

export const approveUserPost = (userpost) => dispatch => {
  dispatch({
    type: ActionTypes.APPROVE_USERPOST,
    userpost
  });
}

export const approveFeedPost = (feedpost) => dispatch => {
  dispatch({
    type: ActionTypes.APPROVE_FEEDPOST,
    feedpost
  });
}

export const setFollowedFeeds = feeds => dispatch => {
  dispatch({
    type: ActionTypes.SET_FOLLOWED_FEEDS,
    feeds
  });
}

export const setFollowingFeeds = followings => dispatch => {
  dispatch({
    type: ActionTypes.SET_FOLLOWING_FEEDS,
    followings
  });
}

export const setFollowingFeed = (feed, following) => dispatch => {
  dispatch({
    type: ActionTypes.SET_FOLLOWING_FEED,
    feed,
    following
  });
}

export const setSourceFollowers = (source, followers) => dispatch => {
  dispatch({
    type: ActionTypes.SET_SOURCE_FOLLOWERS,
    source,
    followers
  });
}

export const updateSearchKey = searchKey => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_SEARCH_KEY,
    searchKey
  });
}

export const updateSearchResult = results => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_SEARCH_RESULT,
    results
  });
}

export const selectSearchArticle = article => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_SEARCH_ARTICLE,
    article
  });
}

export const insertUnfollowingSource = unfollower => dispatch => {
  dispatch({
    type: ActionTypes.INS_FEED_SOURCE_UNFOLLOWER,
    unfollower
  });
}

export const deleteUnfollowingSource = (feed_id, source_id, user_id) => dispatch => {
  dispatch({
    type: ActionTypes.DEL_FEED_SOURCE_UNFOLLOWER,
    feed_id,
    source_id,
    user_id
  });
}

export const insertShowRetweet = (feed_id, source_id, user_id) => dispatch => {
  dispatch({
    type: ActionTypes.INS_FEED_SOURCE_SHOWRETWEET,
    feed_id,
    source_id,
    user_id
  });
}

export const deleteShowRetweet = (feed_id, source_id, user_id) => dispatch => {
  dispatch({
    type: ActionTypes.DEL_FEED_SOURCE_SHOWRETWEET,
    feed_id,
    source_id,
    user_id
  });
}

export const refreshThreads = () => dispatch => {
  dispatch({
    type: ActionTypes.REFRESH_THREADS
  });
}

export const setThreads = (threads, last_offset) => dispatch => {
  dispatch({
    type: ActionTypes.SET_THREADS,
    threads,
    last_offset
  });
}

export const selectThread = (thread) => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_THREAD,
    thread
  });
}

export const appendThreads = (threads, last_offset) => dispatch => {
  dispatch({
    type: ActionTypes.APPEND_THREADS,
    threads,
    last_offset
  });
}

export const addThread = thread => dispatch => {
  dispatch({
    type: ActionTypes.ADD_THREAD,
    thread
  });
}

export const updateThread = thread => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_THREAD,
    thread
  });
}

export const approveThread = (thread_id, approved, approved_by, approved_at) => dispatch => {
  dispatch({
    type: ActionTypes.APPROVE_THREAD,
    thread_id,
    approved,
    approved_by,
    approved_at
  });
}

export const deleteThread = thread_id => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_THREAD,
    thread_id
  });
}

export const closeThread = thread_id => dispatch => {
  dispatch({
    type: ActionTypes.CLOSE_THREAD,
    thread_id
  });
}

export const deleteThreadByFrom = from => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_THREAD_BY_FROM,
    from
  });
}

export const updateThreadUpvotes = (thread_id, upvotes) => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_THREAD_UPVOTES,
    thread_id,
    upvotes
  });
}

export const insertBannedUser = (banned) => dispatch => {
  dispatch({
    type: ActionTypes.INSERT_BANNED_USER,
    banned
  });
}

export const deleteBannedUser = (user_id, feed_id) => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_BANNED_USER,
    user_id,
    feed_id
  });
}

export const insertPreapprovedUser = (approved) => dispatch => {
  dispatch({
    type: ActionTypes.INSERT_PREAPPROVE_USER,
    approved
  });
}

export const deletePreapprovedUser = (user_id, feed_id) => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_PREAPPROVE_USER,
    user_id,
    feed_id
  });
}

export const selectUser = (user) => dispatch => {
  dispatch({
    type: ActionTypes.SELECT_USER,
    user
  });
}

export const setNewsletterFeeds = (feed_ids) => dispatch => {
  dispatch({
    type: ActionTypes.SET_NEWSLETTER_FEEDS,
    feed_ids
  });
}

export const deleteNewsletterFeeds = () => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_NEWSLETTER_FEEDS
  });
}

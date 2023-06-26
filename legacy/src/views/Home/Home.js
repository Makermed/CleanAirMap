import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withFirebase } from 'services';
import { withAuthentication } from "session";
import { withStyles } from "@material-ui/core/styles";
import MetaTags from "react-meta-tags";
import { Grid } from "@material-ui/core";
import { ToastContainer } from 'react-toastify';
import _ from "lodash";
import {
  SplashScreen,
  BottomNavBar,
  WaitingDialog,
  ArticleList,
  ArticleMasonry,
  // TopFeeds,
  DlgVideo,
  DlgAlert,
  DlgLoginConfirm,
  DlgPostEdit,
} from "components";
import { MainAppBar, FeedsAppBar } from "./components";
import { 
  ARTICLE_BRANCH_NEWSPAPER, 
  ARTICLE_BRANCH_PODCAST, 
  ARTICLE_BRANCH_USERPOST, 
  BRANCH_ALL 
} from "constants/branches";
import { ALL } from "constants/country";
import * as ROUTES from "constants/routes";
import {
  USE_QUOTA,
  FREE_FEED_CREATE_LIMIT,
  PAID_FEED_CREATE_LIMIT,
  TOP_FEEDS_CNT,
  TAB_FEED,
  MIN_TABLET_WIDTH,
  MAX_WINDOW_WIDTH,
  MAX_CARD_WIDTH,
} from "constants/types";
import { 
  ACTIVITY_TYPE_FEED, 
  ACTIVITY_REPORT,
} from "constants/activity";
import { conf_defaultfeeds } from "constants/defaultfeeds";
import { 
  GraphqlService,
  createCategorySubscriber, 
  createFeedSubscriber,
  // createSourceSubscriber,
  createNotificationSubscriber
} from "services";
import { uuid } from "uuidv4";
import { fetch_linkpreview } from "utility/ravenapi";
import { 
  is_source_alive,
  summarize_text
} from "utility/utils";
import { is_paid_user } from "utility/user";
import { ToastError } from "utility/toast";


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_WINDOW_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
  },
  appbar: {
    width: "100%",
    zIndex: 10,
  },
  topfeeds: {
    position: "sticky",
    right: 0,
    backgroundColor: theme.palette.background.default,
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.categoryConsumer = null;
    this.feedConsumer = null;
    this.sourceConsumer = null;
    this.notificationConsumer = null;

    this.state = {
      refetch: null,
      topFeeds: [],
      notifications: [],
      hasPodcasts: false,
      loginDlg: false,
      helpDlg: false,
      postDlg: false,
      article_edit: null,
      alertDlg: false,
      alertTitle: "",
      alertMsg: ""
    };

    this.handlePlayHelp = this.handlePlayHelp.bind(this);
    this.handleCloseHelp = this.handleCloseHelp.bind(this);

    this.handleNotification = this.handleNotification.bind(this);
    this.handleProfileMenu = this.handleProfileMenu.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleClickBackButton = this.handleClickBackButton.bind(this);

    this.handleClickYourFeeds = this.handleClickYourFeeds.bind(this);
    this.handleClickDiscover = this.handleClickDiscover.bind(this);
    this.handleClickCreate = this.handleClickCreate.bind(this);
    this.handleClickPodcasts = this.handleClickPodcasts.bind(this);
    this.handleClickCleanAir = this.handleClickCleanAir.bind(this);

    this.handleClickFeed = this.handleClickFeed.bind(this);
    this.handleClickSource = this.handleClickSource.bind(this);
    this.handleReachLimit = this.handleReachLimit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchEnter = this.handleSearchEnter.bind(this);

    this.handleNeedMore = this.handleNeedMore.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChangeBranch = this.handleChangeBranch.bind(this);

    this.handleSelectArticle = this.handleSelectArticle.bind(this);
    this.handleSelectGroupArticle = this.handleSelectGroupArticle.bind(this);
    this.handleReportArticle = this.handleReportArticle.bind(this);
    this.handleEditArticle = this.handleEditArticle.bind(this);
    this.handleSaveArticle = this.handleSaveArticle.bind(this);
    this.handleDeleteSavedArticle = this.handleDeleteSavedArticle.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleCancelLogin = this.handleCancelLogin.bind(this);

    this.handleOK = this.handleOK.bind(this);
    this.closePostEditDlg = this.closePostEditDlg.bind(this);
    this.handleUpdatePost = this.handleUpdatePost.bind(this);
  }

  componentDidMount = () => {
    if (this.checkOnline()) {
      // User can skip to make profile
      // if (this._checkProfile()) {
        this.initialize();
      // }
    } else {
      ToastError("Internet disconnected! Check your internet connection.");
    }
  };

  setError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();
  };

  setWaiting = (waiting) => {
    if (waiting) {
      this.props.requestDataPending();
    } else {
      this.props.requestDataFinished();
    }
  };

  checkOnline = () => {
    return window.navigator.onLine ? true : false;
  };

  _checkProfile = () => {
    const { loggedIn, authUser } = this.props;
    if (loggedIn && authUser.username === "") {
      const location = {
        pathname: ROUTES.PROFILE,
        state: { animation: "bottom" }
      };
      this.props.history.push(location);
      return false;
    }
    return true;
  };

  initialize = async () => {
    const { loggedIn } = this.props;

    this.setWaiting(true);

    await this.getMainInfo();
    await this.getNotifications();
    await this.getFollowingAndDefaultFeeds();
    await this.getPinsAndMovetops();
    await this.getUnfollowedSources();
    await this.getShowRetweetSources();
    // await this.getTopFeeds();
    
    this.registerSubscribers(loggedIn);

    // load articles
    if (this.props.articles.length === 0) {
      this.props.refreshArticles();
      if (loggedIn) {
        await this.getArticlesOfShowFirstFeeds();
      }
      await this.getArticlesOfFirstPage();
    }

    // the subscribed feeds have podcasts?
    const podcast_source_ids = this.getPodcastSourceIds2show();
    // console.log("podcast source ids :", podcast_source_ids);
    this.setState({
      ...this.state,
      hasPodcasts: podcast_source_ids.length > 0
    });

    this.props.setModerate(false);

    this.setWaiting(false);
  };

  
  registerSubscribers = (loggedIn) => {
    const categorySubscriber = createCategorySubscriber(loggedIn);
    this.categoryConsumer = categorySubscriber.subscribe(data => {
      const categories = data.data.categories;
      // console.log("Categories updated :", categories);
      this.props.setCategories(categories);
    }, (err) => {
      let msg = "Error subscribing categories: " + err;
      console.log(msg);
    });

    const feedSubscriber = createFeedSubscriber(loggedIn);
    this.feedConsumer = feedSubscriber.subscribe(data => {
      const feeds = data.data.feeds;
      // console.log("Feeds updated :", feeds);      
      this.props.setFeeds(feeds);
    }, (err) => {
      let msg = "Error subscribing feeds: " + err;
      console.log(msg);
    });

    // const sourceSubscriber = createSourceSubscriber(loggedIn);
    // this.sourceConsumer = sourceSubscriber.subscribe(data => {
    //   const sources = data.data.sources;
    //   console.log("Sources updated :", sources);
    //   this.props.setSources(sources);
    // }, (err) => {
    //   let msg = "Error subscribing sources: " + err;
    //   console.log(msg);
    // });

    if (loggedIn) {
      const { authUser} = this.props;
      const notificationSubscriber = createNotificationSubscriber(authUser.uid);
      this.notificationConsumer = notificationSubscriber.subscribe(data => {
        const notifications = data.data.notifications;
        // console.log("Notifications updated :", notifications);      
        this.setState({
          ...this.state,
          notifications: notifications
        });
      }, (err) => {
        let msg = "Error subscribing notifications: " + err;
        console.log(msg);
      });
    }
  };

  unregisterSubscribers = () => {
    if (this.categoryConsumer) {
      this.categoryConsumer.unsubscribe();
    }
    if (this.feedConsumer) {
      this.feedConsumer.unsubscribe();
    }
    if (this.sourceConsumer) {
      this.sourceConsumer.unsubscribe();
    }
    if (this.notificationConsumer) {
      this.notificationConsumer.unsubscribe();
    }
  }

  goTo = (location) => {
    this.unregisterSubscribers();
    this.props.history.push(location);
  }

  _getAuthToken = async () => {
    const { authUser } = this.props;
    let token = authUser.token;
    if (Date.now() >= authUser.expiredTS) {
      const result = await this.props.firebase.refreshToken();
      if (result.error) {
        this.setError(result.msg);
        token = null;
      } else {
        token = result.token;
      }
    }
    return token;
  };

  getMainInfo = async () => {
    if (this.props.newssites.length > 0) return;

    const { loggedIn, authUser } = this.props;
    const gqlservice = new GraphqlService();
    let base_data_fn = null;

    if (loggedIn) {
      const token = await this._getAuthToken();
      if (!token) {
        this.handleLogin();
        return;
      }
      gqlservice.set_auth_jwt(token);

      if (is_paid_user(loggedIn, authUser)) {
        base_data_fn = gqlservice.base_data_by_paiduser;
      } else {
        base_data_fn = gqlservice.base_data_by_user;
      }
    } else {
      base_data_fn = gqlservice.base_data;
    }

    await base_data_fn()
      .then(
        (result) => {
          const base_data = result.data;
          this.props.setNewssiteInfo(base_data.newssite);
          this.props.setSocialtypeInfo(base_data.socialtype);
          this.props.setCategories(base_data.categories);
          this.props.setFeeds(base_data.feeds);
          this.props.setTags(base_data.tags);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    await gqlservice.sources()
      .then(result => {
        const sources = result.data.sources;
        this.props.setSources(sources);
      }, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });
  };

  getNotifications = async () => {
    const { loggedIn, authUser } = this.props;
    if (!loggedIn) {
      return;
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    await gqlservice.notifications_to_user(authUser.uid)
      .then(result => {
        const notifications = result.data.notifications;
        this.setState({
          ...this.state,
          notifications: notifications
        });
      }, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });
  }

  getFollowingAndDefaultFeeds = async () => {
    const { loggedIn, authUser, feeds } = this.props;

    if (loggedIn) {
      const gqlservice = new GraphqlService();
      const token = await this._getAuthToken();
      if (!token) {
        this.handleLogin();
        return;
      }
      gqlservice.set_auth_jwt(token);
      await gqlservice
        .feed_followers(authUser.uid)
        .then(
          (result) => {
            // console.log("feed following :", result.data);
            const followings = result.data.feed_followers;
            this.props.setFollowingFeeds(followings);
          },
          (reason) => {
            this.setError(reason.msg);
          }
        )
        .catch((err) => {
          this.setError(JSON.stringify(err));
        });
    }

    // set default feeds
    let default_feeds = [];
    for (let feed_id of conf_defaultfeeds) {
      let feed = feeds.find((feed) => feed.id === feed_id);
      if (feed) {
        default_feeds.push(feed);
      }
    }
    if (default_feeds.length > 0) {
      this.props.setDefaultFeeds(default_feeds);
    }
  };

  getUnfollowedSources = async () => {
    const gqlservice = new GraphqlService();
    await gqlservice
      .feed_source_unfollowers()
      .then(
        (result) => {
          const unfollowed = result.data.feed_source_unfollowers;
          // console.log("unfollowed sources :", unfollowed);
          this.props.setUnfollowedSources(unfollowed);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  getShowRetweetSources = async () => {
    const gqlservice = new GraphqlService();
    await gqlservice
      .feed_source_showretweets()
      .then(
        (result) => {
          const showretweets = result.data.feed_source_showretweet;
          this.props.setShowRetweetSources(showretweets);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  getTopFeeds = () => {
    const { loggedIn, authUser, feeds } = this.props;

    const tags = authUser.tags;
    const feeds_by_followers = feeds
      .filter((feed) => feed.private === false && feed.approved)
      .sort(
        (a, b) => b.followers - a.followers
      );

    if (loggedIn === false || (loggedIn && tags.length === 0)) {
      const topFeeds = feeds_by_followers.slice(0, TOP_FEEDS_CNT);
      this.setState({
        ...this.state,
        topFeeds: topFeeds,
      });
      return;
    } else {
      // get & calculate vote of categories related to the tags.
      let tag_categories = [];
      for (let tag of tags) {
        const category_ids = tag.tag.tag_categories;

        for (let category_id of category_ids) {
          let category = tag_categories.find(
            (tag_category) => tag_category.id === category_id.category_id
          );
          if (category === undefined) {
            tag_categories.push({
              id: category_id.category_id,
              vote: 1,
            });
          } else {
            tag_categories = tag_categories.map((tag_category) =>
              tag_category.id === category_id.category_id
                ? { id: tag_category.id, vote: tag_category.vote + 1 }
                : tag_category
            );
          }
        }
      }

      // select top feeds
      let topFeeds = [];

      // select one feed for category
      for (let tag_category of tag_categories) {
        const topFeed = feeds_by_followers.find(
          (feed) => feed.category_id === tag_category.id
        );
        if (topFeed !== undefined) {
          topFeeds.push(topFeed);
        }
      }
      if (topFeeds.length >= TOP_FEEDS_CNT) {
        this.setState({
          ...this.state,
          topFeeds: topFeeds.slice(0, TOP_FEEDS_CNT),
        });
        return;
      }

      // select only categories having more than 2 feeds
      tag_categories = tag_categories.filter(
        (tag_category) =>
          feeds_by_followers.filter(
            (feed) => feed.category_id === tag_category.id
          ).length > 1
      );

      let totalVotes = 0;
      for (let tag_category of tag_categories) {
        totalVotes += tag_category.vote;
      }

      // select the remains based on the vote
      const needCnt = TOP_FEEDS_CNT - topFeeds.length;
      for (let tag_category of tag_categories) {
        const feedCnt = Math.ceil((needCnt * tag_category.vote) / totalVotes);
        const category_feeds = feeds_by_followers.filter(
          (feed) => feed.category_id === tag_category.id
        );
        if (category_feeds.length > feedCnt) {
          topFeeds = topFeeds.concat(category_feeds.slice(1, feedCnt + 1));
        } else {
          topFeeds = topFeeds.concat(
            category_feeds.slice(1, category_feeds.length)
          );
        }
      }

      this.setState({
        ...this.state,
        topFeeds:
          topFeeds.length >= TOP_FEEDS_CNT
            ? topFeeds.slice(0, TOP_FEEDS_CNT)
            : topFeeds,
      });
    }
  };

  getPinsAndMovetops = async () => {
    const { loggedIn, default_feeds, followed_feeds } = this.props;

    let selected_feeds = default_feeds;
    if (loggedIn && followed_feeds.length > 0) {
      selected_feeds = followed_feeds;
    }
    // console.log("selected feeds:", selected_feeds);
    const feed_ids = selected_feeds.map((feed) => feed.id);

    const gqlservice = new GraphqlService();
    await gqlservice
      .article_pins_in_feeds(feed_ids)
      .then(
        (result) => {
          const pins = result.data.article_pins;
          if (pins.length > 0) {
            this.props.setArticlePins(pins);
          }
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    await gqlservice
      .article_movetops_in_feeds(feed_ids)
      .then(
        (result) => {
          const movetops = result.data.article_movetops;
          if (movetops.length > 0) {
            this.props.setArticleMovetops(movetops);
          }
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  getSourceIdsOfShowFirstFeeds = () => {
    const { 
      authUser, 
      feeds,
      unfollowed_sources,
    } = this.props;

    const feeds_showfirst = authUser.feeds_showfirst.map(item => feeds.find(feed => feed.id === item.feed_id));

    let source_ids = [];
    for (let feed of feeds_showfirst) {
      let feed_source_ids = feed.feed_sources
      .filter(
        (feed_source) =>
          feed_source.approved && 
          is_source_alive(feed_source.source) &&
          unfollowed_sources.findIndex(
            (item) =>
              item.source_id === feed_source.source_id &&
              item.feed_id === feed.id &&
              item.user_id === authUser.uid
          ) === -1
      )
      .map((feed_source) => feed_source.source_id);

      source_ids = _.union(source_ids, feed_source_ids);
    }

    return source_ids;
  }

  getSourceIds2show = () => {
    const {
      loggedIn,
      default_feeds,
      followed_feeds,
      unfollowed_sources,
      authUser,
    } = this.props;

    let feeds = default_feeds;
    if (loggedIn && followed_feeds.length > 0) {
      feeds = followed_feeds.slice();
    }

    let source_ids = [];
    for (let feed of feeds) {
      if (loggedIn && unfollowed_sources.length > 0) {
        let feed_source_ids = feed.feed_sources
          .filter(
            (feed_source) =>
              feed_source.approved &&
              is_source_alive(feed_source.source) &&
              unfollowed_sources.findIndex(
                (item) =>
                  item.source_id === feed_source.source_id &&
                  item.feed_id === feed.id &&
                  item.user_id === authUser.uid
              ) === -1
          )
          .map((feed_source) => feed_source.source_id);

        source_ids = _.union(source_ids, feed_source_ids);
      } else {
        let feed_source_ids = feed.feed_sources
          .filter((feed_source) => 
            feed_source.approved && 
            is_source_alive(feed_source.source)
          )
          .map((feed_source) => feed_source.source_id);
        source_ids = _.union(source_ids, feed_source_ids);
      }
    }

    return source_ids;
  };

  getArticlesOfShowFirstFeeds = async () => {
    const { branch, country } = this.props;

    let source_ids = this.getSourceIdsOfShowFirstFeeds();
    // console.log("source ids :", source_ids);
    if (source_ids.length === 0) {
      return;
    }

    if (branch === ARTICLE_BRANCH_NEWSPAPER) {
      if (country === ALL) {
        await this.getArticlesOfBranchInFirstPage(source_ids, branch, true);
      } else {
        await this.getArticlesOfCountryInFirstPage(source_ids, country, true);
      }
    } else {
      if (branch === BRANCH_ALL) {
        await this.getArticlesInFirstPage(source_ids, true);
      } else {
        await this.getArticlesOfBranchInFirstPage(source_ids, branch, true);
      }
    }
  }

  getArticlesOfFirstPage = async () => {
    const { branch, country } = this.props;

    let source_ids = this.getSourceIds2show();
    // console.log("source_ids :", source_ids);
    if (source_ids.length === 0) {
      this.props.refreshArticles();
      return;
    }

    if (branch === ARTICLE_BRANCH_NEWSPAPER) {
      if (country === ALL) {
        await this.getArticlesOfBranchInFirstPage(source_ids, branch);
      } else {
        await this.getArticlesOfCountryInFirstPage(source_ids, country);
      }
    } else {
      if (branch === BRANCH_ALL) {
        await this.getArticlesInFirstPage(source_ids);
      } else {
        await this.getArticlesOfBranchInFirstPage(source_ids, branch);
      }
    }
  };

  handleNeedMore = async () => {
    const { country, branch, last_offset, requesting } = this.props;
    let source_ids = this.getSourceIds2show();

    if (source_ids.length === 0) {
      this.props.refreshArticles();
      return;
    }

    // it means there is no articles in these sources
    if (last_offset === 0) {
      this.props.showBottomNavbar(false);
      return;
    }
    if (requesting) {
      return;
    }

    this.setWaiting(true);

    if (branch === ARTICLE_BRANCH_NEWSPAPER) {
      if (country === ALL) {
        await this.getArticlesOfBranchInNextPage(
          source_ids,
          branch,
          last_offset
        );
      } else {
        await this.getArticlesOfCountryInNextPage(
          source_ids,
          country,
          last_offset
        );
      }
    } else {
      if (branch === BRANCH_ALL) {
        await this.getArticlesInNextPage(source_ids, last_offset);
      } else {
        await this.getArticlesOfBranchInNextPage(
          source_ids,
          branch,
          last_offset
        );
      }
    }

    this.setWaiting(false);
  };

  getArticlesInFirstPage = async (source_ids, showfirst=false) => {
    const gqlservice = new GraphqlService();
    await gqlservice
      .articles_in_sources(source_ids, 0)
      .then(
        (result) => {
          const articles = result.data;
          // console.log("Home => articles in sources(first page) :", articles);

          if (showfirst) {
            this.props.setShowFirstArticles(articles);
          } else {
            this.props.setArticles(articles, articles.length);
          }
          this.props.showBottomNavbar(true);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  getArticlesInNextPage = async (source_ids, last_offset) => {
    const gqlservice = new GraphqlService();
    await gqlservice
      .articles_in_sources(source_ids, last_offset)
      .then(
        (result) => {
          const articles = result.data;
          // console.log("Home => articles in sources(next page) :", articles);

          if (articles.length === 0) {
            this.props.appendArticles(articles, last_offset);
          } else {
            this.props.appendArticles(articles, last_offset + articles.length);
          }

          this.props.showBottomNavbar(true);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  getArticlesOfBranchInFirstPage = async (source_ids, branch, showfirst=false) => {
    const { sources } = this.props;

    // get branch sources
    let branch_sources = source_ids.map((source_id) =>
      _.find(sources, { id: source_id, branch: branch })
    );
    branch_sources = branch_sources.filter((source) => source !== undefined);
    if (branch_sources.length === 0) {
      this.props.refreshArticles();
      return;
    }
    const branch_source_ids = branch_sources.map((source) => source.id);

    const gqlservice = new GraphqlService();
    await gqlservice
      .articles_in_sources_of_branch(branch, branch_source_ids, 0)
      .then(
        (result) => {
          const articles = result.data;
          // console.log("Home => articles in sources of branch(first page) :", articles);

          if (showfirst) {
            this.props.setShowFirstArticles(articles);
          } else {
            this.props.setArticles(articles, articles.length);
          }
          this.props.showBottomNavbar(true);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  getArticlesOfBranchInNextPage = async (source_ids, branch, last_offset) => {
    const { sources } = this.props;

    // get branch sources
    let branch_sources = source_ids.map((source_id) =>
      _.find(sources, { id: source_id, branch: branch })
    );
    branch_sources = branch_sources.filter((source) => source !== undefined);
    if (branch_sources.length === 0) {
      return;
    }
    const branch_source_ids = branch_sources.map((source) => source.id);

    const gqlservice = new GraphqlService();
    await gqlservice
      .articles_in_sources_of_branch(branch, branch_source_ids, last_offset)
      .then(
        (result) => {
          const articles = result.data;
          // console.log("Home => articles in sources of branch(next page) :", articles);

          if (articles.length === 0) {
            this.props.appendArticles(articles, last_offset);
          } else {
            this.props.appendArticles(articles, last_offset + articles.length);
          }

          this.props.showBottomNavbar(true);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  getArticlesOfCountryInFirstPage = async (source_ids, country, showfirst=false) => {
    const { newssites, sources } = this.props;

    // get country sources
    let news_sources = source_ids.map((source_id) =>
      _.find(sources, { id: source_id, branch: ARTICLE_BRANCH_NEWSPAPER })
    );
    news_sources = news_sources.filter((source) => source !== undefined);
    if (news_sources.length === 0) {
      this.props.refreshArticles();
      return;
    }
    let country_source_ids = news_sources.map((source) => {
      let newssite = _.find(newssites, { id: source.id });
      if (newssite !== undefined && newssite.country === country) {
        return newssite.id;
      }
      return null;
    });
    country_source_ids = country_source_ids.filter(
      (source_id) => source_id !== null
    );

    const gqlservice = new GraphqlService();
    await gqlservice
      .newspapers_in_sources_of_country(country, country_source_ids, 0)
      .then(
        (result) => {
          const articles = result.data;
          // console.log("Home => newspapers in sources of country(first page) :", articles);

          if (showfirst) {
            this.props.setShowFirstArticles(articles);
          } else {
            this.props.setArticles(articles, articles.length);
          }
          this.props.showBottomNavbar(true);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  getArticlesOfCountryInNextPage = async (source_ids, country, last_offset) => {
    const { newssites, sources } = this.props;

    // get country sources
    let news_sources = source_ids.map((source_id) =>
      _.find(sources, { id: source_id, branch: ARTICLE_BRANCH_NEWSPAPER })
    );
    news_sources = news_sources.filter((source) => source !== undefined);
    if (news_sources.length === 0) {
      return;
    }
    let country_source_ids = news_sources.map((source) => {
      let newssite = _.find(newssites, { id: source.id });
      if (newssite !== undefined && newssite.country === country) {
        return newssite.id;
      }
      return null;
    });
    country_source_ids = country_source_ids.filter(
      (source_id) => source_id !== null
    );

    const gqlservice = new GraphqlService();
    await gqlservice
      .newspapers_in_sources_of_country(
        country,
        country_source_ids,
        last_offset
      )
      .then(
        (result) => {
          const articles = result.data;
          // console.log("Home => newspapers in sources of country(next page) :", articles);

          if (articles.length === 0) {
            this.props.appendArticles(articles, last_offset);
          } else {
            this.props.appendArticles(articles, last_offset + articles.length);
          }

          this.props.showBottomNavbar(true);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };
  

  getPodcastSourceIds2show = () => {
    const {
      loggedIn,
      default_feeds,
      followed_feeds,
      unfollowed_sources,
      authUser,
    } = this.props;

    let feeds = default_feeds;
    if (loggedIn && followed_feeds.length > 0) {
      feeds = followed_feeds.slice();
    }

    let source_ids = [];
    for (let feed of feeds) {
      if (loggedIn && unfollowed_sources.length > 0) {
        let feed_source_ids = feed.feed_sources
          .filter(
            (feed_source) =>
              feed_source.approved && 
              feed_source.source.branch === ARTICLE_BRANCH_PODCAST &&
              is_source_alive(feed_source.source) &&
              unfollowed_sources.findIndex(
                (item) =>
                  item.source_id === feed_source.source_id &&
                  item.feed_id === feed.id &&
                  item.user_id === authUser.uid
              ) === -1
          )
          .map((feed_source) => feed_source.source_id);

        source_ids = _.union(source_ids, feed_source_ids);
      } else {
        let feed_source_ids = feed.feed_sources
          .filter((feed_source) => 
            feed_source.approved && 
            feed_source.source.branch === ARTICLE_BRANCH_PODCAST &&
            is_source_alive(feed_source.source)
          )
          .map((feed_source) => feed_source.source_id);
        source_ids = _.union(source_ids, feed_source_ids);
      }
    }

    return source_ids;
  };

  getPodcastsOfFirstPage = async () => {
    let source_ids = this.getPodcastSourceIds2show();
    // console.log("podcast source ids :", source_ids);
    if (source_ids.length === 0) {
      return;
    }
    await this.getPodcastArticlesOfFirstPage(source_ids);
  };

  getPodcastsOfNextPage = async () => {
    let source_ids = this.getPodcastSourceIds2show();
    if (source_ids.length === 0) {
      return;
    }
    await this.getPodcastArticlesOfNextPage(source_ids, this.props.podcast_last_offset);
  };

  getPodcastArticlesOfFirstPage = async (source_ids) => {
    const gqlservice = new GraphqlService();
    await gqlservice
      .articles_in_sources(source_ids, 0)
      .then(
        (result) => {
          const podcasts = result.data;
          // console.log("Home => podcast articles in sources(first page) :", podcasts);

          this.props.setPodcasts(podcasts, podcasts.length);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  getPodcastArticlesOfNextPage = async (source_ids, last_offset) => {
    const gqlservice = new GraphqlService();
    await gqlservice
      .articles_in_sources(source_ids, last_offset)
      .then(
        (result) => {
          const podcasts = result.data;
          // console.log("Home => podcast articles in sources(next page) :", podcasts);

          if (podcasts.length === 0) {
            this.props.appendPodcasts(podcasts, last_offset);
          } else {
            this.props.appendPodcasts(podcasts, last_offset + podcasts.length);
          }
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };


  handleClickYourFeeds = () => {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      this.setState({
        ...this.state,
        loginDlg: true,
      });
      return;
    }

    const location = {
      pathname: ROUTES.YOUR_FEEDS,
      state: { animation: "left" },
    };
    this.goTo(location);

    this.props.refreshArticles();
    this.props.clsArticlePins();
    this.props.clsArticleMovetops();
    this.props.initScrollPos();
    this.props.selectCountry(ALL);
    this.props.selectBranch(BRANCH_ALL);
  };

  handleClickDiscover = () => {
    const location = {
      pathname: ROUTES.DISCOVER,
      state: { animation: "left" },
    };
    this.goTo(location);

    this.props.initScrollPos();
    this.props.refreshArticles();
    this.props.clsArticlePins();
    this.props.clsArticleMovetops();
  };

  handleClickCreate = () => {
    const { loggedIn, authUser } = this.props;
    if (!loggedIn) {
      this.setState({
        ...this.state,
        loginDlg: true,
      });
      return;
    }

    // check if the created count is less than the limit
    const paidUser = is_paid_user(loggedIn, authUser);
    if (USE_QUOTA) {
      if (
        !paidUser &&
        authUser.feeds_created.length > FREE_FEED_CREATE_LIMIT
      ) {
        this.setState({
          ...this.state,
          alertDlg: true,
          alertTitle: "Create Limit",
          alertMsg:
            "You've already reached the limit to create. Upgrade your profile to create more feeds.",
        });
        return;
      }
    }
    
    // delete maximum feed creation limit on paid user
    if (USE_QUOTA) {
      if (
        paidUser &&
        authUser.feeds_created.length > PAID_FEED_CREATE_LIMIT
      ) {
        this.setState({
          ...this.state,
          alertDlg: true,
          alertTitle: "Create Limit",
          alertMsg: "You've already reached the limit to create.",
        });
        return;
      }
    }

    const location = {
      pathname: ROUTES.FEED_ADD,
      state: { animation: "left" },
    };
    this.goTo(location);

    this.props.initScrollPos();
    this.props.refreshArticles();
  };

  handleClickPodcasts = () => {
    const location = {
      pathname: ROUTES.PODCASTS,
      state: { animation: "left" },
    };
    this.goTo(location);

    this.props.initScrollPos();
    this.props.refreshArticles();
  }

  handleClickCleanAir = () => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "left" },
    };
    this.goTo(location);

    this.props.initScrollPos();
    this.props.refreshArticles();
  }

  _isFeedModerator = (feed) => {
    const { loggedIn, authUser } = this.props;
    if (!loggedIn) {
      return false;
    }

    // check if the user is the creator of this feed
    if (authUser.feeds_created.find((item) => item.id === feed.id)) {
      return true;
    };

    // check if the user is a moderator of the category the feed is created from
    if (authUser.categories_moderated.find(
      (moderator) =>
        moderator.approved && moderator.category_id === feed.category_id
    )) {
      return true;
    };

    // check if the user is a moderator of this feed
    if (authUser.feeds_moderated.find(
      (moderator) => moderator.approved && moderator.feed_id === feed.id
    )) {
      return true;
    };
    return false;
  };

  handleClickFeed = (feed) => {
    let route = `/${ROUTES.FEEDS_PREFIX}/${feed.slug}`;
    // Go to moderation page if the logged user is the moderator of the feed
    if (this._isFeedModerator(feed)) {
      route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.FEEDS_PREFIX}/${feed.slug}`;
    }

    this.props.selectFeed(feed);
    this.props.selectFeedTab(TAB_FEED);
    const location = {
      pathname: route,
      state: { animation: "left" },
    };
    this.goTo(location);

    this.props.setFeedBackRoute(ROUTES.HOME);
    this.props.refreshArticles();
    this.props.clsArticlePins();
    this.props.clsArticleMovetops();
    this.props.refreshThreads();
    this.props.initScrollPos();
    this.props.selectCountry(ALL);
    this.props.selectBranch(BRANCH_ALL);
  };

  handleClickSource = (source, feed) => {
    const path = `/${ROUTES.FEEDS_PREFIX}/${feed.slug}/${ROUTES.SOURCE_PREFIX}/${source.slug}`;
    const location = {
      pathname: path,
      state: { animation: "left" },
    };
    this.goTo(location);
  }

  handleClickBackButton = () => {
    window.scrollTo(0, 0);
    this.props.initScrollPos();
  };

  handleReachLimit = () => {
    const { loggedIn, authUser } = this.props;

    if (!is_paid_user(loggedIn, authUser)) {
      const location = {
        pathname: ROUTES.MEMBERSHIP,
        state: { animation: "bottom" },
      };
      this.goTo(location);
    } else {
      this.setState({
        ...this.state,
        alertDlg: true,
        alertTitle: "Follow Limit",
        alertMsg:
          "You've already reached the limit to follow. Unfollow some feeds to follow another feeds.",
      });
    }
  };

  handleSearchChange = (searchKey) => {};

  handleSearchEnter = (searchKey) => {
    this.props.updateSearchKey(searchKey);
    const location = {
      pathname: ROUTES.SEARCH_RESULT,
      state: { animation: "left" },
    };
    this.goTo(location);
  };

  handleSelectArticle = (article) => {
    this.props.selectArticle(article);

    const { sources } = this.props;
    const article_source = sources.find(
      (source) => source.id === article.source_id
    );

    const feed = this.getFeedofSource(article.source_id);
    // console.log("home article's feed :", feed);
    // only for commenting, so don't delete articles from redux
    this.props.selectFeedforComments(feed);

    let path = `/${ROUTES.CATEGORY_PREFIX}/${article_source.category_id}/${ROUTES.SOURCE_PREFIX}/${article.source_id}`;
    if (article.branch === ARTICLE_BRANCH_NEWSPAPER) {
      path += `/${ROUTES.ARTICLE_NEWS_PREFIX}/${article.nid}`;
    } else {
      path += `/${ROUTES.ARTICLE_PREFIX}/${article.nid}`;
    }

    const location = {
      pathname: path,
      state: { animation: "left" },
    };
    this.goTo(location);
    this.props.setArticleBackRoute(ROUTES.HOME);
  };

  getFeedofSource = (source_id) => {
    const { loggedIn, followed_feeds, feeds } = this.props;
    let feed = null;
    if (loggedIn) {
      feed = followed_feeds.find(
        (item) =>
          item.feed_sources.find(
            (feed_source) => feed_source.source_id === source_id
          ) !== undefined
      );
      if (feed) {
        return feed;
      }
    }

    feed = feeds.find(
      (item) =>
        item.feed_sources.find(
          (feed_source) => feed_source.source_id === source_id
        ) !== undefined
    );
    return feed;
  }

  handleSelectGroupArticle = async (nid) => {
    // console.log("Select Group article :", nid);
    this.setWaiting(true);

    const gqlservice = new GraphqlService();
    await gqlservice
      .article_by_nid(nid)
      .then(
        (result) => {
          const articles = result.data;
          if (articles.length > 0) {
            this.props.selectArticle(articles[0]);
            const location = {
              pathname: `/${ROUTES.ARTICLE_NEWS_PREFIX}/${nid}`,
              state: { animation: "left" },
            };
            this.goTo(location);
            this.props.setArticleBackRoute(ROUTES.HOME);
          }
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    this.setWaiting(false);
  };

  handlePlayHelp = () => {
    this.setState({
      ...this.state,
      helpDlg: true
    });
  }

  handleCloseHelp = () => {
    this.setState({
      ...this.state,
      helpDlg: false
    });
  }

  handleNotification = () => {
    const location = {
      pathname: "/notifications",
      state: { animation: "left" },
    };
    this.goTo(location);
  }

  handleProfileMenu = (route) => {
    const location = {
      pathname: route,
      state: { animation: "left" },
    };
    this.goTo(location);
  };

  handleSignOut = async () => {
    await this.props.firebase.doSignOut();
    await this.props.signOut();

    this.props.refreshArticles();
    this.props.clsArticlePins();
    this.props.clsArticleMovetops();
    this.props.initScrollPos();
    this.props.selectCountry(ALL);
    this.props.selectBranch(BRANCH_ALL);

    this.initialize();
  };

  handleChangeCountry = async (country) => {
    let showfirst_source_ids = this.getSourceIdsOfShowFirstFeeds();
    let source_ids = this.getSourceIds2show();

    this.props.selectCountry(country);
    this.props.initScrollPos();
    this.props.showTopNavbar(true);

    const { loggedIn, branch } = this.props;

    this.setWaiting(true);

    // get articles of the country in first page
    if (country === ALL) {
      if (loggedIn) {
        await this.getArticlesOfBranchInFirstPage(showfirst_source_ids, branch, true);
      }
      await this.getArticlesOfBranchInFirstPage(source_ids, branch);
    } else {
      if (loggedIn) {
        await this.getArticlesOfCountryInFirstPage(showfirst_source_ids, country, true);
      }
      await this.getArticlesOfCountryInFirstPage(source_ids, country);
    }

    this.setWaiting(false);
  };

  handleChangeBranch = async (branch) => {
    let showfirst_source_ids = this.getSourceIdsOfShowFirstFeeds();
    let source_ids = this.getSourceIds2show();

    this.props.selectCountry(ALL);
    this.props.selectBranch(branch);
    this.props.initScrollPos();
    this.props.showTopNavbar(true);

    this.setWaiting(true);

    const { loggedIn } = this.props;

    // get articles of the country in first page
    if (branch === BRANCH_ALL) {
      if (loggedIn) {
        await this.getArticlesInFirstPage(showfirst_source_ids, true);
      }
      await this.getArticlesInFirstPage(source_ids);
    } else {
      if (loggedIn) {
        await this.getArticlesOfBranchInFirstPage(showfirst_source_ids, branch, true);
      }
      await this.getArticlesOfBranchInFirstPage(source_ids, branch);
    }

    this.setWaiting(false);
  };

  getFeeds2show = () => {
    const {
      loggedIn,
      feeds,
      default_feeds,
      followed_feeds,
      authUser,
    } = this.props;

    let my_feeds = [];
    if (loggedIn && feeds.length > 0) {
      my_feeds = feeds.filter((feed) => feed.created_by === authUser.uid);
    }
    let moderated_feeds = [];
    if (loggedIn && feeds.length > 0) {
      moderated_feeds = authUser.feeds_moderated
      .map((item) => feeds.find(feed => feed.id === item.feed_id))
      .filter(feed => feed !== undefined && feed.created_by !== authUser.uid);
    }
    if (!loggedIn || my_feeds.length + moderated_feeds.length + followed_feeds.length === 0) {
      return default_feeds;
    }

    let feeds2show = [];
    // following feeds
    if (loggedIn && followed_feeds.length > 0) {
      feeds2show = followed_feeds.filter(feed => 
        feed.private === false &&
        my_feeds.find(item => item.id === feed.id) === undefined &&
        moderated_feeds.find(item => item.id === feed.id) === undefined
      );
    }

    const my_feeds_mod = my_feeds.filter(feed => feed.approved);
    const moderated_feeds_mod = moderated_feeds.filter(feed => feed.approved);
    feeds2show = feeds2show.concat(my_feeds_mod, moderated_feeds_mod);

    return feeds2show;
  };

  handleReportArticle = async (article, reportMsg) => {
    const { authUser, followed_feeds } = this.props;

    let report = {
      id: uuid(),
      article_id: article.nid,
      source_id: article.source_id,
      report: reportMsg,
      reported_by: authUser.uid,
      approved: false,
    };

    this.setWaiting(true);

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);
    await gqlservice
      .insert_article_report(report)
      .then(
        (result) => {},
        (reason) => {
          this.setError(reason.msg);
          this.setWaiting(false);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
        this.setWaiting(false);
      });

    const feeds = followed_feeds.filter((feed) =>
      feed.feed_sources
        .filter((feed_source) => feed_source.approved)
        .map((feed_source) => feed_source.source_id)
        .includes(article.source_id)
    );

    // log this activity
    let activity = null;
    for (let feed of feeds) {
      activity = {
        user_id: authUser.uid,
        type: ACTIVITY_TYPE_FEED,
        type_id: feed.id,
        action: ACTIVITY_REPORT,
        object: `the article ${article.title}`,
        fromto: `of the feed ${feed.name}`,
        reason: "",
      };
      await gqlservice
        .insert_activitylog(activity)
        .then(
          (result) => {},
          (reason) => {
            this.setError(reason.msg);
            this.setWaiting(false);
          }
        )
        .catch((err) => {
          this.setError(JSON.stringify(err));
          this.setWaiting(false);
        });
    };

    this.setWaiting(false);  
  };

  handleEditArticle = (article) => {
    // console.log("Edit article :", article);
    this.setState({
      ...this.state,
      postDlg: true,
      article_edit: article
    });
  }

  handleSaveArticle = async (article) => {
    const { authUser } = this.props;

    this.setWaiting(true);

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    await gqlservice
      .article_save(article.nid, authUser.uid)
      .then((result) => {
          const saved = result.data.article_save;
          if (saved.length > 0) {
            return;
          } else {
            return gqlservice.insert_article_save(article.nid, authUser.uid);
          }
      })
      .then(
        (result) => {},
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    this.setWaiting(false);
  }

  // empty funciton
  handleDeleteSavedArticle = (article) => {}
  // empty function

  handleLogin = () => {
    this.setState({
      ...this.state,
      loginDlg: false
    });
    const location = {
      pathname: ROUTES.SIGN_IN,
      state: { animation: "bottom" },
    };
    this.goTo(location);
    this.props.setLoginBackRoute(this.props.location.pathname);
  };

  handleCancelLogin = () => {
    this.setState({
      ...this.state,
      loginDlg: false,
    });
  };

  handleOK = () => {
    this.setState({
      ...this.state,
      alertDlg: false,
      alertTitle: "",
      alertMsg: "",
    });
  };

  closePostEditDlg = () => {
    this.setState({
      ...this.state,
      postDlg: false,
      article_edit: null
    });
  };

  handleUpdatePost = async (description, postlink) => {
    this.setState({
      ...this.state,
      postDlg: false
    });

    const { loggedIn } = this.props;
    if (!loggedIn) {
      this.handleLogin();
        return;
    }

    const { article_edit } = this.state;

    this.setWaiting(true);

    let preview = null;
    if (postlink) {
      preview = await fetch_linkpreview(postlink);
      // console.log("User post preview :", preview);
    }

    const gqlservice = new GraphqlService();

    const summary = summarize_text(description, 150);
    const source_id = article_edit.source_id;
    const published = new Date().getTime() / 1000;
    const userpost = {
      nid: article_edit.nid,
      summary: summary,
      text: description,
      published: Math.floor(published),
      link_preview: preview,
    }

    const token = await this._getAuthToken();
    if (!token) {
      this.setWaiting(false);
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    await gqlservice
      .update_userpost(userpost)
      .then(
        (result) => {
          const articles = result.data.update_articles.returning;
          if (articles.length > 0) {
            let article = articles[0];
            if (article.link_preview) {
              article.link_preview = JSON.parse(article.link_preview);
            }
            this.props.updateUserPost(articles[0]);
          }
        },
        (reason) => {
          this.setError(reason.msg);
          return;
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
        return;
      });

    const now = new Date();
    await gqlservice
      .update_source_lastupdated(source_id, now.toISOString())
      .then((result) => {}, (reason) => {
        this.setError(reason.msg);
        return;
      })
      .catch((err) => {
        this.setError(JSON.stringify(err));
        return;
      });

    this.setWaiting(false);

    this.setState({
      ...this.state,
      article_edit: null
    });
  }

  renderSplashScreen = (classes, theme_mode) => {
    return (
      <div className={classes.root}>
        <SplashScreen theme_mode={theme_mode} />
      </div>
    );
  };

  getSourceThrottles2show = () => {
    const {
      loggedIn,
      default_feeds,
      followed_feeds,
      unfollowed_sources,
      authUser,
    } = this.props;

    let feeds = default_feeds;
    if (loggedIn && followed_feeds.length > 0) {
      feeds = followed_feeds.slice();
    }

    let throttles = [];
    for (let feed of feeds) {
      let feed_sources = [];
      if (loggedIn && unfollowed_sources.length > 0) {
        feed_sources = feed.feed_sources.filter(
          (feed_source) =>
            feed_source.approved &&
            unfollowed_sources.findIndex(
              (item) =>
                item.source_id === feed_source.source_id &&
                item.feed_id === feed.id &&
                item.user_id === authUser.uid
            ) === -1
        );
      } else {
        feed_sources = feed.feed_sources.filter(
          (feed_source) => feed_source.approved
        );
      }

      for (let feed_source of feed_sources) {
        if (
          throttles.findIndex(
            (throttle) => throttle.source_id === feed_source.source_id
          ) === -1
        ) {
          throttles.push({
            source_id: feed_source.source_id,
            throttle: feed_source.source.throttle,
            article_count: 0,
          });
        }
      }
    }

    return throttles;
  };

  removeArticlesByThrottle = (articles) => {
    let new_articles = [];
    if (articles.length === 0) {
      return new_articles;
    }

    let throttles = this.getSourceThrottles2show();
    if (throttles.length === 0) {
      return new_articles;
    }

    for (let article of articles) {
      let throttle = throttles.find(
        (throttle) => throttle.source_id === article.source_id
      );
      if (throttle === undefined) {
        new_articles.push(article);
        continue;
      }

      throttle.article_count++;
      switch (throttle.throttle) {
        case 100:
          new_articles.push(article);
          break;

        case 75:
          if (throttle.article_count % 4 !== 0) {
            new_articles.push(article);
          }
          break;

        case 50:
          if (throttle.article_count % 2 === 0) {
            new_articles.push(article);
          }
          break;

        case 25:
          if (throttle.article_count % 4 === 0) {
            new_articles.push(article);
          }
          break;

        default:
          break;
      }
    }

    return new_articles;
  };

  render() {
    const {
      classes,
      loggedIn,
      authUser,
      initialized,
      // branch,
      // country,
      sources,
      showfirst_articles,
      articles,
      theme_mode,
      topNavbar,
      bottomNavbar,
      requesting,
    } = this.props;
    const {
      // topFeeds,
      notifications,
      hasPodcasts,
      loginDlg,
      helpDlg,
      postDlg,
      article_edit,
      alertDlg,
      alertTitle,
      alertMsg
    } = this.state;

    if (!initialized) {
      return this.renderSplashScreen(classes, theme_mode);
    }

    let feeds2show = this.getFeeds2show();
    if (feeds2show.length === 0 || sources.length === 0) {
      return this.renderSplashScreen(classes, theme_mode);
    }
    if (loggedIn) {
      // sort feeds by order
      feeds2show = feeds2show.map(feed => {
        const feed_order = authUser.feeds_order.filter(order => order.feed_id === feed.id);
        if (feed_order.length > 0) {
          let new_feed = feed;
          new_feed.order = feed_order[0].order;
          return new_feed;
        } else {
          return feed;
        }
      });
      feeds2show = feeds2show.sort(
        (a, b) => a.order - b.order
      );
    }

    // get pins & movetops to show (should be changed)
    let pins2show = [];
    let movetops2show = [];
    // if (branch === ARTICLE_BRANCH_NEWSPAPER) {
    //   if (country === ALL) {
    //     pins2show = pins.filter((pin) => pin.article.branch === branch);
    //     movetops2show = movetops.filter(
    //       (movetop) => movetop.article.branch === branch
    //     );
    //   } else {
    //     pins2show = pins.filter(
    //       (pin) =>
    //         pin.article.branch === branch && pin.article.country === country
    //     );
    //     movetops2show = movetops.filter(
    //       (movetop) =>
    //         movetop.article.branch === branch &&
    //         movetop.article.country === country
    //     );
    //   }
    // } else {
    //   if (branch === BRANCH_ALL) {
    //     pins2show = pins;
    //     movetops2show = movetops;
    //   } else {
    //     pins2show = pins.filter((pin) => pin.article.branch === branch);
    //     movetops2show = movetops.filter(
    //       (movetop) => movetop.article.branch === branch
    //     );
    //   }
    // }

    const all_articles = showfirst_articles.concat(articles);

    // exclude non-approved user post
    const real_articles = all_articles.filter(article =>
      article.branch !== ARTICLE_BRANCH_USERPOST || (
        article.branch === ARTICLE_BRANCH_USERPOST && article.param1 === 1
      )
    );
    // get articles to show(delete pins & movetops from the articles)
    let articles2show = [];
    const throttled_articles = this.removeArticlesByThrottle(real_articles);
    for (let article of throttled_articles) {
      // if (
      //   pins2show.find((pin) => pin.article.nid === article.nid) !==
      //     undefined ||
      //   movetops2show.find((movetop) => movetop.article.nid === article.nid) !==
      //     undefined
      // ) {
      //   continue;
      // }
      articles2show.push(article);
    }

    // console.log("Home articles to show :", articles2show);

    // ActionBar  : 32px
    // ListBar    : 144px
    const title_height = window.innerWidth >= 600 ? 64 : 56;
    const appbar_height = topNavbar ? title_height + 192 : title_height;

    // layout variables
    const width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    const isDesktop = width > MAX_WINDOW_WIDTH;
    const isTablet =
      width >= MIN_TABLET_WIDTH &&
      width <= MAX_WINDOW_WIDTH;
    const isMobile = width < MIN_TABLET_WIDTH;
    let topFeedsWidth = width - MAX_CARD_WIDTH;
    if (topFeedsWidth > MAX_CARD_WIDTH) {
      topFeedsWidth = MAX_CARD_WIDTH;
    }

    return (
      <div className={classes.root}>
        <div className="wrapper">
          <MetaTags>
            <title>{`Raven App`}</title>
            <meta name="description" content={`Raven: news and social media simplified`} />
            <meta property="og:title" content={`Raven App`} />
            <meta property="og:description" content={`Raven: news and social media simplified`} />
            <meta property="og:image" content="logo512.png" />
            <meta property="og:site_name" content="Raven App" />
            <meta property="og:url" content="https://www.ravenapp.org" />
            <meta property="og:type" content="website" />
            <meta property="twitter:title" content={`Raven App`} />
            <meta property="twitter:site" content="Raven App" />
            <meta property="twitter:description" content={`Raven: news and social media simplified`} />
            <meta property="twitter:image:src" content="logo512.png" />
            <meta property="twitter:image:alt" content="Raven" />
            <meta property="twitter:domain" content="ravenapp.org" />
          </MetaTags>
        </div>
        <div className={classes.appbar} style={{ height: appbar_height }}>
          <MainAppBar
            show={topNavbar}
            feeds={feeds2show}
            hasPodcasts={hasPodcasts}
            notifications={notifications}
            onHelp={this.handlePlayHelp}
            onNotification={this.handleNotification}
            onProfileMenu={this.handleProfileMenu}
            onSignOut={this.handleSignOut}
            handleSearchChange={this.handleSearchChange}
            handleSearchEnter={this.handleSearchEnter}
            handleClickYourLists={this.handleClickYourFeeds}
            handleClickDiscover={this.handleClickDiscover}
            handleClickCreate={this.handleClickCreate}
            handleClickPodcasts={this.handleClickPodcasts}
            handleClickCleanAir={this.handleClickCleanAir}
            handleListSelected={this.handleClickFeed}
          />
          <FeedsAppBar
            show={!topNavbar}
            image={`/static/images/logo/${theme_mode}/logo.png`}
            title={"Feeds"}
            onClickBackButton={this.handleClickBackButton}
          />
        </div>
        <BottomNavBar
          // show_all_branch
          selected_feeds={feeds2show}
          show={bottomNavbar}
          onChangeCountry={this.handleChangeCountry}
          onChangeBranch={this.handleChangeBranch}
        />
        {isDesktop && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <ArticleMasonry
                width={1224}
                articles={articles2show}
                pins={pins2show}
                movetops={movetops2show}
                onNeedMore={this.handleNeedMore}
                onSelectArticle={this.handleSelectArticle}
                onSelectGroupArticle={this.handleSelectGroupArticle}
                onLogin={this.handleLogin}
                onReport={this.handleReportArticle}
                onEdit={this.handleEditArticle}
                onSave={this.handleSaveArticle}
                onDeleteSaved={this.handleDeleteSavedArticle}
                onClickSource={this.handleClickSource}
                onClickFeed={this.handleClickFeed}
              />
            </Grid>
            {/* <Grid
              item
              className={classes.topfeeds}
              style={{ top: title_height }}
            >
              <TopFeeds
                width={MAX_CARD_WIDTH}
                topFeeds={topFeeds}
                onClickFeed={this.handleClickFeed}
                onReachLimit={this.handleReachLimit}
              />
            </Grid> */}
          </Grid>
        )}
        {isTablet && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <ArticleMasonry
                width={width >= 1224 ? 1224 : MIN_TABLET_WIDTH}
                articles={articles2show}
                pins={pins2show}
                movetops={movetops2show}
                onNeedMore={this.handleNeedMore}
                onSelectArticle={this.handleSelectArticle}
                onSelectGroupArticle={this.handleSelectGroupArticle}
                onLogin={this.handleLogin}
                onReport={this.handleReportArticle}
                onEdit={this.handleEditArticle}
                onSave={this.handleSaveArticle}
                onDeleteSaved={this.handleDeleteSavedArticle}
                onClickSource={this.handleClickSource}
                onClickFeed={this.handleClickFeed}
              />
            </Grid>
            {/* <Grid
              item
              className={classes.topfeeds}
              style={{ top: title_height }}
            >
              <TopFeeds
                width={topFeedsWidth}
                topFeeds={topFeeds}
                onClickFeed={this.handleClickFeed}
                onReachLimit={this.handleReachLimit}
              />
            </Grid> */}
          </Grid>
        )}
        {isMobile && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <ArticleList
                articles={articles2show}
                pins={pins2show}
                movetops={movetops2show}
                onNeedMore={this.handleNeedMore}
                onSelectArticle={this.handleSelectArticle}
                onSelectGroupArticle={this.handleSelectGroupArticle}
                onNeedLogin={this.handleLogin}
                onReport={this.handleReportArticle}
                onEdit={this.handleEditArticle}
                onSave={this.handleSaveArticle}
                onDeleteSaved={this.handleDeleteSavedArticle}
                onClickSource={this.handleClickSource}
                onClickFeed={this.handleClickFeed}
              />
            </Grid>
          </Grid>
        )}
        <DlgLoginConfirm
          open={loginDlg}
          onLogin={this.handleLogin}
          onCancel={this.handleCancelLogin}
        />
        <DlgVideo
          open={helpDlg}
          video={"/static/videos/Raven_Mainpage.mp4"}
          onClose={this.handleCloseHelp}
        />
        {postDlg &&
          <DlgPostEdit
            open={postDlg}
            theme={theme_mode}
            article={article_edit}
            onSubmit={this.handleUpdatePost}
            onClose={this.closePostEditDlg}
          />
        }
        <DlgAlert
          open={alertDlg}
          title={alertTitle}
          description={alertMsg}
          theme_mode={theme_mode}
          onOK={this.handleOK}
        />
        <ToastContainer />
        <WaitingDialog open={requesting} />
      </div>
    );
    // }
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  initialized: state.dataState.initialized,
  newssites: state.dataState.newssites,
  categories: state.dataState.categories,
  feeds: state.dataState.feeds,
  selected_feed: state.dataState.selected_feed,
  sources: state.dataState.sources,
  unfollowed_sources: state.dataState.unfollowed_sources,
  default_feeds: state.dataState.default_feeds,
  followed_feeds: state.dataState.followed_feeds,
  tags: state.dataState.tags,
  showfirst_articles: state.dataState.showfirst_articles,
  articles: state.dataState.articles,
  pins: state.dataState.pins,
  movetops: state.dataState.movetops,
  last_offset: state.dataState.last_offset,
  podcasts: state.dataState.podcasts,
  podcast_last_offset: state.dataState.podcast_last_offset,
  country: state.dataState.country,
  branch: state.dataState.branch,
  theme_mode: state.uiState.theme_mode,
  topNavbar: state.uiState.topNavbar,
  bottomNavbar: state.uiState.bottomNavbar,
  requesting: state.uiState.requesting,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withAuthentication,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Home);

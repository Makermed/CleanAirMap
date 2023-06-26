import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import Masonry from "react-masonry-component";
import { ToastContainer } from "react-toastify";
import { withAuthentication, withAuthorization } from "session";
import { BasicAppBar, WaitingDialog } from "components";
import { NotificationItem } from "./components";
import * as ROUTES from "constants/routes";
import { BRANCH_ALL } from "constants/branches";
import { ALL } from "constants/country";
import { withFirebase } from 'services';
import { GraphqlService } from "services";
import { 
  GRAPHQL_ERROR,
  GRAPHQL_SUCCESS,
  MAX_WINDOW_WIDTH, 
  TAB_COMMENTS, 
  TAB_MODERATORS 
} from "constants/types";
import { 
  NOTIFICATION_FEED_APPROVE,
  NOTIFICATION_SOURCE_APPROVE,
  NOTIFICATION_POST_APPROVE,
  NOTIFICATION_THREAD_APPROVE,
  NOTIFICATION_FEED_APPROVE_MODERATOR,
  NOTIFICATION_FEED_INVITE,
  NOTIFICATION_COMMENT_APPROVE,
  NOTIFICATION_COMMENT_REPLY,
  NOTIFICATION_FEED_SUBSCRIBE,
  NOTIFICATION_MESSAGE_MODERATOR,
  NOTIFICATION_MAP_LOCATION_APPROVE,
  NOTIFICATION_MAP_REGION_APPROVE,
  NOTIFICATION_CATEGORY_APPLY_MODERATOR,
  NOTIFICATION_CATEGORY_RESIGN_MODERATOR,
  NOTIFICATION_FEED_APPLY_MODERATOR,
  NOTIFICATION_FEED_RESIGN_MODERATOR,
  NOTIFICATION_MAP_LOCATION_APPLY_MODERATOR,
  NOTIFICATION_MAP_REGION_APPLY_MODERATOR
} from "constants/notification";
import { TAB_FEED } from "constants/types";
import { CONF_LOCATION_TYPES } from "constants/maplocation";
import { CONF_COUNTRIES } from "constants/country";
import { get_region_name } from "utility/cleanair";
import { ToastError } from "utility/toast";


const condition = (authUser) => !!authUser && authUser.uid.length > 0;

const masonryOptions = {
  transitionDuration: 0,
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_WINDOW_WIDTH,
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: theme.palette.background.default,
  },
  appbar: {
    width: "100%",
    height: "56px",
    [theme.breakpoints.up("sm")]: {
      height: "64px",
    },
    zIndex: 1200,
  },
  feeds: {
    paddingLeft: theme.spacing(2),
    padding: 0,
    backgroundColor: theme.palette.background.default,
  },
  myfeeds: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 0,
    color: theme.palette.text.primary,
    textTransform: "none",
  },
});

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
  }

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

  componentDidMount = async () => {
    const { feeds, authUser } = this.props;

    if (feeds.length === 0) {
      return;
    }

    this.setWaiting(true);

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    const result = await gqlservice.notifications_to_user(authUser.uid);
    if (result.status_code === GRAPHQL_SUCCESS) {
      const notifications = result.data.notifications;
      console.log("notifications :", notifications);
      if (notifications.length > 0) {
        await this.getNotificationContents(notifications);
      }
    }

    this.setWaiting(false);
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

  handleLogin = () => {
    const location = {
      pathname: ROUTES.SIGN_IN,
      state: { animation: "bottom" },
    };
    this.props.history.push(location);
    this.props.setLoginBackRoute(this.props.location.pathname);
  };

  handleNavBack = () => {
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "right" },
    };
    this.props.history.push(location);

    this.props.refreshArticles();
    this.props.initScrollPos();
    this.props.selectCountry(ALL);
    this.props.selectBranch(BRANCH_ALL);
    this.props.showTopNavbar(true);
  };

  handleClickItem = async (notification) => {
    // console.log("notification :", notification);
    const { feeds, sources } = this.props;
    const location = {
      pathname: notification.route,
      state: { animation: "left" },
    };

    if (notification.type === NOTIFICATION_FEED_APPROVE) {
      const feed = feeds.find(item => item.id === notification.object);
      if (feed) {
        this.props.selectFeed(feed);
        this.props.selectFeedTab(TAB_FEED);
      }
    }
    else if (notification.type === NOTIFICATION_SOURCE_APPROVE) {
      const source = sources.find(item => item.id === notification.object);
      if (source !== undefined) {
        this.props.selectSource(source);
        this.props.setSourceBackRoute(ROUTES.NOTIFICATIONS);
        this.props.refreshArticles();
        this.props.initScrollPos();
        this.props.selectCountry(ALL);
        this.props.selectBranch(BRANCH_ALL);
      }
    }
    else if (notification.type === NOTIFICATION_POST_APPROVE) {
      const feed = feeds.find(item => item.id === notification.in_which);
      if (feed) {
        this.props.setArticleBackRoute(
          `/${ROUTES.FEEDS_PREFIX}/${feed.slug}`
        );
      }
    }
    else if (notification.type === NOTIFICATION_THREAD_APPROVE) {
    }
    else if (notification.type === NOTIFICATION_FEED_APPROVE_MODERATOR) {
      const feed = feeds.find(item => item.id === notification.object);
      if (feed) {
        this.props.selectFeed(feed);
        this.props.selectFeedTab(TAB_MODERATORS);
      }
    }
    else if (notification.type === NOTIFICATION_FEED_INVITE) {
      const feed = feeds.find(item => item.id === notification.in_which);
      if (feed) {
        this.props.selectFeed(feed);
        this.props.selectFeedTab(TAB_FEED);
      }
    }
    else if (notification.type === NOTIFICATION_COMMENT_APPROVE) {
      const feed = feeds.find(item => item.id === notification.object);
      if (feed) {
        this.props.selectFeed(feed);
        this.props.selectFeedTab(TAB_COMMENTS);
      }
    }
    else if (notification.type === NOTIFICATION_COMMENT_REPLY) {
    }
    else if (notification.type === NOTIFICATION_FEED_SUBSCRIBE) {
      const feed = feeds.find(item => item.id === notification.object);
      if (feed) {
        this.props.selectFeed(feed);
        this.props.selectFeedTab(TAB_FEED);
      }
    }
    else if (notification.type === NOTIFICATION_MAP_LOCATION_APPROVE) {
    }
    else if (notification.type === NOTIFICATION_MAP_REGION_APPROVE) {
    }
    else if (notification.type === NOTIFICATION_CATEGORY_APPLY_MODERATOR) {
    }
    else if (notification.type === NOTIFICATION_CATEGORY_RESIGN_MODERATOR) {
    }
    else if (notification.type === NOTIFICATION_FEED_APPLY_MODERATOR) {
      const feed = feeds.find(item => item.id === notification.object);
      if (feed) {
        this.props.selectFeed(feed);
        this.props.selectFeedTab(TAB_FEED);
      }
    }
    else if (notification.type === NOTIFICATION_FEED_RESIGN_MODERATOR) {
      const feed = feeds.find(item => item.id === notification.object);
      if (feed) {
        this.props.selectFeed(feed);
        this.props.selectFeedTab(TAB_FEED);
      }
    }
    else if (notification.type === NOTIFICATION_MAP_LOCATION_APPLY_MODERATOR) {
    }
    else if (notification.type === NOTIFICATION_MAP_REGION_APPLY_MODERATOR) {
    }

    await this._confirmNotification(notification.id);

    this.props.history.push(location);
  }

  _confirmNotification = async (notification_id) => {
    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    await gqlservice.confirm_notification(notification_id);

    const { notifications } = this.state;
    const remain_notifications = notifications.filter(item => item.id !== notification_id);
    this.setState({
      ...this.state,
      notifications: remain_notifications
    });
  }

  _getLocation = async (location_id) => {
    const gqlservice = new GraphqlService();
    const result = await gqlservice.map_location_by_id(location_id);
    if (result.status_code === GRAPHQL_ERROR) {
      return null;
    }
    if (result.data.locations.length === 0) {
      return null;
    }

    return result.data.locations[0];
  }

  _getRegion = async (region_id) => {
    const gqlservice = new GraphqlService();
    const result = await gqlservice.map_region_by_id(region_id)
    if (result.status_code === GRAPHQL_ERROR) {
      return null;
    }
    if (result.data.region.length === 0) {
      return null;
    }

    return result.data.region[0];
  }

  _getNotificationDetails = async (notification) => {
    const { categories, feeds, sources } = this.props;

    const detailed_notification = notification;
    detailed_notification.text = "";
    detailed_notification.image = "";
    detailed_notification.route = "";

    if (notification.type === NOTIFICATION_FEED_APPROVE) {
      const feed = feeds.find(item => item.id === notification.object);
      if (!feed) {
        return null;
      }
      detailed_notification.text = `Your feed '${feed.name}' has been approved`;
      detailed_notification.image = feed.image;
      detailed_notification.route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.FEEDS_PREFIX}/${feed.slug}`;
      return detailed_notification;
    } 
    else if (notification.type === NOTIFICATION_SOURCE_APPROVE) {
      const feed = feeds.find(item => item.id === notification.in_which);
      if (!feed) {
        return null;
      }
      const source = sources.find(item => item.id === notification.object);
      detailed_notification.text = `Your source '${source.name}' on '${feed.name}' has been approved`;
      detailed_notification.image = source.image;
      detailed_notification.route = `/${ROUTES.FEEDS_PREFIX}/${feed.slug}/${ROUTES.SOURCE_PREFIX}/${source.slug}`;
      return detailed_notification;
    } 
    else if (notification.type === NOTIFICATION_POST_APPROVE) {
      const feed = feeds.find(item => item.id === notification.in_which);
      if (!feed) {
        return null;
      }
      const article_id = notification.object;
      detailed_notification.text = `Your pending post on '${feed.name}' has been approved`;
      detailed_notification.image = feed.image;
      detailed_notification.route = `/${ROUTES.ARTICLE_PREFIX}/${article_id}`;
      return detailed_notification;
    } 
    else if (notification.type === NOTIFICATION_THREAD_APPROVE) {
      const feed = feeds.find(item => item.id === notification.in_which);
      if (!feed) {
        return null;
      }
      const thread_id = notification.object;
      detailed_notification.text = `Your pending thread on '${feed.name}' has been approved`;
      detailed_notification.image = feed.image;
      detailed_notification.route = `/${ROUTES.FEEDS_PREFIX}/${feed.id}/${ROUTES.THREAD_PREFIX}/${thread_id}`;
      return detailed_notification;
    } 
    else if (notification.type === NOTIFICATION_FEED_APPROVE_MODERATOR) {
      const feed = feeds.find(item => item.id === notification.object);
      if (!feed) {
        return null;
      }
      detailed_notification.text = `Your moderation request on '${feed.name}' has been approved`;
      detailed_notification.image = feed.image;
      detailed_notification.route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.FEEDS_PREFIX}/${feed.slug}`;
      return detailed_notification;
    } 
    else if (notification.type === NOTIFICATION_FEED_INVITE) {
      const feed = feeds.find(item => item.id === notification.in_which);
      if (!feed) {
        return null;
      }
      // console.log("invite notification :", notification);
      const username = notification.creator.user || notification.creator.username;
      detailed_notification.text = `You have been invited by @${username} to join the private feed '${feed.name}'`;
      detailed_notification.image = feed.image;
      detailed_notification.route = `/${ROUTES.FEEDS_PREFIX}/${feed.slug}`;
      return detailed_notification;
    } 
    else if (notification.type === NOTIFICATION_COMMENT_REPLY) {
      const feed = feeds.find(item => item.id === notification.object);
      if (!feed) {
        return null;
      }
      detailed_notification.text = `New comments on your thread in '${feed.name}'`;
      detailed_notification.image = feed.image;
      detailed_notification.route = `/${ROUTES.FEEDS_PREFIX}/${feed.slug}`;
      return detailed_notification;
    } 
    else if (notification.type === NOTIFICATION_FEED_SUBSCRIBE) {
      const feed = feeds.find(item => item.id === notification.object);
      if (!feed) {
        return null;
      }
      detailed_notification.text = `New subscribe on your feed '${feed.name}'`;
      detailed_notification.image = feed.image;
      detailed_notification.route = `/${ROUTES.FEEDS_PREFIX}/${feed.slug}`;
      return detailed_notification;
    } 
    else if (notification.type === NOTIFICATION_MESSAGE_MODERATOR) {

    }
    else if (notification.type === NOTIFICATION_MAP_LOCATION_APPROVE) {
      const location_id = parseInt(notification.object);
      const location = await this._getLocation(location_id);
      // console.log("location :", location);
      if (!location) {
        return null;
      }
      const locationtype = CONF_LOCATION_TYPES[location.type];
      detailed_notification.text = `You approved CleanAir Map location ${location.name}`;
      detailed_notification.image = `/static/images/icons/loc_types/${locationtype.image}`;
      detailed_notification.color = locationtype.color;
      detailed_notification.route = `/${ROUTES.CLEANAIRMAP_PREFIX}/${location.slug}`;
      return detailed_notification;
    }
    else if (notification.type === NOTIFICATION_MAP_REGION_APPROVE) {
      const region_id = parseInt(notification.object);
      const region = await this._getRegion(region_id);
      console.log("region :", region);
      if (!region) {
        return null;
      }
      detailed_notification.text = `You approved CleanAir Map region ${get_region_name(region)}`;
      const country = CONF_COUNTRIES.find(item => item.name === region.country);
      if (country) {
        detailed_notification.image = country.flag;
      } else {
        detailed_notification.image = "/static/images/flags/world.png";
      }
      detailed_notification.route = ROUTES.CLEANAIRMAP;
      return detailed_notification;
    }
    else if (notification.type === NOTIFICATION_CATEGORY_APPLY_MODERATOR) {
      const category = categories.find(item => item.id === notification.object);
      if (!category) {
        return null;
      }
      detailed_notification.text = `You applied as a moderator for category '${category.name}'`;
      detailed_notification.image = category.image;
      detailed_notification.route = `/${ROUTES.CATEGORY_PREFIX}/${category.id}`;
      return detailed_notification;
    }
    else if (notification.type === NOTIFICATION_CATEGORY_RESIGN_MODERATOR) {
      const category = categories.find(item => item.id === notification.object);
      if (!category) {
        return null;
      }
      detailed_notification.text = `You resigned from the moderator for category '${category.name}'`;
      detailed_notification.image = category.image;
      detailed_notification.route = `/${ROUTES.CATEGORY_PREFIX}/${category.id}`;
      return detailed_notification;
    }
    else if (notification.type === NOTIFICATION_FEED_APPLY_MODERATOR) {
      const feed = feeds.find(item => item.id === notification.object);
      if (!feed) {
        return null;
      }
      detailed_notification.text = `You applied as a moderator for feed '${feed.name}'`;
      detailed_notification.image = feed.image;
      detailed_notification.route = `/${ROUTES.FEEDS_PREFIX}/${feed.slug}`;
      return detailed_notification;
    }
    else if (notification.type === NOTIFICATION_FEED_RESIGN_MODERATOR) {
      const feed = feeds.find(item => item.id === notification.object);
      if (!feed) {
        return null;
      }
      detailed_notification.text = `You resigned from the moderator for feed '${feed.name}'`;
      detailed_notification.image = feed.image;
      detailed_notification.route = `/${ROUTES.FEEDS_PREFIX}/${feed.slug}`;
      return detailed_notification;
    }
    else if (notification.type === NOTIFICATION_MAP_LOCATION_APPLY_MODERATOR) {
      const location_id = parseInt(notification.object);
      const location = await this._getLocation(location_id);
      // console.log("location :", location);
      if (!location) {
        return null;
      }
      const locationtype = CONF_LOCATION_TYPES[location.type];
      detailed_notification.text = `You applied as moderator for the CleanAir Map location ${location.name}`;
      detailed_notification.image = `/static/images/icons/loc_types/${locationtype.image}`;
      detailed_notification.color = locationtype.color;
      detailed_notification.route = `/${ROUTES.CLEANAIRMAP_PREFIX}/${location.slug}`;
      return detailed_notification;
    }
    else if (notification.type === NOTIFICATION_MAP_REGION_APPLY_MODERATOR) {
      const region_id = parseInt(notification.object);
      const region = await this._getRegion(region_id);
      console.log("region :", region);
      if (!region) {
        return null;
      }
      detailed_notification.text = `You applied as moderator for the CleanAir Map region ${get_region_name(region)}`;
      const country = CONF_COUNTRIES.find(item => item.name === region.country);
      if (country) {
        detailed_notification.image = country.flag;
      } else {
        detailed_notification.image = "/static/images/flags/world.png";
      }
      detailed_notification.route = ROUTES.CLEANAIRMAP;
      return detailed_notification;
    }

    return notification;
  }

  getNotificationContents = async (notifications) => {
    const new_notifications = [];
    for (let notification of notifications) {
      const detail = await this._getNotificationDetails(notification);
      if (detail) {
        new_notifications.push(detail);
      } else {
        await this._confirmNotification(notification.id);
      }
    }
    // console.log("new notifications :", new_notifications);
    this.setState({
      ...this.state,
      notifications: new_notifications
    });
  }


  render() {
    const { classes, theme_mode, requesting } = this.props;
    const { notifications } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            title={"Notifications"}
            onNavBack={this.handleNavBack}
          />
        </div>
        <div className={classes.feeds}>
          {notifications.length > 0 && (
            <div className={classes.myfeeds}>
              <Masonry options={masonryOptions} disableImagesLoaded={false}>
                {notifications.map((notification) => {
                  return (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      theme_mode={theme_mode}
                      onClicked={this.handleClickItem}
                    />
                  );
                })}
              </Masonry>
            </div>
          )}
        </div>
        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  categories: state.dataState.categories,
  feeds: state.dataState.feeds,
  theme_mode: state.uiState.theme_mode,
  socialtypes: state.dataState.socialtypes,
  requesting: state.uiState.requesting
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withAuthentication,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Notifications);

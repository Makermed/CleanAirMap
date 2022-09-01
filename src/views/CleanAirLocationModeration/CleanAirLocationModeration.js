import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { withAuthentication } from "session";
import SwipeableViews from "react-swipeable-views";
import {
  LocationCard,
  MapPostList,
  WaitingDialog,
  DlgLoginConfirm,
  ReadingItemMod,
  DlgReading,
  DlgShare,
} from "components";
import {
  MainAppBar,
  LocationTabs,
  ReadingButtons,
  PostButtons,
  ModButtons,
  ModeratorList,
} from "./components";
import {
  withFirebase,
  GraphqlService,
} from "services";
import * as ROUTES from "constants/routes";
import {
  TAB_LOC_READINGS,
  TAB_LOC_FEEDS,
  TAB_LOC_MODERATORS,
  MAX_WINDOW_WIDTH,
  // MAX_ARTICLE_WIDTH,
  MIN_TABLET_WIDTH,
  MIN_CARD_WIDTH,
  MAX_CARD_WIDTH,
} from "constants/types";
import {
  ToastSuccess,
  ToastInfo,
  ToastError,
} from "utility/toast";
import {
  CONF_LOCATION_TYPES
} from "constants/maplocation";
import { 
  ARTICLE_BRANCH_MAPPOST_INSTAGRAM, 
  ARTICLE_BRANCH_MAPPOST_TWITTER 
} from "constants/branches";
import {
  ACTIVITY_TYPE_CLEANAIRMAP,
  ACTIVITY_DELETE,
  ACTIVITY_APPROVE,
  ACTIVITY_MAKE,
  ACTIVITY_REPORT,
  ACTIVITY_APPLY,
  ACTIVITY_REJECT,
  // ACTIVITY_REMOVE,
  // ACTIVITY_ADD,
} from "constants/activity";
import {
  NOTIFICATION_MAP_LOCATION_APPLY_MODERATOR,
  NOTIFICATION_MAP_LOCATION_APPROVE,
  NOTIFICATION_MAP_REGION_APPLY_MODERATOR
} from "constants/notification";
import { uuid } from "uuidv4";
import { 
  moderate_image 
} from "utility/ravenapi";
import {
  resizeImageFile
} from "utility/resizeimage";


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
    height: "56px",
    [theme.breakpoints.up("sm")]: {
      height: "64px",
    },
    zIndex: 1100,
  },
  maincontainer: {
    position: "sticky",
    top: "56px",
    [theme.breakpoints.up("sm")]: {
      top: "64px",
    },
  },
  invitecontainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  tabcontainer: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
  addbutton: {
    position: "fixed",
    bottom: theme.spacing(5),
    // right: theme.spacing(1),
    width: 60,
    height: 60,
    zIndex: 1200,
  },
  warningcontainer: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    textAlign: "center",
  },
  warningimg: {
    width: 48,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(2),
  },
  warningicon: {
    width: 48,
    height: 48,
  },
  warningtitle: {
    width: 220,
    fontSize: 24,
    lineHeight: 1.2,
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(2),
  },
  warningtext: {
    width: 220,
    fontSize: 14,
    fontWeight: 400,
    marginLeft: "auto",
    marginRight: "auto",
    color: theme.palette.text.secondary,
  },
  indicatoricon: {
    width: 16,
    height: 16,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  bottomspace: {
    paddingBottom: theme.spacing(10),
  }
});

class CleanAirLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginDlg: false,
      commentDlg: false,
      readingDlg: false,
      readingEditDlg: false,
      shareDlg: false,
      reportReadingDlg: false,
      selectedReading: null
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleClickBackButton = this.handleClickBackButton.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleCancelLogin = this.handleCancelLogin.bind(this);

    this.handleEditLocation = this.handleEditLocation.bind(this);
    this.handleReportLocation = this.handleReportLocation.bind(this);
    this.handleModerateLocation = this.handleModerateLocation.bind(this);
    this.handleModerateRegion = this.handleModerateRegion.bind(this);
    this.handleResignModerator = this.handleResignModerator.bind(this);

    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleSwiped = this.handleSwiped.bind(this);

    this.handleEditComment = this.handleEditComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);

    this.handleShareReading = this.handleShareReading.bind(this);
    this.handleCloseShareReading = this.handleCloseShareReading.bind(this);

    this.handleMakeModerator = this.handleMakeModerator.bind(this);
    this.handleBanUser = this.handleBanUser.bind(this);

    this.handleShowReading = this.handleShowReading.bind(this);
    this.handleHideReading = this.handleHideReading.bind(this);
    this.handleAddReading = this.handleAddReading.bind(this);
    this.handleEditReading = this.handleEditReading.bind(this);

    this.handleFlaggedReadings = this.handleFlaggedReadings.bind(this);
    this.handleProposedReadings = this.handleProposedReadings.bind(this);

    this.handleNeedMore = this.handleNeedMore.bind(this);
    this.handleSelectMapPost = this.handleSelectMapPost.bind(this);
    this.handleReportMapPost = this.handleReportMapPost.bind(this);

    this.handleSaveMapPost = this.handleSaveMapPost.bind(this);
    this.handleDeleteSavedMapPost = this.handleDeleteSavedMapPost.bind(this);

    this.handleFlaggedPosts = this.handleFlaggedPosts.bind(this);
    this.handleProposedPosts = this.handleProposedPosts.bind(this);

    this.handleFlaggedModerators = this.handleFlaggedModerators.bind(this);
    this.handleReportModerator = this.handleReportModerator.bind(this);
    this.handleApproveModerator = this.handleApproveModerator.bind(this);
    this.handleDeleteModerator = this.handleDeleteModerator.bind(this);
    this.handleMakeOwner = this.handleMakeOwner.bind(this);

    this.handleViewLog = this.handleViewLog.bind(this);
    this.handleClickSettings = this.handleClickSettings.bind(this);
  }

  setError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();
  };

  setAuthorizeError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();

    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  }

  setWaiting = (waiting) => {
    if (waiting) {
      this.props.requestDataPending();
    } else {
      this.props.requestDataFinished();
    }
  };

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

  componentDidMount = async () => {
    const { match } = this.props;
    // console.log("location match :", match);
    let tabValue = TAB_LOC_READINGS;
    if (match.path === ROUTES.CLEANAIRMAP_POSTS) {
      tabValue = TAB_LOC_FEEDS;
    }

    this.setWaiting(true);

    let location_slug =
      this.props.selected_location !== null && this.props.selected_location !== undefined
        ? this.props.selected_location.slug
        : match.params.slug;
    if (location_slug === undefined || location_slug === "") {
      this.setWaiting(false);
      this.setError("Can't find location");
      return;
    }

    await this.getLocationInfo(location_slug);

    const { selected_location } = this.props;

    if (!this._isModerator(selected_location)) {
      const route = {
        pathname: ROUTES.CLEANAIRMAP,
        state: { animation: "right" },
      };
      this.props.history.push(route);
      this.setWaiting(false);
      return;
    }

    const location = await this.getLocationModerates(selected_location);
    this.props.selectMapLocation(location);

    if (this.props.locationtab === TAB_LOC_READINGS) {
      // load readings
      const { cleanair_values } = this.props;
      if (cleanair_values.length === 0) {
        await this.getCleanAirReadings();
        this.props.initScrollPos();
      } else {
        window.scrollTo(this.props.scrollPos.x, this.props.scrollPos.y);
      }
    }
    else if (this.props.locationtab === TAB_LOC_FEEDS) {
      const { map_posts } = this.props;
      if (map_posts.length === 0) {
        await this.getLocationPosts();
        this.props.initScrollPos();
      } else {
        window.scrollTo(this.props.scrollPos.x, this.props.scrollPos.y);
      }
    }
    
    await this.handleChangeTab(tabValue);

    // this.registerSubscribers();

    this.setWaiting(false);
  };


  componentDidUpdate = (prevProps) => {
    const { selected_location, authUser } = this.props;
    if (selected_location === null || authUser == null) {
      return;
    }
    const location_moderated = authUser.locations_moderated.find(item => item.location_id === selected_location.id);
    const prev_location_moderated = prevProps.authUser.locations_moderated.find(item => item.location_id === selected_location.id);
    if (location_moderated === undefined || prev_location_moderated === undefined) {
      return;
    }

    if (prev_location_moderated.approved !== location_moderated.approved) {
      // go to the previous page if the feed moderation is changed
      if (this._isModerator(selected_location)) {
        const location = {
          pathname: ROUTES.CLEANAIRMAP,
          state: { animation: "left" },
        };
        this.goTo(location);
      }
    }
  }


  // registerSubscribers = () => {
  //   const { loggedIn, authUser } = this.props;
  //   if (!loggedIn) {
  //     return;
  //   }

  //   const userSubscriber = createUserSubscriber(authUser.uid);
  //   this.userConsumer = userSubscriber.subscribe(data => {
  //     const user = data.data.users[0];
  //     // console.log("user updated :", user);
  //     this.props.setAuthUser(user);
  //   }, (err) => {
  //     let msg = "Error subscribing user: " + err.message;
  //     console.log(msg);
  //   });
  // };

  // unregisterSubscribers = () => {
  //   if (this.userConsumer) {
  //     this.userConsumer.unsubscribe();
  //   }
  // }

  goTo = (location) => {
    // this.unregisterSubscribers();
    this.props.history.push(location);
  }

  getLocationInfo = async (location_slug) => {
    const { loggedIn } = this.props;

    const gqlservice = new GraphqlService();
    if (loggedIn) {
      const token = await this._getAuthToken();
      if (!token) {
        this.handleLogin();
        return;
      }
      gqlservice.set_auth_jwt(token);
    }

    await gqlservice
      .map_location_by_slug(location_slug)
      .then(
        (result) => {
          const locations = result.data.locations;
          if (locations.length > 0) {
            this.props.selectMapLocation(locations[0]);
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

  getLocationModerates = async (location) => {

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    let new_location = null;
    await gqlservice
      .map_location_by_id(location.id)
      .then(
        (result) => {
          const locations = result.data.locations;
          if (locations.length > 0) {
            new_location = locations[0];
          } else {
            this.setError("Unknown Error(Server)");
            return location;
          }
        },
        (reason) => {
          this.setError(reason.msg);
          return location;
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
        return location;
      });

    // show only previous 7 day's log
    const timestamp = new Date() - 86400 * 7 * 1000;
    const after = new Date(timestamp).toISOString();

    let reports = [];
    let readings = [];
    let reading_reports = [];
    let article_reports = [];
    let moderators = [];
    let moderator_reports = [];
    let logs = [];

    await gqlservice
      .location_moderation_fields(
        new_location.id,
        after,
        ACTIVITY_TYPE_CLEANAIRMAP
      )
      .then(
        (result) => {
          reports = result.data.location_reports.slice();
          readings = result.data.readings.slice();
          reading_reports = result.data.reading_reports.slice();
          article_reports = result.data.article_reports.slice();
          moderators = result.data.location_moderators.slice();
          moderator_reports = result.data.location_moderator_reports.slice();
          logs = result.data.activitylogs.slice();
        },
        (reason) => {
          this.setError(reason.msg);
          return new_location;
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
        return new_location;
      });

    // const reports_moderate = reports.filter(report => !report.approved);
    // const readings_moderate =  readings.filter(reading => !reading.approved);
    // const article_reports_moderate = article_reports.filter(report => !report.approved);
    // const moderators_moderate = moderators.filter(moderator => !moderator.approved);
    // const moderator_reports_moderate = moderator_reports.filter(report => !report.approved);

    new_location.location_reports = reports;
    new_location.readings = readings;
    new_location.reading_reports = reading_reports;
    new_location.post_reports = article_reports;
    new_location.location_moderators = moderators;
    new_location.moderator_reports = moderator_reports;

    // console.log("location mod info :", new_location);

    const new_logs = logs.filter(
      (log) => Date.parse(log.logged_at) > Date.parse(new_location.last_viewlog)
    );
    new_location.new_logs = new_logs;

    // new_location.notifications =
    //   reports_moderate.length +
    //   readings_moderate.length +
    //   article_reports_moderate.length +
    //   moderators_moderate.length +
    //   moderator_reports_moderate.length;

    return new_location;
  };

  getCleanAirReadings = async () => {

  };

  getLocationPosts = async () => {
    const { selected_location } = this.props;

    const gqlservice = new GraphqlService();
    await gqlservice
      .map_posts_by_location(selected_location.id, 0)
      .then(
        (result) => {
          const articles = result.data.articles;
          // console.log("CleanAirLocation => articles in sources(first page) :", articles);
          this.props.setMapPosts(articles, articles.length);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  handleNeedMore = async () => {
    const { 
      selected_location,
      map_posts_last_offset
    } = this.props;

    const gqlservice = new GraphqlService();
    await gqlservice
      .map_posts_by_location(selected_location.id, map_posts_last_offset)
      .then(
        (result) => {
          const articles = result.data.articles;
          // console.log("CleanAirLocation => articles in sources(next page) :", articles);
          this.props.appendMapPosts(articles, articles.length);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  }

  handleChangeTab = async (tab_value) => {

    this.props.selectLocationTab(tab_value);
    this.props.initScrollPos();
    this.props.showTopNavbar(true);

    if (tab_value === TAB_LOC_READINGS) {
      
    } else if (tab_value === TAB_LOC_FEEDS) {
      const { map_posts } = this.props;
      if (map_posts.length === 0) {
        await this.getLocationPosts();
        this.props.initScrollPos();
      } else {
        window.scrollTo(this.props.scrollPos.x, this.props.scrollPos.y);
      }
    } else if (tab_value === TAB_LOC_MODERATORS) {
    }

  };

  handleSwiped = (tabIndex) => {
    this.handleChangeTab(tabIndex);
  }
 
  handleNavBack = () => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "right" },
    };
    this.props.history.push(location);

    this.props.initScrollPos();
    this.props.selectMapLocation(null);
  };

  handleClickBackButton = () => {
    window.scrollTo(0, 0);
    this.props.initScrollPos();
  };


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
      loginDlg: false
    });
  };

  handleEditLocation = () => {
    const { selected_location } = this.props;
    const location = {
      pathname: `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}/edit`,
      state: { animation: "left" },
    };
    this.goTo(location);
  }

  handleReportLocation = async (location, reportMsg) => {
    const { authUser } = this.props;

    let report = {
      location_id: location.id,
      report: reportMsg,
      reported_by: authUser.uid,
      approved: true
    };

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }

    this.setWaiting(true);

    gqlservice.set_auth_jwt(token);
    await gqlservice
      .insert_location_report(report)
      .then(result => {
        return gqlservice.map_location_by_id(location.id);
      })
      .then(
        (result) => {
          if (result.data.locations.length > 0) {
            this.props.selectMapLocation(result.data.locations[0]);
          }
          ToastSuccess("The Report was added");
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: location.id.toString(),
      action: ACTIVITY_REPORT,
      object: `the location ${location.name}`,
      fromto: `of the cleanairmap`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      }); 

    this.setWaiting(false);
  }

  _isModerator = (location) => {
    const { loggedIn, authUser } = this.props;
    if (!loggedIn) {
      return false;
    }
    
    // check if the user is a moderator of this location
    if (authUser.locations_moderated.find(
      (moderator) => moderator.approved && moderator.location_id === location.id
    )) {
      return true;
    };
    // check if the user is a moderator of this region
    if (authUser.regions_moderated.find(
      (moderator) => moderator.approved && moderator.region_id === location.region.id
    )) {
      return true;
    };

    return false;
  };

  handleModerateLocation = async (location) => {
    const { authUser } = this.props;

    let moderator = authUser.locations_moderated.find(
      (locaiton_moderator) => locaiton_moderator.location_id === location.id
    );

    if (moderator) {
      if (moderator.approved) {
        ToastInfo("This location has already moderated");
      } else {
        ToastInfo("You've already registered to moderate this location, wait for approve from location moderator.");
      }
      return;
    }

    moderator = {
      user_id: authUser.uid,
      location_id: location.id,
      approved: false,
      approved_by: null,
      approved_at: null
    };

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }

    this.setWaiting(true);

    gqlservice.set_auth_jwt(token);
    await gqlservice
      .insert_map_location_moderator(moderator)
      .then(result => {
        if (result.data.insert_location_moderators.affected_rows === 0) {
          this.setError("Failed to register as a moderator");
          return;
        }
        const location_moderator = result.data.insert_location_moderators.returning[0];
        this.props.insertLocationModerator(location_moderator);
        return gqlservice.map_location_by_id(location.id);
      })
      .then(
        (result) => {
          if (result.data.locations.length > 0) {
            this.props.selectMapLocation(result.data.locations[0]);
          }
          ToastSuccess("Moderation requested, wait for approve");
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    // insert notification
    const notification = {
      type: NOTIFICATION_MAP_LOCATION_APPLY_MODERATOR,
      object: location.id.toString(),
      in_which: "cleanairmap",
      to: location.created_by,
      created_by: authUser.uid
    }

    gqlservice.set_auth_jwt(token, false);
    await gqlservice
      .insert_notification(notification)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: location.id.toString(),
      action: ACTIVITY_APPLY,
      object: `the moderator ${authUser.uid}`,
      fromto: `of the location ${location.name}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      }); 

    this.setWaiting(false);
  }

  handleModerateRegion = async (region) => {
    const { authUser } = this.props;

    // check if the user is the moderator of this region
    let moderator = authUser.regions_moderated.find(
      (region_moderator) => region_moderator.region_id === region.id
    );
    if (moderator) {
      if (moderator.approved) {
        ToastInfo("This region has already moderated");
      } else {
        ToastInfo("You've already registered to moderate this region, wait for approve from region moderator.");
      }
      return;
    }

    moderator = {
      user_id: authUser.uid,
      region_id: region.id,
      approved: false,
      approved_by: null,
      approved_at: null
    };

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }

    this.setWaiting(true);

    gqlservice.set_auth_jwt(token);
    await gqlservice
      .insert_map_region_moderator(moderator)
      .then(
        (result) => {
          if (result.data.insert_region_moderators.affected_rows > 0) {
            ToastSuccess("Moderation requested, wait for approve");
            this.props.insertRegionModerator(moderator);
          } else {
            this.setError("Failed to moderate region");
          }
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    // insert notification
    const notification = {
      type: NOTIFICATION_MAP_REGION_APPLY_MODERATOR,
      object: region.id.toString(),
      in_which: "cleanairmap",
      to: region.created_by,
      created_by: authUser.uid
    }

    gqlservice.set_auth_jwt(token, false);
    await gqlservice
      .insert_notification(notification)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: region.id.toString(),
      action: ACTIVITY_APPLY,
      object: `the moderator ${authUser.uid}`,
      fromto: `of the region ${region.id}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      }); 

    this.setWaiting(false);
  }

  handleResignModerator = async () => {
    const { authUser, selected_location } = this.props;

    // check if the user is the moderator of this location
    let moderator = authUser.locations_moderated.find(
      (location_moderator) => location_moderator.approved && location_moderator.location_id === selected_location.id
    );
    if (!moderator) {
      return;
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.setWaiting(true);

    await gqlservice
      .delete_map_location_moderator(moderator.id)
      .then(
        (result) => {
          this.props.deleteLocationModerator(moderator.id);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_REJECT,
      object: `the moderator ${authUser.uid}`,
      fromto: `of the region ${selected_location.id}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    this.setWaiting(false);
  }

  handleEditComment = (reading) => {
    this.setState({
      ...this.state,
      readingEditDlg: true,
      selectedReading: reading
    });
  }

  handleDeleteComment = async (reading) => {
    const { authUser, selected_location } = this.props;

    if (selected_location.readings.length === 1) {
      ToastInfo("The last reading can't be deleted!");
      return;
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    await gqlservice.set_auth_jwt(token, true);

    this.setWaiting(true);

    await gqlservice.delete_map_reading(reading.id)
      .then(result => {
        let updated_location = selected_location;
        updated_location.readings = updated_location.readings.filter(item => 
          item.id !== reading.id
        );
        this.props.updateMapLocation(updated_location);
      }, reason => {
        this.setError(reason.msg);
        this.setWaiting(false);
        return;
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        this.setWaiting(false);
        return;
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_DELETE,
      object: `the reading ${reading.id}`,
      fromto: `from the location ${selected_location.name}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      }); 

    this.setWaiting(false);
  }

  handleCloseReportReading = () => {
    this.setState({
      ...this.state,
      reportReadingDlg: false,
      selectedReading: null
    });
  }

  handleShareReading = (reading) => {
    this.setState({
      ...this.state,
      shareDlg: true,
      selectedReading: reading
    });
  }

  handleCloseShareReading = () => {
    this.setState({
      ...this.state,
      shareDlg: false,
      selectedReading: null
    });
  }

  handleMakeModerator = async (reading) => {
    const { authUser, selected_location } = this.props;
    
    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    // check if the user is the moderator of this location
    const userId = reading.reading_by;
    const moderator = selected_location.location_moderators.find(moderator => moderator.user.uid === userId);
    if (moderator) {
      if (moderator.approved) {
        return;
      } else {
        const currentTime = new Date().toISOString();
        await gqlservice
          .approve_map_location_moderator(moderator.id, true, userId, currentTime)
          .then(
            (result) => {
              if (result.data.insert_location_moderators.affected_rows > 0) {
                ToastSuccess("Success to make moderator");
                this.props.approveLocationModerator(moderator);
                return;
              } else {
                this.setError("Failed to moderate");
                return;
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
      }
    }

    const currentTime = new Date().toISOString();
    const new_moderator = {
      user_id: reading.reading_by,
      location_id: selected_location.id,
      approved: true,
      approved_by: authUser.uid,
      approved_at: currentTime
    };

    await gqlservice
      .insert_map_location_moderator(new_moderator)
      .then(
        (result) => {
          if (result.data.insert_location_moderators.affected_rows > 0) {
            ToastSuccess("Success to make moderator");
            this.props.insertLocationModerator(new_moderator);
          } else {
            this.setError("Failed to moderate");
          }
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_MAKE,
      object: `the user ${reading.id}`,
      fromto: `from the location ${selected_location.name}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      }); 
  }

  handleBanUser = async () => {

  }

  handleShowReading = () => {
    this.setState({
      ...this.state,
      readingDlg: true
    });
  }

  handleHideReading = () => {
    this.setState({
      ...this.state,
      readingDlg: false,
      readingEditDlg: false
    });
  }

  handleAddReading = async (reading) => {
    const { firebase, authUser, selected_location } = this.props;

    if (!selected_location.op_readings) {
      this.setError("Don't allow to make a reading on this location.");
      return;
    }

    this.setWaiting(true);

    let new_image = "";
    if (reading.imageUpload) {
      const resized_image = await resizeImageFile(reading.imageUpload);
      const result = await firebase.uploadImage(resized_image, "readings");
      if (result.error) {
        this.setError("Failed to upload image.");
        return;
      }
      new_image = result.url;
      const modresult = await moderate_image(new_image);
      console.log("image moderation result :", modresult);
      if (modresult.result) {
        this.setError("Image not allowed, because it contains adults or racy content.");
        await firebase.deleteImage(new_image);
        return;
      }
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.setWaiting(false);
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    const new_reading = {
      location_id: selected_location.id,
      co2: reading.co2,
      ach: reading.ach,
      mask: reading.mask,
      image: new_image ? new_image : reading.image,
      reading_at: reading.readingat,
      reading_by: authUser.uid,
      approved: true
    };
    if (selected_location.op_comments) {
      new_reading.comment = reading.comment;
    }

    await gqlservice
      .insert_map_reading(new_reading)
      .then(
        (result) => {
          let readings = result.data.insert_readings.returning;
          if (readings.length > 0) {
            let updated_location = selected_location;
            updated_location.readings.push(readings[0]);
            this.props.updateMapLocation(updated_location);

            ToastSuccess("The Reading was saved successfully");
            this.setState({
              ...this.state,
              readingDlg: false
            });
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
  }

  handleEditReading = async (reading) => {
    const { firebase, authUser, selected_location } = this.props;

    if (!selected_location.op_readings) {
      this.setError("Don't allow to make a reading on this location.");
      return;
    }

    this.setWaiting(true);

    let new_image = "";
    if (reading.imageUpload) {
      const resized_image = await resizeImageFile(reading.imageUpload);
      const result = await firebase.uploadImage(resized_image, "readings");
      if (result.error) {
        this.setWaiting(false);
        this.setError("Failed to upload image.");
        return;
      }
      new_image = result.url;
      const modresult = await moderate_image(new_image);
      console.log("image moderation result :", modresult);
      if (modresult.result) {
        this.setError("Image not allowed, because it contains adults or racy content.");
        await firebase.deleteImage(new_image);
        return;
      }
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.setWaiting(false);
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    const new_reading = {
      id: reading.id,
      location_id: selected_location.id,
      co2: reading.co2,
      ach: reading.ach,
      mask: reading.mask,
      image: new_image ? new_image : reading.image,
      reading_at: reading.readingat,
      reading_by: authUser.uid,
      approved: true
    };
    if (selected_location.op_comments) {
      new_reading.comment = reading.comment;
    }

    await gqlservice
      .update_map_reading(new_reading)
      .then(
        (result) => {
          let readings = result.data.update_readings.returning;
          if (readings.length > 0) {
            let updated_location = selected_location;
            updated_location.readings = updated_location.readings.map(reading => reading.id === readings[0].id ? readings[0] : reading);
            this.props.updateMapLocation(updated_location);
            this.forceUpdate();

            ToastSuccess("The Reading was saved successfully");
            this.setState({
              ...this.state,
              readingEditDlg: false
            });
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
  }

  handleFlaggedReadings = () => {
    const { selected_location } = this.props;
    const route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}/flaggedreadings`;
    const location = {
      pathname: route,
      state: { animation: "left" },
    };
    this.goTo(location);
  }

  handleProposedReadings = () => {
    const { selected_location } = this.props;
    const route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}/proposedreadings`;
    const location = {
      pathname: route,
      state: { animation: "left" },
    };
    this.goTo(location);
  }

  renderPostWarning = (classes, theme) => {
    return (
      <div className={classes.warningcontainer}>
        <div className={classes.warningimg}>
          <img
            className={classes.warningicon}
            alt="warning"
            src={`/static/images/icons/${theme}/warning.png`}
          />
        </div>
        <Typography className={classes.warningtitle}>
          No posts in the feed yet.
        </Typography>
        <Typography className={classes.warningtext}>
          Press
          <img
            className={classes.indicatoricon}
            alt="plus"
            src={`/static/images/icons/${theme}/add.png`}
          />
          button to post an entry or go to the <strong>sources</strong> tab and add a social media source
        </Typography>
      </div>
    );
  };

  handleSelectMapPost = (article) => {
    const { selected_location } = this.props;
    this.props.selectMapPost(article);

    let path = `/${ROUTES.CLEANAIRMAP}/${selected_location.id}/p/${article.nid}`;
    const location = {
      pathname: path,
      state: { animation: "left" },
    };
    this.goTo(location);
  }

  handleReportMapPost = async (article, reportMsg) => {
    const { authUser, selected_location } = this.props;

    let source_id = "";
    if (article.branch === ARTICLE_BRANCH_MAPPOST_TWITTER) {
      source_id = "cleanairmap-twitter-post";
    } else if (article.branch === ARTICLE_BRANCH_MAPPOST_INSTAGRAM) {
      source_id = "cleanairmap-instagram-post";
    } else {
      return 
    }

    let report = {
      id: uuid(),
      article_id: article.nid,
      source_id: source_id,
      report: reportMsg,
      reported_by: authUser.uid,
      approved: true,
    };

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }

    this.setWaiting(true);

    gqlservice.set_auth_jwt(token);
    await gqlservice
      .insert_article_report(report)
      .then(
        (result) => {},
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
        this.setWaiting(false);
      });

    // log this activity
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_REPORT,
      object: `the report ${reportMsg}`,
      fromto: `to map post ${article.title}`,
      reason: "",
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(
        (result) => {
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    this.setWaiting(false);
  }

  handleSaveMapPost = async (article) => {
    const { authUser } = this.props;

    this.setWaiting(true);

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      this.setWaiting(false);
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

  handleDeleteSavedMapPost = async () => {

  }

  handleFlaggedPosts = () => {
    const { selected_location } = this.props;
    const route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}/flaggedposts`;
    const location = {
      pathname: route,
      state: { animation: "left" },
    };
    this.goTo(location);
  }

  handleProposedPosts = () => {
    const { selected_location } = this.props;
    const route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}/proposedposts`;
    const location = {
      pathname: route,
      state: { animation: "left" },
    };
    this.goTo(location);
  }

  handleFlaggedModerators = () => {
    const { selected_location } = this.props;
    const route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}/flaggedmoderators`;
    const location = {
      pathname: route,
      state: { animation: "left" },
    };
    this.goTo(location);
  };

  handleReportModerator = async (moderator, reportMsg) => {
    const { selected_location, authUser } = this.props;

    let report = {
      id: uuid(),
      moderator_id: moderator.user.uid,
      location_id: selected_location.id,
      report: reportMsg,
      reported_by: authUser.uid,
      approved: true,
    };

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }

    this.setWaiting(true);

    gqlservice.set_auth_jwt(token);
    await gqlservice
      .insert_moderator_report(report)
      .then(
        (result) => {},
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_REPORT,
      object: `the moderator ${moderator.user.username}`,
      fromto: `of the location ${selected_location.name}`,
      reason: "",
    };
    gqlservice.set_auth_jwt(token, false);
    await gqlservice
      .insert_activitylog(activity)
      .then(
        (result) => {
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  handleApproveModerator = async (moderator) => {
    const { selected_location, authUser } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    const currentTime = new Date().toISOString();

    this.setWaiting(true);

    gqlservice.set_auth_jwt(token, true);
    await gqlservice
      .approve_map_location_moderator(moderator.id, true, authUser.uid, currentTime, moderator.owner)
      .then(
        (result) => {
          this.props.approveLocationModerator(moderator);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    // insert notification
    const notification = {
      type: NOTIFICATION_MAP_LOCATION_APPROVE,
      object: selected_location.id.toString(),
      in_which: null,
      to: moderator.user.uid,
      created_by: authUser.uid
    }

    gqlservice.set_auth_jwt(token, false);
    await gqlservice
      .insert_notification(notification)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_APPROVE,
      object: `the moderator ${moderator.user.username}`,
      fromto: `of the location ${selected_location.name}`,
      reason: "",
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(
        (result) => {
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    const location = await this.getLocationModerates(selected_location);
    this.props.selectMapLocation(location);

    this.setWaiting(false);
    this.forceUpdate();
  };

  handleDeleteModerator = async (moderator) => {
    const { authUser, selected_location } = this.props;
    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.setWaiting(true);

    await gqlservice
      .delete_map_location_moderator(moderator.id)
      .then(
        (result) => {
          this.props.deleteLocationModerator(moderator.id);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id,
      action: ACTIVITY_DELETE,
      object: `the moderator ${moderator.user.username}`,
      fromto: `from the location ${selected_location.name}`,
      reason: "",
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(
        (result) => {
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    const location = await this.getLocationModerates(selected_location);
    this.props.selectMapLocation(location);

    this.setWaiting(false);
    this.forceUpdate();
  };

  handleMakeOwner = async (moderator) => {
    const { authUser, selected_location } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    const currentTime = new Date().toISOString();

    this.setWaiting(true);

    gqlservice.set_auth_jwt(token, true);
    await gqlservice
      .approve_map_location_moderator(moderator.id, true, authUser.uid, currentTime)
      .then(
        (result) => {
          this.props.makeLocationOwner(moderator.id);
          this.props.giveupLocationOwnerUser(selected_location);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id,
      action: ACTIVITY_MAKE,
      object: `the moderator ${moderator.user.username}`,
      fromto: `as an owner of the location ${selected_location.name}`,
      reason: "",
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(
        (result) => {
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    const location = await this.getLocationModerates(selected_location);
    this.props.selectMapLocation(location);

    this.setWaiting(false);
    this.forceUpdate();
  }

  handleViewLog = async () => {
  }

  handleClickSettings = () => {
    const { selected_location } = this.props;
    const route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}/settings`;
    const location = {
      pathname: route,
      state: { animation: "left" },
    };
    this.goTo(location);
  };


  render() {
    const {
      classes,
      loggedIn,
      selected_location,
      map_posts,
      locationtab,
      theme_mode,
      requesting,
    } = this.props;
    const {
      loginDlg,
      readingDlg,
      readingEditDlg,
      shareDlg,
      selectedReading
    } = this.state;

    if (selected_location === null) {
      return <div></div>;
    }

    let shareUrl = "";
    if (typeof window !== "undefined") {
      shareUrl = window.location.protocol + "//" + window.location.host;
    }
    shareUrl += `/${ROUTES.FEEDS_PREFIX}/${selected_location.slug}`;

    let shareInfo = {
      title: "Raven Location: " + selected_location.name,
      description: selected_location.description,
      image: "",
      hashtag: "",
      url: shareUrl,
    };

    // layout variables
    const width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    const isDesktop = width > MAX_WINDOW_WIDTH;
    // const isTablet =
    //   width >= MIN_TABLET_WIDTH &&
    //   width <= MAX_WINDOW_WIDTH;
    const isMobile = width < MIN_TABLET_WIDTH;
    const innerWidth =
      width > MAX_WINDOW_WIDTH
        ? MAX_WINDOW_WIDTH
        : width;
    let srclistWidth = Math.floor(innerWidth / 418) * 418 + 16;
    if (isMobile) {
      srclistWidth = MAX_CARD_WIDTH;
    }
    if (width < MAX_CARD_WIDTH) {
      srclistWidth = width;
    }
    if (width < MIN_CARD_WIDTH) {
      srclistWidth = MIN_CARD_WIDTH;
    }

    // card width = 414 - 16, grid space
    // const masonryWidth = Math.floor(innerWidth / 402) * 402 + 16;

    let addbuttonPos = 0;
    if (isDesktop) {
      addbuttonPos = MAX_WINDOW_WIDTH - 96 + (width - MAX_WINDOW_WIDTH) / 2;
    } else if (innerWidth > MAX_CARD_WIDTH) {
      addbuttonPos = (innerWidth + MAX_CARD_WIDTH) / 2 - 96;
    } else {
      addbuttonPos = innerWidth - 96;
    }

    // share reading information
    let shareReadingInfo = null;
    if (shareDlg && selectedReading) {
      let shareReadingUrl = "";
      if (typeof window !== "undefined") {
        shareReadingUrl = window.location.protocol + "//" + window.location.host;
      }
      shareReadingUrl += `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}/readings/${selectedReading.id}`;

      const locationType = CONF_LOCATION_TYPES.find(
        (loctype) => loctype.value === selected_location.type
      );

      shareReadingInfo = {
        title: "Raven Clean Air Map: " + selected_location.name,
        description: selectedReading.comment,
        image: `/static/images/icons/${theme_mode}/${locationType.image}`,
        hashtag: "",
        url: shareReadingUrl,
      };
    }

    // let nonapproved_reports = [];
    // if (selected_location.location_reports) {
    //   nonapproved_reports = selected_location.location_reports.filter(report => !report.approved);
    // } 
    let nonapproved_readings = [];
    if (selected_location.readings) { 
      nonapproved_readings = selected_location.readings.filter(reading => !reading.approved);
    }
    let nonapproved_reading_reports = [];
    if (selected_location.reading_reports) { 
      nonapproved_reading_reports = selected_location.reading_reports.filter(reading => !reading.approved);
    }
    let nonapproved_article_reports = [];
    if (selected_location.article_reports) {
      nonapproved_article_reports = selected_location.article_reports.filter(report => !report.approved);
    }
    // let nonapproved_moderators = [];
    // if (selected_location.location_moderators) {
    //   nonapproved_moderators = selected_location.location_moderators.filter(moderator => !moderator.approved);
    // }
    let nonapproved_moderator_reports = [];
    if (selected_location.moderator_reports) {
      nonapproved_moderator_reports = selected_location.moderator_reports.filter(report => !report.approved);
    }
    const location_moderators = selected_location.location_moderators ? selected_location.location_moderators : [];

    const sorted_readings = selected_location.readings.sort((a, b) => b.id - a.id);

    return (
      <div className={classes.root}>
        <div className="wrapper">
          <MetaTags>
            <title>{`Raven: ${selected_location.name}`}</title>
            <meta name="description" content={selected_location.description} />
            <meta property="og:title" content={`Raven: ${selected_location.name}`} />
            <meta property="og:description" content={selected_location.description} />
            <meta property="og:site_name" content="Raven App" />
            <meta property="og:url" content={shareUrl} />
            <meta property="twitter:title" content={`Raven: ${selected_location.name}`} />
            <meta property="twitter:site" content="Raven App" />
            <meta property="twitter:description" content={selected_location.description} />
            <meta property="twitter:image:alt" content={selected_location.name} />
            <meta property="twitter:domain" content="ravenapp.org" />
          </MetaTags>
        </div>
        <div className={classes.appbar}>
          <MainAppBar
            title={"Location"}
            share_info={shareInfo}
            onNavBack={this.handleNavBack}
          />
        </div>
        <div className={classes.maincontainer}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            >
            <Grid item>
              <LocationCard
                // location={selected_location}
                reading={sorted_readings[0]}
                onLogin={this.handleLogin}
                onEdit={this.handleEditLocation}
                onReport={this.handleReportLocation}
                onModerate={this.handleModerateLocation}
                onModerateRegion={this.handleModerateRegion}
                onResign={this.handleResignModerator}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <LocationTabs
                theme_mode={theme_mode}
                onChangeTab={this.handleChangeTab}
              />
            </Grid>
          </Grid>
        </div>

        <SwipeableViews index={locationtab} onChangeIndex={this.handleSwiped} enableMouseEvents>
          <div className={classes.tabcontainer}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              {selected_location.approved && (
                <Grid item>
                  <ReadingButtons
                    theme={theme_mode}
                    flagged={nonapproved_reading_reports.length}
                    proposed={nonapproved_readings.length}
                    onFlagged={this.handleFlaggedReadings}
                    onProposed={this.handleProposedReadings}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid item>
                    {sorted_readings.map((reading, index) => 
                      <ReadingItemMod
                        theme={theme_mode}
                        reading={reading}
                        index={index}
                        onEdit={this.handleEditComment}
                        onDelete={this.handleDeleteComment}
                        onShare={this.handleShareReading}
                        onMakeModerator={this.handleMakeModerator}
                        onBanUser={this.handleBanUser}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.bottomspace}></div>
          </div>
          <div className={classes.tabcontainer}>
            {/* {(isDesktop || isTablet) && (
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Grid item>
                  {map_posts.length === 0 && !requesting &&
                    this.renderPostWarning(classes, theme_mode)}
                  {map_posts.length > 0 && (
                    <ArticleMasonry
                      width={masonryWidth}
                      articles={map_posts}
                      pins={pins2show}
                      movetops={movetops2show}
                      onNeedMore={this.handleNeedMore}
                      onSelectArticle={this.handleSelectMapPost}
                      onSelectGroupArticle={this.handleSelectGroupArticle}
                      onNeedLogin={this.handleLogin}
                      onReport={this.handleReportMapPost}
                      onClickSource={this.handleClickSourceInArticle}
                      onClickFeed={this.handleClickFeed}
                    />
                  )}
                </Grid>
              </Grid>
            )}
            {isMobile && ( */}
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
                {selected_location.approved && (
                  <Grid item>
                    <PostButtons
                      theme={theme_mode}
                      flagged={nonapproved_article_reports.length}
                      proposed={0}
                      onFlagged={this.handleFlaggedPosts}
                      onProposed={this.handleProposedPosts}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      {map_posts.length === 0 && !requesting &&
                        this.renderPostWarning(classes, theme_mode)}
                      {map_posts.length > 0 && (
                        <MapPostList
                          articles={map_posts}
                          onNeedMore={this.handleNeedMore}
                          onSelectMapPost={this.handleSelectMapPost}
                          onNeedLogin={this.handleLogin}
                          onReport={this.handleReportMapPost}
                          onSave={this.handleSaveMapPost}
                          onDeleteSaved={this.handleDeleteSavedMapPost}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            {/* )} */}
          </div>
          <div className={classes.tabcontainer}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              {selected_location.approved && (
                <Grid item>
                  <ModButtons
                    theme={theme_mode}
                    flagged={nonapproved_moderator_reports.length}
                    newlogs={selected_location.new_logs?.length}
                    logs={selected_location.logs?.length}
                    onFlagged={this.handleFlaggedModerators}
                    onViewLog={this.handleViewLog}
                    onSettings={this.handleClickSettings}
                  />
                </Grid>
              )}
              {location_moderators.length > 0 && (
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <ModeratorList
                        width={srclistWidth}
                        theme={theme_mode}
                        moderators={location_moderators}
                        onReport={this.handleReportModerator}
                        onApprove={this.handleApproveModerator}
                        onDelete={this.handleDeleteModerator}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </div>
        </SwipeableViews>
        {locationtab === TAB_LOC_READINGS && loggedIn && (
          <div>
            <div onClick={e => this.handleShowReading()}>
              <img
                className={classes.addbutton}
                style={{ left: addbuttonPos, bottom: 16 }}
                alt={"addReading"}
                src={`/static/images/icons/${theme_mode}/add.png`}
              />
            </div>
            <DlgReading
              open={readingDlg}
              loggedIn={loggedIn}
              title={"Add a Reading"}
              theme={theme_mode}
              onSave={this.handleAddReading}
              onCancel={this.handleHideReading}
            />
            <DlgReading
              open={readingEditDlg}
              loggedIn={loggedIn}
              title={"Edit Reading"}
              theme={theme_mode}
              reading={selectedReading}
              onSave={this.handleEditReading}
              onCancel={this.handleHideReading}
            />
          </div>
        )}

        <DlgLoginConfirm
          open={loginDlg}
          onLogin={this.handleLogin}
          onCancel={this.handleCancelLogin}
        />
        { shareDlg &&
          <DlgShare
            open={shareDlg}
            shareInfo={shareReadingInfo}
            onClose={this.handleCloseShareReading}
          />
        }
        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

CleanAirLocation.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting,
  locationtab: state.mapState.locationtab,
  locations: state.mapState.locations,
  selected_location: state.mapState.selected_location,
  cleanair_values: state.mapState.cleanair_values,
  map_posts: state.mapState.map_posts,
  map_posts_last_offset: state.mapState.map_posts_last_offset
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withAuthentication,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirLocation);

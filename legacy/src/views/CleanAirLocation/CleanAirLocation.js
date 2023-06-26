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
  ReadingItem,
  DlgReading,
  DlgShare,
  DlgReport,
} from "components";
import {
  MainAppBar,
  LocationTabs,
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
  ACTIVITY_APPLY,
  ACTIVITY_REPORT
} from "constants/activity";
import { 
  NOTIFICATION_MAP_LOCATION_APPLY_MODERATOR, NOTIFICATION_MAP_REGION_APPLY_MODERATOR 
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
      shareDlg: false,
      reportReadingDlg: false,
      selectedReading: null
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleClickBackButton = this.handleClickBackButton.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleCancelLogin = this.handleCancelLogin.bind(this);

    this.handleReportLocation = this.handleReportLocation.bind(this);
    this.handleModerateLocation = this.handleModerateLocation.bind(this);
    this.handleModerateRegion = this.handleModerateRegion.bind(this);

    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleSwiped = this.handleSwiped.bind(this);

    this.showReportReading = this.showReportReading.bind(this);
    this.handleReportReading = this.handleReportReading.bind(this);
    this.handleCloseReportReading = this.handleCloseReportReading.bind(this);

    this.handleShareReading = this.handleShareReading.bind(this);
    this.handleCloseShareReading = this.handleCloseShareReading.bind(this);

    this.handleShowReading = this.handleShowReading.bind(this);
    this.handleSaveReading = this.handleSaveReading.bind(this);
    this.handleHideReading = this.handleHideReading.bind(this);

    this.handleNeedMore = this.handleNeedMore.bind(this);
    this.handleSelectMapPost = this.handleSelectMapPost.bind(this);
    this.handleReportMapPost = this.handleReportMapPost.bind(this);

    this.handleSaveMapPost = this.handleSaveMapPost.bind(this);
    this.handleDeleteSavedMapPost = this.handleDeleteSavedMapPost.bind(this);
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
      this.props.selected_location
        ? this.props.selected_location.slug
        : match.params.slug;
    if (!location_slug) {
      this.setWaiting(false);
      return;
    }

    await this.getLocationInfo(location_slug);

    const { selected_location } = this.props;

    // go to the moderation page if the user is the moderator of this location
    if (this._isLocationModerator(selected_location)) {
      const route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}`;
      const location = {
        pathname: route,
        state: { animation: "left" },
      };
      this.props.history.push(location);
      this.setWaiting(false);
      return;
    }

    // non-moderators can't access non-approved locations
    if (!selected_location.approved) {
      this.setAuthorizeError("The users can't access non-approved locations!");
      return;  
    }
  
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
      if (this._isLocationModerator(selected_location)) {
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

  handleReportLocation = async (location, reportMsg) => {
    const { loggedIn, authUser } = this.props;

    if (!loggedIn) {
      this.handleLogin();
      return;
    }
    
    let report = {
      location_id: location.id,
      report: reportMsg,
      reported_by: authUser.uid,
      approved: false
    };

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }

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
  }

  _isLocationModerator = (location) => {
    const { loggedIn, authUser } = this.props;
    if (!loggedIn) {
      return false;
    }

    // check if the user is the moderator of this location
    return authUser.locations_moderated.find(
      (moderator) => moderator.approved && moderator.location_id === location.id
    ) !== undefined;
  };

  handleModerateLocation = async (location) => {
    const { loggedIn, authUser } = this.props;

    if (!loggedIn) {
      this.handleLogin();
      return;
    }

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
      object: `the location ${location.name}`,
      fromto: `to cleanair map`,
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

  handleModerateRegion = async (region) => {
    const { loggedIn, authUser } = this.props;

    if (!loggedIn) {
      this.handleLogin();
      return;
    }

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
          if (result.data.insert_region_moderators.affected_rows === 0) {
            this.setError("Failed to register as a moderator");
            return;
          }
          const region_moderator = result.data.insert_region_moderators.returning[0];
          this.props.insertRegionModerator(region_moderator);
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
      object: `the region ${region.id}`,
      fromto: `to cleanair map`,
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

  showReportReading = (reading) => {
    this.setState({
      ...this.state,
      reportReadingDlg: true,
      selectedReading: reading
    });
  }

  handleReportReading = async (reportMsg) => {
    const { loggedIn, authUser, selected_location } = this.props;
    const { selectedReading } = this.state;

    if (!loggedIn) {
      this.handleLogin();
      return;
    }

    let report = {
      reading_id: selectedReading.id,
      location_id: selectedReading.location_id,
      report: reportMsg,
      reported_by: authUser.uid,
      approved: false
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
      .insert_reading_report(report)
      .then(result => {
        return gqlservice.map_location_by_id(selectedReading.location_id);
      })
      .then(
        (result) => {
          if (result.data.locations.length > 0) {
            this.props.selectMapLocation(result.data.locations[0]);
          }
          ToastSuccess("The Report was added");
          this.handleCloseReportReading();
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
      action: ACTIVITY_REPORT,
      object: `the report ${reportMsg}`,
      fromto: `to location ${selected_location.name}`,
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

  handleShowReading = () => {
    this.setState({
      ...this.state,
      readingDlg: true
    });
  }

  handleHideReading = () => {
    this.setState({
      ...this.state,
      readingDlg: false
    });
  }

  handleSaveReading = async (reading) => {
    const { firebase, loggedIn, authUser, selected_location } = this.props;

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
      const modresult = moderate_image(new_image);
      console.log("image moderation result :", modresult);
      if (modresult.result) {
        this.setError("Image not allowed, because it contains adults or racy content.");
        await firebase.deleteImage(new_image);
        return;
      }
    }

    let new_reading = {
      location_id: selected_location.id,
      co2: reading.co2,
      ach: reading.ach,
      mask: reading.mask,
      image: new_image ? new_image : reading.image,
      reading_at: reading.readingat,
      reading_by: loggedIn ? authUser.uid : "anonymous",
      approved: loggedIn // should be changed
    };
    if (loggedIn && selected_location.op_comments) {
      new_reading.comment = reading.comment;
    }

    const gqlservice = new GraphqlService();
    if (loggedIn) {
      const token = await this._getAuthToken();
      if (!token) {
        this.setWaiting(false);
        this.handleLogin();
        return;
      }
      gqlservice.set_auth_jwt(token);
    }

    await gqlservice
      .insert_map_reading(new_reading)
      .then(
        (result) => {
          let readings = result.data.insert_readings.returning;
          // console.log("readings :", readings);
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

    let path = `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.id}/p/${article.nid}`;
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
      approved: false,
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
      shareDlg,
      reportReadingDlg,
      selectedReading
    } = this.state;

    if (!selected_location) {
      return <div></div>;
    }

    let shareUrl = "";
    if (typeof window !== "undefined") {
      shareUrl = window.location.protocol + "//" + window.location.host;
    }
    shareUrl += `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}`;

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
    // const isMobile = width < MIN_TABLET_WIDTH;
    const innerWidth =
      width > MAX_WINDOW_WIDTH
        ? MAX_WINDOW_WIDTH
        : width;

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
                onReport={this.handleReportLocation}
                onModerate={this.handleModerateLocation}
                onModerateRegion={this.handleModerateRegion}
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
              <Grid item>
                {sorted_readings.map((reading, index) => 
                  <ReadingItem
                    theme={theme_mode}
                    reading={reading}
                    index={index}
                    onReport={this.showReportReading}
                    onShare={this.handleShareReading}
                  />
                )}
              </Grid>
            </Grid>
            <div className={classes.bottomspace}></div>
          </div>
          <div className={classes.tabcontainer}>
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
              onSave={this.handleSaveReading}
              onCancel={this.handleHideReading}
            />
          </div>
        )}
        {locationtab === TAB_LOC_MODERATORS && (
          <div>
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
        { reportReadingDlg &&
          <DlgReport
            open={reportReadingDlg}
            title={"Report Reading"}
            theme={theme_mode}
            onReport={this.handleReportReading}
            onCancel={this.handleCloseReportReading}
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

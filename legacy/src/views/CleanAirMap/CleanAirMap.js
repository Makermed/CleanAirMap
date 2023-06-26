import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MetaTags from 'react-meta-tags';
import { ToastContainer } from "react-toastify";
import { geolocated } from "react-geolocated";
import { withFirebase } from 'services';
import { withAuthentication } from "session";
import {
  CleanairAppBar,
  LocationList,
  MapBottomNavBar,
  DlgLoginConfirm,
  WaitingDialog,
} from "components";
import {
  MapView
} from "./components";
import * as ROUTES from "constants/routes";
import { GraphqlService } from "services";
import { 
  LOCATION_TYPE_ALL,
  MASK_ALL,
  AIR_QUALITY_BAD,
  AIR_QUALITY_GOOD,
  AIR_QUALITY_MEDIUM,
  MAP_VIEW_ALL,
  MAP_VIEW_90D,
} from "constants/maplocation";
import {
  MAX_ARTICLE_WIDTH
} from "constants/types";
import { 
  ACTIVITY_TYPE_CLEANAIRMAP,
  ACTIVITY_REPORT,
  ACTIVITY_APPLY,
  ACTIVITY_REJECT
} from "constants/activity";
import { 
  NOTIFICATION_MAP_LOCATION_APPLY_MODERATOR,
  NOTIFICATION_MAP_REGION_APPLY_MODERATOR
} from "constants/notification";
import { 
  ToastSuccess,
  ToastInfo,
  ToastError 
} from "utility/toast";
import { get_air_quality } from "utility/cleanair";


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
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
  mapview: {
  },
  locations: {
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.background.default,
  },
  spacing: {
    height: "64px",
    minHeight: "64px",
  }
});

class CleanAirMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map_view_mode: MAP_VIEW_ALL,
      notifications: 0,
      loginDlg: false,
      mask: MASK_ALL,
      locationtype: LOCATION_TYPE_ALL,
      qualities: [AIR_QUALITY_GOOD, AIR_QUALITY_MEDIUM, AIR_QUALITY_BAD],
      selected_locations: []
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleCancelLogin = this.handleCancelLogin.bind(this);

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleHelp = this.handleHelp.bind(this);
    this.handleComments = this.handleComments.bind(this);
    this.handleProfileMenu = this.handleProfileMenu.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    
    this.handleNeedMore = this.handleNeedMore.bind(this);
    this.handleReportLocation = this.handleReportLocation.bind(this);
    this.handleModerateLocation = this.handleModerateLocation.bind(this);
    this.handleModerateRegion = this.handleModerateRegion.bind(this);
    this.handleResign = this.handleResign.bind(this);

    this.handleClickLocation = this.handleClickLocation.bind(this);
    this.handleSearchedLocation = this.handleSearchedLocation.bind(this);
    this.handleClickMap = this.handleClickMap.bind(this);
    this.handleChangeMap = this.handleChangeMap.bind(this);
    this.handleChangeMapViewMode = this.handleChangeMapViewMode.bind(this);
    this.handleEditLocation = this.handleEditLocation.bind(this);

    this.handleChangeMask = this.handleChangeMask.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
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
    const { map } = this.props;
    
    window.scroll(0, 0);
    await this.getLocations(map.center_lng, map.center_lat, map.bounds);

    // get notifications if there are moderated locations
    const notifications = await this.getNotifications();
    this.setState({
      ...this.state,
      notifications: notifications
    });
    
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

  handleCancelLogin = () => {
    this.setState({
      ...this.state,
      loginDlg: false,
    });
  }

  getLocations = async (center_lng, center_lat, bounds) => {
    const { map_view_mode } = this.state;

    let lng_min = null;
    let lng_max = null;
    let lat_min = null;
    let lat_max = null;
    if (!bounds) {
      lng_min = center_lng - 0.05;
      lng_max = center_lng + 0.05;
      lat_min = center_lat - 0.05;
      lat_max = center_lat + 0.05;
    } else {
      lng_min = bounds[0];
      lat_min = bounds[1];
      lng_max = bounds[2];
      lat_max = bounds[3];
    }
    // console.log("box :", lng_min, lng_max, lat_min, lat_max);

    const gqlservice = new GraphqlService();
    if (map_view_mode === MAP_VIEW_ALL) {
      await gqlservice
      .map_locations_by_box(lng_min, lng_max, lat_min, lat_max)
      .then(
        (result) => {
          const locations = result.data.locations;
          const regions = locations.map(location => location.region)
              .filter((location, index, a) => a.findIndex(location2 => (location2.id === location.id)) === index);
          // console.log("regions & locations :", regions, locations);
          if (regions.length > 0) {
            this.props.setMapRegions(regions);
          }
          if (locations.length > 0) {
            this.props.setMapLocations(locations);
            this.setState({
              ...this.state,
              selected_locations: locations
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
    } else {
      // show only previous 90 day's log
      const timestamp = new Date() - 86400 * 90 * 1000;
      const dday = new Date(timestamp).toISOString();
      await gqlservice
      .map_locations_by_box_dday(lng_min, lng_max, lat_min, lat_max, dday)
      .then(
        (result) => {
          const locations = result.data.locations;
          const regions = locations.map(location => location.region)
              .filter((location, index, a) => a.findIndex(location2 => (location2.id === location.id)) === index);
          // console.log("regions & locations :", regions, locations);
          if (regions.length > 0) {
            this.props.setMapRegions(regions);
          }
          if (locations.length > 0) {
            this.props.setMapLocations(locations);
            this.setState({
              ...this.state,
              selected_locations: locations
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
    }

    // const { authUser } = this.props;
    // console.log("authUser :", authUser);
    // let location_ids = [];
    // for (let item of authUser.locations_moderated) {
    //   location_ids.push(item.location_id);
    // }
    // console.log("location_ids :", location_ids);

    // for (let item of authUser.regions_moderated) {
    //   const locations = await this.getLocationsInRegion(item.region_id);
    //   for (let item of locations) {
    //     location_ids.push(item.id)
    //   }
    // }
    // console.log("location ids :", location_ids);

    // let total_count = 0;
    // for (let location_id of location_ids) {
    //   const moderation_count = await this.getLocationModeratesCount(location_id);
    //   console.log("mod count :", moderation_count);
    //   total_count += moderation_count;
    // }

    // console.log("moderation count :", total_count);
  }

  getNotifications = async () => {
    const { loggedIn, authUser } = this.props;
    if (!loggedIn) {
      return 0;
    }

    console.log("authUser :", authUser);
    let location_ids = [];
    for (let item of authUser.locations_moderated) {
      location_ids.push(item.location_id);
    }
    // console.log("location_ids :", location_ids);

    for (let item of authUser.regions_moderated) {
      const locations = await this.getLocationsInRegion(item.region_id);
      for (let item of locations) {
        location_ids.push(item.id)
      }
    }
    // console.log("location ids :", location_ids);

    let total_count = 0;
    for (let location_id of location_ids) {
      const moderation_count = await this.getLocationModeratesCount(location_id);
      total_count += moderation_count;
    }

    console.log("moderation count :", total_count);
    return total_count;
  }

  getLocationsInRegion = async (region_id) => {
    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    let locations = [];

    await gqlservice
      .map_locations_by_region(region_id)
      .then(
        (result) => {
          locations = result.data.locations.slice();
        },
        (reason) => {
          this.setError(reason.msg);
          return locations;
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
        return locations;
      });

    return locations;
  }

  getLocationModeratesCount = async (location_id) => {

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    let moderation_count = 0;

    await gqlservice
      .location_moderation_count(location_id)
      .then(
        (result) => {
          moderation_count += result.data.readings_aggregate.aggregate.count;
          moderation_count += result.data.reading_reports_aggregate.aggregate.count;
          moderation_count += result.data.article_reports_aggregate.aggregate.count;
          moderation_count += result.data.location_moderator_reports_aggregate.aggregate.count;
        },
        (reason) => {
          this.setError(reason.msg);
          return 0;
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
        return 0;
      });

    return moderation_count;
  };


  handleNavBack = () => {
    // this.props.history.goBack();
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  };

  handleHelp = () => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP_TUTORIAL,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  }

  handleComments = () => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP_COMMENTS,
      state: { animation: "right" },
    };
    // this.props.history.push(location);
  }

  handleProfileMenu = (route) => {
    const location = {
      pathname: route,
      state: { animation: "left" },
    };
    if (route === ROUTES.SIGN_IN) {
      this.props.setLoginBackRoute(ROUTES.CLEANAIRMAP);
    }
    this.props.history.push(location);
  };

  handleSignOut = async () => {
    await this.props.firebase.doSignOut();
    await this.props.signOut();
  };


  _isModerator = (location) => {
    const { loggedIn, authUser } = this.props;
    if (!loggedIn) {
      return false;
    }
    
    // check if the user is a moderator of this location
    if (authUser.locations_moderated.find(
      (moderator) => moderator.approved && moderator.location_id === location.id
    ) !== undefined) {
      return true;
    };
    // check if the user is a moderator of this region
    if (authUser.regions_moderated.find(
      (moderator) => moderator.approved && moderator.region_id === location.region.id
    ) !== undefined) {
      return true;
    };

    return false;
  };

  handleClickLocation = (location) => {
    this.props.selectMapLocation(location);

    let route = `/${ROUTES.CLEANAIRMAP_PREFIX}/${location.slug}`;
    if (this._isModerator(location)) {
      route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.CLEANAIRMAP_PREFIX}/${location.slug}`;
    }
    this.props.history.push({
      pathname: route,
      state: { animation: "left" },
    });
  }

  handleSearchedLocation = (location) => {
    const { locations } = this.props;
    const exist_location = locations.find(item => 
      item.name === location.name && item.address === location.address
    );

    this.props.setMapCenterPos(location.longitude, location.latitude);

    if (exist_location) {
      this.handleClickLocation(exist_location);
    } else {
      this.handleClickMap({
        lat: location.latitude,
        lng: location.longitude
      });
    }
  }

  handleClickMap = (coordinate) => {
    const { loggedIn } = this.props;
    
    if (!loggedIn) {
      this.setState({
        ...this.state,
        loginDlg: true
      });
      return;
    }

    this.props.setLocationGeoPos(coordinate.lng, coordinate.lat);

    this.props.history.push({
      pathname: ROUTES.CLEANAIRMAP_ADD,
      state: { animation: "left" },
    });
  }

  handleChangeMap = async (lng, lat, zoom, bounds) => {
    this.props.setMapParams(lng, lat, zoom, bounds);
    // const mapParams = {
    //   center_lng: lng,
    //   center_lat: lat,
    //   zoom: zoom,
    //   bounds: bounds
    // };
    // localStorage.setItem('mapParams', JSON.stringify(mapParams));

    await this.getLocations(lng, lat, bounds);
  }

  handleChangeMapViewMode = async() => {
    const { map_view_mode } = this.props;
    let new_mode = map_view_mode === MAP_VIEW_ALL ? MAP_VIEW_90D : MAP_VIEW_ALL;
    // console.log("new map view mode :", new_mode);
    this.setState({
      ...this.state,
      map_view_mode: new_mode
    }, this.forceUpdate());
    this.props.setMapViewMode(new_mode);
  }

  handleEditLocation = (location) => {
    this.props.selectMapLocation(location);

    let route = `/${ROUTES.CLEANAIRMAP_PREFIX}/${location.slug}/edit`;
    this.props.history.push({
      pathname: route,
      state: { animation: "left" },
    });
  }

  handleNeedMore = () => {

  }

  handleReportLocation = async (location, reportMsg) => {
    const { loggedIn, authUser } = this.props;

    if (!loggedIn) {
      this.handleLogin();
      return;
    }
    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }

    let report = {
      location_id: location.id,
      report: reportMsg,
      reported_by: authUser.uid,
      approved: false
    };

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

  handleResign = async (location) => {
    const { authUser } = this.props;

    // check if the user is the moderator of this location
    let moderated = authUser.locations_moderated.find(
      (moderator) => moderator.approved && moderator.location_id === location.id
    );
    if (!moderated) {
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
      .delete_map_location_moderator(moderated.id)
      .then(
        (result) => {
          this.props.deleteLocationModerator(moderated.id);
          return gqlservice.map_location_by_id(location.id)
        }
      )
      .then(
        (result) => {
          if (result.data.locations.length > 0) {
            this.props.selectMapLocation(result.data.locations[0]);
          }
          ToastSuccess("Moderation resigned");
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
      action: ACTIVITY_REJECT,
      object: `the moderator ${authUser.uid}`,
      fromto: `of the region ${location.id}`,
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

  handleChangeQualities = (qualities) => {
    this.setState({
      ...this.state,
      qualities: qualities
    });
  }

  handleChangeMask = (mask) => {
    if (mask !== this.state.mask) {
      this.setState({
        ...this.state,
        mask: mask
      });
    }
  }

  handleChangeType = (locationtype) => {
    if (locationtype !== this.state.locationtype) {
      this.setState({
        ...this.state,
        locationtype: locationtype
      });
    }
  }

  render() {
    const {
      classes,
      theme_mode,
      map,
      locations,
      requesting
    } = this.props;
    const {
      loginDlg,
      mask,
      notifications,
      map_view_mode,
      locationtype,
      qualities,
      selected_locations
    } = this.state;

    let url = "";
    if (typeof window !== "undefined") {
      url = window.location.protocol + "//" + window.location.host;
    }
    url += `${ROUTES.CLEANAIRMAP}`;

    const title = "Raven: CleanAir Map";
    const description = "The Clean Air Map is a module to crowdsource air quality measurements to ensure indoor spaces are safe from spread of Covid-19";
    const image = "";

    let locations2show = selected_locations;
    // filter by mode
    if (map_view_mode !== MAP_VIEW_ALL) {
      const dt = new Date() - 86400 * 90 * 1000;
      locations2show = selected_locations.filter(location => Date.parse(location.created_at) >= dt);
    }

    // filter by air quality
    locations2show = locations2show.filter(location => {
      const air_quality = get_air_quality(location);
      return qualities.find(quality => quality === air_quality) !== undefined;
    });

    // filter by mask
    if (mask !== MASK_ALL) {
      locations2show = locations2show.filter(location => {
        try {
          const reading = location.readings.reduce((prev, current) => {
            return prev.id > current.id ? prev : current;
          });
          return reading.mask === mask;
        } catch (err) {
          return false;
        }
      });
    }
    // filter by location type
    if (locationtype !== LOCATION_TYPE_ALL) {
      locations2show = locations2show.filter(location => location.type === locationtype);
    }

    // console.log("Map Params :", map.center_lng, map.center_lat, map.zoom);

    return (
      <div className={classes.root}>
        <div className="wrapper">
          <MetaTags>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Raven App" />
            <meta property="og:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:site" content="Raven App" />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image:src" content={image} />
            <meta property="twitter:image:alt" content={"cleanairmap"} />
            <meta property="twitter:domain" content="ravenapp.org" />
          </MetaTags>
        </div>
        
        <div className={classes.appbar}>
          <CleanairAppBar
            onNavBack={this.handleNavBack}
            onHelp={this.handleHelp}
            onComments={this.handleComments}
            onProfileMenu={this.handleProfileMenu}
            onSignOut={this.handleSignOut}
          />
        </div>

        <div className={classes.mapview}>
          <MapView 
            theme_mode={theme_mode}
            center_pos={[map.center_lng, map.center_lat]}
            zoom={map.zoom}
            map_view_mode={map_view_mode}
            locations={locations}
            notifications={notifications}
            mask={mask}
            locationtype={locationtype}
            onClick={this.handleClickMap}
            onChangeMap={this.handleChangeMap}
            onChangeMapViewMode={this.handleChangeMapViewMode}
            onChangeQualities={this.handleChangeQualities}
            // onClickLocation={this.handleEditLocation}
            onClickLocation={this.handleClickLocation}
            onSearchedLocation={this.handleSearchedLocation}
          />
        </div>

        {selected_locations.length > 0 && (
          <div className={classes.locations}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item>
                <LocationList
                  locations={locations2show}
                  onNeedMore={this.handleNeedMore}
                  onLogin={this.handleLogin}
                  onReport={this.handleReportLocation}
                  onModerate={this.handleModerateLocation}
                  onModerateRegion={this.handleModerateRegion}
                  onEdit={this.handleEditLocation}
                  onResign={this.handleResign}
                  onReadMore={this.handleClickLocation}
                />
              </Grid>
            </Grid>
          </div>
        )}

        <div className={classes.spacing}/>

        <MapBottomNavBar
          show={true}
          mask={mask}
          locationtype={locationtype}
          onChangeMask={this.handleChangeMask}
          onChangeType={this.handleChangeType}
        />

        <ToastContainer />
        <DlgLoginConfirm
          open={loginDlg}
          onLogin={this.handleLogin}
          onCancel={this.handleCancelLogin}
        />
        <WaitingDialog open={requesting} />
      </div>
    );
  }
}

CleanAirMap.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  map: state.sessionState.map,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting,
  map_view_mode: state.mapState.map_view_mode,
  locations: state.mapState.locations
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withAuthentication,
  geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirMap);

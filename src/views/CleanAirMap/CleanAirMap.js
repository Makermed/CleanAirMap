import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";
import PropTypes from "prop-types";
import { Grid, Typography, List, ListItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { geolocated } from "react-geolocated";
import {
  CleanairAppBar,
  Location,
  MapUserpost,
  MapBottomNavBar,
  WaitingSpinner,
} from "../../components";
import MapView from "./components/mapview/MapView";
import * as ROUTES from "../../constants/routes";
import {
  CONF_LOCATION_TYPES,
  LOCATION_TYPE_ALL,
  MASK_ALL,
  AIR_QUALITY_BAD,
  AIR_QUALITY_GOOD,
  AIR_QUALITY_MEDIUM,
  MAP_VIEW_ALL,
  MAP_VIEW_90D,
  AIR_QUALITY_NORMAL,
} from "../../constants/maplocation";
import {
  MAX_ARTICLE_WIDTH,
  MAX_CARD_WIDTH,
  TAB_MAP_FEED,
  TAB_MAP_READINGS,
  TAB_MAP_NEWS,
  TAB_MAP_SCHOOLS,
  TAB_MAP_SPORTS,
  TAB_FEED,
} from "../../constants/types";
import { ToastError } from "../../utility/toast";
import { get_air_quality } from "../../utility/cleanair";
import { logger } from "../../utility/logging";
import { fetchLocations } from "../../services/services";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
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
    zIndex: 1100,
  },
  loctypelabel: {
    position: "absolute",
    top: 130,
    left: `calc(50% - 44px)`,
    padding: 4,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: "black",
    borderRadius: 16,
    zIndex: 1,
  },
  loctypetxt: {
    fontSize: "16px",
    fontWeight: 200,
    lineHeight: "16px",
    color: "white",
  },
  mapview: {},
  tabcontainer: {
    padding: 0,
    margin: 0,
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
  listitem: {
    padding: 0,
  },
  spacing: {
    height: "80px",
    minHeight: "80px",
  },
  addbutton: {
    position: "fixed",
    cursor: "pointer",
    bottom: theme.spacing(5),
    width: 60,
    height: 60,
    zIndex: 1200,
  },
});

class CleanAirMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map_view_mode: MAP_VIEW_ALL,
      notifications: 0,
      loginDlg: false,
      postDlg: false,
      postEditDlg: false,
      article_edit: null,
      mask: MASK_ALL,
      locationtype: LOCATION_TYPE_ALL,
      maptags: [],
      mapData: [],
      user: [],
      selectedtags: [],
      qualities: [
        AIR_QUALITY_GOOD,
        AIR_QUALITY_MEDIUM,
        AIR_QUALITY_BAD,
        AIR_QUALITY_NORMAL,
      ],
      selected_locations: [],
      searched_location: null,
      mapposts: [],
      showLoctype: true,
      searchedLocation: [],
    };
    this.map_change_timeout = 0;

    this.handleLogin = this.handleLogin.bind(this);
    this.handleCancelLogin = this.handleCancelLogin.bind(this);

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleHelp = this.handleHelp.bind(this);
    this.handleProfileMenu = this.handleProfileMenu.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleClickLocation = this.handleClickLocation.bind(this);
    this.handleClickSearchResult = this.handleClickSearchResult.bind(this);
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

    if (this.props.maptab === TAB_MAP_READINGS) {

    try {
      const locations = await fetchLocations();
      this.setState({ mapData: locations });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }
  };

  handleNavBack = () => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "right" },
    };
    this.props.history.push(location);
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
  };

  getLocations = async (center_lng, center_lat, bounds) => {
    const { map_view_mode, mapData } = this.state;
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
    logger.log("box :", lng_min, lng_max, lat_min, lat_max);

    const locations = mapData;
    const regions = locations
      .map((location) => location.region)
      .filter(
        (location, index, a) =>
          a.findIndex((location2) => location2.id === location.id) === index
      );
    logger.log("regions & locations :", regions, locations);
    if (regions.length > 0) {
      this.props.setMapRegions(regions);
    }
    if (locations.length > 0) {
      this.props.setMapLocations(locations);
      this.setState({
        ...this.state,
        selected_locations: locations,
      });
    }
  };

  getMapPosts = async () => {
    const { regions } = this.props;
    if (regions.length === 0) {
      return;
    }

    logger.log("getMapPosts regions :", regions);
    let posts = [];
    let result = null;

    this.setState({
      ...this.state,
      mapposts: posts,
    });
  };

  handleHelp = () => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP_TUTORIAL,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  };

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
    await this.props.signOut();
  };

  

  handleClickLocation = (location) => {
    this.props.selectMapLocation(location);
    let route = `/${ROUTES.CLEANAIRMAP_PREFIX}/${location.slug}-${location.id}`;
    this.props.history.push({
      pathname: route,
      state: { animation: "left" },
    });
  };

  handleClickSearchResult = (position) => {
    const { locations } = this.props;
    const exist_location = locations.find(
      (item) => item.name === position.name && item.address === position.address
    );

    if (position.latitude && position.longitude) {
      // this.props.setMapCenterPos(position.longitude, position.latitude);
    }

    if (exist_location) {
      this.handleClickLocation(exist_location);
    } else {
      this.handleClickMap({
        lat: position.latitude,
        lng: position.longitude,
      });
    }
  };

  handleClickMap = (coordinate) => {
    this.props.setLocationGeoPos(coordinate.lng, coordinate.lat);

    this.props.history.push({
      pathname: ROUTES.CLEANAIRMAP_ADD,
      state: { animation: "left" },
    });
  };

  handleChangeMap = async (lng, lat, zoom, bounds) => {
    // this.props.setMapParams(lng, lat, zoom, bounds);

    if (this.map_change_timeout) {
      clearTimeout(this.map_change_timeout);
    }

    this.map_change_timeout = setTimeout(async () => {
      await this.getLocations(lng, lat, bounds);
      await this.getMapPosts();
    }, 3000);
  };

  handleChangeMapViewMode = async () => {
    const { map_view_mode } = this.props;
    let new_mode = map_view_mode === MAP_VIEW_ALL ? MAP_VIEW_90D : MAP_VIEW_ALL;
    logger.log("new map view mode :", new_mode);
    this.setState(
      {
        ...this.state,
        map_view_mode: new_mode,
      },
      this.forceUpdate()
    );
    this.props.setMapViewMode(new_mode);
  };

 

  handleSelectSearchResult = async (position) => {
    const { locations } = this.props;
    const exist_location = locations.find(
      (item) => item.name === position.name && item.address === position.address
    );

    this.setState({
      ...this.state,
      searched_location: exist_location !== undefined ? exist_location : null,
    });
  };


  handleChangeQualities = (qualities) => {
    this.setState({
      ...this.state,
      qualities: qualities,
    });
  };

  handleEditLocation = (location) => {
    this.props.selectMapLocation(location);

    let route = `/${ROUTES.CLEANAIRMAP_PREFIX}/${location.slug}-${location.id}/edit`;
    this.props.history.push({
      pathname: route,
      state: { animation: "left" },
    });
  };
  handleChangeMask = (mask) => {
    if (mask !== this.state.mask) {
      this.setState({
        ...this.state,
        mask: mask,
      });
    }
  };

  handleChangeType = async (locationtype) => {
    if (locationtype === this.state.locationtype) {
      return;
    }

    window.clearInterval(window.mapInterval);

    this.setState(
      {
        ...this.state,
        locationtype: locationtype,
        showLoctype: true,
      },
      () => {
        window.mapInterval = setInterval(() => {
          this.setState({
            ...this.state,
            showLoctype: false,
          });
        }, 3000);
        return () => clearInterval(window.mapInterval);
      }
    );
  };

  

  _getLocations2show = (
    locations,
    view_mode,
    qualities,
    mask,
    locationtype,
    tags
  ) => {
    let locations2show = locations.slice();

    // filter by mode
    if (view_mode !== MAP_VIEW_ALL) {
      const dt = new Date() - 86400 * 90 * 1000;
      locations2show = locations.filter(
        (location) => Date.parse(location.created_at) >= dt
      );
    }

    // filter by air quality
    locations2show = locations2show.filter((location) => {
      const air_quality = get_air_quality(location);
      if (air_quality < 0) {
        return false;
      }
      return qualities.find((quality) => quality === air_quality) !== undefined;
    });

    // filter by mask
    if (mask !== MASK_ALL) {
      locations2show = locations2show.filter((location) => {
        try {
          const reading = location.readings?.reduce((prev, current) => {
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
      locations2show = locations2show.filter(
        (location) => location.type === locationtype
      );
    }

    // filter by tags
    if (tags.length > 0) {
      const tag_ids = tags.map((tag) => tag.id);
      locations2show = locations2show.filter((location) =>
        tag_ids.includes(location.tag_id)
      );
    }

    return locations2show;
  };

  _sortLocationAndMapposts = (locations, mapposts) => {
    let items = locations.concat(mapposts);
    for (let item of items) {
      if (item.nid === undefined) {
        item.ts = Date.parse(item.created_at);
        item.ts = isNaN(item.ts) ? 0 : Math.floor(item.ts / 1000);
      } else {
        item.ts = item.published;
      }
    }
    items.sort((a, b) => b.ts - a.ts);
    return items;
  };

  render() {
    const {
      classes,
      theme_mode,
      map,
      maptab,
      locations,
      map_articles,
      showLoctype,
      requesting,
    } = this.props;
    const {
      mask,
      map_view_mode,
      locationtype,
      maptags,
      selectedtags,
      qualities,
      selected_locations,
      searched_location,
      mapposts,
    } = this.state;
    const locationTypeOfTab = Object.keys(CONF_LOCATION_TYPES).find((key) => {
      return CONF_LOCATION_TYPES[key].value === locationtype;
    });
    let url = "";
    if (typeof window !== "undefined") {
      url = window.location.protocol + "//" + window.location.host;
    }
    url += `${ROUTES.CLEANAIRMAP}`;

    const title = "Raven: CleanAir Map";
    const description =
      "The Clean Air Map is a module to crowdsource air quality measurements to ensure indoor spaces are safe from spread of Covid-19";
    const image = "";

    const locations2show = this._getLocations2show(
      selected_locations,
      map_view_mode,
      qualities,
      mask,
      locationtype,
      selectedtags
    );
    const items2show = this._sortLocationAndMapposts(locations2show, mapposts);
    logger.log("Selected locations :", selected_locations);

    const loctypeLabelStyle = showLoctype
      ? { transition: "opacity 0.5s ease" }
      : { opacity: 0, transition: "opacity 1s ease" };

    const width =
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      window.innerWidth;
    const innerWidth = width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH : width;

    let addbuttonPos = 0;
    if (width > MAX_ARTICLE_WIDTH) {
      addbuttonPos = MAX_ARTICLE_WIDTH - 96 + (width - MAX_ARTICLE_WIDTH) / 2;
    } else if (innerWidth > MAX_CARD_WIDTH) {
      addbuttonPos = (innerWidth + MAX_CARD_WIDTH) / 2 - 96;
    } else {
      addbuttonPos = innerWidth - 96;
    }

    logger.log("render map articles :", map_articles);

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
            onProfileMenu={this.handleProfileMenu}
            onSignOut={this.handleSignOut}
          />
        </div>

        {locationtype !== LOCATION_TYPE_ALL && (
          <div className={classes.loctypelabel} style={loctypeLabelStyle}>
            {locationTypeOfTab ? (
              <Typography className={classes.loctypetxt}>
                {CONF_LOCATION_TYPES[locationTypeOfTab].name}
              </Typography>
            ) : (
              <></>
            )}
          </div>
        )}

        <div className={classes.mapview}>
          <MapView
            theme_mode={theme_mode}
            center_pos={[map.center_lng, map.center_lat]}
            zoom={map.zoom}
            map_view_mode={map_view_mode}
            locations={locations}
            mask={mask}
            locationtype={locationtype}
            tags={selectedtags}
            onClick={this.handleClickMap}
            onChangeMap={this.handleChangeMap}
            onChangeMapViewMode={this.handleChangeMapViewMode}
            onChangeQualities={this.handleChangeQualities}
            onClickLocation={this.handleClickLocation}
            onSelectSearchResult={this.handleSelectSearchResult}
            onClickSearchResult={this.handleClickSearchResult}
          />
        </div>

        {maptab === TAB_MAP_READINGS && (
          <div className={classes.tabcontainer}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item>
                {locations2show.length > 0 && (
                  <List component="location-list" aria-label="location list">
                    {locations2show.map((item, index) => (
                      <ListItem
                        className={classes.listitem}
                        key={`item-${index}`}
                      >
                        <Location
                          location={item}
                          selected={
                            searched_location &&
                            searched_location.id === item.id
                          }
                          onLogin={this.handleLogin}
                          onReport={this.handleReportLocation}
                          onModerate={this.handleModerateLocation}
                          onModerateRegion={this.handleModerateRegion}
                          onEdit={this.handleEditLocation}
                          onResign={this.handleResignLocation}
                          onReadMore={this.handleClickLocation}
                          onDelete={this.handleDeleteLocation}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Grid>
            </Grid>
          </div>
        )}


        <div className={classes.spacing} />

        <MapBottomNavBar
          show={true}
          mask={mask}
          locationtype={locationtype}
          maptags={maptags}
          selectedtags={selectedtags}
          onChangeMask={this.handleChangeMask}
          onChangeType={this.handleChangeType}
          onChangeTag={this.handleChangeTag}
        />

        <ToastContainer />

        <WaitingSpinner open={requesting} />
      </div>
    );
  }
}

CleanAirMap.propTypes = {
  className: PropTypes.string,
  selectMapLocation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  map: state.sessionState.map,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting,
  maptab: state.mapState.maptab,
  map_view_mode: state.mapState.map_view_mode,
  locations: state.mapState.locations,
  regions: state.mapState.regions,
  map_articles: state.mapState.map_articles,
  map_articles_last_offset: state.mapState.map_articles_last_offset,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirMap);

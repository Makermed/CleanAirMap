import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import SwipeableViews from "react-swipeable-views";
import {
  LocationCard,
  MapPostList,
  WaitingSpinner,
  ReadingItem,
  DlgReading,
} from "../../components";
import { MainAppBar, LocationTabs } from "./components";
import * as ROUTES from "../../constants/routes";
import {
  TAB_LOC_READINGS,
  TAB_LOC_FEEDS,
  TAB_LOC_MODERATORS,
  MAX_WINDOW_WIDTH,
  MAX_CARD_WIDTH,
} from "../../constants/types";
import { ToastError } from "../../utility/toast";
import { CONF_LOCATION_TYPES } from "../../constants/maplocation";
import { logger } from "../../utility/logging";

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
    width: 60,
    height: 60,
    zIndex: 1200,
    cursor: "pointer",
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
  },
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
      selectedReading: null,
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleClickBackButton = this.handleClickBackButton.bind(this);

    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleSwiped = this.handleSwiped.bind(this);
  }

  setError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();
  };

  setAuthorizeError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();

    const location = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  };

  componentDidMount = async () => {
    const { match } = this.props;
    logger.log("location match :", match);
    let tabValue = TAB_LOC_READINGS;
    if (match.path === ROUTES.CLEANAIRMAP_LOCATION_POSTS) {
      tabValue = TAB_LOC_FEEDS;
    }

    let location_slug = this.props.selected_location
      ? this.props.selected_location.slug
      : match.params.slug.slice(0, match.params.slug.lastIndexOf("-"));
    if (!location_slug) {
      return;
    }

    const { selected_location } = this.props;

    if (this.props.locationtab === TAB_LOC_READINGS) {
      // load readings
      const { cleanair_values } = this.props;
      if (cleanair_values.length === 0) {
        this.props.initScrollPos();
      } else {
        window.scrollTo(this.props.scrollPos.x, this.props.scrollPos.y);
      }
    } else if (this.props.locationtab === TAB_LOC_FEEDS) {
      const { map_posts } = this.props;
      if (map_posts.length === 0) {
        await this.getLocationPosts();
        this.props.initScrollPos();
      } else {
        window.scrollTo(this.props.scrollPos.x, this.props.scrollPos.y);
      }
    }

    await this.handleChangeTab(tabValue);
  };

  componentDidUpdate = (prevProps) => {
    const { selected_location, authUser } = this.props;
    if (selected_location === null || authUser == null) {
      return;
    }
    const location_moderated = authUser.locations_moderated.find(
      (item) => item.location_id === selected_location.id
    );
    const prev_location_moderated = prevProps.authUser.locations_moderated.find(
      (item) => item.location_id === selected_location.id
    );
    if (
      location_moderated === undefined ||
      prev_location_moderated === undefined
    ) {
      return;
    }
  };

  goTo = (location) => {
    this.props.history.push(location);
  };

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
  };

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
          button to post an entry or go to the <strong>sources</strong> tab and
          add a social media source
        </Typography>
      </div>
    );
  };

  handleSelectMapPost = (article) => {
    const { selected_location } = this.props;
    this.props.selectMapPost(article);

    let path = `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}-${selected_location.id}/p/${article.nid}`;
    const location = {
      pathname: path,
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
    const { readingDlg, shareDlg, selectedReading } = this.state;

    if (!selected_location) {
      return <div style={{ display: "none" }}></div>;
    }

    let shareUrl = "";
    if (typeof window !== "undefined") {
      shareUrl = window.location.protocol + "//" + window.location.host;
    }
    shareUrl += `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}-${selected_location.id}`;

    let shareInfo = {
      title: "Raven Location: " + selected_location.name,
      description: selected_location.description,
      image: "",
      hashtag: "",
      url: shareUrl,
    };

    // layout variables
    const width =
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      window.innerWidth;
    const isDesktop = width >= MAX_WINDOW_WIDTH;
    const innerWidth = width > MAX_WINDOW_WIDTH ? MAX_WINDOW_WIDTH : width;

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
        shareReadingUrl =
          window.location.protocol + "//" + window.location.host;
      }
      shareReadingUrl += `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}-${selected_location.id}/readings/${selectedReading.id}`;

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

    const sorted_readings = selected_location.readings.sort(
      (a, b) => b.id - a.id
    );

    return (
      <div className={classes.root}>
        <div className="wrapper">
          <MetaTags>
            <title>{`Raven: ${selected_location.name}`}</title>
            <meta name="description" content={selected_location.description} />
            <meta
              property="og:title"
              content={`Raven: ${selected_location.name}`}
            />
            <meta
              property="og:description"
              content={selected_location.description}
            />
            <meta property="og:site_name" content="Raven App" />
            <meta property="og:url" content={shareUrl} />
            <meta
              property="twitter:title"
              content={`Raven: ${selected_location.name}`}
            />
            <meta property="twitter:site" content="Raven App" />
            <meta
              property="twitter:description"
              content={selected_location.description}
            />
            <meta
              property="twitter:image:alt"
              content={selected_location.name}
            />
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
                location={selected_location}
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

        <SwipeableViews
          index={locationtab}
          onChangeIndex={this.handleSwiped}
          enableMouseEvents
        >
          <div className={classes.tabcontainer}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item>
                {sorted_readings.map((reading, index) => (
                  <ReadingItem
                    theme={theme_mode}
                    reading={reading}
                    index={index}
                    onNeedLogin={this.handleLogin}
                    onMemberTrial={this.handleMemberTrial}
                    onReport={this.showReportReading}
                    onShare={this.handleShareReading}
                    onRecommends={this.handleRecommends}
                  />
                ))}
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
                {map_posts.length === 0 &&
                  !requesting &&
                  this.renderPostWarning(classes, theme_mode)}
                {map_posts.length > 0 && (
                  <MapPostList
                    articles={map_posts}
                    onNeedMore={this.handleNeedMore}
                    onSelectMapPost={this.handleSelectMapPost}
                    onNeedLogin={this.handleLogin}
                    onMemberTrial={this.handleMemberTrial}
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
            <div onClick={(e) => this.handleShowReading()}>
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
              rooms={selected_location.location_rooms}
              theme={theme_mode}
              onSave={this.handleSaveReading}
              onCancel={this.handleHideReading}
            />
          </div>
        )}
        <WaitingSpinner open={requesting} />
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
  map_posts_last_offset: state.mapState.map_posts_last_offset,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirLocation);

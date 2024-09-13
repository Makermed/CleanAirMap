import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../../actions";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  MAX_CARD_WIDTH,
  MIN_CARD_WIDTH,
  THEME_MODE_DARK,
} from "../../../constants/types";
import {
  CONF_LOCATION_TYPES,
  CONF_MASKS,
  MASK_NOT_REQUIRED,
  MASK_STAFF,
  MASK_REQUIRED,
  CONF_AIR_QUALITY_COLORS,
  CONF_ADJUST_ACTIVITIES,
} from "../../../constants/maplocation";
import { ToastError } from "../../../utility/toast";
import * as ROUTES from "../../../constants/routes";
import {
  get_adjusted_co2_level,
  get_air_quality,
  get_region_name,
} from "../../../utility/cleanair";
import { get_elapsed_time } from "../../../utility/utils";
import { logger } from "../../../utility/logging";

const styles = (theme) => ({
  card: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
    minWidth: MIN_CARD_WIDTH - 16,
    maxWidth: MAX_CARD_WIDTH - 16,
  },
  carddiv: {
    margin: 3,
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 10,
    borderTopLeftRadius: 30,
    borderColor: theme.palette.text.primary,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: theme.palette.background.article,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  header: {
    padding: 0,
  },
  share: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    color: theme.palette.info.contrastText,
    backgroundColor: "#7289DA",
    zIndex: 100,
  },
  shareicon: {
    width: 16,
    height: 16,
  },
  expand: {
    position: "absolute",
    top: 28,
    right: 10,
    padding: 4,
    width: 24,
    height: 24,
    zIndex: 100,
    color: theme.palette.text.primary,
  },
  cleanairimg: {
    position: "absolute",
    top: 52,
    left: 14,
    width: 20,
    height: 20,
  },
  titleline: {
    position: "relative",
    marginLeft: 38,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 0,
  },
  name: {
    fontFamily: "Arial",
    fontSize: "18px",
    fontWeight: 600,
    color: theme.palette.text.primary,
    cursor: "pointer",
    width: "80%",
  },
  region: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    marginTop: 4,
    marginBottom: 4,
    color: theme.palette.text.primary,
    cursor: "pointer",
  },
  content: {
    paddingTop: 0,
    paddingBottom: "0px !important",
    marginLeft: 38,
    marginRight: 10,
    marginBottom: theme.spacing(1),
    marginTop: -10,
  },
  airlevel_titlebox: {
    display: "flex",
    alignItems: "center",
  },
  airlevel_title: {
    color: theme.palette.text.primary,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 16,
  },
  airlevel_title_head: {
    color: theme.palette.text.primary,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "37px",
    fontWeight: 700,
    textTransform: "uppercase",
    margin: "16px 0",
    lineHeight: "32px",
    maxWidth: "86%",
  },

  airlevel_description: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "20px",
    color: theme.palette.text.primary,
  },
  descriptionblock: {
    marginTop: -4,
    marginBottom: 8,
  },
  description: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    lineHeight: "18px",
    color: theme.palette.text.primary,
  },
  roomblock: {
    marginTop: 8,
    marginBottom: 8,
  },
  maskblock: {
    textAlign: "center",
    display: "flex",
    justifyContent: "start",
    marginBottom: "5px",
  },
  maskimg: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  masknote: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    lineHeight: "18px",
    color: theme.palette.text.primary,
    padding: 0,
  },
  actionbtn: {
    position: "absolute",
    right: 4,
    textTransform: "inherit",
    float: "right",
    color: theme.palette.text.secondary,
  },
  readmore: {
    fontSize: "16px",
    fontStyle: "italic",
    color: theme.palette.text.secondary,
    float: "right",
    marginRight: 16,
  },
  righticon: {
    position: "absolute",
    right: 0,
    bottom: 5,
  },
  nodescription: {
    display: "flex",
    justifyContent: "start",
    marginBottom: "5px",
  },
  posted: {
    position: "absolute",
    top: 16,
    right: 40,
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
  },
  borderLeft: {
    display: "flex",
    alignItems: "center",
    borderTop: "0!important",
    borderLeft: "0!important",
  },
  borderRight: {
    display: "flex",
    alignItems: "center",
    borderTop: "0 !important",
    borderRight: "0 !important",
  },
});

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      reportDlg: false,
      loginDlg: false,
      shareDlg: false,
    };

    this.handleClickShare = this.handleClickShare.bind(this);
    this.handleCloseShare = this.handleCloseShare.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);

    this.showReportDlg = this.showReportDlg.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleCancelReport = this.handleCancelReport.bind(this);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleResign = this.handleResign.bind(this);

    this.handleModerate = this.handleModerate.bind(this);
    this.handleModerateRegion = this.handleModerateRegion.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleCancelLogin = this.handleCancelLogin.bind(this);
    this.handleLocationDelete = this.handleLocationDelete.bind(this);
  }

  setError = (message) => {
    ToastError(message);
  };

  handleClickShare = () => {
    const properties = { type: "Map" };
    this.setState({
      ...this.state,
      shareDlg: true,
    });
  };

  handleCloseShare = () => {
    this.setState({
      ...this.state,
      shareDlg: false,
    });
  };

  handleExpand = (event) => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget,
    });
  };

  handleCloseMenu = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  showReportDlg = () => {
    const { loggedIn } = this.props;

    if (loggedIn) {
      this.setState({
        ...this.state,
        reportDlg: true,
        loginDlg: false,
        anchorEl: null,
      });
    } else {
      this.setState({
        ...this.state,
        reportDlg: false,
        loginDlg: true,
        anchorEl: null,
      });
    }
  };

  handleReport = (reportMsg) => {
    const { location } = this.props;
    if (!reportMsg.trim()) {
      this.setError("Report shouldn't be blank. Please input your report.");
      return;
    }

    this.props.onReport(location, reportMsg);

    this.setState({
      ...this.state,
      reportDlg: false,
      anchorEl: null,
    });
  };

  handleCancelReport = () => {
    this.setState({
      ...this.state,
      reportDlg: false,
      anchorEl: null,
    });
  };

  handleModerate = () => {
    this.props.onModerate(this.props.location);

    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  handleModerateRegion = () => {
    this.props.onModerateRegion(this.props.location.region);
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  handleEdit = () => {
    this.props.onEdit(this.props.location);
  };
  handleLocationDelete = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
    this.props.onDelete(this.props.location);
  };
  handleResign = () => {
    this.props.onResign(this.props.onResign);
  };

  handleLogin = () => {
    this.props.onLogin();
    this.setState({
      ...this.state,
      loginDlg: false,
      shareDlg: false,
      anchorEl: null,
    });
  };

  handleCancelLogin = () => {
    this.setState({
      ...this.state,
      loginDlg: false,
      anchorEl: null,
    });
  };

  _getShareInfo = (location) => {
    let shareUrl = "";
    if (typeof window !== "undefined") {
      shareUrl = window.location.protocol + "//" + window.location.host;
    }
    shareUrl += `/${ROUTES.CLEANAIRMAP_PREFIX}/${location.slug}-${location.id}`;

    return {
      title: "Raven Cleanair Map Location: " + location.name,
      description: location.description,
      image: "",
      hashtag: "",
      url: shareUrl,
    };
  };

  render() {
    const { classes, theme_mode, loggedIn, authUser, location, onReadMore } =
      this.props;
    const { anchorEl, reportDlg, loginDlg, shareDlg } = this.state;

    let width =
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      window.innerWidth;
    width -= 16;
    if (width > MAX_CARD_WIDTH - 16) width = MAX_CARD_WIDTH - 16;
    if (width < MIN_CARD_WIDTH - 16) width = MIN_CARD_WIDTH - 16;

    // popup menu position
    let menuPos = { top: -1000, left: -1000 };
    if (anchorEl) {
      var rect = anchorEl.getBoundingClientRect();
      menuPos = { top: rect.top, left: rect.left };
    }

    const locationType = CONF_LOCATION_TYPES.find(
      (loctype) => loctype.value === location.type
    );

    // readings by rooms
    let mainReading = null;
    const mainReadings = location.readings.filter(
      (reading) => reading.location_room === null
    );
    if (mainReadings.length > 0) {
      mainReading = mainReadings.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
      });
    } else {
      mainReading = location.readings.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
      });
    }
    const roomReadings = location.location_rooms
      .filter(
        (location_room) =>
          location_room.readings && location_room.readings.length > 0
      )
      .map((location_room) =>
        location_room.readings.reduce((prev, current) => {
          return prev.id > current.id ? prev : current;
        })
      );
    const bgColor = theme_mode === THEME_MODE_DARK ? "white" : "black";
    let air_title = "";
    let air_description = "";
    if (mainReading.adjusted) {
      const adjusted_co2 = get_adjusted_co2_level(
        mainReading.co2_in,
        CONF_ADJUST_ACTIVITIES[mainReading.activity].cfm,
        mainReading.people_no,
        mainReading.hepa_cadr,
        mainReading.uvgi_cap
      );
      air_title = `${parseInt(adjusted_co2)} ppm (adjusted)`;
      air_description = "";
    } else {
      if (mainReading.co2) {
        air_title = `${mainReading.co2} ppm`;
        air_description = "";
      } else if (mainReading.ach) {
        air_title = "HEPA filters";
        air_description = `${mainReading.ach} Air Changes an Hour`;
      }
    }
    let air_quality = get_air_quality(location);
    if (air_quality < 0) {
      return <></>;
    }

    const stroke_color =
      theme_mode === THEME_MODE_DARK
        ? locationType.color.dark.stroke
        : locationType.color.light.stroke;
    const fill_color =
      theme_mode === THEME_MODE_DARK
        ? locationType.color.dark.fill
        : locationType.color.light.fill;

    // location image style
    const location_style = {
      position: "absolute",
      top: 0,
      left: 0,
      width: 48,
      height: 48,
      borderRadius: "50%",
      backgroundColor: stroke_color,
      padding: 2,
    };

    // air quality circle
    const air_quality_style = {
      height: "20px",
      width: "20px",
      backgroundColor: CONF_AIR_QUALITY_COLORS[air_quality].color,
      borderRadius: "50%",
      display: "inline-block",
      marginLeft: "16px",
    };

    // mask notification
    let mask_note1 = "";
    let mask_note2 = "";
    if (mainReading.mask === MASK_NOT_REQUIRED) {
      mask_note1 = "Masks not";
      mask_note2 = "required";
    } else if (mainReading.mask === MASK_STAFF) {
      mask_note1 = "Staff";
      mask_note2 = "masked";
    } else if (mainReading.mask === MASK_REQUIRED) {
      mask_note1 = "Masks";
      mask_note2 = "required";
    }

    // moderator
    let moderator = null;
    let region_moderator = null;
    if (loggedIn) {
      moderator = authUser.locations_moderated.find(
        (moderated) => moderated.location_id === location.id
      );
      if (moderator === undefined) {
        moderator = null;
      }
      region_moderator = authUser.regions_moderated.find(
        (moderated) => moderated.region_id === location.region.id
      );
      if (region_moderator === undefined) {
        region_moderator = null;
      }
    }

    logger.log("location :", moderator, region_moderator, location);
    logger.log("Region Name :", get_region_name(location.region));
    const readings = location.readings[0].reading_at;
    return (
      <>
        <Card
          className={classes.card}
          style={{ width: width, backgroundColor: fill_color }}
        >
          <div
            className={classes.carddiv}
            style={{ backgroundColor: fill_color, borderColor: stroke_color }}
          >
            <CardHeader
              className={classes.header}
              avatar={
                <div>
                  <img
                    alt={locationType.name}
                    src={`/static/images/icons/loc_types/${locationType.image}`}
                    style={location_style}
                  />
                  <img
                    alt={"cleanair location"}
                    src={`/static/images/icons/${theme_mode}/cleanair.png`}
                    className={classes.cleanairimg}
                  />
                </div>
              }
              title={
                <div className={classes.titleline}>
                  <Typography className={classes.name}>
                    {location.name}
                  </Typography>
                  <Typography className={classes.region}>
                    {get_region_name(location.readings[0].reading_at)}
                  </Typography>
                </div>
              }
              onClick={(e) => onReadMore(location)}
            />
            <div>
              <Typography className={classes.posted}>
                {get_elapsed_time(readings)}
              </Typography>
            </div>
            <CardContent
              className={classes.content}
              onClick={(e) => onReadMore(location)}
            >
              <div className={classes.airlevel_titlebox}>
                <Typography className={classes.airlevel_title_head}>
                  {air_title}
                </Typography>
                <span
                  style={
                    mainReading?.co2 == null && mainReading?.co2_in === -1
                      ? {}
                      : air_quality_style
                  }
                ></span>
              </div>
              {mainReading.location_room && (
                <Typography className={classes.airlevel_title}>
                  {mainReading.location_room.name}
                </Typography>
              )}
              <Grid item xs={12}>
                <div
                  className={
                    location.description
                      ? classes.maskblock
                      : classes.nodescription
                  }
                >
                  <img
                    alt={"cleanair location"}
                    src={`/static/images/icons/${theme_mode}/${
                      CONF_MASKS[mainReading.mask + 1]?.image
                    }`}
                    className={classes.maskimg}
                  />
                  <Typography className={classes.masknote}>
                    {mask_note1}
                  </Typography>
                  <Typography className={classes.masknote}>
                    {" "}
                    &nbsp; {mask_note2}
                  </Typography>
                </div>
              </Grid>
              <Typography className={classes.airlevel_description}>
                {air_description}
              </Typography>
              <Grid
                container
                direction="row"
                spacing={1}
                className={classes.descriptionblock}
              >
                {location.description && (
                  <Grid item xs={9}>
                    <Typography className={classes.description}>
                      {location.description}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              {roomReadings && roomReadings.length > 0 && (
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.roomblock}
                >
                  {roomReadings.map((reading, index) => {
                    let title = "";
                    if (reading.adjusted) {
                      let adjusted_co2 = get_adjusted_co2_level(
                        reading.co2_in,
                        CONF_ADJUST_ACTIVITIES[reading.activity].cfm,
                        reading.people_no,
                        reading.hepa_cadr,
                        reading.uvgi_cap
                      );
                      title = `${parseInt(adjusted_co2)} ppm (adjusted)`;
                    } else {
                      title = reading.co2
                        ? `${reading.co2} ppm`
                        : `${reading.ach} HEPA`;
                    }

                    return (
                      <>
                        <Grid
                          item
                          xs={7}
                          className={classes.borderLeft}
                          style={{
                            borderRight: `1px solid ${bgColor}`,
                            borderBottom:
                              roomReadings.length === index + 1
                                ? 0
                                : `1px solid ${bgColor}`,
                          }}
                        >
                          <Typography className={classes.airlevel_title}>
                            {reading.location_room.name}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          className={classes.borderRight}
                          style={{
                            borderLeft: `1px solid ${bgColor}`,
                            borderBottom:
                              roomReadings.length === index + 1
                                ? 0
                                : `1px solid ${bgColor}`,
                          }}
                        >
                          <Typography className={classes.airlevel_title}>
                            {title}
                          </Typography>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              )}
            </CardContent>
          </div>
        </Card>
      </>
    );
  }
}

Location.propTypes = {
  classes: PropTypes.object,
  location: PropTypes.object,
  selected: PropTypes.bool,
  onLogin: PropTypes.func,
  onReport: PropTypes.func,
  onModerate: PropTypes.func,
  onModerateRegion: PropTypes.func,
  onEdit: PropTypes.func,
  onResign: PropTypes.func,
  onReadMore: PropTypes.func,
  onDelete: PropTypes.func,
};

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  theme_mode: state.uiState.theme_mode,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Location));

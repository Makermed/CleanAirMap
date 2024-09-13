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
  CardActions,
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
  CONF_ADJUST_ACTIVITIES,
  CONF_AIR_QUALITY_COLORS,
} from "../../../constants/maplocation";
import { ToastError } from "../../../utility/toast";
import * as ROUTES from "../../../constants/routes";
import {
  get_adjusted_co2_level,
  get_region_name,
  get_air_quality,
} from "../../../utility/cleanair";
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
    paddingBottom: 0,
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
  expand: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 4,
    width: 24,
    height: 24,
    zIndex: 100,
    color: theme.palette.text.primary,
  },
  following: {
    position: "absolute",
    top: 32,
    right: 24,
    width: 40,
    height: 40,
    zIndex: 100,
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
  },
  region: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    marginBottom: 4,
    color: theme.palette.text.primary,
    cursor: "pointer",
    padding: 0,
  },
  content: {
    paddingTop: theme.spacing(1),
    paddingBottom: 0,
    marginLeft: 38,
    marginRight: -14,
  },
  airlevel_titlebox: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  },
  airlevel_title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: "0.0357143em,",
    color: theme.palette.text.primary,
    textAlign: "center",
    textTransform: "uppercase",
  },
  airlevel_description: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "20px",
    color: theme.palette.text.primary,
  },
  descriptionblock: {
    marginTop: -14,
    marginBottom: 0,
  },
  maskfriendlyblock: {
    marginTop: 0,
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
    display: "flex",
    justifyContent: "start",
    textAlign: "center",
    marginTop: "3px",
  },
  maskimg: {
    width: 24,
    height: 24,
    marginTop: "-5px",
  },
  masknote: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    lineHeight: "16px",
    color: theme.palette.text.primary,
    padding: 0,
    display: "flex",
    justifyContent: "start",
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
  mapairimg: {
    width: 20,
    height: 20,
    marginLeft: 8,
    marginRight: 8,
  },
  mapairimgclock: {
    width: 20,
    height: 20,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
  },
  maskFriendlyHourday: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto, sans-serif",
    color: theme.palette.text.primary,
    marginLeft: "10px",
    marginBottom: "10px",
  },
  maskFriendlyHourtext: {
    fontSize: 15,
    fontFamily: "Roboto, sans-serif",
    color: theme.palette.text.primary,
    marginBottom: 3,
  },
  airlevel_title_column: {
    marginTop: 8,
    paddingBottom: 12,
    textAlign: "left",
    fontWeight: 100,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 20,
    color: theme.palette.text.primary,
  },
  arrow_down: {
    margin: "auto",
    display: "block",
    width: "auto",
    height: 44,
    cursor: "pointer",
  },
  nodescription: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    marginTop: "3px",
  },
  airlevel_title_head: {
    maxWidth: "86%",
    lineHeight: 1,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "37px",
    letterSpacing: "0.0357143em,",
    color: theme.palette.text.primary,
    textAlign: "center",
    textTransform: "uppercase",
  },
  w30: {
    width: "30%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: "0.0357143em,",
    color: theme.palette.text.primary,
    textAlign: "center",
    textTransform: "uppercase",
  },
  borderLeft: {
    textAlign: "center",
  },
  textend: {
    textAlign: "left",
    marginLeft: -5,
    marginRight: -22,
  },
});

class LocationCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      following: false,
      anchorEl: null,
      reportDlg: false,
      loginDlg: false,
      shareDlg: false,
      openRoom: false,
      maskFriendlyHours: "",
    };

    this.handleExpand = this.handleExpand.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleFollow = this.handleFollow.bind(this);

    this.showReportDlg = this.showReportDlg.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleCancelReport = this.handleCancelReport.bind(this);

    this.handleModerate = this.handleModerate.bind(this);
    this.handleModerateRegion = this.handleModerateRegion.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleResign = this.handleResign.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleCancelLogin = this.handleCancelLogin.bind(this);
    this.openRooms = this.openRooms.bind(this);
    this.handleLocationDelete = this.handleLocationDelete.bind(this);
  }

  setError = (message) => {
    ToastError(message);
  };

  componentDidMount = () => {
    const { loggedIn, authUser, selected_location } = this.props;
    let following = false;
    if (loggedIn) {
      following =
        authUser.locations_followed.find(
          (follow) => follow.location_id === selected_location.id
        ) !== undefined;
    }
    this.setState({
      ...this.state,
      following: following,
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

  _getAuthToken = async () => {};

  handleFollow = async () => {};

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
    this.props.onModerate(this.props.selected_location);

    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  handleModerateRegion = () => {
    this.props.onModerateRegion(this.props.selected_location.region);
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  handleEdit = () => {
    this.props.onEdit(this.props.location);
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

  openRooms = () => {
    this.setState({
      ...this.state,
      openRoom: !this.state.openRoom,
    });
  };

  _getShareInfo = () => {
    const { selected_location } = this.props;

    let shareUrl = "";
    if (typeof window !== "undefined") {
      shareUrl = window.location.protocol + "//" + window.location.host;
    }
    shareUrl += `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}-${selected_location.id}`;

    return {
      title: "Raven Cleanair Map Location: " + selected_location.name,
      description: selected_location.description,
      image: "",
      hashtag: "",
      url: shareUrl,
    };
  };

  handleLocationDelete = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
    this.props.onDelete();
  };

  render() {
    const {
      classes,
      loggedIn,
      authUser,
      theme_mode,
      reading,
      selected_location,
    } = this.props;
    const { anchorEl, openRoom } = this.state;

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
      (loctype) => loctype.value === selected_location.type
    );

    logger.log("selected_location :", selected_location);

    // readings by rooms
    let mainReading = null;
    const mainReadings = selected_location.readings.filter(
      (reading) => reading.location_room === null
    );
    if (mainReadings.length > 0) {
      mainReading = mainReadings.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
      });
    } else {
      mainReading = selected_location.readings.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
      });
    }
    const roomReadings = selected_location.location_rooms
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

    logger.log("reading :", mainReading, roomReadings);

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
        (moderated) => moderated.location_id === selected_location.id
      );
      if (moderator === undefined) {
        moderator = null;
      }
      region_moderator = authUser.regions_moderated.find(
        (moderated) => moderated.region_id === selected_location.region.id
      );
      if (region_moderator === undefined) {
        region_moderator = null;
      }
    }
    let air_quality = get_air_quality(selected_location);
    if (air_quality < 0) {
      return <></>;
    }
    const air_quality_style = {
      height: "20px",
      width: "20px",
      backgroundColor: CONF_AIR_QUALITY_COLORS[air_quality].color,
      borderRadius: "50%",
      display: "inline-block",
      marginLeft: "16px",
    };
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
                    {selected_location.name}
                  </Typography>
                  <Typography className={classes.region}>
                    {get_region_name(selected_location.region)}
                  </Typography>
                </div>
              }
            />
            <CardContent className={classes.content}>
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
                {mainReading.location_room && (
                  <Typography className={classes.w30}>
                    {mainReading.location_room.name}
                  </Typography>
                )}
              </div>
              <Typography className={classes.airlevel_description}>
                {air_description}
              </Typography>

              {reading.location_mask_friendly_hours.length > 0 && (
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.maskfriendlyblock}
                >
                  <Grid item xs={2} className={classes.textend}>
                    <img
                      alt={"cleanair location"}
                      src={`/static/images/icons/${theme_mode}/stopwatch_night.png`}
                      className={classes.mapairimgclock}
                    />
                  </Grid>
                  <Grid className={classes.textmaskfriendly} item xs={10}>
                    {reading.location_mask_friendly_hours.length > 0 && (
                      <Typography className={classes.maskFriendlyHourtext}>
                        Mask Friendly Hours
                      </Typography>
                    )}

                    {reading.location_mask_friendly_hours.length > 0 &&
                      reading.location_mask_friendly_hours.map(
                        (item, index) => {
                          const dayTime = `${
                            item?.day
                          } ${item?.time.toLowerCase()}`;
                          return (
                            <Typography
                              className={classes.maskFriendlyHourday}
                              key={`friendly_hours-${index}`}
                            >
                              {dayTime}
                            </Typography>
                          );
                        }
                      )}
                  </Grid>
                </Grid>
              )}
              {roomReadings.length > 0 && (
                <img
                  alt={"cleanair location"}
                  src={`/static/images/icons/${theme_mode}/arrow_drop_down.png`}
                  className={classes.arrow_down}
                  style={{ transform: openRoom ? " rotate(180deg)" : "" }}
                  onClick={this.openRooms}
                />
              )}
              {roomReadings && openRoom && (
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
                          xs={6}
                          className={classes.borderLeft}
                          style={{
                            borderRight: `1px solid ${bgColor}`,
                            borderBottom:
                              roomReadings.length === index + 1
                                ? 0
                                : `1px solid #ccc`,
                          }}
                        >
                          <Typography className={classes.airlevel_title_column}>
                            {reading.location_room.name}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={5}
                          className={classes.borderLeft}
                          style={{
                            borderLeft: `1px solid ${bgColor}`,
                            borderBottom:
                              roomReadings.length === index + 1
                                ? 0
                                : `1px solid #ccc`,
                          }}
                        >
                          <Typography className={classes.airlevel_title_column}>
                            {title}
                          </Typography>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              )}
              <Grid
                container
                direction="column"
                spacing={1}
                className={classes.descriptionblock}
              >
                <Grid item xs={12}>
                  <div
                    className={
                      selected_location.description
                        ? classes.maskblock
                        : classes.nodescription
                    }
                  >
                    <img
                      alt={"cleanair location"}
                      src={`/static/images/icons/${theme_mode}/${
                        CONF_MASKS[reading.mask + 1].image
                      }`}
                      className={classes.maskimg}
                      style={{ marginRight: "4px" }}
                    />
                    <Typography className={classes.masknote}>
                      {mask_note1}
                    </Typography>
                    <Typography className={classes.masknote}>
                      &nbsp;{mask_note2}
                    </Typography>
                  </div>
                </Grid>
                {selected_location.description && (
                  <Grid item xs={9}>
                    <Typography className={classes.description}>
                      {selected_location.description}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>

            <CardActions></CardActions>
          </div>
        </Card>
      </>
    );
  }
}

LocationCard.propTypes = {
  classes: PropTypes.object,
  reading: PropTypes.object,
  onLogin: PropTypes.func,
  onReport: PropTypes.func,
  onModerate: PropTypes.func,
  onModerateRegion: PropTypes.func,
  onReadMore: PropTypes.func,
  onEdit: PropTypes.func,
  onResign: PropTypes.func,
  onDelete: PropTypes.func,
};

const mapStateToProps = (state) => ({
  theme_mode: state.uiState.theme_mode,
  selected_location: state.mapState.selected_location,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LocationCard));

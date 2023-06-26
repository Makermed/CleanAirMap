import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  // CardActions,
  Grid,
  Typography,
  // Button,
  IconButton,
  Menu
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  PopMenuMapLocation,
  PopMenuMapLocationMod,
  DlgLoginConfirm,
  DlgReport,
  DlgShare
} from "components";
import { 
  MAX_CARD_WIDTH, 
  MIN_CARD_WIDTH 
} from "constants/types";
import {
  CONF_LOCATION_TYPES,
  CONF_MASKS,
  MASK_NOT_REQUIRED,
  MASK_STAFF,
  MASK_REQUIRED,
  CONF_AIR_QUALITY_COLORS
} from "constants/maplocation";
import {
  ToastError
} from "utility/toast";
import * as ROUTES from "constants/routes";
import {
  get_air_quality,
  get_region_name
} from "utility/cleanair";


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
    backgroundColor: theme.palette.background.article,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  header: {
    padding: 0,
  },
  share: {
    position: "absolute",
    top: 4,
    right: 4,
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
    top: 20,
    right: 2,
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
    marginLeft: 48,
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
    marginTop: 4,
    marginBottom: 4,
    color: theme.palette.text.primary,
    cursor: "pointer",
  },
  content: {
    paddingTop: theme.spacing(1),
    paddingBottom: 0,
    marginLeft: 48,
    marginRight: 10,
  },
  airlevel_titlebox: {
    display: "flex",
    alignItems: "center"
  }, 
  airlevel_title: {
    fontFamily: "Merriweather",
    fontSize: "24px",
    lineHeight: "28px",
    color: theme.palette.text.primary,
  },
  airlevel_description: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "20px",
    color: theme.palette.text.primary,
  },
  descriptionblock: {
    marginTop: 8,
    marginBottom: 8,
  },
  description: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    lineHeight: "18px",
    color: theme.palette.text.primary,
  },
  maskblock: {
    position: "absolute",
    right: 24,
    top: 40,
    textAlign: "center",
  },
  maskimg: {
    width: 24,
    height: 24,
  },
  masknote: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    color: theme.palette.text.primary,
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
});

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      reportDlg: false,
      loginDlg: false,
      shareDlg: false
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
  }

  setError = (message) => {
    ToastError(message);
  }

  handleClickShare = () => {
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
  }

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
  }

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
  }

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
      anchorEl: null
    });
  };

  handleCancelReport = () => {
    this.setState({
      ...this.state,
      reportDlg: false,
      anchorEl: null
    });
  };

  handleModerate = () => {
    this.props.onModerate(this.props.location);

    this.setState({
      ...this.state,
      anchorEl: null
    });
  }

  handleModerateRegion = () => {
    this.props.onModerateRegion(this.props.location.region);
    this.setState({
      ...this.state,
      anchorEl: null
    });
  }

  handleEdit = () => {
    this.props.onEdit(this.props.location);
  }

  handleResign = () => {
    this.props.onResign(this.props.onResign);
  }

  handleLogin = () => {
    this.props.onLogin();
    this.setState({
      ...this.state,
      loginDlg: false,
      shareDlg: false,
      anchorEl: null
    });
  };

  handleCancelLogin = () => {
    this.setState({
      ...this.state,
      loginDlg: false,
      anchorEl: null
    });
  };

  _getShareInfo = (location) => {
    let shareUrl = "";
    if (typeof window !== "undefined") {
      shareUrl = window.location.protocol + "//" + window.location.host;
    }
    shareUrl += `/${ROUTES.CLEANAIRMAP_PREFIX}/${location.slug}`;

    return {
      title: "Raven Cleanair Map Location: " + location.name,
      description: location.description,
      image: "",
      hashtag: "",
      url: shareUrl,
    };
  }

  render() {
    const { 
      classes, 
      theme_mode,
      loggedIn,
      authUser,
      location,
      onReadMore
    } = this.props;
    const { 
      anchorEl, 
      reportDlg, 
      loginDlg, 
      shareDlg 
    } = this.state;

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    width -= 16;
    if (width > MAX_CARD_WIDTH - 16)
      width = MAX_CARD_WIDTH - 16;
    if (width < MIN_CARD_WIDTH - 16)
      width = MIN_CARD_WIDTH - 16;

    // popup menu position
    let menuPos = { top: -1000, left: -1000 };
    if (anchorEl) {
      var rect = anchorEl.getBoundingClientRect();
      menuPos = { top: rect.top, left: rect.left };
    }

    const locationType = CONF_LOCATION_TYPES.find(loctype => loctype.value === location.type);
    // console.log("locationType :", locationType);

    const reading = location.readings.reduce((prev, current) => {
      return (prev.id > current.id) ? prev : current
    });

    let air_title = "";
    let air_description = "";
    if (reading.co2) {
      air_title = `${reading.co2} ppm`;
      air_description = "";
    } else if (reading.ach) {
      air_title = "HEPA filters";
      air_description = `${reading.ach} Air Changes an Hour`;
    }
    let air_quality = get_air_quality(location);

    // location image style
    const location_style =  {
      position: "absolute",
      top: 0,
      left: 0,
      width: 48,
      height: 48,
      borderRadius: "50%",
      backgroundColor: locationType.color,
      padding: 2,
    };
    // console.log("location style :", location_style);

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
    if (reading.mask === MASK_NOT_REQUIRED) {
      mask_note1 = "Masks not";
      mask_note2 = "required";
    } else if (reading.mask === MASK_STAFF) {
      mask_note1 = "Staff";
      mask_note2 = "masked";
    } else if (reading.mask === MASK_REQUIRED) {
      mask_note1 = "Masks";
      mask_note2 = "required";
    }

    // moderator
    let moderator = null;
    let region_moderator = null;
    if (loggedIn) {
      moderator = authUser.locations_moderated.find(moderated => 
        moderated.location_id === location.id
      );
      if (moderator === undefined) {
        moderator = null;
      }
      region_moderator = authUser.regions_moderated.find(moderated =>
        moderated.region_id === location.region.id
      );
      if (region_moderator === undefined) {
        region_moderator = null;
      }
    }

    // console.log("location :", moderator, region_moderator, location);
    // console.log("Region Name :", get_region_name(location.region));

    return (
      <>
        <Card className={classes.card} style={{ width: width }}>
          <div className={classes.carddiv}>
            <CardHeader
              className={classes.header}
              avatar={
                <div>
                  {/* <span style={location_style} /> */}
                  <img
                    alt={locationType.name}
                    src={`/static/images/icons/loc_types/${locationType.image}`}
                    style={location_style}
                    // onClick={e => onClickSource(source, feed)}
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
                    {get_region_name(location.region)}
                  </Typography>
                </div>
              }
              onClick={e => onReadMore(location)}
            />
            <div>
              <IconButton
                className={classes.share}
                onClick={this.handleClickShare}
              >
                <ShareIcon className={classes.shareicon} />
              </IconButton>
              <IconButton className={classes.expand} onClick={this.handleExpand}>
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <CardContent 
              className={classes.content} 
              onClick={e => onReadMore(location)}
            >
              <div className={classes.airlevel_titlebox}>
                <Typography className={classes.airlevel_title}>
                  {air_title}
                </Typography>
                <span style={air_quality_style}></span>
              </div>
              <Typography className={classes.airlevel_description}>{air_description}</Typography>
              <Grid container direction="row" spacing={1} className={classes.descriptionblock}>
                <Grid item xs={9}>
                  <Typography className={classes.description}>{location.description}</Typography>
                </Grid>
                <Grid item xs={3}>
                </Grid>
              </Grid>
            </CardContent>
            <div className={classes.maskblock}>
              <img
                alt={"cleanair location"}
                src={`/static/images/icons/${theme_mode}/${CONF_MASKS[reading.mask + 1].image}`}
                className={classes.maskimg}
              />
              <Typography className={classes.masknote}>{mask_note1}</Typography>
              <Typography className={classes.masknote}>{mask_note2}</Typography>
            </div>
            {/* <CardActions>
              <Button
                className={classes.actionbtn}
                size="small"
                color="primary"
                target="_blank"
                onClick={e => onReadMore(location)}
              >
                <Typography className={classes.readmore}>read more</Typography>
                <ChevronRightIcon
                  fontSize="small"
                  className={classes.righticon}
                />
              </Button>
            </CardActions> */}
          </div>
        </Card>
        <Menu
          id="source-menu"
          // anchorEl={anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={{ top: menuPos.top, left: menuPos.left + 24 }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={anchorEl !== null}
          onClose={this.handleCloseMenu}
        >
          {((moderator && moderator.approved) || (region_moderator && region_moderator.approved)) ? (
            <PopMenuMapLocationMod
              theme={theme_mode}
              location={location}
              region_moderator={region_moderator}
              onEdit={this.handleEdit}
              onReport={this.showReportDlg}
              onModerateRegion={this.handleModerateRegion}
              onResign={this.handleResign}
            />
          ) : (
            <PopMenuMapLocation
              theme={theme_mode}
              location={location}
              moderator={moderator}
              region_moderator={region_moderator}
              onReport={this.showReportDlg}
              onModerate={this.handleModerate}
              onModerateRegion={this.handleModerateRegion}
            />
          )}
        </Menu>
        <DlgLoginConfirm
          open={loginDlg}
          onLogin={this.handleLogin}
          onCancel={this.handleCancelLogin}
        />
        <DlgReport
          open={reportDlg}
          title={"Report Location"}
          theme={theme_mode}
          onReport={this.handleReport}
          onCancel={this.handleCancelReport}
        />
        <DlgShare
          open={shareDlg}
          shareInfo={this._getShareInfo(location)}
          onClose={this.handleCloseShare}
        />
      </>
    );
  }
}

Location.propTypes = {
  classes: PropTypes.object,
  location: PropTypes.object,
  onLogin: PropTypes.func,
  onReport: PropTypes.func,
  onModerate: PropTypes.func,
  onModerateRegion: PropTypes.func,
  onEdit: PropTypes.func,
  onResign: PropTypes.func,
  onReadMore: PropTypes.func
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

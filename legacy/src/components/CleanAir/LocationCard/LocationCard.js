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
  CardActions,
  Grid,
  Typography,
  IconButton,
  Menu,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  PopMenuMapLocation,
  PopMenuMapLocationMod,
  DlgLoginConfirm,
  DlgReport,
  DlgShare,
} from "components";
import { MAX_CARD_WIDTH, MIN_CARD_WIDTH } from "constants/types";
import {
  CONF_LOCATION_TYPES,
  CONF_MASKS,
  MASK_NOT_REQUIRED,
  MASK_STAFF,
  MASK_REQUIRED
} from "constants/maplocation";
import { ToastError } from "utility/toast";
import * as ROUTES from "constants/routes";
import { GraphqlService } from "services";
import { get_region_name } from "utility/cleanair";

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
    top: 16,
    right: 32,
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
    alignItems: "center",
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
    top: 56,
    right: 24,
    textAlign: "center",
  },
  maskimg: {
    width: 24,
    height: 24,
  },
  masknote: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
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

class LocationCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      following: false,
      anchorEl: null,
      reportDlg: false,
      loginDlg: false,
      shareDlg: false,
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
  }

  setError = (message) => {
    ToastError(message);
  };

  componentDidMount = () => {
    const { loggedIn, authUser, selected_location } = this.props;
    let following = false;
    if (loggedIn) {
      following = authUser.locations_followed.find(follow => follow.location_id === selected_location.id) !== undefined;
    }
    this.setState({
      ...this.state,
      following: following
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

  handleFollow = async () => {
    const following = !this.state.following;
    const { loggedIn, authUser, selected_location } = this.props;

    // check if the user was logged in
    if (!loggedIn) {
      this.setState({
        ...this.state,
        loginDlg: true,
      });
      return;
    }

    let follower = {
      location_id: selected_location.id,
      user_id: authUser.uid,
    };

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.props.onLogin();
      return;
    }

    gqlservice.set_auth_jwt(token);
    if (following) {
      await gqlservice
        .insert_location_follower(follower)
        .then(
          (result) => {
            if (result.data.insert_location_followers.affected_rows > 0) {
              this.props.insertFollowingLocation(selected_location.id);
            } else {
              this.setError("Failed to follow this location");
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
    } else {
      await gqlservice
        .delete_location_follower(follower)
        .then(
          (result) => {
            if (result.data.delete_location_followers.affected_rows > 0) {
              this.props.deleteFollowingLocation(selected_location.id);
            } else {
              this.setError("Failed to unfollow this location");
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

    this.setState({
      ...this.state,
      following: following,
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
    this.props.onModerate(this.props.selected_location);

    this.setState({
      ...this.state,
      anchorEl: null
    });
  };

  handleModerateRegion = () => {
    this.props.onModerateRegion(this.props.selected_location.region);
    this.setState({
      ...this.state,
      anchorEl: null
    });
  };

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

  _getShareInfo = () => {
    const { selected_location } = this.props;

    let shareUrl = "";
    if (typeof window !== "undefined") {
      shareUrl = window.location.protocol + "//" + window.location.host;
    }
    shareUrl += `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}`;

    return {
      title: "Raven Cleanair Map Location: " + selected_location.name,
      description: selected_location.description,
      image: "",
      hashtag: "",
      url: shareUrl,
    };
  }

  render() {
    const { 
      classes,
      loggedIn,
      authUser,
      theme_mode,
      reading,
      selected_location,
    } = this.props;
    const { 
      following, 
      anchorEl, 
      reportDlg, 
      loginDlg, 
      shareDlg 
    } = this.state;

    let width =
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      window.innerWidth;
    width -= 16;
    if (width > MAX_CARD_WIDTH - 16) width = MAX_CARD_WIDTH - 16;
    if (width < MIN_CARD_WIDTH - 16) width = MIN_CARD_WIDTH - 16;

    const following_img = `/static/images/icons/${theme_mode}/following.png`;
    const unfollowing_img = `/static/images/icons/${theme_mode}/unfollowing.png`;

    // popup menu position
    let menuPos = { top: -1000, left: -1000 };
    if (anchorEl) {
      var rect = anchorEl.getBoundingClientRect();
      menuPos = { top: rect.top, left: rect.left };
    }

    const locationType = CONF_LOCATION_TYPES.find(
      (loctype) => loctype.value === selected_location.type
    );
    
    console.log("selected_location :", selected_location);

    // const reading = selected_location.readings.reduce((prev, current) => {
    //   return prev.id > current.id ? prev : current;
    // });

    console.log("reading :", reading);

    let air_title = "";
    let air_description = "";
    if (reading.co2) {
      air_title = `${reading.co2} ppm`;
      air_description = "";
    } else if (reading.ach) {
      air_title = "HEPA filters";
      air_description = `${reading.ach} Air Changes an Hour`;
    }

    // location image style
    const location_style = {
      position: "absolute",
      top: 0,
      left: 0,
      width: 48,
      height: 48,
      borderRadius: "50%",
      backgroundColor: locationType.color,
      padding: 2,
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
        moderated.location_id === selected_location.id
      );
      if (moderator === undefined) {
        moderator = null;
      }
      region_moderator = authUser.regions_moderated.find(moderated =>
        moderated.region_id === selected_location.region.id
      );
      if (region_moderator === undefined) {
        region_moderator = null;
      }
    }

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
                    {selected_location.name}
                  </Typography>
                  <Typography className={classes.region}>
                    {get_region_name(selected_location.region)}
                  </Typography>
                </div>
              }
            />
            <div>
              <IconButton
                className={classes.expand}
                onClick={this.handleExpand}
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <div onClick={this.handleFollow}>
              <img
                className={classes.following}
                alt={"following"}
                src={following ? following_img : unfollowing_img}
              />
            </div>
            <CardContent className={classes.content}>
              <div className={classes.airlevel_titlebox}>
                <Typography className={classes.airlevel_title}>
                  {air_title}
                </Typography>
              </div>
              <Typography className={classes.airlevel_description}>
                {air_description}
              </Typography>
              <Grid
                container
                direction="row"
                spacing={1}
                className={classes.descriptionblock}
              >
                <Grid item xs={9}>
                  <Typography className={classes.description}>
                    {selected_location.description}
                  </Typography>
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
              <Typography className={classes.masknote}>
                {mask_note1}
              </Typography>
              <Typography className={classes.masknote}>
                {mask_note2}
              </Typography>
            </div>
            <CardActions></CardActions>
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
              location={selected_location}
              region_moderator={region_moderator}
              onEdit={this.handleEdit}
              onReport={this.showReportDlg}
              onModerateRegion={this.handleModerateRegion}
              onResign={this.handleResign}
            />
          ) : (
            <PopMenuMapLocation
              theme={theme_mode}
              location={selected_location}
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
          shareInfo={this._getShareInfo()}
          onClose={this.handleCloseShare}
        />
      </>
    );
  }
}

LocationCard.propTypes = {
  classes: PropTypes.object,
  // location: PropTypes.object,
  reading: PropTypes.object,
  onLogin: PropTypes.func,
  onReport: PropTypes.func,
  onModerate: PropTypes.func,
  onModerateRegion: PropTypes.func,
  onReadMore: PropTypes.func,
  onEdit: PropTypes.func,
  onResign: PropTypes.func
};

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
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

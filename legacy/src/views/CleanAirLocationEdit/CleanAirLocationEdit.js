import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  IconButton,
  Button,
  Typography
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { geolocated } from "react-geolocated";
import { 
  withAuthentication, 
  withAuthorization 
} from "session";
import {
  BasicAppBar,
  WaitingDialog,
  DlgConfirm,
} from "components";
import { GraphqlService } from "services";
import * as ROUTES from "constants/routes";
import {
  MIN_CARD_WIDTH,
  MAX_ARTICLE_WIDTH,
} from "constants/types";
import { 
  ToastSuccess,
  ToastError
} from "utility/toast";
import { 
  CONF_LOCATION_TYPES,
  LOCATION_TYPE_MUSEUM, 
} from "constants/maplocation";
import { 
  ARTICLE_BRANCH_TWITTER,
  ARTICLE_BRANCH_INSTAGRAM
} from "constants/branches";
import {
  check_source_link
} from "utility/checklink";
import {
  slugify
} from "utility/utils";
import { 
  ACTIVITY_TYPE_CLEANAIRMAP, 
  ACTIVITY_CHANGE,
  ACTIVITY_DELETE
} from "constants/activity";


const condition = (authUser) => !!authUser && authUser.uid !== "";


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
    width: theme.breakpoints.lg,
    maxWidth: "100%",
    height: "56px",
    [theme.breakpoints.up('sm')]: {
      height: "64px",
    },
  },
  infocontainer: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  name: {
    display: 'block',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    padding: 4,
    border: 0,
    fontSize: 18,
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
    },
  },
  description: {
    display: 'block',
    height: 90,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    border: 0,
    fontSize: 18,
    padding: 4,
    marginTop: 8,
    marginBottom: 8,
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
    },
  },
  addresscontainer: {
    marginTop: theme.spacing(1),
  },
  icon_button: {
    padding: 4,
    marginRight: theme.spacing(1),
    marginBottom: 4,
    backgroundColor: theme.palette.background.card,
    borderRadius: 8,
    "&:hover, &.Mui-focusVisible, &:active": {
      backgroundColor: theme.palette.background.card,
    },
  },
  positionimg: {
    width: 22,
    height: 22,
  },
  suite: {
    display: 'inline',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    padding: 4,
    marginRight: theme.spacing(1),
    border: 0,
    fontSize: 18,
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
    },
  },
  address: {
    display: 'inline',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    padding: 4,
    border: 0,
    fontSize: 18,
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
    },
  },
  typecontainer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  typename: {
    fontSize: "16px",
    lineHeight: "20px",
    margin: theme.spacing(1),
  },
  typetabs: {
    margin: 0,
    minHeight: 36,
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    paddingBottom: 2,
    backgroundColor: theme.palette.background.default,
  },
  typetab: {
    marginRight: 4,
    padding: 0,
    paddingTop: 2,
    minWidth: 32,
    minHeight: 32,
    fontFamily: "Arial",
    fontSize: 14,
    textTransform: "inherit",
    fullWidth: false,
    backgroundColor: theme.palette.background.default
  },
  typeimg: {
    margin: 0,
    padding: 2,
    width: 32,
    height: 32,
    borderRadius: "50%",
  },
  indicator: {
    backgroundColor: "transparent",
  },
  title: {
    fontSize: "16px",
    lineHeight: "20px",
  },
  bottomspace: {
    paddingBottom: theme.spacing(4),
  },
  deletebtn: {
    //position: "absolute",
    position: "fixed",
    bottom: theme.spacing(8),
    zIndex: 1100,
    backgroundColor: "#D30404",
    color: "#FFFFFF",
    borderRadius: "30px",
    padding: "8px 8px",
    fontSize: "16px",
    width: 260,
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: "#D30404",
      color: "#FFFFFF",
    }
  },
  applybtn: {
    //position: "absolute",
    position: "fixed",
    bottom: theme.spacing(1),
    zIndex: 1100,
    backgroundColor: "#1878F3",
    color: "#FFFFFF",
    borderRadius: "30px",
    padding: "8px 8px",
    fontSize: "16px",
    width: 260,
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: "#1878F3",
      color: "#FFFFFF",
    }
  },
  applybtn_disabled: {
    position: "fixed",
    bottom: theme.spacing(1),
    zIndex: 1100,
    backgroundColor: "#1878F3",
    color: "#FFFFFF",
    borderRadius: "30px",
    padding: "8px 8px",
    fontSize: "16px",
    width: 260,
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: "#3AB54A",
      color: "#FFFFFF",
    },
    opacity: 0.38,
  },
});


class CleanAirLocationEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      suite: "",
      address: "",
      postcode: "",
      socialurl: "",
      latitude: "",
      longitude: "",
      loctype: LOCATION_TYPE_MUSEUM,
      showApplyConfirmDlg: false,
      showDeleteConfirmDlg: false
    };

    this.handleNavBack = this.handleNavBack.bind(this);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    
    this.handleSubmitLocation = this.handleSubmitLocation.bind(this);
    this.handleDeleteLocation = this.handleDeleteLocation.bind(this);
  }

  setError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();
  }

  showSuccess = (message) => {
    ToastSuccess(message);
  }

  setWaiting = (waiting) => {
    if (waiting) {
      this.props.requestDataPending();
    } else {
      this.props.requestDataFinished();
    }
  }

  componentDidMount = () => {
    const { selected_location } = this.props;

    if (!selected_location) {
      this.handleNavBack();
      return;
    }

    this.setState({
      ...this.state,
      name: selected_location.name,
      description: selected_location.description,
      suite: selected_location.suite,
      address: selected_location.address,
      postcode: selected_location.postcode,
      socialurl: selected_location.socialurl,
      latitude: selected_location.latitude,
      longitude: selected_location.longitude,
      loctype: selected_location.type,
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
  };

  handleNavBack = () => {
    this.props.history.goBack();
  }

  handleCancel = () => {
    this.setState({
      ...this.state,
      showApplyConfirmDlg: false,
      showDeleteConfirmDlg: false
    });
  }

  handleApply = () => {
    this.setState({
      ...this.state,
      showApplyConfirmDlg: true
    });
  }

  handleDelete = () => {
    this.setState({
      ...this.state,
      showDeleteConfirmDlg: true
    });
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleChangeType = (event, newValue) => {
    if (newValue === null) return;
    const { loctype } = this.state;
    if (loctype === newValue) return;

    this.setState({
      ...this.state,
      loctype: newValue
    });
  }

  handleSubmitLocation = async () => {
    const { authUser, selected_location } = this.props;
    const {
      name,
      description,
      suite,
      address,
      postcode,
      socialurl,
      latitude,
      longitude,
      loctype,
    } = this.state;

    this.setState({
      ...this.state,
      showApplyConfirmDlg: false
    });

    if (name.trim() === "") {
      this.setError("Name should be given");
      return;
    }
    
    if (socialurl) {
      const source_link = check_source_link(socialurl.trim());
      if (!source_link) {
        this.setError("Twitter/Instagram Url is invalid");
        return;
      }
      if (source_link.branch !== ARTICLE_BRANCH_TWITTER && source_link.branch !== ARTICLE_BRANCH_INSTAGRAM) {
        this.setError("Url should be either twitter or instagram url");
        return;
      }
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.setWaiting(true);

    const slug = slugify(name.trim());
    const currentTime = new Date().toISOString();

    // update location
    const location = {
      id: selected_location.id,
      region_id: selected_location.region.id,
      type: loctype,
      suite: suite ? suite.trim() : null,
      address: address.trim(),
      postcode: postcode,
      latitude: latitude,
      longitude: longitude,
      name: name.trim(),
      description: description ? description.trim() : null,
      slug: slug,
      social_link: socialurl ? socialurl.trim() : null,
      approved: this._isModerator(),
      approved_at: this._isModerator() ? currentTime : null,
      approved_by: this._isModerator() ? authUser.uid : null
    };

    await gqlservice
      .update_map_location(location)
      .then((result) => {
        return gqlservice.map_location_by_id(location.id);
      })
      .then((result) => {
        if (result.data.locations.length > 0) {
          this.props.selectMapLocation(result.data.locations[0]);
        }
        ToastSuccess("Location updated successfully");
      }, (reason) => {
        this.setError(reason.msg);
        return;
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        return;
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_CHANGE,
      object: `the location ${selected_location.name}`,
      fromto: `to the cleanairmap`,
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

    const path = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "bottom" },
    };
    this.props.history.push(path);
  }

  handleDeleteLocation = async () => {
    const { authUser, selected_location } = this.props;

    this.setState({
      ...this.state,
      showDeleteConfirmDlg: false
    });

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.setWaiting(true);

    await gqlservice
      .delete_map_location(selected_location.id)
      .then((result) => {
        if (result.data.delete_locations.affected_rows > 0) {
          this.props.deleteMapLocation(selected_location.id);
          ToastSuccess("Location deleted");
        } else {
          this.setError("Failed to delete location");
          return;
        }
      })
      .then((result) => {
        if (result.data.locations.length > 0) {
          this.props.selectMapLocation(result.data.locations[0]);
        }
        ToastSuccess("Location updated successfully");
      }, (reason) => {
        this.setError(reason.msg);
        return;
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        return;
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_DELETE,
      object: `the location ${selected_location.name}`,
      fromto: `of cleanairmap`,
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

    const path = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "bottom" },
    };
    this.props.history.push(path);
  }

  _isModerator = () => {
    const { loggedIn, authUser, selected_location } = this.props;
    if (!loggedIn) {
      return false;
    }

    // check if the user is a moderator of this location
    if (authUser.locations_moderated.find(
      (moderator) => moderator.approved && moderator.location_id === selected_location.id
    ) !== undefined) {
      return true;
    };
    // check if the user is a moderator of this region
    if (authUser.regions_moderated.find(
      (moderator) => moderator.approved && moderator.region_id === selected_location.region.id
    ) !== undefined) {
      return true;
    };

    return false;
  };


  render() {
    const { 
      classes,
      theme_mode,
      requesting
    } = this.props;
    const {
      name,
      description,
      suite,
      address,
      socialurl,
      loctype,
      showApplyConfirmDlg,
      showDeleteConfirmDlg,
    } = this.state;

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    const applyButtonPos = (width - 260) / 2;

    let text_width = width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH - 32 : width - 32;
    let address_width = width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH - 180 : width - 180;

    let apply_enabled = false;
    if (name && address) {
      apply_enabled = true;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            title={"Edit Location"}
            width={MAX_ARTICLE_WIDTH}
            onNavBack={this.handleNavBack}
          />
        </div>

        <div className={classes.infocontainer}>
          <input
            name="name"
            placeholder="Name"
            value={name || ""}
            className={classes.name}
            style={{width: text_width}}
            onChange={this.handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={description || ""}
            className={classes.description}
            style={{width: text_width}}
            onChange={this.handleChange}
          />
          <input
            name="socialurl"
            placeholder="Twitter/Instagram URL"
            value={socialurl || ""}
            className={classes.name}
            style={{width: text_width}}
            onChange={this.handleChange}
          />
          <div className={classes.addresscontainer}>
            <IconButton
              className={classes.icon_button}
            >
              <img
                alt={"current position"}
                src={`/static/images/icons/${theme_mode}/gps.png`}
                className={classes.positionimg}
              />
            </IconButton>
            <input 
              name="suite"
              placeholder="Suite"
              value={suite || ""}
              className={classes.suite}
              style={{width: 100}}
              onChange={this.handleChange}
            />
            <input 
              name="address"
              placeholder="Address"
              value={address || ""}
              className={classes.address}
              style={{width: address_width}}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className={classes.typecontainer}>
          <Typography className={classes.typename}>
            {CONF_LOCATION_TYPES[loctype+1].name}
          </Typography>
          <Tabs
            className={classes.typetabs}
            classes={{ indicator: classes.indicator }}
            value={loctype}
            onChange={this.handleChangeType}
            variant="scrollable"
            scrollButtons="auto"
          >
            {CONF_LOCATION_TYPES.slice(1).map((item, index) => (
              <Tab
                value={item.value}
                key={item.name}
                className={classes.typetab}
                icon={
                  <img
                    alt={item.name}
                    src={`/static/images/icons/loc_types/${item.image}`}
                    className={classes.typeimg}
                    style={{backgroundColor: `${item.color}`}}
                  />
                }
              />
            ))}
          </Tabs>
        </div>

        <div className={classes.bottomspace} />

        <Button
          className={classes.deletebtn}
          style={{left: applyButtonPos}}
          onClick={this.handleDelete}
        >
          Delete Location
        </Button>

        {apply_enabled &&
          <Button
            className={classes.applybtn}
            style={{left: applyButtonPos}}
            onClick={this.handleApply}
          >
            Save
          </Button>
        }
        {!apply_enabled &&
          <Button
            className={classes.applybtn_disabled}
            style={{left: applyButtonPos}}
          >
            Save
          </Button>
        }

        <DlgConfirm
          open={showApplyConfirmDlg}
          title={"Update Location"}
          content={"Do you really want to update this location?"}
          onOK={this.handleSubmitLocation}
          onCancel={this.handleCancel}
        />
        <DlgConfirm
          open={showDeleteConfirmDlg}
          title={"Delete Location"}
          content={"Do you really want to delete this location?"}
          onOK={this.handleDeleteLocation}
          onCancel={this.handleCancel}
        />
        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting,
  selected_location: state.mapState.selected_location
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withRouter,
  withAuthentication,
  withAuthorization(condition),
  geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirLocationEdit);

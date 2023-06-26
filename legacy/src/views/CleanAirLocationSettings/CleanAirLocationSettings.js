import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { 
  Button, 
  Typography, 
  Grid,
  Avatar,
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { withFirebase } from 'services';
import { withAuthentication } from "session";
import { 
  BasicAppBar, 
  Option,
  WaitingDialog
} from "components";
import * as ROUTES from "constants/routes";
import { GraphqlService } from "services";
import {
  MAX_WINDOW_WIDTH,
} from "constants/types";
import { ToastError } from "utility/toast";


const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_WINDOW_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default
  },
  appbar: {
    width: "100%",
    height: "56px",
    [theme.breakpoints.up('sm')]: {
      height: "64px",
    },
  },
  optioncontainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  content: {
    position: "relative",
    padding: theme.spacing(1)
  },
  sectiontitle: {
    marginLeft: theme.spacing(2),
    display: "block",
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 0,
    color: theme.palette.text.primary,
  },
  useritem: {
    position: "relative",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: 40,
    height: 28,
  },
  image: {
    width: 28,
    height: 28,
  },
  info: {
    width: 220,
  },
  name: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "14px",
    color: theme.palette.text.primary,
  },
  label: {
    fontSize: "14px",
    fontWeight: 100,
    lineHeight: "14px",
    color: theme.palette.text.secondary,
  },
  icon: {
    padding: 2,
    width: 24,
    height: 24,
    color: theme.palette.primary.contrastText,
  },
  actionbtn: {
    backgroundColor: theme.palette.background.main,
    borderRadius: "20px",
    padding: "4px 10px",
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textTransform: "initial",
    "&:hover": {
      backgroundColor: theme.palette.background.main,
    },
  },
});


const OPTION_READINGS     = 0;
const OPTION_IMAGEUPLOAD  = 1;
const OPTION_MODERATION   = 2;
const OPTION_DESCRIPTION  = 3;
const OPTION_COMMENTS     = 4;

const OptionsConf = [
  {
    title   : "Readings",
    btntype : "openclose"
  },
  {
    title   : "Image Upload",
    btntype : "openclose"
  },
  {
    title   : "Moderation",
    btntype : "openclose"
  },
  {
    title   : "Reading Description",
    btntype : "openclose"
  },
  {
    title   : "Comments on Readings",
    btntype : "openclose"
  }
];


class CleanAirLocationSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      op_readings: true,
      op_imageupload: true,
      op_moderation: true,
      op_description: true,
      op_comments: true,
      banned_users: []
    };

    this.handleNavBack = this.handleNavBack.bind(this);

    this.handleToggleReadings = this.handleToggleReadings.bind(this);
    this.handleToggleImageupload = this.handleToggleImageupload.bind(this);
    this.handleToggleModeration = this.handleToggleModeration.bind(this);
    this.handleToggleDescription = this.handleToggleDescription.bind(this);
    this.handleToggleComments = this.handleToggleComments.bind(this);

    this.handleRestore = this.handleRestore.bind(this);
  }

  setError = message => {
    ToastError(message);
  };

  setWaiting = waiting => {
    if (waiting) {
      this.props.requestDataPending();
    } else {
      this.props.requestDataFinished();
    }
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

  componentDidMount = async () => {
    const { selected_location } = this.props;

    this.setState({
      ...this.state,
      op_readings: selected_location.op_readings,
      op_imageupload: selected_location.op_imageupload,
      op_moderation: selected_location.op_moderation,
      op_description: selected_location.op_description,
      op_comments: selected_location.op_comments,
      banned_users: selected_location.location_users_banned
    });
  }

  handleNavBack = () => {
    this.props.history.goBack();
  };

  handleToggleReadings = async () => {
    const { selected_location } = this.props;
    const { op_readings } = this.state;

    const new_op_readings = !op_readings;
    this.setState({
      ...this.state,
      op_readings: new_op_readings
    });

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.setWaiting(true);

    await gqlservice.update_map_location_op_readings(selected_location.id, new_op_readings)
      .then(result => {
        this.props.updateMapLocationOpReadings(selected_location.id, new_op_readings);
      }, reason => {
        this.setError(reason.msg);
        this.setState({
          ...this.state,
          op_readings: op_readings
        });
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        this.setState({
          ...this.state,
          op_readings: op_readings
        });
      });

    this.setWaiting(false);
  }

  handleToggleImageupload = async () => {
    const { selected_location } = this.props;
    const { op_imageupload } = this.state;
    
    const new_op_imageupload = !op_imageupload;
    this.setState({
      ...this.state,
      op_imageupload: new_op_imageupload
    });

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.setWaiting(true);

    await gqlservice.update_map_location_op_imageupload(selected_location.id, new_op_imageupload)
      .then(result => {
        this.props.updateMapLocationOpImageupload(selected_location.id, new_op_imageupload);
      }, reason => {
        this.setError(reason.msg);
        this.setState({
          ...this.state,
          op_imageupload: op_imageupload
        });
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        this.setState({
          ...this.state,
          op_imageupload: op_imageupload
        });
      });

    this.setWaiting(false);
  }

  handleToggleModeration = async () => {
    const { selected_location } = this.props;
    const { op_moderation } = this.state;

    const new_op_moderation = !op_moderation;
    this.setState({
      ...this.state,
      op_moderation: new_op_moderation
    });

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.setWaiting(true);

    await gqlservice.update_map_location_op_moderation(selected_location.id, new_op_moderation)
      .then(result => {
        this.props.updateMapLocationOpModeration(selected_location.id, new_op_moderation);
      }, reason => {
        this.setError(reason.msg);
        this.setState({
          ...this.state,
          op_moderation: op_moderation
        });
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        this.setState({
          ...this.state,
          op_moderation: op_moderation
        });
      });

    this.setWaiting(false);
  }

  handleToggleDescription = async () => {
    const { selected_location } = this.props;
    const { op_description } = this.state;

    const new_op_description = !op_description;
    this.setState({
      ...this.state,
      op_description: new_op_description
    });

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.setWaiting(true);

    await gqlservice.update_map_location_op_description(selected_location.id, new_op_description)
      .then(result => {
        this.props.updateMapLocationOpDescription(selected_location.id, new_op_description);
      }, reason => {
        this.setError(reason.msg);
        this.setState({
          ...this.state,
          op_description: op_description
        });
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        this.setState({
          ...this.state,
          op_description: op_description
        });
      });

    this.setWaiting(false);
  }

  handleToggleComments = async () => {
    const { selected_location } = this.props;
    const { op_comments } = this.state;

    const new_op_comments = !op_comments;
    this.setState({
      ...this.state,
      op_comments: new_op_comments
    });

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.setWaiting(true);

    await gqlservice.update_map_location_op_comments(selected_location.id, new_op_comments)
      .then(result => {
        this.props.updateMapLocationOpDescription(selected_location.id, new_op_comments);
      }, reason => {
        this.setError(reason.msg);
        this.setState({
          ...this.state,
          op_comments: op_comments
        });
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        this.setState({
          ...this.state,
          op_comments: op_comments
        });
      });

    this.setWaiting(false);
  }

  handleRestore = async (user) => {
    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    gqlservice.delete_maplocation_banned_user(user.id)
      .then(result => {
        const new_users = this.state.banned_users.filter(banned_user => banned_user.id !== user.id);
        this.setState({
          ...this.state,
          banned_users: new_users
        });
      }, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });
  }

  _renderBannedUser = (userInfo, index, classes, theme, onRestore) => {
    const user = userInfo.user;
    return (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        key={`banned-user-${index}`}
        spacing={1}
      >
        <Grid item className={classes.avatar}>
          <Avatar className={classes.image} src={user.image} />
        </Grid>
        <Grid item className={classes.info}>
          <Typography className={classes.name}>{user.username}</Typography>
          <Typography className={classes.label}>{user.biography}</Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.actionbtn}
            startIcon={
              <img
                className={classes.icon}
                alt="Restore"
                src={`/static/images/icons/${theme}/checkmark.png`}
              />
            }
            onClick={e => onRestore(userInfo)}
          >
            Restore
          </Button>
        </Grid>
      </Grid>
    )
  }

  render() {
    const { 
      classes, 
      theme_mode, 
      requesting 
    } = this.props;
    const {
      op_readings,
      op_imageupload,
      op_moderation,
      op_description,
      op_comments,
      banned_users, 
    } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            title={"Settings"}
            onNavBack={this.handleNavBack}
          />
        </div>

        <Grid
          container
          className={classes.optioncontainer}
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item>
            <Option
              theme={theme_mode}
              mode={op_readings}
              buttontype={OptionsConf[OPTION_READINGS].btntype}
              title={OptionsConf[OPTION_READINGS].title}
              onToggle={this.handleToggleReadings}
            />
          </Grid>
          <Grid item>
            <Option
              theme={theme_mode}
              mode={op_imageupload}
              buttontype={OptionsConf[OPTION_IMAGEUPLOAD].btntype}
              title={OptionsConf[OPTION_IMAGEUPLOAD].title}
              onToggle={this.handleToggleImageupload}
            />
          </Grid>
          <Grid item>
            <Option
              theme={theme_mode}
              mode={op_moderation}
              buttontype={OptionsConf[OPTION_MODERATION].btntype}
              title={OptionsConf[OPTION_MODERATION].title}
              onToggle={this.handleToggleModeration}
            />
          </Grid>
          <Grid item>
            <Option
              theme={theme_mode}
              mode={op_description}
              buttontype={OptionsConf[OPTION_DESCRIPTION].btntype}
              title={OptionsConf[OPTION_DESCRIPTION].title}
              onToggle={this.handleToggleDescription}
            />
          </Grid>
          <Grid item>
            <Option
              theme={theme_mode}
              mode={op_comments}
              buttontype={OptionsConf[OPTION_COMMENTS].btntype}
              title={OptionsConf[OPTION_COMMENTS].title}
              onToggle={this.handleToggleComments}
            />
          </Grid>
        </Grid>

        <div className={classes.content}>
          <Typography className={classes.sectiontitle}>{"PERMANENTLY BANNED USERS"}</Typography>
          {banned_users.length > 0 && banned_users.map((user, index) => 
            <div className={classes.useritem}>
              {this._renderBannedUser(user, index, classes, theme_mode, this.handleRestore)}
            </div>
          )}
        </div>

        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting,
  selected_location: state.mapState.selected_location,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withAuthentication,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirLocationSettings);

import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withFirebase } from 'services';
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { ToastContainer } from "react-toastify";
import { 
  BasicAppBar, 
  WaitingDialog
} from "components";
import { withAuthentication, withAuthorization } from "session";
import { GraphqlService } from "services";
import * as ROUTES from "constants/routes";
import { USER_TAGS_MIN_CNT, MAX_ARTICLE_WIDTH } from "constants/types";
import { ToastError } from "utility/toast";


const condition = (authUser) => !!authUser && authUser.uid !== ""

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
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
  titlediv: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 20,
    fontWeight: 500,
  },
  phonediv: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
  },
  descdiv: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(24),
  },
  description: {
    color: theme.palette.text.primary,
    fontSize: 16,
    fontWeight: 400,
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
  },
  buttonbox: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  skipbutton: {
    backgroundColor: theme.palette.background.default,
    "&:hover": {
      backgroundColor: theme.palette.background.default
    },
    borderRadius: "30px",
    border: "3px solid #1878F3",
    boxSizing: "border-box",
    padding: "8px 8px",
    width: "100%",
    color: theme.palette.text.primary,
    textTransform: "initial",
    marginTop: theme.spacing(1),
  },
  skipbuttontext: {
    color: theme.palette.text.primary,
    fontWeight: 400,
    fontSize: 16
  },
  savebutton: {
    backgroundColor: "#1878F3",
    "&:hover": {
      backgroundColor: "#1878F3"
    },
    color: theme.palette.text.primary,
    borderRadius: "30px",
    border: "3px solid #1878F3",
    padding: "8px 8px",
    width: "100%",
    textTransform: "initial",
    marginTop: theme.spacing(1),
  },
  savebutton_disabled: {
    backgroundColor: "#303030",
    "&:hover": {
      backgroundColor: "#303030"
    },
    color: theme.palette.text.primary,
    borderRadius: "30px",
    border: "3px solid #303030",
    padding: "8px 8px",
    width: "100%",
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
    opacity: 0.5
  },
  buttontext: {
    color: "#FFF",
    fontWeight: 400,
    fontSize: 16
  },
});


class ProfilePhone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phonenumber: ""
    };

    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleNavBack = this.handleNavBack.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
  }

  setError = message => {
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

  componentDidMount() {
    const { authUser } = this.props;

    this.setState({
      ...this.state,
      phonenumber: authUser.phone,
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
  };

  handleChangePhone = (phonenumber) => {
    if (phonenumber) {
      this.setState({
        ...this.state,
        phonenumber: phonenumber
      });
    }
  };

  handleSubmit = () => {
    const { phonenumber } = this.state;

    if (phonenumber) {
      this.updateProfilePhone(phonenumber);
    }
  };

  updateProfilePhone = async (phonenumber) => {
    const { authUser } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);
    await gqlservice
      .update_user_phone(authUser.uid, phonenumber)
      .then(
        result => {
          let user = result.data.update_users.returning[0];
          this.props.updateUserProfile(user);

          const location = {
            pathname: ROUTES.HOME,
            state: { animation: "right" },
          };
          this.props.history.push(location);
        },
        reason => {
          this.setError(reason.msg);
        }
      )
      .catch(err => {
        this.setError(JSON.stringify(err));
      });
  }

  handleSkip = async () => {
    const { authUser, tags } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);
    await gqlservice
      .update_user_skipprofile(authUser.uid, true)
      .then(
        result => {
          let user = result.data.update_users.returning[0];
          this.props.updateUserProfile(user);
        },
        reason => {
          this.setError(reason.msg);
        }
      )
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    const mytags = tags.filter(
      tag =>
        tag.tag_users.findIndex(
          tag_user => tag_user.user_id === authUser.uid
        ) !== -1
    );

    if (tags.length === 0 || mytags.length >= USER_TAGS_MIN_CNT) {
      const location = {
        pathname: ROUTES.HOME,
        state: { animation: "right" },
      };
      this.props.history.push(location);
    } else {
      const location = {
        pathname: ROUTES.ONBOARDING,
        state: { animation: "right" },
      };
      this.props.history.push(location);
    }
  }

  render() {
    const { classes, requesting } = this.props;
    const { phonenumber } = this.state;

    let apply_enabled = false;
    if (phonenumber) {
      apply_enabled = true;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            width={MAX_ARTICLE_WIDTH}
            title={"Profile Phone"}
            onNavBack={this.handleNavBack}
          />
        </div>
        <div className={classes.titlediv}>
          <Typography className={classes.title}>
            Enter your Phone #
          </Typography>
        </div>
        <div className={classes.phonediv}>
          <PhoneInput
            country={'us'}
            value={phonenumber}
            onChange={phone => this.handleChangePhone(phone)}
          />
        </div>
        <div className={classes.descdiv}>
          <Typography className={classes.description}>
            This helps us match you with your friends and allows you to accept invitations to private groups
          </Typography>
        </div>
        <div>
          <div className={classes.buttonbox}>
            <Button
              className={classes.skipbutton}
              onClick={this.handleSkip}
            >
              <Typography className={classes.skipbuttontext}>
                Skip
              </Typography>
            </Button>
          </div>
          <div className={classes.buttonbox}>
            {apply_enabled &&
              <Button
                className={classes.savebutton}
                disabled={false}
                clickable={"false"}
                endIcon={<ArrowForwardIcon style={{color: "white"}} />}
                onClick={this.handleSubmit}
              >
                <Typography className={classes.buttontext}>
                  Save
                </Typography>
              </Button>
            }
            {!apply_enabled &&
              <Button 
                className={classes.savebutton_disabled} 
                disabled={true}
                endIcon={<ArrowForwardIcon style={{color: "white"}} />}
              >
                <Typography className={classes.buttontext}>
                  Save
                </Typography>
              </Button>
            }
          </div>
        </div>
        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  tags: state.dataState.tags,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  // withRouter,
  withAuthentication,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ProfilePhone);

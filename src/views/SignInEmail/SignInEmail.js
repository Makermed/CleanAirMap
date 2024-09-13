import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, IconButton, Box, TextField, Icon } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import validate from "validate.js";
import { BasicAppBar, ImageSlider, WaitingSpinner } from "../../components";
import * as ROUTES from "../../constants/routes";
import { MAX_ARTICLE_WIDTH, SIGN_METHOD_EMAIL } from "../../constants/types";

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

const ERROR_MSG_ACCOUNT_UNREGISTERED = "This account was unregistered";

const ERROR_MSG_SERVER_ERROR =
  "Sorry, server doesn't response, retry again later";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const CREDIT_UPDATE_INTERVAL = 30 * MS_PER_DAY;

const currentDate = Date.now();
const expiryDate = new Date(currentDate + CREDIT_UPDATE_INTERVAL);

const emptyUser = {
  uid: "",
  name: "",
  username: "",
  biography: "",
  image: "",
  email: "",
  emailVerified: false,
  phone: "",
  phoneVerified: false,
  links: [],
  msgToken: null,
  signMethod: SIGN_METHOD_EMAIL,
  approved: false,
  free_credits_expiry_date: expiryDate.toISOString(),
};

const styles = (theme) => ({
  root: {
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: theme.palette.background.default,
  },
  appbar: {
    width: MAX_ARTICLE_WIDTH,
    maxWidth: "100%",
    height: "56px",
    [theme.breakpoints.up("sm")]: {
      height: "64px",
    },
  },
  container: {
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: theme.palette.background.default,
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  slider: {
    marginBottom: 16,
  },
  textField: {
    color: theme.palette.text.primary,
    marginTop: 8,
    marginBottom: 0,
  },
  customInput: {
    "&:before": {
      borderBottomColor: theme.palette.text.secondary,
    },
    "&:after": {
      borderBottomColor: theme.palette.text.secondary,
    },
    "&.MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: theme.palette.text.secondary,
    },
  },
  signupline: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 4,
  },
  resetline: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: "#1878F3",
    color: "#FFFFFF",
    borderRadius: "30px",
    padding: "10px 8px",
    width: "100%",
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: "#1878F3",
      color: "#FFFFFF",
    },
  },
  signinForm: {
    marginLeft: 16,
    marginRight: 16,
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  socialIcon: {
    color: theme.palette.text.primary,
    Width: 36,
    height: 36,
    marginRight: theme.spacing(1),
  },
  emailIcon: {
    color: theme.palette.text.primary,
    width: 36,
    height: 36,
    marginRight: theme.spacing(1),
    padding: 4,
  },
  error: {
    color: theme.palette.error.main,
  },
  info: {
    color: theme.palette.info.main,
  },
  signlink: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  iconContainer: {
    textAlign: "center",
    margin: "5px",
  },
  iconText: {
    marginTop: "5px",
    cursor: "pointer",
    fontFamily: "Roboto",
  },
  iconWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  signlinkBtn: {
    color: "#FFFFFF",
    textDecoration: "none",
  },
});

class SignInEmail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msgToken: null,
      isValid: false,
      emailVerified: true,
      isSent: false,
      values: {},
      touched: {},
      errors: {},
    };

    this.getStartedRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSkip = this.handleSkip.bind(this);

    this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this);
    this.handleAppleSignIn = this.handleAppleSignIn.bind(this);
    this.handlePhoneSignIn = this.handlePhoneSignIn.bind(this);

    this.onSendEmailVerification = this.onSendEmailVerification.bind(this);
  }

  componentDidMount = () => {
    if (this.props.firebase?.messaging) {
      const messaging = this.props.firebase?.messaging;
      messaging
        .requestPermission()
        .then(() => {
          return messaging.getToken();
        })
        .then((data) => {
          this.setState({
            ...this.state,
            msgToken: data,
          });
          console.warn("token :", data);
        });
    }
  };

  setWaiting = (waiting) => {
    if (waiting) {
      this.props.requestDataPending();
    } else {
      this.props.requestDataFinished();
    }
  };

  handleNavBack = () => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handleSkip = () => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handleChange = (event) => {
    event.persist();

    this.setState(
      {
        ...this.state,
        values: {
          ...this.state.values,
          [event.target.name]:
            event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value,
        },
        touched: {
          ...this.state.touched,
          [event.target.name]: true,
        },
      },
      () => {
        const errors = validate(this.state.values, schema);
        this.setState({
          ...this.state,
          isValid: errors ? false : true,
          errors: errors || {},
        });
      }
    );
  };

  _signInProc = async (uid, email, emailVerified, method) => {
    let pathname = ROUTES.CLEANAIRMAP;

    const location = {
      pathname: pathname,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handleSignIn = (event) => {
    this._signInProc();
  };

  handleGoogleSignIn = (event) => {
    this._signInProc();
  };

  handleAppleSignIn = (event) => {};

  handlePhoneSignIn = () => {
    const location = {
      pathname: ROUTES.PHONE_SIGNIN,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handleSuccessClose = () => {
    this.setState({
      ...this.state,
      success: false,
      successMsg: "",
    });
  };

  onSendEmailVerification = () => {};

  render() {
    const { classes, theme_mode, requesting } = this.props;
    const { email, password } = this.state.values;
    const { emailVerified, isSent, errors, touched, isValid } = this.state;

    const hasError = (field) =>
      touched[field] && errors[field] ? true : false;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            width={MAX_ARTICLE_WIDTH}
            title={"Sign in to Raven"}
            action={"SKIP"}
            onNavBack={this.handleNavBack}
            onAction={this.handleSkip}
          />
        </div>

        <Box className={classes.container}>
          <Box className={classes.slider}>
            <ImageSlider />
          </Box>

          <Box className={classes.socialIcons}>
            <div
              className={classes.iconContainer}
              onClick={this.handleAppleSignIn}
            >
              <div className={classes.iconWrapper}>
                <IconButton>
                  <Icon className={classes.socialIcon}>
                    <i className="fa fa-lg fa-apple"></i>
                  </Icon>
                </IconButton>
                <span className={classes.iconText}>Apple</span>
              </div>
            </div>
            <div
              className={classes.iconContainer}
              onClick={this.handleGoogleSignIn}
            >
              <div className={classes.iconWrapper}>
                <IconButton>
                  <Icon className={classes.socialIcon}>
                    <i className="fa fa-lg fa-google"></i>
                  </Icon>
                </IconButton>
                <span className={classes.iconText}>Google</span>
              </div>
            </div>
            <div
              className={classes.iconContainer}
              onClick={this.handlePhoneSignIn}
            >
              <div className={classes.iconWrapper}>
                <IconButton>
                  <img
                    className={classes.emailIcon}
                    alt="phone"
                    src={`/static/images/icons/${theme_mode}/message.png`}
                  />
                </IconButton>
                <span className={classes.iconText}>SMS</span>
              </div>
            </div>
            <div className={classes.iconContainer}>
              <div className={classes.iconWrapper}>
                <IconButton>
                  <img
                    className={classes.emailIcon}
                    alt="email"
                    src={`/static/images/icons/${theme_mode}/email.png`}
                  />
                </IconButton>
                <span className={classes.iconText}>Email</span>
              </div>
            </div>
          </Box>

          <Box className={classes.signinForm}>
            <Box>
              <TextField
                className={classes.textField}
                error={hasError("email")}
                fullWidth
                required
                helperText={hasError("email") ? errors.email[0] : null}
                label={
                  <span
                    className={hasError("email") ? classes.error : classes.info}
                  >
                    Email
                  </span>
                }
                type="email"
                name="email"
                autoComplete="email"
                value={email || ""}
                onChange={this.handleChange}
                InputProps={{
                  classes: {
                    root: classes.customInput,
                  },
                }}
              />
              <TextField
                className={classes.textField}
                error={hasError("password")}
                fullWidth
                required
                helperText={hasError("password") ? errors.password[0] : null}
                label={
                  <span
                    className={
                      hasError("password") ? classes.error : classes.info
                    }
                  >
                    Password
                  </span>
                }
                name="password"
                onChange={this.handleChange}
                type="password"
                value={password || ""}
                InputProps={{
                  classes: {
                    root: classes.customInput,
                  },
                }}
              />
            </Box>
            <div>
              <Button
                className={classes.submitBtn}
                disabled={!isValid}
                onClick={this.handleSignIn}
              >
                Get Started
              </Button>
              {!emailVerified && (
                <Button
                  className={classes.submitBtn}
                  disabled={isSent}
                  onClick={this.onSendEmailVerification}
                >
                  Send Verification Email
                </Button>
              )}
            </div>
          </Box>
        </Box>

        <WaitingSpinner open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

SignInEmail.propTypes = {
  history: PropTypes.object,
  firebase: PropTypes.object,
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  login_backroute: state.uiState.login_backroute,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SignInEmail);

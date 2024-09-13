import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, IconButton, Icon } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { BasicAppBar, ImageSlider } from "../../components";
import * as ROUTES from "../../constants/routes";
import { MAX_ARTICLE_WIDTH, SIGN_METHOD_EMAIL } from "../../constants/types";

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
  titlediv: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: 28,
    fontWeight: 400,
  },
  slider: {
    marginBottom: 16,
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
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
  termsdiv: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  description: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 300,
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
  signlinkBtn: {
    color: "#FFFFFF",
    textDecoration: "none",
  },
  orClass: {
    width: "100%",
    textAlign: "center",
    borderBottom: "1px solid #00000024",
    lineHeight: "0.1em",
    margin: "10px 0 20px",
  },
  h2Span: {
    background: "#fff",
    padding: "0 10px;",
  },
});

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

const ERROR_MSG_ACCOUNT_UNREGISTERED = "This account was unregistered";

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

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msgToken: null,
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleSkip = this.handleSkip.bind(this);

    this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this);
    this.handleEmailSignIn = this.handleEmailSignIn.bind(this);
    this.handlePhoneSignIn = this.handlePhoneSignIn.bind(this);
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

  handleNavBack = () => {
    const { login_backroute } = this.props;

    const location = {
      pathname: login_backroute === null ? ROUTES.CLEANAIRMAP : login_backroute,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handleSkip = () => {
    const { login_backroute } = this.props;

    const location = {
      pathname: login_backroute === null ? ROUTES.CLEANAIRMAP : login_backroute,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handleGoogleSignIn = (event) => {
    event.preventDefault();
  };

  handleAppleSignIn = (event) => {};

  handleEmailSignIn = () => {
    const location = {
      pathname: ROUTES.EMAIL_SIGNIN,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handlePhoneSignIn = () => {
    const location = {
      pathname: ROUTES.PHONE_SIGNIN,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handleClickTerms = () => {};

  render() {
    const { classes, theme_mode } = this.props;

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

        <div className={classes.container}>
          <div className={classes.slider}>
            <ImageSlider />
          </div>
          <div className={classes.titlediv}>
            <Typography className={classes.title}>Sign in to Raven</Typography>
          </div>
          <div className={classes.socialIcons}>
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
            <div
              className={classes.iconContainer}
              onClick={this.handleEmailSignIn}
            >
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
          </div>
          <div className={classes.orClass}>
            <span className={classes.h2Span}>or</span>
          </div>
          <div className={classes.termsdiv}>
            <Typography className={classes.description}>
              By logging in, I agree to Raven’s
              <br />
              <u style={{ cursor: "pointer" }} onClick={this.handleClickTerms}>
                Terms
              </u>
              &nbsp;and&nbsp;
              <u
                style={{ cursor: "pointer" }}
                onClick={this.handleClickPrivacy}
              >
                Privacy Policy
              </u>
            </Typography>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.object,
  firebase: PropTypes.object,
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  login_backroute: state.uiState.login_backroute,
  theme_mode: state.uiState.theme_mode,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SignIn);

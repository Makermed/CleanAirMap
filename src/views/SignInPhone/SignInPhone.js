import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer } from "react-toastify";
import { BasicAppBar, WaitingSpinner } from "../../components";
import * as ROUTES from "../../constants/routes";
import { MAX_ARTICLE_WIDTH, SIGN_METHOD_PHONE } from "../../constants/types";
import { ToastError } from "../../utility/toast";
import { logger } from "../../utility/logging";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
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
  buttoncontainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttonbox: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  skipbutton: {
    backgroundColor: theme.palette.background.default,
    "&:hover": {
      backgroundColor: theme.palette.background.default,
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
    fontSize: 16,
  },
  savebutton: {
    backgroundColor: "#1878F3",
    "&:hover": {
      backgroundColor: "#1878F3",
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
      backgroundColor: "#303030",
    },
    color: theme.palette.text.primary,
    borderRadius: "30px",
    border: "3px solid #303030",
    padding: "8px 8px",
    width: "100%",
    textTransform: "initial",
    marginTop: theme.spacing(1),
    opacity: 0.5,
  },
  buttontext: {
    color: "#FFF",
    fontWeight: 400,
    fontSize: 16,
  },
});

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
  signMethod: SIGN_METHOD_PHONE,
  approved: false,
  free_credits_expiry_date: expiryDate.toISOString(),
};

class SignInPhone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msgToken: null,
      phoneNumber: "",
      code: "",
      captchaSolved: false,
      dlgCode: false,
    };

    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleCloseVerifyDlg = this.handleCloseVerifyDlg.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
  }

  setError = (message) => {
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

  handleNavBack = () => {
    this.props.history.goBack();
  };

  handleCloseVerifyDlg = () => {
    this.setState({
      ...this.state,
      dlgCode: false,
    });
  };

  handleChangePhone = (phoneNumber) => {
    if (phoneNumber) {
      this.setState({
        ...this.state,
        phoneNumber: phoneNumber,
      });
    }
  };

  handleCodeChange = (event) => {
    this.setState({
      code: event.target.value,
    });
  };

  phoneSignIn = () => {
    const { phoneNumber } = this.state;
    const { firebase } = this.props;

    const appVerifier = window.recaptchaVerifier;
    logger.log("appVerifier :", window.recaptchaVerifier);
    firebase.auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        logger.log("Success, confirmation result :", confirmationResult);

        this.setState({
          ...this.state,
          dlgCode: true,
        });
      })
      .catch((error) => {
        logger.error("Error, SMS not sent!");
      });
  };

  _signInProc = async (user) => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handleSubmit = () => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handleSkip = async () => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  };

  render() {
    const { classes, requesting } = this.props;
    const { phoneNumber, dlgCode, code } = this.state;

    let apply_enabled = false;
    if (phoneNumber) {
      apply_enabled = true;
    }

    const title = dlgCode
      ? "Enter the code we just texted you"
      : "Enter your Phone #";

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
          <Typography className={classes.title}>{title}</Typography>
        </div>
        <div className={classes.phonediv}>
          {dlgCode ? (
            <TextField
              className={classes.textField}
              fullWidth
              required
              name="code"
              onChange={this.handleCodeChange}
              type="password"
              value={code || ""}
              InputProps={{
                classes: {
                  root: classes.customInput,
                },
              }}
            />
          ) : (
            <PhoneInput
              country={"ca"}
              value={phoneNumber}
              onChange={(phone) => this.handleChangePhone(phone)}
            />
          )}
        </div>
        <div className={classes.descdiv}>
          <Typography className={classes.description}>
            This helps us match you with your friends and allows you to accept
            invitations to private groups
          </Typography>
        </div>
        <div className={classes.buttoncontainer}>
          <div className={classes.buttonbox}>
            <Button className={classes.skipbutton} onClick={this.handleSkip}>
              <Typography className={classes.skipbuttontext}>Skip</Typography>
            </Button>
            {apply_enabled && (
              <Button
                id={"sign-in-button"}
                className={classes.savebutton}
                disabled={false}
                clickable={"false"}
                endIcon={<ArrowForwardIcon style={{ color: "white" }} />}
                onClick={dlgCode ? this.verifyCode : this.handleSubmit}
              >
                <Typography className={classes.buttontext}>Next</Typography>
              </Button>
            )}
            {!apply_enabled && (
              <Button
                className={classes.savebutton_disabled}
                disabled={true}
                endIcon={<ArrowForwardIcon style={{ color: "white" }} />}
              >
                <Typography className={classes.buttontext}>Next</Typography>
              </Button>
            )}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            id="recaptcha-container"
            style={{ display: "inline-block" }}
          ></div>
        </div>

        <WaitingSpinner open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

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
)(SignInPhone);

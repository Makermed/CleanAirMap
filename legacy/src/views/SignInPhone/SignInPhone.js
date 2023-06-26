import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withRouter } from "react-router-dom";
import { withFirebase } from 'services';
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer } from "react-toastify";
import { BasicAppBar, WaitingDialog } from "components";
// import { DlgVerifyCode } from "./components";
import { GraphqlService } from "services";
import * as ROUTES from "constants/routes";
import {
  MAX_ARTICLE_WIDTH,
  SIGN_METHOD_PHONE,
  GRAPHQL_SUCCESS,
} from "constants/types";
import { ROLE_USER, ROLE_ANONYMOUS } from "constants/user";
import { ToastError, ToastSuccess } from "utility/toast";


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

// const ERROR_CODE_ACCOUNT_EXISTS =
//   "auth/account-exists-with-different-credential";

// const ERROR_MSG_ACCOUNT_EXISTS = `
//   An account with an E-Mail address to
//   this social account already exists. Try to login from
//   this account instead and associate your social accounts on
//   your personal account page.
// `;

// const ERROR_CODE_ACCOUNT_UNREGISTERED = "auth/account-unregistered";
const ERROR_MSG_ACCOUNT_UNREGISTERED = "This account was unregistered";

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
  role: ROLE_ANONYMOUS,
  signMethod: SIGN_METHOD_PHONE,
  approved: false,
};

class SignInPhone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msgToken: null,
      phoneNumber: "",
      code: "",
      captchaSolved: false,
      dlgCode: false
    };

    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleVerifyCode = this.handleVerifyCode.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleCloseVerifyDlg = this.handleCloseVerifyDlg.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
  }

  componentDidMount = () => {
    // console.log("componentDidMount :", window.recaptchaVerifier);
    // window.recaptchaVerifier = undefined;
    // this.recaptchaVerifierVisible();
    // console.log("componentDidMount VisibleVerifier :", window.recaptchaVerifier);
    // this.recaptchaRender();
    if (this.props.firebase.messaging) {
      const messaging = this.props.firebase.messaging;
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

  handleVerifyCode = (code) => {
    // this.setState({
    //   ...this.state,
    //   code: code,
    //   dlgCode: false
    // }, this.verifyCode);
  };

  handleCodeChange = (event) => {
    this.setState({
      code: event.target.value,
    });
  };

  recaptchaVerifierVisible = () => {
    const { firebase } = this.props;
    window.recaptchaVerifier = new firebase.app_auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // console.log("reCAPTCHA solved, allow signInWithphoneNumber");
          this.setState({
            ...this.state,
            captchaSolved: true,
          });
        },
        "expired-callback": () => {
          // console.log("Response expired. Ask user to solve reCAPTCHA again.");
          this.setState({
            ...this.state,
            captchaSolved: false,
          });
        },
      }
    );
  };

  recaptchaRender = () => {
    const recaptchaVerifier = window.recaptchaVerifier;
    if (recaptchaVerifier) {
      recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    }
  };

  phoneSignIn = () => {
    const { phoneNumber } = this.state;
    const { firebase } = this.props;

    const appVerifier = window.recaptchaVerifier;
    // console.log("appVerifier :", window.recaptchaVerifier);
    firebase.auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log("Success, confirmation result :", confirmationResult);

        this.setState({
          ...this.state,
          dlgCode: true,
        });
      })
      .catch((error) => {
        console.log("Error, SMS not sent!");
      });
  };

  verifyCode = () => {
    const { code } = this.state;
    if (!window.confirmationResult) {
      this.setError("Sign in failed");
      // console.log("Failed to sign in with phone");
      return;
    }

    const { firebase } = this.props;

    // console.log("VerifyCode :", code);
    // console.log("VerifyCode confirm result :", window.confirmationResult);
    // window.confirmationResult.confirm(code).then((result) => {
    //   console.log("User signed in successfully.");
    //   const user = result.user;
    //   console.log("verified user :", user);

    // }).catch((error) => {
    //   console.log("User couldn't sign in (bad verification code?) :", error);
    // });
    var credential = firebase.app_auth.PhoneAuthProvider.credential(
      window.confirmationResult.verificationId,
      code
    );
    firebase.auth
      .signInWithCredential(credential)
      .then((result) => {
        // console.log("User signed in successfully :", result);
        const user = result.user;
        // console.log("verified user :", user);
        this._signInProc(user);
      })
      .catch((error) => {
        this.setError("Sign in failed (bad verification code)");
      });
  };

  isInvited = async (phonenumber, feed_join_info) => {
    const gqlservice = new GraphqlService();
    const invited = await gqlservice
      .invites_by_phone(phonenumber)
      .then(
        (result) => {
          const invites = result.data.user_invites;
          for (let invite of invites) {
            if (
              invite.is_phone &&
              invite.phoneno === phonenumber &&
              invite.invited_to === feed_join_info.feed_id
            ) {
              return true;
            }
          }
          return false;
        },
        (reason) => {
          return false;
        }
      )
      .catch((err) => {
        return false;
      });

    return invited;
  };

  isShared = async (feed_share_info) => {
    const gqlservice = new GraphqlService();
    const shared = await gqlservice
      .feed_share_by_id(feed_share_info.share_id)
      .then(
        (result) => {
          const feed_shares = result.data.feed_share;
          if (feed_shares.length > 0) {
            const feed_share = feed_shares[0];
            const now = new Date();
            const expired = new Date(feed_share.expired);
            return now < expired;
          } else {
            return false;
          }
        },
        (reason) => {
          this.setError(reason.msg);
          return false;
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
        return false;
      });

    return shared;
  };

  addFeedFollower = async (feed_id, user) => {
    const gqlservice = new GraphqlService();
    gqlservice.set_auth_jwt(user.token);

    // get followed feeds of this user
    let follows = 0;
    let result = await gqlservice.feed_followers(user.uid);
    if (result.status_code === GRAPHQL_SUCCESS) {
      follows = result.data.feed_followers.length;
    }

    const follower = {
      id: `${feed_id}-${user.uid}`,
      feed_id: feed_id,
      user_id: user.uid,
      order: follows,
    };
    await gqlservice.insert_feed_follower(follower);
  };

  _signInProc = async (user) => {
    const { firebase } = this.props;

    const token = await firebase.auth.currentUser.getIdToken();
    const idTokenResult = await firebase.auth.currentUser.getIdTokenResult();
    const hasuraClaim = idTokenResult.claims["https://hasura.io/jwt/claims"];

    if (!hasuraClaim) {
      // console.log("signInProc hasuraClaim undefined");
      ToastSuccess("Successfully registered in the Raven. Please sign in again please.");
      return;
    }

    let authUser = {};
    if (hasuraClaim) {
      const uid = user.uid;
      authUser = {
        uid,
        token,
        hasuraClaim,
      };
    } else {
      this.setError(ERROR_MSG_ACCOUNT_UNREGISTERED);
      return;
    }

    this.props.setAuthUser(authUser);

    // Create a user in database on graphql+postgresql
    let newuser = { ...emptyUser };
    newuser.uid = authUser.uid;
    newuser.role = ROLE_USER;
    newuser.approved = false;
    newuser.phone = user.phoneNumber;
    newuser.phoneVerified = true;
    newuser.signMethod = SIGN_METHOD_PHONE;
    user.msgToken = this.state.msgToken;

    const gqlservice = new GraphqlService();
    gqlservice.set_auth_jwt(token);

    let isNewUser = false;

    const result = await gqlservice.add_user(newuser);
    // console.log("add_user :", result);
    if (result.status_code !== GRAPHQL_SUCCESS || result.data.length === 0) {
      this.setError(ERROR_MSG_ACCOUNT_UNREGISTERED);
      return;
    }

    user = result.data[0];
    isNewUser = result.data.isNew;
    // console.log("User by graphql :", user, isNewUser);

    this.props.signIn(user);
    this.props.resetAllData();

    if (
      user.skipProfile ||
      (user.name !== undefined &&
        user.name !== "" &&
        user.username !== undefined &&
        user.username !== "" &&
        user.email !== undefined &&
        user.email !== "")
    ) {
      if (isNewUser) {
        const location = {
          pathname: ROUTES.ONBOARDING,
          state: { animation: "top" },
        };
        this.props.history.push(location);

      } else {
        const { feed_join_info, feed_share_info } = this.props;

        if (feed_join_info) {
          const invited = await this.isInvited(
            user.phoneNumber,
            feed_join_info
          );
          if (invited) {
            // add this user to the feed followers
            await this.addFeedFollower(feed_join_info.feed_id, user.uid);
          }

          // go to the feed
          let pathname = ROUTES.HOME;
          if (invited) {
            const { login_backroute } = this.props;
            pathname = login_backroute === null ? ROUTES.HOME : login_backroute;
          } else {
            pathname = ROUTES.HOME;
          }
          const location = {
            pathname: pathname,
            state: { animation: "top" },
          };
          this.props.history.push(location);
          this.props.deleteFeedJoinInfo();
          this.props.setLoginBackRoute(null);
        } else if (feed_share_info) {
          const shared = this.isShared(feed_share_info);
          if (shared) {
            // add this user to the feed followers
            await this.addFeedFollower(feed_share_info.feed_id, user.uid);
          }

          // go to the feed
          let pathname = ROUTES.HOME;
          if (shared) {
            const { login_backroute } = this.props;
            pathname = login_backroute === null ? ROUTES.HOME : login_backroute;
          } else {
            pathname = ROUTES.HOME;
          }
          const location = {
            pathname: pathname,
            state: { animation: "top" },
          };
          this.props.history.push(location);

          this.props.deleteFeedShareInfo();
          this.props.setLoginBackRoute(null);

        } else {
          const { login_backroute } = this.props;
          const pathname =
            login_backroute === null ? ROUTES.HOME : login_backroute;
          const location = {
            pathname: pathname,
            state: { animation: "top" },
          };
          this.props.history.push(location);
          this.props.setLoginBackRoute(null);
        }
      }
    } else {
      const location = {
        pathname: ROUTES.PROFILE,
        state: { animation: "top" },
      };
      this.props.history.push(location);
    }
  };

  handleSubmit = () => {
    const { firebase } = this.props;
    const { phoneNumber } = this.state;

    if (phoneNumber) {
      const phone = "+" + phoneNumber;
      // console.log("phoneNumber :", phone);

      const appVerifier = new firebase.app_auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // console.log("reCAPTCHA solved :", response);
            // this.phoneSignIn();
          },
        }
      );

      // console.log("appVerifier :", appVerifier);
      firebase.auth
        .signInWithPhoneNumber(phone, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // console.log("Success, confirmation result :", confirmationResult);

          this.setState({
            ...this.state,
            dlgCode: true,
          });
        })
        .catch((error) => {
          console.log("Error, SMS not sent! :", error);
        });
    }
  };

  handleSkip = async () => {
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  };

  render() {
    const { classes, requesting } = this.props;
    const {
      phoneNumber,
      // captchaSolved,
      dlgCode,
      code
    } = this.state;

    let apply_enabled = false;
    // if (phoneNumber !== "" && captchaSolved) {
    //   apply_enabled = true;
    // }
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
        {/* <DlgVerifyCode
          open={dlgCode}
          theme={theme_mode}
          onVerifyCode={this.handleVerifyCode}
          onCancel={this.handleCloseVerifyDlg}
        /> */}
        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  tags: state.dataState.tags,
  feed_join_info: state.dataState.feed_join_info,
  feed_share_info: state.dataState.feed_share_info,
  login_backroute: state.uiState.login_backroute,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SignInPhone);

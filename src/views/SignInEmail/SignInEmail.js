import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withRouter, Link } from "react-router-dom";
import { withFirebase } from 'services';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  Icon
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import validate from "validate.js";
import { 
  BasicAppBar, 
  ImageSlider, 
  WaitingDialog 
} from "components";
import * as ROUTES from "constants/routes";
import { ROLE_USER, ROLE_ANONYMOUS } from "constants/user";
import { GraphqlService } from 'services';
import { 
  MAX_ARTICLE_WIDTH, 
  SIGN_METHOD_EMAIL, 
  SIGN_METHOD_GOOGLE, 
  SIGN_METHOD_APPLE,
  GRAPHQL_SUCCESS 
} from "constants/types";
import { ToastSuccess, ToastError } from "utility/toast";


const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

// const ERROR_CODE_ACCOUNT_UNREGISTERED = "auth/account-unregistered";
const ERROR_MSG_ACCOUNT_UNREGISTERED = 'This account was unregistered';

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  }
};

const emptyUser = {
  uid           : '',
  name          : '',
  username      : '',
  biography     : '',
  image         : '',
  email         : '',
  emailVerified : false,
  phone         : '',
  phoneVerified : false,
  links         : [],
  msgToken      : null,
  role          : ROLE_ANONYMOUS,
  signMethod    : SIGN_METHOD_EMAIL,
  approved      : false
}


const styles = theme => ({
  root: {
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
  },
  appbar: {
    width: MAX_ARTICLE_WIDTH,
    maxWidth: "100%",
    height: "56px",
    [theme.breakpoints.up('sm')]: {
      height: "64px",
    },
  },
  container: {
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: theme.palette.background.default
  },
  title: {
    flexGrow: 1,
    textAlign: "center"
  },
  slider: {
    marginBottom: 16
  },
  textField: {
    color: theme.palette.text.primary,
    marginTop: 8,
    marginBottom: 0
  },
  customInput: {
    "&:before": {
      borderBottomColor: theme.palette.text.secondary
    },
    "&:after": {
      borderBottomColor: theme.palette.text.secondary
    },
    "&.MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: theme.palette.text.secondary
    }
  },
  signupline: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 4
  },
  resetline: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 10
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
    }
  },
  signinForm: {
    marginLeft: 16,
    marginRight: 16
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
    color: theme.palette.error.main
  },
  info: {
    color: theme.palette.info.main
  },
  signlink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  }
});

class SignInEmail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msgToken: null,
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSkip = this.handleSkip.bind(this);

    this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this);
    this.handleAppleSignIn = this.handleAppleSignIn.bind(this);
    this.handlePhoneSignIn = this.handlePhoneSignIn.bind(this);
    // this.handleFacebookSignIn = this.handleFacebookSignIn.bind(this);
  }

  componentDidMount = () => {
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
            msgToken: data
          });
          console.warn("token :", data);
        });
    }
  }

  setWaiting = (waiting) => {
    if (waiting) {
      this.props.requestDataPending();
    } else {
      this.props.requestDataFinished();
    }
  };

  handleNavBack = () => {
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handleSkip = () => {
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  }

  handleChange = event => {
    event.persist();

    this.setState(
      {
        ...this.state,
        values: {
          ...this.state.values,
          [event.target.name]:
            event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value
        },
        touched: {
          ...this.state.touched,
          [event.target.name]: true
        }
      },
      () => {
        const errors = validate(this.state.values, schema);
        this.setState({
          ...this.state,
          isValid: errors ? false : true,
          errors: errors || {}
        });
      }
    );
  };

  isInvited = async (user_id, feed_join_info) => {
    const gqlservice = new GraphqlService();
    const invited = await gqlservice
      .invites_by_user(user_id)
      .then(
        (result) => {
          const invites = result.data.user_invites;
          for (let invite of invites) {
            if (
              !invite.is_phone &&
              invite.invitee === user_id &&
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
          return false;
        }
      )
      .catch((err) => {
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

  _signInProc = async (uid, email, method) => {
    const { firebase } = this.props;

    const token = await firebase.auth.currentUser.getIdToken();
    const idTokenResult = await firebase.auth.currentUser.getIdTokenResult();
    console.log("idTokenResult :", idTokenResult);
    const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];

    if (!hasuraClaim) {
      // console.log("signInProc hasuraClaim undefined");
      ToastSuccess("Successfully registered in the Raven. Please sign in again please.");
      return;
    }

    let authUser = {};
    if (hasuraClaim) {
      authUser = {
        uid,
        token,
        hasuraClaim,
      };
    } else {
      ToastError(ERROR_MSG_ACCOUNT_UNREGISTERED);
      return;
      // const userRef = firebase.db.ref('users/' + uid + '/refreshTime');
      // userRef.on('value', async data => {
      //   if (!data.exists) {
      //     this.setState({
      //       ...this.state,
      //       autherror: {
      //         code: ERROR_CODE_ACCOUNT_UNREGISTERED,
      //         message: ERROR_MSG_ACCOUNT_UNREGISTERED
      //       }
      //     });
      //     return;
      //   }

      //   // Force refresh to pick up the latest custom claims changes.
      //   const token = await firebase.auth.currentUser.getIdToken();
      //   authUser = {
      //     uid,
      //     token,
      //     hasuraClaim,
      //   };
      // });
    }

    this.props.setAuthUser(authUser);

    // Create a user in database on graphql+postgresql
    let new_user = {...emptyUser};
    new_user.uid = authUser.uid;
    new_user.role = ROLE_USER;
    new_user.email = email;
    new_user.approved = false;
    new_user.signMethod = method;
    new_user.msgToken = this.state.msgToken;

    const gqlservice = new GraphqlService();
    gqlservice.set_auth_jwt(token);

    const result = await gqlservice.add_user(new_user);
    // console.log("add_user :", result);
    if (result.status_code !== GRAPHQL_SUCCESS || result.data.length === 0) {
      ToastError(ERROR_MSG_ACCOUNT_UNREGISTERED);
      return;
    }

    const user = result.data[0];
    const isNewUser = result.data.isNew; 
    // console.log("User by graphql :", user, isNewUser);

    // if (user.approved === true) {
    //   this.props.signIn(user);
    //   this.props.history.push(ROUTES.PROFILE);
    // } else {
    //   let error = {
    //     status_code: AUTH_NOT_APPROVED,
    //     message: "This account was not approved yet."
    //   };
    //   this.setState({
    //     ...this.state,
    //     autherror: error
    //   });
    // }

    this.props.signIn(user);
    this.props.resetAllData();

    // check if onboarding tags
    // const mytags = tags.filter(tag => 
    //   tag.tag_users.findIndex(tag_user => tag_user.user_id === user.uid) !== -1
    // );

    if ( user.skipProfile ||
      (user.name !== undefined && user.name !== "" &&
      user.username !== undefined && user.username !== "" &&
      user.email !== undefined && user.email !== "")
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
            user.uid,
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

          // this.props.refreshArticles();
          const { login_backroute } = this.props;
          const pathname = login_backroute === null ? ROUTES.HOME : login_backroute;
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
  }


  handleSignIn = event => {
    const { email, password } = this.state.values;
    const { firebase } = this.props;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(result => {
        const uid = result.user.uid;
        this._signInProc(uid, email, SIGN_METHOD_EMAIL);
      })
      .catch(error => {
        ToastError(error.message);
        //this.props.history.push(ROUTES.LANDING);
      });

    event.preventDefault();
  };

  handleGoogleSignIn = event => {
    const { firebase } = this.props;
    firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        const uid = socialAuthUser.user.uid;
        const email = socialAuthUser.user.email;
        this._signInProc(uid, email, SIGN_METHOD_GOOGLE);
      })
      .catch(error => {
        // console.log("Google Sign In Error :", error);
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          ToastError(ERROR_MSG_ACCOUNT_EXISTS);
        } else {
          ToastError(error.message);
        }
        //this.props.history.push(ROUTES.LANDING);
      });

    event.preventDefault();
  };

  handleAppleSignIn = event => {
    const { firebase } = this.props;
    firebase
      .doSignInWithApple()
      .then(socialAuthUser => {
        const uid = socialAuthUser.user.uid;
        const email = socialAuthUser.user.email;
        this._signInProc(uid, email, SIGN_METHOD_APPLE);
      })
      .catch(error => {
        // console.log("Apple Sign In Error :", error);
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          ToastError(ERROR_MSG_ACCOUNT_EXISTS);
        } else {
          ToastError(error.message);
        }
      });

    event.preventDefault();
  };

  // handleFacebookSignIn = event => {
  //   const { firebase } = this.props;
  //   firebase
  //     .doSignInWithFacebook()
  //     .then(socialAuthUser => {
  //       const uid = socialAuthUser.user.uid;
  //       const email = socialAuthUser.additionalUserInfo.profile.email;
  //       this._signInProc(uid, email);
  //     })
  //     .catch(error => {
  //       if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
  //         error.message = ERROR_MSG_ACCOUNT_EXISTS;
  //       }

  //       console.log("Facebook Sign In Error :", error);
  //       this.setState({
  //         ...this.state,
  //         autherror: error
  //       });
  //       this.props.history.push(ROUTES.LANDING);
  //     });

  //   event.preventDefault();
  // };

  handlePhoneSignIn = () => {
    const location = {
      pathname: ROUTES.PHONE_SIGNIN,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  }

  handleSuccessClose = () => {
    this.setState({
      ...this.state,
      success: false,
      successMsg: ''
    });
  };

  render() {
    const { classes, theme_mode, requesting } = this.props;
    const { email, password } = this.state.values;
    const { errors, touched, isValid } = this.state;

    const hasError = field => (touched[field] && errors[field] ? true : false);

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            width={MAX_ARTICLE_WIDTH}
            title={"Sign In"}
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
            <IconButton onClick={this.handleAppleSignIn}>
              <Icon className={classes.socialIcon}>
                <i className="fa fa-lg fa-apple"></i>
              </Icon>
            </IconButton>
            <IconButton onClick={this.handleGoogleSignIn}>
              <Icon className={classes.socialIcon}>
                <i className="fa fa-lg fa-google"></i>
              </Icon>
            </IconButton>
            <IconButton onClick={this.handlePhoneSignIn}>
              <img
                className={classes.emailIcon}
                alt="phone"
                src={`/static/images/icons/${theme_mode}/message.png`}
              />
            </IconButton>
            <IconButton>
              <img
                className={classes.emailIcon}
                alt="email"
                src={`/static/images/icons/${theme_mode}/email.png`}
              />
            </IconButton>
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
                    root: classes.customInput
                  }
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
                    root: classes.customInput
                  }
                }}
              />
            </Box>
            <Box>
              <Typography className={classes.signupline}>
                Don't have an account?&nbsp;&nbsp;
                <Link className={classes.signlink} to={ROUTES.SIGN_UP}>
                  Sign Up
                </Link>
              </Typography>
              <Typography className={classes.resetline}>
                Forgot password?&nbsp;&nbsp;
                <Link className={classes.signlink} to={ROUTES.RESET_PASSWORD}>
                  Reset Passowrd
                </Link>
              </Typography>
            </Box>
            <Box>
              <Button
                className={classes.submitBtn}
                disabled={!isValid}
                onClick={this.handleSignIn}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Box>
        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

SignInEmail.propTypes = {
  history: PropTypes.object,
  firebase: PropTypes.object
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  tags: state.dataState.tags,
  feed_join_info: state.dataState.feed_join_info,
  feed_share_info: state.dataState.feed_share_info,
  login_backroute: state.uiState.login_backroute,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SignInEmail);

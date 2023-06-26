import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withRouter } from "react-router-dom";
import { withFirebase } from 'services';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  IconButton,
  Icon
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { BasicAppBar, ImageSlider } from "components";
import * as ROUTES from "constants/routes";
import { ROLE_USER, ROLE_ANONYMOUS } from "constants/user";
import { GRAPHQL_SUCCESS } from "constants/types";
import { GraphqlService } from 'services';
import { 
  MAX_ARTICLE_WIDTH,
  SIGN_METHOD_EMAIL,
  SIGN_METHOD_GOOGLE,
  SIGN_METHOD_APPLE
} from "constants/types";
import { ToastSuccess, ToastError } from "utility/toast";


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
    marginBottom: 16
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
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: 300,
  }
});

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
    this.handleAppleSignIn = this.handleAppleSignIn.bind(this);
    this.handleEmailSignIn = this.handleEmailSignIn.bind(this);
    this.handlePhoneSignIn = this.handlePhoneSignIn.bind(this)

    this.handleClickTerms = this.handleClickTerms.bind(this);
    this.handleClickPrivacy = this.handleClickPrivacy.bind(this);
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

  handleNavBack = () => {
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  };

  handleSkip = () => {
    const { login_backroute } = this.props;

    const location = {
      pathname: login_backroute === null ? ROUTES.HOME : login_backroute,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  }

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

    // console.log("idTokenResult :", idTokenResult);
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

    this.props.signIn(user);
    this.props.resetAllData();

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
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          ToastError(ERROR_MSG_ACCOUNT_EXISTS);
        } else {
          ToastError(error.message);
        }
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
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          ToastError(ERROR_CODE_ACCOUNT_EXISTS)
        } else {
          ToastError(error.message);
        }
      });

    event.preventDefault();
  };

  handleEmailSignIn = () => {
    const location = {
      pathname: ROUTES.EMAIL_SIGNIN,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  }

  handlePhoneSignIn = () => {
    const location = {
      pathname: ROUTES.PHONE_SIGNIN,
      state: { animation: "top" },
    };
    this.props.history.push(location);
  }

  handleClickTerms = () => {
    // console.log("click terms of services");
    const location = {
      pathname: ROUTES.TERMS_OF_SERVICE,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  }

  handleClickPrivacy = () => {
    // console.log("click privacy policy");
    const location = {
      pathname: ROUTES.PRIVACY_POLICY,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  }

  render() {
    const { classes, theme_mode } = this.props;

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

        <div className={classes.container}>
          <div className={classes.slider}>
            <ImageSlider />
          </div>
          <div className={classes.titlediv}>
            <Typography className={classes.title}>
              Sign In
            </Typography>
          </div>
          <div className={classes.socialIcons}>
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
            <IconButton onClick={this.handleEmailSignIn}>
              <img
                className={classes.emailIcon}
                alt="email"
                src={`/static/images/icons/${theme_mode}/email.png`}
              />
            </IconButton>
          </div>
          <div className={classes.termsdiv}>
            <Typography className={classes.description}>
              By logging in, I agree to Raven’s<br/> 
              <u style={{cursor: "pointer"}} onClick={this.handleClickTerms}>Terms</u>&nbsp;and&nbsp;
              <u style={{cursor: "pointer"}} onClick={this.handleClickPrivacy}>Privacy Policy</u>
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
  firebase: PropTypes.object
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  tags: state.dataState.tags,
  feed_join_info: state.dataState.feed_join_info,
  feed_share_info: state.dataState.feed_share_info,
  login_backroute: state.uiState.login_backroute,
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SignIn);

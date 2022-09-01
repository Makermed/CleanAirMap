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
  Box,
  TextField
} from "@material-ui/core";
import validate from "validate.js";
import { ToastContainer } from "react-toastify";
import { BasicAppBar, ImageSlider } from "components";
import * as ROUTES from "constants/routes";
import { MAX_ARTICLE_WIDTH } from "constants/types";
import { ToastSuccess, ToastError } from "utility/toast";


const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

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
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    },
    equality: "password"
  }
};

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
  backBtn: {
    marginRight: theme.spacing(2)
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
  alreadyTxt: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    marginTop: 20,
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
    paddingBottom: 30
  },
  socialIcon: {
    color: theme.palette.text.primary
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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleNavBack = () => {
    const location = {
      pathname: ROUTES.SIGN_IN,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  }

  handleSkip = () => {
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "right" },
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
        },
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

  handleSignUp = event => {
    const { email, password } = this.state.values;
    const { firebase } = this.props;

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(async (user) => {
        // console.log("doing sign up by email :", email, user.user.uid);
        ToastSuccess("You are registered. Please sign in.")
        return user;
      })
      // .then(() => {
      //   return firebase.doSendEmailVerification();
      // })
      .then(() => {
        this.setState({
          isValid: false,
          values: {},
          touched: {},
          errors: {},
          autherror: null
        });
        const location = {
          pathname: ROUTES.SIGN_IN,
          state: { animation: "right" },
        };
        this.props.history.push(location);
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

  render() {
    const { classes } = this.props;
    const { email, password, confirmPassword } = this.state.values;
    const { errors, touched, isValid } = this.state;

    const hasError = field => (touched[field] && errors[field] ? true : false);

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            width={MAX_ARTICLE_WIDTH}
            title={"Sign Up"}
            action={"SKIP"}
            onNavBack={this.handleNavBack}
            onAction={this.handleSkip}
          />
        </div>

        <Box className={classes.container}>
          <Box className={classes.slider}>
            <ImageSlider />
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
              <TextField
                className={classes.textField}
                error={hasError("confirmPassword")}
                fullWidth
                required
                helperText={
                  hasError("confirmPassword") ? errors.confirmPassword[0] : null
                }
                label={
                  <span
                    className={
                      hasError("confirmPassword") ? classes.error : classes.info
                    }
                  >
                    Confirm password
                  </span>
                }
                name="confirmPassword"
                onChange={this.handleChange}
                type="password"
                value={confirmPassword || ""}
                InputProps={{
                  classes: {
                    root: classes.customInput
                  }
                }}
              />
            </Box>
            <Box>
              <Typography className={classes.alreadyTxt}>
                Already registered?&nbsp;&nbsp;
                <Link className={classes.signlink} to={ROUTES.SIGN_IN}>
                  Sign In
                </Link>
              </Typography>
            </Box>
            <Box>
              <Button
                className={classes.submitBtn}
                disabled={!isValid}
                onClick={this.handleSignUp}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Box>
        <ToastContainer />
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.object,
  firebase: PropTypes.object
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SignUp);

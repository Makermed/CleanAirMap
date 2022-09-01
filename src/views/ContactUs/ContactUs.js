import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import validate from "validate.js";
import { BasicAppBar } from "components";
import * as ROUTES from "constants/routes";
import { 
  MAX_ARTICLE_WIDTH, 
} from "constants/types";
import { contact_us } from "utility/ravenapi";
import { 
  ToastSuccess,
  ToastError 
} from "utility/toast";

const schema = {
  name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  message: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 1024
    }
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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.background.default
  },
  title: {
    flexGrow: 1,
    textAlign: "center"
  },
  textField: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  applybtn: {
    position: "absolute",
    bottom: theme.spacing(1),
    zIndex: 1100,
    backgroundColor: "#1878F3",
    color: "#FFFFFF",
    borderRadius: "30px",
    padding: "8px 8px",
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
    position: "absolute",
    bottom: theme.spacing(1),
    zIndex: 1100,
    backgroundColor: "#1878F3",
    color: "#FFFFFF",
    borderRadius: "30px",
    padding: "8px 8px",
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

class ContactUs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNavBack = this.handleNavBack.bind(this);

    this.handleContactUs = this.handleContactUs.bind(this);
  }

  componentDidMount = () => {
    const { loggedIn, authUser } = this.props;
    if (loggedIn) {
      this.setState({
        ...this.state,
        values: {
          ...this.state.values,
          name: authUser.name,
          email: authUser.email
        }
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

  setError = message => {
    ToastError(message);
    this.props.requestDataFinished();
  };

  handleNavBack = () => {
    const location = {
      pathname: ROUTES.ABOUT,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  };

  handleChange = event => {
    event.persist();

    this.setState(
      {
        ...this.state,
        values: {
          ...this.state.values,
          [event.target.name]: event.target.value
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

  handleContactUs = async () => {
    const { name, email, message } = this.state.values;

    this.setWaiting(true);

    const result = await contact_us(name, email, message);
    if (result.error) {
      this.setState({
        ...this.state,
        error: true,
        errorMsg: result.msg
      });
    } else {
      ToastSuccess(result.msg);
    }

    this.setWaiting(false);
  }

  render() {
    const { classes } = this.props;
    const { name, email, message } = this.state.values;
    const { errors, touched, isValid } = this.state;

    const hasError = field => (touched[field] && errors[field] ? true : false);

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    const applyButtonPos = (width - 260) / 2;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            width={MAX_ARTICLE_WIDTH}
            title={"Contact Us"}
            onNavBack={this.handleNavBack}
          />
        </div>

        <div className={classes.container}>
          <TextField
            className={classes.textField}
            error={hasError("name")}
            fullWidth
            required
            helperText={hasError("name") ? errors.name[0] : null}
            label={
              <span
                className={hasError("name") ? classes.error : classes.info}
              >
                Name
              </span>
            }
            name="name"
            value={name || ""}
            onChange={this.handleChange}
            InputProps={{
              classes: {
                root: classes.customInput
              }
            }}
          />
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
            error={hasError("message")}
            fullWidth
            multiline={true}
            rows={6}
            required
            helperText={hasError("message") ? errors.message[0] : null}
            label={
              <span
                className={
                  hasError("message") ? classes.error : classes.info
                }
              >
                Message
              </span>
            }
            name="message"
            onChange={this.handleChange}
            type="text"
            value={message || ""}
            InputProps={{
              classes: {
                root: classes.customInput
              }
            }}
          />
          {isValid &&
            <Button
              className={classes.applybtn}
              style={{left: applyButtonPos}}
              onClick={this.handleContactUs}
            >
              Send
            </Button>
          }
          {!isValid &&
            <Button
              className={classes.applybtn_disabled}
              style={{left: applyButtonPos}}
            >
              Send
            </Button>
          }
        </div>

        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  requesting: state.uiState.requesting
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ContactUs);

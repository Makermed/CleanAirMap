import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withFirebase } from 'services';
import { withAuthentication, withAuthorization } from "session";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Box
} from "@material-ui/core";
import { uuid } from "uuidv4";
import { ToastContainer } from "react-toastify";
import { TagChips, WaitingDialog } from "components";
import { LogoAppBar } from './components';
import * as ROUTES from "constants/routes";
import { GraphqlService } from "services";
import { MAX_WINDOW_WIDTH } from "constants/types";
import { is_paid_user } from "utility/user";
import { ToastError } from "utility/toast";


const condition = (authUser) => !!authUser && authUser.uid !== "";

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
  container: {
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: theme.palette.background.default
  },
  tagchips: {
    paddingBottom: 64,
  },
  bannerTxt: {
    color: theme.palette.text.primary,
    fontSize: 26,
    lineHeight: 1.2,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    zIndex: 2
  },
  buttonbox: {
    // position: "fixed",
    bottom: theme.spacing(1),
    width: '100%',
    zIndex: 1100,
  },
  buttondiv: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    backgroundColor: "#303030",
    "&:hover": {
      backgroundColor: "#303030"
    },
    borderRadius: "30px",
    padding: "10px 8px",
    width: "80%",
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
  },
  startbutton: {
    backgroundColor: "#1878F3",
    "&:hover": {
      backgroundColor: "#1878F3"
    },
    borderRadius: "30px",
    padding: "10px 8px",
    width: "80%",
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10
  },
  buttontext: {
    color: "#FFF",
    fontWeight: 500,
    fontSize: 16
  },
  error: {
    color: theme.palette.error.main
  },
  info: {
    color: theme.palette.info.main
  }
});

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };

    this.handleChipSelect = this.handleChipSelect.bind(this);
    this.handleOnboarding = this.handleOnboarding.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
  }

  async componentDidMount() {
    this.setWaiting(true);
    await this.getMainInfo();
    this.setWaiting(false);

    const { tags, authUser } = this.props;

    let selected = [];
    const selected_tags = tags.filter(tag => 
      tag.tag_users.findIndex(tag_user => tag_user.user_id === authUser.uid) !== -1
    );
    // for (let index = 0; index < tags.length; index++) {
    //   if (
    //     tags[index].tag_users.findIndex(
    //       tag_user => tag_user.user_id === authUser.uid
    //     ) !== -1
    //   ) {
    //     selected.push(index);
    //   }
    // }
    if (selected_tags.length > 0) {
      selected = selected_tags.map(tag => tag.name);
    }

    this.setState({
      ...this.state,
      selected: selected
    });
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

  getMainInfo = async () => {
    if (this.props.newssites.length > 0) return;

    const { loggedIn, authUser } = this.props;
    const gqlservice = new GraphqlService();
    let base_data_fn = null;

    if (loggedIn) {
      const token = await this._getAuthToken();
      if (!token) {
        this.handleLogin();
        return;
      }
      gqlservice.set_auth_jwt(token);
      if (is_paid_user(loggedIn, authUser)) {
        base_data_fn = gqlservice.base_data_by_paiduser;
      } else {
        base_data_fn = gqlservice.base_data_by_user;
      }
    } else {
      base_data_fn = gqlservice.base_data;
    }

    await base_data_fn()
      .then(
        result => {
          const base_data = result.data;
          this.props.setNewssiteInfo(base_data.newssite);
          this.props.setSocialtypeInfo(base_data.socialtype);
          this.props.setCategories(base_data.categories);
          this.props.setFeeds(base_data.feeds);
          // this.props.setSources(base_data.sources);
          this.props.setTags(base_data.tags);
        },
        reason => {
          this.setState({
            ...this.state,
            error: true,
            errorMsg: reason.msg
          });
        }
      )
      .catch(err => {
        this.setState({
          ...this.state,
          error: true,
          errorMsg: err
        });
      });

      await gqlservice.sources()
      .then(result => {
        const sources = result.data.sources;
        this.props.setSources(sources);
      }, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });
  }

  handleSkip = () => {
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  };

  handleChipSelect = async (name) => {
    const { authUser } = this.props;
    const { selected } = this.state;
    let new_selected = selected.slice();

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    let selected_index = selected.findIndex(item => item === name);
    if (selected_index === -1) {
      new_selected.push(name);

      // add this tag_user to the database
      const tag_user = {
        id: uuid(),
        tag_name: name,
        user_id: authUser.uid
      };

      await gqlservice
        .add_tag_user(tag_user)
        .then(
          data => {
            this.props.addTagUser(tag_user);
            this.setState({
              ...this.state,
              selected: new_selected
            });
          },
          reason => {
            this.setError(reason.msg);
          }
        )
        .catch(err => {
          this.setError(JSON.stringify(err));
        });
    } else {
      new_selected = selected.filter(item => item !== name);

      // delete this tag_user from the database
      const tag_user = {
        tag_name: name,
        user_id: authUser.uid
      };

      await gqlservice
        .delete_tag_user(tag_user)
        .then(
          data => {
            this.props.deleteTagUser(tag_user);
            this.setState({
              ...this.state,
              selected: new_selected
            });
          },
          reason => {
            this.setError(reason.msg);
          }
        )
        .catch(err => {
          this.setError(JSON.stringify(err));
        });
    }
  };

  handleOnboarding = () => {
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  };

  render() {
    const { classes, theme_mode, tags, requesting } = this.props;
    const { selected } = this.state;

    const tags2show = tags.map(tag => tag.name);

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <LogoAppBar
            theme_mode={theme_mode}
            onSkip={this.handleSkip}
          />
        </div>

        <Box className={classes.container}>
          <Box>
            <Typography className={classes.bannerTxt} gutterBottom>
              What do you love
              <br />
              reading about?
            </Typography>
          </Box>
          <div className={classes.tagchips}>
            <TagChips
              chips={tags2show}
              selected={selected}
              onSelect={this.handleChipSelect}
            />
          </div>
        </Box>

        <div className={classes.buttonbox}>
          <div className={classes.buttondiv}>
            {selected.length >= 3 ? (
              <Button
                className={classes.startbutton}
                disabled={false}
                clickable={"false"}
                onClick={this.handleOnboarding}
              >
                <Typography className={classes.buttontext}>
                  Get Started
                </Typography>
              </Button>
            ) : (
              <Button className={classes.button}>
                <Typography className={classes.buttontext}>
                  Follow 3 or more Topics
                </Typography>
              </Button>
            )}
          </div>
        </div>

        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

Onboarding.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  newssites: state.dataState.newssites,
  tags: state.dataState.tags,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withRouter,
  withFirebase,
  withAuthentication,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Onboarding);

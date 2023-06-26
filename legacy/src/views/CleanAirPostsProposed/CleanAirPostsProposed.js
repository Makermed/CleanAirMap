import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { withAuthentication, withAuthorization } from "session";
import { 
  BasicAppBar, 
  MapUserpostCard, 
  WaitingDialog 
} from "components";
import { Propose } from "./components";
import { GraphqlService } from "services";
import { withFirebase } from 'services';
import * as ROUTES from "constants/routes";
import { MAX_ARTICLE_WIDTH } from "constants/types";
// import { NOTIFICATION_POST_APPROVE } from "constants/notification";
import { 
  ACTIVITY_TYPE_CLEANAIRMAP,
  ACTIVITY_APPROVE, 
  ACTIVITY_DELETE, 
} from "constants/activity";
import { ToastError } from "utility/toast";


const condition = (authUser) => !!authUser && authUser.uid !== ""


const styles = (theme) => ({
  root: {
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
  },
  appbar: {
    width: "100%",
    height: "56px",
    [theme.breakpoints.up('sm')]: {
      height: "64px",
    },
  },
  container: {
    margin: theme.spacing(1),
  },
  propose: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

class CleanAirPostsProposed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posted: []
    };

    this.handleNavBack = this.handleNavBack.bind(this);

    this.handleApprovePosted = this.handleApprovePosted.bind(this);
    this.handleDeletePosted = this.handleDeletePosted.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleAnchorEl = this.handleAnchorEl.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  setError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();
  };

  componentDidMount() {
    const { selected_feed } = this.props;
    this.setState({
      ...this.state,
      proposed: selected_feed.proposed_posts,
      posted: selected_feed.posted_posts
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
  }

  deletePosted = (post_id) => {
    const { posted } = this.state;
    const new_posted = posted.filter(post => post.nid !== post_id);

    this.setState({
      ...this.state,
      posted: new_posted
    });
  }

  handleApprovePosted = async (post) => {
    const { authUser, selected_location } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.props.requestDataPending();

    const currentTime = new Date().toISOString();
    await gqlservice.update_location_post(selected_location.id, post.nid, true, authUser.nid, currentTime)
      .then(result => {
        this.deletePosted(post.nid);
        this.props.approveLocationPost(post)
      }, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_APPROVE,
      object: `the post ${post.nid}`,
      fromto: `of the location ${selected_location.name}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    // await this.updateFeedNotifications(token);

    this.props.requestDataFinished();
  }

  handleDeletePosted = async (post) => {
    const { authUser, selected_location } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.props.requestDataPending();

    await gqlservice.delete_location_post(selected_location.id, post.nid)
      .then(result => {
        this.deletePosted(post.nid);
      }, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_DELETE,
      object: `the post ${post.nid}`,
      fromto: `from the location ${selected_location.name}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    // await this.updateFeedNotifications(token);

    this.props.requestDataFinished();
  }  

  handleClick = () => {};

  handleAnchorEl = () => {};

  handleShare = () => {};

  render() {
    const { classes, requesting } = this.props;
    const { posted } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            title={"Proposed Posts"}
            onNavBack={this.handleNavBack}
          />
        </div>
        <Grid container spacing={1} className={classes.container}>
          {posted.map((post, index) => (
            <div key={index}>
              <Grid item key={`post-${index}`}>
                <MapUserpostCard 
                  article={post}
                  handleClick={this.handleClick}
                  onAnchorEl={this.handleAnchorEl}
                  onShare={this.handleShare}
                />
              </Grid>
              <Grid
                item
                key={`posted-${index}`}
                className={classes.propose}
              >
                <Propose
                  post={post}
                  onApprove={this.handleApprovePosted}
                  onDelete={this.handleDeletePosted}
                />
              </Grid>
            </div>
          ))}
        </Grid>
        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

CleanAirPostsProposed.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting,
  selected_location: state.mapState.selected_location
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withAuthentication,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirPostsProposed);

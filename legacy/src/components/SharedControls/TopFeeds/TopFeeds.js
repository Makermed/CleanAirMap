import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { FollowFeedsList, DlgAlert } from "components";
import { GraphqlService } from "services";
import { ToastError } from "utility/toast";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 0,
    color: theme.palette.text.primary,
    textTransform: "none",
  },
  button: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    textTransform: "none",
  },
  description: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: "14px",
    lineHeight: "14px",
    color: theme.palette.text.secondary,
    textTransform: "none",
  },
  category: {
    clear: "both",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  topfeeds: {
    marginTop: theme.spacing(2),
  },
  topfeedsitems: {
    marginLeft: theme.spacing(1),
    margin: 0,
    backgroundColor: theme.palette.background.default,
  },
  list: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    margin: "0px",
  },
  listitems: {
    clear: "both",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

class TopFeeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alertDlg: false,
      alertTitle: "",
      alertMsg: ""
    };

    this.handleChangeFollowing = this.handleChangeFollowing.bind(this);
    this.handleOK = this.handleOK.bind(this);
  }

  setError = (message) => {
    ToastError(message);
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

  handleOK = () => {
    this.setState({
      ...this.state,
      alertDlg: false,
      alertTitle: "",
      alertMsg: "",
    });
  };

  handleChangeFollowing = async (following, index) => {
    const { authUser, topFeeds, followed_feeds } = this.props;

    let follower = {
      id: `${topFeeds[index].id}-${authUser.uid}`,
      feed_id: topFeeds[index].id,
      user_id: authUser.uid,
      order: followed_feeds.length,
    };

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    gqlservice.set_auth_jwt(token);
    let new_followers = following
      ? topFeeds[index].followers + 1
      : topFeeds[index].followers - 1;
    gqlservice
      .update_feed_followers(topFeeds[index].id, new_followers)
      .then(
        (result) => {},
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    // console.log("Follower :", follower);
    if (following[index]) {
      gqlservice
        .insert_feed_follower(follower)
        .then(
          (result) => {
            this.props.updateFeedFollowers(topFeeds[index].id, new_followers);
            this.props.setFollowingFeed(topFeeds[index], following[index]);
          },
          (reason) => {
            this.setError(reason.msg);
          }
        )
        .catch((err) => {
          this.setError(JSON.stringify(err));
        });
    } else {
      gqlservice
        .delete_feed_follower(follower.id)
        .then(
          (result) => {
            this.props.updateFeedFollowers(topFeeds[index].id, new_followers);
            this.props.setFollowingFeed(topFeeds[index], following[index]);
          },
          (reason) => {
            this.setError(reason.msg);
          }
        )
        .catch((err) => {
          this.setError(JSON.stringify(err));
        });
    }
  };

  render() {
    const {
      classes,
      width,
      topFeeds,
      followed_feeds,
      theme_mode,
      onClickFeed,
      onReachLimit
    } = this.props;
    const { alertDlg, alertTitle, alertMsg } = this.state;

    // Top feeds following
    let following = topFeeds.map((feed) => {
      let result = followed_feeds.find((element) => element.id === feed.id);
      return result === undefined ? false : true;
    });

    return (
      <div className={classes.root} style={{ width: width }}>
        <div className={classes.topfeeds}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="baseline"
          >
            <Grid item>
              <Button className={classes.title}>{"Top Feeds for You"}</Button>
            </Grid>
          </Grid>
          <div className={classes.topfeedsitems}>
            <FollowFeedsList
              width={width - 16}
              badged={false}
              items={topFeeds}
              following={following}
              onFollowingChanged={this.handleChangeFollowing}
              onItemClicked={onClickFeed}
              onReachLimit={onReachLimit}
            />
          </div>
        </div>

        <DlgAlert
          open={alertDlg}
          title={alertTitle}
          description={alertMsg}
          theme_mode={theme_mode}
          onOK={this.handleOK}
        />
      </div>
    );
  }
}

TopFeeds.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number,
  topFeed: PropTypes.array,
  onClickFeed: PropTypes.func,
  onReachLimit: PropTypes.func
};

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  followed_feeds: state.dataState.followed_feeds,
  theme_mode: state.uiState.theme_mode,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(TopFeeds);

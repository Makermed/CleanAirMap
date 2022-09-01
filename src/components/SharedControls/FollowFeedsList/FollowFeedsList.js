import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { FeedItem } from "./FeedItem";
import {
  USE_QUOTA,
  FREE_FEED_FOLLOW_LIMIT,
  PAID_FEED_FOLLOW_LIMIT,
} from "constants/types";
import { is_paid_user } from "utility/user";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
});

class FollowFeedsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      following: [],
    };

    this.handleClickFollowing = this.handleClickFollowing.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      following: this.props.following
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.following.length !== prevProps.following.length) {
      this.setState({
        ...this.state,
        following: this.props.following
      });
    } else {
      if (this.props.following.length === 0) return;
      for (let i = 0; i < this.props.following.length; i++) {
        if (this.props.following[i] !== prevProps.following[i]) {
          this.setState({
            ...this.state,
            following: this.props.following
          });
          return;
        }
      }
    }
  }

  handleClickFollowing = (index) => () => {
    const { loggedIn, authUser, followed_feeds } = this.props;

    let following = this.state.following.slice();
    following[index] = !following[index];

    // check if the following count is less than the limit
    if (USE_QUOTA) {
      if (following[index]) {
        const paidUser = is_paid_user(loggedIn, authUser);
        if (!paidUser && followed_feeds.length + authUser.feeds_moderated.length >= FREE_FEED_FOLLOW_LIMIT) {
          this.props.onReachLimit();
          return;
        }
        if (paidUser && followed_feeds.length + authUser.feeds_moderated.length >= PAID_FEED_FOLLOW_LIMIT) {
          this.props.onReachLimit();
          return;
        }
      }
    }

    this.setState({ following: following });

    this.props.onFollowingChanged(following, index);
  };

  handleClickItem = (key) => () => {
    console.log("HandleClick Item");
    const { items } = this.props;
    this.props.onItemClicked(items[key]);
  };

  render() {
    const { classes, width, items, loggedIn, theme_mode, badged } = this.props;
    const { following } = this.state;

    if (!items || items.length === 0) {
      return <div></div>;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          {items.map((item, index) => (
            <Grid item key={`feed-${index}`}>
              <FeedItem
                width={width === undefined ? null : width}
                feed={item}
                index={index}
                following={following[index]}
                loggedIn={loggedIn}
                theme_mode={theme_mode}
                badged={badged}
                onClickItem={this.handleClickItem}
                onClickFollowing={this.handleClickFollowing}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

FollowFeedsList.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number,
  badged: PropTypes.bool,
  items: PropTypes.array,
  following: PropTypes.array,
  onFollowingChanged: PropTypes.func,
  onItemClicked: PropTypes.func,
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
)(FollowFeedsList);

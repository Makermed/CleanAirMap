import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { 
  Dialog, 
  DialogTitle, 
  IconButton,
  Typography
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {
  ShareButtonList,
  ShareFeedsList
} from "components";
import { 
  CommentCard
} from "./components";
import { MIN_CARD_WIDTH } from "constants/types";
import { 
  withFirebase,
  GraphqlService 
} from "services";
import { ToastSuccess } from "utility/toast";
import { ARTICLE_BRANCH_NEWSPAPER } from "constants/branches";
import * as ROUTES from "constants/routes";


const styles = (theme) => ({
  dialog: {
    width: MIN_CARD_WIDTH,
    // maxHeight: 210,
    margin: theme.spacing(1),
  },
  actionbutton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    padding: 0,
    margin: 0,
  },
  actionimg: {
    padding: 0,
    width: 32,
    height: 32,
  },
  container: {
    margin: theme.spacing(1),
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  buttonscontainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  feedcontainer: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
  },
  feedtitle: {
    fontSize: "18px",
    lineHeight: "24px",
    marginBottom: theme.spacing(1),
  }
});

class DlgShareComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myFeeds: [],
      moderatedFeeds: [],
      followedFeeds: []
    }

    this.handleSelectFeed = this.handleSelectFeed.bind(this);
  }

  componentDidMount = () => {
    const { loggedIn, authUser, feeds, default_feeds, followed_feeds } = this.props;

    if (loggedIn) {
      const myfeeds = feeds.filter((feed) => feed.created_by === authUser.uid);

      const moderated_feeds = authUser.feeds_moderated
        .map((item) => feeds.find((feed) => feed.id === item.feed_id))
        .filter((feed) => feed && feed.created_by !== authUser.uid);
  
      const feeds2show = followed_feeds.filter(
        (feed) =>
          feed.private === false &&
          myfeeds.find((item) => item.id === feed.id) === undefined &&
          moderated_feeds.find((item) => item.id === feed.id) === undefined
      );

      this.setState({
        ...this.state,
        myFeeds: myfeeds,
        moderatedFeeds: moderated_feeds,
        followedFeeds: feeds2show
      });

    } else {
      this.setState({
        ...this.state,
        myFeeds: [],
        moderatedFeeds: [],
        followedFeeds: default_feeds
      });
    }
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

  handleSelectFeed = async (feed) => {
    // console.log("selected feed :", feed.name);
    const { loggedIn, onLogin } = this.props;

    if (!loggedIn) {
      onLogin();
      return;
    }

    const { authUser, comment } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      onLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    let feedcomment = {
      feed_id: feed.id,
      comment_id: comment.id,
      posted_by: authUser.uid,
      approved: false,
      approved_by: null,
      approved_at: null
    }

    const { myFeeds, moderatedFeeds, followedFeeds } = this.state;
    if (myFeeds.find(myfeed => myfeed.id === feed.id) || moderatedFeeds.find(modfeed => modfeed.id === feed.id)) {
      const currentTime = new Date().toISOString();
      feedcomment.approved = true;
      feedcomment.approved_by = authUser.uid;
      feedcomment.approved_at = currentTime;      
    } else if (followedFeeds.find(followedfeed => followedfeed.id === feed.id)) {
    } else {
      console.log("unknown error(invalid feed) :", feed.name);
      return;
    }

    await gqlservice
      .insert_feed_comment(feedcomment)
      .then(
        (result) => {
          // console.log("success to comment :", feed.id, comment.id);
          ToastSuccess("Comment shared");
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  }

  render() {
    const { 
      classes,
      theme_mode,
      open,
      comment,
      shareInfo,
      selected_feed,
      onClose
    } = this.props;
    const { 
      myFeeds,
      moderatedFeeds,
      followedFeeds
    } = this.state;

    let shareFeeds = [
      ...myFeeds, 
      ...moderatedFeeds, 
      ...followedFeeds
    ];
    if (shareFeeds.length > 0 && selected_feed) {
      shareFeeds = shareFeeds.filter(feed => feed.id !== selected_feed.id);
    }

    return (
      <Dialog
        classes={{ paper: classes.dialog }}
        open={open}
        aria-labelledby="share-dialog-title"
        onClose={onClose}
      >
        <DialogTitle id="simple-dialog-title">
          <Typography className={classes.title}>
            Share this comment
          </Typography>
        </DialogTitle>

        <IconButton
          onClick={onClose}
          className={classes.actionbutton}
        >
          <CloseIcon />
        </IconButton>

        <div className={classes.container}>
          <CommentCard
            shareInfo={shareInfo}
          />

          <div className={classes.buttonscontainer}>
            <ShareButtonList
              shareInfo={shareInfo}
              theme_mode={theme_mode}
            />
          </div>

          <div className={classes.feedcontainer}>
            <Typography className={classes.feedtitle}>
              Share to a <br />Raven Feed
            </Typography>
            <ShareFeedsList
              width={MIN_CARD_WIDTH - 32}
              feeds={shareFeeds}
              onSelected={this.handleSelectFeed}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

DlgShareComment.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  comment: PropTypes.object,
  shareInfo: PropTypes.object,
  onClose: PropTypes.func,
};

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  feeds: state.dataState.feeds,
  sources: state.dataState.sources,
  default_feeds: state.dataState.default_feeds,
  followed_feeds: state.dataState.followed_feeds,
  selected_feed: state.dataState.selected_feed,
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(DlgShareComment);

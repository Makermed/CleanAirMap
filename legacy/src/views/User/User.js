import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withFirebase } from 'services';
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { 
  BasicAppBar, 
  WaitingDialog, 
  SlideLists 
} from "components";
import { withAuthentication } from "session";
import { GraphqlService } from "services";
import * as ROUTES from "constants/routes";
import { MAX_ARTICLE_WIDTH } from "constants/types";
import { is_paid_user } from "utility/user";
import { ToastError } from "utility/toast";


const BLANK_AVATAR = "/static/images/avatars/blank_avatar.png";

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
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
  header: {
    position: "fixed"
  },
  profileContainer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    // marginTop: 56,
    [theme.breakpoints.up("md")]: {
      marginTop: 64
    }
  },
  userimage: {
    objectFit: "cover",
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  followbutton: {
    backgroundColor: theme.palette.background.default,
    "&:hover": {
      backgroundColor: theme.palette.background.default
    },
    borderRadius: "16px",
    border: "2px solid #1878F3",
    boxSizing: "border-box",
    padding: "2px 16px",
    marginRight: theme.spacing(1),
  },
  followingbutton: {
    backgroundColor: "#1878F3",
    "&:hover": {
      backgroundColor: "#1878F3"
    },
    color: "#FFFFFF",
    borderRadius: "16px",
    border: "2px solid #1878F3",
    padding: "2px 16px",
    marginRight: theme.spacing(1),
  },
  detail: {
    marginTop: theme.spacing(2),
    width: "100%"
  },
  name: {
    width: "100%",
    minWidth: 100,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    border: 0,
    fontSize: 20,
    fontWeight: 600,
  },
  statusicon: {
    width: 16,
    height: 16,
  },
  username: {
    maxWidth: "100%",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    border: 0,
    fontSize: 20,
    marginTop: 4,
  },
  description: {
    width: "100%",
    height: 50,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    border: 0,
    fontSize: 16,
    padding: 0,
    marginTop: theme.spacing(3),
    fontFamily: "Roboto",
  },
  linkbuttons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  buttontext: {
    color: "#FFF",
    fontWeight: 400,
    fontSize: 16
  },
  actionbtn: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "20px",
    padding: "4px 10px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    textTransform: "initial",
  },
  actionicon: {
    padding: 3,
    width: 24,
    height: 24,
    color: theme.palette.primary.contrastText,
  },
  slidecontainer: {
    marginTop: theme.spacing(2),
  },
  slidetitlebar: {
    display: "flex",
    marginBottom: theme.spacing(1),
  },
  slidetitle: {
    color: theme.palette.text.primary
  },
  slidetitleicon: {
    width: 16,
    height: 16,
  },
  joinstring: {
    marginTop: theme.spacing(3),
  }
});


class User extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavBack = this.handleNavBack.bind(this);

    this.handleClickFollow = this.handleClickFollow.bind(this);
    this.handleClickUnfollow = this.handleClickUnfollow.bind(this);

    this.handleClickTwitter = this.handleClickTwitter.bind(this);
    this.handleClickInstagram = this.handleClickInstagram.bind(this);
    this.handleClickLinkedIn = this.handleClickLinkedIn.bind(this);

    this.handleSelectFeeds = this.handleSelectFeeds.bind(this);
    this.handleSelectUser = this.handleSelectUser.bind(this);
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

  componentDidMount = async () => {
    const { match } = this.props;

    this.setWaiting(true);

    await this.getMainInfo();

    let username = match.params.username;
    if (!username) {
      this.setWaiting(false);
      return;
    }

    await this.getUserInfo(username);

    this.setWaiting(false);
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

  getMainInfo = async () => {
    if (this.props.initialized) return;

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
        (result) => {
          const base_data = result.data;
          this.props.setNewssiteInfo(base_data.newssite);
          this.props.setSocialtypeInfo(base_data.socialtype);
          this.props.setCategories(base_data.categories);
          this.props.setFeeds(base_data.feeds);
          // this.props.setSources(base_data.sources);
          this.props.setTags(base_data.tags);
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
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
  };

  getUserInfo = async (username) => {
    const { loggedIn } = this.props;

    const gqlservice = new GraphqlService();
    if (loggedIn) {
      const token = await this._getAuthToken();
      if (!token) {
        this.handleLogin();
        return;
      }
      gqlservice.set_auth_jwt(token);
    }

    await gqlservice
      .user_by_username(username)
      .then(
        (result) => {
          const users = result.data.users;
          if (users.length > 0) {
            const selected_user = users[0];
            this.props.selectUser(selected_user);
          }
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };

  handleLogin = () => {
    const location = {
      pathname: ROUTES.SIGN_IN,
      state: { animation: "bottom" },
    };
    this.props.history.push(location);
    this.props.setLoginBackRoute(this.props.location.pathname);
  };

  handleNavBack = () => {
    // const location = {
    //   pathname: ROUTES.HOME,
    //   state: { animation: "right" },
    // };
    // this.props.history.push(location);
    this.props.history.goBack();
  };

  handleClickFollow = async () => {
    const { authUser, selected_user } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }

    this.setWaiting(true);

    gqlservice.set_auth_jwt(token);
    await gqlservice
      .insert_user_follower(selected_user.uid, authUser.uid)
      .then(
        (result) => {
          const users_followed = result.data.insert_user_followers.returning;
          if (users_followed.length > 0) {
            this.props.addFollowUser(users_followed[0]);
          }
      }, reason => { 
        this.setError(reason.msg);
        return;
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        return;
      });

    this.setWaiting(false);
  }

  handleClickUnfollow = async () => {
    const { authUser, selected_user } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }

    this.setWaiting(true);

    gqlservice.set_auth_jwt(token);
    await gqlservice
      .delete_user_follower(selected_user.uid, authUser.uid)
      .then(result => {
        this.props.deleteFollowUser(selected_user.uid);
      }, reason => { 
        this.setError(reason.msg);
        return;
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        return;
      });

    this.setWaiting(false);
  }

  // empty functions
  handleClickTwitter = () => { }
  handleClickInstagram = () => { }
  handleClickLinkedIn = () => { }
  // empty functions


  handleSelectFeeds = (feed) => {
    const location = {
      pathname: `/${ROUTES.FEEDS_PREFIX}/${feed.slug}`,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  };

  handleSelectUser = (user) => {
    const location = {
      pathname: `/${ROUTES.USER_PREFIX}/${user.username}`,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  }


  renderLinks = (links, classes, theme_mode, onClickTwitter, onClickInstagram, onClickLinkedIn) => {
    if (!links) {
      return <div></div>;
    }
    const twitter = links.find(link => link.type === "twitter");
    const instagram = links.find(link => link.type === "instagram");
    const linkedin = links.find(link => link.type === "linkedin");

    return (
      <Grid
        container
        className={classes.linkbuttons}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        {twitter !== undefined &&
          <Grid item>
            <Button
              className={classes.actionbtn}
              startIcon={
                <img
                  className={classes.actionicon}
                  alt="approve"
                  src={`/static/images/icons/${theme_mode}/twitter.png`}
                />
              }
              onClick={onClickTwitter}
            >
              {`@${twitter.value}`}
            </Button>
          </Grid>
        }
        {instagram !== undefined &&
          <Grid item>
            <Button
              className={classes.actionbtn}
              startIcon={
                <img
                  className={classes.actionicon}
                  alt="dismiss"
                  src={`/static/images/icons/${theme_mode}/instagram.png`}
                />
              }
              onClick={onClickInstagram}
            >
              {`@${instagram.value}`}
            </Button>
          </Grid>
        }
        {linkedin !== undefined &&
          <Grid item>
            <Button
              className={classes.actionbtn}
              startIcon={
                <img
                  className={classes.actionicon}
                  alt="dismiss"
                  src={`/static/images/icons/${theme_mode}/linkedin.png`}
                />
              }
              onClick={onClickLinkedIn}
            >
              {`@${linkedin.value}`}
            </Button>
          </Grid>
        }
      </Grid>
    );
  }

  render() {
    const { 
      classes, 
      theme_mode,
      loggedIn,
      authUser,
      selected_user,
      feeds,
      requesting 
    } = this.props;

    if (!selected_user) {
      return <div></div>;
    }

    let profile_image = BLANK_AVATAR;
    if (!selected_user.image) {
      profile_image = BLANK_AVATAR;
    } else {
      profile_image = selected_user.image;
    }

    // SlideLists width
    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    if (width > MAX_ARTICLE_WIDTH) width = MAX_ARTICLE_WIDTH; 
    const slidelist_width = width - 16; // root padding

    // follow by me?
    let ifollow = false;
    if (loggedIn) {
      ifollow = authUser.users_followed.find(user => user.user_id === selected_user.uid) !== undefined;
    }

    // is moderator?
    const is_moderator = 
      selected_user.categories_moderated.length > 0 || selected_user.feeds_moderated.length > 0;
    
    // followed feeds
    const followed_feeds = 
      selected_user.feeds_followed
        .map(item => feeds.find(feed => feed.id === item.feed_id))
        .filter(feed => feed !== undefined);

    // joined(created) date
    let join_date_str = "";
    if (selected_user.created_at) {
      const join_date = new Date(selected_user.created_at);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      join_date_str = `Joined ${join_date.toLocaleDateString("en-US", options)}`;
    }

    // followed users
    let following_users = [];
    for (let followed of selected_user.users_followed) {
      following_users.push({
        title: followed.user.name,
        image: followed.user.image,
        username: followed.user.username,
      });
    }

    
    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            width={MAX_ARTICLE_WIDTH}
            title={"User"}
            onNavBack={this.handleNavBack}
          />
        </div>
        <div className={classes.profileContainer}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item>
              <img
                className={classes.userimage}
                alt="profile"
                src={profile_image}
              />
            </Grid>
            <Grid item>
              {loggedIn && ifollow &&
                <Button
                  className={classes.followingbutton}
                  onClick={this.handleClickUnfollow}
                >
                  Following
                </Button>
              }
              {loggedIn && !ifollow &&
                <Button
                  className={classes.followbutton}
                  onClick={this.handleClickFollow}
                >
                  Follow
                </Button>
              }
            </Grid>
          </Grid>
          <div className={classes.detail}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item>
                <Typography className={classes.name}>
                  {selected_user.name || ""}
                </Typography>
              </Grid>
              {selected_user.paid &&
                <Grid item>
                  <img
                    className={classes.statusicon}
                    alt={selected_user.username}
                    src={`/static/images/icons/${theme_mode}/shield.png`}
                  />
                </Grid>
              }
              {is_moderator &&
                <Grid item>
                  <img
                    className={classes.statusicon}
                    alt="moderator"
                    src={`/static/images/icons/${theme_mode}/moderator.png`}
                  />
                </Grid>
              }
            </Grid>
            <Typography className={classes.username}>
              @{selected_user.username || ""}
            </Typography>
            <Typography className={classes.description}>
              {selected_user.biography || ""}
            </Typography>
          </div>

          {this.renderLinks(selected_user.links, classes, theme_mode, this.handleClickTwitter, this.handleClickInstagram, this.handleClickLinkedIn)}

          <div className={classes.slidecontainer}>
            <div className={classes.slidetitlebar}>
              <Typography className={classes.slidetitle}>My Feeds</Typography>
            </div>
            <div className={classes.slide}>
              <SlideLists
                width={slidelist_width}
                items={followed_feeds}
                onItemSelected={this.handleSelectFeeds}
              />
            </div>
          </div>
          
          <div className={classes.slidecontainer}>
            <div className={classes.slidetitlebar}>
              <Typography className={classes.slidetitle}>Following</Typography>
            </div>
            <div className={classes.slide}>
              <SlideLists
                width={slidelist_width}
                items={following_users}
                onItemSelected={this.handleSelectUser}
              />
            </div>
          </div>

          <Typography className={classes.joinstring}>
            {join_date_str}
          </Typography>
        </div>
        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  initialized: state.dataState.initialized,
  selected_user: state.dataState.selected_user,
  feeds: state.dataState.feeds,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withAuthentication,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(User);

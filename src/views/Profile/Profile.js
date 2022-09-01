import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withFirebase } from 'services';
// import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/styles';
import { 
  Typography, 
  Button, 
  Grid,
  Input,
  InputAdornment 
} from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import io from 'socket.io-client';
import { ToastContainer } from "react-toastify";
import { 
  BasicAppBar, 
  WaitingDialog, 
  ImageSelector, 
} from "components";
import { SocialButton, SlideIconLists } from "./components";
import { withAuthentication, withAuthorization } from "session";
import { GraphqlService } from "services";
import * as ROUTES from "constants/routes";
import { 
  USER_TAGS_MIN_CNT, 
  MAX_ARTICLE_WIDTH, 
  GRAPHQL_SUCCESS, 
  GRAPHQL_ERROR 
} from "constants/types";
import { validate_email } from "utility/utils";
import { is_paid_user } from "utility/user";
import { auth_response } from "utility/ravenapi";
import { NOTIFICATION_FEED_SUBSCRIBE } from "constants/notification";

import { useWeb3React } from "@web3-react/core";
import { injected } from "wallet/Connector";
import { get_ens_name } from "utility/ens";
import { ToastInfo, ToastError } from "utility/toast";
import { 
  moderate_image 
} from "utility/ravenapi";
import {
  resizeImageFile
} from "utility/resizeimage";


const API_URL = "https://authapi.raventalk.org";
const socket = io(API_URL);

const condition = (authUser) => !!authUser && authUser.uid !== ""

const BLANK_AVATAR = "/static/images/avatars/blank_avatar.png";

const useStyles = makeStyles(theme => ({
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
  profileContainer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    // marginTop: 56,
    [theme.breakpoints.up("md")]: {
      marginTop: 64
    }
  },
  titlediv: {
    textAlign: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 20,
    fontWeight: 500,
  },
  detail: {
    marginTop: theme.spacing(2),
    width: "100%"
  },
  name: {
    width: "100%",
    // backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    border: 0,
    fontSize: 20,
    fontWeight: 600,
    "&:focus": {
      outline: "0px"
    },
    "&::placeholder": {
      color: theme.palette.text.primary
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.primary
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.primary
    }
  },
  statusicon: {
    width: 24,
    height: 24,
  },
  adornment: {
    display: "inline",
    fontSize: 20,
    marginRight: 4,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
  },
  username: {
    maxWidth: "100%",
    // backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    border: 0,
    fontSize: 20,
    marginTop: 4,
    "&:focus": {
      outline: "0px"
    },
    "&::placeholder": {
      color: theme.palette.text.primary
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.primary
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.primary
    }
  },
  description: {
    width: "100%",
    height: 50,
    // backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    border: 0,
    fontSize: 16,
    padding: 0,
    marginTop: theme.spacing(3),
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px"
    }
  },
  blockcontainer: {
    marginTop: theme.spacing(2),
  },
  blockdiv: {
    paddingBottom: theme.spacing(1),
  },
  blockTitleBar: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  blockTitle: {
    color: theme.palette.text.primary
  },
  feedSeeAll: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    position: "absolute",
    right: 16,
    alignItems: "center",
    lineHeight: "24px"
  },
  selectfollowing: {
    color: theme.palette.text.secondary,
    padding: 0,
    fontSize: 14,
    textTransform: 'none',
    position: "absolute",
    right: 16,
    alignItems: "top",
    lineHeight: "20px"
  },
  selectbuttontext: {
    color: theme.palette.text.primary,
    fontWeight: 400,
    fontSize: 14
  },
  buttonbox: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  subscribebutton: {
    backgroundColor: "#1878F3",
    "&:hover": {
      backgroundColor: "#1878F3"
    },
    color: theme.palette.text.primary,
    borderRadius: "30px",
    padding: "8px 8px",
    width: "100%",
    textTransform: "initial",
    marginTop: theme.spacing(1),
  },
  branchimg: {
    margin: 0,
    width: 16,
    height: 16
  },
  skipbutton: {
    backgroundColor: theme.palette.background.default,
    "&:hover": {
      backgroundColor: theme.palette.background.default
    },
    borderRadius: "30px",
    border: "3px solid #1878F3",
    boxSizing: "border-box",
    padding: "8px 8px",
    width: "100%",
    color: theme.palette.text.primary,
    textTransform: "initial",
    marginTop: theme.spacing(1),
  },
  skipbuttontext: {
    color: theme.palette.text.primary,
    fontWeight: 400,
    fontSize: 16
  },
  savebutton: {
    backgroundColor: "#1878F3",
    "&:hover": {
      backgroundColor: "#1878F3"
    },
    color: theme.palette.text.primary,
    borderRadius: "30px",
    border: "3px solid #1878F3",
    padding: "8px 8px",
    width: "100%",
    textTransform: "initial",
    marginTop: theme.spacing(1),
  },
  savebutton_disabled: {
    backgroundColor: "#303030",
    "&:hover": {
      backgroundColor: "#303030"
    },
    color: theme.palette.text.primary,
    borderRadius: "30px",
    border: "3px solid #303030",
    padding: "8px 8px",
    width: "100%",
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
    opacity: 0.5
  },
  buttontext: {
    color: "#FFF",
    fontWeight: 400,
    fontSize: 16
  },
  linkbuttons: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  actionbtn: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "20px",
    padding: "4px 10px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    textTransform: "initial",
    // boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  actionicon: {
    padding: 3,
    width: 24,
    height: 24,
    color: theme.palette.primary.contrastText,
  },
  bottomdiv: {
    paddingBottom: theme.spacing(2),
  },
}));

const ACCOUNT_TYPE_TWITTER    = 0;
const ACCOUNT_TYPE_INSTAGRAM  = 1;
const ACCOUNT_TYPE_LINKEDIN   = 2;


const Profile = props => {
  const { 
    active, 
    account, 
    // library, 
    activate, 
    // deactivate 
  } = useWeb3React();

  const { 
    loggedIn, 
    authUser,
    feeds,
    followed_feeds,
    newsletter_feeds,
    tags,
    theme_mode,
    requesting 
  } = props;

  const classes = useStyles();

  const [profile, setProfile] = useState({
    name: "",
    username: "",
    biography: "",
    image: BLANK_AVATAR,
    imageUpload: "",
    email: "",
    links: [],
  });

  const [joinDate, setJoinDate] = useState("");
  const [width, setWidth] = useState(document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth);
  const [seeAllPos, setSeeAllPos] = useState(16);
  const [cryptoConnected, setCryptoConnected] = useState(active);
  const [cryptoAddress, setCryptoAddress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let links = authUser.links.slice();
      const result = await auth_response();
      if (!result.error) {
        // console.log("social auth result :", result);
        for (let link of links) {
          if (link.type === "twitter") {
            link.value = result.user.twitterId;
          }
        }
      }

      // console.log("crypto connected :", cryptoConnected);
      if (cryptoConnected) {
        const result = await get_ens_name(account);
        if (result === null) {
          // const crypto_address = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
          setCryptoAddress("");
        } else {
          setCryptoAddress(result);
        }
      } else {
        setCryptoAddress("");
      }

      setProfile({
        name: authUser.name,
        username: authUser.username,
        biography: authUser.biography,
        image: authUser.image,
        email: authUser.subscribe_email,
        links: links,
        // create_mode: !hasProfile
      });

      // console.log("Profile width :", width);

      if (width > MAX_ARTICLE_WIDTH) {
        setSeeAllPos(16 + (width - MAX_ARTICLE_WIDTH) / 2);
        setWidth(MAX_ARTICLE_WIDTH);
      }
    
      // joined(created) date
      if (authUser.created_at) {
        const join_date = new Date(authUser.created_at);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        setJoinDate(`Joined ${join_date.toLocaleDateString("en-US", options)}`);
      }
    }

    fetchData();
  }, [authUser, cryptoConnected, width, account]);

  const setWaiting = (waiting) => {
    if (waiting) {
      props.requestDataPending();
    } else {
      props.requestDataFinished();
    }
  };

  const setError = (errMsg) => {
    ToastError(errMsg);
    props.requestDataFinished(true);
  }

  const showInfo = (msg) => {
    ToastInfo(msg);
  };

  const _getAuthToken = async () => {
    let token = authUser.token;
    if (Date.now() >= authUser.expiredTS) {
      const result = await props.firebase.refreshToken();
      if (result.error) {
        setError(result.msg);
        token = null;
      } else {
        token = result.token;
      }
    }
    return token;
  };

  const handleLogin = () => {
    const location = {
      pathname: ROUTES.SIGN_IN,
      state: { animation: "bottom" },
    };
    props.history.push(location);
  };

  const handleNavBack = () => {
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "right" },
    };
    props.history.push(location);
  };


  const handleChange = event => {
    event.persist();

    setProfile({
      ...profile,
      [event.target.name]: event.target.value
    });
  };

  const handleImageChange = ({ target }) => {
    if (target.files.length === 0) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = e => {
      setProfile({
        ...profile,
        image: e.target.result,
        imageUpload: target.files[0]
      });
    };
  };


  const handleShowFeeds = () => {
    const location = {
      pathname: ROUTES.PROFILE_NEWSLETTER,
      state: { animation: "left" },
    };
    props.history.push(location);
  };

  const handleSelectFeeds = (feed) => {
    props.selectFeed(feed);

    let path = `/${ROUTES.FEEDS_PREFIX}/${feed.slug}`;
    const location = {
      pathname: path,
      state: { animation: "left" },
    };
    props.history.push(location);

    props.setFeedBackRoute(ROUTES.PROFILE);
  };

  // const handleShowFollowing = () => {
  //   const location = {
  //     pathname: ROUTES.YOUR_FEEDS,
  //     state: { animation: "left" },
  //   };
  //   props.history.push(location);
  // };

  const handleSelectFollowingUser = (user) => {
    // console.log("selected user :", user);
    if (user.username === null || user.username.length === 0) {
      return;
    }
    let route = `/${ROUTES.USER_PREFIX}/${user.username}`;
    const location = {
      pathname: route,
      state: { animation: "left" },
    };
    props.history.push(location);
  };


  const handleUpdateAccount = (provider, username) => {
    let account_type = null;
    if (provider === "twitter") {
      account_type = ACCOUNT_TYPE_TWITTER;
    } else if (provider === "instagram") {
      account_type = ACCOUNT_TYPE_INSTAGRAM;
    } else if (provider === "linkedin") {
      account_type = ACCOUNT_TYPE_LINKEDIN;
    }

    handleApplyAccount(account_type, username);
  }

  const handleClickCrypto = async () => {
    // console.log("Click crypto button, cryptoConnected :", cryptoConnected);

    if (cryptoConnected) {
      try {
        // await deactivate();
        // setCryptoConnected(false);
        const etherscan_url = `https://etherscan.io/address/${account}`;
        window.open(etherscan_url);
      } catch (ex) {
        console.log(ex);
      }
    } else {
      try {
        await activate(injected);
        setCryptoConnected(true);
      } catch (ex) {
        console.log(ex)
      }
    }
  }


  const handleApplyAccount = async (account_type, account) => {
    let links = profile.links.slice();
    if (account_type === ACCOUNT_TYPE_TWITTER) {
      if (links.find(link => link.type === "twitter") === undefined) {
        links.push({
          type: "twitter",
          value: account
        });
      } else {
        for (let link of links) {
          if (link.type === "twitter") {
            link.value = account;
          }
        }
      }
    } else if (account_type === ACCOUNT_TYPE_INSTAGRAM) {
      if (links.find(link => link.type === "instagram") === undefined) {
        links.push({
          type: "instagram",
          value: account
        });
      } else {
        for (let link of links) {
          if (link.type === "instagram") {
            link.value = account;
          }
        }
      }
    } else if (account_type === ACCOUNT_TYPE_LINKEDIN) {
      if (links.find(link => link.type === "linkedin") === undefined) {
        links.push({
          type: "linkedin",
          value: account
        });
      } else {
        for (let link of links) {
          if (link.type === "linkedin") {
            link.value = account;
          }
        }
      }
    }

    setProfile({
      ...profile,
      links: links
    });

    let real_links = links.filter(link => link.value !== "");

    const gqlservice = new GraphqlService();
    const token = await _getAuthToken();
    if (!token) {
      handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);
    await gqlservice
      .update_user_links(authUser.uid, real_links)
      .then(
        result => {
          let user = result.data.update_users.returning[0];
          props.updateUserProfile(user);
        },
        reason => {
          setError(reason.msg);
        }
      )
      .catch(err => {
        setError(JSON.stringify(err));
      });
  }

  const checkUsername = (username) => {
    const regex = /^[a-zA-Z0-9]+$/g;
    const found = username.match(regex);
    return found !== null;
  }

  const existUsername = async (username) => {
    const gqlservice = new GraphqlService();
    const token = await _getAuthToken();
    if (!token) {
      handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);
    const result = await gqlservice.user_by_username(username);
    if (result.status_code === GRAPHQL_SUCCESS) {
      return result.data.users.length > 0;
    } else {
      setError("Network disconnected, can't access database");
    }
  }

  const handleEmailChange = event => {
    setProfile({
      ...profile,
      email: event.target.value
    });
  }

  const handleClickSubscribe = async () => {
    if (profile.email.trim().length === 0 || !validate_email(profile.email)) {
      setError("Invalid email");
      return;
    }
    if (newsletter_feeds.length === 0) {
      setError("There aren't feeds to subscribe, select feeds to subscribe first");
      return;
    }

    setWaiting(true);

    // get new & deleted feeds to subscribe
    const feeds_subscribed = authUser.feeds_subscribed;

    const new2subscribe = newsletter_feeds.filter(feed_id => 
      feeds_subscribed.find(subscribed => feed_id === subscribed.feed_id) === undefined
    );
    const delete2subscribe = feeds_subscribed.filter(subscribed =>
      newsletter_feeds.find(feed_id => feed_id === subscribed.feed_id) === undefined
    ).map(subscribed => subscribed.feed_id);

    const gqlservice = new GraphqlService();
    const token = await _getAuthToken();
    if (!token) {
      setWaiting(false);
      handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    let changed = false;
    let result = null;
    if (authUser.subscribe_email !== profile.email.trim())  {
      result = await gqlservice.update_user_subscribe_email(authUser.uid, profile.email)
      if (result.status_code === GRAPHQL_SUCCESS) {
        const user_profile = result.data.update_users.returning;
        if (user_profile.length > 0) {
          props.updateUserProfile(user_profile[0]);
          changed = true;
        }
      } else {
        setError(result.msg);
        return;
      }
    }

    // delete subscribed feeds
    if (delete2subscribe.length > 0) {
      for (let feed_id of delete2subscribe) {
        result = await gqlservice.delete_feed_subscriber(feed_id, authUser.uid);
        if (result.status_code === GRAPHQL_ERROR) {
          continue;
        } else {
          changed = true;
        }
      }
    }

    // subscribe new feeds
    if (new2subscribe.length > 0) {
      for (let feed_id of new2subscribe) {
        result = await gqlservice.insert_feed_subscriber(feed_id, authUser.uid);
        if (result.status_code === GRAPHQL_ERROR) {
          continue;
        } else {
          changed = true;

          // insert notification
          const feed = feeds.find(item => item.id === feed_id);
          const feed_owner = feed.feed_moderators.find(moderator => moderator.owner);
          if (feed_owner !== undefined) {
            const notification = {
              type: NOTIFICATION_FEED_SUBSCRIBE,
              object: feed_id,
              in_which: null,
              to: feed_owner.user_id,
              created_by: authUser.uid
            }

            await gqlservice
              .insert_notification(notification)
              .then(result => {}, reason => {
                setError(reason.msg);
              })
              .catch(err => {
                setError(JSON.stringify(err));
              });
          }
        }
      }
    }

    if (changed) {
      result = await gqlservice.user_by_id(authUser.uid);
      if (result.status_code === GRAPHQL_ERROR) {
        setError(result.msg);
        return;
      }

      if (result.data.users.length > 0) {
        // console.log("feeds subscribed :", result.data.users[0].feeds_subscribed);
        props.updateFeedsSubscribed(result.data.users[0].feeds_subscribed);
      }

      showInfo("Success to subscribe feeds");
      localStorage.setItem('authUser', JSON.stringify(result.data.users[0]));
    }

    setWaiting(false);
  }

  const handleClickUnsubscribe = async () => {
    setWaiting(true);

    const gqlservice = new GraphqlService();
    const token = await _getAuthToken();
    if (!token) {
      setWaiting(false);
      handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    let result = await gqlservice.delete_user_subscribe_email(authUser.uid)
    if (result.status_code === GRAPHQL_SUCCESS) {
      const profile = result.data.update_users.returning;
      if (profile.length > 0) {
        props.updateUserProfile(profile[0]);
      }
    } else {
      setError(result.msg);
      return;
    }

    // delete subscribed feeds
    result = await gqlservice.delete_feed_subscribers(authUser.uid);
    if (result.status_code === GRAPHQL_ERROR) {
      setError(result.msg);
      return;
    }

    setProfile({
      ...profile,
      email: ""
    });

    // update user & localstorage
    props.deleteFeedsSubscribed();

    let newAuthUser = {
      ...authUser,
      feeds_subscribed: []
    };
    localStorage.setItem('authUser', JSON.stringify(newAuthUser));

    setWaiting(false);
  }

  const handleSubmitProfile = async () => {
    const { name, username, image } = profile;

    if (name.trim() === "") {
      setError("Name can't be blank");
      return;
    }

    const trimmed_username = username.trim();
    if (trimmed_username === "") {
      setError("Username can't be blank");
      return;
    } else if (trimmed_username.length < 6) {
      setError("Username must be longer than 6 characters");
      return;
    } else if (!checkUsername(trimmed_username)) {
      setError("Username format error");
      return;
    }

    if (trimmed_username !== authUser.username) {
      const result = await existUsername(trimmed_username);
      if (result) {
        setError("Duplicate Username, choose another one");
        return;
      } else if (result === undefined) {
        return;
      }
    }

    if (image !== BLANK_AVATAR && image !== authUser.image) {
      updateImageAndProfile();
    } else {
      updateProfile(image);
    }
  };

  const updateImageAndProfile = async () => {
    const { imageUpload } = profile;

    setWaiting(true);

    const resized_image = await resizeImageFile(imageUpload);
    const result = await props.firebase.uploadImage(resized_image, "avatars");
    if (result.error) {
      setError("Failed to upload user image.");
      return;
    }

    const imageUrl = result.url;
    const modresult = await moderate_image(imageUrl);
    console.log("image moderation result :", modresult);
    if (modresult.result) {
      this.setError("Image not allowed, because it contains adults or racy content.");
      await props.firebase.deleteImage(imageUrl);
      return;
    }

    await updateProfile(imageUrl);
    setWaiting(false);
  };

  const updateProfile = async (image_url) => {
    const { name, username, biography, links } = profile;

    let real_links = links.filter(link => link.value !== "");

    // console.log("real_links :", real_links);

    const user = {
      uid: authUser.uid,
      name: name.trim(),
      username: username.trim(),
      biography: biography.trim(),
      image: image_url,
      provider: authUser.provider,
      email: authUser.email,
      emailVerified: authUser.emailVerified,
      phone: authUser.phone,
      phoneVerified: authUser.phoneVerified,
      cryptoAddress: active ? account : "",
      cryptoENS: cryptoAddress.length > 0 ? cryptoAddress : "",
      cryptoAmount: null,
      state: "",
      country: "",
      links: real_links,
      role: authUser.role,
      approved: authUser.approved,
      skipProfile: true
    };

    // console.log("updateProfile :", user);

    const gqlservice = new GraphqlService();
    const token = await _getAuthToken();
    if (!token) {
      handleLogin();
      return;
    }

    gqlservice.set_auth_jwt(token);
    await gqlservice
      .update_user(user)
      .then(
        result => {
          let user = result.data.update_users.returning[0];
          props.updateUserProfile(user);

          const location = {
            pathname: ROUTES.PROFILE_PHONE,
            state: { animation: "left" },
          };
          props.history.push(location);
        },
        reason => {
          setError(reason.msg);
          return;
        }
      )
      .catch(err => {
        setError(JSON.stringify(err));
        return;
      });
  }

  const handleSkip = async () => {
    const gqlservice = new GraphqlService();
    const token = await _getAuthToken();
    if (!token) {
      handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);
    await gqlservice
      .update_user_skipprofile(authUser.uid, true)
      .then(
        result => {
          let user = result.data.update_users.returning[0];
          props.updateUserProfile(user);
        },
        reason => {
          setError(reason.msg);
        }
      )
      .catch(err => {
        setError(JSON.stringify(err));
      });

    const mytags = tags.filter(
      tag =>
        tag.tag_users.findIndex(
          tag_user => tag_user.user_id === authUser.uid
        ) !== -1
    );

    if (tags.length === 0 || mytags.length >= USER_TAGS_MIN_CNT) {
      const location = {
        pathname: ROUTES.HOME,
        state: { animation: "right" },
      };
      props.history.push(location);
    } else {
      const location = {
        pathname: ROUTES.ONBOARDING,
        state: { animation: "right" },
      };
      props.history.push(location);
    }
  }

  const _isModerator = () => {
    return authUser.categories_moderated.length > 0 || authUser.feeds_moderated.length > 0;
  }

  const renderLinks = (myprofile, classes, theme_mode, handleUpdateAccount, onClickCrypto) => {
    const twitter = myprofile.links.find(link => link.type === "twitter");
    const instagram = myprofile.links.find(link => link.type === "instagram");
    const linkedin = myprofile.links.find(link => link.type === "linkedin");

    let cryptoAddr = "";
    if (cryptoAddress.length > 0) {
      cryptoAddr = cryptoAddress;
    } else if (cryptoConnected && account !== undefined) {
      cryptoAddr = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
    } else {
      cryptoAddr = "";
    }

    return (
      <Grid
        container
        className={classes.linkbuttons}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <SocialButton
            theme_mode={theme_mode}
            socket={socket}
            provider={"twitter"}
            username={twitter === undefined ? "" : `${twitter.value}`}
            onUpdateUser={handleUpdateAccount}
          />
        </Grid>
        <Grid item>
          <SocialButton
            theme_mode={theme_mode}
            socket={socket}
            provider={"instagram"}
            username={instagram === undefined ? "" : `${instagram.value}`}
            onUpdateUser={handleUpdateAccount}
          />
        </Grid>
        <Grid item>
          <SocialButton
            theme_mode={theme_mode}
            socket={socket}
            provider={"linkedin"}
            username={linkedin === undefined ? "" : `${linkedin.value}`}
            onUpdateUser={handleUpdateAccount}
          />
        </Grid>
        <Grid item>
          <Button
            className={classes.actionbtn}
            startIcon={
              <img className={classes.actionicon} alt="approve" 
                src={`/static/images/icons/${theme_mode}/crypto.png`} 
              />
            }
            onClick={onClickCrypto}
          >
            {cryptoConnected ? cryptoAddr : "Add Wallet"}
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.appbar}>
        <BasicAppBar
          width={MAX_ARTICLE_WIDTH}
          title={"Profile"}
          onNavBack={handleNavBack}
        />
      </div>
      <div className={classes.profileContainer}>
        <div className={classes.profileContent}>
          {/* <div className={classes.titlediv}>
            <Typography className={classes.title}>
              Tell us about yourself
            </Typography>
          </div> */}
          <div>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-end"
              spacing={1}
            >
              <Grid item>
                <ImageSelector
                  image={profile.image === "" ? BLANK_AVATAR : profile.image}
                  imageHandleChanged={handleImageChange}
                />
              </Grid>
              {is_paid_user(loggedIn, authUser) &&
                <Grid item>
                  <img
                    className={classes.statusicon}
                    alt="paiduser"
                    src={`/static/images/icons/${theme_mode}/shield.png`}
                  />
                </Grid>
              }
              {_isModerator() &&
                <Grid item>
                  <img
                    className={classes.statusicon}
                    alt="moderator"
                    src={`/static/images/icons/${theme_mode}/moderator.png`}
                  />
                </Grid>
              }
            </Grid>
            <div className={classes.detail}>
              <input
                name="name"
                placeholder="Your name"
                value={profile.name || ""}
                className={classes.name}
                onChange={handleChange}
              />
              <div>
                <p className={classes.adornment}>@</p>
                <input
                  name="username"
                  placeholder="your username"
                  value={profile.username || ""}
                  className={classes.username}
                  onChange={handleChange}
                />
              </div>
              <textarea
                name="biography"
                placeholder="Add your details here"
                value={profile.biography}
                className={classes.description}
                onChange={handleChange}
              />
            </div>
          </div>
          {renderLinks(profile, classes, theme_mode, handleUpdateAccount, handleClickCrypto)}
        </div>
        <div className={classes.blockcontainer}>
          <div className={classes.blockdiv}>
            <div className={classes.blockTitleBar}>
              <Typography className={classes.blockTitle}>My Feeds</Typography>
              {/* <Typography
                className={classes.feedSeeAll}
                style={{right: seeAllPos}}
                onClick={handleShowFeeds}
              >
                See All
              </Typography> */}
            </div>
            <div className={classes.slide}>
              <SlideIconLists
                width={width - 16}
                items={followed_feeds}
                onItemSelected={handleSelectFeeds}
              />
            </div>
          </div>
        </div>
        <div className={classes.blockcontainer}>
          <div className={classes.blockdiv}>
            <div className={classes.blockTitleBar}>
              <Typography className={classes.blockTitle}>Following</Typography>
              {/* <Button
                className={classes.selectfollowing}
                clickable={"false"}
                endIcon={<ArrowForwardIosIcon fontSize="small" style={{width: 16, marginBottom: 2}} />}
                onClick={handleShowFollowing}
              >
                <Typography className={classes.selectbuttontext}>
                  Select
                </Typography>
              </Button> */}
            </div>
            <div className={classes.slide}>
              <SlideIconLists
                width={width - 16}
                items={authUser.users_followed.map(followed => followed.user)}
                onItemSelected={handleSelectFollowingUser}
              />
            </div>
          </div>
        </div>
        <div className={classes.blockcontainer}>
          <div className={classes.blockdiv}>
            <div className={classes.blockTitleBar}>
              <Typography className={classes.blockTitle}>Daily Email Newsletter</Typography>
              <Button
                className={classes.selectfollowing}
                style={{right: seeAllPos}}
                clickable={"false"}
                endIcon={<ArrowForwardIosIcon fontSize="small" style={{width: 16, marginBottom: 2}} />}
                onClick={handleShowFeeds}
              >
                <Typography className={classes.selectbuttontext}>
                  Select
                </Typography>
              </Button>
            </div>
            <div className={classes.buttonbox}>
              <Input
                id="input-email"
                fullWidth
                name="email"
                value={profile.email || ""}
                startAdornment={
                  <InputAdornment position="start">
                    <img
                      alt={"email"}
                      src={`/static/images/icons/${theme_mode}/email.png`}
                      className={classes.branchimg}
                    />
                  </InputAdornment>
                }
                onChange={handleEmailChange}
              />
            </div>
            <div className={classes.buttonbox}>
              <Button
                className={classes.subscribebutton}
                disabled={false}
                clickable={"false"}
                onClick={handleClickSubscribe}
              >
                <Typography className={classes.buttontext}>
                  Subscribe
                </Typography>
              </Button>
              {authUser.subscribe_email !== null && authUser.feeds_subscribed.length > 0 && (
                <Button
                  className={classes.subscribebutton}
                  disabled={false}
                  clickable={"false"}
                  onClick={handleClickUnsubscribe}
                >
                  <Typography className={classes.buttontext}>
                    Unsubscribe
                  </Typography>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className={classes.blockcontainer}>
          <Typography>{joinDate}</Typography>
        </div>
        <div className={classes.blockcontainer}>
          {/* {create_mode && */}
            <div className={classes.buttonbox}>
              <Button
                className={classes.skipbutton}
                onClick={handleSkip}
              >
                <Typography className={classes.skipbuttontext}>
                  Skip
                </Typography>
              </Button>
            </div>
          {/* } */}
          <div className={classes.buttonbox}>
            {(profile.username !== "" || profile.name !== "") &&
              <Button
                className={classes.savebutton}
                disabled={false}
                clickable={"false"}
                endIcon={<ArrowForwardIcon style={{color: "white"}} />}
                onClick={handleSubmitProfile}
              >
                <Typography className={classes.buttontext}>
                  Save
                </Typography>
              </Button>
            }
            {(profile.username === "" && profile.name === "") &&
              <Button 
                className={classes.savebutton_disabled} 
                disabled={true}
                endIcon={<ArrowForwardIcon style={{color: "white"}} />}
              >
                <Typography className={classes.buttontext}>
                  Save
                </Typography>
              </Button>
            }
          </div>
        </div>
      </div>
      <div className={classes.bottomdiv}></div>
      <WaitingDialog open={requesting} />
      <ToastContainer />
    </div>
  );
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  feeds: state.dataState.feeds,
  followed_feeds: state.dataState.followed_feeds,
  newsletter_feeds: state.dataState.newsletter_feeds,
  tags: state.dataState.tags,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  // withRouter,
  withAuthentication,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
)(Profile);

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Badge,
  Avatar,
  IconButton,
  Menu,
  Divider,
  Fade,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { PopMenuProfile } from "components";
import { ExpandableSearchBar, HeaderActionBar, FeedsSlide } from "./components";
import { THEME_MODE_LIGHT, THEME_MODE_DARK } from "constants/types";

const styles = (theme) => ({
  root: {
    position: "fixed",
    width: theme.breakpoints.values.lg,
    maxWidth: "100%",
    zIndex: 1200,
  },
  appbar: {
    position: "absolute",
  },
  toolbar: {
    // borderBottom: `2px solid ${theme.palette.text.secondary}`
  },
  badge: {
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
    backgroundColor: "red",
    color: "white",
  },
  avatar: {
    margin: 0,
    width: 32,
    height: 32,
  },
  logo_text: {
    marginLeft: theme.spacing(0.5),
    marginTop: 2,
    height: 28,
    width: "auto",
  },
  mainBtnGroup: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  account: {
    padding: 0,
  },
  searchbar: {
    position: "relative",
    minHeight: 48,
  },
  feedslide: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    margintop: theme.spacing(1),
  },
});

class MainAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };

    this.handlePlayHelp = this.handlePlayHelp.bind(this);
    this.handleNofitication = this.handleNofitication.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
    this.handleProfileMenuItem = this.handleProfileMenuItem.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
  }

  handlePlayHelp = () => {
    this.props.onHelp();
  };

  handleNofitication = () => {
    this.props.onNotification();
  };

  handleProfileMenuOpen = (event) => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget,
    });
    this.props.initScrollPos();
  };

  handleMenuClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  handleProfileMenuItem = (route) => (event) => {
    this.handleMenuClose();
    // this.props.history.push(path);
    this.props.onProfileMenu(route);
  };

  handleSignOut = () => {
    this.handleMenuClose();
    this.props.onSignOut();
  };

  handleChangeTheme = () => {
    const theme =
      this.props.theme_mode === THEME_MODE_LIGHT
        ? THEME_MODE_DARK
        : THEME_MODE_LIGHT;
    this.props.selectThemeMode(theme);
    localStorage.setItem("themeMode", theme);
    this.handleMenuClose();
  };

  render() {
    const {
      classes,
      show,
      loggedIn,
      authUser,
      theme_mode,
      feeds,
      hasPodcasts,
      notifications,
      handleSearchChange,
      handleSearchEnter,
      handleClickYourLists,
      handleClickDiscover,
      handleClickCreate,
      handleClickPodcasts,
      handleClickCleanAir,
      handleListSelected,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <Fade in={show} timeout={{ enter: 500, exit: 1000 }}>
          <AppBar className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <img
                alt={"Raven"}
                src={`/static/images/logo/${theme_mode}/logo.png`}
                className={classes.avatar}
              />
              <img
                alt={"Raven"}
                src={`/static/images/logo/${theme_mode}/logo_text.png`}
                className={classes.logo_text}
              />
              <div className={classes.mainBtnGroup} />
              <IconButton
                className={classes.account}
                aria-label={`play help videos`}
                color="inherit"
                onClick={this.handlePlayHelp}
              >
                <HelpOutlineIcon className={classes.avatar} />
              </IconButton>
              {loggedIn && (
                <IconButton
                  aria-label={`show ${notifications.length} new notifications`}
                  color="inherit"
                  onClick={this.handleNofitication}
                >
                  {notifications.length > 0 ? (
                    <Badge
                      classes={{ badge: classes.badge }}
                      badgeContent={notifications.length}
                      overlap="rectangular"
                    >
                      <NotificationsIcon style={{ fontSize: 32 }} />
                    </Badge>
                  ) : (
                    <NotificationsIcon style={{ fontSize: 32 }} />
                  )}
                </IconButton>
              )}
              <IconButton
                className={classes.account}
                edge="end"
                aria-owns={anchorEl !== null ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                {authUser.image !== undefined && authUser.image.length > 0 ? (
                  <Avatar
                    alt={"userimage"}
                    src={
                      authUser.image ||
                      "/static/images/avatars/blank_avatar.png"
                    }
                    className={classes.avatar}
                  />
                ) : (
                  <AccountCircle className={classes.avatar} />
                )}
              </IconButton>
            </Toolbar>
            <div>
              <div className={classes.searchbar}>
                <HeaderActionBar
                  hasPodcasts={hasPodcasts}
                  onClickYourLists={handleClickYourLists}
                  onClickDiscover={handleClickDiscover}
                  onClickCreate={handleClickCreate}
                  onClickPodcasts={handleClickPodcasts}
                  onClickCleanAir={handleClickCleanAir}
                />
                <ExpandableSearchBar
                  onSearchChange={handleSearchChange}
                  onSearchEnter={handleSearchEnter}
                />
              </div>
              {feeds.length > 0 && (
                <div className={classes.feedslide}>
                  <FeedsSlide
                    items={feeds}
                    onItemSelected={handleListSelected}
                  />
                </div>
              )}
              <Divider />
            </div>
          </AppBar>
        </Fade>

        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={anchorEl !== null}
          onClose={this.handleMenuClose}
        >
          <PopMenuProfile
            onSelected={this.handleProfileMenuItem}
            onSignOut={this.handleSignOut}
            onChangeTheme={this.handleChangeTheme}
          />
        </Menu>
      </div>
    );
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object,
  show: PropTypes.bool,
  feeds: PropTypes.array,
  hasPodcasts: PropTypes.bool,
  notifications: PropTypes.array,
  onHelp: PropTypes.func,
  onNotification: PropTypes.func,
  onProfileMenu: PropTypes.func,
  onSignOut: PropTypes.func,
  handleSearchChange: PropTypes.func,
  handleSearchEnter: PropTypes.func,
  handleClickYourLists: PropTypes.func,
  handleClickDiscover: PropTypes.func,
  handleClickCreate: PropTypes.func,
  handleClickPodcasts: PropTypes.func,
  handleClickCleanAir: PropTypes.func,
  handleListSelected: PropTypes.func,
};

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  categories: state.dataState.categories,
  sources: state.dataState.sources,
  theme_mode: state.uiState.theme_mode,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainAppBar));

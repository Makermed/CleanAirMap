import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from '@material-ui/core/styles';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography,
  Avatar,
  Menu
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountCircle from "@material-ui/icons/AccountCircle";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { PopMenuProfile } from "components";
import { 
  MAX_ARTICLE_WIDTH,
  THEME_MODE_LIGHT, 
  THEME_MODE_DARK
} from 'constants/types';


const styles = theme => ({
  root: {
    position: "fixed",
    width: MAX_ARTICLE_WIDTH,
    maxWidth: "100%",
    height: "56px",
    zIndex: 1100,
  },
  appbar: {
    position: "absolute",
    // borderBottom: `2px solid ${theme.palette.text.secondary}`
  },
  navbefore: {
    color: theme.palette.text.primary,
  },
  toolbox: {
    display: 'flex'
  },
  titlebox: {
    display: "flex",
    alignItems: "center"
  },
  image: {
    height: 32,
    width: 32,
    padding: 4,
    borderRadius: 16,
    backgroundColor: "#BFDBFF"
  },
  title: {
    display: "inline",
    marginLeft: theme.spacing(1),
    fontSize: "18px",
    lineHeight: "18px",
    fontWeight: 500,
  },
  mainBtnGroup: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  account: {
    padding: 0,
    marginLeft: 4,
  },
  avatar: {
    margin: 0,
    padding: 0,
    width: 32,
    height: 32
  },
});

class CleanairAppBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleProfileMenuItem = this.handleProfileMenuItem.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
  }

  handleProfileMenuOpen = (event) => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget
    });
  }

  handleMenuClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null
    });
  }

  handleProfileMenuItem = route => event => {
    this.handleMenuClose();
    // this.props.history.push(path);
    this.props.onProfileMenu(route);
  };

  handleSignOut = () => {
    this.handleMenuClose();
    this.props.onSignOut();
  }

  handleChangeTheme = () => {
    const theme =
      this.props.theme_mode === THEME_MODE_LIGHT
        ? THEME_MODE_DARK
        : THEME_MODE_LIGHT;
    this.props.selectThemeMode(theme);
    localStorage.setItem('themeMode', theme);
    this.handleMenuClose();
  };


  render() {
    const {
      classes,
      theme_mode,
      authUser,
      tutorial,
      onNavBack,
      onHelp,
      onComments
    } = this.props;
    const { 
      anchorEl 
    } = this.state;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <IconButton 
              edge="start" 
              className={classes.navbefore} 
              aria-label="nav before"
              onClick={onNavBack}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <div className={classes.titlebox}>
              {tutorial ? (
                <Typography className={classes.title} variant="h6" noWrap>
                  Tutorial
                </Typography>
              ):(
                <>
                  <img
                    className={classes.image}
                    src={`/static/images/icons/cleanair.png`}
                    alt="Cleanair Map"
                  />
                  <Typography className={classes.title} variant="h6" noWrap>
                    Clean Air Map
                  </Typography>
                </>
              )}
            </div>
            <div className={classes.mainBtnGroup} />
            <IconButton
              className={classes.account}
              aria-label={`central comments`}
              color="inherit"
              onClick={onComments}
            >
              <img 
                className={classes.avatar}
                alt="userimage" 
                src={`/static/images/icons/${theme_mode}/comments_all.png`}
              />
            </IconButton>
            {!tutorial &&
              <IconButton
                className={classes.account}
                aria-label={`play help videos`}
                color="inherit"
                onClick={onHelp}
              >
                <HelpOutlineIcon className={classes.avatar} />
              </IconButton>
            }
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
        </AppBar>

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

CleanairAppBar.propTypes = {
  classes: PropTypes.object,
  onNavBack: PropTypes.func,
  onHelp: PropTypes.func,
  onComments: PropTypes.func,
  onProfileMenu: PropTypes.func,
  onSignOut: PropTypes.func
};

const mapStateToProps = state => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CleanairAppBar));

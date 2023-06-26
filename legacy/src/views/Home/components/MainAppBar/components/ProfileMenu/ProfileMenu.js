import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import {
  MenuList,
  MenuItem,
  Typography,
  Avatar,
  Divider
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import * as ROUTES from "constants/routes";
import { THEME_MODE_DARK } from "constants/types";

const styles = theme => ({
  menu_list: {
    paddingTop: 0,
    paddingBottom: 0
  },
  menu_item: {
    padding: 0,
    marginLeft: 10,
    marginTop: 0,
    minHeight: 24,
    width: 200
  },
  avatar: {
    padding: 0
  },
  name: {
    marginLeft: theme.spacing(2),
    fontSize: "20px !important"
  },
  divider: {
    backgroundColor: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  menu_icon: {
    color: theme.palette.text.primary,
    height: 18,
    width: 18,
    marginRight: theme.spacing(2)
    // margin: "2px 6px 6px 6px"
  }
});

class ProfileMenu extends React.Component {
  render() {
    const {
      classes,
      loggedIn,
      authUser,
      theme_mode,
      onSelected,
      onClosed,
      onSignOut,
      onChangeTheme
    } = this.props;

    let isModerator = false;
    if (loggedIn) {
      const categories2moderate = authUser.categories_moderated.filter(category => category.approved);
      const feeds2moderate = authUser.feeds_moderated.filter(feed => feed.approved);
  
      if (categories2moderate.length > 0 || feeds2moderate.length > 0 ) {
        isModerator = true;
      }
    } 

    return (
      <MenuList className={classes.menu_list}>
        <MenuItem className={classes.menu_item} onClick={onClosed}>
          <span className={classes.avatar}>
            <Avatar
              size="small"
              alt="user image"
              src={authUser.image || "/static/images/avatars/blank_avatar.png"}
            />
          </span>
          <Typography
            component="span"
            className={classes.name}
            color="textPrimary"
            variant="h5"
          >
            {authUser.name}
          </Typography>
        </MenuItem>
        <Divider light={true} className={classes.divider} />
        {loggedIn ? (
          <div>
            <MenuItem
              className={classes.menu_item}
              onClick={onSelected(ROUTES.PROFILE)}
            >
              <span className={classes.menu_icon}>
                <i className="fa fa-user-circle"></i>
              </span>
              Profile
            </MenuItem>
            <MenuItem
              className={classes.menu_item}
              onClick={onSelected(ROUTES.ONBOARDING)}
            >
              <span className={classes.menu_icon}>
                <i className="fa fa-gratipay"></i>
              </span>
              Onboarding
            </MenuItem>
            <MenuItem
              disabled={!isModerator}
              className={classes.menu_item}
              onClick={onSelected(ROUTES.MODERATION)}
            >
              <span className={classes.menu_icon}>
                <i className="fa fa-edit"></i>
              </span>
              Moderation
            </MenuItem>
            <MenuItem
              className={classes.menu_item}
              onClick={onSelected(ROUTES.SAVED)}
            >
              <span className={classes.menu_icon}>
                <i className="fa fa-bookmark"></i>
              </span>
              Saved
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              disabled
              className={classes.menu_item}
            >
              <span className={classes.menu_icon}>
                <i className="fa fa-user-circle"></i>
              </span>
              Profile
            </MenuItem>
            <MenuItem
              disabled
              className={classes.menu_item}
            >
              <span className={classes.menu_icon}>
                <i className="fa fa-gratipay"></i>
              </span>
              Onboarding
            </MenuItem>
            <MenuItem
              disabled
              className={classes.menu_item}
            >
              <span className={classes.menu_icon}>
                <i className="fa fa-edit"></i>
              </span>
              Moderation
            </MenuItem>
            <MenuItem
              disabled
              className={classes.menu_item}
              onClick={onSelected(ROUTES.PROFILE)}
            >
              <span className={classes.menu_icon}>
                <i className="fa fa-bookmark"></i>
              </span>
              Saved
            </MenuItem>
          </div>
        )}
        {/* <MenuItem
          disabled={true}
          className={classes.menu_item}
          onClick={onSelected(ROUTES.PROFILE)}
        >
          <span className={classes.menu_icon}>
            <i className="fa fa-cogs"></i>
          </span>
          Settings
        </MenuItem> */}
        <MenuItem
          className={classes.menu_item}
          onClick={onSelected(ROUTES.ABOUT)}
        >
          <span className={classes.menu_icon}>
            <i className="fa fa-user"></i>
          </span>
          About
        </MenuItem>
        {/* <MenuItem
          disabled={true}
          className={classes.menu_item}
          onClick={onSelected(ROUTES.PROFILE)}
        >
          <span className={classes.menu_icon}>
            <i className="fa fa-gavel"></i>
          </span>
          Legal
        </MenuItem> */}
        <Divider light={true} className={classes.divider} />
        {theme_mode === THEME_MODE_DARK ? (
          <MenuItem
            className={classes.menu_item}
            onClick={onChangeTheme}
          >
            <span className={classes.menu_icon}>
              <Brightness5Icon className={classes.menu_icon} />
            </span>
            Day Mode
          </MenuItem>
        ) : (
          <MenuItem
            className={classes.menu_item}
            onClick={onChangeTheme}
          >
            <span className={classes.menu_icon}>
              <Brightness4Icon className={classes.menu_icon} />
            </span>
            Night Mode
          </MenuItem>
        )}
        <Divider light={true} className={classes.divider} />
        {loggedIn ? (
          <MenuItem className={classes.menu_item} onClick={onSignOut}>
            <span className={classes.menu_icon}>
              <i className="fa fa-sign-out"></i>
            </span>
            Sign Out
          </MenuItem>
        ) : (
          <MenuItem
            className={classes.menu_item}
            onClick={onSelected(ROUTES.SIGN_IN)}
          >
            <span className={classes.menu_icon}>
              <i className="fa fa-sign-in"></i>
            </span>
            Sign In
          </MenuItem>
        )}
      </MenuList>
    );
  }
}

ProfileMenu.propTypes = {
  classes: PropTypes.object,
  onSelected: PropTypes.func,
  onSignOut: PropTypes.func,
  onChangeTheme: PropTypes.func
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
)(withStyles(styles)(ProfileMenu));

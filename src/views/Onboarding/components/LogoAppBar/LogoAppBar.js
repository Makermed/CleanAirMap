import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Avatar, Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    position: "fixed",
    width: theme.breakpoints.values.lg,
    maxWidth: "100%",
    height: "56px",
    zIndex: 1100,
  },
  appbar: {
    position: "absolute",
    // borderBottom: `2px solid ${theme.palette.text.secondary}`
  },
  avatar: {
    margin: 0,
    width: 32,
    height: 32
  },
  logo_text: {
    marginLeft: theme.spacing(0.5),
    marginTop: 2,
    height: 28,
    width: "auto"
  },
  spacer: {
    flexGrow: 1,
    marginLeft: theme.spacing(1)
  },
});

class LogoAppBar extends React.Component {
  render() {
    const {
      classes,
      theme_mode,
      onSkip
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Avatar
              alt={"Raven"}
              src={`/static/images/logo/${theme_mode}/logo.png`}
              className={classes.avatar}
            />
            <img
              alt={"Raven"}
              src={`/static/images/logo/${theme_mode}/logo_text.png`}
              className={classes.logo_text}
            />
            <div className={classes.spacer}></div>
            <Button color="inherit" onClick={onSkip}>
              SKIP
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

LogoAppBar.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  onSkip: PropTypes.func
};

export default withStyles(styles)(LogoAppBar);

import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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
  title: {
    flexGrow: 1,
    position: 'relative',
    marginTop: 0
  },
  navbefore: {
    color: theme.palette.text.primary,
  },
  toolbox: {
    display: 'flex'
  },
  applybtn: {
    padding: 0,
  },
  applybtn_disabled: {
    padding: 0,
    opacity: 0.38,
  },
  applyimg: {
    width: 32,
    height: 32,
  },
});

class ApplyAppBar extends React.Component {
  render() {
    const {
      classes,
      title,
      apply_enabled,
      onNavBack,
      onApply
    } = this.props;

    const applybtn_class = apply_enabled ? classes.applybtn : classes.applybtn_disabled;

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
            <Typography className={classes.title} variant="h6" noWrap>
              {title}
            </Typography>
            <IconButton
              className={applybtn_class}
              onClick={apply_enabled ? onApply : null}
            >
              <img
                className={classes.applyimg}
                alt="approve"
                src="/static/images/approve.png"
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ApplyAppBar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  apply_enabled: PropTypes.bool,
  onNavBack: PropTypes.func,
  onApply: PropTypes.func
};

export default withStyles(styles)(ApplyAppBar);

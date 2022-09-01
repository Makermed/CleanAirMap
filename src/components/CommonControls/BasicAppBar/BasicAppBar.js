import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { MAX_WINDOW_WIDTH } from 'constants/types';

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
    marginTop: 0,
    fontSize: 18,
    fontWeight: 500,
  },
  navbefore: {
    color: theme.palette.text.primary,
  },
  toolbox: {
    display: 'flex'
  },
});

class BasicAppBar extends React.Component {
  render() {
    const {
      classes,
      width,
      title,
      action,
      onNavBack,
      onAction,
    } = this.props;

    return (
      <div className={classes.root} style={{width: width === undefined ? MAX_WINDOW_WIDTH : width}}>
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
            {action !== undefined && (
              <Button color="inherit" style={{fontSize: '18px', textTransform: 'none'}} onClick={onAction}>
                {action}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

BasicAppBar.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number,
  title: PropTypes.string,
  action: PropTypes.string,
  onNavBack: PropTypes.func,
  onAction: PropTypes.func
};

export default withStyles(styles)(BasicAppBar);

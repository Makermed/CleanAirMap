import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { MIN_CARD_WIDTH, MAX_CARD_WIDTH, MAX_WINDOW_WIDTH } from 'constants/types';

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    // textAlign: "center",
    margin: "0 auto",
    backgroundColor: theme.palette.background.default,
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "auto"
  }
});

class SplashScreen extends React.Component {
  render() {
    const { classes, theme_mode } = this.props;

    const width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    const winWidth = width > MAX_WINDOW_WIDTH ? MAX_WINDOW_WIDTH : width;
    let imageWidth = width - 32;
    if (width < MIN_CARD_WIDTH) {
      imageWidth = MIN_CARD_WIDTH - 32;
    } else if (width > MAX_CARD_WIDTH) {
      imageWidth = MAX_CARD_WIDTH - 32;
    }

    let splash_image = `/static/images/splash/${theme_mode}/splash.png`;

    return (
      <div className={classes.root} style={{width: winWidth}}>
        <img alt="splash" src={splash_image} className={classes.image} style={{width: imageWidth}}/>
      </div>
    );
  }
}

SplashScreen.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string
};

export default withStyles(styles)(SplashScreen);

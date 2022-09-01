import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { THEME_MODE_DARK } from "constants/types";

const styles = (theme) => ({
  root: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
  },
  container: {
    padding: theme.spacing(1),
    width: 170,
    height: 100,
  },
  recommended: {
    position: "absolute",
    top: -theme.spacing(1),
    left: theme.spacing(2),
    padding: 2,
    backgroundColor: '#000000',
  },
  recommendtxt: {
    fontSize: "12px",
    fontFamily: "Roboto",
    fontWeight: 500,
    lineHeight: "20px",
    color: '#FFFFFF',
  },
  content: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  price: {
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 500,
    lineHeight: "26px",
    color: theme.palette.text.primary,
  },
  price_desc: {
    fontSize: "12px",
    fontFamily: "Roboto",
    fontWeight: 500,
    lineHeight: "16px",
    color: theme.palette.text.primary,
  },
});

class PriceCard extends React.Component {
  render() {
    const {
      classes,
      theme_mode,
      recommended,
      selected,
      duration,
      price,
      description,
    } = this.props;

    let container_border = "";
    let recommend_border = "";
    if (selected) {
      container_border =
        theme_mode === THEME_MODE_DARK ? `2px solid white` : `2px solid black`;
      recommend_border =
        theme_mode === THEME_MODE_DARK ? `1px solid white` : `1px solid black`;
    } else {
      container_border =
        theme_mode === THEME_MODE_DARK
          ? "1px solid rgba(255, 255, 255, 0.25)"
          : "1px solid rgba(0, 0, 0, 0.25)";
    }

    return (
      <div className={classes.root}>
        <div className={classes.container} style={{ border: container_border }}>
          {recommended &&
            <div
              className={classes.recommended}
              style={{ border: recommend_border }}
            >
              <Typography className={classes.recommendtxt}>
                {"Recommended"}
              </Typography>
            </div>
          }
          <div className={classes.content}>
            <Typography className={classes.price_desc}>{duration}</Typography>
            <Typography className={classes.price}>{price}</Typography>
            {description !== "" && (
              <Typography className={classes.price_desc}>{duration}</Typography>
            )}
          </div>
        </div>
      </div>
    );
  }
}

PriceCard.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  recommended: PropTypes.bool,
  selected: PropTypes.bool,
  duration: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
};

export default withStyles(styles)(PriceCard);

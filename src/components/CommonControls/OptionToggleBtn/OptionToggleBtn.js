import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    position: "relative",
    width: 32,
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    textAlign: "center",
  },
  image: {
    height: 24,
    width: 24,
    backgroundColor: theme.palette.background.default,
  },
  title: {
    textTransform: "none",
    fontSize: "10px",
    lineHeight: "14px",
    color: theme.palette.text.primary,
  },
});

class OptionToggleBtn extends React.Component {
  render() {
    const { classes, theme, buttontype, mode, onToggle } = this.props;

    return (
      <div className={classes.root}>
        {buttontype === "pubpriv" && mode && (
          <div className={classes.container} onClick={onToggle}>
            <img
              className={classes.image}
              src={`/static/images/icons/${theme}/public.png`}
              alt={"public"}
            />
            <Typography className={classes.title}>{"Public"}</Typography>
          </div>
        )}
        {buttontype === "pubpriv" && !mode && (
          <div className={classes.container} onClick={onToggle}>
            <img
              className={classes.image}
              src={`/static/images/icons/${theme}/private.png`}
              alt={"private"}
            />
            <Typography className={classes.title}>{"Private"}</Typography>
          </div>
        )}

        {buttontype === "openpriv" && mode && (
          <div className={classes.container} onClick={onToggle}>
            <img
              className={classes.image}
              src={`/static/images/icons/${theme}/members.png`}
              alt={"open"}
            />
            <Typography className={classes.title}>{"Open"}</Typography>
          </div>
        )}
        {buttontype === "openpriv" && !mode && (
          <div className={classes.container} onClick={onToggle}>
            <img
              className={classes.image}
              src={`/static/images/icons/${theme}/private.png`}
              alt={"private"}
            />
            <Typography className={classes.title}>{"Private"}</Typography>
          </div>
        )}

        {buttontype === "openclose" && mode && (
          <div className={classes.container} onClick={onToggle}>
            <img
              className={classes.image}
              src={`/static/images/icons/${theme}/members.png`}
              alt={"open"}
            />
            <Typography className={classes.title}>{"Open"}</Typography>
          </div>
        )}
        {buttontype === "openclose" && !mode && (
          <div className={classes.container} onClick={onToggle}>
            <img
              className={classes.image}
              src={`/static/images/icons/${theme}/banned-sign.png`}
              alt={"closed"}
            />
            <Typography className={classes.title}>{"Closed"}</Typography>
          </div>
        )}
      </div>
    );
  }
}

OptionToggleBtn.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  buttontype: PropTypes.string,
  mode: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default withStyles(styles)(OptionToggleBtn);

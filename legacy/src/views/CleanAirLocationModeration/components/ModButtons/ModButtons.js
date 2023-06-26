import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Badge } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    padding: 4,
    width: 24,
    height: 24,
    color: theme.palette.primary.contrastText,
  },
  startIcon: {
    margin: 0,
    marginLeft: -4,
  },
  actionbtn: {
    backgroundColor: theme.palette.background.light,
    borderRadius: "20px",
    padding: "4px 10px",
    marginBottom: theme.spacing(1),
    textTransform: "initial",
    "&:hover": {
      backgroundColor: theme.palette.background.light,
    },
  },
  badge_div: {
    display: "inline",
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1.5),
  },
  badge: {
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
    backgroundColor: "red",
    color: "white",
  },
});

class ModButtons extends React.Component {
  render() {
    const { classes, theme, flagged, newlogs, logs, onFlagged, onViewLog, onSettings } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.badge_div}>
          <Badge 
            classes={{ badge: classes.badge }} 
            badgeContent={flagged}
            overlap="rectangular"
          >
            <Button
              className={classes.actionbtn}
              classes={{startIcon: classes.startIcon}}
              startIcon={
                <img
                  className={classes.icon}
                  alt="flagged"
                  src={`/static/images/icons/${theme}/copy.png`}
                />
              }
              onClick={flagged > 0 ? onFlagged : null}
            >
              Flagged Moderators
            </Button>
          </Badge>
        </div>
        <div className={classes.badge_div}>
          <Badge 
            classes={{ badge: classes.badge }} 
            badgeContent={newlogs}
            overlap="rectangular"
          >
            <Button
              className={classes.actionbtn}
              classes={{startIcon: classes.startIcon}}
              startIcon={
                <img
                  className={classes.icon}
                  alt="viewlog"
                  src={`/static/images/edit.png`}
                />
              }
              onClick={logs > 0 ? onViewLog : null}
            >
              View Log
            </Button>
          </Badge>
        </div>
        <Button
          className={classes.actionbtn}
          classes={{startIcon: classes.startIcon}}
          startIcon={
            <img
              className={classes.icon}
              alt="settings"
              src={`/static/images/icons/${theme}/settings.png`}
            />
          }
          onClick={onSettings}
        >
          Settings
        </Button>
      </div>
    );
  }
}

ModButtons.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  flagged: PropTypes.number,
  newlogs: PropTypes.number,
  logs: PropTypes.number,
  onFlagged: PropTypes.func,
  onViewLog: PropTypes.func,
  onSettings: PropTypes.func
};

export default withStyles(styles)(ModButtons);

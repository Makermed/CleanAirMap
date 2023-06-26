import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    justifyContent: "left",
  },
  button: {
    width: "100%",
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.card,
    borderRadius: 32,
    textTransform: "inherit",
    textAlign: "left",
    "&:hover": {
      backgroundColor: theme.palette.background.card,
      color: theme.palette.secondary.main,
    }
  },
  icon: {
    width: 48,
    height: 48,
  },
  startIcon: {
    marginLeft: -theme.spacing(1),
    marginRight: 0,
  },
  text: {
    marginLeft: theme.spacing(2),
  },
  title: {
    display: "block",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "20px",
    letterSpacing: "0.66px",
  },
  description: {
    display: "block",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0.66px",
  },
});

class DiscussionButton extends React.Component {
  render() {
    const { classes, disabled, type, title, description, image, onClick } = this.props;

    return (
      <div>
        {disabled === undefined &&
          <Button
            variant="contained"
            className={classes.button}
            classes={{root: classes.root, startIcon: classes.startIcon}}
            startIcon={
              <img className={classes.icon} alt={title} src={image} />
            }
            onClick={(e) => onClick !== undefined ? onClick(type) : null}
          >
            <div className={classes.text}>
              <Typography className={classes.title}>{title}</Typography>
              <Typography className={classes.description}>{description}</Typography>
            </div>
          </Button>
        }
        {disabled !== undefined &&
          <Button
            disabled
            variant="contained"
            className={classes.button}
            classes={{root: classes.root, startIcon: classes.startIcon}}
            startIcon={
              <img className={classes.icon} alt={title} src={image} />
            }
          >
            <div className={classes.text}>
              <Typography className={classes.title}>{title}</Typography>
              <Typography className={classes.description}>{description}</Typography>
            </div>
          </Button>
        }
      </div>
    );
  }
}

DiscussionButton.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func,
};

export default withStyles(styles)(DiscussionButton);

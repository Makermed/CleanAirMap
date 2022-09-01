import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    // height: '100%',
    position: "relative",
    width: 80
  },
  nonselected: {
    opacity: 0.3
  },
  grid: {
    justifyContent: "left",
    flexWrap: "inherit",
    marginRight: 4
  },
  image: {
    objectFit: "cover",
    height: 80,
    width: 80,
    borderRadius: 10,
    backgroundColor: theme.palette.background.main
  },
  logo: {
    height: 20,
    width: 20,
    position: "absolute",
    left: 0,
    top: 0
  },
  title: {
    position: "relative",
    textAlign: "left",
    textTransform: "none",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
});

class IconItem extends React.Component {
  render() {
    const { classes, title, image, logo, selected } = this.props;

    let refined_title = "";
    let title_words = [];
    if (title) {
      refined_title = title;
      title_words = title.split(" ");
      if (title_words.length > 3) {
        title_words = title_words.slice(0, 3);
        refined_title = title_words.join(" ") + "...";
      }
    }
    
    return (
      <div className={classes.root}>
        {selected ? (
          <div>
            <Grid container className={classes.grid}>
              <img className={classes.image} src={image} alt={refined_title} />
              {logo !== null && (
                <Avatar alt={"Logo"} src={logo} className={classes.logo} />
              )}
            </Grid>
            <Typography className={classes.title}>{refined_title}</Typography>
          </div>
        ) : (
          <div className={classes.nonselected}>
            <Grid container className={classes.grid}>
              <img className={classes.image} src={image} alt={refined_title} />
              {logo !== null && (
                <Avatar alt={"Logo"} src={logo} className={classes.logo} />
              )}
            </Grid>
            <Typography className={classes.title}>{refined_title}</Typography>
          </div>
        )}
      </div>
    );
  }
}

IconItem.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  image: PropTypes.string,
  logo: PropTypes.string,
  selected: PropTypes.bool
};

export default withStyles(styles)(IconItem);

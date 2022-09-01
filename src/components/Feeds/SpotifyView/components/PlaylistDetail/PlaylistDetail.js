import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { MIN_CARD_WIDTH, MAX_ARTICLE_WIDTH } from "constants/types";

const styles = theme => ({
  root: {
    // height: "100%",
    position: "relative",
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    background: theme.palette.background.default
  },
  grid: {
    justifyContent: "left",
    flexWrap: "inherit"
  },
  image: {
    objectFit: "cover",
    height: 100,
    width: 100,
    borderRadius: 10
  },
  gridtitle: {
    width: 260
  },
  title: {
    position: "relative",
    textAlign: "left",
    textTransform: "none",
    marginLeft: theme.spacing(2)
  },
  description: {
    position: "relative",
    textAlign: "left",
    textTransform: "none",
    marginLeft: theme.spacing(2)
  }
});

class PlaylistDetail extends React.Component {
  render() {
    const { classes, title, description, image } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.grid}>
          <Grid item>
            <img className={classes.image} src={image} alt={title} />
          </Grid>
          <Grid item className={classes.gridtitle}>
            <Typography className={classes.title} variant="subtitle1">{title}</Typography>
            <div style={{fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "18px", marginLeft: 16}}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {/* <Typography className={classes.description}>
              {description}
            </Typography> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

PlaylistDetail.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

export default withStyles(styles)(PlaylistDetail);

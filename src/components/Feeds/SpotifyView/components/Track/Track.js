import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { get_timestring, decodeHTMLEntities } from "utility/utils";
import { MIN_CARD_WIDTH, MAX_ARTICLE_WIDTH } from "constants/types";

const styles = theme => ({
  root: {
    flexGrow: 1,
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    padding: theme.spacing(1),
    paddingBottom: 0,
    background: theme.palette.background.card,
    borderRadius: 5,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`
  },
  grid: {
    justifyContent: "left",
    flexWrap: "inherit"
  },
  name: {
    // position: "relative",
    textAlign: "left",
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "22px",
    textTransform: "none",
    color: theme.palette.text.primary
  },
  author: {
    // position: "relative",
    textAlign: "left",
    textTransform: "none",
  },
  description: {
    position: "relative",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: 200,
    lineHeight: "20px",
    textTransform: "none",
    color: theme.palette.text.secondary
  },
  media: {
    display: "block",
    width: "60%",
    height: 32,
    marginLeft: "auto",
    marginRight: "auto",
    margin: theme.spacing(1)
  },
  actionimg: {
    float: "left",
    width: 16,
    height: 16
  },
  actionvalue: {
    float: "left",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.text.secondary
  },
  actionbtn: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: 12,
    marginRight: 5,
    textTransform: "inherit",
    color: theme.palette.text.secondary
  }
});

function get_duration_string(duration) {
  let duration_string = "";
  if (duration < 60) {
    duration_string = `0:${duration}`;
  } else {
    let mins = duration / 60;
    mins = Math.floor(mins);
    let secs = duration - mins * 60;
    if (secs < 10) {
      duration_string = `${mins}:0${secs}`;
    } else {
      duration_string = `${mins}:${secs}`;
    }
  }
  return duration_string;
}

class Track extends React.Component {
  render() {
    const { classes, track, theme_mode } = this.props;

    let duration = get_duration_string(track.duration);
    let published = get_timestring(track.published);

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-end"
        >
          <Grid item>
            <Typography className={classes.name}>{decodeHTMLEntities(track.name)}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.description}>{duration}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-end"
        >
          <Grid item>
            <Typography className={classes.author} variant="body2">{decodeHTMLEntities(track.author)}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.description}>{published}</Typography>
          </Grid>
        </Grid>
        <div>
          <audio
            className={classes.media}
            name={"media"}
            controls={true}
            controlsList={"nofullscreen nodownload"}
          >
            <source src={track.preview_url} type={"audio/mpeg"} />
          </audio>
        </div>
        <Grid
          container
          alignItems="flex-start"
          justify="space-between"
          direction="row"
        >
          <Grid item>
            <div>
              <img
                alt={"popularity"}
                src={`/static/images/icons/${theme_mode}/favorite.png`}
                className={classes.actionimg}
              />
              <Typography className={classes.actionvalue}>
                {track.popularity}
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <Button
              className={classes.actionbtn}
              size="small"
              color="primary"
              target="_blank"
              href={track.url}
            >
              Listen full track on Spotify
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Track.propTypes = {
  classes: PropTypes.object,
  track: PropTypes.object
};

const mapStateToProps = state => ({
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Track));

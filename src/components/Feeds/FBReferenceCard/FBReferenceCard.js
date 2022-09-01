import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import ReactPlayer from "react-player";
import { render_text } from "utility/utils";
import { THEME_MODE_DARK } from "constants/types";

const styles = (theme) => ({
  card: {
    flexGrow: 1,
    position: "relative",
  },
  header: {
    padding: 0,
  },
  titleline: {
    position: "relative",
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  content: {
    paddingTop: 4,
    paddingBottom: 4,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  detail_txt: {
    display: "inline",
    overflowWrap: "break-word",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    lineHeight: "16px",
    color: theme.palette.text.primary,
  },
  playerwrapper: {
    position: "relative",
    paddingTop: 0,
    paddingBottom: 12,
  },
  reactplayer: {
    top: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  media: {
    display: "block",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
  },
});

class FBReferenceCard extends React.Component {
  render() {
    const { 
      classes, 
      theme_mode,
      reference 
    } = this.props;

    let isVideo = reference.video.length > 0 ? true : false;
    const width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    let videoWidth = width * 0.94;
    if (videoWidth > 640) {
      videoWidth = 640;
    }
    let videoHeight = (videoWidth * 9) / 16;

    return (
      <Card className={classes.card}>
        {isVideo && (
          <div className={classes.playerwrapper}>
            <ReactPlayer
              className={classes.reactplayer}
              // controls={true}
              // light={article.image}
              width={videoWidth}
              height={videoHeight}
              url={reference.video}
            />
          </div>
        )}
        {!isVideo && reference.image.length > 0 && (
          <img alt={""} src={reference.image} className={classes.media} />
        )}
        <CardHeader
          className={classes.header}
          title={
            <div className={classes.titleline}>
              <Typography className={classes.title}>
                {render_text(reference.title, theme_mode === THEME_MODE_DARK)}
              </Typography>
            </div>
          }
        />
        <CardContent className={classes.content}>
          <div style={{ width: window.innerWidth - 66 }}>
            <Typography className={classes.detail_txt}>
              {render_text(reference.description, theme_mode === THEME_MODE_DARK)}
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}

FBReferenceCard.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  reference: PropTypes.object
};

export default withStyles(styles)(FBReferenceCard);

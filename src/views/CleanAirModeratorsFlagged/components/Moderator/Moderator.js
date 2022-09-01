import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
  },
  grid: {
    flexWrap: "inherit",
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.background.card,
    borderRadius: 5,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  image: {
    objectFit: "cover",
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  username: {
    position: "relative",
    width: "100% - 150px",
    textAlign: "left",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "18px",
    textTransform: "none",
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  biography: {
    position: "relative",
    width: "100% - 170px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: 100,
    lineHeight: "14px",
    textTransform: "none",
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2) + 24,
  },
  modimage: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    width: 16,
    height: 16,
  },
});


class Moderator extends React.Component {
  makeSummary(text) {
    let words = text.split(" ");
    let characters = 0;
    let word_count = 0;
    let new_words = [];
    while (characters < 50 && word_count < words.length) {
      new_words.push(words[word_count]);
      characters += words[word_count].length;
      word_count++;
    }

    let summary = new_words.join(" ");
    if (word_count < words.length) {
      summary += "...";
    }
    return summary;
  }

  render() {
    const { classes, moderator, theme } = this.props;
    const biography = this.makeSummary(moderator.user.biography);

    return (
      <div className={classes.root}>
        <img
          className={classes.modimage}
          src={`/static/images/icons/${theme}/moderator.png`}
          alt={"mod"}
        />
        <Grid container className={classes.grid}>
          <Grid item>
            <img
              className={classes.image}
              src={moderator.user.image}
              alt={moderator.user.username}
            />
          </Grid>
          <Grid item>
            <Typography className={classes.username}>{moderator.user.username}</Typography>
            <Typography className={classes.biography}>
              {biography}
            </Typography>
            <div style={{ width: window.innerWidth - 104 }}></div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Moderator.propTypes = {
  classes: PropTypes.object,
  moderator: PropTypes.object,
  theme: PropTypes.string,
};

export default withStyles(styles)(Moderator);

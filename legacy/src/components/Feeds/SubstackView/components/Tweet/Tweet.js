import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Grid
} from "@material-ui/core";
import { int2kstring } from "utility/utils";

const styles = theme => ({
  root: {
    flexGrow: 1,
    border: `1px solid ${theme.palette.text.secondary}`
  },
  card: {
    position: "relative"
  },
  carddiv: {},
  header: {
    padding: 0
  },
  title: {
    position: "relative",
    margin: 10,
    marginBottom: 0, 
  },
  name: {
    float: "left",
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: 600,
    color: theme.palette.text.primary
  },
  screenname: {
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "20px",
    marginLeft: 16,
    color: theme.palette.text.primary
  },
  subtitle: {
    // position: "relative",
    display: "block",
    marginLeft: 10,
    marginRight: 10
  },
  date: {
    float: "right",
    fontSize: "12px",
    lineHeight: "14px",
    color: theme.palette.text.secondary,
    marginTop: 4,
    marginBottom: 10
  },
  content: {
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 16,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  detail_txt: {
    float: "left",
    overflowWrap: "break-word",
    marginBottom: theme.spacing(1),
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    lineHeight: "16px",
    color: theme.palette.text.primary
  },
  media: {
    display: "block",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1)
  },
  reaction: {
    marginLeft: theme.spacing(2),
    fontSize: 12,
    color: theme.palette.text.primary
  },
  reactiondiv: {
    marginLeft: 16
  },
  reactionimg: {
    float: "left",
    width: 12,
    height: 12
  },
  reactionvalue: {
    float: "left",
    marginLeft: 5,
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "14px",
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

class Tweet extends React.Component {
  render() {
    const { classes, tweet, theme_mode } = this.props;

    const retweet = int2kstring(tweet.retweet_count);
    const favorite = int2kstring(tweet.like_count);

    let published = "";
    const date_words = tweet.date.split(" ");
    if (date_words.length === 6) {
      published = `${date_words[1]} ${date_words[2]}, ${date_words[5]}`;
    }

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.carddiv}>
            <CardHeader
              className={classes.header}
              title={
                <div className={classes.title}>
                  <Typography className={classes.name}>{tweet.name}</Typography>
                  <Typography className={classes.screenname}>
                    &nbsp;@{tweet.username}
                  </Typography>
                </div>
              }
            />
            <CardContent className={classes.content}>
              <Typography className={classes.date}>{published}</Typography>
            </CardContent>
            <CardContent className={classes.content}>
              <div
                style={{fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "18px"}}
                dangerouslySetInnerHTML={{ __html: tweet.full_text }}
              />
            </CardContent>
            {tweet.photos.length > 0 &&
              tweet.photos.map(photo => (
                <img alt={""} src={photo.img_url} className={classes.media} />
              ))}
            <Button
              className={classes.reaction}
              size="small"
              color="primary"
              target="_blank"
            >
              <div>
                <img
                  alt={"retweet"}
                  src={`/static/images/icons/${theme_mode}/retweet.png`}
                  className={classes.reactionimg}
                />
                <Typography className={classes.reactionvalue}>
                  {retweet}
                </Typography>
              </div>
              <div className={classes.reactiondiv}>
                <img
                  alt={"favorite"}
                  src={`/static/images/icons/${theme_mode}/favorite.png`}
                  className={classes.reactionimg}
                />
                <Typography className={classes.reactionvalue}>
                  {favorite}
                </Typography>
              </div>
            </Button>
          </div>
        </Card>
        <Grid
          container
          alignItems="flex-start"
          justifyContent="flex-end"
          direction="row"
        >
          <Button
            className={classes.actionbtn}
            size="small"
            color="primary"
            target="_blank"
            href={tweet.url}
          >
            Read original tweet on Twitter
          </Button>
        </Grid>
      </div>
    );
  }
}

Tweet.propTypes = {
  classes: PropTypes.object,
  tweet: PropTypes.object
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
)(withStyles(styles)(Tweet));

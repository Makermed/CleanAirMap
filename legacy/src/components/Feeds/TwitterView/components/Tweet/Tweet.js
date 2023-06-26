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
  CardActions,
  Avatar,
  Typography,
  Button
} from "@material-ui/core";
import { get_timestring, int2kstring, decodeHTMLEntities } from "utility/utils";
import { MIN_CARD_WIDTH, MAX_ARTICLE_WIDTH } from "constants/types";

const styles = theme => ({
  card: {
    position: "relative",
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    backgroundColor: theme.palette.background.default
  },
  cardframe: {
    marginLeft: 16,
    margin: 0,
    borderLeftStyle: "solid",
    borderLeftColor: `${theme.palette.text.secondary}`
    // borderLeftWidth: 0,
  },
  carddiv: {
    marginLeft: 24,
    marginRight: 3,
    marginBottom: theme.spacing(1),
    borderRadius: 10,
    backgroundColor: theme.palette.background.article,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`
  },
  header: {
    padding: 0
  },
  avatar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 32,
    height: 32
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  name: {
    display: "inline",
    marginRight: 4,
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 600,
    color: theme.palette.text.primary
  },
  screenname: {
    display: "inline",
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "24px",
    color: theme.palette.text.primary
  },
  subtitle: {
    marginRight: 20
  },
  replydecl: {
    fontFamily: "Arial",
    fontSize: "14px",
    lineHeight: "18px",
    color: theme.palette.text.secondary
  },
  content: {
    paddingTop: 4,
    paddingBottom: 0,
    // marginLeft: 40,
    // marginRight: 10,
    marginBottom: 8,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  date: {
    fontSize: "12px",
    lineHeight: "14px",
    color: theme.palette.text.secondary
  },
  detail_txt: {
    fontFamily: "Merriweather, serif",
    fontSize: "18px",
    lineHeight: "20px",
    color: theme.palette.text.primary
  },
  media: {
    display: "block",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    // marginBottom: theme.spacing(1),
    borderRadius: 10
  },
  reaction: {
    left: "50%",
    transform: "translate(-50%)",
    fontSize: 12,
    marginBottom: 4,
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
  }
});

class Tweet extends React.Component {
  render() {
    const { classes, tweet, theme_mode } = this.props;

    const old_version = tweet.published !== undefined;

    // user image
    let user_image = tweet.user_image;
    if (!user_image) {
      user_image = "/static/images/avatars/blank_avatar.png";
    }

    // username, screenname
    let user_name = tweet.user_name;
    let screen_name = tweet.user_scname;
  
    let image = "";
    let replies = 0;
    let retweet = 0;
    let favorite = 0;
    let published = 0;
    let reply_to = "";

    if (old_version) {
      replies = int2kstring(tweet.replyCount);
      retweet = int2kstring(tweet.retweetCount);
      favorite = int2kstring(tweet.favoriteCount);
      published = get_timestring(tweet.published);
      if (tweet.reply_decl !== null && tweet.reply_decl.length > 0) {
        reply_to = tweet.reply_decl;
      }
      if (tweet.image !== null && tweet.image.length > 0) {
        image = tweet.image;
      }
    } else {
      replies = int2kstring(tweet.reply_count);
      retweet = int2kstring(tweet.retweet_count);
      favorite = int2kstring(tweet.favorite_count);
      published = get_timestring(tweet.created_at);
      if (tweet.reply_to.length > 0)
        reply_to = `Replying to ${tweet.reply_to}`;
    }

    let frameborder = 0;
    if (tweet.link_next) {
      frameborder = 2;
    }

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;
    width = width - 16;

    return (
      <Card className={classes.card} style={{ width: width }}>
        <div
          className={classes.cardframe}
          style={{ borderLeftWidth: frameborder }}
        >
          <div className={classes.carddiv}>
            <CardHeader
              className={classes.header}
              avatar={
                <Avatar
                  alt={tweet.user_name}
                  src={user_image}
                  className={classes.avatar}
                  classes={{ img: classes.avatar_img }}
                />
              }
              title={
                <div className={classes.title}>
                  <Typography className={classes.name}>{decodeHTMLEntities(user_name)}</Typography>
                  <Typography className={classes.screenname}>
                    @{screen_name}
                  </Typography>
                </div>
              }
              subheader={
                <div className={classes.subtitle}>
                  {reply_to !== "" && (
                    <Typography className={classes.replydecl}>
                      {decodeHTMLEntities(reply_to)}
                    </Typography>
                  )}
                </div>
              }
            />
            <CardContent className={classes.content}>
              <Typography className={classes.date}>{published}</Typography>
            </CardContent>
            <CardContent className={classes.content}>
              <div
                className={classes.detail_txt}
                dangerouslySetInnerHTML={{ __html: tweet.text }}
              />
            </CardContent>
            {image !== "" && (
              <img alt={""} src={image} className={classes.media} />
            )}
            <CardActions>
              <Button
                className={classes.reaction}
                size="small"
                color="primary"
                target="_blank"
              >
                <div>
                  <img
                    alt={"reply"}
                    src={`/static/images/icons/${theme_mode}/reply.png`}
                    className={classes.reactionimg}
                  />
                  <Typography className={classes.reactionvalue}>
                    {replies}
                  </Typography>
                </div>
                <div className={classes.reactiondiv}>
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
            </CardActions>
          </div>
        </div>
      </Card>
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

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { get_timestring, int2kstring, summarize_text } from "utility/utils";
import { MAX_ARTICLE_WIDTH, MIN_CARD_WIDTH } from "constants/types";

const styles = theme => ({
  card: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
    minWidth: MIN_CARD_WIDTH - 32,
    maxWidth: MAX_ARTICLE_WIDTH - 32,
  },
  carddiv: {
    margin: 3,
    marginBottom: theme.spacing(1),
    borderRadius: 10,
    borderTopLeftRadius: 30,
    backgroundColor: theme.palette.background.article,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`
  },
  header: {
    padding: 0
  },
  share: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    color: theme.palette.info.contrastText,
    backgroundColor: "#7289DA",
    zIndex: 100,
  },
  shareicon: {
    width: 16,
    height: 16,
  },
  avatar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 48,
    height: 48
  },
  avatar_img: {
    backgroundColor: "transparent"
  },
  socialimg: {
    position: "absolute",
    top: 52,
    left: 14,
    width: 20,
    height: 20
  },
  title: {
    position: "relative",
    marginLeft: 40,
    marginRight: 40,
    margin: 10
  },
  name: {
    display: "inline",
    marginRight: theme.spacing(1),
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    color: theme.palette.text.primary
  },
  screenname_inline: {
    display: "inline",
  },
  screenname: {
  },
  subtitle: {
    marginLeft: 40,
    marginRight: 20
  },
  feed: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontStyle: "Italic",
    lineHeight: "18px",
    marginTop: 4,
    marginBottom: 4,
    color: theme.palette.text.secondary,
  },
  date: {
    float: "right",
    fontSize: "12px",
    color: theme.palette.text.secondary
  },
  content: {
    paddingTop: 4,
    paddingBottom: 0,
    marginLeft: 30,
    marginRight: 10,
    marginBottom: 8,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  detail_txt: {
    display: "inline",
    overflowWrap: "break-word",
  },
  media: {
    display: "block",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
    borderRadius: 10
  },
  cardactions: {
    padding: 0,
    margin: 0,
  },
  reaction: {
    left: "50%",
    transform: "translate(-50%)",
    fontSize: 12,
    marginBottom: theme.spacing(1),
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
});

class DiscussTwitterCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleClickShare = this.handleClickShare.bind(this);
  }

  handleClick = () => {
    const { tweet } = this.props;
    // tweet url
    const url = `https://twitter.com/${tweet.user_scname}/status/${tweet.id}`;
    window.open(url, "_blank");
  }

  handleClickShare = () => {
    const { tweet } = this.props;
    this.props.onShare(tweet);
  }

  render() {
    const { classes, tweet, theme_mode } = this.props;

    const retweet   = int2kstring(tweet.retweet_count);
    const favorite  = int2kstring(tweet.favorite_count);
    const replies   = int2kstring(tweet.reply_count);
    const published = get_timestring(tweet.created_at);
    // const reply_decl  = tweet.reply_to;

    // article author
    const headline = `${tweet.user_name} @${tweet.user_scname}`;
    const needNewline = headline.length >= 25;
    let author = needNewline ? summarize_text(tweet.user_name, 24) : tweet.user_name;
    if (author.length < tweet.user_name.length) {
      author += '...';
    }
    
    // author image
    const author_image = tweet.user_image;
    const hasAuthorImage = (author_image !== "") && (author_image !== null);

    let width = window.innerWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;
    width -= 32;

    return (
      <Card className={classes.card} style={{ width: width }}>
        <div className={classes.carddiv}>
          <CardHeader
            className={classes.header}
            onClick={this.handleClick}
            avatar={
              <div>
                {hasAuthorImage && (
                  <Avatar
                    alt={tweet.user_name}
                    src={author_image}
                    className={classes.avatar}
                    classes={{ img: classes.avatar_img }}
                  />
                )}
                <img
                  alt={"twitter"}
                  src={`/static/images/icons/${theme_mode}/twitter.png`}
                  className={classes.socialimg}
                />
              </div>
            }
            title={
              <div className={classes.title}>
                <Typography className={classes.name}>{author}</Typography>
                {needNewline ? (
                  <Typography className={classes.screenname} variant="subtitle2">@{tweet.user_scname}</Typography>
                ):(
                  <Typography className={classes.screenname_inline} variant="subtitle2">@{tweet.user_scname}</Typography>
                )}
                <Typography className={classes.date}>{published}</Typography>
              </div>
            }
            // subheader={
            //   <div className={classes.subtitle}>
            //     {reply_decl !== null && reply_decl.length > 0 && (
            //       <Typography className={classes.replydecl} variant="subtitle2">
            //         {reply_decl}
            //       </Typography>
            //     )}
            //   </div>
            // }
          />
          <div>
            <IconButton className={classes.share} onClick={this.handleClickShare}>
              <ShareIcon className={classes.shareicon} />
            </IconButton>
          </div>
          <CardContent className={classes.content} onClick={this.handleClick}>
            <div
              style={{fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "18px"}}
              dangerouslySetInnerHTML={{ __html: tweet.text }}
            />
          </CardContent>
          <CardActions className={classes.cardactions} onClick={this.handleClick}>
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
      </Card>
    );
  }
}

DiscussTwitterCard.propTypes = {
  classes: PropTypes.object,
  tweet: PropTypes.object,
  theme_mode: PropTypes.string,
  onShare: PropTypes.func
};

export default withStyles(styles)(DiscussTwitterCard);

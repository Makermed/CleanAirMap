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
  Button,
  IconButton
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StarIcon from "@material-ui/icons/Star";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { get_timestring, int2kstring, summarize_text, decodeHTMLEntities } from "utility/utils";
import { LinkPreview } from "components";
import { MAX_CARD_WIDTH, MIN_CARD_WIDTH } from "constants/types";

const styles = theme => ({
  card: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
    minWidth: MIN_CARD_WIDTH - 16,
    maxWidth: MAX_CARD_WIDTH - 16,
  },
  carddiv: {
    margin: 3,
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
  pin: {
    position: "absolute",
    top: 8,
    right: 32,
    padding: 0,
    width: 16,
    height: 16,
    borderRadius: 10,
    color: theme.palette.info.contrastText,
    zIndex: 100,
  },
  expand: {
    position: "absolute",
    top: 20,
    right: 2,
    padding: 4,
    width: 24,
    height: 24,
    zIndex: 100,
    color: theme.palette.text.primary,
  },
  avatar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 48,
    height: 48,
    cursor: "pointer",
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
    margin: 10,
  },
  retweetedby_img: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(1),
    opacity: 0.48,
  },
  retweetedby_author: {
    display: "inline",
    fontSize: "12px",
    lineHeight: "16px",
    verticalAlign: "top",
    color: theme.palette.text.secondary,
  },
  name: {
    display: "inline",
    marginRight: theme.spacing(1),
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    color: theme.palette.text.primary,
    cursor: "pointer",
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
    cursor: "pointer",
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
    width: 16,
    height: 16
  },
  reactionvalue: {
    float: "left",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "14px",
    color: theme.palette.text.secondary
  },
  readmorebtn: {
    position: "absolute",
    right: 4,
    bottom: 8,
    fontFamily: "Arial",
    fontSize: 12,
    textTransform: "inherit",
    float: "right",
    color: theme.palette.text.secondary
  },
  readmore: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    marginRight: 16
  },
  righticon: {
    position: "absolute",
    right: 0,
    bottom: 5
  },
  translated_div: {
    height: 16,
    width: 250,
    marginLeft: 10,
  },
  traslated_icon: {
    float: "left",
    top: 3,
    marginLeft: 5,
    width: 16,
    height: 16,
    color: theme.palette.text.primary
  },
  translated_txt: {
    display: "inline",
    marginLeft: 2,
    fontSize: 12,
    fontStyle: "italic",
    color: theme.palette.text.secondary
  },
});

class TwitterCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickShare = this.handleClickShare.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleClickShare = () => {
    const { article } = this.props;
    this.props.onShare(article.nid);
  }

  handleExpand = (event) => {
    this.props.onAnchorEl(event.currentTarget);
  };

  getFeedofSource = (source_id) => {
    const { loggedIn, followed_feeds, feeds } = this.props;
    let feed = null;
    if (loggedIn) {
      feed = followed_feeds.find(
        (item) =>
          item.feed_sources.find(
            (feed_source) => feed_source.source_id === source_id
          ) !== undefined
      );
      if (feed) {
        return feed;
      }
    }

    feed = feeds.find(
      (item) =>
        item.feed_sources.find(
          (feed_source) => feed_source.source_id === source_id
        ) !== undefined
    );
    return feed;
  }

  render() {
    const { 
      classes, 
      selected_feed, 
      sources, 
      showretweet_sources,
      article, 
      theme_mode, 
      handleClick, 
      onClickSource, 
      onClickFeed 
    } = this.props;

    // console.log("Twitter card :", article);

    // validation check
    let source = sources.find(item => item.id === article.source_id);
    if (!source) {
      console.log("Error, Unknown article source!");
      return <div></div>;
    }

    // find the feed contain this article(source)
    const feed = this.getFeedofSource(article.source_id);
    if (!feed) {
      console.log("Error, can't find the feed!", article);
      return <div></div>;
    }

    // don't show reply tweet(there aren't reply tweets in new crawler)
    if (article.txt_param2) {
      if (!showretweet_sources.find(item => item.source_id === article.source_id)) {
        return <div></div>;
      }      
    }

    const transMark = source.translate ? `Translated from ${source.translateLang} by ${source.translateAPI}` : "";

    var text = "";
    if (article.translated) {
      text = article.tr_text;
    } else {
      text = article.text;
    }

    const retweet   = int2kstring(article.param1);
    const favorite  = int2kstring(article.param2);
    // const replies   = int2kstring(article.param3);
    const published = get_timestring(article.published);
    const screen_name = article.txt_param1;
    const reply_decl  = article.txt_param2;

    // article author
    const headline = `${article.author} @${screen_name}`;
    const needNewline = headline.length >= 25;
    let author = needNewline ? summarize_text(article.author, 24) : article.author;
    if (author.length < article.author.length) {
      author += '...';
    }

    // const media = article.extra_data;

    // author image
    let author_image = article.author_image;
    const author_image_thumb = article.author_image_thumb;
    if (author_image_thumb) {
      if (author_image_thumb['64']) {
        author_image = author_image_thumb['64'];
      } else if (author_image_thumb['128']) {
        author_image = author_image_thumb['128'];
      } else if (author_image_thumb['org']) {
        author_image = author_image_thumb['org'];
      }
    }
    const hasAuthorImage = (author_image !== "") && (author_image !== null);
    
    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    width -= 16;
    if (width > MAX_CARD_WIDTH - 16)
      width = MAX_CARD_WIDTH - 16;
    if (width < MIN_CARD_WIDTH - 16)
      width = MIN_CARD_WIDTH - 16;

    // image
    let article_image = article.image;
    const image_thumb = article.image_thumb;
    if (image_thumb) {
      if (width < 320 && image_thumb['240']) {
        article_image = image_thumb['240'];
      } else if (width < 480 && image_thumb['320']) {
        article_image = image_thumb['320'];
      } else if (width < 640 && image_thumb['480']) {
        article_image = image_thumb['480'];
      } else if (width < 800 && image_thumb['640']) {
        article_image = image_thumb['640'];
      } else if (image_thumb['org']) {
        article_image = image_thumb['org'];
      }
    }
    const hasImage = (article_image !== "") && (article_image !== null);

    // link preview
    let preview = null;
    if (article.link_preview // && 
      // article.link_preview.title && article.link_preview.image
    ) {
      preview = article.link_preview;
    }

    // threads
    // const threads = article.data;
    let hasThreads = false;
    // let replyCount = 0;
    // if (threads && threads.length > 0) {
    //   hasThreads = true;
    //   if (threads[0].reply_count)
    //     replyCount = threads[0].reply_count;
    // }

    // retweet info
    const retweet_info = article.extra_data;

    return (
      <Card className={classes.card} style={{ width: width }}>
        <div className={classes.carddiv}>
          <CardHeader
            className={classes.header}
            avatar={
              <div>
                {hasAuthorImage && (
                  <Avatar
                    alt={article.author}
                    src={author_image}
                    className={classes.avatar}
                    classes={{ img: classes.avatar_img }}
                    onClick={e => onClickSource(source, feed)}
                  />
                )}
                {!hasAuthorImage && (
                  <Avatar
                    alt={source.name}
                    src={source.image}
                    className={classes.avatar}
                    classes={{ img: classes.avatar_img }}
                    onClick={e => onClickSource(source, feed)}
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
                {retweet_info !== null && retweet_info.retweeted_by !== undefined &&
                  <div>
                    <img
                      alt={"retweet"}
                      src={`/static/images/icons/${theme_mode}/retweet.png`}
                      className={classes.retweetedby_img}
                    />
                    <Typography className={classes.retweetedby_author}>{`Retweeted by ${decodeHTMLEntities(retweet_info.retweeted_by)}`}</Typography>
                  </div>
                }
                <Typography 
                  className={classes.name}
                  onClick={e => onClickSource(source, feed)}
                >
                  {decodeHTMLEntities(author)}
                </Typography>
                {needNewline ? (
                  <Typography className={classes.screenname} variant="subtitle2">@{screen_name}</Typography>
                ):(
                  <Typography className={classes.screenname_inline} variant="subtitle2">@{screen_name}</Typography>
                )}
                {selected_feed === null &&  // show only in home page
                  <Typography 
                    className={classes.feed}
                    onClick={e => onClickFeed(feed)}
                  >
                    {feed.name}
                  </Typography>
                }
                <Typography className={classes.date}>{published}</Typography>
              </div>
            }
            subheader={
              <div className={classes.subtitle}>
                {reply_decl !== null && reply_decl.length > 0 && (
                  <Typography className={classes.replydecl} variant="subtitle2">
                    {decodeHTMLEntities(reply_decl)}
                  </Typography>
                )}
              </div>
            }
          />
          <div>
            {article.pinned !== undefined && (
              <img alt={"pin"} className={classes.pin} 
                src={`/static/images/icons/${theme_mode}/pin.png`}
              />
            )}
            <IconButton className={classes.share} onClick={this.handleClickShare}>
              <ShareIcon className={classes.shareicon} />
            </IconButton>
            <IconButton className={classes.expand} onClick={this.handleExpand}>
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <CardContent className={classes.content} onClick={e => handleClick(article)}>
            <div
              style={{fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "18px"}}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </CardContent>
          {preview !== null && (
            <LinkPreview preview={preview} />
          )}
          {preview === null && hasImage && (
            <img alt={""} src={article_image} className={classes.media} onClick={e => handleClick(article)}/>
          )}
          <CardActions className={classes.cardactions}>
            {hasThreads && (
              <Button
                className={classes.readmorebtn}
                size="small"
                color="primary"
                target="_blank"
                onClick={e => handleClick(article)}
              >
                <Typography className={classes.readmore}>
                  read threads
                </Typography>
                <ChevronRightIcon
                  fontSize="small"
                  className={classes.righticon}
                />
              </Button>
            )}
            {!hasThreads && (
              <Button
                className={classes.readmorebtn}
                size="small"
                color="primary"
                target="_blank"
                href={article.url}
              >
                 View original tweet
              </Button>
            )}
            <Button
              className={classes.reaction}
              size="small"
              color="primary"
              target="_blank"
            >
              {/* <div>
                <img
                  alt={"reply"}
                  src={`/static/images/icons/${theme_mode}/reply.png`}
                  className={classes.reactionimg}
                />
                <Typography className={classes.reactionvalue}>
                  {replyCount}
                </Typography>
              </div> */}
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
          {article.translated === true && (
            <div className={classes.translated_div}>
              <StarIcon className={classes.traslated_icon} />
              <Typography className={classes.translated_txt}>
                {transMark}
              </Typography>
            </div>
          )}
        </div>
      </Card>
    );
  }
}

TwitterCard.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object,
  handleClick: PropTypes.func,
  onClickSource: PropTypes.func,
  onClickFeed: PropTypes.func,
  onAnchorEl: PropTypes.func,
  onShare: PropTypes.func
};

const mapStateToProps = state => ({
  loggedIn: state.sessionState.loggedIn,
  sources: state.dataState.sources,
  theme_mode: state.uiState.theme_mode,
  selected_feed: state.dataState.selected_feed,
  showretweet_sources: state.dataState.showretweet_sources,
  feeds: state.dataState.feeds,
  followed_feeds: state.dataState.followed_feeds,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TwitterCard));

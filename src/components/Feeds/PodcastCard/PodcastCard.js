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
  IconButton,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StarIcon from "@material-ui/icons/Star";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { LinkPreview } from "components";
import { 
  get_timestring, 
  summarize_text, 
  decodeHTMLEntities, 
  render_text 
} from "utility/utils";
import { 
  MAX_CARD_WIDTH, 
  MIN_CARD_WIDTH,
  THEME_MODE_DARK 
} from "constants/types";

const styles = (theme) => ({
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
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  header: {
    padding: 0,
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
    backgroundColor: "transparent",
  },
  socialimg: {
    position: "absolute",
    top: 52,
    left: 14,
    width: 20,
    height: 20,
  },
  titleline: {
    position: "relative",
    marginLeft: 40,
    marginRight: 40,
    margin: 10,
  },
  channeltitle: {
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    color: theme.palette.text.primary,
    cursor: "pointer",
  },
  title: {
    marginTop: 4,
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
    color: theme.palette.text.secondary,
    marginTop: 4,
  },
  content: {
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 30,
    marginRight: 10,
    marginBottom: 8,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  detail_txt: {
    display: "inline",
    overflowWrap: "break-word",
  },
  media: {
    display: "block",
    width: 240,
    height: 32,
    marginLeft: "auto",
    marginRight: "auto",
  },
  actionbtn: {
    position: "absolute",
    right: 4,
    fontFamily: "Arial",
    fontSize: 12,
    textTransform: "inherit",
    float: "right",
    color: theme.palette.text.secondary,
  },
  author: {
    float: "left",
    fontSize: 12,
    marginLeft: 30,
    color: theme.palette.text.secondary,
  },
  readmore: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    float: "right",
    marginRight: 16,
  },
  righticon: {
    position: "absolute",
    right: 0,
    bottom: 5,
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

class PodcastCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickShare = this.handleClickShare.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleClickShare = () => {
    const { article } = this.props;
    this.props.onShare(article.nid);
  };

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
      theme_mode, 
      selected_feed, 
      sources, 
      article, 
      handleClick, 
      onClickSource, 
      onClickFeed 
    } = this.props;

    // check validity
    let source = sources.find((item) => item.id === article.source_id);
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

    const transMark = source.translate ? `Translated from ${source.translateLang} by ${source.translateAPI}` : "";

    var title = "";
    var summary = "";
    if (article.translated) {
      title = article.tr_title;
      // omit the last character(.)
      title = title.slice(0, title.length - 1);
      summary = article.tr_summary;
    } else {
      title = article.title;
      summary = article.summary;
    }
    summary = summarize_text(summary, 150);

    // article width
    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    width -= 16;
    if (width > MAX_CARD_WIDTH - 16)
      width = MAX_CARD_WIDTH - 16;
    if (width < MIN_CARD_WIDTH - 16)
      width = MIN_CARD_WIDTH - 16;

    // channel title
    const channel_title = article.txt_param1;

    // publish time
    let published = get_timestring(article.published);

    // let article_image = article.image;
    // const image_thumb = article.image_thumb;
    // if (image_thumb) {
    //   if (width < 320 && image_thumb['240']) {
    //     article_image = image_thumb['240'];
    //   } else if (width < 480 && image_thumb['320']) {
    //     article_image = image_thumb['320'];
    //   } else if (width < 640 && image_thumb['480']) {
    //     article_image = image_thumb['480'];
    //   } else if (width < 800 && image_thumb['640']) {
    //     article_image = image_thumb['640'];
    //   } else if (image_thumb['org']) {
    //     article_image = image_thumb['org'];
    //   }
    // }

    // link preview
    let preview = null;
    if (article.link_preview //&& 
      // article.link_preview.title && article.link_preview.image
    ) {
      preview = article.link_preview;
    }

    return (
      <Card className={classes.card} style={{ width: width }}>
        <div className={classes.carddiv}>
          <CardHeader
            className={classes.header}
            avatar={
              <div>
                <Avatar
                  alt={source.name}
                  src={source.image}
                  className={classes.avatar}
                  classes={{ img: classes.avatar_img }}
                  onClick={e => onClickSource(source, feed)}
                />
                <img
                  alt={"podcast"}
                  src={`/static/images/icons/${theme_mode}/podcast.png`}
                  className={classes.socialimg}
                />
              </div>
            }
            title={
              <div className={classes.titleline}>
                <Typography 
                  className={classes.channeltitle}
                  onClick={e => onClickSource(source, feed)}
                >
                  {render_text(channel_title, theme_mode === THEME_MODE_DARK)}
                </Typography>
                <Typography 
                  className={classes.title} 
                  variant="subtitle2"
                  onClick={e => handleClick(article)}
                >
                  {render_text(title, theme_mode === THEME_MODE_DARK)}
                </Typography>
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
          />
          <div>
            {article.pinned !== undefined && (
              <img
                alt={"pin"}
                className={classes.pin}
                src={`/static/images/icons/${theme_mode}/pin.png`}
              />
            )}
            <IconButton
              className={classes.share}
              onClick={this.handleClickShare}
            >
              <ShareIcon className={classes.shareicon} />
            </IconButton>
            <IconButton className={classes.expand} onClick={this.handleExpand}>
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <CardContent className={classes.content} onClick={e => handleClick(article)}>
            <Typography className={classes.detail_txt} variant="body2">
              {render_text(summary, theme_mode === THEME_MODE_DARK)}
            </Typography>
          </CardContent>
          {/* {article.image.length > 0 && (
            <img alt={""} src={article.image} className={classes.media} />
          )} */}
          {preview !== null && (
            <LinkPreview preview={preview} />
          )}
          {preview === null && (
            <div>
              <audio
                className={classes.media}
                name={"media"}
                controls={true}
                controlsList={"nofullscreen nodownload"}
              >
                <source src={article.media_url} type={"audio/mpeg"} />
              </audio>
            </div>
          )}
          <CardActions>
            <Typography className={classes.author}>
              Posted by {decodeHTMLEntities(article.author)}
            </Typography>
            <Button
              className={classes.actionbtn}
              size="small"
              color="primary"
              target="_blank"
              onClick={e => handleClick(article)}
            >
              <Typography className={classes.readmore}>read more</Typography>
              <ChevronRightIcon
                fontSize="small"
                className={classes.righticon}
              />
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

PodcastCard.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object,
  handleClick: PropTypes.func,
  onClickSource: PropTypes.func,
  onClickFeed: PropTypes.func,
  onAnchorEl: PropTypes.func,
  onShare: PropTypes.func
};

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  sources: state.dataState.sources,
  theme_mode: state.uiState.theme_mode,
  selected_feed: state.dataState.selected_feed,
  feeds: state.dataState.feeds,
  followed_feeds: state.dataState.followed_feeds,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PodcastCard));

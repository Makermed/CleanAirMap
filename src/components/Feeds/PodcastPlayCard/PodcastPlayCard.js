import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardActions,
  Avatar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import AudioPlayer from 'material-ui-audio-player';
import { 
  get_timestring, 
  decodeHTMLEntities, 
  render_text, 
  summarize_text 
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
  carddiv_selected: {
    margin: 3,
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 10,
    borderTopLeftRadius: 30,
    backgroundColor: theme.palette.background.podcast,
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
  // pin: {
  //   position: "absolute",
  //   top: 8,
  //   right: 32,
  //   padding: 0,
  //   width: 16,
  //   height: 16,
  //   borderRadius: 10,
  //   color: theme.palette.info.contrastText,
  //   zIndex: 100,
  // },
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
  channeltitle_highlight: {
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    color: theme.palette.text.podcast,
    cursor: "pointer",
  },
  title: {
    marginTop: 4,
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "18px",
    color: theme.palette.text.primary,
  },
  title_highlight: {
    marginTop: 4,
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "18px",
    color: theme.palette.text.podcast,
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
  feed_highlight: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontStyle: "Italic",
    lineHeight: "18px",
    marginTop: 4,
    marginBottom: 4,
    color: theme.palette.text.podcast,
    cursor: "pointer",
  },
  date: {
    float: "right",
    fontSize: "12px",
    color: theme.palette.text.secondary,
    marginTop: 4,
  },
  date_highlight: {
    float: "right",
    fontSize: "12px",
    color: theme.palette.text.podcast,
    marginTop: 4,
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
  actionbtn_highlight: {
    position: "absolute",
    right: 4,
    fontFamily: "Arial",
    fontSize: 12,
    textTransform: "inherit",
    float: "right",
    color: theme.palette.text.podcast,
  },
  author: {
    float: "left",
    fontSize: 12,
    marginLeft: 30,
    color: theme.palette.text.secondary,
  },
  author_highlight: {
    float: "left",
    fontSize: 12,
    marginLeft: 30,
    color: theme.palette.text.podcast,
  },
  readmore: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    float: "right",
    marginRight: 16,
  },
  readmore_highlight: {
    fontSize: 12,
    color: theme.palette.text.podcast,
    float: "right",
    marginRight: 16,
  },
  righticon: {
    position: "absolute",
    right: 0,
    bottom: 5,
  },
});

class PodcastPlayCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickShare = this.handleClickShare.bind(this);
  }

  componentDidUpdate = (prevProps) => {
    if (
      !prevProps.selected_podcast || !this.props.selected_podcast ||
      (this.props.selected_podcast && prevProps.selected_podcast.nid !== this.props.selected_podcast.nid)
    ) {
      if (this.props.selected_podcast && this.props.article) {
        const audio = document.getElementById(`audio-${this.props.article.nid}`);
        if (this.props.selected_podcast.nid === this.props.article.nid) {
          // console.log("podcast selected :", this.props.article.nid);
          if (audio) {
            audio.play();
          }
        } else {
          if (audio) {
            audio.pause();
          }
        }
      }
    }
  }

  handleClickShare = () => {
    const { article } = this.props;
    this.props.onShare(article.nid);
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
      selected_podcast,
      handleClick, 
      onClickSource, 
      onClickFeed,
      onPlay,
      onPause,
      onEnded
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

    var title = "";
    if (article.translated) {
      title = article.tr_title;
      // omit the last character(.)
      title = title.slice(0, title.length - 1);
    } else {
      title = article.title;
    }

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

    const isPlaying = selected_podcast && selected_podcast.nid === article.nid;

    const author = article.author ? article.author : summarize_text(source.name, 30);

    return (
      <Card className={classes.card} style={{ width: width }}>
        <div className={isPlaying ? classes.carddiv_selected : classes.carddiv}>
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
                  className={isPlaying ? classes.channeltitle_highlight : classes.channeltitle}
                  onClick={e => onClickSource(source, feed)}
                >
                  {render_text(channel_title, theme_mode === THEME_MODE_DARK)}
                </Typography>
                <Typography 
                  className={isPlaying ? classes.title_highlight : classes.title} 
                  variant="subtitle2"
                  onClick={e => handleClick(article)}
                >
                  {render_text(title, theme_mode === THEME_MODE_DARK)}
                </Typography>
                {selected_feed === null &&  // show only in home page
                  <Typography 
                    className={isPlaying ? classes.feed_highlight : classes.feed}
                    onClick={e => onClickFeed(feed)}
                  >
                    {feed.name}
                  </Typography>
                }
                <Typography 
                  className={isPlaying ? classes.date_highlight : classes.date}
                >{published}</Typography>
              </div>
            }
          />
          <div>
            <IconButton
              className={classes.share}
              onClick={this.handleClickShare}
            >
              <ShareIcon className={classes.shareicon} />
            </IconButton>
          </div>
          <div>
            <audio
              className={classes.media}
              id={`audio-${article.nid}`}
              style={{width: "300px"}}
              controls
              controlsList={"nofullscreen nodownload"}
              preload="metadata"
              onPlay={e => onPlay(article.nid)}
              onPause={e => onPause(article.nid)}
              onEnded={e => onEnded(article.nid)}
            >
              <source src={article.media_url} type={"audio/mpeg"} />
            </audio>
          </div>
          {/* <AudioPlayer
            elevation={1}
            // width="100%"
            variation="default"
            spacing={3}
            autoplay={isPlaying}
            src={article.media_url}
            onPlayed={e => onPlay(article.nid)}
            onPaused={e => onPause(article.nid)}
            onFinished={e => onEnded(article.nid)}
          /> */}
          <CardActions>
            <Typography className={isPlaying ? classes.author_highlight : classes.author}>
              Posted by {decodeHTMLEntities(author)}
            </Typography>
            <Button
              className={classes.actionbtn}
              size="small"
              color="primary"
              target="_blank"
              onClick={e => handleClick(article)}
            >
              <Typography 
                className={isPlaying ? classes.readmore_highlight : classes.readmore}
              >read more</Typography>
              <ChevronRightIcon
                fontSize="small"
                className={classes.righticon}
              />
            </Button>
          </CardActions>
        </div>
      </Card>
    );
  }
}

PodcastPlayCard.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object,
  handleClick: PropTypes.func,
  onClickSource: PropTypes.func,
  onClickFeed: PropTypes.func,
  onShare: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onEnded: PropTypes.func
};

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  sources: state.dataState.sources,
  theme_mode: state.uiState.theme_mode,
  selected_feed: state.dataState.selected_feed,
  feeds: state.dataState.feeds,
  followed_feeds: state.dataState.followed_feeds,
  selected_podcast: state.dataState.selected_podcast
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PodcastPlayCard));

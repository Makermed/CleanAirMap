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
  Grid,
  Button,
  IconButton,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StarIcon from "@material-ui/icons/Star";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { 
  get_timestring, 
  render_text 
} from "utility/utils";
import { CONF_COUNTRIES } from "constants/country";
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
  sourcename: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "18px",
    marginTop: 10,
    marginLeft: 40,
    marginRight: 30,
    marginBottom: 4,
    color: theme.palette.text.primary,
    cursor: "pointer",
  },
  title: {
    position: "relative",
    marginTop: 4,
    marginLeft: 40,
    marginRight: 40,
  },
  feed: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontStyle: "Italic",
    lineHeight: "18px",
    marginTop: 4,
    marginLeft: 40,
    marginRight: 30,
    marginBottom: 4,
    color: theme.palette.text.secondary,
    cursor: "pointer",
  },
  subtitle: {
    position: "relative",
    marginLeft: 40,
    marginRight: 24,
  },
  subtitle_left: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    float: "left",
    position: "relative",
  },
  subtitle_right: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    float: "right",
    marginRight: 10,
  },
  country_img: {
    position: "relative",
    width: "auto",
    float: "left",
    height: 16,
    marginTop: 2,
    marginRight: theme.spacing(1),
  },
  content: {
    padding: 4,
    marginLeft: 30,
    marginRight: 10,
    marginBottom: 8,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  summary: {
    display: "inline",
    overflowWrap: "break-word",
  },
  media: {
    width: 100,
    height: "auto",
    float: "right",
    borderRadius: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 8,
  },
  groupArticles: {
    width: 250,
    marginLeft: 20,
  },
  groupAvatar: {
    width: 24,
    height: 24,
  },
  actions: {
    position: "relative",
    width: "100%",
    padding: 0,
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1)
  },
  translated_div: {
    float: "left",
    height: 16,
    width: 250,
    marginLeft: 10,
    marginBottom: 8,
  },
  traslated_icon: {
    // position: "relative",
    float: "left",
    top: 3,
    marginLeft: 5,
    width: 16,
    height: 16,
    color: theme.palette.text.primary,
  },
  translated_txt: {
    display: "inline",
    marginLeft: 2,
    fontSize: 12,
    fontStyle: "italic",
    color: theme.palette.text.secondary,
  },
  actionbtn: {
    position: "absolute",
    textTransform: "inherit",
    right: 4,
    bottom: 4,
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
    color: theme.palette.text.secondary,
  },
});

class NewsCard extends React.Component {
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

  getCountryInfo = (countryCode) => {
    for (let country of CONF_COUNTRIES) {
      if (country.value === countryCode) {
        return country;
      }
    }
    return "";
  }

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
      // search_mode,
      handleClick,
      handleGroupId,
      onClickSource,
      onClickFeed,
    } = this.props;

    // get source to use name, image, etc
    let source = sources.find((item) => item.id === article.source_id);
    if (!source) {
      console.log("Error, Unknown article source!", article);
      return <div></div>;
    }

    // find the feed contain this article(source)
    // let feed = null;
    // if (selected_feed !== null) {
    //   feed = selected_feed;
    // } else {
    //   feed = this.getFeedofSource(article.source_id);
    // }
    const feed = this.getFeedofSource(article.source_id);
    if (!feed) {
      console.log("Error, can't find the feed!", article);
      return <div></div>;
    }

    // let newssite = newssites.find((item) => item.id === article.source_id);
    // let newssite_name = newssite.name;
    // newssite_name = newssite_name.replace(" Opinion", "");
    // newssite_name = newssite_name.replace(" Breaking", "");

    let country = this.getCountryInfo(article.country);

    var hasGroupIds = false;
    var groupInfo = [];
    if (article.data && article.data.length > 0) {
      hasGroupIds = true;
      for (let item of article.data) {
        let group_country = this.getCountryInfo(item.country);
        groupInfo.push({
          flag: group_country.flag,
          nid: item.nid,
        });
      }
    }

    const transMark = source.translate ? `Translated from ${source.translateLang} by ${source.translateAPI}` : "";
    var title = "";
    var summary = "";
    if (source.translate && article.translated) {
      title = article.tr_title;
      // omit the last character(.)
      title = title.slice(0, title.length - 1);
      summary = article.tr_summary;
    } else {
      title = article.title;
      summary = article.summary;
    }
    var newsTime = get_timestring(article.published);

    // limit summary to 5 lines
    if (summary && summary.length > 160) {
      summary = summary.slice(0, 160);
      summary += "...";
    }

    // image
    let article_image = article.image;
    const image_thumb = article.image_thumb;
    if (image_thumb) {
      if (image_thumb['150']) {
        article_image = image_thumb['150'];
      } else if (image_thumb['240']) {
        article_image = image_thumb['240'];
      } else if (image_thumb['320']) {
        article_image = image_thumb['320'];
      } else if (image_thumb['org']) {
        article_image = image_thumb['org'];
      }
    }
    const hasImage = (article_image !== "") && (article_image !== null);

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    width -= 16;
    if (width > MAX_CARD_WIDTH - 16)
      width = MAX_CARD_WIDTH - 16;
    if (width < MIN_CARD_WIDTH - 16)
      width = MIN_CARD_WIDTH - 16;

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
                  alt={"newspaper"}
                  src={`/static/images/icons/${theme_mode}/newspaper.png`}
                  className={classes.socialimg}
                />
              </div>
            }
            title={
              <div>
                <Typography 
                  className={classes.sourcename} 
                  onClick={e => onClickSource(source, feed)}
                >
                  {source.name}
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
              </div>
            }
            subheader={
              <div className={classes.subtitle} onClick={e => handleClick(article)}>
                <img
                  alt={country.name}
                  className={classes.country_img}
                  src={country.flag}
                />
                <Typography className={classes.subtitle_left}>
                  {country.name}
                </Typography>
                <Typography className={classes.subtitle_right}>
                  {newsTime}
                </Typography>
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
            <div>
              <Typography className={classes.summary} variant="body2">
                {hasImage && (
                  <img alt={""} src={article_image} className={classes.media} />
                )}
                {render_text(summary, theme_mode === THEME_MODE_DARK)}
              </Typography>
            </div>
          </CardContent>
          {hasGroupIds && (
            <Grid
              container
              className={classes.groupArticles}
              spacing={0}
              justifyContent="flex-start"
              alignItems="center"
            >
              {groupInfo.map((item, index) => (
                <Grid key={index} item>
                  <Avatar
                    src={item.flag}
                    className={classes.groupAvatar}
                    classes={{ img: classes.avatar_img }}
                    onClick={handleGroupId(item.nid)}
                  />
                  {/* </Link> */}
                </Grid>
              ))}
            </Grid>
          )}
          <CardActions className={classes.actions}>
            {source.translate === true ? (
              <div className={classes.translated_div}>
                <StarIcon className={classes.traslated_icon} />
                <Typography className={classes.translated_txt}>
                  {transMark}
                </Typography>
              </div>
            ) : (
              <div className={classes.translated_div}></div>
            )}
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
        </div>
      </Card>
    );
  }
}

NewsCard.propTypes = {
  classes: PropTypes.object,
  search_mode: PropTypes.bool,
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
  newssites: state.dataState.newssites,
  selected_feed: state.dataState.selected_feed,
  feeds: state.dataState.feeds,
  followed_feeds: state.dataState.followed_feeds,
  theme_mode: state.uiState.theme_mode,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewsCard));

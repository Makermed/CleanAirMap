import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../../actions";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { LinkPreview } from "../../CommonControls";
import {
  get_timestring,
  decodeHTMLEntities,
  render_text,
} from "../../../utility/utils";
import {
  BLANK_USER_IMAGE,
  MAX_CARD_WIDTH,
  MIN_CARD_WIDTH,
  THEME_MODE_DARK,
  THEME_MODE_LIGHT,
} from "../../../constants/types";

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
    borderColor: theme.palette.feedstroke.default,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: theme.palette.feedbackground.default,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  header: {
    padding: 0,
  },
  share: {
    position: "absolute",
    top: 12,
    right: 12,
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
  expand: {
    position: "absolute",
    top: 28,
    right: 10,
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
    left: 16,
    width: 20,
    height: 20,
  },
  upvotebtn: {
    position: "absolute",
    top: 100,
    left: 12,
    width: 20,
    height: 20,
    zIndex: 100,
  },
  buttonimg: {
    width: 20,
    height: 20,
  },
  usertype: {
    position: "absolute",
    top: 76,
    left: 8,
    fontFamily: "Arial",
    fontSize: "14px",
    lineHeight: "16px",
    fontWeight: 600,
    color: "#1878F3",
  },
  titleline: {
    position: "relative",
    marginLeft: 40,
    marginRight: 40,
    margin: 10,
  },
  author: {
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
  date: {
    float: "right",
    fontSize: "12px",
    color: theme.palette.text.secondary,
    marginTop: 4,
  },
  content: {
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 40,
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
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  actionbtn: {
    left: "50%",
    transform: "translate(-50%)",
    fontSize: 12,
    textTransform: "none",
    padding: 0,
    marginBottom: 4,
    color: theme.palette.text.primary,
  },
  actiondiv: {
    marginLeft: 16,
  },
  actionimg: {
    float: "left",
    width: 16,
    height: 16,
  },
  actionvalue: {
    float: "left",
    marginLeft: 5,
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.text.secondary,
  },
  actions: {
    padding: 0,
    margin: 0,
  },
  repostbtn: {
    width: 20,
    height: 20,
    zIndex: 100,
  },
  commentbtn: {
    marginLeft: theme.spacing(1),
    width: 20,
    height: 20,
    zIndex: 100,
  },
  comment: {
    marginLeft: theme.spacing(0.5),
    fontSize: "14px",
    fontStyle: "Roboto",
  },
});

class MapUserpostCard extends React.Component {
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

  render() {
    const {
      classes,
      theme_mode,
      loggedIn,
      authUser,
      article,
      onClickPost,
      onClickUpvote,
      onClickComment,
      onClickRepost,
    } = this.props;

    // voted, reposted by me
    let voted = false;
    let reposted = false;
    if (loggedIn && authUser) {
      voted =
        authUser.articles_voted.find(
          (voted) => voted.article_id === article.nid
        ) !== undefined;
      reposted =
        authUser.articles_reposted.find(
          (reposted) => reposted.article_id === article.nid
        ) !== undefined;
    }

    const class_usertype = {
      position: "absolute",
      top: 76,
      left: 8,
      fontFamily: "Arial",
      fontSize: "14px",
      lineHeight: "16px",
      fontWeight: 600,
      color: theme_mode === THEME_MODE_LIGHT ? "#1878F3" : "white",
    };

    var title = article.title;
    var summary = article.summary;

    // moderator
    const isModerator = article.param2 === 1;
    const social_image = isModerator
      ? `/static/images/icons/${theme_mode}/moderator.png`
      : `/static/images/icons/${theme_mode}/members.png`;

    // author
    let avatar_image = article.author_image;
    if (!avatar_image) {
      avatar_image = BLANK_USER_IMAGE;
    }

    // publish time
    let published = get_timestring(article.published);

    let width =
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      window.innerWidth;
    width -= 16;
    if (width > MAX_CARD_WIDTH - 16) width = MAX_CARD_WIDTH - 16;
    if (width < MIN_CARD_WIDTH - 16) width = MIN_CARD_WIDTH - 16;

    // link preview
    let preview = null;
    if (article.link_preview) {
      preview = article.link_preview;
    }

    // get comments
    let commentsCnt = 0;
    if (article.threads) {
      for (let thread of article.threads) {
        commentsCnt += thread.comments_aggregate.aggregate.count;
      }
    }

    return (
      <Card
        className={classes.card}
        style={{ width: width, backgroundColor: classes.card.backgroundColor }}
      >
        <div className={classes.carddiv}>
          <CardHeader
            className={classes.header}
            avatar={
              <div>
                <Avatar
                  alt={article.author}
                  src={avatar_image}
                  className={classes.avatar}
                  classes={{ img: classes.avatar_img }}
                />
                <img
                  alt={"user"}
                  src={social_image}
                  className={classes.socialimg}
                />
                <Typography style={class_usertype}>
                  {isModerator ? "MOD" : "USER"}
                </Typography>
              </div>
            }
            title={
              <div className={classes.titleline}>
                <Typography className={classes.author}>
                  {decodeHTMLEntities(article.author)}
                </Typography>
                <Typography
                  className={classes.title}
                  variant="subtitle2"
                  onClick={(e) => onClickPost(article)}
                >
                  {render_text(title, theme_mode === THEME_MODE_DARK)}
                </Typography>
                <Typography className={classes.date}>{published}</Typography>
              </div>
            }
          />
          <div>
            <IconButton className={classes.upvotebtn} onClick={onClickUpvote}>
              <img
                alt={"upvote"}
                src={
                  voted
                    ? `/static/images/icons/thumbsup.png`
                    : `/static/images/icons/${theme_mode}/thumbsup.png`
                }
                className={classes.buttonimg}
              />
            </IconButton>
          </div>

          <div>
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
          <CardContent
            className={classes.content}
            onClick={(e) => onClickPost(article)}
          >
            <Typography className={classes.detail_txt} variant="body2">
              {render_text(summary, theme_mode === THEME_MODE_DARK)}
            </Typography>
          </CardContent>
          {preview !== null && <LinkPreview preview={preview} />}
          <CardActions>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item></Grid>
              <Grid item>
                <div style={{ marginRight: 16 }}>
                  <IconButton
                    className={classes.repostbtn}
                    onClick={onClickRepost}
                  >
                    <img
                      alt={"repost"}
                      src={
                        reposted
                          ? `/static/images/icons/repost.png`
                          : `/static/images/icons/${theme_mode}/repost.png`
                      }
                      className={classes.actionimg}
                    />
                  </IconButton>
                  <IconButton
                    className={classes.commentbtn}
                    onClick={onClickComment}
                  >
                    <img
                      alt={"comment"}
                      src={`/static/images/icons/${theme_mode}/chat.png`}
                      className={classes.actionimg}
                    />
                  </IconButton>
                  {commentsCnt > 0 && (
                    <span
                      className={classes.comment}
                    >{`${commentsCnt} Comments`}</span>
                  )}
                </div>
              </Grid>
            </Grid>
          </CardActions>
        </div>
      </Card>
    );
  }
}

MapUserpostCard.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object,
  onClickPost: PropTypes.func,
  onAnchorEl: PropTypes.func,
  onShare: PropTypes.func,
};

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  theme_mode: state.uiState.theme_mode,
  selected_location: state.mapState.selected_location,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MapUserpostCard));

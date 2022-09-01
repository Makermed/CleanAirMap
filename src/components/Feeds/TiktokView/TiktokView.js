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
  Grid,
} from "@material-ui/core";
// import ReactPlayer from "react-player";
import StarIcon from "@material-ui/icons/Star";
import { 
  get_timestring, 
  int2kstring, 
  decodeHTMLEntities, 
  render_text 
} from "utility/utils";
import { 
  MAX_ARTICLE_WIDTH, 
  MIN_CARD_WIDTH,
  THEME_MODE_DARK 
} from "constants/types";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
  card: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    width: "100%",
  },
  carddiv: {
    margin: 3,
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 10,
    backgroundColor: theme.palette.background.article,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  header: {
    padding: 0,
  },
  avatar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 32,
    height: 32,
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
    marginRight: 20,
    margin: 10,
  },
  author: {
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 600,
    // letterSpacing: "1px",
    color: theme.palette.text.primary,
  },
  title: {
  },
  date: {
    float: "right",
    fontSize: "12px",
    color: theme.palette.text.secondary,
    marginTop: 4,
    marginRight: theme.spacing(2),
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 20,
    marginRight: 10,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  detail_txt: {
    display: "inline",
    overflowWrap: "break-word",
  },
  playerwrapper: {
    position: "relative",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  reactplayer: {
    top: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  reactionbtn: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%)",
    fontSize: 12,
    bottom: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  reactiondiv: {
    marginLeft: 16,
  },
  reactionimg: {
    float: "left",
    width: 12,
    height: 12,
  },
  reactionvalue: {
    float: "left",
    marginLeft: 5,
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "14px",
    color: theme.palette.text.secondary,
  },
  actionbtn: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: 12,
    marginRight: 5,
    textTransform: "inherit",
    color: theme.palette.text.secondary,
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
    color: theme.palette.text.primary,
  },
  translated_txt: {
    display: "inline",
    marginLeft: 2,
    fontSize: 12,
    fontStyle: "italic",
    color: theme.palette.text.secondary,
  },
});

class TiktokView extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes, sources, article, theme_mode } = this.props;

    // validation check
    let source = sources.find((item) => item.id === article.source_id);
    if (!source) {
      console.log("Error, Unknown article source!");
      return <div></div>;
    }

    const transMark = source.translate
      ? `Translated from ${source.translateLang} by ${source.translateAPI}`
      : "";

    var title = "";
    if (article.translated) {
      title = article.tr_title;
      // omit the last character(.)
      title = title.slice(0, title.length - 1);
    } else {
      title = article.title;
    }

    // calculate likes, comments
    const comments = int2kstring(article.param1);
    const likes = int2kstring(article.param2);

    let published = get_timestring(article.published);

    let width = document.documentElement.clientWidth || document.body.clientWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;

    // image
    let article_image = article.image;
    const image_thumb = article.image_thumb;
    if (image_thumb) {
      if (width < 320 && image_thumb["240"] !== undefined) {
        article_image = image_thumb["240"];
      } else if (width < 480 && image_thumb["320"] !== undefined) {
        article_image = image_thumb["320"];
      } else if (width < 640 && image_thumb["480"] !== undefined) {
        article_image = image_thumb["480"];
      } else if (width < 800 && image_thumb["640"] !== undefined) {
        article_image = image_thumb["640"];
      } else if (image_thumb["org"] !== undefined) {
        article_image = image_thumb["org"];
      }
    }
    const hasImage = article_image !== "" && article_image !== null;

    let videoWidth = width - 22;
    let videoHeight = (videoWidth * 16) / 9;

    return (
      <div className={classes.root}>
        <Card className={classes.card} style={{ width: width - 16}}>
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
                  />
                  <img
                    alt={"tiktok"}
                    src={`/static/images/icons/${theme_mode}/tiktok.png`}
                    className={classes.socialimg}
                  />
                </div>
              }
              title={
                <div className={classes.titleline}>
                  <Typography className={classes.author}>
                    {decodeHTMLEntities(article.author)}
                  </Typography>
                  <Typography className={classes.title} variant="subtitle1">{render_text(title, theme_mode === THEME_MODE_DARK)}</Typography>
                  <Typography className={classes.date}>{published}</Typography>
                </div>
              }
            />
            <div className={classes.playerwrapper} onClick={e=> window.open(article.url, "_blank")}>
              <img
                src={hasImage ? article_image : ""}
                alt={"img"}
                width={videoWidth}
                height={videoHeight}
              />
              {/* <ReactPlayer
                className={classes.reactplayer}
                // controls={true}
                light={hasImage ? article_image : ""}
                width={videoWidth}
                height={videoHeight}
                url={article.media_url}
              /> */}
            </div>
            <CardActions>
              <Button
                className={classes.reactionbtn}
                size="small"
                color="primary"
                target="_blank"
              >
                <div>
                  <img
                    alt={"likes"}
                    src={`/static/images/icons/${theme_mode}/favorite.png`}
                    className={classes.reactionimg}
                  />
                  <Typography className={classes.reactionvalue}>
                    {likes}
                  </Typography>
                </div>
                <div className={classes.reactiondiv}>
                  <img
                    alt={"comments"}
                    src={`/static/images/icons/${theme_mode}/reply.png`}
                    className={classes.reactionimg}
                  />
                  <Typography className={classes.reactionvalue}>
                    {comments}
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
            href={article.url}
          >
            View original article
          </Button>
        </Grid>
      </div>
    );
  }
}

TiktokView.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object
};

const mapStateToProps = (state) => ({
  sources: state.dataState.sources,
  theme_mode: state.uiState.theme_mode,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TiktokView));

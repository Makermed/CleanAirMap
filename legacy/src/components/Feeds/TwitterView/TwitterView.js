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
  Grid,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { get_timestring, int2kstring, summarize_text, decodeHTMLEntities } from "utility/utils";
import { LinkPreview } from "components";
import { MAX_ARTICLE_WIDTH, MIN_CARD_WIDTH } from "constants/types";

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
    width: MAX_ARTICLE_WIDTH,
    maxWidth: "100%",
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
  title: {
    position: "relative",
    marginLeft: 40,
    marginRight: 20,
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
  },
  screenname_inline: {
    display: "inline",
  },
  screenname: {},
  subtitle: {
    marginLeft: 40,
    marginRight: 20,
  },
  date: {
    float: "right",
    fontSize: "12px",
    color: theme.palette.text.secondary,
  },
  content: {
    paddingTop: 4,
    paddingBottom: 0,
    marginLeft: 20,
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
    marginBottom: theme.spacing(1),
    borderRadius: 10,
  },
  cardactions: {
    padding: 0,
    margin: 0,
  },
  reaction: {
    left: "50%",
    transform: "translate(-50%)",
    fontSize: 12,
    color: theme.palette.text.primary,
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

class TwitterView extends React.Component {
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

    // don't show reply tweet(there aren't reply tweets in new crawler)
    if (article.txt_param2) {
      return <div></div>;
    }

    const transMark = source.translate
      ? `Translated from ${source.translateLang} by ${source.translateAPI}`
      : "";

    var text = "";
    if (article.translated) {
      text = article.tr_text;
    } else {
      text = article.text;
    }

    const retweet = int2kstring(article.param1);
    const favorite = int2kstring(article.param2);
    // const replies   = int2kstring(article.param3);
    const published = get_timestring(article.published);
    const screen_name = article.txt_param1;
    const reply_decl = article.txt_param2;

    // article author
    const headline = `${article.author} @${screen_name}`;
    const needNewline = headline.length >= 25;
    let author = needNewline
      ? summarize_text(article.author, 24)
      : article.author;
    if (author.length < article.author.length) {
      author += "...";
    }

    // const media = article.extra_data;

    // author image
    let author_image = article.author_image;
    const author_image_thumb = article.author_image_thumb;
    if (author_image_thumb) {
      if (author_image_thumb["64"]) {
        author_image = author_image_thumb["64"];
      } else if (author_image_thumb["128"]) {
        author_image = author_image_thumb["128"];
      } else if (author_image_thumb["org"]) {
        author_image = author_image_thumb["org"];
      }
    }
    const hasAuthorImage = author_image !== "" && author_image !== null;

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

    // link preview
    let preview = null;
    if (
      article.link_preview !== null &&
      article.link_preview.title !== null &&
      article.link_preview.title !== "" &&
      article.link_preview.image !== null &&
      article.link_preview.image !== ""
    ) {
      preview = article.link_preview;
    }

    // threads
    // const threads = article.data;
    // let hasThreads = false;
    // let replyCount = 0;
    // if (threads && threads.length > 0) {
    //   hasThreads = true;
    //   if (threads[0].reply_count)
    //     replyCount = threads[0].reply_count;
    // }

    // retweet info
    const retweet_info = article.extra_data;

    return (
      <div className={classes.root}>
        <Card className={classes.card} style={{ width: width - 16}}>
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
                    />
                  )}
                  {!hasAuthorImage && (
                    <Avatar
                      alt={source.name}
                      src={source.image}
                      className={classes.avatar}
                      classes={{ img: classes.avatar_img }}
                    />
                  )}
                  {/* <img
                  alt={"twitter"}
                  src={`/static/images/icons/${theme_mode}/twitter.png`}
                  className={classes.socialimg}
                /> */}
                </div>
              }
              title={
                <div className={classes.title}>
                  {retweet_info !== null &&
                    retweet_info.retweeted_by !== undefined && (
                      <div>
                        <img
                          alt={"retweet"}
                          src={`/static/images/icons/${theme_mode}/retweet.png`}
                          className={classes.retweetedby_img}
                        />
                        <Typography
                          className={classes.retweetedby_author}
                        >{`Retweeted by ${decodeHTMLEntities(retweet_info.retweeted_by)}`}</Typography>
                      </div>
                    )}
                  <Typography className={classes.name}>{decodeHTMLEntities(author)}</Typography>
                  {needNewline ? (
                    <Typography
                      className={classes.screenname}
                      variant="subtitle2"
                    >
                      @{screen_name}
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.screenname_inline}
                      variant="subtitle2"
                    >
                      @{screen_name}
                    </Typography>
                  )}
                  <Typography className={classes.date}>{published}</Typography>
                </div>
              }
              subheader={
                <div className={classes.subtitle}>
                  {reply_decl !== null && reply_decl.length > 0 && (
                    <Typography
                      className={classes.replydecl}
                      variant="subtitle2"
                    >
                      {decodeHTMLEntities(reply_decl)}
                    </Typography>
                  )}
                </div>
              }
            />
            <CardContent className={classes.content}>
              <div
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "18px",
                  marginLeft: 16,
                }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </CardContent>
            {preview !== null && (
              <LinkPreview preview={preview} />
            )}
            {preview === null && hasImage && (
              <img alt={""} src={article_image} className={classes.media} />
            )}
            <CardActions className={classes.cardactions}>
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
                View original tweet on Twitter
              </Button>
            </Grid>
          </div>
        </Card>
      </div>
    );
  }
}

TwitterView.propTypes = {
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
)(withStyles(styles)(TwitterView));

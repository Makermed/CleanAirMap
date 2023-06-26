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
import {
  get_timestring,
  int2commastring,
  render_text
} from "utility/utils";
import { 
  MIN_CARD_WIDTH, 
  MAX_ARTICLE_WIDTH, 
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
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    width: "100%",
    backgroundColor: theme.palette.background.default,
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
    marginLeft: 30,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 0,
  },
  name: {
    float: "left",
    fontFamily: "Arial",
    fontSize: "18px",
    lineHeight: "22px",
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  screenname: {
    float: "left",
    marginLeft: 16,
  },
  date: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: 40,
    fontSize: "12px",
    lineHeight: "14px",
    color: theme.palette.text.secondary,
  },
  media: {
    display: "block",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    margin: theme.spacing(1),
  },
  content: {
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 10,
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
  reaction: {
    left: "50%",
    transform: "translate(-50%)",
    fontSize: 12,
    textTransform: "none",
    padding: 0,
    marginBottom: 4,
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

class InstagramView extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }


  render() {
    const { 
      classes, 
      theme_mode,
      sources, 
      article 
    } = this.props;

    // validation check
    let source = sources.find((item) => item.id === article.source_id);
    if (!source) {
      console.log("Error, Unknown article source!");
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

    const text_sentences = text.split("\n");
    const sentences = text_sentences.filter(
      (sentence) => sentence.trim().length > 0
    );

    let first_sentence = "";
    let next_sentences = [];
    if (sentences.length > 0) {
      first_sentence = sentences[0];
    }
    if (sentences.length > 1) {
      next_sentences = sentences.slice(1);
    }

    const comments = int2commastring(article.param1);
    const likes = int2commastring(article.param2);
    const published = get_timestring(article.published);

    let article_source_tag = article.txt_param1;
    if (article_source_tag.length > 0 && article_source_tag[0] === "@") {
      article_source_tag = article_source_tag.slice(1);
    }

    let width =
      document.documentElement.clientWidth || document.body.clientWidth;
    if (width > MAX_ARTICLE_WIDTH) width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH) width = MIN_CARD_WIDTH;

    let article_image = article.image;
    const image_thumb = article.image_thumb;
    if (image_thumb) {
      if (width < 320 && image_thumb["240"]) {
        article_image = image_thumb["240"];
      } else if (width < 480 && image_thumb["320"]) {
        article_image = image_thumb["320"];
      } else if (width < 640 && image_thumb["480"]) {
        article_image = image_thumb["480"];
      } else if (width < 800 && image_thumb["640"]) {
        article_image = image_thumb["640"];
      } else if (image_thumb["org"]) {
        article_image = image_thumb["org"];
      }
    }
    const hasImage = article_image !== "" && article_image !== null;

    return (
      <div className={classes.root}>
        <Card className={classes.card} style={{ width: width - 16 }}>
          <div className={classes.carddiv}>
            <CardHeader
              className={classes.header}
              avatar={
                <div>
                  <Avatar
                    alt={"instagram"}
                    src={source.image}
                    className={classes.avatar}
                    classes={{ img: classes.avatar_img }}
                  />
                  {/* <img
                    alt={"instagram"}
                    src={`/static/images/icons/${theme_mode}/instagram.png`}
                    className={classes.socialimg}
                  /> */}
                </div>
              }
              title={
                <div className={classes.title}>
                  <Typography className={classes.name}>
                    {source.name}
                  </Typography>
                  <Typography
                    className={classes.screenname}
                    variant="subtitle1"
                  >
                    @{article_source_tag}
                  </Typography>
                </div>
              }
            />
            <Typography className={classes.date}>{published}</Typography>
            {first_sentence.length > 0 && (
              <CardContent className={classes.content}>
                <Typography className={classes.detail_txt} variant="subtitle1">
                  {render_text(first_sentence, theme_mode === THEME_MODE_DARK)}
                </Typography>
                {/* {this.render_sentence("This https://www.google.com is test https://www.yahoo.com sentence to test http://test.com url.", classes)} */}
              </CardContent>
            )}
            {hasImage && (
              <img alt={""} src={article_image} className={classes.media} />
            )}
            {next_sentences.length > 0 &&
              next_sentences.map((sentence) => (
                <CardContent className={classes.content}>
                  <Typography className={classes.detail_txt} variant="body2">
                    {render_text(sentence, theme_mode === THEME_MODE_DARK)}
                  </Typography>
                </CardContent>
              ))}

            <CardActions>
              <Button
                className={classes.reaction}
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
            View original article on Instagram
          </Button>
        </Grid>
      </div>
    );
  }
}

InstagramView.propTypes = {
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
)(withStyles(styles)(InstagramView));

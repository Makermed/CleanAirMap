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
// import { LinkPreview } from "components";
import { 
  get_timestring, 
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
    backgroundColor: theme.palette.icon,
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
  title: {
  },
  date: {
    float: "right",
    fontSize: 12,
    color: theme.palette.text.secondary,
    marginTop: 2,
    marginRight: 30,
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
  summary: {
    display: "inline",
    overflowWrap: "break-word",
  },
  media: {
    display: "block",
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    margin: 0,
    marginBottom: theme.spacing(2),
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

class WeblinkView extends React.Component {
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

    let source = sources.find((item) => item.id === article.source_id);
    if (!source) {
      console.log("Error, Unknown article source!");
      return <div></div>;
    }

    const transMark = source.translate
      ? `Translated from ${source.translateLang} by ${source.translateAPI}`
      : "";

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

    let published = "";
    if (article.published) {
      published = get_timestring(article.published);
    }

    // // link preview
    // let preview = null;
    // if (article.link_preview && article.link_preview.title &&
    //   article.link_preview.image) {
    //   preview = article.link_preview;
    // }

    // image
    let article_image = article.image;
    const image_thumb = article.image_thumb;
    if (image_thumb) {
      if (image_thumb["org"] !== undefined) {
        article_image = image_thumb["org"];
      }
    }
    const hasImage = article_image !== "" && article_image !== null;

    let width = document.documentElement.clientWidth || document.body.clientWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;

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
                  {/* <img
                    alt={"weblink"}
                    src={`/static/images/icons/${theme_mode}/weblink.png`}
                    className={classes.socialimg}
                  /> */}
                </div>
              }
              title={
                <div className={classes.titleline}>
                  <Typography 
                    className={classes.title} 
                    variant="subtitle1"
                  >
                    {render_text(title, theme_mode === THEME_MODE_DARK)}
                  </Typography>
                  {published !== "" && (
                    <Typography className={classes.date}>
                      {published}
                    </Typography>
                  )}
                </div>
              }
            />
            <CardContent
              className={classes.content}
            >
              <Typography 
                className={classes.summary} 
                variant="body2"
              >
                {render_text(summary, theme_mode === THEME_MODE_DARK)}
              </Typography>
            </CardContent>
            {hasImage && (
              <img
                alt={""}
                src={article_image}
                className={classes.media}
              />
            )}
            {/* {preview !== null && (
            <LinkPreview preview={preview} />
          )} */}
            <CardActions></CardActions>
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

WeblinkView.propTypes = {
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
)(withStyles(styles)(WeblinkView));

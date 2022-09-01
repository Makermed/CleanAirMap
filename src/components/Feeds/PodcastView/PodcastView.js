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
  decodeHTMLEntities, 
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
  titleline: {
    position: "relative",
    marginLeft: 40,
    marginRight: 20,
    margin: 10,
  },
  channeltitle: {
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  title: {
  },
  date: {
    float: "right",
    fontSize: "12px",
    color: theme.palette.text.secondary,
    marginTop: 2,
    marginRight: theme.spacing(2),
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
    width: "60%",
    height: 32,
    marginLeft: "auto",
    marginRight: "auto",
    margin: theme.spacing(1),
  },
  author: {
    fontSize: 12,
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  actionbtn: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: 12,
    marginRight: 5,
    textTransform: "inherit",
    color: theme.palette.text.secondary,
  },
  image: {
    display: "block",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
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

class PodcastView extends React.Component {
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

    // check validity
    let source = sources.find((item) => item.id === article.source_id);
    if (!source) {
      console.log("Error, Unknown article source!");
      return <div></div>;
    }

    const transMark = source.translate ? `Translated from ${source.translateLang} by ${source.translateAPI}` : "";

    var title = "";
    var text = "";
    if (article.translated) {
      title = article.tr_title;
      // omit the last character(.)
      title = title.slice(0, title.length - 1);
      text = article.tr_text;
    } else {
      title = article.title;
      text = article.text;
    }

    // channel title
    const channel_title = article.txt_param1;

    // publish time
    let published = get_timestring(article.published);

    let width = document.documentElement.clientWidth || document.body.clientWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;

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

    // link preview
    if (article.link_preview && article.link_preview.image) {
      article_image = article.link_preview.image;
    }

    return (
      <div className={classes.root}>
        <Card className={classes.card} style={{ width: width - 16 }}>
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
                    alt={"podcast"}
                    src={`/static/images/icons/${theme_mode}/podcast.png`}
                    className={classes.socialimg}
                  /> */}
                </div>
              }
              title={
                <div className={classes.titleline}>
                  <Typography className={classes.channeltitle}>
                    {render_text(channel_title, theme_mode === THEME_MODE_DARK)}
                  </Typography>
                  <Typography className={classes.title} variant="subtitle1">
                    {render_text(title, theme_mode === THEME_MODE_DARK)}
                  </Typography>
                  <Typography className={classes.date}>{published}</Typography>
                </div>
              }
            />
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
            <CardContent className={classes.content}>
              {/* <Typography className={classes.detail_txt} variant="body2">
                {render_text(text, theme_mode === THEME_MODE_DARK)}
              </Typography> */}
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
            {article_image.length > 0 && (
              <img alt={""} src={article_image} className={classes.image} />
            )}
            <CardActions>
              {article.author !== null &&
                <Grid
                  container
                  alignItems="flex-start"
                  justifyContent="flex-end"
                  direction="row"
                >
                  <Typography className={classes.author}>
                    Posted by {decodeHTMLEntities(article.author)}
                  </Typography>
                </Grid>
              }
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
            View original podcast
          </Button>
        </Grid>
      </div>
    );
  }
}

PodcastView.propTypes = {
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
)(withStyles(styles)(PodcastView));

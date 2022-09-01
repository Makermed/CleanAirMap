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
  Grid
} from "@material-ui/core";
import ReactPlayer from "react-player";
import { 
  get_timestring, 
  decodeHTMLEntities, 
  render_text 
} from "utility/utils";
import { Tweet } from "./components";
import { 
  MIN_CARD_WIDTH, 
  MAX_ARTICLE_WIDTH,
  THEME_MODE_DARK 
} from "constants/types";


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  card: {
    position: "relative",
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    width: "100%",
    backgroundColor: theme.palette.background.default
  },
  carddiv: {
    margin: 3,
    marginBottom: theme.spacing(1),
    borderRadius: 10,
    backgroundColor: theme.palette.background.article,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`
  },
  header: {
    padding: 0
  },
  avatar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 32,
    height: 32
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
  titleline: {
    position: "relative",
    marginLeft: 30,
    marginRight: 20,
    margin: 10
  },
  author: {
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 600,
    color: theme.palette.text.primary
  },
  title: {
  },
  date: {
    float: "right",
    fontSize: "12px",
    color: theme.palette.text.secondary,
    marginTop: 4,
    marginBottom: 8,
    marginRight: theme.spacing(2)
  },
  content: {
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 10,
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
  h1: {
    display: "inline",
    fontFamily: "Roboto, sans-serif",
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: "18px",
    color: theme.palette.text.primary
  },
  h2: {
    display: "inline",
    fontFamily: "Roboto, sans-serif",
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: "18px",
    color: theme.palette.text.primary
  },
  h3: {
    display: "inline",
    fontFamily: "Roboto, sans-serif",
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: "18px",
    color: theme.palette.text.primary
  },
  h4: {
    display: "inline",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "16px",
    color: theme.palette.text.primary
  },
  h5: {
    display: "inline",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "16px",
    color: theme.palette.text.primary
  },
  h6: {
    display: "inline",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "16px",
    color: theme.palette.text.primary
  },
  blockquote_div: {
    marginLeft: 8,
    margin: 0
  },
  blockquote: {
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 20,
    marginRight: 10,
    borderLeft: `2px solid ${theme.palette.text.secondary}`,
    marginBottom: 8,
    "&:last-child": {
      paddingBottom: 4
    }
  },
  blockquote_txt: {
    display: "inline",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    lineHeight: "14px",
    color: theme.palette.text.primary
  },
  list: {
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 8,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  list_txt: {
    display: "inline",
    marginBottom: 8,
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    lineHeight: "18px",
    color: theme.palette.text.primary
  },
  tweet_frame: {
    display: "block",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1)
  },
  media: {
    display: "block",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1)
  },
  playerwrapper: {
    position: "relative",
    paddingTop: 0,
    paddingBottom: 12
  },
  reactplayer: {
    top: 0,
    marginLeft: "auto",
    marginRight: "auto"
  },
  reaction: {
    left: "50%",
    transform: "translate(-50%)",
    fontSize: 12,
    textTransform: "none",
    padding: 0,
    marginBottom: 4,
    color: theme.palette.text.primary
  },
  reactionimg: {
    float: "left",
    width: 16,
    height: 16
  },
  reactionvalue: {
    float: "left",
    marginLeft: 4,
    marginRight: 12,
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.text.secondary
  },
  actionbtn: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: 12,
    marginRight: 5,
    textTransform: "inherit",
    color: theme.palette.text.secondary
  },
  actiondiv: {
    marginLeft: 16
  },
  actionimg: {
    float: "left",
    width: 16,
    height: 16
  },
  actionvalue: {
    float: "left",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.text.secondary
  }
});

class SubstackView extends React.Component {
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
    let source = sources.find(item => item.id === article.source_id);
    if (!source) {
      console.log("Error, Unknown article source!");
      return <div></div>;
    }

    // // like count
    // const likes     = int2kstring(article.param1);
    // const comments  = int2kstring(article.param2);

    // author
    let author = article.author;
    if (author === "") {
      author = source.name;
    }

    let width = document.documentElement.clientWidth || document.body.clientWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;

    // video player width
    let videoWidth = width - 22;
    if (videoWidth > 640) {
      videoWidth = 640;
    }
    let videoHeight = (videoWidth * 9) / 16;

    const show_content = () => {
      if (article.data.length === 0) {
        return <div></div>;
      }

      let contents_htmls = article.data.map(content => {
        if ("p" in content) {
          return (
            <CardContent className={classes.content}>
              <Typography className={classes.detail_txt} variant="body2">
                {content.p}
              </Typography>
            </CardContent>
          );
        }
        if ("h1" in content) {
          return (
            <CardContent className={classes.content}>
              <Typography className={classes.h1}>{content.h1}</Typography>
            </CardContent>
          );
        }
        if ("h2" in content) {
          return (
            <CardContent className={classes.content}>
              <Typography className={classes.h2}>{content.h2}</Typography>
            </CardContent>
          );
        }
        if ("h3" in content) {
          return (
            <CardContent className={classes.content}>
              <Typography className={classes.h3}>{content.h3}</Typography>
            </CardContent>
          );
        }
        if ("h4" in content) {
          return (
            <CardContent className={classes.content}>
              <Typography className={classes.h4}>{content.h4}</Typography>
            </CardContent>
          );
        }
        if ("h5" in content) {
          return (
            <CardContent className={classes.content}>
              <Typography className={classes.h5}>{content.h5}</Typography>
            </CardContent>
          );
        }
        if ("h6" in content) {
          return (
            <CardContent className={classes.content}>
              <Typography className={classes.h6}>{content.h6}</Typography>
            </CardContent>
          );
        }
        if ("blockquote" in content) {
          return (
            <div className={classes.blockquote_div}>
              <CardContent className={classes.blockquote}>
                <Typography className={classes.blockquote_txt}>
                  {content.blockquote}
                </Typography>
              </CardContent>
            </div>
          );
        }
        if ("ol" in content) {
          return (
            <CardContent className={classes.list}>
              <div
                className={classes.list_txt}
                dangerouslySetInnerHTML={{ __html: content.ol }}
              />
            </CardContent>
          );
        }
        if ("ul" in content) {
          return (
            <CardContent className={classes.list}>
              <div
                className={classes.list_txt}
                dangerouslySetInnerHTML={{ __html: content.ul }}
              />
            </CardContent>
          );
        }
        if ("image" in content) {
          return <img alt={""} src={content.image} className={classes.media} />;
        }
        if ("youtube" in content) {
          const youtube_url = `https://www.youtube.com/watch?v=${content.youtube.videoId}`;
          return (
            <div className={classes.playerwrapper}>
              <ReactPlayer
                className={classes.reactplayer}
                // controls={true}
                light={article.image}
                width={videoWidth}
                height={videoHeight}
                url={youtube_url}
              />
            </div>
          );
        }
        if ("tweet" in content) {
          return (
            <div className={classes.tweet_frame}>
              <Tweet tweet={content.tweet} />
            </div>
          );
        }
        return <div></div>;
      });

      return contents_htmls;
    };

    // publish time
    let published = get_timestring(article.published);

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
                  alt={"quora"}
                  src={`/static/images/icons/${theme_mode}/quora.png`}
                  className={classes.socialimg}
                /> */}
                </div>
              }
              title={
                <div className={classes.titleline}>
                  <Typography className={classes.author}>
                    {decodeHTMLEntities(article.author)}
                  </Typography>
                  <Typography className={classes.title} variant="subtitle1">
                    {render_text(article.title, theme_mode === THEME_MODE_DARK)}
                  </Typography>
                  <Typography className={classes.date}>{published}</Typography>
                </div>
              }
            />
            {show_content()}
            <CardActions>
              {/* <Button
                className={classes.reaction}
                size="small"
                color="primary"
                target="_blank"
              >
                <div>
                  <img
                    alt={"like"}
                    src={`/static/images/icons/${theme_mode}/like.png`}
                    className={classes.actionimg}
                  />
                  <Typography className={classes.actionvalue}>
                    {likes}
                  </Typography>
                  <img
                    alt={"comment"}
                    src={`/static/images/icons/${theme_mode}/comment.png`}
                    className={classes.actionimg}
                  />
                  <Typography className={classes.actionvalue}>
                    {comments}
                  </Typography>
                </div>
              </Button> */}
            </CardActions>
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
            View original article on Substack
          </Button>
        </Grid>
      </div>
    );
  }
}

SubstackView.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object
};

const mapStateToProps = state => ({
  sources: state.dataState.sources,
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SubstackView));

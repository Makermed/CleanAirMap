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
import { AnswerView } from "./components";
import { 
  get_timestring, 
  int2kstring, 
  decodeHTMLEntities, 
  render_text 
} from "utility/utils";
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
  list_content: {
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 8,
  },
  list_text: {
    display: "inline",
    fontFamily: "Merriweather, serif",
    fontSize: "18px",
    lineHeight: "20px",
    textIndent: "-2em",
    color: theme.palette.text.primary
  },
  media: {
    display: "block",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1)
  },
  answer: {
    margin: theme.spacing(2),
    borderRadius: 10,
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
  }
});

class QuoraView extends React.Component {
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

    // views count
    const shares  = int2kstring(article.param2);
    const upvotes = int2kstring(article.param3);
    const views   = int2kstring(article.param4);

    // author
    let author = article.author;
    if (author === "") {
      author = source.name;
    }

    // avatar image
    let avatarImage = source.image;
    if (article.author_image !== "" && article.author_image !== null) {
      avatarImage = article.author_image;
    }

    const show_content = () => {
      if (article.data.length === 0) {
        return <div></div>;
      }

      if (article.extra_data !== null) {
        return (
          <CardContent className={classes.content}>
            <Typography className={classes.detail_text} variant="body2">
              {render_text(article.data, theme_mode === THEME_MODE_DARK)}
            </Typography>
          </CardContent>
        );
      }

      let ordered_index = 0;
      let contents_htmls = article.data.map(content => {
        if ("plain" in content) {
          ordered_index = 0;
          return (
            <CardContent className={classes.content}>
              <Typography className={classes.detail_txt}>
                {render_text(content.plain, theme_mode === THEME_MODE_DARK)}
              </Typography>
            </CardContent>
          );
        }
        if ("ul" in content) {
          ordered_index = 0;
          return (
            <CardContent className={classes.list_content}>
              <Typography className={classes.list_text}>
                &bull; {render_text(content.ul, theme_mode === THEME_MODE_DARK)}
              </Typography>
            </CardContent>
          );
        }
        if ("ol" in content) {
          ordered_index += 1;
          return (
            <CardContent className={classes.list_content}>
              <Typography className={classes.list_text}>
                {ordered_index}&nbsp;{render_text(content.ol, theme_mode === THEME_MODE_DARK)}
              </Typography>
            </CardContent>
          );
        }
        if ("image" in content) {
          ordered_index = 0;
          return <img alt={""} src={content.image} className={classes.media} />;
        }
        return <div></div>;
      });

      return contents_htmls;
    }

    // publish time
    let published = get_timestring(article.published);

    let width = document.documentElement.clientWidth || document.body.clientWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;

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
                    src={avatarImage}
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
            {article.extra_data !== null && (
              <div className={classes.answer}>
                <AnswerView
                  theme_mode={theme_mode}
                  answer={article.extra_data}
                />
              </div>
            )}
            <CardActions>
              <Button
                className={classes.reaction}
                size="small"
                color="primary"
                target="_blank"
              >
                <div>
                  <img
                    alt={"views"}
                    src={`/static/images/icons/${theme_mode}/views.png`}
                    className={classes.reactionimg}
                  />
                  <Typography className={classes.reactionvalue}>
                    {views}
                  </Typography>
                  <img
                    alt={"upvotes"}
                    src={`/static/images/icons/${theme_mode}/upvotes.png`}
                    className={classes.reactionimg}
                  />
                  <Typography className={classes.reactionvalue}>
                    {upvotes}
                  </Typography>
                  <img
                    alt={"shares"}
                    src={`/static/images/icons/${theme_mode}/shares.png`}
                    className={classes.reactionimg}
                  />
                  <Typography className={classes.reactionvalue}>
                    {shares}
                  </Typography>
                </div>
              </Button>
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
            View original article on Quora
          </Button>
        </Grid>
      </div>
    );
  }
}

QuoraView.propTypes = {
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
)(withStyles(styles)(QuoraView));

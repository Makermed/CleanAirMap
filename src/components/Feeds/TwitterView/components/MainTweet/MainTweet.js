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
  Button
} from "@material-ui/core";
import { get_timestring, int2kstring, decodeHTMLEntities } from "utility/utils";
import { MIN_CARD_WIDTH, MAX_ARTICLE_WIDTH } from "constants/types";


const styles = theme => ({
  card: {
    position: "relative",
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
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
  title: {
    position: "relative",
    marginLeft: 30,
    marginRight: 10,
    margin: 10
  },
  name: {
    display: "inline",
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: theme.palette.text.primary
  },
  screenname: {
    display: "inline",
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "24px",
    color: theme.palette.text.primary
  },
  subtitle: {
    display: "block",
    marginLeft: 40,
    marginRight: 20
  },
  replydecl: {
    float: "left",
    fontFamily: "Arial",
    fontSize: "14px",
    lineHeight: "18px",
    color: theme.palette.text.secondary
  },
  content: {
    paddingTop: 4,
    paddingBottom: 0,
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 8,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  date: {
    fontSize: "12px",
    lineHeight: "14px",
    color: theme.palette.text.secondary
  },
  detail_txt: {
    fontFamily: "Merriweather, serif",
    fontSize: "18px",
    lineHeight: "22px",
    color: theme.palette.text.primary
  },
  media: {
    display: "block",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    // marginBottom: theme.spacing(1),
    borderRadius: 10
  },
  reaction: {
    left: "50%",
    transform: "translate(-50%)",
    fontSize: 12,
    marginBottom: 4,
    color: theme.palette.text.primary
  },
  reactiondiv: {
    marginLeft: 16
  },
  reactionimg: {
    float: "left",
    width: 12,
    height: 12
  },
  reactionvalue: {
    float: "left",
    marginLeft: 5,
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "14px",
    color: theme.palette.text.secondary
  }
});

class MainTweet extends React.Component {
  render() {
    const { classes, article, theme_mode } = this.props;

    // username, screenname
    let user_name = article.author;
    // if (user_name.length > 20) {
    //   user_name = user_name.slice(0, 20) + "...";
    // }
    let screen_name = article.txt_param1;
    // if (screen_name.length > 8) {
    //   screen_name = screen_name.slice(0, 8) + "...";
    // }

    // user image
    let user_image = article.author_image;
    if (!user_image) {
      user_image = "/static/images/avatars/blank_avatar.png";
    }

    const retweet   = int2kstring(article.param1);
    const favorite  = int2kstring(article.param2);
    let replies   = int2kstring(article.param3);
    const published = get_timestring(article.published);
    const reply_decl  = article.txt_param2;
    const media = article.extra_data;
    if (!article.data[0].published) {
      replies = article.data[0].reply_count;
    }

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;
    width = width - 16;

    return (
      <Card className={classes.card} style={{ width: width }}>
        <div className={classes.carddiv}>
          <CardHeader
            className={classes.header}
            avatar={
              <Avatar
                alt={article.name}
                src={user_image}
                className={classes.avatar}
                classes={{ img: classes.avatar_img }}
              />
            }
            title={
              <div className={classes.title}>
                <Typography className={classes.name}>{decodeHTMLEntities(user_name)}</Typography>
                <Typography className={classes.screenname}>
                  @{screen_name}
                </Typography>
              </div>
            }
            subheader={
              <div className={classes.subtitle}>
                {reply_decl !== null && reply_decl.length > 0 && (
                  <Typography className={classes.replydecl}>
                    {decodeHTMLEntities(reply_decl)}
                  </Typography>
                )}
              </div>
            }
          />
          <CardContent className={classes.content}>
            <Typography className={classes.date}>{published}</Typography>
          </CardContent>
          <CardContent className={classes.content}>
            <div
              className={classes.detail_txt}
              dangerouslySetInnerHTML={{ __html: article.text }}
            />
          </CardContent>
          {media !== null && media.length > 0 && (
            <img alt={""} src={media[0]} className={classes.media} />
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
                  alt={"reply"}
                  src={`/static/images/icons/${theme_mode}/reply.png`}
                  className={classes.reactionimg}
                />
                <Typography className={classes.reactionvalue}>
                  {replies}
                </Typography>
              </div>
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
        </div>
      </Card>
    );
  }
}

MainTweet.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object
};

const mapStateToProps = state => ({
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainTweet));

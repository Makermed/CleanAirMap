import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
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
  card: {
    position: "relative",
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
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
    backgroundColor: theme.palette.icon,
  },
  avatar_img: {
    backgroundColor: "transparent",
  },
  socialimg: {
    position: "absolute",
    top: 52,
    left: 12,
    width: 24,
    height: 24,
  },
  titleline: {
    position: "relative",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  title: {
  },
  date: {
    float: "right",
    fontSize: 12,
    color: theme.palette.text.secondary,
    marginTop: 2,
    marginRight: 20,
  },
  content: {
    paddingBottom: 0,
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
    margin: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  detail_txt: {
    display: "inline",
    overflowWrap: "break-word",
  },
  contentauthor: {
    padding: 0,
  },
  author: {
    float: "right",
    fontSize: "12px",
    lineHeight: "12px",
    marginRight: 10,
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

class SlashdotMainCard extends React.Component {
  render() {
    const { 
      classes, 
      theme_mode,
      article, 
      source 
    } = this.props;

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

    var sentences = text.split("\n");
    var author = "Posted by " + article.author;
    var created = get_timestring(article.published);

    // image
    let article_image = article.image;
    const image_thumb = article.image_thumb;
    if (image_thumb) {
      if (image_thumb['org']) {
        article_image = image_thumb['org'];
      }
    }
    const hasImage = (article_image !== "") && (article_image !== null);

    let width = document.documentElement.clientWidth || document.body.clientWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;

    return (
      <Card className={classes.card} style={{ width: width - 16}}>
        <div className={classes.carddiv}>
          <CardHeader
            className={classes.header}
            avatar={
              <div>
                {hasImage && (
                  <Avatar
                    alt={source.name}
                    src={article_image}
                    className={classes.avatar}
                    classes={{ img: classes.avatar_img }}
                  />
                )}
                {!hasImage && (
                  <Avatar
                    alt={source.name}
                    src={source.image}
                    className={classes.avatar}
                    classes={{ img: classes.avatar_img }}
                  />
                )}
                {/* <img
                  alt={"Slashdot"}
                  src="/static/images/icons/slashdot.png"
                  className={classes.socialimg}
                /> */}
              </div>
            }
            title={
              <div className={classes.titleline}>
                <Typography className={classes.title} variant="subtitle1">
                  {render_text(title, theme_mode === THEME_MODE_DARK)}
                </Typography>
                <Typography className={classes.date}>{created}</Typography>
              </div>
            }
          />
          {sentences.map((sentence, index) => (
            <CardContent className={classes.content} key={`sentence-${index}`}>
              <Typography className={classes.detail_txt} variant="body2">
                {render_text(sentence, theme_mode === THEME_MODE_DARK)}
              </Typography>
            </CardContent>
          ))}

          {article.author !== "" && (
            <CardContent className={classes.contentauthor}>
              <Typography className={classes.author}>{decodeHTMLEntities(author)}</Typography>
            </CardContent>
          )}
        </div>
        {article.translated === true && (
          <div className={classes.translated_div}>
            <StarIcon className={classes.traslated_icon} />
            <Typography className={classes.translated_txt}>
              {transMark}
            </Typography>
          </div>
        )}
      </Card>
    );
  }
}

SlashdotMainCard.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  article: PropTypes.object,
  source: PropTypes.object
};

export default withStyles(styles)(SlashdotMainCard);

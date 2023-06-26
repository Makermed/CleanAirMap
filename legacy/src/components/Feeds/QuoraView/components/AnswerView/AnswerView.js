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

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    borderRadius: 10,
    backgroundColor: theme.palette.background.default
  },
  card: {
    position: "relative",
    minWidth: MIN_CARD_WIDTH - 32,
    maxWidth: MAX_ARTICLE_WIDTH - 32,
    backgroundColor: theme.palette.background.default
  },
  carddiv: {
    margin: 3,
    marginBottom: theme.spacing(1),
    borderRadius: 10,
    backgroundColor: theme.palette.background.default,
  },
  header: {
    padding: 0
  },
  avatar: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
    width: 24,
    height: 24
  },
  avatar_img: {
    backgroundColor: "transparent"
  },
  titleline: {
    position: "relative",
    marginLeft: 16,
    marginRight: 10,
    margin: 10
  },
  author: {
    marginLeft: 14,
    marginBottom: theme.spacing(2),
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "16px",
    color: theme.palette.text.primary
  },
  title: {
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    color: theme.palette.text.primary
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
    fontFamily: "Merriweather, serif",
    fontSize: "18px",
    lineHeight: "20px",
    color: theme.palette.text.primary
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
});

class AnswerView extends React.Component {
  render() {
    const { 
      classes, 
      theme_mode,
      answer 
    } = this.props;

    const show_content = () => {
      let ordered_index = 0;
      const contents = answer.content;
      let contents_htmls = contents.map(content => {
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
    let published = get_timestring(answer.published);

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.carddiv}>
            <CardHeader
              className={classes.header}
              avatar={
                <div>
                  <Avatar
                    alt={answer.author_name}
                    src={answer.author_image}
                    className={classes.avatar}
                    classes={{ img: classes.avatar_img }}
                  />
                </div>
              }
              title={
                <div className={classes.titleline}>
                  <Typography className={classes.author}>
                    {`${decodeHTMLEntities(answer.author_name)} - Answered ${published}`}
                  </Typography>
                  <Typography className={classes.title}>
                    {render_text(answer.title, theme_mode === THEME_MODE_DARK)}
                  </Typography>
                </div>
              }
            />
            {show_content()}
          </div>
        </Card>
      </div>
    );
  }
}

AnswerView.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  answer: PropTypes.object
};

export default withStyles(styles)(AnswerView);

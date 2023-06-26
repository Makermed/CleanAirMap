import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Typography 
} from "@material-ui/core";
import { 
  get_timestring, 
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
    minWidth: MIN_CARD_WIDTH - 44,
    maxWidth: MAX_ARTICLE_WIDTH - 44,
    borderRadius: 10,
    marginLeft: 40,
    marginRight: 4,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: theme.palette.background.article,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  header: {
    padding: 0,
  },
  avatar: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    backgroundColor: theme.palette.icon,
  },
  titleline: {
    position: "relative",
    marginLeft: 20,
  },
  title: {
    position: "relative",
    fontSize: 12,
    float: "left",
    margin: 10,
    color: theme.palette.text.primary,
  },
  date: {
    fontSize: 12,
    float: "right",
    marginRight: 20,
    marginTop: 10,
    color: theme.palette.text.secondary,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  detail_txt: {
    display: "inline",
    overflowWrap: "break-word",
  },
});

class RedditReplyCard extends React.Component {

  render() {
    const { 
      classes,
      theme_mode,
      reply
    } = this.props;

    var title = `replied by ${reply.author}`;
    var sentences = reply.body.split("\n");
    var created = get_timestring(reply.created);

    let width = document.documentElement.clientWidth || document.body.clientWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;
    width = width - 16 - 44;

    return (
      <div>
        <Card className={classes.card} style={{ width: width }}>
          <CardHeader
            className={classes.header}
            title={
              <div className={classes.titleline}>
                <Typography className={classes.title}>
                  {render_text(title, theme_mode === THEME_MODE_DARK)}
                </Typography>
                <Typography className={classes.date}>{created}</Typography>
              </div>
            }
          />
          {sentences.map((sentence) => (
            <CardContent className={classes.content}>
              <Typography className={classes.detail_txt} variant="body2">
                {render_text(sentence, theme_mode === THEME_MODE_DARK)}
              </Typography>
            </CardContent>
          ))}
        </Card>
      </div>
    );
  }
}

RedditReplyCard.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  reply: PropTypes.object
};

export default withStyles(styles)(RedditReplyCard);

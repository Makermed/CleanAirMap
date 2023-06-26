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
    minWidth: MIN_CARD_WIDTH - 24,
    maxWidth: MAX_ARTICLE_WIDTH - 24,
    borderRadius: 10,
    marginLeft: 20,
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
    margin: 10,
    marginBottom: 0,
  },
  date: {
    position: "relative",
    float: "right",
    fontSize: 12,
    // float: "right",
    marginTop: 0,
    marginRight: 20,
    margin: 10,
    color: theme.palette.text.secondary,
  },
  content: {
    paddingBottom: 0,
    paddingTop: 0,
    marginBottom: 10,
  },
  detail_txt: {
    display: "inline",
    overflowWrap: "break-word",
  },
  author: {
    display: "inline",
    float: "right",
    fontSize: "12px",
    lineHeight: "12px",
    color: theme.palette.text.secondary,
    marginRight: 10,
    marginBottom: 10,
  },
});

class SlashdotCommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showShareDlg: false,
    };

    this.clickShareButton = this.clickShareButton.bind(this);
    this.handleShareClose = this.handleShareClose.bind(this);
  }

  clickShareButton() {
    this.setState({
      showShareDlg: true,
    });
  }

  handleShareClose() {
    this.setState({
      showShareDlg: false,
    });
  }

  render() {
    const { 
      classes,
      theme_mode, 
      comment
    } = this.props;
    // const { showShareDlg } = this.state;

    var sentences = comment.text.split("\n");
    var author = "Posted by " + comment.author;
    var created = get_timestring(comment.created);

    let width = document.documentElement.clientWidth || document.body.clientWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;
    width = width - 16 - 24;

    return (
      <div>
        <Card className={classes.card} style={{ width: width }}>
          <CardHeader
            className={classes.header}
            // avatar={
            //     <Avatar className={classes.avatar} onClick={this.clickShareButton}>
            //         <ShareIcon />
            //     </Avatar>
            // }
            title={
              <div className={classes.titleline}>
                <Typography className={classes.title} variant="subtitle2">
                  {render_text(comment.title, theme_mode === THEME_MODE_DARK)}
                </Typography>
                <Typography className={classes.date}>{created}</Typography>
              </div>
            }
          />
          {sentences.map((sentence, index) => (
            <CardContent className={classes.content} key={`comment-sentence-${index}`}>
              <Typography className={classes.detail_txt} variant="body2">
                {render_text(sentence, theme_mode === THEME_MODE_DARK)}
              </Typography>
            </CardContent>
          ))}

          {comment.author !== "" && (
            <Typography className={classes.author}>{decodeHTMLEntities(author)}</Typography>
          )}
        </Card>
      </div>
    );
  }
}

SlashdotCommentCard.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  comment: PropTypes.object,
  number: PropTypes.number
};

export default withStyles(styles)(SlashdotCommentCard);

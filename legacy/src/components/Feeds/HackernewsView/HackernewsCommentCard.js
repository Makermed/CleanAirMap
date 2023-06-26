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
    fontSize: 12,
    float: "left",
    margin: 10,
    color: theme.palette.text.primary,
  },
  date: {
    fontSize: 12,
    float: "right",
    marginRight: 24,
    marginTop: 10,
    color: theme.palette.text.secondary,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
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

function get_ordered_number(number) {
  if (number < 0 || number > 9) {
    return null;
  }

  const ordered_number = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
  ];
  return ordered_number[number];
}

class HackernewsCommentCard extends React.Component {
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
      comment, 
      number
    } = this.props;
    // const { showShareDlg } = this.state;

    var ordered_number = get_ordered_number(number);
    var title = ordered_number + " Ranked Response";
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
                <Typography className={classes.title}>{render_text(title, theme_mode === THEME_MODE_DARK)}</Typography>
                <Typography className={classes.date}>{created}</Typography>
              </div>
            }
          />
          {sentences.map((sentence, index) => (
            <CardContent className={classes.content} key={`comment-sentence-${index}`}>
              <Typography className={classes.detail_txt} variant="body2">
                {render_text(sentence)}
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

HackernewsCommentCard.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  comment: PropTypes.object,
  number: PropTypes.number
};

export default withStyles(styles)(HackernewsCommentCard);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { 
  Card, 
  CardHeader, 
  IconButton, 
  CardContent, 
  Typography 
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
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
  card: {
    position: "relative",
    minWidth: MIN_CARD_WIDTH - 32,
    maxWidth: MAX_ARTICLE_WIDTH - 32,
    borderRadius: 10,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.article,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  header: {
    padding: 0,
  },
  share: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    color: theme.palette.info.contrastText,
    backgroundColor: "#7289DA",
    zIndex: 100,
  },
  shareicon: {
    width: 16,
    height: 16,
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
    marginRight: 32,
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

class DiscussRedditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showShareDlg: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickShare = this.handleClickShare.bind(this);
  }

  handleClick = () => {
    const { comment } = this.props;
    window.open(comment.url, "_blank");
  }

  handleClickShare = () => {
    const { comment } = this.props;
    this.props.onShare(comment);
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
    var author = "Posted by " + comment.author;
    var sentences = comment.body.split("\n");
    var created = get_timestring(comment.created);

    let width = window.innerWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;
    width = width - 32;

    return (
      <div>
        <Card className={classes.card} style={{ width: width }}>
          <CardHeader
            className={classes.header}
            onClick={this.handleClick}
            title={
              <div className={classes.titleline}>
                <Typography className={classes.title}>
                  {render_text(title, theme_mode === THEME_MODE_DARK)}
                </Typography>
                <Typography className={classes.date}>{created}</Typography>
              </div>
            }
          />
          <IconButton
            className={classes.share}
            onClick={this.handleClickShare}
          >
            <ShareIcon className={classes.shareicon} />
          </IconButton>
          <div onClick={this.handleClick}>
            {sentences.map((sentence) => (
              <CardContent className={classes.content}>
                <Typography className={classes.detail_txt} variant="body2">
                  {render_text(sentence, theme_mode === THEME_MODE_DARK)}
                </Typography>
              </CardContent>
            ))}
            {comment.author !== "" && (
              <Typography className={classes.author}>{author}</Typography>
            )}
          </div>
        </Card>
      </div>
    );
  }
}

DiscussRedditCard.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  number: PropTypes.number,
  comment: PropTypes.object,
  onShare: PropTypes.func
};

export default withStyles(styles)(DiscussRedditCard);

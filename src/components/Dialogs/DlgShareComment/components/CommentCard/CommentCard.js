import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography
} from "@material-ui/core";
import { MAX_CARD_WIDTH } from "constants/types";
import { summarize_text } from "utility/utils";

const styles = theme => ({
  root: {
    display: "-webkit-box",
    width: MAX_CARD_WIDTH,
    maxWidth: "100%",
    padding: 0,
    margin: 0,
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    cursor: "pointer"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    padding: 0,
    objectFit: "cover",
  },
  text: {
    maxWidth: `calc(100% - 86px)`,
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.primary
  },
  title: {
    fontSize: "14px",
    lineHeight: "18px",
    fontWeight: "bold",
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  },
  description: {
    fontSize: "14px",
    lineHeight: 1,
    color: theme.palette.text.secondary
  },
});


class CommentCard extends React.Component {
  render() {
    const { 
      classes, 
      shareInfo,
    } = this.props;

    let image = null;
    if (shareInfo.image) {
      image = shareInfo.image;
    } else {
      image = "/static/images/placeholder.png";
    }

    return (
      <ListItem className={classes.root} key={shareInfo.url}>
        <ListItemAvatar>
          <img  
            className={classes.image}
            alt="" 
            src={image} 
          />
        </ListItemAvatar>
        <ListItemText
          id={shareInfo.url}
          className={classes.text}
          primary={
            <div>
              <Typography className={classes.title}>
                {shareInfo.title}
              </Typography>
              <Typography className={classes.description}>
                {summarize_text(shareInfo.text, 80)}
              </Typography>
            </div>
          }
        />
      </ListItem>
    );
  }
}

CommentCard.propTypes = {
  classes: PropTypes.object,
  post: PropTypes.object,
};

export default withStyles(styles)(CommentCard);
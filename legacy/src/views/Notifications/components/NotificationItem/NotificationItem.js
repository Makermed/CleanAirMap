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

const styles = theme => ({
  root: {
    display: "-webkit-box",
    width: MAX_CARD_WIDTH,
    maxWidth: "100%",
    padding: 0,
    paddingRight: 60,
    marginTop: theme.spacing(1),
    margin: 0,
    cursor: "pointer"
    // "&:hover": {
    //   backgroundColor: "#232323"
    // }
  },
  badge_div: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1.5),
  },
  badge: {
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
    backgroundColor: "red",
    color: "white",
  },
  avatar: {
    minWidth: 60,
  },
  image: {
    objectFit: "cover",
    height: 60,
    width: 60,
    borderRadius: 5
  },
  typeimg: {
    margin: 0,
    padding: 8,
    width: 60,
    height: 60,
    borderRadius: "50%",
  },
  text: {
    paddingLeft: theme.spacing(2),
    paddingRight: 68,
    color: theme.palette.text.primary
  },
  name: {
    fontSize: "14px",
    color: theme.palette.text.primary
  },
  description: {
    fontSize: "12px",
    lineHeight: 1,
    color: theme.palette.text.secondary
  },
  action: {
    margin: 0,
    padding: 0,
  },
  following: {
    withth: 48,
    height: 48,
  }
});


class NotificationItem extends React.Component {
  render() {
    const { 
      classes, 
      notification,
      onClicked
    } = this.props;

    return (
      <ListItem 
        className={classes.root} 
        key={notification.id} 
        onClick={e => onClicked(notification)}
      >
        <ListItemAvatar className={classes.avatar}>
          {notification.color ? (
            <img
              className={classes.typeimg}
              alt={notification.object}
              src={notification.image}
              style={{backgroundColor: notification.color}}
            />
          ) : (
            <img
              className={classes.image}
              alt={notification.object}
              src={notification.image}
            />
          )}
        </ListItemAvatar>
        <ListItemText
          id={notification.id}
          className={classes.text}
          primary={
            <div className={"item"}>
              <Typography className={classes.name}>
                {notification.text}
              </Typography>
            </div>
          }
        />
      </ListItem>
    );
  }
}

NotificationItem.propTypes = {
  classes: PropTypes.object,
  notification: PropTypes.object,
  theme_mode: PropTypes.string,
  onClicked: PropTypes.func
};

export default withStyles(styles)(NotificationItem);
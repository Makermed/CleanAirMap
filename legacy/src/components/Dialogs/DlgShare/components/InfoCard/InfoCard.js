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
import { get_domainname } from "utility/utils";

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


class InfoCard extends React.Component {
  render() {
    const { 
      classes, 
      info
    } = this.props;

    return (
      <ListItem className={classes.root} key={info.id}>
        <ListItemAvatar>
          <img  
            className={classes.image}
            alt={info.name} 
            src={info.image? info.image : "/static/images/placeholder.png"} 
          />
        </ListItemAvatar>
        <ListItemText
          id={info.id}
          className={classes.text}
          primary={
            <div>
              <Typography className={classes.title}>
                {info.title}
              </Typography>
              <Typography className={classes.description}>
                {get_domainname(info.url)}
              </Typography>
            </div>
          }
        />
      </ListItem>
    );
  }
}

InfoCard.propTypes = {
  classes: PropTypes.object,
  info: PropTypes.object,
};

export default withStyles(styles)(InfoCard);
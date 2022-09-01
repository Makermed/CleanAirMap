import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography
} from "@material-ui/core";
import { MIN_CARD_WIDTH, MAX_CARD_WIDTH } from "constants/types";

const styles = theme => ({
  root: {
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_CARD_WIDTH,
    backgroundColor: theme.palette.background.default
  },
  title: {
    fontSize: "14px",
    fontWeight: 500,
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
  },
  listitem: {
    display: "-webkit-box",
    width: "100%",
    padding: 0,
    paddingRight: 60,
    marginTop: theme.spacing(1),
    margin: 0,
    cursor: "pointer"
    // "&:hover": {
    //   backgroundColor: "#232323"
    // }
  },
  listitem_avatar: {
    minWidth: 60,
  },
  listimage: {
    objectFit: "cover",
    height: 60,
    width: 60,
    borderRadius: 5
  },
  listitem_text: {
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
});

class MyFeedsList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickItem = this.handleClickItem.bind(this);
  }

  handleClickItem = key => () => {
    const { items } = this.props;
    this.props.onItemClicked(items[key]);
  };

  render() {
    const { classes, items, title } = this.props;

    if (!items || items.length === 0) {
      return <div></div>;
    }

    return (
      <div className={classes.root}>
        { (title === undefined || title !== false) &&
          <Typography className={classes.title}>My Feeds</Typography>
        }
        <List>
          {items.map((item, index) => (
            <ListItem className={classes.listitem} key={index}>
              <ListItemAvatar
                className={classes.listitem_avatar}
                onClick={this.handleClickItem(index)}
              >
                <div>
                  <img
                    className={classes.listimage}
                    alt={item.name}
                    src={item.image}
                  />
                </div>
              </ListItemAvatar>
              <ListItemText
                id={index}
                className={classes.listitem_text}
                primary={
                  <div className={"item"}>
                    <Typography className={classes.name}>
                      {item.name}
                    </Typography>
                    <Typography className={classes.description}>
                      {item.description}
                    </Typography>
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

MyFeedsList.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
  title: PropTypes.bool,
  onItemClicked: PropTypes.func
};

export default withStyles(styles)(MyFeedsList);

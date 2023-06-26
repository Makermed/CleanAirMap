import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ImageList, ImageListItem } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    overflowY: "hidden",
    overflowX: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  tile: {
    cursor: 'pointer',
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 4,
    backgroundColor: theme.palette.background.main
  },
});

class ShareFeedsList extends React.Component {
  render() {
    const { classes, feeds, width, onSelected } = this.props;
    if (feeds.length === 0) {
      return <div></div>;
    }

    // IconItem icon size : 80px, IconTextItem icon size : 100px
    const height = 48;

    let cols = width / height;
    if (feeds.length < cols) {
      cols = feeds.length;
    }

    return (
      <div className={classes.root}>
        <ImageList
          className={classes.imageList}
          cols={cols}
          rowHeight={height}
        >
          {feeds.map((feed, index) => (
            <ImageListItem className={classes.tile} key={`feed-${index}`}>
              <img 
                className={classes.image} 
                alt={feed.name}
                src={feed.image}
                onClick={e => onSelected(feed)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }
}

ShareFeedsList.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number,
  feeds: PropTypes.array,
  onSelected: PropTypes.func,
};

export default withStyles(styles)(ShareFeedsList);

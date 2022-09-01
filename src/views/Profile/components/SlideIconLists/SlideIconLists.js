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
    backgroundColor: theme.palette.background.default,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    overflowY: "hidden",
    overflowX: "auto",
    backgroundColor: theme.palette.background.default,
  },
  tile: {
    cursor: 'pointer',
  },
  image: {
    objectFit: "cover",
    height: 44,
    width: 44,
    borderRadius: 8,
    backgroundColor: theme.palette.background.main
  },
});

class SlideIconLists extends React.Component {
  render() {
    const { classes, items, width, onItemSelected } = this.props;
    if (items.length === 0) {
      return <div></div>;
    }

    // IconItem icon size : 80px, IconTextItem icon size : 100px
    const item_width = 48;
    const item_height = 48;

    let cols = width / item_width;
    if (items.length < cols) {
      cols = items.length;
    }

    return (
      <div className={classes.root}>
        <ImageList
          className={classes.imageList}
          cols={cols}
          cellHeight={item_height}
        >
          {items.map((item, index) => (
            <ImageListItem className={classes.tile} key={`slide-item-${index}`}>
              <div onClick={e => onItemSelected(item)}>
                <img className={classes.image} src={item.image} alt={item.name} />
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }
}

SlideIconLists.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
  onItemSelected: PropTypes.func
};

export default withStyles(styles)(SlideIconLists);

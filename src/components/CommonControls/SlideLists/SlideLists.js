import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ImageList, ImageListItem, Badge } from "@material-ui/core";
import { IconItem, IconTextItem } from "components";

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
});

class SlideLists extends React.Component {
  render() {
    const { classes, items, inline_text, width, badged, onItemSelected } = this.props;
    if (items.length === 0) {
      return <div></div>;
    }

    // IconItem icon size : 80px, IconTextItem icon size : 100px
    let item_height = 135;
    let item_width = 88;
    if (badged === undefined || !badged) {
      item_height = inline_text === undefined ? 135 : 108;
      item_width = inline_text === undefined ? 88 : 108;
    } else {
      item_height = inline_text === undefined ? 143 : 116;
      item_width = inline_text === undefined ? 104 : 114;
    }

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
              {inline_text === undefined && badged === undefined && (
                <div onClick={e => onItemSelected(item)}>
                  <IconItem
                    title={item.name}
                    image={item.image}
                    logo={null}
                    selected={true}
                  />
                </div>
              )}
              {inline_text !== undefined && badged === undefined && (
                <div onClick={e => onItemSelected(item)}>
                  <IconTextItem title={item.name} image={item.image} />
                </div>
              )}
              {inline_text === undefined && badged !== undefined && (
                <div
                  onClick={e => onItemSelected(item)}
                  className={classes.badge_div}
                >
                  <Badge
                    classes={{ badge: classes.badge }}
                    badgeContent={item.badgeCount}
                    overlap="rectangular"
                  >
                    <IconItem
                      title={item.name}
                      image={item.image}
                      logo={null}
                      selected={true}
                    />
                  </Badge>
                </div>
              )}
              {inline_text !== undefined && badged !== undefined && (
                <div
                  onClick={e => onItemSelected(item)}
                  className={classes.badge_div}
                >
                  <Badge
                    classes={{ badge: classes.badge }}
                    badgeContent={item.badgeCount}
                    overlap="rectangular"
                  >
                    <IconTextItem title={item.name} image={item.image} />
                  </Badge>
                </div>
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }
}

SlideLists.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number,
  items: PropTypes.array,
  inline_text: PropTypes.any,
  badged: PropTypes.any,
  onItemSelected: PropTypes.func,
};

export default withStyles(styles)(SlideLists);

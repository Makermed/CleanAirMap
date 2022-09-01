import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { 
  ImageList,
  ImageListItem
} from "@material-ui/core";
import { IconItem } from "components";
import { MAX_WINDOW_WIDTH } from "constants/types";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    overflow: "hidden",
    // borderBottom: `2px solid ${theme.palette.text.secondary}`,
    // marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    height: 150,
    overflowY: "hidden",
    overflowX: "auto",
    backgroundColor: theme.palette.background.default
  }
});

class FeedsSlide extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickFeed = this.handleClickFeed.bind(this);
  }

  handleClickFeed = (item) => {
    this.props.onItemSelected(item);
  }

  render() {
    const { classes, items } = this.props;

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    if (width > MAX_WINDOW_WIDTH) {
      width = MAX_WINDOW_WIDTH;
    }
    let cols = width / 88;  // IconItem icon size : 80
    if (cols >= items.length) {
      cols = items.length;
    }

    return (
      <div className={classes.root}>
        <ImageList
          className={classes.imageList}
          cols={cols}
        >
          {items.map((item, index) => (
            <ImageListItem key={`feeds-${index}`} style={{height: 150}}>
              <div onClick={(e) => this.handleClickFeed(item)}>
                <IconItem
                  title={item.name}
                  image={item.image}
                  logo={null}
                  selected={true}
                />
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }
}

FeedsSlide.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
  onItemSelected: PropTypes.func
};

export default withStyles(styles)(FeedsSlide);

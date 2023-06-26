import React from "react";
import PropTypes from "prop-types";
import { MenuList, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  menu_list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  menu_item: {
    padding: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 0,
    minHeight: 24,
    width: 180,
    color: theme.palette.text.primary,
  },
  menu_icon: {
    marginRight: theme.spacing(1),
    height: 24,
    width: 24,
  },
  menu_img: {
    padding: 4,
    height: 24,
    width: 24,
  },
});

class PopMenuMapReading extends React.Component {
  render() {
    const { 
      classes, 
      theme, 
      onReport, 
      onShare 
    } = this.props;

    return (
      <div>
        <MenuList className={classes.menu_list}>
          <MenuItem className={classes.menu_item} onClick={onReport}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"report"}
                src={`/static/images/icons/${theme}/warning.png`}
              />
            </span>
            Report Comment
          </MenuItem>
          <MenuItem className={classes.menu_item} onClick={onShare}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"share"}
                src={`/static/images/icons/${theme}/cshare.png`}
              />
            </span>
            Share Comment
          </MenuItem>
        </MenuList>
      </div>
    );
  }
}

PopMenuMapReading.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  onReport: PropTypes.func,
  onShare: PropTypes.func
};

export default withStyles(styles)(PopMenuMapReading);

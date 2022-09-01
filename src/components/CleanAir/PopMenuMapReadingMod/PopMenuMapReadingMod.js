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

class PopMenuMapReadingMod extends React.Component {
  render() {
    const { 
      classes, 
      theme, 
      onEdit,
      onDelete, 
      onShare,
      onMakeModerator,
      onBanUser
    } = this.props;

    return (
      <div>
        <MenuList className={classes.menu_list}>
          <MenuItem className={classes.menu_item} onClick={onEdit}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"edit"}
                src={`/static/images/icons/${theme}/edit.png`}
              />
            </span>
            Edit Comment
          </MenuItem>
          <MenuItem className={classes.menu_item} onClick={onDelete}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"delete"}
                src={`/static/images/icons/${theme}/delete.png`}
              />
            </span>
            Delete Comment
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
          <MenuItem className={classes.menu_item} onClick={onMakeModerator}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"moderate"}
                src={`/static/images/icons/${theme}/moderator.png`}
              />
            </span>
            Make Moderator
          </MenuItem>
          <MenuItem className={classes.menu_item} onClick={onBanUser}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"ban"}
                src={`/static/images/icons/${theme}/banned-sign.png`}
              />
            </span>
            Ban User
          </MenuItem>
        </MenuList>
      </div>
    );
  }
}

PopMenuMapReadingMod.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onShare: PropTypes.func,
  onMakeModerator: PropTypes.func,
  onBanUser: PropTypes.func
};

export default withStyles(styles)(PopMenuMapReadingMod);

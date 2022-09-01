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

class PopMenuPost extends React.Component {
  render() {
    const { 
      classes, 
      theme, 
      saved, 
      owner,
      onReport, 
      onEdit,
      onCopyLink, 
      onSave, 
      onDeleteSaved 
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
            Report Post
          </MenuItem>
          {owner &&
            <MenuItem className={classes.menu_item} onClick={onEdit}>
              <span className={classes.menu_icon}>
                <img
                  className={classes.menu_img}
                  alt={"edit"}
                  src={`/static/images/icons/${theme}/edit.png`}
                />
              </span>
              Edit Post
            </MenuItem>
          }
          <MenuItem className={classes.menu_item} onClick={onCopyLink}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"copylink"}
                src={`/static/images/icons/${theme}/link.png`}
              />
            </span>
            Copy Link to Post
          </MenuItem>
          {saved &&
            <MenuItem className={classes.menu_item} onClick={onDeleteSaved}>
              <span className={classes.menu_icon}>
                <img
                  className={classes.menu_img}
                  alt={"save"}
                  src={`/static/images/icons/${theme}/bookmark.png`}
                />
              </span>
              Remove from Saved
            </MenuItem>
          }
          {!saved && 
            <MenuItem className={classes.menu_item} onClick={onSave}>
              <span className={classes.menu_icon}>
                <img
                  className={classes.menu_img}
                  alt={"save"}
                  src={`/static/images/icons/${theme}/bookmark.png`}
                />
              </span>
              Save Post
            </MenuItem>
          }
        </MenuList>
      </div>
    );
  }
}

PopMenuPost.propTypes = {
  classes: PropTypes.object,
  saved: PropTypes.bool,
  owner: PropTypes.bool,
  theme: PropTypes.string,
  onReport: PropTypes.func,
  onEdit: PropTypes.func,
  onCopyLink: PropTypes.func,
  onSave: PropTypes.func,
  onDeleteSaved: PropTypes.func
};

export default withStyles(styles)(PopMenuPost);

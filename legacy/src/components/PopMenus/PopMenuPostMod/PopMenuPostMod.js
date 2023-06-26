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

class PopMenuPostMod extends React.Component {
  render() {
    const { 
      classes, 
      theme, 
      pinned, 
      moved,
      saved,
      owner,
      onDelete, 
      onEdit,
      onCopyLink, 
      onComment, 
      onPin, 
      onMoveTop,
      onSave,
      onDeleteSaved
    } = this.props;

    console.log("owner :", owner);

    return (
      <div>
        <MenuList className={classes.menu_list}>
          <MenuItem className={classes.menu_item} onClick={onDelete}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"delete"}
                src={`/static/images/icons/${theme}/warning.png`}
              />
            </span>
            Delete Post
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
          <MenuItem className={classes.menu_item} onClick={onPin}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"pin"}
                src={`/static/images/icons/${theme}/pin.png`}
              />
            </span>
            {pinned ? "Unpin Post" : "Pin Post"}
          </MenuItem>
          <MenuItem className={classes.menu_item} onClick={onComment}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"comment"}
                src={`/static/images/icons/${theme}/chat.png`}
              />
            </span>
            Comment on Post
          </MenuItem>
          {!pinned && (
            <MenuItem className={classes.menu_item} onClick={onMoveTop}>
              <span className={classes.menu_icon}>
                <img
                  className={classes.menu_img}
                  alt={"movetop"}
                  src={moved ? `/static/images/icons/${theme}/down.png` : `/static/images/icons/${theme}/upvotes.png`}
                />
              </span>
              {moved ? "Move Post to Origin" : "Move Post to Top"}
            </MenuItem>
          )}
          {pinned && (
            <MenuItem disabled className={classes.menu_item}>
              <span className={classes.menu_icon}>
                <img
                  className={classes.menu_img}
                  alt={"movetop"}
                  src={`/static/images/icons/${theme}/upvotes.png`}
                />
              </span>
              {moved ? "Move Post to Origin" : "Move Post to Top"}
            </MenuItem>
          )}
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

PopMenuPostMod.propTypes = {
  classes: PropTypes.object,
  moved: PropTypes.bool,
  theme: PropTypes.string,
  owner: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onComment: PropTypes.func,
  onCopyLink: PropTypes.func,
  onPin: PropTypes.func,
  onMoveTop: PropTypes.func,
  onSave: PropTypes.func,
  onDeleteSaved: PropTypes.func
};

export default withStyles(styles)(PopMenuPostMod);

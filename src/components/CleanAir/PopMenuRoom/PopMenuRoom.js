import React from "react";
import PropTypes from "prop-types";
import {
  MenuList,
  MenuItem,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
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
    cursor: "pointer",
  },
});

class PopMenuRoom extends React.Component {
  render() {
    const { classes, rooms, onRoom, onDeleteRoom, onNewRoom } = this.props;

    return (
      <div>
        <MenuList className={classes.menu_list}>
          {rooms.map((room) => (
            <ListItem className={classes.menu_item} key={room.name}>
              <ListItemText onClick={(e) => onRoom(room)}>
                {room.name}
              </ListItemText>
              <ListItemSecondaryAction className={classes.menu_icon}>
                <img
                  className={classes.menu_img}
                  alt={room.name}
                  src={`/static/images/dismiss.png`}
                  onClick={(e) => onDeleteRoom(room)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}

          <MenuItem className={classes.menu_item} onClick={onNewRoom}>
            {"Add New Room"}
          </MenuItem>
        </MenuList>
      </div>
    );
  }
}

PopMenuRoom.propTypes = {
  classes: PropTypes.object,
  rooms: PropTypes.array,
  onRoom: PropTypes.func,
  onDeleteRoom: PropTypes.func,
  onNewRoom: PropTypes.func,
};

export default withStyles(styles)(PopMenuRoom);

import React from "react";
import PropTypes from "prop-types";
import { MenuList, ListItem, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { CONF_ADJUST_ACTIVITIES } from "../../../constants/maplocation";

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
    width: 80,
    color: theme.palette.text.primary,
  },
});

class PopMenuActivity extends React.Component {
  render() {
    const { classes, onActivity } = this.props;

    return (
      <div>
        <MenuList className={classes.menu_list}>
          {CONF_ADJUST_ACTIVITIES.map((activity) => (
            <ListItem className={classes.menu_item} key={activity.label}>
              <ListItemText onClick={(e) => onActivity(activity)}>
                {activity.label}
              </ListItemText>
            </ListItem>
          ))}
        </MenuList>
      </div>
    );
  }
}

PopMenuActivity.propTypes = {
  classes: PropTypes.object,
  onActivity: PropTypes.func,
};

export default withStyles(styles)(PopMenuActivity);

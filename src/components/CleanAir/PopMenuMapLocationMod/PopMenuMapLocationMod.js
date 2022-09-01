import React from "react";
import PropTypes from "prop-types";
import { 
  MenuList, 
  MenuItem,
  Typography,
  Grid
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { get_region_name } from "utility/cleanair";

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

class PopMenuMapLocationMod extends React.Component {
  render() {
    const { 
      classes, 
      theme,
      location,
      region_moderator,
      onEdit,
      onReport, 
      onModerateRegion,
      onResign
    } = this.props;

    // moderation status : 0 => not moderated, 1 => moderated, 2 => pending
    let region_moderation_status = 0;
    if (region_moderator) {
      region_moderation_status = region_moderator.approved ? 1 : 2;
    }

    return (
      <div>
        <MenuList className={classes.menu_list}>
          <MenuItem className={classes.menu_item} onClick={onEdit}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"report"}
                src={`/static/images/icons/${theme}/edit.png`}
              />
            </span>
            Edit Location
          </MenuItem>
          <MenuItem className={classes.menu_item} onClick={onReport}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"report"}
                src={`/static/images/icons/${theme}/warning.png`}
              />
            </span>
            Report Location
          </MenuItem>
          <MenuItem 
            className={classes.menu_item}
            disabled={region_moderation_status !== 0} 
            onClick={region_moderation_status !== 0 ? null : onModerateRegion}
          >
            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
              <Grid item>
                <span className={classes.menu_icon}>
                  <img
                    className={classes.menu_img}
                    alt={"moderate"}
                    src={`/static/images/icons/${theme}/moderator.png`}
                  />
                </span>
              </Grid>
              <Grid item>
                <>
                  {region_moderation_status === 0 && <Typography>Apply to Moderate</Typography>}
                  {region_moderation_status === 1 && <Typography>Already moderated</Typography>}
                  {region_moderation_status === 2 && <Typography>Mod request pending</Typography>}
                  <Typography>{get_region_name(location.region)}</Typography>
                </>
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem className={classes.menu_item} onClick={onResign}>
            <span className={classes.menu_icon}>
              <img
                className={classes.menu_img}
                alt={"resign"}
                src={`/static/images/icons/${theme}/close.png`}
              />
            </span>
            Resign from Moderator
          </MenuItem>
        </MenuList>
      </div>
    );
  }
}

PopMenuMapLocationMod.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  location: PropTypes.object,
  region_moderator: PropTypes.object,
  onEdit: PropTypes.func,
  onReport: PropTypes.func,
  onModerateRegion: PropTypes.func,
  onResign: PropTypes.func
};

export default withStyles(styles)(PopMenuMapLocationMod);

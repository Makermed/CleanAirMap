import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { gen_random_int } from "utility/utils";

const styles = theme => ({
  root: {
    // height: '100%',
    position: "relative",
    width: 100
  },
  grid: {
    justifyContent: "left",
    flexWrap: "inherit",
    margin: 0
  },
  image: {
    objectFit: "cover",
    height: 100,
    width: 100,
    borderRadius: 10
  },
  photo: {
    position: "absolute",
    height: 24,
    width: 24,
    left: 76,
    top: 76,
    backgroundColor: theme.palette.background.default,
    "&:hover": {
      backgroundColor: theme.palette.background.main
    }
  },
  camera: {
    padding: 2,
  },
  input: {
    display: "none"
  }
});

class ImageSelector extends React.Component {
  render() {
    const { classes, title, image, imageHandleChanged } = this.props;

    const input_id = `image-file-${gen_random_int(1000)}`;

    return (
      <div className={classes.root}>
        <Grid container className={classes.grid}>
          <img className={classes.image} src={image} alt={title} />
          <input
            accept="image/*"
            className={classes.input}
            id={input_id}
            onChange={imageHandleChanged}
            type="file"
          />
          <label htmlFor={input_id}>
            <IconButton
              className={classes.photo}
              aria-label="photo"
              size="small"
              component="span"
            >
              <PhotoCameraIcon className={classes.camera} />
            </IconButton>
          </label>
        </Grid>
      </div>
    );
  }
}

ImageSelector.propTypes = {
  classes: PropTypes.object,
  image: PropTypes.string,
  imageHandleChanged: PropTypes.func
};

export default withStyles(styles)(ImageSelector);

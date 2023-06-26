import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  IconButton
} from "@material-ui/core";
import ReactPlayer from 'react-player'

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  closebutton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    padding: 0,
    margin: 0,
    zIndex: 2000
  },
  actionimg: {
    padding: 0,
    width: 32,
    height: 32,
  },
  playerwrapper: {
    position: "relative",
    paddingTop: 0,
    paddingBottom: 0,
  },
  reactplayer: {
    top: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

class DlgVideo extends React.Component {

  render() {
    const { classes, open, video, onClose } = this.props;

    return (
      <Dialog open={open} fullWidth={true} maxWidth="sm">
        <IconButton
          onClick={onClose}
          className={classes.closebutton}
        >
          <img
            className={classes.actionimg}
            alt="cancel"
            src="/static/images/delete.png"
          />
        </IconButton>
        <DialogContent>
          <div className={classes.playerwrapper}>
            <ReactPlayer
              className={classes.reactplayer}
              width="100%"
              height="100%"
              url={video}
              controls = {true}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

DlgVideo.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  video: PropTypes.string,
  onClose: PropTypes.func
};

export default withStyles(styles)(DlgVideo);

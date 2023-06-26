import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
});

class DlgConfirm extends React.Component {
  render() {
    const { open, title, content, onOK, onCancel } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onOK} color="primary" variant="contained">
              OK
            </Button>
            {onCancel !== undefined && (
              <Button
                onClick={onCancel}
                color="primary"
                variant="contained"
                autoFocus
              >
                Cancel
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DlgConfirm.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  onOK: PropTypes.func,
  onCancel: PropTypes.func,
};

export default withStyles(styles)(DlgConfirm);

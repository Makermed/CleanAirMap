import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, DialogContent, Icon } from "@material-ui/core";

const styles = theme => ({
  spinIcon: {
    color: theme.palette.primary.contrastText
  }
});

class WaitingDialog extends React.Component {
  render() {
    const { classes, onClose } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none"
            }
          }}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick' && onClose) {
                onClose(event, reason)
            }
            if (reason !== 'escapeKeyDown' && onClose) {
              onClose(event, reason)
            }
          }}
        >
          <DialogContent>
            <Icon className={classes.spinIcon}>
              <i className="fa fa-spinner fa-spin"></i>
            </Icon>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

WaitingDialog.defaultProps = {
  open: false
};

WaitingDialog.propsType = {
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(WaitingDialog);

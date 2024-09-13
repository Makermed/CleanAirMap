import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import { calculator_html } from "./Calculator_html";

const styles = (theme) => ({
  container: {
    fontFamily: "roboto",
    color: theme.palette.text.primary,
  },
});

class DlgAboutCalculator extends React.Component {
  render() {
    const { classes, open, onClose } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        onClick={onClose}
        scroll="paper"
        aria-labelledby="about-calculator-title"
        aria-describedby="about-calculator-description"
      >
        <DialogTitle id="about-calculator-title">
          <Typography style={{ fontSize: 20, fontWeight: 500 }}>
            Advanced Calculator
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="about-calculator-description" tabIndex={-1}>
            <div
              className={classes.container}
              dangerouslySetInnerHTML={{ __html: calculator_html }}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

DlgAboutCalculator.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default withStyles(styles)(DlgAboutCalculator);

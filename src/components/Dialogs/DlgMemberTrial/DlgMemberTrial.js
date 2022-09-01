import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, Button, Typography } from "@material-ui/core";
import theme from "theme/light";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    minWidth: `calc(100%)`,
  },
  message: {
    display: "flex",
    alignItems: "left",
    marginRight: 160,
    width: 180,
    marginLeft: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  action: {
    position: "absolute",
    right: theme.spacing(3),
    width: 100,
    margin: 0,
    padding: theme.spacing(1),
    color: 'white',
    backgroundColor: "#1873F3",
    borderRadius: 20,
    textTransform: 'none'
  },
});

class DlgMemberTrial extends React.Component {
  render() {
    const { classes, open, onClose, onMemberTrial } = this.props;

    return (
      <div className={classes.root}>
        <Dialog 
          open={open}
          onClose={onClose}
          PaperProps={
            { style: 
              { 
                borderRadius: 0, 
                minWidth: window.innerWidth, 
                padding: theme.spacing(2),
              }
            }
          }
        >
          <Typography className={classes.message}>
            {"Unlock comments by becoming a member"}
          </Typography>
          <Button className={classes.action} onClick={onMemberTrial}>
            {"Free Trial"}
          </Button>
        </Dialog>
      </div>
    );
  }
}

DlgMemberTrial.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onMemberTrial: PropTypes.func
};

DlgMemberTrial.defaultProps = {
};

export default withStyles(styles)(DlgMemberTrial);

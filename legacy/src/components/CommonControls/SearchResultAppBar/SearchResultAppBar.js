import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Fab } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  root: {
    position: "fixed",
    width: theme.breakpoints.values.lg,
    maxWidth: "100%",
    height: "56px",
    zIndex: 1100,
  },
  appbar: {
    position: "absolute",
    // borderBottom: `2px solid ${theme.palette.text.secondary}`
  },
  fab: {
    margin: theme.spacing(1)
  },
  close: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default
  },
  title: {
    flexGrow: 1,
    display: "inline",
    marginLeft: theme.spacing(1),
    fontSize: 16,
    fontWeight: 500,
    color: theme.palette.text.primary
  }
});

class SearchResultAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, title } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              {title}
            </Typography>
            <div className={classes.toolbox} onClick={this.handleClose}>
              <Fab
                aria-label="close"
                size="small"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </Fab>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SearchResultAppBar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  onClose: PropTypes.func
};

export default withStyles(styles)(SearchResultAppBar);

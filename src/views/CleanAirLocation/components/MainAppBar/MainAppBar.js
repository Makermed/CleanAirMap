import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { MAX_WINDOW_WIDTH } from "../../../../constants/types";

const styles = (theme) => ({
  root: {
    position: "fixed",
    width: MAX_WINDOW_WIDTH,
    maxWidth: "100%",
    zIndex: 1200,
  },
  appbar: {
    position: "absolute",
  },
  toolbar: {},
  title: {
    flexGrow: 1,
    position: "relative",
    marginTop: 0,
    fontSize: "18px",
  },
  toolbox: {
    display: "flex",
  },
  navbefore: {
    color: theme.palette.text.primary,
  },
  share: {
    backgroundColor: "#7289DA",
    color: theme.palette.info.contrastText,
    borderRadius: 16,
    width: 32,
    height: 32,
    padding: 4,
    "&:hover": {
      backgroundColor: "#7289DA",
      color: theme.palette.info.contrastText,
    },
  },
  shareicon: {
    width: 24,
    height: 24,
  },
});

class MainAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showShareDlg: false,
    };

    this.handleClickShare = this.handleClickShare.bind(this);
    this.handleCloseShare = this.handleCloseShare.bind(this);
  }

  handleClickShare() {
    this.setState({
      showShareDlg: true,
    });
  }

  handleCloseShare() {
    this.setState({
      showShareDlg: false,
    });
  }

  render() {
    const { classes, title, onNavBack } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              className={classes.navbefore}
              aria-label="nav before"
              onClick={onNavBack}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  share_info: PropTypes.object,
  onNavBack: PropTypes.func,
};

export default withStyles(styles)(MainAppBar);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ShareIcon from "@material-ui/icons/Share";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { DlgShare } from "components";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    position: "fixed",
    width: theme.breakpoints.values.lg,
    maxWidth: "100%",
    zIndex: 1200,
  },
  appbar: {
    position: "absolute",
  },
  toolbar: {
    // borderBottom: `2px solid ${theme.palette.text.secondary}`
  },
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
    }
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
    const {
      classes,
      title,
      share_info,
      onNavBack,
    } = this.props;
    const { showShareDlg } = this.state;

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
            <div className={classes.toolbox}>
              <IconButton
                className={classes.share}
                onClick={this.handleClickShare}
              >
                <ShareIcon className={classes.shareicon} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <DlgShare
          open={showShareDlg}
          shareInfo={share_info}
          onClose={this.handleCloseShare}
        />
      </div>
    );
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  share_info: PropTypes.object,
  onNavBack: PropTypes.func
};

export default withStyles(styles)(MainAppBar);

import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Fade,
  IconButton
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
  image: {
    margin: 0,
    width: 32,
    height: 32,
    borderRadius: 5
  },
  title: {
    flexGrow: 1,
    display: "inline",
    marginLeft: theme.spacing(1),
    fontSize: 16,
    fontWeight: 500,
    color: theme.palette.text.primary
  },
  navbefore: {
    color: theme.palette.text.primary
  }
});

class FeedsAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickBackButton = this.handleClickBackButton.bind(this);
  }

  handleClickBackButton = event => {
    this.props.onClickBackButton();
  };

  render() {
    const { classes, image, title, show } = this.props;

    return (
      <div className={classes.root}>
        <Fade in={show} timeout={{ enter: 500, exit: 1000 }}>
          <AppBar className={classes.appbar}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.navbefore}
                aria-label="nav before"
                onClick={this.handleClickBackButton}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <img alt={title} src={image} className={classes.image} />
              <Typography className={classes.title}>{title}</Typography>
            </Toolbar>
          </AppBar>
        </Fade>
      </div>
    );
  }
}

FeedsAppBar.propTypes = {
  classes: PropTypes.object,
  show: PropTypes.bool,
  image: PropTypes.string,
  title: PropTypes.string,
  onClickBackButton: PropTypes.func
};

const mapStateToProps = state => ({});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(FeedsAppBar)));

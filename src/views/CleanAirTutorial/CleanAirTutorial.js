import React from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import { withFirebase } from 'services';
import { CleanairAppBar } from "components";
import { 
  MAX_ARTICLE_WIDTH,
} from "constants/types";
import * as ROUTES from "constants/routes";


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
  },
  appbar: {
    width: "100%",
    height: "56px",
    [theme.breakpoints.up("sm")]: {
      height: "64px",
    },
    zIndex: 1100,
  },
  content: {
    textAlign: "center",
    margin: theme.spacing(2),
  },
  playerwrapper: {
    position: "relative",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    margin: theme.spacing(1),
  },
  reactplayer: {
    top: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

class CleanAirTutorial extends React.Component {

  constructor(props) {
    super(props);

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleProfileMenu = this.handleProfileMenu.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleNavBack = () => {
    const location = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  };

  handleProfileMenu = (route) => {
    const location = {
      pathname: route,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  };

  handleSignOut = async () => {
    await this.props.firebase.doSignOut();
    await this.props.signOut();
  };

  render() {
    const { 
      classes
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <CleanairAppBar
            tutorial
            onNavBack={this.handleNavBack}
            onProfileMenu={this.handleProfileMenu}
            onSignOut={this.handleSignOut}
          />
        </div>
        <div className={classes.content}>
          <div className={classes.playerwrapper}>
            <ReactPlayer
              className={classes.reactplayer}
              controls={true}
              width="100%"
              height="100%"
              url={"/static/videos/1.mp4"}
            />
          </div>
          <div className={classes.playerwrapper}>
            <ReactPlayer
              className={classes.reactplayer}
              controls={true}
              width="100%"
              height="100%"
              url={"/static/videos/2.mp4"}
            />
          </div>
        </div>
      </div>
    );
  }
}

CleanAirTutorial.propTypes = {
  classes: PropTypes.object
};

export default compose(
  withFirebase,
  withStyles(styles)
)(CleanAirTutorial);

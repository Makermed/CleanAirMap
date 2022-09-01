import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  PodcastPlayCard,
  DlgSharePost,
} from "components";
import * as ROUTES from "constants/routes";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
});

class Podcast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shareDlg: false,
    };

    this.handleShare = this.handleShare.bind(this);
    this.handleCloseShare = this.handleCloseShare.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleShare = () => {
    this.setState({
      ...this.state,
      shareDlg: true,
    });
  };

  handleCloseShare() {
    this.setState({
      ...this.state,
      shareDlg: false,
    });
  }

  handleLogin = () => {
    const location = {
      pathname: ROUTES.SIGN_IN,
      state: { animation: "bottom" },
    };
    this.props.history.push(location);
    this.props.setLoginBackRoute(this.props.location.pathname);
  };

  render() {
    const { 
      classes, 
      article, 
      handleClick, 
      onClickSource, 
      onClickFeed,
      onPlay,
      onPause,
      onEnded
    } = this.props;
    const { 
      shareDlg 
    } = this.state;

    return (
      <div className={classes.root}>
        <PodcastPlayCard
          article={article}
          handleClick={handleClick}
          onClickSource={onClickSource}
          onClickFeed={onClickFeed}
          onShare={this.handleShare}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
        />
        <DlgSharePost
          open={shareDlg}
          post={article}
          onLogin={this.handleLogin}
          onClose={this.handleCloseShare}
        /> 
      </div>
    );
  }
}

Podcast.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object, 
  handleClick: PropTypes.func, 
  handleGroupId: PropTypes.func, 
  onClickSource: PropTypes.func, 
  onClickFeed: PropTypes.func,
  onPlay: PropTypes.func,
  onEnded: PropTypes.func
};

export default withStyles(styles)(Podcast);

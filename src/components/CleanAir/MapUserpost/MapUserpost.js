import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import MapUserpostCard from "../MapUserpostCard";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
});

class MapUserpost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      reportDlg: false,
      loginDlg: false,
      shareDlg: false,
    };
  }

  render() {
    const { classes, article, onClickPost } = this.props;
    const { anchorEl } = this.state;


    // popup menu position
    let menuPos = { top: -1000, left: -1000 };
    if (anchorEl) {
      var rect = anchorEl.getBoundingClientRect();
      menuPos = { top: rect.top, left: rect.left };
    }

    return (
      <div className={classes.root}>
        <MapUserpostCard
          article={article}
          onClickPost={onClickPost}
          onClickUpvote={this.handleClickUpvote}
          onClickComment={this.handleClickComment}
          onClickRepost={this.handleClickRepost}
          onAnchorEl={this.handleAnchorEl}
          onShare={this.handleShare}
        />
      </div>
    );
  }
}

MapUserpost.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  article: PropTypes.object,
};

const mapStateToProps = (state) => ({
  sources: state.dataState.sources,
  selected_feed: state.dataState.selected_feed,
});

export default compose(
  connect(mapStateToProps),
  withRouter,
  withStyles(styles)
)(MapUserpost);

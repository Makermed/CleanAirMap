import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'actions';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
// import TextFieldsIcon from '@material-ui/icons/TextFields';
import ShareIcon from '@material-ui/icons/Share';
import { MAX_ARTICLE_WIDTH } from 'constants/types';


const styles = theme => ({
  root: {
    position: "fixed",
    width: MAX_ARTICLE_WIDTH,
    maxWidth: "100%",
    height: "56px",
    zIndex: 1100,
  },
  appbar: {
    position: "absolute",
    // borderBottom: `2px solid ${theme.palette.text.secondary}`
  },
  title: {
    flexGrow: 1,
    position: 'relative',
    marginTop: 0
  },
  navbefore: {
    color: theme.palette.text.primary,
  },
  toolbox: {
    display: 'flex'
  },
  fab: {
    margin: theme.spacing(1),
  },
  bookmark: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.icon,
    marginRight: 10
  },
  summary: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.icon,
    marginRight: 10
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
    height: 24
  }
});

class ArticleBar extends React.Component {

  render() {
    const {
      classes,
      title,
      onNavBack,
      onShare,
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Toolbar>
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
                onClick={onShare}
              >
                <ShareIcon className={classes.shareicon} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ArticleBar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  onShare: PropTypes.func,
  onNavBack: PropTypes.func
};


const mapStateToProps = (state) => ({
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ArticleBar));

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { 
  Button,
  Grid
} from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "40px"
  },
  grid: {
    justifyContent: "left",
    flexWrap: "inherit",
    marginLeft: theme.spacing(1),
  },
  button: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    margin: 0,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    fontSize: "14px",
    textTransform: "none",
    borderRadius: "10px",
    boxShadow: "none",
    paddingLeft: 8,
    paddingRight: 8,
    padding: 2,
    fontWeight: 600,
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: "none",
    },
    "&:active": {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: "none",
    },
  },
  iconImg: {
    height: "auto",
    width: 14,
    marginRight: theme.spacing(0.5),
    color: theme.palette.text.primary
  },
  podcastImg: {
    height: "auto",
    width: 14,
    color: theme.palette.text.primary
  },
});

class HeaderActionBar extends React.Component {
  render() {
    const { classes, theme_mode, hasPodcasts } = this.props;
    const feedImage = `/static/images/icons/${theme_mode}/members.png`;

    return (
      <div className={classes.root}>
        <Grid container className={classes.grid}>
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            onClick={this.props.onClickYourLists}
          >
            <img className={classes.iconImg} src={feedImage} alt="My Feeds" />
            My&nbsp;Feeds
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            onClick={this.props.onClickDiscover}
          >
            <img
              className={classes.iconImg}
              src={`/static/images/icons/${theme_mode}/discover.png`}
              alt="Discover"
            />
            Discover
          </Button>
          <Button 
            className={classes.button} 
            variant="contained" 
            size="small"
            style={{minWidth: 32}}
            onClick={this.props.onClickCreate}
          >
            <img
              className={classes.podcastImg}
              src={`/static/images/icons/${theme_mode}/plus.png`}
              alt="Create"
            />
          </Button>
          <Button 
            className={classes.button} 
            variant="contained" 
            size="small"
            style={{minWidth: 32}}
            onClick={this.props.onClickComments}
          >
            <img
              className={classes.podcastImg}
              src={`/static/images/icons/${theme_mode}/comments_all.png`}
              alt="Comments"
            />
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            style={{minWidth: 32}}
            disabled={!hasPodcasts}
            onClick={this.props.onClickPodcasts}
          >
            <img
              className={classes.podcastImg}
              src={`/static/images/icons/${theme_mode}/podcast.png`}
              alt="Podcasts"
            />
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            style={{minWidth: 32}}
            onClick={this.props.onClickCleanAir}
          >
            <img
              className={classes.podcastImg}
              src={`/static/images/icons/${theme_mode}/cleanair.png`}
              alt="Cleanair Map"
            />
          </Button>
        </Grid>
      </div>
    );
  }
}

HeaderActionBar.propTypes = {
  classes: PropTypes.object,
  hasPodcasts: PropTypes.bool,
  onClickYourLists: PropTypes.func,
  onClickDiscover: PropTypes.func,
  onClickCreate: PropTypes.func,
  onClickComments: PropTypes.func,
  onClickPodcasts: PropTypes.func,
  onClickCleanAir: PropTypes.func
};

const mapStateToProps = state => ({
  theme_mode: state.uiState.theme_mode
});

export default connect(mapStateToProps)(withStyles(styles)(HeaderActionBar));

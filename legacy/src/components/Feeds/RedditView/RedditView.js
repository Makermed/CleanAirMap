import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import RedditMainCard from "./RedditMainCard";
import RedditCommentCard from "./RedditCommentCard";
import { MIN_CARD_WIDTH, MAX_ARTICLE_WIDTH } from "constants/types";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    width: "100%",
    backgroundColor: theme.palette.background.default
  },
  actionbtn: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: 12,
    marginRight: 5,
    textTransform: "inherit",
    color: theme.palette.text.secondary
  }
});

class RedditView extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { 
      classes, 
      theme_mode,
      article, 
      source 
    } = this.props;

    const comments = article.data;

    return (
      <div className={classes.root}>
        <RedditMainCard
          theme_mode={theme_mode}
          article={article} 
          source={source} 
        />
        {comments &&
          comments.map((comment, index) => (
            <RedditCommentCard 
              key={index}
              theme_mode={theme_mode}
              comment={comment} 
              number={index} 
            />
          ))}
        <Grid
          container
          alignItems="flex-start"
          justifyContent="flex-end"
          direction="row"
        >
          <Button
            className={classes.actionbtn}
            size="small"
            color="primary"
            target="_blank"
            href={article.url}
          >
            Read original thread on Reddit
          </Button>
        </Grid>
      </div>
    );
  }
}

RedditView.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object
};

const mapStateToProps = state => ({
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RedditView));

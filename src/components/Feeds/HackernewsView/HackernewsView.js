import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import HackernewsMainCard from "./HackernewsMainCard";
import HackernewsCommentCard from "./HackernewsCommentCard";
import { Button, Grid } from "@material-ui/core";
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
    marginTop: 0,
    marginRight: 5,
    textTransform: "inherit",
    color: theme.palette.text.secondary
  }
});

class HackernewsView extends React.Component {
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

    return (
      <div className={classes.root}>
        <HackernewsMainCard
          theme_mode={theme_mode}
          article={article} 
          source={source} 
        />
        {article.data &&
          article.data.map((comment, index) => (
            <HackernewsCommentCard
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
            Read original thread on Hackernews
          </Button>
        </Grid>
      </div>
    );
  }
}

HackernewsView.propTypes = {
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
)(withStyles(styles)(HackernewsView));

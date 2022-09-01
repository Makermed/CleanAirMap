import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { MainTweet, Tweet } from "./components";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
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

class TwitterView extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes, article } = this.props;

    const render_tweets = () => {
      if (!article.data) {
        return <div></div>;
      }

      const article_user = article.txt_param1;
      let tweets = article.data;
      let old_version = false;

      for (let i = 0; i < tweets.length - 1; i++) {
        let tweet = tweets[i];
        let next_tweet = tweets[i + 1];
        if (!tweet.published) {
          if (tweet.reply_to.includes(article_user)) {
            tweet.link_next = false;
          } else {
            tweet.link_next = true;
          }
        } else {
          if (tweet.user_id === next_tweet.reply_to) {
            tweet.link_next = true;
          } else {
            tweet.link_next = false;
          }
          old_version = true;
        }
      }

      let sorted_tweets = tweets;
      if (old_version) {
        sorted_tweets = tweets.sort(
          (a, b) => a.published - b.published
        );
      }

      let threads = sorted_tweets.map((tweet, index) => {
        if (old_version) {
          if (tweet.published === 0) {
            // this is a main tweet
            return <MainTweet article={article} />;
          } else {
            return <Tweet tweet={tweet} />;
          }
        } else {
          if (index === 0) {
            return <MainTweet article={article} />;
          } else {
            return <Tweet tweet={tweet} />;
          }
        }
      });
      return threads;
    };

    return (
      <div className={classes.root}>
        {render_tweets()}
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
            Read original thread on Twitter
          </Button>
        </Grid>
      </div>
    );
  }
}

TwitterView.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object
};

const mapStateToProps = state => ({});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TwitterView));

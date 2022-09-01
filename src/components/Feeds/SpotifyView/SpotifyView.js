import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { PlaylistDetail, Track } from "./components";
import { MIN_CARD_WIDTH, MAX_ARTICLE_WIDTH } from "constants/types";


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default
  },
  category: {
    marginBottom: theme.spacing(2)
  },
  tracks: {},
  track: {
    marginBottom: theme.spacing(1)
  }
});

class SpotifyView extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes, article, sources } = this.props;

    // validation check
    let source = sources.find(item => item.id === article.source_id);
    if (!source) {
      console.log("Error, Unknown article source!");
      return <div></div>;
    }

    var title = "";
    var text = "";
    if (article.translated) {
      title = article.tr_title;
      // omit the last character(.)
      title = title.slice(0, title.length - 1);
      text = article.tr_text;
    } else {
      title = article.title;
      text = article.text;
    }

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    width -= 16;
    if (width > MAX_ARTICLE_WIDTH - 16)
      width = MAX_ARTICLE_WIDTH - 16;
    if (width < MIN_CARD_WIDTH - 16)
      width = MIN_CARD_WIDTH - 16;

    // image
    let article_image = article.image;
    const image_thumb = article.image_thumb;
    if (image_thumb) {
      if (width < 320 && image_thumb['240']) {
        article_image = image_thumb['240'];
      } else if (width < 480 && image_thumb['320']) {
        article_image = image_thumb['320'];
      } else if (width < 640 && image_thumb['480']) {
        article_image = image_thumb['480'];
      } else if (width < 800 && image_thumb['640']) {
        article_image = image_thumb['640'];
      } else if (image_thumb['org']) {
        article_image = image_thumb['org'];
      }
    }

    return (
      <div className={classes.root}>
        <div className={classes.category}>
          <PlaylistDetail
            title={title}
            description={text}
            image={article_image}
          />
        </div>
        <div className={classes.tracks}>
          {article.data.length > 0 &&
            article.data.map((track, index) => (
              <div className={classes.track} key={`track-${index}`}>
                <Track track={track} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

SpotifyView.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object
};

const mapStateToProps = state => ({
  sources: state.dataState.sources
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SpotifyView);

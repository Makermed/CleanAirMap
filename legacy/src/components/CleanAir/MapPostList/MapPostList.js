import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem } from "@material-ui/core";
import { MapPost } from "components";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  listitem: {
    padding: 0
  }
});

class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.scrollFn = this.listenToScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollFn);
    window.scrollTo(this.props.scrollPos.x, this.props.scrollPos.y);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollFn);
  }

  handleClick = article => {
    this.props.saveScrollPos(window.scrollX, window.scrollY);
    this.props.onSelectMapPost(article);
  };

  listenToScroll = (event) => {
    event.preventDefault();

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight - window.innerHeight;
    if (height === 0) {
      return;
    }

    const scrolled = winScroll * 1.0 / height;

    this.props.saveScrollPos(window.scrollX, window.scrollY);
    if (scrolled === 1.0 || scrolled >= 0.99) {
      this.props.saveScrollPos(window.scrollX, window.scrollY);
      this.props.onNeedMore();
    }
  };

  render() {
    const { 
      classes,
      loggedIn,
      saved,
      articles, 
      selected_location,
      theme_mode, 
      onReport,
      onSave,
      onDeleteSaved,
      onNeedLogin,
    } = this.props;

    if (articles.length === 0) {
      return <div></div>;
    }

    return (
      <div className={classes.root}>
        <List component="map-post-list" aria-label="map post list">
          {articles.map(article => (
            <ListItem className={classes.listitem} key={article.nid}>
              <MapPost
                saved={saved !== undefined}
                article={article}
                selected_location={selected_location}
                theme={theme_mode}
                loggedIn={loggedIn}
                onReport={onReport}
                onSave={onSave}
                onDeleteSaved={onDeleteSaved}
                onLogin={onNeedLogin}
                handleClick={this.handleClick}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

PostList.propTypes = {
  classes: PropTypes.object,
  saved: PropTypes.bool,
  articles: PropTypes.array,
  onNeedMore: PropTypes.func,
  onLogin: PropTypes.func,
  onReport: PropTypes.func,
  onSave: PropTypes.func,
  onDeleteSaved: PropTypes.func,
  onSelectMapPost: PropTypes.func
};


const mapStateToProps = state => ({
  loggedIn: state.sessionState.loggedIn,
  scrollPos: state.uiState.scrollPos,
  theme_mode: state.uiState.theme_mode,
  selected_location: state.mapState.selected_location
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(PostList);

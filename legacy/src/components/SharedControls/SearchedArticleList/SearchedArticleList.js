import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem } from "@material-ui/core";
import { Article } from "components";

const styles = theme => ({
  root: {
    width: "100%",
    // maxWidth: 480,
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  listitem: {
    padding: 0,
    margin: 0
  }
});

class SearchedArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // window.addEventListener("scroll", this.listenToScroll);
    window.scrollTo(this.props.searchScrollPos.x, this.props.searchScrollPos.y);
  }

  componentDidUpdate() {
    window.scrollTo(this.props.searchScrollPos.x, this.props.searchScrollPos.y);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenToScroll);
  }

  handleClick = article => () => {
    this.props.saveSearchScrollPos(window.scrollX, window.scrollY);
    this.props.onSelectArticle(article);
  };

  handleGroupId = nid => () => {
  };

  render() {
    const { 
      classes, 
      loggedIn,
      authUser,
      articles, 
      theme_mode, 
      onReport,
      onEdit,
      onLogin 
    } = this.props;

    if (articles.length === 0) {
      return (<div></div>);
    }

    return (
      <div className={classes.root}>
        <List component="article-list" aria-label="article list">
          {articles.map(article => (
            <ListItem className={classes.listitem} key={article.nid}>
              <Article
                article={article}
                theme={theme_mode}
                loggedIn={loggedIn}
                authUser={authUser}
                onReport={onReport}
                onEdit={onEdit}
                onLogin={onLogin}
                handleClick={this.handleClick}
                handleGroupId={this.handleGroupId}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

SearchedArticleList.propTypes = {
  classes: PropTypes.object,
  articles: PropTypes.array, 
  onReport: PropTypes.func, 
  onEdit: PropTypes.func,
  onLogin: PropTypes.func
};

const mapStateToProps = state => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  searchScrollPos: state.uiState.searchScrollPos,
  theme_mode: state.uiState.theme_mode,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SearchedArticleList);

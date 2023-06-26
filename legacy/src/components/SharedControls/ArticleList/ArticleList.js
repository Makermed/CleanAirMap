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
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  listitem: {
    padding: 0
  }
});

class ArticleList extends React.Component {
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
    this.props.onSelectArticle(article);
  };

  handleGroupId = nid => {
    this.props.saveScrollPos(window.scrollX, window.scrollY);
    this.props.onSelectGroupArticle(nid);
  };

  listenToScroll = (event) => {
    event.preventDefault();

    const { bottomNavbar, topNavbar } = this.props;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight - window.innerHeight;
    if (height === 0) {
      return;
    }

    const scrolled = winScroll * 1.0 / height;

    // console.log("listenToScroll saveScrollPos");
    this.props.saveScrollPos(window.scrollX, window.scrollY);
    if (scrolled === 0.0) {
      // this.props.saveScrollPos(window.scrollX, window.scrollY);
      this.props.showTopNavbar(true);
    } else if (scrolled === 1.0 || scrolled >= 0.99) {
      // this.props.saveScrollPos(window.scrollX, height);
      this.props.saveScrollPos(window.scrollX, window.scrollY);
      this.props.onNeedMore();
    // } else if (winScroll > 30) {
    } else {
      if (topNavbar) {
        this.props.showTopNavbar(false);
      }
      if (!bottomNavbar) {
        this.props.showBottomNavbar(true);
      }
    }
  };

  render() {
    const { 
      classes,
      theme_mode, 
      loggedIn,
      authUser,
      saved,
      articles, 
      pins, 
      movetops, 
      onReport,
      onEdit,
      onSave,
      onDeleteSaved,
      onNeedLogin,
      onClickSource,
      onClickFeed
    } = this.props;

    if (articles.length === 0) {
      return <div></div>;
    }

    const pin_articles = pins.map(pin => {
      const article = pin.article;
      article.pinned = true;
      return article;
    });
    const movetop_articles = movetops.map(movetop => {
      const article = movetop.article;
      article.moved = true;
      return article;
    });
    const top_articles = pin_articles.concat(movetop_articles);
    const articles2show = top_articles.concat(articles);

    return (
      <div className={classes.root}>
        <List component="article-list" aria-label="article list">
          {articles2show.map(article => (
            <ListItem className={classes.listitem} key={article.nid}>
              <Article
                theme={theme_mode}
                loggedIn={loggedIn}
                authUser={authUser}
                article={article}
                saved={saved !== undefined}
                onReport={onReport}
                onEdit={onEdit}
                onSave={onSave}
                onDeleteSaved={onDeleteSaved}
                onLogin={onNeedLogin}
                handleClick={this.handleClick}
                handleGroupId={this.handleGroupId}
                onClickSource={onClickSource}
                onClickFeed={onClickFeed}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

ArticleList.propTypes = {
  classes: PropTypes.object,
  saved: PropTypes.bool,
  articles: PropTypes.array,
  pins: PropTypes.array,
  movetops: PropTypes.array,
  onNeedMore: PropTypes.func,
  onLogin: PropTypes.func,
  onReport: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  onDeleteSaved: PropTypes.func,
  onSelectArticle: PropTypes.func,
  onSelectGroupArticle: PropTypes.func,
  onClickSource: PropTypes.func,
  onClickFeed: PropTypes.func
};


const mapStateToProps = state => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  scrollPos: state.uiState.scrollPos,
  bottomNavbar: state.uiState.bottomNavbar,
  topNavbar: state.uiState.topNavbar,
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ArticleList);

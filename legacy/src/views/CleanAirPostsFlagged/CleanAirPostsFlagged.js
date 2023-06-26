import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { withFirebase } from 'services';
import { withAuthentication, withAuthorization } from "session";
import { BasicAppBar, ArticleMod, Report, WaitingDialog } from "components";
import { GraphqlService } from "services";
import * as ROUTES from "constants/routes";
import { ARTICLE_BRANCH_NEWSPAPER } from "constants/branches";
import { ACTIVITY_TYPE_FEED, ACTIVITY_DELETE } from "constants/activity";
import { MAX_ARTICLE_WIDTH } from "constants/types";
import { FeedsController } from "controllers";
import { ToastError } from "utility/toast";


const condition = (authUser) => !!authUser && authUser.uid !== "";


const styles = (theme) => ({
  root: {
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
  },
  appbar: {
    width: "100%",
    height: "56px",
    [theme.breakpoints.up('sm')]: {
      height: "64px",
    },
  },
  container: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  report: {
    marginLeft: theme.spacing(4),
    margin: theme.spacing(1),
  },
});

class CleanAirPostsFlagged extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagged: []
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleDeleteReport = this.handleDeleteReport.bind(this);
    this.handleDismissReport = this.handleDismissReport.bind(this);
    this.handleClickReporter = this.handleClickReporter.bind(this);

    this.handleSelectArticle = this.handleSelectArticle.bind(this);
    this.handleSelectGroupArticle = this.handleSelectGroupArticle.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleCommentPost = this.handleCommentPost.bind(this);
    this.handlePinPost = this.handlePinPost.bind(this);
    this.handleMoveTopPost = this.handleMoveTopPost.bind(this);
  }

  setError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();
  };

  componentDidMount() {
    const { selected_feed } = this.props;

    let flagged_posts = [];
    for (let report of selected_feed.post_reports) {
      let flagged_post = flagged_posts.find((post) => post.nid === report.article.nid);
      if (flagged_post === undefined) {
        flagged_post = report.article;
        flagged_post.reports = [report];
        flagged_posts.push(flagged_post);
      } else {
        flagged_post.reports.push(report);
      }
    }

    this.setState({
      ...this.state,
      flagged: flagged_posts,
    });
  }

  _getAuthToken = async () => {
    const { authUser } = this.props;
    let token = authUser.token;
    if (Date.now() >= authUser.expiredTS) {
      const result = await this.props.firebase.refreshToken();
      if (result.error) {
        this.setError(result.msg);
        token = null;
      } else {
        token = result.token;
      }
    }
    return token;
  };

  handleLogin = () => {
    const location = {
      pathname: ROUTES.SIGN_IN,
      state: { animation: "bottom" },
    };
    this.props.history.push(location);
  };

  handleNavBack = () => {
    this.props.history.goBack();
  }

  getPost = (report_id) => {
    const { flagged } = this.state;

    for (let post of flagged) {
      for (let post_report of post.reports) {
        if (report_id === post_report.id) {
          return {...post};
        }
      }
    }
    return null;
  }

  // updateReport = (report) => {
  //   const { flagged } = this.state;

  //   let new_flagged = flagged.slice();
  //   for (let post of new_flagged) {
  //     for (let post_report of post.reports) {
  //       if (report.id === post_report.id) {
  //         post_report = report;
  //       }
  //     }
  //   }

  //   this.setState({
  //     ...this.state,
  //     flagged: new_flagged
  //   });
  // }

  deleteReport = (report_id) => {
    const { flagged } = this.state;

    const flagged_posts = [];
    for (let post of flagged) {
      let reports = post.reports.filter(report => report.id !== report_id);
      if (reports.length > 0) {
        post.reports = reports;
        flagged_posts.push(post);
      }
    }

    this.setState({
      ...this.state,
      flagged: flagged_posts
    });
  }

  deleteReports = (post_id) => {
    const { flagged } = this.state;

    const flagged_posts = flagged.filter(post => post.nid !== post_id);
    this.setState({
      ...this.state,
      flagged: flagged_posts
    });
  }

  updateFeedNotifications = async (token) => {
    const { selected_feed } = this.props;
    const feedsController = new FeedsController();
    await feedsController.update_feed_notifications(selected_feed, token);
  }

  handleDeleteReport = async (report) => {
    const { authUser, selected_feed } = this.props;

    const post = this.getPost(report.id);
    if (!post) {
      return;
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.props.requestDataPending();

    await gqlservice.delete_article(post.nid)
      .then(result => {
        this.deleteReports(post.nid);
        this.props.deleteArticle(post.nid);
      }, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_FEED,
      type_id: selected_feed.id,
      action: ACTIVITY_DELETE,
      object: `the post ${post.title}`,
      fromto: `of the feed ${selected_feed.name}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    await this.updateFeedNotifications(token);

    this.props.requestDataFinished();
  }

  handleDismissReport = async (report) => {
    const { authUser, selected_feed } = this.props;

    const post = this.getPost(report.id);
    if (!post) {
      return;
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    await gqlservice.set_auth_jwt(token, true);

    this.props.requestDataPending();

    await gqlservice.delete_article_report(report.id)
      .then(result => {
        this.deleteReport(report.id);
      }, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_FEED,
      type_id: selected_feed.id,
      action: ACTIVITY_DELETE,
      object: `the report of post ${post.title}`,
      fromto: `from the feed ${selected_feed.name}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      }); 
      
    await this.updateFeedNotifications(token);

    this.props.requestDataFinished();
  }

  handleClickReporter = (report) => {
    const user_id = report.reported_user.uid;
    const path = `/${ROUTES.USER_PREFIX}/${user_id}`;
    const location = {
      pathname: path,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  }

  handleSelectArticle = article => {
    this.props.selectArticle(article);

    const { selected_feed } = this.props;
    let path = `/${ROUTES.FEEDS_PREFIX}/${selected_feed.slug}/${ROUTES.SOURCE_PREFIX}/${article.source_id}`;
    if (article.branch === ARTICLE_BRANCH_NEWSPAPER) {
      path += `/${ROUTES.ARTICLE_NEWS_PREFIX}/${article.nid}`;
    } else {
      path += `/${ROUTES.ARTICLE_PREFIX}/${article.nid}`;
    }

    const location = {
      pathname: path,
      state: { animation: "left" },
    };
    this.props.history.push(location);
    const curUrl = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.FEEDS_PREFIX}/${selected_feed.slug}/flaggedposts`;
    this.props.setArticleBackRoute(curUrl);
  };

  handleSelectGroupArticle = nid => {
    const { selected_feed } = this.props;

    const gqlservice = new GraphqlService();
    gqlservice
      .article_by_nid(nid)
      .then(
        result => {
          const articles = result.data;
          if (articles.length > 0) {
            this.props.selectArticle(articles[0]);
            const location = {
              pathname: `/${ROUTES.ARTICLE_NEWS_PREFIX}/${nid}`,
              state: { animation: "left" },
            };
            this.props.history.push(location);
            const curUrl = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.FEEDS_PREFIX}/${selected_feed.slug}/flaggedposts`;
            this.props.setArticleBackRoute(curUrl);
          }
        },
        reason => {
          this.setError(reason.msg);
        }
      )
      .catch(err => {
        this.setError(JSON.stringify(err));
      });
  };  

  handleDeletePost = async (article) => {
    const { authUser, selected_feed } = this.props;
    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.props.requestDataPending();

    await gqlservice.delete_article(article.nid)
      .then(result => {
        this.props.deleteArticle(article.nid);
      }, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });
    
    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_FEED,
      type_id: selected_feed.id,
      action: ACTIVITY_DELETE,
      object: `the post ${article.title}`,
      fromto: `from the feed ${selected_feed.name}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      }); 

    await this.updateFeedNotifications(token);

    this.props.requestDataFinished();
  }

  handleCommentPost = (article, commentMsg) => {

  }

  handlePinPost = (article) => {

  }

  handleMoveTopPost = (article) => {

  }

  render() {
    const { classes, theme_mode, requesting } = this.props;
    const { flagged } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            title={"Flagged Posts by Users"}
            onNavBack={this.handleNavBack}
          />
        </div>
        <Grid container className={classes.container}>
          {flagged.map((post, index) => (
            <div key={index}>
              <Grid item key={`post-${index}`}>
                <ArticleMod
                  article={post} 
                  theme={theme_mode} 
                  onSelectArticle={this.handleSelectArticle}
                  onSelectGroupArticle={this.handleSelectGroupArticle}
                  onDelete={this.handleDeletePost}
                  onComment={this.handleCommentPost}
                  onPin={this.handlePinPost}
                  onMoveTop={this.handleMoveTopPost}
                />
              </Grid>
              <div>
                {post.reports.map((report, rindex) => (
                  <Grid
                    item
                    key={`post-${index}-report-${rindex}`}
                    className={classes.report}
                  >
                    <Report
                      report={report}
                      theme_mode={theme_mode}
                      onDelete={this.handleDeleteReport}
                      onDismiss={this.handleDismissReport}
                      onClickReporter={this.handleClickReporter}
                    />
                  </Grid>
                ))}
              </div>
            </div>
          ))}
        </Grid>
        <WaitingDialog open={requesting} /> 
        <ToastContainer />
      </div>
    );
  }
}

CleanAirPostsFlagged.propTypes = {
  className: PropTypes.string,
  theme_mode: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  selected_feed: state.dataState.selected_feed,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withAuthentication,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirPostsFlagged);

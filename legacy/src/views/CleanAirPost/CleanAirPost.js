import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { withFirebase } from 'services';
import MetaTags from 'react-meta-tags';
import { ToastContainer } from "react-toastify";
import * as ROUTES from "constants/routes";
import { GraphqlService } from "services";
import {
  ArticleBar,
  MapTwitterView,
  MapInstagramView,
  DlgSharePost
} from "components";
import {
  ARTICLE_BRANCH_MAPPOST_TWITTER,
  ARTICLE_BRANCH_MAPPOST_INSTAGRAM
} from "constants/branches";
import { 
  MAX_ARTICLE_WIDTH,
} from "constants/types";
import { ToastError } from "utility/toast";


const styles = theme => ({
  root: {
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default
  },
  appbar: {
    width: "100%",
    height: "56px",
    [theme.breakpoints.up('sm')]: {
      height: "64px",
    },
  },
});

class CleanAirPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postShareDlg: false,
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.handleSharePost = this.handleSharePost.bind(this);
    this.handleCloseSharePost = this.handleCloseSharePost.bind(this);
  }

  setError = message => {
    ToastError(message);
    this.props.requestDataFinished();
  };

  setWaiting = (waiting) => {
    if (waiting) {
      this.props.requestDataPending();
    } else {
      this.props.requestDataFinished();
    }
  };

  componentDidMount = async () => {
    const nid = this.props.match.params.id;

    this.setWaiting(true);

    const location_slug = this.props.match.params.slug;
    if (!this.props.selected_location && location_slug !== undefined) {
      await this.getLocationInfo(location_slug);
    }
    
    await this.getMapPost(nid);

    this.setWaiting(false);
    window.scrollTo(0, 0);
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

  getLocationInfo = async (slug) => {
    const { loggedIn } = this.props;

    const gqlservice = new GraphqlService();
    if (loggedIn) {
      const token = await this._getAuthToken();
      if (!token) {
        this.handleLogin();
        return;
      }
      gqlservice.set_auth_jwt(token);
    }

    await gqlservice
      .map_location_by_slug(slug)
      .then(
        (result) => {
          const locations = result.data.locations;
          if (locations.length > 0) {
            this.props.selectMapLocation(locations[0]);
          }
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  };  

  getMapPost = async (nid) => {
    const gqlservice = new GraphqlService();
    await gqlservice
      .map_post_by_nid(nid)
      .then(
        result => {
          const articles = result.data.articles;
          if (articles.length > 0) {
            this.props.selectMapPost(articles[0]);
          }
        },
        reason => {
          this.setError(reason.msg);
        }
      )
      .catch(err => {
        this.setError(JSON.stringify(err));
      });
  }

  handleNavBack = () => {
    const { selected_location } = this.props;

    const location = {
      pathname: `${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}`,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  };

  handleLogin = () => {
    const location = {
      pathname: ROUTES.SIGN_IN,
      state: { animation: "bottom" },
    };
    this.props.history.push(location);
    this.props.setLoginBackRoute(this.props.location.pathname);
  }

  handleSharePost = () => {
    this.setState({
      ...this.state,
      postShareDlg: true
    });
  }

  handleCloseSharePost = () => {
    this.setState({
      ...this.state,
      postShareDlg: false
    });
  }

  render() {
    const { 
      classes, 
      selected_location,
      selected_map_post,
    } = this.props;
    const {
      postShareDlg,
    } = this.state;

    if (!selected_map_post) {
      return <div></div>
    }

    // get share url
    let shareUrl = "";
    if (typeof window !== "undefined") {
      shareUrl = window.location.protocol + "//" + window.location.host;
    }
    shareUrl += `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}`;
    shareUrl += `/p/${selected_map_post.nid}`;

    return (
      <div className={classes.root}>
        <div className="wrapper">
          <MetaTags>
            <title>{`Raven: ${selected_map_post.title}`}</title>
            <meta name="description" content={selected_map_post.summary} />
            <meta property="og:title" content={`Raven CleanAirMap: ${selected_map_post.title}`} />
            <meta property="og:description" content={selected_map_post.summary} />
            <meta property="og:image" content={selected_map_post.image === null ? "" : selected_map_post.image} />
            <meta property="og:site_name" content="Raven App" />
            <meta property="og:url" content={shareUrl} />
            <meta property="twitter:title" content={`Raven: ${selected_map_post.title}`} />
            <meta property="twitter:site" content="Raven App" />
            <meta property="twitter:description" content={selected_map_post.summary} />
            <meta property="twitter:image:src" content={selected_map_post.image === null ? "" : selected_map_post.image} />
            <meta property="twitter:image:alt" content={selected_map_post.title} />
            <meta property="twitter:domain" content="ravenapp.org" />
          </MetaTags>
        </div>
        <div className={classes.appbar}>
          <ArticleBar
            title={"Article"}
            onNavBack={this.handleNavBack}
            onShare={this.handleSharePost}
          />
        </div>
        {selected_map_post.branch === ARTICLE_BRANCH_MAPPOST_TWITTER && (
          <MapTwitterView article={selected_map_post} />
        )}
        {selected_map_post.branch === ARTICLE_BRANCH_MAPPOST_INSTAGRAM && (
          <MapInstagramView article={selected_map_post} />
        )}
        {/* Post Share */}
        <DlgSharePost
          open={postShareDlg}
          post={selected_map_post}
          onLogin={this.handleLogin}
          onClose={this.handleCloseSharePost}
        />        
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  selected_location: state.mapState.selected_location,
  selected_map_post: state.mapState.selected_map_post,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirPost);

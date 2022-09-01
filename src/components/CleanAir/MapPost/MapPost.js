import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/core";
import {
  MapTwitterCard,
  MapInstagramCard,
  DlgShare,
  DlgLoginConfirm,
  PopMenuPost,
  DlgReport
} from "components";
import {
  ARTICLE_BRANCH_MAPPOST_TWITTER,
  ARTICLE_BRANCH_MAPPOST_INSTAGRAM
} from "constants/branches";
import * as ROUTES from "constants/routes";
import { ToastSuccess } from "utility/toast";


const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
});

class MapPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      reportDlg: false,
      loginDlg: false,
      shareDlg: false
    };

    this.handleShare = this.handleShare.bind(this);
    this.handleCloseShare = this.handleCloseShare.bind(this);
    this.handleAnchorEl = this.handleAnchorEl.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);

    this.showReportDlg = this.showReportDlg.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleCancelReport = this.handleCancelReport.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDeleteSaved = this.handleDeleteSaved.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleCancelLogin = this.handleCancelLogin.bind(this);
  }

  handleShare = () => {
    this.setState({
      ...this.state,
      shareDlg: true,
    });
  };

  handleCloseShare() {
    this.setState({
      ...this.state,
      shareDlg: false,
    });
  }

  handleAnchorEl = (anchorEl) => {
    this.setState({
      ...this.state,
      anchorEl: anchorEl,
    });
  };

  handleMenuClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  showReportDlg = () => {
    const { loggedIn } = this.props;

    if (loggedIn) {
      this.setState({
        ...this.state,
        reportDlg: true,
        loginDlg: false,
        anchorEl: null,
      });
    } else {
      this.setState({
        ...this.state,
        reportDlg: false,
        loginDlg: true,
        anchorEl: null,
      });
    }
  };

  handleReport = (reportMsg) => {
    const { article } = this.props;
    if (!reportMsg.trim()) {
      this.setError("Report shouldn't be blank. Please input your report.");
      return;
    }

    this.props.onReport(article, reportMsg);

    this.setState({
      ...this.state,
      reportDlg: false,
      anchorEl: null
    });
  };

  handleCancelReport = () => {
    this.setState({
      ...this.state,
      reportDlg: false,
      anchorEl: null
    });
  };

  handleSave = () => {
    const { article, loggedIn } = this.props;
    if (loggedIn) {
      this.setState({
        ...this.state,
        anchorEl: null
      });
      this.props.onSave(article);
    } else {
      this.setState({
        ...this.state,
        loginDlg: true,
        anchorEl: null,
      });
    }
  }

  handleDeleteSaved = () => {
    const { article, loggedIn } = this.props;
    if (loggedIn) {
      this.setState({
        ...this.state,
        anchorEl: null
      });
      this.props.onDeleteSaved(article);
    } else {
      this.setState({
        ...this.state,
        loginDlg: true,
        anchorEl: null,
      });
    }
  }

  handleCopyLink = () => {
    const { article } = this.props;

    const url = `${document.location.origin}/${ROUTES.CLEANAIRMAP_PREFIX}/p/${article.nid}`;
    
    var dummy = document.createElement("input");
    dummy.style = "position: absolute; left: -1000px; top: -1000px";
    dummy.value = url;
    document.body.appendChild(dummy);
    dummy.select();
    dummy.focus();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    this.setState({
      ...this.state,
      anchorEl: null,
    });
    ToastSuccess("Copied to clipboard");
  };

  handleLogin = () => {
    this.props.onLogin();
    this.setState({
      ...this.state,
      loginDlg: false,
      shareDlg: false,
      anchorEl: null
    });
  };

  handleCancelLogin = () => {
    this.setState({
      ...this.state,
      loginDlg: false,
      anchorEl: null
    });
  };

  render() {
    const { 
      classes, 
      theme, 
      saved, 
      article, 
      selected_location,
      handleClick, 
    } = this.props;
    const { 
      anchorEl, 
      reportDlg, 
      loginDlg, 
      shareDlg 
    } = this.state;

    // popup menu position
    let menuPos = { top: -1000, left: -1000 };
    if (anchorEl) {
      var rect = anchorEl.getBoundingClientRect();
      menuPos = { top: rect.top, left: rect.left };
    }

    // share post information
    let shareInfo = null;
    if (shareDlg) {
      let shareUrl = "";
      if (typeof window !== "undefined") {
        shareUrl = window.location.protocol + "//" + window.location.host;
      }
      shareUrl += `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}/p/${article.nid}`;

      shareInfo = {
        title: "Raven Clean Air Map: " + article.title,
        description: article.summary,
        image: article.image,
        hashtag: "",
        url: shareUrl,
      };
    }

    return (
      <div className={classes.root}>
        {article.branch === ARTICLE_BRANCH_MAPPOST_TWITTER && (
          <MapTwitterCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_MAPPOST_INSTAGRAM && (
          <MapInstagramCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        <Menu
          id="mappost-menu"
          // anchorEl={anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={{ top: menuPos.top, left: menuPos.left + 24 }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={anchorEl !== null}
          onClose={this.handleMenuClose}
        >
          <PopMenuPost
            saved={saved}
            theme={theme}
            onReport={this.showReportDlg}
            onCopyLink={this.handleCopyLink}
            onSave={this.handleSave}
            onDeleteSaved={this.handleDeleteSaved}
          />
        </Menu>
        <DlgReport
          open={reportDlg}
          title={"Report MapPost"}
          theme={theme}
          onReport={this.handleReport}
          onCancel={this.handleCancelReport}
        />
        <DlgLoginConfirm
          open={loginDlg}
          onLogin={this.handleLogin}
          onCancel={this.handleCancelLogin}
        />
        <DlgShare
          open={shareDlg}
          shareInfo={shareInfo}
          onClose={this.handleCloseShare}
        />
      </div>
    );
  }
}

MapPost.propTypes = {
  classes: PropTypes.object,
  saved: PropTypes.bool, 
  article: PropTypes.object, 
  selected_location: PropTypes.object,
  theme: PropTypes.string,
  loggedIn: PropTypes.bool,
  onReport: PropTypes.func,
  onSave: PropTypes.func,
  onDeleteSaved: PropTypes.func,
  onLogin: PropTypes.func,
  handleClick: PropTypes.func, 
};

export default withStyles(styles)(MapPost);

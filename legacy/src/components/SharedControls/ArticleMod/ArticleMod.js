import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/core";
import {
  NewsCard,
  RedditCard,
  YoutubeCard,
  TwitterCard,
  InstagramCard,
  TwitchCard,
  MediumCard,
  RssCard,
  PodcastCard,
  HackernewsCard,
  SlashdotCard,
  VscoCard,
  PinterestCard,
  TiktokCard,
  SpotifyCard,
  QuoraCard,
  FacebookCard,
  SubstackCard,
  GmailCard,
  VimeoCard,
  WeblinkCard,
  UserpostCard,
  DlgSharePost,
  DlgConfirm,
  PopMenuPostMod,
} from "components";
import {
  ARTICLE_BRANCH_NEWSPAPER,
  ARTICLE_BRANCH_YOUTUBE,
  ARTICLE_BRANCH_TWITTER,
  ARTICLE_BRANCH_INSTAGRAM,
  ARTICLE_BRANCH_TWITCH,
  ARTICLE_BRANCH_MEDIUM,
  ARTICLE_BRANCH_REDDIT,
  ARTICLE_BRANCH_HACKERNEWS,
  ARTICLE_BRANCH_SLASHDOT,
  ARTICLE_BRANCH_PODCAST,
  ARTICLE_BRANCH_RSSFEED,
  ARTICLE_BRANCH_TIKTOK,
  ARTICLE_BRANCH_PINTEREST,
  ARTICLE_BRANCH_VSCO,
  ARTICLE_BRANCH_SPOTIFY,
  ARTICLE_BRANCH_QUORA,
  ARTICLE_BRANCH_FACEBOOK,
  ARTICLE_BRANCH_SUBSTACK,
  ARTICLE_BRANCH_GMAIL,
  ARTICLE_BRANCH_VIMEO,
  ARTICLE_BRANCH_WEBSITE,
  ARTICLE_BRANCH_USERPOST
} from "constants/branches";
import * as ROUTES from "constants/routes";
import { ToastSuccess } from "utility/toast";


const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
});

class ArticleMod extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      deleteDlg: false,
      commentDlg: false,
      shareDlg: false
    };

    this.handleShare = this.handleShare.bind(this);
    this.handleCloseShare = this.handleCloseShare.bind(this);
    this.handleAnchorEl = this.handleAnchorEl.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);

    this.showDeleteDlg = this.showDeleteDlg.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.showCommentDlg = this.showCommentDlg.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDeleteSaved = this.handleDeleteSaved.bind(this);

    this.handlePin = this.handlePin.bind(this);
    this.handleMoveTop = this.handleMoveTop.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleShare = () => {
    this.setState({
      ...this.state,
      shareDlg: true,
    });
  };

  handleCloseShare() {
    this.setState({
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

  showDeleteDlg = (show) => {
    this.setState({
      ...this.state,
      deleteDlg: show,
      anchorEl: null,
    });
  };

  handleDelete = () => {
    const { article } = this.props;
    this.showDeleteDlg(false);
    this.props.onDelete(article);
  };

  handleEdit = () => {
    const { article } = this.props;
    this.setState({
      ...this.state,
      anchorEl: null
    });
    this.props.onEdit(article);
  }

  showCommentDlg = (show) => {
    this.setState({
      ...this.state,
      commentDlg: show,
      anchorEl: null,
    });
  };

  handleComment = (commentMsg) => {
    const { article } = this.props;
    this.showCommentDlg(false);
    this.props.onComment(article, commentMsg);
  };

  handleSave = () => {
    const { article } = this.props;
    this.setState({
      ...this.state,
      anchorEl: null
    });
    this.props.onSave(article);
  }

  handleDeleteSaved = () => {
    const { article } = this.props;
    this.setState({
      ...this.state,
      anchorEl: null
    });
    this.props.onDeleteSaved(article);
  }

  handleCopyLink = () => {
    const { article } = this.props;
    
    let url = "";
    if (article.branch === ARTICLE_BRANCH_NEWSPAPER) {
      url = `${document.location.origin}/${ROUTES.ARTICLE_NEWS_PREFIX}/${article.nid}`;
    } else {
      url = `${document.location.origin}/${ROUTES.ARTICLE_PREFIX}/${article.nid}`;
    }

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
      anchorEl: null
    });
    ToastSuccess("Copied to clipboard");
  };

  handlePin = () => {
    this.handleMenuClose();
    const { article } = this.props;
    this.props.onPin(article);
  }

  handleMoveTop = () => {
    this.handleMenuClose();
    const { article } = this.props;
    this.props.onMoveTop(article);
  }

  handleLogin = () => {
  }

  render() {
    const { 
      classes, 
      theme,
      loggedIn,
      authUser,
      article, 
      saved,
      handleClick, 
      handleGroupId, 
      onClickSource, 
      onClickFeed 
    } = this.props;
    const { 
      anchorEl, 
      deleteDlg, 
      shareDlg 
    } = this.state;

    // popup menu position
    let menuPos = { top: -1000, left: -1000 };
    if (anchorEl) {
      var rect = anchorEl.getBoundingClientRect();
      menuPos = { top: rect.top, left: rect.left };
    }

    return (
      <div className={classes.root}>
        {article.branch === ARTICLE_BRANCH_NEWSPAPER && (
          <NewsCard
            article={article}
            search_mode={false}
            handleClick={handleClick}
            handleGroupId={handleGroupId}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
            onClickSource={onClickSource}
            onClickFeed={onClickFeed}
          />
        )}
        {article.branch === ARTICLE_BRANCH_REDDIT && (
          <RedditCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_YOUTUBE && (
          <YoutubeCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_TWITTER && (
          <TwitterCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_MEDIUM && (
          <MediumCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_RSSFEED && (
          <RssCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_PODCAST && (
          <PodcastCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_HACKERNEWS && (
          <HackernewsCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_SLASHDOT && (
          <SlashdotCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_TWITCH && (
          <TwitchCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_INSTAGRAM && (
          <InstagramCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_VSCO && (
          <VscoCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_PINTEREST && (
          <PinterestCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_TIKTOK && (
          <TiktokCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_SPOTIFY && (
          <SpotifyCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_QUORA && (
          <QuoraCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_FACEBOOK && (
          <FacebookCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_SUBSTACK && (
          <SubstackCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_GMAIL && (
          <GmailCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_VIMEO && (
          <VimeoCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_WEBSITE && (
          <WeblinkCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        {article.branch === ARTICLE_BRANCH_USERPOST && (
          <UserpostCard
            article={article}
            handleClick={handleClick}
            onAnchorEl={this.handleAnchorEl}
            onShare={this.handleShare}
          />
        )}
        <Menu
          id="source-menu"
          // anchorEl={anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={{ top: menuPos.top, left: menuPos.left + 24 }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={anchorEl !== null}
          onClose={this.handleMenuClose}
        >
          <PopMenuPostMod
            theme={theme}
            saved={saved}
            pinned={article.pinned !== undefined && article.pinned === true}
            moved={article.moved !== undefined && article.moved === true}
            owner={article.branch === ARTICLE_BRANCH_USERPOST && loggedIn && authUser && article.author === authUser.username}
            onDelete={e => this.showDeleteDlg(true)}
            onEdit={this.handleEdit}
            onComment={e => this.showCommentDlg(true)}
            onCopyLink={this.handleCopyLink}
            onPin={this.handlePin}
            onMoveTop={this.handleMoveTop}
            onSave={this.handleSave}
            onDeleteSaved={this.handleDeleteSaved}
          />
        </Menu>
        <DlgConfirm
          open={deleteDlg}
          title={"Delete Post"}
          content={"Are you sure you want to delete this post?"}
          onOK={this.handleDelete}
          onCancel={e => this.showDeleteDlg(false)}
        />
        <DlgSharePost
          open={shareDlg}
          post={article}
          onLogin={this.handleLogin}
          onClose={this.handleCloseShare}
        />
      </div>
    );
  }
}

ArticleMod.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  loggedIn: PropTypes.bool,
  authUser: PropTypes.object,
  article: PropTypes.object,
  saved: PropTypes.bool, 
  onDelete: PropTypes.func,
  onComment: PropTypes.func,
  onPin: PropTypes.func,
  onMoveTop: PropTypes.func,
  onSave: PropTypes.func,
  onDeleteSaved: PropTypes.func,
  handleClick: PropTypes.func,
  handleGroupId: PropTypes.func,
  onClickSource: PropTypes.func, 
  onClickFeed: PropTypes.func
};

export default withStyles(styles)(ArticleMod);

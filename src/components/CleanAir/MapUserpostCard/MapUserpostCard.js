import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { LinkPreview } from "components";
import { 
  get_timestring, 
  decodeHTMLEntities, 
  render_text 
} from "utility/utils";
import { 
  MAX_CARD_WIDTH, 
  MIN_CARD_WIDTH,
  THEME_MODE_DARK,
  THEME_MODE_LIGHT 
} from "constants/types";
import {
  CONF_LOCATION_TYPES
} from "constants/maplocation";


const styles = (theme) => ({
  card: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
    minWidth: MIN_CARD_WIDTH - 16,
    maxWidth: MAX_CARD_WIDTH - 16,
  },
  carddiv: {
    margin: 3,
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 10,
    borderTopLeftRadius: 30,
    backgroundColor: theme.palette.background.article,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  header: {
    padding: 0,
  },
  share: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    color: theme.palette.info.contrastText,
    backgroundColor: "#7289DA",
    zIndex: 100,
  },
  shareicon: {
    width: 16,
    height: 16,
  },
  expand: {
    position: "absolute",
    top: 20,
    right: 2,
    padding: 4,
    width: 24,
    height: 24,
    zIndex: 100,
    color: theme.palette.text.primary,
  },
  avatar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 48,
    height: 48,
    cursor: "pointer",
  },
  avatar_img: {
    backgroundColor: "transparent",
  },
  socialimg: {
    position: "absolute",
    top: 52,
    left: 16,
    width: 20,
    height: 20,
  },
  usertype: {
    position: "absolute",
    top: 76,
    left: 8,
    fontFamily: "Arial",
    fontSize: "14px",
    lineHeight: "16px",
    fontWeight: 600,
    color: "#1878F3",
  },
  titleline: {
    position: "relative",
    marginLeft: 40,
    marginRight: 40,
    margin: 10,
  },
  author: {
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    color: theme.palette.text.primary,
    cursor: "pointer",
  },
  title: {
    marginTop: 4,
  },
  date: {
    float: "right",
    fontSize: "12px",
    color: theme.palette.text.secondary,
    marginTop: 4,
  },
  content: {
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 30,
    marginRight: 10,
    marginBottom: 8,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  detail_txt: {
    display: "inline",
    overflowWrap: "break-word",
  },
  media: {
    display: "block",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    // marginBottom: theme.spacing(1)
  },
  actionbtn: {
    left: "50%",
    transform: "translate(-50%)",
    fontSize: 12,
    textTransform: "none",
    padding: 0,
    marginBottom: 4,
    color: theme.palette.text.primary,
  },
  actiondiv: {
    marginLeft: 16,
  },
  actionimg: {
    float: "left",
    width: 16,
    height: 16,
  },
  actionvalue: {
    float: "left",
    marginLeft: 5,
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.text.secondary,
  },
  readmorebtn: {
    position: "absolute",
    right: 4,
    fontFamily: "Arial",
    fontSize: 12,
    textTransform: "inherit",
    float: "right",
    color: theme.palette.text.secondary,
  },
  readmore: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    float: "right",
    marginRight: 16,
  },
  righticon: {
    position: "absolute",
    right: 0,
    bottom: 5,
  },
});

class MapUserpostCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickShare = this.handleClickShare.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleClickShare = () => {
    const { article } = this.props;
    this.props.onShare(article.nid);
  };

  handleExpand = (event) => {
    this.props.onAnchorEl(event.currentTarget);
  };

  render() {
    const { 
      classes, 
      theme_mode, 
      article, 
      selected_location, 
      handleClick, 
    } = this.props;

    if (!selected_location) {
      return <></>;
    }

    const locationType = CONF_LOCATION_TYPES.find(
      (loctype) => loctype.value === selected_location.type
    );

    const class_usertype = {
      position: "absolute",
      top: 76,
      left: 8,
      fontFamily: "Arial",
      fontSize: "14px",
      lineHeight: "16px",
      fontWeight: 600,
      color: theme_mode === THEME_MODE_LIGHT ? "#1878F3" : "white",
    };

    var title = article.title;
    var summary = article.summary;

    // moderator
    const isModerator = article.param2;
    const social_image = isModerator
      ? `/static/images/icons/${theme_mode}/moderator.png`
      : `/static/images/icons/${theme_mode}/members.png`;

    // author
    let author = article.author;
    if (!author) {
      author = selected_location.name;
    }
    let avatar_image = article.author_image;
    if (!avatar_image) {
      avatar_image = "/static/images/avatars/blank_avatar.png";
    }

    // publish time
    let published = get_timestring(article.published);

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    width -= 16;
    if (width > MAX_CARD_WIDTH - 16)
      width = MAX_CARD_WIDTH - 16;
    if (width < MIN_CARD_WIDTH - 16)
      width = MIN_CARD_WIDTH - 16;

    // link preview
    let preview = null;
    if (article.link_preview
      // article.link_preview.title && article.link_preview.image
    ) {
      preview = article.link_preview;
    }

    return (
      <Card className={classes.card} style={{ width: width }}>
        <div className={classes.carddiv}>
          <CardHeader
            className={classes.header}
            avatar={
              <div>
                <Avatar
                  alt={locationType.name}
                  src={`/static/images/icons/loc_types/${locationType.image}`}
                  className={classes.avatar}
                  classes={{ img: classes.avatar_img }}
                />
                <img
                  alt={"user"}
                  src={social_image}
                  className={classes.socialimg}
                />
                <Typography
                  style={class_usertype}
                >
                  {isModerator ? "MOD" : "USER"}
                </Typography>
              </div>
            }
            title={
              <div className={classes.titleline}>
                <Typography className={classes.author}>
                  {decodeHTMLEntities(author)}
                </Typography>
                <Typography 
                  className={classes.title}
                  variant="subtitle2"
                  onClick={e => handleClick(article)}
                >
                  {render_text(title, theme_mode === THEME_MODE_DARK)}
                </Typography>
                <Typography className={classes.date}>{published}</Typography>
              </div>
            }
          />
          <div>
            <IconButton
              className={classes.share}
              onClick={this.handleClickShare}
            >
              <ShareIcon className={classes.shareicon} />
            </IconButton>
            <IconButton className={classes.expand} onClick={this.handleExpand}>
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <CardContent className={classes.content} onClick={e => handleClick(article)}>
            <Typography className={classes.detail_txt} variant="body2">
              {render_text(summary, theme_mode === THEME_MODE_DARK)}
            </Typography>
          </CardContent>
          {preview !== null && (
            <LinkPreview preview={preview} />
          )}
          <CardActions>
            <Button
              className={classes.readmorebtn}
              size="small"
              color="primary"
              target="_blank"
              onClick={e => handleClick(article)}
            >
              <Typography className={classes.readmore}>read more</Typography>
              <ChevronRightIcon
                fontSize="small"
                className={classes.righticon}
              />
            </Button>
          </CardActions>
        </div>
      </Card>
    );
  }
}

MapUserpostCard.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object,
  handleClick: PropTypes.func,
  onAnchorEl: PropTypes.func,
  onShare: PropTypes.func
};

const mapStateToProps = (state) => ({
  theme_mode: state.uiState.theme_mode,
  selected_location: state.mapState.selected_location
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MapUserpostCard));

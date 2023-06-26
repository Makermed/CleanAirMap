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
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { LinkPreview } from "components";
import { 
  get_timestring, 
  decodeHTMLEntities, 
  render_text 
} from "utility/utils";
import { 
  MIN_CARD_WIDTH, 
  MAX_ARTICLE_WIDTH, 
  THEME_MODE_DARK 
} from "constants/types";
import {
  CONF_LOCATION_TYPES
} from "constants/maplocation";
import { is_valid_url } from "utility/utils";


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  card: {
    position: "relative",
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    width: "100%",
    backgroundColor: theme.palette.background.default
  },
  carddiv: {
    margin: 3,
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 10,
    backgroundColor: theme.palette.background.article,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`
  },
  header: {
    padding: 0
  },
  avatar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 48,
    height: 48
  },
  avatar_img: {
    backgroundColor: "transparent"
  },
  socialimg: {
    position: "absolute",
    top: 52,
    left: 14,
    width: 20,
    height: 20
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
    marginRight: 10,
    margin: 10
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  author: {
    fontFamily: "Arial",
    fontSize: "14px",
    lineHeight: "20px",
    color: theme.palette.text.primary
  },
  date: {
    float: "right",
    fontSize: "12px",
    color: theme.palette.text.secondary,
    marginTop: 4,
    marginBottom: 8,
    marginRight: theme.spacing(2)
  },
  media: {
    display: "block",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    margin: theme.spacing(1)
  },
  content: {
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 30,
    marginRight: 10,
    marginBottom: 8,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  detail_txt: {
    display: "inline",
    overflowWrap: "break-word",
  },
  reaction: {
    left: "50%",
    transform: "translate(-50%)",
    fontSize: 12,
    textTransform: "none",
    padding: 0,
    marginBottom: 4,
    color: theme.palette.text.primary
  },
  reactionimg: {
    float: "left",
    width: 16,
    height: 16
  },
  reactionvalue: {
    float: "left",
    marginLeft: 5,
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.text.secondary
  },
  actionbtn: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: 12,
    marginRight: 5,
    textTransform: "inherit",
    color: theme.palette.text.secondary
  },
});

class MapUserpostView extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { 
      classes, 
      theme_mode,
      article, 
      selected_location
    } = this.props;

    if (!selected_location) {
      return <></>;
    }

    const locationType = CONF_LOCATION_TYPES.find(
      (loctype) => loctype.value === selected_location.type
    );

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

    if (!text) {
      text = article.summary;
    }

    let sentences = text.split("\n");
    let prev_sentences = [];
    let next_sentences = [];
    let found_postlink = false;
    for (let sentence of sentences) {
      if (found_postlink) {
        next_sentences.push(sentence);
      } else {
        if (is_valid_url(sentence)) {
          found_postlink = true;
        }
        //  else {
          prev_sentences.push(sentence);
        // }
      }
    }

    // moderator
    const isModerator = article.param2;
    const social_image = isModerator
      ? `/static/images/icons/${theme_mode}/moderator.png`
      : `/static/images/icons/${theme_mode}/sources.png`;

    // author
    let author = article.author;
    if (!author) {
      author = source.name;
    }
    let avatar_image = article.author_image;
    if (!avatar_image) {
      avatar_image = "/static/images/avatars/blank_avatar.png";
    }

    // publish time
    let published = get_timestring(article.published);

    // link preview
    let preview = null;
    if (article.link_preview // && 
      // article.link_preview.title && article.link_preview.image
    ) {
      preview = article.link_preview;
    }

    let width = document.documentElement.clientWidth || document.body.clientWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;

    return (
      <div className={classes.root}>
        <Card className={classes.card} style={{ width: width - 16 }}>
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
                    className={classes.usertype}
                  >
                    {isModerator ? "MOD" : "USER"}
                  </Typography>
                </div>
              }
              title={
                <div className={classes.titleline}>
                  <Typography className={classes.author}>
                    {decodeHTMLEntities(article.author)}
                  </Typography>
                  <Typography className={classes.title} variant="subtitle1">
                    {render_text(title, theme_mode === THEME_MODE_DARK)}
                  </Typography>
                  <Typography className={classes.date}>{published}</Typography>
                </div>
              }
            />
            {prev_sentences.length > 0 && 
              prev_sentences.map((sentence, index) => (
                <CardContent className={classes.content}>
                  <Typography className={classes.detail_txt} variant="body2">
                    {render_text(sentence, theme_mode === THEME_MODE_DARK)}
                  </Typography>
                </CardContent>
              ))}
            {found_postlink && 
              <LinkPreview preview={preview} />
            }
            {next_sentences.length > 0 &&
              next_sentences.map((sentence, index) => (
                <CardContent className={classes.content} key={`sentence-${index}`}>
                  <Typography className={classes.detail_txt} variant="body2">
                    {render_text(sentence, theme_mode === THEME_MODE_DARK)}
                  </Typography>
                </CardContent>
              ))}
            <CardActions />
          </div>
        </Card>
      </div>
    );
  }
}

MapUserpostView.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object
};

const mapStateToProps = state => ({
  sources: state.dataState.sources,
  theme_mode: state.uiState.theme_mode,
  selected_location: state.mapState.selected_location
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MapUserpostView));

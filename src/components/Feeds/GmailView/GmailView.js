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
  Avatar,
  Typography,
} from "@material-ui/core";
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

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    width: "100%",
    backgroundColor: theme.palette.background.default
  },
  card: {
    position: "relative",
    backgroundColor: theme.palette.background.default
  },
  carddiv: {
    margin: 3,
    marginBottom: theme.spacing(1),
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
    width: 32,
    height: 32
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
  titleline: {
    position: "relative",
    marginLeft: 30,
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
    // fontWeight: 600,
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
  content: {
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 8,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  detail_txt: {
    display: "inline",
    overflowWrap: "break-word",
  }
});

class GmailView extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { 
      classes, 
      theme_mode,
      sources, 
      article 
    } = this.props;

    // check validity
    let source = sources.find(item => item.id === article.source_id);
    if (!source) {
      console.log("Error, Unknown article source!");
      return <div></div>;
    }

    let author = article.author;
    const nIndex = author.indexOf("<");
    if (nIndex > 0) {
      author = author.slice(0, nIndex - 1);
    }

    let width = document.documentElement.clientWidth || document.body.clientWidth;;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;

    // publish time
    let published = get_timestring(article.published);

    return (
      <div className={classes.root} style={{ width: width }}>
        <Card className={classes.card}>
          <div className={classes.carddiv}>
            <CardHeader
              className={classes.header}
              avatar={
                <div>
                  <Avatar
                    alt={source.name}
                    src={source.image}
                    className={classes.avatar}
                    classes={{ img: classes.avatar_img }}
                  />
                  {/* <img
                    alt={"medium"}
                    src={`/static/images/icons/${theme_mode}/medium.png`}
                    className={classes.socialimg}
                  /> */}
                </div>
              }
              title={
                <div className={classes.titleline}>
                  <Typography className={classes.title} variant="subtitle1">
                    {render_text(article.title, theme_mode === THEME_MODE_DARK)}
                  </Typography>
                  <Typography className={classes.author}>
                    {decodeHTMLEntities(author)}
                  </Typography>
                  <Typography className={classes.date}>{published}</Typography>
                </div>
              }
            />
            <CardContent className={classes.content}>
              <div
                dangerouslySetInnerHTML={{ __html: article.html }}
              />
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}

GmailView.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object
};

const mapStateToProps = state => ({
  sources: state.dataState.sources,
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GmailView));

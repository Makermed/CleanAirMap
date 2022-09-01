import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Badge } from "@material-ui/core";
import { MAX_CARD_WIDTH, MIN_CARD_WIDTH } from "constants/types";

const styles = (theme) => ({
  root: {
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_CARD_WIDTH,
    backgroundColor: theme.palette.background.default,
  },
  listitem: {
    display: "-webkit-box",
    padding: 0,
    margin: 0,
    cursor: "pointer",
  },
  badge_div: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1.5),
  },
  badge: {
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
    backgroundColor: "red",
    color: "white",
  },
  listitem_avatar: {
    minWidth: 60,
  },
  listimage: {
    objectFit: "cover",
    height: 60,
    width: 60,
    borderRadius: 5,
    cursor: "pointer",
  },
  listitem_text: {
    paddingLeft: theme.spacing(2),
    marginTop: 4,
    color: theme.palette.text.primary,
    cursor: "pointer",
  },
  name: {
    fontSize: "16px",
    color: theme.palette.text.primary,
  },
  description: {
    fontSize: "12px",
    lineHeight: 1,
    color: theme.palette.text.secondary,
  },
  action: {
    margin: 0,
    marginTop: 8,
    padding: 0,
    width: 48,
    cursor: 'pointer',
  },
  following: {
    withth: 48,
    height: 48,
  },
});

class FeedItem extends React.Component {
  render() {
    const { 
      classes, 
      width, 
      feed, 
      index, 
      following, 
      loggedIn,
      badged, 
      theme_mode, 
      onClickItem, 
      onClickFollowing 
    } = this.props;

    const following_img = `/static/images/icons/${theme_mode}/following.png`;
    const unfollowing_img = `/static/images/icons/${theme_mode}/unfollowing.png`;

    let rootWidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    if (rootWidth > MAX_CARD_WIDTH) {
      rootWidth = MAX_CARD_WIDTH - 32;
    } else {
      rootWidth -= 32;
    }
    if (width) {
      rootWidth = width;
    }
    let textwidth = rootWidth - (16 + 60 + 32);
    if (badged) {
      textwidth -= 12;
    }

    return (
      <div className={classes.root} style={width !== null ? {width: rootWidth} : {}}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid
            item
            className={classes.listitem_avatar}
          >
            {badged &&
              <div className={classes.badge_div}>
                <Badge 
                  classes={{ badge: classes.badge }} 
                  badgeContent={feed.notifications}
                  overlap="rectangular"
                >
                  <img
                    className={classes.listimage}
                    alt={feed.name}
                    src={feed.image}
                    onClick={onClickItem(index)}
                  />
                </Badge>
              </div>
            }
            {(badged === undefined || !badged) &&
              <img
                className={classes.listimage}
                alt={feed.name}
                src={feed.image}
                onClick={onClickItem(index)}
              />
            }
          </Grid>
          <Grid
            item
            className={classes.listitem_text}
            style={{ width: textwidth }}
            onClick={onClickItem(index)}
          >
            <div>
              <Typography className={classes.name}>{feed.name}</Typography>
              <Typography className={classes.description}>
                {feed.description}
              </Typography>
            </div>
          </Grid>
          <Grid item className={classes.action}>
            {loggedIn && following && (
              <img
                className={classes.following}
                alt={"following"}
                src={following_img}
                onClick={onClickFollowing(index)}
              />
            )}
            {loggedIn && !following && (
              <img
                className={classes.following}
                alt={"unfollowing"}
                src={unfollowing_img}
                onClick={onClickFollowing(index)}
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

FeedItem.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number,
  feed: PropTypes.object,
  index: PropTypes.number,
  following: PropTypes.bool,
  loggedIn: PropTypes.bool,
  theme_mode: PropTypes.string,
  badged: PropTypes.bool,
  onClickItem: PropTypes.func,
  onClickFollowing: PropTypes.func
};

export default withStyles(styles)(FeedItem);

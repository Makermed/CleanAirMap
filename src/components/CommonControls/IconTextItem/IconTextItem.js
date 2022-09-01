import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

const styles = theme => ({
  card: {
    display: "flex",
    cursor: "pointer",
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flex: "1 0 auto",
    padding: 0,
    "&:last-child": {
      padding: 0
    },
    backgroundColor: theme.palette.background.default,
  },
  content_nonselected: {
    flex: "1 0 auto",
    padding: 0,
    "&:last-child": {
      padding: 0
    },
    backgroundColor: theme.palette.background.default,
    opacity: 0.3,
  },
  media: {
    display: "flex",
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundSize: "100%",
  },
  title_div: {
    position: "absolute",
    bottom: 8,
    left: 8,
    width: 84,
  },
  title: {
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: 500,
    color: "white",
  }
});

class IconTextItem extends React.Component {
  render() {
    const { classes, title, image, selected } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={selected === undefined || selected ? classes.content : classes.content_nonselected}>
          <div style={{ position: "relative" }}>
            <CardMedia
              component="img"
              className={classes.media}
              image={image}
            />
            <div className={classes.title_div}>
              <Typography className={classes.title}>
                {title}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

IconTextItem.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  image: PropTypes.string,
  selected: PropTypes.bool
};

export default withStyles(styles)(IconTextItem);

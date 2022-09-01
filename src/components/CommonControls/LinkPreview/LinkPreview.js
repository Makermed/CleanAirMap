import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, Typography, Button } from "@material-ui/core";
import { summarize_text, decodeHTMLEntities } from "utility/utils";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    position: "relative",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(3),
    boxShadow: "0px 0px 0px 1px black inset",
    borderRadius: 10,
  },
  media: {
    display: "block",
    width: "100%",
    borderRadius: 8,
  },
  header: {
    padding: 0,
  },
  titleline: {
    position: "relative",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  title: {
    fontFamily: "Arial",
    fontSize: "16px",
    lineHeight: "16px",
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  content: {
    padding: 0,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  description: {
    fontFamily: "Arial",
    fontSize: "14px",
    lineHeight: "16px",
    color: theme.palette.text.primary,
  },
  actionbtn: {
    textTransform: "inherit",
    padding: 0,
    marginBottom: theme.spacing(1),
  },
  domain: {
    fontFamily: "Arial",
    fontSize: "14px",
    lineHeight: "16px",
    color: theme.palette.text.secondary,
  },
});

class LinkPreview extends React.Component {
  render() {
    const { classes, preview } = this.props;

    if (!preview) {
      return <div></div>;
    }
    const title = summarize_text(preview.title, 25);
    const description = summarize_text(preview.description, 25);

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          {(preview.image !== null && preview.image !== "") && (
            <img alt={""} src={preview.image} className={classes.media} />
          )}
          <CardHeader
            className={classes.header}
            title={
              <div className={classes.titleline}>
                <Typography className={classes.title}>
                  {decodeHTMLEntities(title)}
                </Typography>
              </div>
            }
          />
          <CardContent className={classes.content}>
            <Typography className={classes.description}>
              {decodeHTMLEntities(description)}
            </Typography>
            <Button
              className={classes.actionbtn}
              size="small"
              color="primary"
              target="_blank"
              href={preview.url}
            >
              <Typography className={classes.domain}>{preview.domain}</Typography>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

LinkPreview.propTypes = {
  classes: PropTypes.object,
  preview: PropTypes.object
};

export default withStyles(styles)(LinkPreview);

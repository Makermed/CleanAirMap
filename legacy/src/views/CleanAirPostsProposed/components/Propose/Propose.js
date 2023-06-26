import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Box, Button } from "@material-ui/core";
import { MIN_CARD_WIDTH, MAX_CARD_WIDTH } from "constants/types";

const styles = (theme) => ({
  root: {
    position: "relative",
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_CARD_WIDTH,
    backgroundColor: theme.palette.background.default,
  },
  container: {
    // justifyContent: "left",
    flexWrap: "inherit",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    backgroundColor: theme.palette.background.main,
    // margin: 3,
    borderRadius: 5,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  prefix: {
    display: "inline",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  name: {
    display: "inline",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: 500,
    color: "#E8EC31",
    marginTop: theme.spacing(1),
  },
  content: {
    textAlign: "left",
    fontSize: "12px",
    fontWeight: 200,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  actionbtn: {
    backgroundColor: theme.palette.background.main,
    borderRadius: "20px",
    padding: "4px 10px",
    marginLeft: theme.spacing(1),
    textTransform: "initial",
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  actionicon: {
    padding: 0,
    width: 24,
    height: 24,
    color: theme.palette.primary.contrastText,
  },
});

class Propose extends React.Component {
  constructor(props) {
    super(props);

    this.handleApprove = this.handleApprove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleApprove = () => {
    const { post } = this.props;
    this.props.onApprove(post);
  }

  handleDelete = () => {
    const { post } = this.props;
    this.props.onDelete(post);
  }

  render() {
    const { classes, post } = this.props;

    return (
      <div className={classes.root}>
        <Box className={classes.container}>
            <Typography className={classes.prefix}>Posted By </Typography>
            <Typography className={classes.name}>{post.author}:</Typography>
        </Box>
        <Box className={classes.btncontainer}>
          <Button
            className={classes.actionbtn}
            startIcon={
              <img
                className={classes.actionicon}
                alt="approve"
                src={`/static/images/approve.png`}
              />
            }
            onClick={this.handleApprove}
          >
            Approve
          </Button>
          <Button
            className={classes.actionbtn}
            startIcon={
              <img
                className={classes.actionicon}
                alt="dismiss"
                src={`/static/images/delete.png`}
              />
            }
            onClick={this.handleDelete}
          >
            Dismiss
          </Button>
        </Box>
      </div>
    );
  }
}

Propose.propTypes = {
  classes: PropTypes.object,
  post: PropTypes.object,
  onApprove: PropTypes.func,
  onDelete: PropTypes.func
};

export default withStyles(styles)(Propose);

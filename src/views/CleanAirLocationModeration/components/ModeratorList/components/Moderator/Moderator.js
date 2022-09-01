import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { 
  Grid, 
  Typography, 
  Box, 
  Button, 
  IconButton, 
  Menu 
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { 
  PopMenuModerator, 
  DlgConfirm, 
  DlgReport 
} from "components";
import { 
  MIN_CARD_WIDTH, 
  MAX_CARD_WIDTH 
} from "constants/types";

const styles = (theme) => ({
  root: {
    position: "relative",
    // width: "100%",
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_CARD_WIDTH,
    backgroundColor: theme.palette.background.default,
  },
  modimage: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    width: 16,
    height: 16,
  },
  expand: {
    position: "absolute",
    top: 24,
    right: theme.spacing(0.5),
    padding: 4,
    width: 24,
    height: 24,
    zIndex: 100,
    color: theme.palette.text.primary,
  },
  grid: {
    flexWrap: "inherit",
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.background.card,
    borderRadius: 5,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  image: {
    objectFit: "cover",
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  username: {
    position: "relative",
    width: 200,
    textAlign: "left",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "18px",
    textTransform: "none",
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  biography: {
    position: "relative",
    width: 240,
    textAlign: "left",
    fontSize: "12px",
    fontWeight: 100,
    lineHeight: "14px",
    textTransform: "none",
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2) + 24,
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  actionbtn: {
    backgroundColor: theme.palette.background.card,
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


class Moderator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      anchorEl: null,
      deleteDlg: false,
      reportDlg: false,
    };

    this.handleExpand = this.handleExpand.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);

    this.showDeleteDlg = this.showDeleteDlg.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showReportDlg = this.showReportDlg.bind(this);
    this.handleReport = this.handleReport.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMakeOwner = this.handleMakeOwner.bind(this);
  }

  handleExpand = (event) => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget,
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
    const { moderator } = this.props;
    this.showDeleteDlg(false);
    this.props.onDelete(moderator);
  };

  showReportDlg = (show) => {
    this.setState({
      ...this.state,
      reportDlg: show,
      anchorEl: null,
    });    
  }

  handleReport = (reportMsg) => {
    const { moderator } = this.props;
    this.showReportDlg(false);
    this.props.onReport(moderator, reportMsg);
  }


  handleClick = () => {
    this.setState({
      selected: !this.state.selected
    });
  }

  handleApprove = () => {
    const { moderator } = this.props;
    this.props.onApprove(moderator);
  }

  handleDelete = () => {
    const { moderator } = this.props;
    this.props.onDelete(moderator);
  };

  handleMakeOwner = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
    const { moderator } = this.props;
    this.props.onMakeOwner(moderator);
  }

  makeSummary(text) {
    let words = text.split(" ");
    let characters = 0;
    let word_count = 0;
    let new_words = [];
    while (characters < 50 && word_count < words.length) {
      new_words.push(words[word_count]);
      characters += words[word_count].length;
      word_count++;
    }

    let summary = new_words.join(" ");
    if (word_count < words.length) {
      summary += "...";
    }
    return summary;
  }

  render() {
    const { classes, theme, moderator } = this.props;
    const { selected, anchorEl, deleteDlg, reportDlg } = this.state;

    const biography = this.makeSummary(moderator.user.biography);

    let menuPos = { top: -1000, left: -1000 };
    if (anchorEl) {
      var rect = anchorEl.getBoundingClientRect();
      menuPos = { top: rect.top, left: rect.left };
    }

    return (
      <div className={classes.root}>
        <img
          className={classes.modimage}
          src={`/static/images/icons/${theme}/moderator.png`}
          alt={"mod"}
        />
        {moderator.approved && (
          <IconButton className={classes.expand} onClick={this.handleExpand}>
            <ExpandMoreIcon />
          </IconButton>
        )}
        <Grid container className={classes.grid} onClick={this.handleClick}>
          <Grid item>
            <img
              className={classes.image}
              src={moderator.user.image}
              alt={moderator.user.username}
            />
          </Grid>
          <Grid item>
            <Typography className={classes.username}>{moderator.user.username}</Typography>
            <Typography className={classes.biography}>
              {biography}
            </Typography>
            <div style={{ width: window.innerWidth - 104 }}></div>
          </Grid>
        </Grid>
        {moderator.approved && selected && (
          <Box className={classes.btncontainer}>
            <Button
              className={classes.actionbtn}
              startIcon={
                <img
                  className={classes.actionicon}
                  alt="delete"
                  src={`/static/images/delete.png`}
                />
              }
              onClick={this.handleDelete}
            >
              Delete
            </Button>
          </Box>
        )}
        {!moderator.approved && (
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
                  alt="delete"
                  src={`/static/images/delete.png`}
                />
              }
              onClick={e=> this.showDeleteDlg(true)}
            >
              Dismiss
            </Button>
          </Box>
        )}
        <Menu
          id="moderator-menu"
          // anchorEl={anchorEl}
          open={anchorEl !== null}
          anchorReference="anchorPosition"
          anchorPosition={{ top: menuPos.top, left: menuPos.left + 24 }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.handleMenuClose}
        >
          <PopMenuModerator
            theme={theme}
            owner={false}
            onReport={e => this.showReportDlg(true)}
            onMakeOwner={e => this.handleMakeOwner()}
          />
        </Menu>
        <DlgReport
          open={reportDlg}
          title={"Report Moderator"}
          theme={theme}
          onReport={this.handleReport}
          onCancel={e => this.showReportDlg(false)}
        />
        <DlgConfirm
          open={deleteDlg}
          title={"Delete Moderator"}
          content={"Are you sure you want to delete this moderator?"}
          onOK={this.handleDelete}
          onCancel={e => this.showDeleteDlg(false)}
        />
      </div>
    );
  }
}

Moderator.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  moderator: PropTypes.object,
  onReport: PropTypes.func,
  onApprove: PropTypes.func,
  onDelete: PropTypes.func,
};

export default withStyles(styles)(Moderator);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    position: "relative",
  },
  alerticon: {
    padding: 4,
    width: 32,
    height: 32,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    width: 160,
    fontSize: 18,
    fontWeight: 500,
  },
  actionbutton: {
    padding: 0,
    margin: 0,
  },
  actionbutton_disabled: {
    padding: 0,
    margin: 0,
    opacity: 0.38,
  },
  actionimg: {
    padding: 2,
    width: 32,
    height: 32,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 0,
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  reporttext: {
    flex: 1,
    color: theme.palette.text.primary,
    margin: 0,
    padding: 4,
    backgroundColor: theme.palette.background.dark,
    "& input": {
      fontSize: 14,
      fontWeight: 18,
      backgroundColor: theme.palette.background.dark,
    },
  },
});

class DlgReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      report: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      report: event.target.value,
    });
  };

  handleReport = () => {
    this.props.onReport(this.state.report);
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { classes, open, title, theme } = this.props;
    const { report } = this.state;

    const button_class = report.length > 0 ? classes.actionbutton : classes.actionbutton_disabled;

    return (
      <div className={classes.root}>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <img
                className={classes.alerticon}
                alt="alert"
                src={`/static/images/icons/${theme}/warning.png`}
              />
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <IconButton
                onClick={report.length > 0 ? this.handleReport : null}
                className={button_class}
              >
                <img
                  className={classes.actionimg}
                  alt="apply"
                  src="/static/images/approve.png"
                />
              </IconButton>
              <IconButton
                onClick={this.handleCancel}
                className={classes.actionbutton}
              >
                <img
                  className={classes.actionimg}
                  alt="apply"
                  src="/static/images/delete.png"
                />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <InputBase
              id="report-text"
              className={classes.reporttext}
              multiline
              fullWidth
              rows="6"
              name="report"
              value={report}
              onChange={this.handleChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

DlgReport.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  theme: PropTypes.string,
  onReport: PropTypes.func,
  onCancel: PropTypes.func
};

export default withStyles(styles)(DlgReport);

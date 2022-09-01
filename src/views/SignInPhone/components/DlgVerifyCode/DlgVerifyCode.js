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
    padding: 0,
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

class DlgVerifyCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      code: event.target.value,
    });
  };

  handleSubmit = () => {
    this.props.onVerifyCode(this.state.code);
  };

  handleCancel = () => {
    this.setState({
      ...this.state,
      code: ""
    });
    this.props.onCancel();
  };

  render() {
    const { classes, open, theme } = this.props;
    const { code } = this.state;

    const button_class = code.length > 0 ? classes.actionbutton : classes.actionbutton_disabled;

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
                src={`/static/images/icons/${theme}/alert.png`}
              />
              <Typography variant="h6" className={classes.title}>
                {"Verify Code"}
              </Typography>
              <IconButton
                onClick={code.length > 0 ? this.handleSubmit : null}
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
              fullWidth
              name="code"
              value={code}
              onChange={this.handleChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

DlgVerifyCode.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  theme: PropTypes.string,
  onVerifyCode: PropTypes.func,
  onCancel: PropTypes.func
};

export default withStyles(styles)(DlgVerifyCode);

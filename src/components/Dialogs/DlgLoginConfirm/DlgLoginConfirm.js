import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
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
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 18,
    fontWeight: 500,
  },
  cancelbutton: {
    padding: 0,
    margin: 0,
  },
  actionimg: {
    padding: 0,
    width: 32,
    height: 32,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  btncontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  applybutton: {
    backgroundColor: theme.palette.background.main,
    borderRadius: 4,
    margin: theme.spacing(2),
    marginBottom: 0,
    textTransform: "none",
  },
});

class DlgLoginConfirm extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleLogin = () => {
    this.props.onLogin();
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { classes, open } = this.props;

    const title = "Login to Raven to continue";
    const description =
      "When you join Raven, you can moderate feeds and sources...";

    return (
      <div className={classes.root}>
        <Dialog open={open} PaperProps={{ style: { borderRadius: 10 } }}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <img
                className={classes.alerticon}
                alt="alert"
                src={`/static/images/moderator.png`}
              />
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <IconButton
                onClick={this.handleCancel}
                className={classes.cancelbutton}
              >
                <img
                  className={classes.actionimg}
                  alt="cancel"
                  src="/static/images/delete.png"
                />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <Typography className={classes.description}>
              {description}
            </Typography>
            <div className={classes.btncontainer}>
              <Button
                className={classes.applybutton}
                startIcon={
                  <img
                    className={classes.actionimg}
                    alt="moderate"
                    src={`/static/images/approve.png`}
                  />
                }
                onClick={this.handleLogin}
              >
                Login to Raven
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

DlgLoginConfirm.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onLogin: PropTypes.func,
  onCancel: PropTypes.func
};

export default withStyles(styles)(DlgLoginConfirm);

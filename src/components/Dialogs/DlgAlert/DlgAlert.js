import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
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
});

class DlgAlert extends React.Component {
  constructor(props) {
    super(props);

    this.handleOK = this.handleOK.bind(this);
  }

  handleOK = () => {
    this.props.onOK();
  };

  render() {
    const { classes, open, title, description, theme_mode } = this.props;

    return (
      <div className={classes.root}>
        <Dialog open={open} PaperProps={{ style: { borderRadius: 10 } }}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <img
                className={classes.alerticon}
                alt="alert"
                src={`/static/images/icons/${theme_mode}/alert.png`}
              />
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <IconButton
                onClick={this.handleOK}
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
          </div>
        </Dialog>
      </div>
    );
  }
}

DlgAlert.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  theme_mode: PropTypes.string,
  onOK: PropTypes.func
};

export default withStyles(styles)(DlgAlert);

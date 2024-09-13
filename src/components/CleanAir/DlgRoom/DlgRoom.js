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
import { THEME_MODE_DARK } from "../../../constants/types";

const styles = (theme) => ({
  root: {},
  grow: {
    flexGrow: 1,
  },
  appBar: {
    position: "relative",
    padding: 0,
    margin: 0,
  },
  caption: {
    flex: 1,
    marginLeft: theme.spacing(2),
    minWidth: 150,
    fontSize: 16,
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
  title: {
    backgroundColor: theme.palette.background.card,
    padding: 4,
    marginTop: 0,
    margin: theme.spacing(1),
  },
  text: {
    flex: 1,
    color: theme.palette.text.primary,
    margin: 0,
    "& input": {
      fontSize: 16,
      fontWeight: 18,
    },
  },
});

class DlgRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const { title } = this.state;
    this.props.onSubmit(title);
    this.setState({
      ...this.state,
      title: "",
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      title: "",
    });
    this.props.onClose();
  };

  render() {
    const { classes, open, theme } = this.props;
    const { title } = this.state;

    const enabled = title.trim() ? true : false;
    const button_class = enabled
      ? classes.actionbutton
      : classes.actionbutton_disabled;
    const bgColor = theme === THEME_MODE_DARK ? "black" : "white";
    return (
      <div className={classes.root}>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              borderRadius: 0,
              border: `1px solid`,
              backgroundColor: bgColor,
            },
          }}
        >
          <div>
            <AppBar className={classes.appBar}>
              <Toolbar style={{ height: "48px", minHeight: "48px" }}>
                <Typography variant="h6" className={classes.caption}>
                  Add a New Room
                </Typography>
                <div className={classes.grow} />
                <IconButton
                  onClick={enabled ? this.handleSubmit : null}
                  className={button_class}
                  style={{ marginRight: 4 }}
                >
                  <img
                    className={classes.actionimg}
                    alt="apply"
                    src="/static/images/approve.png"
                  />
                </IconButton>
                <IconButton
                  onClick={this.handleClose}
                  className={classes.actionbutton}
                >
                  <img
                    className={classes.actionimg}
                    alt="cancel"
                    src="/static/images/dismiss.png"
                  />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
          <div className={classes.title}>
            <InputBase
              id="room-title"
              className={classes.text}
              fullWidth
              name="title"
              placeholder="title"
              autoFocus={true}
              value={title}
              onChange={this.handleChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

DlgRoom.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  theme: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default withStyles(styles)(DlgRoom);

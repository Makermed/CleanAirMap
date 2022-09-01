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
    backgroundColor: theme.palette.background.dark,
  },
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.background.dark,
    padding: 0,
    margin: 0,
  },
  caption: {
    marginLeft: theme.spacing(6),
    flex: 1,
    width: 160,
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
    backgroundColor: theme.palette.background.dark,
    paddingTop: 0,
    padding: theme.spacing(1),
  },
  content: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 0,
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  text: {
    flex: 1,
    color: theme.palette.text.primary,
    width: 300,
    margin: 0,
    padding: 4,
    backgroundColor: theme.palette.background.light,
    "& input": {
      fontSize: 14,
      fontWeight: 18,
      backgroundColor: theme.palette.background.light,
    },
  },
});

class DlgComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: ""
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
    const { title, content } = this.state;
    this.props.onSubmit(title, content);
    this.setState({
      ...this.state,
      title: "",
      content: ""
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      title: "",
      content: ""
    });
    this.props.onClose();
  };

  render() {
    const { classes, open } = this.props;
    const { title, content } = this.state;

    const enabled = title.trim().length > 0 && content.trim().length > 0 ? true : false;
    const button_class = enabled ? classes.actionbutton : classes.actionbutton_disabled;

    return (
      <div className={classes.root}>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{ style: { borderRadius: 10 } }}
        >
          <div>
            <AppBar className={classes.appBar}>
              <Toolbar style={{height: '48px', minHeight: '48px'}}>
                <Typography variant="h6" className={classes.caption}>
                  Post a Comment
                </Typography>
                <IconButton
                  onClick={enabled ? this.handleSubmit : null}
                  className={button_class}
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
                    alt="apply"
                    src="/static/images/delete.png"
                  />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
          <div className={classes.title}>
            <InputBase
              id="comment-title"
              className={classes.text}
              fullWidth
              name="title"
              placeholder="title"
              value={title}
              onChange={this.handleChange}
            />
          </div>
          <div className={classes.content}>
            <InputBase
              id="comment-content"
              className={classes.text}
              multiline
              fullWidth
              rows="6"
              name="content"
              placeholder="post"
              value={content}
              onChange={this.handleChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

DlgComment.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  theme: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};

export default withStyles(styles)(DlgComment);

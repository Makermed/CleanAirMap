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
import StarIcon from "@material-ui/icons/Star";
import { is_valid_url } from "utility/utils";
import { THEME_MODE_LIGHT } from "constants/types";
import { ToastError } from "utility/toast";


const styles = (theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
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
  description: {
    backgroundColor: theme.palette.background.dark,
    marginTop: 0,
    margin: theme.spacing(2),
  },
  text: {
    flex: 1,
    color: theme.palette.text.primary,
    margin: 0,
    padding: 4,
    fontSize: 14,
    fontHeight: 18,
    backgroundColor: theme.palette.background.dark,
    "& input": {
      fontSize: 14,
      fontHeight: 18,
      backgroundColor: theme.palette.background.dark,
    },
  },
  link: {
    margin: 0,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.background.dark,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  url_input_edit: {
    flex: 1,
    color: theme.palette.text.secondary,
    width: `calc(100% - 36px)`,
    margin: "4px 0",
    padding: "0 8px",
    backgroundColor: theme.palette.background.dark,
    "& input": {
      fontSize: 14,
      backgroundColor: theme.palette.background.dark,
    }
  },
  icon_button: {
    padding: 4,
  },
  plus: {
    padding: 4,
    width: 24,
    height: 24,
  },
  emptylink: {
    marginBottom: theme.spacing(2),
  },
  subject_div: {
    float: "left",
    height: 16,
    width: 250,
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  subject_icon: {
    // position: "relative",
    float: "left",
    top: 3,
    marginLeft: 5,
    width: 16,
    height: 16,
    color: theme.palette.text.secondary,
  },
  subject_txt: {
    display: "inline",
    marginLeft: 2,
    fontSize: 11,
    fontStyle: "italic",
    color: theme.palette.text.secondary,
  },
});

class DlgPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      weblink: "",
      postlink: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);
  }

  setError = message => {
    ToastError(message);
  };

  handleChange = (event) => {
    if (event.target.value.length > 5000) {
      return;
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const { description, postlink } = this.state;
    if (description.trim() === "" && postlink === "") {
      return
    }

    this.props.onSubmit(description, postlink);
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleAddLink = () => {
    const { description, weblink, postlink } = this.state;
    if (!is_valid_url(weblink)) {
      this.setError("Invalid Url format! Check if the url is correct.");
      return;
    }

    let new_description = description + '\n' + weblink + '\n';
    this.setState({
      ...this.state,
      description: new_description,
      postlink: postlink === "" ? weblink : postlink
    });
  }

  render() {
    const { classes, open, moderator, theme } = this.props;
    const { description, weblink, postlink } = this.state;

    const enabled = description.trim().length > 0 || postlink !== "";
    const button_class = enabled ? classes.actionbutton : classes.actionbutton_disabled;

    const paper_style = {
      borderRadius: 10,
      backgroundColor: theme === THEME_MODE_LIGHT ? "white" : "black"
    };

    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: paper_style }}
      >
        <div>
          <AppBar className={classes.appBar}>
            <Toolbar style={{height: '48px', minHeight: '48px'}}>
              <Typography variant="h6" className={classes.caption}>
                Add a Post
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
        <div className={classes.description}>
          <InputBase
            id="post-description"
            className={classes.text}
            multiline
            fullWidth
            rows="6"
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
          />
        </div>
        <div className={classes.link}>
          <IconButton
            className={classes.icon_button}
            onClick={this.handleAddLink}
          >
            <img
              className={classes.plus}
              alt={"addlink"}
              src={`/static/images/icons/${theme}/plus.png`}
            />
          </IconButton>
          <InputBase
            className={classes.url_input_edit}
            name="weblink"
            value={weblink}
            placeholder={"Web link or social media post"}
            inputProps={{ "aria-label": "link-url" }}
            onChange={this.handleChange}
          />
        </div>
        {moderator === undefined &&
          <div className={classes.subject_div}>
            <StarIcon className={classes.subject_icon} />
            <Typography className={classes.subject_txt}>
              {"Subject to moderation"}
            </Typography>
          </div>
        }
        {moderator !== undefined &&
          <div className={classes.emptylink} />
        }
      </Dialog>
    );
  }
}

DlgPost.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  theme: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func
};

export default withStyles(styles)(DlgPost);

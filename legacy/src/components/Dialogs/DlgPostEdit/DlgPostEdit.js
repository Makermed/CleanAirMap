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
  Button
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { is_valid_url, get_urls } from "utility/utils";
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
    marginLeft: theme.spacing(1),
  },
  actionbutton_disabled: {
    padding: 0,
    margin: 0,
    marginLeft: theme.spacing(1),
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
    marginBottom: 0,
  },
  text: {
    flex: 1,
    color: theme.palette.text.primary,
    margin: 0,
    padding: 8,
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
  buttoncontainer: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
  },
  applybtn: {
    bottom: theme.spacing(1),
    zIndex: 1100,
    backgroundColor: "#1878F3",
    color: "#FFFFFF",
    borderRadius: "30px",
    padding: "8px 8px",
    fontSize: "16px",
    width: 260,
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: "#1878F3",
      color: "#FFFFFF",
    }
  },
  applybtn_disabled: {
    bottom: theme.spacing(1),
    zIndex: 1100,
    backgroundColor: "#1878F3",
    color: "#FFFFFF",
    borderRadius: "30px",
    padding: "8px 8px",
    fontSize: "16px",
    width: 260,
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: "#3AB54A",
      color: "#FFFFFF",
    },
    opacity: 0.38,
  },
});

class DlgPostEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
   };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount = () => {
    const { article } = this.props;
    this.setState({
      ...this.state,
      description: article.text
    });
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
    const { description } = this.state;
    if (!description.trim()) {
      return
    }

    const urls = get_urls(description);
    // console.log("urls :", urls);

    let postlink = "";
    if (urls) {
      for (let url of urls) {
        if (!is_valid_url(url)) {
          continue;
        }
        postlink = url;
      }
    }

    this.props.onSubmit(description, postlink);
    this.setState({
      ...this.state,
      description: ""
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      description: ""
    });
    this.props.onClose();
  };

  render() {
    const { classes, open, moderator, theme } = this.props;
    const { 
      description, 
    } = this.state;

    const paper_style = {
      borderRadius: 10,
      backgroundColor: theme === THEME_MODE_LIGHT ? "white" : "black"
    };

    let apply_enabled = false;
    if (description.trim()) {
      apply_enabled = true;
    }

    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: paper_style }}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <div>
          <AppBar className={classes.appBar}>
            <Toolbar style={{height: '48px', minHeight: '48px'}}>
              <Typography variant="h6" className={classes.caption}>
                Update Post
              </Typography>
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
            rows="9"
            name="description"
            placeholder="Description"
            value={description}
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
        <div className={classes.buttoncontainer}>
          {apply_enabled &&
            <Button
              className={classes.applybtn}
              onClick={this.handleSubmit}
            >
              Update
            </Button>
          }
          {!apply_enabled &&
            <Button
              className={classes.applybtn}
              style={{opacity: 0.38}}
            >
              Update
            </Button>
          }
        </div>
      </Dialog>
    );
  }
}

DlgPostEdit.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  theme: PropTypes.string,
  article: PropTypes.object,
  moderator: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func
};

export default withStyles(styles)(DlgPostEdit);

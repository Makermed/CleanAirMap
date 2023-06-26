import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Box,
  IconButton,
  Typography,
  InputBase,
  Popover
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import { UserLinkPad } from "components";
import { USERLINK_UNKNOWN, conf_userlinks } from "constants/userlinks";
import { fetch_linkimage } from "utility/ravenapi";
import { ToastError } from "utility/toast";


const MODE_READ = 0;
const MODE_EDIT = 1;


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  link_container: {
    backgroundColor: theme.palette.background.article,
    marginTop: 4,
    borderRadius: 24,
  },
  icon_button: {
    padding: 4,
    marginLeft: 4,
    color: theme.palette.primary.contrastText
  },
  link_image: {
    padding: 2,
    width: 24,
    height: 24,
  },
  url_input: {
    flex: 1,
    width: `calc(100% - 72px)`,
    color: theme.palette.text.primary,
    margin: "2px 0px 2px 4px",
    padding: "0 8px 0 8px",
    borderRadius: 4,
    backgroundColor: theme.palette.background.default,
    "& input": {
      fontSize: 14,
      backgroundColor: theme.palette.background.default,
    },
  },
  url_text: {
    flex: 1,
    width: `calc(100% - 72px)`,
    color: theme.palette.text.primary,
    margin: "2px 0px 2px 4px",
    padding: "0 8px 0 8px",
    backgroundColor: theme.palette.background.paper,
  },
  delete_button: {
    float: "right",
    padding: 4,
    color: theme.palette.primary.contrastText
  },
  delete_img: {
    padding: 2,
    width: 24,
    height: 24,
  },
  description_container: {
    backgroundColor: theme.palette.background.article,
    marginTop: 2,
    marginLeft: 36,
    borderRadius: 24,
  },
  description_input: {
    flex: 1,
    width: `calc(100% - 36px)`,
    color: theme.palette.text.primary,
    margin: "2px 0px 2px 4px",
    padding: "0 8px 0 8px",
    borderRadius: 20,
    backgroundColor: theme.palette.background.default,
    "& input": {
      fontSize: 14,
      backgroundColor: theme.palette.background.default,
    },
  },
  edit_button: {
    float: "right",
    padding: 4,
    color: theme.palette.primary.contrastText
  },
  edit_img: {
    padding: 0,
    width: 24,
    height: 24,
  }
});

class UserLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: MODE_READ,
      type: USERLINK_UNKNOWN,
      image: "",
      url: "",
      description: "",
      anchorEl: null,
      counter: 0
    };

    this.handleEditMode = this.handleEditMode.bind(this);
    this.handleClickLinkIcon = this.handleClickLinkIcon.bind(this);
    this.handleSelectLink = this.handleSelectLink.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleDeleteLink = this.handleDeleteLink.bind(this);
    this.handleApply = this.handleApply.bind(this);
  }

  componentDidMount = () => {
    const { link } = this.props;
    let mode = MODE_READ;
    if (!link.url || !link.description) {
      mode = MODE_EDIT;
    }
    this.setState({
      ...this.state,
      mode  : mode,
      type  : link.type,
      image : link.image,
      url   : link.url,
      description : link.description
    });
  }

  componentDidUpdate = (prevProps) => {
    const { link } = this.props;

    if (!link || (prevProps.link && prevProps.link.id === link.id)) {
      return;
    }

    let mode = this.state.mode;
    if (!link.url || !link.description) {
      mode = MODE_EDIT;
    }
    this.setState({
      ...this.state,
      mode: mode,
      type: link.type,
      image: link.image,
      url: link.url,
      description: link.description
    });
  }

  setError = (message) => {
    ToastError(message);
  }

  handleEditMode = () => {
    this.setState({
      ...this.state,
      mode: MODE_EDIT
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleKeyPress = async (event) => {
    if (event.key !== "Enter") {
      return;
    }
     
    const { url, type } = this.state;
    if (type !== USERLINK_UNKNOWN && url.length === 0) {
      return;
    }

    const linkImage = await fetch_linkimage(url);
    if (!linkImage) {
      const image = `/static/images/icons/${this.props.theme_mode}/${conf_userlinks[0].image}`;
      this.setState({
        ...this.state,
        image: image
      });
    } else {
      this.setState({
        ...this.state,
        image: linkImage
      });
    }
  };

  handleClickLinkIcon = event => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget
    });
  };

  handleSelectLink = (link) => {
    if (link.type === this.state.type) {
      this.setState({
        ...this.state,
        anchorEl: null
      });
    } else {
      this.setState({
        ...this.state,
        type: link.type,
        anchorEl: null
      })
    }
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null
    });
  };

  handleDeleteLink = () => {
    this.props.onDelete(this.props.id);
  };

  handleApply = () => {
    this.setState({
      ...this.state,
      mode: MODE_READ,
      anchorEl: null
    });

    const { id } = this.props;
    const { type, image, url, description } = this.state;
    if (!url.trim()) {
      this.setError("Link Url is empty!");
      return;
    }
    if (!url.startsWith("http")) {
      this.setError("Invalid Link Url!");
      return;
    }
    if (!description.trim()) {
      this.setError("Link text is empty!");
      return;
    }

    const new_link = {
      id: id,
      type: type,
      image: image,
      url: url.trim(),
      description: description.trim()
    }
    this.props.onApply(new_link);
  }

  render() {
    const { classes, theme_mode } = this.props;
    const { mode, type, image, url, description, anchorEl } = this.state;

    if (!type) {
      return <div></div>;
    }

    let link_image = "";
    let userlink = conf_userlinks.find(link => link.type === type);
    if (type === USERLINK_UNKNOWN) {
      if (!image) {
        link_image = `/static/images/icons/${theme_mode}/${userlink.image}`;
      } else {
        link_image = image;
      }
    } else {
      link_image = `/static/images/icons/${theme_mode}/${userlink.image}`;
    }

    return (
      <div className={classes.root}>
        {mode === MODE_READ && 
          <Box className={classes.link_container}>
            <IconButton className={classes.icon_button}>
              <img
                className={classes.link_image}
                alt="link"
                src={link_image}
              />
            </IconButton>
            <Typography className={classes.url_text}>{description}</Typography>
            <IconButton
              onClick={this.handleEditMode}
              className={classes.edit_button}
            >
              <img
                className={classes.edit_img}
                alt="edit"
                src={`/static/images/edit.png`}
              />
            </IconButton>
          </Box>
        }
        {mode === MODE_EDIT &&
          <div>
            <Box className={classes.link_container}>
              <IconButton
                className={classes.icon_button}
                onClick={this.handleClickLinkIcon}
              >
                <img
                  className={classes.link_image}
                  alt="link"
                  src={link_image}
                />
              </IconButton>
              <InputBase
                name={url}
                value={url}
                className={classes.url_input}
                placeholder={"Link url"}
                inputProps={{ "aria-label": "link-url", "padding": 0 }}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
              <IconButton
                onClick={this.handleDeleteLink}
                className={classes.delete_button}
              >
                <RemoveIcon />
              </IconButton>
            </Box>
            <Box className={classes.description_container}>
              <InputBase
                name={description}
                value={description}
                className={classes.description_input}
                placeholder={"Link text"}
                inputProps={{ "aria-label": "link-url", "padding": 0 }}
                onChange={this.handleChange}
              />
              <IconButton
                onClick={this.handleApply}
                className={classes.edit_button}
              >
                <img
                  className={classes.edit_img}
                  alt="apply"
                  src={`/static/images/approve.png`}
                />
              </IconButton>
            </Box>
          </div>
        }
        {mode === MODE_EDIT &&
          <Popover
            id="link-pad"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <UserLinkPad 
              selected={type}
              theme={theme_mode}
              onSelect={this.handleSelectLink} 
            />
          </Popover>
        }
        
        {/* <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          id="userlink-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {conf_userlinks.map((item, index) => (
            <MenuItem
              className={classes.menu_item}
              key={index}
              disabled={
                links.find(link => link.type === item.name) !== undefined
              }
              selected={item.name === type}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              <Icon className={classes.social_icon}>
                <i className={item.icon}></i>
              </Icon>
            </MenuItem>
          ))}
        </Menu> */}
      </div>
    );
  }
}

UserLink.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.string,
  link: PropTypes.object,
  theme_mode: PropTypes.string,
  onApply: PropTypes.func,
  onDelete: PropTypes.func
};

export default withStyles(styles)(UserLink);

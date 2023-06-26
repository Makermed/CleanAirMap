import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Box, IconButton, InputBase, Popover } from "@material-ui/core";
import { BranchPad } from "components";
import { 
  BRANCH_ALL, 
  ARTICLE_BRANCH_NEWSPAPER, 
  ARTICLE_BRANCH_YOUTUBE,
  CONF_BRANCHES, 
  ARTICLE_BRANCH_RSSFEED,
  ARTICLE_BRANCH_PODCAST
} from "constants/branches";
import { ToastError } from "utility/toast";


const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: theme.palette.background.main,
    marginTop: 4,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    borderRadius: 4,
  },
  container_selected: {
    backgroundColor: theme.palette.background.main,
    marginTop: 4,
    borderRadius: 4,
  },
  url_input: {
    flex: 1,
    width: `calc(100% - 64px)`,
    color: theme.palette.text.secondary,
    margin: "2px 0 2px 0",
    padding: "0 4px 0 4px",
    backgroundColor: theme.palette.background.default,
    "& input": {
      fontSize: 14,
      backgroundColor: theme.palette.background.default,
    }
  },
  url_input_edit: {
    flex: 1,
    width: `calc(100% - 112px)`,
    color: theme.palette.text.secondary,
    margin: "2px 0 2px 0",
    padding: "0 4px 0 4px",
    backgroundColor: theme.palette.background.default,
    "& input": {
      fontSize: 14,
      backgroundColor: theme.palette.background.default,
    }
  },
  weblink_container: {
    backgroundColor: theme.palette.background.main,
    marginTop: theme.spacing(1),
    marginLeft: 80,
    borderRadius: 4,
  },
  weblink_input_edit: {
    flex: 1,
    width: `calc(100% - 48px)`,
    color: theme.palette.text.secondary,
    margin: "2px 0 2px 0",
    padding: "0 2px 0 2px",
    backgroundColor: theme.palette.background.default,
    "& input": {
      fontSize: 14,
      backgroundColor: theme.palette.background.default,
    }
  },
  icon_button: {
    padding: 4,
  },
  branchicon: {
    padding: 6,
    width: 32,
    height: 32,
  },
  apply_button: {
    padding: 0,
    paddingLeft: 4,
    margin: 0,
  },
  delete_button: {
    padding: 0,
    margin: 0,
  },
  actionimg: {
    padding: 0,
    width: 32,
    height: 32
  },
  actionimg_disabled: {
    padding: 0,
    width: 32,
    height: 32,
    opacity: 0.38
  },
});

class SourceLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: -1,
      branch: ARTICLE_BRANCH_YOUTUBE,
      socialtype: "",
      source: "",
      weblink: "",
      changed: false,
      anchorEl: null,
      counter: 0
    };

    this.handleClickBranchIcon = this.handleClickBranchIcon.bind(this);
    this.handleSelectBranch = this.handleSelectBranch.bind(this);

    this.handleChangeSource = this.handleChangeSource.bind(this);
    this.handleClickSource = this.handleClickSource.bind(this);
    this.handleChangeWeblink = this.handleChangeWeblink.bind(this);

    this.handleApply = this.handleApply.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  setError = (message) => {
    ToastError(message);
  };

  componentDidMount() {
    const { link } = this.props;
    // console.log("link :", link);
    if (link) {
      this.setState({
        ...this.state,
        id: link.id,
        branch: link.branch,
        socialtype: link.socialtype,
        source: link.source,
        weblink: link.weblink
      });
    } 
  }

  componentDidUpdate(prevProps) {
    const { link } = this.props;

    if (!link || (prevProps.link && prevProps.link.id === link.id)) {
      return;
    }

    this.setState({
      ...this.state,
      id: link.id,
      branch: link.branch,
      socialtype: link.socialtype,
      source: link.source,
      weblink: link.weblink
    });
  }

  handleClickBranchIcon = (event) => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget
    });
  };

  handleSelectBranch = (branch) => {
    if (branch.value === this.state.branch) {
      return;
    }

    let socialtype_id = "";
    if (branch.value !== BRANCH_ALL && branch.value !== ARTICLE_BRANCH_NEWSPAPER) {
      const { socialtypes } = this.props;
      const socials = socialtypes.filter(socialtype => socialtype.branch === branch.value);
      socialtype_id = socials[0].id;
    }

    this.setState({
      ...this.state,
      branch: branch.value,
      socialtype: socialtype_id,
      // source: "",
      changed: true,
      anchorEl: null,
      counter: 0
    });
    this.props.onChanged(true);
  };

  handleChangeSource = (event) => {
    const value = event.target.value;
    const changed = value.length !== 0;

    this.setState({
      ...this.state,
      source: value,
      changed: changed,
      error: false
    });
    this.props.onChanged(changed);
  };

  // change socialtype when click the blank input box of source
  handleClickSource = () => {
    const { socialtypes } = this.props;
    const { branch, source, counter } = this.state;

    if (!source) {
      return;
    }

    let socialtype_id = '';
    const new_counter = counter + 1;
    if (branch !== BRANCH_ALL && branch !== ARTICLE_BRANCH_NEWSPAPER) {
      const socials = socialtypes.filter(socialtype => socialtype.branch === branch);
      socialtype_id = socials[new_counter % socials.length].id;
    }

    this.setState({
      ...this.state,
      socialtype: socialtype_id,
      counter: new_counter
    });
  };

  handleChangeWeblink = (event) => {
    const value = event.target.value;
    const changed = value.length !== 0;

    this.setState({
      ...this.state,
      weblink: value,
      changed: changed,
      error: false
    });
    this.props.onChanged(changed);
  };


  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  handleDelete = () => {
    this.props.onDelete(this.state.id);
  };

  handleApply = () => {
    const { id, branch, socialtype, source, weblink } = this.state;
    // console.log("branch :", branch);
    if (id === -1 || branch === -1) {
      this.setError("Select a valid branch first");
      return;
    }
    if (!source.trim()) {
      this.setError("Input a valid source please");
      return;
    }
    if (branch === ARTICLE_BRANCH_RSSFEED || branch === ARTICLE_BRANCH_PODCAST) {
      if (!weblink.trim()) {
        this.setError("Input a web link please");
        return;
      }
    }

    this.props.onApply(id, branch, socialtype, source.trim(), weblink.trim());

    this.setState({
      ...this.state,
      changed: false
    });
  };

  render() {
    const { 
      classes, 
      selected, 
      editonly, 
      socialtypes, 
      theme 
    } = this.props;
    const { 
      id, 
      branch, 
      socialtype, 
      source, 
      weblink,
      changed, 
      anchorEl
    } = this.state;

    if (branch === -1) {
      return <div></div>;
    }

    const socialtype_info = socialtypes.find(item => item.id === socialtype);

    let placeholder = "";
    if (!socialtype_info) {
      placeholder = "Newspaper Url";
    } else 
    {
      placeholder = socialtype_info.hint;
    }

    const branch_info = CONF_BRANCHES.find(item => item.value === branch);
    const actionimg_class = changed ? classes.actionimg : classes.actionimg_disabled;

    return (
      <div className={classes.root}>
        {selected && (
          <div>
            <Box className={classes.container_selected}>
              <IconButton
                className={classes.icon_button}
                onClick={this.handleClickBranchIcon}
              >
                <img
                  className={classes.branchicon}
                  alt={`${branch_info.name}`}
                  src={`/static/images/icons/${theme}/${branch_info.image}`}
                />
              </IconButton>
              <InputBase
                name="source"
                value={source}
                className={classes.url_input_edit}
                placeholder={placeholder}
                inputProps={{ "aria-label": "link-url" }}
                onChange={this.handleChangeSource}
                onClick={this.handleClickSource}
              />
              <IconButton
                onClick={changed ? this.handleApply : null}
                className={classes.apply_button}
              >
                <img
                  className={actionimg_class}
                  alt="apply"
                  src="/static/images/approve.png"
                />
              </IconButton>
              {editonly !== undefined ? (
                <IconButton
                  className={classes.delete_button}
                >
                  <img
                    className={classes.actionimg_disabled}
                    alt="delete"
                    src="/static/images/delete.png"
                  />
                </IconButton>
              ):(
                <IconButton
                  onClick={this.handleDelete}
                  className={classes.delete_button}
                >
                  <img
                    className={classes.actionimg}
                    alt="delete"
                    src="/static/images/delete.png"
                  />
                </IconButton>
              )}
            </Box>
            <Popover
              id="branch-menu"
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
              <BranchPad 
                selected={branch}
                theme={theme}
                onSelect={this.handleSelectBranch} 
              />
            </Popover>
          </div>
        )}
        {!selected && (
          <div onClick={event => this.props.onSelect(id)}>
            <Box className={classes.container}>
              <IconButton className={classes.icon_button}>
                <img
                  className={classes.branchicon}
                  alt={`${branch_info.name}`}
                  src={`/static/images/icons/${theme}/${branch_info.image}`}
                />
              </IconButton>
              <InputBase
                name="source"
                value={source}
                className={classes.url_input}
                placeholder={placeholder}
                inputProps={{ "aria-label": "link-url" }}
              />
            </Box>
          </div>
        )}
        {(branch === ARTICLE_BRANCH_RSSFEED || branch === ARTICLE_BRANCH_PODCAST) && 
          <Box className={classes.weblink_container}>
            <IconButton className={classes.icon_button}>
              <img
                className={classes.branchicon}
                alt={`${branch_info.name}`}
                src={`/static/images/icons/${theme}/weblink.png`}
              />
            </IconButton>
            <InputBase
              name="weblink"
              value={weblink}
              className={classes.weblink_input_edit}
              placeholder={"web link"}
              inputProps={{ "aria-label": "weblink-url" }}
              onChange={this.handleChangeWeblink}
            />
          </Box>
        }
      </div>
    );
  }
}

SourceLink.propTypes = {
  classes: PropTypes.object,
  editonly: PropTypes.any,
  selected: PropTypes.bool,
  theme: PropTypes.string,
  socialtypes: PropTypes.array,
  link: PropTypes.object,
  onApply: PropTypes.func,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onChanged: PropTypes.func
};

export default withStyles(styles)(SourceLink);

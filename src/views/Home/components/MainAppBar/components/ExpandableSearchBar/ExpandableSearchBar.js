import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const animationStyle = {
  transition: "width 0.35s cubic-bezier(0.000, 0.395, 0.000, 1.000)"
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    position: "absolute",
    top: 0,
    right: 50,
    [theme.breakpoints.up("md")]: {
      right: 70
    },
    zIndex: 1
  },
  rootExpand: {
    flexGrow: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    transform: "inherit",
    zIndex: 1
  },
  searchbar: {
    display: "flex",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    margin: 0,
    borderRadius: 16,
    alignItems: "center",
    height: 32,
    minHeight: 32,
    backgroundColor: theme.palette.background.main
  },
  searchIconButton: {
    margin: 0,
    padding: 0,
    color: theme.palette.text.secondary
  },
  searchIcon: {
    margin: 0,
    padding: 0,
    color: theme.palette.text.secondary
  },
  searchOpen: {
    width: "100% - 50",
    [theme.breakpoints.up("md")]: {
      width: "100% - 70"
    },
  },
  searchClosed: {
    width: "0%",
  },
  input: {
    marginLeft: 0,
    marginRight: theme.spacing(2),
    flex: 1,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.light,
    fontSize: 14,
    border: "none",
    height: 28
  },
  arrowIcon: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.constrastText
  }
});

class ExpandableSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTxt: "",
      isOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      searchTxt: event.target.value
    });
    this.props.onSearchChange(event.target.value);
  };

  handleSearch = event => {
    if (event.key === "Enter") {
      if (this.state.searchTxt.length > 0) {
        this.props.onSearchEnter(this.state.searchTxt);
        // history.push(ROUTES.SEARCH_RESULT);
      }
    }
  };

  handleClick = () => {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen,
      searchTxt: ""
    });
  };

  render() {
    const { classes } = this.props;
    const { isOpen, searchTxt } = this.state;

    const openOrClose = isOpen ? classes.searchOpen : classes.searchClosed;
    const rootStyle = isOpen ? classes.rootExpand : classes.root;

    return (
      <div className={classNames(rootStyle, openOrClose)}>
        <Paper
          className={classNames(classes.searchbar, openOrClose)}
          style={animationStyle}
        >
          {isOpen ? (
            <IconButton
              className={classes.searchIconButton}
              onClick={this.handleClick}
              aria-label="Search"
            >
              <ArrowBackIosIcon className={classes.arrowIcon} />
            </IconButton>
          ) : (
            ""
          )}
          <InputBase
            className={classNames(classes.input, openOrClose)}
            style={animationStyle}
            placeholder={"Search"}
            value={searchTxt}
            onChange={this.handleChange}
            onKeyPress={this.handleSearch}
          />
          {!isOpen ? (
            <IconButton
              className={classes.searchIconButton}
              onClick={this.handleClick}
              aria-label="Search"
            >
              <SearchIcon />
            </IconButton>
          ) : (
            ""
          )}
        </Paper>
      </div>
    );
  }
}

ExpandableSearchBar.propTypes = {
  classes: PropTypes.object,
  onSearchChange: PropTypes.func,
  onSearchEnter: PropTypes.func
};

export default withStyles(styles)(ExpandableSearchBar);

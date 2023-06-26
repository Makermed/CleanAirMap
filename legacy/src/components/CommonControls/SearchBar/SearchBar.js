import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { ActionCreators } from "actions";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import { Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
    width: "100%",
    position: "absolute",
    top: 0,
    transform: "inherit",
    zIndex: 1
  },
  searchbar: {
    display: "flex",
    marginBottom: 0,
    margin: theme.spacing(1),
    borderRadius: 10,
    alignItems: "center",
    height: 40,
    minHeight: 40,
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
    }
  },
  searchClosed: {
    width: "0%"
  },
  input: {
    marginLeft: 0,
    marginRight: theme.spacing(2),
    flex: 1,
    color: theme.palette.text.primary,
    fontSize: 14,
    border: "none",
    height: 28
  },
  arrowIcon: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.constrastText
  }
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTxt: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange = event => {
    this.setState({
      searchTxt: event.target.value
    });
    this.props.onSearchChange(event.target.value);
  };

  handleSearch = event => {
    if (event.key === "Enter") {
      // if (this.state.searchTxt.length > 0) {
        this.props.onSearchEnter(this.state.searchTxt);
        // history.push(ROUTES.SEARCH_RESULT);
      // }
    }
  };

  render() {
    const { 
      classes, 
      isOpen, 
      width,
      onClick, 
      additionalStyles 
    } = this.props;
    const openOrClose = isOpen ? classes.searchOpen : classes.searchClosed;
    const rootStyle = isOpen ? classes.rootExpand : classes.root;

    const textStyle = additionalStyles ? additionalStyles.text : {};
    let searchBarStyle = {};
    if (additionalStyles) {
      searchBarStyle = {
        ...textStyle,
        ...additionalStyles.frame
      };
    } else {
      searchBarStyle = {...textStyle};
    }

    return (
      <div 
        className={classNames(rootStyle, openOrClose)}
        style={{width: width}}
      >
        <Paper
          className={classNames(classes.searchbar, openOrClose)}
          style={searchBarStyle}
        >
          {isOpen ? (
            <IconButton
              className={classes.searchIconButton}
              onClick={onClick}
              aria-label="Search"
            >
              <ArrowBackIosIcon className={classes.arrowIcon} />
            </IconButton>
          ) : (
            ""
          )}
          <InputBase
            className={classNames(classes.input, openOrClose)}
            style={textStyle}
            placeholder="Search"
            onChange={this.handleChange}
            onKeyPress={this.handleSearch}
          />
          {!isOpen ? (
            <IconButton
              className={classes.searchIconButton}
              onClick={onClick}
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

SearchBar.propTypes = {
  classes: PropTypes.object,
  isOpen: PropTypes.bool,
  additionalStyles: PropTypes.object,
  onClick: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSearchEnter: PropTypes.func
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(SearchBar)));

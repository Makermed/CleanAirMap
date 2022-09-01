import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { SearchBar } from "components";
import { MAX_WINDOW_WIDTH } from 'constants/types';

const animationStyle = {
  transition: "width 0.35s cubic-bezier(0.000, 0.395, 0.000, 1.000)"
};

class ExpandingSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchEnter = this.handleSearchEnter.bind(this);
  }

  handleSearchChange = searchKey => {
    this.props.onSearchChange(searchKey);
  };

  handleSearchEnter = searchKey => {
    this.props.onSearchEnter(searchKey);
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <SearchBar
        isOpen={this.state.isOpen}
        onClick={this.handleClick}
        onSearchChange={this.handleSearchChange}
        onSearchEnter={this.handleSearchEnter}
        additionalStyles={{ text: animationStyle, frame: animationStyle }}
      />
    );
  }
};


const styles = theme => ({
  root: {
    position: "fixed",
    width: theme.breakpoints.values.lg,
    maxWidth: "100%",
    height: "56px",
    zIndex: 1100,
  },
  appbar: {
    position: "absolute",
    // borderBottom: `2px solid ${theme.palette.text.secondary}`
  },
  toolbar: {
    padding: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  searchbox: {
    positionTop: theme.spacing(1),
    display: "flex"
  },
  title: {
    flexGrow: 1,
    position: "relative",
    width: "300px",
    maxWidth: "300px",
    marginTop: 0
  },
  navbefore: {
    color: theme.palette.text.primary
  }
});

class SearchAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchEnter = this.handleSearchEnter.bind(this);
  }

  handleNavBack = () => {
    // console.log("Handle Nav Back", this.props.history);
    // this.props.history.goback();
    // const { backroute } = this.props;
    // if (!backroute) {
    //   this.props.showTopNavbar(true);
    // }
    this.props.onNavBack();
  };

  handleSearchChange = searchKey => {
    this.props.onSearchChange(searchKey);
  };

  handleSearchEnter = searchKey => {
    this.props.onSearchEnter(searchKey);
  };

  render() {
    const { 
      classes, 
      title, 
      width 
    } = this.props;

    return (
      <div 
        className={classes.root} 
        style={{width: width === undefined ? MAX_WINDOW_WIDTH : width}}
      >
        <AppBar className={classes.appbar}>
          <div className={classes.toolbox}>
            <ExpandingSearchBox
              onSearchChange={this.handleSearchChange}
              onSearchEnter={this.handleSearchEnter}
            />
          </div>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              className={classes.navbefore}
              aria-label="nav before"
              onClick={this.handleNavBack}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  width: PropTypes.number,
  onSearchChange: PropTypes.func,
  onSearchEnter: PropTypes.func,
  onNavBack: PropTypes.func
};

export default withStyles(styles)(SearchAppBar);

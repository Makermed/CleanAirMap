import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Avatar, Typography, Fade } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import _ from "lodash";
import { CONF_COUNTRIES, ALL } from "constants/country";
import { 
  CONF_BRANCHES, 
  BRANCH_ALL, 
  ARTICLE_BRANCH_NEWSPAPER,
  ARTICLE_BRANCH_HACKERNEWS,
  ARTICLE_BRANCH_SLASHDOT,
  ARTICLE_BRANCH_MAPPOST_TWITTER,
  ARTICLE_BRANCH_MAPPOST_INSTAGRAM, 
  ARTICLE_BRANCH_USERPOST 
} from "constants/branches";
import { 
  MIN_CARD_WIDTH, 
  MAX_WINDOW_WIDTH 
} from "constants/types";
import { is_source_alive } from "utility/utils";

const styles = theme => ({
  root: {
    position: "fixed",
    width: theme.breakpoints.values.lg,
    maxWidth: "100%",
    zIndex: 1100
  },
  appbar: {
    position: "absolute",
    bottom: theme.spacing(1),
  },
  indicator: {
    backgroundColor: theme.palette.primary.contrastText
  },
  countrytabs: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: 2,
    margin: 0,
    minHeight: 28,
    minWidth: MIN_CARD_WIDTH,
    maxWidth: 960,
    borderRadius: 15,
    backgroundColor: theme.palette.background.default,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`
  },
  countrytab: {
    padding: 0,
    minWidth: 36,
    minHeight: 26,
    fontFamily: "Arial",
    fontSize: 14,
    textTransform: "inherit",
    fullWidth: false,
    backgroundColor: theme.palette.background.default
  },
  tabbutton: {
    marginLeft: 5,
    marginRight: 5,
    padding: 0,
    minWidth: 24,
    maxHeight: 24,
    textTransform: "inherit",
    backgroundColor: theme.palette.background.default,
    border: "none"
  },
  all: {
    textAlign: "center",
    fontFamily: "Arial",
    fontSize: 14
  },
  code: {
    textAlign: "center",
    fontFamily: "Arial",
    color: theme.palette.primary.contrastText,
    fontSize: 12
  },
  avatar: {
    margin: 0,
    width: 24,
    height: 24
  },
  branchtabs: {
    margin: 0,
    minHeight: 32,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    minWidth: MIN_CARD_WIDTH,
    maxWidth: 960,
    paddingBottom: 2,
    borderRadius: 15,
    backgroundColor: theme.palette.background.default,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`
  },
  branchtab: {
    marginRight: 10,
    padding: 0,
    minWidth: 36,
    minHeight: 30,
    fontFamily: "Arial",
    fontSize: 14,
    textTransform: "inherit",
    fullWidth: false,
    backgroundColor: theme.palette.background.default
  },
  branchimg: {
    margin: 0,
    width: 20,
    height: 20
  }
});

class BottomNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChangeBranch = this.handleChangeBranch.bind(this);
  }

  handleChangeCountry = (event, newValue) => {
    if (newValue === null) return;
    const { country } = this.props;
    if (country === newValue) return;

    // console.log("Change Country New Value :", newValue);
    this.props.onChangeCountry(newValue);
  };

  handleChangeBranch = (event, newValue) => {
    if (newValue === null) return;
    const { branch } = this.props;
    if (branch === newValue) return;

    // console.log("Change Branch Value :", newValue);
    this.props.onChangeBranch(newValue);
  };

  render() {
    const {
      classes,
      newssites,
      sources,
      country,
      branch,
      show,
      selected_feeds,
      show_all_branch,
      theme_mode
    } = this.props;

    let countries = [];
    let branches = [];
    if (show_all_branch) {
      // This is a case that user don't follow any feeds,
      // then the app should show articles of all the branches and countries
      countries = CONF_COUNTRIES.slice();
      branches = CONF_BRANCHES.slice(1).filter(branch => branch.value !== ARTICLE_BRANCH_MAPPOST_TWITTER && branch.value !== ARTICLE_BRANCH_MAPPOST_INSTAGRAM);
    } else {
      // In this case, user follows some feeds,
      // the the app should show only articles of the feeds the user followed

      // get sources from the selected feeds
      let source_ids = [];
      for (let feed of selected_feeds) {
        let feed_source_ids = feed.feed_sources
          .filter(feed_source => 
            feed_source.approved && 
            is_source_alive(feed_source.source)
          )
          .map(feed_source => feed_source.source_id);
        source_ids = _.union(source_ids, feed_source_ids);
      }

      let selected_sources = 
        source_ids
          .map(source_id => _.find(sources, { id: source_id }))
          .filter(source => source !== undefined);

      // get branches from the sources
      let branch_indexes = _.uniq(
        selected_sources.map(source => source.branch)
      );
      branch_indexes.sort((a, b) => a - b);
      branches = branch_indexes.map(index => 
        index !== ARTICLE_BRANCH_USERPOST ? CONF_BRANCHES[index + 1] : CONF_BRANCHES.slice(-1)[0] 
      );

      // get countries from the sources
      let news_sources = selected_sources.filter(
        source => source.branch === ARTICLE_BRANCH_NEWSPAPER
      );
      let country_codes = news_sources.map(source => {
        let newssite = _.find(newssites, { id: source.id });
        return newssite.country;
      });
      country_codes = _.uniq(country_codes);

      countries = country_codes.map(code =>
        _.find(CONF_COUNTRIES, { value: code })
      );
    }

    // delete YCombinator and Slashdot from the branches
    branches = branches.filter(branch => 
      branch.value !== ARTICLE_BRANCH_HACKERNEWS && 
      branch.value !== ARTICLE_BRANCH_SLASHDOT
    );

    let bottomPosition = 38;
    let showCountryTab = false;
    if (branch === ARTICLE_BRANCH_NEWSPAPER && countries.length > 0) {
      bottomPosition = 68;
      showCountryTab = true;
    }

    // check tab scrolling
    let branch_scroll = true;
    let allowable_count = Math.floor((window.innerWidth - 40) / 46) - 1;
    if (branches.length < allowable_count) {
      branch_scroll = false;
    }
    let country_scroll = true;
    allowable_count = Math.floor((window.innerWidth - 40) / 60) - 1;
    if (countries.length < allowable_count) {
      country_scroll = false;
    }

    let branchpos = 16;
    let countrypos = 16;
    if (window.innerWidth > MAX_WINDOW_WIDTH) {
      branchpos = (MAX_WINDOW_WIDTH - 960) / 2;
      countrypos = (MAX_WINDOW_WIDTH - 960) / 2;
    } else if (window.innerWidth > 960) {
      branchpos = (window.innerWidth - 960) / 2;
      countrypos = (window.innerWidth - 960) / 2;
    }

    return (
      <div className={classes.root} style={{ bottom: bottomPosition }}>
        <Fade in={show} timeout={{ enter: 300, exit: 300 }}>
          <AppBar className={classes.appbar}>
            {showCountryTab && country_scroll &&
              <Tabs
                className={classes.countrytabs}
                classes={{ indicator: classes.indicator }}
                style={{marginLeft: countrypos}}
                value={country}
                onChange={this.handleChangeCountry}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  value={ALL}
                  key={"All"}
                  className={classes.countrytab}
                  label={"All"}
                />
                {countries.map((item, index) => (
                  <Tab
                    value={item.value}
                    key={item.code3}
                    className={classes.countrytab}
                    icon={
                      <ToggleButton
                        className={classes.tabbutton}
                        value={item.code3}
                      >
                        <Avatar src={item.flag} className={classes.avatar} />
                        <Typography
                          className={classes.code}
                          style={{ opacity: 1.0 }}
                        >
                          {item.code3}
                        </Typography>
                      </ToggleButton>
                    }
                  />
                ))}
              </Tabs>
            }
            {showCountryTab && !country_scroll &&
              <Tabs
                className={classes.countrytabs}
                classes={{ indicator: classes.indicator }}
                style={{marginLeft: countrypos}}
                value={country}
                onChange={this.handleChangeCountry}
                centered
              >
                <Tab
                  value={ALL}
                  key={"All"}
                  className={classes.countrytab}
                  label={"All"}
                />
                {countries.map((item, index) => (
                  <Tab
                    value={item.value}
                    key={item.code3}
                    className={classes.countrytab}
                    icon={
                      <ToggleButton
                        className={classes.tabbutton}
                        value={item.code3}
                      >
                        <Avatar src={item.flag} className={classes.avatar} />
                        <Typography
                          className={classes.code}
                          style={{ opacity: 1.0 }}
                        >
                          {item.code3}
                        </Typography>
                      </ToggleButton>
                    }
                  />
                ))}
              </Tabs>
            }
            {branch_scroll ? (
              <Tabs
                className={classes.branchtabs}
                classes={{ indicator: classes.indicator }}
                style={{marginLeft: branchpos}}
                value={branch}
                onChange={this.handleChangeBranch}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  value={BRANCH_ALL}
                  key={"All"}
                  className={classes.branchtab}
                  label={"All"}
                />
                {branches.map((item, index) => (
                  <Tab
                    value={item.value}
                    key={item.name}
                    className={classes.branchtab}
                    icon={
                      <img
                        alt={item.name}
                        src={`/static/images/icons/${theme_mode}/${item.image}`}
                        className={classes.branchimg}
                      />
                    }
                  />
                ))}
              </Tabs>
            ) : (
              <Tabs
                className={classes.branchtabs}
                classes={{ indicator: classes.indicator }}
                style={{marginLeft: branchpos}}
                value={branch}
                onChange={this.handleChangeBranch}
                centered
              >
                <Tab
                  value={BRANCH_ALL}
                  key={"All"}
                  className={classes.branchtab}
                  label={"All"}
                />
                {branches.map((item, index) => (
                  <Tab
                    value={item.value}
                    key={item.name}
                    className={classes.branchtab}
                    icon={
                      <img
                        alt={item.name}
                        src={`/static/images/icons/${theme_mode}/${item.image}`}
                        className={classes.branchimg}
                      />
                    }
                  />
                ))}
              </Tabs>
            )}
          </AppBar>
        </Fade>
      </div>
    );
  }
}

BottomNavBar.propTypes = {
  classes: PropTypes.object,
  selected_feeds: PropTypes.array,
  show: PropTypes.bool,
  show_all_branch: PropTypes.bool,
  onChangeCountry: PropTypes.func,
  onChangeBranch: PropTypes.func
};


const mapStateToProps = state => ({
  sources: state.dataState.sources,
  newssites: state.dataState.newssites,
  country: state.dataState.country,
  branch: state.dataState.branch,
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BottomNavBar));

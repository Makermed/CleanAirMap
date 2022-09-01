import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Tabs, Tab } from "@material-ui/core";
import { 
  THEME_MODE_DARK, 
  TAB_LOC_READINGS,
  TAB_LOC_FEEDS, 
  TAB_LOC_MODERATORS, 
  MAX_ARTICLE_WIDTH 
} from "constants/types";

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    padding: 0
  },
  tabs: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: 18,
    // maxWidth: MAX_ARTICLE_WIDTH - 32,
    borderRadius: 12,
    backgroundColor: theme.palette.background.light,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`
  },
  indicator_light: {
    backgroundColor: "#1878f3",
  },
  indicator_dark: {
    backgroundColor: theme.palette.primary.contrastText,
  },
  tab_light: {
    padding: 0,
    minWidth: 120,
    fontWeight: 600,
    fontSize: 14,
    textTransform: "uppercase",
    color: "#1878f3",
  },
  tab_dark: {
    padding: 0,
    minWidth: 120,
    fontWeight: 600,
    fontSize: 14,
    textTransform: "uppercase",
    color: theme.palette.text.primary,
  },
  icon: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    margin: 0,
    width: 16,
    height: 16
  }
});

class LocationTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleLocationTab = this.handleLocationTab.bind(this);
  }

  handleLocationTab = (event, newValue) => {
    const { locationtab } = this.props;
    if (newValue === null) return;
    if (locationtab === newValue) return;

    this.props.onChangeTab(newValue);
  };

  render() {
    const { classes, locationtab, theme_mode } = this.props;

    const readings_tab = { value: TAB_LOC_READINGS, name: "Logged Values", icon: "edit.png" };
    const feeds_tab = { value: TAB_LOC_FEEDS, name: "Feed", icon: "home.png" };
    const moderators_tab = { value: TAB_LOC_MODERATORS, name: "Mod", icon: "moderator.png" };

    let classes_indicator = theme_mode === THEME_MODE_DARK ? classes.indicator_dark : classes.indicator_light;
    let classes_tab = theme_mode === THEME_MODE_DARK ? classes.tab_dark : classes.tab_light;

    const width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    const tabsWidth = width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH - 32 : width - 32;

    return (
      <div className={classes.root}>
        <Tabs
          className={classes.tabs}
          classes={{ indicator: classes_indicator }}
          value={locationtab}
          onChange={this.handleLocationTab}
          variant={width > MAX_ARTICLE_WIDTH ? "fullWidth": "scrollable"}
          style={{ width: tabsWidth}}
        >
          <Tab
            value={readings_tab.value}
            key={readings_tab.value}
            label={readings_tab.name}
            className={classes_tab}
            icon={
              <img
                alt={readings_tab.name}
                src={`/static/images/icons/${theme_mode}/${readings_tab.icon}`}
                className={classes.icon}
              />
            }
          />
          <Tab
            value={feeds_tab.value}
            key={feeds_tab.value}
            label={feeds_tab.name}
            className={classes_tab}
            icon={
              <img
                alt={feeds_tab.name}
                src={`/static/images/icons/${theme_mode}/${feeds_tab.icon}`}
                className={classes.icon}
              />
            }
          />
          <Tab
            value={moderators_tab.value}
            key={moderators_tab.value}
            label={moderators_tab.name}
            className={classes_tab}
            icon={
              <img
                alt={moderators_tab.name}
                src={`/static/images/icons/${theme_mode}/${moderators_tab.icon}`}
                className={classes.icon}
              />
            }
          />
        </Tabs>
      </div>
    );
  }
}

LocationTabs.propTypes = {
  classes: PropTypes.object,
  onChangeTab: PropTypes.func
};

const mapStateToProps = (state) => ({
  theme_mode: state.uiState.theme_mode,
  locationtab: state.mapState.locationtab
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(LocationTabs);

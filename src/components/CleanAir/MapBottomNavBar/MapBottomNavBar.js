import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { 
  AppBar, 
  Tabs, 
  Tab, 
  Avatar, 
  Typography, 
  Fade 
} from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import { 
  CONF_LOCATION_TYPES, 
  LOCATION_TYPE_ALL,
  CONF_MASKS,
  MASK_ALL
} from "constants/maplocation";
import { 
  MIN_CARD_WIDTH, 
  MAX_ARTICLE_WIDTH 
} from "constants/types";

const styles = theme => ({
  root: {
    position: "fixed",
    width: MAX_ARTICLE_WIDTH,
    maxWidth: "100%",
    bottom: 72,
    zIndex: 1100
  },
  appbar: {
    position: "absolute",
    bottom: theme.spacing(1),
  },
  indicator: {
    backgroundColor: theme.palette.primary.contrastText
  },
  masktabs: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: 2,
    margin: 0,
    minHeight: 30,
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    borderRadius: 15,
    backgroundColor: theme.palette.background.default,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`
  },
  masktab: {
    padding: 0,
    minWidth: 26,
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
  maskname: {
    textAlign: "center",
    fontFamily: "Arial",
    color: theme.palette.primary.contrastText,
    fontSize: 12,
    marginLeft: theme.spacing(1),
  },
  avatar: {
    margin: 0,
    width: 24,
    height: 24
  },
  typetabs: {
    margin: 0,
    minHeight: 36,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    paddingBottom: 2,
    borderRadius: 15,
    backgroundColor: theme.palette.background.default,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`
  },
  typetab: {
    marginRight: 4,
    padding: 0,
    paddingTop: 2,
    minWidth: 28,
    minHeight: 28,
    fontFamily: "Arial",
    fontSize: 14,
    textTransform: "inherit",
    fullWidth: false,
    backgroundColor: theme.palette.background.default
  },
  typeimg: {
    margin: 0,
    padding: 2,
    width: 28,
    height: 28,
    borderRadius: "50%",
  }
});

class MapBottomNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeMask = this.handleChangeMask.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  handleChangeMask = (event, newValue) => {
    if (newValue === null) return;
    const { mask } = this.props;
    if (mask === newValue) return;

    this.props.onChangeMask(newValue);
  };

  handleChangeType = (event, newValue) => {
    if (newValue === null) return;
    const { locationtype } = this.props;
    if (locationtype === newValue) return;

    this.props.onChangeType(newValue);
  };

  render() {
    const {
      classes,
      mask,
      locationtype,
      show,
      theme_mode
    } = this.props;

    const masks = CONF_MASKS.slice(1);
    const locationtypes = CONF_LOCATION_TYPES.slice(1);

    return (
      <div className={classes.root}>
        <Fade in={show} timeout={{ enter: 300, exit: 300 }}>
          <AppBar className={classes.appbar}>

            <Tabs
              className={classes.masktabs}
              classes={{ indicator: classes.indicator }}
              value={mask}
              onChange={this.handleChangeMask}
              centered
            >
              <Tab
                value={MASK_ALL}
                key={"All"}
                className={classes.masktab}
                label={"All"}
              />
              {masks.map((item, index) => (
                <Tab
                  value={item.value}
                  key={item.name}
                  className={classes.masktab}
                  icon={
                    <>
                    <ToggleButton
                      component="span"
                      className={classes.tabbutton}
                      value={item.name}
                    >
                      <Avatar 
                        className={classes.avatar}
                        src={`/static/images/icons/${theme_mode}/${item.image}`} 
                      />
                      <Typography
                        className={classes.maskname}
                        style={{ opacity: 1.0 }}
                      >
                        {item.name}
                      </Typography>
                    </ToggleButton>
                    </>
                  }
                />
              ))}
            </Tabs>

            <Tabs
              className={classes.typetabs}
              classes={{ indicator: classes.indicator }}
              value={locationtype}
              onChange={this.handleChangeType}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                value={LOCATION_TYPE_ALL}
                key={"All"}
                className={classes.typetab}
                label={"All"}
              />
              {locationtypes.map((item, index) => (
                <Tab
                  value={item.value}
                  key={item.name}
                  className={classes.typetab}
                  icon={
                    <img
                      alt={item.name}
                      src={`/static/images/icons/loc_types/${item.image}`}
                      className={classes.typeimg}
                      style={{backgroundColor: `${item.color}`}}
                    />
                  }
                />
              ))}
            </Tabs>

          </AppBar>
        </Fade>
      </div>
    );
  }
}

MapBottomNavBar.propTypes = {
  classes: PropTypes.object,
  show: PropTypes.bool,
  mask: PropTypes.number,
  locationtype: PropTypes.number,
  onChangeMask: PropTypes.func,
  onChangeType: PropTypes.func
};


const mapStateToProps = state => ({
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MapBottomNavBar));

import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { withAuthentication } from "session";
import * as ROUTES from "constants/routes";
import { THEME_MODE_LIGHT, THEME_MODE_DARK } from "constants/types";
import { MAX_ARTICLE_WIDTH } from "constants/types";


const styles = theme => ({
  root: {
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
  },
  appbar: {
    width: "100%",
    height: "56px",
    [theme.breakpoints.up('sm')]: {
      height: "64px",
    },
  },
  header: {
    position: "fixed",
    // borderBottom: `2px solid ${theme.palette.text.secondary}`
  },
  container: {
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: theme.palette.background.default
  },
  title: {
    flexGrow: 1,
    textAlign: "center"
  }
});

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: THEME_MODE_DARK
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleSwitchTheme = this.handleSwitchTheme.bind(this);
  }

  componentDidMount() {
    const { theme_mode } = this.props;
    this.setState({
      theme: theme_mode
    });
  }

  handleNavBack = () => {
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  };

  handleSwitchTheme = event => {
    const mode = event.target.checked ? THEME_MODE_LIGHT : THEME_MODE_DARK;
    this.setState({
      theme: mode
    }, () => {
      localStorage.setItem('themeMode', mode);
      this.props.selectThemeMode(mode);
    });
  };

  render() {
    const { classes } = this.props;
    const { theme } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <AppBar className={classes.header}>
            <Toolbar>
              <IconButton
                onClick={this.handleNavBack}
                edge="start"
                className={classes.backBtn}
                color="inherit"
                aria-label="back"
              >
                <ArrowBackIosIcon />
              </IconButton>
              <Typography className={classes.title}>Settings</Typography>
            </Toolbar>
          </AppBar>
        </div>

        <Box className={classes.container}>
          <Box className={classes.theme}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value={theme}
                  control={
                    <Switch
                      checked={theme === THEME_MODE_DARK ? false : true}
                      onChange={this.handleSwitchTheme}
                    />
                  }
                  label="Theme Dark"
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Box>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = state => ({
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withAuthentication,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Settings);

import React from "react";
import { PropTypes } from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "./actions";
import {
  withTheme,
  withStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { lightTheme, darkTheme } from "./theme";
import { MAX_WINDOW_WIDTH, THEME_MODE_LIGHT } from "./constants/types";

const styles = {
  root: {
    flexGrow: 1,
    margin: "0 auto",
    width: "100%",
    marginTop: 0,
    zIndex: 1,
  },
};

class ThemeWrapper extends React.Component {
  render() {
    const { classes, children, theme_mode } = this.props;

    const theme = theme_mode === THEME_MODE_LIGHT ? lightTheme : darkTheme;

    const content_classes = {
      width: MAX_WINDOW_WIDTH,
      maxWidth: "100%",
      margin: "0 auto",
      height: "100%",
      backgroundColor: theme.palette.background.main,
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div style={content_classes}>{children}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}

ThemeWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  theme_mode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  theme_mode: state.uiState.theme_mode,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTheme
)(ThemeWrapper);

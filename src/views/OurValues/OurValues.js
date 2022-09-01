import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { BasicAppBar } from "components";
import { MAX_ARTICLE_WIDTH } from "constants/types";


const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default
  },
  appbar: {
    width: MAX_ARTICLE_WIDTH,
    maxWidth: "100%",
    height: "56px",
    [theme.breakpoints.up('sm')]: {
      height: "64px",
    },
  },
  logocontainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(4),
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
  },
  logo: {
    width: 320,
    height: 275,
  },
  textcontainer: {
    backgroundColor: theme.palette.background.default,
  },
  textdiv: {
    margin: theme.spacing(3),
    textAlign: "center",
  },
  text: {
    display: "inline",
    color: theme.palette.text.primary,
    fontSize: 24,
    lineHeight: "28px",
    fontFamily: "Roboto",
    fontWeight: 400,
  },
  textbold: {
    display: "inline",
    color: theme.palette.text.primary,
    fontSize: 24,
    lineHeight: "28px",
    fontFamily: "Roboto",
    fontWeight: 700,
  },
});


class OurValues extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavBack = this.handleNavBack.bind(this);
  }

  handleNavBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { classes, theme_mode } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            width={MAX_ARTICLE_WIDTH}
            title={"Our Values"}
            onNavBack={this.handleNavBack}
          />
        </div>

        <div className={classes.logocontainer}>
          <img
            alt="logo"
            src={`/static/images/logo/${theme_mode}/values_logo.png`}
            className={classes.logo}
          />
        </div>
        <div className={classes.textcontainer}>
          <div className={classes.textdiv}>
            <Typography className={classes.text}>
              {"We aim to help you find "}
            </Typography>
            <Typography className={classes.textbold}>
              {"meaningful"}
            </Typography>
            <Typography className={classes.text}>
              {" and "}
            </Typography>
            <Typography className={classes.textbold}>
              {"valuable"}
            </Typography>
            <Typography className={classes.text}>
              {" knowledge in the vast news and social media ecosystem."}
            </Typography>
          </div>
          <div className={classes.textdiv}>
            <Typography className={classes.text}>
              {"We want to help you "}
            </Typography>
            <Typography className={classes.textbold}>
              {"expand your horizons, expand your knowledge"}
            </Typography>
            <Typography className={classes.text}>
              {" and help you build better online and real-life connections that are "}
            </Typography>
            <Typography className={classes.textbold}>
              {"valuable to you."}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(OurValues);

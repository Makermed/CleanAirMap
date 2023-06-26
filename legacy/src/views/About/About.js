import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { BasicAppBar } from "components";
import * as ROUTES from "constants/routes";
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
  container: {
    // marginTop: 56,
    // [theme.breakpoints.up('sm')]: {
    //   marginTop: 64,
    // },
    padding: theme.spacing(4),
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  logotxt: {
    color: theme.palette.text.primary,
    fontSize: 60,
    fontFamily: "inherit",
    fontWeight: 700,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  actioncontainer: {
    margin: theme.spacing(4),
  },
  actiondiv: {
    marginLeft: theme.spacing(4),
    verticalAlign: "middle",
    cursor: "pointer",
  },
  actionicon: {
    width: 24,
    height: 24,
  },
  actiontext: {
    display: "inline",
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "24px",
    verticalAlign: 'text-bottom',
  },
  forwardicon: {
    fontSize: 18,
    marginTop: 8,
    color: theme.palette.text.primary,
  },
  spacediv: {
    marginTop: theme.spacing(4),
  }
});


class About extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavBack = this.handleNavBack.bind(this);
    
    this.handleClickContactUs = this.handleClickContactUs.bind(this);
    this.handleClickJoinDiscord = this.handleClickJoinDiscord.bind(this);
    this.handleClickValues = this.handleClickValues.bind(this);
    this.handleClickUptime = this.handleClickUptime.bind(this);

    this.handleClickTerms = this.handleClickTerms.bind(this);
    this.handleClickPrivacy = this.handleClickPrivacy.bind(this);
  }

  handleNavBack = () => {
    const location = {
      pathname: ROUTES.HOME,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  }

  handleClickContactUs = () => {
    const location = {
      pathname: ROUTES.CONTACTUS,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  }

  handleClickJoinDiscord = () => {
    const url = "https://discord.gg/Szfftb3MKn"
    window.open(url, "_blank");
  }

  handleClickValues = () => {
    const location = {
      pathname: ROUTES.OUR_VALUES,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  }

  handleClickUptime = () => {
    const location = {
      pathname: ROUTES.UPTIME_STATS,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  }

  handleClickTerms = () => {
    const location = {
      pathname: ROUTES.TERMS_OF_SERVICE,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  }

  handleClickPrivacy = () => {
    const location = {
      pathname: ROUTES.PRIVACY_POLICY,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  }

  render() {
    const { classes, theme_mode } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            width={MAX_ARTICLE_WIDTH}
            title={"About"}
            onNavBack={this.handleNavBack}
          />
        </div>

        <div className={classes.container}>
          <img
            alt="logo"
            src={`/static/images/site/about_logo.png`}
            className={classes.logo}
          />
          <Typography className={classes.logotxt}>
            Raven
          </Typography>
        </div>
        <div className={classes.actioncontainer}>
          <div className={classes.actiondiv} onClick={this.handleClickContactUs}>        
            <img
              className={classes.actionicon} 
              alt="contact us"
              src={`/static/images/icons/${theme_mode}/email.png`}
            />
            <Typography className={classes.actiontext}>
              Contact us by Email
            </Typography>
          </div>
          <div className={classes.actiondiv} onClick={this.handleClickJoinDiscord}>        
            <img
              className={classes.actionicon} 
              alt="join discord"
              src={`/static/images/icons/${theme_mode}/discord.png`}
            />
            <Typography className={classes.actiontext}>
              Join us on Discord
            </Typography>
          </div>
          <div className={classes.actiondiv} onClick={this.handleClickValues}>        
            <img
              className={classes.actionicon} 
              alt="our values"
              src={`/static/images/icons/${theme_mode}/values.png`}
            />
            <Typography className={classes.actiontext}>
              Our Values
            </Typography>
          </div>
          <div className={classes.actiondiv} onClick={this.handleClickUptime}>        
            <img
              className={classes.actionicon} 
              alt="uptime stats"
              src={`/static/images/icons/${theme_mode}/uptime.png`}
            />
            <Typography className={classes.actiontext}>
              Uptime Stats
            </Typography>
          </div>

          <div className={classes.spacediv}></div>

          <div className={classes.actiondiv} onClick={this.handleClickTerms}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={10}>
                <img
                  className={classes.actionicon} 
                  alt="terms of services"
                  src={`/static/images/icons/${theme_mode}/legal.png`}
                />
                <Typography className={classes.actiontext}>
                  Terms of Services
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <ArrowForwardIosIcon className={classes.forwardicon} />
              </Grid>
            </Grid>
          </div>
          <div className={classes.actiondiv} onClick={this.handleClickPrivacy}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={10}>    
                <img
                  className={classes.actionicon} 
                  alt="privacy policy"
                  src={`/static/images/icons/${theme_mode}/views.png`}
                />
                <Typography className={classes.actiontext}>
                  Privacy Policy
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <ArrowForwardIosIcon className={classes.forwardicon} />
              </Grid>
            </Grid>
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
)(About);

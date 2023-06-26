import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import { withAuthentication, withAuthorization } from "session";
import { SearchAppBar } from 'components';
import { conf_activity } from "constants/activity";
import { get_elapsed_time } from "utility/utils";
import { MAX_WINDOW_WIDTH } from "constants/types";

const condition = (authUser) => !!authUser && authUser.uid !== ""

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_WINDOW_WIDTH,
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
  content: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
  },
  logitem: {
    margin: 0,
    padding: 0,
    paddingBottom: 4,
    display: "inline",
  },
  user: {
    color: "#E8EC31",
    display: "inline",
  },
  action: {
    color: theme.palette.text.primary,
    display: "inline",
  },
  object: {
    color: "#E8EC31",
    display: "inline",
  },
  description: {
    display: "inline",
    color: theme.palette.text.primary,
  },
  time: {
    float: "right",
    color: theme.palette.text.primary,
  },
});

class CleanAirLocationLogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchEnter = this.handleSearchEnter.bind(this);
  }

  componentDidMount() {
    const { selected_location } = this.props;
    this.setState({
      ...this.state,
      logs: selected_location.new_logs,
    });
  }
  
  handleNavBack = () => {
    // const { selected_location } = this.props;
    // const route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}`;
    // this.props.history.push(route);
    this.props.history.goBack();
  };

  handleSearchChange = () => {
    
  }

  handleSearchEnter = () => {

  }

  render() {
    const { classes } = this.props;
    const { logs } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <SearchAppBar
            title={"Activity Log"}
            onSearchChange={this.handleSearchChange}
            onSearchEnter={this.handleSearchEnter}
            onNavBack={this.handleNavBack}
          />
        </div>
        <div className={classes.content}>
          <Grid container>
            {logs.map((log, index) => {
              let description = "";
              description += log.fromto === null ? " " : log.fromto;
              description += log.reason === null ? " " : ` ${log.reason}`;

              const timestring = get_elapsed_time(log.logged_at);

              return (
                <Grid item xs={12} className={classes.logitem}>
                  <Grid container direction="row" spacing={1}>
                    <Grid item xs={10}>
                      <Paper>
                        <Typography className={classes.user}>
                          {log.user.username}
                        </Typography>
                        &nbsp;
                        <Typography className={classes.action}>
                          {conf_activity[log.action].message}
                        </Typography>
                        &nbsp;
                        <Typography className={classes.object}>
                          {log.object === null ? "" : log.object}
                        </Typography>
                        &nbsp;
                        <Typography className={classes.description}>
                          {description}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={2}>
                      <Paper>
                        <Typography className={classes.time}>
                          {timestring}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

CleanAirLocationLogs.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  selected_location: state.mapState.selected_location,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withAuthentication,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirLocationLogs);

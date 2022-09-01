import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { withFirebase } from 'services';
import { 
  withAuthentication, 
  withAuthorization 
} from "session";
import { 
  BasicAppBar, 
  Report, 
  WaitingDialog 
} from "components";
import { Moderator } from "./components";
import { GraphqlService } from "services";
import * as ROUTES from "constants/routes";
import { 
  ACTIVITY_TYPE_CLEANAIRMAP, 
  ACTIVITY_DELETE 
} from "constants/activity";
import { MAX_WINDOW_WIDTH } from "constants/types";
import { ToastError } from "utility/toast";


const condition = (authUser) => !!authUser && authUser.uid !== ""


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_WINDOW_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default
  },
  appbar: {
    width: "100%",
    height: "56px",
    [theme.breakpoints.up('sm')]: {
      height: "64px",
    },
  },
  container: {
    marginTop: theme.spacing(1),
  },
  report: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

class CleanAirModeratorsFlagged extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagged: []
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleDeleteReport = this.handleDeleteReport.bind(this);
    this.handleDismissReport = this.handleDismissReport.bind(this);
    this.handleClickReporter = this.handleClickReporter.bind(this);
  }

  setError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();
  };

  componentDidMount() {
    const { selected_location } = this.props;

    const location_moderators = selected_location.location_moderators.filter(moderator => moderator.approved);

    let flagged_moderators = [];
    for (let report of selected_location.location_moderator_reports) {
      let flagged_moderator = flagged_moderators.find((moderator) => moderator.user.uid === report.moderator_id);
      if (!flagged_moderator) {
        flagged_moderator = location_moderators.find(
          (moderator) => moderator.user.uid === report.moderator_id
        );
        if (!flagged_moderator) {
          continue;
        }
        flagged_moderator.reports = [report];
        flagged_moderators.push(flagged_moderator);
      } else {
        flagged_moderator.reports.push(report);
      }
    }

    this.setState({
      ...this.state,
      flagged: flagged_moderators,
    });
  }

  _getAuthToken = async () => {
    const { authUser } = this.props;
    let token = authUser.token;
    if (Date.now() >= authUser.expiredTS) {
      const result = await this.props.firebase.refreshToken();
      if (result.error) {
        this.setError(result.msg);
        token = null;
      } else {
        token = result.token;
      }
    }
    return token;
  };

  handleLogin = () => {
    const location = {
      pathname: ROUTES.SIGN_IN,
      state: { animation: "bottom" },
    };
    this.props.history.push(location);
  };

  handleNavBack = () => {
    const { selected_location } = this.props;
    const route = `/${ROUTES.MODERATION_PREFIX}/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}`;
    const location = {
      pathname: route,
      state: { animation: "right" },
    };
    this.props.history.push(location);
  }

  deleteReport = (report_id) => {
    const { flagged } = this.state;

    const flagged_moderators = [];
    for (let moderator of flagged) {
      let reports = moderator.reports.filter(report => report.id !== report_id);
      if (reports.length > 0) {
        moderator.reports = reports;
        flagged_moderators.push(moderator);
      }
    }

    this.setState({
      ...this.state,
      flagged: flagged_moderators
    });
  }

  deleteReports = (moderator_id) => {
    const { flagged } = this.state;

    const flagged_moderators = flagged.filter(moderator => moderator.id !== moderator_id);
    this.setState({
      ...this.state,
      flagged: flagged_moderators
    });
  }

  getModerator = (report_id) => {
    const { flagged } = this.state;

    for (let moderator of flagged) {
      for (let moderator_report of moderator.reports) {
        if (report_id === moderator_report.id) {
          return {...moderator};
        }
      }
    }
    return null;
  }

  handleDeleteReport = async (report) => {
    const { authUser, selected_location } = this.props;

    const moderator = this.getModerator(report.id);
    if (!moderator) {
      return;
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.props.requestDataPending();

    await gqlservice
      .delete_maplocation_moderator_reports(selected_location.id, report.moderator_id)
      .then(result => {
        return this.deleteReports(report.moderator_id);
      })
      .then(result => {
        return gqlservice.delete_map_location_moderator(report.moderator_id);
      })
      .then(result => {
        return gqlservice.map_location_by_id(selected_location.id);
      })
      .then(result => {
        const locations = result.data.locations;
        if (locations.length > 0) {
          this.props.selectMapLocation(locations[0]);
        }
      }, reason => {
        this.setError(reason.msg);
        this.props.requestDataFinished();
        return;
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        this.props.requestDataFinished();
        return;
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_DELETE,
      object: `the moderator ${moderator.user.username}`,
      fromto: `of the location ${selected_location.name}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      }); 

    this.props.requestDataFinished();
  }

  handleDismissReport = async (report) => {
    const { authUser, selected_location } = this.props;

    const moderator = this.getModerator(report.id);
    if (!moderator) {
      return;
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.props.requestDataPending();

    await gqlservice
      .delete_maplocation_moderator_report(report.id)
      .then(result => {
        return this.deleteReport(report.id);
      }, reason => {
        this.setError(reason.msg);
        this.props.requestDataFinished();
        return;
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        this.props.requestDataFinished();
        return;
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id,
      action: ACTIVITY_DELETE,
      object: `the report of moderator ${moderator.user.username}`,
      fromto: `from the location ${selected_location.name}`,
      reason: ''
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(result => {}, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      }); 
    
    this.props.requestDataFinished();
  }

  handleClickReporter = (report) => {
    const user_id = report.reported_user.uid;
    const path = `/${ROUTES.USER_PREFIX}/${user_id}`;
    const location = {
      pathname: path,
      state: { animation: "left" },
    };
    this.props.history.push(location);
  }

  render() {
    const { classes, theme_mode, requesting } = this.props;
    const { flagged } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            title={"Flagged Moderators"}
            onNavBack={this.handleNavBack}
          />
        </div>
        <Grid container spacing={1} className={classes.container}>
          {flagged.map((moderator, index) => (
            <div key={index}>
              <Grid item key={`moderator-${index}`}>
                <Moderator moderator={moderator} theme={theme_mode} />
              </Grid>
              <div>
                {moderator.reports.map((report, rindex) => (
                  <Grid
                    item
                    key={`moderator-${index}-report-${rindex}`}
                    className={classes.report}
                  >
                    <Report
                      report={report}
                      theme_mode={theme_mode}
                      onDelete={this.handleDeleteReport}
                      onDismiss={this.handleDismissReport}
                      onClickReporter={this.handleClickReporter}
                    />
                  </Grid>
                ))}
              </div>
            </div>
          ))}
        </Grid>
        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

CleanAirModeratorsFlagged.propTypes = {
  className: PropTypes.string,
  theme_mode: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting,
  selected_location: state.mapState.selected_location,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withAuthentication,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirModeratorsFlagged);

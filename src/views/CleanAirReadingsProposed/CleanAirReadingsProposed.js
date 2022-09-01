import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { withAuthentication, withAuthorization } from "session";
import { 
  BasicAppBar, 
  ReadingItem,
  WaitingDialog
} from "components";
import { Propose } from "./components";
import { GraphqlService } from "services";
import { withFirebase } from 'services';
import * as ROUTES from "constants/routes";
import { MAX_ARTICLE_WIDTH } from "constants/types";
import { 
  ACTIVITY_TYPE_CLEANAIRMAP, 
  ACTIVITY_APPROVE, 
  ACTIVITY_DELETE 
} from "constants/activity";
import { ToastError } from "utility/toast";


const condition = (authUser) => !!authUser && authUser.uid !== ""


const styles = (theme) => ({
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
  container: {
    margin: theme.spacing(1),
  },
  propose: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

class PostsProposed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposed: [],
      posted: []
    };

    this.handleNavBack = this.handleNavBack.bind(this);

    this.handleApproveProposed = this.handleApproveProposed.bind(this);
    this.handleDismissProposed = this.handleDismissProposed.bind(this);

    this.showReportReading = this.showReportReading.bind(this);
    this.handleShareReading = this.handleShareReading.bind(this);
  }

  setError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();
  };

  componentDidMount() {
    const { selected_location } = this.props;
    const nonapproved_readings = selected_location.readings.filter(reading => !reading.approved);
    this.setState({
      ...this.state,
      proposed: nonapproved_readings
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
    this.props.history.goBack();
  }

  deleteProposed = (reading_id) => {
    const { proposed } = this.state;
    const new_proposed = proposed.filter(reading => reading.id !== reading_id);

    this.setState({
      ...this.state,
      proposed: new_proposed
    });
  }

  handleApproveProposed = async (reading) => {
    const { authUser, selected_location } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.props.requestDataPending();

    const currentTime = new Date().toISOString();
    await gqlservice.approve_map_reading(reading.id, currentTime, authUser.uid)
      .then(result => {
        this.deleteProposed(reading.id);
        let readings = result.data.update_readings.returning;
        if (readings.length > 0) {
          let updated_location = selected_location;
          updated_location.readings = updated_location.readings.map(reading => 
            reading.id === readings[0].id ? readings[0] : reading
          );
          this.props.updateMapLocation(updated_location);
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
      action: ACTIVITY_APPROVE,
      object: `the reading ${reading.id}`,
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

  handleDismissProposed = async (reading) => {
    const { authUser, selected_location } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token, true);

    this.props.requestDataPending();

    await gqlservice.delete_map_reading(reading.id)
      .then(result => {
        this.deleteProposed(reading.id);
        let updated_location = selected_location;
        updated_location.readings = updated_location.readings.filter(item => 
          item.id !== reading.id
        );
        this.props.updateMapLocation(updated_location);
      }, reason => {
        this.setError(reason.msg);
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
      });

    // log this activity
    gqlservice.set_auth_jwt(token, false);
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: selected_location.id.toString(),
      action: ACTIVITY_DELETE,
      object: `the reading ${reading.id}`,
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

  showReportReading = (reading) => {}
  handleShareReading = (reading) => {}

  render() {
    const { classes, requesting, theme_mode } = this.props;
    const { proposed } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            title={"Proposed Posts"}
            onNavBack={this.handleNavBack}
          />
        </div>
        <Grid container spacing={1} className={classes.container}>
          {proposed.map((reading, index) => (
            <div key={index}>
              <Grid item key={`reading-${index}`}>
                <ReadingItem
                  theme={theme_mode}
                  reading={reading}
                  index={index}
                  onReport={this.showReportReading}
                  onShare={this.handleShareReading}
                />
              </Grid>
              <Grid
                item
                key={`proposed-${index}`}
                className={classes.propose}
              >
                <Propose
                  onApprove={this.handleApproveProposed}
                  onDismiss={this.handleDismissProposed}
                />
              </Grid>
            </div>
          ))}
        </Grid>
        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

PostsProposed.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  sources: state.dataState.sources,
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
)(PostsProposed);

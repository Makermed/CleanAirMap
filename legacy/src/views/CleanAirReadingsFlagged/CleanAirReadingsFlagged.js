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
  ReadingItemMod,
  DlgReading,
  DlgShare,
  WaitingDialog
} from "components";
import { 
  ToastError,
  ToastInfo,
  ToastSuccess
} from "utility/toast";
import { GraphqlService } from "services";
import * as ROUTES from "constants/routes";
import { 
  ACTIVITY_TYPE_CLEANAIRMAP,
  ACTIVITY_DELETE
} from "constants/activity";
import { MAX_ARTICLE_WIDTH } from "constants/types";
import { 
  CONF_LOCATION_TYPES
} from "constants/maplocation";


const condition = (authUser) => !!authUser && authUser.uid !== "";


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
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  report: {
    marginLeft: theme.spacing(4),
    margin: theme.spacing(1),
  },
});

class CleanAirReadingsFlagged extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagged: [],
      readingDlg: false,
      shareDlg: false,
      selectedReading: null
    };

    this.handleNavBack = this.handleNavBack.bind(this);
    
    this.handleDeleteReading = this.handleDeleteReading.bind(this);
    this.handleDismissReport = this.handleDismissReport.bind(this);
    this.handleClickReporter = this.handleClickReporter.bind(this);

    this.handleEditComment = this.handleEditComment.bind(this);
    this.handleSaveReading = this.handleSaveReading.bind(this);
    this.handleHideReading = this.handleHideReading.bind(this);

    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleShareComment = this.handleShareComment.bind(this);
    this.handleMakeModerator = this.handleMakeModerator.bind(this);
    this.handleBanUser = this.handleBanUser.bind(this);
  }

  setError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();
  };

  componentDidMount() {
    const { selected_location } = this.props;

    let flagged_readings = [];
    for (let report of selected_location.reading_reports) {
      let flagged_reading = flagged_readings.find((reading) => reading.id === report.reading.id);
      if (!flagged_reading) {
        flagged_reading = report.reading;
        flagged_reading.reports = [report];
        flagged_readings.push(flagged_reading);
      } else {
        flagged_reading.reports.push(report);
      }
    }

    this.setState({
      ...this.state,
      flagged: flagged_readings,
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

  getReading = (report_id) => {
    const { flagged } = this.state;

    for (let reading of flagged) {
      for (let reading_report of reading.reports) {
        if (report_id === reading_report.id) {
          return {...reading};
        }
      }
    }
    return null;
  }

  // updateReport = (report) => {
  //   const { flagged } = this.state;

  //   let new_flagged = flagged.slice();
  //   for (let post of new_flagged) {
  //     for (let post_report of post.reports) {
  //       if (report.id === post_report.id) {
  //         post_report = report;
  //       }
  //     }
  //   }

  //   this.setState({
  //     ...this.state,
  //     flagged: new_flagged
  //   });
  // }

  deleteReport = (report_id) => {
    const { flagged } = this.state;

    const flagged_readings = [];
    for (let reading of flagged) {
      let reports = reading.reports.filter(report => report.id !== report_id);
      if (reports.length > 0) {
        reading.reports = reports;
        flagged_readings.push(reading);
      }
    }

    this.setState({
      ...this.state,
      flagged: flagged_readings
    });
  }

  deleteReading = (reading_id) => {
    const { flagged } = this.state;

    const flagged_readings = flagged.filter(reading => reading.id !== reading_id);
    this.setState({
      ...this.state,
      flagged: flagged_readings
    });
  }

  handleDeleteReading = async (report) => {
    const { authUser, selected_location } = this.props;

    const reading = this.getReading(report.id);
    if (!reading) {
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

    await gqlservice.delete_map_reading(reading.id)
      .then(result => {
        this.deleteReading(reading.id);
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
      object: `the report ${report.id} of the reading ${reading.id}`,
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

    const reading = this.getReading(report.id);
    if (!reading) {
      return;
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    await gqlservice.set_auth_jwt(token, true);

    this.props.requestDataPending();

    await gqlservice.delete_reading_report(report.id)
      .then(result => {
        this.deleteReport(report.id);
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
      object: `the report of reading ${reading.id}`,
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

  handleEditComment = (reading) => {
    this.setState({
      ...this.state,
      readingDlg: true,
      selectedReading: reading
    });
  }

  handleHideReading = () => {
    this.setState({
      ...this.state,
      readingDlg: false,
      selectedReading: null
    });
  }

  handleSaveReading = async (reading) => {
    const { authUser, selected_location } = this.props;

    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    const gqlservice = new GraphqlService();
    gqlservice.set_auth_jwt(token);

    let new_reading = {
      location_id: selected_location.id,
      co2: reading.co2,
      ach: reading.ach,
      mask: reading.mask,
      comment: reading.comment,
      reading_at: reading.readingat,
      reading_by: authUser.uid,
      approved: true
    };

    await gqlservice
      .update_map_reading(new_reading)
      .then(
        (result) => {
          let readings = result.data.update_readings.returning;
          if (readings.length > 0) {
            let updated_location = selected_location;
            updated_location.readings = updated_location.readings.map(reading => 
              reading.id === readings[0].id ? readings[0] : reading
            );
            this.props.updateMapLocation(updated_location);

            ToastSuccess("The Reading was saved successfully");
            this.setState({
              ...this.state,
              readingDlg: false,
              selectedReading: null
            });
          }
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  }

  handleDeleteComment = async (reading) => {
    const { authUser, selected_location } = this.props;

    if (selected_location.readings.length === 1) {
      ToastInfo("The last reading can't be deleted!");
      return;
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    await gqlservice.set_auth_jwt(token, true);

    this.props.requestDataPending();

    await gqlservice.delete_map_reading(reading.id)
      .then(result => {
        this.deleteReading(reading.id);
        let updated_location = selected_location;
        updated_location.readings = updated_location.readings.filter(item => 
          item.id !== reading.id
        );
        this.props.updateMapLocation(updated_location);
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

  handleShareComment = (reading) => {
    this.setState({
      ...this.state,
      shareDlg: true,
      selectedReading: reading
    });
  }

  handleMakeModerator = async (reading) => {
    const { authUser, selected_location } = this.props;

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    // check if the user is the moderator of this location
    const userId = reading.reading_by;
    const moderator = selected_location.location_moderators.find(moderator => moderator.user.uid === userId);
    if (moderator) {
      if (moderator.approved) {
        return;
      } else {
        const currentTime = new Date().toISOString();
        await gqlservice
          .approve_map_location_moderator(moderator.id, true, userId, currentTime)
          .then(
            (result) => {
              if (result.data.insert_location_moderators.affected_rows > 0) {
                ToastSuccess("Success to make moderator");
                this.props.approveLocationModerator(moderator);
                return;
              } else {
                this.setError("Failed to moderate");
                return;
              }
            },
            (reason) => {
              this.setError(reason.msg);
              return;
            }
          )
          .catch((err) => {
            this.setError(JSON.stringify(err));
            return;
          });
      }
    }

    const currentTime = new Date().toISOString();
    const new_moderator = {
      user_id: reading.reading_by,
      location_id: selected_location.id,
      approved: true,
      approved_by: authUser.uid,
      approved_at: currentTime
    };

    await gqlservice
      .insert_map_location_moderator(new_moderator)
      .then(
        (result) => {
          if (result.data.insert_location_moderators.affected_rows > 0) {
            ToastSuccess("Success to make moderator");
            this.props.insertLocationModerator(new_moderator);
          } else {
            this.setError("Failed to moderate");
          }
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });
  }

  handleBanUser = async (reading) => {

  }

  render() {
    const { 
      classes, 
      theme_mode,
      selected_location,
      requesting 
    } = this.props;
    const { 
      flagged,
      readingDlg,
      shareDlg,
      selectedReading
    } = this.state;

    // share reading information
    let shareReadingInfo = null;
    if (shareDlg && selectedReading) {
      let shareReadingUrl = "";
      if (typeof window !== "undefined") {
        shareReadingUrl = window.location.protocol + "//" + window.location.host;
      }
      shareReadingUrl += `/${ROUTES.CLEANAIRMAP_PREFIX}/${selected_location.slug}/readings/${selectedReading.id}`;

      const locationType = CONF_LOCATION_TYPES.find(
        (loctype) => loctype.value === selected_location.type
      );

      shareReadingInfo = {
        title: "Raven Clean Air Map: " + selected_location.name,
        description: selectedReading.comment,
        image: `/static/images/icons/${theme_mode}/${locationType.image}`,
        hashtag: "",
        url: shareReadingUrl,
      };
    }

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            title={"Flagged Readings by Users"}
            onNavBack={this.handleNavBack}
          />
        </div>
        <Grid container className={classes.container}>
          {flagged.map((reading, index) => (
            <div key={index}>
              <Grid item key={`reading-${index}`}>
                <ReadingItemMod
                  reading={reading} 
                  theme={theme_mode} 
                  index={index}
                  onEdit={this.handleEditComment}
                  onDelete={this.handleDeleteComment}
                  onShare={this.handleShareComment}
                  onMakeModerator={this.handleMakeModerator}
                  onBanUser={this.handleBanUser}
                />
              </Grid>
              <div>
                {reading.reports.map((report, rindex) => (
                  <Grid
                    item
                    key={`post-${index}-report-${rindex}`}
                    className={classes.report}
                  >
                    <Report
                      report={report}
                      theme_mode={theme_mode}
                      onDelete={this.handleDeleteReading}
                      onDismiss={this.handleDismissReport}
                      onClickReporter={this.handleClickReporter}
                    />
                  </Grid>
                ))}
              </div>
            </div>
          ))}
        </Grid>
        <DlgReading
          open={readingDlg}
          loggedIn={true}
          reading={selectedReading}
          title={"Edit a Reading"}
          theme={theme_mode}
          onSave={this.handleSaveReading}
          onCancel={this.handleHideReading}
        />
        { shareDlg &&
          <DlgShare
            open={shareDlg}
            shareInfo={shareReadingInfo}
            onClose={this.handleCloseShareReading}
          />
        }
        <WaitingDialog open={requesting} /> 
        <ToastContainer />
      </div>
    );
  }
}

CleanAirReadingsFlagged.propTypes = {
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
)(CleanAirReadingsFlagged);

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { withFirebase } from 'services';
// import { Alert } from 'components';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.main,
    height: '100%'
  },
  alert: {
    margin: theme.spacing(0)
  },
  emailButton: {
    margin: theme.spacing(2)
  },
});

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      const { classes } = this.props;

      return needsEmailVerification(this.props.authUser) ? (
        <div className={classes.root}>
          {/* {this.state.isSent ? (
            <Alert
              className={classes.alert}
              message={
                'E-Mail confirmation sent: Check you E-Mails (Spam folder included) for a confirmation E-Mail. Refresh this page once you confirmed your E-Mail.'
              }
            />
          ) : (
            <Alert
              className={classes.alert}
              message={
                'Check you E-Mails (Spam folder included) for a confirmation E-Mail or send another confirmation E-Mail.'
              }
            />
          )} */}

          <Button
            className={classes.emailButton}
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            onClick={this.onSendEmailVerification}
            disabled={this.state.isSent}
          >
            Send Confirmation Email
          </Button>
        </div>
      ) : (
        <Component {...this.props} />
      );
    }
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser
  });

  return compose(
    withFirebase,
    connect(mapStateToProps),
    withStyles(styles)
  )(WithEmailVerification);
};

export default withEmailVerification;

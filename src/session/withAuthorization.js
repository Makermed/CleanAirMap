import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from 'services';
import * as ROUTES from 'constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
            // console.log("Auth User ", authUser);
          if (!condition(authUser)) {
            const location = {
              pathname: ROUTES.SIGN_IN,
              state: { animation: "bottom" }
            };
            this.props.history.push(location);
            this.props.setLoginBackRoute(this.props.location.pathname);
          }
        },
        () => {
          const location = {
            pathname: ROUTES.SIGN_IN,
            state: { animation: "bottom" }
          };
          this.props.history.push(location);
          this.props.setLoginBackRoute(this.props.location.pathname);
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return condition(this.props.authUser) ? (
        <Component {...this.props} />
      ) : null;
    }
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });

  return compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps),
  )(WithAuthorization);
};

export default withAuthorization;

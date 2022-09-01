import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'actions';
import { withFirebase } from 'services';
import { THEME_MODE_LIGHT } from 'constants/types';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      let themeMode = localStorage.getItem('themeMode');
      if (!themeMode) {
        themeMode = THEME_MODE_LIGHT;
      }
      this.props.selectThemeMode(themeMode);

      let mapParams = localStorage.getItem('mapParams');
      if (mapParams) {
        const map = JSON.parse(mapParams);
        // console.log("mapParams :", map);
        this.props.setMapParams(map.center_lng, map.center_lat, map.zoom, map.bounds);
      }

      // const localUser = JSON.parse(localStorage.getItem('authUser'));
      // if (!props.loggedIn && localUser !== null) {
      //   this.props.setAuthUser(localUser);
      // }
      // console.log("withAuthentication : constructor");
    }

    componentDidMount = () => {
      const { loggedIn, authUser } = this.props;

      // console.log("withAuthentication : componentDidMount :", loggedIn, authUser);

      this.listener = this.props.firebase.onAuthUserListener(
        user => {
          // console.log("auth listener user :", user);
          localStorage.setItem('authUser', JSON.stringify(user));
          this.props.setAuthUser(user);
        },
        async () => {
          // console.log("auth listener fallback :", loggedIn, authUser);
          if (loggedIn && authUser) {
            await this._refreshToken();
            localStorage.setItem('authUser', JSON.stringify(authUser));
            return;
          }
          localStorage.removeItem('authUser');
          this.props.setAuthUser(null);
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    _refreshToken = async () => {
      // console.log("withAuthentication refresh token");
      const { authUser } = this.props;
      let token = authUser.token;
      if (Date.now() - authUser.expiredTS >= 3600000) {
        token = await this.props.firebase.refreshToken();
        if (!token) {
          this.setError("Network Error!");
          return false;
        }
        return true;
      }
      return true;
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    loggedIn: state.sessionState.loggedIn,
    authUser: state.sessionState.authUser,
  });

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch);
  };

  return compose(
    withFirebase,
    connect( mapStateToProps, mapDispatchToProps),
  )(WithAuthentication);
};

export default withAuthentication;

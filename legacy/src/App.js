import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import 'react-toastify/dist/ReactToastify.css';

import Routes from "./Routes";
// import { withAuthentication } from "./session";
import { withFirebase } from "services";

const browserHistory = createBrowserHistory();

class App extends Component {
  componentDidMount = () => {
    if (this.props.firebase.messaging) {
      const messaging = this.props.firebase.messaging;
      messaging
        .requestPermission()
        .then(() => {
          return messaging.getToken();
        })
        .then((data) => {
          // console.warn("token :", data);
        });
    }
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Routes />
      </Router>
    );
  }
}

// export default withAuthentication(App);
export default withFirebase(App);

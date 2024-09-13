import React, { Component } from "react";
import { Router } from "react-router-dom";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import { bindActionCreators } from "redux";
import { ActionCreators } from "./actions";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./Routes";
const browserHistory = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      socketId: null,
    };
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Routes />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
